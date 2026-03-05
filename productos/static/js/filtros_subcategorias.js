document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setupSubcategoryFilters();
});

function setupSubcategoryFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productSections = document.querySelectorAll('.product-section');
    const dropdownButton = document.getElementById('filterDropdown');
    
    function updateDropdownText(text) {
        dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${text}`;
    }

    function showAllProducts() {
        productSections.forEach(section => {
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        });
        updateDropdownText('Filtrar por subcategoría');
    }
    
    function filterBySubcategory(subcategoryId, subcategoryName) {
        productSections.forEach(section => {
            const sectionId = section.getAttribute('data-category');
            
            if (subcategoryId === 'all' || sectionId === subcategoryId) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        if (subcategoryId === 'all') {
            updateDropdownText('Filtrar por subcategoría');
        } else {
            updateDropdownText(subcategoryName);
        }
    }
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const subcategoryId = this.getAttribute('data-subcategoria');
            const subcategoryName = this.textContent;
            filterBySubcategory(subcategoryId, subcategoryName);
            
            if (subcategoryId === 'all') {
                window.history.pushState({}, '', window.location.pathname);
            } else {
                window.history.pushState({}, '', `?subcategoria=${subcategoryId}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryParam = urlParams.get('subcategoria');
    
    if (subcategoryParam) {
        const activeOption = document.querySelector(`.filter-option[data-subcategoria="${subcategoryParam}"]`);
        if (activeOption) {
            activeOption.click();
        }
    } else {
        showAllProducts();
    }
}
