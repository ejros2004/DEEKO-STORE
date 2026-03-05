document.addEventListener('DOMContentLoaded', function () {
  // Botón actualizar
  const btnRefresh = document.getElementById('btnRefresh');
  if (btnRefresh) {
    btnRefresh.addEventListener('click', () => {
      // Simplemente recarga la página (rápido y seguro)
      window.location.reload();
    });
  }

  // Desplazar al primer item activo del historial (mejora UX)
  const activeItem = document.querySelector('.timeline-item.active');
  if (activeItem) {
    activeItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  // (Opcional) Auto-refresh cada 60s si el estado no es final
  const estadoBadge = document.querySelector('.badge');
  const isFinal =
    estadoBadge &&
    /ENTREGADO|CANCELADO/i.test(estadoBadge.textContent || '');

  if (!isFinal) {
    setTimeout(() => {
      // Si quieres polling real, aquí podrías hacer fetch a una API.
      // Por ahora, un reload sencillo:
      window.location.reload();
    }, 60000);
  }
});
document.addEventListener('DOMContentLoaded', function () {
  // Botón actualizar
  const btnRefresh = document.getElementById('btnRefresh');
  if (btnRefresh) {
    btnRefresh.addEventListener('click', () => {
      // Simplemente recarga la página (rápido y seguro)
      window.location.reload();
    });
  }

  // Desplazar al primer item activo del historial (mejora UX)
  const activeItem = document.querySelector('.timeline-item.active');
  if (activeItem) {
    activeItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  // (Opcional) Auto-refresh cada 60s si el estado no es final
  const estadoBadge = document.querySelector('.badge');
  const isFinal =
    estadoBadge &&
    /ENTREGADO|CANCELADO/i.test(estadoBadge.textContent || '');

  if (!isFinal) {
    setTimeout(() => {
      // Si quieres polling real, aquí podrías hacer fetch a una API.
      // Por ahora, un reload sencillo:
      window.location.reload();
    }, 60000);
  }
});
