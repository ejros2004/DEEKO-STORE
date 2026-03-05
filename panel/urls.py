from django.urls import path
from . import views, api

urlpatterns = [
    # Dashboard
    path('', views.dashboard, name='panel_dashboard'),
    path('', views.dashboard, name='panel_admin'),

    # Productos
    path('productos/', views.productos_list, name='panel_productos'),
    path('productos/nuevo/', views.producto_create, name='panel_producto_create'),
    path('productos/<int:pk>/editar/', views.producto_edit, name='panel_producto_edit'),

    # Categorías
    path('categorias/', views.categorias, name='panel_categorias'),
    path('categorias/nueva/', views.categoria_create, name='panel_categoria_create'),
    path('categorias/<int:pk>/editar/', views.categoria_edit, name='panel_categoria_edit'),

    # Pedidos
    path('pedidos/', views.pedidos_list, name='panel_pedidos'),
    path('pedidos/<str:codigo>/', views.pedido_detalle, name='panel_pedido_detalle'),

    # ===== API =====
    path('api/productos/<int:pk>/actualizar/', api.producto_actualizar, name='panel_api_producto_actualizar'),
    path('api/productos/<int:pk>/borrar/',     api.producto_borrar,     name='panel_api_producto_borrar'),

    path('api/pedidos/<int:pk>/estado/',       api.pedido_cambiar_estado, name='panel_api_pedido_cambiar_estado'),

    path('api/categorias/<int:pk>/actualizar/', api.categoria_actualizar, name='panel_api_categoria_actualizar'),

    path('api/secciones/crear/',               api.seccion_crear,      name='panel_api_seccion_crear'),
    path('api/secciones/<int:pk>/renombrar/',  api.seccion_renombrar,  name='panel_api_seccion_renombrar'),
    path('api/secciones/<int:pk>/borrar/',     api.seccion_borrar,     name='panel_api_seccion_borrar'),
    path('api/secciones/<int:pk>/mover/',      api.seccion_mover,      name='panel_api_seccion_mover'),

    path('api/subcategorias/crear/',             api.subcategoria_crear,      name='panel_api_subcategoria_crear'),
    path('api/subcategorias/<int:pk>/renombrar/', api.subcategoria_renombrar, name='panel_api_subcategoria_renombrar'),
    path('api/subcategorias/<int:pk>/borrar/',    api.subcategoria_borrar,    name='panel_api_subcategoria_borrar'),
    path('api/subcategorias/<int:pk>/mover/',     api.subcategoria_mover,     name='panel_api_subcategoria_mover'),
]
