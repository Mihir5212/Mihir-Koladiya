/* Newest-first ordering for publications, projects and insights */
const MONTHS = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];
function dateVal(s) {
  s = String(s || '').toLowerCase();
  const years = s.match(/(19|20)\d{2}/g);
  if (!years) return 0;
  const m = MONTHS.findIndex(x => s.includes(x));
  return Number(years[years.length - 1]) * 100 + (m < 0 ? 0 : m + 1);
}
function newestFirst(list, get) {
  return (list || []).map((x, i) => [x, i])
    .sort((a, b) => dateVal(get(b[0])) - dateVal(get(a[0])) || b[1] - a[1])
    .map(a => a[0]);
}
if (typeof DATA !== 'undefined') {
  const P = DATA.PUBLICATIONS || {};
  ['journal', 'conference', 'inProgress', 'peerReview'].forEach(k => { if (P[k]) P[k] = newestFirst(P[k], x => x.year); });
  if (DATA.PROJECTS) DATA.PROJECTS = newestFirst(DATA.PROJECTS, x => x.year);
  if (DATA.INSIGHTS) DATA.INSIGHTS = newestFirst(DATA.INSIGHTS, x => x.date);
}

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
  // Works on GitHub Pages (/repo/about.html), Vercel clean URLs (/about) and the root (/)
  let path = decodeURIComponent(window.location.pathname).replace(/\/+$/, '').split('/').pop() || 'index.html';
  if (!/\.html?$/i.test(path)) path += '.html';
  return path;
}
function getStatusClass(status) {
  const s = (status || '').toLowerCase();
  if (s === 'completed')                               return 'status--completed';
  if (s.includes('progress') || s.includes('ongoing')) return 'status--progress';
  if (s === 'published' || s === 'presented' || s === 'accepted') return 'status--published';
  if (s.includes('review') || s.includes('revision'))  return 'status--review';
  return 'status--progress';
}
function sanitize(str) {
  const d = document.createElement('div');
  d.textContent = str || '';
  return d.innerHTML;
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
    toggle.addEventListener('click', () => links.classList.toggle('open'));
    els('a', links).forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
  }

  // Active link
  const page = currentPage();
  els('.navbar__links a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
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

function projectCaseHTML(p, i = 0) {
  const all = p.tools || [];
  const tools = all.slice(0, 4).map(t => `<span class="pc__tool">${sanitize(t)}</span>`).join('') + (all.length > 4 ? `<span class="pc__tool pc__tool--more">+${all.length - 4}</span>` : '');
  return `
    <a href="projects.html" class="pc reveal" aria-label="View project: ${sanitize(p.title)}">
      <div class="pc__side">
        <span class="pc__idx">${String(i + 1).padStart(2, '0')}</span>
        <span class="pc__cat">${sanitize(p.category)}</span>
        <span class="pc__status">${sanitize(p.status)}</span>
      </div>
      <div class="pc__main">
        <h3 class="pc__title">${sanitize(p.title)}</h3>
        <p class="pc__desc">${sanitize(p.description)}</p>
        ${(p.outcomes || []).length ? `<ul class="pc__outs">${p.outcomes.slice(0, 1).map(x => `<li>${sanitize(x)}</li>`).join('')}</ul>` : ''}
        <div class="pc__foot">
          <div class="pc__tools">${tools}</div>
          <span class="pc__go">View case study <span aria-hidden="true">&rarr;</span></span>
        </div>
      </div>
    </a>`;
}

function projectCardHTML(p) {
  const tools = (p.tools || []).slice(0, 4).map(t => `<span class="project-card__tool">${sanitize(t)}</span>`).join('');
  return `
    <a href="projects.html" class="project-card reveal" style="text-decoration:none;display:flex;flex-direction:column" aria-label="View project: ${sanitize(p.title)}">
      <div class="project-card__bar"></div>
      <div class="project-card__body">
        <div class="project-card__header">
          <div class="project-card__title">${sanitize(p.title)}</div>
          <div class="project-card__year">${sanitize(p.year)}</div>
        </div>
        <span class="tag">${sanitize(p.category)}</span>
        <div class="project-card__desc">${sanitize(p.description)}</div>
        <div style="margin-top:auto;padding-top:12px">
          <span class="btn-ghost" style="font-size:0.8rem">View Details</span>
        </div>
      </div>
      <div class="project-card__footer">
        <div class="project-card__tools">${tools}</div>
        <span class="status-badge ${getStatusClass(p.status)}">${sanitize(p.status)}</span>
      </div>
    </a>
  `;
}

const QUOTE_SVG = '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"/><path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"/></svg>';
const EXT_SVG = '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>';
const CHECK_SVG = '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M20 6 9 17l-5-5"/></svg>';

function pubAuthors(authors) {
  const raw = String(authors || '');
  const fullNames = !/,\s*[A-Z]\.(,|\s|$)/.test(raw);   // "Mihir Koladiya, …" vs "Koladiya, M., …"
  const list = (fullNames ? raw.split(/\s*,\s*|\s+and\s+/) : raw.split(/\s*,?\s*&\s*|(?<=\.)\s*,\s*|\s*,\s*(?=\[)/))
    .map(a => a.trim()).filter(Boolean);
  const me = a => /koladiya/i.test(a);
  const initials = a => {
    if (/^\[/.test(a)) return '+';
    if (fullNames) {
      const parts = a.replace(/^(Prof\.|Dr\.)\s+/i, '').split(/\s+/);
      return ((parts[0] || '')[0] + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase();
    }
    const surname = a.split(',')[0];
    const rest = a.slice(surname.length).replace(/[^A-Za-z]/g, '');
    return ((surname[0] || '') + (rest[0] || '')).toUpperCase();
  };
  const avatars = list.slice(0, 4).map((a, i) => me(a)
    ? `<span class="pub-av pub-av--me" data-tip="${sanitize(a)}" style="z-index:${9 - i}"><img src="assets/images/profile.jpg" alt="" onerror="this.remove()" /></span>`
    : `<span class="pub-av pub-av--${i % 3}" data-tip="${sanitize(a)}" style="z-index:${9 - i}">${sanitize(initials(a))}</span>`).join('');
  const names = list.map(a => me(a) ? `<strong>${sanitize(a)}</strong>` : sanitize(a)).join(', ');
  return `<div class="pub-card__authors"><span class="pub-avs" aria-hidden="true">${avatars}</span><span class="pub-card__names">${names}</span></div>`;
}

// Publication logos: assets/images/logos/<key>.(png|jpg|webp|svg). Set p.logo to force a key.
const PUB_LOGO = { trb: /TRB|Transportation Research Board/i, iitb: /IIT Bombay/i, iitr: /IIT Roorkee/i, manit: /NIT Bhopal|MANIT/i, svnit: /SVNIT/i, springer: /^10\.1007\//, ejmanager: /Journal of Engineering Research and Reviews/i };
function pubLogoHTML(p) {
  const venue = p.journal || p.conference || p.title || '';
  const k = p.logo || Object.keys(PUB_LOGO).find(x => PUB_LOGO[x].test(venue + ' ' + (p.title || '')) || PUB_LOGO[x].test(p.doi || ''));
  const ini = sanitize((venue.match(/[A-Z]{2,}/) || [venue.slice(0, 2)])[0].slice(0, 4));
  return `<span class="pub-logo">${k ? `<img class="pf-orglogo" src="assets/images/logos/${k}.png" alt="" loading="lazy" data-k="${k}" onerror="pfLogoFallback(this)"><span class="pf-orglogo-fb" hidden>${ini}</span>` : ini}</span>`;
}
function pubTimelineHTML(items, accentClass = '', kind = '') {
  const rank = p => /published/i.test(p.status || '') ? 0 : /accepted/i.test(p.status || '') ? 1 : /presented/i.test(p.status || '') ? 2 : 3;
  const sorted = [...items].sort((a, b) => (rank(a) - rank(b)) || ((+b.year || 0) - (+a.year || 0)));
  let last = '';
  return `<ol class="pub-tl">${sorted.map(p => {
    const y = String(p.year || ''); const show = y !== last; last = y;
    return `<li class="pub-tl__item${show ? ' is-first' : ''}"><div class="pub-tl__year">${show ? sanitize(y) : ''}</div><div class="pub-tl__rail"><span class="pub-tl__dot"></span></div>${pubCardHTML(p, accentClass, kind)}</li>`;
  }).join('')}</ol>`;
}

function pubCardHTML(p, accentClass = '', kindOverride = '') {
  const venue = p.journal || p.conference || '';
  const kind  = kindOverride || (p.journal ? 'Journal' : 'Conference');
  const doi   = p.doi ? `<span class="pub-card__doi">DOI ${sanitize(p.doi)}</span>` : '';
  const link  = p.link ? `<a href="${sanitize(p.link)}" target="_blank" rel="noopener" class="pub-card__link">Read paper ${EXT_SVG}</a>` : '';
  // Springer-style author list: "Mihir Koladiya, Pankaj S. Prajapati" -> "Koladiya, M., Prajapati, P.S."
  const citeAuthors = String(p.authors || '').split(/\s*,\s*|\s+and\s+/).filter(Boolean).map(n => {
    const w = n.replace(/^(Prof\.|Dr\.)\s+/i, '').split(/\s+/); const last = w.pop();
    return `${last}, ${w.map(x => x[0].toUpperCase() + '.').join('')}`;
  }).join(', ');
  const cite  = p.citation || `${citeAuthors} (${p.year || ''}). ${p.title || ''}. ${venue}.${p.doi ? ' https://doi.org/' + p.doi : ''}`;
  return `
    <article class="pub-card reveal ${accentClass ? 'pub-card--gold' : ''}">
      <div class="pub-card__body">
        <div class="pub-card__venue">${sanitize(kind)}${venue ? ` · ${sanitize(venue)}` : ''}</div>
        <h3 class="pub-card__title">${sanitize(p.title)}</h3>
        ${p.authors ? pubAuthors(p.authors) : ''}
        ${p.note ? `<p class="pub-card__note">${sanitize(p.note)}</p>` : ''}
        <div class="pub-card__footer">
          ${p.status ? `<span class="status-badge ${getStatusClass(p.status)}${/^published$/i.test(p.status || '') ? ' is-published' : ''}">${sanitize(p.status)}${p.presented && !/presented/i.test(p.status) ? ' &amp; Presented' : ''}${p.presentedBy ? ' by ' + sanitize(p.presentedBy) : ''}</span>` : ''}
          ${doi}
          ${link}
          ${p.note ? '' : `<button type="button" class="pub-card__cite" data-cite="${sanitize(cite)}">${QUOTE_SVG} Cite</button>`}
        </div>
      </div>
    </article>
  `;
}

/* Cite: copy the citation and show a toast (same behaviour as the earlier site) */
document.addEventListener('click', e => {
  const btn = e.target.closest && e.target.closest('.pub-card__cite');
  if (!btn || btn.classList.contains('sc-open')) return;
  e.preventDefault();
  copyText(btn.getAttribute('data-cite'), 'Citation');
});

function toast(message, kind = 'success') {
  let stack = el('.toast-stack');
  if (!stack) {
    stack = document.createElement('div');
    stack.className = 'toast-stack';
    stack.setAttribute('role', 'status');
    stack.setAttribute('aria-live', 'polite');
    document.body.appendChild(stack);
  }
  const t = document.createElement('div');
  t.className = `toast toast--${kind}`;
  t.innerHTML = `<span class="toast__icon">${kind === 'success' ? CHECK_SVG : '!'}</span><span>${sanitize(message)}</span>`;
  stack.appendChild(t);
  requestAnimationFrame(() => requestAnimationFrame(() => t.classList.add('is-in')));
  setTimeout(() => {
    t.classList.remove('is-in');
    setTimeout(() => t.remove(), 450);
  }, 2600);
}

async function copyText(text, label = 'Text') {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      ta.remove();
      if (!ok) throw new Error('copy failed');
    }
    toast(`${label} copied to clipboard`);
  } catch {
    toast('Could not copy — please select and copy it manually', 'error');
  }
}

function getContentTypeMeta(type) {
  switch (type) {
    case 'report':
      return { icon: '📄', label: 'Report', className: 'report', buttonLabel: 'View Report', viewerLabel: 'Report Viewer' };
    case 'presentation':
      return { icon: '📊', label: 'Presentation', className: 'ppt', buttonLabel: 'View Presentation', viewerLabel: 'Presentation Viewer' };
    case 'poster':
      return { icon: '🖼', label: 'Poster', className: 'poster', buttonLabel: 'View Poster', viewerLabel: 'Poster Viewer' };
    case 'note':
      return { icon: '📝', label: 'Short Note', className: 'note', buttonLabel: 'View Short Note', viewerLabel: 'Short Note Viewer' };
    case 'book':
      return { icon: '📚', label: 'Books', className: 'book', buttonLabel: 'View Book', viewerLabel: 'Book Viewer' };
    default:
      return { icon: '📁', label: 'Document', className: 'doc', buttonLabel: 'View File', viewerLabel: 'Document Viewer' };
  }
}

function insightCardHTML(item) {
  const meta = getContentTypeMeta(item.contentType);
  const isSpecial = Boolean(item.contentType);
  const typeBadge = isSpecial
    ? `<span class="insight-type-badge insight-type-badge--${sanitize(meta.className)}">${meta.icon} ${meta.label}</span>`
    : '';

  if (!isSpecial) {
    const articleImage = sanitize(item.heroImage || '');
    const articleImageAlt = sanitize(item.heroImageAlt || item.title || 'Article image');

    return `
      <div class="insight-card insight-card--article${articleImage ? ' insight-card--with-image' : ''} reveal" aria-label="Article: ${sanitize(item.title)}">
        ${articleImage ? `
        <div class="insight-card__preview insight-card__preview--article">
          <img src="${articleImage}" alt="${articleImageAlt}" loading="lazy">
        </div>` : ''}
        <div class="insight-card__meta">
          <span class="tag">${sanitize(item.category)}</span>
          <span class="insight-card__read">${sanitize(item.readTime)}</span>
        </div>
        <div class="insight-card__title">${sanitize(item.title)}</div>
        <div class="insight-card__date">${sanitize(item.date)}</div>
        <div class="insight-card__excerpt">${sanitize(item.excerpt)}</div>
        <div class="insight-card__action">
          <a href="insight-detail.html?id=${item.id}" class="btn-ghost" aria-label="View article details">Details</a>
        </div>
      </div>
    `;
  }

  const pdfSrc = sanitize(item.pdfSrc || '');
  const cardId = `pdf-viewer-${item.id}`;
  const toggleId = `pdf-toggle-${item.id}`;

  return `
    <div class="insight-card insight-card--viewer reveal" id="${sanitize(cardId)}">
      <div class="insight-card__header">
        <div class="insight-card__header-left">
          <div class="insight-card__meta">
            <span class="tag">${sanitize(item.category)}</span>
            <span class="insight-card__read">${sanitize(item.readTime)}</span>
          </div>
          ${typeBadge}
        </div>
        <div class="insight-card__header-right">
          <span class="insight-card__date">${sanitize(item.date)}</span>
        </div>
      </div>

      <div class="insight-card__title">${sanitize(item.title)}</div>
      <div class="insight-card__excerpt">${sanitize(item.excerpt)}</div>

      ${(item.highlights || []).length ? `
      <div class="insight-card__highlights">
        ${(item.highlights || []).slice(0, 3).map(h => `
          <div class="insight-card__highlight-item">
            <span class="insight-card__highlight-dot"></span>
            <span>${sanitize(h)}</span>
          </div>`).join('')}
      </div>` : ''}

      ${pdfSrc ? `
      <div class="insight-pdf-wrap" id="${toggleId}" style="display:none">
        <div class="insight-pdf-toolbar">
          <div class="insight-pdf-toolbar__dots">
            <span style="background:#ff5f57"></span>
            <span style="background:#febc2e"></span>
            <span style="background:#28c840"></span>
          </div>
          <span class="insight-pdf-toolbar__label">${meta.viewerLabel} — ${sanitize(item.title)}</span>
          <div class="insight-pdf-toolbar__actions">
            <button class="insight-pdf-btn insight-pdf-btn--close"
              onclick="document.getElementById('${toggleId}').style.display='none'; document.getElementById('${toggleId}').previousElementSibling.querySelector('.insight-view-btn').textContent='${meta.icon} ${meta.buttonLabel}';"
              aria-label="Close viewer">✕ Close</button>
          </div>
        </div>
        <iframe
          src="${pdfSrc}#toolbar=0&navpanes=0&scrollbar=1&view=FitH"
          class="insight-pdf-iframe"
          title="${sanitize(item.title)} PDF Viewer"
          loading="lazy"
          aria-label="PDF viewer for ${sanitize(item.title)}">
          <p>Your browser does not support embedded PDFs.</p>
        </iframe>
      </div>` : ''}

      <div class="insight-card__actions">
        ${pdfSrc ? `
        <button class="insight-view-btn" onclick="(function(btn){
          var wrap = document.getElementById('${toggleId}');
          if(wrap.style.display==='none'||!wrap.style.display){
            wrap.style.display='block';
            btn.textContent='✕ Close Viewer';
          } else {
            wrap.style.display='none';
            btn.textContent='${meta.icon} ${meta.buttonLabel}';
          }
        })(this)" aria-label="Toggle inline viewer">
          ${meta.icon} ${meta.buttonLabel}
        </button>` : ''}
      </div>
    </div>
  `;
}


/* ═══════════════════════════════════════════
   HOME PAGE
   ═══════════════════════════════════════════ */

function renderHome() {
  if (el('#hp-journey') || el('#hp-work')) renderHomeV3();
  if (el('.mh-hero')) renderHomeHero(); else { renderHero(); renderStats(); }
  renderFeaturedProjects();
  renderResearchAreas();
  renderPubsPreview();
  renderInsightsPreview();
  renderHomeProfile();
  try { renderHomeGallery(); } catch (e) { console.error(e); }
  initCounters();
}

/* ═══════════════════════════════════════════
   HOME — GALLERY CAROUSEL (coverflow)
   ═══════════════════════════════════════════ */
function renderHomeGallery() {
  const stage = el('#hg-stage');
  if (!stage || !DATA.GALLERY || !DATA.GALLERY.length) return;
  const dots = el('#hg-dots'), cap = el('#hg-cap');
  const all = DATA.GALLERY.slice().sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  const MAX = 12;
  let list = [], cur = 0;

  function build() {
    list = all.slice(0, MAX);
    cur = 0;
    stage.innerHTML = list.map((g, i) => `
      <button class="hg__card" data-i="${i}" tabindex="-1" aria-label="${sanitize(g.caption || 'Photo ' + (i + 1))}">
        <img src="${sanitize(g.src)}" alt="" loading="eager" onload="this.parentNode.dataset.r = this.naturalWidth / this.naturalHeight; window.__hgLayout && window.__hgLayout();" />
        <span class="hg__over"><strong>${sanitize(g.caption || '')}</strong>${g.date ? `<em>${formatGalleryDate(g.date)}</em>` : ''}</span>
      </button>`).join('');
    dots.innerHTML = list.map((_, i) => `<button class="hg__dot" data-i="${i}" aria-label="Photo ${i + 1}"></button>`).join('');
    layout();
  }
  let lt; window.__hgLayout = () => { clearTimeout(lt); lt = setTimeout(layout, 30); };

  // Each card keeps its photo's own shape (portrait photos are not cropped).
  // All cards share one height; positions are computed in px from real widths.
  function layout() {
    const n = list.length, narrow = window.innerWidth <= 700;
    const H = stage.clientHeight * (narrow ? 0.86 : 0.9);
    const cards = [...stage.querySelectorAll('.hg__card')];
    const SCALE = [1, 0.8, 0.62], OVERLAP = 0.28;
    const widths = cards.map(c => {
      const r = Math.min(1.6, Math.max(0.62, parseFloat(c.dataset.r) || 4 / 3));
      const w = Math.min(H * r, window.innerWidth * (narrow ? 0.78 : 0.62));
      c.style.width = w + 'px'; c.style.height = (w / r) + 'px';
      return w;
    });
    const off = i => { let d = i - cur; if (d > n / 2) d -= n; if (d < -n / 2) d += n; return d; };
    const idxAt = d => ((cur + d) % n + n) % n;
    const pos = { 0: 0 };
    [1, -1].forEach(dir => {
      let x = 0;
      for (let k = 1; k <= 3 && k < n; k++) {
        const prevW = widths[idxAt(dir * (k - 1))] * SCALE[Math.min(k - 1, 2)];
        const w = widths[idxAt(dir * k)] * SCALE[Math.min(k, 2)];
        x += (prevW / 2 + w / 2 - w * OVERLAP) * dir;
        pos[dir * k] = x;
      }
    });
    cards.forEach((c, i) => {
      const d = off(i), a = Math.abs(d);
      const x = a <= 3 ? pos[d] : 900 * Math.sign(d);
      c.style.transform = `translate(-50%, -50%) translateX(${x}px) scale(${SCALE[Math.min(a, 2)]})`;
      c.style.zIndex = 10 - a;
      c.style.opacity = a > 2 ? 0 : a === 2 ? 0.28 : a === 1 ? 0.6 : 1;
      c.style.filter = a === 0 ? 'none' : a === 1 ? 'blur(2.5px) brightness(0.75) saturate(0.85)' : 'blur(5px) brightness(0.6) saturate(0.7)';
      c.style.pointerEvents = a > 2 ? 'none' : '';
      c.classList.toggle('is-active', a === 0);
      c.setAttribute('aria-current', a === 0 ? 'true' : 'false');
    });
    dots.querySelectorAll('.hg__dot').forEach((d, i) => d.classList.toggle('active', i === cur));
    const it = list[cur];
    cap.innerHTML = it ? `<strong>${sanitize(it.caption || '')}</strong>${it.date ? `<span>${formatGalleryDate(it.date)}</span>` : ''}` : '';
  }

  const go = i => { cur = (i + list.length) % list.length; layout(); };
  el('#hg-prev').addEventListener('click', () => go(cur - 1));
  el('#hg-next').addEventListener('click', () => go(cur + 1));
  dots.addEventListener('click', e => { const d = e.target.closest('.hg__dot'); if (d) go(+d.dataset.i); });
  stage.addEventListener('click', e => {
    const c = e.target.closest('.hg__card'); if (!c) return;
    const i = +c.dataset.i;
    if (i === cur) window.location.href = 'gallery.html'; else go(i);
  });
  let tx = null;
  stage.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
  stage.addEventListener('touchend', e => {
    if (tx === null) return; const dx = e.changedTouches[0].clientX - tx; tx = null;
    if (Math.abs(dx) > 40) go(cur + (dx < 0 ? 1 : -1));
  });
  stage.setAttribute('tabindex', '0');
  stage.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') go(cur - 1);
    if (e.key === 'ArrowRight') go(cur + 1);
  });
  let rt; window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(layout, 120); });
  // Auto-play every 4s; pause on hover/touch/focus, hidden tab, or reduced motion
  const section = stage.closest('.hg') || stage;
  let paused = false, timer = null;
  const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const tick = () => { if (!paused && !document.hidden && list.length > 1) go(cur + 1); };
  const restart = () => { clearInterval(timer); if (!reduce) timer = setInterval(tick, 4000); };
  section.addEventListener('mouseenter', () => { paused = true; });
  section.addEventListener('mouseleave', () => { paused = false; restart(); });
  section.addEventListener('focusin', () => { paused = true; });
  section.addEventListener('focusout', () => { paused = false; });
  stage.addEventListener('touchstart', () => { paused = true; clearTimeout(section._tp); }, { passive: true });
  stage.addEventListener('touchend', () => { section._tp = setTimeout(() => { paused = false; restart(); }, 5000); });
  [el('#hg-prev'), el('#hg-next'), dots].forEach(b => b.addEventListener('click', restart));
  restart();
  build();
}

