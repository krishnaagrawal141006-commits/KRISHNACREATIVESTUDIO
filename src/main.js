import './style.css'

// Initialize Lucide icons
if (window.lucide) {
    window.lucide.createIcons();
}

document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    const contactForm = document.getElementById('contactForm');

    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '0.5rem 1.5rem';
            navbar.style.background = 'rgba(10, 11, 30, 0.8)';
            navbar.style.top = '10px';
        } else {
            navbar.style.padding = '0.8rem 1.5rem';
            navbar.style.background = 'var(--glass-bg)';
            navbar.style.top = '20px';
        }
    });

    // Mobile Menu Toggle
    mobileToggle?.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.setAttribute('data-lucide', 'x');
        } else {
            icon.setAttribute('data-lucide', 'menu');
        }
        window.lucide.createIcons();
    });

    // Close mobile menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            icon.setAttribute('data-lucide', 'menu');
            window.lucide.createIcons();
        });
    });

    // 3D Parallax Effect for Floating Elements
    const heroSection = document.querySelector('.hero');
    const floatingItems = document.querySelectorAll('.floating-item, .floating-card');

    heroSection.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        const moveX = (clientX - centerX) / 25;
        const moveY = (clientY - centerY) / 25;

        floatingItems.forEach((item, index) => {
            const speed = (index + 1) * 0.5;
            item.style.transform = `translate(${moveX * speed}px, ${moveY * speed}px)`;
        });
    });

    heroSection.addEventListener('mouseleave', () => {
        floatingItems.forEach(item => {
            item.style.transform = `translate(0, 0)`;
        });
    });

    // Contact Form Simulation
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerText;
        
        btn.innerText = 'Sending...';
        btn.disabled = true;

        setTimeout(() => {
            alert('Thank you! Your message has been sent to Krishna Creative Studio.');
            contactForm.reset();
            btn.innerText = originalText;
            btn.disabled = false;
        }, 1500);
    });

    // Intersection Observer for Animations on Scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { entry.target.classList.toggle('reveal', entry.isIntersecting); });
    }, observerOptions);

    document.querySelectorAll('.service-card, .gallery-item, .about-content').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)';
        observer.observe(el);
    });

    // Add CSS for revealed elements
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        .reveal {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(styleSheet);
});
