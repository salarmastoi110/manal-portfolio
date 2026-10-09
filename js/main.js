document.documentElement.classList.add('js-ready');
const $ = id => document.getElementById(id);
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

document.querySelectorAll('[data-stagger]').forEach(g =>
  [...g.children].forEach((el, i) => { el.classList.add('reveal'); el.style.setProperty('--d', i * 0.08 + 's'); }));
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

const nav = $('nav'), toggle = $('navToggle'), links = $('navLinks');
addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 20), { passive: true });
toggle.addEventListener('click', () => toggle.setAttribute('aria-expanded', links.classList.toggle('open')));
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  links.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false');
}));

const anchors = links.querySelectorAll('a');
const spy = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) anchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
}), { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('#home, main section[id], #contact').forEach(s => spy.observe(s));

const typed = $('typed');
if (typed && !reduceMotion) {
  const roles = JSON.parse(typed.dataset.roles);
  let r = 0, c = 0, del = false;
  (function tick() {
    const w = roles[r];
    typed.textContent = w.slice(0, c);
    if (!del && c === w.length) { del = true; return setTimeout(tick, 1600); }
    if (del && c === 0) { del = false; r = (r + 1) % roles.length; }
    c += del ? -1 : 1;
    setTimeout(tick, del ? 40 : 85);
  })();
}

const form = $('contactForm');
form.addEventListener('submit', e => {
  e.preventDefault();
  const d = new FormData(form);
  location.href = 'mailto:manalijaz110@gmail.com?subject=' + encodeURIComponent('Portfolio message from ' + d.get('name')) +
    '&body=' + encodeURIComponent(d.get('message') + '\n\n' + d.get('name') + ' (' + d.get('email') + ')');
});
$('year').textContent = new Date().getFullYear();
