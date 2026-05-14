// Single source of truth for which calculators exist in the sidebar.
// Adding a new calculator: append an entry here and create the pages.

export type Page = { slug: string; title: string };
export type Calculator = {
  slug: string;
  title: string;
  icon: string;
  description: string;
  comingSoon?: boolean;
  pages: Page[];
};

export const CALCULATORS: Calculator[] = [
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
      { slug: 'faq',         title: 'FAQ' },
    ],
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
      { slug: 'faq',         title: 'FAQ' },
    ],
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
      { slug: 'faq',         title: 'FAQ' },
    ],
  },
];

export const SOCIALS = {
  github: 'https://github.com/rengas',
  linkedin: 'https://www.linkedin.com/in/rengaswamy-marimuthu-6a292992/',
  x: 'https://x.com/rswamy85',
};
