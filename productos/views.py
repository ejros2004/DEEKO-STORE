import json
import logging
from decimal import Decimal
import re

from django.utils import timezone
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponseBadRequest  # (no usado, lo dejamos por compatibilidad)
from django.db import transaction
from django.utils.translation import gettext_lazy as _
from django.template.loader import get_template
from django.template import TemplateDoesNotExist
from django.views.decorators.http import require_POST

from django.http import HttpResponseNotFound
from django.shortcuts import render, redirect
from django.utils.text import slugify
from django.db.models import Prefetch
from principal.models import CategoriaPrincipal

from .models import SeccionCategoria, Producto, Carrito, ItemCarrito
from pedidos.models import Pago
from pedidos.models import Pedido, DetallePedido, EstadoPedido, Factura

logger = logging.getLogger(__name__)


# =====================
# Helpers de categorías
# =====================
def _slug(nombre: str) -> str:
    return slugify(nombre)[:50] or 'cat'

def _get_seccion_by_slug(slug: str) -> SeccionCategoria:
    """
    Resuelve una SeccionCategoria a partir del slug de la URL.
    Reglas:
      - Coincidencia directa por slugify(nombre).
      - Si no hay match, buscamos en CategoriaPrincipal por url_name o por nombre,
        y tratamos de ubicar la sección por nombre (no por 'orden').
      - Como último recurso, fuzzy match por slug del nombre (para typos).
    """
    import difflib

    target = (slug or '').lower().replace('_', '-')  # soporta slugs viejos con underscore

    # 1) Coincidencia directa por nombre -> slug
    secciones = list(SeccionCategoria.objects.all().only('id', 'nombre'))
    for s in secciones:
        if slugify(s.nombre) == target:
            return s

    # 2) Usar CategoriaPrincipal como pista (NUNCA por 'orden')
    cp = (CategoriaPrincipal.objects.filter(url_name__iexact=target).first() or
          CategoriaPrincipal.objects.filter(nombre__iexact=slug.replace('-', ' ')).first())
    if cp:
        # a) nombre exacto (case-insensitive)
        for s in secciones:
            if s.nombre.strip().lower() == cp.nombre.strip().lower():
                return s
        # b) slug de nombre
        cp_name_slug = slugify(cp.nombre)
        for s in secciones:
            if slugify(s.nombre) == cp_name_slug:
                return s

    # 3) Fuzzy match por slug del nombre (para typos tipo 'tegnologia')
    slugs = [slugify(s.nombre) for s in secciones]
    match = difflib.get_close_matches(target, slugs, n=1, cutoff=0.8)
    if match:
        idx = slugs.index(match[0])
        return secciones[idx]

    raise SeccionCategoria.DoesNotExist

# =====================
# API carrito (front)
# =====================
@csrf_exempt
def update_cart(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body) if request.content_type == 'application/json' else request.POST
            cart_data = data.get('cart', [])
            if isinstance(cart_data, str):
                try:
                    cart_data = json.loads(cart_data)
                except json.JSONDecodeError:
                    return JsonResponse({'status': 'error','message': _('Formato de carrito inválido')}, status=400)

            valid_cart = []
            for item in cart_data:
                try:
                    if 'id' in item and 'quantity' in item:
                        product = Producto.objects.get(id=int(item['id']))
                        quantity = int(item['quantity'])
                        if quantity > 0 and quantity <= product.stock:
                            valid_cart.append({
                                'id': product.id,
                                'quantity': quantity,
                                'name': product.nombre,
                                'price': float(product.precio),
                                'image': product.image_url
                            })
                except (ValueError, Producto.DoesNotExist) as e:
                    logger.warning(f"Error procesando item del carrito: {str(e)}")
                    continue

            request.session['cart_data'] = valid_cart
            return JsonResponse({'status': 'success','cart': valid_cart})
        except Exception as e:
            logger.error(f"Error en update_cart: {str(e)}", exc_info=True)
            return JsonResponse({'status': 'error','message': _('Error interno del servidor')}, status=500)
    return JsonResponse({'status': 'error','message': _('Método no permitido')}, status=405)


# =====================
# Checkout / Pago
# =====================
@login_required
def pago(request):
    carrito = getattr(request.user, 'carrito', None)
    if not carrito or carrito.items.count() == 0:
        messages.warning(request, _("No hay productos en tu carrito"))
        return redirect('alimentos')  # o 'principal'

    items_carrito = []
    subtotal = Decimal('0.00')
    for item in carrito.items.select_related('producto').all():
        if item.producto.stock >= item.cantidad and item.cantidad > 0:
            items_carrito.append({
                'id': item.producto.id,
                'name': item.producto.nombre,
                'price': float(item.producto.precio),
                'quantity': item.cantidad,
                'image': item.producto.image_url,
                'product_obj': item.producto
            })
            subtotal += item.producto.precio * item.cantidad

    if not items_carrito:
        messages.warning(request, _("No hay productos válidos en tu carrito"))
        return redirect('alimentos')  # o 'principal'

    envio = subtotal * Decimal('0.05')
    total = subtotal + envio

    context = {
        'cart_items': items_carrito,
        'cart_items_json': json.dumps([{
            'id': item['id'], 'name': item['name'], 'price': item['price'],
            'quantity': item['quantity'], 'image': item['image']
        } for item in items_carrito]),
        'subtotal': f"{subtotal:.2f}",
        'envio': f"{envio:.2f}",
        'total': f"{total:.2f}",
        'user_email': request.user.email
    }
    return render(request, 'pago.html', context)


