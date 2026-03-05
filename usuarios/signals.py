# usuarios/signals.py
import logging
from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from django.db.models import Q

logger = logging.getLogger(__name__)
User = get_user_model()

@receiver(pre_save, sender=User)
def normalize_email_on_save(sender, instance, **kwargs):
    """
    Normaliza el correo antes de guardar para reducir falsos duplicados.
    No lanza excepciones (no rompe el flujo del formulario).
    """
    if not instance.email:
        return
    # Normaliza: quita espacios y baja a minúsculas
    instance.email = instance.email.strip().lower()

    # Solo registra en log si detecta que ya hay otro usuario con ese email
    # (el formulario/modelo serán los que muestren el error de manera amigable)
    exists_other = User.objects.filter(
        Q(email__iexact=instance.email) & ~Q(pk=instance.pk)
    ).exists()

    if exists_other:
        logger.warning(
            "Intento de registrar/actualizar con email ya existente: %s (user_id=%s)",
            instance.email, getattr(instance, "pk", None)
        )
    # Importante: NO devolvemos excepción aquí; dejamos que el form/modelo lo manejen.


@receiver(post_save, sender=User)
def after_user_saved(sender, instance, created, **kwargs):
    """
    Hook para tareas posteriores al guardado: enviar bienvenida, auditar, etc.
    No valida unicidad aquí para evitar errores 500.
    """
    if kwargs.get("raw"):
        # Evita ejecutar durante cargas de fixtures/migraciones
        return

    if created:
        logger.info("Usuario creado: id=%s username=%s email=%s")
