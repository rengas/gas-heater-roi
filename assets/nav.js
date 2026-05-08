(function () {
  'use strict';

  const CALCULATORS = [
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
    },
    {
      slug: 'aircon',
      title: 'Aircon Replacement',
      icon: '❄',
      description: 'Coming soon',
      comingSoon: true,
      pages: [{ slug: '', title: 'Calculator' }]
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

    el.innerHTML = `
      <div class="p-4">
        <a href="/" class="block mb-5 px-1">
          <span class="text-base font-bold text-slate-900">ROI Tools</span>
          <p class="text-xs text-slate-500">Singapore home calculators</p>
        </a>
        <div class="space-y-1">${items}</div>
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
