// Events Page Specific JavaScript - Optimized Animations

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

// Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const eventItems = document.querySelectorAll('.event-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        // Filter events with animation
        eventItems.forEach((item, index) => {
            const category = item.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                // Show item with animation
                setTimeout(() => {
                    item.style.display = 'flex';
                    item.style.animation = 'event-slide-in 0.8s ease-out forwards';
                }, index * 100);
            } else {
                // Hide item
                item.style.animation = 'event-slide-out 0.4s ease-out forwards';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 400);
            }
        });
    });
});

// Add slide out animation
const style = document.createElement('style');
style.textContent = `
    @keyframes event-slide-out {
        0% {
            opacity: 1;
            transform: translateX(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateX(-100px) scale(0.8);
        }
    }
`;
document.head.appendChild(style);

// Events Animation on Scroll
const eventObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const eventItems = entry.target.querySelectorAll('.event-item');
            eventItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.animation = 'event-slide-in 0.8s ease-out forwards';
                }, index * 200);
            });
            eventObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe events timeline
const eventsTimeline = document.querySelector('.events-timeline');
if (eventsTimeline) {
    eventObserver.observe(eventsTimeline);
}

// Past Events Animation
const pastEventsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const pastEvents = entry.target.querySelectorAll('.past-event-card');
            pastEvents.forEach((event, index) => {
                setTimeout(() => {
                    event.style.animation = 'past-event-appear 0.8s ease-out forwards';
                }, index * 200);
            });
            pastEventsObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2
});

// Observe past events
const pastEventsGrid = document.querySelector('.past-events-grid');
if (pastEventsGrid) {
    pastEventsObserver.observe(pastEventsGrid);
}

// Countdown Timer
function updateCountdown() {
    const eventDate = new Date('March 15, 2024 18:00:00').getTime();
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    } else {
        document.querySelector('.next-event-name').textContent = 'Event has started!';
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
    }
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call

// Countdown Animation on Scroll
const countdownObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const countdownItems = entry.target.querySelectorAll('.countdown-item');
            countdownItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.animation = 'countdown-pop 0.8s ease-out forwards';
                }, index * 200);
            });
            countdownObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

// Observe countdown section
const countdownSection = document.querySelector('.countdown-section');
if (countdownSection) {
    countdownObserver.observe(countdownSection);
}

// Interactive Event Cards
document.querySelectorAll('.event-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(10px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0) scale(1)';
    });
});

// Past Events Hover Effects
document.querySelectorAll('.past-event-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.05)';
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
            showNotification('Successfully subscribed to event updates!', 'success');
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

// Dynamic Particle System
class EventParticleSystem {
    constructor() {
        this.particles = document.querySelectorAll('.event-particle');
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
            const speed = 0.0005 * (index + 1);
            const x = Math.sin(Date.now() * speed) * 30;
            const y = Math.cos(Date.now() * speed) * 20;
            const mouseInfluence = Math.sin(Date.now() * 0.001) * 10;
            
            particle.style.transform = `translate(${x + mouseInfluence}px, ${y}px)`;
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Initialize particle system only on larger screens
if (window.innerWidth > 768) {
    new EventParticleSystem();
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

console.log('Events page loaded with optimized animations!');
