document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');
  const heroBg = document.getElementById('hero-bg');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Header ao rolar + parallax no hero
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 40);
    if (!reduce && heroBg && y < window.innerHeight) {
      heroBg.style.translate = `0 ${y * 0.3}px`;
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Revelação ao rolar
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Menu mobile
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu');
  const setMenu = (open) => {
    menu.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    document.body.style.overflow = open ? 'hidden' : '';
  };
  toggle.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

  // Botão da demonstração
  document.getElementById('btn-demo').addEventListener('click', () => {
    document.getElementById('demo-status').textContent =
      'Esta é uma página demonstrativa da Prisma. O escritório Vértice é fictício e não oferece atendimento.';
  });
});
