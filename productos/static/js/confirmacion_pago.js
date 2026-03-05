document.addEventListener('DOMContentLoaded', function() {
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

    const vaciarCarritoUrl = '/productos/api/carrito/vaciar/';
    const principalUrl = document.body.getAttribute('data-principal-url') || '/';

    fetch(vaciarCarritoUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .then(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    })
    .catch(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    });

    let seconds = 30;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(function() {
      seconds--;
      if (countdownElement) countdownElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = principalUrl;
      }
    }, 1000);

    const printButton = document.querySelector('.btn-print');
    if (printButton) {
        printButton.addEventListener('click', function() {
            document.title = "Recibo de Pago - Dekko Store";
            window.print();
        });
    }

    window.onbeforeprint = function() { document.title = "Recibo de Pago - Dekko Store"; };
    window.onafterprint  = function() { document.title = "Recibo de Pago - Dekko Store"; };
});

document.addEventListener('DOMContentLoaded', function() {
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

    const vaciarCarritoUrl = '/productos/api/carrito/vaciar/';
    const principalUrl = document.body.getAttribute('data-principal-url') || '/';

    fetch(vaciarCarritoUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .then(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    })
    .catch(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    });

    let seconds = 30;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(function() {
      seconds--;
      if (countdownElement) countdownElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = principalUrl;
      }
    }, 1000);

    const printButton = document.querySelector('.btn-print');
    if (printButton) {
        printButton.addEventListener('click', function() {
            document.title = "Recibo de Pago - Dekko Store";
            window.print();
        });
    }

    window.onbeforeprint = function() { document.title = "Recibo de Pago - Dekko Store"; };
    window.onafterprint  = function() { document.title = "Recibo de Pago - Dekko Store"; };
});
document.addEventListener('DOMContentLoaded', function() {
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

    const vaciarCarritoUrl = '/productos/api/carrito/vaciar/';
    const principalUrl = document.body.getAttribute('data-principal-url') || '/';

    fetch(vaciarCarritoUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .then(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    })
    .catch(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    });

    let seconds = 30;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(function() {
      seconds--;
      if (countdownElement) countdownElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = principalUrl;
      }
    }, 1000);

    const printButton = document.querySelector('.btn-print');
    if (printButton) {
        printButton.addEventListener('click', function() {
            document.title = "Recibo de Pago - Dekko Store";
            window.print();
        });
    }

    window.onbeforeprint = function() { document.title = "Recibo de Pago - Dekko Store"; };
    window.onafterprint  = function() { document.title = "Recibo de Pago - Dekko Store"; };
});

document.addEventListener('DOMContentLoaded', function() {
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

    const vaciarCarritoUrl = '/productos/api/carrito/vaciar/';
    const principalUrl = document.body.getAttribute('data-principal-url') || '/';

    fetch(vaciarCarritoUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .then(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    })
    .catch(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    });

    let seconds = 30;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(function() {
      seconds--;
      if (countdownElement) countdownElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = principalUrl;
      }
    }, 1000);

    const printButton = document.querySelector('.btn-print');
    if (printButton) {
        printButton.addEventListener('click', function() {
            document.title = "Recibo de Pago - Dekko Store";
            window.print();
        });
    }

    window.onbeforeprint = function() { document.title = "Recibo de Pago - Dekko Store"; };
    window.onafterprint  = function() { document.title = "Recibo de Pago - Dekko Store"; };
});
document.addEventListener('DOMContentLoaded', function() {
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

    const vaciarCarritoUrl = '/productos/api/carrito/vaciar/';
    const principalUrl = document.body.getAttribute('data-principal-url') || '/';

    fetch(vaciarCarritoUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .then(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    })
    .catch(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    });

    let seconds = 30;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(function() {
      seconds--;
      if (countdownElement) countdownElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = principalUrl;
      }
    }, 1000);

    const printButton = document.querySelector('.btn-print');
    if (printButton) {
        printButton.addEventListener('click', function() {
            document.title = "Recibo de Pago - Dekko Store";
            window.print();
        });
    }

    window.onbeforeprint = function() { document.title = "Recibo de Pago - Dekko Store"; };
    window.onafterprint  = function() { document.title = "Recibo de Pago - Dekko Store"; };
});

document.addEventListener('DOMContentLoaded', function() {
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

    const vaciarCarritoUrl = '/productos/api/carrito/vaciar/';
    const principalUrl = document.body.getAttribute('data-principal-url') || '/';

    fetch(vaciarCarritoUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .then(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    })
    .catch(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    });

    let seconds = 30;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(function() {
      seconds--;
      if (countdownElement) countdownElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = principalUrl;
      }
    }, 1000);

    const printButton = document.querySelector('.btn-print');
    if (printButton) {
        printButton.addEventListener('click', function() {
            document.title = "Recibo de Pago - Dekko Store";
            window.print();
        });
    }

    window.onbeforeprint = function() { document.title = "Recibo de Pago - Dekko Store"; };
    window.onafterprint  = function() { document.title = "Recibo de Pago - Dekko Store"; };
});
document.addEventListener('DOMContentLoaded', function() {
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

    const vaciarCarritoUrl = '/productos/api/carrito/vaciar/';
    const principalUrl = document.body.getAttribute('data-principal-url') || '/';

    fetch(vaciarCarritoUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .then(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    })
    .catch(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    });

    let seconds = 30;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(function() {
      seconds--;
      if (countdownElement) countdownElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = principalUrl;
      }
    }, 1000);

    const printButton = document.querySelector('.btn-print');
    if (printButton) {
        printButton.addEventListener('click', function() {
            document.title = "Recibo de Pago - Dekko Store";
            window.print();
        });
    }

    window.onbeforeprint = function() { document.title = "Recibo de Pago - Dekko Store"; };
    window.onafterprint  = function() { document.title = "Recibo de Pago - Dekko Store"; };
});

document.addEventListener('DOMContentLoaded', function() {
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

    const vaciarCarritoUrl = '/productos/api/carrito/vaciar/';
    const principalUrl = document.body.getAttribute('data-principal-url') || '/';

    fetch(vaciarCarritoUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .then(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    })
    .catch(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    });

    let seconds = 30;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(function() {
      seconds--;
      if (countdownElement) countdownElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = principalUrl;
      }
    }, 1000);

    const printButton = document.querySelector('.btn-print');
    if (printButton) {
        printButton.addEventListener('click', function() {
            document.title = "Recibo de Pago - Dekko Store";
            window.print();
        });
    }

    window.onbeforeprint = function() { document.title = "Recibo de Pago - Dekko Store"; };
    window.onafterprint  = function() { document.title = "Recibo de Pago - Dekko Store"; };
});
document.addEventListener('DOMContentLoaded', function() {
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

    const vaciarCarritoUrl = '/productos/api/carrito/vaciar/';
    const principalUrl = document.body.getAttribute('data-principal-url') || '/';

    fetch(vaciarCarritoUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .then(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    })
    .catch(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    });

    let seconds = 30;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(function() {
      seconds--;
      if (countdownElement) countdownElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = principalUrl;
      }
    }, 1000);

    const printButton = document.querySelector('.btn-print');
    if (printButton) {
        printButton.addEventListener('click', function() {
            document.title = "Recibo de Pago - Dekko Store";
            window.print();
        });
    }

    window.onbeforeprint = function() { document.title = "Recibo de Pago - Dekko Store"; };
    window.onafterprint  = function() { document.title = "Recibo de Pago - Dekko Store"; };
});