function renderHomeProfile() {
  const p = DATA.PROFILE;
  const bio = el('#h5-bio');
  if (bio) bio.innerHTML = p.longBio.split(/\n\s*\n/).map(t => `<p>${sanitize(t.trim())}</p>`).join('');
  const facts = el('#h5-facts');
  if (!facts) return;
  const job = (DATA.EXPERIENCE || [])[0];
  const edu = (DATA.EDUCATION || [])[0];
  const rows = [
    ['Current role', job && `${job.role.split('–')[0].trim()}, ${/SVNIT/.test(job.org) ? 'SVNIT Surat' : job.org}`],
    ['Education', edu && (edu.degree || edu.title)],
    ['Location', p.location],
    ['Email', p.email && `<a href="mailto:${sanitize(p.email)}">${sanitize(p.email)}</a>`, true],
    ['Phone', p.phone],
    ['Languages', 'Gujarati, Hindi, English'],
  ].filter(r => r[1]);
  facts.innerHTML = rows.map(([k, v, raw]) => `<div><dt>${k}</dt><dd>${raw ? v : sanitize(v)}</dd></div>`).join('');
}

function renderHero() {
  const p = DATA.PROFILE;
  const nameEl  = el('#hero-name');
  const titleEl = el('#hero-title');
  const tagEl   = el('#hero-tagline');

  if (nameEl)  nameEl.textContent  = p.name;
  if (titleEl) titleEl.textContent = p.title;
  if (tagEl)   tagEl.textContent   = p.tagline;

  const card = el('#hero-card');
  if (card) {
    card.innerHTML = `
      <div class="hero__card-item">
        <span class="hero__card-label">Location</span>
        <span class="hero__card-value">${sanitize(p.location)}</span>
      </div>
      <div class="hero__card-divider"></div>
      <div class="hero__card-item">
        <span class="hero__card-label">Specialization</span>
        <span class="hero__card-value">Road Safety &amp; GIS</span>
      </div>
      <div class="hero__card-divider"></div>
      <div class="hero__card-item">
        <span class="hero__card-label">Current Status</span>
        <span class="hero__card-value" style="color:var(--accent)">Open to Opportunities</span>
      </div>
      <div class="hero__card-divider"></div>
      <div class="hero__card-item">
        <span class="hero__card-label">Contact</span>
        <span class="hero__card-value"><a href="mailto:${sanitize(p.email)}" style="color:var(--accent)">${sanitize(p.email)}</a></span>
      </div>
    `;
  }
}

function renderStats() {
  const grid = el('#stats-grid');
  if (!grid) return;
  grid.innerHTML = DATA.HIGHLIGHTS.map((h, i) => `
    <div class="stat-card reveal reveal-delay-${i + 1}">
      <span class="stat-card__icon">${h.icon}</span>
      <div class="stat-card__value" data-value="${h.value}" data-suffix="${h.suffix || ''}">${h.value}${h.suffix || ''}</div>
      <div class="stat-card__label">${sanitize(h.label)}</div>
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
      <span class="research-card__icon">${r.icon}</span>
      <div class="research-card__title">${sanitize(r.title)}</div>
      <div class="research-card__desc">${sanitize(r.desc)}</div>
    </div>
  `).join('');
}

function renderPubsPreview() {
  const container = el('#pubs-preview');
  if (!container) return;
  const pubs = newestFirst([...(DATA.PUBLICATIONS.journal || []), ...(DATA.PUBLICATIONS.conference || [])].filter(p => /^published$/i.test(p.status || '')), x => x.year).slice(0, 4);
  container.innerHTML = pubTimelineHTML(pubs);
}

function renderInsightsPreview() {
  const grid = el('#insights-preview');
  if (!grid) return;
  const items = DATA.INSIGHTS.filter(i => !i.contentType).slice(0, 3);
  grid.className = 'h8-ins';
  grid.innerHTML = items.map((i, n) => `
    <a class="h8-card${n === 0 ? ' h8-card--lead' : ''} reveal${n ? ' reveal-delay-' + n : ''}" href="insight-detail.html?id=${i.id}">
      <span class="h8-card__num" aria-hidden="true">${String(n + 1).padStart(2, '0')}</span>
      <span class="h8-card__top"><b class="h8-card__tag">${sanitize(i.category)}</b>${n === 0 ? '<span class="h8-card__flag">Featured</span>' : ''}</span>
      <span class="h8-card__meta">${sanitize(i.date)}${i.readTime ? ' &middot; ' + sanitize(i.readTime) : ''}</span>
      <h3 class="h8-card__title">${sanitize(i.title)}</h3>
      ${n === 0 ? `<p class="h8-card__excerpt">${sanitize(i.excerpt)}</p>` : ''}
      <span class="h8-card__more">Read article <i aria-hidden="true">&rarr;</i></span>
    </a>`).join('');
}

/* ═══════════════════════════════════════════
   ABOUT PAGE
   ═══════════════════════════════════════════ */

function renderAbout() {
  if (el('#ab-story')) return renderAboutStory();
  if (el('#ab-facts')) return renderAboutV2();
  renderAboutBio();
  renderAboutQuickFacts();
  renderEducation();
  renderExperience();
  renderSkills();
  renderCertifications();
  renderResearchInterests();
  renderProfileLinks();
}

function renderAboutBio() {
  const bioEl = el('#about-bio');
  if (!bioEl) return;
  const p = DATA.PROFILE;
  bioEl.innerHTML = p.longBio.split('\n\n')
    .map(para => `<p style="color:var(--gray);line-height:1.85;font-size:0.97rem">${para.trim()}</p>`)
    .join('');
}

function renderAboutQuickFacts() {
  const factsEl = el('#about-quick-facts');
  if (!factsEl) return;
  const p = DATA.PROFILE;
  const items = [
    { label: 'Location',       value: p.location,                   accent: false },
    { label: 'Degree',         value: 'M.Tech, SVNIT Surat',        accent: false },
    { label: 'Specialization', value: 'Transportation Eng.',         accent: false },
    { label: 'CGPA',           value: '8.8 / 10',                   accent: false },
    { label: 'Experience',     value: '3+ Years',                   accent: false },
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
      <div class="timeline-item__desc">${sanitize(e.grade)}</div>
      ${e.thesis ? `<div class="timeline-item__desc" style="margin-top:6px"><strong>Thesis:</strong> ${sanitize(e.thesis)}</div>` : ''}
    </div>
  `).join('');
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
      <div class="cert-card__photo">
        <img
          src="${sanitize(c.photo)}"
          alt="${sanitize(c.title)} Certificate"
          onerror="this.style.display='none';this.nextElementSibling.style.display='flex';"
        />
        <div class="cert-card__photo-placeholder" style="display:none">
          <span style="font-size:2rem">📜</span>
          <span>Certificate Photo</span>
        </div>
      </div>
      <div class="cert-card__info">
        <span class="cert-card__icon">🏅</span>
        <div>
          <div class="cert-card__title">${sanitize(c.title)}</div>
          <div class="cert-card__meta">${sanitize(c.org)} &middot; ${sanitize(c.year)}</div>
        </div>
      </div>
    </div>
  `).join('');
}

function renderResearchInterests() {
  const container = el('#research-interests');
  if (!container) return;
  container.innerHTML = DATA.RESEARCH_AREAS.map(r => `
    <div class="research-card reveal">
      <span class="research-card__icon">${r.icon}</span>
      <div class="research-card__title">${sanitize(r.title)}</div>
      <div class="research-card__desc">${sanitize(r.desc)}</div>
    </div>
  `).join('');
}

