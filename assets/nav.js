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

  function renderSidebar() {
    const el = document.getElementById('sidebar');
    if (!el) return;
    const active = activeCalcSlug();

    const items = CALCULATORS.map(c => {
      const isActive = c.slug === active;
      const href = c.comingSoon ? '#' : calcUrl(c);
      const baseCls = 'block rounded-lg px-3 py-2 text-sm transition';
      const stateCls = c.comingSoon
        ? 'opacity-50 cursor-not-allowed'
        : (isActive
            ? 'bg-teal-50 text-teal-700 ring-1 ring-teal-200'
            : 'text-slate-700 hover:bg-slate-100');
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

    // Make the aside itself a flex column so mt-auto on the footer is reliable,
    // independent of the inner element's min-height resolution.
    el.classList.add('flex', 'flex-col');
    el.innerHTML = `
      <div class="p-4 flex-1">
        <a href="/" class="block mb-5 px-1">
          <span class="text-base font-bold text-slate-900">ROI Tools</span>
          <p class="text-xs text-slate-500">Singapore home calculators</p>
        </a>
        <div class="space-y-1">${items}</div>
      </div>
      <div class="p-4 border-t border-slate-100">
        <div class="flex items-center gap-2 px-1">
            <a href="https://github.com/rengas" target="_blank" rel="noopener noreferrer"
               aria-label="GitHub"
               class="p-1.5 rounded-md text-slate-500 hover:text-teal-700 hover:bg-slate-100 transition">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                <path d="M12 .5C5.65.5.5 5.66.5 12.02c0 5.09 3.29 9.4 7.86 10.93.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.36-3.87-1.36-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.69 1.24 3.34.95.1-.74.4-1.24.73-1.53-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.16 1.18a10.93 10.93 0 0 1 5.75 0c2.2-1.5 3.16-1.18 3.16-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.26 5.69.41.36.78 1.07.78 2.16v3.2c0 .31.21.67.8.55 4.56-1.53 7.85-5.84 7.85-10.92C23.5 5.66 18.35.5 12 .5z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/rengaswamy-marimuthu-6a292992/" target="_blank" rel="noopener noreferrer"
               aria-label="LinkedIn"
               class="p-1.5 rounded-md text-slate-500 hover:text-teal-700 hover:bg-slate-100 transition">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/>
              </svg>
            </a>
            <a href="https://x.com/rswamy85" target="_blank" rel="noopener noreferrer"
               aria-label="X (Twitter)"
               class="p-1.5 rounded-md text-slate-500 hover:text-teal-700 hover:bg-slate-100 transition">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
              </svg>
            </a>
          </div>
        </div>`;
  }

  function renderTopTabs() {
    const el = document.getElementById('subtabs');
    if (!el) return;
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

    function isOpen() { return !sidebar.classList.contains('-translate-x-full'); }
    function open() {
      sidebar.classList.remove('-translate-x-full');
      if (backdrop) backdrop.classList.remove('hidden');
    }
    function close() {
      sidebar.classList.add('-translate-x-full');
      if (backdrop) backdrop.classList.add('hidden');
    }

    btn.addEventListener('click', () => isOpen() ? close() : open());
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
    renderSidebar();
    renderTopTabs();
    setupMobileToggle();
  }
})();
