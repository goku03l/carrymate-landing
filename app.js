(() => {
  'use strict';

  const CFG = window.CARRYMATE_CONFIG;
  if (!CFG) {
    console.error('CARRYMATE_CONFIG not found — make sure config.js loads before app.js');
    return;
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasFinePointer = window.matchMedia('(pointer: fine)').matches;

  // ---------- Small helpers ----------
  function el(tag, className, html) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (html !== undefined) node.innerHTML = html;
    return node;
  }

  // ---------- Links: every [data-app-link] / [data-repo-link] gets its href from config ----------
  function wireLinks() {
    document.querySelectorAll('[data-app-link]').forEach((a) => a.setAttribute('href', CFG.appUrl));
    document.querySelectorAll('[data-repo-link]').forEach((a) => a.setAttribute('href', CFG.repoUrl));
  }

  // ---------- Nav ----------
  function renderNav() {
    document.getElementById('brandName').textContent = CFG.brand.name;
    document.getElementById('navCta').textContent = CFG.nav.ctaLabel;
  }

  function initNavScroll() {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    const update = () => nav.classList.toggle('nav--scrolled', window.scrollY > 12);
    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  // ---------- Hero ----------
  function renderHero() {
    const h = CFG.hero;
    document.getElementById('heroEyebrow').textContent = h.eyebrow;
    document.getElementById('heroHeadline').innerHTML =
      `${h.headlineLine1}<br><em>${h.headlineEmphasis}</em>`;
    document.getElementById('heroLede').textContent = h.lede;
    document.getElementById('heroNote').innerHTML = h.note;
  }

  // ---------- Hero tag: subtle mouse-tilt (idle sway lives in CSS on the wrapper) ----------
  function initTagTilt() {
    if (reduceMotion || !hasFinePointer) return;
    const visual = document.querySelector('.hero__visual');
    const tag = document.getElementById('heroTag');
    if (!visual || !tag) return;
    visual.addEventListener('mousemove', (e) => {
      const r = visual.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      tag.style.transform = `perspective(900px) rotateX(${(-py * 10).toFixed(2)}deg) rotateY(${(px * 10).toFixed(2)}deg)`;
    });
    visual.addEventListener('mouseleave', () => { tag.style.transform = ''; });
  }

  // ---------- Flight path: draw itself in on load ----------
  function initFlightPath() {
    const path = document.querySelector('.flightpath path');
    if (!path) return;
    if (reduceMotion) { path.style.strokeDasharray = 'none'; return; }
    const len = path.getTotalLength();
    path.style.strokeDasharray = String(len);
    path.style.strokeDashoffset = String(len);
    // Double rAF so the browser paints the initial (undrawn) state before transitioning.
    requestAnimationFrame(() => requestAnimationFrame(() => {
      path.style.strokeDashoffset = '0';
    }));
  }

  // ---------- Buttons: subtle magnetic pull + click ripple ----------
  function initButtonInteractions() {
    document.querySelectorAll('.btn').forEach((btn) => {
      if (!reduceMotion && hasFinePointer) {
        btn.addEventListener('mousemove', (e) => {
          const r = btn.getBoundingClientRect();
          const x = (e.clientX - r.left - r.width / 2) * 0.18;
          const y = (e.clientY - r.top - r.height / 2) * 0.35;
          btn.style.transform = `translate(${x.toFixed(1)}px, ${(y - 1).toFixed(1)}px)`;
        });
        btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
      }
      btn.addEventListener('click', (e) => {
        const r = btn.getBoundingClientRect();
        const ripple = el('span', 'btn__ripple');
        const size = Math.max(r.width, r.height) * 1.4;
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - r.left - size / 2}px`;
        ripple.style.top = `${e.clientY - r.top - size / 2}px`;
        btn.appendChild(ripple);
        ripple.addEventListener('animationend', () => ripple.remove());
      });
    });
  }

  // ---------- Cards: subtle 3D tilt following the cursor ----------
  function initCardTilt(selector, maxDeg) {
    if (reduceMotion || !hasFinePointer) return;
    document.querySelectorAll(selector).forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform =
          `perspective(700px) rotateX(${(-py * maxDeg).toFixed(2)}deg) rotateY(${(px * maxDeg).toFixed(2)}deg) translateY(-3px)`;
        card.style.setProperty('--mx', `${((px + 0.5) * 100).toFixed(1)}%`);
        card.style.setProperty('--my', `${((py + 0.5) * 100).toFixed(1)}%`);
      });
      card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
  }

  // ---------- Hero ticker (rotating sample routes on the luggage tag) ----------
  function renderTicker() {
    const routes = CFG.ticker || [];
    if (!routes.length) return;

    const fromEl = document.getElementById('tagFrom');
    const toEl = document.getElementById('tagTo');
    const metaEl = document.getElementById('tagMeta');
    const tagEl = document.getElementById('heroTag');
    const bodyEl = tagEl.querySelector('.tag__body');
    const chips = tagEl.querySelectorAll('.chip');
    let index = 0;

    function paint(route) {
      fromEl.textContent = route.from;
      toEl.textContent = route.to;
      metaEl.textContent = route.meta;
      chips[0].textContent = route.quote;
      chips[1].textContent = route.weight;
      chips[2].textContent = route.mode;
    }

    paint(routes[0]);
    if (routes.length > 1 && !reduceMotion) {
      setInterval(() => {
        index = (index + 1) % routes.length;
        bodyEl.classList.add('is-updating');
        setTimeout(() => {
          paint(routes[index]);
          bodyEl.classList.remove('is-updating');
        }, 260);
      }, CFG.tickerIntervalMs || 2800);
    }
  }

  // ---------- "How it works" two path cards ----------
  function renderPaths() {
    const p = CFG.paths;
    document.getElementById('pathsEyebrow').textContent = p.eyebrow;
    document.getElementById('pathsHeadline').textContent = p.headline;

    const grid = document.getElementById('pathsGrid');
    grid.innerHTML = '';
    p.cards.forEach((card, i) => {
      const cardEl = el('div', 'path-card reveal');
      cardEl.style.transitionDelay = `${i * 100}ms`;
      cardEl.appendChild(el('div', 'path-card__icon', card.icon));
      cardEl.appendChild(el('h3', null, card.title));
      cardEl.appendChild(el('p', 'sub', card.subtitle));

      const ol = el('ol');
      card.steps.forEach((step, i) => {
        const li = el('li');
        li.appendChild(el('span', 'n', String(i + 1)));
        li.appendChild(document.createTextNode(step));
        ol.appendChild(li);
      });
      cardEl.appendChild(ol);

      grid.appendChild(cardEl);
    });
  }

  // ---------- Feature grid ----------
  function renderFeatures() {
    const f = CFG.features;
    document.getElementById('featuresEyebrow').textContent = f.eyebrow;
    document.getElementById('featuresHeadline').textContent = f.headline;
    document.getElementById('featuresText').textContent = f.text;

    const grid = document.getElementById('featuresGrid');
    grid.innerHTML = '';
    f.items.forEach((item, i) => {
      const card = el('div', 'feature reveal' + (item.highlight ? ' feature--highlight' : ''));
      card.style.transitionDelay = `${i * 80}ms`;
      if (item.badge) card.appendChild(el('span', 'feature__badge', item.badge));
      card.appendChild(el('div', 'feature__icon', item.icon));
      card.appendChild(el('h3', null, item.title));
      card.appendChild(el('p', null, item.text));
      grid.appendChild(card);
    });
  }

  // ---------- Trust strip ----------
  function renderTrust() {
    document.getElementById('trustText').innerHTML = CFG.trust.html;
  }

  // ---------- Final CTA ----------
  function renderFinal() {
    const fnl = CFG.final;
    document.getElementById('finalEyebrow').textContent = fnl.eyebrow;
    document.getElementById('finalHeadline').textContent = fnl.headline;
    document.getElementById('finalText').textContent = fnl.text;
  }

  // ---------- Footer ----------
  function renderFooter() {
    const f = CFG.footer;
    document.getElementById('footerText').textContent = f.text;
    document.getElementById('footerAppLink').textContent = f.appLinkLabel;
    document.getElementById('footerRepoLink').textContent = f.repoLinkLabel;
  }

  // ---------- Scroll reveal (applies to anything with .reveal, including cards just rendered) ----------
  function initReveal() {
    const revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && !reduceMotion) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });
      revealEls.forEach((node) => io.observe(node));
    } else {
      revealEls.forEach((node) => node.classList.add('is-visible'));
    }
  }

  // ---------- Boot ----------
  document.addEventListener('DOMContentLoaded', () => {
    renderNav();
    renderHero();
    renderTicker();
    renderPaths();
    renderFeatures();
    renderTrust();
    renderFinal();
    renderFooter();
    wireLinks();   // run again after dynamic content exists, to catch new [data-app-link] nodes
    initReveal();  // run after dynamic .reveal cards (paths/features) exist

    // Motion layer — all guarded by prefers-reduced-motion where relevant.
    initNavScroll();
    initTagTilt();
    initFlightPath();
    initButtonInteractions();
    initCardTilt('.path-card', 6);
    initCardTilt('.feature', 5);
  });
})();
