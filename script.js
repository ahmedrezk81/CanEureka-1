// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ===== HERO SLIDER =====
const slides = document.querySelectorAll('.slide');
const dots   = document.querySelectorAll('.dot');
let current  = 0;
let timer    = null;

function goTo(index) {
  slides[current].classList.remove('active');
  dots[current].classList.remove('active');
  current = (index + slides.length) % slides.length;
  slides[current].classList.add('active');
  dots[current].classList.add('active');
  // Restart progress bar
  const hero = document.querySelector('.hero');
  hero.style.animation = 'none';
  void hero.offsetWidth; // reflow
  hero.style.animation = '';
}

function startAuto() {
  clearInterval(timer);
  timer = setInterval(() => goTo(current + 1), 5000);
}

document.getElementById('sliderNext').addEventListener('click', () => {
  goTo(current + 1);
  startAuto();
});
document.getElementById('sliderPrev').addEventListener('click', () => {
  goTo(current - 1);
  startAuto();
});
dots.forEach(dot => {
  dot.addEventListener('click', () => {
    goTo(parseInt(dot.dataset.index));
    startAuto();
  });
});

// Pause on hover
document.querySelector('.hero').addEventListener('mouseenter', () => clearInterval(timer));
document.querySelector('.hero').addEventListener('mouseleave', startAuto);

startAuto();

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll(
  '.feature-card, .vm-card, .service-card, .sector-item, .team-card, .about-text, .about-what, .contact-info, .contact-form'
);
revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => observer.observe(el));

// ===== CONTACT FORM =====
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.textContent = 'Sending…';
  btn.disabled = true;
  setTimeout(() => {
    document.getElementById('form-success').style.display = 'block';
    e.target.reset();
    btn.textContent = 'Send Message';
    btn.disabled = false;
  }, 1200);
}
