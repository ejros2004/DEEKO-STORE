# panel/views.py
from decimal import Decimal
from datetime import timedelta
from pathlib import Path
import os

from django.conf import settings
from django.contrib import messages
from django.db.models import Sum, Count, Value, IntegerField, DecimalField, Q, Max
from django.db.models.functions import Coalesce, TruncDate
from django.forms import ModelForm
from django.shortcuts import render, get_object_or_404, redirect
from django.utils import timezone
from django.utils.text import slugify

from .decorators import staff_required
from panel.forms import ProductoForm
from productos.models import Producto, SeccionCategoria, Subcategoria
from pedidos.models import Pedido, DetallePedido, EstadoPedido
from principal.models import CategoriaPrincipal

# =========================
# Helpers robustos de imágenes / nombres
# =========================

def _split_name(relpath: str) -> str:
    """Devuelve solo el nombre de archivo. Soporta 'images/foo.jpg' y 'images\\foo.jpg'."""
    if not relpath:
        return ""
    s = str(relpath).replace("\\", "/")
    return s.rsplit("/", 1)[-1]

def _filename_from_rel(relpath: str) -> str:
    return _split_name(relpath)

def _normalize_rel(relpath: str) -> str:
    """
    Normaliza a 'images/<file>' para rutas relativas bajo static/images.
    Soporta backslashes.
    """
    if not relpath:
        return ""
    s = str(relpath).replace("\\", "/")
    return s if s.startswith("images/") else f"images/{s}"

def _image_in_use(filename: str, *, skip_product_id: int | None = None, skip_principal_id: int | None = None) -> bool:
    """
    Verifica si una imagen (por NOMBRE DE ARCHIVO, p.ej. 'foo.jpg') está siendo
    referenciada por ALGÚN Producto o ALGUNA CategoriaPrincipal.
    Soporta históricos 'images/foo.jpg' y backslashes en DB.
    """
    if not filename:
        return False
    fname = _split_name(filename)

    # Productos
    prod_qs = Producto.objects.all()
    if skip_product_id:
        prod_qs = prod_qs.exclude(pk=skip_product_id)
    used_by_prod = prod_qs.filter(
        Q(imagen__iexact=fname) |
        Q(imagen__iendswith=f"/{fname}") |
        Q(imagen__iendswith=f"\\{fname}")
    ).exists()
    if used_by_prod:
        return True

    # Categorías principales
    cat_qs = CategoriaPrincipal.objects.all()
    if skip_principal_id:
        cat_qs = cat_qs.exclude(pk=skip_principal_id)
    used_by_cat = cat_qs.filter(
        Q(imagen_nombre__iexact=fname) |
        Q(imagen_nombre__iendswith=f"/{fname}") |
        Q(imagen_nombre__iendswith=f"\\{fname}")
    ).exists()

    return used_by_cat

def _delete_image(image_path: str) -> bool:
    """
    Elimina un archivo bajo static/ si existe.
    Acepta 'images/foo.jpg', 'foo.jpg' o 'images\\foo.jpg'.
    """
    try:
        if not image_path:
            return False
        rel = _normalize_rel(image_path)
        full_path = Path(settings.BASE_DIR) / 'static' / rel
        if full_path.exists():
            full_path.unlink()
            return True
    except Exception as e:
        print(f"Error al eliminar imagen {image_path}: {e}")
    return False

def _save_product_image(prod, file_obj):
    """
    Guarda la imagen en <BASE_DIR>/static/images y actualiza prod.imagen.
    - No sobrescribe si el archivo ya existe (reusa).
    - Normaliza el nombre de archivo.
    """
    folder = Path(settings.BASE_DIR) / 'static' / 'images'
    folder.mkdir(parents=True, exist_ok=True)

    orig = getattr(file_obj, 'name', '') or 'imagen'
    stem = Path(orig).stem
    ext  = (Path(orig).suffix or '.jpg').lower()
    if ext not in {'.jpg', '.jpeg', '.png', '.webp'}:
        ext = '.jpg'

    filename = f"{slugify(stem) or 'img'}{ext}"
    dest = folder / filename

    if not dest.exists():
        with dest.open('wb+') as dst:
            for chunk in file_obj.chunks():
                dst.write(chunk)

    prod.imagen = f"images/{filename}"  # <- imagen es Char/TextField
    prod.save(update_fields=['imagen'])
    return prod.imagen