function renderProfileLinks() {
  const container = el('#profile-links');
  if (!container) return;
  const L = DATA.LINKS;
  const links = [
    { name: 'LinkedIn',        url: L.linkedin,      icon: '🔗' },
    { name: 'ResearchGate',    url: L.researchgate,  icon: '📚' },
    { name: 'Google Scholar',  url: L.googleScholar, icon: '🎓' },
    { name: 'ORCID',           url: L.orcid,         icon: '🔬' },
    { name: 'Scopus',          url: L.scopus,        icon: '📑' },
    { name: 'GitHub',          url: L.github,        icon: '💻' },
  ].filter(l => l.url);
  container.innerHTML = links.map(l => `
    <a href="${sanitize(l.url)}" target="_blank" rel="noopener" class="profile-link">
      <span class="profile-link__icon">${l.icon}</span>${sanitize(l.name)}
    </a>
  `).join('');
}

/* ═══════════════════════════════════════════
   PROJECTS PAGE
   ═══════════════════════════════════════════ */

function renderProjects() {
  const grid      = el('#projects-grid');
  const filterBar = el('#filter-bar');
  if (!grid) return;

  const categories = ['All', ...new Set(DATA.PROJECTS.map(p => p.category))];

  if (filterBar && categories.length <= 2) filterBar.style.display = 'none';
  if (filterBar && categories.length > 2) {
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
  const sorted = [...filtered].sort((a, b) => (+b.year || 0) - (+a.year || 0));
  let lastY = '';
  const ini = t => sanitize(String(t || '').replace(/[^A-Za-z ]/g, ' ').split(/\s+/).filter(w => w.length > 2).map(w => w[0]).slice(0, 2).join('').toUpperCase());
  grid.innerHTML = sorted.length
    ? `<ol class="tls pj-xp">${sorted.map(p => {
        const y = String(p.year || ''); const showY = y !== lastY; lastY = y;
        const logo = p.logo ? `<img class="pf-orglogo" src="assets/images/logos/${sanitize(p.logo)}.png" alt="" loading="lazy" data-k="${sanitize(p.logo)}" onerror="pfLogoFallback(this)"><span class="pf-orglogo-fb" hidden>${ini(p.category)}</span>` : ini(p.category);
        return `<li class="tl">
          <div class="tl__year">${showY ? sanitize(y) : ''}</div>
          <div class="tl__rail"><span class="tl__dot"></span></div>
          <details class="pjx pjx--${sanitize(String(p.category || '').toLowerCase().replace(/[^a-z]+/g, '-'))}">
            <summary class="pjx__head">
              <div class="pjx__info">
                <span class="pjx__eyebrow">${sanitize(p.category)}</span>
                <h3 class="pjx__title" title="${sanitize(p.title)}">${sanitize(p.title)}</h3>
                <p class="pjx__line">${sanitize(p.description)}</p>
                <p class="pjx__meta">
                  ${p.org ? `<span class="pjx__org"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 21h18M5 21V8l7-4 7 4v13"/><path d="M9 21v-5h6v5M9 11h.01M15 11h.01"/></svg>${sanitize(p.org)}</span>` : ''}
                  ${p.status ? `<span class="pjx__status">${sanitize(p.status)}</span>` : ''}
                </p>
              </div>
              <div class="pjx__aside">
                <div class="pjx__chips">${(p.tools || []).slice(0, 3).map(t => `<span>${sanitize(t)}</span>`).join('')}${(p.tools || []).length > 3 ? `<span class="is-more">+${p.tools.length - 3}</span>` : ''}</div>
                <span class="pjx__chev" aria-hidden="true"></span>
              </div>
            </summary>
            <div class="pjx__body">
              ${p.fullDescription ? `<div class="pjx__sec"><h4 class="pjx__h">Overview</h4>${String(p.fullDescription).split(/\n\s*\n/).filter(Boolean).slice(0, 2).map(t => `<p class="pjx__summary">${sanitize(t.replace(/\*\*/g, '').trim())}</p>`).join('')}</div>` : ''}
              <div class="pjx__cols">
                ${(p.objectives || []).length ? `<div class="pjx__sec"><h4 class="pjx__h">Objectives</h4><ol class="pjx__objs">${p.objectives.map(o => `<li>${sanitize(o)}</li>`).join('')}</ol></div>` : ''}
                ${(p.outcomes || []).length ? `<div class="pjx__sec"><h4 class="pjx__h">Key outcomes</h4><ul class="pjx__outs">${p.outcomes.map(o => `<li>${sanitize(o)}</li>`).join('')}</ul></div>` : ''}
              </div>
              ${(p.tools || []).length ? `<div class="pjx__sec pjx__sec--tools"><h4 class="pjx__h">Tools &amp; methods</h4><div class="pjx__chips pjx__chips--all">${p.tools.map(t => `<span>${sanitize(t)}</span>`).join('')}</div></div>` : ''}
            </div>
          </details>
        </li>`; }).join('')}</ol>`
    : '<p style="color:var(--gray);grid-column:1/-1;text-align:center;padding:48px 0">No projects in this category.</p>';
  setTimeout(initReveal, 60);
}

/* ═══════════════════════════════════════════
   PUBLICATIONS PAGE
   ═══════════════════════════════════════════ */

function renderPublications() {
  const pub = DATA.PUBLICATIONS;

  const statsEl = el('#pub-stats');
  if (statsEl) {
    const all = [...pub.journal, ...pub.conference];
    const tiles = [
      [all.filter(p => /published/i.test(p.status)).length, 'Papers published'],
      [[...all, ...pub.inProgress].filter(p => p.presented || /presented/i.test(p.status)).length, 'Papers presented'],
      [[...all, ...pub.inProgress].filter(p => /under/i.test(p.status || '')).length, 'Under publication'],
      [pub.peerReview.length, 'Peer reviews'],
    ];
    const total = tiles.reduce((t, [n]) => t + n, 0) || 1;
    statsEl.innerHTML = `<div class="ps">
      <div class="ps__head"><span class="ps__kicker">Research output</span><span class="ps__note">At a glance</span></div>
      <div class="ps__bar" aria-hidden="true">${tiles.map(([n], i) => `<span class="ps__seg ps--${i + 1}" style="flex:${n}" data-i="${i + 1}"></span>`).join('')}</div>
      <ul class="ps__list">${tiles.map(([n, label], i) => `<li class="ps--${i + 1}" data-i="${i + 1}"><b>${n}</b><span>${label.replace(/ /, '<br>')}</span></li>`).join('')}</ul>
    </div>`;
    const ps = statsEl.querySelector('.ps');
    ps.addEventListener('mouseover', e => { const t = e.target.closest('[data-i]'); ps.dataset.on = t ? t.dataset.i : ''; });
    ps.addEventListener('mouseleave', () => { ps.dataset.on = ''; });
  }

  // Group by status: Published → Accepted → Presented → Under Publication
  const allPapers = [...pub.journal, ...pub.conference, ...pub.inProgress];
  const groups = [
    ['Published Papers', p => /published/i.test(p.status || '') && !/under/i.test(p.status || '')],
    ['Accepted & Presented Papers', p => /^(accepted|presented)$/i.test((p.status || '').trim())],
    ['Under Publication Process', p => !/^(published|accepted|presented)$/i.test((p.status || '').trim())],
  ];
  const confBox = el('#pub-conference');
  if (confBox) confBox.innerHTML = groups.map(([label, test]) => {
    const items = allPapers.filter(test);
    return items.length ? `<div class="pub-group">${pubSectionHTML(label, items, '')}</div>` : '';
  }).join('');
  ['#pub-journal', '#pub-inprogress'].forEach(sel => { const b = el(sel); if (b) { b.innerHTML = ''; b.hidden = true; } });

  const pr = el('#pub-peerreview');
  if (pr && pub.peerReview.length) {
    pr.innerHTML = `
      <div class="pub-section__heading">
        <span class="pub-section__heading-dot" style="background:var(--gold)"></span>
        Peer Review Contributions
        <span class="pub-section__count">${pub.peerReview.length}</span>
      </div>
      ${pubTimelineHTML(pub.peerReview.map(r => ({ title: r.journal, journal: r.title, year: r.year, note: r.note, logo: r.logo })), 'gold', 'Review')}
    `;
  }
}

function pubSectionHTML(label, items, accentClass) {
  return `
    <div class="pub-section__heading">
      <span class="pub-section__heading-dot"></span>
      ${sanitize(label)}
      <span class="pub-section__count">${items.length}</span>
    </div>
    ${pubTimelineHTML(items, accentClass)}
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
    grid.className = 'h8-ins';
    grid.innerHTML = items.length
      ? items.map((i, n) => `
    <a class="h8-card${n === 0 ? ' h8-card--lead' : ''} reveal" href="insight-detail.html?id=${i.id}">
      <span class="h8-card__num" aria-hidden="true">${String(n + 1).padStart(2, '0')}</span>
      <span class="h8-card__top"><b class="h8-card__tag">${sanitize(i.category)}</b>${n === 0 ? '<span class="h8-card__flag">Featured</span>' : ''}</span>
      <span class="h8-card__meta">${sanitize(i.date)}${i.readTime ? ' &middot; ' + sanitize(i.readTime) : ''}</span>
      <h3 class="h8-card__title">${sanitize(i.title)}</h3>
      ${n === 0 ? `<p class="h8-card__excerpt">${sanitize(i.excerpt)}</p>` : ''}
      <span class="h8-card__more">Read article <i aria-hidden="true">&rarr;</i></span>
    </a>`).join('')
      : `<p style="color:var(--gray);grid-column:1/-1;text-align:center;padding:32px 0">No articles in this selection.</p>`;
    setTimeout(initReveal, 60);
  }

  const categories = ['All', ...new Set(articleItems.map(i => i.category))];
  if (filterBar && categories.length <= 2) filterBar.style.display = 'none';
  if (filterBar && categories.length > 2) {
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

// Live photo list: reads assets/images/gallery/ from the GitHub repo, so
// adding/deleting a photo there (and pushing) updates the gallery automatically.
// Falls back to DATA.GALLERY (rebuilt by update-gallery.ps1) when offline/local.
const GALLERY_REPO = 'Mihir5212/Mihir-Koladiya';
const GALLERY_DIR  = 'assets/images/gallery';

async function loadGalleryList() {
  try {
    const res = await fetch(`https://api.github.com/repos/${GALLERY_REPO}/contents/${GALLERY_DIR}`);
    if (!res.ok) return;
    const files = (await res.json()).filter(f => f.type === 'file' && /\.(jpe?g|png|webp|gif)$/i.test(f.name));
    if (!files.length) return;
    const known = {};
    (DATA.GALLERY || []).forEach(g => { known[g.src.split('/').pop()] = g; });
    const today = new Date().toISOString().slice(0, 10);
    DATA.GALLERY = files.map(f => {
      if (known[f.name]) return known[f.name];
      // New photo not yet in data.js: date from filename, else treat as newest
      const m = f.name.match(/(20\d{2})(\d{2})(\d{2})/);
      return { src: `${GALLERY_DIR}/${f.name}`, date: m ? `${m[1]}-${m[2]}-${m[3]}` : today, caption: '', category: 'Moments' };
    });
    sortGallery();
  } catch (e) { /* keep local list */ }
}

// Newest first; photos with the same date keep their order from data.js
// (so the reference numbers stay stable). New photos go first in their date group.
let GALLERY_LOCAL_ORDER = null;
function sortGallery() {
  if (!GALLERY_LOCAL_ORDER) GALLERY_LOCAL_ORDER = DATA.GALLERY.map(g => g.src);
  const pos = src => { const i = GALLERY_LOCAL_ORDER.indexOf(src); return i < 0 ? -1 : i; };
  DATA.GALLERY.sort((a, b) => (b.date || '').localeCompare(a.date || '') || pos(a.src) - pos(b.src));
}

function formatGalleryDate(d) {
  if (!d) return '';
  const [y, m] = d.split('-');
  return new Date(+y, +m - 1, 1).toLocaleString('en-US', { month: 'short', year: 'numeric' });
}

