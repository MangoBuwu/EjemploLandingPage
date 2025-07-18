// Smooth scrolling for navigation links
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
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Add fade-in animation to elements
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.feature-card, .stat-item, .section-header');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Format number with appropriate suffix
        let displayValue = Math.floor(current);
        if (element.textContent.includes('K')) {
            displayValue = Math.floor(current / 1000) + 'K+';
        } else if (element.textContent.includes('%')) {
            displayValue = (current / 1000 * 99.9).toFixed(1) + '%';
        } else if (element.textContent.includes('/')) {
            displayValue = '24/7';
        }
        
        element.textContent = displayValue;
    }, 16);
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                if (text.includes('50K')) {
                    animateCounter(stat, 50000);
                } else if (text.includes('100K')) {
                    animateCounter(stat, 100000);
                } else if (text.includes('99.9%')) {
                    animateCounter(stat, 999);
                } else if (text.includes('24/7')) {
                    stat.textContent = '24/7';
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// Button hover effects
document.querySelectorAll('.btn-primary, .btn-primary-large, .btn-secondary').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.05)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Floating cards parallax effect
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const cards = document.querySelectorAll('.floating-card');
    
    cards.forEach((card, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        card.style.transform = `translateY(${yPos}px)`;
    });
});

// Add click handlers for CTA buttons
document.querySelectorAll('.btn-primary, .btn-primary-large').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.pointerEvents = 'none';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
        
        // Simulate action
        console.log('Button clicked:', this.textContent.trim());
    });
});

// CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Mobile menu toggle (for future implementation)
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(function() {
    // Scroll-based animations go here
}, 16));

// WhatsApp Chat Functionality
document.addEventListener('DOMContentLoaded', function() {
    const chatInput = document.querySelector('.chat-input input');
    const sendBtn = document.querySelector('.send-btn');
    const chatMessages = document.querySelector('.chat-messages');
    
    // Auto-scroll chat messages
    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Simulate new message arrival
    function addMessage(text, isReceived = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isReceived ? 'received' : 'sent'}`;
        
        const currentTime = new Date().toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit'
        });
        
        messageDiv.innerHTML = `
            <div class="message-bubble">${text}</div>
            <div class="message-time">${currentTime}</div>
        `;
        
        // Remove typing indicator if it exists
        const typingIndicator = chatMessages.querySelector('.typing-indicator');
        if (typingIndicator && isReceived) {
            typingIndicator.remove();
        }
        
        chatMessages.appendChild(messageDiv);
        scrollToBottom();
    }
    
    // Show typing indicator
    function showTypingIndicator() {
        const existingIndicator = chatMessages.querySelector('.typing-indicator');
        if (existingIndicator) return;
        
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.innerHTML = `
            <div class="typing-bubble">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        
        chatMessages.appendChild(typingDiv);
        scrollToBottom();
    }
    
    // Auto-responses
    const responses = [
        "¡Excelente! Te ayudo con eso. ¿Necesitas alguna funcionalidad específica? 🤔",
        "¡Genial! Puedo ayudarte a crear algo increíble. ¿Tienes algún diseño en mente? 🎨",
        "¡Perfecto! Vamos a crear algo extraordinario juntos. ¿Empezamos? 🚀",
        "¡Fantástico! Te guiaré paso a paso. ¿Qué te parece si comenzamos con el diseño? ✨",
        "¡Increíble! Tengo muchas ideas para tu proyecto. ¿Quieres que te muestre algunas opciones? 💡"
    ];
    
    function getRandomResponse() {
        return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // Send message function
    function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;
        
        // Add user message
        addMessage(message, false);
        chatInput.value = '';
        
        // Show typing indicator
        setTimeout(() => {
            showTypingIndicator();
        }, 500);
        
        // Add bot response
        setTimeout(() => {
            addMessage(getRandomResponse(), true);
        }, 1500 + Math.random() * 1000);
    }
    
    // Event listeners
    if (sendBtn) {
        sendBtn.addEventListener('click', sendMessage);
    }
    
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
        
        // Focus effect
        chatInput.addEventListener('focus', function() {
            this.parentElement.style.boxShadow = '0 0 0 2px rgba(37, 211, 102, 0.2)';
        });
        
        chatInput.addEventListener('blur', function() {
            this.parentElement.style.boxShadow = 'none';
        });
    }
    
    // Initial scroll to bottom
    setTimeout(scrollToBottom, 100);
    
    // Animate messages on scroll into view
    const whatsappSection = document.querySelector('.whatsapp-section');
    if (whatsappSection) {
        const whatsappObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const messages = entry.target.querySelectorAll('.message');
                    messages.forEach((message, index) => {
                        setTimeout(() => {
                            message.style.opacity = '1';
                            message.style.transform = 'translateY(0)';
                        }, index * 200);
                    });
                    whatsappObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        whatsappObserver.observe(whatsappSection);
        
        // Initially hide messages for animation
        const messages = whatsappSection.querySelectorAll('.message');
        messages.forEach(message => {
            message.style.opacity = '0';
            message.style.transform = 'translateY(20px)';
            message.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
    }
});