document.addEventListener('DOMContentLoaded', function() {
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

    const vaciarCarritoUrl = '/productos/api/carrito/vaciar/';
    const principalUrl = document.body.getAttribute('data-principal-url') || '/';

    fetch(vaciarCarritoUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .then(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    })
    .catch(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    });

    let seconds = 30;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(function() {
      seconds--;
      if (countdownElement) countdownElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = principalUrl;
      }
    }, 1000);

    const printButton = document.querySelector('.btn-print');
    if (printButton) {
        printButton.addEventListener('click', function() {
            document.title = "Recibo de Pago - Dekko Store";
            window.print();
        });
    }

    window.onbeforeprint = function() { document.title = "Recibo de Pago - Dekko Store"; };
    window.onafterprint  = function() { document.title = "Recibo de Pago - Dekko Store"; };
});
document.addEventListener('DOMContentLoaded', function() {
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

    const vaciarCarritoUrl = '/productos/api/carrito/vaciar/';
    const principalUrl = document.body.getAttribute('data-principal-url') || '/';

    fetch(vaciarCarritoUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .then(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    })
    .catch(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    });

    let seconds = 30;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(function() {
      seconds--;
      if (countdownElement) countdownElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = principalUrl;
      }
    }, 1000);

    const printButton = document.querySelector('.btn-print');
    if (printButton) {
        printButton.addEventListener('click', function() {
            document.title = "Recibo de Pago - Dekko Store";
            window.print();
        });
    }

    window.onbeforeprint = function() { document.title = "Recibo de Pago - Dekko Store"; };
    window.onafterprint  = function() { document.title = "Recibo de Pago - Dekko Store"; };
});

document.addEventListener('DOMContentLoaded', function() {
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

    const vaciarCarritoUrl = '/productos/api/carrito/vaciar/';
    const principalUrl = document.body.getAttribute('data-principal-url') || '/';

    fetch(vaciarCarritoUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .then(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    })
    .catch(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    });

    let seconds = 30;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(function() {
      seconds--;
      if (countdownElement) countdownElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = principalUrl;
      }
    }, 1000);

    const printButton = document.querySelector('.btn-print');
    if (printButton) {
        printButton.addEventListener('click', function() {
            document.title = "Recibo de Pago - Dekko Store";
            window.print();
        });
    }

    window.onbeforeprint = function() { document.title = "Recibo de Pago - Dekko Store"; };
    window.onafterprint  = function() { document.title = "Recibo de Pago - Dekko Store"; };
});
document.addEventListener('DOMContentLoaded', function() {
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

    const vaciarCarritoUrl = '/productos/api/carrito/vaciar/';
    const principalUrl = document.body.getAttribute('data-principal-url') || '/';

    fetch(vaciarCarritoUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .then(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    })
    .catch(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    });

    let seconds = 30;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(function() {
      seconds--;
      if (countdownElement) countdownElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = principalUrl;
      }
    }, 1000);

    const printButton = document.querySelector('.btn-print');
    if (printButton) {
        printButton.addEventListener('click', function() {
            document.title = "Recibo de Pago - Dekko Store";
            window.print();
        });
    }

    window.onbeforeprint = function() { document.title = "Recibo de Pago - Dekko Store"; };
    window.onafterprint  = function() { document.title = "Recibo de Pago - Dekko Store"; };
});

document.addEventListener('DOMContentLoaded', function() {
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

    const vaciarCarritoUrl = '/productos/api/carrito/vaciar/';
    const principalUrl = document.body.getAttribute('data-principal-url') || '/';

    fetch(vaciarCarritoUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .then(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    })
    .catch(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    });

    let seconds = 30;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(function() {
      seconds--;
      if (countdownElement) countdownElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = principalUrl;
      }
    }, 1000);

    const printButton = document.querySelector('.btn-print');
    if (printButton) {
        printButton.addEventListener('click', function() {
            document.title = "Recibo de Pago - Dekko Store";
            window.print();
        });
    }

    window.onbeforeprint = function() { document.title = "Recibo de Pago - Dekko Store"; };
    window.onafterprint  = function() { document.title = "Recibo de Pago - Dekko Store"; };
});
document.addEventListener('DOMContentLoaded', function() {
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

    const vaciarCarritoUrl = '/productos/api/carrito/vaciar/';
    const principalUrl = document.body.getAttribute('data-principal-url') || '/';

    fetch(vaciarCarritoUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .then(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    })
    .catch(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    });

    let seconds = 30;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(function() {
      seconds--;
      if (countdownElement) countdownElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = principalUrl;
      }
    }, 1000);

    const printButton = document.querySelector('.btn-print');
    if (printButton) {
        printButton.addEventListener('click', function() {
            document.title = "Recibo de Pago - Dekko Store";
            window.print();
        });
    }

    window.onbeforeprint = function() { document.title = "Recibo de Pago - Dekko Store"; };
    window.onafterprint  = function() { document.title = "Recibo de Pago - Dekko Store"; };
});

document.addEventListener('DOMContentLoaded', function() {
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

    const vaciarCarritoUrl = '/productos/api/carrito/vaciar/';
    const principalUrl = document.body.getAttribute('data-principal-url') || '/';

    fetch(vaciarCarritoUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .then(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    })
    .catch(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    });

    let seconds = 30;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(function() {
      seconds--;
      if (countdownElement) countdownElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = principalUrl;
      }
    }, 1000);

    const printButton = document.querySelector('.btn-print');
    if (printButton) {
        printButton.addEventListener('click', function() {
            document.title = "Recibo de Pago - Dekko Store";
            window.print();
        });
    }

    window.onbeforeprint = function() { document.title = "Recibo de Pago - Dekko Store"; };
    window.onafterprint  = function() { document.title = "Recibo de Pago - Dekko Store"; };
});
document.addEventListener('DOMContentLoaded', function() {
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

    const vaciarCarritoUrl = '/productos/api/carrito/vaciar/';
    const principalUrl = document.body.getAttribute('data-principal-url') || '/';

    fetch(vaciarCarritoUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .then(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    })
    .catch(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    });

    let seconds = 30;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(function() {
      seconds--;
      if (countdownElement) countdownElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = principalUrl;
      }
    }, 1000);

    const printButton = document.querySelector('.btn-print');
    if (printButton) {
        printButton.addEventListener('click', function() {
            document.title = "Recibo de Pago - Dekko Store";
            window.print();
        });
    }

    window.onbeforeprint = function() { document.title = "Recibo de Pago - Dekko Store"; };
    window.onafterprint  = function() { document.title = "Recibo de Pago - Dekko Store"; };
});

document.addEventListener('DOMContentLoaded', function() {
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

    const vaciarCarritoUrl = '/productos/api/carrito/vaciar/';
    const principalUrl = document.body.getAttribute('data-principal-url') || '/';

    fetch(vaciarCarritoUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .then(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    })
    .catch(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    });

    let seconds = 30;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(function() {
      seconds--;
      if (countdownElement) countdownElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = principalUrl;
      }
    }, 1000);

    const printButton = document.querySelector('.btn-print');
    if (printButton) {
        printButton.addEventListener('click', function() {
            document.title = "Recibo de Pago - Dekko Store";
            window.print();
        });
    }

    window.onbeforeprint = function() { document.title = "Recibo de Pago - Dekko Store"; };
    window.onafterprint  = function() { document.title = "Recibo de Pago - Dekko Store"; };
});
document.addEventListener('DOMContentLoaded', function() {
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

    const vaciarCarritoUrl = '/productos/api/carrito/vaciar/';
    const principalUrl = document.body.getAttribute('data-principal-url') || '/';

    fetch(vaciarCarritoUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .then(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    })
    .catch(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    });

    let seconds = 30;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(function() {
      seconds--;
      if (countdownElement) countdownElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = principalUrl;
      }
    }, 1000);

    const printButton = document.querySelector('.btn-print');
    if (printButton) {
        printButton.addEventListener('click', function() {
            document.title = "Recibo de Pago - Dekko Store";
            window.print();
        });
    }

    window.onbeforeprint = function() { document.title = "Recibo de Pago - Dekko Store"; };
    window.onafterprint  = function() { document.title = "Recibo de Pago - Dekko Store"; };
});