async function renderGallery() {
  const grid = el('#gallery-grid');
  const filterBar = el('#gallery-filter');
  if (!grid) return;
  sortGallery();
  await loadGalleryList();

  // Build filter bar
  const categories = ['All', ...new Set(DATA.GALLERY.map(g => g.category))];
  if (filterBar && categories.length <= 2) filterBar.style.display = 'none';
  if (filterBar && categories.length > 2) {
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

// Tiny photo numbers (bottom-right) for reference. Set to false to hide.
const GALLERY_SHOW_NUMBERS = true;

function galleryColumnCount() {
  const w = window.innerWidth;
  return w <= 600 ? 2 : w <= 1000 ? 3 : 4;
}

// Row-wise masonry: photo 1,2,3,4 go across the top row (newest first),
// then the next ones continue below, each keeping its natural shape.
function renderGalleryItems(grid, items) {
  const card = (item, idx) => `
    <div class="gallery-item gx-anim" data-idx="${idx}" style="--d:${(idx % galleryColumnCount()) * 90}ms">
      ${GALLERY_SHOW_NUMBERS ? `<span class="gallery-item__num">${idx + 1}</span>` : ''}
      <img
        src="${sanitize(item.src)}"
        alt="${sanitize(item.caption || 'Gallery photo ' + (idx + 1))}"
        loading="lazy"
        onerror="this.style.display='none';this.nextElementSibling.style.display='flex';"
      />
      <div class="gallery-item__placeholder">
        <span style="font-size:2.2rem">🖼</span>
        <span>${sanitize(item.caption)}</span>
      </div>
      ${item.caption || item.date ? `<div class="gallery-item__overlay">
        <div class="gallery-item__bar">
          ${item.caption ? `<span class="gallery-item__caption">${sanitize(item.caption)}</span>` : ''}
          ${item.date ? `<span class="gallery-item__date">${formatGalleryDate(item.date)}</span>` : ''}
        </div>
      </div>` : ''}
    </div>
  `;
  const n = galleryColumnCount();
  // Balanced masonry: each photo goes to the currently shortest column
  // (uses the stored aspect ratio `ar` = height/width; newest still start at the top)
  const cols = Array.from({ length: n }, () => []);
  const heights = new Array(n).fill(0);
  items.forEach((item, idx) => {
    let c = 0;
    for (let k = 1; k < n; k++) if (heights[k] < heights[c] - 0.01) c = k;
    cols[c].push(card(item, idx));
    heights[c] += (parseFloat(item.ar) || 0.75) + 0.06;   // + gap
  });
  grid.innerHTML = cols.map(c => `<div class="gallery-col">${c.join('')}</div>`).join('');
  grid._galleryItems = items;
  grid._galleryCols = n;
  // Gentle staggered fade/slide-in as photos scroll into view
  const cards = grid.querySelectorAll('.gx-anim');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('gx-in'); io.unobserve(en.target); }
    }), { rootMargin: '0px 0px -40px 0px', threshold: 0.08 });
    cards.forEach(c => io.observe(c));
  } else cards.forEach(c => c.classList.add('gx-in'));
  if (!grid._galleryResize) {
    grid._galleryResize = true;
    window.addEventListener('resize', () => {
      if (galleryColumnCount() !== grid._galleryCols) renderGalleryItems(grid, grid._galleryItems);
    });
  }
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
    infoEl.innerHTML = `
      <div class="contact-info-item">
        <div class="contact-info-icon">✉</div>
        <div class="contact-info-text">
          <div class="contact-info-label">Email</div>
          <div class="contact-info-value">
            <a href="mailto:${sanitize(C.email)}" style="color:var(--accent)">${sanitize(C.email)}</a>
          </div>
        </div>
      </div>
      <div class="contact-info-item">
        <div class="contact-info-icon">📱</div>
        <div class="contact-info-text">
          <div class="contact-info-label">Phone</div>
          <div class="contact-info-value">${sanitize(C.phone)}</div>
        </div>
      </div>
      <div class="contact-info-item">
        <div class="contact-info-icon">📍</div>
        <div class="contact-info-text">
          <div class="contact-info-label">Location</div>
          <div class="contact-info-value">${sanitize(C.location)}</div>
        </div>
      </div>
      <div class="contact-info-item">
        <div class="contact-info-icon">💼</div>
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
    { name: 'LinkedIn',       url: L.linkedin,      icon: '🔗' },
    { name: 'ResearchGate',   url: L.researchgate,  icon: '📚' },
    { name: 'Google Scholar', url: L.googleScholar, icon: '🎓' },
    { name: 'ORCID',          url: L.orcid,         icon: '🔬' },
    { name: 'Scopus',         url: L.scopus,        icon: '📑' },
    { name: 'GitHub',         url: L.github,        icon: '💻' },
  ].filter(l => l.url);
  linksEl.innerHTML = links.map(l => `
    <a href="${sanitize(l.url)}" target="_blank" rel="noopener" class="contact-link">
      ${l.icon} ${sanitize(l.name)} ↗
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
      // Nothing is stored or sent by this website: the visitor's own email app
      // opens with the message pre-filled, and they send it themselves.
      const v = id => (el(`#form-${id}`) ? el(`#form-${id}`).value.trim() : '');
      const org = v('organisation');
      const to = (DATA.CONTACT && DATA.CONTACT.email) || 'koladiyamihir5212@gmail.com';
      const body = `${v('message')}

— ${v('name')}${org ? ', ' + org : ''}
${v('email')}`;
      window.location.href = `mailto:${to}?subject=${encodeURIComponent(v('subject'))}&body=${encodeURIComponent(body)}`;
      if (feedback) {
        feedback.className = 'form-feedback success';
        feedback.innerHTML = `
          <div class="form-feedback__icon">✓</div>
          <div>
            <strong>Your email app should now open.</strong><br>
            The message is ready — just press send. If nothing opened, write to <a href="mailto:${to}">${to}</a>.
          </div>
        `;
        feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    } else {
      if (feedback) {
        feedback.className = 'form-feedback error';
        feedback.innerHTML = `
          <div class="form-feedback__icon">!</div>
          <div>Please correct the errors highlighted above before submitting.</div>
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
   UNDER CONSTRUCTION — Insights & Showcase
   Visitors see a "being built" page and no links to these pages.
   Owner preview: open any page with ?preview=mihir (remembered in this browser).
   Turn preview off with ?preview=off. To launch a page, remove it from WIP_PAGES.
   ═══════════════════════════════════════════ */
const WIP_PAGES = ['insights.html', 'showcase.html', 'insight-detail.html'];
const WIP_KEY = 'mihir';
const WIP_PREVIEW = (() => {
  try {
    const q = new URLSearchParams(location.search).get('preview');
    if (q === WIP_KEY) localStorage.setItem('mk-preview', '1');
    if (q === 'off') localStorage.removeItem('mk-preview');
    return localStorage.getItem('mk-preview') === '1';
  } catch (e) { return false; }
})();
const WIP_ACTIVE = WIP_PAGES.length > 0 && !WIP_PREVIEW;
if (WIP_ACTIVE) {
  document.documentElement.classList.add('mk-wip');
  if (WIP_PAGES.includes(currentPage())) document.documentElement.classList.add('mk-wip-page');
}

function renderWip() {
  const panel = document.createElement('main');
  panel.className = 'mk-wip-panel';
  panel.innerHTML = `
    <section class="mk-wip-card" aria-labelledby="wip-title">
      <span class="mk-wip-big" aria-hidden="true">Soon</span>
      <svg class="mk-wip-site" viewBox="0 0 220 120" aria-hidden="true">
        <!-- crane -->
        <rect x="150" y="14" width="5" height="78" fill="#C9A227"/>
        <path d="M150 14h-64v4h64z M155 14h28v4h-28z" fill="#C9A227"/>
        <path d="M152 18l-60 0M152 18l30 0" stroke="#C9A227" stroke-width="1"/>
        <path d="M150 18l-12 12M155 18l10 10" stroke="#C9A227" stroke-width="1.2"/>
        <line class="mk-wip-hook" x1="100" y1="18" x2="100" y2="52" stroke="#9AA3B2" stroke-width="1.2"/>
        <rect class="mk-wip-load" x="91" y="52" width="18" height="10" rx="1.5" fill="#E9C95A"/>
        <rect x="176" y="18" width="10" height="9" fill="#9AA3B2"/>
        <rect x="140" y="92" width="25" height="5" fill="#C9A227"/>
        <!-- barrier -->
        <rect x="18" y="74" width="54" height="12" rx="2" fill="#E3C04A"/>
        <path d="M22 74h8l-6 12h-8zM38 74h8l-6 12h-8zM54 74h8l-6 12h-8z" fill="#14182B"/>
        <rect x="24" y="86" width="4" height="12" fill="#9AA3B2"/><rect x="62" y="86" width="4" height="12" fill="#9AA3B2"/>
        <!-- cone -->
        <path d="M100 98l7-24h6l7 24z" fill="#E86A2C"/><path d="M103.5 86h13l1.5 5h-16z" fill="#fff"/><rect x="96" y="97" width="28" height="3" rx="1" fill="#E86A2C"/>
      </svg>
      <span class="mk-wip-label">Work zone &middot; Under construction</span>
      <h1 id="wip-title">This section is under construction</h1>
      <p>Like any good road project, this page is being planned, surveyed and built with care. Articles, reports, posters and presentations will open here soon &mdash; until then, explore my projects and publications.</p>
      <div class="mk-wip-actions">
        <a class="mk-wip-btn mk-wip-btn--gold" href="projects.html">View projects</a>
        <a class="mk-wip-btn mk-wip-btn--line" href="publications.html">View publications</a>
      </div>
      <div class="mk-wip-road" aria-hidden="true"><span></span></div>
    </section>`;
  const nav = document.querySelector('.navbar');
  (nav && nav.parentNode === document.body) ? nav.after(panel) : document.body.prepend(panel);
}

function renderPreviewBadge() {
  const b = document.createElement('a');
  b.className = 'mk-preview-badge';
  b.href = '?preview=off';
  b.title = 'You are seeing hidden pages. Click to switch preview off.';
  b.textContent = 'Preview mode · Insights & Showcase visible only to you';
  document.body.appendChild(b);
}

/* ═══════════════════════════════════════════
   PAGE ROUTER
   ═══════════════════════════════════════════ */

function route() {
  const page = currentPage();
  if (WIP_ACTIVE && WIP_PAGES.includes(page)) { renderWip(); return; }
  if (!WIP_ACTIVE && WIP_PREVIEW && WIP_PAGES.length) renderPreviewBadge();
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
  route();
  try { initDock(); } catch (e) { console.error(e); }
  try { initNavMotion(); initPageTransitions(); } catch (e) { console.error(e); }
  // Delay reveal init to allow dynamic content to render first
  setTimeout(initReveal, 100);
});

/* ═══════════════════════════════════════════
   QUICK DOCK — back to top, page-progress ring, quick menu
   ═══════════════════════════════════════════ */
function initDock() {
  const P = DATA.PROFILE || {};
  const L = DATA.LINKS || {};
  const svg = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const I = {
    mail:   '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    phone:  '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>',
    linkedin: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7"/>',
    download: '<path d="M12 3v12m0 0-5-5m5 5 5-5M4 21h16"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5 9-5z"/><path d="m3 13 9 5 9-5"/>',
    file:   '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/>',
    up:     '<path d="M12 19V5m-6 6 6-6 6 6"/>',
    plus:   '<path d="M12 5v14M5 12h14"/>',
  };
  const realPhone = P.phone && !/x/i.test(P.phone);
  const realEmail = P.email && !/example\.com/i.test(P.email);
  const items = [
    { label: 'Email',    icon: 'mail',     href: realEmail ? `mailto:${P.email}` : 'contact.html' },
    realPhone && { label: 'Call', icon: 'phone', href: `tel:${P.phone.replace(/\s+/g, '')}` },
    L.linkedin && { label: 'LinkedIn', icon: 'linkedin', href: L.linkedin, ext: true },
    { label: 'CV',       icon: 'download', href: P.cvFile || 'assets/docs/Mihir_Koladiya_CV.pdf', dl: true },
    { label: 'Projects', icon: 'layers',   href: 'projects.html' },
    { label: 'Papers',   icon: 'file',     href: 'publications.html' },
  ].filter(Boolean);

  const dock = document.createElement('div');
  dock.className = 'dock';
  dock.innerHTML = `
    <nav class="dock__panel" id="dock-panel" aria-label="Quick actions">
      ${items.map((it, i) => `<a class="dock__item" style="--i:${i}" href="${sanitize(it.href)}"${it.ext ? ' target="_blank" rel="noopener"' : ''}${it.dl ? ' download' : ''}>${svg(I[it.icon])}<span>${it.label}</span></a>`).join('')}
    </nav>
    <button type="button" class="dock__top" aria-label="Back to top">${svg(I.up)}</button>
    <button type="button" class="dock__fab" aria-label="Quick actions" aria-expanded="false" aria-controls="dock-panel">
      <svg class="dock__ring" viewBox="0 0 100 100" aria-hidden="true"><circle class="track" cx="50" cy="50" r="47"/><circle class="bar" cx="50" cy="50" r="47" pathLength="1"/></svg>
      <span class="dock__icon">${svg(I.plus)}</span>
    </button>`;
  document.body.appendChild(dock);

  const fab = el('.dock__fab', dock);
  const bar = el('.dock__ring .bar', dock);
  const setOpen = open => {
    dock.classList.toggle('is-open', open);
    fab.setAttribute('aria-expanded', String(open));
    fab.setAttribute('aria-label', open ? 'Close quick actions' : 'Quick actions');
  };
  fab.addEventListener('click', e => { e.stopPropagation(); setOpen(!dock.classList.contains('is-open')); });
  el('.dock__top', dock).addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  document.addEventListener('click', e => { if (!dock.contains(e.target)) setOpen(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });

  let ticking = false;
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const k = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
    bar.style.strokeDashoffset = String(1 - k);
    dock.classList.toggle('is-scrolled', window.scrollY > 300);
    ticking = false;
  };
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  window.addEventListener('resize', update);
  update();
}

/* ═══════════════════════════════════════════
   MOTION — sliding nav pill, page fades, reveal safety
   (ported from the earlier site)
   ═══════════════════════════════════════════ */

// Content is hidden for the fade-in only while this script runs; a safety timer shows everything.
document.documentElement.classList.add('js-reveal');
setTimeout(() => els('.reveal:not(.visible)').forEach(e => e.classList.add('visible')), 4000);

const prefersReducedMotion = () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initNavMotion() {
  const links = el('.navbar__links');
  const toggle = el('.navbar__toggle');
  if (toggle && links) {
    const sync = () => {
      const open = links.classList.contains('open');
      toggle.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
    };
    toggle.addEventListener('click', () => setTimeout(sync, 0));
    els('a', links).forEach(a => a.addEventListener('click', () => setTimeout(sync, 0)));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') { links.classList.remove('open'); sync(); } });
  }
  if (!links) return;

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

function initPageTransitions() {
  if (prefersReducedMotion()) return;
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href]');
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (a.target === '_blank' || a.hasAttribute('download')) return;
    const url = new URL(a.getAttribute('href'), window.location.href);
    if (url.origin !== window.location.origin) return;
    if (!/(\.html|\/)$/.test(url.pathname)) return;
    if (url.pathname === window.location.pathname && url.search === window.location.search) return;
    e.preventDefault();
    document.body.classList.add('is-leaving');
    setTimeout(() => { window.location.href = url.href; }, 170);
  });
  window.addEventListener('pageshow', () => document.body.classList.remove('is-leaving'));
}


/* ═══════════════════════════════════════════
   HOME HERO (index.html .mh-hero)
   ═══════════════════════════════════════════ */
function renderHomeHero() {
  const p = DATA.PROFILE;
  const job = (DATA.EXPERIENCE || [])[0];
  const now = el('#mh-now');
  if (now && job) {
    const org = /SVNIT/.test(job.org) ? 'SVNIT Surat' : job.org.split(',')[0];
    now.innerHTML = `<span class="mh-float__label">Currently</span><strong>${sanitize(job.role.split('–')[0].trim())}</strong><span>${sanitize(org)}</span>`;
  }
  const loc = el('#mh-loc');
  if (loc && p.location) loc.textContent = p.location.split(',').slice(0, 2).join(',');

  // tile grid: current role, research areas, toolkit
  const nowTile = el('#mh-now-tile');
  if (nowTile && job) {
    nowTile.innerHTML = `
      <span class="mh-now__label"><i></i>Currently</span>
      <h2 class="mh-now__role">${sanitize(job.role.split('–')[0].trim())}</h2>
      <p class="mh-now__org">${sanitize(job.org)}</p>
      <p class="mh-now__period">${sanitize(job.period || '')}</p>
      <div class="mh-now__tags">${(job.highlights || []).slice(0, 4).map(t => `<span>${sanitize(t)}</span>`).join('')}</div>`;
  }
  const areasEl = el('#mh-areas');
  if (areasEl) {
    areasEl.innerHTML = (DATA.RESEARCH_AREAS || []).slice(0, 6).map((r, i) => `
      <li><span class="mh-areas__num">${String(i + 1).padStart(2, '0')}</span><h3>${sanitize(r.title)}</h3><p>${sanitize(r.desc)}</p></li>`).join('');
  }
  const toolsEl = el('#mh-tools');
  if (toolsEl) {
    const all = Object.values(DATA.SKILLS || {}).flat();
    const pick = all.filter(s => /gis|python|r\b|spss|autocad|excel|kde|jamovi|earth|sql|civil|vissim|revit|primavera|matlab/i.test(s));
    toolsEl.innerHTML = (pick.length >= 6 ? pick : all).slice(0, 14).map(s => `<span>${sanitize(s)}</span>`).join('');
  }

  // hero v2: stat cards + rotating focus words
  const s2 = el('#stats-grid.hx2-stats');
  if (s2) {
    s2.innerHTML = (DATA.HIGHLIGHTS || []).map(h => `
      <div class="hx2-stat">
        <dd><span class="stat-card__value" data-value="${h.value}" data-suffix="">${h.value}</span><em>${sanitize(h.suffix || '')}</em></dd>
        <dt>${sanitize(h.label)}</dt>
      </div>`).join('');
  }
  const rot = el('#hx2-rotate');
  if (rot && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const words = ['Highway Design & Road Safety', 'Transportation Planning & Traffic Engineering', 'GIS, Python & Data Analytics'];
    let w = 0, c = words[0].length, del = true;
    const tick = () => {
      const word = words[w];
      c += del ? -1 : 1;
      rot.textContent = word.slice(0, c);
      let wait = del ? 45 : 85;
      if (!del && c === word.length) { del = true; wait = 1800; }
      else if (del && c === 0) { del = false; w = (w + 1) % words.length; wait = 300; }
      setTimeout(tick, wait);
    };
    setTimeout(tick, 2200);
  }
  const stats = el('#stats-grid.mh-stats');
  if (stats) {
    stats.innerHTML = (DATA.HIGHLIGHTS || []).map(h => `
      <div class="mh-stat">
        <dt>${sanitize(h.label)}</dt>
        <dd><span class="stat-card__value" data-value="${h.value}" data-suffix="">${h.value}</span>${h.suffix ? `<em>${sanitize(h.suffix)}</em>` : ''}</dd>
      </div>`).join('');
  }
}

/* ═══════════════════════════════════════════
   SHOWCASE PAGE — classification tabs, category chips, search, PDF modal
   ═══════════════════════════════════════════ */
const SC_ICON = {
  all:          '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  report:       '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/>',
  presentation: '<path d="M2 3h20"/><path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3"/><path d="m7 21 5-5 5 5"/>',
  poster:       '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"/>',
  note:         '<path d="M12 20h9"/><path d="M16.4 3.6a2.1 2.1 0 1 1 3 3L7 19l-4 1 1-4z"/>',
  book:         '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
};
const SC_TYPES = [
  { key: 'all',          label: 'All Work' },
  { key: 'report',       label: 'Reports' },
  { key: 'presentation', label: 'Presentations' },
  { key: 'poster',       label: 'Posters' },
  { key: 'note',         label: 'Short Notes' },
  { key: 'book',         label: 'Books' },
];
const scSvg = (k, cls = '') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${SC_ICON[k] || SC_ICON.report}</svg>`;

function scCardHTML(item) {
  const meta = getContentTypeMeta(item.contentType);
  const type = meta.label.replace(/s$/, '');
  const units = item.slideCount ? `${item.slideCount} slides` : item.pageCount ? `${item.pageCount} pages` : '';
  return `
    <article class="yt yt--${sanitize(item.contentType)} reveal">
      <button type="button" class="yt__thumb sc-open" data-id="${item.id}" aria-label="Open ${sanitize(type)}: ${sanitize(item.title)}">
        ${item.thumb ? `<img src="${sanitize(item.thumb)}" alt="" loading="lazy">` : `<span class="yt__cover"><b>${sanitize(type)}</b><span>${sanitize(item.category)}</span></span>`}
        ${units ? `<span class="yt__badge">${sanitize(units)}</span>` : ''}
        ${item.date ? `<span class="yt__date">${sanitize(item.date)}</span>` : ''}
        <span class="yt__play" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3h7v7"/><path d="M10 14 21 3"/><path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"/></svg></span>
      </button>
      <div class="yt__info">
        <span class="yt__avatar" aria-hidden="true"><img src="assets/images/profile.jpg" alt="" loading="lazy" onerror="this.remove()">MK</span>
        <div>
          <h3 class="yt__title">${sanitize(item.title)}</h3>
        </div>
      </div>
    </article>`;
}

function renderShowcase() {
  const grid = el('#sc-grid');
  if (!grid) return;
  const items = DATA.INSIGHTS.filter(i => i.contentType);
  const typesEl = el('#sc-types');
  const catsEl = el('#sc-cats');
  const search = el('#sc-search');
  const countEl = el('#sc-count');
  const state = { type: 'all', cat: 'All', q: '' };

  // classification buttons (with counts + sliding highlight)
  typesEl.innerHTML = SC_TYPES.filter(t => t.key === 'all' || items.some(i => i.contentType === t.key)).map(t =>
    `<button type="button" class="filter-btn sc-tbtn${t.key === 'all' ? ' active is-active' : ''}" data-type="${t.key}">${t.key === 'all' ? 'All' : t.label}</button>`).join('');
  const pill = null;
  const movePill = (instant) => { if (!pill) return;
    const b = el('.sc-type.is-active', typesEl);
    if (!b) return;
    if (instant) pill.style.transition = 'none';
    pill.style.width = `${b.offsetWidth}px`;
    pill.style.height = `${b.offsetHeight}px`;
    pill.style.transform = `translate(${b.offsetLeft}px, ${b.offsetTop}px)`;
    if (instant) requestAnimationFrame(() => requestAnimationFrame(() => { pill.style.transition = ''; }));
  };

  const renderCats = () => {
    const pool = items.filter(i => state.type === 'all' || i.contentType === state.type);
    const cats = ['All', ...new Set(pool.map(i => i.category))];
    if (!cats.includes(state.cat)) state.cat = 'All';
    catsEl.innerHTML = cats.map(c => `<button type="button" class="sc-cat${c === state.cat ? ' is-active' : ''}" data-cat="${attrSc(c)}">${sanitize(c)}</button>`).join('');
  };

  const renderGrid = () => {
    const q = state.q.toLowerCase();
    const list = items.filter(i =>
      (state.type === 'all' || i.contentType === state.type) &&
      (state.cat === 'All' || i.category === state.cat) &&
      (!q || `${i.title} ${i.excerpt} ${i.category}`.toLowerCase().includes(q)));
    countEl.textContent = `Showing ${list.length} of ${items.length} item${items.length === 1 ? '' : 's'}`;
    grid.innerHTML = list.length
      ? list.map(scCardHTML).join('')
      : `<div class="sc-empty"><strong>Nothing here yet</strong><span>No items match this selection.</span><button type="button" class="btn btn-outline sc-reset">Show everything</button></div>`;
    setTimeout(initReveal, 40);
  };

  typesEl.addEventListener('click', e => {
    const b = e.target.closest('.sc-tbtn');
    if (!b || b.disabled) return;
    els('.sc-tbtn', typesEl).forEach(x => { x.classList.toggle('is-active', x === b); x.classList.toggle('active', x === b); });
    state.type = b.dataset.type;
    movePill();
    renderCats(); renderGrid();
  });
  catsEl.addEventListener('click', e => {
    const b = e.target.closest('.sc-cat');
    if (!b) return;
    state.cat = b.dataset.cat;
    els('.sc-cat', catsEl).forEach(x => x.classList.toggle('is-active', x === b));
    renderGrid();
  });
  search.addEventListener('input', () => { state.q = search.value.trim(); renderGrid(); });
  grid.addEventListener('click', e => {
    if (e.target.closest('.sc-reset')) {
      state.cat = 'All'; state.q = ''; search.value = '';
      el('.sc-tbtn[data-type="all"]', typesEl).click();
      return;
    }
    const o = e.target.closest('.sc-open');
    if (o) scOpenModal(items.find(i => String(i.id) === o.dataset.id));
  });
  window.addEventListener('resize', () => movePill(true));
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => movePill(true));

  renderCats(); renderGrid(); movePill(true);
  scInitModal();
}

function attrSc(s) { return sanitize(s).replace(/"/g, '&quot;'); }

function scInitModal() {
  const m = el('#sc-modal');
  if (!m) return;
  const close = () => {
    m.classList.remove('is-open');
    setTimeout(() => { m.hidden = true; el('#sc-modal-frame').src = 'about:blank'; }, 250);
    document.documentElement.style.overflow = '';
    if (m._opener) m._opener.focus();
  };
  el('#sc-modal-close').addEventListener('click', close);
  m.addEventListener('click', e => { if (e.target === m) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !m.hidden) close(); });
}

function scOpenModal(item) {
  const m = el('#sc-modal');
  if (!m || !item) return;
  m._opener = document.activeElement;
  const meta = getContentTypeMeta(item.contentType);
  el('#sc-modal-type').innerHTML = `${scSvg(item.contentType)}${sanitize(meta.label)}`;
  el('#sc-modal-title').textContent = item.title;
  el('#sc-modal-open').href = item.pdfSrc;
  el('#sc-modal-dl').href = item.pdfSrc;
  el('#sc-modal-frame').src = `${item.pdfSrc}#toolbar=0&navpanes=0&view=FitH`;
  m.hidden = false;
  document.documentElement.style.overflow = 'hidden';
  requestAnimationFrame(() => m.classList.add('is-open'));
  el('#sc-modal-close').focus();
}

/* ═══════════════════════════════════════════
   ABOUT PAGE (about.html .ab-hero) — intro, facts, tabbed journey, skills, areas, certificates
   ═══════════════════════════════════════════ */
function renderAboutV2() {
  const p = DATA.PROFILE;
  const pad = n => String(n).padStart(2, '0');
  const jobs = DATA.EXPERIENCE || [];
  const edus = DATA.EDUCATION || [];
  const paras = String(p.longBio || p.shortBio || '').split('\n\n').map(t => t.trim()).filter(Boolean);

  // intro lead + story
  const lead = el('#ab-lead');
  if (lead) lead.textContent = p.shortBio || paras[0] || '';
  const story = el('#ab-story');
  if (story) story.innerHTML = paras.map(t => `<p>${sanitize(t)}</p>`).join('');
  const loc = el('#ab-photo-loc');
  if (loc && p.location) loc.textContent = p.location.split(',').slice(0, 2).join(',');

  // facts strip (taken from the data, so it stays in sync)
  const facts = el('#ab-facts');
  if (facts) {
    const job = jobs[0], edu = edus[0];
    const rows = [
      job && ['Current role', job.role.split('–')[0].trim()],
      edu && ['Highest degree', edu.degree.split('–')[0].trim()],
      edu && edu.grade && ['Grade', edu.grade.replace(/^CGPA:\s*/i, 'CGPA ')],
      p.location && ['Based in', p.location],
      ['Focus', 'Road Safety · GIS · AI/ML'],
    ].filter(Boolean);
    facts.innerHTML = rows.map(([k, v]) => `<div class="ab-fact"><dt>${sanitize(k)}</dt><dd>${sanitize(v)}</dd></div>`).join('');
  }

  // journey: experience
  const xp = el('#experience-timeline');
  if (xp) {
    xp.innerHTML = jobs.map(e => {
      const current = /present/i.test(e.period || '');
      return `
      <li class="ab-tl${current ? ' is-current' : ''} reveal">
        <div class="ab-tl__when">
          <div class="ab-tl__period">${sanitize(e.period)}</div>
          ${current ? '<span class="ab-tl__badge"><i></i>Current</span>' : ''}
        </div>
        <article class="ab-tl__card">
          <h3 class="ab-tl__title">${sanitize(e.role)}</h3>
          <p class="ab-tl__org">${sanitize(e.org)}</p>
          <p class="ab-tl__desc">${sanitize(e.description)}</p>
          ${(e.highlights || []).length ? `<div class="ab-tl__tags">${e.highlights.map(h => `<span>${sanitize(h)}</span>`).join('')}</div>` : ''}
        </article>
      </li>`;
    }).join('');
  }
  // journey: education
  const ed = el('#education-timeline');
  if (ed) {
    ed.innerHTML = edus.map(e => `
      <li class="ab-tl reveal">
        <div class="ab-tl__when"><div class="ab-tl__period">${sanitize(e.period)}</div></div>
        <article class="ab-tl__card">
          <h3 class="ab-tl__title">${sanitize(e.degree)}</h3>
          <p class="ab-tl__org">${sanitize(e.institution)}${e.location ? ` · ${sanitize(e.location)}` : ''}</p>
          ${e.grade ? `<span class="ab-tl__grade">${sanitize(e.grade)}</span>` : ''}
          ${e.thesis ? `<p class="ab-tl__desc"><strong>Thesis:</strong> ${sanitize(e.thesis)}</p>` : ''}
        </article>
      </li>`).join('');
  }
  const ce = el('#ab-count-exp'), cd = el('#ab-count-edu');
  if (ce) ce.textContent = jobs.length;
  if (cd) cd.textContent = edus.length;

  const tabs = el('#ab-tabs');
  if (tabs) {
    tabs.addEventListener('click', e => {
      const b = e.target.closest('.ab-tab');
      if (!b) return;
      els('.ab-tab', tabs).forEach(t => { t.classList.toggle('is-active', t === b); t.setAttribute('aria-selected', String(t === b)); });
      els('.ab-timeline').forEach(list => {
        const show = list.dataset.panel === b.dataset.panel;
        list.hidden = !show;
        if (show) els('.reveal', list).forEach(r => { r.classList.remove('visible'); void r.offsetWidth; r.classList.add('visible'); });
      });
    });
  }

  // skills
  const skills = el('#skills-grid');
  if (skills) {
    skills.innerHTML = Object.entries(DATA.SKILLS || {}).map(([cat, items], i) => `
      <article class="ab-skill reveal reveal-delay-${(i % 3) + 1}">
        <div class="ab-skill__head"><h3 class="ab-skill__title">${sanitize(cat)}</h3><span class="ab-skill__num">${pad(i + 1)}</span></div>
        <div class="ab-skill__tags">${items.map(s => `<span>${sanitize(s)}</span>`).join('')}</div>
      </article>`).join('');
  }

  // research interests
  const areas = el('#research-interests');
  if (areas) {
    areas.innerHTML = (DATA.RESEARCH_AREAS || []).map((r, i) => `
      <li class="ab-area reveal reveal-delay-${(i % 2) + 1}">
        <span class="ab-area__num">${pad(i + 1)}</span>
        <h3>${sanitize(r.title)}</h3>
        <p>${sanitize(r.desc)}</p>
      </li>`).join('');
  }

  // certifications
  const certs = el('#certs-grid');
  if (certs) {
    const award = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="6"/><path d="m15.5 12.9 1.5 8.5a.5.5 0 0 1-.8.5l-3.6-2.7a1 1 0 0 0-1.2 0l-3.6 2.7a.5.5 0 0 1-.8-.5l1.5-8.5"/></svg>';
    certs.innerHTML = (DATA.CERTIFICATIONS || []).map((c, i) => `
      <article class="ab-cert reveal reveal-delay-${(i % 3) + 1}">
        <span class="ab-cert__icon">${award}</span>
        <div>
          <h3 class="ab-cert__title">${sanitize(c.title)}</h3>
          <p class="ab-cert__meta">${sanitize(c.org)}${c.year ? ` · ${sanitize(c.year)}` : ''}</p>
        </div>
      </article>`).join('');
  }

  const ws = el('#ab-workshops');
  if (ws) ws.innerHTML = (DATA.WORKSHOPS || []).map(w => `
    <li class="ab-row reveal"><span class="ab-row__when">${sanitize(w.date)}</span>
      <div><h3>${sanitize(w.title)}</h3><p>${sanitize(w.org)} · ${sanitize(w.mode)}</p></div></li>`).join('');
  const aw = el('#ab-awards');
  if (aw) aw.innerHTML = (DATA.AWARDS || []).map(a => `
    <li class="ab-row reveal"><span class="ab-row__when">${sanitize(a.date)}</span>
      <div><h3>${sanitize(a.title)}</h3><p>${sanitize(a.org)}</p></div><span class="ab-row__tag">${sanitize(a.outcome)}</span></li>`).join('');
  const refs = el('#ab-refs');
  if (refs) refs.innerHTML = (DATA.REFERENCES || []).map(r => {
    const ini = r.name.replace(/^(Prof\.|Dr\.)\s+/i, '').split(/\s+/);
    return `
    <article class="ab-ref reveal">
      <span class="ab-ref__avatar" aria-hidden="true">${sanitize((ini[0][0] + ini[ini.length - 1][0]).toUpperCase())}</span>
      <div><h3>${sanitize(r.name)}</h3><p>${sanitize(r.title)} · ${sanitize(r.org)}</p><span class="ab-ref__rel">${sanitize(r.relation)}</span></div>
    </article>`; }).join('');

  renderProfileLinks();
}

/* ═══════════════════════════════════════════
   HOME v3 — sections below the hero
   ═══════════════════════════════════════════ */
function renderHomeV3() {
  const pad = n => String(n).padStart(2, '0');
  const me = s => sanitize(s).replace(/Mihir Koladiya/g, '<strong>Mihir Koladiya</strong>');

  const journey = el('#hp-journey');
  if (journey) {
    journey.innerHTML = (DATA.EXPERIENCE || []).slice(0, 4).map(e => {
      const current = /present/i.test(e.period || '');
      return `
      <li class="hp-job${current ? ' is-current' : ''} reveal">
        <span class="hp-job__period">${sanitize(e.period)}</span>
        <h3 class="hp-job__role">${sanitize(e.role.split('–')[0].trim())}</h3>
        <p class="hp-job__org">${sanitize(e.org)}</p>
        <span class="hp-job__type">${current ? 'Current · ' : ''}${sanitize(e.type || '')}</span>
      </li>`;
    }).join('');
  }

  const work = el('#hp-work');
  if (work) {
    const list = (DATA.PROJECTS || []).filter(p => p.featured);
    work.innerHTML = (list.length ? list : DATA.PROJECTS || []).slice(0, 3).map((p, i) => `
      <div class="hp-case reveal">
        <span class="hp-case__num" aria-hidden="true">${pad(i + 1)}</span>
        <div>
          <div class="hp-case__meta"><span>${sanitize(p.category)}</span><span>${sanitize(p.year)}</span><span>${sanitize(p.status || '')}</span></div>
          <h3 class="hp-case__title">${sanitize(p.title)}</h3>
          <p class="hp-case__desc">${sanitize(p.description)}</p>
          <div class="hp-case__tools">${(p.tools || []).slice(0, 6).map(t => `<span>${sanitize(t)}</span>`).join('')}</div>
        </div>
        <div class="hp-case__side">
          <ul class="hp-case__out">${(p.outcomes || []).slice(0, 3).map(o => `<li>${sanitize(o)}</li>`).join('')}</ul>
        </div>
      </div>`).join('');
  }

  const P = DATA.PUBLICATIONS || {};
  const all = [...(P.journal || []), ...(P.conference || [])];
  const ps = el('#hp-pubstats');
  if (ps) {
    const rows = [
      [all.filter(p => /published/i.test(p.status)).length, 'Papers published'],
      [[...all, ...(P.inProgress || [])].filter(p => p.presented || /presented/i.test(p.status)).length, 'Papers presented'],
      [[...all, ...(P.inProgress || [])].filter(p => /under/i.test(p.status || '')).length, 'Under publication'],
      [(P.peerReview || []).length, 'Peer review'],
    ];
    ps.innerHTML = rows.map(([n, l]) => `<div><dd>${n}</dd><dt>${l}</dt></div>`).join('');
  }
  const pl = el('#hp-pubs');
  if (pl) {
    const ext = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>';
    pl.innerHTML = all.slice(0, 4).map(p => `
      <li class="hp-pub reveal">
        <span class="hp-pub__year">${sanitize(p.year)}</span>
        <div>
          <h3>${sanitize(p.title)}</h3>
          <p>${me(p.authors)}</p>
          <p class="hp-pub__venue">${sanitize(p.journal || p.conference || '')}</p>
        </div>
        ${p.link ? `<a class="hp-pub__link" href="${sanitize(p.link)}" target="_blank" rel="noopener" aria-label="Read paper: ${sanitize(p.title)}">${ext}</a>` : `<span class="hp-pub__tag">${sanitize(p.status)}</span>`}
      </li>`).join('');
  }

  const aw = el('#hp-awards');
  if (aw) {
    aw.innerHTML = (DATA.AWARDS || []).slice(0, 6).map((a, i) => `
      <article class="hp-award reveal reveal-delay-${(i % 3) + 1}">
        <div class="hp-award__top"><span class="hp-award__tag">${sanitize(a.outcome)}</span><span class="hp-award__date">${sanitize(a.date)}</span></div>
        <h3>${sanitize(a.title)}</h3>
        <p>${sanitize(a.org)}</p>
      </article>`).join('');
  }
}


/* About v3: highlight the section being read in the sidebar nav */
function initAboutNav() {
  const nav = el('#ar-nav');
  if (!nav || !('IntersectionObserver' in window)) return;
  const links = els('a', nav);
  const byId = Object.fromEntries(links.map(a => [a.getAttribute('href').slice(1), a]));
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      links.forEach(a => a.classList.remove('is-active'));
      const a = byId[e.target.id];
      if (a) { a.classList.add('is-active'); if (nav.scrollWidth > nav.clientWidth) a.scrollIntoView({ block: 'nearest', inline: 'center' }); }
    });
  }, { rootMargin: '-25% 0px -65% 0px' });
  els('.ar-block').forEach(s => io.observe(s));
}
document.addEventListener('DOMContentLoaded', initAboutNav);





