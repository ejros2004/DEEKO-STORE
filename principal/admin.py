# admin.py
from django.contrib import admin
from .models import CategoriaPrincipal

@admin.register(CategoriaPrincipal)
class CategoriaPrincipalAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'url_name', 'orden')
    ordering = ('orden',)