def _principal_by_orden(orden: int):
    return CategoriaPrincipal.objects.filter(orden=orden).first()

def _save_principal_image(cat: CategoriaPrincipal, file):
    """
    Guarda la imagen en <BASE_DIR>/static/images y setea imagen_nombre.
    - No sobrescribe si ya existe (reusa).
    """
    base_dir = Path(settings.BASE_DIR)
    folder = base_dir / 'static' / 'images'
    folder.mkdir(parents=True, exist_ok=True)

    original_name = getattr(file, 'name', '') or 'imagen'
    stem = Path(original_name).stem
    ext = (Path(original_name).suffix or '.jpg').lower()

    allowed_exts = {'.jpg', '.jpeg', '.png', '.webp'}
    if ext not in allowed_exts:
        ext = '.jpg'

    safe_stem = slugify(stem) or 'img'
    filename = f"{safe_stem}{ext}"
    dest_path = folder / filename

    if not dest_path.exists():
        with dest_path.open('wb+') as dst:
            for chunk in file.chunks():
                dst.write(chunk)

    cat.imagen_nombre = filename
    cat.save(update_fields=['imagen_nombre'])
    return filename

# =========================
# Dashboard
# =========================
@staff_required
def panel_admin(request):
    return dashboard(request)

@staff_required
def dashboard(request):
    hoy = timezone.now().date()
    DEC = DecimalField(max_digits=12, decimal_places=2)
    INT = IntegerField()

    total_pedidos = Pedido.objects.aggregate(
        c=Coalesce(Count('id'), Value(0, output_field=INT))
    )['c']
    total_ventas = Pedido.objects.aggregate(
        s=Coalesce(Sum('total', output_field=DEC), Value(Decimal('0.00'), output_field=DEC))
    )['s']
    pendientes = Pedido.objects.filter(estado__nombre__iexact="Creado").aggregate(
        c=Coalesce(Count('id'), Value(0, output_field=INT))
    )['c']

    stock_bajo_count = Producto.objects.filter(stock__lte=5).aggregate(
        c=Coalesce(Count('id'), Value(0, output_field=INT))
    )['c']

    pedidos_hoy_qs = Pedido.objects.filter(fecha_creacion__date=hoy)
    hoy_ventas = pedidos_hoy_qs.aggregate(
        s=Coalesce(Sum('total', output_field=DEC), Value(Decimal('0.00'), output_field=DEC))
    )['s']
    pedidos_hoy_count = pedidos_hoy_qs.aggregate(
        c=Coalesce(Count('id'), Value(0, output_field=INT))
    )['c']
    aov_hoy = (hoy_ventas / pedidos_hoy_count) if pedidos_hoy_count else Decimal('0.00')

    desde = hoy - timedelta(days=29)
    serie_ventas = (
        Pedido.objects
        .filter(fecha_creacion__date__gte=desde)
        .annotate(d=TruncDate('fecha_creacion'))
        .values('d')
        .annotate(s=Coalesce(Sum('total', output_field=DEC), Value(Decimal('0.00'), output_field=DEC)))
        .order_by('d')
    )

    top = (
        DetallePedido.objects
        .values('producto_id')
        .annotate(cant=Coalesce(Sum('cantidad', output_field=INT), Value(0, output_field=INT)))
        .order_by('-cant')[:8]
    )
    top_ids  = [t['producto_id'] for t in top]
    cant_map = {t['producto_id']: t['cant'] for t in top}
    prod_map = {p.id: p for p in Producto.objects.filter(id__in=top_ids)}

    mas_vendidos = []
    for pid in top_ids:
        p = prod_map.get(pid)
        if not p:
            continue
        mas_vendidos.append({
            'id': p.id,
            'nombre': p.nombre,
            'codigo': p.codigo,
            'thumb': getattr(p, 'image_url', ''),
            'cant' : cant_map.get(pid, 0),
        })

    pendientes_list = (
        Pedido.objects
        .select_related('estado', 'usuario')
        .filter(estado__nombre__iexact="Creado")
        .order_by('-fecha_creacion')[:6]
    )

    bajo_stock = (
        Producto.objects
        .filter(stock__lte=5)
        .select_related('subcategoria')
        .order_by('stock', 'nombre')[:6]
    )

    top_clientes_qs = (
        Pedido.objects
        .values('usuario_id', 'usuario__first_name', 'usuario__last_name', 'usuario__email')
        .annotate(pedidos=Count('id'))
        .order_by('-pedidos')[:5]
    )
    top_clientes = []
    for r in top_clientes_qs:
        nombre = (f"{r['usuario__first_name']} {r['usuario__last_name']}".strip()
                  or r['usuario__email'] or 'Sin nombre').strip()
        top_clientes.append({'nombre': nombre, 'email': r['usuario__email'], 'pedidos': r['pedidos']})
    top_cliente = top_clientes[0] if top_clientes else None

    estados_30 = (
        Pedido.objects
        .filter(fecha_creacion__date__gte=desde)
        .values('estado__nombre')
        .annotate(c=Count('id'))
        .order_by('estado__nombre')
    )
    estados_data = [{'estado': e['estado__nombre'] or '—', 'c': e['c']} for e in estados_30]

    secciones_top_qs = (
        DetallePedido.objects
        .filter(pedido__fecha_creacion__date__gte=desde)
        .values('producto__subcategoria__seccion__nombre')
        .annotate(unidades=Coalesce(Sum('cantidad', output_field=INT), Value(0, output_field=INT)))
        .order_by('-unidades')[:6]
    )
    secciones_top = [
        {'seccion': r['producto__subcategoria__seccion__nombre'] or 'Sin sección', 'unidades': r['unidades']}
        for r in secciones_top_qs
    ]

    ctx = {
        'total_pedidos': total_pedidos,
        'total_ventas': total_ventas,
        'pendientes': pendientes,
        'stock_bajo': stock_bajo_count,
        'hoy_ventas': hoy_ventas,
        'aov_hoy': aov_hoy,
        'serie_ventas': list(serie_ventas),
        'mas_vendidos': mas_vendidos,
        'pendientes_list': pendientes_list,
        'bajo_stock': bajo_stock,
        'top_cliente': top_cliente,
        'top_clientes': top_clientes,
        'estados_data': estados_data,
        'secciones_top': secciones_top,
    }
    return render(request, 'panel/dashboard.html', ctx)

