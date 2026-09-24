/**
 * script.js – Portfolio Lưu Thanh Lâm
 *
 * FEATURES:
 * 1. Hamburger menu (classList.toggle)
 * 2. Dark / Light mode (CSS variables via body class)
 * 3. Project search/filter (keyword search across title/desc/tags)
 * 4. Contact form validation (trim, regex, nhiều điều kiện)
 * 5. Character counter (textarea 0/300)
 * 6. Current year in footer (Date API)
 * BONUS: Scroll reveal (IntersectionObserver) – optional polish
 * BONUS: Header shrink on scroll + active nav highlight
 */

'use strict';

/* ──────────────────────────────────────────────────
   DOM REFERENCES
────────────────────────────────────────────────── */
const hamburger     = document.getElementById('hamburger');
const nav           = document.getElementById('nav');
const themeToggle   = document.getElementById('theme-toggle');
const header        = document.getElementById('header');

const projectSearch = document.getElementById('project-search');
const searchClear   = document.getElementById('search-clear');
const projectsGrid  = document.getElementById('projects-grid');
const projectsEmpty = document.getElementById('projects-empty');
const clearSearchBtn= document.getElementById('clear-search-btn');
const projectCount  = document.getElementById('project-count');

const contactForm   = document.getElementById('contact-form');
const nameInput     = document.getElementById('name');
const emailInput    = document.getElementById('email');
const messageInput  = document.getElementById('message');
const charCounter   = document.getElementById('char-counter');
const formSuccess   = document.getElementById('form-success');

const currentYearEl = document.getElementById('current-year');
const navLinks      = document.querySelectorAll('.nav-link');
const sections      = document.querySelectorAll('section[id]');
const revealEls     = document.querySelectorAll('.reveal');

/* ──────────────────────────────────────────────────
   FEATURE 1: HAMBURGER MENU
────────────────────────────────────────────────── */
function toggleMenu() {
  const isOpen = nav.classList.toggle('open');
  hamburger.classList.toggle('active', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
  hamburger.setAttribute('aria-label', isOpen ? 'Đóng menu' : 'Mở menu');
}

function closeMenu() {
  nav.classList.remove('open');
  hamburger.classList.remove('active');
  hamburger.setAttribute('aria-expanded', 'false');
  hamburger.setAttribute('aria-label', 'Mở menu');
}

hamburger.addEventListener('click', toggleMenu);

// Đóng menu khi click nav link (mobile)
navLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Đóng menu khi click bên ngoài
document.addEventListener('click', function (e) {
  if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
    closeMenu();
  }
});

/* ──────────────────────────────────────────────────
   FEATURE 2: DARK / LIGHT MODE
────────────────────────────────────────────────── */
function toggleTheme() {
  document.body.classList.toggle('dark-mode');
}

themeToggle.addEventListener('click', toggleTheme);

/* ──────────────────────────────────────────────────
   FEATURE 3: PROJECT SEARCH / FILTER
────────────────────────────────────────────────── */
const allProjectCards = Array.from(projectsGrid.querySelectorAll('.project-card'));

function filterProjects() {
  const keyword = projectSearch.value.trim().toLowerCase();
  let visibleCount = 0;

  allProjectCards.forEach(card => {
    const title = card.querySelector('.project-title').textContent.toLowerCase();
    const desc  = card.querySelector('.project-desc').textContent.toLowerCase();
    const tags  = (card.dataset.tags || '').toLowerCase();

    const matches = !keyword ||
      title.includes(keyword) ||
      desc.includes(keyword)  ||
      tags.includes(keyword);

    card.style.display = matches ? '' : 'none';
    if (matches) visibleCount++;
  });

  // Cập nhật bộ đếm
  projectCount.textContent = `${visibleCount} dự án`;

  // Empty state
  if (visibleCount === 0) {
    projectsEmpty.removeAttribute('hidden');
    projectsGrid.style.display = 'none';
  } else {
    projectsEmpty.setAttribute('hidden', '');
    projectsGrid.style.display = '';
  }

  // Nút xóa tìm kiếm
  if (keyword) {
    searchClear.removeAttribute('hidden');
  } else {
    searchClear.setAttribute('hidden', '');
  }
}

function clearSearch() {
  projectSearch.value = '';
  filterProjects();
  projectSearch.focus();
}

projectSearch.addEventListener('input', filterProjects);
searchClear.addEventListener('click', clearSearch);
clearSearchBtn.addEventListener('click', clearSearch);