document.addEventListener('DOMContentLoaded', function() {
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

    const vaciarCarritoUrl = '/productos/api/carrito/vaciar/';
    const principalUrl = document.body.getAttribute('data-principal-url') || '/';

    fetch(vaciarCarritoUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .then(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    })
    .catch(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    });

    let seconds = 30;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(function() {
      seconds--;
      if (countdownElement) countdownElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = principalUrl;
      }
    }, 1000);

    const printButton = document.querySelector('.btn-print');
    if (printButton) {
        printButton.addEventListener('click', function() {
            document.title = "Recibo de Pago - Dekko Store";
            window.print();
        });
    }

    window.onbeforeprint = function() { document.title = "Recibo de Pago - Dekko Store"; };
    window.onafterprint  = function() { document.title = "Recibo de Pago - Dekko Store"; };
});
document.addEventListener('DOMContentLoaded', function() {
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

    const vaciarCarritoUrl = '/productos/api/carrito/vaciar/';
    const principalUrl = document.body.getAttribute('data-principal-url') || '/';

    fetch(vaciarCarritoUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .then(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    })
    .catch(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    });

    let seconds = 30;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(function() {
      seconds--;
      if (countdownElement) countdownElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = principalUrl;
      }
    }, 1000);

    const printButton = document.querySelector('.btn-print');
    if (printButton) {
        printButton.addEventListener('click', function() {
            document.title = "Recibo de Pago - Dekko Store";
            window.print();
        });
    }

    window.onbeforeprint = function() { document.title = "Recibo de Pago - Dekko Store"; };
    window.onafterprint  = function() { document.title = "Recibo de Pago - Dekko Store"; };
});

document.addEventListener('DOMContentLoaded', function() {
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

    const vaciarCarritoUrl = '/productos/api/carrito/vaciar/';
    const principalUrl = document.body.getAttribute('data-principal-url') || '/';

    fetch(vaciarCarritoUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .then(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    })
    .catch(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    });

    let seconds = 30;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(function() {
      seconds--;
      if (countdownElement) countdownElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = principalUrl;
      }
    }, 1000);

    const printButton = document.querySelector('.btn-print');
    if (printButton) {
        printButton.addEventListener('click', function() {
            document.title = "Recibo de Pago - Dekko Store";
            window.print();
        });
    }

    window.onbeforeprint = function() { document.title = "Recibo de Pago - Dekko Store"; };
    window.onafterprint  = function() { document.title = "Recibo de Pago - Dekko Store"; };
});
document.addEventListener('DOMContentLoaded', function() {
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

    const vaciarCarritoUrl = '/productos/api/carrito/vaciar/';
    const principalUrl = document.body.getAttribute('data-principal-url') || '/';

    fetch(vaciarCarritoUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .then(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    })
    .catch(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    });

    let seconds = 30;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(function() {
      seconds--;
      if (countdownElement) countdownElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = principalUrl;
      }
    }, 1000);

    const printButton = document.querySelector('.btn-print');
    if (printButton) {
        printButton.addEventListener('click', function() {
            document.title = "Recibo de Pago - Dekko Store";
            window.print();
        });
    }

    window.onbeforeprint = function() { document.title = "Recibo de Pago - Dekko Store"; };
    window.onafterprint  = function() { document.title = "Recibo de Pago - Dekko Store"; };
});

document.addEventListener('DOMContentLoaded', function() {
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

    const vaciarCarritoUrl = '/productos/api/carrito/vaciar/';
    const principalUrl = document.body.getAttribute('data-principal-url') || '/';

    fetch(vaciarCarritoUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .then(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    })
    .catch(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    });

    let seconds = 30;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(function() {
      seconds--;
      if (countdownElement) countdownElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = principalUrl;
      }
    }, 1000);

    const printButton = document.querySelector('.btn-print');
    if (printButton) {
        printButton.addEventListener('click', function() {
            document.title = "Recibo de Pago - Dekko Store";
            window.print();
        });
    }

    window.onbeforeprint = function() { document.title = "Recibo de Pago - Dekko Store"; };
    window.onafterprint  = function() { document.title = "Recibo de Pago - Dekko Store"; };
});
document.addEventListener('DOMContentLoaded', function() {
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

    const vaciarCarritoUrl = '/productos/api/carrito/vaciar/';
    const principalUrl = document.body.getAttribute('data-principal-url') || '/';

    fetch(vaciarCarritoUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .then(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    })
    .catch(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    });

    let seconds = 30;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(function() {
      seconds--;
      if (countdownElement) countdownElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = principalUrl;
      }
    }, 1000);

    const printButton = document.querySelector('.btn-print');
    if (printButton) {
        printButton.addEventListener('click', function() {
            document.title = "Recibo de Pago - Dekko Store";
            window.print();
        });
    }

    window.onbeforeprint = function() { document.title = "Recibo de Pago - Dekko Store"; };
    window.onafterprint  = function() { document.title = "Recibo de Pago - Dekko Store"; };
});

document.addEventListener('DOMContentLoaded', function() {
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

    const vaciarCarritoUrl = '/productos/api/carrito/vaciar/';
    const principalUrl = document.body.getAttribute('data-principal-url') || '/';

    fetch(vaciarCarritoUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .then(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    })
    .catch(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    });

    let seconds = 30;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(function() {
      seconds--;
      if (countdownElement) countdownElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = principalUrl;
      }
    }, 1000);

    const printButton = document.querySelector('.btn-print');
    if (printButton) {
        printButton.addEventListener('click', function() {
            document.title = "Recibo de Pago - Dekko Store";
            window.print();
        });
    }

    window.onbeforeprint = function() { document.title = "Recibo de Pago - Dekko Store"; };
    window.onafterprint  = function() { document.title = "Recibo de Pago - Dekko Store"; };
});
document.addEventListener('DOMContentLoaded', function() {
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

    const vaciarCarritoUrl = '/productos/api/carrito/vaciar/';
    const principalUrl = document.body.getAttribute('data-principal-url') || '/';

    fetch(vaciarCarritoUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .then(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    })
    .catch(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    });

    let seconds = 30;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(function() {
      seconds--;
      if (countdownElement) countdownElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = principalUrl;
      }
    }, 1000);

    const printButton = document.querySelector('.btn-print');
    if (printButton) {
        printButton.addEventListener('click', function() {
            document.title = "Recibo de Pago - Dekko Store";
            window.print();
        });
    }

    window.onbeforeprint = function() { document.title = "Recibo de Pago - Dekko Store"; };
    window.onafterprint  = function() { document.title = "Recibo de Pago - Dekko Store"; };
});

