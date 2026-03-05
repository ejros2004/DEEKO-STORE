from decimal import Decimal
from django.conf import settings
from django.core.validators import MinValueValidator
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.db import transaction



class EstadoPedido(models.Model):
    nombre = models.CharField(max_length=50, unique=True, verbose_name=_("Nombre"))
    descripcion = models.TextField(blank=True, verbose_name=_("Descripción"))
    es_final = models.BooleanField(default=False, verbose_name=_("Es estado final"))
    orden = models.PositiveIntegerField(default=0, verbose_name=_("Orden"))

    class Meta:
        verbose_name = _("Estado de Pedido")
        verbose_name_plural = _("Estados de Pedido")
        ordering = ['orden']

    def __str__(self):
        return self.nombre


class Pedido(models.Model):
    class MetodoPagoChoices(models.TextChoices):
        TARJETA = 'tarjeta', _('Tarjeta de crédito/débito')
        PAYPAL = 'paypal', _('PayPal')
        TRANSFERENCIA = 'transferencia', _('Transferencia bancaria')

    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='pedidos', verbose_name=_("Usuario"))
    fecha_creacion = models.DateTimeField(auto_now_add=True, verbose_name=_("Fecha de creación"))
    fecha_actualizacion = models.DateTimeField(auto_now=True, verbose_name=_("Fecha de actualización"))
    estado = models.ForeignKey(EstadoPedido, on_delete=models.PROTECT, verbose_name=_("Estado"))
    codigo = models.CharField(max_length=20, unique=True, verbose_name=_("Código"))
    subtotal = models.DecimalField(max_digits=10, decimal_places=2, verbose_name=_("Subtotal"), validators=[MinValueValidator(0.00)])
    envio = models.DecimalField(max_digits=10, decimal_places=2, verbose_name=_("Envío"), validators=[MinValueValidator(0.00)])
    total = models.DecimalField(max_digits=10, decimal_places=2, verbose_name=_("Total"), validators=[MinValueValidator(0.01)])

    # Envío
    direccion_envio = models.TextField(verbose_name=_("Dirección de envío"))
    ciudad = models.CharField(max_length=100, verbose_name=_("Ciudad"), default='')
    departamento = models.CharField(max_length=100, verbose_name=_("Departamento"), default='')
    codigo_postal = models.CharField(max_length=20, blank=True, verbose_name=_("Código postal"))
    telefono = models.CharField(max_length=20, verbose_name=_("Teléfono"))

    # Facturación
    nombre_facturacion = models.CharField(max_length=200, verbose_name=_("Nombre para facturación"))
    nit = models.CharField(max_length=20, blank=True, verbose_name=_("NIT"))

    # Método de pago seleccionado
    metodo_pago = models.CharField(max_length=50, choices=MetodoPagoChoices.choices, verbose_name=_("Método de pago"))

    class Meta:
        verbose_name = _("Pedido")
        verbose_name_plural = _("Pedidos")
        ordering = ['-fecha_creacion']
        indexes = [
            models.Index(fields=['codigo']),
            models.Index(fields=['usuario']),
            models.Index(fields=['estado']),
            models.Index(fields=['fecha_creacion']),
        ]

    def __str__(self):
        return f"Pedido #{self.codigo} - {self.usuario}"

    def save(self, *args, **kwargs):
        if not self.codigo:
            fecha = timezone.now().strftime('%Y%m%d')
            ultimo_pedido = type(self).objects.filter(codigo__startswith=fecha).order_by('-codigo').first()
            nuevo_numero = int(ultimo_pedido.codigo[-4:]) + 1 if ultimo_pedido else 1
            self.codigo = f"{fecha}{nuevo_numero:04d}"
        self.subtotal = Decimal(str(self.subtotal)).quantize(Decimal('0.01'))
        self.envio = Decimal(str(self.envio)).quantize(Decimal('0.01'))
        self.total = Decimal(str(self.total)).quantize(Decimal('0.01'))
        super().save(*args, **kwargs)

    @property
    def puede_cancelar(self):
        nombre = (self.estado.nombre or "").upper()
        return nombre in {"CREADO", "PREPARANDO"}



