document.addEventListener('DOMContentLoaded', function() {
  // Pop-up de factura
  const facturaModal = document.getElementById('facturaModal');
  const facturaFrame = document.getElementById('facturaFrame');
  if (facturaModal && facturaFrame) {
    const modal = new bootstrap.Modal(facturaModal);
    document.querySelectorAll('.link-ver-factura').forEach(el => {
      el.addEventListener('click', e => {
        e.preventDefault();
        facturaFrame.src = el.dataset.facturaUrl;
        modal.show();
      });
    });
    facturaModal.addEventListener('hidden.bs.modal', () => { facturaFrame.src = ''; });
  }

  // Confirmación de cancelación
  document.querySelectorAll('.cancelar-form').forEach(form => {
    form.addEventListener('submit', function(e) {
      if (!confirm('¿Seguro que deseas cancelar este pedido? Esta acción no se puede deshacer.')) {
        e.preventDefault();
      }
    });
  });

  // Manejo de filtros
  const filterForm = document.getElementById('filterForm');
  if (filterForm) {
    const desdeInput = filterForm.querySelector('input[name="desde"]');
    const hastaInput = filterForm.querySelector('input[name="hasta"]');
    const dateHint = document.getElementById('dateHint');
    const btnApply = document.getElementById('btnApply');

    function validateDateRange() {
      if (desdeInput.value && hastaInput.value && desdeInput.value > hastaInput.value) {
        dateHint.hidden = false;
        btnApply.disabled = true;
        desdeInput.classList.add('is-invalid');
        hastaInput.classList.add('is-invalid');
      } else {
        dateHint.hidden = true;
        btnApply.disabled = false;
        desdeInput.classList.remove('is-invalid');
        hastaInput.classList.remove('is-invalid');
      }
    }

    desdeInput.addEventListener('change', validateDateRange);
    hastaInput.addEventListener('change', validateDateRange);

    // Ordenamiento
    document.querySelectorAll('.sort-option').forEach(btn => {
      btn.addEventListener('click', () => {
        const sortInput = filterForm.querySelector('input[name="sort"]');
        sortInput.value = btn.dataset.sort;
        filterForm.submit();
      });
    });

    // Reset
    document.getElementById('btnReset')?.addEventListener('click', () => {
      filterForm.reset();
      filterForm.querySelector('input[name="sort"]').value = 'fecha_desc';
      filterForm.submit();
    });
  }
});
document.addEventListener('DOMContentLoaded', function() {
  // Pop-up de factura
  const facturaModal = document.getElementById('facturaModal');
  const facturaFrame = document.getElementById('facturaFrame');
  if (facturaModal && facturaFrame) {
    const modal = new bootstrap.Modal(facturaModal);
    document.querySelectorAll('.link-ver-factura').forEach(el => {
      el.addEventListener('click', e => {
        e.preventDefault();
        facturaFrame.src = el.dataset.facturaUrl;
        modal.show();
      });
    });
    facturaModal.addEventListener('hidden.bs.modal', () => { facturaFrame.src = ''; });
  }

  // Confirmación de cancelación
  document.querySelectorAll('.cancelar-form').forEach(form => {
    form.addEventListener('submit', function(e) {
      if (!confirm('¿Seguro que deseas cancelar este pedido? Esta acción no se puede deshacer.')) {
        e.preventDefault();
      }
    });
  });

  // Manejo de filtros
  const filterForm = document.getElementById('filterForm');
  if (filterForm) {
    const desdeInput = filterForm.querySelector('input[name="desde"]');
    const hastaInput = filterForm.querySelector('input[name="hasta"]');
    const dateHint = document.getElementById('dateHint');
    const btnApply = document.getElementById('btnApply');

    function validateDateRange() {
      if (desdeInput.value && hastaInput.value && desdeInput.value > hastaInput.value) {
        dateHint.hidden = false;
        btnApply.disabled = true;
        desdeInput.classList.add('is-invalid');
        hastaInput.classList.add('is-invalid');
      } else {
        dateHint.hidden = true;
        btnApply.disabled = false;
        desdeInput.classList.remove('is-invalid');
        hastaInput.classList.remove('is-invalid');
      }
    }

    desdeInput.addEventListener('change', validateDateRange);
    hastaInput.addEventListener('change', validateDateRange);

    // Ordenamiento
    document.querySelectorAll('.sort-option').forEach(btn => {
      btn.addEventListener('click', () => {
        const sortInput = filterForm.querySelector('input[name="sort"]');
        sortInput.value = btn.dataset.sort;
        filterForm.submit();
      });
    });

    // Reset
    document.getElementById('btnReset')?.addEventListener('click', () => {
      filterForm.reset();
      filterForm.querySelector('input[name="sort"]').value = 'fecha_desc';
      filterForm.submit();
    });
  }
});