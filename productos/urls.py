from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from . import views
from .views import procesar_pago, confirmacion_pago

urlpatterns = [
    # --- Pago / Checkout (deja lo que ya tienes) ---
    path('pago/', views.pago, name='pago'),
    path('procesar_pago/', procesar_pago, name='procesar_pago'),
    path('confirmacion-pago/', confirmacion_pago, name='confirmacion_pago'),

    # --- Carrito (API) (deja lo que ya tienes) ---
    path('update-cart/', csrf_exempt(views.update_cart), name='update_cart'),
    path('api/carrito/obtener/', views.obtener_carrito, name='obtener_carrito'),
    path('api/carrito/actualizar/', views.actualizar_carrito, name='actualizar_carrito'),
    path('api/carrito/vaciar/', views.vaciar_carrito, name='vaciar_carrito'),

    # --- Ruta dinámica catch-all (siempre al final) ---
    path('<slug:slug>/', views.categoria, name='productos_categoria'),
]
