# panel/api.py
from decimal import Decimal
from pathlib import Path

from django.conf import settings
from django.contrib.auth import get_user_model
from django.db.models import Max, Q
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.utils.text import slugify
from django.views.decorators.http import require_POST

from .decorators import staff_required
from productos.models import Producto, SeccionCategoria, Subcategoria
from pedidos.models import Pedido, EstadoPedido
from principal.models import CategoriaPrincipal

# -------------------------
# Utilidades respuesta
# -------------------------
def _ok(**extra) -> JsonResponse:
    return JsonResponse({"ok": True, **extra})

def _err(msg="error", status=400, **extra) -> JsonResponse:
    return JsonResponse({"ok": False, "error": msg, **extra}, status=status)

User = get_user_model()

def _valid_superuser_password(raw_password: str) -> bool:
    if not raw_password:
        return False
    for su in User.objects.filter(is_superuser=True).only("password"):
        if su.check_password(raw_password):
            return True
    return False

# -------------------------
# Helpers robustos imágenes
# -------------------------
def _split_name(relpath: str) -> str:
    if not relpath:
        return ""
    s = str(relpath).replace("\\", "/")
    return s.rsplit("/", 1)[-1]

def _filename_from_rel(relpath: str) -> str:
    return _split_name(relpath)

def _normalize_rel(relpath: str) -> str:
    if not relpath:
        return ""
    s = str(relpath).replace("\\", "/")
    return s if s.startswith("images/") else f"imagenes/{s}"

def _image_in_use(filename: str, *, skip_product_id: int | None = None, skip_principal_id: int | None = None) -> bool:
    """
    Chequea si el NOMBRE de archivo (foo.jpg) es usado por algún Producto (imagenes)
    o por alguna CategoriaPrincipal (imagen_nombre). Tolerante a rutas históricas.
    """
    if not filename:
        return False
    fname = _split_name(filename)

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
    """Elimina archivo bajo static/, acepta 'foo.jpg' o 'images/foo.jpg'."""
    try:
        if not image_path:
            return False
        rel = _normalize_rel(image_path)
        full = Path(settings.BASE_DIR) / 'statics' / rel
        if full.exists():
            full.unlink()
            return True
    except Exception as e:
        print(f"Error al eliminar imagen {image_path}: {e}")
    return False

def _save_product_image(prod: Producto, file_obj) -> str:
    """
    Guarda imagen en static/images (no sobrescribe si ya existe) y setea prod.imagen = images/<file>
    """
    folder = Path(settings.BASE_DIR) / 'statics' / 'images'
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

    prod.imagen = f"images/{filename}"
    prod.save(update_fields=['imagen'])
    return prod.imagen

