/**
 * main.js — Mihir Koladiya Portfolio
 * Handles: rendering, filtering, animations, navbar, form validation.
 * Fails gracefully if elements are missing.
 */

/* ═══════════════════════════════════════════
   UTILITIES
   ═══════════════════════════════════════════ */

function el(selector, parent = document) {
  return parent.querySelector(selector);
}
function els(selector, parent = document) {
  return [...parent.querySelectorAll(selector)];
}
function currentPage() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  return path || 'index.html';
}
function getStatusClass(status) {
  const s = (status || '').toLowerCase();
  if (s === 'completed')                               return 'status--completed';
  if (s.includes('progress') || s.includes('ongoing')) return 'status--progress';
  if (s === 'published')                               return 'status--published';
  if (s === 'presented')                               return 'status--presented';
  if (s.includes('review') || s.includes('revision'))  return 'status--review';
  return 'status--progress';
}
function sanitize(str) {
  const d = document.createElement('div');
  d.textContent = str || '';
  return d.innerHTML;
}

/* ═══════════════════════════════════════════
   ICONS — line icons (Lucide, ISC licence)
   Use icon('name'). Unknown names fall back to
   plain text, so emoji in data.js still work.
   ═══════════════════════════════════════════ */

const ICONS = {
  briefcase:  '<rect width="20" height="14" x="2" y="7" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
  file:       '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',
  pen:        '<path d="M12 20h9"/><path d="M16.38 3.62a1 1 0 0 1 3 3L7.37 18.64a2 2 0 0 1-.86.5l-2.87.84a.5.5 0 0 1-.62-.62l.84-2.87a2 2 0 0 1 .5-.86z"/>',
  mic:        '<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><path d="M12 19v3"/>',
  alert:      '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
  layers:     '<path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>',
  cpu:        '<rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/>',
  chart:      '<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>',
  trend:      '<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="m19 9-5 5-4-4-3 3"/>',
  leaf:       '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',
  route:      '<circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/>',
  shield:     '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
  cap:        '<path d="M21.42 10.92a1 1 0 0 0-.02-1.84L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.83l8.57 3.91a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>',
  microscope: '<path d="M6 18h8"/><path d="M3 22h18"/><path d="M14 22a7 7 0 1 0 0-14h-1"/><path d="M9 14h2"/><path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"/><path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"/>',
  hardhat:    '<path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5"/><path d="M14 6a6 6 0 0 1 6 6v3"/><path d="M4 15v-3a6 6 0 0 1 6-6"/><rect x="2" y="15" width="20" height="4" rx="1"/>',
  mail:       '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  phone:      '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
  pin:        '<path d="M20 10c0 4.99-5.54 10.19-7.4 11.8a1 1 0 0 1-1.2 0C9.54 20.19 4 14.99 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
  linkedin:   '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>',
  github:     '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>',
  book:       '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
  award:      '<path d="m15.48 12.89 1.51 8.53a.5.5 0 0 1-.81.47l-3.58-2.69a1 1 0 0 0-1.2 0l-3.59 2.69a.5.5 0 0 1-.81-.47l1.51-8.53"/><circle cx="12" cy="8" r="6"/>',
  image:      '<rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.09-3.09a2 2 0 0 0-2.82 0L6 21"/>',
  folder:     '<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>',
  notebook:   '<path d="M2 6h4"/><path d="M2 10h4"/><path d="M2 14h4"/><path d="M2 18h4"/><rect width="16" height="20" x="4" y="2" rx="2"/><path d="M16 2v20"/>',
  presentation:'<path d="M2 3h20"/><path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3"/><path d="m7 21 5-5 5 5"/>',
  download:   '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>',
  arrow:      '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  external:   '<path d="M7 7h10v10"/><path d="M7 17 17 7"/>',
  check:      '<path d="M20 6 9 17l-5-5"/>',
  x:          '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  user:       '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  clock:      '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  globe:      '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
  link:       '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
  idcard:     '<path d="M16 10h2"/><path d="M16 14h2"/><path d="M6.17 15a3 3 0 0 1 5.66 0"/><circle cx="9" cy="11" r="2"/><rect x="2" y="5" width="20" height="14" rx="2"/>',
  languages:  '<path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/>',
  plus:       '<path d="M5 12h14"/><path d="M12 5v14"/>',
  home:       '<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .71-1.53l7-6a2 2 0 0 1 2.58 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
};

function icon(name, cls = '') {
  const paths = ICONS[name];
  if (!paths) return sanitize(name || '');
  return `<svg class="icon${cls ? ' ' + cls : ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths}</svg>`;
}

// Replace <span data-icon="name"></span> placeholders in static HTML
function hydrateIcons(root = document) {
  els('[data-icon]', root).forEach(node => {
    if (!node.dataset.hydrated) {
      node.innerHTML = icon(node.dataset.icon);
      node.dataset.hydrated = '1';
    }
  });
}

// Bold the site owner's name inside an author list
function highlightAuthor(authorsHTML) {
  const name = (typeof DATA !== 'undefined' && DATA.PROFILE && DATA.PROFILE.name) || '';
  return name ? authorsHTML.split(sanitize(name)).join(`<strong>${sanitize(name)}</strong>`) : authorsHTML;
}

const CATEGORY_ICONS = {
  'research': 'microscope', 'road safety': 'shield', 'gis': 'layers', 'traffic': 'route',
  'crash analysis': 'alert', 'pavement': 'route', 'transportation engineering': 'route',
  'mobility / sustainability': 'leaf', 'data / ml': 'cpu', 'books / reference': 'book',
};
function categoryIcon(category) {
  return CATEGORY_ICONS[(category || '').toLowerCase()] || 'route';
}

/* ═══════════════════════════════════════════
   NAVBAR
   ═══════════════════════════════════════════ */