@login_required
@csrf_exempt
@transaction.atomic
def procesar_pago(request):
    if request.method != 'POST':
        messages.error(request, _("Método no permitido"))
        return redirect('pago')
    try:
        # Solo requeridos mínimos (no guardar CVC/expiry)
        required_fields = ['first_name', 'last_name', 'phone', 'address', 'card_number', 'card_name']
        for field in required_fields:
            if not request.POST.get(field):
                messages.error(request, _(f"El campo {field} es requerido"))
                return redirect('pago')

        # Validación tarjeta en servidor (básica)
        card_number = request.POST['card_number'].replace(' ', '')
        if len(card_number) != 16 or not card_number.isdigit():
            messages.error(request, _("Número de tarjeta inválido"))
            return redirect('pago')

        # Validación opcional de expiry/CVC si el form los envía (no se guardan)
        card_expiry = request.POST.get('card_expiry', '')
        card_cvc = request.POST.get('card_cvc', '')
        if card_expiry and not re.match(r'^\d{2}/\d{2}$', card_expiry):
            messages.error(request, _("Fecha de expiración inválida (MM/AA)"))
            return redirect('pago')
        if card_cvc and (len(card_cvc) != 3 or not card_cvc.isdigit()):
            messages.error(request, _("CVC inválido (3 dígitos requeridos)"))
            return redirect('pago')

        # Carrito del front
        cart_data = json.loads(request.POST.get('cart_data', '[]'))
        if not cart_data:
            messages.error(request, _("El carrito está vacío"))
            return redirect('pago')

        subtotal = Decimal('0.00')
        items_to_update = []
        for item in cart_data:
            product = Producto.objects.get(id=item['id'])
            quantity = int(item['quantity'])
            if product.stock < quantity:
                messages.error(request, _(f"No hay suficiente stock para {product.nombre}"))
                return redirect('pago')
            price = Decimal(str(item['price']))
            subtotal += price * quantity
            items_to_update.append((product, quantity))

        envio = subtotal * Decimal('0.05')
        total = subtotal + envio

        # Estado CREADO
        estado_creado, created = EstadoPedido.objects.get_or_create(
            nombre='CREADO',
            defaults={'descripcion': 'El pedido ha sido creado, pero no procesado', 'es_final': False, 'orden': 1}
        )


        # Pedido
        pedido = Pedido.objects.create(
            usuario=request.user,
            estado=estado_creado,
            subtotal=subtotal,
            envio=envio,
            total=total,
            direccion_envio=request.POST['address'],
            telefono=request.POST['phone'],
            nombre_facturacion=f"{request.POST['first_name']} {request.POST['last_name']}",
            metodo_pago='tarjeta'
        )

        # Detalles + stock
        for product, quantity in items_to_update:
            DetallePedido.objects.create(
                pedido=pedido, producto=product, cantidad=quantity, precio_unitario=product.precio
            )
            product.stock -= quantity
            product.save()

        # Pago (sin expiry ni cvc)
        pago = Pago.objects.create(
        usuario=request.user,
        pedido=pedido,    
        first_name=request.POST['first_name'],
        last_name=request.POST['last_name'],
        email=request.user.email,
        phone=request.POST['phone'],
        address=request.POST['address'],
        card_number=card_number[-4:],
        card_name=request.POST['card_name'],
        total=total,
        subtotal=subtotal,
        envio=envio,
        cart_data=cart_data
    )


        # Factura
        Factura.objects.create(
            pedido=pedido,
            fecha_vencimiento=timezone.now() + timezone.timedelta(days=15)
        )

        # Vaciar carrito server
        if hasattr(request.user, 'carrito'):
            request.user.carrito.vaciar()

        # Guardar id para la confirmación
        request.session['last_pago_id'] = pago.id
        return redirect('confirmacion_pago')

    except Exception as e:
        logger.error(f"Error en procesar_pago: {str(e)}", exc_info=True)
        messages.error(request, _("Ocurrió un error al procesar tu pago. Por favor intenta nuevamente."))
        return redirect('pago')