/* ═══════════ ABOUT — profile page layout ═══════════ */
// Tool logos: Simple Icons (CC0, simpleicons.org); lettered badge when no logo exists
const SKILL_TOOLS = [{"n": "QGIS", "c": "#589632", "d": "M12.879 13.006v3.65l-3.004-3.048v-3.495h3.582l2.852 2.893h-3.43zm10.886 7.606V24h-3.654l-5.73-5.9v-3.55h3.354l6.03 6.062zm-10.828-1.448l3.372 3.371c-1.309.442-2.557.726-4.325.726C5.136 23.26 0 18.243 0 11.565 0 4.92 5.136 0 11.984 0 18.864 0 24 4.952 24 11.565c0 2.12-.523 4.076-1.457 5.759l-3.625-3.725a8.393 8.393 0 0 0 .24-2.005c0-4.291-3.148-7.527-7.1-7.527-3.954 0-7.248 3.236-7.248 7.527s3.33 7.6 7.247 7.6c.548 0 .661.017.88-.03z", "m": null}, {"n": "ArcGIS", "c": "#2C7AC3", "d": "M12 0a.84923.84923 0 0 0-.33766.07031l-8.5183 3.69444C2.1458 4.19776 1.4997 5.1816 1.4997 6.2697v13.2521l10.16264 4.40783c.21517.09333.46015.09407.67532.00073l8.5183-3.6959c.99824-.43301 1.64434-1.41685 1.64434-2.50495V4.47814L12.33766.06958C12.23007.02291 12.11516-.00005 12 0Zm0 4.83705c4.16294 0 7.53757 3.3746 7.53757 7.53757S16.163 19.91218 12 19.91218c-4.163 0-7.53757-3.37462-7.53757-7.53756S7.837 4.83705 12 4.83705zm-.3501 1.38871c-.89685-.02267-2.32742.2409-3.74645 1.6143.34958.55454.64544.97782.49 1.41801-.23127.65503-.5139.51378-1.07083.99466-.39567.34169.2067 1.01292-.31275 1.30595-.51945.29306-1.21315.6636-.94925 1.17557.2639.51196 1.4691.83013 1.95929 1.07522.49018.2451.92812.70605.6072 1.2371-.31403.51948-.53713 1.13083-.60134 1.60917 1.0549.94423 2.44706 1.51909 3.97423 1.51909 3.2928 0 5.81772-2.71048 5.96208-6.00017.04062-.92531-.93924-.93972-1.53447-.93972 0 0 .34061.92356.01831 1.43632-.3223.51278-.84968.76166-.83498 1.37699.01464.61533-.93743 1.5967-1.2598 1.9483-.32223.35163-.9228.74718-1.12796-.0586-.2051-.80579-.12596-1.47799.1084-2.04938.23442-.57136-.2174-.74707-.92068-.76174-.7032-.01463-1.0798-.10795-1.18656-1.19315-.08787-.89369 1.2429-1.84356 1.81426-1.84356.33406 0 1.45485.21963 1.50737-.34058.08056-.8593-.8204-1.04164-1.03934-1.60185C13.2877 7.58747 14.98596 6.60707 12 6.24993c-.10475-.01253-.22199-.02093-.3501-.02417z", "m": null}, {"n": "Google Earth Engine", "c": "#4285F4", "d": "M7.853.717a1.19 1.19 0 00-.65.17L4.53 2.49c-.53.317-.732.984-.467 1.543l.93 1.958a9.217 9.217 0 00-1.745 3.076l-2.124.135A1.198 1.198 0 000 10.399v3.116a1.2 1.2 0 001.084 1.194l2.171.21a9.207 9.207 0 001.748 3.066l-.941 1.982a1.198 1.198 0 00.467 1.543l2.673 1.603a1.2 1.2 0 001.605-.347l1.22-1.771a9.22 9.22 0 001.971.216c.032 0 .064-.004.096-.004a9.245 9.245 0 001.876-.212l1.22 1.77a1.2 1.2 0 001.606.348l2.673-1.603c.53-.317.732-.984.467-1.543l-.941-1.982c.022-.025.048-.049.07-.076.066-.077.125-.159.188-.238a9.225 9.225 0 001.484-2.736l2.138-.137A1.198 1.198 0 0024 13.601v-3.116a1.2 1.2 0 00-1.084-1.194V9.29l-2.16-.21a9.182 9.182 0 00-1.501-2.786c-.063-.08-.124-.16-.19-.238-.018-.022-.039-.043-.058-.065l.93-1.958a1.198 1.198 0 00-.467-1.543L16.797.887a1.2 1.2 0 00-1.605.347L13.99 2.976a9.169 9.169 0 00-1.896-.219c-.033 0-.064-.004-.096-.004a9.2 9.2 0 00-1.992.223L8.808 1.234a1.2 1.2 0 00-.955-.517zm4.148 3.882c.574 0 1.13.072 1.668.197a7.41 7.41 0 015.384 4.993 7.36 7.36 0 01.332 2.193c0 .764-.116 1.5-.332 2.193a7.407 7.407 0 01-5.384 4.992 7.393 7.393 0 01-1.668.199c-4.071 0-7.384-3.313-7.384-7.384 0-4.07 3.313-7.383 7.384-7.383zM11.907 6C9.558 6 8.429 7.207 8.429 7.207c3.501-1.577 5.23 2.986 6.702 4.386 1.472 1.4 2.887.203 2.887.203-.012-.787-.252-1.533-.252-1.533-.968.168-1.398-.494-1.97-1.252C15.224 8.253 13.561 6 11.907 6zm-3.84 3.228c-.705.015-1.3.35-1.653 1-.868 1.601-.096 3.64-.096 3.64s.3-1.532 1.537-1.309c1.238.224 1.754 1.208 2.504 1.985.75.776 1.895 2.064 3.978 2.064 2.082 0 3.018-1.516 3.435-2.937v-.002l-.053.04c-1.265.98-3.335.882-4.548-.275-.89-.846-1.403-1.908-2.135-2.68-.981-1.038-2.065-1.545-2.97-1.526z", "m": null}, {"n": "Python", "c": "#3776AB", "d": "M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z", "m": null}, {"n": "R", "c": "#276DC3", "d": "M12 2.746c-6.627 0-12 3.599-12 8.037 0 3.897 4.144 7.144 9.64 7.88V16.26c-2.924-.915-4.925-2.755-4.925-4.877 0-3.035 4.084-5.494 9.12-5.494 5.038 0 8.757 1.683 8.757 5.494 0 1.976-.999 3.379-2.662 4.272.09.066.174.128.258.216.169.149.25.363.372.544 2.128-1.45 3.44-3.437 3.44-5.631 0-4.44-5.373-8.038-12-8.038zm-2.111 4.99v13.516l4.093-.002-.002-5.291h1.1c.225 0 .321.066.549.25.272.22.715.982.715.982l2.164 4.063 4.627-.002-2.864-4.826s-.086-.193-.265-.383a2.22 2.22 0 00-.582-.416c-.422-.214-1.149-.434-1.149-.434s3.578-.264 3.578-3.826c0-3.562-3.744-3.63-3.744-3.63zm4.127 2.93l2.478.002s1.149-.062 1.149 1.127c0 1.165-1.149 1.17-1.149 1.17h-2.478zm1.754 6.119c-.494.049-1.012.079-1.54.088v1.807a16.622 16.622 0 002.37-.473l-.471-.891s-.108-.183-.248-.394c-.039-.054-.08-.098-.111-.137z", "m": null}, {"n": "MATLAB", "c": "#E16737", "d": null, "m": "ML"}, {"n": "SPSS", "c": "#052FAD", "d": "M23.544 15.993c.038 0 .06-.017.06-.053v-.036c0-.035-.022-.052-.06-.052h-.09v.14zm-.09.262h-.121v-.498h.225c.112 0 .169.066.169.157 0 .079-.036.129-.09.15l.111.19h-.133l-.092-.17h-.07zm.434-.222v-.062c0-.2-.157-.357-.363-.357a.355.355 0 00-.363.357v.062c0 .2.156.358.363.358a.355.355 0 00.363-.358zm-.838-.03c0-.28.212-.492.475-.492.264 0 .475.213.475.491 0 .279-.211.491-.475.491a.477.477 0 01-.475-.49zM16.21 8.13l-.216-.624h-3.56v.624zm.413 1.19l-.216-.623h-3.973v.624zm2.65 7.147h3.107v-.624h-3.108zm0-1.192h3.107v-.623h-3.108zm0-1.19h1.864v-.624h-1.865zm0-1.191h1.864v-.624h-1.865zm0-1.191h1.864v-.624h-3.555l-.175.504-.175-.504h-3.555v.624h1.865v-.574l.2.574h3.33l.2-.574zm1.864-1.815h-3.142l-.217.624h3.359zm-7.46 3.006h1.865v-.624h-1.865zm0 1.19h1.865v-.623h-1.865zm-1.243 1.191h3.108v-.623h-3.108zm0 1.192h3.108v-.624h-3.108zm6.386-8.961l-.216.624h3.776v-.624zm-.629 1.815h4.19v-.624h-3.974zm-4.514 1.19h3.359l-.216-.623h-3.143zm2.482 2.383h2.496l.218-.624h-2.932zm.417 1.19h1.662l.218-.623h-2.098zm.416 1.191h.83l.218-.623h-1.266zm.414 1.192l.217-.624h-.432zm-12.433-.006l4.578.006c.622 0 1.18-.237 1.602-.624h-6.18zm4.86-3v.624h2.092c0-.216-.03-.425-.083-.624zm-3.616.624h1.865v-.624H6.217zm3.617-3.573h2.008c.053-.199.083-.408.083-.624H9.834zm-3.617 0h1.865v-.624H6.217zM9.55 7.507H4.973v.624h6.18a2.36 2.36 0 00-1.602-.624zm2.056 1.191H4.973v.624h6.884a2.382 2.382 0 00-.25-.624zm-5.39 2.382v.624h4.87c.207-.176.382-.387.519-.624zm4.87 1.191h-4.87v.624h5.389a2.39 2.39 0 00-.519-.624zm-6.114 3.006h6.634c.11-.193.196-.402.25-.624H4.973zM0 8.13h4.352v-.624H0zm0 1.191h4.352v-.624H0zm1.243 1.191h1.865v-.624H1.243zm0 1.191h1.865v-.624H1.243zm0 1.19h1.865v-.623H1.243zm0 1.192h1.865v-.624H1.243zM0 15.276h4.352v-.623H0zm0 1.192h4.352v-.624H0Z", "m": null}, {"n": "Jamovi", "c": "#3E6DA9", "d": null, "m": "Ja"}, {"n": "SmartPLS", "c": "#0F7A73", "d": null, "m": "PLS"}, {"n": "AutoCAD", "c": "#E51050", "d": "M3.8672 1.0527v.0157L0 3.3848v17.914l3.8965-2.332h18.3398V2.3301c0-.702-.5773-1.2774-1.2793-1.2774H3.8672zm7.5058 4.0098h3.3008l2.9844 9.9512h-2.5879l-.5683-2.1895h-2.9844l-.5703 2.1621h-2.416l2.8417-9.9238zm11.8633.0273v14.877H4.172l-2.0684 1.2383v.4648c0 .702.5793 1.2774 1.2813 1.2774H24V5.0898h-.7637zM12.9668 6.6816l-.9941 4.3243h2.0468l-1.0527-4.3243z", "m": null}, {"n": "Civil 3D", "c": "#0696D7", "d": null, "m": "C3D"}, {"n": "IITPave", "c": "#1C2A5A", "d": null, "m": "IIT"}, {"n": "Power BI", "c": "#C99A00", "d": "M10 12a1 1 0 0 1 1 1v11H4a1 1 0 0 1-1-1V13a1 1 0 0 1 1-1h6Zm-2-.5V7a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v17h-4.5V13a1.5 1.5 0 0 0-1.5-1.5H8Zm5-6V1a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v22a1 1 0 0 1-1 1h-3.5V7A1.5 1.5 0 0 0 15 5.5h-2Z", "m": null}, {"n": "MS Excel", "c": "#217346", "d": "M23 1.5q.41 0 .7.3.3.29.3.7v19q0 .41-.3.7-.29.3-.7.3H7q-.41 0-.7-.3-.3-.29-.3-.7V18H1q-.41 0-.7-.3-.3-.29-.3-.7V7q0-.41.3-.7Q.58 6 1 6h5V2.5q0-.41.3-.7.29-.3.7-.3zM6 13.28l1.42 2.66h2.14l-2.38-3.87 2.34-3.8H7.46l-1.3 2.4-.05.08-.04.09-.64-1.28-.66-1.29H2.59l2.27 3.82-2.48 3.85h2.16zM14.25 21v-3H7.5v3zm0-4.5v-3.75H12v3.75zm0-5.25V7.5H12v3.75zm0-5.25V3H7.5v3zm8.25 15v-3h-6.75v3zm0-4.5v-3.75h-6.75v3.75zm0-5.25V7.5h-6.75v3.75zm0-5.25V3h-6.75v3Z", "m": null}, {"n": "MS Word", "c": "#2B579A", "d": "M23.004 1.5q.41 0 .703.293t.293.703v19.008q0 .41-.293.703t-.703.293H6.996q-.41 0-.703-.293T6 21.504V18H.996q-.41 0-.703-.293T0 17.004V6.996q0-.41.293-.703T.996 6H6V2.496q0-.41.293-.703t.703-.293zM6.035 11.203l1.442 4.735h1.64l1.57-7.876H9.036l-.937 4.653-1.325-4.5H5.38l-1.406 4.523-.938-4.675H1.312l1.57 7.874h1.641zM22.5 21v-3h-15v3zm0-4.5v-3.75H12v3.75zm0-5.25V7.5H12v3.75zm0-5.25V3h-15v3Z", "m": null}, {"n": "MS PowerPoint", "c": "#C43E1C", "d": null, "m": "P"}, {"n": "LaTeX", "c": "#008080", "d": "M2.176 2.814c.233.42.476.78.73 1.09.247-.013 1.132.456 1.312.523.508.282 1.063.63 1.567.966.505.337.96.662 1.272.9.156.12.278.218.352.286a.483.483 0 01.078.082.08.08 0 01.01.021.06.06 0 01-.004.047.057.057 0 01-.04.03.077.077 0 01-.028 0c-.057 0-.203-.163-.497-.415a23.474 23.474 0 00-2.759-1.827c-.504-.28-.956-.542-1.264-.613a2.322 2.322 0 00-.36-.025 2.706 2.706 0 00-.788.133c.494.414.91.716 1.28.949-.57-.182-1.182-.21-1.902.133.526.329.967.567 1.354.745 1.103.156 2.258.696 3.224 1.309.483.307.904.615 1.219.867.157.125.29.237.39.328.098.091.174.154.197.21.03.073-.019.104-.084.058-.032-.022-.088-.102-.184-.191a7.35 7.35 0 00-.384-.327c-.312-.25-.729-.552-1.209-.857-.893-.562-2.232-1.013-3.173-1.397-.602-.11-1.225-.06-1.906.39.449.2.837.349 1.182.463.812 0 1.892.365 2.935.922 1.042.556 2.04 1.214 2.523 1.774.066.077-.016.126-.074.07-.52-.495-1.463-1.204-2.498-1.756-.639-.337-2.153-1.01-2.886-1.01l.004.002c-.567.02-1.13.195-1.679.716.477.118.885.196 1.244.249-.44.088-.87.3-1.289.722.324.07.616.122.882.162-.328.159-.639.404-.923.78.373.03.703.042 1 .044-.36.166-.696.43-.996.85.533.027.98.025 1.364.003-.422.172-.812.464-1.145.968.662.01 1.188-.022 1.628-.076l-.006.002c.99-.073 2.297.127 2.962.847.052.057-.024.118-.072.074-.648-.58-1.493-.827-2.89-.921h-.002c-.543.149-1.046.446-1.46 1.074.536.008.982-.013 1.366-.05-.469.257-.873.644-1.139 1.306.483-.092.888-.19 1.237-.292-.363.265-.668.636-.873 1.194.324-.072.612-.146.871-.221a2.519 2.519 0 00-.513 1.095c.352-.13.655-.254.926-.377-.257.3-.453.681-.55 1.19.495-.199.899-.388 1.238-.568-.31.333-.543.76-.635 1.356a11.816 11.816 0 001.442-.744c-.433.362-.764.843-.879 1.587.788-.348 1.339-.663 1.767-.955-.184.372-.282.806-.235 1.348.762-.584 1.243-1.056 1.602-1.473-.024.269-.003.56.077.884.546-.939 1.089-1.212 1.65-1.526-.895.451-.762.79-.762 1.184.683-.72 1.635-1.482 1.927-1.96-.39.585-.547 1.14-.65 1.63-1.993 1.054-3.207 1.329-4.568 1.75.528.194 1.093.383.859.652l-.624.622c.399-.124.805-.3 1.158-.059-.035.327-.447.492-.8.683.621-.224.756-.172.92-.12.081.393-.203.603-.388.862 1.565-1.19 3.606-2.13 5.044-2.522 2.022-.681 4.63-1.389 5.339-3.115l.712-2.847-.004.004c-.111-.034-.246-.063-.35-.133a.651.651 0 01-.235-.297c-.252.065-.44.03-.56-.088-.117-.117-.167-.296-.203-.491-.203.041-.362.016-.467-.077-.116-.101-.17-.26-.198-.444l-.008-.039.037-.015a.842.842 0 00.302-.194.257.257 0 00.07-.225l-.006-.037.03-.016c.163-.093.345-.169.428-.28a.274.274 0 00.053-.21.88.88 0 00-.155-.357l-.027-.04.04-.027c.118-.09.244-.179.308-.26.032-.04.048-.076.047-.11 0-.033-.015-.07-.064-.117l-.098-.094.135.006c.213.01.395-.007.538-.053a.504.504 0 00.274-.197c-.007-.033-.02-.063-.02-.098a.484.484 0 01.967 0c0 .044-.015.084-.026.125.177.014.347.01.507-.06l.002.001.035-.013c.236-.085.334.045.72-.456-1.69-2.19-4.157-.635-4.977 1.622-.21.576-1.405.578-1.751 0-1.37-2.95-5.53-6.068-9.07-7.218zm.86 2.145c.906.293 1.913.782 2.77 1.328.43.273.813.543 1.114.779.301.236.566.473.62.575.054.102 0 .14-.082.06-.081-.078-.303-.32-.6-.553-.298-.234-.68-.505-1.106-.777-.775-.49-1.982-.958-2.716-1.412zm-1.7 2.7c1.116.014 2.35.447 3.434.997.541.275 1.023.567 1.395.83.372.263.672.524.734.657.061.134-.02.13-.087.055a4.401 4.401 0 00-.704-.626 11.47 11.47 0 00-1.385-.826C3.76 8.264 2.439 7.82 1.336 7.66zm14.916.772a.381.381 0 100 .762.381.381 0 000-.762zM1.7 8.478c.822.072 1.72.368 2.534.75 1.086.509 2.035 1.158 2.434 1.667.035.045-.014.131-.08.062-.428-.44-1.322-1.131-2.397-1.635-.913-.421-2.282-.87-3.262-.78.251-.03.497-.088.771-.064zm16.339.01c-.366.475-.53.423-.703.464.094.43.35.586.585.77l-.06.012c2.315-.447 4.186-.286 6.139-.236l-5.961-1.01zm-.178 1.246h-.002l-.004.016.006-.016zm-.625-.757c-.183.074-.373.076-.563.059a.477.477 0 01-.42.26.483.483 0 01-.435-.278.609.609 0 01-.274.188c-.139.045-.308.057-.493.055.02.035.054.068.055.104a.273.273 0 01-.069.174c-.073.092-.189.17-.295.248.087.141.137.26.149.362a.39.39 0 01-.07.284c-.106.14-.288.21-.439.293a.374.374 0 01-.09.268.89.89 0 01-.297.198c.027.156.074.283.154.354.086.076.211.103.425.047l.055-.014.01.055c.033.207.088.385.187.483.1.099.244.135.503.055l.049-.015.016.048c.05.142.12.223.209.282.087.06.247.112.358.147.798-.869 1.525-1.772 1.884-2.86-.225-.177-.506-.338-.609-.797zm-16.23.386c1.165-.08 2.283.196 3.202.626.92.43 1.658.939 1.974 1.307.075.087-.019.12-.072.072a8.187 8.187 0 00-1.947-1.29c-.904-.414-2.193-.644-3.157-.715zm.864.802c.61.02 1.24.155 1.806.352.756.262 1.421.614 1.747.98.045.05-.007.127-.074.069-.349-.304-.961-.693-1.706-.951-.574-.195-1.613-.369-2.268-.397.197-.022.292-.06.495-.053zm1.05 1.788c.423.034.886.133 1.341.407.043.026.049.136-.049.09-.856-.402-1.326-.49-2.457-.31.386-.128.74-.221 1.164-.187zm-.04.788c.4-.035.784-.002 1.297.204.044.018.08.126-.033.094-.857-.243-1.167-.328-2.287.104.28-.229.622-.366 1.023-.402zm1.285.687c.317-.023.635-.026.934.006.052.006.055.105-.006.102a7.87 7.87 0 00-1.837.115c-.243.046-.423.043-1.405.458.287-.233.794-.452 1.385-.56a8.91 8.91 0 01.93-.12zm1.28.49c.099.003.062.104.006.103-.728-.01-1.304.132-1.875.295a9.78 9.78 0 00-1.318.525c.283-.23.713-.457 1.291-.622.579-.166 1.248-.326 1.896-.302zm.528.398c.036-.005.105.084.018.1-.73.137-1.244.267-1.794.454-.216.074-.58.207-1.243.587.26-.269.656-.492 1.213-.68.558-.19 1.196-.37 1.806-.46zm.311.507c.075-.012.097.087.02.102-1.217.241-1.76.556-2.54 1.144.504-.523 1.297-1.051 2.52-1.246zm.595.448c.087-.013.11.087.021.1-.872.13-1.477.553-2.255 1.33.295-.493 1.004-1.24 2.234-1.43zm.372.39c.046-.006.114.073.023.1a2.634 2.634 0 00-.669.3c-.182.118-.3.2-.597.507.111-.245.296-.434.542-.59.247-.157.509-.293.7-.317z", "m": null}];

