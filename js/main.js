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
  if (s === 'published' || s === 'presented')          return 'status--published';
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

function projectCardHTML(p) {
  const tools = (p.tools || []).slice(0, 4).map(t => `<span class="project-card__tool">${sanitize(t)}</span>`).join('');
  return `
    <a href="project-detail.html?id=${p.id}" class="project-card reveal" style="text-decoration:none;display:flex;flex-direction:column" aria-label="View project: ${sanitize(p.title)}">
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

function pubCardHTML(p, accentClass = '', kindOverride = '') {
  const venue = p.journal || p.conference || '';
  const kind  = kindOverride || (p.journal ? 'Journal' : 'Conference');
  const doi   = p.doi ? `<span class="pub-card__doi">DOI ${sanitize(p.doi)}</span>` : '';
  const link  = p.link ? `<a href="${sanitize(p.link)}" target="_blank" rel="noopener" class="pub-card__link">Read paper ${EXT_SVG}</a>` : '';
  const cite  = `${p.authors || ''} (${p.year || ''}). ${p.title || ''}. ${venue}.${p.doi ? ' https://doi.org/' + p.doi : ''}`;
  return `
    <article class="pub-card reveal ${accentClass ? 'pub-card--gold' : ''}">
      <div class="pub-card__year">${sanitize(p.year)}<small>${sanitize(kind)}</small></div>
      <div class="pub-card__body">
        ${venue ? `<div class="pub-card__venue">${sanitize(venue)}</div>` : ''}
        <h3 class="pub-card__title">${sanitize(p.title)}</h3>
        ${p.authors ? pubAuthors(p.authors) : ''}
        ${p.note ? `<p class="pub-card__note">${sanitize(p.note)}</p>` : ''}
        <div class="pub-card__footer">
          ${p.status ? `<span class="status-badge ${getStatusClass(p.status)}">${sanitize(p.status)}</span>` : ''}
          
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
  if (!btn) return;
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
  if (el('#hp-journey')) renderHomeV3();
  if (el('.mh-hero')) renderHomeHero(); else { renderHero(); renderStats(); }
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
  const pubs = DATA.PUBLICATIONS.journal.slice(0, 2);
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

  const statsEl = el('#pub-stats');
  if (statsEl) {
    const all = [...pub.journal, ...pub.conference];
    const tiles = [
      [all.filter(p => /published/i.test(p.status)).length, 'Papers published'],
      [all.filter(p => /presented/i.test(p.status)).length, 'Papers presented'],
      [pub.inProgress.length, 'Under publication'],
      [pub.peerReview.length, 'Peer reviews'],
    ];
    statsEl.innerHTML = tiles.map(([n, label]) => `<div class="pub-stat"><div class="pub-stat__value">${n}</div><div class="pub-stat__label">${label}</div></div>`).join('');
  }

  const journal = el('#pub-journal');
  if (journal && pub.journal.length) {
    journal.innerHTML = pubSectionHTML('Journal Papers', pub.journal, '');
  }

  const conf = el('#pub-conference');
  if (conf && pub.conference.length) {
    conf.innerHTML = pubSectionHTML('Conference Papers', pub.conference, '');
  }

  const inprog = el('#pub-inprogress');
  if (inprog && pub.inProgress.length) {
    inprog.innerHTML = pubSectionHTML('Under Publication Process', pub.inProgress, '');
  }

  const pr = el('#pub-peerreview');
  if (pr && pub.peerReview.length) {
    pr.innerHTML = `
      <div class="pub-section__heading">
        <span class="pub-section__heading-dot" style="background:var(--gold)"></span>
        Peer Review Contributions
        <span class="pub-section__count">${pub.peerReview.length}</span>
      </div>
      <div class="pub-cards">
        ${pub.peerReview.map(r => pubCardHTML({ title: r.journal, journal: r.title, year: r.year, note: r.note }, 'gold', 'Review')).join('')}
      </div>
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
    <div class="pub-cards">
      ${items.map(p => pubCardHTML(p, accentClass)).join('')}
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
        <span style="font-size:2.2rem">🖼</span>
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
      if (feedback) {
        feedback.className = 'form-feedback success';
        feedback.innerHTML = `
          <div class="form-feedback__icon">✓</div>
          <div>
            <strong>Message received.</strong><br>
            Thank you for reaching out. I will respond within 24–48 hours.
          </div>
        `;
        feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      form.reset();
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
    const words = ['Road Safety', 'Crash Analytics', 'GIS Hotspot Mapping', 'AI / ML Modelling', 'Blackspot Studies'];
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

function scCardHTML(item, i) {
  const meta = getContentTypeMeta(item.contentType);
  const units = item.slideCount ? `${item.slideCount} slides` : item.pageCount ? `${item.pageCount} pages` : '';
  const hl = (item.highlights || []).slice(0, 2);
  return `
    <article class="sc-card sc-card--${sanitize(item.contentType)} reveal" style="--i:${i}">
      <div class="sc-card__cover">
        <span class="sc-card__type">${scSvg(item.contentType)}${sanitize(meta.label)}</span>
        ${units ? `<span class="sc-card__units">${sanitize(units)}</span>` : ''}
        <div class="sc-card__sheet" aria-hidden="true">
          <span></span><span></span><span></span><span></span><span></span>
          ${scSvg(item.contentType, 'sc-card__glyph')}
        </div>
      </div>
      <div class="sc-card__body">
        <div class="sc-card__meta"><span>${sanitize(item.category)}</span><span>${sanitize(item.date || '')}</span></div>
        <h3 class="sc-card__title">${sanitize(item.title)}</h3>
        <p class="sc-card__excerpt">${sanitize(item.excerpt)}</p>
        ${hl.length ? `<ul class="sc-card__hl">${hl.map(h => `<li>${sanitize(h)}</li>`).join('')}</ul>` : ''}
        <div class="sc-card__actions">
          ${item.pdfSrc ? `<button type="button" class="btn btn-primary sc-open" data-id="${item.id}">View ${sanitize(meta.label.replace(/s$/, ''))}</button>` : ''}
          <a class="btn-ghost" href="insight-detail.html?id=${item.id}">Details</a>
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
  typesEl.innerHTML = '<span class="sc-types__pill" aria-hidden="true"></span>' + SC_TYPES.map(t => {
    const n = t.key === 'all' ? items.length : items.filter(i => i.contentType === t.key).length;
    return `<button type="button" role="tab" class="sc-type${t.key === 'all' ? ' is-active' : ''}" data-type="${t.key}" aria-selected="${t.key === 'all'}"${n ? '' : ' disabled'}>
      <span class="sc-type__icon">${scSvg(t.key)}</span>
      <span class="sc-type__label">${t.label}</span>
      <span class="sc-type__count">${n}</span>
    </button>`;
  }).join('');
  const pill = el('.sc-types__pill', typesEl);
  const movePill = (instant) => {
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
    const b = e.target.closest('.sc-type');
    if (!b || b.disabled) return;
    els('.sc-type', typesEl).forEach(x => { x.classList.toggle('is-active', x === b); x.setAttribute('aria-selected', String(x === b)); });
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
      el('.sc-type[data-type="all"]', typesEl).click();
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
      <a class="hp-case reveal" href="project-detail.html?id=${p.id}">
        <span class="hp-case__num" aria-hidden="true">${pad(i + 1)}</span>
        <div>
          <div class="hp-case__meta"><span>${sanitize(p.category)}</span><span>${sanitize(p.year)}</span><span>${sanitize(p.status || '')}</span></div>
          <h3 class="hp-case__title">${sanitize(p.title)}</h3>
          <p class="hp-case__desc">${sanitize(p.description)}</p>
          <div class="hp-case__tools">${(p.tools || []).slice(0, 6).map(t => `<span>${sanitize(t)}</span>`).join('')}</div>
        </div>
        <div class="hp-case__side">
          <ul class="hp-case__out">${(p.outcomes || []).slice(0, 3).map(o => `<li>${sanitize(o)}</li>`).join('')}</ul>
          <span class="hp-case__more">View case study <i>→</i></span>
        </div>
      </a>`).join('');
  }

  const P = DATA.PUBLICATIONS || {};
  const all = [...(P.journal || []), ...(P.conference || [])];
  const ps = el('#hp-pubstats');
  if (ps) {
    const rows = [
      [all.filter(p => /published/i.test(p.status)).length, 'Papers published'],
      [all.filter(p => /presented/i.test(p.status)).length, 'Paper presented'],
      [(P.inProgress || []).length, 'Under publication'],
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
