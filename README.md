# Configuración del Proyecto DEEKO-STORE

## 1. Requisitos Previos
* Python 3.11 o superior
* MySQL 8.0 o superior

## 2. Configuración de Base de Datos
Crea una base de datos en MySQL llamada `tienda`. Configura la contraseña del usuario `root` (o el usuario con privilegios de administrador que prefieras usar).
Luego, en tu archivo `settings.py`, configura la conexión de esta forma:

    # Database
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.mysql',
            'NAME': 'tienda', 
            'USER': 'root',   
            'PASSWORD': 'TuContraseñaAqui', 
            'HOST': 'localhost', 
            'PORT': '3306', 
        }
    }

## 3. Preparación del Entorno Virtual
Abre tu terminal en la raíz del proyecto y ejecuta:

    python -m venv venv
    .\venv\Scripts\activate

## 4. Instalación de Dependencias
Instala los paquetes necesarios y el navegador para Playwright:

    pip install -r requirements.txt
    pip list  # Para verificar que todo se instaló correctamente
    python -m playwright install chromium

*Nota: Extrae el contenido de "images.rar" en la ruta `static/images` para asegurar que todas las imágenes del proyecto carguen bien.*

## 5. Migraciones de Base de Datos
Crea y aplica las migraciones en este orden lógico:

    python manage.py makemigrations usuarios
    python manage.py makemigrations productos pedidos principal panel
    python manage.py migrate

## 6. Poblamiento de Datos (Seeding)
Pega los siguientes comandos en PowerShell para cargar la información inicial:

    python manage.py seed_estados
    python manage.py loaddata initial_categorias.json
    python manage.py load_all_data
    python manage.py create_users
    python manage.py loaddata pedidos_detalles.json

## 7. Creación de Administrador y Ejecución
Crea tu superusuario para el panel de administración y levanta el servidor local:

    python manage.py createsuperuser  
    python manage.py runserver

---

### Solución de Problemas (Troubleshooting)
Si Django no te deja migrar debido a conflictos en la caché, ejecuta este script en PowerShell para limpiar el bytecode:

    Get-ChildItem -Recurse -Filter __pycache__ | Remove-Item -Recurse -Force
    Get-ChildItem -Recurse -Filter *.pyc | Remove-Item -Force