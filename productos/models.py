from decimal import Decimal
from django.conf import settings
from django.core.validators import MinValueValidator
from django.db import models
from django.utils.translation import gettext_lazy as _
import secrets

User = settings.AUTH_USER_MODEL
ALFABETO = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"  # sin 0,1, O, I para evitar confusiones


def generar_codigo_producto(prefix="PRD", longitud=8):
    return f"{prefix}-{''.join(secrets.choice(ALFABETO) for _ in range(longitud))}"


class SeccionCategoria(models.Model):
    nombre = models.CharField(max_length=100, unique=True, verbose_name=_("Nombre"))
    imagen_hero = models.CharField(verbose_name=_("Imagen Hero (URL o ruta)"), max_length=200, default='default_hero.jpg')
    titulo_hero = models.CharField(verbose_name=_("Título Hero"), max_length=200, default='Título Hero')
    subtitulo_hero = models.TextField(verbose_name=_("Subtítulo Hero"), default='Subtítulo descriptivo')
    orden = models.PositiveIntegerField(default=0, verbose_name=_("Orden"))

    class Meta:
        verbose_name = _("Sección de Categoría")
        verbose_name_plural = _("Secciones de Categoría")
        ordering = ['orden']

    def __str__(self):
        return self.nombre


class Subcategoria(models.Model):
    seccion = models.ForeignKey(SeccionCategoria, on_delete=models.CASCADE, related_name='subcategorias', verbose_name=_("Sección"))
    nombre = models.CharField(max_length=100, verbose_name=_("Nombre"))
    imagen = models.CharField(verbose_name=_("Imagen (URL o ruta)"), max_length=200, default='default_subcat.jpg')
    orden = models.PositiveIntegerField(default=0, verbose_name=_("Orden"))

    class Meta:
        verbose_name = _("Subcategoría")
        verbose_name_plural = _("Subcategorías")
        ordering = ['orden']
        unique_together = ['seccion', 'nombre']
        indexes = [models.Index(fields=['seccion', 'orden'])]

    def __str__(self):
        return f"{self.seccion.nombre} - {self.nombre}"


class Producto(models.Model):
    class BadgeChoices(models.TextChoices):
        NUEVO = 'nuevo', _('Nuevo')
        POPULAR = 'popular', _('Popular')
        OFERTA = 'oferta', _('Oferta')
        NINGUNO = 'ninguno', _('Ninguno')

    codigo = models.CharField("Código", max_length=20, unique=True, blank=True, null=True)
    subcategoria = models.ForeignKey(Subcategoria, on_delete=models.CASCADE, related_name='productos', verbose_name=_("Subcategoría"))
    nombre = models.CharField(max_length=200, verbose_name=_("Nombre"))
    descripcion = models.TextField(verbose_name=_("Descripción"))
    precio = models.DecimalField(max_digits=10, decimal_places=2, verbose_name=_("Precio"), validators=[MinValueValidator(0.01)])
    imagen = models.CharField("Imagen (URL o ruta)", max_length=200)
    badge = models.CharField(verbose_name=_("Etiqueta"), max_length=10, choices=BadgeChoices.choices, default=BadgeChoices.NINGUNO)
    stock = models.PositiveIntegerField(default=0, verbose_name=_("Stock"), validators=[MinValueValidator(0)])
    orden = models.PositiveIntegerField(default=0, verbose_name=_("Orden"))
    fecha_creacion = models.DateTimeField(auto_now_add=True, verbose_name=_("Fecha de creación"), null=True, blank=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True, verbose_name=_("Fecha de actualización"), null=True, blank=True)

    class Meta:
        verbose_name = _("Producto")
        verbose_name_plural = _("Productos")
        ordering = ['orden', 'nombre']
        indexes = [
            models.Index(fields=['codigo']),
            models.Index(fields=['nombre']),
            models.Index(fields=['subcategoria']),
            models.Index(fields=['precio'])
        ]

    def __str__(self):
        return f"{self.nombre} (Stock: {self.stock})"

    @property
    def image_url(self):
        from django.conf import settings
        if not self.imagen:
            return f"{settings.STATIC_URL}images/default_product.jpg"
        val = str(self.imagen).strip()
        if val.startswith(('http://', 'https://', '/')):
            return val
        if val.startswith(('images/', 'images\\')):
            return f"{settings.STATIC_URL}{val}"
        return f"{settings.STATIC_URL}images/{val}"

    def disponible(self):
        return self.stock > 0

    def reducir_stock(self, cantidad):
        if cantidad <= self.stock:
            self.stock -= cantidad
            self.save()
            return True
        return False

    def save(self, *args, **kwargs):
        if not self.codigo:
            for _ in range(12):
                cod = generar_codigo_producto()
                if not type(self).objects.filter(codigo=cod).exists():
                    self.codigo = cod
                    break
        super().save(*args, **kwargs)


class Carrito(models.Model):
    usuario = models.OneToOneField(User, on_delete=models.CASCADE, related_name='carrito', verbose_name=_("Usuario"))
    fecha_creacion = models.DateTimeField(auto_now_add=True, verbose_name=_("Fecha de creación"))
    fecha_actualizacion = models.DateTimeField(auto_now=True, verbose_name=_("Fecha de actualización"))

    class Meta:
        verbose_name = _("Carrito de compras")
        verbose_name_plural = _("Carritos de compras")
        ordering = ['-fecha_actualizacion']

    def __str__(self):
        from django.contrib.auth import get_user_model
        U = get_user_model()
        user = U.objects.filter(pk=self.usuario_id).first()
        return f"Carrito de {user.username if user else self.usuario_id}"

    @property
    def total_items(self):
        return self.items.aggregate(total=models.Sum('cantidad'))['total'] or 0

    @property
    def subtotal(self):
        return self.items.aggregate(total=models.Sum(models.F('cantidad') * models.F('producto__precio')))['total'] or Decimal('0.00')

    @property
    def total(self):
        return self.subtotal * Decimal('1.05')

    def vaciar(self):
        self.items.all().delete()
        self.save()

    def agregar_producto(self, producto, cantidad=1):
        item, created = ItemCarrito.objects.get_or_create(carrito=self, producto=producto, defaults={'cantidad': cantidad})
        if not created:
            item.cantidad += cantidad
            item.save()
        return item


class ItemCarrito(models.Model):
    carrito = models.ForeignKey(Carrito, on_delete=models.CASCADE, related_name='items', verbose_name=_("Carrito"))
    producto = models.ForeignKey(Producto, on_delete=models.PROTECT, verbose_name=_("Producto"))
    cantidad = models.PositiveIntegerField(default=1, verbose_name=_("Cantidad"), validators=[MinValueValidator(1)])
    fecha_agregado = models.DateTimeField(auto_now_add=True, verbose_name=_("Fecha de agregado"))

    class Meta:
        verbose_name = _("Item de carrito")
        verbose_name_plural = _("Items de carrito")
        unique_together = ('carrito', 'producto')
        ordering = ['-fecha_agregado']
        indexes = [models.Index(fields=['carrito']), models.Index(fields=['producto'])]

    def __str__(self):
        return f"{self.cantidad}x {self.producto.nombre} en carrito"

    @property
    def subtotal(self):
        return self.cantidad * self.producto.precio