function initNavbar() {
  const nav = el('.navbar');
  if (!nav) return;

  // Scroll shadow
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });

  // Mobile toggle
  const toggle = el('.navbar__toggle');
  const links  = el('.navbar__links');
  if (toggle && links) {
    const setOpen = open => {
      links.classList.toggle('open', open);
      toggle.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
    };
    toggle.addEventListener('click', () => setOpen(!links.classList.contains('open')));
    els('a', links).forEach(a => a.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
  }

  // Active link (detail pages highlight their parent section)
  const activeHref = activeNavHref();
  els('.navbar__links a').forEach(a => {
    if ((a.getAttribute('href') || '') === activeHref) {
      a.classList.add('active');
      a.setAttribute('aria-current', 'page');
    }
  });

  if (links) initNavIndicator(links);
}

// Which top-level nav item the current page belongs to
function activeNavHref() {
  const page = currentPage();
  if (page === 'project-detail.html') return 'projects.html';
  if (page === 'insight-detail.html') {
    const id = Number(new URLSearchParams(location.search).get('id'));
    const item = (typeof DATA !== 'undefined' ? DATA.INSIGHTS || [] : []).find(i => i.id === id);
    return item && item.contentType ? 'showcase.html' : 'insights.html';
  }
  return page || 'index.html';
}

// A soft raised pill that slides between nav links on hover
function initNavIndicator(links) {
  const ind = document.createElement('span');
  ind.className = 'navbar__indicator';
  ind.setAttribute('aria-hidden', 'true');
  links.prepend(ind);
  links.classList.add('has-indicator');

  const items = els('a:not(.nav-cta)', links);
  const active = items.find(a => a.classList.contains('active'));
  const isInline = () => getComputedStyle(links).flexDirection !== 'column';

  const moveTo = (a, instant = false) => {
    if (!a || !isInline()) { ind.style.opacity = '0'; return; }
    if (instant) ind.style.transition = 'none';
    ind.style.width = `${a.offsetWidth}px`;
    ind.style.transform = `translate(${a.offsetLeft}px, -50%)`;
    ind.style.opacity = '1';
    if (instant) requestAnimationFrame(() => requestAnimationFrame(() => { ind.style.transition = ''; }));
  };

  items.forEach(a => {
    a.addEventListener('mouseenter', () => moveTo(a));
    a.addEventListener('focus', () => moveTo(a));
  });
  links.addEventListener('mouseleave', () => moveTo(active));
  window.addEventListener('resize', () => moveTo(active, true));
  moveTo(active, true);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => moveTo(active, true));
}

/* ═══════════════════════════════════════════
   QUICK ACTIONS (floating button) + MOBILE DOCK
   ═══════════════════════════════════════════ */

function initQuickActions() {
  if (typeof DATA === 'undefined') return;
  const P = DATA.PROFILE;
  const L = DATA.LINKS || {};
  const tel = (P.phone || '').replace(/[^\d+]/g, '');
  const actions = [
    { label: 'Email',    icon: 'mail',     href: P.email ? `mailto:${P.email}` : '' },
    { label: 'Call',     icon: 'phone',    href: tel ? `tel:${tel}` : '' },
    { label: 'LinkedIn', icon: 'linkedin', href: L.linkedin, external: true },
    { label: 'CV',       icon: 'download', href: P.cvFile, download: true },
    { label: 'Projects', icon: 'layers',   href: 'projects.html' },
    { label: 'Papers',   icon: 'file',     href: 'publications.html' },
  ].filter(a => a.href);

  const wrap = document.createElement('div');
  wrap.className = 'qa';
  wrap.innerHTML = `
    <div class="qa__panel" id="qa-panel">
      ${actions.map((a, i) => `
        <a class="qa__tile" style="--i:${i}" href="${sanitize(a.href)}"${a.external ? ' target="_blank" rel="noopener"' : ''}${a.download ? ' download' : ''}>
          ${icon(a.icon)}<span>${sanitize(a.label)}</span>
        </a>`).join('')}
    </div>
    <button class="qa__fab" type="button" aria-label="Open quick actions" aria-expanded="false" aria-controls="qa-panel">${icon('plus')}</button>
  `;
  document.body.appendChild(wrap);

  const fab = wrap.querySelector('.qa__fab');
  const setOpen = open => {
    wrap.classList.toggle('is-open', open);
    fab.setAttribute('aria-expanded', String(open));
    fab.setAttribute('aria-label', open ? 'Close quick actions' : 'Open quick actions');
  };
  fab.addEventListener('click', e => { e.stopPropagation(); setOpen(!wrap.classList.contains('is-open')); });
  document.addEventListener('click', e => { if (!wrap.contains(e.target)) setOpen(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
  els('.qa__tile', wrap).forEach(t => t.addEventListener('click', () => setOpen(false)));
}

function initDock() {
  const activeHref = activeNavHref();
  const items = [
    { href: 'index.html',        label: 'Home',   icon: 'home' },
    { href: 'about.html',        label: 'About',  icon: 'user' },
    { href: 'projects.html',     label: 'Work',   icon: 'layers' },
    { href: 'publications.html', label: 'Papers', icon: 'file' },
  ];
  const dock = document.createElement('nav');
  dock.className = 'dock';
  dock.setAttribute('aria-label', 'Quick navigation');
  dock.innerHTML = items.map(i => {
    const active = i.href === activeHref;
    return `<a class="dock__item${active ? ' active' : ''}" href="${i.href}" aria-label="${i.label}"${active ? ' aria-current="page"' : ''}>${icon(i.icon)}<span>${i.label}</span></a>`;
  }).join('');
  document.body.appendChild(dock);
}

/* ═══════════════════════════════════════════
   SCROLL REVEAL
   ═══════════════════════════════════════════ */

function initReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.07 });
  els('.reveal').forEach(item => observer.observe(item));
}

/* ═══════════════════════════════════════════
   ANIMATED COUNTER
   ═══════════════════════════════════════════ */

function animateCounter(element, target, suffix, duration = 1200) {
  const start = performance.now();
  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Easing: ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * target);
    element.textContent = current + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

function initCounters() {
  const grid = el('#stats-grid');
  if (!grid) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        els('.stat-card__value', grid).forEach(valEl => {
          const raw = valEl.dataset.value;
          const suffix = valEl.dataset.suffix || '';
          if (raw !== undefined) {
            animateCounter(valEl, parseInt(raw, 10), suffix);
          }
        });
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(grid);
}

