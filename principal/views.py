# principal/views.py
from django.shortcuts import render
from django.db.models import Q, Count

from .models import CategoriaPrincipal
from productos.models import Producto, SeccionCategoria, Subcategoria

from django.db.models import Q, Count

_EXCLUDE_Q = (
    Q(nombre__iexact='Sin categoría') |
    Q(nombre__iexact='Sin categoria') |
    Q(url_name__iexact='sin-categoria')
)

def home(request):
    """
    Portada: lista de categorías principales visibles y ordenadas.
    Excluye:
      - 'Sin categoría'
      - Categorías sin subcategorías
      - Categorías cuyas subcategorías no tienen productos
    """
    # Ordenes de SeccionCategoria que tienen subcategorías con productos
    ordenes_validos = (
        SeccionCategoria.objects
        .annotate(prod_count=Count('subcategorias__productos', distinct=True))
        .filter(prod_count__gt=0)  # Solo si hay productos en alguna subcategoría
        .values_list('orden', flat=True)
    )

    categorias_principal = (
        CategoriaPrincipal.objects
        .exclude(_EXCLUDE_Q)
        .filter(orden__in=ordenes_validos)
        .order_by('orden')
    )
    return render(request, 'principal.html', {
        'categorias_principal': categorias_principal
    })


def principal(request):
    """
    Portada con destacados por categoría.
    Excluye:
      - 'Sin categoría'
      - Categorías sin subcategorías
      - Categorías cuyas subcategorías no tienen productos
    """
    categorias_principal = (
        SeccionCategoria.objects
        .annotate(prod_count=Count('subcategorias__productos', distinct=True))
        .filter(prod_count__gt=0)
        .exclude(
            Q(nombre__iexact='Sin categoría') |
            Q(nombre__iexact='Sin categoria')
        )
        .order_by('orden')
    )

    productos_destacados = []
    for categoria in categorias_principal:
        productos = (
            Producto.objects
            .filter(subcategoria__seccion=categoria, destacado=True, stock__gt=0)
            .order_by('-id')[:3]
        )
        productos_destacados.extend(productos)

    return render(request, 'principal.html', {
        'categorias_principal': categorias_principal,
        'productos_destacados': productos_destacados,
    })