document.addEventListener('DOMContentLoaded', function() {
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

    const vaciarCarritoUrl = '/productos/api/carrito/vaciar/';
    const principalUrl = document.body.getAttribute('data-principal-url') || '/';

    fetch(vaciarCarritoUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .then(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    })
    .catch(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    });

    let seconds = 30;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(function() {
      seconds--;
      if (countdownElement) countdownElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = principalUrl;
      }
    }, 1000);

    const printButton = document.querySelector('.btn-print');
    if (printButton) {
        printButton.addEventListener('click', function() {
            document.title = "Recibo de Pago - Dekko Store";
            window.print();
        });
    }

    window.onbeforeprint = function() { document.title = "Recibo de Pago - Dekko Store"; };
    window.onafterprint  = function() { document.title = "Recibo de Pago - Dekko Store"; };
});
document.addEventListener('DOMContentLoaded', function() {
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

    const vaciarCarritoUrl = '/productos/api/carrito/vaciar/';
    const principalUrl = document.body.getAttribute('data-principal-url') || '/';

    fetch(vaciarCarritoUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .then(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    })
    .catch(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    });

    let seconds = 30;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(function() {
      seconds--;
      if (countdownElement) countdownElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = principalUrl;
      }
    }, 1000);

    const printButton = document.querySelector('.btn-print');
    if (printButton) {
        printButton.addEventListener('click', function() {
            document.title = "Recibo de Pago - Dekko Store";
            window.print();
        });
    }

    window.onbeforeprint = function() { document.title = "Recibo de Pago - Dekko Store"; };
    window.onafterprint  = function() { document.title = "Recibo de Pago - Dekko Store"; };
});

document.addEventListener('DOMContentLoaded', function() {
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

    const vaciarCarritoUrl = '/productos/api/carrito/vaciar/';
    const principalUrl = document.body.getAttribute('data-principal-url') || '/';

    fetch(vaciarCarritoUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .then(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    })
    .catch(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    });

    let seconds = 30;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(function() {
      seconds--;
      if (countdownElement) countdownElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = principalUrl;
      }
    }, 1000);

    const printButton = document.querySelector('.btn-print');
    if (printButton) {
        printButton.addEventListener('click', function() {
            document.title = "Recibo de Pago - Dekko Store";
            window.print();
        });
    }

    window.onbeforeprint = function() { document.title = "Recibo de Pago - Dekko Store"; };
    window.onafterprint  = function() { document.title = "Recibo de Pago - Dekko Store"; };
});
document.addEventListener('DOMContentLoaded', function() {
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

    const vaciarCarritoUrl = '/productos/api/carrito/vaciar/';
    const principalUrl = document.body.getAttribute('data-principal-url') || '/';

    fetch(vaciarCarritoUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .then(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    })
    .catch(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    });

    let seconds = 30;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(function() {
      seconds--;
      if (countdownElement) countdownElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = principalUrl;
      }
    }, 1000);

    const printButton = document.querySelector('.btn-print');
    if (printButton) {
        printButton.addEventListener('click', function() {
            document.title = "Recibo de Pago - Dekko Store";
            window.print();
        });
    }

    window.onbeforeprint = function() { document.title = "Recibo de Pago - Dekko Store"; };
    window.onafterprint  = function() { document.title = "Recibo de Pago - Dekko Store"; };
});

document.addEventListener('DOMContentLoaded', function() {
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

    const vaciarCarritoUrl = '/productos/api/carrito/vaciar/';
    const principalUrl = document.body.getAttribute('data-principal-url') || '/';

    fetch(vaciarCarritoUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .then(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    })
    .catch(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    });

    let seconds = 30;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(function() {
      seconds--;
      if (countdownElement) countdownElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = principalUrl;
      }
    }, 1000);

    const printButton = document.querySelector('.btn-print');
    if (printButton) {
        printButton.addEventListener('click', function() {
            document.title = "Recibo de Pago - Dekko Store";
            window.print();
        });
    }

    window.onbeforeprint = function() { document.title = "Recibo de Pago - Dekko Store"; };
    window.onafterprint  = function() { document.title = "Recibo de Pago - Dekko Store"; };
});
document.addEventListener('DOMContentLoaded', function() {
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

    const vaciarCarritoUrl = '/productos/api/carrito/vaciar/';
    const principalUrl = document.body.getAttribute('data-principal-url') || '/';

    fetch(vaciarCarritoUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .then(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    })
    .catch(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    });

    let seconds = 30;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(function() {
      seconds--;
      if (countdownElement) countdownElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = principalUrl;
      }
    }, 1000);

    const printButton = document.querySelector('.btn-print');
    if (printButton) {
        printButton.addEventListener('click', function() {
            document.title = "Recibo de Pago - Dekko Store";
            window.print();
        });
    }

    window.onbeforeprint = function() { document.title = "Recibo de Pago - Dekko Store"; };
    window.onafterprint  = function() { document.title = "Recibo de Pago - Dekko Store"; };
});

document.addEventListener('DOMContentLoaded', function() {
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

    const vaciarCarritoUrl = '/productos/api/carrito/vaciar/';
    const principalUrl = document.body.getAttribute('data-principal-url') || '/';

    fetch(vaciarCarritoUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .then(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    })
    .catch(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    });

    let seconds = 30;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(function() {
      seconds--;
      if (countdownElement) countdownElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = principalUrl;
      }
    }, 1000);

    const printButton = document.querySelector('.btn-print');
    if (printButton) {
        printButton.addEventListener('click', function() {
            document.title = "Recibo de Pago - Dekko Store";
            window.print();
        });
    }

    window.onbeforeprint = function() { document.title = "Recibo de Pago - Dekko Store"; };
    window.onafterprint  = function() { document.title = "Recibo de Pago - Dekko Store"; };
});
document.addEventListener('DOMContentLoaded', function() {
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

    const vaciarCarritoUrl = '/productos/api/carrito/vaciar/';
    const principalUrl = document.body.getAttribute('data-principal-url') || '/';

    fetch(vaciarCarritoUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .then(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    })
    .catch(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    });

    let seconds = 30;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(function() {
      seconds--;
      if (countdownElement) countdownElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = principalUrl;
      }
    }, 1000);

    const printButton = document.querySelector('.btn-print');
    if (printButton) {
        printButton.addEventListener('click', function() {
            document.title = "Recibo de Pago - Dekko Store";
            window.print();
        });
    }

    window.onbeforeprint = function() { document.title = "Recibo de Pago - Dekko Store"; };
    window.onafterprint  = function() { document.title = "Recibo de Pago - Dekko Store"; };
});

document.addEventListener('DOMContentLoaded', function() {
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

    const vaciarCarritoUrl = '/productos/api/carrito/vaciar/';
    const principalUrl = document.body.getAttribute('data-principal-url') || '/';

    fetch(vaciarCarritoUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .then(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    })
    .catch(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    });

    let seconds = 30;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(function() {
      seconds--;
      if (countdownElement) countdownElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = principalUrl;
      }
    }, 1000);

    const printButton = document.querySelector('.btn-print');
    if (printButton) {
        printButton.addEventListener('click', function() {
            document.title = "Recibo de Pago - Dekko Store";
            window.print();
        });
    }

    window.onbeforeprint = function() { document.title = "Recibo de Pago - Dekko Store"; };
    window.onafterprint  = function() { document.title = "Recibo de Pago - Dekko Store"; };
});
document.addEventListener('DOMContentLoaded', function() {
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

    const vaciarCarritoUrl = '/productos/api/carrito/vaciar/';
    const principalUrl = document.body.getAttribute('data-principal-url') || '/';

    fetch(vaciarCarritoUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .then(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    })
    .catch(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    });

    let seconds = 30;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(function() {
      seconds--;
      if (countdownElement) countdownElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = principalUrl;
      }
    }, 1000);

    const printButton = document.querySelector('.btn-print');
    if (printButton) {
        printButton.addEventListener('click', function() {
            document.title = "Recibo de Pago - Dekko Store";
            window.print();
        });
    }

    window.onbeforeprint = function() { document.title = "Recibo de Pago - Dekko Store"; };
    window.onafterprint  = function() { document.title = "Recibo de Pago - Dekko Store"; };
});