/* ═══════════════════════════════════════════
   SHARED HTML BUILDERS
   ═══════════════════════════════════════════ */

function projectCardHTML(p) {
  const tools = (p.tools || []).slice(0, 4).map(t => `<span class="project-card__tool">${sanitize(t)}</span>`).join('');
  return `
    <a href="project-detail.html?id=${p.id}" class="project-card reveal" aria-label="View project: ${sanitize(p.title)}">
      <div class="project-card__cover" aria-hidden="true">
        <span class="project-card__cover-icon">${icon(categoryIcon(p.category))}</span>
        <span class="project-card__cover-year">${sanitize(p.year)}</span>
      </div>
      <div class="project-card__body">
        <div class="project-card__meta">
          <span class="tag">${sanitize(p.category)}</span>
          <span class="status-badge ${getStatusClass(p.status)}">${sanitize(p.status)}</span>
        </div>
        <h3 class="project-card__title">${sanitize(p.title)}</h3>
        <p class="project-card__desc">${sanitize(p.description)}</p>
        <div class="project-card__tools">${tools}</div>
      </div>
      <div class="project-card__footer">
        <span>View case study</span>
        ${icon('arrow')}
      </div>
    </a>
  `;
}

function pubCardHTML(p) {
  const venue = p.journal || p.conference || '';
  const doi   = p.doi ? `<span class="pub-card__doi">DOI ${sanitize(p.doi)}</span>` : '';
  const link  = p.link ? `<a href="${sanitize(p.link)}" target="_blank" rel="noopener" class="pub-card__link">Read paper ${icon('external')}</a>` : '';
  const kind  = p.journal ? 'Journal' : 'Conference';
  return `
    <article class="pub-card reveal">
      <div class="pub-card__year">${sanitize(p.year)}<small>${kind}</small></div>
      <div class="pub-card__body">
        ${venue ? `<div class="pub-card__venue">${sanitize(venue)}</div>` : ''}
        <h3 class="pub-card__title">${sanitize(p.title)}</h3>
        <div class="pub-card__meta">${highlightAuthor(sanitize(p.authors))}</div>
        <div class="pub-card__footer">
          <span class="status-badge ${getStatusClass(p.status)}">${sanitize(p.status)}</span>
          ${doi}
          ${link}
        </div>
      </div>
    </article>
  `;
}

function getContentTypeMeta(type) {
  switch (type) {
    case 'report':
      return { icon: 'file', label: 'Report', className: 'report', buttonLabel: 'View Report', viewerLabel: 'Report Viewer' };
    case 'presentation':
      return { icon: 'presentation', label: 'Presentation', className: 'ppt', buttonLabel: 'View Presentation', viewerLabel: 'Presentation Viewer' };
    case 'poster':
      return { icon: 'image', label: 'Poster', className: 'poster', buttonLabel: 'View Poster', viewerLabel: 'Poster Viewer' };
    case 'note':
      return { icon: 'notebook', label: 'Short Note', className: 'note', buttonLabel: 'View Short Note', viewerLabel: 'Short Note Viewer' };
    case 'book':
      return { icon: 'book', label: 'Books', className: 'book', buttonLabel: 'View Book', viewerLabel: 'Book Viewer' };
    default:
      return { icon: 'folder', label: 'Document', className: 'doc', buttonLabel: 'View File', viewerLabel: 'Document Viewer' };
  }
}

// Inline PDF viewer toggle for showcase cards
function toggleInlineViewer(btn) {
  const wrap = document.getElementById(btn.getAttribute('aria-controls'));
  if (!wrap) return;
  const open = wrap.hidden;
  wrap.hidden = !open;
  btn.setAttribute('aria-expanded', String(open));
  const label = btn.querySelector('.insight-view-btn__label');
  if (label) label.textContent = open ? 'Close viewer' : btn.dataset.label;
  btn.querySelector('svg')?.replaceWith(document.createRange().createContextualFragment(icon(open ? 'x' : btn.dataset.icon)));
}