class DetallePedido(models.Model):
    pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE, related_name='detalles', verbose_name=_("Pedido"))
    producto = models.ForeignKey('productos.Producto', on_delete=models.PROTECT, verbose_name=_("Producto"))
    cantidad = models.PositiveIntegerField(verbose_name=_("Cantidad"), validators=[MinValueValidator(1)])
    precio_unitario = models.DecimalField(max_digits=10, decimal_places=2, verbose_name=_("Precio unitario"), validators=[MinValueValidator(0.01)])

    class Meta:
        verbose_name = _("Detalle de Pedido")
        verbose_name_plural = _("Detalles de Pedido")
        ordering = ['pedido', 'producto']
        indexes = [models.Index(fields=['pedido']), models.Index(fields=['producto'])]

    def __str__(self):
        return f"{self.cantidad}x {self.producto.nombre} en pedido #{self.pedido.codigo}"

    @property
    def subtotal(self):
        return self.cantidad * self.precio_unitario


class Factura(models.Model):
    pedido = models.OneToOneField(Pedido, on_delete=models.CASCADE, related_name='factura', verbose_name=_("Pedido"))
    numero_factura = models.CharField(max_length=20, unique=True, verbose_name=_("Número de factura"))
    fecha_emision = models.DateTimeField(auto_now_add=True, verbose_name=_("Fecha de emisión"))
    fecha_vencimiento = models.DateTimeField(verbose_name=_("Fecha de vencimiento"))
    pdf = models.FileField(upload_to='facturas/', blank=True, null=True, verbose_name=_("Archivo PDF"))

    class Meta:
        verbose_name = _("Factura")
        verbose_name_plural = _("Facturas")
        ordering = ['-fecha_emision']
        indexes = [models.Index(fields=['numero_factura'])]

    def __str__(self):
        return f"Factura {self.numero_factura} para pedido #{self.pedido.codigo}"

    def save(self, *args, **kwargs):
        if not self.numero_factura:
            year = timezone.now().strftime('%Y')
            ultima = type(self).objects.filter(numero_factura__startswith=f'FACT-{year}-').order_by('-numero_factura').first()
            nuevo = int(ultima.numero_factura.split('-')[-1]) + 1 if ultima else 1
            self.numero_factura = f"FACT-{year}-{nuevo:05d}"
        if not self.fecha_vencimiento:
            self.fecha_vencimiento = timezone.now() + timezone.timedelta(days=15)
        super().save(*args, **kwargs)

    @property
    def esta_vencida(self):
        return timezone.now() > self.fecha_vencimiento


class HistorialEstado(models.Model):
    pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE, related_name='historial_estados', verbose_name=_("Pedido"))
    estado = models.ForeignKey(EstadoPedido, on_delete=models.PROTECT, verbose_name=_("Estado"))
    fecha = models.DateTimeField(auto_now_add=True, verbose_name=_("Fecha"))
    comentario = models.TextField(blank=True, verbose_name=_("Comentario"))

    class Meta:
        verbose_name = _("Historial de Estado")
        verbose_name_plural = _("Historial de Estados")
        ordering = ['-fecha']
        indexes = [models.Index(fields=['pedido']), models.Index(fields=['estado']), models.Index(fields=['fecha'])]

    def __str__(self):
        return f"{self.pedido.codigo} - {self.estado.nombre} ({self.fecha})"


class Pago(models.Model):
    ESTADOS = (
        ('PENDIENTE', 'Pendiente'),
        ('COMPLETADO', 'Completado'),
        ('FALLIDO', 'Fallido'),
        ('REEMBOLSADO', 'Reembolsado'),
    )
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='pagos')
    pedido = models.OneToOneField(Pedido, on_delete=models.SET_NULL, related_name='pago', null=True, blank=True)
    fecha_pago = models.DateTimeField(auto_now_add=True)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    envio = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    total = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    estado = models.CharField(max_length=20, choices=ESTADOS, default='COMPLETADO')

    # Info personal mínima (conservada del original)
    first_name = models.CharField(max_length=50, default='')
    last_name = models.CharField(max_length=50, default='')
    email = models.EmailField(default='')
    phone = models.CharField(max_length=20, default='')
    address = models.TextField(default='')

    # Tarjeta (últimos 4 y nombre)
    card_number = models.CharField(max_length=4, default='')
    card_name = models.CharField(max_length=100, default='')

    # Datos del carrito tal como venían
    cart_data = models.JSONField(default=list)

    class Meta:
        ordering = ['-fecha_pago']
        verbose_name = 'Pago'
        verbose_name_plural = 'Pagos'
        indexes = [models.Index(fields=['usuario']), models.Index(fields=['estado']), models.Index(fields=['fecha_pago'])]

    def __str__(self):
        return f"Pago #{self.id} - {self.usuario}"
