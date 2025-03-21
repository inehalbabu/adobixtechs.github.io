// Load Header
document.getElementById('header').innerHTML = `
    <header>
        <a href="index.html" class="logo">
            <img src="assets/icons/logo.png" alt="Expenses Flow Logo">
            Expenses Flow
        </a>
        <div class="menu-btn">
            <i class="fas fa-bars"></i>
        </div>
        <div class="header-links">
            <a href="index.html" class="${window.location.pathname.endsWith('index.html') ? 'active' : ''}">Home</a>
            <a href="privacy-policy.html" class="${window.location.pathname.endsWith('privacy-policy.html') ? 'active' : ''}">Privacy Policy</a>
            <a href="terms.html" class="${window.location.pathname.endsWith('terms.html') ? 'active' : ''}">Terms</a>
            <a href="faq.html" class="${window.location.pathname.endsWith('faq.html') ? 'active' : ''}">FAQ</a>
        </div>
    </header>
`;

// Load Footer
document.getElementById('footer').innerHTML = `
    <footer>
        <div class="social-icons">
            <a href="https://www.linkedin.com/company/adobixtech", target="_blank"><i class="fab fa-linkedin"></i></a>
            <a href="https://github.com/adobix", target="_blank"><i class="fab fa-github"></i></a>
            <a href="mailto:adobixtech@gmail.com" title="Contact Support">
                <i class="fas fa-envelope"></i>
            </a>
        </div>
        <p style="margin-top: 20px; color: #e0e0e0;">© 2025 Adobix Tech. All rights reserved.</p>
    </footer>
`;

// Main Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add overlay div
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);

    // Get all necessary elements
    const menuBtn = document.querySelector('.menu-btn');
    const headerLinks = document.querySelector('.header-links');
    const overlayEl = document.querySelector('.overlay');
    const homeLink = document.querySelector('a[href="index.html"]');
    const logoLink = document.querySelector('.logo');
    const privacyLink = document.querySelector('a[href="privacy-policy.html"]');
    const termsLink = document.querySelector('a[href="terms.html"]');
    const faqLink = document.querySelector('a[href="faq.html"]');
    const allLinks = [homeLink, logoLink, privacyLink, termsLink, faqLink];

    // Function to clear all data
    function clearAllData(e) {
        // Prevent default navigation
        e.preventDefault();
        
        // Clear any stored data
        localStorage.clear();
        sessionStorage.clear();
        
        // Clear any form data if exists
        const forms = document.querySelectorAll('form');
        forms.forEach(form => form.reset());
        
        // Clear any input fields
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.value = '';
        });

        // Navigate to the page after clearing data
        window.location.href = e.currentTarget.getAttribute('href');
    }

    // Function to handle mobile menu
    function toggleMenu() {
        headerLinks.classList.toggle('active');
        overlayEl.classList.toggle('active');
        document.body.style.overflow = headerLinks.classList.contains('active') ? 'hidden' : '';
    }

    // Function to close mobile menu
    function closeMenu() {
        headerLinks.classList.remove('active');
        overlayEl.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Add event listeners for mobile menu
    if (menuBtn) {
        menuBtn.addEventListener('click', toggleMenu);
    }

    if (overlayEl) {
        overlayEl.addEventListener('click', closeMenu);
    }

    // Add click event listeners to all navigation links
    allLinks.forEach(link => {
        if (link) {
            link.addEventListener('click', clearAllData);
        }
    });

    // Set active link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.header-links a, .footer-links a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // FAQ Functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (question && answer) {
            question.addEventListener('click', () => {
                // Close all other answers
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        if (otherAnswer) {
                            otherAnswer.style.maxHeight = null;
                        }
                    }
                });
                
                // Toggle current answer
                item.classList.toggle('active');
                answer.style.maxHeight = item.classList.contains('active') ? answer.scrollHeight + "px" : null;
            });
        }
    });
});
