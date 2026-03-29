// AtomicHabits - Main JavaScript

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all feature cards and review cards
document.querySelectorAll('.feature-card, .review-card, .screenshot-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// Stats counter animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Animate stats when visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                if (text.includes('4.9')) {
                    // Rating, no animation needed
                } else if (text.includes('37x')) {
                    // Already formatted
                } else if (text.includes('K+')) {
                    const num = parseInt(text);
                    if (!isNaN(num)) {
                        stat.textContent = animateCounter(stat, num) + 'K+';
                    }
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// Mobile menu toggle (if needed in future)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// FAQ accordion (optional enhancement)
document.querySelectorAll('.faq-item h3').forEach(header => {
    header.style.cursor = 'pointer';
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        const isExpanded = content.style.maxHeight;
        
        // Close all other items
        document.querySelectorAll('.faq-item p').forEach(p => {
            p.style.maxHeight = '';
        });
        
        // Toggle current
        if (!isExpanded) {
            content.style.maxHeight = content.scrollHeight + 'px';
        }
    });
});

// Download button tracking (analytics placeholder)
document.querySelectorAll('.btn-download, .btn-download-large').forEach(btn => {
    btn.addEventListener('click', () => {
        console.log('Download button clicked');
        // Add analytics tracking here
        // gtag('event', 'download_click', { ... });
    });
});

// Lazy loading for images
if ('loading' in HTMLImageElement.prototype) {
    document.querySelectorAll('img').forEach(img => {
        img.setAttribute('loading', 'lazy');
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// Print version info to console
console.log('🍎 AtomicHabits Website v1.0.0');
console.log('Built with ❤️ for better habits');
