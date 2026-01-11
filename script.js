// ===== LOADER =====
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
        // Start animations after loader
        startHeroAnimations();
    }, 1800);
});

// ===== TYPING ANIMATION =====
class TypingAnimation {
    constructor(element, words, options = {}) {
        this.element = element;
        this.words = words;
        this.typeSpeed = options.typeSpeed || 80;
        this.deleteSpeed = options.deleteSpeed || 50;
        this.pauseTime = options.pauseTime || 2000;
        this.wordIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.start();
    }

    start() {
        this.type();
    }

    type() {
        const currentWord = this.words[this.wordIndex];
        
        if (this.isDeleting) {
            this.element.textContent = currentWord.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentWord.substring(0, this.charIndex + 1);
            this.charIndex++;
        }

        let delay = this.isDeleting ? this.deleteSpeed : this.typeSpeed;

        if (!this.isDeleting && this.charIndex === currentWord.length) {
            delay = this.pauseTime;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.wordIndex = (this.wordIndex + 1) % this.words.length;
            delay = 500;
        }

        setTimeout(() => this.type(), delay);
    }
}

// ===== COUNTER ANIMATION =====
function animateCounters() {
    const stats = document.querySelectorAll('.stat');
    
    stats.forEach(stat => {
        const valueElement = stat.querySelector('.stat-value');
        const targetValue = parseInt(stat.dataset.value);
        const duration = 2000;
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.floor(easeOutQuart * targetValue);
            
            // Format large numbers
            if (targetValue >= 1000) {
                valueElement.textContent = (currentValue / 1000).toFixed(currentValue >= 10000 ? 0 : 1) + 'K';
            } else {
                valueElement.textContent = currentValue;
            }
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                // Final value
                if (targetValue >= 1000) {
                    valueElement.textContent = (targetValue / 1000).toFixed(targetValue >= 10000 ? 0 : 1) + 'K';
                } else {
                    valueElement.textContent = targetValue;
                }
            }
        }
        
        requestAnimationFrame(updateCounter);
    });
}

// ===== START HERO ANIMATIONS =====
function startHeroAnimations() {
    // Start typing animation
    const typingElement = document.getElementById('typing-text');
    if (typingElement) {
        new TypingAnimation(typingElement, [
            'AI Systems at Scale',
            'Enterprise Data Pipelines',
            'Agentic AI Platforms',
            'LLM & RAG Architectures',
            'High-Throughput Systems',
            'ML Infrastructure'
        ]);
    }
    
    // Start counter animation after a delay
    setTimeout(animateCounters, 500);
}

// ===== NEURAL NETWORK CANVAS ANIMATION =====
class NeuralCanvas {
    constructor() {
        this.canvas = document.getElementById('neural-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.nodes = [];
        this.connections = [];
        this.mouse = { x: null, y: null };
        this.nodeCount = 80;
        this.connectionDistance = 150;
        this.mouseInfluenceRadius = 200;
        
        this.colors = {
            node: 'rgba(245, 158, 11, 0.6)',
            nodeHover: 'rgba(245, 158, 11, 1)',
            connection: 'rgba(20, 184, 166, 0.15)',
            connectionActive: 'rgba(245, 158, 11, 0.3)'
        };
        
        this.init();
    }
    
    init() {
        this.resize();
        this.createNodes();
        this.bindEvents();
        this.animate();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createNodes() {
        this.nodes = [];
        for (let i = 0; i < this.nodeCount; i++) {
            this.nodes.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1,
                originalRadius: Math.random() * 2 + 1
            });
        }
    }
    
    bindEvents() {
        window.addEventListener('resize', () => {
            this.resize();
            this.createNodes();
        });
        
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
        
        window.addEventListener('mouseout', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
    }
    
    updateNodes() {
        this.nodes.forEach(node => {
            // Update position
            node.x += node.vx;
            node.y += node.vy;
            
            // Bounce off edges
            if (node.x < 0 || node.x > this.canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > this.canvas.height) node.vy *= -1;
            
            // Keep in bounds
            node.x = Math.max(0, Math.min(this.canvas.width, node.x));
            node.y = Math.max(0, Math.min(this.canvas.height, node.y));
            
            // Mouse influence
            if (this.mouse.x !== null && this.mouse.y !== null) {
                const dx = node.x - this.mouse.x;
                const dy = node.y - this.mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < this.mouseInfluenceRadius) {
                    const force = (this.mouseInfluenceRadius - dist) / this.mouseInfluenceRadius;
                    node.radius = node.originalRadius + force * 3;
                    
                    // Gentle repulsion
                    node.x += dx * force * 0.02;
                    node.y += dy * force * 0.02;
                } else {
                    node.radius = node.originalRadius;
                }
            } else {
                node.radius = node.originalRadius;
            }
        });
    }
    
