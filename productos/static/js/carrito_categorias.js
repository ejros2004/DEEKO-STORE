document.addEventListener('DOMContentLoaded', function() {
    cart.init();
});

const cart = {
    items: [],
    total: 0,
    
    init: function() {
        this.loadFromServer();
        this.calculateTotal();
        this.updateCartDisplay();
        this.setupEventListeners();
    },

    normalizeProductId: function(id) {
        return parseInt(id);
    },

    addItem: function(product) {
        const productId = this.normalizeProductId(product.id);
        const existingItem = this.items.find(item => item.id === productId);
        const availableStock = parseInt(product.stock) || 0;

        if (availableStock <= 0) {
            alert('Este producto está agotado');
            return;
        }

        if (existingItem) {
            if (existingItem.quantity >= availableStock) {
                alert(`No hay suficiente stock disponible. Solo quedan ${availableStock} unidades.`);
                return;
            }
            existingItem.quantity += 1;
        } else {
            this.items.push({
                id: productId,
                name: product.name,
                price: parseFloat(product.price),
                image: product.image,
                quantity: 1,
                stock: availableStock
            });
        }
        
        this.updateCart();
        this.showToast(product);
    },

    removeItem: function(id) {
        const normalizedId = this.normalizeProductId(id);
        const itemElement = document.querySelector(`.cart-item[data-id="${normalizedId}"]`);
        
        if (itemElement) {
            itemElement.style.transition = 'all 0.5s ease';
            itemElement.style.transform = 'translateX(-100%)';
            itemElement.style.opacity = '0';
            itemElement.style.backgroundColor = 'rgba(239, 68, 68, 0.2)';
            
            setTimeout(() => {
                this.items = this.items.filter(item => item.id !== normalizedId);
                this.updateCart();
            }, 500);
        } else {
            this.items = this.items.filter(item => item.id !== normalizedId);
            this.updateCart();
        }
    },

    updateCart: function() {
        this.calculateTotal();
        this.updateCartDisplay();
        this.saveToLocalStorage();
        this.syncWithServer();
    },

    calculateTotal: function() {
        this.total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },

    updateCartDisplay: function() {
        const cartItemsElement = document.getElementById('cartItems');
        const cartCountElement = document.getElementById('cartCount');
        const cartTotalElement = document.getElementById('cartTotal');
        const cartFormElement = document.getElementById('cartFormData');
        const checkoutBtn = document.getElementById('proceedToCheckout');

        if (cartFormElement) {
            cartFormElement.value = JSON.stringify({
                items: this.items,
                total: this.total
            });
        }

        if (cartTotalElement) {
            cartTotalElement.textContent = `L. ${this.total.toFixed(2)}`;
        }
        
        if (cartCountElement) {
            const itemCount = this.items.reduce((sum, item) => sum + item.quantity, 0);
            cartCountElement.textContent = itemCount;
            cartCountElement.style.display = itemCount > 0 ? 'block' : 'none';
        }
        
        if (checkoutBtn) {
            if (this.items.length === 0) {
                checkoutBtn.disabled = true;
                checkoutBtn.classList.add('btn-disabled');
                checkoutBtn.innerHTML = '<i class="fas fa-ban me-2"></i> Carrito vacío';
            } else {
                checkoutBtn.disabled = false;
                checkoutBtn.classList.remove('btn-disabled');
                checkoutBtn.innerHTML = '<i class="fas fa-credit-card me-2"></i> Proceder al Pago';
            }
        }
        
        if (cartItemsElement) {
            if (this.items.length === 0) {
                cartItemsElement.innerHTML = `
                    <div class="empty-cart-message text-center py-5">
                        <i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
                        <h5 class="text-muted mb-3">Tu carrito está vacío</h5>
                        <p class="text-muted small">Agrega productos para continuar</p>
                    </div>`;
            } else {
                cartItemsElement.innerHTML = this.items.map(item => `
                    <div class="cart-item mb-3 pb-3 border-bottom" data-id="${item.id}">
                        <div class="d-flex align-items-center">
                            <img src="${item.image}" alt="${item.name}" class="rounded me-3" style="width: 60px; height: 60px; object-fit: contain;">
                            <div class="flex-grow-1">
                                <h6 class="mb-1">${item.name}</h6>
                                <p class="mb-1 text-muted small">L. ${item.price.toFixed(2)} c/u</p>
                                <div class="d-flex align-items-center">
                                    <button class="btn btn-sm btn-outline-secondary decrement" data-id="${item.id}">
                                        <i class="fas fa-minus"></i>
                                    </button>
                                    <span class="mx-2">${item.quantity}</span>
                                    <button class="btn btn-sm btn-outline-secondary increment" data-id="${item.id}">
                                        <i class="fas fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                            <button class="btn btn-sm btn-outline-danger ms-2 remove" data-id="${item.id}">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                `).join('');
            }
        }
    },

    saveToLocalStorage: function() {
        localStorage.setItem('dekkoCart', JSON.stringify(this.items));
    },

    loadFromLocalStorage: function() {
        const savedCart = localStorage.getItem('dekkoCart');
        if (savedCart) {
            try {
                this.items = JSON.parse(savedCart).map(item => ({
                    ...item,
                    price: parseFloat(item.price),
                    quantity: parseInt(item.quantity)
                }));
            } catch (error) {
                console.error('Error al parsear carrito:', error);
                this.items = [];
            }
        }
    },

loadFromServer: function() {
    if (!this.userIsAuthenticated()) {
        console.log('Usuario no autenticado, cargando de localStorage');
        this.loadFromLocalStorage();
        this.calculateTotal(); // Añade esto
        this.updateCartDisplay();
        return;
    }
    
    console.log('Cargando carrito del servidor...');
    fetch('/productos/api/carrito/obtener/')
        .then(response => {
            console.log('Respuesta recibida:', response.status);
            if (!response.ok) throw new Error('Error al obtener carrito');
            return response.json();
        })
        .then(data => {
            console.log('Datos recibidos:', data);
            if (data.status === 'success') {
                this.items = data.items;
                this.saveToLocalStorage();
                this.calculateTotal(); // Asegúrate de calcular después de cargar
                this.updateCartDisplay();
            }
        })
        .catch(error => {
            console.error('Error al cargar carrito:', error);
            this.loadFromLocalStorage();
            this.calculateTotal(); // También aquí por si falla
            this.updateCartDisplay();
        });
},

    syncWithServer: function() {
        if (!this.userIsAuthenticated()) {
            console.log('Usuario no autenticado, no se sincroniza con servidor');
            return;
        }
        
        const url = '/productos/api/carrito/actualizar/';
        const items = this.items.map(item => ({
            producto_id: item.id,
            cantidad: item.quantity
        }));
        
        console.log('Sincronizando con servidor:', { items: items });
        
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': this.getCSRFToken()
            },
            body: JSON.stringify({ items: items })
        })
        .then(response => {
            console.log('Respuesta del servidor:', response.status);
            if (!response.ok) throw new Error('Error en la respuesta del servidor');
            return response.json();
        })
        .then(data => {
            console.log('Carrito sincronizado:', data);
        })
        .catch(error => {
            console.error('Error al sincronizar carrito:', error);
        });
    },

    userIsAuthenticated: function() {
        const token = this.getCSRFToken();
        console.log('CSRF Token:', token ? 'Presente' : 'Ausente');
        return token !== null;
    },

    getCSRFToken: function() {
        const cookieValue = document.cookie.match('(^|;)\\s*csrftoken\\s*=\\s*([^;]+)');
        return cookieValue ? cookieValue.pop() : '';
    },

    showToast: function(product) {
        const toast = document.getElementById('cartToast');
        if (toast) {
            document.getElementById('toastImg').src = product.image;
            document.getElementById('toastTitle').textContent = product.name;
            
            const viewCartLink = document.getElementById('viewCart');
            if (viewCartLink) {
                viewCartLink.onclick = (e) => {
                    e.preventDefault();
                    this.openCart();
                };
            }
            
            toast.classList.add('active');
            
            setTimeout(() => {
                toast.classList.remove('active');
            }, 4000);
        }
    },

    openCart: function() {
        document.getElementById('cartOverlay').style.display = 'block';
        document.getElementById('cartSidebar').style.transform = 'translateX(0)';
        document.body.style.overflow = 'hidden';
    },

    closeCart: function() {
        document.getElementById('cartOverlay').style.display = 'none';
        document.getElementById('cartSidebar').style.transform = 'translateX(100%)';
        document.body.style.overflow = 'auto';
    },

    setupEventListeners: function() {
        document.getElementById('cartToggle')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.openCart();
        });
        
        document.getElementById('closeCart')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.closeCart();
        });
        
        document.getElementById('cartOverlay')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.closeCart();
        });
        
        document.getElementById('proceedToCheckout')?.addEventListener('click', (e) => {
            e.preventDefault();
            if (this.items.length === 0) {
                alert('Tu carrito está vacío');
                return;
            }
            
            document.getElementById('cartFormData').value = JSON.stringify(this.items);
            document.getElementById('cartForm').submit();
        });
        
        document.getElementById('closeToast')?.addEventListener('click', () => {
            const toast = document.getElementById('cartToast');
            if (toast) toast.classList.remove('active');
        });
        
        document.addEventListener('click', (e) => {
            if (e.target.closest('.remove') || e.target.closest('.cart-item-remove')) {
                this.removeItem(e.target.closest('[data-id]').getAttribute('data-id'));
            } 
            else if (e.target.closest('.increment') || e.target.closest('.quantity-btn.increment')) {
                const id = e.target.closest('[data-id]').getAttribute('data-id');
                const item = this.items.find(item => item.id === parseInt(id));
                if (item) {
                    if (item.quantity >= item.stock) {
                        alert('No hay suficiente stock disponible');
                        return;
                    }
                    item.quantity += 1;
                    this.updateCart();
                }
            }
            else if (e.target.closest('.decrement') || e.target.closest('.quantity-btn.decrement')) {
                const id = e.target.closest('[data-id]').getAttribute('data-id');
                const item = this.items.find(item => item.id === parseInt(id));
                if (item) {
                    item.quantity -= 1;
                    if (item.quantity <= 0) this.removeItem(id);
                    else this.updateCart();
                }
            }
            else if (e.target.closest('.btn-add-to-cart')) {
                const btn = e.target.closest('.btn-add-to-cart');
                this.addItem({
                    id: btn.getAttribute('data-id'),
                    name: btn.getAttribute('data-name'),
                    price: btn.getAttribute('data-price'),
                    image: btn.getAttribute('data-image'),
                    stock: btn.getAttribute('data-stock')
                });
            }
        });
    }
};
document.addEventListener('DOMContentLoaded', function() {
    cart.init();
});

