// Gallery Page Specific JavaScript - Optimized Animations

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

// Gallery Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        // Filter gallery items with animation
        galleryItems.forEach((item, index) => {
            const category = item.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                // Show item with animation
                setTimeout(() => {
                    item.style.display = 'block';
                    item.style.animation = 'gallery-item-appear 0.8s ease-out forwards';
                }, index * 50);
            } else {
                // Hide item
                item.style.animation = 'gallery-item-disappear 0.4s ease-out forwards';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 400);
            }
        });
    });
});

// Add disappear animation
const style = document.createElement('style');
style.textContent = `
    @keyframes gallery-item-disappear {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-50px) scale(0.8);
        }
    }
`;
document.head.appendChild(style);

// Gallery Items Animation on Scroll
const galleryObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.gallery-item');
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.style.animation = 'gallery-item-appear 0.8s ease-out forwards';
                }, index * 100);
            });
            galleryObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe gallery grid
const galleryGrid = document.querySelector('.gallery-grid');
if (galleryGrid) {
    galleryObserver.observe(galleryGrid);
}

// Featured Slider
const slides = document.querySelectorAll('.featured-slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
            // Reset animations for content
            const content = slide.querySelector('.featured-content');
            const h3 = content.querySelector('h3');
            const p = content.querySelector('p');
            const stats = content.querySelector('.featured-stats');
            
            h3.style.animation = 'none';
            p.style.animation = 'none';
            stats.style.animation = 'none';
            
            setTimeout(() => {
                h3.style.animation = 'content-slide-up 0.8s ease-out 0.3s forwards';
                p.style.animation = 'content-slide-up 0.8s ease-out 0.5s forwards';
                stats.style.animation = 'content-slide-up 0.8s ease-out 0.7s forwards';
            }, 100);
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // Auto-play slider
    setInterval(nextSlide, 5000);
}

// Initialize first slide
if (slides.length > 0) {
    showSlide(0);
}

// Gallery Lightbox
galleryItems.forEach(item => {
    item.addEventListener('click', function() {
        const img = this.querySelector('img');
        const overlay = this.querySelector('.gallery-overlay');
        const title = overlay.querySelector('h4').textContent;
        const description = overlay.querySelector('p').textContent;
        
        createLightbox(img.src, title, description);
    });
});

function createLightbox(src, title, description) {
    // Remove existing lightbox
    const existingLightbox = document.querySelector('.lightbox');
    if (existingLightbox) {
        existingLightbox.remove();
    }
    
    // Create lightbox
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <button class="lightbox-close">&times;</button>
            <img src="${src}" alt="${title}">
            <div class="lightbox-info">
                <h3>${title}</h3>
                <p>${description}</p>
            </div>
        </div>
    `;
    
    // Add styles
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    const content = lightbox.querySelector('.lightbox-content');
    content.style.cssText = `
        position: relative;
        max-width: 90%;
        max-height: 90%;
        animation: zoomIn 0.3s ease;
    `;
    
    const img = lightbox.querySelector('img');
    img.style.cssText = `
        width: 100%;
        height: auto;
        border-radius: 10px;
    `;
    
    const info = lightbox.querySelector('.lightbox-info');
    info.style.cssText = `
        background: white;
        padding: 1.5rem;
        border-radius: 0 0 10px 10px;
        text-align: center;
    `;
    
    const closeBtn = lightbox.querySelector('.lightbox-close');
    closeBtn.style.cssText = `
        position: absolute;
        top: -40px;
        right: 0;
        background: none;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        transition: transform 0.3s ease;
    `;
    
    closeBtn.addEventListener('click', () => lightbox.remove());
    closeBtn.addEventListener('mouseenter', () => closeBtn.style.transform = 'scale(1.2)');
    closeBtn.addEventListener('mouseleave', () => closeBtn.style.transform = 'scale(1)');
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.remove();
        }
    });
    
    document.body.appendChild(lightbox);
}

// Add lightbox animations
const lightboxStyle = document.createElement('style');
lightboxStyle.textContent = `
    @keyframes zoomIn {
        from {
            transform: scale(0.8);
            opacity: 0;
        }
        to {
            transform: scale(1);
            opacity: 1;
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;
document.head.appendChild(lightboxStyle);

// Gallery Stats Counter
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

// Observe stats section
const statsGrid = document.querySelector('.stats-grid');
if (statsGrid) {
    statsObserver.observe(statsGrid);
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const duration = 2000; // 2 seconds
    const stepTime = duration / 100;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current).toLocaleString();
            setTimeout(updateCounter, stepTime);
        } else {
            element.textContent = target.toLocaleString();
        }
    };

    updateCounter();
}

// Featured Events Animation on Scroll
const featuredObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const slide = entry.target.querySelector('.featured-slide.active');
            if (slide) {
                const content = slide.querySelector('.featured-content');
                const h3 = content.querySelector('h3');
                const p = content.querySelector('p');
                const stats = content.querySelector('.featured-stats');
                
                h3.style.animation = 'content-slide-up 0.8s ease-out 0.3s forwards';
                p.style.animation = 'content-slide-up 0.8s ease-out 0.5s forwards';
                stats.style.animation = 'content-slide-up 0.8s ease-out 0.7s forwards';
            }
            featuredObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.3
});

// Observe featured slider
const featuredSlider = document.querySelector('.featured-slider');
if (featuredSlider) {
    featuredObserver.observe(featuredSlider);
}

// Newsletter Form
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showNotification('Successfully subscribed to gallery updates!', 'success');
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

// Dynamic Background Shapes Animation
class ShapeAnimation {
    constructor() {
        this.shapes = document.querySelectorAll('.gallery-shape');
        this.init();
    }

    init() {
        this.shapes.forEach((shape, index) => {
            this.animateShape(shape, index);
        });
    }

    animateShape(shape, index) {
        const duration = 20000 + (index * 2000);
        const delay = index * 1000;
        
        setTimeout(() => {
            setInterval(() => {
                const randomX = Math.random() * 100 - 50;
                const randomY = Math.random() * 100 - 50;
                const randomRotate = Math.random() * 360;
                const randomScale = 0.8 + Math.random() * 0.4;
                
                shape.style.transition = 'transform 10s ease-in-out';
                shape.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg) scale(${randomScale})`;
            }, duration);
        }, delay);
    }
}

// Initialize shape animation only on larger screens
if (window.innerWidth > 768) {
    new ShapeAnimation();
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

console.log('Gallery page loaded with optimized animations!');
