from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm, AdminPasswordChangeForm
from .models import CustomUser
from django.core.exceptions import ValidationError

# forms.py
from django import forms



class CustomAdminPasswordChangeForm(AdminPasswordChangeForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in ('password1', 'password2'):
            self.fields[field].widget.attrs.update({'class': 'form-control'})
    
class CustomUserCreationForm(UserCreationForm):
    email = forms.EmailField(
        required=True,
        label="Correo electrónico",
        widget=forms.EmailInput(attrs={'autocomplete': 'email', 'class': 'form-control'}))
    
    is_staff = forms.BooleanField(
        required=False,
        label="Es staff",
        widget=forms.CheckboxInput(attrs={'class': 'form-check-input'}),
        help_text="Designa si el usuario puede acceder al panel de administración."
    )
    
    is_superuser = forms.BooleanField(
        required=False,
        label="Es superusuario",
        widget=forms.CheckboxInput(attrs={'class': 'form-check-input'}),
        help_text="Designa si el usuario tiene todos los permisos sin asignarlos explícitamente."
    )
    
    class Meta:
        model = CustomUser
        fields = ("username", "email", "password1", "password2", "is_staff", "is_superuser")
        widgets = {
            'username': forms.TextInput(attrs={'class': 'form-control'}),
        }
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in ('password1', 'password2'):
            self.fields[field].widget.attrs.update({'class': 'form-control'})
    
    def clean_email(self):
        email = self.cleaned_data['email'].lower()
        if CustomUser.objects.filter(email=email).exists():
            raise ValidationError("Este correo electrónico ya está registrado")
        return email
    
    def save(self, commit=True):
        user = super().save(commit=False)
        user.email = self.cleaned_data['email']
        if commit:
            user.save()
        return user

class CustomUserChangeForm(UserChangeForm):
    email = forms.EmailField(
        required=True,
        label="Correo electrónico",
        widget=forms.EmailInput(attrs={'autocomplete': 'email', 'class': 'form-control'}))
    
    class Meta:
        model = CustomUser
        fields = '__all__'
        widgets = {
            'username': forms.TextInput(attrs={'class': 'form-control'}),
            'is_active': forms.CheckboxInput(attrs={'class': 'form-check-input'}),
            'is_staff': forms.CheckboxInput(attrs={'class': 'form-check-input'}),
            'is_superuser': forms.CheckboxInput(attrs={'class': 'form-check-input'}),
            'groups': forms.SelectMultiple(attrs={'class': 'form-select'}),
            'user_permissions': forms.SelectMultiple(attrs={'class': 'form-select'}),
        }








class PasswordResetRequestForm(forms.Form):
    email = forms.EmailField(label='Correo electrónico')

class PasswordResetVerifyForm(forms.Form):
    email = forms.EmailField(label='Correo electrónico')
    code = forms.CharField(label='Código de verificación', max_length=6)

class PasswordResetSetPasswordForm(forms.Form):
    email = forms.EmailField(widget=forms.HiddenInput())
    code = forms.CharField(widget=forms.HiddenInput(), max_length=6)
    new_password1 = forms.CharField(label='Nueva contraseña', widget=forms.PasswordInput)
    new_password2 = forms.CharField(label='Confirmar contraseña', widget=forms.PasswordInput)

    def clean(self):
        cleaned = super().clean()
        p1 = cleaned.get('new_password1')
        p2 = cleaned.get('new_password2')
        if p1 and p2 and p1 != p2:
            self.add_error('new_password2', 'Las contraseñas no coinciden.')
        return cleaned
    







# views.py
from django.contrib import messages
from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from django.shortcuts import render, redirect
from django.utils.crypto import get_random_string
from django.conf import settings

from .forms import (
    PasswordResetRequestForm,
    PasswordResetVerifyForm,
    PasswordResetSetPasswordForm,
)
from .models import PasswordResetCode

User = get_user_model()

def password_reset_request(request):
    """
    1) Pide el correo y genera código de 6 dígitos
    2) Envía correo
    3) Redirige a verificación del código
    """
    if request.method == 'POST':
        form = PasswordResetRequestForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data['email'].strip()
            user = User.objects.filter(email__iexact=email).first()
            if not user:
                messages.error(request, 'No existe un usuario con ese correo.')
            else:
                code = get_random_string(length=6, allowed_chars='0123456789')
                PasswordResetCode.objects.create(user=user, code=code)
                # Envía correo
                subject = 'Código de recuperación de contraseña'
                message = (
                    f'Hola,\n\n'
                    f'Tu código de recuperación es: {code}\n'
                    f'Vence en 15 minutos.\n\n'
                    f'Si no solicitaste esto, ignora este mensaje.'
                )
                from_email = getattr(settings, 'DEFAULT_FROM_EMAIL', None)
                send_mail(subject, message, from_email, [email], fail_silently=False)
                messages.success(request, 'Te enviamos un código de recuperación a tu correo.')
                # Puedes llevar el email en la sesión para comodidad:
                request.session['reset_email'] = email
                return redirect('password_reset_verify')
    else:
        form = PasswordResetRequestForm()
    return render(request, 'recuperacionContraseña.html', {'form': form})


def password_reset_verify(request):
    """
    Verifica correo + código (no usado y no vencido).
    Si todo bien, redirige a establecer nueva contraseña.
    """
    initial = {}
    if 'reset_email' in request.session:
        initial['email'] = request.session['reset_email']

    if request.method == 'POST':
        form = PasswordResetVerifyForm(request.POST, initial=initial)
        if form.is_valid():
            email = form.cleaned_data['email'].strip()
            code = form.cleaned_data['code'].strip()
            user = User.objects.filter(email__iexact=email).first()
            if not user:
                messages.error(request, 'Correo no válido.')
            else:
                prc = (
                    PasswordResetCode.objects
                    .filter(user=user, code=code, used=False)
                    .order_by('-created_at')
                    .first()
                )
                if not prc:
                    messages.error(request, 'Código incorrecto.')
                elif prc.is_expired():
                    messages.error(request, 'El código ha vencido. Solicita uno nuevo.')
                else:
                    # Guardamos en sesión para el siguiente paso
                    request.session['reset_email'] = email
                    request.session['reset_code'] = code
                    return redirect('password_reset_set')
    else:
        form = PasswordResetVerifyForm(initial=initial)
    return render(request, 'verificar_codigo.html', {'form': form})


def password_reset_set(request):
    """
    Establece nueva contraseña si el código sigue válido.
    """
    email = request.session.get('reset_email')
    code = request.session.get('reset_code')
    if not (email and code):
        messages.error(request, 'Sesión de recuperación no encontrada. Repite el proceso.')
        return redirect('password_reset_request')

    if request.method == 'POST':
        form = PasswordResetSetPasswordForm(request.POST, initial={'email': email, 'code': code})
        if form.is_valid():
            email = form.cleaned_data['email'].strip()
            code = form.cleaned_data['code'].strip()
            new_password = form.cleaned_data['new_password1']

            user = User.objects.filter(email__iexact=email).first()
            if not user:
                messages.error(request, 'Correo no válido.')
            else:
                prc = (
                    PasswordResetCode.objects
                    .filter(user=user, code=code, used=False)
                    .order_by('-created_at')
                    .first()
                )
                if not prc:
                    messages.error(request, 'Código inválido.')
                elif prc.is_expired():
                    messages.error(request, 'El código ha vencido. Solicita uno nuevo.')
                else:
                    user.set_password(new_password)
                    user.save()
                    prc.used = True
                    prc.save()

                    # Limpiar sesión
                    request.session.pop('reset_email', None)
                    request.session.pop('reset_code', None)

                    messages.success(request, '¡Contraseña actualizada! Ya puedes iniciar sesión.')
                    return redirect('login')  # Ajusta el nombre de tu url de login
    else:
        form = PasswordResetSetPasswordForm(initial={'email': email, 'code': code})
    return render(request, 'nueva_contraseña.html', {'form': form})


class PasswordResetRequestForm(forms.Form):
    email = forms.EmailField(label='Correo electrónico')

class PasswordResetVerifyForm(forms.Form):
    email = forms.EmailField(label='Correo electrónico')
    code = forms.CharField(label='Código de verificación', max_length=6)

class PasswordResetSetPasswordForm(forms.Form):
    email = forms.EmailField(widget=forms.HiddenInput())
    code = forms.CharField(widget=forms.HiddenInput(), max_length=6)
    new_password1 = forms.CharField(label='Nueva contraseña', widget=forms.PasswordInput)
    new_password2 = forms.CharField(label='Confirmar contraseña', widget=forms.PasswordInput)

    def clean(self):
        cleaned = super().clean()
        if cleaned.get('new_password1') != cleaned.get('new_password2'):
            self.add_error('new_password2', 'Las contraseñas no coinciden.')
        return cleaned
    