function insightCardHTML(item) {
  const meta = getContentTypeMeta(item.contentType);
  const isSpecial = Boolean(item.contentType);
  const typeBadge = isSpecial
    ? `<span class="insight-type-badge insight-type-badge--${sanitize(meta.className)}">${icon(meta.icon)} ${meta.label}</span>`
    : '';

  if (!isSpecial) {
    const articleImage = sanitize(item.heroImage || '');
    const articleImageAlt = sanitize(item.heroImageAlt || item.title || 'Article image');

    return `
      <article class="insight-card insight-card--article reveal" aria-label="Article: ${sanitize(item.title)}">
        <div class="insight-card__preview${articleImage ? '' : ' is-fallback'}">
          ${articleImage ? `<img src="${articleImage}" alt="${articleImageAlt}" loading="lazy" onerror="this.parentNode.classList.add('is-fallback');this.remove();">` : ''}
          <div class="insight-card__preview-fallback" aria-hidden="true"><span>${icon(categoryIcon(item.category))}</span></div>
        </div>
        <div class="insight-card__meta">
          <span class="tag">${sanitize(item.category)}</span>
          <span class="insight-card__read">${icon('clock')} ${sanitize(item.readTime)}</span>
        </div>
        <h3 class="insight-card__title">${sanitize(item.title)}</h3>
        <div class="insight-card__date">${sanitize(item.date)}</div>
        <p class="insight-card__excerpt">${sanitize(item.excerpt)}</p>
        <div class="insight-card__action">
          <a href="insight-detail.html?id=${item.id}" class="btn-ghost" aria-label="Read article: ${sanitize(item.title)}">Read article</a>
        </div>
      </article>
    `;
  }

  const pdfSrc = sanitize(item.pdfSrc || '');
  const cardId = `pdf-viewer-${item.id}`;
  const toggleId = `pdf-toggle-${item.id}`;

  return `
    <article class="insight-card insight-card--viewer reveal" id="${sanitize(cardId)}">
      <div class="insight-card__header">
        <div class="insight-card__header-left">
          ${typeBadge}
          <span class="tag">${sanitize(item.category)}</span>
          ${item.readTime ? `<span class="insight-card__read">${sanitize(item.readTime)}</span>` : ''}
        </div>
        <div class="insight-card__header-right">
          <span class="insight-card__date">${sanitize(item.date)}</span>
        </div>
      </div>

      <h3 class="insight-card__title">${sanitize(item.title)}</h3>
      <p class="insight-card__excerpt">${sanitize(item.excerpt)}</p>

      ${(item.highlights || []).length ? `
      <div class="insight-card__highlights">
        ${(item.highlights || []).slice(0, 3).map(h => `
          <div class="insight-card__highlight-item">
            <span class="insight-card__highlight-dot"></span>
            <span>${sanitize(h)}</span>
          </div>`).join('')}
      </div>` : ''}

      ${pdfSrc ? `
      <div class="insight-pdf-wrap" id="${toggleId}" hidden>
        <div class="insight-pdf-toolbar">
          <span class="insight-pdf-toolbar__label">${meta.viewerLabel} — ${sanitize(item.title)}</span>
          <div class="insight-pdf-toolbar__actions">
            <a class="insight-pdf-btn" href="${pdfSrc}" target="_blank" rel="noopener">${icon('external')} Open</a>
          </div>
        </div>
        <iframe
          src="${pdfSrc}#toolbar=0&navpanes=0&scrollbar=1&view=FitH"
          class="insight-pdf-iframe"
          title="${sanitize(item.title)} PDF Viewer"
          loading="lazy">
          <p>Your browser does not support embedded PDFs.</p>
        </iframe>
      </div>` : ''}

      <div class="insight-card__actions">
        ${pdfSrc ? `
        <button class="insight-view-btn" type="button" aria-controls="${toggleId}" aria-expanded="false"
          data-label="${sanitize(meta.buttonLabel)}" data-icon="${sanitize(meta.icon)}" data-hydrated="1"
          onclick="toggleInlineViewer(this)">
          ${icon(meta.icon)}<span class="insight-view-btn__label">${sanitize(meta.buttonLabel)}</span>
        </button>
        <a class="insight-detail-btn" href="insight-detail.html?id=${item.id}">Details</a>` : ''}
      </div>
    </article>
  `;
}


/* ═══════════════════════════════════════════
   HOME PAGE
   ═══════════════════════════════════════════ */

function renderHome() {
  renderHero();
  renderStats();
  renderGlance();
  renderFeaturedProjects();
  renderResearchAreas();
  renderPubsPreview();
  renderInsightsPreview();
  initCounters();
}

function renderHero() {
  const p = DATA.PROFILE;
  const nameEl  = el('#hero-name');
  const titleEl = el('#hero-title');
  const chipsEl = el('#hero-chips');
  const metaEl  = el('#hero-meta');
  const badgeEl = el('#hero-badge');

  if (nameEl) {
    // "MIHIR /" over "KOLADIYA" — the cobalt slash echoes the Soft System header style
    const [first, ...rest] = (p.name || '').split(' ');
    nameEl.innerHTML = `<span class="hero__name-line">${sanitize(first)}<span class="hero__slash" aria-hidden="true">/</span></span>`
                     + `<span class="hero__name-line">${sanitize(rest.join(' '))}</span>`;
  }
  if (titleEl) titleEl.textContent = p.title;

  if (chipsEl) {
    chipsEl.innerHTML = (p.tagline || '').split('|').map(t => t.trim()).filter(Boolean)
      .map(t => `<span class="hero__chip">${sanitize(t)}</span>`).join('');
  }

  const current = (DATA.EXPERIENCE || [])[0];
  if (badgeEl && current) {
    const role = current.role.split('–')[0].trim();
    const org = /SVNIT/.test(current.org) ? 'SVNIT Surat' : current.org.split(',')[0];
    badgeEl.innerHTML = `<span class="hero__badge-dot" aria-hidden="true"></span><span>Currently <strong>${sanitize(role)}</strong> · ${sanitize(org)}</span>`;
  }

  if (metaEl) {
    metaEl.innerHTML = `
      <span>${icon('pin')} ${sanitize(p.location)}</span>
      <a href="mailto:${sanitize(p.email)}">${icon('mail')} ${sanitize(p.email)}</a>
      ${DATA.LINKS && DATA.LINKS.linkedin ? `<a href="${sanitize(DATA.LINKS.linkedin)}" target="_blank" rel="noopener">${icon('linkedin')} LinkedIn</a>` : ''}
    `;
  }
}

function renderStats() {
  const grid = el('#stats-grid');
  if (!grid) return;
  grid.innerHTML = DATA.HIGHLIGHTS.map((h, i) => `
    <div class="stat-card reveal reveal-delay-${i + 1}" role="listitem">
      <span class="stat-card__icon">${icon(h.icon)}</span>
      <div>
        <div class="stat-card__value" data-value="${h.value}" data-suffix="${h.suffix || ''}">${h.value}${h.suffix || ''}</div>
        <div class="stat-card__label">${sanitize(h.label)}</div>
      </div>
    </div>
  `).join('');
}

function renderGlance() {
  const list = el('#glance-list');
  if (!list) return;
  const p = DATA.PROFILE;
  const job = (DATA.EXPERIENCE || [])[0];
  const edu = (DATA.EDUCATION || [])[0];
  const rows = [
    job && { icon: 'briefcase', label: 'Current role', value: job.role.split('–')[0].trim(), sub: job.org },
    edu && { icon: 'cap', label: 'Education', value: edu.degree, sub: `${edu.institution} · ${edu.grade}` },
    { icon: 'shield', label: 'Focus', value: 'Road safety · Crash analytics · GIS', sub: 'Blackspot & hotspot analysis, AI/ML modelling' },
    { icon: 'pin', label: 'Based in', value: p.location, sub: 'Open to research & consultancy roles' },
  ].filter(Boolean);
  list.innerHTML = rows.map(r => `
    <div class="glance__row">
      <span class="glance__icon">${icon(r.icon)}</span>
      <div>
        <div class="glance__label">${sanitize(r.label)}</div>
        <div class="glance__value">${sanitize(r.value)}<small>${sanitize(r.sub)}</small></div>
      </div>
    </div>
  `).join('');
}

