from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.urls import reverse
from .forms import CustomUserCreationForm

from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from django.utils.crypto import get_random_string
from django.conf import settings

from .forms import PasswordResetRequestForm, PasswordResetVerifyForm, PasswordResetSetPasswordForm
from .models import PasswordResetCode

User = get_user_model()

def register_view(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            messages.success(request, '¡Registro exitoso! Ahora puedes iniciar sesión.')
            return redirect('principal')
        else:
            messages.error(request, 'Por favor corrige los errores en el formulario.')
    else:
        form = CustomUserCreationForm()
    return render(request, 'usuarios/register.html', {'form': form, 'title': 'Registro de Usuario'})

def login_view(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            next_url = request.POST.get("next") or request.GET.get("next")
            if next_url:
                return redirect(next_url)
            if user.is_staff or user.is_superuser:
                return redirect(reverse('panel_admin'))   # <- nombre de ruta
            return redirect("principal")
        messages.error(request, "Credenciales inválidas")
    return render(request, "usuarios/login.html", {'title': 'Iniciar Sesión'})


def logout_view(request):
    logout(request)
    messages.info(request, "Has cerrado sesión correctamente.")
    return redirect("login")

@login_required
def perfil_view(request):
    return render(request, 'usuarios/perfil.html', {
        'usuario': request.user,
        'title': 'Mi Perfil'
    })

def password_reset_request(request):
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
                subject = 'Código de recuperación de contraseña'
                message = (
                    f'Hola,\n\nTu código de recuperación es: {code}\n'
                    f'Vence en 15 minutos.\n\nSi no solicitaste esto, ignora este mensaje.'
                )
                send_mail(subject, message, getattr(settings, 'DEFAULT_FROM_EMAIL', None), [email], fail_silently=False)
                messages.success(request, 'Te enviamos un código de recuperación a tu correo.')
                request.session['reset_email'] = email
                return redirect('password_reset_verify')
    else:
        form = PasswordResetRequestForm()
    return render(request, 'usuarios/recuperacion_contrasena.html', {'form': form})

def password_reset_verify(request):
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
                prc = PasswordResetCode.objects.filter(user=user, code=code, used=False).order_by('-created_at').first()
                if not prc:
                    messages.error(request, 'Código incorrecto.')
                elif prc.is_expired():
                    messages.error(request, 'El código ha vencido. Solicita uno nuevo.')
                else:
                    request.session['reset_email'] = email
                    request.session['reset_code'] = code
                    return redirect('password_reset_set')
    else:
        form = PasswordResetVerifyForm(initial=initial)
    return render(request, 'usuarios/verificar_codigo.html', {'form': form})

def password_reset_set(request):
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
                prc = PasswordResetCode.objects.filter(user=user, code=code, used=False).order_by('-created_at').first()
                if not prc:
                    messages.error(request, 'Código inválido.')
                elif prc.is_expired():
                    messages.error(request, 'El código ha vencido. Solicita uno nuevo.')
                else:
                    user.set_password(new_password)
                    user.save()
                    prc.used = True
                    prc.save()
                    request.session.pop('reset_email', None)
                    request.session.pop('reset_code', None)
                    messages.success(request, '¡Contraseña actualizada! Ya puedes iniciar sesión.')
                    return redirect('login')
    else:
        form = PasswordResetSetPasswordForm(initial={'email': email, 'code': code})
    return render(request, 'usuarios/nueva_contrasena.html', {'form': form})
