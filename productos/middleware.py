from django.utils.deprecation import MiddlewareMixin
from .models import Carrito

class CarritoMiddleware(MiddlewareMixin):
    def process_request(self, request):
        if request.user.is_authenticated:
            request.carrito, _ = Carrito.objects.get_or_create(usuario=request.user)
        else:
            request.carrito = None