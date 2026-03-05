from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.http import FileResponse, Http404, HttpResponse
from django.utils.translation import gettext_lazy as _
from django.views.decorators.clickjacking import xframe_options_exempt
from django.template.loader import render_to_string
from django.db.models import Q
from django.utils import timezone
from datetime import datetime, timedelta

from playwright.sync_api import sync_playwright
from .models import Pedido, EstadoPedido, Factura, HistorialEstado
from .forms import UserEditForm
from django.contrib.auth.forms import PasswordChangeForm
from django.contrib.auth import update_session_auth_hash

@login_required
def editar_perfil(request):
    if request.method == 'POST':
        form = UserEditForm(request.POST, instance=request.user)
        if form.is_valid():
            form.save()
            messages.success(request, 'Tu perfil ha sido actualizado correctamente.')
            return redirect('perfil')
    else:
        form = UserEditForm(instance=request.user)
    return render(request, 'pedidos/edicionPerfil.html', {'user_form': form})

@login_required
def cambiar_contrasena(request):
    if request.method == 'POST':
        form = PasswordChangeForm(user=request.user, data=request.POST)
        if form.is_valid():
            user = form.save()
            update_session_auth_hash(request, user)
            messages.success(request, 'Tu contraseña se actualizó correctamente.')
            return redirect('perfil')
        messages.error(request, 'Revisa los errores del formulario.')
    else:
        form = PasswordChangeForm(user=request.user)
    return render(request, 'pedidos/recuperacion.html', {'form': form})

@login_required
def perfil(request):
    pedidos_recientes = request.user.pedidos.all().order_by('-fecha_creacion')[:5]
    return render(request, 'pedidos/perfil.html', {
        'user': request.user,
        'pedidos_recientes': pedidos_recientes,
        'section': 'mi_cuenta'
    })

@login_required
def mis_pedidos(request):
    # Base query
    qs = request.user.pedidos.select_related('estado', 'factura').all()
    estados = EstadoPedido.objects.all().order_by('orden', 'nombre')

    # Filtros
    estado_id = request.GET.get('estado', '').strip()
    sort_key = request.GET.get('sort', 'fecha_desc').strip()
    q = request.GET.get('q', '').strip()

    # Filtro por búsqueda
    if q:
        qs = qs.filter(Q(codigo__icontains=q) | Q(nombre_facturacion__icontains=q))

    # Filtro por estado
    if estado_id:
        try:
            if estado_id.isdigit():
                qs = qs.filter(estado_id=int(estado_id))
            else:
                qs = qs.filter(estado__nombre__iexact=estado_id)
        except (ValueError, EstadoPedido.DoesNotExist):
            pass

    # Ordenamiento
    sort_map = {
        'fecha_desc': '-fecha_creacion',
        'fecha_asc': 'fecha_creacion',
        'total_desc': '-total',
        'total_asc': 'total',
    }
    qs = qs.order_by(sort_map.get(sort_key, '-fecha_creacion'))

    return render(request, 'pedidos/mis_pedidos.html', {
        'pedidos': qs,
        'estados': estados,
        'selected_estado': estado_id,
        'sort': sort_key,
        'q': q,
        'section': 'mis_pedidos',
    })

@login_required
def detalle_pedido(request, codigo_pedido):
    pedido = get_object_or_404(Pedido, codigo=codigo_pedido, usuario=request.user)
    detalles = pedido.detalles.select_related('producto').all()
    historial = pedido.historial_estados.select_related('estado').all()
    return render(request, 'pedidos/detalle_pedido.html', {
        'pedido': pedido,
        'detalles': detalles,
        'historial': historial,
        'factura': getattr(pedido, 'factura', None),
        'puede_cancelar': pedido.puede_cancelar,
        'section': 'mis_pedidos'
    })

