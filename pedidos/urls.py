from django.urls import path
from . import views

urlpatterns = [
    path('perfil/', views.perfil, name='perfil'),
    path('mis-pedidos/', views.mis_pedidos, name='mis_pedidos'),
    path('pedido/<str:codigo_pedido>/', views.detalle_pedido, name='detalle_pedido'),
    path('pedido/<str:codigo_pedido>/seguimiento/', views.seguimiento_pedido, name='seguimiento_pedido'),
    path('pedido/<str:codigo_pedido>/cancelar/', views.cancelar_pedido, name='cancelar_pedido'),
    path('factura/<int:factura_id>/ver/', views.ver_factura, name='ver_factura'),
    path('factura/<int:factura_id>/descargar/', views.descargar_factura, name='descargar_factura'),
    path('editar-perfil/', views.editar_perfil, name='editar_perfil'),
    path('recuperacion/', views.cambiar_contrasena, name='recuperacion'),
]