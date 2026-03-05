from datetime import timedelta
from django.contrib.auth.models import AbstractUser, PermissionsMixin
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from django.conf import settings
from django.db import models
from django.utils import timezone
from django.db.models.signals import post_save
from django.dispatch import receiver


class CustomUser(AbstractUser, PermissionsMixin):
    email = models.EmailField(
        _('correo electrónico'),
        unique=True,
        error_messages={'unique': _("Este correo electrónico ya está registrado.")},
    )
    is_staff = models.BooleanField(
        _('staff status'), default=False,
        help_text=_('Designa si el usuario puede iniciar sesión en el sitio de administración.'),
    )
    is_active = models.BooleanField(
        _('active'), default=True,
        help_text=_('Desmarca esta opción en lugar de eliminar la cuenta.'),
    )
    date_joined = models.DateTimeField(_('date joined'), auto_now_add=True)
    last_login = models.DateTimeField(_('last login'), auto_now=True, null=True, blank=True)

    class Meta:
        verbose_name = _('usuario')
        verbose_name_plural = _('usuarios')
        ordering = ['-date_joined']
        indexes = [models.Index(fields=['email'])]

    def clean(self):
        super().clean()
        if CustomUser.objects.filter(email=self.email).exclude(pk=self.pk).exists():
            raise ValidationError({'email': _('Este correo electrónico ya está registrado')})

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.username

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}".strip()


# --- Perfil de usuario (DEBE vivir en la app usuarios) ---
from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver

class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="profile")
    phone = models.CharField(max_length=20, blank=True, null=True)
    birth_date = models.DateField(null=True, blank=True)
    address = models.TextField(blank=True, null=True)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)

    class Meta:
        # Si antes ya existía la tabla en 'pedidos', reutilizamos el mismo nombre para no perder datos
        db_table = 'pedidos_profile'
        # (opcional) añade índices si quieres:
        # indexes = [models.Index(fields=['user'])]

    def __str__(self):
        return f'Perfil de {self.user.username}'

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_or_update_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
    else:
        if not hasattr(instance, 'profile'):
            Profile.objects.create(user=instance)
        instance.profile.save()


class PasswordResetCode(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='password_reset_codes'
    )
    code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    used = models.BooleanField(default=False)

    class Meta:
        indexes = [
            models.Index(fields=['user']),
            models.Index(fields=['code', 'used']),
            models.Index(fields=['created_at']),
        ]

    def is_expired(self):
        return timezone.now() > self.created_at + timedelta(minutes=15)

    def __str__(self):
        return f"ResetCode({self.user}, {self.code}, used={self.used})"
