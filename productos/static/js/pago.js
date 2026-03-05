document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const pagoUrl = body.getAttribute('data-pago-url') || '/productos/pago/';
    const principalUrl = body.getAttribute('data-principal-url') || '/';
    const confirmacionPagoUrl = body.getAttribute('data-confirmacion-pago-url') || '/productos/confirmacion-pago/';
    const csrfToken = getCookie('csrftoken');

    let cartItems = [];
    try {
        const cartData = localStorage.getItem('dekkoCart');
        if (cartData) {
            cartItems = JSON.parse(cartData);
            if (!Array.isArray(cartItems)) {
                throw new Error('Formato de carrito inválido');
            }
        }
    } catch (e) {
        console.error('Error al leer el carrito:', e);
        localStorage.removeItem('dekkoCart');
        window.location.href = principalUrl;
        return;
    }

    if (cartItems.length === 0) {
        window.location.href = principalUrl;
        return;
    }

    displayCartItems(cartItems);
    const { subtotal, shipping, total } = calculateTotals(cartItems);
    updateTotals(subtotal, shipping, total);
    setupFormEvents(confirmacionPagoUrl, csrfToken);
    setupInputRestrictions();

    function displayCartItems(items) {
        const container = document.getElementById('order-items');
        if (container) {
            container.innerHTML = items.map(item => `
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <div class="d-flex align-items-center">
                        <img src="${item.image}" alt="${item.name}" width="60" height="60" class="rounded me-3">
                        <div>
                            <h6 class="mb-1">${item.name}</h6>
                            <small class="text-muted">${item.quantity} × L. ${item.price.toFixed(2)}</small>
                        </div>
                    </div>
                    <span>L. ${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            `).join('');
        }
    }

    function calculateTotals(items) {
        const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal * 0.05;
        const total = subtotal + shipping;
        return { subtotal, shipping, total };
    }

    function updateTotals(subtotal, shipping, total) {
        const elements = {
            'order-subtotal': subtotal.toFixed(2),
            'order-shipping': shipping.toFixed(2),
            'order-total': total.toFixed(2)
        };

        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = `L. ${value}`;
        });

        const totalInput = document.getElementById('totalValue');
        if (totalInput) totalInput.value = total.toFixed(2);

        const cartDataInput = document.getElementById('cartData');
        if (cartDataInput) cartDataInput.value = JSON.stringify(cartItems);
    }

    function setupFormEvents(confirmUrl, token) {
        const form = document.getElementById('payment-form');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                const submitBtn = document.getElementById('submit-payment');
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Procesando...';
                }

                form.submit();
            }
        });

        setupLiveValidation();
    }

    function setupInputRestrictions() {
        // Teléfono - solo números
        const phone = document.getElementById('phone');
        if (phone) {
            phone.addEventListener('input', function(e) {
                e.target.value = e.target.value.replace(/\D/g, '');
            });
        }

        // Número de tarjeta - solo números con formato (modificado para aceptar cualquier combinación)
        const cardNumber = document.getElementById('cardNumber');
        if (cardNumber) {
            cardNumber.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                value = value.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
                e.target.value = value.slice(0, 19);
            });
        }

        // Fecha de expiración - solo números con formato MM/AA
        const cardExpiry = document.getElementById('cardExpiry');
        if (cardExpiry) {
            cardExpiry.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 2) {
                    value = value.substring(0, 2) + '/' + value.substring(2, 4);
                }
                e.target.value = value.slice(0, 5);
            });
        }

        // CVC - solo 3 números
        const cardCvc = document.getElementById('cardCvc');
        if (cardCvc) {
            cardCvc.addEventListener('input', function(e) {
                e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3);
            });
        }
    }

    function validateForm() {
        let isValid = true;
        
        const personalFields = [
            { id: 'firstName', error: 'firstName-error', validate: v => v.trim() !== '' },
            { id: 'lastName', error: 'lastName-error', validate: v => v.trim() !== '' },
            { id: 'phone', error: 'phone-error', validate: v => /^\d{8,15}$/.test(v.trim()) },
            { id: 'address', error: 'address-error', validate: v => v.trim() !== '' }
        ];

        personalFields.forEach(({ id, error, validate }) => {
            isValid = validateField(id, error, validate) && isValid;
        });

        const cardFields = [
            { id: 'cardNumber', error: 'cardNumber-error', validate: v => v.replace(/\s/g, '').length === 16 }, // Solo verifica que tenga 16 dígitos
            { 
                id: 'cardExpiry', 
                error: 'cardExpiry-error', 
                validate: v => {
                    if (!/^\d{2}\/\d{2}$/.test(v)) return false;
                    
                    const [month, year] = v.split('/').map(Number);
                    if (month < 1 || month > 12) return false;
                    
                    const currentYear = new Date().getFullYear() % 100;
                    const currentMonth = new Date().getMonth() + 1;
                    
                    if (year < currentYear) return false;
                    if (year === currentYear && month < currentMonth) return false;
                    
                    return true;
                }
            },
            { id: 'cardCvc', error: 'cardCvc-error', validate: v => /^\d{3}$/.test(v) },
            { id: 'cardName', error: 'cardName-error', validate: v => v.trim() !== '' }
        ];

        cardFields.forEach(({ id, error, validate }) => {
            isValid = validateField(id, error, validate) && isValid;
        });

        const terms = document.getElementById('terms');
        const termsError = document.getElementById('terms-error');
        if (terms && !terms.checked) {
            termsError.style.display = 'block';
            isValid = false;
        } else if (termsError) {
            termsError.style.display = 'none';
        }

        if (!isValid) {
            const firstError = document.querySelector('.error-message[style="display: block;"]');
            firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        return isValid;
    }

    function validateField(fieldId, errorId, validationFn) {
        const field = document.getElementById(fieldId);
        const error = document.getElementById(errorId);
        
        if (!field || !error) return true;
        
        const isValid = validationFn(field.value);
        error.style.display = isValid ? 'none' : 'block';
        field.classList.toggle('is-invalid', !isValid);
        
        return isValid;
    }

    function setupLiveValidation() {
        const fields = [
            { id: 'firstName', error: 'firstName-error', validate: v => v.trim() !== '' },
            { id: 'lastName', error: 'lastName-error', validate: v => v.trim() !== '' },
            { id: 'email', error: 'email-error', validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
            { id: 'phone', error: 'phone-error', validate: v => /^\d{8,15}$/.test(v.trim()) },
            { id: 'address', error: 'address-error', validate: v => v.trim() !== '' },
            { id: 'cardNumber', error: 'cardNumber-error', validate: v => v.replace(/\s/g, '').length === 16 }, // Solo verifica que tenga 16 dígitos
            { 
                id: 'cardExpiry', 
                error: 'cardExpiry-error', 
                validate: v => {
                    if (!/^\d{2}\/\d{2}$/.test(v)) return false;
                    
                    const [month, year] = v.split('/').map(Number);
                    if (month < 1 || month > 12) return false;
                    
                    const currentYear = new Date().getFullYear() % 100;
                    const currentMonth = new Date().getMonth() + 1;
                    
                    if (year < currentYear) return false;
                    if (year === currentYear && month < currentMonth) return false;
                    
                    return true;
                }
            },
            { id: 'cardCvc', error: 'cardCvc-error', validate: v => /^\d{3}$/.test(v) },
            { id: 'cardName', error: 'cardName-error', validate: v => v.trim() !== '' }
        ];

        fields.forEach(({ id, error, validate }) => {
            const field = document.getElementById(id);
            if (field) {
                field.addEventListener('input', () => {
                    if (id === 'cardExpiry') {
                        const value = field.value;
                        const errorElement = document.getElementById(error);
                        
                        if (!/^\d{2}\/\d{2}$/.test(value)) {
                            errorElement.textContent = 'Formato inválido (MM/AA)';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        const [month, year] = value.split('/').map(Number);
                        if (month < 1 || month > 12) {
                            errorElement.textContent = 'Mes inválido (1-12)';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        const currentYear = new Date().getFullYear() % 100;
                        const currentMonth = new Date().getMonth() + 1;
                        
                        if (year < currentYear || (year === currentYear && month < currentMonth)) {
                            errorElement.textContent = 'Tarjeta expirada';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        errorElement.style.display = 'none';
                        field.classList.remove('is-invalid');
                    } else {
                        validateField(id, error, validate);
                    }
                });
            }
        });

        const terms = document.getElementById('terms');
        if (terms) {
            terms.addEventListener('change', function() {
                const error = document.getElementById('terms-error');
                if (error) error.style.display = this.checked ? 'none' : 'block';
            });
        }
    }

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const pagoUrl = body.getAttribute('data-pago-url') || '/productos/pago/';
    const principalUrl = body.getAttribute('data-principal-url') || '/';
    const confirmacionPagoUrl = body.getAttribute('data-confirmacion-pago-url') || '/productos/confirmacion-pago/';
    const csrfToken = getCookie('csrftoken');

    let cartItems = [];
    try {
        const cartData = localStorage.getItem('dekkoCart');
        if (cartData) {
            cartItems = JSON.parse(cartData);
            if (!Array.isArray(cartItems)) {
                throw new Error('Formato de carrito inválido');
            }
        }
    } catch (e) {
        console.error('Error al leer el carrito:', e);
        localStorage.removeItem('dekkoCart');
        window.location.href = principalUrl;
        return;
    }

    if (cartItems.length === 0) {
        window.location.href = principalUrl;
        return;
    }

    displayCartItems(cartItems);
    const { subtotal, shipping, total } = calculateTotals(cartItems);
    updateTotals(subtotal, shipping, total);
    setupFormEvents(confirmacionPagoUrl, csrfToken);
    setupInputRestrictions();

    function displayCartItems(items) {
        const container = document.getElementById('order-items');
        if (container) {
            container.innerHTML = items.map(item => `
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <div class="d-flex align-items-center">
                        <img src="${item.image}" alt="${item.name}" width="60" height="60" class="rounded me-3">
                        <div>
                            <h6 class="mb-1">${item.name}</h6>
                            <small class="text-muted">${item.quantity} × L. ${item.price.toFixed(2)}</small>
                        </div>
                    </div>
                    <span>L. ${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            `).join('');
        }
    }

    function calculateTotals(items) {
        const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal * 0.05;
        const total = subtotal + shipping;
        return { subtotal, shipping, total };
    }

    function updateTotals(subtotal, shipping, total) {
        const elements = {
            'order-subtotal': subtotal.toFixed(2),
            'order-shipping': shipping.toFixed(2),
            'order-total': total.toFixed(2)
        };

        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = `L. ${value}`;
        });

        const totalInput = document.getElementById('totalValue');
        if (totalInput) totalInput.value = total.toFixed(2);

        const cartDataInput = document.getElementById('cartData');
        if (cartDataInput) cartDataInput.value = JSON.stringify(cartItems);
    }

    function setupFormEvents(confirmUrl, token) {
        const form = document.getElementById('payment-form');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                const submitBtn = document.getElementById('submit-payment');
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Procesando...';
                }

                form.submit();
            }
        });

        setupLiveValidation();
    }

    function setupInputRestrictions() {
        // Teléfono - solo números
        const phone = document.getElementById('phone');
        if (phone) {
            phone.addEventListener('input', function(e) {
                e.target.value = e.target.value.replace(/\D/g, '');
            });
        }

        // Número de tarjeta - solo números con formato (modificado para aceptar cualquier combinación)
        const cardNumber = document.getElementById('cardNumber');
        if (cardNumber) {
            cardNumber.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                value = value.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
                e.target.value = value.slice(0, 19);
            });
        }

        // Fecha de expiración - solo números con formato MM/AA
        const cardExpiry = document.getElementById('cardExpiry');
        if (cardExpiry) {
            cardExpiry.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 2) {
                    value = value.substring(0, 2) + '/' + value.substring(2, 4);
                }
                e.target.value = value.slice(0, 5);
            });
        }

        // CVC - solo 3 números
        const cardCvc = document.getElementById('cardCvc');
        if (cardCvc) {
            cardCvc.addEventListener('input', function(e) {
                e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3);
            });
        }
    }

    function validateForm() {
        let isValid = true;
        
        const personalFields = [
            { id: 'firstName', error: 'firstName-error', validate: v => v.trim() !== '' },
            { id: 'lastName', error: 'lastName-error', validate: v => v.trim() !== '' },
            { id: 'phone', error: 'phone-error', validate: v => /^\d{8,15}$/.test(v.trim()) },
            { id: 'address', error: 'address-error', validate: v => v.trim() !== '' }
        ];

        personalFields.forEach(({ id, error, validate }) => {
            isValid = validateField(id, error, validate) && isValid;
        });

        const cardFields = [
            { id: 'cardNumber', error: 'cardNumber-error', validate: v => v.replace(/\s/g, '').length === 16 }, // Solo verifica que tenga 16 dígitos
            { 
                id: 'cardExpiry', 
                error: 'cardExpiry-error', 
                validate: v => {
                    if (!/^\d{2}\/\d{2}$/.test(v)) return false;
                    
                    const [month, year] = v.split('/').map(Number);
                    if (month < 1 || month > 12) return false;
                    
                    const currentYear = new Date().getFullYear() % 100;
                    const currentMonth = new Date().getMonth() + 1;
                    
                    if (year < currentYear) return false;
                    if (year === currentYear && month < currentMonth) return false;
                    
                    return true;
                }
            },
            { id: 'cardCvc', error: 'cardCvc-error', validate: v => /^\d{3}$/.test(v) },
            { id: 'cardName', error: 'cardName-error', validate: v => v.trim() !== '' }
        ];

        cardFields.forEach(({ id, error, validate }) => {
            isValid = validateField(id, error, validate) && isValid;
        });

        const terms = document.getElementById('terms');
        const termsError = document.getElementById('terms-error');
        if (terms && !terms.checked) {
            termsError.style.display = 'block';
            isValid = false;
        } else if (termsError) {
            termsError.style.display = 'none';
        }

        if (!isValid) {
            const firstError = document.querySelector('.error-message[style="display: block;"]');
            firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        return isValid;
    }

    function validateField(fieldId, errorId, validationFn) {
        const field = document.getElementById(fieldId);
        const error = document.getElementById(errorId);
        
        if (!field || !error) return true;
        
        const isValid = validationFn(field.value);
        error.style.display = isValid ? 'none' : 'block';
        field.classList.toggle('is-invalid', !isValid);
        
        return isValid;
    }

    function setupLiveValidation() {
        const fields = [
            { id: 'firstName', error: 'firstName-error', validate: v => v.trim() !== '' },
            { id: 'lastName', error: 'lastName-error', validate: v => v.trim() !== '' },
            { id: 'email', error: 'email-error', validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
            { id: 'phone', error: 'phone-error', validate: v => /^\d{8,15}$/.test(v.trim()) },
            { id: 'address', error: 'address-error', validate: v => v.trim() !== '' },
            { id: 'cardNumber', error: 'cardNumber-error', validate: v => v.replace(/\s/g, '').length === 16 }, // Solo verifica que tenga 16 dígitos
            { 
                id: 'cardExpiry', 
                error: 'cardExpiry-error', 
                validate: v => {
                    if (!/^\d{2}\/\d{2}$/.test(v)) return false;
                    
                    const [month, year] = v.split('/').map(Number);
                    if (month < 1 || month > 12) return false;
                    
                    const currentYear = new Date().getFullYear() % 100;
                    const currentMonth = new Date().getMonth() + 1;
                    
                    if (year < currentYear) return false;
                    if (year === currentYear && month < currentMonth) return false;
                    
                    return true;
                }
            },
            { id: 'cardCvc', error: 'cardCvc-error', validate: v => /^\d{3}$/.test(v) },
            { id: 'cardName', error: 'cardName-error', validate: v => v.trim() !== '' }
        ];

        fields.forEach(({ id, error, validate }) => {
            const field = document.getElementById(id);
            if (field) {
                field.addEventListener('input', () => {
                    if (id === 'cardExpiry') {
                        const value = field.value;
                        const errorElement = document.getElementById(error);
                        
                        if (!/^\d{2}\/\d{2}$/.test(value)) {
                            errorElement.textContent = 'Formato inválido (MM/AA)';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        const [month, year] = value.split('/').map(Number);
                        if (month < 1 || month > 12) {
                            errorElement.textContent = 'Mes inválido (1-12)';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        const currentYear = new Date().getFullYear() % 100;
                        const currentMonth = new Date().getMonth() + 1;
                        
                        if (year < currentYear || (year === currentYear && month < currentMonth)) {
                            errorElement.textContent = 'Tarjeta expirada';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        errorElement.style.display = 'none';
                        field.classList.remove('is-invalid');
                    } else {
                        validateField(id, error, validate);
                    }
                });
            }
        });

        const terms = document.getElementById('terms');
        if (terms) {
            terms.addEventListener('change', function() {
                const error = document.getElementById('terms-error');
                if (error) error.style.display = this.checked ? 'none' : 'block';
            });
        }
    }

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const pagoUrl = body.getAttribute('data-pago-url') || '/productos/pago/';
    const principalUrl = body.getAttribute('data-principal-url') || '/';
    const confirmacionPagoUrl = body.getAttribute('data-confirmacion-pago-url') || '/productos/confirmacion-pago/';
    const csrfToken = getCookie('csrftoken');

    let cartItems = [];
    try {
        const cartData = localStorage.getItem('dekkoCart');
        if (cartData) {
            cartItems = JSON.parse(cartData);
            if (!Array.isArray(cartItems)) {
                throw new Error('Formato de carrito inválido');
            }
        }
    } catch (e) {
        console.error('Error al leer el carrito:', e);
        localStorage.removeItem('dekkoCart');
        window.location.href = principalUrl;
        return;
    }

    if (cartItems.length === 0) {
        window.location.href = principalUrl;
        return;
    }

    displayCartItems(cartItems);
    const { subtotal, shipping, total } = calculateTotals(cartItems);
    updateTotals(subtotal, shipping, total);
    setupFormEvents(confirmacionPagoUrl, csrfToken);
    setupInputRestrictions();

    function displayCartItems(items) {
        const container = document.getElementById('order-items');
        if (container) {
            container.innerHTML = items.map(item => `
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <div class="d-flex align-items-center">
                        <img src="${item.image}" alt="${item.name}" width="60" height="60" class="rounded me-3">
                        <div>
                            <h6 class="mb-1">${item.name}</h6>
                            <small class="text-muted">${item.quantity} × L. ${item.price.toFixed(2)}</small>
                        </div>
                    </div>
                    <span>L. ${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            `).join('');
        }
    }

    function calculateTotals(items) {
        const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal * 0.05;
        const total = subtotal + shipping;
        return { subtotal, shipping, total };
    }

    function updateTotals(subtotal, shipping, total) {
        const elements = {
            'order-subtotal': subtotal.toFixed(2),
            'order-shipping': shipping.toFixed(2),
            'order-total': total.toFixed(2)
        };

        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = `L. ${value}`;
        });

        const totalInput = document.getElementById('totalValue');
        if (totalInput) totalInput.value = total.toFixed(2);

        const cartDataInput = document.getElementById('cartData');
        if (cartDataInput) cartDataInput.value = JSON.stringify(cartItems);
    }

    function setupFormEvents(confirmUrl, token) {
        const form = document.getElementById('payment-form');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                const submitBtn = document.getElementById('submit-payment');
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Procesando...';
                }

                form.submit();
            }
        });

        setupLiveValidation();
    }

    function setupInputRestrictions() {
        // Teléfono - solo números
        const phone = document.getElementById('phone');
        if (phone) {
            phone.addEventListener('input', function(e) {
                e.target.value = e.target.value.replace(/\D/g, '');
            });
        }

        // Número de tarjeta - solo números con formato (modificado para aceptar cualquier combinación)
        const cardNumber = document.getElementById('cardNumber');
        if (cardNumber) {
            cardNumber.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                value = value.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
                e.target.value = value.slice(0, 19);
            });
        }

        // Fecha de expiración - solo números con formato MM/AA
        const cardExpiry = document.getElementById('cardExpiry');
        if (cardExpiry) {
            cardExpiry.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 2) {
                    value = value.substring(0, 2) + '/' + value.substring(2, 4);
                }
                e.target.value = value.slice(0, 5);
            });
        }

        // CVC - solo 3 números
        const cardCvc = document.getElementById('cardCvc');
        if (cardCvc) {
            cardCvc.addEventListener('input', function(e) {
                e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3);
            });
        }
    }

    function validateForm() {
        let isValid = true;
        
        const personalFields = [
            { id: 'firstName', error: 'firstName-error', validate: v => v.trim() !== '' },
            { id: 'lastName', error: 'lastName-error', validate: v => v.trim() !== '' },
            { id: 'phone', error: 'phone-error', validate: v => /^\d{8,15}$/.test(v.trim()) },
            { id: 'address', error: 'address-error', validate: v => v.trim() !== '' }
        ];

        personalFields.forEach(({ id, error, validate }) => {
            isValid = validateField(id, error, validate) && isValid;
        });

        const cardFields = [
            { id: 'cardNumber', error: 'cardNumber-error', validate: v => v.replace(/\s/g, '').length === 16 }, // Solo verifica que tenga 16 dígitos
            { 
                id: 'cardExpiry', 
                error: 'cardExpiry-error', 
                validate: v => {
                    if (!/^\d{2}\/\d{2}$/.test(v)) return false;
                    
                    const [month, year] = v.split('/').map(Number);
                    if (month < 1 || month > 12) return false;
                    
                    const currentYear = new Date().getFullYear() % 100;
                    const currentMonth = new Date().getMonth() + 1;
                    
                    if (year < currentYear) return false;
                    if (year === currentYear && month < currentMonth) return false;
                    
                    return true;
                }
            },
            { id: 'cardCvc', error: 'cardCvc-error', validate: v => /^\d{3}$/.test(v) },
            { id: 'cardName', error: 'cardName-error', validate: v => v.trim() !== '' }
        ];

        cardFields.forEach(({ id, error, validate }) => {
            isValid = validateField(id, error, validate) && isValid;
        });

        const terms = document.getElementById('terms');
        const termsError = document.getElementById('terms-error');
        if (terms && !terms.checked) {
            termsError.style.display = 'block';
            isValid = false;
        } else if (termsError) {
            termsError.style.display = 'none';
        }

        if (!isValid) {
            const firstError = document.querySelector('.error-message[style="display: block;"]');
            firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        return isValid;
    }

    function validateField(fieldId, errorId, validationFn) {
        const field = document.getElementById(fieldId);
        const error = document.getElementById(errorId);
        
        if (!field || !error) return true;
        
        const isValid = validationFn(field.value);
        error.style.display = isValid ? 'none' : 'block';
        field.classList.toggle('is-invalid', !isValid);
        
        return isValid;
    }

    function setupLiveValidation() {
        const fields = [
            { id: 'firstName', error: 'firstName-error', validate: v => v.trim() !== '' },
            { id: 'lastName', error: 'lastName-error', validate: v => v.trim() !== '' },
            { id: 'email', error: 'email-error', validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
            { id: 'phone', error: 'phone-error', validate: v => /^\d{8,15}$/.test(v.trim()) },
            { id: 'address', error: 'address-error', validate: v => v.trim() !== '' },
            { id: 'cardNumber', error: 'cardNumber-error', validate: v => v.replace(/\s/g, '').length === 16 }, // Solo verifica que tenga 16 dígitos
            { 
                id: 'cardExpiry', 
                error: 'cardExpiry-error', 
                validate: v => {
                    if (!/^\d{2}\/\d{2}$/.test(v)) return false;
                    
                    const [month, year] = v.split('/').map(Number);
                    if (month < 1 || month > 12) return false;
                    
                    const currentYear = new Date().getFullYear() % 100;
                    const currentMonth = new Date().getMonth() + 1;
                    
                    if (year < currentYear) return false;
                    if (year === currentYear && month < currentMonth) return false;
                    
                    return true;
                }
            },
            { id: 'cardCvc', error: 'cardCvc-error', validate: v => /^\d{3}$/.test(v) },
            { id: 'cardName', error: 'cardName-error', validate: v => v.trim() !== '' }
        ];

        fields.forEach(({ id, error, validate }) => {
            const field = document.getElementById(id);
            if (field) {
                field.addEventListener('input', () => {
                    if (id === 'cardExpiry') {
                        const value = field.value;
                        const errorElement = document.getElementById(error);
                        
                        if (!/^\d{2}\/\d{2}$/.test(value)) {
                            errorElement.textContent = 'Formato inválido (MM/AA)';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        const [month, year] = value.split('/').map(Number);
                        if (month < 1 || month > 12) {
                            errorElement.textContent = 'Mes inválido (1-12)';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        const currentYear = new Date().getFullYear() % 100;
                        const currentMonth = new Date().getMonth() + 1;
                        
                        if (year < currentYear || (year === currentYear && month < currentMonth)) {
                            errorElement.textContent = 'Tarjeta expirada';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        errorElement.style.display = 'none';
                        field.classList.remove('is-invalid');
                    } else {
                        validateField(id, error, validate);
                    }
                });
            }
        });

        const terms = document.getElementById('terms');
        if (terms) {
            terms.addEventListener('change', function() {
                const error = document.getElementById('terms-error');
                if (error) error.style.display = this.checked ? 'none' : 'block';
            });
        }
    }

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const pagoUrl = body.getAttribute('data-pago-url') || '/productos/pago/';
    const principalUrl = body.getAttribute('data-principal-url') || '/';
    const confirmacionPagoUrl = body.getAttribute('data-confirmacion-pago-url') || '/productos/confirmacion-pago/';
    const csrfToken = getCookie('csrftoken');

    let cartItems = [];
    try {
        const cartData = localStorage.getItem('dekkoCart');
        if (cartData) {
            cartItems = JSON.parse(cartData);
            if (!Array.isArray(cartItems)) {
                throw new Error('Formato de carrito inválido');
            }
        }
    } catch (e) {
        console.error('Error al leer el carrito:', e);
        localStorage.removeItem('dekkoCart');
        window.location.href = principalUrl;
        return;
    }

    if (cartItems.length === 0) {
        window.location.href = principalUrl;
        return;
    }

    displayCartItems(cartItems);
    const { subtotal, shipping, total } = calculateTotals(cartItems);
    updateTotals(subtotal, shipping, total);
    setupFormEvents(confirmacionPagoUrl, csrfToken);
    setupInputRestrictions();

    function displayCartItems(items) {
        const container = document.getElementById('order-items');
        if (container) {
            container.innerHTML = items.map(item => `
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <div class="d-flex align-items-center">
                        <img src="${item.image}" alt="${item.name}" width="60" height="60" class="rounded me-3">
                        <div>
                            <h6 class="mb-1">${item.name}</h6>
                            <small class="text-muted">${item.quantity} × L. ${item.price.toFixed(2)}</small>
                        </div>
                    </div>
                    <span>L. ${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            `).join('');
        }
    }

    function calculateTotals(items) {
        const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal * 0.05;
        const total = subtotal + shipping;
        return { subtotal, shipping, total };
    }

    function updateTotals(subtotal, shipping, total) {
        const elements = {
            'order-subtotal': subtotal.toFixed(2),
            'order-shipping': shipping.toFixed(2),
            'order-total': total.toFixed(2)
        };

        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = `L. ${value}`;
        });

        const totalInput = document.getElementById('totalValue');
        if (totalInput) totalInput.value = total.toFixed(2);

        const cartDataInput = document.getElementById('cartData');
        if (cartDataInput) cartDataInput.value = JSON.stringify(cartItems);
    }

    function setupFormEvents(confirmUrl, token) {
        const form = document.getElementById('payment-form');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                const submitBtn = document.getElementById('submit-payment');
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Procesando...';
                }

                form.submit();
            }
        });

        setupLiveValidation();
    }

    function setupInputRestrictions() {
        // Teléfono - solo números
        const phone = document.getElementById('phone');
        if (phone) {
            phone.addEventListener('input', function(e) {
                e.target.value = e.target.value.replace(/\D/g, '');
            });
        }

        // Número de tarjeta - solo números con formato (modificado para aceptar cualquier combinación)
        const cardNumber = document.getElementById('cardNumber');
        if (cardNumber) {
            cardNumber.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                value = value.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
                e.target.value = value.slice(0, 19);
            });
        }

        // Fecha de expiración - solo números con formato MM/AA
        const cardExpiry = document.getElementById('cardExpiry');
        if (cardExpiry) {
            cardExpiry.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 2) {
                    value = value.substring(0, 2) + '/' + value.substring(2, 4);
                }
                e.target.value = value.slice(0, 5);
            });
        }

        // CVC - solo 3 números
        const cardCvc = document.getElementById('cardCvc');
        if (cardCvc) {
            cardCvc.addEventListener('input', function(e) {
                e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3);
            });
        }
    }

    function validateForm() {
        let isValid = true;
        
        const personalFields = [
            { id: 'firstName', error: 'firstName-error', validate: v => v.trim() !== '' },
            { id: 'lastName', error: 'lastName-error', validate: v => v.trim() !== '' },
            { id: 'phone', error: 'phone-error', validate: v => /^\d{8,15}$/.test(v.trim()) },
            { id: 'address', error: 'address-error', validate: v => v.trim() !== '' }
        ];

        personalFields.forEach(({ id, error, validate }) => {
            isValid = validateField(id, error, validate) && isValid;
        });

        const cardFields = [
            { id: 'cardNumber', error: 'cardNumber-error', validate: v => v.replace(/\s/g, '').length === 16 }, // Solo verifica que tenga 16 dígitos
            { 
                id: 'cardExpiry', 
                error: 'cardExpiry-error', 
                validate: v => {
                    if (!/^\d{2}\/\d{2}$/.test(v)) return false;
                    
                    const [month, year] = v.split('/').map(Number);
                    if (month < 1 || month > 12) return false;
                    
                    const currentYear = new Date().getFullYear() % 100;
                    const currentMonth = new Date().getMonth() + 1;
                    
                    if (year < currentYear) return false;
                    if (year === currentYear && month < currentMonth) return false;
                    
                    return true;
                }
            },
            { id: 'cardCvc', error: 'cardCvc-error', validate: v => /^\d{3}$/.test(v) },
            { id: 'cardName', error: 'cardName-error', validate: v => v.trim() !== '' }
        ];

        cardFields.forEach(({ id, error, validate }) => {
            isValid = validateField(id, error, validate) && isValid;
        });

        const terms = document.getElementById('terms');
        const termsError = document.getElementById('terms-error');
        if (terms && !terms.checked) {
            termsError.style.display = 'block';
            isValid = false;
        } else if (termsError) {
            termsError.style.display = 'none';
        }

        if (!isValid) {
            const firstError = document.querySelector('.error-message[style="display: block;"]');
            firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        return isValid;
    }

    function validateField(fieldId, errorId, validationFn) {
        const field = document.getElementById(fieldId);
        const error = document.getElementById(errorId);
        
        if (!field || !error) return true;
        
        const isValid = validationFn(field.value);
        error.style.display = isValid ? 'none' : 'block';
        field.classList.toggle('is-invalid', !isValid);
        
        return isValid;
    }

    function setupLiveValidation() {
        const fields = [
            { id: 'firstName', error: 'firstName-error', validate: v => v.trim() !== '' },
            { id: 'lastName', error: 'lastName-error', validate: v => v.trim() !== '' },
            { id: 'email', error: 'email-error', validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
            { id: 'phone', error: 'phone-error', validate: v => /^\d{8,15}$/.test(v.trim()) },
            { id: 'address', error: 'address-error', validate: v => v.trim() !== '' },
            { id: 'cardNumber', error: 'cardNumber-error', validate: v => v.replace(/\s/g, '').length === 16 }, // Solo verifica que tenga 16 dígitos
            { 
                id: 'cardExpiry', 
                error: 'cardExpiry-error', 
                validate: v => {
                    if (!/^\d{2}\/\d{2}$/.test(v)) return false;
                    
                    const [month, year] = v.split('/').map(Number);
                    if (month < 1 || month > 12) return false;
                    
                    const currentYear = new Date().getFullYear() % 100;
                    const currentMonth = new Date().getMonth() + 1;
                    
                    if (year < currentYear) return false;
                    if (year === currentYear && month < currentMonth) return false;
                    
                    return true;
                }
            },
            { id: 'cardCvc', error: 'cardCvc-error', validate: v => /^\d{3}$/.test(v) },
            { id: 'cardName', error: 'cardName-error', validate: v => v.trim() !== '' }
        ];

        fields.forEach(({ id, error, validate }) => {
            const field = document.getElementById(id);
            if (field) {
                field.addEventListener('input', () => {
                    if (id === 'cardExpiry') {
                        const value = field.value;
                        const errorElement = document.getElementById(error);
                        
                        if (!/^\d{2}\/\d{2}$/.test(value)) {
                            errorElement.textContent = 'Formato inválido (MM/AA)';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        const [month, year] = value.split('/').map(Number);
                        if (month < 1 || month > 12) {
                            errorElement.textContent = 'Mes inválido (1-12)';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        const currentYear = new Date().getFullYear() % 100;
                        const currentMonth = new Date().getMonth() + 1;
                        
                        if (year < currentYear || (year === currentYear && month < currentMonth)) {
                            errorElement.textContent = 'Tarjeta expirada';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        errorElement.style.display = 'none';
                        field.classList.remove('is-invalid');
                    } else {
                        validateField(id, error, validate);
                    }
                });
            }
        });

        const terms = document.getElementById('terms');
        if (terms) {
            terms.addEventListener('change', function() {
                const error = document.getElementById('terms-error');
                if (error) error.style.display = this.checked ? 'none' : 'block';
            });
        }
    }

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const pagoUrl = body.getAttribute('data-pago-url') || '/productos/pago/';
    const principalUrl = body.getAttribute('data-principal-url') || '/';
    const confirmacionPagoUrl = body.getAttribute('data-confirmacion-pago-url') || '/productos/confirmacion-pago/';
    const csrfToken = getCookie('csrftoken');

    let cartItems = [];
    try {
        const cartData = localStorage.getItem('dekkoCart');
        if (cartData) {
            cartItems = JSON.parse(cartData);
            if (!Array.isArray(cartItems)) {
                throw new Error('Formato de carrito inválido');
            }
        }
    } catch (e) {
        console.error('Error al leer el carrito:', e);
        localStorage.removeItem('dekkoCart');
        window.location.href = principalUrl;
        return;
    }

    if (cartItems.length === 0) {
        window.location.href = principalUrl;
        return;
    }

    displayCartItems(cartItems);
    const { subtotal, shipping, total } = calculateTotals(cartItems);
    updateTotals(subtotal, shipping, total);
    setupFormEvents(confirmacionPagoUrl, csrfToken);
    setupInputRestrictions();

    function displayCartItems(items) {
        const container = document.getElementById('order-items');
        if (container) {
            container.innerHTML = items.map(item => `
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <div class="d-flex align-items-center">
                        <img src="${item.image}" alt="${item.name}" width="60" height="60" class="rounded me-3">
                        <div>
                            <h6 class="mb-1">${item.name}</h6>
                            <small class="text-muted">${item.quantity} × L. ${item.price.toFixed(2)}</small>
                        </div>
                    </div>
                    <span>L. ${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            `).join('');
        }
    }

    function calculateTotals(items) {
        const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal * 0.05;
        const total = subtotal + shipping;
        return { subtotal, shipping, total };
    }

    function updateTotals(subtotal, shipping, total) {
        const elements = {
            'order-subtotal': subtotal.toFixed(2),
            'order-shipping': shipping.toFixed(2),
            'order-total': total.toFixed(2)
        };

        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = `L. ${value}`;
        });

        const totalInput = document.getElementById('totalValue');
        if (totalInput) totalInput.value = total.toFixed(2);

        const cartDataInput = document.getElementById('cartData');
        if (cartDataInput) cartDataInput.value = JSON.stringify(cartItems);
    }

    function setupFormEvents(confirmUrl, token) {
        const form = document.getElementById('payment-form');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                const submitBtn = document.getElementById('submit-payment');
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Procesando...';
                }

                form.submit();
            }
        });

        setupLiveValidation();
    }

    function setupInputRestrictions() {
        // Teléfono - solo números
        const phone = document.getElementById('phone');
        if (phone) {
            phone.addEventListener('input', function(e) {
                e.target.value = e.target.value.replace(/\D/g, '');
            });
        }

        // Número de tarjeta - solo números con formato (modificado para aceptar cualquier combinación)
        const cardNumber = document.getElementById('cardNumber');
        if (cardNumber) {
            cardNumber.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                value = value.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
                e.target.value = value.slice(0, 19);
            });
        }

        // Fecha de expiración - solo números con formato MM/AA
        const cardExpiry = document.getElementById('cardExpiry');
        if (cardExpiry) {
            cardExpiry.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 2) {
                    value = value.substring(0, 2) + '/' + value.substring(2, 4);
                }
                e.target.value = value.slice(0, 5);
            });
        }

        // CVC - solo 3 números
        const cardCvc = document.getElementById('cardCvc');
        if (cardCvc) {
            cardCvc.addEventListener('input', function(e) {
                e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3);
            });
        }
    }

    function validateForm() {
        let isValid = true;
        
        const personalFields = [
            { id: 'firstName', error: 'firstName-error', validate: v => v.trim() !== '' },
            { id: 'lastName', error: 'lastName-error', validate: v => v.trim() !== '' },
            { id: 'phone', error: 'phone-error', validate: v => /^\d{8,15}$/.test(v.trim()) },
            { id: 'address', error: 'address-error', validate: v => v.trim() !== '' }
        ];

        personalFields.forEach(({ id, error, validate }) => {
            isValid = validateField(id, error, validate) && isValid;
        });

        const cardFields = [
            { id: 'cardNumber', error: 'cardNumber-error', validate: v => v.replace(/\s/g, '').length === 16 }, // Solo verifica que tenga 16 dígitos
            { 
                id: 'cardExpiry', 
                error: 'cardExpiry-error', 
                validate: v => {
                    if (!/^\d{2}\/\d{2}$/.test(v)) return false;
                    
                    const [month, year] = v.split('/').map(Number);
                    if (month < 1 || month > 12) return false;
                    
                    const currentYear = new Date().getFullYear() % 100;
                    const currentMonth = new Date().getMonth() + 1;
                    
                    if (year < currentYear) return false;
                    if (year === currentYear && month < currentMonth) return false;
                    
                    return true;
                }
            },
            { id: 'cardCvc', error: 'cardCvc-error', validate: v => /^\d{3}$/.test(v) },
            { id: 'cardName', error: 'cardName-error', validate: v => v.trim() !== '' }
        ];

        cardFields.forEach(({ id, error, validate }) => {
            isValid = validateField(id, error, validate) && isValid;
        });

        const terms = document.getElementById('terms');
        const termsError = document.getElementById('terms-error');
        if (terms && !terms.checked) {
            termsError.style.display = 'block';
            isValid = false;
        } else if (termsError) {
            termsError.style.display = 'none';
        }

        if (!isValid) {
            const firstError = document.querySelector('.error-message[style="display: block;"]');
            firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        return isValid;
    }

    function validateField(fieldId, errorId, validationFn) {
        const field = document.getElementById(fieldId);
        const error = document.getElementById(errorId);
        
        if (!field || !error) return true;
        
        const isValid = validationFn(field.value);
        error.style.display = isValid ? 'none' : 'block';
        field.classList.toggle('is-invalid', !isValid);
        
        return isValid;
    }

    function setupLiveValidation() {
        const fields = [
            { id: 'firstName', error: 'firstName-error', validate: v => v.trim() !== '' },
            { id: 'lastName', error: 'lastName-error', validate: v => v.trim() !== '' },
            { id: 'email', error: 'email-error', validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
            { id: 'phone', error: 'phone-error', validate: v => /^\d{8,15}$/.test(v.trim()) },
            { id: 'address', error: 'address-error', validate: v => v.trim() !== '' },
            { id: 'cardNumber', error: 'cardNumber-error', validate: v => v.replace(/\s/g, '').length === 16 }, // Solo verifica que tenga 16 dígitos
            { 
                id: 'cardExpiry', 
                error: 'cardExpiry-error', 
                validate: v => {
                    if (!/^\d{2}\/\d{2}$/.test(v)) return false;
                    
                    const [month, year] = v.split('/').map(Number);
                    if (month < 1 || month > 12) return false;
                    
                    const currentYear = new Date().getFullYear() % 100;
                    const currentMonth = new Date().getMonth() + 1;
                    
                    if (year < currentYear) return false;
                    if (year === currentYear && month < currentMonth) return false;
                    
                    return true;
                }
            },
            { id: 'cardCvc', error: 'cardCvc-error', validate: v => /^\d{3}$/.test(v) },
            { id: 'cardName', error: 'cardName-error', validate: v => v.trim() !== '' }
        ];

        fields.forEach(({ id, error, validate }) => {
            const field = document.getElementById(id);
            if (field) {
                field.addEventListener('input', () => {
                    if (id === 'cardExpiry') {
                        const value = field.value;
                        const errorElement = document.getElementById(error);
                        
                        if (!/^\d{2}\/\d{2}$/.test(value)) {
                            errorElement.textContent = 'Formato inválido (MM/AA)';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        const [month, year] = value.split('/').map(Number);
                        if (month < 1 || month > 12) {
                            errorElement.textContent = 'Mes inválido (1-12)';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        const currentYear = new Date().getFullYear() % 100;
                        const currentMonth = new Date().getMonth() + 1;
                        
                        if (year < currentYear || (year === currentYear && month < currentMonth)) {
                            errorElement.textContent = 'Tarjeta expirada';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        errorElement.style.display = 'none';
                        field.classList.remove('is-invalid');
                    } else {
                        validateField(id, error, validate);
                    }
                });
            }
        });

        const terms = document.getElementById('terms');
        if (terms) {
            terms.addEventListener('change', function() {
                const error = document.getElementById('terms-error');
                if (error) error.style.display = this.checked ? 'none' : 'block';
            });
        }
    }

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const pagoUrl = body.getAttribute('data-pago-url') || '/productos/pago/';
    const principalUrl = body.getAttribute('data-principal-url') || '/';
    const confirmacionPagoUrl = body.getAttribute('data-confirmacion-pago-url') || '/productos/confirmacion-pago/';
    const csrfToken = getCookie('csrftoken');

    let cartItems = [];
    try {
        const cartData = localStorage.getItem('dekkoCart');
        if (cartData) {
            cartItems = JSON.parse(cartData);
            if (!Array.isArray(cartItems)) {
                throw new Error('Formato de carrito inválido');
            }
        }
    } catch (e) {
        console.error('Error al leer el carrito:', e);
        localStorage.removeItem('dekkoCart');
        window.location.href = principalUrl;
        return;
    }

    if (cartItems.length === 0) {
        window.location.href = principalUrl;
        return;
    }

    displayCartItems(cartItems);
    const { subtotal, shipping, total } = calculateTotals(cartItems);
    updateTotals(subtotal, shipping, total);
    setupFormEvents(confirmacionPagoUrl, csrfToken);
    setupInputRestrictions();

    function displayCartItems(items) {
        const container = document.getElementById('order-items');
        if (container) {
            container.innerHTML = items.map(item => `
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <div class="d-flex align-items-center">
                        <img src="${item.image}" alt="${item.name}" width="60" height="60" class="rounded me-3">
                        <div>
                            <h6 class="mb-1">${item.name}</h6>
                            <small class="text-muted">${item.quantity} × L. ${item.price.toFixed(2)}</small>
                        </div>
                    </div>
                    <span>L. ${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            `).join('');
        }
    }

    function calculateTotals(items) {
        const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal * 0.05;
        const total = subtotal + shipping;
        return { subtotal, shipping, total };
    }

    function updateTotals(subtotal, shipping, total) {
        const elements = {
            'order-subtotal': subtotal.toFixed(2),
            'order-shipping': shipping.toFixed(2),
            'order-total': total.toFixed(2)
        };

        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = `L. ${value}`;
        });

        const totalInput = document.getElementById('totalValue');
        if (totalInput) totalInput.value = total.toFixed(2);

        const cartDataInput = document.getElementById('cartData');
        if (cartDataInput) cartDataInput.value = JSON.stringify(cartItems);
    }

    function setupFormEvents(confirmUrl, token) {
        const form = document.getElementById('payment-form');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                const submitBtn = document.getElementById('submit-payment');
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Procesando...';
                }

                form.submit();
            }
        });

        setupLiveValidation();
    }

    function setupInputRestrictions() {
        // Teléfono - solo números
        const phone = document.getElementById('phone');
        if (phone) {
            phone.addEventListener('input', function(e) {
                e.target.value = e.target.value.replace(/\D/g, '');
            });
        }

        // Número de tarjeta - solo números con formato (modificado para aceptar cualquier combinación)
        const cardNumber = document.getElementById('cardNumber');
        if (cardNumber) {
            cardNumber.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                value = value.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
                e.target.value = value.slice(0, 19);
            });
        }

        // Fecha de expiración - solo números con formato MM/AA
        const cardExpiry = document.getElementById('cardExpiry');
        if (cardExpiry) {
            cardExpiry.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 2) {
                    value = value.substring(0, 2) + '/' + value.substring(2, 4);
                }
                e.target.value = value.slice(0, 5);
            });
        }

        // CVC - solo 3 números
        const cardCvc = document.getElementById('cardCvc');
        if (cardCvc) {
            cardCvc.addEventListener('input', function(e) {
                e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3);
            });
        }
    }

    function validateForm() {
        let isValid = true;
        
        const personalFields = [
            { id: 'firstName', error: 'firstName-error', validate: v => v.trim() !== '' },
            { id: 'lastName', error: 'lastName-error', validate: v => v.trim() !== '' },
            { id: 'phone', error: 'phone-error', validate: v => /^\d{8,15}$/.test(v.trim()) },
            { id: 'address', error: 'address-error', validate: v => v.trim() !== '' }
        ];

        personalFields.forEach(({ id, error, validate }) => {
            isValid = validateField(id, error, validate) && isValid;
        });

        const cardFields = [
            { id: 'cardNumber', error: 'cardNumber-error', validate: v => v.replace(/\s/g, '').length === 16 }, // Solo verifica que tenga 16 dígitos
            { 
                id: 'cardExpiry', 
                error: 'cardExpiry-error', 
                validate: v => {
                    if (!/^\d{2}\/\d{2}$/.test(v)) return false;
                    
                    const [month, year] = v.split('/').map(Number);
                    if (month < 1 || month > 12) return false;
                    
                    const currentYear = new Date().getFullYear() % 100;
                    const currentMonth = new Date().getMonth() + 1;
                    
                    if (year < currentYear) return false;
                    if (year === currentYear && month < currentMonth) return false;
                    
                    return true;
                }
            },
            { id: 'cardCvc', error: 'cardCvc-error', validate: v => /^\d{3}$/.test(v) },
            { id: 'cardName', error: 'cardName-error', validate: v => v.trim() !== '' }
        ];

        cardFields.forEach(({ id, error, validate }) => {
            isValid = validateField(id, error, validate) && isValid;
        });

        const terms = document.getElementById('terms');
        const termsError = document.getElementById('terms-error');
        if (terms && !terms.checked) {
            termsError.style.display = 'block';
            isValid = false;
        } else if (termsError) {
            termsError.style.display = 'none';
        }

        if (!isValid) {
            const firstError = document.querySelector('.error-message[style="display: block;"]');
            firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        return isValid;
    }

    function validateField(fieldId, errorId, validationFn) {
        const field = document.getElementById(fieldId);
        const error = document.getElementById(errorId);
        
        if (!field || !error) return true;
        
        const isValid = validationFn(field.value);
        error.style.display = isValid ? 'none' : 'block';
        field.classList.toggle('is-invalid', !isValid);
        
        return isValid;
    }

    function setupLiveValidation() {
        const fields = [
            { id: 'firstName', error: 'firstName-error', validate: v => v.trim() !== '' },
            { id: 'lastName', error: 'lastName-error', validate: v => v.trim() !== '' },
            { id: 'email', error: 'email-error', validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
            { id: 'phone', error: 'phone-error', validate: v => /^\d{8,15}$/.test(v.trim()) },
            { id: 'address', error: 'address-error', validate: v => v.trim() !== '' },
            { id: 'cardNumber', error: 'cardNumber-error', validate: v => v.replace(/\s/g, '').length === 16 }, // Solo verifica que tenga 16 dígitos
            { 
                id: 'cardExpiry', 
                error: 'cardExpiry-error', 
                validate: v => {
                    if (!/^\d{2}\/\d{2}$/.test(v)) return false;
                    
                    const [month, year] = v.split('/').map(Number);
                    if (month < 1 || month > 12) return false;
                    
                    const currentYear = new Date().getFullYear() % 100;
                    const currentMonth = new Date().getMonth() + 1;
                    
                    if (year < currentYear) return false;
                    if (year === currentYear && month < currentMonth) return false;
                    
                    return true;
                }
            },
            { id: 'cardCvc', error: 'cardCvc-error', validate: v => /^\d{3}$/.test(v) },
            { id: 'cardName', error: 'cardName-error', validate: v => v.trim() !== '' }
        ];

        fields.forEach(({ id, error, validate }) => {
            const field = document.getElementById(id);
            if (field) {
                field.addEventListener('input', () => {
                    if (id === 'cardExpiry') {
                        const value = field.value;
                        const errorElement = document.getElementById(error);
                        
                        if (!/^\d{2}\/\d{2}$/.test(value)) {
                            errorElement.textContent = 'Formato inválido (MM/AA)';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        const [month, year] = value.split('/').map(Number);
                        if (month < 1 || month > 12) {
                            errorElement.textContent = 'Mes inválido (1-12)';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        const currentYear = new Date().getFullYear() % 100;
                        const currentMonth = new Date().getMonth() + 1;
                        
                        if (year < currentYear || (year === currentYear && month < currentMonth)) {
                            errorElement.textContent = 'Tarjeta expirada';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        errorElement.style.display = 'none';
                        field.classList.remove('is-invalid');
                    } else {
                        validateField(id, error, validate);
                    }
                });
            }
        });

        const terms = document.getElementById('terms');
        if (terms) {
            terms.addEventListener('change', function() {
                const error = document.getElementById('terms-error');
                if (error) error.style.display = this.checked ? 'none' : 'block';
            });
        }
    }

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const pagoUrl = body.getAttribute('data-pago-url') || '/productos/pago/';
    const principalUrl = body.getAttribute('data-principal-url') || '/';
    const confirmacionPagoUrl = body.getAttribute('data-confirmacion-pago-url') || '/productos/confirmacion-pago/';
    const csrfToken = getCookie('csrftoken');

    let cartItems = [];
    try {
        const cartData = localStorage.getItem('dekkoCart');
        if (cartData) {
            cartItems = JSON.parse(cartData);
            if (!Array.isArray(cartItems)) {
                throw new Error('Formato de carrito inválido');
            }
        }
    } catch (e) {
        console.error('Error al leer el carrito:', e);
        localStorage.removeItem('dekkoCart');
        window.location.href = principalUrl;
        return;
    }

    if (cartItems.length === 0) {
        window.location.href = principalUrl;
        return;
    }

    displayCartItems(cartItems);
    const { subtotal, shipping, total } = calculateTotals(cartItems);
    updateTotals(subtotal, shipping, total);
    setupFormEvents(confirmacionPagoUrl, csrfToken);
    setupInputRestrictions();

    function displayCartItems(items) {
        const container = document.getElementById('order-items');
        if (container) {
            container.innerHTML = items.map(item => `
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <div class="d-flex align-items-center">
                        <img src="${item.image}" alt="${item.name}" width="60" height="60" class="rounded me-3">
                        <div>
                            <h6 class="mb-1">${item.name}</h6>
                            <small class="text-muted">${item.quantity} × L. ${item.price.toFixed(2)}</small>
                        </div>
                    </div>
                    <span>L. ${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            `).join('');
        }
    }

    function calculateTotals(items) {
        const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal * 0.05;
        const total = subtotal + shipping;
        return { subtotal, shipping, total };
    }

    function updateTotals(subtotal, shipping, total) {
        const elements = {
            'order-subtotal': subtotal.toFixed(2),
            'order-shipping': shipping.toFixed(2),
            'order-total': total.toFixed(2)
        };

        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = `L. ${value}`;
        });

        const totalInput = document.getElementById('totalValue');
        if (totalInput) totalInput.value = total.toFixed(2);

        const cartDataInput = document.getElementById('cartData');
        if (cartDataInput) cartDataInput.value = JSON.stringify(cartItems);
    }

    function setupFormEvents(confirmUrl, token) {
        const form = document.getElementById('payment-form');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                const submitBtn = document.getElementById('submit-payment');
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Procesando...';
                }

                form.submit();
            }
        });

        setupLiveValidation();
    }

    function setupInputRestrictions() {
        // Teléfono - solo números
        const phone = document.getElementById('phone');
        if (phone) {
            phone.addEventListener('input', function(e) {
                e.target.value = e.target.value.replace(/\D/g, '');
            });
        }

        // Número de tarjeta - solo números con formato (modificado para aceptar cualquier combinación)
        const cardNumber = document.getElementById('cardNumber');
        if (cardNumber) {
            cardNumber.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                value = value.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
                e.target.value = value.slice(0, 19);
            });
        }

        // Fecha de expiración - solo números con formato MM/AA
        const cardExpiry = document.getElementById('cardExpiry');
        if (cardExpiry) {
            cardExpiry.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 2) {
                    value = value.substring(0, 2) + '/' + value.substring(2, 4);
                }
                e.target.value = value.slice(0, 5);
            });
        }

        // CVC - solo 3 números
        const cardCvc = document.getElementById('cardCvc');
        if (cardCvc) {
            cardCvc.addEventListener('input', function(e) {
                e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3);
            });
        }
    }

    function validateForm() {
        let isValid = true;
        
        const personalFields = [
            { id: 'firstName', error: 'firstName-error', validate: v => v.trim() !== '' },
            { id: 'lastName', error: 'lastName-error', validate: v => v.trim() !== '' },
            { id: 'phone', error: 'phone-error', validate: v => /^\d{8,15}$/.test(v.trim()) },
            { id: 'address', error: 'address-error', validate: v => v.trim() !== '' }
        ];

        personalFields.forEach(({ id, error, validate }) => {
            isValid = validateField(id, error, validate) && isValid;
        });

        const cardFields = [
            { id: 'cardNumber', error: 'cardNumber-error', validate: v => v.replace(/\s/g, '').length === 16 }, // Solo verifica que tenga 16 dígitos
            { 
                id: 'cardExpiry', 
                error: 'cardExpiry-error', 
                validate: v => {
                    if (!/^\d{2}\/\d{2}$/.test(v)) return false;
                    
                    const [month, year] = v.split('/').map(Number);
                    if (month < 1 || month > 12) return false;
                    
                    const currentYear = new Date().getFullYear() % 100;
                    const currentMonth = new Date().getMonth() + 1;
                    
                    if (year < currentYear) return false;
                    if (year === currentYear && month < currentMonth) return false;
                    
                    return true;
                }
            },
            { id: 'cardCvc', error: 'cardCvc-error', validate: v => /^\d{3}$/.test(v) },
            { id: 'cardName', error: 'cardName-error', validate: v => v.trim() !== '' }
        ];

        cardFields.forEach(({ id, error, validate }) => {
            isValid = validateField(id, error, validate) && isValid;
        });

        const terms = document.getElementById('terms');
        const termsError = document.getElementById('terms-error');
        if (terms && !terms.checked) {
            termsError.style.display = 'block';
            isValid = false;
        } else if (termsError) {
            termsError.style.display = 'none';
        }

        if (!isValid) {
            const firstError = document.querySelector('.error-message[style="display: block;"]');
            firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        return isValid;
    }

    function validateField(fieldId, errorId, validationFn) {
        const field = document.getElementById(fieldId);
        const error = document.getElementById(errorId);
        
        if (!field || !error) return true;
        
        const isValid = validationFn(field.value);
        error.style.display = isValid ? 'none' : 'block';
        field.classList.toggle('is-invalid', !isValid);
        
        return isValid;
    }

    function setupLiveValidation() {
        const fields = [
            { id: 'firstName', error: 'firstName-error', validate: v => v.trim() !== '' },
            { id: 'lastName', error: 'lastName-error', validate: v => v.trim() !== '' },
            { id: 'email', error: 'email-error', validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
            { id: 'phone', error: 'phone-error', validate: v => /^\d{8,15}$/.test(v.trim()) },
            { id: 'address', error: 'address-error', validate: v => v.trim() !== '' },
            { id: 'cardNumber', error: 'cardNumber-error', validate: v => v.replace(/\s/g, '').length === 16 }, // Solo verifica que tenga 16 dígitos
            { 
                id: 'cardExpiry', 
                error: 'cardExpiry-error', 
                validate: v => {
                    if (!/^\d{2}\/\d{2}$/.test(v)) return false;
                    
                    const [month, year] = v.split('/').map(Number);
                    if (month < 1 || month > 12) return false;
                    
                    const currentYear = new Date().getFullYear() % 100;
                    const currentMonth = new Date().getMonth() + 1;
                    
                    if (year < currentYear) return false;
                    if (year === currentYear && month < currentMonth) return false;
                    
                    return true;
                }
            },
            { id: 'cardCvc', error: 'cardCvc-error', validate: v => /^\d{3}$/.test(v) },
            { id: 'cardName', error: 'cardName-error', validate: v => v.trim() !== '' }
        ];

        fields.forEach(({ id, error, validate }) => {
            const field = document.getElementById(id);
            if (field) {
                field.addEventListener('input', () => {
                    if (id === 'cardExpiry') {
                        const value = field.value;
                        const errorElement = document.getElementById(error);
                        
                        if (!/^\d{2}\/\d{2}$/.test(value)) {
                            errorElement.textContent = 'Formato inválido (MM/AA)';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        const [month, year] = value.split('/').map(Number);
                        if (month < 1 || month > 12) {
                            errorElement.textContent = 'Mes inválido (1-12)';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        const currentYear = new Date().getFullYear() % 100;
                        const currentMonth = new Date().getMonth() + 1;
                        
                        if (year < currentYear || (year === currentYear && month < currentMonth)) {
                            errorElement.textContent = 'Tarjeta expirada';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        errorElement.style.display = 'none';
                        field.classList.remove('is-invalid');
                    } else {
                        validateField(id, error, validate);
                    }
                });
            }
        });

        const terms = document.getElementById('terms');
        if (terms) {
            terms.addEventListener('change', function() {
                const error = document.getElementById('terms-error');
                if (error) error.style.display = this.checked ? 'none' : 'block';
            });
        }
    }

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const pagoUrl = body.getAttribute('data-pago-url') || '/productos/pago/';
    const principalUrl = body.getAttribute('data-principal-url') || '/';
    const confirmacionPagoUrl = body.getAttribute('data-confirmacion-pago-url') || '/productos/confirmacion-pago/';
    const csrfToken = getCookie('csrftoken');

    let cartItems = [];
    try {
        const cartData = localStorage.getItem('dekkoCart');
        if (cartData) {
            cartItems = JSON.parse(cartData);
            if (!Array.isArray(cartItems)) {
                throw new Error('Formato de carrito inválido');
            }
        }
    } catch (e) {
        console.error('Error al leer el carrito:', e);
        localStorage.removeItem('dekkoCart');
        window.location.href = principalUrl;
        return;
    }

    if (cartItems.length === 0) {
        window.location.href = principalUrl;
        return;
    }

    displayCartItems(cartItems);
    const { subtotal, shipping, total } = calculateTotals(cartItems);
    updateTotals(subtotal, shipping, total);
    setupFormEvents(confirmacionPagoUrl, csrfToken);
    setupInputRestrictions();

    function displayCartItems(items) {
        const container = document.getElementById('order-items');
        if (container) {
            container.innerHTML = items.map(item => `
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <div class="d-flex align-items-center">
                        <img src="${item.image}" alt="${item.name}" width="60" height="60" class="rounded me-3">
                        <div>
                            <h6 class="mb-1">${item.name}</h6>
                            <small class="text-muted">${item.quantity} × L. ${item.price.toFixed(2)}</small>
                        </div>
                    </div>
                    <span>L. ${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            `).join('');
        }
    }

    function calculateTotals(items) {
        const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal * 0.05;
        const total = subtotal + shipping;
        return { subtotal, shipping, total };
    }

    function updateTotals(subtotal, shipping, total) {
        const elements = {
            'order-subtotal': subtotal.toFixed(2),
            'order-shipping': shipping.toFixed(2),
            'order-total': total.toFixed(2)
        };

        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = `L. ${value}`;
        });

        const totalInput = document.getElementById('totalValue');
        if (totalInput) totalInput.value = total.toFixed(2);

        const cartDataInput = document.getElementById('cartData');
        if (cartDataInput) cartDataInput.value = JSON.stringify(cartItems);
    }

    function setupFormEvents(confirmUrl, token) {
        const form = document.getElementById('payment-form');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                const submitBtn = document.getElementById('submit-payment');
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Procesando...';
                }

                form.submit();
            }
        });

        setupLiveValidation();
    }

    function setupInputRestrictions() {
        // Teléfono - solo números
        const phone = document.getElementById('phone');
        if (phone) {
            phone.addEventListener('input', function(e) {
                e.target.value = e.target.value.replace(/\D/g, '');
            });
        }

        // Número de tarjeta - solo números con formato (modificado para aceptar cualquier combinación)
        const cardNumber = document.getElementById('cardNumber');
        if (cardNumber) {
            cardNumber.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                value = value.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
                e.target.value = value.slice(0, 19);
            });
        }

        // Fecha de expiración - solo números con formato MM/AA
        const cardExpiry = document.getElementById('cardExpiry');
        if (cardExpiry) {
            cardExpiry.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 2) {
                    value = value.substring(0, 2) + '/' + value.substring(2, 4);
                }
                e.target.value = value.slice(0, 5);
            });
        }

        // CVC - solo 3 números
        const cardCvc = document.getElementById('cardCvc');
        if (cardCvc) {
            cardCvc.addEventListener('input', function(e) {
                e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3);
            });
        }
    }

    function validateForm() {
        let isValid = true;
        
        const personalFields = [
            { id: 'firstName', error: 'firstName-error', validate: v => v.trim() !== '' },
            { id: 'lastName', error: 'lastName-error', validate: v => v.trim() !== '' },
            { id: 'phone', error: 'phone-error', validate: v => /^\d{8,15}$/.test(v.trim()) },
            { id: 'address', error: 'address-error', validate: v => v.trim() !== '' }
        ];

        personalFields.forEach(({ id, error, validate }) => {
            isValid = validateField(id, error, validate) && isValid;
        });

        const cardFields = [
            { id: 'cardNumber', error: 'cardNumber-error', validate: v => v.replace(/\s/g, '').length === 16 }, // Solo verifica que tenga 16 dígitos
            { 
                id: 'cardExpiry', 
                error: 'cardExpiry-error', 
                validate: v => {
                    if (!/^\d{2}\/\d{2}$/.test(v)) return false;
                    
                    const [month, year] = v.split('/').map(Number);
                    if (month < 1 || month > 12) return false;
                    
                    const currentYear = new Date().getFullYear() % 100;
                    const currentMonth = new Date().getMonth() + 1;
                    
                    if (year < currentYear) return false;
                    if (year === currentYear && month < currentMonth) return false;
                    
                    return true;
                }
            },
            { id: 'cardCvc', error: 'cardCvc-error', validate: v => /^\d{3}$/.test(v) },
            { id: 'cardName', error: 'cardName-error', validate: v => v.trim() !== '' }
        ];

        cardFields.forEach(({ id, error, validate }) => {
            isValid = validateField(id, error, validate) && isValid;
        });

        const terms = document.getElementById('terms');
        const termsError = document.getElementById('terms-error');
        if (terms && !terms.checked) {
            termsError.style.display = 'block';
            isValid = false;
        } else if (termsError) {
            termsError.style.display = 'none';
        }

        if (!isValid) {
            const firstError = document.querySelector('.error-message[style="display: block;"]');
            firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        return isValid;
    }

    function validateField(fieldId, errorId, validationFn) {
        const field = document.getElementById(fieldId);
        const error = document.getElementById(errorId);
        
        if (!field || !error) return true;
        
        const isValid = validationFn(field.value);
        error.style.display = isValid ? 'none' : 'block';
        field.classList.toggle('is-invalid', !isValid);
        
        return isValid;
    }

    function setupLiveValidation() {
        const fields = [
            { id: 'firstName', error: 'firstName-error', validate: v => v.trim() !== '' },
            { id: 'lastName', error: 'lastName-error', validate: v => v.trim() !== '' },
            { id: 'email', error: 'email-error', validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
            { id: 'phone', error: 'phone-error', validate: v => /^\d{8,15}$/.test(v.trim()) },
            { id: 'address', error: 'address-error', validate: v => v.trim() !== '' },
            { id: 'cardNumber', error: 'cardNumber-error', validate: v => v.replace(/\s/g, '').length === 16 }, // Solo verifica que tenga 16 dígitos
            { 
                id: 'cardExpiry', 
                error: 'cardExpiry-error', 
                validate: v => {
                    if (!/^\d{2}\/\d{2}$/.test(v)) return false;
                    
                    const [month, year] = v.split('/').map(Number);
                    if (month < 1 || month > 12) return false;
                    
                    const currentYear = new Date().getFullYear() % 100;
                    const currentMonth = new Date().getMonth() + 1;
                    
                    if (year < currentYear) return false;
                    if (year === currentYear && month < currentMonth) return false;
                    
                    return true;
                }
            },
            { id: 'cardCvc', error: 'cardCvc-error', validate: v => /^\d{3}$/.test(v) },
            { id: 'cardName', error: 'cardName-error', validate: v => v.trim() !== '' }
        ];

        fields.forEach(({ id, error, validate }) => {
            const field = document.getElementById(id);
            if (field) {
                field.addEventListener('input', () => {
                    if (id === 'cardExpiry') {
                        const value = field.value;
                        const errorElement = document.getElementById(error);
                        
                        if (!/^\d{2}\/\d{2}$/.test(value)) {
                            errorElement.textContent = 'Formato inválido (MM/AA)';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        const [month, year] = value.split('/').map(Number);
                        if (month < 1 || month > 12) {
                            errorElement.textContent = 'Mes inválido (1-12)';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        const currentYear = new Date().getFullYear() % 100;
                        const currentMonth = new Date().getMonth() + 1;
                        
                        if (year < currentYear || (year === currentYear && month < currentMonth)) {
                            errorElement.textContent = 'Tarjeta expirada';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        errorElement.style.display = 'none';
                        field.classList.remove('is-invalid');
                    } else {
                        validateField(id, error, validate);
                    }
                });
            }
        });

        const terms = document.getElementById('terms');
        if (terms) {
            terms.addEventListener('change', function() {
                const error = document.getElementById('terms-error');
                if (error) error.style.display = this.checked ? 'none' : 'block';
            });
        }
    }

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const pagoUrl = body.getAttribute('data-pago-url') || '/productos/pago/';
    const principalUrl = body.getAttribute('data-principal-url') || '/';
    const confirmacionPagoUrl = body.getAttribute('data-confirmacion-pago-url') || '/productos/confirmacion-pago/';
    const csrfToken = getCookie('csrftoken');

    let cartItems = [];
    try {
        const cartData = localStorage.getItem('dekkoCart');
        if (cartData) {
            cartItems = JSON.parse(cartData);
            if (!Array.isArray(cartItems)) {
                throw new Error('Formato de carrito inválido');
            }
        }
    } catch (e) {
        console.error('Error al leer el carrito:', e);
        localStorage.removeItem('dekkoCart');
        window.location.href = principalUrl;
        return;
    }

    if (cartItems.length === 0) {
        window.location.href = principalUrl;
        return;
    }

    displayCartItems(cartItems);
    const { subtotal, shipping, total } = calculateTotals(cartItems);
    updateTotals(subtotal, shipping, total);
    setupFormEvents(confirmacionPagoUrl, csrfToken);
    setupInputRestrictions();

    function displayCartItems(items) {
        const container = document.getElementById('order-items');
        if (container) {
            container.innerHTML = items.map(item => `
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <div class="d-flex align-items-center">
                        <img src="${item.image}" alt="${item.name}" width="60" height="60" class="rounded me-3">
                        <div>
                            <h6 class="mb-1">${item.name}</h6>
                            <small class="text-muted">${item.quantity} × L. ${item.price.toFixed(2)}</small>
                        </div>
                    </div>
                    <span>L. ${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            `).join('');
        }
    }

    function calculateTotals(items) {
        const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal * 0.05;
        const total = subtotal + shipping;
        return { subtotal, shipping, total };
    }

    function updateTotals(subtotal, shipping, total) {
        const elements = {
            'order-subtotal': subtotal.toFixed(2),
            'order-shipping': shipping.toFixed(2),
            'order-total': total.toFixed(2)
        };

        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = `L. ${value}`;
        });

        const totalInput = document.getElementById('totalValue');
        if (totalInput) totalInput.value = total.toFixed(2);

        const cartDataInput = document.getElementById('cartData');
        if (cartDataInput) cartDataInput.value = JSON.stringify(cartItems);
    }

    function setupFormEvents(confirmUrl, token) {
        const form = document.getElementById('payment-form');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                const submitBtn = document.getElementById('submit-payment');
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Procesando...';
                }

                form.submit();
            }
        });

        setupLiveValidation();
    }

    function setupInputRestrictions() {
        // Teléfono - solo números
        const phone = document.getElementById('phone');
        if (phone) {
            phone.addEventListener('input', function(e) {
                e.target.value = e.target.value.replace(/\D/g, '');
            });
        }

        // Número de tarjeta - solo números con formato (modificado para aceptar cualquier combinación)
        const cardNumber = document.getElementById('cardNumber');
        if (cardNumber) {
            cardNumber.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                value = value.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
                e.target.value = value.slice(0, 19);
            });
        }

        // Fecha de expiración - solo números con formato MM/AA
        const cardExpiry = document.getElementById('cardExpiry');
        if (cardExpiry) {
            cardExpiry.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 2) {
                    value = value.substring(0, 2) + '/' + value.substring(2, 4);
                }
                e.target.value = value.slice(0, 5);
            });
        }

        // CVC - solo 3 números
        const cardCvc = document.getElementById('cardCvc');
        if (cardCvc) {
            cardCvc.addEventListener('input', function(e) {
                e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3);
            });
        }
    }

    function validateForm() {
        let isValid = true;
        
        const personalFields = [
            { id: 'firstName', error: 'firstName-error', validate: v => v.trim() !== '' },
            { id: 'lastName', error: 'lastName-error', validate: v => v.trim() !== '' },
            { id: 'phone', error: 'phone-error', validate: v => /^\d{8,15}$/.test(v.trim()) },
            { id: 'address', error: 'address-error', validate: v => v.trim() !== '' }
        ];

        personalFields.forEach(({ id, error, validate }) => {
            isValid = validateField(id, error, validate) && isValid;
        });

        const cardFields = [
            { id: 'cardNumber', error: 'cardNumber-error', validate: v => v.replace(/\s/g, '').length === 16 }, // Solo verifica que tenga 16 dígitos
            { 
                id: 'cardExpiry', 
                error: 'cardExpiry-error', 
                validate: v => {
                    if (!/^\d{2}\/\d{2}$/.test(v)) return false;
                    
                    const [month, year] = v.split('/').map(Number);
                    if (month < 1 || month > 12) return false;
                    
                    const currentYear = new Date().getFullYear() % 100;
                    const currentMonth = new Date().getMonth() + 1;
                    
                    if (year < currentYear) return false;
                    if (year === currentYear && month < currentMonth) return false;
                    
                    return true;
                }
            },
            { id: 'cardCvc', error: 'cardCvc-error', validate: v => /^\d{3}$/.test(v) },
            { id: 'cardName', error: 'cardName-error', validate: v => v.trim() !== '' }
        ];

        cardFields.forEach(({ id, error, validate }) => {
            isValid = validateField(id, error, validate) && isValid;
        });

        const terms = document.getElementById('terms');
        const termsError = document.getElementById('terms-error');
        if (terms && !terms.checked) {
            termsError.style.display = 'block';
            isValid = false;
        } else if (termsError) {
            termsError.style.display = 'none';
        }

        if (!isValid) {
            const firstError = document.querySelector('.error-message[style="display: block;"]');
            firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        return isValid;
    }

    function validateField(fieldId, errorId, validationFn) {
        const field = document.getElementById(fieldId);
        const error = document.getElementById(errorId);
        
        if (!field || !error) return true;
        
        const isValid = validationFn(field.value);
        error.style.display = isValid ? 'none' : 'block';
        field.classList.toggle('is-invalid', !isValid);
        
        return isValid;
    }

    function setupLiveValidation() {
        const fields = [
            { id: 'firstName', error: 'firstName-error', validate: v => v.trim() !== '' },
            { id: 'lastName', error: 'lastName-error', validate: v => v.trim() !== '' },
            { id: 'email', error: 'email-error', validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
            { id: 'phone', error: 'phone-error', validate: v => /^\d{8,15}$/.test(v.trim()) },
            { id: 'address', error: 'address-error', validate: v => v.trim() !== '' },
            { id: 'cardNumber', error: 'cardNumber-error', validate: v => v.replace(/\s/g, '').length === 16 }, // Solo verifica que tenga 16 dígitos
            { 
                id: 'cardExpiry', 
                error: 'cardExpiry-error', 
                validate: v => {
                    if (!/^\d{2}\/\d{2}$/.test(v)) return false;
                    
                    const [month, year] = v.split('/').map(Number);
                    if (month < 1 || month > 12) return false;
                    
                    const currentYear = new Date().getFullYear() % 100;
                    const currentMonth = new Date().getMonth() + 1;
                    
                    if (year < currentYear) return false;
                    if (year === currentYear && month < currentMonth) return false;
                    
                    return true;
                }
            },
            { id: 'cardCvc', error: 'cardCvc-error', validate: v => /^\d{3}$/.test(v) },
            { id: 'cardName', error: 'cardName-error', validate: v => v.trim() !== '' }
        ];

        fields.forEach(({ id, error, validate }) => {
            const field = document.getElementById(id);
            if (field) {
                field.addEventListener('input', () => {
                    if (id === 'cardExpiry') {
                        const value = field.value;
                        const errorElement = document.getElementById(error);
                        
                        if (!/^\d{2}\/\d{2}$/.test(value)) {
                            errorElement.textContent = 'Formato inválido (MM/AA)';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        const [month, year] = value.split('/').map(Number);
                        if (month < 1 || month > 12) {
                            errorElement.textContent = 'Mes inválido (1-12)';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        const currentYear = new Date().getFullYear() % 100;
                        const currentMonth = new Date().getMonth() + 1;
                        
                        if (year < currentYear || (year === currentYear && month < currentMonth)) {
                            errorElement.textContent = 'Tarjeta expirada';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        errorElement.style.display = 'none';
                        field.classList.remove('is-invalid');
                    } else {
                        validateField(id, error, validate);
                    }
                });
            }
        });

        const terms = document.getElementById('terms');
        if (terms) {
            terms.addEventListener('change', function() {
                const error = document.getElementById('terms-error');
                if (error) error.style.display = this.checked ? 'none' : 'block';
            });
        }
    }

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const pagoUrl = body.getAttribute('data-pago-url') || '/productos/pago/';
    const principalUrl = body.getAttribute('data-principal-url') || '/';
    const confirmacionPagoUrl = body.getAttribute('data-confirmacion-pago-url') || '/productos/confirmacion-pago/';
    const csrfToken = getCookie('csrftoken');

    let cartItems = [];
    try {
        const cartData = localStorage.getItem('dekkoCart');
        if (cartData) {
            cartItems = JSON.parse(cartData);
            if (!Array.isArray(cartItems)) {
                throw new Error('Formato de carrito inválido');
            }
        }
    } catch (e) {
        console.error('Error al leer el carrito:', e);
        localStorage.removeItem('dekkoCart');
        window.location.href = principalUrl;
        return;
    }

    if (cartItems.length === 0) {
        window.location.href = principalUrl;
        return;
    }

    displayCartItems(cartItems);
    const { subtotal, shipping, total } = calculateTotals(cartItems);
    updateTotals(subtotal, shipping, total);
    setupFormEvents(confirmacionPagoUrl, csrfToken);
    setupInputRestrictions();

    function displayCartItems(items) {
        const container = document.getElementById('order-items');
        if (container) {
            container.innerHTML = items.map(item => `
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <div class="d-flex align-items-center">
                        <img src="${item.image}" alt="${item.name}" width="60" height="60" class="rounded me-3">
                        <div>
                            <h6 class="mb-1">${item.name}</h6>
                            <small class="text-muted">${item.quantity} × L. ${item.price.toFixed(2)}</small>
                        </div>
                    </div>
                    <span>L. ${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            `).join('');
        }
    }

    function calculateTotals(items) {
        const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal * 0.05;
        const total = subtotal + shipping;
        return { subtotal, shipping, total };
    }

    function updateTotals(subtotal, shipping, total) {
        const elements = {
            'order-subtotal': subtotal.toFixed(2),
            'order-shipping': shipping.toFixed(2),
            'order-total': total.toFixed(2)
        };

        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = `L. ${value}`;
        });

        const totalInput = document.getElementById('totalValue');
        if (totalInput) totalInput.value = total.toFixed(2);

        const cartDataInput = document.getElementById('cartData');
        if (cartDataInput) cartDataInput.value = JSON.stringify(cartItems);
    }

    function setupFormEvents(confirmUrl, token) {
        const form = document.getElementById('payment-form');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                const submitBtn = document.getElementById('submit-payment');
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Procesando...';
                }

                form.submit();
            }
        });

        setupLiveValidation();
    }

    function setupInputRestrictions() {
        // Teléfono - solo números
        const phone = document.getElementById('phone');
        if (phone) {
            phone.addEventListener('input', function(e) {
                e.target.value = e.target.value.replace(/\D/g, '');
            });
        }

        // Número de tarjeta - solo números con formato (modificado para aceptar cualquier combinación)
        const cardNumber = document.getElementById('cardNumber');
        if (cardNumber) {
            cardNumber.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                value = value.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
                e.target.value = value.slice(0, 19);
            });
        }

        // Fecha de expiración - solo números con formato MM/AA
        const cardExpiry = document.getElementById('cardExpiry');
        if (cardExpiry) {
            cardExpiry.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 2) {
                    value = value.substring(0, 2) + '/' + value.substring(2, 4);
                }
                e.target.value = value.slice(0, 5);
            });
        }

        // CVC - solo 3 números
        const cardCvc = document.getElementById('cardCvc');
        if (cardCvc) {
            cardCvc.addEventListener('input', function(e) {
                e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3);
            });
        }
    }

    function validateForm() {
        let isValid = true;
        
        const personalFields = [
            { id: 'firstName', error: 'firstName-error', validate: v => v.trim() !== '' },
            { id: 'lastName', error: 'lastName-error', validate: v => v.trim() !== '' },
            { id: 'phone', error: 'phone-error', validate: v => /^\d{8,15}$/.test(v.trim()) },
            { id: 'address', error: 'address-error', validate: v => v.trim() !== '' }
        ];

        personalFields.forEach(({ id, error, validate }) => {
            isValid = validateField(id, error, validate) && isValid;
        });

        const cardFields = [
            { id: 'cardNumber', error: 'cardNumber-error', validate: v => v.replace(/\s/g, '').length === 16 }, // Solo verifica que tenga 16 dígitos
            { 
                id: 'cardExpiry', 
                error: 'cardExpiry-error', 
                validate: v => {
                    if (!/^\d{2}\/\d{2}$/.test(v)) return false;
                    
                    const [month, year] = v.split('/').map(Number);
                    if (month < 1 || month > 12) return false;
                    
                    const currentYear = new Date().getFullYear() % 100;
                    const currentMonth = new Date().getMonth() + 1;
                    
                    if (year < currentYear) return false;
                    if (year === currentYear && month < currentMonth) return false;
                    
                    return true;
                }
            },
            { id: 'cardCvc', error: 'cardCvc-error', validate: v => /^\d{3}$/.test(v) },
            { id: 'cardName', error: 'cardName-error', validate: v => v.trim() !== '' }
        ];

        cardFields.forEach(({ id, error, validate }) => {
            isValid = validateField(id, error, validate) && isValid;
        });

        const terms = document.getElementById('terms');
        const termsError = document.getElementById('terms-error');
        if (terms && !terms.checked) {
            termsError.style.display = 'block';
            isValid = false;
        } else if (termsError) {
            termsError.style.display = 'none';
        }

        if (!isValid) {
            const firstError = document.querySelector('.error-message[style="display: block;"]');
            firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        return isValid;
    }

    function validateField(fieldId, errorId, validationFn) {
        const field = document.getElementById(fieldId);
        const error = document.getElementById(errorId);
        
        if (!field || !error) return true;
        
        const isValid = validationFn(field.value);
        error.style.display = isValid ? 'none' : 'block';
        field.classList.toggle('is-invalid', !isValid);
        
        return isValid;
    }

    function setupLiveValidation() {
        const fields = [
            { id: 'firstName', error: 'firstName-error', validate: v => v.trim() !== '' },
            { id: 'lastName', error: 'lastName-error', validate: v => v.trim() !== '' },
            { id: 'email', error: 'email-error', validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
            { id: 'phone', error: 'phone-error', validate: v => /^\d{8,15}$/.test(v.trim()) },
            { id: 'address', error: 'address-error', validate: v => v.trim() !== '' },
            { id: 'cardNumber', error: 'cardNumber-error', validate: v => v.replace(/\s/g, '').length === 16 }, // Solo verifica que tenga 16 dígitos
            { 
                id: 'cardExpiry', 
                error: 'cardExpiry-error', 
                validate: v => {
                    if (!/^\d{2}\/\d{2}$/.test(v)) return false;
                    
                    const [month, year] = v.split('/').map(Number);
                    if (month < 1 || month > 12) return false;
                    
                    const currentYear = new Date().getFullYear() % 100;
                    const currentMonth = new Date().getMonth() + 1;
                    
                    if (year < currentYear) return false;
                    if (year === currentYear && month < currentMonth) return false;
                    
                    return true;
                }
            },
            { id: 'cardCvc', error: 'cardCvc-error', validate: v => /^\d{3}$/.test(v) },
            { id: 'cardName', error: 'cardName-error', validate: v => v.trim() !== '' }
        ];

        fields.forEach(({ id, error, validate }) => {
            const field = document.getElementById(id);
            if (field) {
                field.addEventListener('input', () => {
                    if (id === 'cardExpiry') {
                        const value = field.value;
                        const errorElement = document.getElementById(error);
                        
                        if (!/^\d{2}\/\d{2}$/.test(value)) {
                            errorElement.textContent = 'Formato inválido (MM/AA)';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        const [month, year] = value.split('/').map(Number);
                        if (month < 1 || month > 12) {
                            errorElement.textContent = 'Mes inválido (1-12)';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        const currentYear = new Date().getFullYear() % 100;
                        const currentMonth = new Date().getMonth() + 1;
                        
                        if (year < currentYear || (year === currentYear && month < currentMonth)) {
                            errorElement.textContent = 'Tarjeta expirada';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        errorElement.style.display = 'none';
                        field.classList.remove('is-invalid');
                    } else {
                        validateField(id, error, validate);
                    }
                });
            }
        });

        const terms = document.getElementById('terms');
        if (terms) {
            terms.addEventListener('change', function() {
                const error = document.getElementById('terms-error');
                if (error) error.style.display = this.checked ? 'none' : 'block';
            });
        }
    }

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const pagoUrl = body.getAttribute('data-pago-url') || '/productos/pago/';
    const principalUrl = body.getAttribute('data-principal-url') || '/';
    const confirmacionPagoUrl = body.getAttribute('data-confirmacion-pago-url') || '/productos/confirmacion-pago/';
    const csrfToken = getCookie('csrftoken');

    let cartItems = [];
    try {
        const cartData = localStorage.getItem('dekkoCart');
        if (cartData) {
            cartItems = JSON.parse(cartData);
            if (!Array.isArray(cartItems)) {
                throw new Error('Formato de carrito inválido');
            }
        }
    } catch (e) {
        console.error('Error al leer el carrito:', e);
        localStorage.removeItem('dekkoCart');
        window.location.href = principalUrl;
        return;
    }

    if (cartItems.length === 0) {
        window.location.href = principalUrl;
        return;
    }

    displayCartItems(cartItems);
    const { subtotal, shipping, total } = calculateTotals(cartItems);
    updateTotals(subtotal, shipping, total);
    setupFormEvents(confirmacionPagoUrl, csrfToken);
    setupInputRestrictions();

    function displayCartItems(items) {
        const container = document.getElementById('order-items');
        if (container) {
            container.innerHTML = items.map(item => `
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <div class="d-flex align-items-center">
                        <img src="${item.image}" alt="${item.name}" width="60" height="60" class="rounded me-3">
                        <div>
                            <h6 class="mb-1">${item.name}</h6>
                            <small class="text-muted">${item.quantity} × L. ${item.price.toFixed(2)}</small>
                        </div>
                    </div>
                    <span>L. ${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            `).join('');
        }
    }

    function calculateTotals(items) {
        const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal * 0.05;
        const total = subtotal + shipping;
        return { subtotal, shipping, total };
    }

    function updateTotals(subtotal, shipping, total) {
        const elements = {
            'order-subtotal': subtotal.toFixed(2),
            'order-shipping': shipping.toFixed(2),
            'order-total': total.toFixed(2)
        };

        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = `L. ${value}`;
        });

        const totalInput = document.getElementById('totalValue');
        if (totalInput) totalInput.value = total.toFixed(2);

        const cartDataInput = document.getElementById('cartData');
        if (cartDataInput) cartDataInput.value = JSON.stringify(cartItems);
    }

    function setupFormEvents(confirmUrl, token) {
        const form = document.getElementById('payment-form');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                const submitBtn = document.getElementById('submit-payment');
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Procesando...';
                }

                form.submit();
            }
        });

        setupLiveValidation();
    }

    function setupInputRestrictions() {
        // Teléfono - solo números
        const phone = document.getElementById('phone');
        if (phone) {
            phone.addEventListener('input', function(e) {
                e.target.value = e.target.value.replace(/\D/g, '');
            });
        }

        // Número de tarjeta - solo números con formato (modificado para aceptar cualquier combinación)
        const cardNumber = document.getElementById('cardNumber');
        if (cardNumber) {
            cardNumber.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                value = value.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
                e.target.value = value.slice(0, 19);
            });
        }

        // Fecha de expiración - solo números con formato MM/AA
        const cardExpiry = document.getElementById('cardExpiry');
        if (cardExpiry) {
            cardExpiry.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 2) {
                    value = value.substring(0, 2) + '/' + value.substring(2, 4);
                }
                e.target.value = value.slice(0, 5);
            });
        }

        // CVC - solo 3 números
        const cardCvc = document.getElementById('cardCvc');
        if (cardCvc) {
            cardCvc.addEventListener('input', function(e) {
                e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3);
            });
        }
    }

    function validateForm() {
        let isValid = true;
        
        const personalFields = [
            { id: 'firstName', error: 'firstName-error', validate: v => v.trim() !== '' },
            { id: 'lastName', error: 'lastName-error', validate: v => v.trim() !== '' },
            { id: 'phone', error: 'phone-error', validate: v => /^\d{8,15}$/.test(v.trim()) },
            { id: 'address', error: 'address-error', validate: v => v.trim() !== '' }
        ];

        personalFields.forEach(({ id, error, validate }) => {
            isValid = validateField(id, error, validate) && isValid;
        });

        const cardFields = [
            { id: 'cardNumber', error: 'cardNumber-error', validate: v => v.replace(/\s/g, '').length === 16 }, // Solo verifica que tenga 16 dígitos
            { 
                id: 'cardExpiry', 
                error: 'cardExpiry-error', 
                validate: v => {
                    if (!/^\d{2}\/\d{2}$/.test(v)) return false;
                    
                    const [month, year] = v.split('/').map(Number);
                    if (month < 1 || month > 12) return false;
                    
                    const currentYear = new Date().getFullYear() % 100;
                    const currentMonth = new Date().getMonth() + 1;
                    
                    if (year < currentYear) return false;
                    if (year === currentYear && month < currentMonth) return false;
                    
                    return true;
                }
            },
            { id: 'cardCvc', error: 'cardCvc-error', validate: v => /^\d{3}$/.test(v) },
            { id: 'cardName', error: 'cardName-error', validate: v => v.trim() !== '' }
        ];

        cardFields.forEach(({ id, error, validate }) => {
            isValid = validateField(id, error, validate) && isValid;
        });

        const terms = document.getElementById('terms');
        const termsError = document.getElementById('terms-error');
        if (terms && !terms.checked) {
            termsError.style.display = 'block';
            isValid = false;
        } else if (termsError) {
            termsError.style.display = 'none';
        }

        if (!isValid) {
            const firstError = document.querySelector('.error-message[style="display: block;"]');
            firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        return isValid;
    }

    function validateField(fieldId, errorId, validationFn) {
        const field = document.getElementById(fieldId);
        const error = document.getElementById(errorId);
        
        if (!field || !error) return true;
        
        const isValid = validationFn(field.value);
        error.style.display = isValid ? 'none' : 'block';
        field.classList.toggle('is-invalid', !isValid);
        
        return isValid;
    }

    function setupLiveValidation() {
        const fields = [
            { id: 'firstName', error: 'firstName-error', validate: v => v.trim() !== '' },
            { id: 'lastName', error: 'lastName-error', validate: v => v.trim() !== '' },
            { id: 'email', error: 'email-error', validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
            { id: 'phone', error: 'phone-error', validate: v => /^\d{8,15}$/.test(v.trim()) },
            { id: 'address', error: 'address-error', validate: v => v.trim() !== '' },
            { id: 'cardNumber', error: 'cardNumber-error', validate: v => v.replace(/\s/g, '').length === 16 }, // Solo verifica que tenga 16 dígitos
            { 
                id: 'cardExpiry', 
                error: 'cardExpiry-error', 
                validate: v => {
                    if (!/^\d{2}\/\d{2}$/.test(v)) return false;
                    
                    const [month, year] = v.split('/').map(Number);
                    if (month < 1 || month > 12) return false;
                    
                    const currentYear = new Date().getFullYear() % 100;
                    const currentMonth = new Date().getMonth() + 1;
                    
                    if (year < currentYear) return false;
                    if (year === currentYear && month < currentMonth) return false;
                    
                    return true;
                }
            },
            { id: 'cardCvc', error: 'cardCvc-error', validate: v => /^\d{3}$/.test(v) },
            { id: 'cardName', error: 'cardName-error', validate: v => v.trim() !== '' }
        ];

        fields.forEach(({ id, error, validate }) => {
            const field = document.getElementById(id);
            if (field) {
                field.addEventListener('input', () => {
                    if (id === 'cardExpiry') {
                        const value = field.value;
                        const errorElement = document.getElementById(error);
                        
                        if (!/^\d{2}\/\d{2}$/.test(value)) {
                            errorElement.textContent = 'Formato inválido (MM/AA)';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        const [month, year] = value.split('/').map(Number);
                        if (month < 1 || month > 12) {
                            errorElement.textContent = 'Mes inválido (1-12)';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        const currentYear = new Date().getFullYear() % 100;
                        const currentMonth = new Date().getMonth() + 1;
                        
                        if (year < currentYear || (year === currentYear && month < currentMonth)) {
                            errorElement.textContent = 'Tarjeta expirada';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        errorElement.style.display = 'none';
                        field.classList.remove('is-invalid');
                    } else {
                        validateField(id, error, validate);
                    }
                });
            }
        });

        const terms = document.getElementById('terms');
        if (terms) {
            terms.addEventListener('change', function() {
                const error = document.getElementById('terms-error');
                if (error) error.style.display = this.checked ? 'none' : 'block';
            });
        }
    }

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const pagoUrl = body.getAttribute('data-pago-url') || '/productos/pago/';
    const principalUrl = body.getAttribute('data-principal-url') || '/';
    const confirmacionPagoUrl = body.getAttribute('data-confirmacion-pago-url') || '/productos/confirmacion-pago/';
    const csrfToken = getCookie('csrftoken');

    let cartItems = [];
    try {
        const cartData = localStorage.getItem('dekkoCart');
        if (cartData) {
            cartItems = JSON.parse(cartData);
            if (!Array.isArray(cartItems)) {
                throw new Error('Formato de carrito inválido');
            }
        }
    } catch (e) {
        console.error('Error al leer el carrito:', e);
        localStorage.removeItem('dekkoCart');
        window.location.href = principalUrl;
        return;
    }

    if (cartItems.length === 0) {
        window.location.href = principalUrl;
        return;
    }

    displayCartItems(cartItems);
    const { subtotal, shipping, total } = calculateTotals(cartItems);
    updateTotals(subtotal, shipping, total);
    setupFormEvents(confirmacionPagoUrl, csrfToken);
    setupInputRestrictions();

    function displayCartItems(items) {
        const container = document.getElementById('order-items');
        if (container) {
            container.innerHTML = items.map(item => `
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <div class="d-flex align-items-center">
                        <img src="${item.image}" alt="${item.name}" width="60" height="60" class="rounded me-3">
                        <div>
                            <h6 class="mb-1">${item.name}</h6>
                            <small class="text-muted">${item.quantity} × L. ${item.price.toFixed(2)}</small>
                        </div>
                    </div>
                    <span>L. ${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            `).join('');
        }
    }

    function calculateTotals(items) {
        const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal * 0.05;
        const total = subtotal + shipping;
        return { subtotal, shipping, total };
    }

    function updateTotals(subtotal, shipping, total) {
        const elements = {
            'order-subtotal': subtotal.toFixed(2),
            'order-shipping': shipping.toFixed(2),
            'order-total': total.toFixed(2)
        };

        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = `L. ${value}`;
        });

        const totalInput = document.getElementById('totalValue');
        if (totalInput) totalInput.value = total.toFixed(2);

        const cartDataInput = document.getElementById('cartData');
        if (cartDataInput) cartDataInput.value = JSON.stringify(cartItems);
    }

    function setupFormEvents(confirmUrl, token) {
        const form = document.getElementById('payment-form');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                const submitBtn = document.getElementById('submit-payment');
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Procesando...';
                }

                form.submit();
            }
        });

        setupLiveValidation();
    }

    function setupInputRestrictions() {
        // Teléfono - solo números
        const phone = document.getElementById('phone');
        if (phone) {
            phone.addEventListener('input', function(e) {
                e.target.value = e.target.value.replace(/\D/g, '');
            });
        }

        // Número de tarjeta - solo números con formato (modificado para aceptar cualquier combinación)
        const cardNumber = document.getElementById('cardNumber');
        if (cardNumber) {
            cardNumber.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                value = value.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
                e.target.value = value.slice(0, 19);
            });
        }

        // Fecha de expiración - solo números con formato MM/AA
        const cardExpiry = document.getElementById('cardExpiry');
        if (cardExpiry) {
            cardExpiry.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 2) {
                    value = value.substring(0, 2) + '/' + value.substring(2, 4);
                }
                e.target.value = value.slice(0, 5);
            });
        }

        // CVC - solo 3 números
        const cardCvc = document.getElementById('cardCvc');
        if (cardCvc) {
            cardCvc.addEventListener('input', function(e) {
                e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3);
            });
        }
    }

    function validateForm() {
        let isValid = true;
        
        const personalFields = [
            { id: 'firstName', error: 'firstName-error', validate: v => v.trim() !== '' },
            { id: 'lastName', error: 'lastName-error', validate: v => v.trim() !== '' },
            { id: 'phone', error: 'phone-error', validate: v => /^\d{8,15}$/.test(v.trim()) },
            { id: 'address', error: 'address-error', validate: v => v.trim() !== '' }
        ];

        personalFields.forEach(({ id, error, validate }) => {
            isValid = validateField(id, error, validate) && isValid;
        });

        const cardFields = [
            { id: 'cardNumber', error: 'cardNumber-error', validate: v => v.replace(/\s/g, '').length === 16 }, // Solo verifica que tenga 16 dígitos
            { 
                id: 'cardExpiry', 
                error: 'cardExpiry-error', 
                validate: v => {
                    if (!/^\d{2}\/\d{2}$/.test(v)) return false;
                    
                    const [month, year] = v.split('/').map(Number);
                    if (month < 1 || month > 12) return false;
                    
                    const currentYear = new Date().getFullYear() % 100;
                    const currentMonth = new Date().getMonth() + 1;
                    
                    if (year < currentYear) return false;
                    if (year === currentYear && month < currentMonth) return false;
                    
                    return true;
                }
            },
            { id: 'cardCvc', error: 'cardCvc-error', validate: v => /^\d{3}$/.test(v) },
            { id: 'cardName', error: 'cardName-error', validate: v => v.trim() !== '' }
        ];

        cardFields.forEach(({ id, error, validate }) => {
            isValid = validateField(id, error, validate) && isValid;
        });

        const terms = document.getElementById('terms');
        const termsError = document.getElementById('terms-error');
        if (terms && !terms.checked) {
            termsError.style.display = 'block';
            isValid = false;
        } else if (termsError) {
            termsError.style.display = 'none';
        }

        if (!isValid) {
            const firstError = document.querySelector('.error-message[style="display: block;"]');
            firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        return isValid;
    }

    function validateField(fieldId, errorId, validationFn) {
        const field = document.getElementById(fieldId);
        const error = document.getElementById(errorId);
        
        if (!field || !error) return true;
        
        const isValid = validationFn(field.value);
        error.style.display = isValid ? 'none' : 'block';
        field.classList.toggle('is-invalid', !isValid);
        
        return isValid;
    }

    function setupLiveValidation() {
        const fields = [
            { id: 'firstName', error: 'firstName-error', validate: v => v.trim() !== '' },
            { id: 'lastName', error: 'lastName-error', validate: v => v.trim() !== '' },
            { id: 'email', error: 'email-error', validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
            { id: 'phone', error: 'phone-error', validate: v => /^\d{8,15}$/.test(v.trim()) },
            { id: 'address', error: 'address-error', validate: v => v.trim() !== '' },
            { id: 'cardNumber', error: 'cardNumber-error', validate: v => v.replace(/\s/g, '').length === 16 }, // Solo verifica que tenga 16 dígitos
            { 
                id: 'cardExpiry', 
                error: 'cardExpiry-error', 
                validate: v => {
                    if (!/^\d{2}\/\d{2}$/.test(v)) return false;
                    
                    const [month, year] = v.split('/').map(Number);
                    if (month < 1 || month > 12) return false;
                    
                    const currentYear = new Date().getFullYear() % 100;
                    const currentMonth = new Date().getMonth() + 1;
                    
                    if (year < currentYear) return false;
                    if (year === currentYear && month < currentMonth) return false;
                    
                    return true;
                }
            },
            { id: 'cardCvc', error: 'cardCvc-error', validate: v => /^\d{3}$/.test(v) },
            { id: 'cardName', error: 'cardName-error', validate: v => v.trim() !== '' }
        ];

        fields.forEach(({ id, error, validate }) => {
            const field = document.getElementById(id);
            if (field) {
                field.addEventListener('input', () => {
                    if (id === 'cardExpiry') {
                        const value = field.value;
                        const errorElement = document.getElementById(error);
                        
                        if (!/^\d{2}\/\d{2}$/.test(value)) {
                            errorElement.textContent = 'Formato inválido (MM/AA)';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        const [month, year] = value.split('/').map(Number);
                        if (month < 1 || month > 12) {
                            errorElement.textContent = 'Mes inválido (1-12)';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        const currentYear = new Date().getFullYear() % 100;
                        const currentMonth = new Date().getMonth() + 1;
                        
                        if (year < currentYear || (year === currentYear && month < currentMonth)) {
                            errorElement.textContent = 'Tarjeta expirada';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        errorElement.style.display = 'none';
                        field.classList.remove('is-invalid');
                    } else {
                        validateField(id, error, validate);
                    }
                });
            }
        });

        const terms = document.getElementById('terms');
        if (terms) {
            terms.addEventListener('change', function() {
                const error = document.getElementById('terms-error');
                if (error) error.style.display = this.checked ? 'none' : 'block';
            });
        }
    }

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const pagoUrl = body.getAttribute('data-pago-url') || '/productos/pago/';
    const principalUrl = body.getAttribute('data-principal-url') || '/';
    const confirmacionPagoUrl = body.getAttribute('data-confirmacion-pago-url') || '/productos/confirmacion-pago/';
    const csrfToken = getCookie('csrftoken');

    let cartItems = [];
    try {
        const cartData = localStorage.getItem('dekkoCart');
        if (cartData) {
            cartItems = JSON.parse(cartData);
            if (!Array.isArray(cartItems)) {
                throw new Error('Formato de carrito inválido');
            }
        }
    } catch (e) {
        console.error('Error al leer el carrito:', e);
        localStorage.removeItem('dekkoCart');
        window.location.href = principalUrl;
        return;
    }

    if (cartItems.length === 0) {
        window.location.href = principalUrl;
        return;
    }

    displayCartItems(cartItems);
    const { subtotal, shipping, total } = calculateTotals(cartItems);
    updateTotals(subtotal, shipping, total);
    setupFormEvents(confirmacionPagoUrl, csrfToken);
    setupInputRestrictions();

    function displayCartItems(items) {
        const container = document.getElementById('order-items');
        if (container) {
            container.innerHTML = items.map(item => `
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <div class="d-flex align-items-center">
                        <img src="${item.image}" alt="${item.name}" width="60" height="60" class="rounded me-3">
                        <div>
                            <h6 class="mb-1">${item.name}</h6>
                            <small class="text-muted">${item.quantity} × L. ${item.price.toFixed(2)}</small>
                        </div>
                    </div>
                    <span>L. ${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            `).join('');
        }
    }

    function calculateTotals(items) {
        const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal * 0.05;
        const total = subtotal + shipping;
        return { subtotal, shipping, total };
    }

    function updateTotals(subtotal, shipping, total) {
        const elements = {
            'order-subtotal': subtotal.toFixed(2),
            'order-shipping': shipping.toFixed(2),
            'order-total': total.toFixed(2)
        };

        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = `L. ${value}`;
        });

        const totalInput = document.getElementById('totalValue');
        if (totalInput) totalInput.value = total.toFixed(2);

        const cartDataInput = document.getElementById('cartData');
        if (cartDataInput) cartDataInput.value = JSON.stringify(cartItems);
    }

    function setupFormEvents(confirmUrl, token) {
        const form = document.getElementById('payment-form');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                const submitBtn = document.getElementById('submit-payment');
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Procesando...';
                }

                form.submit();
            }
        });

        setupLiveValidation();
    }

    function setupInputRestrictions() {
        // Teléfono - solo números
        const phone = document.getElementById('phone');
        if (phone) {
            phone.addEventListener('input', function(e) {
                e.target.value = e.target.value.replace(/\D/g, '');
            });
        }

        // Número de tarjeta - solo números con formato (modificado para aceptar cualquier combinación)
        const cardNumber = document.getElementById('cardNumber');
        if (cardNumber) {
            cardNumber.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                value = value.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
                e.target.value = value.slice(0, 19);
            });
        }

        // Fecha de expiración - solo números con formato MM/AA
        const cardExpiry = document.getElementById('cardExpiry');
        if (cardExpiry) {
            cardExpiry.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 2) {
                    value = value.substring(0, 2) + '/' + value.substring(2, 4);
                }
                e.target.value = value.slice(0, 5);
            });
        }

        // CVC - solo 3 números
        const cardCvc = document.getElementById('cardCvc');
        if (cardCvc) {
            cardCvc.addEventListener('input', function(e) {
                e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3);
            });
        }
    }

    function validateForm() {
        let isValid = true;
        
        const personalFields = [
            { id: 'firstName', error: 'firstName-error', validate: v => v.trim() !== '' },
            { id: 'lastName', error: 'lastName-error', validate: v => v.trim() !== '' },
            { id: 'phone', error: 'phone-error', validate: v => /^\d{8,15}$/.test(v.trim()) },
            { id: 'address', error: 'address-error', validate: v => v.trim() !== '' }
        ];

        personalFields.forEach(({ id, error, validate }) => {
            isValid = validateField(id, error, validate) && isValid;
        });

        const cardFields = [
            { id: 'cardNumber', error: 'cardNumber-error', validate: v => v.replace(/\s/g, '').length === 16 }, // Solo verifica que tenga 16 dígitos
            { 
                id: 'cardExpiry', 
                error: 'cardExpiry-error', 
                validate: v => {
                    if (!/^\d{2}\/\d{2}$/.test(v)) return false;
                    
                    const [month, year] = v.split('/').map(Number);
                    if (month < 1 || month > 12) return false;
                    
                    const currentYear = new Date().getFullYear() % 100;
                    const currentMonth = new Date().getMonth() + 1;
                    
                    if (year < currentYear) return false;
                    if (year === currentYear && month < currentMonth) return false;
                    
                    return true;
                }
            },
            { id: 'cardCvc', error: 'cardCvc-error', validate: v => /^\d{3}$/.test(v) },
            { id: 'cardName', error: 'cardName-error', validate: v => v.trim() !== '' }
        ];

        cardFields.forEach(({ id, error, validate }) => {
            isValid = validateField(id, error, validate) && isValid;
        });

        const terms = document.getElementById('terms');
        const termsError = document.getElementById('terms-error');
        if (terms && !terms.checked) {
            termsError.style.display = 'block';
            isValid = false;
        } else if (termsError) {
            termsError.style.display = 'none';
        }

        if (!isValid) {
            const firstError = document.querySelector('.error-message[style="display: block;"]');
            firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        return isValid;
    }

    function validateField(fieldId, errorId, validationFn) {
        const field = document.getElementById(fieldId);
        const error = document.getElementById(errorId);
        
        if (!field || !error) return true;
        
        const isValid = validationFn(field.value);
        error.style.display = isValid ? 'none' : 'block';
        field.classList.toggle('is-invalid', !isValid);
        
        return isValid;
    }

    function setupLiveValidation() {
        const fields = [
            { id: 'firstName', error: 'firstName-error', validate: v => v.trim() !== '' },
            { id: 'lastName', error: 'lastName-error', validate: v => v.trim() !== '' },
            { id: 'email', error: 'email-error', validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
            { id: 'phone', error: 'phone-error', validate: v => /^\d{8,15}$/.test(v.trim()) },
            { id: 'address', error: 'address-error', validate: v => v.trim() !== '' },
            { id: 'cardNumber', error: 'cardNumber-error', validate: v => v.replace(/\s/g, '').length === 16 }, // Solo verifica que tenga 16 dígitos
            { 
                id: 'cardExpiry', 
                error: 'cardExpiry-error', 
                validate: v => {
                    if (!/^\d{2}\/\d{2}$/.test(v)) return false;
                    
                    const [month, year] = v.split('/').map(Number);
                    if (month < 1 || month > 12) return false;
                    
                    const currentYear = new Date().getFullYear() % 100;
                    const currentMonth = new Date().getMonth() + 1;
                    
                    if (year < currentYear) return false;
                    if (year === currentYear && month < currentMonth) return false;
                    
                    return true;
                }
            },
            { id: 'cardCvc', error: 'cardCvc-error', validate: v => /^\d{3}$/.test(v) },
            { id: 'cardName', error: 'cardName-error', validate: v => v.trim() !== '' }
        ];

        fields.forEach(({ id, error, validate }) => {
            const field = document.getElementById(id);
            if (field) {
                field.addEventListener('input', () => {
                    if (id === 'cardExpiry') {
                        const value = field.value;
                        const errorElement = document.getElementById(error);
                        
                        if (!/^\d{2}\/\d{2}$/.test(value)) {
                            errorElement.textContent = 'Formato inválido (MM/AA)';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        const [month, year] = value.split('/').map(Number);
                        if (month < 1 || month > 12) {
                            errorElement.textContent = 'Mes inválido (1-12)';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        const currentYear = new Date().getFullYear() % 100;
                        const currentMonth = new Date().getMonth() + 1;
                        
                        if (year < currentYear || (year === currentYear && month < currentMonth)) {
                            errorElement.textContent = 'Tarjeta expirada';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        errorElement.style.display = 'none';
                        field.classList.remove('is-invalid');
                    } else {
                        validateField(id, error, validate);
                    }
                });
            }
        });

        const terms = document.getElementById('terms');
        if (terms) {
            terms.addEventListener('change', function() {
                const error = document.getElementById('terms-error');
                if (error) error.style.display = this.checked ? 'none' : 'block';
            });
        }
    }

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const pagoUrl = body.getAttribute('data-pago-url') || '/productos/pago/';
    const principalUrl = body.getAttribute('data-principal-url') || '/';
    const confirmacionPagoUrl = body.getAttribute('data-confirmacion-pago-url') || '/productos/confirmacion-pago/';
    const csrfToken = getCookie('csrftoken');

    let cartItems = [];
    try {
        const cartData = localStorage.getItem('dekkoCart');
        if (cartData) {
            cartItems = JSON.parse(cartData);
            if (!Array.isArray(cartItems)) {
                throw new Error('Formato de carrito inválido');
            }
        }
    } catch (e) {
        console.error('Error al leer el carrito:', e);
        localStorage.removeItem('dekkoCart');
        window.location.href = principalUrl;
        return;
    }

    if (cartItems.length === 0) {
        window.location.href = principalUrl;
        return;
    }

    displayCartItems(cartItems);
    const { subtotal, shipping, total } = calculateTotals(cartItems);
    updateTotals(subtotal, shipping, total);
    setupFormEvents(confirmacionPagoUrl, csrfToken);
    setupInputRestrictions();

    function displayCartItems(items) {
        const container = document.getElementById('order-items');
        if (container) {
            container.innerHTML = items.map(item => `
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <div class="d-flex align-items-center">
                        <img src="${item.image}" alt="${item.name}" width="60" height="60" class="rounded me-3">
                        <div>
                            <h6 class="mb-1">${item.name}</h6>
                            <small class="text-muted">${item.quantity} × L. ${item.price.toFixed(2)}</small>
                        </div>
                    </div>
                    <span>L. ${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            `).join('');
        }
    }

    function calculateTotals(items) {
        const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal * 0.05;
        const total = subtotal + shipping;
        return { subtotal, shipping, total };
    }

    function updateTotals(subtotal, shipping, total) {
        const elements = {
            'order-subtotal': subtotal.toFixed(2),
            'order-shipping': shipping.toFixed(2),
            'order-total': total.toFixed(2)
        };

        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = `L. ${value}`;
        });

        const totalInput = document.getElementById('totalValue');
        if (totalInput) totalInput.value = total.toFixed(2);

        const cartDataInput = document.getElementById('cartData');
        if (cartDataInput) cartDataInput.value = JSON.stringify(cartItems);
    }

    function setupFormEvents(confirmUrl, token) {
        const form = document.getElementById('payment-form');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                const submitBtn = document.getElementById('submit-payment');
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Procesando...';
                }

                form.submit();
            }
        });

        setupLiveValidation();
    }

    function setupInputRestrictions() {
        // Teléfono - solo números
        const phone = document.getElementById('phone');
        if (phone) {
            phone.addEventListener('input', function(e) {
                e.target.value = e.target.value.replace(/\D/g, '');
            });
        }

        // Número de tarjeta - solo números con formato (modificado para aceptar cualquier combinación)
        const cardNumber = document.getElementById('cardNumber');
        if (cardNumber) {
            cardNumber.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                value = value.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
                e.target.value = value.slice(0, 19);
            });
        }

        // Fecha de expiración - solo números con formato MM/AA
        const cardExpiry = document.getElementById('cardExpiry');
        if (cardExpiry) {
            cardExpiry.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 2) {
                    value = value.substring(0, 2) + '/' + value.substring(2, 4);
                }
                e.target.value = value.slice(0, 5);
            });
        }

        // CVC - solo 3 números
        const cardCvc = document.getElementById('cardCvc');
        if (cardCvc) {
            cardCvc.addEventListener('input', function(e) {
                e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3);
            });
        }
    }

    function validateForm() {
        let isValid = true;
        
        const personalFields = [
            { id: 'firstName', error: 'firstName-error', validate: v => v.trim() !== '' },
            { id: 'lastName', error: 'lastName-error', validate: v => v.trim() !== '' },
            { id: 'phone', error: 'phone-error', validate: v => /^\d{8,15}$/.test(v.trim()) },
            { id: 'address', error: 'address-error', validate: v => v.trim() !== '' }
        ];

        personalFields.forEach(({ id, error, validate }) => {
            isValid = validateField(id, error, validate) && isValid;
        });

        const cardFields = [
            { id: 'cardNumber', error: 'cardNumber-error', validate: v => v.replace(/\s/g, '').length === 16 }, // Solo verifica que tenga 16 dígitos
            { 
                id: 'cardExpiry', 
                error: 'cardExpiry-error', 
                validate: v => {
                    if (!/^\d{2}\/\d{2}$/.test(v)) return false;
                    
                    const [month, year] = v.split('/').map(Number);
                    if (month < 1 || month > 12) return false;
                    
                    const currentYear = new Date().getFullYear() % 100;
                    const currentMonth = new Date().getMonth() + 1;
                    
                    if (year < currentYear) return false;
                    if (year === currentYear && month < currentMonth) return false;
                    
                    return true;
                }
            },
            { id: 'cardCvc', error: 'cardCvc-error', validate: v => /^\d{3}$/.test(v) },
            { id: 'cardName', error: 'cardName-error', validate: v => v.trim() !== '' }
        ];

        cardFields.forEach(({ id, error, validate }) => {
            isValid = validateField(id, error, validate) && isValid;
        });

        const terms = document.getElementById('terms');
        const termsError = document.getElementById('terms-error');
        if (terms && !terms.checked) {
            termsError.style.display = 'block';
            isValid = false;
        } else if (termsError) {
            termsError.style.display = 'none';
        }

        if (!isValid) {
            const firstError = document.querySelector('.error-message[style="display: block;"]');
            firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        return isValid;
    }

    function validateField(fieldId, errorId, validationFn) {
        const field = document.getElementById(fieldId);
        const error = document.getElementById(errorId);
        
        if (!field || !error) return true;
        
        const isValid = validationFn(field.value);
        error.style.display = isValid ? 'none' : 'block';
        field.classList.toggle('is-invalid', !isValid);
        
        return isValid;
    }

    function setupLiveValidation() {
        const fields = [
            { id: 'firstName', error: 'firstName-error', validate: v => v.trim() !== '' },
            { id: 'lastName', error: 'lastName-error', validate: v => v.trim() !== '' },
            { id: 'email', error: 'email-error', validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
            { id: 'phone', error: 'phone-error', validate: v => /^\d{8,15}$/.test(v.trim()) },
            { id: 'address', error: 'address-error', validate: v => v.trim() !== '' },
            { id: 'cardNumber', error: 'cardNumber-error', validate: v => v.replace(/\s/g, '').length === 16 }, // Solo verifica que tenga 16 dígitos
            { 
                id: 'cardExpiry', 
                error: 'cardExpiry-error', 
                validate: v => {
                    if (!/^\d{2}\/\d{2}$/.test(v)) return false;
                    
                    const [month, year] = v.split('/').map(Number);
                    if (month < 1 || month > 12) return false;
                    
                    const currentYear = new Date().getFullYear() % 100;
                    const currentMonth = new Date().getMonth() + 1;
                    
                    if (year < currentYear) return false;
                    if (year === currentYear && month < currentMonth) return false;
                    
                    return true;
                }
            },
            { id: 'cardCvc', error: 'cardCvc-error', validate: v => /^\d{3}$/.test(v) },
            { id: 'cardName', error: 'cardName-error', validate: v => v.trim() !== '' }
        ];

        fields.forEach(({ id, error, validate }) => {
            const field = document.getElementById(id);
            if (field) {
                field.addEventListener('input', () => {
                    if (id === 'cardExpiry') {
                        const value = field.value;
                        const errorElement = document.getElementById(error);
                        
                        if (!/^\d{2}\/\d{2}$/.test(value)) {
                            errorElement.textContent = 'Formato inválido (MM/AA)';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        const [month, year] = value.split('/').map(Number);
                        if (month < 1 || month > 12) {
                            errorElement.textContent = 'Mes inválido (1-12)';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        const currentYear = new Date().getFullYear() % 100;
                        const currentMonth = new Date().getMonth() + 1;
                        
                        if (year < currentYear || (year === currentYear && month < currentMonth)) {
                            errorElement.textContent = 'Tarjeta expirada';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        errorElement.style.display = 'none';
                        field.classList.remove('is-invalid');
                    } else {
                        validateField(id, error, validate);
                    }
                });
            }
        });

        const terms = document.getElementById('terms');
        if (terms) {
            terms.addEventListener('change', function() {
                const error = document.getElementById('terms-error');
                if (error) error.style.display = this.checked ? 'none' : 'block';
            });
        }
    }

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const pagoUrl = body.getAttribute('data-pago-url') || '/productos/pago/';
    const principalUrl = body.getAttribute('data-principal-url') || '/';
    const confirmacionPagoUrl = body.getAttribute('data-confirmacion-pago-url') || '/productos/confirmacion-pago/';
    const csrfToken = getCookie('csrftoken');

    let cartItems = [];
    try {
        const cartData = localStorage.getItem('dekkoCart');
        if (cartData) {
            cartItems = JSON.parse(cartData);
            if (!Array.isArray(cartItems)) {
                throw new Error('Formato de carrito inválido');
            }
        }
    } catch (e) {
        console.error('Error al leer el carrito:', e);
        localStorage.removeItem('dekkoCart');
        window.location.href = principalUrl;
        return;
    }

    if (cartItems.length === 0) {
        window.location.href = principalUrl;
        return;
    }

    displayCartItems(cartItems);
    const { subtotal, shipping, total } = calculateTotals(cartItems);
    updateTotals(subtotal, shipping, total);
    setupFormEvents(confirmacionPagoUrl, csrfToken);
    setupInputRestrictions();

    function displayCartItems(items) {
        const container = document.getElementById('order-items');
        if (container) {
            container.innerHTML = items.map(item => `
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <div class="d-flex align-items-center">
                        <img src="${item.image}" alt="${item.name}" width="60" height="60" class="rounded me-3">
                        <div>
                            <h6 class="mb-1">${item.name}</h6>
                            <small class="text-muted">${item.quantity} × L. ${item.price.toFixed(2)}</small>
                        </div>
                    </div>
                    <span>L. ${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            `).join('');
        }
    }

    function calculateTotals(items) {
        const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal * 0.05;
        const total = subtotal + shipping;
        return { subtotal, shipping, total };
    }

    function updateTotals(subtotal, shipping, total) {
        const elements = {
            'order-subtotal': subtotal.toFixed(2),
            'order-shipping': shipping.toFixed(2),
            'order-total': total.toFixed(2)
        };

        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = `L. ${value}`;
        });

        const totalInput = document.getElementById('totalValue');
        if (totalInput) totalInput.value = total.toFixed(2);

        const cartDataInput = document.getElementById('cartData');
        if (cartDataInput) cartDataInput.value = JSON.stringify(cartItems);
    }

    function setupFormEvents(confirmUrl, token) {
        const form = document.getElementById('payment-form');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                const submitBtn = document.getElementById('submit-payment');
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Procesando...';
                }

                form.submit();
            }
        });

        setupLiveValidation();
    }

    function setupInputRestrictions() {
        // Teléfono - solo números
        const phone = document.getElementById('phone');
        if (phone) {
            phone.addEventListener('input', function(e) {
                e.target.value = e.target.value.replace(/\D/g, '');
            });
        }

        // Número de tarjeta - solo números con formato (modificado para aceptar cualquier combinación)
        const cardNumber = document.getElementById('cardNumber');
        if (cardNumber) {
            cardNumber.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                value = value.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
                e.target.value = value.slice(0, 19);
            });
        }

        // Fecha de expiración - solo números con formato MM/AA
        const cardExpiry = document.getElementById('cardExpiry');
        if (cardExpiry) {
            cardExpiry.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 2) {
                    value = value.substring(0, 2) + '/' + value.substring(2, 4);
                }
                e.target.value = value.slice(0, 5);
            });
        }

        // CVC - solo 3 números
        const cardCvc = document.getElementById('cardCvc');
        if (cardCvc) {
            cardCvc.addEventListener('input', function(e) {
                e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3);
            });
        }
    }

    function validateForm() {
        let isValid = true;
        
        const personalFields = [
            { id: 'firstName', error: 'firstName-error', validate: v => v.trim() !== '' },
            { id: 'lastName', error: 'lastName-error', validate: v => v.trim() !== '' },
            { id: 'phone', error: 'phone-error', validate: v => /^\d{8,15}$/.test(v.trim()) },
            { id: 'address', error: 'address-error', validate: v => v.trim() !== '' }
        ];

        personalFields.forEach(({ id, error, validate }) => {
            isValid = validateField(id, error, validate) && isValid;
        });

        const cardFields = [
            { id: 'cardNumber', error: 'cardNumber-error', validate: v => v.replace(/\s/g, '').length === 16 }, // Solo verifica que tenga 16 dígitos
            { 
                id: 'cardExpiry', 
                error: 'cardExpiry-error', 
                validate: v => {
                    if (!/^\d{2}\/\d{2}$/.test(v)) return false;
                    
                    const [month, year] = v.split('/').map(Number);
                    if (month < 1 || month > 12) return false;
                    
                    const currentYear = new Date().getFullYear() % 100;
                    const currentMonth = new Date().getMonth() + 1;
                    
                    if (year < currentYear) return false;
                    if (year === currentYear && month < currentMonth) return false;
                    
                    return true;
                }
            },
            { id: 'cardCvc', error: 'cardCvc-error', validate: v => /^\d{3}$/.test(v) },
            { id: 'cardName', error: 'cardName-error', validate: v => v.trim() !== '' }
        ];

        cardFields.forEach(({ id, error, validate }) => {
            isValid = validateField(id, error, validate) && isValid;
        });

        const terms = document.getElementById('terms');
        const termsError = document.getElementById('terms-error');
        if (terms && !terms.checked) {
            termsError.style.display = 'block';
            isValid = false;
        } else if (termsError) {
            termsError.style.display = 'none';
        }

        if (!isValid) {
            const firstError = document.querySelector('.error-message[style="display: block;"]');
            firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        return isValid;
    }

    function validateField(fieldId, errorId, validationFn) {
        const field = document.getElementById(fieldId);
        const error = document.getElementById(errorId);
        
        if (!field || !error) return true;
        
        const isValid = validationFn(field.value);
        error.style.display = isValid ? 'none' : 'block';
        field.classList.toggle('is-invalid', !isValid);
        
        return isValid;
    }

    function setupLiveValidation() {
        const fields = [
            { id: 'firstName', error: 'firstName-error', validate: v => v.trim() !== '' },
            { id: 'lastName', error: 'lastName-error', validate: v => v.trim() !== '' },
            { id: 'email', error: 'email-error', validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
            { id: 'phone', error: 'phone-error', validate: v => /^\d{8,15}$/.test(v.trim()) },
            { id: 'address', error: 'address-error', validate: v => v.trim() !== '' },
            { id: 'cardNumber', error: 'cardNumber-error', validate: v => v.replace(/\s/g, '').length === 16 }, // Solo verifica que tenga 16 dígitos
            { 
                id: 'cardExpiry', 
                error: 'cardExpiry-error', 
                validate: v => {
                    if (!/^\d{2}\/\d{2}$/.test(v)) return false;
                    
                    const [month, year] = v.split('/').map(Number);
                    if (month < 1 || month > 12) return false;
                    
                    const currentYear = new Date().getFullYear() % 100;
                    const currentMonth = new Date().getMonth() + 1;
                    
                    if (year < currentYear) return false;
                    if (year === currentYear && month < currentMonth) return false;
                    
                    return true;
                }
            },
            { id: 'cardCvc', error: 'cardCvc-error', validate: v => /^\d{3}$/.test(v) },
            { id: 'cardName', error: 'cardName-error', validate: v => v.trim() !== '' }
        ];

        fields.forEach(({ id, error, validate }) => {
            const field = document.getElementById(id);
            if (field) {
                field.addEventListener('input', () => {
                    if (id === 'cardExpiry') {
                        const value = field.value;
                        const errorElement = document.getElementById(error);
                        
                        if (!/^\d{2}\/\d{2}$/.test(value)) {
                            errorElement.textContent = 'Formato inválido (MM/AA)';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        const [month, year] = value.split('/').map(Number);
                        if (month < 1 || month > 12) {
                            errorElement.textContent = 'Mes inválido (1-12)';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        const currentYear = new Date().getFullYear() % 100;
                        const currentMonth = new Date().getMonth() + 1;
                        
                        if (year < currentYear || (year === currentYear && month < currentMonth)) {
                            errorElement.textContent = 'Tarjeta expirada';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        errorElement.style.display = 'none';
                        field.classList.remove('is-invalid');
                    } else {
                        validateField(id, error, validate);
                    }
                });
            }
        });

        const terms = document.getElementById('terms');
        if (terms) {
            terms.addEventListener('change', function() {
                const error = document.getElementById('terms-error');
                if (error) error.style.display = this.checked ? 'none' : 'block';
            });
        }
    }

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const pagoUrl = body.getAttribute('data-pago-url') || '/productos/pago/';
    const principalUrl = body.getAttribute('data-principal-url') || '/';
    const confirmacionPagoUrl = body.getAttribute('data-confirmacion-pago-url') || '/productos/confirmacion-pago/';
    const csrfToken = getCookie('csrftoken');

    let cartItems = [];
    try {
        const cartData = localStorage.getItem('dekkoCart');
        if (cartData) {
            cartItems = JSON.parse(cartData);
            if (!Array.isArray(cartItems)) {
                throw new Error('Formato de carrito inválido');
            }
        }
    } catch (e) {
        console.error('Error al leer el carrito:', e);
        localStorage.removeItem('dekkoCart');
        window.location.href = principalUrl;
        return;
    }

    if (cartItems.length === 0) {
        window.location.href = principalUrl;
        return;
    }

    displayCartItems(cartItems);
    const { subtotal, shipping, total } = calculateTotals(cartItems);
    updateTotals(subtotal, shipping, total);
    setupFormEvents(confirmacionPagoUrl, csrfToken);
    setupInputRestrictions();

    function displayCartItems(items) {
        const container = document.getElementById('order-items');
        if (container) {
            container.innerHTML = items.map(item => `
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <div class="d-flex align-items-center">
                        <img src="${item.image}" alt="${item.name}" width="60" height="60" class="rounded me-3">
                        <div>
                            <h6 class="mb-1">${item.name}</h6>
                            <small class="text-muted">${item.quantity} × L. ${item.price.toFixed(2)}</small>
                        </div>
                    </div>
                    <span>L. ${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            `).join('');
        }
    }

    function calculateTotals(items) {
        const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal * 0.05;
        const total = subtotal + shipping;
        return { subtotal, shipping, total };
    }

    function updateTotals(subtotal, shipping, total) {
        const elements = {
            'order-subtotal': subtotal.toFixed(2),
            'order-shipping': shipping.toFixed(2),
            'order-total': total.toFixed(2)
        };

        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = `L. ${value}`;
        });

        const totalInput = document.getElementById('totalValue');
        if (totalInput) totalInput.value = total.toFixed(2);

        const cartDataInput = document.getElementById('cartData');
        if (cartDataInput) cartDataInput.value = JSON.stringify(cartItems);
    }

    function setupFormEvents(confirmUrl, token) {
        const form = document.getElementById('payment-form');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                const submitBtn = document.getElementById('submit-payment');
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Procesando...';
                }

                form.submit();
            }
        });

        setupLiveValidation();
    }

    function setupInputRestrictions() {
        // Teléfono - solo números
        const phone = document.getElementById('phone');
        if (phone) {
            phone.addEventListener('input', function(e) {
                e.target.value = e.target.value.replace(/\D/g, '');
            });
        }

        // Número de tarjeta - solo números con formato (modificado para aceptar cualquier combinación)
        const cardNumber = document.getElementById('cardNumber');
        if (cardNumber) {
            cardNumber.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                value = value.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
                e.target.value = value.slice(0, 19);
            });
        }

        // Fecha de expiración - solo números con formato MM/AA
        const cardExpiry = document.getElementById('cardExpiry');
        if (cardExpiry) {
            cardExpiry.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 2) {
                    value = value.substring(0, 2) + '/' + value.substring(2, 4);
                }
                e.target.value = value.slice(0, 5);
            });
        }

        // CVC - solo 3 números
        const cardCvc = document.getElementById('cardCvc');
        if (cardCvc) {
            cardCvc.addEventListener('input', function(e) {
                e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3);
            });
        }
    }

    function validateForm() {
        let isValid = true;
        
        const personalFields = [
            { id: 'firstName', error: 'firstName-error', validate: v => v.trim() !== '' },
            { id: 'lastName', error: 'lastName-error', validate: v => v.trim() !== '' },
            { id: 'phone', error: 'phone-error', validate: v => /^\d{8,15}$/.test(v.trim()) },
            { id: 'address', error: 'address-error', validate: v => v.trim() !== '' }
        ];

        personalFields.forEach(({ id, error, validate }) => {
            isValid = validateField(id, error, validate) && isValid;
        });

        const cardFields = [
            { id: 'cardNumber', error: 'cardNumber-error', validate: v => v.replace(/\s/g, '').length === 16 }, // Solo verifica que tenga 16 dígitos
            { 
                id: 'cardExpiry', 
                error: 'cardExpiry-error', 
                validate: v => {
                    if (!/^\d{2}\/\d{2}$/.test(v)) return false;
                    
                    const [month, year] = v.split('/').map(Number);
                    if (month < 1 || month > 12) return false;
                    
                    const currentYear = new Date().getFullYear() % 100;
                    const currentMonth = new Date().getMonth() + 1;
                    
                    if (year < currentYear) return false;
                    if (year === currentYear && month < currentMonth) return false;
                    
                    return true;
                }
            },
            { id: 'cardCvc', error: 'cardCvc-error', validate: v => /^\d{3}$/.test(v) },
            { id: 'cardName', error: 'cardName-error', validate: v => v.trim() !== '' }
        ];

        cardFields.forEach(({ id, error, validate }) => {
            isValid = validateField(id, error, validate) && isValid;
        });

        const terms = document.getElementById('terms');
        const termsError = document.getElementById('terms-error');
        if (terms && !terms.checked) {
            termsError.style.display = 'block';
            isValid = false;
        } else if (termsError) {
            termsError.style.display = 'none';
        }

        if (!isValid) {
            const firstError = document.querySelector('.error-message[style="display: block;"]');
            firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        return isValid;
    }

    function validateField(fieldId, errorId, validationFn) {
        const field = document.getElementById(fieldId);
        const error = document.getElementById(errorId);
        
        if (!field || !error) return true;
        
        const isValid = validationFn(field.value);
        error.style.display = isValid ? 'none' : 'block';
        field.classList.toggle('is-invalid', !isValid);
        
        return isValid;
    }

    function setupLiveValidation() {
        const fields = [
            { id: 'firstName', error: 'firstName-error', validate: v => v.trim() !== '' },
            { id: 'lastName', error: 'lastName-error', validate: v => v.trim() !== '' },
            { id: 'email', error: 'email-error', validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
            { id: 'phone', error: 'phone-error', validate: v => /^\d{8,15}$/.test(v.trim()) },
            { id: 'address', error: 'address-error', validate: v => v.trim() !== '' },
            { id: 'cardNumber', error: 'cardNumber-error', validate: v => v.replace(/\s/g, '').length === 16 }, // Solo verifica que tenga 16 dígitos
            { 
                id: 'cardExpiry', 
                error: 'cardExpiry-error', 
                validate: v => {
                    if (!/^\d{2}\/\d{2}$/.test(v)) return false;
                    
                    const [month, year] = v.split('/').map(Number);
                    if (month < 1 || month > 12) return false;
                    
                    const currentYear = new Date().getFullYear() % 100;
                    const currentMonth = new Date().getMonth() + 1;
                    
                    if (year < currentYear) return false;
                    if (year === currentYear && month < currentMonth) return false;
                    
                    return true;
                }
            },
            { id: 'cardCvc', error: 'cardCvc-error', validate: v => /^\d{3}$/.test(v) },
            { id: 'cardName', error: 'cardName-error', validate: v => v.trim() !== '' }
        ];

        fields.forEach(({ id, error, validate }) => {
            const field = document.getElementById(id);
            if (field) {
                field.addEventListener('input', () => {
                    if (id === 'cardExpiry') {
                        const value = field.value;
                        const errorElement = document.getElementById(error);
                        
                        if (!/^\d{2}\/\d{2}$/.test(value)) {
                            errorElement.textContent = 'Formato inválido (MM/AA)';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        const [month, year] = value.split('/').map(Number);
                        if (month < 1 || month > 12) {
                            errorElement.textContent = 'Mes inválido (1-12)';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        const currentYear = new Date().getFullYear() % 100;
                        const currentMonth = new Date().getMonth() + 1;
                        
                        if (year < currentYear || (year === currentYear && month < currentMonth)) {
                            errorElement.textContent = 'Tarjeta expirada';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        errorElement.style.display = 'none';
                        field.classList.remove('is-invalid');
                    } else {
                        validateField(id, error, validate);
                    }
                });
            }
        });

        const terms = document.getElementById('terms');
        if (terms) {
            terms.addEventListener('change', function() {
                const error = document.getElementById('terms-error');
                if (error) error.style.display = this.checked ? 'none' : 'block';
            });
        }
    }

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const pagoUrl = body.getAttribute('data-pago-url') || '/productos/pago/';
    const principalUrl = body.getAttribute('data-principal-url') || '/';
    const confirmacionPagoUrl = body.getAttribute('data-confirmacion-pago-url') || '/productos/confirmacion-pago/';
    const csrfToken = getCookie('csrftoken');

    let cartItems = [];
    try {
        const cartData = localStorage.getItem('dekkoCart');
        if (cartData) {
            cartItems = JSON.parse(cartData);
            if (!Array.isArray(cartItems)) {
                throw new Error('Formato de carrito inválido');
            }
        }
    } catch (e) {
        console.error('Error al leer el carrito:', e);
        localStorage.removeItem('dekkoCart');
        window.location.href = principalUrl;
        return;
    }

    if (cartItems.length === 0) {
        window.location.href = principalUrl;
        return;
    }

    displayCartItems(cartItems);
    const { subtotal, shipping, total } = calculateTotals(cartItems);
    updateTotals(subtotal, shipping, total);
    setupFormEvents(confirmacionPagoUrl, csrfToken);
    setupInputRestrictions();

    function displayCartItems(items) {
        const container = document.getElementById('order-items');
        if (container) {
            container.innerHTML = items.map(item => `
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <div class="d-flex align-items-center">
                        <img src="${item.image}" alt="${item.name}" width="60" height="60" class="rounded me-3">
                        <div>
                            <h6 class="mb-1">${item.name}</h6>
                            <small class="text-muted">${item.quantity} × L. ${item.price.toFixed(2)}</small>
                        </div>
                    </div>
                    <span>L. ${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            `).join('');
        }
    }

    function calculateTotals(items) {
        const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal * 0.05;
        const total = subtotal + shipping;
        return { subtotal, shipping, total };
    }

    function updateTotals(subtotal, shipping, total) {
        const elements = {
            'order-subtotal': subtotal.toFixed(2),
            'order-shipping': shipping.toFixed(2),
            'order-total': total.toFixed(2)
        };

        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = `L. ${value}`;
        });

        const totalInput = document.getElementById('totalValue');
        if (totalInput) totalInput.value = total.toFixed(2);

        const cartDataInput = document.getElementById('cartData');
        if (cartDataInput) cartDataInput.value = JSON.stringify(cartItems);
    }

    function setupFormEvents(confirmUrl, token) {
        const form = document.getElementById('payment-form');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                const submitBtn = document.getElementById('submit-payment');
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Procesando...';
                }

                form.submit();
            }
        });

        setupLiveValidation();
    }

    function setupInputRestrictions() {
        // Teléfono - solo números
        const phone = document.getElementById('phone');
        if (phone) {
            phone.addEventListener('input', function(e) {
                e.target.value = e.target.value.replace(/\D/g, '');
            });
        }

        // Número de tarjeta - solo números con formato (modificado para aceptar cualquier combinación)
        const cardNumber = document.getElementById('cardNumber');
        if (cardNumber) {
            cardNumber.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                value = value.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
                e.target.value = value.slice(0, 19);
            });
        }

        // Fecha de expiración - solo números con formato MM/AA
        const cardExpiry = document.getElementById('cardExpiry');
        if (cardExpiry) {
            cardExpiry.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 2) {
                    value = value.substring(0, 2) + '/' + value.substring(2, 4);
                }
                e.target.value = value.slice(0, 5);
            });
        }

        // CVC - solo 3 números
        const cardCvc = document.getElementById('cardCvc');
        if (cardCvc) {
            cardCvc.addEventListener('input', function(e) {
                e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3);
            });
        }
    }

    function validateForm() {
        let isValid = true;
        
        const personalFields = [
            { id: 'firstName', error: 'firstName-error', validate: v => v.trim() !== '' },
            { id: 'lastName', error: 'lastName-error', validate: v => v.trim() !== '' },
            { id: 'phone', error: 'phone-error', validate: v => /^\d{8,15}$/.test(v.trim()) },
            { id: 'address', error: 'address-error', validate: v => v.trim() !== '' }
        ];

        personalFields.forEach(({ id, error, validate }) => {
            isValid = validateField(id, error, validate) && isValid;
        });

        const cardFields = [
            { id: 'cardNumber', error: 'cardNumber-error', validate: v => v.replace(/\s/g, '').length === 16 }, // Solo verifica que tenga 16 dígitos
            { 
                id: 'cardExpiry', 
                error: 'cardExpiry-error', 
                validate: v => {
                    if (!/^\d{2}\/\d{2}$/.test(v)) return false;
                    
                    const [month, year] = v.split('/').map(Number);
                    if (month < 1 || month > 12) return false;
                    
                    const currentYear = new Date().getFullYear() % 100;
                    const currentMonth = new Date().getMonth() + 1;
                    
                    if (year < currentYear) return false;
                    if (year === currentYear && month < currentMonth) return false;
                    
                    return true;
                }
            },
            { id: 'cardCvc', error: 'cardCvc-error', validate: v => /^\d{3}$/.test(v) },
            { id: 'cardName', error: 'cardName-error', validate: v => v.trim() !== '' }
        ];

        cardFields.forEach(({ id, error, validate }) => {
            isValid = validateField(id, error, validate) && isValid;
        });

        const terms = document.getElementById('terms');
        const termsError = document.getElementById('terms-error');
        if (terms && !terms.checked) {
            termsError.style.display = 'block';
            isValid = false;
        } else if (termsError) {
            termsError.style.display = 'none';
        }

        if (!isValid) {
            const firstError = document.querySelector('.error-message[style="display: block;"]');
            firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        return isValid;
    }

    function validateField(fieldId, errorId, validationFn) {
        const field = document.getElementById(fieldId);
        const error = document.getElementById(errorId);
        
        if (!field || !error) return true;
        
        const isValid = validationFn(field.value);
        error.style.display = isValid ? 'none' : 'block';
        field.classList.toggle('is-invalid', !isValid);
        
        return isValid;
    }

    function setupLiveValidation() {
        const fields = [
            { id: 'firstName', error: 'firstName-error', validate: v => v.trim() !== '' },
            { id: 'lastName', error: 'lastName-error', validate: v => v.trim() !== '' },
            { id: 'email', error: 'email-error', validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
            { id: 'phone', error: 'phone-error', validate: v => /^\d{8,15}$/.test(v.trim()) },
            { id: 'address', error: 'address-error', validate: v => v.trim() !== '' },
            { id: 'cardNumber', error: 'cardNumber-error', validate: v => v.replace(/\s/g, '').length === 16 }, // Solo verifica que tenga 16 dígitos
            { 
                id: 'cardExpiry', 
                error: 'cardExpiry-error', 
                validate: v => {
                    if (!/^\d{2}\/\d{2}$/.test(v)) return false;
                    
                    const [month, year] = v.split('/').map(Number);
                    if (month < 1 || month > 12) return false;
                    
                    const currentYear = new Date().getFullYear() % 100;
                    const currentMonth = new Date().getMonth() + 1;
                    
                    if (year < currentYear) return false;
                    if (year === currentYear && month < currentMonth) return false;
                    
                    return true;
                }
            },
            { id: 'cardCvc', error: 'cardCvc-error', validate: v => /^\d{3}$/.test(v) },
            { id: 'cardName', error: 'cardName-error', validate: v => v.trim() !== '' }
        ];

        fields.forEach(({ id, error, validate }) => {
            const field = document.getElementById(id);
            if (field) {
                field.addEventListener('input', () => {
                    if (id === 'cardExpiry') {
                        const value = field.value;
                        const errorElement = document.getElementById(error);
                        
                        if (!/^\d{2}\/\d{2}$/.test(value)) {
                            errorElement.textContent = 'Formato inválido (MM/AA)';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        const [month, year] = value.split('/').map(Number);
                        if (month < 1 || month > 12) {
                            errorElement.textContent = 'Mes inválido (1-12)';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        const currentYear = new Date().getFullYear() % 100;
                        const currentMonth = new Date().getMonth() + 1;
                        
                        if (year < currentYear || (year === currentYear && month < currentMonth)) {
                            errorElement.textContent = 'Tarjeta expirada';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        errorElement.style.display = 'none';
                        field.classList.remove('is-invalid');
                    } else {
                        validateField(id, error, validate);
                    }
                });
            }
        });

        const terms = document.getElementById('terms');
        if (terms) {
            terms.addEventListener('change', function() {
                const error = document.getElementById('terms-error');
                if (error) error.style.display = this.checked ? 'none' : 'block';
            });
        }
    }

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const pagoUrl = body.getAttribute('data-pago-url') || '/productos/pago/';
    const principalUrl = body.getAttribute('data-principal-url') || '/';
    const confirmacionPagoUrl = body.getAttribute('data-confirmacion-pago-url') || '/productos/confirmacion-pago/';
    const csrfToken = getCookie('csrftoken');

    let cartItems = [];
    try {
        const cartData = localStorage.getItem('dekkoCart');
        if (cartData) {
            cartItems = JSON.parse(cartData);
            if (!Array.isArray(cartItems)) {
                throw new Error('Formato de carrito inválido');
            }
        }
    } catch (e) {
        console.error('Error al leer el carrito:', e);
        localStorage.removeItem('dekkoCart');
        window.location.href = principalUrl;
        return;
    }

    if (cartItems.length === 0) {
        window.location.href = principalUrl;
        return;
    }

    displayCartItems(cartItems);
    const { subtotal, shipping, total } = calculateTotals(cartItems);
    updateTotals(subtotal, shipping, total);
    setupFormEvents(confirmacionPagoUrl, csrfToken);
    setupInputRestrictions();

    function displayCartItems(items) {
        const container = document.getElementById('order-items');
        if (container) {
            container.innerHTML = items.map(item => `
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <div class="d-flex align-items-center">
                        <img src="${item.image}" alt="${item.name}" width="60" height="60" class="rounded me-3">
                        <div>
                            <h6 class="mb-1">${item.name}</h6>
                            <small class="text-muted">${item.quantity} × L. ${item.price.toFixed(2)}</small>
                        </div>
                    </div>
                    <span>L. ${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            `).join('');
        }
    }

    function calculateTotals(items) {
        const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal * 0.05;
        const total = subtotal + shipping;
        return { subtotal, shipping, total };
    }

    function updateTotals(subtotal, shipping, total) {
        const elements = {
            'order-subtotal': subtotal.toFixed(2),
            'order-shipping': shipping.toFixed(2),
            'order-total': total.toFixed(2)
        };

        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = `L. ${value}`;
        });

        const totalInput = document.getElementById('totalValue');
        if (totalInput) totalInput.value = total.toFixed(2);

        const cartDataInput = document.getElementById('cartData');
        if (cartDataInput) cartDataInput.value = JSON.stringify(cartItems);
    }

    function setupFormEvents(confirmUrl, token) {
        const form = document.getElementById('payment-form');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                const submitBtn = document.getElementById('submit-payment');
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Procesando...';
                }

                form.submit();
            }
        });

        setupLiveValidation();
    }

    function setupInputRestrictions() {
        // Teléfono - solo números
        const phone = document.getElementById('phone');
        if (phone) {
            phone.addEventListener('input', function(e) {
                e.target.value = e.target.value.replace(/\D/g, '');
            });
        }

        // Número de tarjeta - solo números con formato (modificado para aceptar cualquier combinación)
        const cardNumber = document.getElementById('cardNumber');
        if (cardNumber) {
            cardNumber.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                value = value.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
                e.target.value = value.slice(0, 19);
            });
        }

        // Fecha de expiración - solo números con formato MM/AA
        const cardExpiry = document.getElementById('cardExpiry');
        if (cardExpiry) {
            cardExpiry.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 2) {
                    value = value.substring(0, 2) + '/' + value.substring(2, 4);
                }
                e.target.value = value.slice(0, 5);
            });
        }

        // CVC - solo 3 números
        const cardCvc = document.getElementById('cardCvc');
        if (cardCvc) {
            cardCvc.addEventListener('input', function(e) {
                e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3);
            });
        }
    }

    function validateForm() {
        let isValid = true;
        
        const personalFields = [
            { id: 'firstName', error: 'firstName-error', validate: v => v.trim() !== '' },
            { id: 'lastName', error: 'lastName-error', validate: v => v.trim() !== '' },
            { id: 'phone', error: 'phone-error', validate: v => /^\d{8,15}$/.test(v.trim()) },
            { id: 'address', error: 'address-error', validate: v => v.trim() !== '' }
        ];

        personalFields.forEach(({ id, error, validate }) => {
            isValid = validateField(id, error, validate) && isValid;
        });

        const cardFields = [
            { id: 'cardNumber', error: 'cardNumber-error', validate: v => v.replace(/\s/g, '').length === 16 }, // Solo verifica que tenga 16 dígitos
            { 
                id: 'cardExpiry', 
                error: 'cardExpiry-error', 
                validate: v => {
                    if (!/^\d{2}\/\d{2}$/.test(v)) return false;
                    
                    const [month, year] = v.split('/').map(Number);
                    if (month < 1 || month > 12) return false;
                    
                    const currentYear = new Date().getFullYear() % 100;
                    const currentMonth = new Date().getMonth() + 1;
                    
                    if (year < currentYear) return false;
                    if (year === currentYear && month < currentMonth) return false;
                    
                    return true;
                }
            },
            { id: 'cardCvc', error: 'cardCvc-error', validate: v => /^\d{3}$/.test(v) },
            { id: 'cardName', error: 'cardName-error', validate: v => v.trim() !== '' }
        ];

        cardFields.forEach(({ id, error, validate }) => {
            isValid = validateField(id, error, validate) && isValid;
        });

        const terms = document.getElementById('terms');
        const termsError = document.getElementById('terms-error');
        if (terms && !terms.checked) {
            termsError.style.display = 'block';
            isValid = false;
        } else if (termsError) {
            termsError.style.display = 'none';
        }

        if (!isValid) {
            const firstError = document.querySelector('.error-message[style="display: block;"]');
            firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        return isValid;
    }

    function validateField(fieldId, errorId, validationFn) {
        const field = document.getElementById(fieldId);
        const error = document.getElementById(errorId);
        
        if (!field || !error) return true;
        
        const isValid = validationFn(field.value);
        error.style.display = isValid ? 'none' : 'block';
        field.classList.toggle('is-invalid', !isValid);
        
        return isValid;
    }

    function setupLiveValidation() {
        const fields = [
            { id: 'firstName', error: 'firstName-error', validate: v => v.trim() !== '' },
            { id: 'lastName', error: 'lastName-error', validate: v => v.trim() !== '' },
            { id: 'email', error: 'email-error', validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
            { id: 'phone', error: 'phone-error', validate: v => /^\d{8,15}$/.test(v.trim()) },
            { id: 'address', error: 'address-error', validate: v => v.trim() !== '' },
            { id: 'cardNumber', error: 'cardNumber-error', validate: v => v.replace(/\s/g, '').length === 16 }, // Solo verifica que tenga 16 dígitos
            { 
                id: 'cardExpiry', 
                error: 'cardExpiry-error', 
                validate: v => {
                    if (!/^\d{2}\/\d{2}$/.test(v)) return false;
                    
                    const [month, year] = v.split('/').map(Number);
                    if (month < 1 || month > 12) return false;
                    
                    const currentYear = new Date().getFullYear() % 100;
                    const currentMonth = new Date().getMonth() + 1;
                    
                    if (year < currentYear) return false;
                    if (year === currentYear && month < currentMonth) return false;
                    
                    return true;
                }
            },
            { id: 'cardCvc', error: 'cardCvc-error', validate: v => /^\d{3}$/.test(v) },
            { id: 'cardName', error: 'cardName-error', validate: v => v.trim() !== '' }
        ];

        fields.forEach(({ id, error, validate }) => {
            const field = document.getElementById(id);
            if (field) {
                field.addEventListener('input', () => {
                    if (id === 'cardExpiry') {
                        const value = field.value;
                        const errorElement = document.getElementById(error);
                        
                        if (!/^\d{2}\/\d{2}$/.test(value)) {
                            errorElement.textContent = 'Formato inválido (MM/AA)';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        const [month, year] = value.split('/').map(Number);
                        if (month < 1 || month > 12) {
                            errorElement.textContent = 'Mes inválido (1-12)';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        const currentYear = new Date().getFullYear() % 100;
                        const currentMonth = new Date().getMonth() + 1;
                        
                        if (year < currentYear || (year === currentYear && month < currentMonth)) {
                            errorElement.textContent = 'Tarjeta expirada';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        errorElement.style.display = 'none';
                        field.classList.remove('is-invalid');
                    } else {
                        validateField(id, error, validate);
                    }
                });
            }
        });

        const terms = document.getElementById('terms');
        if (terms) {
            terms.addEventListener('change', function() {
                const error = document.getElementById('terms-error');
                if (error) error.style.display = this.checked ? 'none' : 'block';
            });
        }
    }

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const pagoUrl = body.getAttribute('data-pago-url') || '/productos/pago/';
    const principalUrl = body.getAttribute('data-principal-url') || '/';
    const confirmacionPagoUrl = body.getAttribute('data-confirmacion-pago-url') || '/productos/confirmacion-pago/';
    const csrfToken = getCookie('csrftoken');

    let cartItems = [];
    try {
        const cartData = localStorage.getItem('dekkoCart');
        if (cartData) {
            cartItems = JSON.parse(cartData);
            if (!Array.isArray(cartItems)) {
                throw new Error('Formato de carrito inválido');
            }
        }
    } catch (e) {
        console.error('Error al leer el carrito:', e);
        localStorage.removeItem('dekkoCart');
        window.location.href = principalUrl;
        return;
    }

    if (cartItems.length === 0) {
        window.location.href = principalUrl;
        return;
    }

    displayCartItems(cartItems);
    const { subtotal, shipping, total } = calculateTotals(cartItems);
    updateTotals(subtotal, shipping, total);
    setupFormEvents(confirmacionPagoUrl, csrfToken);
    setupInputRestrictions();

    function displayCartItems(items) {
        const container = document.getElementById('order-items');
        if (container) {
            container.innerHTML = items.map(item => `
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <div class="d-flex align-items-center">
                        <img src="${item.image}" alt="${item.name}" width="60" height="60" class="rounded me-3">
                        <div>
                            <h6 class="mb-1">${item.name}</h6>
                            <small class="text-muted">${item.quantity} × L. ${item.price.toFixed(2)}</small>
                        </div>
                    </div>
                    <span>L. ${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            `).join('');
        }
    }

    function calculateTotals(items) {
        const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal * 0.05;
        const total = subtotal + shipping;
        return { subtotal, shipping, total };
    }

    function updateTotals(subtotal, shipping, total) {
        const elements = {
            'order-subtotal': subtotal.toFixed(2),
            'order-shipping': shipping.toFixed(2),
            'order-total': total.toFixed(2)
        };

        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = `L. ${value}`;
        });

        const totalInput = document.getElementById('totalValue');
        if (totalInput) totalInput.value = total.toFixed(2);

        const cartDataInput = document.getElementById('cartData');
        if (cartDataInput) cartDataInput.value = JSON.stringify(cartItems);
    }

    function setupFormEvents(confirmUrl, token) {
        const form = document.getElementById('payment-form');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                const submitBtn = document.getElementById('submit-payment');
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Procesando...';
                }

                form.submit();
            }
        });

        setupLiveValidation();
    }

    function setupInputRestrictions() {
        // Teléfono - solo números
        const phone = document.getElementById('phone');
        if (phone) {
            phone.addEventListener('input', function(e) {
                e.target.value = e.target.value.replace(/\D/g, '');
            });
        }

        // Número de tarjeta - solo números con formato (modificado para aceptar cualquier combinación)
        const cardNumber = document.getElementById('cardNumber');
        if (cardNumber) {
            cardNumber.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                value = value.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
                e.target.value = value.slice(0, 19);
            });
        }

        // Fecha de expiración - solo números con formato MM/AA
        const cardExpiry = document.getElementById('cardExpiry');
        if (cardExpiry) {
            cardExpiry.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 2) {
                    value = value.substring(0, 2) + '/' + value.substring(2, 4);
                }
                e.target.value = value.slice(0, 5);
            });
        }

        // CVC - solo 3 números
        const cardCvc = document.getElementById('cardCvc');
        if (cardCvc) {
            cardCvc.addEventListener('input', function(e) {
                e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3);
            });
        }
    }

    function validateForm() {
        let isValid = true;
        
        const personalFields = [
            { id: 'firstName', error: 'firstName-error', validate: v => v.trim() !== '' },
            { id: 'lastName', error: 'lastName-error', validate: v => v.trim() !== '' },
            { id: 'phone', error: 'phone-error', validate: v => /^\d{8,15}$/.test(v.trim()) },
            { id: 'address', error: 'address-error', validate: v => v.trim() !== '' }
        ];

        personalFields.forEach(({ id, error, validate }) => {
            isValid = validateField(id, error, validate) && isValid;
        });

        const cardFields = [
            { id: 'cardNumber', error: 'cardNumber-error', validate: v => v.replace(/\s/g, '').length === 16 }, // Solo verifica que tenga 16 dígitos
            { 
                id: 'cardExpiry', 
                error: 'cardExpiry-error', 
                validate: v => {
                    if (!/^\d{2}\/\d{2}$/.test(v)) return false;
                    
                    const [month, year] = v.split('/').map(Number);
                    if (month < 1 || month > 12) return false;
                    
                    const currentYear = new Date().getFullYear() % 100;
                    const currentMonth = new Date().getMonth() + 1;
                    
                    if (year < currentYear) return false;
                    if (year === currentYear && month < currentMonth) return false;
                    
                    return true;
                }
            },
            { id: 'cardCvc', error: 'cardCvc-error', validate: v => /^\d{3}$/.test(v) },
            { id: 'cardName', error: 'cardName-error', validate: v => v.trim() !== '' }
        ];

        cardFields.forEach(({ id, error, validate }) => {
            isValid = validateField(id, error, validate) && isValid;
        });

        const terms = document.getElementById('terms');
        const termsError = document.getElementById('terms-error');
        if (terms && !terms.checked) {
            termsError.style.display = 'block';
            isValid = false;
        } else if (termsError) {
            termsError.style.display = 'none';
        }

        if (!isValid) {
            const firstError = document.querySelector('.error-message[style="display: block;"]');
            firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        return isValid;
    }

    function validateField(fieldId, errorId, validationFn) {
        const field = document.getElementById(fieldId);
        const error = document.getElementById(errorId);
        
        if (!field || !error) return true;
        
        const isValid = validationFn(field.value);
        error.style.display = isValid ? 'none' : 'block';
        field.classList.toggle('is-invalid', !isValid);
        
        return isValid;
    }

    function setupLiveValidation() {
        const fields = [
            { id: 'firstName', error: 'firstName-error', validate: v => v.trim() !== '' },
            { id: 'lastName', error: 'lastName-error', validate: v => v.trim() !== '' },
            { id: 'email', error: 'email-error', validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
            { id: 'phone', error: 'phone-error', validate: v => /^\d{8,15}$/.test(v.trim()) },
            { id: 'address', error: 'address-error', validate: v => v.trim() !== '' },
            { id: 'cardNumber', error: 'cardNumber-error', validate: v => v.replace(/\s/g, '').length === 16 }, // Solo verifica que tenga 16 dígitos
            { 
                id: 'cardExpiry', 
                error: 'cardExpiry-error', 
                validate: v => {
                    if (!/^\d{2}\/\d{2}$/.test(v)) return false;
                    
                    const [month, year] = v.split('/').map(Number);
                    if (month < 1 || month > 12) return false;
                    
                    const currentYear = new Date().getFullYear() % 100;
                    const currentMonth = new Date().getMonth() + 1;
                    
                    if (year < currentYear) return false;
                    if (year === currentYear && month < currentMonth) return false;
                    
                    return true;
                }
            },
            { id: 'cardCvc', error: 'cardCvc-error', validate: v => /^\d{3}$/.test(v) },
            { id: 'cardName', error: 'cardName-error', validate: v => v.trim() !== '' }
        ];

        fields.forEach(({ id, error, validate }) => {
            const field = document.getElementById(id);
            if (field) {
                field.addEventListener('input', () => {
                    if (id === 'cardExpiry') {
                        const value = field.value;
                        const errorElement = document.getElementById(error);
                        
                        if (!/^\d{2}\/\d{2}$/.test(value)) {
                            errorElement.textContent = 'Formato inválido (MM/AA)';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        const [month, year] = value.split('/').map(Number);
                        if (month < 1 || month > 12) {
                            errorElement.textContent = 'Mes inválido (1-12)';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        const currentYear = new Date().getFullYear() % 100;
                        const currentMonth = new Date().getMonth() + 1;
                        
                        if (year < currentYear || (year === currentYear && month < currentMonth)) {
                            errorElement.textContent = 'Tarjeta expirada';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        errorElement.style.display = 'none';
                        field.classList.remove('is-invalid');
                    } else {
                        validateField(id, error, validate);
                    }
                });
            }
        });

        const terms = document.getElementById('terms');
        if (terms) {
            terms.addEventListener('change', function() {
                const error = document.getElementById('terms-error');
                if (error) error.style.display = this.checked ? 'none' : 'block';
            });
        }
    }

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const pagoUrl = body.getAttribute('data-pago-url') || '/productos/pago/';
    const principalUrl = body.getAttribute('data-principal-url') || '/';
    const confirmacionPagoUrl = body.getAttribute('data-confirmacion-pago-url') || '/productos/confirmacion-pago/';
    const csrfToken = getCookie('csrftoken');

    let cartItems = [];
    try {
        const cartData = localStorage.getItem('dekkoCart');
        if (cartData) {
            cartItems = JSON.parse(cartData);
            if (!Array.isArray(cartItems)) {
                throw new Error('Formato de carrito inválido');
            }
        }
    } catch (e) {
        console.error('Error al leer el carrito:', e);
        localStorage.removeItem('dekkoCart');
        window.location.href = principalUrl;
        return;
    }

    if (cartItems.length === 0) {
        window.location.href = principalUrl;
        return;
    }

    displayCartItems(cartItems);
    const { subtotal, shipping, total } = calculateTotals(cartItems);
    updateTotals(subtotal, shipping, total);
    setupFormEvents(confirmacionPagoUrl, csrfToken);
    setupInputRestrictions();

    function displayCartItems(items) {
        const container = document.getElementById('order-items');
        if (container) {
            container.innerHTML = items.map(item => `
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <div class="d-flex align-items-center">
                        <img src="${item.image}" alt="${item.name}" width="60" height="60" class="rounded me-3">
                        <div>
                            <h6 class="mb-1">${item.name}</h6>
                            <small class="text-muted">${item.quantity} × L. ${item.price.toFixed(2)}</small>
                        </div>
                    </div>
                    <span>L. ${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            `).join('');
        }
    }

    function calculateTotals(items) {
        const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal * 0.05;
        const total = subtotal + shipping;
        return { subtotal, shipping, total };
    }

    function updateTotals(subtotal, shipping, total) {
        const elements = {
            'order-subtotal': subtotal.toFixed(2),
            'order-shipping': shipping.toFixed(2),
            'order-total': total.toFixed(2)
        };

        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = `L. ${value}`;
        });

        const totalInput = document.getElementById('totalValue');
        if (totalInput) totalInput.value = total.toFixed(2);

        const cartDataInput = document.getElementById('cartData');
        if (cartDataInput) cartDataInput.value = JSON.stringify(cartItems);
    }

    function setupFormEvents(confirmUrl, token) {
        const form = document.getElementById('payment-form');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                const submitBtn = document.getElementById('submit-payment');
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Procesando...';
                }

                form.submit();
            }
        });

        setupLiveValidation();
    }

    function setupInputRestrictions() {
        // Teléfono - solo números
        const phone = document.getElementById('phone');
        if (phone) {
            phone.addEventListener('input', function(e) {
                e.target.value = e.target.value.replace(/\D/g, '');
            });
        }

        // Número de tarjeta - solo números con formato (modificado para aceptar cualquier combinación)
        const cardNumber = document.getElementById('cardNumber');
        if (cardNumber) {
            cardNumber.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                value = value.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
                e.target.value = value.slice(0, 19);
            });
        }

        // Fecha de expiración - solo números con formato MM/AA
        const cardExpiry = document.getElementById('cardExpiry');
        if (cardExpiry) {
            cardExpiry.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 2) {
                    value = value.substring(0, 2) + '/' + value.substring(2, 4);
                }
                e.target.value = value.slice(0, 5);
            });
        }

        // CVC - solo 3 números
        const cardCvc = document.getElementById('cardCvc');
        if (cardCvc) {
            cardCvc.addEventListener('input', function(e) {
                e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3);
            });
        }
    }

    function validateForm() {
        let isValid = true;
        
        const personalFields = [
            { id: 'firstName', error: 'firstName-error', validate: v => v.trim() !== '' },
            { id: 'lastName', error: 'lastName-error', validate: v => v.trim() !== '' },
            { id: 'phone', error: 'phone-error', validate: v => /^\d{8,15}$/.test(v.trim()) },
            { id: 'address', error: 'address-error', validate: v => v.trim() !== '' }
        ];

        personalFields.forEach(({ id, error, validate }) => {
            isValid = validateField(id, error, validate) && isValid;
        });

        const cardFields = [
            { id: 'cardNumber', error: 'cardNumber-error', validate: v => v.replace(/\s/g, '').length === 16 }, // Solo verifica que tenga 16 dígitos
            { 
                id: 'cardExpiry', 
                error: 'cardExpiry-error', 
                validate: v => {
                    if (!/^\d{2}\/\d{2}$/.test(v)) return false;
                    
                    const [month, year] = v.split('/').map(Number);
                    if (month < 1 || month > 12) return false;
                    
                    const currentYear = new Date().getFullYear() % 100;
                    const currentMonth = new Date().getMonth() + 1;
                    
                    if (year < currentYear) return false;
                    if (year === currentYear && month < currentMonth) return false;
                    
                    return true;
                }
            },
            { id: 'cardCvc', error: 'cardCvc-error', validate: v => /^\d{3}$/.test(v) },
            { id: 'cardName', error: 'cardName-error', validate: v => v.trim() !== '' }
        ];

        cardFields.forEach(({ id, error, validate }) => {
            isValid = validateField(id, error, validate) && isValid;
        });

        const terms = document.getElementById('terms');
        const termsError = document.getElementById('terms-error');
        if (terms && !terms.checked) {
            termsError.style.display = 'block';
            isValid = false;
        } else if (termsError) {
            termsError.style.display = 'none';
        }

        if (!isValid) {
            const firstError = document.querySelector('.error-message[style="display: block;"]');
            firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        return isValid;
    }

    function validateField(fieldId, errorId, validationFn) {
        const field = document.getElementById(fieldId);
        const error = document.getElementById(errorId);
        
        if (!field || !error) return true;
        
        const isValid = validationFn(field.value);
        error.style.display = isValid ? 'none' : 'block';
        field.classList.toggle('is-invalid', !isValid);
        
        return isValid;
    }

    function setupLiveValidation() {
        const fields = [
            { id: 'firstName', error: 'firstName-error', validate: v => v.trim() !== '' },
            { id: 'lastName', error: 'lastName-error', validate: v => v.trim() !== '' },
            { id: 'email', error: 'email-error', validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
            { id: 'phone', error: 'phone-error', validate: v => /^\d{8,15}$/.test(v.trim()) },
            { id: 'address', error: 'address-error', validate: v => v.trim() !== '' },
            { id: 'cardNumber', error: 'cardNumber-error', validate: v => v.replace(/\s/g, '').length === 16 }, // Solo verifica que tenga 16 dígitos
            { 
                id: 'cardExpiry', 
                error: 'cardExpiry-error', 
                validate: v => {
                    if (!/^\d{2}\/\d{2}$/.test(v)) return false;
                    
                    const [month, year] = v.split('/').map(Number);
                    if (month < 1 || month > 12) return false;
                    
                    const currentYear = new Date().getFullYear() % 100;
                    const currentMonth = new Date().getMonth() + 1;
                    
                    if (year < currentYear) return false;
                    if (year === currentYear && month < currentMonth) return false;
                    
                    return true;
                }
            },
            { id: 'cardCvc', error: 'cardCvc-error', validate: v => /^\d{3}$/.test(v) },
            { id: 'cardName', error: 'cardName-error', validate: v => v.trim() !== '' }
        ];

        fields.forEach(({ id, error, validate }) => {
            const field = document.getElementById(id);
            if (field) {
                field.addEventListener('input', () => {
                    if (id === 'cardExpiry') {
                        const value = field.value;
                        const errorElement = document.getElementById(error);
                        
                        if (!/^\d{2}\/\d{2}$/.test(value)) {
                            errorElement.textContent = 'Formato inválido (MM/AA)';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        const [month, year] = value.split('/').map(Number);
                        if (month < 1 || month > 12) {
                            errorElement.textContent = 'Mes inválido (1-12)';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        const currentYear = new Date().getFullYear() % 100;
                        const currentMonth = new Date().getMonth() + 1;
                        
                        if (year < currentYear || (year === currentYear && month < currentMonth)) {
                            errorElement.textContent = 'Tarjeta expirada';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        errorElement.style.display = 'none';
                        field.classList.remove('is-invalid');
                    } else {
                        validateField(id, error, validate);
                    }
                });
            }
        });

        const terms = document.getElementById('terms');
        if (terms) {
            terms.addEventListener('change', function() {
                const error = document.getElementById('terms-error');
                if (error) error.style.display = this.checked ? 'none' : 'block';
            });
        }
    }

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const pagoUrl = body.getAttribute('data-pago-url') || '/productos/pago/';
    const principalUrl = body.getAttribute('data-principal-url') || '/';
    const confirmacionPagoUrl = body.getAttribute('data-confirmacion-pago-url') || '/productos/confirmacion-pago/';
    const csrfToken = getCookie('csrftoken');

    let cartItems = [];
    try {
        const cartData = localStorage.getItem('dekkoCart');
        if (cartData) {
            cartItems = JSON.parse(cartData);
            if (!Array.isArray(cartItems)) {
                throw new Error('Formato de carrito inválido');
            }
        }
    } catch (e) {
        console.error('Error al leer el carrito:', e);
        localStorage.removeItem('dekkoCart');
        window.location.href = principalUrl;
        return;
    }

    if (cartItems.length === 0) {
        window.location.href = principalUrl;
        return;
    }

    displayCartItems(cartItems);
    const { subtotal, shipping, total } = calculateTotals(cartItems);
    updateTotals(subtotal, shipping, total);
    setupFormEvents(confirmacionPagoUrl, csrfToken);
    setupInputRestrictions();

    function displayCartItems(items) {
        const container = document.getElementById('order-items');
        if (container) {
            container.innerHTML = items.map(item => `
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <div class="d-flex align-items-center">
                        <img src="${item.image}" alt="${item.name}" width="60" height="60" class="rounded me-3">
                        <div>
                            <h6 class="mb-1">${item.name}</h6>
                            <small class="text-muted">${item.quantity} × L. ${item.price.toFixed(2)}</small>
                        </div>
                    </div>
                    <span>L. ${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            `).join('');
        }
    }

    function calculateTotals(items) {
        const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal * 0.05;
        const total = subtotal + shipping;
        return { subtotal, shipping, total };
    }

    function updateTotals(subtotal, shipping, total) {
        const elements = {
            'order-subtotal': subtotal.toFixed(2),
            'order-shipping': shipping.toFixed(2),
            'order-total': total.toFixed(2)
        };

        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = `L. ${value}`;
        });

        const totalInput = document.getElementById('totalValue');
        if (totalInput) totalInput.value = total.toFixed(2);

        const cartDataInput = document.getElementById('cartData');
        if (cartDataInput) cartDataInput.value = JSON.stringify(cartItems);
    }

    function setupFormEvents(confirmUrl, token) {
        const form = document.getElementById('payment-form');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                const submitBtn = document.getElementById('submit-payment');
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Procesando...';
                }

                form.submit();
            }
        });

        setupLiveValidation();
    }

    function setupInputRestrictions() {
        // Teléfono - solo números
        const phone = document.getElementById('phone');
        if (phone) {
            phone.addEventListener('input', function(e) {
                e.target.value = e.target.value.replace(/\D/g, '');
            });
        }

        // Número de tarjeta - solo números con formato (modificado para aceptar cualquier combinación)
        const cardNumber = document.getElementById('cardNumber');
        if (cardNumber) {
            cardNumber.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                value = value.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
                e.target.value = value.slice(0, 19);
            });
        }

        // Fecha de expiración - solo números con formato MM/AA
        const cardExpiry = document.getElementById('cardExpiry');
        if (cardExpiry) {
            cardExpiry.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 2) {
                    value = value.substring(0, 2) + '/' + value.substring(2, 4);
                }
                e.target.value = value.slice(0, 5);
            });
        }

        // CVC - solo 3 números
        const cardCvc = document.getElementById('cardCvc');
        if (cardCvc) {
            cardCvc.addEventListener('input', function(e) {
                e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3);
            });
        }
    }

    function validateForm() {
        let isValid = true;
        
        const personalFields = [
            { id: 'firstName', error: 'firstName-error', validate: v => v.trim() !== '' },
            { id: 'lastName', error: 'lastName-error', validate: v => v.trim() !== '' },
            { id: 'phone', error: 'phone-error', validate: v => /^\d{8,15}$/.test(v.trim()) },
            { id: 'address', error: 'address-error', validate: v => v.trim() !== '' }
        ];

        personalFields.forEach(({ id, error, validate }) => {
            isValid = validateField(id, error, validate) && isValid;
        });

        const cardFields = [
            { id: 'cardNumber', error: 'cardNumber-error', validate: v => v.replace(/\s/g, '').length === 16 }, // Solo verifica que tenga 16 dígitos
            { 
                id: 'cardExpiry', 
                error: 'cardExpiry-error', 
                validate: v => {
                    if (!/^\d{2}\/\d{2}$/.test(v)) return false;
                    
                    const [month, year] = v.split('/').map(Number);
                    if (month < 1 || month > 12) return false;
                    
                    const currentYear = new Date().getFullYear() % 100;
                    const currentMonth = new Date().getMonth() + 1;
                    
                    if (year < currentYear) return false;
                    if (year === currentYear && month < currentMonth) return false;
                    
                    return true;
                }
            },
            { id: 'cardCvc', error: 'cardCvc-error', validate: v => /^\d{3}$/.test(v) },
            { id: 'cardName', error: 'cardName-error', validate: v => v.trim() !== '' }
        ];

        cardFields.forEach(({ id, error, validate }) => {
            isValid = validateField(id, error, validate) && isValid;
        });

        const terms = document.getElementById('terms');
        const termsError = document.getElementById('terms-error');
        if (terms && !terms.checked) {
            termsError.style.display = 'block';
            isValid = false;
        } else if (termsError) {
            termsError.style.display = 'none';
        }

        if (!isValid) {
            const firstError = document.querySelector('.error-message[style="display: block;"]');
            firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        return isValid;
    }

    function validateField(fieldId, errorId, validationFn) {
        const field = document.getElementById(fieldId);
        const error = document.getElementById(errorId);
        
        if (!field || !error) return true;
        
        const isValid = validationFn(field.value);
        error.style.display = isValid ? 'none' : 'block';
        field.classList.toggle('is-invalid', !isValid);
        
        return isValid;
    }

    function setupLiveValidation() {
        const fields = [
            { id: 'firstName', error: 'firstName-error', validate: v => v.trim() !== '' },
            { id: 'lastName', error: 'lastName-error', validate: v => v.trim() !== '' },
            { id: 'email', error: 'email-error', validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
            { id: 'phone', error: 'phone-error', validate: v => /^\d{8,15}$/.test(v.trim()) },
            { id: 'address', error: 'address-error', validate: v => v.trim() !== '' },
            { id: 'cardNumber', error: 'cardNumber-error', validate: v => v.replace(/\s/g, '').length === 16 }, // Solo verifica que tenga 16 dígitos
            { 
                id: 'cardExpiry', 
                error: 'cardExpiry-error', 
                validate: v => {
                    if (!/^\d{2}\/\d{2}$/.test(v)) return false;
                    
                    const [month, year] = v.split('/').map(Number);
                    if (month < 1 || month > 12) return false;
                    
                    const currentYear = new Date().getFullYear() % 100;
                    const currentMonth = new Date().getMonth() + 1;
                    
                    if (year < currentYear) return false;
                    if (year === currentYear && month < currentMonth) return false;
                    
                    return true;
                }
            },
            { id: 'cardCvc', error: 'cardCvc-error', validate: v => /^\d{3}$/.test(v) },
            { id: 'cardName', error: 'cardName-error', validate: v => v.trim() !== '' }
        ];

        fields.forEach(({ id, error, validate }) => {
            const field = document.getElementById(id);
            if (field) {
                field.addEventListener('input', () => {
                    if (id === 'cardExpiry') {
                        const value = field.value;
                        const errorElement = document.getElementById(error);
                        
                        if (!/^\d{2}\/\d{2}$/.test(value)) {
                            errorElement.textContent = 'Formato inválido (MM/AA)';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        const [month, year] = value.split('/').map(Number);
                        if (month < 1 || month > 12) {
                            errorElement.textContent = 'Mes inválido (1-12)';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        const currentYear = new Date().getFullYear() % 100;
                        const currentMonth = new Date().getMonth() + 1;
                        
                        if (year < currentYear || (year === currentYear && month < currentMonth)) {
                            errorElement.textContent = 'Tarjeta expirada';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        errorElement.style.display = 'none';
                        field.classList.remove('is-invalid');
                    } else {
                        validateField(id, error, validate);
                    }
                });
            }
        });

        const terms = document.getElementById('terms');
        if (terms) {
            terms.addEventListener('change', function() {
                const error = document.getElementById('terms-error');
                if (error) error.style.display = this.checked ? 'none' : 'block';
            });
        }
    }

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const pagoUrl = body.getAttribute('data-pago-url') || '/productos/pago/';
    const principalUrl = body.getAttribute('data-principal-url') || '/';
    const confirmacionPagoUrl = body.getAttribute('data-confirmacion-pago-url') || '/productos/confirmacion-pago/';
    const csrfToken = getCookie('csrftoken');

    let cartItems = [];
    try {
        const cartData = localStorage.getItem('dekkoCart');
        if (cartData) {
            cartItems = JSON.parse(cartData);
            if (!Array.isArray(cartItems)) {
                throw new Error('Formato de carrito inválido');
            }
        }
    } catch (e) {
        console.error('Error al leer el carrito:', e);
        localStorage.removeItem('dekkoCart');
        window.location.href = principalUrl;
        return;
    }

    if (cartItems.length === 0) {
        window.location.href = principalUrl;
        return;
    }

    displayCartItems(cartItems);
    const { subtotal, shipping, total } = calculateTotals(cartItems);
    updateTotals(subtotal, shipping, total);
    setupFormEvents(confirmacionPagoUrl, csrfToken);
    setupInputRestrictions();

    function displayCartItems(items) {
        const container = document.getElementById('order-items');
        if (container) {
            container.innerHTML = items.map(item => `
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <div class="d-flex align-items-center">
                        <img src="${item.image}" alt="${item.name}" width="60" height="60" class="rounded me-3">
                        <div>
                            <h6 class="mb-1">${item.name}</h6>
                            <small class="text-muted">${item.quantity} × L. ${item.price.toFixed(2)}</small>
                        </div>
                    </div>
                    <span>L. ${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            `).join('');
        }
    }

    function calculateTotals(items) {
        const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal * 0.05;
        const total = subtotal + shipping;
        return { subtotal, shipping, total };
    }

    function updateTotals(subtotal, shipping, total) {
        const elements = {
            'order-subtotal': subtotal.toFixed(2),
            'order-shipping': shipping.toFixed(2),
            'order-total': total.toFixed(2)
        };

        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = `L. ${value}`;
        });

        const totalInput = document.getElementById('totalValue');
        if (totalInput) totalInput.value = total.toFixed(2);

        const cartDataInput = document.getElementById('cartData');
        if (cartDataInput) cartDataInput.value = JSON.stringify(cartItems);
    }

    function setupFormEvents(confirmUrl, token) {
        const form = document.getElementById('payment-form');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                const submitBtn = document.getElementById('submit-payment');
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Procesando...';
                }

                form.submit();
            }
        });

        setupLiveValidation();
    }

    function setupInputRestrictions() {
        // Teléfono - solo números
        const phone = document.getElementById('phone');
        if (phone) {
            phone.addEventListener('input', function(e) {
                e.target.value = e.target.value.replace(/\D/g, '');
            });
        }

        // Número de tarjeta - solo números con formato (modificado para aceptar cualquier combinación)
        const cardNumber = document.getElementById('cardNumber');
        if (cardNumber) {
            cardNumber.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                value = value.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
                e.target.value = value.slice(0, 19);
            });
        }

        // Fecha de expiración - solo números con formato MM/AA
        const cardExpiry = document.getElementById('cardExpiry');
        if (cardExpiry) {
            cardExpiry.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 2) {
                    value = value.substring(0, 2) + '/' + value.substring(2, 4);
                }
                e.target.value = value.slice(0, 5);
            });
        }

        // CVC - solo 3 números
        const cardCvc = document.getElementById('cardCvc');
        if (cardCvc) {
            cardCvc.addEventListener('input', function(e) {
                e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3);
            });
        }
    }

    function validateForm() {
        let isValid = true;
        
        const personalFields = [
            { id: 'firstName', error: 'firstName-error', validate: v => v.trim() !== '' },
            { id: 'lastName', error: 'lastName-error', validate: v => v.trim() !== '' },
            { id: 'phone', error: 'phone-error', validate: v => /^\d{8,15}$/.test(v.trim()) },
            { id: 'address', error: 'address-error', validate: v => v.trim() !== '' }
        ];

        personalFields.forEach(({ id, error, validate }) => {
            isValid = validateField(id, error, validate) && isValid;
        });

        const cardFields = [
            { id: 'cardNumber', error: 'cardNumber-error', validate: v => v.replace(/\s/g, '').length === 16 }, // Solo verifica que tenga 16 dígitos
            { 
                id: 'cardExpiry', 
                error: 'cardExpiry-error', 
                validate: v => {
                    if (!/^\d{2}\/\d{2}$/.test(v)) return false;
                    
                    const [month, year] = v.split('/').map(Number);
                    if (month < 1 || month > 12) return false;
                    
                    const currentYear = new Date().getFullYear() % 100;
                    const currentMonth = new Date().getMonth() + 1;
                    
                    if (year < currentYear) return false;
                    if (year === currentYear && month < currentMonth) return false;
                    
                    return true;
                }
            },
            { id: 'cardCvc', error: 'cardCvc-error', validate: v => /^\d{3}$/.test(v) },
            { id: 'cardName', error: 'cardName-error', validate: v => v.trim() !== '' }
        ];

        cardFields.forEach(({ id, error, validate }) => {
            isValid = validateField(id, error, validate) && isValid;
        });

        const terms = document.getElementById('terms');
        const termsError = document.getElementById('terms-error');
        if (terms && !terms.checked) {
            termsError.style.display = 'block';
            isValid = false;
        } else if (termsError) {
            termsError.style.display = 'none';
        }

        if (!isValid) {
            const firstError = document.querySelector('.error-message[style="display: block;"]');
            firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        return isValid;
    }

    function validateField(fieldId, errorId, validationFn) {
        const field = document.getElementById(fieldId);
        const error = document.getElementById(errorId);
        
        if (!field || !error) return true;
        
        const isValid = validationFn(field.value);
        error.style.display = isValid ? 'none' : 'block';
        field.classList.toggle('is-invalid', !isValid);
        
        return isValid;
    }

    function setupLiveValidation() {
        const fields = [
            { id: 'firstName', error: 'firstName-error', validate: v => v.trim() !== '' },
            { id: 'lastName', error: 'lastName-error', validate: v => v.trim() !== '' },
            { id: 'email', error: 'email-error', validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
            { id: 'phone', error: 'phone-error', validate: v => /^\d{8,15}$/.test(v.trim()) },
            { id: 'address', error: 'address-error', validate: v => v.trim() !== '' },
            { id: 'cardNumber', error: 'cardNumber-error', validate: v => v.replace(/\s/g, '').length === 16 }, // Solo verifica que tenga 16 dígitos
            { 
                id: 'cardExpiry', 
                error: 'cardExpiry-error', 
                validate: v => {
                    if (!/^\d{2}\/\d{2}$/.test(v)) return false;
                    
                    const [month, year] = v.split('/').map(Number);
                    if (month < 1 || month > 12) return false;
                    
                    const currentYear = new Date().getFullYear() % 100;
                    const currentMonth = new Date().getMonth() + 1;
                    
                    if (year < currentYear) return false;
                    if (year === currentYear && month < currentMonth) return false;
                    
                    return true;
                }
            },
            { id: 'cardCvc', error: 'cardCvc-error', validate: v => /^\d{3}$/.test(v) },
            { id: 'cardName', error: 'cardName-error', validate: v => v.trim() !== '' }
        ];

        fields.forEach(({ id, error, validate }) => {
            const field = document.getElementById(id);
            if (field) {
                field.addEventListener('input', () => {
                    if (id === 'cardExpiry') {
                        const value = field.value;
                        const errorElement = document.getElementById(error);
                        
                        if (!/^\d{2}\/\d{2}$/.test(value)) {
                            errorElement.textContent = 'Formato inválido (MM/AA)';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        const [month, year] = value.split('/').map(Number);
                        if (month < 1 || month > 12) {
                            errorElement.textContent = 'Mes inválido (1-12)';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        const currentYear = new Date().getFullYear() % 100;
                        const currentMonth = new Date().getMonth() + 1;
                        
                        if (year < currentYear || (year === currentYear && month < currentMonth)) {
                            errorElement.textContent = 'Tarjeta expirada';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        errorElement.style.display = 'none';
                        field.classList.remove('is-invalid');
                    } else {
                        validateField(id, error, validate);
                    }
                });
            }
        });

        const terms = document.getElementById('terms');
        if (terms) {
            terms.addEventListener('change', function() {
                const error = document.getElementById('terms-error');
                if (error) error.style.display = this.checked ? 'none' : 'block';
            });
        }
    }

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const pagoUrl = body.getAttribute('data-pago-url') || '/productos/pago/';
    const principalUrl = body.getAttribute('data-principal-url') || '/';
    const confirmacionPagoUrl = body.getAttribute('data-confirmacion-pago-url') || '/productos/confirmacion-pago/';
    const csrfToken = getCookie('csrftoken');

    let cartItems = [];
    try {
        const cartData = localStorage.getItem('dekkoCart');
        if (cartData) {
            cartItems = JSON.parse(cartData);
            if (!Array.isArray(cartItems)) {
                throw new Error('Formato de carrito inválido');
            }
        }
    } catch (e) {
        console.error('Error al leer el carrito:', e);
        localStorage.removeItem('dekkoCart');
        window.location.href = principalUrl;
        return;
    }

    if (cartItems.length === 0) {
        window.location.href = principalUrl;
        return;
    }

    displayCartItems(cartItems);
    const { subtotal, shipping, total } = calculateTotals(cartItems);
    updateTotals(subtotal, shipping, total);
    setupFormEvents(confirmacionPagoUrl, csrfToken);
    setupInputRestrictions();

    function displayCartItems(items) {
        const container = document.getElementById('order-items');
        if (container) {
            container.innerHTML = items.map(item => `
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <div class="d-flex align-items-center">
                        <img src="${item.image}" alt="${item.name}" width="60" height="60" class="rounded me-3">
                        <div>
                            <h6 class="mb-1">${item.name}</h6>
                            <small class="text-muted">${item.quantity} × L. ${item.price.toFixed(2)}</small>
                        </div>
                    </div>
                    <span>L. ${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            `).join('');
        }
    }

    function calculateTotals(items) {
        const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal * 0.05;
        const total = subtotal + shipping;
        return { subtotal, shipping, total };
    }

    function updateTotals(subtotal, shipping, total) {
        const elements = {
            'order-subtotal': subtotal.toFixed(2),
            'order-shipping': shipping.toFixed(2),
            'order-total': total.toFixed(2)
        };

        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = `L. ${value}`;
        });

        const totalInput = document.getElementById('totalValue');
        if (totalInput) totalInput.value = total.toFixed(2);

        const cartDataInput = document.getElementById('cartData');
        if (cartDataInput) cartDataInput.value = JSON.stringify(cartItems);
    }

    function setupFormEvents(confirmUrl, token) {
        const form = document.getElementById('payment-form');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                const submitBtn = document.getElementById('submit-payment');
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Procesando...';
                }

                form.submit();
            }
        });

        setupLiveValidation();
    }

    function setupInputRestrictions() {
        // Teléfono - solo números
        const phone = document.getElementById('phone');
        if (phone) {
            phone.addEventListener('input', function(e) {
                e.target.value = e.target.value.replace(/\D/g, '');
            });
        }

        // Número de tarjeta - solo números con formato (modificado para aceptar cualquier combinación)
        const cardNumber = document.getElementById('cardNumber');
        if (cardNumber) {
            cardNumber.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                value = value.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
                e.target.value = value.slice(0, 19);
            });
        }

        // Fecha de expiración - solo números con formato MM/AA
        const cardExpiry = document.getElementById('cardExpiry');
        if (cardExpiry) {
            cardExpiry.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 2) {
                    value = value.substring(0, 2) + '/' + value.substring(2, 4);
                }
                e.target.value = value.slice(0, 5);
            });
        }

        // CVC - solo 3 números
        const cardCvc = document.getElementById('cardCvc');
        if (cardCvc) {
            cardCvc.addEventListener('input', function(e) {
                e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3);
            });
        }
    }

    function validateForm() {
        let isValid = true;
        
        const personalFields = [
            { id: 'firstName', error: 'firstName-error', validate: v => v.trim() !== '' },
            { id: 'lastName', error: 'lastName-error', validate: v => v.trim() !== '' },
            { id: 'phone', error: 'phone-error', validate: v => /^\d{8,15}$/.test(v.trim()) },
            { id: 'address', error: 'address-error', validate: v => v.trim() !== '' }
        ];

        personalFields.forEach(({ id, error, validate }) => {
            isValid = validateField(id, error, validate) && isValid;
        });

        const cardFields = [
            { id: 'cardNumber', error: 'cardNumber-error', validate: v => v.replace(/\s/g, '').length === 16 }, // Solo verifica que tenga 16 dígitos
            { 
                id: 'cardExpiry', 
                error: 'cardExpiry-error', 
                validate: v => {
                    if (!/^\d{2}\/\d{2}$/.test(v)) return false;
                    
                    const [month, year] = v.split('/').map(Number);
                    if (month < 1 || month > 12) return false;
                    
                    const currentYear = new Date().getFullYear() % 100;
                    const currentMonth = new Date().getMonth() + 1;
                    
                    if (year < currentYear) return false;
                    if (year === currentYear && month < currentMonth) return false;
                    
                    return true;
                }
            },
            { id: 'cardCvc', error: 'cardCvc-error', validate: v => /^\d{3}$/.test(v) },
            { id: 'cardName', error: 'cardName-error', validate: v => v.trim() !== '' }
        ];

        cardFields.forEach(({ id, error, validate }) => {
            isValid = validateField(id, error, validate) && isValid;
        });

        const terms = document.getElementById('terms');
        const termsError = document.getElementById('terms-error');
        if (terms && !terms.checked) {
            termsError.style.display = 'block';
            isValid = false;
        } else if (termsError) {
            termsError.style.display = 'none';
        }

        if (!isValid) {
            const firstError = document.querySelector('.error-message[style="display: block;"]');
            firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        return isValid;
    }

    function validateField(fieldId, errorId, validationFn) {
        const field = document.getElementById(fieldId);
        const error = document.getElementById(errorId);
        
        if (!field || !error) return true;
        
        const isValid = validationFn(field.value);
        error.style.display = isValid ? 'none' : 'block';
        field.classList.toggle('is-invalid', !isValid);
        
        return isValid;
    }

    function setupLiveValidation() {
        const fields = [
            { id: 'firstName', error: 'firstName-error', validate: v => v.trim() !== '' },
            { id: 'lastName', error: 'lastName-error', validate: v => v.trim() !== '' },
            { id: 'email', error: 'email-error', validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
            { id: 'phone', error: 'phone-error', validate: v => /^\d{8,15}$/.test(v.trim()) },
            { id: 'address', error: 'address-error', validate: v => v.trim() !== '' },
            { id: 'cardNumber', error: 'cardNumber-error', validate: v => v.replace(/\s/g, '').length === 16 }, // Solo verifica que tenga 16 dígitos
            { 
                id: 'cardExpiry', 
                error: 'cardExpiry-error', 
                validate: v => {
                    if (!/^\d{2}\/\d{2}$/.test(v)) return false;
                    
                    const [month, year] = v.split('/').map(Number);
                    if (month < 1 || month > 12) return false;
                    
                    const currentYear = new Date().getFullYear() % 100;
                    const currentMonth = new Date().getMonth() + 1;
                    
                    if (year < currentYear) return false;
                    if (year === currentYear && month < currentMonth) return false;
                    
                    return true;
                }
            },
            { id: 'cardCvc', error: 'cardCvc-error', validate: v => /^\d{3}$/.test(v) },
            { id: 'cardName', error: 'cardName-error', validate: v => v.trim() !== '' }
        ];

        fields.forEach(({ id, error, validate }) => {
            const field = document.getElementById(id);
            if (field) {
                field.addEventListener('input', () => {
                    if (id === 'cardExpiry') {
                        const value = field.value;
                        const errorElement = document.getElementById(error);
                        
                        if (!/^\d{2}\/\d{2}$/.test(value)) {
                            errorElement.textContent = 'Formato inválido (MM/AA)';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        const [month, year] = value.split('/').map(Number);
                        if (month < 1 || month > 12) {
                            errorElement.textContent = 'Mes inválido (1-12)';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        const currentYear = new Date().getFullYear() % 100;
                        const currentMonth = new Date().getMonth() + 1;
                        
                        if (year < currentYear || (year === currentYear && month < currentMonth)) {
                            errorElement.textContent = 'Tarjeta expirada';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        errorElement.style.display = 'none';
                        field.classList.remove('is-invalid');
                    } else {
                        validateField(id, error, validate);
                    }
                });
            }
        });

        const terms = document.getElementById('terms');
        if (terms) {
            terms.addEventListener('change', function() {
                const error = document.getElementById('terms-error');
                if (error) error.style.display = this.checked ? 'none' : 'block';
            });
        }
    }

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const pagoUrl = body.getAttribute('data-pago-url') || '/productos/pago/';
    const principalUrl = body.getAttribute('data-principal-url') || '/';
    const confirmacionPagoUrl = body.getAttribute('data-confirmacion-pago-url') || '/productos/confirmacion-pago/';
    const csrfToken = getCookie('csrftoken');

    let cartItems = [];
    try {
        const cartData = localStorage.getItem('dekkoCart');
        if (cartData) {
            cartItems = JSON.parse(cartData);
            if (!Array.isArray(cartItems)) {
                throw new Error('Formato de carrito inválido');
            }
        }
    } catch (e) {
        console.error('Error al leer el carrito:', e);
        localStorage.removeItem('dekkoCart');
        window.location.href = principalUrl;
        return;
    }

    if (cartItems.length === 0) {
        window.location.href = principalUrl;
        return;
    }

    displayCartItems(cartItems);
    const { subtotal, shipping, total } = calculateTotals(cartItems);
    updateTotals(subtotal, shipping, total);
    setupFormEvents(confirmacionPagoUrl, csrfToken);
    setupInputRestrictions();

    function displayCartItems(items) {
        const container = document.getElementById('order-items');
        if (container) {
            container.innerHTML = items.map(item => `
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <div class="d-flex align-items-center">
                        <img src="${item.image}" alt="${item.name}" width="60" height="60" class="rounded me-3">
                        <div>
                            <h6 class="mb-1">${item.name}</h6>
                            <small class="text-muted">${item.quantity} × L. ${item.price.toFixed(2)}</small>
                        </div>
                    </div>
                    <span>L. ${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            `).join('');
        }
    }

    function calculateTotals(items) {
        const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal * 0.05;
        const total = subtotal + shipping;
        return { subtotal, shipping, total };
    }

    function updateTotals(subtotal, shipping, total) {
        const elements = {
            'order-subtotal': subtotal.toFixed(2),
            'order-shipping': shipping.toFixed(2),
            'order-total': total.toFixed(2)
        };

        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = `L. ${value}`;
        });

        const totalInput = document.getElementById('totalValue');
        if (totalInput) totalInput.value = total.toFixed(2);

        const cartDataInput = document.getElementById('cartData');
        if (cartDataInput) cartDataInput.value = JSON.stringify(cartItems);
    }

    function setupFormEvents(confirmUrl, token) {
        const form = document.getElementById('payment-form');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                const submitBtn = document.getElementById('submit-payment');
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Procesando...';
                }

                form.submit();
            }
        });

        setupLiveValidation();
    }

    function setupInputRestrictions() {
        // Teléfono - solo números
        const phone = document.getElementById('phone');
        if (phone) {
            phone.addEventListener('input', function(e) {
                e.target.value = e.target.value.replace(/\D/g, '');
            });
        }

        // Número de tarjeta - solo números con formato (modificado para aceptar cualquier combinación)
        const cardNumber = document.getElementById('cardNumber');
        if (cardNumber) {
            cardNumber.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                value = value.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
                e.target.value = value.slice(0, 19);
            });
        }

        // Fecha de expiración - solo números con formato MM/AA
        const cardExpiry = document.getElementById('cardExpiry');
        if (cardExpiry) {
            cardExpiry.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 2) {
                    value = value.substring(0, 2) + '/' + value.substring(2, 4);
                }
                e.target.value = value.slice(0, 5);
            });
        }

        // CVC - solo 3 números
        const cardCvc = document.getElementById('cardCvc');
        if (cardCvc) {
            cardCvc.addEventListener('input', function(e) {
                e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3);
            });
        }
    }

    function validateForm() {
        let isValid = true;
        
        const personalFields = [
            { id: 'firstName', error: 'firstName-error', validate: v => v.trim() !== '' },
            { id: 'lastName', error: 'lastName-error', validate: v => v.trim() !== '' },
            { id: 'phone', error: 'phone-error', validate: v => /^\d{8,15}$/.test(v.trim()) },
            { id: 'address', error: 'address-error', validate: v => v.trim() !== '' }
        ];

        personalFields.forEach(({ id, error, validate }) => {
            isValid = validateField(id, error, validate) && isValid;
        });

        const cardFields = [
            { id: 'cardNumber', error: 'cardNumber-error', validate: v => v.replace(/\s/g, '').length === 16 }, // Solo verifica que tenga 16 dígitos
            { 
                id: 'cardExpiry', 
                error: 'cardExpiry-error', 
                validate: v => {
                    if (!/^\d{2}\/\d{2}$/.test(v)) return false;
                    
                    const [month, year] = v.split('/').map(Number);
                    if (month < 1 || month > 12) return false;
                    
                    const currentYear = new Date().getFullYear() % 100;
                    const currentMonth = new Date().getMonth() + 1;
                    
                    if (year < currentYear) return false;
                    if (year === currentYear && month < currentMonth) return false;
                    
                    return true;
                }
            },
            { id: 'cardCvc', error: 'cardCvc-error', validate: v => /^\d{3}$/.test(v) },
            { id: 'cardName', error: 'cardName-error', validate: v => v.trim() !== '' }
        ];

        cardFields.forEach(({ id, error, validate }) => {
            isValid = validateField(id, error, validate) && isValid;
        });

        const terms = document.getElementById('terms');
        const termsError = document.getElementById('terms-error');
        if (terms && !terms.checked) {
            termsError.style.display = 'block';
            isValid = false;
        } else if (termsError) {
            termsError.style.display = 'none';
        }

        if (!isValid) {
            const firstError = document.querySelector('.error-message[style="display: block;"]');
            firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        return isValid;
    }

    function validateField(fieldId, errorId, validationFn) {
        const field = document.getElementById(fieldId);
        const error = document.getElementById(errorId);
        
        if (!field || !error) return true;
        
        const isValid = validationFn(field.value);
        error.style.display = isValid ? 'none' : 'block';
        field.classList.toggle('is-invalid', !isValid);
        
        return isValid;
    }

    function setupLiveValidation() {
        const fields = [
            { id: 'firstName', error: 'firstName-error', validate: v => v.trim() !== '' },
            { id: 'lastName', error: 'lastName-error', validate: v => v.trim() !== '' },
            { id: 'email', error: 'email-error', validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
            { id: 'phone', error: 'phone-error', validate: v => /^\d{8,15}$/.test(v.trim()) },
            { id: 'address', error: 'address-error', validate: v => v.trim() !== '' },
            { id: 'cardNumber', error: 'cardNumber-error', validate: v => v.replace(/\s/g, '').length === 16 }, // Solo verifica que tenga 16 dígitos
            { 
                id: 'cardExpiry', 
                error: 'cardExpiry-error', 
                validate: v => {
                    if (!/^\d{2}\/\d{2}$/.test(v)) return false;
                    
                    const [month, year] = v.split('/').map(Number);
                    if (month < 1 || month > 12) return false;
                    
                    const currentYear = new Date().getFullYear() % 100;
                    const currentMonth = new Date().getMonth() + 1;
                    
                    if (year < currentYear) return false;
                    if (year === currentYear && month < currentMonth) return false;
                    
                    return true;
                }
            },
            { id: 'cardCvc', error: 'cardCvc-error', validate: v => /^\d{3}$/.test(v) },
            { id: 'cardName', error: 'cardName-error', validate: v => v.trim() !== '' }
        ];

        fields.forEach(({ id, error, validate }) => {
            const field = document.getElementById(id);
            if (field) {
                field.addEventListener('input', () => {
                    if (id === 'cardExpiry') {
                        const value = field.value;
                        const errorElement = document.getElementById(error);
                        
                        if (!/^\d{2}\/\d{2}$/.test(value)) {
                            errorElement.textContent = 'Formato inválido (MM/AA)';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        const [month, year] = value.split('/').map(Number);
                        if (month < 1 || month > 12) {
                            errorElement.textContent = 'Mes inválido (1-12)';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        const currentYear = new Date().getFullYear() % 100;
                        const currentMonth = new Date().getMonth() + 1;
                        
                        if (year < currentYear || (year === currentYear && month < currentMonth)) {
                            errorElement.textContent = 'Tarjeta expirada';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        errorElement.style.display = 'none';
                        field.classList.remove('is-invalid');
                    } else {
                        validateField(id, error, validate);
                    }
                });
            }
        });

        const terms = document.getElementById('terms');
        if (terms) {
            terms.addEventListener('change', function() {
                const error = document.getElementById('terms-error');
                if (error) error.style.display = this.checked ? 'none' : 'block';
            });
        }
    }

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const pagoUrl = body.getAttribute('data-pago-url') || '/productos/pago/';
    const principalUrl = body.getAttribute('data-principal-url') || '/';
    const confirmacionPagoUrl = body.getAttribute('data-confirmacion-pago-url') || '/productos/confirmacion-pago/';
    const csrfToken = getCookie('csrftoken');

    let cartItems = [];
    try {
        const cartData = localStorage.getItem('dekkoCart');
        if (cartData) {
            cartItems = JSON.parse(cartData);
            if (!Array.isArray(cartItems)) {
                throw new Error('Formato de carrito inválido');
            }
        }
    } catch (e) {
        console.error('Error al leer el carrito:', e);
        localStorage.removeItem('dekkoCart');
        window.location.href = principalUrl;
        return;
    }

    if (cartItems.length === 0) {
        window.location.href = principalUrl;
        return;
    }

    displayCartItems(cartItems);
    const { subtotal, shipping, total } = calculateTotals(cartItems);
    updateTotals(subtotal, shipping, total);
    setupFormEvents(confirmacionPagoUrl, csrfToken);
    setupInputRestrictions();

    function displayCartItems(items) {
        const container = document.getElementById('order-items');
        if (container) {
            container.innerHTML = items.map(item => `
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <div class="d-flex align-items-center">
                        <img src="${item.image}" alt="${item.name}" width="60" height="60" class="rounded me-3">
                        <div>
                            <h6 class="mb-1">${item.name}</h6>
                            <small class="text-muted">${item.quantity} × L. ${item.price.toFixed(2)}</small>
                        </div>
                    </div>
                    <span>L. ${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            `).join('');
        }
    }

    function calculateTotals(items) {
        const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal * 0.05;
        const total = subtotal + shipping;
        return { subtotal, shipping, total };
    }

    function updateTotals(subtotal, shipping, total) {
        const elements = {
            'order-subtotal': subtotal.toFixed(2),
            'order-shipping': shipping.toFixed(2),
            'order-total': total.toFixed(2)
        };

        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = `L. ${value}`;
        });

        const totalInput = document.getElementById('totalValue');
        if (totalInput) totalInput.value = total.toFixed(2);

        const cartDataInput = document.getElementById('cartData');
        if (cartDataInput) cartDataInput.value = JSON.stringify(cartItems);
    }

    function setupFormEvents(confirmUrl, token) {
        const form = document.getElementById('payment-form');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                const submitBtn = document.getElementById('submit-payment');
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Procesando...';
                }

                form.submit();
            }
        });

        setupLiveValidation();
    }

    function setupInputRestrictions() {
        // Teléfono - solo números
        const phone = document.getElementById('phone');
        if (phone) {
            phone.addEventListener('input', function(e) {
                e.target.value = e.target.value.replace(/\D/g, '');
            });
        }

        // Número de tarjeta - solo números con formato (modificado para aceptar cualquier combinación)
        const cardNumber = document.getElementById('cardNumber');
        if (cardNumber) {
            cardNumber.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                value = value.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
                e.target.value = value.slice(0, 19);
            });
        }

        // Fecha de expiración - solo números con formato MM/AA
        const cardExpiry = document.getElementById('cardExpiry');
        if (cardExpiry) {
            cardExpiry.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 2) {
                    value = value.substring(0, 2) + '/' + value.substring(2, 4);
                }
                e.target.value = value.slice(0, 5);
            });
        }

        // CVC - solo 3 números
        const cardCvc = document.getElementById('cardCvc');
        if (cardCvc) {
            cardCvc.addEventListener('input', function(e) {
                e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3);
            });
        }
    }

    function validateForm() {
        let isValid = true;
        
        const personalFields = [
            { id: 'firstName', error: 'firstName-error', validate: v => v.trim() !== '' },
            { id: 'lastName', error: 'lastName-error', validate: v => v.trim() !== '' },
            { id: 'phone', error: 'phone-error', validate: v => /^\d{8,15}$/.test(v.trim()) },
            { id: 'address', error: 'address-error', validate: v => v.trim() !== '' }
        ];

        personalFields.forEach(({ id, error, validate }) => {
            isValid = validateField(id, error, validate) && isValid;
        });

        const cardFields = [
            { id: 'cardNumber', error: 'cardNumber-error', validate: v => v.replace(/\s/g, '').length === 16 }, // Solo verifica que tenga 16 dígitos
            { 
                id: 'cardExpiry', 
                error: 'cardExpiry-error', 
                validate: v => {
                    if (!/^\d{2}\/\d{2}$/.test(v)) return false;
                    
                    const [month, year] = v.split('/').map(Number);
                    if (month < 1 || month > 12) return false;
                    
                    const currentYear = new Date().getFullYear() % 100;
                    const currentMonth = new Date().getMonth() + 1;
                    
                    if (year < currentYear) return false;
                    if (year === currentYear && month < currentMonth) return false;
                    
                    return true;
                }
            },
            { id: 'cardCvc', error: 'cardCvc-error', validate: v => /^\d{3}$/.test(v) },
            { id: 'cardName', error: 'cardName-error', validate: v => v.trim() !== '' }
        ];

        cardFields.forEach(({ id, error, validate }) => {
            isValid = validateField(id, error, validate) && isValid;
        });

        const terms = document.getElementById('terms');
        const termsError = document.getElementById('terms-error');
        if (terms && !terms.checked) {
            termsError.style.display = 'block';
            isValid = false;
        } else if (termsError) {
            termsError.style.display = 'none';
        }

        if (!isValid) {
            const firstError = document.querySelector('.error-message[style="display: block;"]');
            firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        return isValid;
    }

    function validateField(fieldId, errorId, validationFn) {
        const field = document.getElementById(fieldId);
        const error = document.getElementById(errorId);
        
        if (!field || !error) return true;
        
        const isValid = validationFn(field.value);
        error.style.display = isValid ? 'none' : 'block';
        field.classList.toggle('is-invalid', !isValid);
        
        return isValid;
    }

    function setupLiveValidation() {
        const fields = [
            { id: 'firstName', error: 'firstName-error', validate: v => v.trim() !== '' },
            { id: 'lastName', error: 'lastName-error', validate: v => v.trim() !== '' },
            { id: 'email', error: 'email-error', validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
            { id: 'phone', error: 'phone-error', validate: v => /^\d{8,15}$/.test(v.trim()) },
            { id: 'address', error: 'address-error', validate: v => v.trim() !== '' },
            { id: 'cardNumber', error: 'cardNumber-error', validate: v => v.replace(/\s/g, '').length === 16 }, // Solo verifica que tenga 16 dígitos
            { 
                id: 'cardExpiry', 
                error: 'cardExpiry-error', 
                validate: v => {
                    if (!/^\d{2}\/\d{2}$/.test(v)) return false;
                    
                    const [month, year] = v.split('/').map(Number);
                    if (month < 1 || month > 12) return false;
                    
                    const currentYear = new Date().getFullYear() % 100;
                    const currentMonth = new Date().getMonth() + 1;
                    
                    if (year < currentYear) return false;
                    if (year === currentYear && month < currentMonth) return false;
                    
                    return true;
                }
            },
            { id: 'cardCvc', error: 'cardCvc-error', validate: v => /^\d{3}$/.test(v) },
            { id: 'cardName', error: 'cardName-error', validate: v => v.trim() !== '' }
        ];

        fields.forEach(({ id, error, validate }) => {
            const field = document.getElementById(id);
            if (field) {
                field.addEventListener('input', () => {
                    if (id === 'cardExpiry') {
                        const value = field.value;
                        const errorElement = document.getElementById(error);
                        
                        if (!/^\d{2}\/\d{2}$/.test(value)) {
                            errorElement.textContent = 'Formato inválido (MM/AA)';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        const [month, year] = value.split('/').map(Number);
                        if (month < 1 || month > 12) {
                            errorElement.textContent = 'Mes inválido (1-12)';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        const currentYear = new Date().getFullYear() % 100;
                        const currentMonth = new Date().getMonth() + 1;
                        
                        if (year < currentYear || (year === currentYear && month < currentMonth)) {
                            errorElement.textContent = 'Tarjeta expirada';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        errorElement.style.display = 'none';
                        field.classList.remove('is-invalid');
                    } else {
                        validateField(id, error, validate);
                    }
                });
            }
        });

        const terms = document.getElementById('terms');
        if (terms) {
            terms.addEventListener('change', function() {
                const error = document.getElementById('terms-error');
                if (error) error.style.display = this.checked ? 'none' : 'block';
            });
        }
    }

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const pagoUrl = body.getAttribute('data-pago-url') || '/productos/pago/';
    const principalUrl = body.getAttribute('data-principal-url') || '/';
    const confirmacionPagoUrl = body.getAttribute('data-confirmacion-pago-url') || '/productos/confirmacion-pago/';
    const csrfToken = getCookie('csrftoken');

    let cartItems = [];
    try {
        const cartData = localStorage.getItem('dekkoCart');
        if (cartData) {
            cartItems = JSON.parse(cartData);
            if (!Array.isArray(cartItems)) {
                throw new Error('Formato de carrito inválido');
            }
        }
    } catch (e) {
        console.error('Error al leer el carrito:', e);
        localStorage.removeItem('dekkoCart');
        window.location.href = principalUrl;
        return;
    }

    if (cartItems.length === 0) {
        window.location.href = principalUrl;
        return;
    }

    displayCartItems(cartItems);
    const { subtotal, shipping, total } = calculateTotals(cartItems);
    updateTotals(subtotal, shipping, total);
    setupFormEvents(confirmacionPagoUrl, csrfToken);
    setupInputRestrictions();

    function displayCartItems(items) {
        const container = document.getElementById('order-items');
        if (container) {
            container.innerHTML = items.map(item => `
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <div class="d-flex align-items-center">
                        <img src="${item.image}" alt="${item.name}" width="60" height="60" class="rounded me-3">
                        <div>
                            <h6 class="mb-1">${item.name}</h6>
                            <small class="text-muted">${item.quantity} × L. ${item.price.toFixed(2)}</small>
                        </div>
                    </div>
                    <span>L. ${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            `).join('');
        }
    }

    function calculateTotals(items) {
        const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal * 0.05;
        const total = subtotal + shipping;
        return { subtotal, shipping, total };
    }

    function updateTotals(subtotal, shipping, total) {
        const elements = {
            'order-subtotal': subtotal.toFixed(2),
            'order-shipping': shipping.toFixed(2),
            'order-total': total.toFixed(2)
        };

        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = `L. ${value}`;
        });

        const totalInput = document.getElementById('totalValue');
        if (totalInput) totalInput.value = total.toFixed(2);

        const cartDataInput = document.getElementById('cartData');
        if (cartDataInput) cartDataInput.value = JSON.stringify(cartItems);
    }

    function setupFormEvents(confirmUrl, token) {
        const form = document.getElementById('payment-form');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                const submitBtn = document.getElementById('submit-payment');
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Procesando...';
                }

                form.submit();
            }
        });

        setupLiveValidation();
    }

    function setupInputRestrictions() {
        // Teléfono - solo números
        const phone = document.getElementById('phone');
        if (phone) {
            phone.addEventListener('input', function(e) {
                e.target.value = e.target.value.replace(/\D/g, '');
            });
        }

        // Número de tarjeta - solo números con formato (modificado para aceptar cualquier combinación)
        const cardNumber = document.getElementById('cardNumber');
        if (cardNumber) {
            cardNumber.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                value = value.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
                e.target.value = value.slice(0, 19);
            });
        }

        // Fecha de expiración - solo números con formato MM/AA
        const cardExpiry = document.getElementById('cardExpiry');
        if (cardExpiry) {
            cardExpiry.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 2) {
                    value = value.substring(0, 2) + '/' + value.substring(2, 4);
                }
                e.target.value = value.slice(0, 5);
            });
        }

        // CVC - solo 3 números
        const cardCvc = document.getElementById('cardCvc');
        if (cardCvc) {
            cardCvc.addEventListener('input', function(e) {
                e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3);
            });
        }
    }

    function validateForm() {
        let isValid = true;
        
        const personalFields = [
            { id: 'firstName', error: 'firstName-error', validate: v => v.trim() !== '' },
            { id: 'lastName', error: 'lastName-error', validate: v => v.trim() !== '' },
            { id: 'phone', error: 'phone-error', validate: v => /^\d{8,15}$/.test(v.trim()) },
            { id: 'address', error: 'address-error', validate: v => v.trim() !== '' }
        ];

        personalFields.forEach(({ id, error, validate }) => {
            isValid = validateField(id, error, validate) && isValid;
        });

        const cardFields = [
            { id: 'cardNumber', error: 'cardNumber-error', validate: v => v.replace(/\s/g, '').length === 16 }, // Solo verifica que tenga 16 dígitos
            { 
                id: 'cardExpiry', 
                error: 'cardExpiry-error', 
                validate: v => {
                    if (!/^\d{2}\/\d{2}$/.test(v)) return false;
                    
                    const [month, year] = v.split('/').map(Number);
                    if (month < 1 || month > 12) return false;
                    
                    const currentYear = new Date().getFullYear() % 100;
                    const currentMonth = new Date().getMonth() + 1;
                    
                    if (year < currentYear) return false;
                    if (year === currentYear && month < currentMonth) return false;
                    
                    return true;
                }
            },
            { id: 'cardCvc', error: 'cardCvc-error', validate: v => /^\d{3}$/.test(v) },
            { id: 'cardName', error: 'cardName-error', validate: v => v.trim() !== '' }
        ];

        cardFields.forEach(({ id, error, validate }) => {
            isValid = validateField(id, error, validate) && isValid;
        });

        const terms = document.getElementById('terms');
        const termsError = document.getElementById('terms-error');
        if (terms && !terms.checked) {
            termsError.style.display = 'block';
            isValid = false;
        } else if (termsError) {
            termsError.style.display = 'none';
        }

        if (!isValid) {
            const firstError = document.querySelector('.error-message[style="display: block;"]');
            firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        return isValid;
    }

    function validateField(fieldId, errorId, validationFn) {
        const field = document.getElementById(fieldId);
        const error = document.getElementById(errorId);
        
        if (!field || !error) return true;
        
        const isValid = validationFn(field.value);
        error.style.display = isValid ? 'none' : 'block';
        field.classList.toggle('is-invalid', !isValid);
        
        return isValid;
    }

    function setupLiveValidation() {
        const fields = [
            { id: 'firstName', error: 'firstName-error', validate: v => v.trim() !== '' },
            { id: 'lastName', error: 'lastName-error', validate: v => v.trim() !== '' },
            { id: 'email', error: 'email-error', validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
            { id: 'phone', error: 'phone-error', validate: v => /^\d{8,15}$/.test(v.trim()) },
            { id: 'address', error: 'address-error', validate: v => v.trim() !== '' },
            { id: 'cardNumber', error: 'cardNumber-error', validate: v => v.replace(/\s/g, '').length === 16 }, // Solo verifica que tenga 16 dígitos
            { 
                id: 'cardExpiry', 
                error: 'cardExpiry-error', 
                validate: v => {
                    if (!/^\d{2}\/\d{2}$/.test(v)) return false;
                    
                    const [month, year] = v.split('/').map(Number);
                    if (month < 1 || month > 12) return false;
                    
                    const currentYear = new Date().getFullYear() % 100;
                    const currentMonth = new Date().getMonth() + 1;
                    
                    if (year < currentYear) return false;
                    if (year === currentYear && month < currentMonth) return false;
                    
                    return true;
                }
            },
            { id: 'cardCvc', error: 'cardCvc-error', validate: v => /^\d{3}$/.test(v) },
            { id: 'cardName', error: 'cardName-error', validate: v => v.trim() !== '' }
        ];

        fields.forEach(({ id, error, validate }) => {
            const field = document.getElementById(id);
            if (field) {
                field.addEventListener('input', () => {
                    if (id === 'cardExpiry') {
                        const value = field.value;
                        const errorElement = document.getElementById(error);
                        
                        if (!/^\d{2}\/\d{2}$/.test(value)) {
                            errorElement.textContent = 'Formato inválido (MM/AA)';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        const [month, year] = value.split('/').map(Number);
                        if (month < 1 || month > 12) {
                            errorElement.textContent = 'Mes inválido (1-12)';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        const currentYear = new Date().getFullYear() % 100;
                        const currentMonth = new Date().getMonth() + 1;
                        
                        if (year < currentYear || (year === currentYear && month < currentMonth)) {
                            errorElement.textContent = 'Tarjeta expirada';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        errorElement.style.display = 'none';
                        field.classList.remove('is-invalid');
                    } else {
                        validateField(id, error, validate);
                    }
                });
            }
        });

        const terms = document.getElementById('terms');
        if (terms) {
            terms.addEventListener('change', function() {
                const error = document.getElementById('terms-error');
                if (error) error.style.display = this.checked ? 'none' : 'block';
            });
        }
    }

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const pagoUrl = body.getAttribute('data-pago-url') || '/productos/pago/';
    const principalUrl = body.getAttribute('data-principal-url') || '/';
    const confirmacionPagoUrl = body.getAttribute('data-confirmacion-pago-url') || '/productos/confirmacion-pago/';
    const csrfToken = getCookie('csrftoken');

    let cartItems = [];
    try {
        const cartData = localStorage.getItem('dekkoCart');
        if (cartData) {
            cartItems = JSON.parse(cartData);
            if (!Array.isArray(cartItems)) {
                throw new Error('Formato de carrito inválido');
            }
        }
    } catch (e) {
        console.error('Error al leer el carrito:', e);
        localStorage.removeItem('dekkoCart');
        window.location.href = principalUrl;
        return;
    }

    if (cartItems.length === 0) {
        window.location.href = principalUrl;
        return;
    }

    displayCartItems(cartItems);
    const { subtotal, shipping, total } = calculateTotals(cartItems);
    updateTotals(subtotal, shipping, total);
    setupFormEvents(confirmacionPagoUrl, csrfToken);
    setupInputRestrictions();

    function displayCartItems(items) {
        const container = document.getElementById('order-items');
        if (container) {
            container.innerHTML = items.map(item => `
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <div class="d-flex align-items-center">
                        <img src="${item.image}" alt="${item.name}" width="60" height="60" class="rounded me-3">
                        <div>
                            <h6 class="mb-1">${item.name}</h6>
                            <small class="text-muted">${item.quantity} × L. ${item.price.toFixed(2)}</small>
                        </div>
                    </div>
                    <span>L. ${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            `).join('');
        }
    }

    function calculateTotals(items) {
        const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal * 0.05;
        const total = subtotal + shipping;
        return { subtotal, shipping, total };
    }

    function updateTotals(subtotal, shipping, total) {
        const elements = {
            'order-subtotal': subtotal.toFixed(2),
            'order-shipping': shipping.toFixed(2),
            'order-total': total.toFixed(2)
        };

        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = `L. ${value}`;
        });

        const totalInput = document.getElementById('totalValue');
        if (totalInput) totalInput.value = total.toFixed(2);

        const cartDataInput = document.getElementById('cartData');
        if (cartDataInput) cartDataInput.value = JSON.stringify(cartItems);
    }

    function setupFormEvents(confirmUrl, token) {
        const form = document.getElementById('payment-form');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                const submitBtn = document.getElementById('submit-payment');
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Procesando...';
                }

                form.submit();
            }
        });

        setupLiveValidation();
    }

    function setupInputRestrictions() {
        // Teléfono - solo números
        const phone = document.getElementById('phone');
        if (phone) {
            phone.addEventListener('input', function(e) {
                e.target.value = e.target.value.replace(/\D/g, '');
            });
        }

        // Número de tarjeta - solo números con formato (modificado para aceptar cualquier combinación)
        const cardNumber = document.getElementById('cardNumber');
        if (cardNumber) {
            cardNumber.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                value = value.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
                e.target.value = value.slice(0, 19);
            });
        }

        // Fecha de expiración - solo números con formato MM/AA
        const cardExpiry = document.getElementById('cardExpiry');
        if (cardExpiry) {
            cardExpiry.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 2) {
                    value = value.substring(0, 2) + '/' + value.substring(2, 4);
                }
                e.target.value = value.slice(0, 5);
            });
        }

        // CVC - solo 3 números
        const cardCvc = document.getElementById('cardCvc');
        if (cardCvc) {
            cardCvc.addEventListener('input', function(e) {
                e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3);
            });
        }
    }

    function validateForm() {
        let isValid = true;
        
        const personalFields = [
            { id: 'firstName', error: 'firstName-error', validate: v => v.trim() !== '' },
            { id: 'lastName', error: 'lastName-error', validate: v => v.trim() !== '' },
            { id: 'phone', error: 'phone-error', validate: v => /^\d{8,15}$/.test(v.trim()) },
            { id: 'address', error: 'address-error', validate: v => v.trim() !== '' }
        ];

        personalFields.forEach(({ id, error, validate }) => {
            isValid = validateField(id, error, validate) && isValid;
        });

        const cardFields = [
            { id: 'cardNumber', error: 'cardNumber-error', validate: v => v.replace(/\s/g, '').length === 16 }, // Solo verifica que tenga 16 dígitos
            { 
                id: 'cardExpiry', 
                error: 'cardExpiry-error', 
                validate: v => {
                    if (!/^\d{2}\/\d{2}$/.test(v)) return false;
                    
                    const [month, year] = v.split('/').map(Number);
                    if (month < 1 || month > 12) return false;
                    
                    const currentYear = new Date().getFullYear() % 100;
                    const currentMonth = new Date().getMonth() + 1;
                    
                    if (year < currentYear) return false;
                    if (year === currentYear && month < currentMonth) return false;
                    
                    return true;
                }
            },
            { id: 'cardCvc', error: 'cardCvc-error', validate: v => /^\d{3}$/.test(v) },
            { id: 'cardName', error: 'cardName-error', validate: v => v.trim() !== '' }
        ];

        cardFields.forEach(({ id, error, validate }) => {
            isValid = validateField(id, error, validate) && isValid;
        });

        const terms = document.getElementById('terms');
        const termsError = document.getElementById('terms-error');
        if (terms && !terms.checked) {
            termsError.style.display = 'block';
            isValid = false;
        } else if (termsError) {
            termsError.style.display = 'none';
        }

        if (!isValid) {
            const firstError = document.querySelector('.error-message[style="display: block;"]');
            firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        return isValid;
    }

    function validateField(fieldId, errorId, validationFn) {
        const field = document.getElementById(fieldId);
        const error = document.getElementById(errorId);
        
        if (!field || !error) return true;
        
        const isValid = validationFn(field.value);
        error.style.display = isValid ? 'none' : 'block';
        field.classList.toggle('is-invalid', !isValid);
        
        return isValid;
    }

    function setupLiveValidation() {
        const fields = [
            { id: 'firstName', error: 'firstName-error', validate: v => v.trim() !== '' },
            { id: 'lastName', error: 'lastName-error', validate: v => v.trim() !== '' },
            { id: 'email', error: 'email-error', validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
            { id: 'phone', error: 'phone-error', validate: v => /^\d{8,15}$/.test(v.trim()) },
            { id: 'address', error: 'address-error', validate: v => v.trim() !== '' },
            { id: 'cardNumber', error: 'cardNumber-error', validate: v => v.replace(/\s/g, '').length === 16 }, // Solo verifica que tenga 16 dígitos
            { 
                id: 'cardExpiry', 
                error: 'cardExpiry-error', 
                validate: v => {
                    if (!/^\d{2}\/\d{2}$/.test(v)) return false;
                    
                    const [month, year] = v.split('/').map(Number);
                    if (month < 1 || month > 12) return false;
                    
                    const currentYear = new Date().getFullYear() % 100;
                    const currentMonth = new Date().getMonth() + 1;
                    
                    if (year < currentYear) return false;
                    if (year === currentYear && month < currentMonth) return false;
                    
                    return true;
                }
            },
            { id: 'cardCvc', error: 'cardCvc-error', validate: v => /^\d{3}$/.test(v) },
            { id: 'cardName', error: 'cardName-error', validate: v => v.trim() !== '' }
        ];

        fields.forEach(({ id, error, validate }) => {
            const field = document.getElementById(id);
            if (field) {
                field.addEventListener('input', () => {
                    if (id === 'cardExpiry') {
                        const value = field.value;
                        const errorElement = document.getElementById(error);
                        
                        if (!/^\d{2}\/\d{2}$/.test(value)) {
                            errorElement.textContent = 'Formato inválido (MM/AA)';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        const [month, year] = value.split('/').map(Number);
                        if (month < 1 || month > 12) {
                            errorElement.textContent = 'Mes inválido (1-12)';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        const currentYear = new Date().getFullYear() % 100;
                        const currentMonth = new Date().getMonth() + 1;
                        
                        if (year < currentYear || (year === currentYear && month < currentMonth)) {
                            errorElement.textContent = 'Tarjeta expirada';
                            errorElement.style.display = 'block';
                            field.classList.add('is-invalid');
                            return;
                        }
                        
                        errorElement.style.display = 'none';
                        field.classList.remove('is-invalid');
                    } else {
                        validateField(id, error, validate);
                    }
                });
            }
        });

        const terms = document.getElementById('terms');
        if (terms) {
            terms.addEventListener('change', function() {
                const error = document.getElementById('terms-error');
                if (error) error.style.display = this.checked ? 'none' : 'block';
            });
        }
    }

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});