    drawConnections() {
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const nodeA = this.nodes[i];
                const nodeB = this.nodes[j];
                const dx = nodeB.x - nodeA.x;
                const dy = nodeB.y - nodeA.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < this.connectionDistance) {
                    const opacity = 1 - (dist / this.connectionDistance);
                    
                    // Check if connection is near mouse
                    let color = this.colors.connection;
                    if (this.mouse.x !== null && this.mouse.y !== null) {
                        const midX = (nodeA.x + nodeB.x) / 2;
                        const midY = (nodeA.y + nodeB.y) / 2;
                        const mouseDist = Math.sqrt(
                            Math.pow(midX - this.mouse.x, 2) + 
                            Math.pow(midY - this.mouse.y, 2)
                        );
                        if (mouseDist < this.mouseInfluenceRadius) {
                            color = this.colors.connectionActive;
                        }
                    }
                    
                    this.ctx.beginPath();
                    this.ctx.moveTo(nodeA.x, nodeA.y);
                    this.ctx.lineTo(nodeB.x, nodeB.y);
                    this.ctx.strokeStyle = color.replace('0.15', (opacity * 0.15).toFixed(2))
                                                 .replace('0.3', (opacity * 0.3).toFixed(2));
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            }
        }
    }
    
    drawNodes() {
        this.nodes.forEach(node => {
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            
            // Glow effect for larger nodes (near mouse)
            if (node.radius > node.originalRadius + 1) {
                const gradient = this.ctx.createRadialGradient(
                    node.x, node.y, 0,
                    node.x, node.y, node.radius * 2
                );
                gradient.addColorStop(0, this.colors.nodeHover);
                gradient.addColorStop(1, 'transparent');
                this.ctx.fillStyle = gradient;
            } else {
                this.ctx.fillStyle = this.colors.node;
            }
            
            this.ctx.fill();
        });
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.updateNodes();
        this.drawConnections();
        this.drawNodes();
        requestAnimationFrame(() => this.animate());
    }
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// ===== INTERSECTION OBSERVER FOR SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe sections
document.querySelectorAll('section').forEach(section => {
    section.classList.add('scroll-animate');
    animateOnScroll.observe(section);
});

// Observe project cards with stagger
document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
    card.classList.add('scroll-animate');
    animateOnScroll.observe(card);
});

// Observe skill categories with stagger
document.querySelectorAll('.skill-category').forEach((category, index) => {
    category.style.transitionDelay = `${index * 0.1}s`;
    category.classList.add('scroll-animate');
    animateOnScroll.observe(category);
});

// Observe timeline items with stagger
document.querySelectorAll('.timeline-item').forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.15}s`;
    item.classList.add('scroll-animate');
    animateOnScroll.observe(item);
});

// ===== NAV BACKGROUND ON SCROLL =====
const nav = document.querySelector('.nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.style.background = 'rgba(10, 11, 15, 0.95)';
    } else {
        nav.style.background = 'linear-gradient(to bottom, rgba(10, 11, 15, 1), transparent)';
    }
    
    lastScroll = currentScroll;
});

// ===== PARALLAX EFFECT FOR HERO =====
const heroContent = document.querySelector('.hero-content');
const heroVisual = document.querySelector('.hero-visual');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * 0.3;
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${rate}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
    }
    if (heroVisual && scrolled < window.innerHeight) {
        heroVisual.style.transform = `translateY(${rate * 0.5}px)`;
        heroVisual.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// ===== ACTIVE NAV LINK HIGHLIGHTING =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize neural canvas
    new NeuralCanvas();
    
    // Add scroll animation styles
    const style = document.createElement('style');
    style.textContent = `
        .scroll-animate {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .scroll-animate.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .nav-link.active {
            color: var(--accent-primary);
        }
        
        .nav-link.active::after {
            width: 100%;
        }
    `;
    document.head.appendChild(style);
    
    // Cursor glow effect
    const cursor = document.createElement('div');
    cursor.className = 'cursor-glow';
    cursor.style.cssText = `
        position: fixed;
        width: 400px;
        height: 400px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(245, 158, 11, 0.05) 0%, transparent 70%);
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: opacity 0.3s;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
});

// ===== EASTER EGG: KONAMI CODE =====
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            // Trigger rainbow mode
            document.body.style.transition = 'filter 0.5s';
            document.body.style.filter = 'hue-rotate(90deg)';
            setTimeout(() => {
                document.body.style.filter = 'hue-rotate(180deg)';
            }, 500);
            setTimeout(() => {
                document.body.style.filter = 'hue-rotate(270deg)';
            }, 1000);
            setTimeout(() => {
                document.body.style.filter = 'none';
            }, 1500);
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

console.log('%c👋 Hey there, curious developer!', 'font-size: 20px; font-weight: bold; color: #f59e0b;');
console.log('%cBuilt with passion by Sadashiv Raj Bharadwaj', 'font-size: 14px; color: #14b8a6;');
console.log('%cTry the Konami code for a surprise 🎮', 'font-size: 12px; color: #9ca3af;');
