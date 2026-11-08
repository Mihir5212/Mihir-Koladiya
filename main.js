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

function pubCardHTML(p, accentClass = '') {
  const venue = p.journal || p.conference || '';
  const doi   = p.doi ? `<span class="pub-card__doi">DOI: ${sanitize(p.doi)}</span>` : '';
  const link  = p.link ? `<a href="${p.link}" target="_blank" rel="noopener" class="pub-card__link">View ↗</a>` : '';
  return `
    <div class="pub-card reveal">
      <div class="pub-card__accent ${accentClass}"></div>
      <div class="pub-card__body">
        <div class="pub-card__title">${sanitize(p.title)}</div>
        <div class="pub-card__meta">${sanitize(p.authors)} &middot; ${sanitize(venue)} &middot; ${sanitize(p.year)}</div>
        <div class="pub-card__footer">
          <span class="status-badge ${getStatusClass(p.status)}">${sanitize(p.status)}</span>
          ${doi}
          ${link}
        </div>
      </div>
    </div>
  `;
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
  renderHero();
  renderStats();
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
  ];
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
    inprog.innerHTML = pubSectionHTML('Under Review / In Progress', pub.inProgress, '');
  }

  const pr = el('#pub-peerreview');
  if (pr && pub.peerReview.length) {
    pr.innerHTML = `
      <div class="pub-section__heading">
        <span class="pub-section__heading-dot" style="background:var(--gold)"></span>
        Peer Review Contributions
      </div>
      <div class="pub-cards">
        ${pub.peerReview.map(r => `
          <div class="pub-card reveal">
            <div class="pub-card__accent pub-card__accent--gold"></div>
            <div class="pub-card__body">
              <div class="pub-card__title">${sanitize(r.title)} — ${sanitize(r.journal)}</div>
              <div class="pub-card__meta">${sanitize(r.year)}</div>
              <div class="pub-card__footer">
                <span class="tag">${sanitize(r.note)}</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }
}

function pubSectionHTML(label, items, accentClass) {
  return `
    <div class="pub-section__heading">
      <span class="pub-section__heading-dot"></span>
      ${sanitize(label)}
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
  ];
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
  // Delay reveal init to allow dynamic content to render first
  setTimeout(initReveal, 100);
});
