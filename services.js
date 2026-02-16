// Services Page Specific JavaScript - Optimized Animations

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Service Cards Animation on Scroll
const serviceObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const card = entry.target;
            const features = card.querySelectorAll('.service-features li');
            
            // Trigger card animation
            card.style.animation = 'card-flip-in 0.8s ease-out forwards';
            
            // Trigger feature animations with stagger
            features.forEach((feature, index) => {
                setTimeout(() => {
                    feature.style.animation = 'feature-slide-in 0.5s ease-out forwards';
                }, 800 + (index * 100));
            });
            
            serviceObserver.unobserve(card);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe service cards
document.querySelectorAll('.service-card').forEach(card => {
    serviceObserver.observe(card);
});

// Process Steps Animation
const processObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const steps = entry.target.querySelectorAll('.process-step');
            steps.forEach((step, index) => {
                setTimeout(() => {
                    step.style.animation = 'process-spin 0.8s ease-out forwards';
                }, index * 200);
            });
            processObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.3
});

// Observe process timeline
const processTimeline = document.querySelector('.process-timeline');
if (processTimeline) {
    processObserver.observe(processTimeline);
}

// Testimonials Animation
const testimonialObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const testimonials = entry.target.querySelectorAll('.testimonial-card');
            testimonials.forEach((testimonial, index) => {
                setTimeout(() => {
                    testimonial.style.animation = 'testimonial-appear 0.8s ease-out forwards';
                }, index * 200);
            });
            testimonialObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2
});

// Observe testimonials
const testimonialsSlider = document.querySelector('.testimonials-slider');
if (testimonialsSlider) {
    testimonialObserver.observe(testimonialsSlider);
}

// Interactive Service Card Effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.05)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Smooth Scroll for Navigation Links
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

// Newsletter Form
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showNotification('Successfully subscribed to newsletter!', 'success');
            this.reset();
        } else {
            showNotification('Please enter a valid email address', 'error');
        }
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Dynamic Background Icons Animation
class BackgroundIconAnimation {
    constructor() {
        this.icons = document.querySelectorAll('.service-icon-bg');
        this.init();
    }

    init() {
        this.icons.forEach((icon, index) => {
            this.animateIcon(icon, index);
        });
    }

    animateIcon(icon, index) {
        const duration = 20000 + (index * 2000);
        const delay = index * 1000;
        
        setTimeout(() => {
            setInterval(() => {
                const randomX = Math.random() * 100 - 50;
                const randomY = Math.random() * 100 - 50;
                const randomRotate = Math.random() * 360;
                
                icon.style.transition = 'transform 10s ease-in-out';
                icon.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`;
            }, duration);
        }, delay);
    }
}

// Initialize background animation only on larger screens
if (window.innerWidth > 768) {
    new BackgroundIconAnimation();
}

// Loading Animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Active Navigation Link
const currentPath = window.location.pathname;
const allNavLinks = document.querySelectorAll('.nav-link');
allNavLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath.split('/').pop()) {
        link.classList.add('active');
    }
});

// Performance optimization for scroll events
let ticking = false;
function updateScrollEffects() {
    // Add any scroll-based animations here
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        window.requestAnimationFrame(updateScrollEffects);
        ticking = true;
    }
}

window.addEventListener('scroll', requestTick);

console.log('Services page loaded with optimized animations!');
