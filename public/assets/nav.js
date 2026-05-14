(function () {
  'use strict';

  const CALCULATORS = [
    {
      slug: 'aircon',
      title: 'Aircon ROI',
      icon: '❄',
      description: 'Compare star ratings & system configs',
      pages: [
        { slug: '',            title: 'Calculator' },
        { slug: 'models',      title: 'Models' },
        { slug: 'methodology', title: 'Methodology' },
        { slug: 'learn',       title: 'How Aircons Work' },
        { slug: 'faq',         title: 'FAQ' }
      ]
    },
    {
      slug: 'refrigerator',
      title: 'Refrigerator',
      icon: '🧊',
      description: 'Old vs. new — when does upgrading pay back?',
      pages: [
        { slug: '',            title: 'Calculator' },
        { slug: 'models',      title: 'Models' },
        { slug: 'methodology', title: 'Methodology' },
        { slug: 'learn',       title: 'How Fridges Work' },
        { slug: 'faq',         title: 'FAQ' }
      ]
    },
    {
      slug: 'water-heater',
      title: 'Water Heater',
      icon: '🛁',
      description: 'Gas vs. electric, with payback period',
      pages: [
        { slug: '',            title: 'Calculator' },
        { slug: 'tariffs',     title: 'Tariffs' },
        { slug: 'methodology', title: 'Methodology' },
        { slug: 'learn',       title: 'How Heaters Work' },
        { slug: 'faq',         title: 'FAQ' }
      ]
    }
  ];

  const SOCIALS = {
    github: 'https://github.com/rengas',
    linkedin: 'https://www.linkedin.com/in/rengaswamy-marimuthu-6a292992/',
    x: 'https://x.com/rswamy85'
  };

  function pathParts() {
    return location.pathname.split('/').filter(Boolean);
  }

  function activeCalcSlug() {
    const p = pathParts();
    if (p.length === 0) return null;
    return CALCULATORS.find(c => c.slug === p[0]) ? p[0] : null;
  }

  function activePageSlug() {
    const p = pathParts();
    if (p.length < 2) return '';
    const last = p[p.length - 1];
    if (!last.endsWith('.html')) return '';
    const base = last.slice(0, -5);
    return base === 'index' ? '' : base;
  }

  function calcUrl(calc, pageSlug = '') {
    const file = pageSlug ? `${pageSlug}.html` : '';
    return `/${calc.slug}/${file}`;
  }

  // Icons inlined for self-contained loading.
  const SVG_HAMBURGER = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>';
  const SVG_GITHUB = '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.65.5.5 5.66.5 12.02c0 5.09 3.29 9.4 7.86 10.93.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.36-3.87-1.36-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.69 1.24 3.34.95.1-.74.4-1.24.73-1.53-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.16 1.18a10.93 10.93 0 0 1 5.75 0c2.2-1.5 3.16-1.18 3.16-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.26 5.69.41.36.78 1.07.78 2.16v3.2c0 .31.21.67.8.55 4.56-1.53 7.85-5.84 7.85-10.92C23.5 5.66 18.35.5 12 .5z"/></svg>';
  const SVG_LINKEDIN = '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/></svg>';
  const SVG_X = '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/></svg>';

  function injectTopBar() {
    // Update body background to the new mint theme.
    document.body.classList.remove('bg-slate-50', 'bg-white');
    document.body.classList.add('bg-[#eef7f3]');

    // Remove any legacy mobile-only header so we don't end up with two.
    document.querySelectorAll('body > header').forEach(h => {
      if (h.classList.contains('md:hidden')) h.remove();
    });
    if (document.getElementById('topbar')) return;

    const isBlog = location.pathname.startsWith('/blog');
    const isCalc = !isBlog && location.pathname !== '/';
    const calcCls = isCalc
      ? 'bg-white text-teal-700 shadow-sm'
      : 'text-slate-700 hover:text-teal-700 hover:bg-white/60';
    const blogCls = isBlog
      ? 'bg-white text-teal-700 shadow-sm'
      : 'text-slate-700 hover:text-teal-700 hover:bg-white/60';

    const top = document.createElement('header');
    top.id = 'topbar';
    top.className = 'bg-[#dceae3] border-b border-[#c8dad1] sticky top-0 z-30';
    top.innerHTML = `
      <div class="max-w-7xl mx-auto px-3 sm:px-4 flex items-center gap-1 h-14">
        <button id="navToggle" class="md:hidden p-2 rounded hover:bg-white/60" aria-label="Toggle navigation">${SVG_HAMBURGER}</button>
        <a href="/" class="text-base font-bold text-slate-900 px-2 py-1.5 mr-1 sm:mr-2 shrink-0">ROI Tools</a>
        <nav class="flex gap-0.5 sm:gap-1">
          <a href="/aircon/" class="px-2.5 sm:px-3 py-2 text-sm font-medium rounded-md transition ${calcCls}">Calculators</a>
          <a href="/blog/" class="px-2.5 sm:px-3 py-2 text-sm font-medium rounded-md transition ${blogCls}">Blog</a>
        </nav>
        <div class="ml-auto hidden sm:flex items-center gap-0.5">
          <a href="${SOCIALS.github}" target="_blank" rel="noopener noreferrer" aria-label="GitHub" class="p-2 rounded-md text-slate-500 hover:text-teal-700 hover:bg-white/60 transition">${SVG_GITHUB}</a>
          <a href="${SOCIALS.linkedin}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" class="p-2 rounded-md text-slate-500 hover:text-teal-700 hover:bg-white/60 transition">${SVG_LINKEDIN}</a>
          <a href="${SOCIALS.x}" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" class="p-2 rounded-md text-slate-500 hover:text-teal-700 hover:bg-white/60 transition">${SVG_X}</a>
        </div>
      </div>`;
    document.body.prepend(top);

    // Ensure the backdrop sits below the top bar.
    const bd = document.getElementById('navBackdrop');
    if (bd) {
      bd.classList.remove('inset-0');
      bd.classList.add('top-14', 'inset-x-0', 'bottom-0');
    }
  }

  function renderSidebar() {
    const el = document.getElementById('sidebar');
    if (!el) return;
    // Reposition + recolor the existing sidebar to match the new chrome.
    el.classList.remove('top-0', 'h-screen', 'flex', 'flex-col', 'bg-white', 'border-slate-200');
    el.classList.add('top-14', 'h-[calc(100vh-3.5rem)]', 'bg-[#dceae3]', 'border-[#c8dad1]');

    const active = activeCalcSlug();
    const items = CALCULATORS.map(c => {
      const isActive = c.slug === active;
      const href = c.comingSoon ? '#' : calcUrl(c);
      const baseCls = 'block rounded-lg px-3 py-2 text-sm transition';
      const stateCls = c.comingSoon
        ? 'opacity-60 cursor-not-allowed'
        : (isActive
            ? 'bg-white text-teal-700 ring-1 ring-teal-300 shadow-sm'
            : 'text-slate-700 hover:bg-white/60');
      const click = c.comingSoon ? 'onclick="event.preventDefault();"' : '';
      return `
        <a href="${href}" ${click} class="${baseCls} ${stateCls}">
          <div class="flex items-center gap-2">
            <span class="text-base">${c.icon}</span>
            <span class="font-medium">${c.title}</span>
            ${c.comingSoon ? '<span class="ml-auto text-[10px] uppercase tracking-wide text-slate-500">soon</span>' : ''}
          </div>
          <p class="text-xs text-slate-500 mt-0.5 ml-7">${c.description}</p>
        </a>`;
    }).join('');

    el.innerHTML = `
      <div class="p-4">
        <h2 class="text-xs font-semibold text-slate-500 uppercase tracking-wider px-1 mb-3">Calculators</h2>
        <div class="space-y-1">${items}</div>
      </div>`;
  }

  function renderTopTabs() {
    const el = document.getElementById('subtabs');
    if (!el) return;
    el.classList.remove('md:top-0');
    el.classList.add('sticky', 'top-14');

    const slug = activeCalcSlug();
    const calc = CALCULATORS.find(c => c.slug === slug);
    if (!calc || calc.pages.length <= 1) {
      el.classList.add('hidden');
      return;
    }
    const activePage = activePageSlug();
    const items = calc.pages.map(p => {
      const isActive = p.slug === activePage;
      const cls = isActive
        ? 'border-teal-600 text-teal-700'
        : 'border-transparent text-slate-600 hover:text-teal-600 hover:border-slate-300';
      return `
        <a href="${calcUrl(calc, p.slug)}"
           class="px-1 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition ${cls}">
          ${p.title}
        </a>`;
    }).join('');
    el.innerHTML = `<div class="max-w-5xl mx-auto px-4 sm:px-6 flex gap-5 overflow-x-auto">${items}</div>`;
  }

  function setupMobileToggle() {
    const btn = document.getElementById('navToggle');
    const sidebar = document.getElementById('sidebar');
    const backdrop = document.getElementById('navBackdrop');
    if (!btn || !sidebar) return;
    const isOpen = () => !sidebar.classList.contains('-translate-x-full');
    const open = () => {
      sidebar.classList.remove('-translate-x-full');
      if (backdrop) backdrop.classList.remove('hidden');
    };
    const close = () => {
      sidebar.classList.add('-translate-x-full');
      if (backdrop) backdrop.classList.add('hidden');
    };
    btn.addEventListener('click', () => (isOpen() ? close() : open()));
    if (backdrop) backdrop.addEventListener('click', close);
    sidebar.addEventListener('click', e => {
      if (e.target.closest('a') && window.matchMedia('(max-width: 767px)').matches) close();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    injectTopBar();
    renderSidebar();
    renderTopTabs();
    setupMobileToggle();
  }
})();
