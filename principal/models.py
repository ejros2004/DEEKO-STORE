from django.db import models


class CategoriaPrincipal(models.Model):
    """Categorías usadas para el home/landing (hero/menú principal)."""
    nombre = models.CharField(max_length=100)
    imagen_nombre = models.CharField(max_length=100)  # si almacenas solo el nombre del archivo
    url_name = models.CharField(max_length=50)        # nombre de URL (path name) para navegar
    orden = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['orden']
        verbose_name = "Categoría Principal"
        verbose_name_plural = "Categorías Principal"
        indexes = [models.Index(fields=['orden'])]

    def __str__(self):
        return self.nombre
