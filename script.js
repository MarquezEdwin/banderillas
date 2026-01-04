// ===== MOBILE MENU TOGGLE =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all menu cards
document.querySelectorAll('.menu-card').forEach(card => {
    observer.observe(card);
});

// ===== NAVBAR SCROLL EFFECT =====
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.2)';
    }

    lastScroll = currentScroll;
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
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

// ===== COUNTER ANIMATION =====
const animateCounters = () => {
    const stats = document.querySelectorAll('.stat h4');
    
    const countUp = (element, target, duration = 2000) => {
        let currentCount = 0;
        const increment = target / (duration / 50);
        
        const timer = setInterval(() => {
            currentCount += increment;
            if (currentCount >= target) {
                element.textContent = target + (target === 250 ? '+' : target === 8 ? '' : '%');
                clearInterval(timer);
            } else {
                if (target === 100) {
                    element.textContent = Math.floor(currentCount) + '%';
                } else {
                    element.textContent = Math.floor(currentCount);
                }
            }
        }, 50);
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                const targets = [250, 8, 100];
                entry.target.querySelectorAll('.stat h4').forEach((element, index) => {
                    countUp(element, targets[index]);
                });
                entry.target.classList.add('animated');
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
};

document.addEventListener('DOMContentLoaded', animateCounters);

// ===== NEWSLETTER FORM =====
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]');
        
        if (email.value) {
            // Show success message
            const button = newsletterForm.querySelector('button');
            const originalText = button.textContent;
            button.textContent = '¡Gracias por suscribirte!';
            button.style.background = '#4CAF50';
            
            setTimeout(() => {
                email.value = '';
                button.textContent = originalText;
                button.style.background = '';
            }, 3000);
        }
    });
}

// ===== PARALLAX EFFECT =====
const parallaxElements = document.querySelectorAll('.floating-element');
window.addEventListener('scroll', () => {
    parallaxElements.forEach((element, index) => {
        const scrollPosition = window.pageYOffset;
        const speed = 0.5 - index * 0.1;
        element.style.transform = `translateY(${scrollPosition * speed}px)`;
    });
});

// ===== LAZY LOADING ANIMATION =====
const lazyLoadElements = document.querySelectorAll('.menu-card, .contact-card');
const lazyLoadObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `fadeInUp 0.6s ease-out forwards`;
            entry.target.style.animationDelay = `${index * 0.1}s`;
            lazyLoadObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

lazyLoadElements.forEach(element => lazyLoadObserver.observe(element));

// ===== HOVER EFFECTS FOR SNACKS =====
const snackItems = document.querySelectorAll('.snack-item');
snackItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.animation = 'pulse 0.5s ease-out';
    });
});

// ===== BUTTON RIPPLE EFFECT =====
const buttons = document.querySelectorAll('.btn, .contact-btn');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.width = '0';
        ripple.style.height = '0';
        ripple.style.borderRadius = '50%';
        ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        ripple.style.pointerEvents = 'none';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        const size = Math.max(rect.width, rect.height) * 2;
        const animation = ripple.animate([
            { width: '0px', height: '0px', opacity: 1 },
            { width: size + 'px', height: size + 'px', opacity: 0 }
        ], {
            duration: 600,
            easing: 'ease-out'
        });
        
        animation.onfinish = () => ripple.remove();
    });
});

// ===== PAGE LOAD ANIMATION =====
window.addEventListener('load', () => {
    document.body.style.animation = 'fadeIn 0.5s ease-out';
});

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        navMenu?.classList.remove('active');
        hamburger?.classList.remove('active');
    }
});

// ===== RESPONSIVE MOBILE MENU =====
const mediaQuery = window.matchMedia('(min-width: 769px)');
function handleMediaChange(e) {
    if (e.matches) {
        // Desktop view
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        navMenu?.classList.remove('active');
        hamburger?.classList.remove('active');
    }
}

mediaQuery.addEventListener('change', handleMediaChange);

// ===== SCROLL TO TOP BUTTON =====
const createScrollTopButton = () => {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'scroll-top-btn';
    button.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #E63946 0%, #d32e37 100%);
        color: white;
        border: none;
        cursor: pointer;
        font-size: 1.5rem;
        display: none;
        z-index: 999;
        box-shadow: 0 5px 15px rgba(230, 57, 70, 0.3);
        transition: all 0.3s ease;
        font-weight: bold;
    `;

    document.body.appendChild(button);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.display = 'flex';
            button.style.alignItems = 'center';
            button.style.justifyContent = 'center';
        } else {
            button.style.display = 'none';
        }
    });

    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    button.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });

    button.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
};

document.addEventListener('DOMContentLoaded', createScrollTopButton);

// ===== DARK MODE TOGGLE (OPTIONAL) =====
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
if (prefersDark.matches) {
    document.body.classList.add('dark-mode');
}

console.log('🌮 LULOS Banderillas & Snacks - El mejor sabor hecho banderilla 🌮');
console.log('Bienvenido a nuestra página web. ¡Síguenos en Instagram @banderillaslulos!');