function renderFeaturedProjects() {
  const grid = el('#featured-projects');
  if (!grid) return;
  const featured = DATA.PROJECTS.filter(p => p.featured).slice(0, 3);
  grid.innerHTML = featured.map(p => projectCardHTML(p)).join('');
}

function renderResearchAreas() {
  const grid = el('#research-areas');
  if (!grid) return;
  grid.innerHTML = DATA.RESEARCH_AREAS.map((r, i) => `
    <div class="research-card reveal reveal-delay-${(i % 3) + 1}">
      <span class="research-card__icon">${icon(r.icon)}</span>
      <h3 class="research-card__title">${sanitize(r.title)}</h3>
      <p class="research-card__desc">${sanitize(r.desc)}</p>
    </div>
  `).join('');
}

function renderPubsPreview() {
  const container = el('#pubs-preview');
  if (!container) return;
  const P = DATA.PUBLICATIONS;
  const pubs = (P.journal.length ? P.journal : P.conference).slice(0, 2);
  container.innerHTML = `<div class="pub-cards">${pubs.map(p => pubCardHTML(p)).join('')}</div>`;
}

function renderInsightsPreview() {
  const grid = el('#insights-preview');
  if (!grid) return;
  const items = DATA.INSIGHTS.filter(i => !i.contentType).slice(0, 3);
  grid.innerHTML = items.map(i => insightCardHTML(i)).join('');
}

/* ═══════════════════════════════════════════
   ABOUT PAGE
   ═══════════════════════════════════════════ */

function renderAbout() {
  renderAboutBio();
  renderAboutQuickFacts();
  renderEducation();
  renderExperience();
  renderSkills();
  renderCertifications();
  renderWorkshopsAndAwards();
  renderResearchInterests();
  renderProfileLinks();
}

function renderWorkshopsAndAwards() {
  const ws = el('#workshops-timeline');
  if (ws && DATA.WORKSHOPS) {
    ws.innerHTML = DATA.WORKSHOPS.map(w => `
      <div class="timeline-item reveal">
        <div class="timeline-item__period">${sanitize(w.date)}</div>
        <div class="timeline-item__title">${sanitize(w.title)}</div>
        <div class="timeline-item__org">${sanitize(w.org)} &middot; ${sanitize(w.mode)}</div>
      </div>
    `).join('');
  }
  const aw = el('#awards-timeline');
  if (aw && DATA.AWARDS) {
    aw.innerHTML = DATA.AWARDS.map(a => `
      <div class="timeline-item reveal">
        <div class="timeline-item__period">${sanitize(a.date)}</div>
        <div class="timeline-item__title">${sanitize(a.title)}</div>
        <div class="timeline-item__org">${sanitize(a.org)}</div>
        <div class="timeline-item__tags"><span class="tag">${sanitize(a.outcome)}</span></div>
      </div>
    `).join('');
  }
}

function renderAboutBio() {
  const bioEl = el('#about-bio');
  if (!bioEl) return;
  const p = DATA.PROFILE;
  bioEl.innerHTML = p.longBio.split('\n\n')
    .map((para, i) => `<p class="${i === 0 ? 'about-lead' : 'about-p'}">${sanitize(para.trim())}</p>`)
    .join('');
}

function renderAboutQuickFacts() {
  const factsEl = el('#about-quick-facts');
  if (!factsEl) return;
  const p = DATA.PROFILE;
  const items = [
    { label: 'Location',       value: p.location,                   accent: false },
    { label: 'Current Role',   value: 'Project Engineer, SVNIT Surat', accent: false },
    { label: 'Degree',         value: 'M.E., MSU Baroda',           accent: false },
    { label: 'Specialization', value: 'Highway & Transportation Eng.', accent: false },
    { label: 'CGPA',           value: '8.8 / 10',                   accent: false },
    { label: 'Experience',     value: '4+ Years',                   accent: false },
    { label: 'Status',         value: 'Open to Opportunities',      accent: true  },
  ];
  factsEl.innerHTML = items.map(item => `
    <div class="qf-row">
      <span class="qf-label">${sanitize(item.label)}</span>
      <span class="qf-value${item.accent ? ' accent' : ''}">${sanitize(item.value)}</span>
    </div>
  `).join('');
}

function renderEducation() {
  const container = el('#education-timeline');
  if (!container) return;
  container.innerHTML = DATA.EDUCATION.map(e => `
    <div class="timeline-item reveal">
      <div class="timeline-item__period">${sanitize(e.period)}</div>
      <div class="timeline-item__title">${sanitize(e.degree)}</div>
      <div class="timeline-item__org">${sanitize(e.institution)} &middot; ${sanitize(e.location)}</div>
      ${gradeBarHTML(e.grade)}
      ${e.thesis ? `<div class="timeline-item__desc" style="margin-top:12px"><strong>Thesis:</strong> ${sanitize(e.thesis)}</div>` : ''}
    </div>
  `).join('');
}

// "CGPA: 8.8 / 10" or "67.33%" -> soft progress bar that fills when revealed
function gradeBarHTML(grade) {
  const g = grade || '';
  const ratio = /([\d.]+)\s*\/\s*([\d.]+)/.exec(g);
  const pctMatch = /([\d.]+)\s*%/.exec(g);
  const pct = ratio ? (parseFloat(ratio[1]) / parseFloat(ratio[2])) * 100 : pctMatch ? parseFloat(pctMatch[1]) : null;
  if (pct === null || !isFinite(pct)) return `<div class="timeline-item__desc">${sanitize(g)}</div>`;
  return `
    <div class="grade-bar" role="img" aria-label="${sanitize(g)}">
      <div class="grade-bar__track"><div class="grade-bar__fill" style="--pct:${Math.min(100, pct).toFixed(1)}%"></div></div>
      <span class="grade-bar__value">${sanitize(g.replace(/:\s*/, ' '))}</span>
    </div>`;
}