# =========================
# Productos
# =========================
@staff_required
def productos_list(request):
    q   = (request.GET.get('q') or '').strip()
    cat = (request.GET.get('cat') or '').strip()
    sub = (request.GET.get('sub') or '').strip()

    productos = (
        Producto.objects
        .select_related('subcategoria', 'subcategoria__seccion')
        .order_by('subcategoria__seccion__orden', 'subcategoria__orden', 'orden', 'id')
    )

    if q:
        productos = productos.filter(
            Q(nombre__icontains=q) |
            Q(codigo__icontains=q) |
            Q(subcategoria__nombre__icontains=q) |
            Q(subcategoria__seccion__nombre__icontains=q)
        )
    if cat:
        productos = productos.filter(subcategoria__seccion_id=cat)
    if sub:
        productos = productos.filter(subcategoria_id=sub)

    categorias    = SeccionCategoria.objects.order_by('orden', 'nombre')
    subcategorias = Subcategoria.objects.select_related('seccion').order_by('seccion__orden', 'orden', 'nombre')

    ctx = {
        'productos': productos,
        'categorias': categorias,
        'subcategorias': subcategorias,
        'q': q, 'cat': cat, 'sub': sub,
    }
    return render(request, 'panel/productos_list.html', ctx)

# panel/views.py
@staff_required
def producto_create(request):
    from panel.forms import ProductoForm

    if request.method == 'POST':
        form = ProductoForm(request.POST, request.FILES)
        if form.is_valid():
            if not request.FILES.get('imagen'):
                form.add_error('imagen', 'Este campo es obligatorio.')

                # 👇 NUEVO: contexto con cats/subs en POST inválido
                cats = list(SeccionCategoria.objects.order_by('orden', 'nombre')
                            .values('id', 'nombre'))
                subs = list(Subcategoria.objects.order_by('seccion__orden', 'orden', 'nombre')
                            .values('id', 'nombre', 'seccion_id'))

                return render(request, 'panel/producto_form.html', {
                    'form': form,
                    'cats': cats,
                    'subs': subs,
                    'obj': None,
                })

            prod = form.save(commit=False)
            max_orden = (Producto.objects
                         .filter(subcategoria=prod.subcategoria)
                         .aggregate(m=Max('orden'))['m'] or 0)
            prod.orden = max_orden + 1
            prod.save()

            _save_product_image(prod, request.FILES['imagen'])
            messages.success(request, 'Producto creado correctamente')
            return redirect('panel_productos')

        messages.error(request, 'Revisa los campos del formulario.')
    else:
        form = ProductoForm()

    # 👇 NUEVO: contexto con cats/subs en GET
    cats = list(SeccionCategoria.objects.order_by('orden', 'nombre')
                .values('id', 'nombre'))
    subs = list(Subcategoria.objects.order_by('seccion__orden', 'orden', 'nombre')
                .values('id', 'nombre', 'seccion_id'))

    return render(request, 'panel/producto_form.html', {
        'form': form,
        'cats': cats,
        'subs': subs,
        'obj': None,
    })


