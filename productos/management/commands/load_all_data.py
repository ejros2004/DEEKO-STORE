from django.core.management import call_command
from django.core.management.base import BaseCommand

class Command(BaseCommand):
    help = 'Carga todos los datos en el orden correcto: secciones → subcategorías → productos'

    def handle(self, *args, **options):
        try:
            # Cargar todas las secciones
            self.stdout.write('🔹 Cargando secciones...')
            call_command('loaddata', 'seccion_categorias.json')

            # Alimentos
            self.stdout.write('🔸 Cargando Alimentos...')
            call_command('loaddata', 'subcategorias_productos.json')
            call_command('loaddata', 'productos.json')

            self.stdout.write(self.style.SUCCESS('✅ Todos los datos fueron cargados correctamente.'))

        except Exception as e:
            self.stderr.write(self.style.ERROR(f'❌ Error al cargar los datos: {str(e)}'))
