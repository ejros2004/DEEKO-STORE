from django.contrib import admin
from .models import EstadoPedido, Pedido, DetallePedido, Factura, HistorialEstado, Pago

class DetallePedidoInline(admin.TabularInline):
    model = DetallePedido
    extra = 0

@admin.register(Pedido)
class PedidoAdmin(admin.ModelAdmin):
    list_display = ("codigos", "usuarios", "estados", "totales", "fecha_creaciones")
    list_filter = ("estado", "fecha_creacion")
    search_fields = ("codigo", "usuario__username", "usuario__email")
    inlines = [DetallePedidoInline]

@admin.register(EstadoPedido)
class EstadoPedidoAdmin(admin.ModelAdmin):
    list_display = ("nombres", "es_finales", "orden")
    list_editable = ("es_final", "orden")

@admin.register(Factura)
class FacturaAdmin(admin.ModelAdmin):
    list_display = ("numero_factura", "pedido", "fecha_emision", "fecha_vencimiento")

@admin.register(HistorialEstado)
class HistorialEstadoAdmin(admin.ModelAdmin):
    list_display = ("pedido", "estado", "fecha")

@admin.register(Pago)
class PagoAdmin(admin.ModelAdmin):
    list_display = ("id", "usuario", "estado", "total", "fecha_pago")
    list_filter = ("estado", "fecha_pago")
    search_fields = ("usuario__username", "usuario__email")