function renderAboutStory() {
  const root = el('#ab-story');
  if (!root) return;
  const D = DATA, P = D.PROFILE, s = sanitize, L = D.LINKS || {};
  const job = (D.EXPERIENCE || [])[0];
  const bio = P.longBio.split(/\n\s*\n/).map(t => t.trim()).filter(t => !/^Languages:/i.test(t));
  const CV = P.cvFile || 'assets/docs/Mihir_Koladiya_CV.pdf';
  const short = org => /SVNIT/.test(org) ? 'SVNIT Surat' : org.split(',')[0];
  const ini = t => s(t.replace(/[^A-Za-z ]/g, ' ').split(/\s+/).filter(w => w.length > 2 && !/^(of|and|the|for|pvt|ltd)$/i.test(w)).map(w => w[0]).slice(0, 2).join('').toUpperCase());
  const tags = l => (l || []).length ? `<div class="pf-tags">${l.map(t => `<span>${s(t)}</span>`).join('')}</div>` : '';
  const I = {
    cv: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12m0 0-5-5m5 5 5-5M4 21h16"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    work: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
    cap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/></svg>',
    award: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="9" r="6"/><path d="m8.5 14-1.5 8 5-3 5 3-1.5-8"/></svg>',
    org: '<svg class="pf-org-ph" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M5 21V8l7-4 7 4v13"/><path d="M9 21v-5h6v5M9 11h.01M12 11h.01M15 11h.01"/></svg>',
    cert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/></svg>',
    book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
  };
  const eduBadge = deg => {
    if (/M\.?E|Master/i.test(deg)) return 'M.E.';
    if (/B\.?E|Bachelor/i.test(deg)) return 'B.E.';
    if (/Diploma/i.test(deg)) return 'DIP';
    if (/Secondary|10th|SSC/i.test(deg)) return '10th';
    return s(deg.split('–')[0].trim().slice(0, 3).toUpperCase());
  };
  // Organisation logos: put files in assets/images/logos/ named as below (.png/.jpg/.webp/.svg).
  // If a file is missing, the old icon/initials show automatically.
  const LOGO = {
    svnit: /SVNIT|Sardar Vallabhbhai/i, sigma: /Sigma University/i, msu: /MSU|Maharaja Sayajirao|M\.S\. University/i,
    mattest: /Mattest/i, tdpatel: /TD Patel/i, pramukh: /Pramukh/i, kkb: /KKB/i,
    ssasit: /SSASIT/i, tapi: /Tapi Diploma/i, vivekanand: /Vivekanand/i,
    neha: /Neha Consult|^Concrete Catalyst$/i, wonder: /Wonder Cement/i, grsa: /Gujarat Road Safety/i,
    nitw: /NIT Warangal/i, iitb: /IIT Bombay/i, iirs: /IIRS|ISRO/i, iitr: /IIT Roorkee/i, manit: /MANIT/i,
  };
  const logoImg = (org, fallbackHtml) => {
    const k = Object.keys(LOGO).find(x => LOGO[x].test(org || ''));
    if (!k) return fallbackHtml;
    return `<img class="pf-orglogo" src="assets/images/logos/${k}.png" alt="" loading="lazy" data-k="${k}" onerror="pfLogoFallback(this)"><span class="pf-orglogo-fb" hidden>${fallbackHtml}</span>`;
  };
  const card = (id, title, count, body) => `
    <section class="pf-card reveal ar-block" id="${id}">
      <header class="pf-card__head"><h2>${title}</h2>${count ? `<span>${count}</span>` : ''}</header>
      ${body}
    </section>`;
  const edu0 = (D.EDUCATION || [])[0] || {};

  root.innerHTML = `
  <div class="pf">
    <div class="container pf-wrap">

      <section class="pf-top reveal">
        <div class="pf-cover"><div class="pf-cover__text"><p class="pf-cover__line">Working Towards <em>Safer and Smarter</em> Roads</p><p class="pf-cover__keys">Road Safety <i>|</i> Crash Analytics <i>|</i> Transportation Planning <i>|</i> GIS</p></div></div>
        <div class="pf-id">
          <div class="pf-av"><img src="assets/images/profile.jpg" alt="Portrait of Mihir Koladiya" onerror="this.style.visibility='hidden'"></div>
          
          <div class="pf-head"><div class="pf-head__text"><h1 class="pf-name">Mihir Koladiya</h1>
          <p class="pf-role">${s(P.title)}</p></div><div class="pf-id__actions">
            <a href="${s(CV)}" download class="btn pf-btn pf-btn--solid">${I.cv} Download CV</a>
            <a href="contact.html" class="btn pf-btn pf-btn--line">Contact</a>
          </div></div>
          <div class="pf-row">
          <ul class="pf-meta">
            <li>${I.pin}${s(P.location)}</li>
            ${job ? `<li>${I.work}${s(job.role.split('–')[0].trim())} at ${s(short(job.org))}</li>` : ''}
            ${edu0.degree ? `<li>${I.cap}${s(edu0.degree.split('–')[0].trim())}, MSU Baroda</li>` : ''}
            <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18"/></svg>Gujarati &middot; Hindi &middot; English</li>
          </ul>
          <div class="pf-links">${[
            ['Google Scholar', L.googleScholar, '<path d="M12 3 1 9.5l4 2.4V16c0 2.2 3.1 4 7 4s7-1.8 7-4v-4.1l4-2.4zm0 2.3 7.4 4.2L12 13.8 4.6 9.5z" fill="currentColor"/>'],
            ['ORCID', L.orcid, '<text x="12" y="17" text-anchor="middle" font-family="Arial" font-size="15" font-weight="700" fill="currentColor">iD</text>'],
            ['Scopus', L.scopus, '<text x="12" y="17" text-anchor="middle" font-family="Arial" font-size="13.5" font-weight="700" fill="currentColor">Sc</text>'],
            ['ResearchGate', L.researchgate, '<text x="12" y="17" text-anchor="middle" font-family="Arial" font-size="12.5" font-weight="700" fill="currentColor">RG</text>'],
            ['LinkedIn', L.linkedin, '<path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/>'],
            ['GitHub', L.github, '<path fill="currentColor" d="M12 .5a11.5 11.5 0 0 0-3.6 22.4c.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A11.5 11.5 0 0 0 12 .5z"/>'],
          ].filter(x => x[1]).map(([n, u, svg]) => `<a href="${s(u)}" target="_blank" rel="noopener" aria-label="${n}" title="${n}"><svg viewBox="0 0 24 24" aria-hidden="true">${svg}</svg></a>`).join('')}</div>
          </div>
          <dl class="pf-stats">${(D.HIGHLIGHTS || []).map(x => `<div><dd>${x.value}<i>${s(x.suffix || '')}</i></dd><dt>${s(x.label)}</dt></div>`).join('')}</dl>
        </div>
      </section>

      ${card('summary', 'About', '', `
        <div class="ab">
          <div class="ab__text">
            <p class="ab__lead">${s(bio[0] || '')}</p>
            ${bio.slice(1).map(t => `<p>${s(t)}</p>`).join('')}
          </div>
          <div class="ab__aims">
            <div class="ab__aim"><span class="ab__label">01 · Career Objective</span><p>To apply crash analytics, GIS and AI/ML methods to road safety problems, and grow as a researcher who turns transport data into evidence-based decisions.</p></div>
            <div class="ab__aim ab__aim--dark"><span class="ab__label">02 · Mission &amp; Direction</span><p>To advance transportation infrastructure through sustainable solutions that enhance safety, efficiency and evidence-based decision-making.</p></div>
          </div>
        </div>`)}

      ${(() => {
        const all = D.EXPERIENCE || [];
        const startYear = p => { const m = /(\d{4})/.exec(p || ''); return m ? m[1] : ''; };
        let lastYear = '';
        const rows = all.map(e => {
          const intern = /intern/i.test(e.type || '');
          const cur = /present/i.test(e.period || '');
          const y = startYear(e.period);
          const showYear = y !== lastYear; lastYear = y;
          const type = (e.type || '').trim();
          return `<li class="tl${intern ? ' tl--intern' : ''}${cur ? ' is-current' : ''}">
            <div class="tl__year">${showYear ? s(y) : ''}</div>
            <div class="tl__rail"><span class="tl__dot"></span></div>
            <div class="tl__card">
              <span class="pf-logo pf-logo--org">${logoImg(e.org, I.org)}</span>
              <div class="tl__main">
                <div class="tl__top"><h3>${s(e.role)}</h3>${cur ? '<b class="pf-cur">Current</b>' : `<span class="tl__type">${s(type)}</span>`}</div>
                <p class="pf-org">${s(e.org)}<span class="tl__when">${s(e.period)}</span></p>
                ${e.description || (e.highlights || []).length ? `<details class="xp-more"><summary>Responsibilities</summary>
                  ${e.description ? `<p class="pf-desc">${s(e.description)}</p>` : ''}${tags(e.highlights)}</details>` : ''}
              </div>
            </div>
          </li>`; }).join('');
        const pro = all.filter(e => !/intern/i.test(e.type || '')).length;
        const nInt = all.length - pro;
        return card('experience', 'Experience', `${pro} professional &middot; ${nInt} internships`, `<ol class="tls">${rows}</ol>`);
      })()}

      ${card('education', 'Education', '', (() => {
        const list = D.EDUCATION || [];
        if (!list.length) return '';
        const short = d => /Secondary School/i.test(d || '') ? 'SSC (10th)' : (d || '').split(/[–-]/)[0].trim();
        const field = d => { if (/Secondary School/i.test(d || '')) return 'Secondary School Certificate'; const p = (d || '').split(/[–-]/); return p.length > 1 ? p.slice(1).join('–').trim() : ''; };
        const thesis = list.find(e => e.thesis);
        return `
        <div class="ed-grid">${list.map((e, i) => `
          <article class="ed-card${i === 0 ? ' is-top' : ''}">
            <div class="ed-card__head">
              <span class="pf-logo pf-logo--org">${logoImg(e.institution, /Vivekanand/i.test(e.institution) ? 'VV' : I.cap)}</span>
              <span class="ed-card__years">${s(e.period)}</span>
            </div>
            <h3 class="ed-card__deg">${s(short(e.degree))}</h3>
            ${field(e.degree) ? `<p class="ed-card__field">${s(field(e.degree))}</p>` : ''}
            <p class="ed-card__inst">${s(e.institution)}${e.location ? `<span>${s(e.location)}</span>` : ''}</p>
            <div class="ed-card__foot">${e.grade ? (() => { const m = /^\s*([A-Za-z]+)\s*:\s*([\d.]+)\s*(\/\s*\d+)?/.exec(e.grade); return m
                ? `<span class="ed-score"><small>${s(m[1])}</small><b>${s(m[2])}</b>${m[3] ? `<i>${s(m[3].replace(/\s+/g, ' '))}</i>` : ''}</span>`
                : `<span class="ed-score"><small>Score</small><b>${s(e.grade)}</b></span>`; })() : ''}</div>
          </article>`).join('')}
        </div>
`;
      })())}

      ${card('skills', 'Skills &amp; Tools', '', (() => {
        const toolNames = new Set(SKILL_TOOLS.map(t => t.n));
        const TOOL_IMG = { 'QGIS': 'qgis', 'ArcGIS': 'arcgis', 'Google Earth Engine': 'gee', 'Python': 'python', 'R': 'r', 'SPSS': 'spss', 'Jamovi': 'jamovi', 'SmartPLS': 'smartpls', 'AutoCAD': 'autocad', 'Civil 3D': 'civil3d', 'MS Excel': 'excel', 'MS Word': 'word', 'MS PowerPoint': 'powerpoint', 'Power BI': 'powerbi', 'MATLAB': 'matlab', 'LaTeX': 'latex.svg' };
        const toolList = SKILL_TOOLS.some(t => t.n === 'Civil 3D') ? SKILL_TOOLS : SKILL_TOOLS.flatMap(t => t.n === 'AutoCAD' ? [t, { n: 'Civil 3D', c: '#0696D7', m: 'C3D' }] : [t]);
        const tools = toolList.map(t => { const im = [].concat(TOOL_IMG[t.n] || []); return `<li class="sk-tool" title="${s(t.n)}">
            <span class="sk-tool__ico${im.length ? ' has-img' : ''}${im.length > 1 ? ' is-pair' : ''}" style="--c:${t.c}">${im.length ? im.map(k => `<img src="assets/images/tools/${/\./.test(k) ? k : k + '.png'}" alt="" loading="lazy">`).join('') : t.d ? `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${t.d}"/></svg>` : `<b>${s(t.m)}</b>`}</span>
            <span class="sk-tool__name">${s(t.n)}</span></li>`; }).join('');
        const groups = Object.entries(D.SKILLS || {}).map(([g, l]) => [g, (l || []).filter(x => !toolNames.has(x))]).filter(([, l]) => l.length);
        return `<div class="sk-sub"><h3>Tools &amp; Software</h3></div>
          <ul class="sk-tools">${tools}</ul>
          <div class="sk-sub sk-sub--gap"><h3>Methods &amp; Expertise</h3></div>
          <div class="sk-groups">${groups.map(([g, l]) => `<div class="sk-group"><h4>${s(g.replace(/\s*&\s*Programming/i, ''))}</h4>${tags(l)}</div>`).join('')}</div>`;
      })())}


      ${card('certifications', 'Licences &amp; Certifications', (D.CERTIFICATIONS || []).length, `<ul class="ws-grid">${(D.CERTIFICATIONS || []).map(c => {
        const kind = /review/i.test(c.title) ? 'Reviewing' : /present/i.test(c.title) ? 'Presentation' : 'Certificate';
        const title = c.title.replace(/^Paper Presentation Certificate\s*[–-]\s*/i, '').replace(/^Certificate of Reviewing\s*[–-]\s*/i, '');
        return `<li class="ws ws--cert ws--${kind.toLowerCase()}${c.file ? ' is-clickable' : ''}"${c.file ? ` data-cert-card data-file="${s(c.file)}" data-title="${s(c.title)}" tabindex="0" role="button" aria-label="View certificate: ${s(c.title)}"` : ''}>
          <span class="pf-logo pf-logo--org">${logoImg(c.org, I.cert)}</span>
          <div class="ws__main">
            <div class="ce__top"><span class="ce__kind">${kind === 'Presentation' ? 'Paper Presentation' : kind === 'Reviewing' ? 'Peer Reviewing' : kind}</span><span class="ce__date">${s(c.year || '')}</span></div>
            <h3 class="ce__title">${s(title)}</h3>
            <p class="pf-org ce__orgline"><span>${s(c.org)}</span>${c.file ? `<span class="ce__view" data-cert-link data-href="${s(c.file)}" hidden>View <span aria-hidden="true">&#8599;</span></span>` : ''}</p>
          </div>
        </li>`; }).join('')}</ul>`)}
      ${card('workshops', 'Workshops &amp; Training', (D.WORKSHOPS || []).length, (() => {
        const ws = D.WORKSHOPS || []; let last = '';
        return `<ol class="wt">${ws.map(w => {
          const y = (/(\d{4})/.exec(w.date || '') || [])[1] || '';
          const showY = y !== last; last = y;
          const online = /online/i.test(w.mode || '');
          return `<li class="wt__item${showY ? ' is-first' : ''}">
            <div class="wt__year">${showY ? s(y) : ''}</div>
            <div class="wt__rail"><span class="wt__dot"></span></div>
            <div class="wt__row${w.file ? ' is-clickable' : ''}"${w.file ? ` data-cert-card data-file="${s(w.file)}" data-title="${s(w.title)}" tabindex="0" role="button" aria-label="View certificate: ${s(w.title)}"` : ''}>
              <span class="pf-logo pf-logo--org wt__logo">${logoImg(w.org, ini(w.org))}</span>
              <div class="wt__main"><h3>${s(w.title)}</h3><p>${s(w.org)}${w.mode ? ` <i class="${online ? 'is-online' : ''}">${s(w.mode)}</i>` : ''}</p></div>
              <div class="wt__side"><span class="wt__date">${s(w.date || '')}</span>${w.file ? `<span class="ce__view" data-cert-link data-href="${s(w.file)}" hidden>View <span aria-hidden="true">&#8599;</span></span>` : ''}</div>
            </div>
          </li>`; }).join('')}</ol>`;
      })())}

      ${card('awards', 'Honours &amp; Awards', (D.AWARDS || []).length, `<ul class="ws-grid">${(D.AWARDS || []).map(a => {
        const rank = /rank/i.test(a.outcome || '');
        return `<li class="ws ws--cert ws--award${rank ? ' is-rank' : ''}${a.file ? ' is-clickable' : ''}"${a.file ? ` data-cert-card data-file="${s(a.file)}" data-title="${s(a.title)}" tabindex="0" role="button" aria-label="View certificate: ${s(a.title)}"` : ''}>
          <span class="pf-logo pf-logo--org pf-logo--medal">${logoImg(a.logoOrg || a.org, I.award)}</span>
          <div class="ws__main">
            <div class="ce__top"><span class="ce__kind">${s(a.outcome || 'Award')}</span><span class="ce__date">${s(a.date || '')}</span></div>
            <h3 class="ce__title">${s(a.title)}</h3>
            <p class="pf-org ce__orgline"><span>${s(a.org)}</span>${a.file ? `<span class="ce__view" data-cert-link data-href="${s(a.file)}" hidden>View <span aria-hidden="true">&#8599;</span></span>` : ''}</p>
          </div>
        </li>`; }).join('')}</ul>`)}


    </div>
  </div>`;
  // Certificates: show link + make card clickable only when the PDF exists
  root.querySelectorAll('[data-cert-link]').forEach(l => {
    const cardEl = l.closest('[data-cert-card]');
    fetch(l.dataset.href.split('|')[0], { method: 'HEAD' }).then(r => { if (r.ok) l.hidden = false; else if (cardEl) cardEl.classList.remove('is-clickable'); }).catch(() => {});
  });
  const openCert = cardEl => { if (cardEl && cardEl.classList.contains('is-clickable')) certViewer(cardEl.dataset.file, cardEl.dataset.title); };
  root.addEventListener('click', e => { const c = e.target.closest('[data-cert-card]'); if (c) { window.__certByPointer = e.detail > 0; openCert(c); } });
  root.addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('[data-cert-card]')) { e.preventDefault(); openCert(e.target); } });
  setTimeout(initReveal, 60);
}

// Try other extensions for an org logo, then fall back to the icon/initials.
function pfLogoFallback(img) {
  const exts = ['webp', 'jpg', 'jpeg', 'svg'];
  const i = +(img.dataset.t || 0);
  if (i < exts.length) { img.dataset.t = i + 1; img.src = 'assets/images/logos/' + img.dataset.k + '.' + exts[i]; return; }
  const fb = img.nextElementSibling;
  img.remove();
  if (fb) { fb.hidden = false; fb.parentNode.classList.remove('pf-logo--img'); }
}

// Certificate PDF viewer (modal)
function certViewer(file, title) {
  let m = document.getElementById('cert-modal');
  if (!m) {
    m = document.createElement('div');
    m.id = 'cert-modal'; m.className = 'cm'; m.setAttribute('role', 'dialog'); m.setAttribute('aria-modal', 'true');
    m.innerHTML = `<div class="cm__box">
        <div class="cm__bar"><h2 class="cm__title" id="cm-title"></h2>
          <div class="cm__actions"><button type="button" class="cm__close" aria-label="Close">&#10005;</button></div></div>
        <div class="cm__frame" id="cm-imgs"></div>
      </div>`;
    document.body.appendChild(m);
    m.addEventListener('contextmenu', e => { if (e.target.closest('.cm__frame')) e.preventDefault(); });
    m.addEventListener('dragstart', e => e.preventDefault());
    const close = () => { m.classList.remove('open'); document.body.style.overflow = '';  if (m._last) { if (window.__certByPointer) m._last.blur(); else m._last.focus(); } window.__certByPointer = false; };
    m.querySelector('.cm__close').addEventListener('click', close);
    m.addEventListener('click', e => { if (e.target === m) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && m.classList.contains('open')) close(); });
  }
  m._last = document.activeElement;
  m.setAttribute('aria-labelledby', 'cm-title');
  m.querySelector('#cm-title').textContent = title || 'Certificate';
  const list = String(file || '').split('|').filter(Boolean);
  m.querySelector('#cm-imgs').innerHTML = list.map((f, i) => `<img src="${f}" alt="${(title || 'Certificate').replace(/"/g, '&quot;')}${list.length > 1 ? ' (' + (i + 1) + ' of ' + list.length + ')' : ''}" draggable="false">`).join('');
  m.querySelector('#cm-imgs').scrollTop = 0;
  m.classList.add('open'); document.body.style.overflow = 'hidden';
  m.querySelector('.cm__close').focus();
}

