from django.apps import AppConfig


class PedidosConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "pedidos"

    def ready(self):
        # Conecta señales al iniciar la app
        from . import signals