function renderExperience() {
  const container = el('#experience-timeline');
  if (!container) return;
  container.innerHTML = DATA.EXPERIENCE.map(e => `
    <div class="timeline-item reveal">
      <div class="timeline-item__period">${sanitize(e.period)}</div>
      <div class="timeline-item__title">${sanitize(e.role)}</div>
      <div class="timeline-item__org">${sanitize(e.org)}</div>
      <div class="timeline-item__desc">${sanitize(e.description)}</div>
      <div class="timeline-item__tags">
        ${(e.highlights || []).map(h => `<span class="tag">${sanitize(h)}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

function renderSkills() {
  const container = el('#skills-grid');
  if (!container) return;
  container.innerHTML = Object.entries(DATA.SKILLS).map(([cat, items]) => `
    <div class="skill-group reveal">
      <div class="skill-group__title">${sanitize(cat)}</div>
      <div class="skill-tags">
        ${items.map(s => `<span class="skill-tag">${sanitize(s)}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

function renderCertifications() {
  const container = el('#certs-grid');
  if (!container) return;
  container.innerHTML = DATA.CERTIFICATIONS.map(c => `
    <div class="cert-card reveal">
      ${c.photo ? `
      <div class="cert-card__photo">
        <img src="${sanitize(c.photo)}" alt="${sanitize(c.title)} certificate" loading="lazy"
          onerror="this.parentNode.remove();" />
      </div>` : ''}
      <div class="cert-card__info">
        <span class="cert-card__icon">${icon('award')}</span>
        <div>
          <h3 class="cert-card__title">${sanitize(c.title)}</h3>
          <div class="cert-card__meta">${sanitize(c.org)} &middot; ${sanitize(c.year)}</div>
        </div>
      </div>
    </div>
  `).join('');
}

function renderResearchInterests() {
  const container = el('#research-interests');
  if (!container) return;
  container.innerHTML = DATA.RESEARCH_AREAS.map((r, i) => `
    <div class="research-card reveal reveal-delay-${(i % 3) + 1}">
      <span class="research-card__icon">${icon(r.icon)}</span>
      <h3 class="research-card__title">${sanitize(r.title)}</h3>
      <p class="research-card__desc">${sanitize(r.desc)}</p>
    </div>
  `).join('');
}

function renderProfileLinks() {
  const container = el('#profile-links');
  if (!container) return;
  const L = DATA.LINKS;
  const links = [
    { name: 'LinkedIn',        url: L.linkedin,      icon: 'linkedin' },
    { name: 'ResearchGate',    url: L.researchgate,  icon: 'microscope' },
    { name: 'Google Scholar',  url: L.googleScholar, icon: 'cap' },
    { name: 'ORCID',           url: L.orcid,         icon: 'idcard' },
    { name: 'GitHub',          url: L.github,        icon: 'github' },
  ].filter(l => l.url);
  container.innerHTML = links.map(l => `
    <a href="${sanitize(l.url)}" target="_blank" rel="noopener" class="profile-link">
      <span class="profile-link__icon">${icon(l.icon)}</span>${sanitize(l.name)}
    </a>
  `).join('') + `
    <a href="mailto:${sanitize(DATA.PROFILE.email)}" class="profile-link">
      <span class="profile-link__icon">${icon('mail')}</span>Email
    </a>`;
}

/* ═══════════════════════════════════════════
   PROJECTS PAGE
   ═══════════════════════════════════════════ */

function renderProjects() {
  const grid      = el('#projects-grid');
  const filterBar = el('#filter-bar');
  if (!grid) return;

  const categories = ['All', ...new Set(DATA.PROJECTS.map(p => p.category))];

  if (filterBar) {
    filterBar.innerHTML = categories.map(c => `
      <button class="filter-btn${c === 'All' ? ' active' : ''}" data-cat="${sanitize(c)}">${sanitize(c)}</button>
    `).join('');

    filterBar.addEventListener('click', e => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      els('.filter-btn', filterBar).forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProjectCards(grid, btn.dataset.cat);
    });
  }

  renderProjectCards(grid, 'All');
}

function renderProjectCards(grid, cat) {
  const filtered = cat === 'All'
    ? DATA.PROJECTS
    : DATA.PROJECTS.filter(p => p.category === cat);
  grid.innerHTML = filtered.length
    ? filtered.map(p => projectCardHTML(p)).join('')
    : '<p style="color:var(--gray);grid-column:1/-1;text-align:center;padding:48px 0">No projects in this category.</p>';
  setTimeout(initReveal, 60);
}

/* ═══════════════════════════════════════════
   PUBLICATIONS PAGE
   ═══════════════════════════════════════════ */

function renderPublications() {
  const pub = DATA.PUBLICATIONS;

  const stats = el('#pub-stats');
  if (stats) {
    const published = [...pub.journal, ...pub.conference].filter(p => /published/i.test(p.status)).length;
    const presented = [...pub.journal, ...pub.conference].filter(p => /presented/i.test(p.status)).length;
    const tiles = [
      { value: published, label: 'Papers published', accent: true },
      { value: presented, label: 'Papers presented' },
      { value: pub.inProgress.length, label: 'Under publication' },
      { value: pub.peerReview.length, label: 'Peer reviews' },
    ];
    stats.innerHTML = tiles.map(t => `
      <div class="pub-stat${t.accent ? ' pub-stat--accent' : ''}">
        <div class="pub-stat__value">${t.value}</div>
        <div class="pub-stat__label">${sanitize(t.label)}</div>
      </div>
    `).join('');
  }

  const journal = el('#pub-journal');
  if (journal && pub.journal.length) {
    journal.innerHTML = pubSectionHTML('Journal Papers', pub.journal);
  }

  const conf = el('#pub-conference');
  if (conf && pub.conference.length) {
    conf.innerHTML = pubSectionHTML('Conference Papers', pub.conference);
  }

  const inprog = el('#pub-inprogress');
  if (inprog && pub.inProgress.length) {
    inprog.innerHTML = pubSectionHTML('Under Publication', pub.inProgress);
  }

  const pr = el('#pub-peerreview');
  if (pr && pub.peerReview.length) {
    pr.innerHTML = `
      <h2 class="pub-section__heading">
        <span class="pub-section__heading-dot"></span>
        Peer Review Contributions
        <span class="pub-section__count">${pub.peerReview.length}</span>
      </h2>
      <div class="pub-cards">
        ${pub.peerReview.map(r => `
          <article class="pub-card reveal">
            <div class="pub-card__year">${sanitize(r.year)}<small>Review</small></div>
            <div class="pub-card__body">
              <div class="pub-card__venue">${sanitize(r.title)}</div>
              <h3 class="pub-card__title">${sanitize(r.journal)}</h3>
              <p class="pub-card__note">${sanitize(r.note)}</p>
            </div>
          </article>
        `).join('')}
      </div>
    `;
  }
}

function pubSectionHTML(label, items) {
  return `
    <h2 class="pub-section__heading">
      <span class="pub-section__heading-dot"></span>
      ${sanitize(label)}
      <span class="pub-section__count">${items.length}</span>
    </h2>
    <div class="pub-cards">
      ${items.map(p => pubCardHTML(p)).join('')}
    </div>
  `;
}

/* ═══════════════════════════════════════════
   INSIGHTS PAGE
   ═══════════════════════════════════════════ */

function renderInsights() {
  const grid = el('#insights-grid');
  const filterBar = el('#insights-filter');
  if (!grid) return;

  const articleItems = DATA.INSIGHTS.filter(i => !i.contentType);
  let activeCat = 'All';

  function renderGrid() {
    const items = articleItems.filter(i => activeCat === 'All' || i.category === activeCat);
    grid.innerHTML = items.length
      ? items.map(i => insightCardHTML(i)).join('')
      : `<p style="color:var(--gray);grid-column:1/-1;text-align:center;padding:32px 0">No articles in this selection.</p>`;
    setTimeout(initReveal, 60);
  }

  const categories = ['All', ...new Set(articleItems.map(i => i.category))];
  if (filterBar) {
    filterBar.innerHTML = categories.map(c => `
      <button class="filter-btn${c === 'All' ? ' active' : ''}" data-cat="${sanitize(c)}">${sanitize(c)}</button>
    `).join('');
    filterBar.addEventListener('click', e => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      els('.filter-btn', filterBar).forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCat = btn.dataset.cat;
      renderGrid();
    });
  }

  renderGrid();
}

function renderShowcase() {
  const grid = el('#showcase-grid');
  const filterBar = el('#showcase-filter');
  const typeBar = el('#showcase-type-filter');
  if (!grid) return;

  const showcaseItems = DATA.INSIGHTS.filter(i => i.contentType);
  let activeCat = 'All';
  let activeType = 'All';

  function renderGrid() {
    const items = showcaseItems.filter(i => {
      const typeMatch = activeType === 'All' || i.contentType === activeType;
      const catMatch = activeCat === 'All' || i.category === activeCat;
      return typeMatch && catMatch;
    });

    grid.innerHTML = items.length
      ? items.map(i => insightCardHTML(i)).join('')
      : `<p style="color:var(--gray);grid-column:1/-1;text-align:center;padding:32px 0">No showcase items in this selection.</p>`;
    setTimeout(initReveal, 60);
  }

  const preferredContentTypes = ['report', 'presentation', 'poster', 'note', 'book'];
  const contentTypes = ['All', ...preferredContentTypes.filter(type => showcaseItems.some(i => i.contentType === type) || ['note', 'book'].includes(type))];
  if (typeBar) {
    typeBar.innerHTML = contentTypes.map(type => {
      const label = type === 'All' ? 'All' : getContentTypeMeta(type).label;
      return `<button class="filter-btn${type === 'All' ? ' active' : ''}" data-type="${sanitize(type)}">${sanitize(label)}</button>`;
    }).join('');
    typeBar.addEventListener('click', e => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      els('.filter-btn', typeBar).forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeType = btn.dataset.type;
      renderGrid();
    });
  }

  const categories = ['All', ...new Set(showcaseItems.map(i => i.category))];
  if (filterBar) {
    filterBar.innerHTML = categories.map(c => `
      <button class="filter-btn${c === 'All' ? ' active' : ''}" data-cat="${sanitize(c)}">${sanitize(c)}</button>
    `).join('');
    filterBar.addEventListener('click', e => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      els('.filter-btn', filterBar).forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCat = btn.dataset.cat;
      renderGrid();
    });
  }

  renderGrid();
}


