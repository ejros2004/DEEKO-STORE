# pedidos/management/commands/seed_estados.py
from django.core.management.base import BaseCommand
from pedidos.signals import ensure_default_order_statuses

class Command(BaseCommand):
    help = "Crea/actualiza estados de pedido por defecto."

    def handle(self, *args, **options):
        ensure_default_order_statuses(sender=None)
        self.stdout.write(self.style.SUCCESS("Estados creados/actualizados."))
