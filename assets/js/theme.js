/**
 * Global Theme JavaScript
 * Handles common UI interactions like mobile menu, search redirects, etc.
 */

document.addEventListener('DOMContentLoaded', function() {
    // --- Mobile Menu Toggle Logic ---
    const menuBtn = document.getElementById('mobile-menu-btn');
    const closeBtn = document.getElementById('close-menu');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', function() {
            console.log('Mobile menu opened');
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('flex');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    }

    if (closeBtn && mobileMenu) {
        closeBtn.addEventListener('click', function() {
            console.log('Mobile menu closed');
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('flex');
            document.body.style.overflow = 'auto'; // Restore scrolling
        });
    }

    // Close menu on link click
    if (mobileMenu) {
        const menuLinks = mobileMenu.querySelectorAll('nav a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
                document.body.style.overflow = 'auto';
            });
        });
    }

    // --- Global Search Logic ---
    const searchForms = document.querySelectorAll('form[action="products.html"], form#header-search-form');
    searchForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const searchInput = form.querySelector('input[type="search"]');
            if (searchInput && searchInput.value.trim()) {
                // If we're already on products.html, the default form submission works.
                // If not, we might want to redirect.
                if (!window.location.pathname.includes('products.html')) {
                    e.preventDefault();
                    window.location.href = `products.html?search=${encodeURIComponent(searchInput.value.trim())}`;
                }
            }
        });
    });

    // --- Mobile Search Logic (if separate) ---
    const mobileSearchForm = document.getElementById('mobile-search-form');
    if (mobileSearchForm) {
        mobileSearchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const input = document.getElementById('mobile-search-input');
            if (input && input.value.trim()) {
                window.location.href = `products.html?search=${encodeURIComponent(input.value.trim())}`;
            }
        });
    }
});
