from django.urls import path
from . import views

urlpatterns = [
    path('perfil/', views.perfil_view, name='perfil'),
    path('login/', views.login_view, name='login'),
    path('register/', views.register_view, name='register'),
    path('logout/', views.logout_view, name='logout'),
    path('recuperacion/', views.password_reset_request, name='password_reset_request'),
    path('recuperacion/verificar/', views.password_reset_verify, name='password_reset_verify'),
    path('recuperacion/nueva/', views.password_reset_set, name='password_reset_set'),
]
