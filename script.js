// 3D Canvas Background
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Анимированные частицы
let particles = [];
const PARTICLE_COUNT = 80;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.5 + 0.2;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 230, 153, ${this.opacity})`;
        ctx.fill();
    }
}

function initParticles() {
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
    }
}
initParticles();

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#05080f';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}
animateParticles();

// Typing Animation
const words = ['реконструкции школ', 'демонтаже', 'отделке', 'стройке'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedElement = document.getElementById('typed');

function typeEffect() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
        typedElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
        return;
    }
    
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
    }
    
    const speed = isDeleting ? 80 : 120;
    setTimeout(typeEffect, speed);
}
typeEffect();

// Animated Counters
const counters = document.querySelectorAll('.stat-number');
const speed = 200;

const animateCounters = () => {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = parseInt(counter.getAttribute('data-count'));
            const current = parseInt(counter.innerText);
            const increment = target / 50;
            if (current < target) {
                counter.innerText = Math.ceil(current + increment);
                setTimeout(updateCount, 25);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
};

// Trigger counters when in viewport
const observerOptions = { threshold: 0.3, rootMargin: '0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const statsSection = document.querySelector('.stats-section');
if (statsSection) observer.observe(statsSection);

// Плавная прокрутка
document.getElementById('exploreBtn')?.addEventListener('click', () => {
    document.getElementById('vacancies').scrollIntoView({ behavior: 'smooth', block: 'start' });
});
document.getElementById('contactBtnHeader')?.addEventListener('click', () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// Добавляем анимацию при наведении на карточки
const cards = document.querySelectorAll('.job-card, .benefit-card, .stat-card');
cards.forEach(card => {
    card.addEventListener('mouseenter', (e) => {
        card.style.transition = 'all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1)';
    });
});

// Параллакс эффект для эмодзи
document.addEventListener('mousemove', (e) => {
    const emojis = document.querySelectorAll('.floating-emoji');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    emojis.forEach((emoji, i) => {
        const offsetX = (mouseX - 0.5) * 20;
        const offsetY = (mouseY - 0.5) * 20;
        emoji.style.transform = `translate(${offsetX * (i + 1)}px, ${offsetY * (i + 1)}px)`;
    });
});

console.log('🔥 Сайт готов к работе! Добро пожаловать в PROFSTROYTEAM');