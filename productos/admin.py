from django.contrib import admin
from .models import SeccionCategoria, Subcategoria, Producto, Carrito, ItemCarrito
# OJO: ya no importes Pago aquí

@admin.register(SeccionCategoria)
class SeccionCategoriaAdmin(admin.ModelAdmin):
    list_display = ("nombre", "orden")
    search_fields = ("nombre",)
    ordering = ("orden",)

@admin.register(Subcategoria)
class SubcategoriaAdmin(admin.ModelAdmin):
    list_display = ("nombre", "seccion", "orden")
    list_filter = ("seccion",)
    search_fields = ("nombre", "seccion__nombre")
    ordering = ("seccion", "orden")

@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    list_display = ("nombre", "subcategoria", "precio", "stock", "badge", "orden")
    list_filter = ("subcategoria", "badge")
    search_fields = ("nombre", "subcategoria__nombre")
    ordering = ("subcategoria", "orden")

@admin.register(Carrito)
class CarritoAdmin(admin.ModelAdmin):
    list_display = ("usuario", "fecha_actualizacion")
    search_fields = ("usuario__username", "usuario__email")

@admin.register(ItemCarrito)
class ItemCarritoAdmin(admin.ModelAdmin):
    list_display = ("carrito", "producto", "cantidad", "fecha_agregado")
    list_filter = ("producto",)
