// Particle Animation
class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 80;
        this.maxDistance = 150;
        
        this.resize();
        this.init();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    init() {
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1
            });
        }
    }
    
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw particles
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Boundary check
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(0, 245, 255, 0.8)';
            this.ctx.fill();
        });
        
        // Draw connections
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.maxDistance) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    const opacity = 1 - (distance / this.maxDistance);
                    this.ctx.strokeStyle = `rgba(0, 245, 255, ${opacity * 0.3})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            }
        }
    }
    
    animate() {
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize particle system
const canvas = document.getElementById('particles-canvas');
if (canvas) {
    const particleSystem = new ParticleSystem(canvas);
    particleSystem.animate();
}

// Typing Effect
const typingText = document.getElementById('typing-name');
if (typingText) {
    const text = 'Lisa Samanta';
    let index = 0;
    
    function type() {
        if (index < text.length) {
            typingText.textContent += text.charAt(index);
            index++;
            setTimeout(type, 100);
        }
    }
    
    // Start typing after loading screen
    setTimeout(type, 3500);
}

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scroll for navigation links
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate skill bars
            if (entry.target.classList.contains('skill-category')) {
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach(bar => {
                    const progress = bar.getAttribute('data-progress');
                    setTimeout(() => {
                        bar.style.width = progress + '%';
                        bar.classList.add('animated');
                    }, 200);
                });
            }
            
            // Animate stats counter
            if (entry.target.classList.contains('stat-item')) {
                const statNumber = entry.target.querySelector('.stat-number');
                const target = parseInt(statNumber.getAttribute('data-target'));
                let current = 0;
                const increment = target / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        statNumber.textContent = target + '+';
                        clearInterval(timer);
                    } else {
                        statNumber.textContent = Math.floor(current) + '+';
                    }
                }, 30);
            }
        }
    });
}, observerOptions);

// Observe all fade-in elements
const fadeElements = document.querySelectorAll('.fade-in');
fadeElements.forEach(element => observer.observe(element));

// Contact Form Handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.btn-submit');
        const formMessage = document.getElementById('form-message');
        const btnText = submitBtn.querySelector('.btn-text');
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Validation
        if (!name || !email || !message) {
            formMessage.textContent = 'Please fill in all fields.';
            formMessage.className = 'form-message error';
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            formMessage.textContent = 'Please enter a valid email address.';
            formMessage.className = 'form-message error';
            return;
        }
        
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        formMessage.style.display = 'none';
        
        // Simulate form submission (since we can't use actual backend)
        setTimeout(() => {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            
            // Show success message
            formMessage.textContent = 'Message sent successfully! I\'ll get back to you soon.';
            formMessage.className = 'form-message success';
            
            // Reset form
            contactForm.reset();
            
            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }, 2000);
    });
}

// Timeline line animation on scroll
const timelineLine = document.getElementById('timeline-line');
if (timelineLine) {
    window.addEventListener('scroll', () => {
        const timelineSection = document.querySelector('.journey-section');
        if (timelineSection) {
            const rect = timelineSection.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (rect.top < windowHeight && rect.bottom > 0) {
                const scrollPercentage = Math.min(
                    Math.max((windowHeight - rect.top) / (rect.height + windowHeight), 0),
                    1
                );
                timelineLine.style.background = `linear-gradient(180deg, 
                    transparent, 
                    #00f5ff ${scrollPercentage * 100}%, 
                    transparent)`;
            }
        }
    });
}

// Smooth button animations
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('mouseenter', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            transform: scale(0);
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Project card hover effects
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - scrolled / 800;
    }
});

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        document.body.style.animation = 'rainbow 2s linear infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

// Add CSS for rainbow animation
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Log a message for developers
console.log('%c🚀 Welcome to Lisa Samanta\'s Portfolio!', 'color: #0066cc; font-size: 20px; font-weight: bold;');
console.log('%c💻 Full Stack Web Developer | Crafting Beautiful Web Experiences © 2025', 'color: #00d9ff; font-size: 14px;');
console.log('%c🔒 Try the Konami code for a surprise! ↑ ↑ ↓ ↓ ← → ← → B A', 'color: #6b21a8; font-size: 12px;');