const carta = {
    items: [],
    total: 0,
    
    init: function() {
        this.loadFromServer();
        this.calculateTotal();
        this.updateCartDisplay();
        this.setupEventListeners();
    },

    normalizeProductId: function(id) {
        return parseInt(id);
    },

    addItem: function(product) {
        const productId = this.normalizeProductId(product.id);
        const existingItem = this.items.find(item => item.id === productId);
        const availableStock = parseInt(product.stock) || 0;

        if (availableStock <= 0) {
            alert('Este producto está agotado');
            return;
        }

        if (existingItem) {
            if (existingItem.quantity >= availableStock) {
                alert(`No hay suficiente stock disponible. Solo quedan ${availableStock} unidades.`);
                return;
            }
            existingItem.quantity += 1;
        } else {
            this.items.push({
                id: productId,
                name: product.name,
                price: parseFloat(product.price),
                image: product.image,
                quantity: 1,
                stock: availableStock
            });
        }
        
        this.updateCart();
        this.showToast(product);
    },

    removeItem: function(id) {
        const normalizedId = this.normalizeProductId(id);
        const itemElement = document.querySelector(`.cart-item[data-id="${normalizedId}"]`);
        
        if (itemElement) {
            itemElement.style.transition = 'all 0.5s ease';
            itemElement.style.transform = 'translateX(-100%)';
            itemElement.style.opacity = '0';
            itemElement.style.backgroundColor = 'rgba(239, 68, 68, 0.2)';
            
            setTimeout(() => {
                this.items = this.items.filter(item => item.id !== normalizedId);
                this.updateCart();
            }, 500);
        } else {
            this.items = this.items.filter(item => item.id !== normalizedId);
            this.updateCart();
        }
    },

    updateCart: function() {
        this.calculateTotal();
        this.updateCartDisplay();
        this.saveToLocalStorage();
        this.syncWithServer();
    },

    calculateTotal: function() {
        this.total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },

    updateCartDisplay: function() {
        const cartItemsElement = document.getElementById('cartItems');
        const cartCountElement = document.getElementById('cartCount');
        const cartTotalElement = document.getElementById('cartTotal');
        const cartFormElement = document.getElementById('cartFormData');
        const checkoutBtn = document.getElementById('proceedToCheckout');

        if (cartFormElement) {
            cartFormElement.value = JSON.stringify({
                items: this.items,
                total: this.total
            });
        }

        if (cartTotalElement) {
            cartTotalElement.textContent = `L. ${this.total.toFixed(2)}`;
        }
        
        if (cartCountElement) {
            const itemCount = this.items.reduce((sum, item) => sum + item.quantity, 0);
            cartCountElement.textContent = itemCount;
            cartCountElement.style.display = itemCount > 0 ? 'block' : 'none';
        }
        
        if (checkoutBtn) {
            if (this.items.length === 0) {
                checkoutBtn.disabled = true;
                checkoutBtn.classList.add('btn-disabled');
                checkoutBtn.innerHTML = '<i class="fas fa-ban me-2"></i> Carrito vacío';
            } else {
                checkoutBtn.disabled = false;
                checkoutBtn.classList.remove('btn-disabled');
                checkoutBtn.innerHTML = '<i class="fas fa-credit-card me-2"></i> Proceder al Pago';
            }
        }
        
        if (cartItemsElement) {
            if (this.items.length === 0) {
                cartItemsElement.innerHTML = `
                    <div class="empty-cart-message text-center py-5">
                        <i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
                        <h5 class="text-muted mb-3">Tu carrito está vacío</h5>
                        <p class="text-muted small">Agrega productos para continuar</p>
                    </div>`;
            } else {
                cartItemsElement.innerHTML = this.items.map(item => `
                    <div class="cart-item mb-3 pb-3 border-bottom" data-id="${item.id}">
                        <div class="d-flex align-items-center">
                            <img src="${item.image}" alt="${item.name}" class="rounded me-3" style="width: 60px; height: 60px; object-fit: contain;">
                            <div class="flex-grow-1">
                                <h6 class="mb-1">${item.name}</h6>
                                <p class="mb-1 text-muted small">L. ${item.price.toFixed(2)} c/u</p>
                                <div class="d-flex align-items-center">
                                    <button class="btn btn-sm btn-outline-secondary decrement" data-id="${item.id}">
                                        <i class="fas fa-minus"></i>
                                    </button>
                                    <span class="mx-2">${item.quantity}</span>
                                    <button class="btn btn-sm btn-outline-secondary increment" data-id="${item.id}">
                                        <i class="fas fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                            <button class="btn btn-sm btn-outline-danger ms-2 remove" data-id="${item.id}">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                `).join('');
            }
        }
    },

    saveToLocalStorage: function() {
        localStorage.setItem('dekkoCart', JSON.stringify(this.items));
    },

    loadFromLocalStorage: function() {
        const savedCart = localStorage.getItem('dekkoCart');
        if (savedCart) {
            try {
                this.items = JSON.parse(savedCart).map(item => ({
                    ...item,
                    price: parseFloat(item.price),
                    quantity: parseInt(item.quantity)
                }));
            } catch (error) {
                console.error('Error al parsear carrito:', error);
                this.items = [];
            }
        }
    },

loadFromServer: function() {
    if (!this.userIsAuthenticated()) {
        console.log('Usuario no autenticado, cargando de localStorage');
        this.loadFromLocalStorage();
        this.calculateTotal(); // Añade esto
        this.updateCartDisplay();
        return;
    }
    
    console.log('Cargando carrito del servidor...');
    fetch('/productos/api/carrito/obtener/')
        .then(response => {
            console.log('Respuesta recibida:', response.status);
            if (!response.ok) throw new Error('Error al obtener carrito');
            return response.json();
        })
        .then(data => {
            console.log('Datos recibidos:', data);
            if (data.status === 'success') {
                this.items = data.items;
                this.saveToLocalStorage();
                this.calculateTotal(); // Asegúrate de calcular después de cargar
                this.updateCartDisplay();
            }
        })
        .catch(error => {
            console.error('Error al cargar carrito:', error);
            this.loadFromLocalStorage();
            this.calculateTotal(); // También aquí por si falla
            this.updateCartDisplay();
        });
},

    syncWithServer: function() {
        if (!this.userIsAuthenticated()) {
            console.log('Usuario no autenticado, no se sincroniza con servidor');
            return;
        }
        
        const url = '/productos/api/carrito/actualizar/';
        const items = this.items.map(item => ({
            producto_id: item.id,
            cantidad: item.quantity
        }));
        
        console.log('Sincronizando con servidor:', { items: items });
        
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': this.getCSRFToken()
            },
            body: JSON.stringify({ items: items })
        })
        .then(response => {
            console.log('Respuesta del servidor:', response.status);
            if (!response.ok) throw new Error('Error en la respuesta del servidor');
            return response.json();
        })
        .then(data => {
            console.log('Carrito sincronizado:', data);
        })
        .catch(error => {
            console.error('Error al sincronizar carrito:', error);
        });
    },

    userIsAuthenticated: function() {
        const token = this.getCSRFToken();
        console.log('CSRF Token:', token ? 'Presente' : 'Ausente');
        return token !== null;
    },

    getCSRFToken: function() {
        const cookieValue = document.cookie.match('(^|;)\\s*csrftoken\\s*=\\s*([^;]+)');
        return cookieValue ? cookieValue.pop() : '';
    },

    showToast: function(product) {
        const toast = document.getElementById('cartToast');
        if (toast) {
            document.getElementById('toastImg').src = product.image;
            document.getElementById('toastTitle').textContent = product.name;
            
            const viewCartLink = document.getElementById('viewCart');
            if (viewCartLink) {
                viewCartLink.onclick = (e) => {
                    e.preventDefault();
                    this.openCart();
                };
            }
            
            toast.classList.add('active');
            
            setTimeout(() => {
                toast.classList.remove('active');
            }, 4000);
        }
    },

    openCart: function() {
        document.getElementById('cartOverlay').style.display = 'block';
        document.getElementById('cartSidebar').style.transform = 'translateX(0)';
        document.body.style.overflow = 'hidden';
    },

    closeCart: function() {
        document.getElementById('cartOverlay').style.display = 'none';
        document.getElementById('cartSidebar').style.transform = 'translateX(100%)';
        document.body.style.overflow = 'auto';
    },

    setupEventListeners: function() {
        document.getElementById('cartToggle')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.openCart();
        });
        
        document.getElementById('closeCart')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.closeCart();
        });
        
        document.getElementById('cartOverlay')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.closeCart();
        });
        
        document.getElementById('proceedToCheckout')?.addEventListener('click', (e) => {
            e.preventDefault();
            if (this.items.length === 0) {
                alert('Tu carrito está vacío');
                return;
            }
            
            document.getElementById('cartFormData').value = JSON.stringify(this.items);
            document.getElementById('cartForm').submit();
        });
        
        document.getElementById('closeToast')?.addEventListener('click', () => {
            const toast = document.getElementById('cartToast');
            if (toast) toast.classList.remove('active');
        });
        
        document.addEventListener('click', (e) => {
            if (e.target.closest('.remove') || e.target.closest('.cart-item-remove')) {
                this.removeItem(e.target.closest('[data-id]').getAttribute('data-id'));
            } 
            else if (e.target.closest('.increment') || e.target.closest('.quantity-btn.increment')) {
                const id = e.target.closest('[data-id]').getAttribute('data-id');
                const item = this.items.find(item => item.id === parseInt(id));
                if (item) {
                    if (item.quantity >= item.stock) {
                        alert('No hay suficiente stock disponible');
                        return;
                    }
                    item.quantity += 1;
                    this.updateCart();
                }
            }
            else if (e.target.closest('.decrement') || e.target.closest('.quantity-btn.decrement')) {
                const id = e.target.closest('[data-id]').getAttribute('data-id');
                const item = this.items.find(item => item.id === parseInt(id));
                if (item) {
                    item.quantity -= 1;
                    if (item.quantity <= 0) this.removeItem(id);
                    else this.updateCart();
                }
            }
            else if (e.target.closest('.btn-add-to-cart')) {
                const btn = e.target.closest('.btn-add-to-cart');
                this.addItem({
                    id: btn.getAttribute('data-id'),
                    name: btn.getAttribute('data-name'),
                    price: btn.getAttribute('data-price'),
                    image: btn.getAttribute('data-image'),
                    stock: btn.getAttribute('data-stock')
                });
            }
        });
    }
};
document.addEventListener('DOMContentLoaded', function() {
    cart.init();
});

