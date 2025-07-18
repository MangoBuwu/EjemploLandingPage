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

// WhatsApp Logo Showcase Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Logo showcase animations
    const logoShowcase = document.querySelector('.whatsapp-logo-showcase');
    if (logoShowcase) {
        const logoObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate logo elements
                    const brandName = entry.target.querySelector('.brand-name');
                    const tagline = entry.target.querySelector('.brand-tagline');
                    const description = entry.target.querySelector('.description-text');
                    const features = entry.target.querySelectorAll('.feature-badge');
                    
                    // Stagger animations
                    setTimeout(() => {
                        if (brandName) {
                            brandName.style.opacity = '1';
                            brandName.style.transform = 'translateY(0)';
                        }
                    }, 200);
                    
                    setTimeout(() => {
                        if (tagline) {
                            tagline.style.opacity = '1';
                            tagline.style.transform = 'translateY(0)';
                        }
                    }, 400);
                    
                    setTimeout(() => {
                        if (description) {
                            description.style.opacity = '1';
                            description.style.transform = 'translateY(0)';
                        }
                    }, 600);
                    
                    // Animate feature badges
                    features.forEach((feature, index) => {
                        setTimeout(() => {
                            feature.style.opacity = '1';
                            feature.style.transform = 'translateY(0)';
                        }, 800 + (index * 100));
                    });
                    
                    logoObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        logoObserver.observe(logoShowcase);
        
        // Initially hide elements for animation
        const animatedElements = logoShowcase.querySelectorAll('.brand-name, .brand-tagline, .description-text, .feature-badge');
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
    }
    
    // Interactive logo effects
    const whatsappIcon = document.querySelector('.whatsapp-icon');
    if (whatsappIcon) {
        whatsappIcon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.15) rotate(10deg)';
            this.style.filter = 'drop-shadow(0 25px 50px rgba(37, 211, 102, 0.4))';
        });
        
        whatsappIcon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.filter = 'drop-shadow(0 20px 40px rgba(37, 211, 102, 0.3))';
        });
        
        // Click effect
        whatsappIcon.addEventListener('click', function() {
            this.style.transform = 'scale(0.95) rotate(-5deg)';
            setTimeout(() => {
                this.style.transform = 'scale(1.1) rotate(5deg)';
            }, 150);
        });
    }
    
    // Parallax effect for floating bubbles
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const bubbles = document.querySelectorAll('.chat-bubble');
        
        bubbles.forEach((bubble, index) => {
            const speed = 0.3 + (index * 0.1);
            const yPos = scrolled * speed;
            bubble.style.transform = `translateY(${yPos}px)`;
        });
    });
    
    // Feature badges hover effects
    const featureBadges = document.querySelectorAll('.feature-badge');
    featureBadges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-6px) scale(1.05)';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // WhatsApp Brand Section Animations
    const brandSection = document.querySelector('.whatsapp-brand-section');
    if (brandSection) {
        const brandObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const logoBrand = entry.target.querySelector('.whatsapp-logo-brand');
                    const brandDescription = entry.target.querySelector('.brand-description');
                    
                    // Animate logo brand
                    setTimeout(() => {
                        if (logoBrand) {
                            logoBrand.style.opacity = '1';
                            logoBrand.style.transform = 'translateY(0) scale(1)';
                        }
                    }, 200);
                    
                    // Animate description
                    setTimeout(() => {
                        if (brandDescription) {
                            brandDescription.style.opacity = '1';
                            brandDescription.style.transform = 'translateY(0)';
                        }
                    }, 600);
                    
                    brandObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        brandObserver.observe(brandSection);
        
        // Initially hide elements
        const logoBrand = brandSection.querySelector('.whatsapp-logo-brand');
        const brandDescription = brandSection.querySelector('.brand-description');
        
        if (logoBrand) {
            logoBrand.style.opacity = '0';
            logoBrand.style.transform = 'translateY(50px) scale(0.9)';
            logoBrand.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        }
        
        if (brandDescription) {
            brandDescription.style.opacity = '0';
            brandDescription.style.transform = 'translateY(30px)';
            brandDescription.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        }
    }
    
    // Interactive logo hover effect
    const logoIcon = document.querySelector('.logo-icon');
    if (logoIcon) {
        logoIcon.addEventListener('mouseenter', function() {
            const svg = this.querySelector('svg');
            if (svg) {
                svg.style.transform = 'scale(1.1)';
                svg.style.filter = 'drop-shadow(0 12px 24px rgba(37, 211, 102, 0.4))';
            }
        });
        
        logoIcon.addEventListener('mouseleave', function() {
            const svg = this.querySelector('svg');
            if (svg) {
                svg.style.transform = 'scale(1)';
                svg.style.filter = 'drop-shadow(0 8px 16px rgba(37, 211, 102, 0.3))';
            }
        });
    }
});