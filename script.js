const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');
menuBtn?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
});
nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  menuBtn?.setAttribute('aria-expanded','false');
}));

// Спокойный параллакс синего декоративного объекта.
const parallaxEls = [...document.querySelectorAll('[data-parallax]')];
let parallaxTicking = false;
const updateParallax = () => {
  parallaxEls.forEach(el => {
    const section = el.closest('section');
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const centerOffset = (window.innerHeight / 2) - (rect.top + rect.height / 2);
    const strength = Number(el.dataset.parallax || .12);
    const y = Math.max(-55, Math.min(55, centerOffset * strength));
    el.style.setProperty('--parallax-y', `${y}px`);
  });
  parallaxTicking = false;
};
window.addEventListener('scroll', () => {
  if (!parallaxTicking) {
    requestAnimationFrame(updateParallax);
    parallaxTicking = true;
  }
}, {passive:true});
updateParallax();

// Анимированные цифры в блоке аудитории.
const formatNum = n => new Intl.NumberFormat('ru-RU').format(Math.round(n));
const animateCounter = (el, duration = 1200) => {
  if (el.dataset.done) return;
  el.dataset.done = '1';
  const start = performance.now();
  const min = Number(el.dataset.min);
  const max = Number(el.dataset.max);
  const target = Number(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const tick = now => {
    const p = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - p, 3);
    if (el.classList.contains('counter-range')) {
      el.textContent = `${formatNum(min * eased)}–${formatNum(max * eased)}`;
    } else {
      el.textContent = `${formatNum(target * eased)}${suffix}`;
    }
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};
const audience = document.querySelector('#audience');
if (audience) {
  const observer = new IntersectionObserver(entries => {
    if (entries.some(e => e.isIntersecting)) {
      audience.querySelectorAll('.counter-range,.counter-single').forEach(el => animateCounter(el));
      observer.disconnect();
    }
  }, {threshold:.28});
  observer.observe(audience);
}

// Горизонтальный слайдер выпусков + жёлтый индикатор прогресса.
const slider = document.querySelector('.episode-slider');
const progressBar = document.querySelector('.progress i');
const prev = document.querySelector('.slider-arrow.prev');
const next = document.querySelector('.slider-arrow.next');
const updateProgress = () => {
  if (!slider || !progressBar) return;
  const max = slider.scrollWidth - slider.clientWidth;
  const ratio = max > 0 ? slider.scrollLeft / max : 0;
  progressBar.style.width = `${15 + ratio * 85}%`;
};
slider?.addEventListener('scroll', updateProgress, {passive:true});
window.addEventListener('resize', updateProgress);
const slideByCard = direction => {
  const card = slider?.querySelector('.episode-card');
  if (!slider || !card) return;
  slider.scrollBy({left: direction * (card.getBoundingClientRect().width + 14), behavior:'smooth'});
};
prev?.addEventListener('click', () => slideByCard(-1));
next?.addEventListener('click', () => slideByCard(1));
updateProgress();