/* ──────────────────────────────────────────────────
   FEATURE 4: CONTACT FORM VALIDATION
────────────────────────────────────────────────── */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function showError(inputEl, errorId, message) {
  const errorEl = document.getElementById(errorId);
  errorEl.textContent = message;
  inputEl.classList.add('error');
  inputEl.classList.remove('valid');
}

function clearError(inputEl, errorId) {
  const errorEl = document.getElementById(errorId);
  errorEl.textContent = '';
  inputEl.classList.remove('error');
}

function markValid(inputEl) {
  inputEl.classList.add('valid');
  inputEl.classList.remove('error');
}

function validateName() {
  const val = nameInput.value.trim();
  if (!val) {
    showError(nameInput, 'name-error', 'Vui lòng nhập họ và tên.');
    return false;
  }
  clearError(nameInput, 'name-error');
  markValid(nameInput);
  return true;
}

function validateEmail() {
  const val = emailInput.value.trim();
  if (!val) {
    showError(emailInput, 'email-error', 'Vui lòng nhập địa chỉ email.');
    return false;
  }
  if (!emailRegex.test(val)) {
    showError(emailInput, 'email-error', 'Địa chỉ email không hợp lệ.');
    return false;
  }
  clearError(emailInput, 'email-error');
  markValid(emailInput);
  return true;
}

function validateMessage() {
  const val = messageInput.value.trim();
  if (!val) {
    showError(messageInput, 'message-error', 'Vui lòng nhập nội dung tin nhắn.');
    return false;
  }
  if (val.length < 10) {
    showError(messageInput, 'message-error', 'Nội dung phải có ít nhất 10 ký tự.');
    return false;
  }
  clearError(messageInput, 'message-error');
  markValid(messageInput);
  return true;
}

// Xóa lỗi khi người dùng sửa field
nameInput.addEventListener('input',    () => { if (nameInput.classList.contains('error'))    validateName(); });
emailInput.addEventListener('input',   () => { if (emailInput.classList.contains('error'))   validateEmail(); });
messageInput.addEventListener('input', () => { if (messageInput.classList.contains('error')) validateMessage(); });

contactForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const nameOk    = validateName();
  const emailOk   = validateEmail();
  const messageOk = validateMessage();

  if (!nameOk || !emailOk || !messageOk) return;

  // Thành công
  formSuccess.removeAttribute('hidden');

  // Reset sau 3s
  setTimeout(() => {
    contactForm.reset();
    [nameInput, emailInput, messageInput].forEach(el => {
      el.classList.remove('valid', 'error');
    });
    updateCharCount();
    formSuccess.setAttribute('hidden', '');
  }, 3500);
});

/* ──────────────────────────────────────────────────
   FEATURE 5: CHARACTER COUNTER
────────────────────────────────────────────────── */
const MAX_CHARS = 300;

function updateCharCount() {
  const len = messageInput.value.length;
  charCounter.textContent = `${len} / ${MAX_CHARS} ký tự`;

  charCounter.classList.remove('warning', 'danger');
  if (len >= MAX_CHARS * 0.9) {
    charCounter.classList.add('danger');
  } else if (len >= MAX_CHARS * 0.7) {
    charCounter.classList.add('warning');
  }
}

messageInput.addEventListener('input', updateCharCount);
updateCharCount(); // khởi tạo

/* ──────────────────────────────────────────────────
   FEATURE 6: CURRENT YEAR IN FOOTER
────────────────────────────────────────────────── */
currentYearEl.textContent = new Date().getFullYear();

/* ──────────────────────────────────────────────────
   BONUS: HEADER SHRINK ON SCROLL
────────────────────────────────────────────────── */
function handleHeaderScroll() {
  if (window.scrollY > 20) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleHeaderScroll, { passive: true });

/* ──────────────────────────────────────────────────
   BONUS: ACTIVE NAV HIGHLIGHT (IntersectionObserver)
────────────────────────────────────────────────── */
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          const href = link.getAttribute('href').replace('#', '');
          link.classList.toggle('active', href === id);
        });
      }
    });
  },
  { rootMargin: `-${getComputedStyle(document.documentElement).getPropertyValue('--header-h') || '68px'} 0px -50% 0px` }
);

sections.forEach(section => sectionObserver.observe(section));

/* ──────────────────────────────────────────────────
   BONUS: SCROLL REVEAL
────────────────────────────────────────────────── */
if (revealEls.length > 0) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealEls.forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.07}s`;
    revealObserver.observe(el);
  });
}