const cartu = {
    items: [],
    total: 0,
    
    init: function() {
        this.loadFromServer();
        this.calculateTotal();
        this.updateCartDisplay();
        this.setupEventListeners();
    },

    normalizeProductId: function(id) {
        return parseInt(id);
    },

    addItem: function(product) {
        const productId = this.normalizeProductId(product.id);
        const existingItem = this.items.find(item => item.id === productId);
        const availableStock = parseInt(product.stock) || 0;

        if (availableStock <= 0) {
            alert('Este producto está agotado');
            return;
        }

        if (existingItem) {
            if (existingItem.quantity >= availableStock) {
                alert(`No hay suficiente stock disponible. Solo quedan ${availableStock} unidades.`);
                return;
            }
            existingItem.quantity += 1;
        } else {
            this.items.push({
                id: productId,
                name: product.name,
                price: parseFloat(product.price),
                image: product.image,
                quantity: 1,
                stock: availableStock
            });
        }
        
        this.updateCart();
        this.showToast(product);
    },

    removeItem: function(id) {
        const normalizedId = this.normalizeProductId(id);
        const itemElement = document.querySelector(`.cart-item[data-id="${normalizedId}"]`);
        
        if (itemElement) {
            itemElement.style.transition = 'all 0.5s ease';
            itemElement.style.transform = 'translateX(-100%)';
            itemElement.style.opacity = '0';
            itemElement.style.backgroundColor = 'rgba(239, 68, 68, 0.2)';
            
            setTimeout(() => {
                this.items = this.items.filter(item => item.id !== normalizedId);
                this.updateCart();
            }, 500);
        } else {
            this.items = this.items.filter(item => item.id !== normalizedId);
            this.updateCart();
        }
    },

    updateCart: function() {
        this.calculateTotal();
        this.updateCartDisplay();
        this.saveToLocalStorage();
        this.syncWithServer();
    },

    calculateTotal: function() {
        this.total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },

    updateCartDisplay: function() {
        const cartItemsElement = document.getElementById('cartItems');
        const cartCountElement = document.getElementById('cartCount');
        const cartTotalElement = document.getElementById('cartTotal');
        const cartFormElement = document.getElementById('cartFormData');
        const checkoutBtn = document.getElementById('proceedToCheckout');

        if (cartFormElement) {
            cartFormElement.value = JSON.stringify({
                items: this.items,
                total: this.total
            });
        }

        if (cartTotalElement) {
            cartTotalElement.textContent = `L. ${this.total.toFixed(2)}`;
        }
        
        if (cartCountElement) {
            const itemCount = this.items.reduce((sum, item) => sum + item.quantity, 0);
            cartCountElement.textContent = itemCount;
            cartCountElement.style.display = itemCount > 0 ? 'block' : 'none';
        }
        
        if (checkoutBtn) {
            if (this.items.length === 0) {
                checkoutBtn.disabled = true;
                checkoutBtn.classList.add('btn-disabled');
                checkoutBtn.innerHTML = '<i class="fas fa-ban me-2"></i> Carrito vacío';
            } else {
                checkoutBtn.disabled = false;
                checkoutBtn.classList.remove('btn-disabled');
                checkoutBtn.innerHTML = '<i class="fas fa-credit-card me-2"></i> Proceder al Pago';
            }
        }
        
        if (cartItemsElement) {
            if (this.items.length === 0) {
                cartItemsElement.innerHTML = `
                    <div class="empty-cart-message text-center py-5">
                        <i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
                        <h5 class="text-muted mb-3">Tu carrito está vacío</h5>
                        <p class="text-muted small">Agrega productos para continuar</p>
                    </div>`;
            } else {
                cartItemsElement.innerHTML = this.items.map(item => `
                    <div class="cart-item mb-3 pb-3 border-bottom" data-id="${item.id}">
                        <div class="d-flex align-items-center">
                            <img src="${item.image}" alt="${item.name}" class="rounded me-3" style="width: 60px; height: 60px; object-fit: contain;">
                            <div class="flex-grow-1">
                                <h6 class="mb-1">${item.name}</h6>
                                <p class="mb-1 text-muted small">L. ${item.price.toFixed(2)} c/u</p>
                                <div class="d-flex align-items-center">
                                    <button class="btn btn-sm btn-outline-secondary decrement" data-id="${item.id}">
                                        <i class="fas fa-minus"></i>
                                    </button>
                                    <span class="mx-2">${item.quantity}</span>
                                    <button class="btn btn-sm btn-outline-secondary increment" data-id="${item.id}">
                                        <i class="fas fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                            <button class="btn btn-sm btn-outline-danger ms-2 remove" data-id="${item.id}">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                `).join('');
            }
        }
    },

    saveToLocalStorage: function() {
        localStorage.setItem('dekkoCart', JSON.stringify(this.items));
    },

    loadFromLocalStorage: function() {
        const savedCart = localStorage.getItem('dekkoCart');
        if (savedCart) {
            try {
                this.items = JSON.parse(savedCart).map(item => ({
                    ...item,
                    price: parseFloat(item.price),
                    quantity: parseInt(item.quantity)
                }));
            } catch (error) {
                console.error('Error al parsear carrito:', error);
                this.items = [];
            }
        }
    },

loadFromServer: function() {
    if (!this.userIsAuthenticated()) {
        console.log('Usuario no autenticado, cargando de localStorage');
        this.loadFromLocalStorage();
        this.calculateTotal(); // Añade esto
        this.updateCartDisplay();
        return;
    }
    
    console.log('Cargando carrito del servidor...');
    fetch('/productos/api/carrito/obtener/')
        .then(response => {
            console.log('Respuesta recibida:', response.status);
            if (!response.ok) throw new Error('Error al obtener carrito');
            return response.json();
        })
        .then(data => {
            console.log('Datos recibidos:', data);
            if (data.status === 'success') {
                this.items = data.items;
                this.saveToLocalStorage();
                this.calculateTotal(); // Asegúrate de calcular después de cargar
                this.updateCartDisplay();
            }
        })
        .catch(error => {
            console.error('Error al cargar carrito:', error);
            this.loadFromLocalStorage();
            this.calculateTotal(); // También aquí por si falla
            this.updateCartDisplay();
        });
},

    syncWithServer: function() {
        if (!this.userIsAuthenticated()) {
            console.log('Usuario no autenticado, no se sincroniza con servidor');
            return;
        }
        
        const url = '/productos/api/carrito/actualizar/';
        const items = this.items.map(item => ({
            producto_id: item.id,
            cantidad: item.quantity
        }));
        
        console.log('Sincronizando con servidor:', { items: items });
        
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': this.getCSRFToken()
            },
            body: JSON.stringify({ items: items })
        })
        .then(response => {
            console.log('Respuesta del servidor:', response.status);
            if (!response.ok) throw new Error('Error en la respuesta del servidor');
            return response.json();
        })
        .then(data => {
            console.log('Carrito sincronizado:', data);
        })
        .catch(error => {
            console.error('Error al sincronizar carrito:', error);
        });
    },

    userIsAuthenticated: function() {
        const token = this.getCSRFToken();
        console.log('CSRF Token:', token ? 'Presente' : 'Ausente');
        return token !== null;
    },

    getCSRFToken: function() {
        const cookieValue = document.cookie.match('(^|;)\\s*csrftoken\\s*=\\s*([^;]+)');
        return cookieValue ? cookieValue.pop() : '';
    },

    showToast: function(product) {
        const toast = document.getElementById('cartToast');
        if (toast) {
            document.getElementById('toastImg').src = product.image;
            document.getElementById('toastTitle').textContent = product.name;
            
            const viewCartLink = document.getElementById('viewCart');
            if (viewCartLink) {
                viewCartLink.onclick = (e) => {
                    e.preventDefault();
                    this.openCart();
                };
            }
            
            toast.classList.add('active');
            
            setTimeout(() => {
                toast.classList.remove('active');
            }, 4000);
        }
    },

    openCart: function() {
        document.getElementById('cartOverlay').style.display = 'block';
        document.getElementById('cartSidebar').style.transform = 'translateX(0)';
        document.body.style.overflow = 'hidden';
    },

    closeCart: function() {
        document.getElementById('cartOverlay').style.display = 'none';
        document.getElementById('cartSidebar').style.transform = 'translateX(100%)';
        document.body.style.overflow = 'auto';
    },

    setupEventListeners: function() {
        document.getElementById('cartToggle')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.openCart();
        });
        
        document.getElementById('closeCart')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.closeCart();
        });
        
        document.getElementById('cartOverlay')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.closeCart();
        });
        
        document.getElementById('proceedToCheckout')?.addEventListener('click', (e) => {
            e.preventDefault();
            if (this.items.length === 0) {
                alert('Tu carrito está vacío');
                return;
            }
            
            document.getElementById('cartFormData').value = JSON.stringify(this.items);
            document.getElementById('cartForm').submit();
        });
        
        document.getElementById('closeToast')?.addEventListener('click', () => {
            const toast = document.getElementById('cartToast');
            if (toast) toast.classList.remove('active');
        });
        
        document.addEventListener('click', (e) => {
            if (e.target.closest('.remove') || e.target.closest('.cart-item-remove')) {
                this.removeItem(e.target.closest('[data-id]').getAttribute('data-id'));
            } 
            else if (e.target.closest('.increment') || e.target.closest('.quantity-btn.increment')) {
                const id = e.target.closest('[data-id]').getAttribute('data-id');
                const item = this.items.find(item => item.id === parseInt(id));
                if (item) {
                    if (item.quantity >= item.stock) {
                        alert('No hay suficiente stock disponible');
                        return;
                    }
                    item.quantity += 1;
                    this.updateCart();
                }
            }
            else if (e.target.closest('.decrement') || e.target.closest('.quantity-btn.decrement')) {
                const id = e.target.closest('[data-id]').getAttribute('data-id');
                const item = this.items.find(item => item.id === parseInt(id));
                if (item) {
                    item.quantity -= 1;
                    if (item.quantity <= 0) this.removeItem(id);
                    else this.updateCart();
                }
            }
            else if (e.target.closest('.btn-add-to-cart')) {
                const btn = e.target.closest('.btn-add-to-cart');
                this.addItem({
                    id: btn.getAttribute('data-id'),
                    name: btn.getAttribute('data-name'),
                    price: btn.getAttribute('data-price'),
                    image: btn.getAttribute('data-image'),
                    stock: btn.getAttribute('data-stock')
                });
            }
        });
    }
};
document.addEventListener('DOMContentLoaded', function() {
    cart.init();
});

