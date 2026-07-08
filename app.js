(() => {
  'use strict';

  const CFG = window.CARRYMATE_CONFIG;
  if (!CFG) {
    console.error('CARRYMATE_CONFIG not found — make sure config.js loads before app.js');
    return;
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

  // ---------- Hero ----------
  function renderHero() {
    const h = CFG.hero;
    document.getElementById('heroEyebrow').textContent = h.eyebrow;
    document.getElementById('heroHeadline').innerHTML =
      `${h.headlineLine1}<br><em>${h.headlineEmphasis}</em>`;
    document.getElementById('heroLede').textContent = h.lede;
    document.getElementById('heroCtaPrimary').textContent = h.ctaPrimary.label;
    document.getElementById('heroCtaSecondary').textContent = h.ctaSecondary.label;
    document.getElementById('heroNote').innerHTML = h.note;
  }

  // ---------- Hero ticker (rotating sample routes on the luggage tag) ----------
  function renderTicker() {
    const routes = CFG.ticker || [];
    if (!routes.length) return;

    const fromEl = document.getElementById('tagFrom');
    const toEl = document.getElementById('tagTo');
    const metaEl = document.getElementById('tagMeta');
    const tagEl = document.getElementById('heroTag');
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
        [fromEl, toEl].forEach((n) => { n.style.opacity = 0; });
        setTimeout(() => {
          paint(routes[index]);
          [fromEl, toEl].forEach((n) => { n.style.opacity = 1; });
        }, 220);
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
    p.cards.forEach((card) => {
      const cardEl = el('div', 'path-card reveal');
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

      const cta = el('a', 'btn btn--ghost btn--sm cta', card.ctaLabel);
      cta.href = CFG.appUrl;
      cta.target = '_blank';
      cta.rel = 'noopener';
      cardEl.appendChild(cta);

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
    f.items.forEach((item) => {
      const card = el('div', 'feature reveal' + (item.highlight ? ' feature--highlight' : ''));
      card.appendChild(el('div', 'feature__icon', item.icon));
      card.appendChild(el('h3', null, item.title));
      card.appendChild(el('p', null, item.text));
      grid.appendChild(card);
    });
  }

  // ---------- Trust strip ----------
  function renderTrust() {
    document.getElementById('trustText').innerHTML = CFG.trust.html;
    document.getElementById('trustCta').textContent = CFG.trust.ctaLabel;
  }

  // ---------- Final CTA ----------
  function renderFinal() {
    const fnl = CFG.final;
    document.getElementById('finalEyebrow').textContent = fnl.eyebrow;
    document.getElementById('finalHeadline').textContent = fnl.headline;
    document.getElementById('finalText').textContent = fnl.text;
    document.getElementById('finalCta').textContent = fnl.ctaLabel;
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
  });
})();
