document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}


document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}


document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}


document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}


document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}


document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}


document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}


document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}


document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}


document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}


document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}


document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}


document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}


document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}


document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}


document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}


document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}


document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}


document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}


document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}


document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}


document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}


document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}


document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}


document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}


document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}


document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}


document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}


document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}


document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}


document.addEventListener('DOMContentLoaded', function() {
    setupCarouselAnimations();
    setupCarouselProductLinks();
    
    // Pre-animar los slides iniciales
    const firstSlide = document.querySelector('#featuredCarousel .carousel-item.active');
    if (firstSlide) {
        firstSlide.style.opacity = '1';
        firstSlide.style.transform = 'scale(1)';
    }
});

function setupCarouselAnimations() {
    const carousel = document.querySelector('#featuredCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'all 0.5s ease';
        });
    });
    
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    });
}

function setupCarouselProductLinks() {
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            highlightProduct(productId);
            scrollToProduct(productId);
        });
    });
}

function highlightProduct(productId) {
    // Remover resaltado anterior
    document.querySelectorAll('.product-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el producto seleccionado
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.classList.add('highlighted');
        
        // Quitar el resaltado después de 3 segundos
        setTimeout(() => {
            productCard.classList.remove('highlighted');
        }, 3000);
    }
}

function scrollToProduct(productId) {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        // Primero hacer scroll al contenedor de productos
        document.getElementById('productos-container').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Luego hacer scroll al producto específico
        setTimeout(() => {
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
}