/* ═══════════════════════════════════════════
   GALLERY PAGE
   ═══════════════════════════════════════════ */

function renderGallery() {
  const grid = el('#gallery-grid');
  const filterBar = el('#gallery-filter');
  if (!grid) return;

  // Build filter bar
  const categories = ['All', ...new Set(DATA.GALLERY.map(g => g.category))];
  if (filterBar) {
    filterBar.innerHTML = categories.map(c => `
      <button class="filter-btn${c === 'All' ? ' active' : ''}" data-cat="${sanitize(c)}">${sanitize(c)}</button>
    `).join('');

    filterBar.addEventListener('click', e => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      els('.filter-btn', filterBar).forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;
      const filtered = cat === 'All' ? DATA.GALLERY : DATA.GALLERY.filter(g => g.category === cat);
      renderGalleryItems(grid, filtered);
    });
  }

  renderGalleryItems(grid, DATA.GALLERY);
}

function renderGalleryItems(grid, items) {
  grid.innerHTML = items.map((item, idx) => `
    <div class="gallery-item reveal" data-idx="${idx}">
      <img
        src="${sanitize(item.src)}"
        alt="${sanitize(item.caption)}"
        loading="lazy"
        onerror="this.style.display='none';this.nextElementSibling.style.display='flex';"
      />
      <div class="gallery-item__placeholder">
        ${icon('image')}
        <span>${sanitize(item.caption)}</span>
      </div>
      <div class="gallery-item__overlay">
        <span class="tag tag--dark">${sanitize(item.category)}</span>
        <div class="gallery-item__caption">${sanitize(item.caption)}</div>
      </div>
    </div>
  `).join('');
  setTimeout(initReveal, 60);
}

