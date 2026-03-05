document.addEventListener('DOMContentLoaded', () => {
  // --- Modal "Ver factura" ---
  const modalEl = document.getElementById('facturaModal');
  const frame = document.getElementById('facturaFrame');
  if (modalEl && frame) {
    modalEl.addEventListener('show.bs.modal', (e) => {
      const btn = e.relatedTarget;
      const url = btn?.getAttribute('data-factura-url');
      if (url) frame.src = url;
    });
    modalEl.addEventListener('hidden.bs.modal', () => { frame.src = ''; });
  }

  // --- Descargar PDF desde backend (Playwright) ---
  const btnDesc = document.getElementById('btnDescargarFactura');

  function filenameFromDisposition(disposition) {
    if (!disposition) return null;
    // filename*=UTF-8''... o filename="..."
    let m = /filename\*=UTF-8''([^;]+)/i.exec(disposition);
    if (m && m[1]) return decodeURIComponent(m[1].replace(/["']/g, ''));
    m = /filename="?([^"]+)"?/i.exec(disposition);
    if (m && m[1]) return m[1];
    return null;
  }
    function filenameFromDisposition(disposition) {
    if (!disposition) return null;
    // filename*=UTF-8''... o filename="..."
    let m = /filename\*=UTF-8''([^;]+)/i.exec(disposition);
    if (m && m[1]) return decodeURIComponent(m[1].replace(/["']/g, ''));
    m = /filename="?([^"]+)"?/i.exec(disposition);
    if (m && m[1]) return m[1];
    return null;
  }


  async function downloadPdf(url, fallbackName) {
    const resp = await fetch(url, { credentials: 'same-origin' });
    if (!resp.ok) throw new Error('HTTP ' + resp.status);
    const ct = (resp.headers.get('content-type') || '').toLowerCase();
    if (!ct.includes('application/pdf')) {
      // backend no devolvió PDF, abrir directamente
      window.location.href = url;
      return;
    }
    const blob = await resp.blob();
    const headerName = filenameFromDisposition(resp.headers.get('content-disposition'));
    const filename = headerName || fallbackName || 'Factura.pdf';
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(a.href);
    a.remove();
  }
    async function downloadPdf(url, fallbackName) {
    const resp = await fetch(url, { credentials: 'same-origin' });
    if (!resp.ok) throw new Error('HTTP ' + resp.status);
    const ct = (resp.headers.get('content-type') || '').toLowerCase();
    if (!ct.includes('application/pdf')) {
      // backend no devolvió PDF, abrir directamente
      window.location.href = url;
      return;
    }
    const blob = await resp.blob();
    const headerName = filenameFromDisposition(resp.headers.get('content-disposition'));
    const filename = headerName || fallbackName || 'Factura.pdf';
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(a.href);
    a.remove();
  }


  if (btnDesc) {
    btnDesc.addEventListener('click', async (e) => {
      e.preventDefault();
      const url = btnDesc.getAttribute('href');
      const fname = btnDesc.dataset.filename; // p.ej. "Factura-FACT-2025-00001.pdf"
      try {
        await downloadPdf(url, fname);
      } catch (err) {
        // Fallback: navegación normal
        window.location.href = url;
      }
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  // --- Modal "Ver factura" ---
  const modalEl = document.getElementById('facturaModal');
  const frame = document.getElementById('facturaFrame');
  if (modalEl && frame) {
    modalEl.addEventListener('show.bs.modal', (e) => {
      const btn = e.relatedTarget;
      const url = btn?.getAttribute('data-factura-url');
      if (url) frame.src = url;
    });
    modalEl.addEventListener('hidden.bs.modal', () => { frame.src = ''; });
  }

  // --- Descargar PDF desde backend (Playwright) ---
  const btnDesc = document.getElementById('btnDescargarFactura');

  function filenameFromDisposition(disposition) {
    if (!disposition) return null;
    // filename*=UTF-8''... o filename="..."
    let m = /filename\*=UTF-8''([^;]+)/i.exec(disposition);
    if (m && m[1]) return decodeURIComponent(m[1].replace(/["']/g, ''));
    m = /filename="?([^"]+)"?/i.exec(disposition);
    if (m && m[1]) return m[1];
    return null;
  }
    function filenameFromDisposition(disposition) {
    if (!disposition) return null;
    // filename*=UTF-8''... o filename="..."
    let m = /filename\*=UTF-8''([^;]+)/i.exec(disposition);
    if (m && m[1]) return decodeURIComponent(m[1].replace(/["']/g, ''));
    m = /filename="?([^"]+)"?/i.exec(disposition);
    if (m && m[1]) return m[1];
    return null;
  }


  async function downloadPdf(url, fallbackName) {
    const resp = await fetch(url, { credentials: 'same-origin' });
    if (!resp.ok) throw new Error('HTTP ' + resp.status);
    const ct = (resp.headers.get('content-type') || '').toLowerCase();
    if (!ct.includes('application/pdf')) {
      // backend no devolvió PDF, abrir directamente
      window.location.href = url;
      return;
    }
    const blob = await resp.blob();
    const headerName = filenameFromDisposition(resp.headers.get('content-disposition'));
    const filename = headerName || fallbackName || 'Factura.pdf';
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(a.href);
    a.remove();
  }
    async function downloadPdf(url, fallbackName) {
    const resp = await fetch(url, { credentials: 'same-origin' });
    if (!resp.ok) throw new Error('HTTP ' + resp.status);
    const ct = (resp.headers.get('content-type') || '').toLowerCase();
    if (!ct.includes('application/pdf')) {
      // backend no devolvió PDF, abrir directamente
      window.location.href = url;
      return;
    }
    const blob = await resp.blob();
    const headerName = filenameFromDisposition(resp.headers.get('content-disposition'));
    const filename = headerName || fallbackName || 'Factura.pdf';
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(a.href);
    a.remove();
  }


  if (btnDesc) {
    btnDesc.addEventListener('click', async (e) => {
      e.preventDefault();
      const url = btnDesc.getAttribute('href');
      const fname = btnDesc.dataset.filename; // p.ej. "Factura-FACT-2025-00001.pdf"
      try {
        await downloadPdf(url, fname);
      } catch (err) {
        // Fallback: navegación normal
        window.location.href = url;
      }
    });
  }
});