// Contact Page Specific JavaScript - Optimized Animations

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

// Form Validation
const eventForm = document.getElementById('eventForm');
if (eventForm) {
    eventForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Show success message
            showNotification('Event request submitted successfully! We will contact you within 24 hours.', 'success');
            eventForm.reset();
            
            // Reset form animations
            const formGroups = eventForm.querySelectorAll('.form-group');
            formGroups.forEach((group, index) => {
                group.style.animation = 'none';
                setTimeout(() => {
                    group.style.animation = 'form-group-appear 0.5s ease-out forwards';
                }, index * 50);
            });
        }
    });
}

function validateForm() {
    let isValid = true;
    const formGroups = eventForm.querySelectorAll('.form-group');
    
    formGroups.forEach(group => {
        const input = group.querySelector('input, select, textarea');
        const errorMessage = group.querySelector('.error-message');
        
        // Clear previous errors
        input.classList.remove('error');
        errorMessage.textContent = '';
        errorMessage.style.opacity = '0';
        
        // Validate required fields
        if (input.hasAttribute('required') && !input.value.trim()) {
            showError(input, errorMessage, 'This field is required');
            isValid = false;
        }
        
        // Email validation
        if (input.type === 'email' && input.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                showError(input, errorMessage, 'Please enter a valid email address');
                isValid = false;
            }
        }
        
        // Phone validation
        if (input.type === 'tel' && input.value) {
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (!phoneRegex.test(input.value) || input.value.length < 10) {
                showError(input, errorMessage, 'Please enter a valid phone number');
                isValid = false;
            }
        }
        
        // Date validation (future dates only)
        if (input.type === 'date' && input.value) {
            const selectedDate = new Date(input.value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                showError(input, errorMessage, 'Event date must be in the future');
                isValid = false;
            }
        }
        
        // Guest count validation
        if (input.type === 'number' && input.id === 'guests' && input.value) {
            const guests = parseInt(input.value);
            if (guests < 1 || guests > 10000) {
                showError(input, errorMessage, 'Number of guests must be between 1 and 10,000');
                isValid = false;
            }
        }
    });
    
    return isValid;
}

function showError(input, errorMessage, message) {
    input.classList.add('error');
    errorMessage.textContent = message;
    errorMessage.style.opacity = '1';
}

// Real-time validation
document.querySelectorAll('#eventForm input, #eventForm select, #eventForm textarea').forEach(input => {
    input.addEventListener('blur', function() {
        const formGroup = this.closest('.form-group');
        const errorMessage = formGroup.querySelector('.error-message');
        
        // Clear previous errors
        this.classList.remove('error');
        errorMessage.textContent = '';
        errorMessage.style.opacity = '0';
        
        // Validate field
        if (this.hasAttribute('required') && !this.value.trim()) {
            showError(this, errorMessage, 'This field is required');
        } else if (this.type === 'email' && this.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(this.value)) {
                showError(this, errorMessage, 'Please enter a valid email address');
            }
        } else if (this.type === 'tel' && this.value) {
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (!phoneRegex.test(this.value) || this.value.length < 10) {
                showError(this, errorMessage, 'Please enter a valid phone number');
            }
        }
    });
    
    // Remove error on input
    input.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            this.classList.remove('error');
            const errorMessage = this.closest('.form-group').querySelector('.error-message');
            errorMessage.textContent = '';
            errorMessage.style.opacity = '0';
        }
    });
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all FAQ items
        faqItems.forEach(faqItem => {
            faqItem.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Contact Info Animation on Scroll
const contactObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const infoItems = entry.target.querySelectorAll('.info-item');
            infoItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.animation = 'info-item-slide 0.5s ease-out forwards';
                }, index * 100);
            });
            
            const socialLinks = entry.target.querySelector('.social-links');
            if (socialLinks) {
                socialLinks.style.animation = 'social-links-appear 0.5s ease-out 1.2s both';
            }
            
            contactObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2
});

// Observe contact info
const contactInfo = document.querySelector('.contact-info');
if (contactInfo) {
    contactObserver.observe(contactInfo);
}

// Form Animation on Scroll
const formObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const formGroups = entry.target.querySelectorAll('.form-group');
            formGroups.forEach((group, index) => {
                setTimeout(() => {
                    group.style.animation = 'form-group-appear 0.5s ease-out forwards';
                }, index * 100);
            });
            formObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2
});

// Observe contact form
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    formObserver.observe(contactForm);
}

// FAQ Animation on Scroll
const faqObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const faqItems = entry.target.querySelectorAll('.faq-item');
            faqItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.animation = 'faq-item-appear 0.5s ease-out forwards';
                }, index * 100);
            });
            faqObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2
});

// Observe FAQ section
const faqContainer = document.querySelector('.faq-container');
if (faqContainer) {
    faqObserver.observe(faqContainer);
}

// Map Animation on Scroll
const mapObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const mapContainer = entry.target.querySelector('.map-container');
            mapContainer.style.animation = 'map-zoom-in 0.8s ease-out forwards';
            mapObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.3
});

// Add map zoom animation
const mapStyle = document.createElement('style');
mapStyle.textContent = `
    @keyframes map-zoom-in {
        0% {
            opacity: 0;
            transform: scale(0.8);
        }
        100% {
            opacity: 1;
            transform: scale(1);
        }
    }
`;
document.head.appendChild(mapStyle);

// Observe map section
const mapSection = document.querySelector('.map-section');
if (mapSection) {
    mapObserver.observe(mapSection);
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
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
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
document.head.appendChild(notificationStyle);

// Dynamic Contact Particles
class ContactParticleSystem {
    constructor() {
        this.particles = document.querySelectorAll('.contact-particle');
        this.mouseX = 0;
        this.mouseY = 0;
        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });

        this.animate();
    }

    animate() {
        this.particles.forEach((particle, index) => {
            const speed = 0.0003 * (index + 1);
            const x = Math.sin(Date.now() * speed) * 40;
            const y = Math.cos(Date.now() * speed) * 25;
            const mouseInfluence = Math.sin(Date.now() * 0.001) * 15;
            
            particle.style.transform = `translate(${x + mouseInfluence}px, ${y}px)`;
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Initialize particle system only on larger screens
if (window.innerWidth > 768) {
    new ContactParticleSystem();
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

// Set minimum date for event date input to today
const eventDateInput = document.getElementById('event-date');
if (eventDateInput) {
    const today = new Date().toISOString().split('T')[0];
    eventDateInput.setAttribute('min', today);
}

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

console.log('Contact page loaded with optimized animations!');
