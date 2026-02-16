// Minimal JavaScript - Only for Form Functionality

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Contact Form Validation
const eventForm = document.getElementById('eventForm');
if (eventForm) {
    eventForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            showNotification('Event request submitted successfully! We will contact you within 24 hours.', 'success');
            eventForm.reset();
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

// Simple Notification System
function showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
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
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Set minimum date for event date input to today
const eventDateInput = document.getElementById('event-date');
if (eventDateInput) {
    const today = new Date().toISOString().split('T')[0];
    eventDateInput.setAttribute('min', today);
}

console.log('Contact page loaded with minimal JavaScript!');