document.addEventListener('DOMContentLoaded', function() {
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

    const vaciarCarritoUrl = '/productos/api/carrito/vaciar/';
    const principalUrl = document.body.getAttribute('data-principal-url') || '/';

    fetch(vaciarCarritoUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .then(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    })
    .catch(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    });

    let seconds = 30;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(function() {
      seconds--;
      if (countdownElement) countdownElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = principalUrl;
      }
    }, 1000);

    const printButton = document.querySelector('.btn-print');
    if (printButton) {
        printButton.addEventListener('click', function() {
            document.title = "Recibo de Pago - Dekko Store";
            window.print();
        });
    }

    window.onbeforeprint = function() { document.title = "Recibo de Pago - Dekko Store"; };
    window.onafterprint  = function() { document.title = "Recibo de Pago - Dekko Store"; };
});
document.addEventListener('DOMContentLoaded', function() {
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

    const vaciarCarritoUrl = '/productos/api/carrito/vaciar/';
    const principalUrl = document.body.getAttribute('data-principal-url') || '/';

    fetch(vaciarCarritoUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .then(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    })
    .catch(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    });

    let seconds = 30;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(function() {
      seconds--;
      if (countdownElement) countdownElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = principalUrl;
      }
    }, 1000);

    const printButton = document.querySelector('.btn-print');
    if (printButton) {
        printButton.addEventListener('click', function() {
            document.title = "Recibo de Pago - Dekko Store";
            window.print();
        });
    }

    window.onbeforeprint = function() { document.title = "Recibo de Pago - Dekko Store"; };
    window.onafterprint  = function() { document.title = "Recibo de Pago - Dekko Store"; };
});

document.addEventListener('DOMContentLoaded', function() {
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

    const vaciarCarritoUrl = '/productos/api/carrito/vaciar/';
    const principalUrl = document.body.getAttribute('data-principal-url') || '/';

    fetch(vaciarCarritoUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .then(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    })
    .catch(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    });

    let seconds = 30;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(function() {
      seconds--;
      if (countdownElement) countdownElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = principalUrl;
      }
    }, 1000);

    const printButton = document.querySelector('.btn-print');
    if (printButton) {
        printButton.addEventListener('click', function() {
            document.title = "Recibo de Pago - Dekko Store";
            window.print();
        });
    }

    window.onbeforeprint = function() { document.title = "Recibo de Pago - Dekko Store"; };
    window.onafterprint  = function() { document.title = "Recibo de Pago - Dekko Store"; };
});
document.addEventListener('DOMContentLoaded', function() {
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

    const vaciarCarritoUrl = '/productos/api/carrito/vaciar/';
    const principalUrl = document.body.getAttribute('data-principal-url') || '/';

    fetch(vaciarCarritoUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .then(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    })
    .catch(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    });

    let seconds = 30;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(function() {
      seconds--;
      if (countdownElement) countdownElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = principalUrl;
      }
    }, 1000);

    const printButton = document.querySelector('.btn-print');
    if (printButton) {
        printButton.addEventListener('click', function() {
            document.title = "Recibo de Pago - Dekko Store";
            window.print();
        });
    }

    window.onbeforeprint = function() { document.title = "Recibo de Pago - Dekko Store"; };
    window.onafterprint  = function() { document.title = "Recibo de Pago - Dekko Store"; };
});

document.addEventListener('DOMContentLoaded', function() {
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

    const vaciarCarritoUrl = '/productos/api/carrito/vaciar/';
    const principalUrl = document.body.getAttribute('data-principal-url') || '/';

    fetch(vaciarCarritoUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .then(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    })
    .catch(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    });

    let seconds = 30;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(function() {
      seconds--;
      if (countdownElement) countdownElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = principalUrl;
      }
    }, 1000);

    const printButton = document.querySelector('.btn-print');
    if (printButton) {
        printButton.addEventListener('click', function() {
            document.title = "Recibo de Pago - Dekko Store";
            window.print();
        });
    }

    window.onbeforeprint = function() { document.title = "Recibo de Pago - Dekko Store"; };
    window.onafterprint  = function() { document.title = "Recibo de Pago - Dekko Store"; };
});
document.addEventListener('DOMContentLoaded', function() {
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

    const vaciarCarritoUrl = '/productos/api/carrito/vaciar/';
    const principalUrl = document.body.getAttribute('data-principal-url') || '/';

    fetch(vaciarCarritoUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .then(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    })
    .catch(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    });

    let seconds = 30;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(function() {
      seconds--;
      if (countdownElement) countdownElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = principalUrl;
      }
    }, 1000);

    const printButton = document.querySelector('.btn-print');
    if (printButton) {
        printButton.addEventListener('click', function() {
            document.title = "Recibo de Pago - Dekko Store";
            window.print();
        });
    }

    window.onbeforeprint = function() { document.title = "Recibo de Pago - Dekko Store"; };
    window.onafterprint  = function() { document.title = "Recibo de Pago - Dekko Store"; };
});

document.addEventListener('DOMContentLoaded', function() {
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

    const vaciarCarritoUrl = '/productos/api/carrito/vaciar/';
    const principalUrl = document.body.getAttribute('data-principal-url') || '/';

    fetch(vaciarCarritoUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .then(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    })
    .catch(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    });

    let seconds = 30;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(function() {
      seconds--;
      if (countdownElement) countdownElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = principalUrl;
      }
    }, 1000);

    const printButton = document.querySelector('.btn-print');
    if (printButton) {
        printButton.addEventListener('click', function() {
            document.title = "Recibo de Pago - Dekko Store";
            window.print();
        });
    }

    window.onbeforeprint = function() { document.title = "Recibo de Pago - Dekko Store"; };
    window.onafterprint  = function() { document.title = "Recibo de Pago - Dekko Store"; };
});
document.addEventListener('DOMContentLoaded', function() {
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

    const vaciarCarritoUrl = '/productos/api/carrito/vaciar/';
    const principalUrl = document.body.getAttribute('data-principal-url') || '/';

    fetch(vaciarCarritoUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .then(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    })
    .catch(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    });

    let seconds = 30;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(function() {
      seconds--;
      if (countdownElement) countdownElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = principalUrl;
      }
    }, 1000);

    const printButton = document.querySelector('.btn-print');
    if (printButton) {
        printButton.addEventListener('click', function() {
            document.title = "Recibo de Pago - Dekko Store";
            window.print();
        });
    }

    window.onbeforeprint = function() { document.title = "Recibo de Pago - Dekko Store"; };
    window.onafterprint  = function() { document.title = "Recibo de Pago - Dekko Store"; };
});

