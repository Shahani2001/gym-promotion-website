// Smooth scroll for nav links
document.querySelectorAll('a[href^=\"#\"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Dark mode toggle
const darkToggle = document.getElementById('dark-toggle');
darkToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const icon = darkToggle.querySelector('i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
});

// Contact form
const form = document.getElementById('inquiry-form');
const successMsg = document.getElementById('form-success');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Validation
    if (!name || !email || !message) {
        alert('Please fill all fields.');
        return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter valid email.');
        return;
    }
    
    // Success
    form.style.display = 'none';
    successMsg.style.display = 'block';
    
    // Reset for demo
    setTimeout(() => {
        form.reset();
        form.style.display = 'block';
        successMsg.style.display = 'none';
    }, 3000);
});

// Hero stats counter animation
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const count = parseInt(stat.textContent) || 0;
        if (count < target) {
            stat.textContent = count + Math.ceil((target - count) / 10);
            setTimeout(animateStats, 30);
        } else {
            stat.textContent = target;
        }
    });
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.7 });

if (document.querySelector('.hero-stats')) {
    statsObserver.observe(document.querySelector('.hero-stats'));
}

// Hero image parallax
function parallaxHero() {
    const scrolled = window.pageYOffset;
    const heroImg = document.querySelector('.hero-img');
    if (heroImg) {
        heroImg.style.transform = `translateY(${scrolled * 0.4}px)`;
    }
}
window.addEventListener('scroll', parallaxHero);

// Testimonial rotation
let testimonialIndex = 0;
const testimonials = [
    { text: '"Transformed my fitness in weeks! Best gym around."', author: '- Happy Member' },
    { text: '"Expert trainers and great equipment!"', author: '- John D.' },
    { text: '"Love the 24/7 access!"', author: '- Sarah K.' }
];

function rotateTestimonial() {
    const testimonialEl = document.querySelector('.hero-testimonial p');
    const citeEl = document.querySelector('.hero-testimonial cite');
    if (testimonialEl && citeEl) {
        testimonialEl.textContent = testimonials[testimonialIndex].text;
        citeEl.textContent = testimonials[testimonialIndex].author;
        testimonialIndex = (testimonialIndex + 1) % testimonials.length;
    }
}
setInterval(rotateTestimonial, 4000);

// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
});

document.querySelectorAll('.service-card, .trainer-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s, transform 0.6s';
    observer.observe(el);
});