@login_required
def cancelar_pedido(request, codigo_pedido):
    pedido = get_object_or_404(Pedido, codigo=codigo_pedido, usuario=request.user)

    if request.method != 'POST':
        return redirect('detalle_pedido', codigo_pedido=pedido.codigo)

    # Motivo opcional (desde el modal)
    motivo = (request.POST.get('motivo') or '').strip()

    # Regla servidor: solo CREADO o PREPARANDO
    if not pedido.puede_cancelar:
        messages.error(request, _("No se puede cancelar este pedido."))
        return redirect('detalle_pedido', codigo_pedido=pedido.codigo)

    # Buscar estado CANCELADO
    estado_cancelado = EstadoPedido.objects.filter(nombre__iexact="CANCELADO").first()
    if not estado_cancelado:
        messages.error(request, _("No existe el estado CANCELADO. Contacta soporte."))
        return redirect('detalle_pedido', codigo_pedido=pedido.codigo)

    # Adjuntar comentario extra para el signal de historial
    pedido._hist_extra = motivo
    # Cambiar estado
    pedido.estado = estado_cancelado
    pedido.save(update_fields=["estado", "fecha_actualizacion"])

    # Devolver stock
    for det in pedido.detalles.select_related('producto').all():
        prod = det.producto
        prod.stock = (prod.stock or 0) + det.cantidad
        prod.save(update_fields=['stock'])

    messages.success(request, _("Pedido cancelado correctamente."))
    return redirect('detalle_pedido', codigo_pedido=pedido.codigo)

@xframe_options_exempt
@login_required
def ver_factura(request, factura_id):
    factura = get_object_or_404(Factura, id=factura_id, pedido__usuario=request.user)
    pedido = factura.pedido

    if factura.pdf and hasattr(factura.pdf, 'open'):
        try:
            resp = FileResponse(factura.pdf.open('rb'), content_type='application/pdf')
            resp["Content-Disposition"] = f'inline; filename="Factura-{factura.numero_factura}.pdf"'
            return resp
        except FileNotFoundError:
            pass

    detalles = pedido.detalles.select_related('producto').all()
    return render(request, 'pedidos/factura_embed.html', {
        'factura': factura,
        'pedido': pedido,
        'detalles': detalles
    })

def _html_to_pdf_chromium(html: str, base_url: str) -> bytes:
    html = html.replace("<head>", f'<head><base href="{base_url}">', 1)
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.set_content(html, wait_until="networkidle")
        page.emulate_media(media="print")
        pdf = page.pdf(format="A4", print_background=True,
                       margin={"top":"16mm","right":"16mm","bottom":"16mm","left":"16mm"})
        browser.close()
        return pdf

@login_required
def descargar_factura(request, factura_id):
    factura = get_object_or_404(Factura, id=factura_id, pedido__usuario=request.user)

    if getattr(factura, "pdf", None) and factura.pdf.name and factura.pdf.storage.exists(factura.pdf.name):
        return FileResponse(
            factura.pdf.open('rb'),
            as_attachment=True,
            filename=f'Factura-{factura.numero_factura}.pdf',
            content_type='application/pdf'
        )

    pedido = factura.pedido
    detalles = pedido.detalles.select_related('producto').all()
    base_url = request.build_absolute_uri('/')
    html = render_to_string('pedidos/factura_embed.html', {
        'factura': factura,
        'pedido': pedido,
        'detalles': detalles,
        'base_url': base_url,
    })

    with sync_playwright() as p:
        browser = p.chromium.launch()
        context = browser.new_context(device_scale_factor=2)
        page = context.new_page()

        if '<base ' not in html:
            html = html.replace('<head>', f'<head><base href="{base_url}">', 1)

        page.set_content(html, wait_until="networkidle")
        page.emulate_media(media="print")
        pdf_bytes = page.pdf(
            format="A4",
            print_background=True,
            margin={"top": "16mm", "right": "16mm", "bottom": "16mm", "left": "16mm"},
        )
        browser.close()

    resp = HttpResponse(pdf_bytes, content_type='application/pdf')
    resp['Content-Disposition'] = f'attachment; filename="Factura-{factura.numero_factura}.pdf"'
    return resp

@login_required
def seguimiento_pedido(request, codigo_pedido):
    pedido = get_object_or_404(Pedido, codigo=codigo_pedido, usuario=request.user)
    historial = pedido.historial_estados.select_related('estado').order_by('-fecha')
    return render(request, 'pedidos/seguimiento.html', {
        'pedido': pedido,
        'historial': historial,
        'section': 'mis_pedidos'
    })