document.addEventListener('DOMContentLoaded', function() {
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

    const vaciarCarritoUrl = '/productos/api/carrito/vaciar/';
    const principalUrl = document.body.getAttribute('data-principal-url') || '/';

    fetch(vaciarCarritoUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .then(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    })
    .catch(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    });

    let seconds = 30;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(function() {
      seconds--;
      if (countdownElement) countdownElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = principalUrl;
      }
    }, 1000);

    const printButton = document.querySelector('.btn-print');
    if (printButton) {
        printButton.addEventListener('click', function() {
            document.title = "Recibo de Pago - Dekko Store";
            window.print();
        });
    }

    window.onbeforeprint = function() { document.title = "Recibo de Pago - Dekko Store"; };
    window.onafterprint  = function() { document.title = "Recibo de Pago - Dekko Store"; };
});
document.addEventListener('DOMContentLoaded', function() {
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

    const vaciarCarritoUrl = '/productos/api/carrito/vaciar/';
    const principalUrl = document.body.getAttribute('data-principal-url') || '/';

    fetch(vaciarCarritoUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .then(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    })
    .catch(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    });

    let seconds = 30;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(function() {
      seconds--;
      if (countdownElement) countdownElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = principalUrl;
      }
    }, 1000);

    const printButton = document.querySelector('.btn-print');
    if (printButton) {
        printButton.addEventListener('click', function() {
            document.title = "Recibo de Pago - Dekko Store";
            window.print();
        });
    }

    window.onbeforeprint = function() { document.title = "Recibo de Pago - Dekko Store"; };
    window.onafterprint  = function() { document.title = "Recibo de Pago - Dekko Store"; };
});

document.addEventListener('DOMContentLoaded', function() {
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

    const vaciarCarritoUrl = '/productos/api/carrito/vaciar/';
    const principalUrl = document.body.getAttribute('data-principal-url') || '/';

    fetch(vaciarCarritoUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .then(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    })
    .catch(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    });

    let seconds = 30;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(function() {
      seconds--;
      if (countdownElement) countdownElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = principalUrl;
      }
    }, 1000);

    const printButton = document.querySelector('.btn-print');
    if (printButton) {
        printButton.addEventListener('click', function() {
            document.title = "Recibo de Pago - Dekko Store";
            window.print();
        });
    }

    window.onbeforeprint = function() { document.title = "Recibo de Pago - Dekko Store"; };
    window.onafterprint  = function() { document.title = "Recibo de Pago - Dekko Store"; };
});
document.addEventListener('DOMContentLoaded', function() {
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

    const vaciarCarritoUrl = '/productos/api/carrito/vaciar/';
    const principalUrl = document.body.getAttribute('data-principal-url') || '/';

    fetch(vaciarCarritoUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .then(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    })
    .catch(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    });

    let seconds = 30;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(function() {
      seconds--;
      if (countdownElement) countdownElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = principalUrl;
      }
    }, 1000);

    const printButton = document.querySelector('.btn-print');
    if (printButton) {
        printButton.addEventListener('click', function() {
            document.title = "Recibo de Pago - Dekko Store";
            window.print();
        });
    }

    window.onbeforeprint = function() { document.title = "Recibo de Pago - Dekko Store"; };
    window.onafterprint  = function() { document.title = "Recibo de Pago - Dekko Store"; };
});

document.addEventListener('DOMContentLoaded', function() {
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

    const vaciarCarritoUrl = '/productos/api/carrito/vaciar/';
    const principalUrl = document.body.getAttribute('data-principal-url') || '/';

    fetch(vaciarCarritoUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .then(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    })
    .catch(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    });

    let seconds = 30;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(function() {
      seconds--;
      if (countdownElement) countdownElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = principalUrl;
      }
    }, 1000);

    const printButton = document.querySelector('.btn-print');
    if (printButton) {
        printButton.addEventListener('click', function() {
            document.title = "Recibo de Pago - Dekko Store";
            window.print();
        });
    }

    window.onbeforeprint = function() { document.title = "Recibo de Pago - Dekko Store"; };
    window.onafterprint  = function() { document.title = "Recibo de Pago - Dekko Store"; };
});
document.addEventListener('DOMContentLoaded', function() {
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

    const vaciarCarritoUrl = '/productos/api/carrito/vaciar/';
    const principalUrl = document.body.getAttribute('data-principal-url') || '/';

    fetch(vaciarCarritoUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .then(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    })
    .catch(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    });

    let seconds = 30;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(function() {
      seconds--;
      if (countdownElement) countdownElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = principalUrl;
      }
    }, 1000);

    const printButton = document.querySelector('.btn-print');
    if (printButton) {
        printButton.addEventListener('click', function() {
            document.title = "Recibo de Pago - Dekko Store";
            window.print();
        });
    }

    window.onbeforeprint = function() { document.title = "Recibo de Pago - Dekko Store"; };
    window.onafterprint  = function() { document.title = "Recibo de Pago - Dekko Store"; };
});

document.addEventListener('DOMContentLoaded', function() {
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

    const vaciarCarritoUrl = '/productos/api/carrito/vaciar/';
    const principalUrl = document.body.getAttribute('data-principal-url') || '/';

    fetch(vaciarCarritoUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .then(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    })
    .catch(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    });

    let seconds = 30;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(function() {
      seconds--;
      if (countdownElement) countdownElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = principalUrl;
      }
    }, 1000);

    const printButton = document.querySelector('.btn-print');
    if (printButton) {
        printButton.addEventListener('click', function() {
            document.title = "Recibo de Pago - Dekko Store";
            window.print();
        });
    }

    window.onbeforeprint = function() { document.title = "Recibo de Pago - Dekko Store"; };
    window.onafterprint  = function() { document.title = "Recibo de Pago - Dekko Store"; };
});
document.addEventListener('DOMContentLoaded', function() {
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

    const vaciarCarritoUrl = '/productos/api/carrito/vaciar/';
    const principalUrl = document.body.getAttribute('data-principal-url') || '/';

    fetch(vaciarCarritoUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .then(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    })
    .catch(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    });

    let seconds = 30;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(function() {
      seconds--;
      if (countdownElement) countdownElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = principalUrl;
      }
    }, 1000);

    const printButton = document.querySelector('.btn-print');
    if (printButton) {
        printButton.addEventListener('click', function() {
            document.title = "Recibo de Pago - Dekko Store";
            window.print();
        });
    }

    window.onbeforeprint = function() { document.title = "Recibo de Pago - Dekko Store"; };
    window.onafterprint  = function() { document.title = "Recibo de Pago - Dekko Store"; };
});

document.addEventListener('DOMContentLoaded', function() {
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

    const vaciarCarritoUrl = '/productos/api/carrito/vaciar/';
    const principalUrl = document.body.getAttribute('data-principal-url') || '/';

    fetch(vaciarCarritoUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .then(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    })
    .catch(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    });

    let seconds = 30;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(function() {
      seconds--;
      if (countdownElement) countdownElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = principalUrl;
      }
    }, 1000);

    const printButton = document.querySelector('.btn-print');
    if (printButton) {
        printButton.addEventListener('click', function() {
            document.title = "Recibo de Pago - Dekko Store";
            window.print();
        });
    }

    window.onbeforeprint = function() { document.title = "Recibo de Pago - Dekko Store"; };
    window.onafterprint  = function() { document.title = "Recibo de Pago - Dekko Store"; };
});
document.addEventListener('DOMContentLoaded', function() {
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

    const vaciarCarritoUrl = '/productos/api/carrito/vaciar/';
    const principalUrl = document.body.getAttribute('data-principal-url') || '/';

    fetch(vaciarCarritoUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .then(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    })
    .catch(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    });

    let seconds = 30;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(function() {
      seconds--;
      if (countdownElement) countdownElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = principalUrl;
      }
    }, 1000);

    const printButton = document.querySelector('.btn-print');
    if (printButton) {
        printButton.addEventListener('click', function() {
            document.title = "Recibo de Pago - Dekko Store";
            window.print();
        });
    }

    window.onbeforeprint = function() { document.title = "Recibo de Pago - Dekko Store"; };
    window.onafterprint  = function() { document.title = "Recibo de Pago - Dekko Store"; };
});

