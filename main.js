const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    navLinks.classList.contains('open')
      ? (spans[0].style.transform='rotate(45deg) translate(5px,5px)', spans[1].style.opacity='0', spans[2].style.transform='rotate(-45deg) translate(5px,-5px)')
      : (spans[0].style.transform='', spans[1].style.opacity='', spans[2].style.transform='');
  });
}

document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

const sections = document.querySelectorAll('section[id]');
const navAs = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.getAttribute('id');
  });
  navAs.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--accent)' : '';
  });
}

window.addEventListener('scroll', updateActiveNav);
updateActiveNav();

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  observer.observe(el);
});

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
        const w = bar.getAttribute('data-width');
        setTimeout(() => bar.style.width = w, 200);
      });
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.skills-section').forEach(s => skillObserver.observe(s));

function typeWriter(el, text, speed = 80) {
  let i = 0;
  el.textContent = '';
  const timer = setInterval(() => {
    el.textContent += text[i];
    i++;
    if (i >= text.length) clearInterval(timer);
  }, speed);
}

const heroRole = document.getElementById('hero-role');
if (heroRole) {
  setTimeout(() => typeWriter(heroRole, heroRole.getAttribute('data-text')), 800);
}

function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  let current = 0;
  const step = target / 60;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { el.textContent = target + '+'; clearInterval(timer); }
    else el.textContent = Math.floor(current) + '+';
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.counter').forEach(animateCounter);
      counterObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stats-row').forEach(s => counterObserver.observe(s));

document.querySelectorAll('.gallery-img').forEach(img => {
  img.addEventListener('click', () => {
    const lb = document.getElementById('lightbox');
    if (lb) {
      lb.querySelector('img').src = img.src;
      lb.querySelector('.lb-caption').textContent = img.getAttribute('data-caption') || '';
      lb.classList.add('open');
    }
  });
});

document.getElementById('lightbox')?.addEventListener('click', function(e) {
  if (e.target === this || e.target.classList.contains('lb-close')) this.classList.remove('open');
});

const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = form.querySelector('button[type=submit]');
    btn.textContent = 'Message Sent ✓';
    btn.style.background = '#2d9e6b';
    setTimeout(() => { btn.textContent = 'Send Message'; btn.style.background = ''; form.reset(); }, 3000);
  });
}