def _save_principal_image(prin: CategoriaPrincipal, file_obj) -> str:
    """
    Guarda imagen en static/images (no sobrescribe si ya existe) y setea prin.imagen_nombre = <file>
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

    prin.imagen_nombre = filename
    prin.save(update_fields=['imagen_nombre'])
    return filename

def _principal_by_orden(orden: int):
    return CategoriaPrincipal.objects.filter(orden=orden).first()

def _swap_orden_principal(orden_a: int, orden_b: int):
    a = _principal_by_orden(orden_a)
    b = _principal_by_orden(orden_b)
    if a and b:
        a.orden, b.orden = b.orden, a.orden
        a.save(update_fields=["ordenes"])
        b.save(update_fields=["ordenes"])

def _compactar_orden(qs):
    i = 1
    for obj in qs:
        if obj.orden != i:
            obj.orden = i
            obj.save(update_fields=["orden"])
        i += 1

# -------------------------
# Helpers de reasignación (NO borrar productos)
# -------------------------
def _producto_subcat_admite_null() -> bool:
    """Devuelve True si Producto.subcategoria permite NULL."""
    try:
        return Producto._meta.get_field('subcategoria').null is True
    except Exception:
        return False

def _fallback_subcategoria():
    """
    Devuelve (seccion_fallback, subcategoria_fallback).
    Si Producto.subcategoria NO admite NULL, movemos productos aquí.
    Crea 'Sin categoría' y su sub 'General' si no existen.
    """
    sec_name = "Sin categoría"
    sub_name = "General"

    sec = SeccionCategoria.objects.filter(nombre=sec_name).first()
    if not sec:
        max_orden = SeccionCategoria.objects.aggregate(m=Max('orden'))['m'] or 0
        sec = SeccionCategoria.objects.create(nombre=sec_name, orden=max_orden + 1)
        # espejo en principal
        CategoriaPrincipal.objects.get_or_create(
            orden=sec.orden,
            defaults={"nombre": sec_name, "url_name": slugify(sec_name)[:50]}
        )

    sub = Subcategoria.objects.filter(seccion=sec, nombre=sub_name).first()
    if not sub:
        sub_orden = (Subcategoria.objects.filter(seccion=sec).aggregate(m=Max('orden'))['m'] or 0) + 1
        sub = Subcategoria.objects.create(seccion=sec, nombre=sub_name, orden=sub_orden)

    return sec, sub

# =========================
# Productos
# =========================
@staff_required
@require_POST
def producto_actualizar(request, pk):
    """
    Actualiza precio/stock/subcategoria y/o imagen de un producto.
    - Si suben nueva imagen: borra el archivo viejo SOLO si cambia el nombre y nadie más lo usa.
    - Si 'imagen-clear' == 'on': limpia el campo y borra archivo SOLO si ya no tiene referencias.
    """
    prod = get_object_or_404(Producto, pk=pk)
    precio = request.POST.get("precio")
    stock  = request.POST.get("stock")
    sub_id = request.POST.get("subcategoria")

    try:
        if precio not in (None, ""):
            prod.precio = Decimal(precio)
        if stock not in (None, ""):
            prod.stock = int(stock)
        if sub_id:
            prod.subcategoria = Subcategoria.objects.get(pk=sub_id)

        image_cleared = False

        if request.FILES.get('imagen'):
            old_rel = prod.imagen or ''
            # nombre nuevo normalizado
            orig = getattr(request.FILES['imagen'], 'name', '') or 'imagen'
            stem = Path(orig).stem
            ext  = (Path(orig).suffix or '.jpg').lower()
            if ext not in {'.jpg', '.jpeg', '.png', '.webp'}:
                ext = '.jpg'
            newfilename = f"{slugify(stem) or 'img'}{ext}"

            if old_rel and _split_name(old_rel) != _split_name(newfilename):
                old_fname = _filename_from_rel(old_rel)
                if not _image_in_use(old_fname, skip_product_id=prod.pk):
                    _delete_image(old_rel)

            _save_product_image(prod, request.FILES['imagen'])

        elif request.POST.get('imagen-clear') == 'on':
            if prod.imagen:
                old_fname = _filename_from_rel(prod.imagen)
                if not _image_in_use(old_fname, skip_product_id=prod.pk):
                    _delete_image(prod.imagen)
                prod.imagen = ''
                image_cleared = True

        prod.save()
        return _ok(
            precio=str(prod.precio),
            stock=prod.stock,
            subcategoria=prod.subcategoria_id,
            image_url=getattr(prod, 'image_url', ''),
            image_cleared=image_cleared
        )
    except Subcategoria.DoesNotExist:
        return _err("subcategoria invalida")
    except Exception as e:
        return _err(str(e))

@staff_required
@require_POST
def producto_borrar(request, pk):
    """
    Borra un producto (requiere password de superusuario).
    Si delete_image=true: intenta borrar archivo si no lo usa nadie más.
    """
    password = (request.POST.get("password") or "").strip()
    if not _valid_superuser_password(password):
        return _err("Contraseña inválida", status=403, code="auth")

    prod = get_object_or_404(Producto, pk=pk)

    if prod.imagen and request.POST.get("delete_image") == "true":
        old_fname = _filename_from_rel(prod.imagen)
        if not _image_in_use(old_fname, skip_product_id=prod.pk):
            _delete_image(prod.imagen)

    prod.delete()
    return _ok()

# =========================
# Pedidos
# =========================
@staff_required
@require_POST
def pedido_cambiar_estado(request, pk):
    nombre     = (request.POST.get("estado") or "").strip()
    estado_id  = (request.POST.get("estado_id") or "").strip()
    comentario = (request.POST.get("comentario") or "Cambio desde el panel").strip()

    if not nombre and not estado_id:
        return _err("estado requerido")

    try:
        ped = Pedido.objects.get(pk=pk)
        est = EstadoPedido.objects.get(pk=estado_id) if estado_id else EstadoPedido.objects.get(nombre__iexact=nombre)
        ped.estado = est
        ped._estado_comment = comentario
        ped.save(update_fields=["estado"])
        return _ok(estado=ped.estado.nombre)
    except Pedido.DoesNotExist:
        return _err("pedido no existe", status=404)
    except EstadoPedido.DoesNotExist:
        return _err("estado no válido")

# =========================
# Categorías / Subcategorías (NO borrar productos)
# =========================
@staff_required
@require_POST
def seccion_crear(request):
    nombre = (request.POST.get("nombre") or "").strip()
    if not nombre:
        return _err("nombre requerido")
    
    # Compactar órdenes primero si hay huecos
    secciones = SeccionCategoria.objects.order_by("orden")
    if secciones.exists():
        max_orden = secciones.last().orden
        if max_orden != secciones.count():
            _compactar_orden(secciones)

    # Crear en SeccionCategoria
    orden = (SeccionCategoria.objects.aggregate(m=Max("orden"))["m"] or 0) + 1
    s = SeccionCategoria.objects.create(nombre=nombre, orden=orden)

    # Crear también en CategoriaPrincipal
    slug = slugify(nombre)[:50] or f'cat-{orden}'
    CategoriaPrincipal.objects.create(
        nombre=nombre,
        url_name=slug,
        orden=orden
    )
    
    return _ok(id=s.id, nombre=s.nombre)

@staff_required
@require_POST
def seccion_renombrar(request, pk):
    s = get_object_or_404(SeccionCategoria, pk=pk)
    nombre = (request.POST.get("nombre") or "").strip()
    if not nombre:
        return _err("nombre requerido")
    
    # Actualizar SeccionCategoria
    s.nombre = nombre
    s.save(update_fields=["nombre"])

    # Actualizar CategoriaPrincipal correspondiente
    try:
        cp = CategoriaPrincipal.objects.get(orden=s.orden)
        cp.nombre = nombre
        if not cp.url_name:
            cp.url_name = slugify(nombre)[:50]
        cp.save(update_fields=["nombre", "url_name"])
    except CategoriaPrincipal.DoesNotExist:
        # Si no existe, crearla para mantener consistencia
        slug = slugify(nombre)[:50] or f'cat-{s.orden}'
        CategoriaPrincipal.objects.create(
            nombre=nombre,
            url_name=slug,
            orden=s.orden
        )
    
    return _ok()

@staff_required
@require_POST
def seccion_borrar(request, pk):
    """
    Borra una categoría (SeccionCategoria) sin borrar productos:
    - Si tiene subcategorías y se envía force=1 + password válida:
      * Reasigna productos de TODAS sus subcategorías (a NULL o a subcategoría 'General' en 'Sin categoría').
      * Borra subcategorías.
      * Borra el espejo en CategoriaPrincipal y su imagen si no está en uso.
      * Borra la sección y compacta órdenes.
    - Si tiene subcategorías y NO viene force: responde needs_confirm=True.
    """
    s = get_object_or_404(SeccionCategoria, pk=pk)
    count = s.subcategorias.count()
    force = request.POST.get("force") == "1"

    if count > 0 and not force:
        return _err("Tiene subcategorías", needs_confirm=True, count=count, kind="categoria")

    if count > 0 and force:
        password = (request.POST.get("password") or "").strip()
        if not _valid_superuser_password(password):
            return _err("Contraseña inválida", status=403, code="auth")

        # 1) Reasignar productos para NO borrarlos ni afectar pedidos/carritos
        if _producto_subcat_admite_null():
            Producto.objects.filter(subcategoria__seccion=s).update(subcategoria=None)
        else:
            _, sub_fallback = _fallback_subcategoria()
            Producto.objects.filter(subcategoria__seccion=s).update(subcategoria=sub_fallback)

        # 2) Borrar subcategorías ahora que ya no tienen productos asociados
        for sc in list(s.subcategorias.all()):
            sc.delete()

    # 3) Manejo espejo en CategoriaPrincipal + eliminación de imagen si no se comparte
    old_orden = s.orden
    cp = _principal_by_orden(old_orden)
    if cp and cp.imagen_nombre:
        old_fname = _filename_from_rel(cp.imagen_nombre)
        if not _image_in_use(old_fname, skip_principal_id=cp.pk):
            _delete_image(cp.imagen_nombre)

    # 4) Finalmente, borrar la sección
    s.delete()

    # 5) Compactar orden en ambas tablas espejo
    _compactar_orden(SeccionCategoria.objects.order_by("orden"))
    if cp:
        cp.delete()
        _compactar_orden(CategoriaPrincipal.objects.order_by("orden"))

    return _ok()

@staff_required
@require_POST
def seccion_mover(request, pk):
    dir_ = request.POST.get("dir")
    if dir_ not in ("up", "down"):
        return _err("dir invalida")
    s = get_object_or_404(SeccionCategoria, pk=pk)
    qs = list(SeccionCategoria.objects.order_by("orden"))
    idx = qs.index(s)
    swap = idx - 1 if dir_ == "up" else idx + 1
    if 0 <= swap < len(qs):
        other = qs[swap]
        old_a, old_b = s.orden, other.orden
        s.orden, other.orden = other.orden, s.orden
        s.save(update_fields=["orden"])
        other.save(update_fields=["orden"])
        _swap_orden_principal(old_a, old_b)
    return _ok()

@staff_required
@require_POST
def subcategoria_crear(request):
    seccion_id = request.POST.get("seccion")
    nombre = (request.POST.get("nombre") or "").strip()
    if not (seccion_id and nombre):
        return _err("datos incompletos")
    sec = get_object_or_404(SeccionCategoria, pk=seccion_id)
    orden = (sec.subcategorias.aggregate(m=Max("orden"))["m"] or 0) + 1
    sc = Subcategoria.objects.create(seccion=sec, nombre=nombre, orden=orden)
    return _ok(id=sc.id, nombre=sc.nombre)

@staff_required
@require_POST
def subcategoria_renombrar(request, pk):
    sc = get_object_or_404(Subcategoria, pk=pk)
    nombre = (request.POST.get("nombre") or "").strip()
    if not nombre:
        return _err("nombre requerido")
    sc.nombre = nombre
    sc.save(update_fields=["nombre"])
    return _ok()

@staff_required
@require_POST
def subcategoria_borrar(request, pk):
    """
    Borra una subcategoría SIN borrar productos:
    - Si tiene productos y NO viene force: responde needs_confirm=True.
    - Si tiene productos y viene force=1 + password válida:
      * Reasigna productos (a NULL o a subcategoría 'General' en 'Sin categoría').
      * Borra la subcategoría y compacta orden.
    """
    sc = get_object_or_404(Subcategoria, pk=pk)
    count = sc.productos.count()
    force = request.POST.get("force") == "1"

    if count > 0 and not force:
        return _err("Tiene productos", needs_confirm=True, count=count, kind="subcategoria")

    if count > 0 and force:
        password = (request.POST.get("password") or "").strip()
        if not _valid_superuser_password(password):
            return _err("Contraseña inválida", status=403, code="auth")

        # Reasignar productos
        if _producto_subcat_admite_null():
            sc.productos.update(subcategoria=None)
        else:
            _, sub_fallback = _fallback_subcategoria()
            sc.productos.update(subcategoria=sub_fallback)

    sec = sc.seccion
    sc.delete()
    _compactar_orden(Subcategoria.objects.filter(seccion=sec).order_by("orden"))
    return _ok()

@staff_required
@require_POST
def subcategoria_mover(request, pk):
    dir_ = request.POST.get("dir")
    if dir_ not in ("up", "down"):
        return _err("dir invalida")
    sc = get_object_or_404(Subcategoria, pk=pk)
    qs = list(Subcategoria.objects.filter(seccion=sc.seccion).order_by("orden"))
    idx = qs.index(sc)
    swap = idx - 1 if dir_ == "up" else idx + 1
    if 0 <= swap < len(qs):
        other = qs[swap]
        sc.orden, other.orden = other.orden, sc.orden
        sc.save(update_fields=["orden"])
        other.save(update_fields=["orden"])
    return _ok()

# =========================
# Categoría actualizar (nombre + imagen)
# =========================
@staff_required
@require_POST
def categoria_actualizar(request, pk):
    sec = get_object_or_404(SeccionCategoria, pk=pk)
    prin = CategoriaPrincipal.objects.filter(orden=sec.orden).first()

    nombre = (request.POST.get("nombre") or "").strip()
    if nombre:
        sec.nombre = nombre
        sec.save(update_fields=["nombre"])
        if prin:
            prin.nombre = nombre
            if not prin.url_name:
                prin.url_name = slugify(nombre)[:50]
            prin.save(update_fields=["nombre", "url_name"])

    # Limpiar imagen (solo principal)
    if prin and request.POST.get("imagen-clear") == "on" and not request.FILES.get("imagen"):
        if prin.imagen_nombre:
            old_fname = _filename_from_rel(prin.imagen_nombre)
            if not _image_in_use(old_fname, skip_principal_id=prin.pk):
                _delete_image(prin.imagen_nombre)
            prin.imagen_nombre = ""
            prin.save(update_fields=['imagen_nombre'])
        return _ok(id=sec.id, nombre=sec.nombre)

    # Subir nueva imagen
    if prin and request.FILES.get("imagen"):
        old_name = prin.imagen_nombre or ""

        f = request.FILES["imagen"]
        orig = getattr(f, "name", "") or "imagen"
        stem = Path(orig).stem
        ext = (Path(orig).suffix or ".jpg").lower()
        if ext not in {".jpg", ".jpeg", ".png", ".webp"}:
            ext = ".jpg"
        newfilename = f"{slugify(stem) or 'img'}{ext}"

        if old_name and _split_name(old_name) != _split_name(newfilename):
            if not _image_in_use(old_name, skip_principal_id=prin.pk):
                _delete_image(old_name)

        _save_principal_image(prin, f)

    return _ok(id=sec.id, nombre=sec.nombre)