document.addEventListener('DOMContentLoaded', function() {
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

    const vaciarCarritoUrl = '/productos/api/carrito/vaciar/';
    const principalUrl = document.body.getAttribute('data-principal-url') || '/';

    fetch(vaciarCarritoUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .then(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    })
    .catch(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    });

    let seconds = 30;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(function() {
      seconds--;
      if (countdownElement) countdownElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = principalUrl;
      }
    }, 1000);

    const printButton = document.querySelector('.btn-print');
    if (printButton) {
        printButton.addEventListener('click', function() {
            document.title = "Recibo de Pago - Dekko Store";
            window.print();
        });
    }

    window.onbeforeprint = function() { document.title = "Recibo de Pago - Dekko Store"; };
    window.onafterprint  = function() { document.title = "Recibo de Pago - Dekko Store"; };
});
document.addEventListener('DOMContentLoaded', function() {
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

    const vaciarCarritoUrl = '/productos/api/carrito/vaciar/';
    const principalUrl = document.body.getAttribute('data-principal-url') || '/';

    fetch(vaciarCarritoUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .then(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    })
    .catch(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    });

    let seconds = 30;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(function() {
      seconds--;
      if (countdownElement) countdownElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = principalUrl;
      }
    }, 1000);

    const printButton = document.querySelector('.btn-print');
    if (printButton) {
        printButton.addEventListener('click', function() {
            document.title = "Recibo de Pago - Dekko Store";
            window.print();
        });
    }

    window.onbeforeprint = function() { document.title = "Recibo de Pago - Dekko Store"; };
    window.onafterprint  = function() { document.title = "Recibo de Pago - Dekko Store"; };
});

document.addEventListener('DOMContentLoaded', function() {
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

    const vaciarCarritoUrl = '/productos/api/carrito/vaciar/';
    const principalUrl = document.body.getAttribute('data-principal-url') || '/';

    fetch(vaciarCarritoUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .then(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    })
    .catch(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    });

    let seconds = 30;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(function() {
      seconds--;
      if (countdownElement) countdownElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = principalUrl;
      }
    }, 1000);

    const printButton = document.querySelector('.btn-print');
    if (printButton) {
        printButton.addEventListener('click', function() {
            document.title = "Recibo de Pago - Dekko Store";
            window.print();
        });
    }

    window.onbeforeprint = function() { document.title = "Recibo de Pago - Dekko Store"; };
    window.onafterprint  = function() { document.title = "Recibo de Pago - Dekko Store"; };
});
document.addEventListener('DOMContentLoaded', function() {
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

    const vaciarCarritoUrl = '/productos/api/carrito/vaciar/';
    const principalUrl = document.body.getAttribute('data-principal-url') || '/';

    fetch(vaciarCarritoUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .then(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    })
    .catch(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    });

    let seconds = 30;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(function() {
      seconds--;
      if (countdownElement) countdownElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = principalUrl;
      }
    }, 1000);

    const printButton = document.querySelector('.btn-print');
    if (printButton) {
        printButton.addEventListener('click', function() {
            document.title = "Recibo de Pago - Dekko Store";
            window.print();
        });
    }

    window.onbeforeprint = function() { document.title = "Recibo de Pago - Dekko Store"; };
    window.onafterprint  = function() { document.title = "Recibo de Pago - Dekko Store"; };
});

document.addEventListener('DOMContentLoaded', function() {
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

    const vaciarCarritoUrl = '/productos/api/carrito/vaciar/';
    const principalUrl = document.body.getAttribute('data-principal-url') || '/';

    fetch(vaciarCarritoUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .then(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    })
    .catch(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    });

    let seconds = 30;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(function() {
      seconds--;
      if (countdownElement) countdownElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = principalUrl;
      }
    }, 1000);

    const printButton = document.querySelector('.btn-print');
    if (printButton) {
        printButton.addEventListener('click', function() {
            document.title = "Recibo de Pago - Dekko Store";
            window.print();
        });
    }

    window.onbeforeprint = function() { document.title = "Recibo de Pago - Dekko Store"; };
    window.onafterprint  = function() { document.title = "Recibo de Pago - Dekko Store"; };
});
document.addEventListener('DOMContentLoaded', function() {
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

    const vaciarCarritoUrl = '/productos/api/carrito/vaciar/';
    const principalUrl = document.body.getAttribute('data-principal-url') || '/';

    fetch(vaciarCarritoUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .then(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    })
    .catch(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    });

    let seconds = 30;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(function() {
      seconds--;
      if (countdownElement) countdownElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = principalUrl;
      }
    }, 1000);

    const printButton = document.querySelector('.btn-print');
    if (printButton) {
        printButton.addEventListener('click', function() {
            document.title = "Recibo de Pago - Dekko Store";
            window.print();
        });
    }

    window.onbeforeprint = function() { document.title = "Recibo de Pago - Dekko Store"; };
    window.onafterprint  = function() { document.title = "Recibo de Pago - Dekko Store"; };
});

document.addEventListener('DOMContentLoaded', function() {
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

    const vaciarCarritoUrl = '/productos/api/carrito/vaciar/';
    const principalUrl = document.body.getAttribute('data-principal-url') || '/';

    fetch(vaciarCarritoUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .then(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    })
    .catch(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    });

    let seconds = 30;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(function() {
      seconds--;
      if (countdownElement) countdownElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = principalUrl;
      }
    }, 1000);

    const printButton = document.querySelector('.btn-print');
    if (printButton) {
        printButton.addEventListener('click', function() {
            document.title = "Recibo de Pago - Dekko Store";
            window.print();
        });
    }

    window.onbeforeprint = function() { document.title = "Recibo de Pago - Dekko Store"; };
    window.onafterprint  = function() { document.title = "Recibo de Pago - Dekko Store"; };
});
document.addEventListener('DOMContentLoaded', function() {
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

    const vaciarCarritoUrl = '/productos/api/carrito/vaciar/';
    const principalUrl = document.body.getAttribute('data-principal-url') || '/';

    fetch(vaciarCarritoUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .then(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    })
    .catch(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    });

    let seconds = 30;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(function() {
      seconds--;
      if (countdownElement) countdownElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = principalUrl;
      }
    }, 1000);

    const printButton = document.querySelector('.btn-print');
    if (printButton) {
        printButton.addEventListener('click', function() {
            document.title = "Recibo de Pago - Dekko Store";
            window.print();
        });
    }

    window.onbeforeprint = function() { document.title = "Recibo de Pago - Dekko Store"; };
    window.onafterprint  = function() { document.title = "Recibo de Pago - Dekko Store"; };
});

