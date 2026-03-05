# panel/forms.py
from django import forms
from productos.models import Producto

class ProductoForm(forms.ModelForm):
    class Meta:
        model = Producto
        exclude = ['ordenes']
        
    def __init__(self, *a, **kw):
        super().__init__(*a, **kw)
        self.fields['imagenes'].required = False