const carte = {
    items: [],
    total: 0,
    
    init: function() {
        this.loadFromServer();
        this.calculateTotal();
        this.updateCartDisplay();
        this.setupEventListeners();
    },

    normalizeProductId: function(id) {
        return parseInt(id);
    },

    addItem: function(product) {
        const productId = this.normalizeProductId(product.id);
        const existingItem = this.items.find(item => item.id === productId);
        const availableStock = parseInt(product.stock) || 0;

        if (availableStock <= 0) {
            alert('Este producto está agotado');
            return;
        }

        if (existingItem) {
            if (existingItem.quantity >= availableStock) {
                alert(`No hay suficiente stock disponible. Solo quedan ${availableStock} unidades.`);
                return;
            }
            existingItem.quantity += 1;
        } else {
            this.items.push({
                id: productId,
                name: product.name,
                price: parseFloat(product.price),
                image: product.image,
                quantity: 1,
                stock: availableStock
            });
        }
        
        this.updateCart();
        this.showToast(product);
    },

    removeItem: function(id) {
        const normalizedId = this.normalizeProductId(id);
        const itemElement = document.querySelector(`.cart-item[data-id="${normalizedId}"]`);
        
        if (itemElement) {
            itemElement.style.transition = 'all 0.5s ease';
            itemElement.style.transform = 'translateX(-100%)';
            itemElement.style.opacity = '0';
            itemElement.style.backgroundColor = 'rgba(239, 68, 68, 0.2)';
            
            setTimeout(() => {
                this.items = this.items.filter(item => item.id !== normalizedId);
                this.updateCart();
            }, 500);
        } else {
            this.items = this.items.filter(item => item.id !== normalizedId);
            this.updateCart();
        }
    },

    updateCart: function() {
        this.calculateTotal();
        this.updateCartDisplay();
        this.saveToLocalStorage();
        this.syncWithServer();
    },

    calculateTotal: function() {
        this.total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },

    updateCartDisplay: function() {
        const cartItemsElement = document.getElementById('cartItems');
        const cartCountElement = document.getElementById('cartCount');
        const cartTotalElement = document.getElementById('cartTotal');
        const cartFormElement = document.getElementById('cartFormData');
        const checkoutBtn = document.getElementById('proceedToCheckout');

        if (cartFormElement) {
            cartFormElement.value = JSON.stringify({
                items: this.items,
                total: this.total
            });
        }

        if (cartTotalElement) {
            cartTotalElement.textContent = `L. ${this.total.toFixed(2)}`;
        }
        
        if (cartCountElement) {
            const itemCount = this.items.reduce((sum, item) => sum + item.quantity, 0);
            cartCountElement.textContent = itemCount;
            cartCountElement.style.display = itemCount > 0 ? 'block' : 'none';
        }
        
        if (checkoutBtn) {
            if (this.items.length === 0) {
                checkoutBtn.disabled = true;
                checkoutBtn.classList.add('btn-disabled');
                checkoutBtn.innerHTML = '<i class="fas fa-ban me-2"></i> Carrito vacío';
            } else {
                checkoutBtn.disabled = false;
                checkoutBtn.classList.remove('btn-disabled');
                checkoutBtn.innerHTML = '<i class="fas fa-credit-card me-2"></i> Proceder al Pago';
            }
        }
        
        if (cartItemsElement) {
            if (this.items.length === 0) {
                cartItemsElement.innerHTML = `
                    <div class="empty-cart-message text-center py-5">
                        <i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
                        <h5 class="text-muted mb-3">Tu carrito está vacío</h5>
                        <p class="text-muted small">Agrega productos para continuar</p>
                    </div>`;
            } else {
                cartItemsElement.innerHTML = this.items.map(item => `
                    <div class="cart-item mb-3 pb-3 border-bottom" data-id="${item.id}">
                        <div class="d-flex align-items-center">
                            <img src="${item.image}" alt="${item.name}" class="rounded me-3" style="width: 60px; height: 60px; object-fit: contain;">
                            <div class="flex-grow-1">
                                <h6 class="mb-1">${item.name}</h6>
                                <p class="mb-1 text-muted small">L. ${item.price.toFixed(2)} c/u</p>
                                <div class="d-flex align-items-center">
                                    <button class="btn btn-sm btn-outline-secondary decrement" data-id="${item.id}">
                                        <i class="fas fa-minus"></i>
                                    </button>
                                    <span class="mx-2">${item.quantity}</span>
                                    <button class="btn btn-sm btn-outline-secondary increment" data-id="${item.id}">
                                        <i class="fas fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                            <button class="btn btn-sm btn-outline-danger ms-2 remove" data-id="${item.id}">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                `).join('');
            }
        }
    },

    saveToLocalStorage: function() {
        localStorage.setItem('dekkoCart', JSON.stringify(this.items));
    },

    loadFromLocalStorage: function() {
        const savedCart = localStorage.getItem('dekkoCart');
        if (savedCart) {
            try {
                this.items = JSON.parse(savedCart).map(item => ({
                    ...item,
                    price: parseFloat(item.price),
                    quantity: parseInt(item.quantity)
                }));
            } catch (error) {
                console.error('Error al parsear carrito:', error);
                this.items = [];
            }
        }
    },

loadFromServer: function() {
    if (!this.userIsAuthenticated()) {
        console.log('Usuario no autenticado, cargando de localStorage');
        this.loadFromLocalStorage();
        this.calculateTotal(); // Añade esto
        this.updateCartDisplay();
        return;
    }
    
    console.log('Cargando carrito del servidor...');
    fetch('/productos/api/carrito/obtener/')
        .then(response => {
            console.log('Respuesta recibida:', response.status);
            if (!response.ok) throw new Error('Error al obtener carrito');
            return response.json();
        })
        .then(data => {
            console.log('Datos recibidos:', data);
            if (data.status === 'success') {
                this.items = data.items;
                this.saveToLocalStorage();
                this.calculateTotal(); // Asegúrate de calcular después de cargar
                this.updateCartDisplay();
            }
        })
        .catch(error => {
            console.error('Error al cargar carrito:', error);
            this.loadFromLocalStorage();
            this.calculateTotal(); // También aquí por si falla
            this.updateCartDisplay();
        });
},

    syncWithServer: function() {
        if (!this.userIsAuthenticated()) {
            console.log('Usuario no autenticado, no se sincroniza con servidor');
            return;
        }
        
        const url = '/productos/api/carrito/actualizar/';
        const items = this.items.map(item => ({
            producto_id: item.id,
            cantidad: item.quantity
        }));
        
        console.log('Sincronizando con servidor:', { items: items });
        
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': this.getCSRFToken()
            },
            body: JSON.stringify({ items: items })
        })
        .then(response => {
            console.log('Respuesta del servidor:', response.status);
            if (!response.ok) throw new Error('Error en la respuesta del servidor');
            return response.json();
        })
        .then(data => {
            console.log('Carrito sincronizado:', data);
        })
        .catch(error => {
            console.error('Error al sincronizar carrito:', error);
        });
    },

    userIsAuthenticated: function() {
        const token = this.getCSRFToken();
        console.log('CSRF Token:', token ? 'Presente' : 'Ausente');
        return token !== null;
    },

    getCSRFToken: function() {
        const cookieValue = document.cookie.match('(^|;)\\s*csrftoken\\s*=\\s*([^;]+)');
        return cookieValue ? cookieValue.pop() : '';
    },

    showToast: function(product) {
        const toast = document.getElementById('cartToast');
        if (toast) {
            document.getElementById('toastImg').src = product.image;
            document.getElementById('toastTitle').textContent = product.name;
            
            const viewCartLink = document.getElementById('viewCart');
            if (viewCartLink) {
                viewCartLink.onclick = (e) => {
                    e.preventDefault();
                    this.openCart();
                };
            }
            
            toast.classList.add('active');
            
            setTimeout(() => {
                toast.classList.remove('active');
            }, 4000);
        }
    },

    openCart: function() {
        document.getElementById('cartOverlay').style.display = 'block';
        document.getElementById('cartSidebar').style.transform = 'translateX(0)';
        document.body.style.overflow = 'hidden';
    },

    closeCart: function() {
        document.getElementById('cartOverlay').style.display = 'none';
        document.getElementById('cartSidebar').style.transform = 'translateX(100%)';
        document.body.style.overflow = 'auto';
    },

    setupEventListeners: function() {
        document.getElementById('cartToggle')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.openCart();
        });
        
        document.getElementById('closeCart')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.closeCart();
        });
        
        document.getElementById('cartOverlay')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.closeCart();
        });
        
        document.getElementById('proceedToCheckout')?.addEventListener('click', (e) => {
            e.preventDefault();
            if (this.items.length === 0) {
                alert('Tu carrito está vacío');
                return;
            }
            
            document.getElementById('cartFormData').value = JSON.stringify(this.items);
            document.getElementById('cartForm').submit();
        });
        
        document.getElementById('closeToast')?.addEventListener('click', () => {
            const toast = document.getElementById('cartToast');
            if (toast) toast.classList.remove('active');
        });
        
        document.addEventListener('click', (e) => {
            if (e.target.closest('.remove') || e.target.closest('.cart-item-remove')) {
                this.removeItem(e.target.closest('[data-id]').getAttribute('data-id'));
            } 
            else if (e.target.closest('.increment') || e.target.closest('.quantity-btn.increment')) {
                const id = e.target.closest('[data-id]').getAttribute('data-id');
                const item = this.items.find(item => item.id === parseInt(id));
                if (item) {
                    if (item.quantity >= item.stock) {
                        alert('No hay suficiente stock disponible');
                        return;
                    }
                    item.quantity += 1;
                    this.updateCart();
                }
            }
            else if (e.target.closest('.decrement') || e.target.closest('.quantity-btn.decrement')) {
                const id = e.target.closest('[data-id]').getAttribute('data-id');
                const item = this.items.find(item => item.id === parseInt(id));
                if (item) {
                    item.quantity -= 1;
                    if (item.quantity <= 0) this.removeItem(id);
                    else this.updateCart();
                }
            }
            else if (e.target.closest('.btn-add-to-cart')) {
                const btn = e.target.closest('.btn-add-to-cart');
                this.addItem({
                    id: btn.getAttribute('data-id'),
                    name: btn.getAttribute('data-name'),
                    price: btn.getAttribute('data-price'),
                    image: btn.getAttribute('data-image'),
                    stock: btn.getAttribute('data-stock')
                });
            }
        });
    }
};