document.addEventListener('DOMContentLoaded', function() {
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

    const vaciarCarritoUrl = '/productos/api/carrito/vaciar/';
    const principalUrl = document.body.getAttribute('data-principal-url') || '/';

    fetch(vaciarCarritoUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .then(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    })
    .catch(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    });

    let seconds = 30;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(function() {
      seconds--;
      if (countdownElement) countdownElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = principalUrl;
      }
    }, 1000);

    const printButton = document.querySelector('.btn-print');
    if (printButton) {
        printButton.addEventListener('click', function() {
            document.title = "Recibo de Pago - Dekko Store";
            window.print();
        });
    }

    window.onbeforeprint = function() { document.title = "Recibo de Pago - Dekko Store"; };
    window.onafterprint  = function() { document.title = "Recibo de Pago - Dekko Store"; };
});
document.addEventListener('DOMContentLoaded', function() {
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

    const vaciarCarritoUrl = '/productos/api/carrito/vaciar/';
    const principalUrl = document.body.getAttribute('data-principal-url') || '/';

    fetch(vaciarCarritoUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .then(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    })
    .catch(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    });

    let seconds = 30;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(function() {
      seconds--;
      if (countdownElement) countdownElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = principalUrl;
      }
    }, 1000);

    const printButton = document.querySelector('.btn-print');
    if (printButton) {
        printButton.addEventListener('click', function() {
            document.title = "Recibo de Pago - Dekko Store";
            window.print();
        });
    }

    window.onbeforeprint = function() { document.title = "Recibo de Pago - Dekko Store"; };
    window.onafterprint  = function() { document.title = "Recibo de Pago - Dekko Store"; };
});

document.addEventListener('DOMContentLoaded', function() {
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

    const vaciarCarritoUrl = '/productos/api/carrito/vaciar/';
    const principalUrl = document.body.getAttribute('data-principal-url') || '/';

    fetch(vaciarCarritoUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .then(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    })
    .catch(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    });

    let seconds = 30;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(function() {
      seconds--;
      if (countdownElement) countdownElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = principalUrl;
      }
    }, 1000);

    const printButton = document.querySelector('.btn-print');
    if (printButton) {
        printButton.addEventListener('click', function() {
            document.title = "Recibo de Pago - Dekko Store";
            window.print();
        });
    }

    window.onbeforeprint = function() { document.title = "Recibo de Pago - Dekko Store"; };
    window.onafterprint  = function() { document.title = "Recibo de Pago - Dekko Store"; };
});
document.addEventListener('DOMContentLoaded', function() {
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

    const vaciarCarritoUrl = '/productos/api/carrito/vaciar/';
    const principalUrl = document.body.getAttribute('data-principal-url') || '/';

    fetch(vaciarCarritoUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .then(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    })
    .catch(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    });

    let seconds = 30;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(function() {
      seconds--;
      if (countdownElement) countdownElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = principalUrl;
      }
    }, 1000);

    const printButton = document.querySelector('.btn-print');
    if (printButton) {
        printButton.addEventListener('click', function() {
            document.title = "Recibo de Pago - Dekko Store";
            window.print();
        });
    }

    window.onbeforeprint = function() { document.title = "Recibo de Pago - Dekko Store"; };
    window.onafterprint  = function() { document.title = "Recibo de Pago - Dekko Store"; };
});

document.addEventListener('DOMContentLoaded', function() {
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

    const vaciarCarritoUrl = '/productos/api/carrito/vaciar/';
    const principalUrl = document.body.getAttribute('data-principal-url') || '/';

    fetch(vaciarCarritoUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .then(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    })
    .catch(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    });

    let seconds = 30;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(function() {
      seconds--;
      if (countdownElement) countdownElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = principalUrl;
      }
    }, 1000);

    const printButton = document.querySelector('.btn-print');
    if (printButton) {
        printButton.addEventListener('click', function() {
            document.title = "Recibo de Pago - Dekko Store";
            window.print();
        });
    }

    window.onbeforeprint = function() { document.title = "Recibo de Pago - Dekko Store"; };
    window.onafterprint  = function() { document.title = "Recibo de Pago - Dekko Store"; };
});
document.addEventListener('DOMContentLoaded', function() {
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

    const vaciarCarritoUrl = '/productos/api/carrito/vaciar/';
    const principalUrl = document.body.getAttribute('data-principal-url') || '/';

    fetch(vaciarCarritoUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .then(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    })
    .catch(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    });

    let seconds = 30;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(function() {
      seconds--;
      if (countdownElement) countdownElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = principalUrl;
      }
    }, 1000);

    const printButton = document.querySelector('.btn-print');
    if (printButton) {
        printButton.addEventListener('click', function() {
            document.title = "Recibo de Pago - Dekko Store";
            window.print();
        });
    }

    window.onbeforeprint = function() { document.title = "Recibo de Pago - Dekko Store"; };
    window.onafterprint  = function() { document.title = "Recibo de Pago - Dekko Store"; };
});

document.addEventListener('DOMContentLoaded', function() {
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

    const vaciarCarritoUrl = '/productos/api/carrito/vaciar/';
    const principalUrl = document.body.getAttribute('data-principal-url') || '/';

    fetch(vaciarCarritoUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .then(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    })
    .catch(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    });

    let seconds = 30;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(function() {
      seconds--;
      if (countdownElement) countdownElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = principalUrl;
      }
    }, 1000);

    const printButton = document.querySelector('.btn-print');
    if (printButton) {
        printButton.addEventListener('click', function() {
            document.title = "Recibo de Pago - Dekko Store";
            window.print();
        });
    }

    window.onbeforeprint = function() { document.title = "Recibo de Pago - Dekko Store"; };
    window.onafterprint  = function() { document.title = "Recibo de Pago - Dekko Store"; };
});
document.addEventListener('DOMContentLoaded', function() {
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

    const vaciarCarritoUrl = '/productos/api/carrito/vaciar/';
    const principalUrl = document.body.getAttribute('data-principal-url') || '/';

    fetch(vaciarCarritoUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .then(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    })
    .catch(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    });

    let seconds = 30;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(function() {
      seconds--;
      if (countdownElement) countdownElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = principalUrl;
      }
    }, 1000);

    const printButton = document.querySelector('.btn-print');
    if (printButton) {
        printButton.addEventListener('click', function() {
            document.title = "Recibo de Pago - Dekko Store";
            window.print();
        });
    }

    window.onbeforeprint = function() { document.title = "Recibo de Pago - Dekko Store"; };
    window.onafterprint  = function() { document.title = "Recibo de Pago - Dekko Store"; };
});

document.addEventListener('DOMContentLoaded', function() {
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

    const vaciarCarritoUrl = '/productos/api/carrito/vaciar/';
    const principalUrl = document.body.getAttribute('data-principal-url') || '/';

    fetch(vaciarCarritoUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .then(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    })
    .catch(() => {
        localStorage.removeItem('dekkoCart');
        if (typeof cart !== 'undefined') {
            cart.items = [];
            cart.total = 0;
            cart.saveToLocalStorage();
            cart.updateCartDisplay();
        }
    });

    let seconds = 30;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(function() {
      seconds--;
      if (countdownElement) countdownElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = principalUrl;
      }
    }, 1000);

    const printButton = document.querySelector('.btn-print');
    if (printButton) {
        printButton.addEventListener('click', function() {
            document.title = "Recibo de Pago - Dekko Store";
            window.print();
        });
    }

    window.onbeforeprint = function() { document.title = "Recibo de Pago - Dekko Store"; };
    window.onafterprint  = function() { document.title = "Recibo de Pago - Dekko Store"; };
});