@login_required
def confirmacion_pago(request):
    pago_id = request.session.get('last_pago_id')
    if not pago_id:
        messages.warning(request, "No hay información de pago reciente")
        return redirect('principal')
    try:
        pago = Pago.objects.get(id=pago_id, usuario=request.user)
        cart_data = pago.cart_data
        if isinstance(cart_data, str):
            cart_data = json.loads(cart_data)

        processed_items = []
        for item in cart_data:
            if isinstance(item, str):
                item = json.loads(item)
            processed_items.append({
                'name': item.get('name', 'Producto sin nombre'),
                'quantity': item.get('quantity', item.get('cantidad', 1)),
                'price': float(item.get('price', item.get('precio', 0))),
                'image': item.get('image', item.get('imagen', '/static/images/default_product.jpg'))
            })

        context = {
            'pago': pago,
            'items_carrito': processed_items,
            'subtotal': float(pago.subtotal),
            'envio': float(pago.envio),
            'total': float(pago.total)
        }
        return render(request, 'confirmacion_pago.html', context)
    except Pago.DoesNotExist:
        messages.error(request, "No se encontró la información del pago")
        return redirect('principal')
    except Exception as e:
        logger.error(f"Error en confirmacion_pago: {str(e)}")
        messages.error(request, "Ocurrió un error al procesar tu pedido")
        return redirect('principal')

# =====================
# Vista dinámica por slug
# =====================
def categoria(request, slug: str):
    """
    Vista de categoría (slug canónico + filtro).
    - Redirige a slug canónico si difiere.
    - Solo muestra subcategorías que tengan productos con stock > 0.
    """
    target = (slug or '').lower().replace('_', '-')
    try:
        seccion = _get_seccion_by_slug(target)
    except SeccionCategoria.DoesNotExist:
        return HttpResponseNotFound("Categoría no encontrada")

    canonical = slugify(seccion.nombre)
    if target != canonical:
        return redirect('productos_categoria', slug=canonical, permanent=True)

    # Prefetch SOLO productos con stock > 0 para cada subcategoría
    subcategorias_qs = seccion.subcategorias.prefetch_related(
        Prefetch('productos', queryset=Producto.objects.filter(stock__gt=0).order_by('orden'))
    )

    # Filtrar: conservar únicamente subcategorías que tengan al menos un producto
    subcategorias = []
    productos_por_subcategoria = {}
    for sc in subcategorias_qs:
        prods = list(sc.productos.all())  # ya viene prefetched con stock>0
        if not prods:
            continue
        subcategorias.append(sc)
        productos_por_subcategoria[sc] = prods

    # Destacados con stock>0 (opcional: mantén tu lógica)
    productos_destacados = (
        Producto.objects
        .filter(subcategoria__seccion=seccion, stock__gt=0)
        .exclude(badge='ninguno')
        .order_by('?')[:5]
    )

    return render(request, 'categoria.html', {
        'seccion': seccion,
        'subcategorias': subcategorias,  # <-- ya vienen filtradas
        'productos_destacados': productos_destacados,
        'productos_por_subcategoria': productos_por_subcategoria,
    })

# =====================
# API carrito (server)
# =====================
@csrf_exempt
@require_POST
def actualizar_carrito(request):
    if not request.user.is_authenticated:
        return JsonResponse({'status': 'error', 'message': 'Usuario no autenticado'}, status=401)
    try:
        data = json.loads(request.body)
        carrito, _ = Carrito.objects.get_or_create(usuario=request.user)

        items_actuales = {str(item.producto_id): item for item in carrito.items.all()}
        items_recibidos = {str(item['producto_id']): item for item in data.get('items', [])}

        # Crear/Actualizar
        for producto_id, item_data in items_recibidos.items():
            try:
                producto = Producto.objects.get(id=producto_id)
                if producto_id in items_actuales:
                    item = items_actuales[producto_id]
                    if item_data['cantidad'] > 0:
                        item.cantidad = item_data['cantidad']
                        item.save()
                    else:
                        item.delete()
                else:
                    ItemCarrito.objects.create(carrito=carrito, producto=producto, cantidad=item_data['cantidad'])
            except Producto.DoesNotExist:
                continue

        # Eliminar los que ya no vienen
        for producto_id in set(items_actuales.keys()) - set(items_recibidos.keys()):
            items_actuales[producto_id].delete()

        return JsonResponse({'status': 'success','total_items': carrito.total_items,'subtotal': float(carrito.subtotal)})
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)}, status=400)


@csrf_exempt
def obtener_carrito(request):
    if not request.user.is_authenticated:
        return JsonResponse({'status': 'error', 'message': 'Usuario no autenticado'}, status=401)
    carrito, _ = Carrito.objects.get_or_create(usuario=request.user)
    items = [{
        'id': item.producto.id,
        'name': item.producto.nombre,
        'price': float(item.producto.precio),
        'quantity': item.cantidad,
        'image': item.producto.image_url,
        'stock': item.producto.stock
    } for item in carrito.items.select_related('producto').all()]
    return JsonResponse({'status': 'success','items': items,'total_items': carrito.total_items,'subtotal': float(carrito.subtotal)})


@csrf_exempt
@require_POST
@login_required
def vaciar_carrito(request):
    try:
        carrito = getattr(request.user, 'carrito', None)
        if not carrito:
            return JsonResponse({'status': 'error', 'message': 'Carrito no encontrado'}, status=404)
        deleted_count, _ = carrito.items.all().delete()
        return JsonResponse({'status': 'success','message': 'Carrito vaciado exitosamente','deleted_count': deleted_count})
    except Exception as e:
        return JsonResponse({'status': 'error','message': str(e)}, status=500)