/* ═══════════════════════════════════════════
   CONTACT PAGE
   ═══════════════════════════════════════════ */

function renderContact() {
  renderContactInfo();
  renderContactProfileLinks();
  initContactForm();
}

function renderContactInfo() {
  const C = DATA.CONTACT;
  const infoEl = el('#contact-info');
  if (infoEl) {
    const telHref = (C.phone || '').replace(/[^\d+]/g, '');
    infoEl.innerHTML = `
      <div class="contact-info-item">
        <div class="contact-info-icon">${icon('mail')}</div>
        <div class="contact-info-text">
          <div class="contact-info-label">Email</div>
          <div class="contact-info-value"><a href="mailto:${sanitize(C.email)}">${sanitize(C.email)}</a></div>
        </div>
      </div>
      <div class="contact-info-item">
        <div class="contact-info-icon">${icon('phone')}</div>
        <div class="contact-info-text">
          <div class="contact-info-label">Phone</div>
          <div class="contact-info-value"><a href="tel:${sanitize(telHref)}">${sanitize(C.phone)}</a></div>
        </div>
      </div>
      <div class="contact-info-item">
        <div class="contact-info-icon">${icon('pin')}</div>
        <div class="contact-info-text">
          <div class="contact-info-label">Location</div>
          <div class="contact-info-value">${sanitize(C.location)}</div>
        </div>
      </div>
      <div class="contact-info-item">
        <div class="contact-info-icon">${icon('briefcase')}</div>
        <div class="contact-info-text">
          <div class="contact-info-label">Availability</div>
          <div class="contact-info-value">${sanitize(C.availability)}</div>
        </div>
      </div>
    `;
  }
}

function renderContactProfileLinks() {
  const linksEl = el('#contact-profile-links');
  if (!linksEl) return;
  const L = DATA.LINKS;
  const links = [
    { name: 'LinkedIn',       url: L.linkedin,      icon: 'linkedin' },
    { name: 'ResearchGate',   url: L.researchgate,  icon: 'microscope' },
    { name: 'Google Scholar', url: L.googleScholar, icon: 'cap' },
    { name: 'ORCID',          url: L.orcid,         icon: 'idcard' },
  ].filter(l => l.url);
  linksEl.innerHTML = links.map(l => `
    <a href="${sanitize(l.url)}" target="_blank" rel="noopener" class="contact-link">
      <span class="contact-link__icon">${icon(l.icon)}</span>${sanitize(l.name)}${icon('external')}
    </a>
  `).join('');
}

function initContactForm() {
  const form = el('#contact-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;

    const fields = ['name', 'email', 'subject', 'message'];
    fields.forEach(id => {
      const input   = el(`#form-${id}`);
      const errorEl = el(`#err-${id}`);
      if (!input) return;

      const val = input.value.trim();
      let msg = '';

      if (!val) {
        msg = 'This field is required.';
      } else if (id === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        msg = 'Please enter a valid email address.';
      } else if (id === 'name' && val.length < 2) {
        msg = 'Name must be at least 2 characters.';
      } else if (id === 'message' && val.length < 20) {
        msg = 'Please provide a more detailed message (min. 20 characters).';
      }

      if (msg) {
        valid = false;
        input.classList.add('input-error');
        if (errorEl) { errorEl.textContent = msg; errorEl.classList.add('visible'); }
      } else {
        input.classList.remove('input-error');
        if (errorEl) errorEl.classList.remove('visible');
      }
    });

    const feedback = el('#form-feedback');
    if (valid) {
      // No backend on a static site: hand the message to the visitor's email app.
      const val = id => (el(`#form-${id}`)?.value || '').trim();
      const to = DATA.CONTACT.email;
      const body = `${val('message')}\n\n— ${val('name')}${val('organisation') ? `, ${val('organisation')}` : ''}\n${val('email')}`;
      const mailto = `mailto:${to}?subject=${encodeURIComponent(val('subject'))}&body=${encodeURIComponent(body)}`;
      if (feedback) {
        feedback.className = 'form-feedback success';
        feedback.innerHTML = `
          <div class="form-feedback__icon">${icon('check')}</div>
          <div>
            <strong>Your email app should open with this message ready to send.</strong><br>
            If it doesn't, write directly to <a href="mailto:${sanitize(to)}" style="text-decoration:underline">${sanitize(to)}</a>.
          </div>
        `;
        feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      window.location.href = mailto;
    } else {
      if (feedback) {
        feedback.className = 'form-feedback error';
        feedback.innerHTML = `
          <div class="form-feedback__icon">!</div>
          <div>Please correct the errors highlighted above before sending.</div>
        `;
      }
    }
  });

  // Clear errors on input
  els('input, textarea, select', form).forEach(input => {
    input.addEventListener('input', () => {
      input.classList.remove('input-error');
      const id = input.id ? input.id.replace('form-', '') : '';
      const errorEl = el(`#err-${id}`);
      if (errorEl) errorEl.classList.remove('visible');
      // Also clear general feedback
      const feedback = el('#form-feedback');
      if (feedback && feedback.classList.contains('error')) {
        feedback.className = 'form-feedback';
        feedback.innerHTML = '';
      }
    });
  });
}

/* ═══════════════════════════════════════════
   PAGE ROUTER
   ═══════════════════════════════════════════ */

function route() {
  const page = currentPage();
  if (page === 'index.html' || page === '')        renderHome();
  else if (page === 'about.html')                  renderAbout();
  else if (page === 'projects.html')               renderProjects();
  else if (page === 'publications.html')            renderPublications();
  else if (page === 'insights.html')               renderInsights();
  else if (page === 'showcase.html')               renderShowcase();
  else if (page === 'gallery.html')                renderGallery();
  else if (page === 'contact.html')                renderContact();
}

/* ═══════════════════════════════════════════
   INIT
   ═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  hydrateIcons();
  route();
  initQuickActions();
  initDock();
  // Delay reveal init to allow dynamic content to render first
  setTimeout(initReveal, 100);
});
