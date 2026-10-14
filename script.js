(function () {
    'use strict';

    const navToggle = document.getElementById('navToggle');
    const navLinks  = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => navLinks.classList.remove('active'));
        });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll(
        '.compare-card, .stack-card, .summary-card, .section-header, .decision-item'
    ).forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 130;
            if (window.scrollY >= top) current = section.id;
        });

        navItems.forEach(item => {
            item.style.background = '';
            item.style.color = '';
            if (item.getAttribute('href') === `#${current}`) {
                item.style.background = 'var(--orange-soft)';
                item.style.color = 'var(--orange-dark)';
            }
        });
    }, { passive: true });

})();