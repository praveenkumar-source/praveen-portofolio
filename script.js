// ===== CUSTOM CURSOR =====
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  follower.style.left = followerX + 'px';
  follower.style.top = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

document.querySelectorAll('a, button, .skill-card, .cert-card, .contact-card, .tl-card, .interp-card').forEach(el => {
  el.addEventListener('mouseenter', () => follower.classList.add('active'));
  el.addEventListener('mouseleave', () => follower.classList.remove('active'));
});

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== INTERSECTION OBSERVER (reveal & skill bars) =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
        if (entry.target.classList.contains('skill-card')) {
          entry.target.classList.add('in-view');
        }
      }, i * 100);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== ACTIVE NAV HIGHLIGHT =====
const sections = document.querySelectorAll('section[id]');
const navA = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navA.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === '#' + entry.target.id) {
          a.style.color = 'var(--accent)';
        } else {
          a.style.color = '';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// ===== TYPING EFFECT for hero sub =====
const heroSub = document.querySelector('.hero-sub');
const originalText = heroSub.textContent;
heroSub.textContent = '';
let charIndex = 0;

function typeChar() {
  if (charIndex < originalText.length) {
    heroSub.textContent += originalText[charIndex];
    charIndex++;
    setTimeout(typeChar, 28);
  }
}
setTimeout(typeChar, 900);

// ===== GLITCH EFFECT on name hover =====
const heroName = document.querySelector('.hero-name');
let glitching = false;

heroName.addEventListener('mouseenter', () => {
  if (glitching) return;
  glitching = true;
  heroName.style.animation = 'none';

  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*';
  const originalHTML = heroName.innerHTML;
  const textNodes = [];
  heroName.querySelectorAll('span.accent').forEach(s => s.setAttribute('data-original', s.textContent));

  let count = 0;
  const interval = setInterval(() => {
    if (count > 8) {
      clearInterval(interval);
      heroName.innerHTML = originalHTML;
      glitching = false;
      return;
    }
    count++;
    // subtle random char flicker in accent span
    heroName.querySelectorAll('span.accent').forEach(s => {
      if (Math.random() > 0.5) {
        const orig = s.getAttribute('data-original');
        if (orig) {
          const scrambled = orig.split('').map(c =>
            Math.random() > 0.6 ? chars[Math.floor(Math.random() * chars.length)] : c
          ).join('');
          s.textContent = scrambled;
          setTimeout(() => { s.textContent = orig; }, 80);
        }
      }
    });
  }, 60);
});

// ===== PARALLAX on hero visual =====
document.addEventListener('mousemove', (e) => {
  const visual = document.querySelector('.hero-visual');
  if (!visual) return;
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  const dx = (e.clientX - cx) / cx;
  const dy = (e.clientY - cy) / cy;
  visual.style.transform = `translate(${dx * 12}px, ${dy * 12}px)`;
});

// ===== COUNTER ANIMATION =====
function animateCounter(el, target, duration = 1200) {
  let start = 0;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    el.textContent = (progress * target).toFixed(target % 1 !== 0 ? 2 : 0);
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

// ===== SMOOTH SCROLL for anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== ADD STAGGER DELAY to grid cards =====
document.querySelectorAll('.skills-grid .skill-card, .certs-grid .cert-card, .contact-grid .contact-card').forEach((card, i) => {
  card.style.transitionDelay = (i * 0.08) + 's';
});