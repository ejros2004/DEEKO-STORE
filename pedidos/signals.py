from django.db.models.signals import post_migrate, pre_save, post_save
from django.dispatch import receiver
from django.utils import timezone
from .models import EstadoPedido, Pedido, HistorialEstado

@receiver(post_migrate)
def ensure_default_order_statuses(sender, **kwargs):
    """Crea/actualiza los estados de pedido necesarios después de cada migrate"""
    try:
        from .models import EstadoPedido
    except Exception:
        return

    estados = [
        # nombre,        descripcion,                           es_final, orden
        ("CREADO",      "El pedido ha sido creado",            False,    0),
        ("PREPARANDO",  "El pedido ha sido recibido",          False,    1),
        ("EN CAMINO",   "El pedido se está preparando/envío",  False,    2),
        ("ENTREGADO",   "El pedido fue entregado",             True,     3),
        ("CANCELADO",   "Pedido cancelado por el cliente",     True,     99),
    ]

    for nombre, descripcion, es_final, orden in estados:
        obj, _ = EstadoPedido.objects.get_or_create(
            nombre=nombre,
            defaults={
                "descripcion": descripcion,
                "es_final": es_final,
                "orden": orden,
            }
        )
        changed = False
        if obj.descripcion != descripcion:
            obj.descripcion = descripcion
            changed = True
        if obj.es_final != es_final:
            obj.es_final = es_final
            changed = True
        if obj.orden != orden:
            obj.orden = orden
            changed = True
        if changed:
            obj.save()

HIST_MSG = {
    "CREADO":      "Pago recibido. Pedido creado.",
    "PREPARANDO":  "Hemos recibido tu pedido y estamos preparándolo.",
    "EN CAMINO":   "Tu pedido ha salido y va en camino.",
    "ENTREGADO":   "Pedido entregado. ¡Gracias por tu compra!",
    "CANCELADO":   "Pedido cancelado por el cliente.",
}

@receiver(pre_save, sender=Pedido)
def _track_old_estado(sender, instance: Pedido, **kwargs):
    """Guarda el estado anterior para compararlo en post_save"""
    if instance.pk:
        try:
            prev = Pedido.objects.only("estado_id").get(pk=instance.pk)
            instance._old_estado_id = prev.estado_id
        except Pedido.DoesNotExist:
            instance._old_estado_id = None
    else:
        instance._old_estado_id = None

@receiver(post_save, sender=Pedido)
def _registrar_historial(sender, instance: Pedido, created, **kwargs):
    """Crea entrada en historial al crear o al cambiar de estado"""
    nombre_actual = (instance.estado.nombre or "").upper()
    ahora = timezone.now()

    if created:
        HistorialEstado.objects.create(
            pedido=instance,
            estado=instance.estado,
            comentario=HIST_MSG.get("CREADO", "Pedido creado."),
            fecha=ahora,
        )
        return

    old_id = getattr(instance, "_old_estado_id", None)
    if old_id and old_id != instance.estado_id:
        comentario = HIST_MSG.get(
            nombre_actual,
            f"Estado actualizado a {instance.estado.nombre}."
        )
        extra = getattr(instance, "_hist_extra", "")
        if extra:
            comentario = f"{comentario} {extra}"

        HistorialEstado.objects.create(
            pedido=instance,
            estado=instance.estado,
            comentario=comentario,
            fecha=ahora,
        )

from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.utils.translation import gettext_lazy as _
from django.shortcuts import get_object_or_404, redirect
from .models import Pedido, EstadoPedido, HistorialEstado

@login_required
def cancelar_pedido(request, codigo_pedido):
    pedido = get_object_or_404(Pedido, codigo=codigo_pedido, usuario=request.user)

    if request.method != 'POST':
        return redirect('detalle_pedido', codigo_pedido=pedido.codigo)

    motivo = (request.POST.get('motivo') or '').strip()

    # Regla: solo CREADO o PREPARANDO
    nombre_estado = (pedido.estado.nombre or "").upper()
    if nombre_estado not in {"CREADO", "PREPARANDO"}:
        messages.error(request, _("No se puede cancelar este pedido."))
        return redirect('detalle_pedido', codigo_pedido=pedido.codigo)

    estado_cancelado = EstadoPedido.objects.filter(nombre__iexact="CANCELADO").first()
    if not estado_cancelado:
        messages.error(request, _("No existe el estado CANCELADO."))
        return redirect('detalle_pedido', codigo_pedido=pedido.codigo)

    # Para que el signal añada comentario
    pedido._hist_extra = motivo
    pedido.estado = estado_cancelado
    pedido.save(update_fields=["estado", "fecha_actualizacion"])

    # Fallback: si por alguna razón el signal no creó historial, lo creamos aquí.
    ya_registrado = pedido.historial_estados.filter(estado=estado_cancelado).exists()
    if not ya_registrado:
        comentario = "Pedido cancelado por el cliente."
        if motivo:
            comentario = f"{comentario} {motivo}"
        HistorialEstado.objects.create(
            pedido=pedido,
            estado=estado_cancelado,
            comentario=comentario
        )

    # Devolver stock
    for det in pedido.detalles.select_related('producto').all():
        prod = det.producto
        prod.stock = (prod.stock or 0) + det.cantidad
        prod.save(update_fields=['stock'])

    messages.success(request, _("Pedido cancelado correctamente."))
    return redirect('detalle_pedido', codigo_pedido=pedido.codigo)