@staff_required
def producto_edit(request, pk):
    prod = get_object_or_404(Producto, pk=pk)

    class F(ModelForm):
        class Meta:
            model = Producto
            fields = ['subcategoria', 'nombre', 'descripcion', 'precio', 'imagen', 'badge', 'stock', 'orden']

    if request.method == 'POST':
        form = F(request.POST, request.FILES, instance=prod)
        if form.is_valid():
            prod = form.save(commit=False)
            old_rel = prod.imagen or ''

            # Limpiar imagen
            if request.POST.get('imagen-clear') == 'on' and not request.FILES.get('imagen'):
                if old_rel:
                    old_fname = _filename_from_rel(old_rel)
                    if not _image_in_use(old_fname, skip_product_id=prod.pk):
                        _delete_image(old_rel)
                prod.imagen = ''
                prod.save(update_fields=['subcategoria', 'nombre', 'descripcion', 'precio', 'badge', 'stock', 'orden', 'imagen'])
                messages.success(request, 'Producto actualizado.')
                return redirect('panel_productos')

            # Imagen nueva
            if request.FILES.get('imagen'):
                f = request.FILES['imagen']
                orig = getattr(f, 'name', '') or 'imagen'
                stem = Path(orig).stem
                ext  = (Path(orig).suffix or '.jpg').lower()
                if ext not in {'.jpg', '.jpeg', '.png', '.webp'}:
                    ext = '.jpg'
                newfilename = f"{slugify(stem) or 'img'}{ext}"
                new_rel = f"images/{newfilename}"

                if old_rel and _split_name(old_rel) != _split_name(new_rel):
                    old_fname = _filename_from_rel(old_rel)
                    if not _image_in_use(old_fname, skip_product_id=prod.pk):
                        _delete_image(old_rel)

                prod.save(update_fields=['subcategoria', 'nombre', 'descripcion', 'precio', 'badge', 'stock', 'orden'])
                _save_product_image(prod, f)
                messages.success(request, 'Producto actualizado.')
                return redirect('panel_productos')

            # Sin cambios de imagen
            prod.save(update_fields=['subcategoria', 'nombre', 'descripcion', 'precio', 'badge', 'stock', 'orden'])
            messages.success(request, 'Producto actualizado.')
            return redirect('panel_productos')
        else:
            messages.error(request, 'Revisa los campos del formulario.')
    else:
        form = F(instance=prod)

    # Contexto adicional para poblar selects desde BD (categorías y subcategorías)
    cats = list(SeccionCategoria.objects.order_by('orden', 'nombre')
                .values('id', 'nombre'))
    subs = list(Subcategoria.objects.order_by('seccion__orden', 'orden', 'nombre')
                .values('id', 'nombre', 'seccion_id'))

    return render(request, 'panel/producto_form.html', {
        'form': form,
        'obj': prod,
        'cats': cats,
        'subs': subs,
    })

# =========================
# Categorías (Secciones + Principal sincronizado)
# =========================
@staff_required
def categorias(request):
    secciones = SeccionCategoria.objects.prefetch_related('subcategorias').order_by('orden')
    return render(request, 'panel/categorias.html', {'secciones': secciones})

