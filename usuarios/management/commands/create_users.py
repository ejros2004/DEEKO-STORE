# create_users.py
import os
import django
from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import datetime

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'tu_proyecto.settings')
django.setup()

User = get_user_model()

class Command(BaseCommand):
    help = 'Crea los 20 usuarios iniciales con contraseña 1234 manteniendo los IDs del fixture'

    def handle(self, *args, **options):
        users_data = [
            {
                "pk": 1,
                "fields": {
                    "username": "juanperez",
                    "first_name": "Juan",
                    "last_name": "Pérez",
                    "email": "juan.perez@example.com",
                    "is_staff": False,
                    "is_active": True,
                    "date_joined": "2025-01-01T00:00:00Z",
                    "last_login": "2025-07-15T10:30:00Z"
                }
            },
            {
                "pk": 2,
                "fields": {
                    "username": "mariagonzalez",
                    "first_name": "María",
                    "last_name": "González",
                    "email": "maria.gonzalez@example.com",
                    "is_staff": False,
                    "is_active": True,
                    "date_joined": "2025-01-02T00:00:00Z",
                    "last_login": "2025-07-16T14:45:00Z"
                }
            },
            {
                "pk": 3,
                "fields": {
                    "username": "carlosmartinez",
                    "first_name": "Carlos",
                    "last_name": "Martínez",
                    "email": "carlos.martinez@example.com",
                    "is_staff": False,
                    "is_active": True,
                    "date_joined": "2025-01-03T00:00:00Z",
                    "last_login": "2025-07-17T16:20:00Z"
                }
            },
            {
                "pk": 4,
                "fields": {
                    "username": "anarodriguez",
                    "first_name": "Ana",
                    "last_name": "Rodríguez",
                    "email": "ana.rodriguez@example.com",
                    "is_staff": False,
                    "is_active": True,
                    "date_joined": "2025-01-04T00:00:00Z",
                    "last_login": "2025-07-18T11:10:00Z"
                }
            },
            {
                "pk": 5,
                "fields": {
                    "username": "luishernandez",
                    "first_name": "Luis",
                    "last_name": "Hernández",
                    "email": "luis.hernandez@example.com",
                    "is_staff": False,
                    "is_active": True,
                    "date_joined": "2025-01-05T00:00:00Z",
                    "last_login": "2025-07-19T09:45:00Z"
                }
            },
            {
                "pk": 6,
                "fields": {
                    "username": "sofiaramirez",
                    "first_name": "Sofía",
                    "last_name": "Ramírez",
                    "email": "sofia.ramirez@example.com",
                    "is_staff": False,
                    "is_active": True,
                    "date_joined": "2025-01-06T00:00:00Z",
                    "last_login": "2025-07-20T15:30:00Z"
                }
            },
            {
                "pk": 7,
                "fields": {
                    "username": "jorgelopez",
                    "first_name": "Jorge",
                    "last_name": "López",
                    "email": "jorge.lopez@example.com",
                    "is_staff": False,
                    "is_active": True,
                    "date_joined": "2025-01-07T00:00:00Z",
                    "last_login": "2025-07-21T13:15:00Z"
                }
            },
            {
                "pk": 8,
                "fields": {
                    "username": "patriciacastro",
                    "first_name": "Patricia",
                    "last_name": "Castro",
                    "email": "patricia.castro@example.com",
                    "is_staff": False,
                    "is_active": True,
                    "date_joined": "2025-01-08T00:00:00Z",
                    "last_login": "2025-07-22T11:45:00Z"
                }
            },
            {
                "pk": 9,
                "fields": {
                    "username": "robertojimenez",
                    "first_name": "Roberto",
                    "last_name": "Jiménez",
                    "email": "roberto.jimenez@example.com",
                    "is_staff": False,
                    "is_active": True,
                    "date_joined": "2025-01-09T00:00:00Z",
                    "last_login": "2025-07-23T09:30:00Z"
                }
            },
            {
                "pk": 10,
                "fields": {
                    "username": "gabrielatorres",
                    "first_name": "Gabriela",
                    "last_name": "Torres",
                    "email": "gabriela.torres@example.com",
                    "is_staff": False,
                    "is_active": True,
                    "date_joined": "2025-01-10T00:00:00Z",
                    "last_login": "2025-07-24T14:20:00Z"
                }
            },
            {
                "pk": 11,
                "fields": {
                    "username": "marioflores",
                    "first_name": "Mario",
                    "last_name": "Flores",
                    "email": "mario.flores@example.com",
                    "is_staff": False,
                    "is_active": True,
                    "date_joined": "2025-01-11T00:00:00Z",
                    "last_login": "2025-07-25T09:15:00Z"
                }
            },
            {
                "pk": 12,
                "fields": {
                    "username": "lauramendoza",
                    "first_name": "Laura",
                    "last_name": "Mendoza",
                    "email": "laura.mendoza@example.com",
                    "is_staff": False,
                    "is_active": True,
                    "date_joined": "2025-01-12T00:00:00Z",
                    "last_login": "2025-07-26T11:30:00Z"
                }
            },
            {
                "pk": 13,
                "fields": {
                    "username": "carlosrivas",
                    "first_name": "Carlos",
                    "last_name": "Rivas",
                    "email": "carlos.rivas@example.com",
                    "is_staff": False,
                    "is_active": True,
                    "date_joined": "2025-01-13T00:00:00Z",
                    "last_login": "2025-07-27T14:45:00Z"
                }
            },
            {
                "pk": 14,
                "fields": {
                    "username": "karlasanchez",
                    "first_name": "Karla",
                    "last_name": "Sánchez",
                    "email": "karla.sanchez@example.com",
                    "is_staff": False,
                    "is_active": True,
                    "date_joined": "2025-01-14T00:00:00Z",
                    "last_login": "2025-07-28T10:20:00Z"
                }
            },
            {
                "pk": 15,
                "fields": {
                    "username": "pedromejia",
                    "first_name": "Pedro",
                    "last_name": "Mejía",
                    "email": "pedro.mejia@example.com",
                    "is_staff": False,
                    "is_active": True,
                    "date_joined": "2025-01-15T00:00:00Z",
                    "last_login": "2025-07-29T16:30:00Z"
                }
            },
            {
                "pk": 16,
                "fields": {
                    "username": "mariafernandez",
                    "first_name": "María",
                    "last_name": "Fernández",
                    "email": "maria.fernandez@example.com",
                    "is_staff": False,
                    "is_active": True,
                    "date_joined": "2025-01-16T00:00:00Z",
                    "last_login": "2025-07-30T12:15:00Z"
                }
            },
            {
                "pk": 17,
                "fields": {
                    "username": "josegutierrez",
                    "first_name": "José",
                    "last_name": "Gutiérrez",
                    "email": "jose.gutierrez@example.com",
                    "is_staff": False,
                    "is_active": True,
                    "date_joined": "2025-01-17T00:00:00Z",
                    "last_login": "2025-07-31T09:45:00Z"
                }
            },
            {
                "pk": 18,
                "fields": {
                    "username": "anamariagarcia",
                    "first_name": "Ana María",
                    "last_name": "García",
                    "email": "anamaria.garcia@example.com",
                    "is_staff": False,
                    "is_active": True,
                    "date_joined": "2025-01-18T00:00:00Z",
                    "last_login": "2025-08-01T14:20:00Z"
                }
            },
            {
                "pk": 19,
                "fields": {
                    "username": "luiscarlosmorales",
                    "first_name": "Luis Carlos",
                    "last_name": "Morales",
                    "email": "luiscarlos.morales@example.com",
                    "is_staff": False,
                    "is_active": True,
                    "date_joined": "2025-01-19T00:00:00Z",
                    "last_login": "2025-08-02T11:10:00Z"
                }
            },
            {
                "pk": 20,
                "fields": {
                    "username": "sandralopez",
                    "first_name": "Sandra",
                    "last_name": "López",
                    "email": "sandra.lopez@example.com",
                    "is_staff": False,
                    "is_active": True,
                    "date_joined": "2025-01-20T00:00:00Z",
                    "last_login": "2025-08-03T16:45:00Z"
                }
            }
        ]

        for user_entry in users_data:
            pk = user_entry["pk"]
            fields = user_entry["fields"]
            
            date_joined = datetime.fromisoformat(fields["date_joined"].replace("Z", "+00:00"))
            last_login = datetime.fromisoformat(fields["last_login"].replace("Z", "+00:00")) if fields["last_login"] else None
            
            try:
                user = User.objects.get(pk=pk)
                self.stdout.write(self.style.WARNING(f'Usuario {pk} ya existía: {fields["username"]}'))
            except User.DoesNotExist:
                user = User(
                    pk=pk,
                    username=fields["username"],
                    email=fields["email"],
                    first_name=fields["first_name"],
                    last_name=fields["last_name"],
                    is_staff=fields["is_staff"],
                    is_active=fields["is_active"],
                    date_joined=date_joined,
                    last_login=last_login
                )
                user.set_password("1234")
                user.save(force_insert=True)  # Forzamos a usar el ID específico
                self.stdout.write(self.style.SUCCESS(f'Usuario {pk} creado: {fields["username"]}'))

if __name__ == "__main__":
    Command().handle()
