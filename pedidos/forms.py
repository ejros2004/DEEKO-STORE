from django import forms
from django.contrib.auth import get_user_model
# Cambia esta importación según donde esté realmente tu modelo Profile
from usuarios.models import Profile  # o 'usuarios.models' o donde lo tengas

User = get_user_model()

class UserEditForm(forms.ModelForm):
    username = forms.CharField(
        label="Nombre de usuarios",
        required=True,
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Nombre de usuario'
        }),
        help_text=""
    )
    first_name = forms.CharField(
        label="Nombre",
        required=True,
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Nombre'
        }),
        help_text=""
    )
    last_name = forms.CharField(
        label="Apellidos",
        required=True,
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Apellido'
        }),
        help_text=""
    )

    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email']
        widgets = {
            'email': forms.EmailInput(attrs={
                'class': 'form-control',
                'placeholder': 'Correo Electrónico'
            }),
        }