@staff_required
def categoria_create(request):
    """
    GET -> muestra formulario vacío (nombre + imagen)
    POST -> crea SeccionCategoria + CategoriaPrincipal (url_name=slug) y guarda imagen
    """
    if request.method == 'POST':
        nombre = (request.POST.get('nombre') or '').strip()
        if not nombre:
            messages.error(request, 'El nombre es requerido.')
            return redirect('panel_categoria_create')

        max_orden = SeccionCategoria.objects.aggregate(m=Max('orden'))['m'] or 0
        orden = max_orden + 1

        if SeccionCategoria.objects.filter(nombre__iexact=nombre).exists():
            messages.warning(request, f'La categoría "{nombre}" ya existe. Elige otro nombre.')
            return redirect('panel_categoria_create')

        sec = SeccionCategoria.objects.create(nombre=nombre, orden=orden)

        slug = slugify(nombre)[:50] or f'cat-{orden}'
        prin = CategoriaPrincipal.objects.create(nombre=nombre, url_name=slug, orden=orden)

        if request.FILES.get('imagen'):
            _save_principal_image(prin, request.FILES['imagen'])

        messages.success(request, 'Categoría creada correctamente.')
        return redirect('panel_categorias')

    return render(request, 'panel/categoria_form.html', {'seccion': None, 'principal': None})

@staff_required
def categoria_edit(request, pk):
    sec = get_object_or_404(SeccionCategoria, pk=pk)
    prin = _principal_by_orden(sec.orden)

    if request.method == 'POST':
        nombre = (request.POST.get('nombre') or '').strip()
        titulo_hero = (request.POST.get('titulo_hero') or '').strip()
        subtitulo_hero = (request.POST.get('subtitulo_hero') or '').strip()

        if not nombre:
            messages.error(request, 'El nombre es requerido.')
            return redirect('panel_categoria_edit', pk=pk)

        if SeccionCategoria.objects.filter(nombre__iexact=nombre).exclude(pk=pk).exists():
            messages.warning(request, f'La categoría "{nombre}" ya existe.')
            return redirect('panel_categoria_edit', pk=pk)

        # Actualizar campos (incluyendo Hero)
        sec.nombre = nombre
        sec.titulo_hero = titulo_hero or nombre  # Default al nombre si está vacío
        sec.subtitulo_hero = subtitulo_hero
        sec.save(update_fields=['nombre', 'titulo_hero', 'subtitulo_hero'])

        # Actualizar CategoriaPrincipal (solo nombre/url)
        if prin:
            prin.nombre = nombre
            if not prin.url_name:
                prin.url_name = slugify(nombre)[:50]
            prin.save(update_fields=['nombre', 'url_name'])

        messages.success(request, 'Categoría actualizada.')
        return redirect('panel_categorias')

    return render(request, 'panel/categoria_edit.html', {'seccion': sec, 'principal': prin})

# =========================
# Pedidos
# =========================
@staff_required
def pedidos_list(request):
    estado = request.GET.get('estado', '')
    ordenar = request.GET.get('orden', '-fecha_creacion')
    search_query = (request.GET.get('search') or '').strip()

    pedidos = Pedido.objects.select_related('estado', 'usuario').order_by(ordenar)

    if estado:
        pedidos = pedidos.filter(estado__nombre__iexact=estado)

    if search_query:
        term = search_query.lstrip('#')
        pedidos = pedidos.filter(
            Q(codigo__icontains=term) |
            Q(usuario__email__icontains=term) |
            Q(usuario__username__icontains=term) |
            Q(usuario__first_name__icontains=term) |
            Q(usuario__last_name__icontains=term)
        )

    estados = EstadoPedido.objects.order_by('orden')

    return render(
        request,
        'panel/pedidos_list.html',
        {
            'pedidos': pedidos[:200],
            'estados': estados,
            'estado_sel': estado,
            'orden': ordenar,
            'search_query': search_query,
        }
    )

@staff_required
def pedido_detalle(request, codigo):
    pedido = get_object_or_404(
        Pedido.objects.select_related('estado', 'usuario').prefetch_related('detalles__producto'),
        codigo=codigo
    )
    estados = EstadoPedido.objects.order_by('orden', 'nombre')
    return render(request, 'panel/pedido_detalle.html', {'pedido': pedido, 'estados': estados})
