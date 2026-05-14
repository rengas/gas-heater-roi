# ROI Tools — Singapore Home Calculators

A small site of payback-period calculators for everyday Singapore home decisions, plus a blog.
Built with **Astro** (for the layout, blog, and routing), with the existing vanilla-JS calculators
served as static files from `public/`.

## Layout

Persistent left **sidebar** lists every calculator + the blog. The active calculator's sub-pages
(calculator, methodology, FAQ, etc.) appear as **horizontal tabs** above the main content.
On mobile the sidebar collapses into a hamburger drawer.

## Calculators (live)

| Slug            | What it does                                                              |
| --------------- | ------------------------------------------------------------------------- |
| `aircon`        | Side-by-side Option A vs B with NEA model picker, room builder, ROI.      |
| `refrigerator`  | Old vs. new fridge ROI. Estimate-by-age, NEA list, or custom kWh modes.   |
| `water-heater`  | Gas vs. electric water heater, with payback period + historical tariffs.  |

## Folder structure

```
.
├── src/
│   ├── pages/
│   │   ├── index.astro              landing page
│   │   └── blog/
│   │       ├── index.astro          blog listing
│   │       └── [...slug].astro      individual post template
│   ├── layouts/
│   │   └── BaseLayout.astro         shared shell (sidebar + sub-tabs + mobile drawer)
│   ├── components/
│   │   ├── Sidebar.astro
│   │   └── SubTabs.astro
│   ├── content/
│   │   ├── config.ts                blog frontmatter schema
│   │   └── blog/
│   │       └── *.mdx                blog posts
│   ├── data/
│   │   └── calculators.ts           single source of truth for sidebar entries
│   └── styles/
│       └── global.css               Tailwind directives
├── public/                          served verbatim at the site root
│   ├── aircon/                      calculator + supporting pages (vanilla JS)
│   ├── refrigerator/                same
│   ├── water-heater/                same
│   └── assets/                      shared static assets (icons, legacy nav.js)
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
└── package.json
```

## Running locally

```bash
npm install          # one-time
npm run dev          # development server at http://localhost:4321
npm run build        # produce dist/ for deploy
npm run preview      # serve the production build locally
```

**Important during development:** Astro's dev server **doesn't** auto-resolve `/aircon/` →
`/aircon/index.html` for files in `public/`. For calculator pages, either:
- use `npm run preview` after a build (recommended for full-site verification), or
- visit calculators by their explicit path in dev: `http://localhost:4321/aircon/index.html`.

Blog pages work fine in dev mode because they're Astro routes.

## Writing a new blog post

1. Create `src/content/blog/my-post.mdx`:
   ```mdx
   ---
   title: "Your post title"
   description: "One-line summary for the listing and meta tag"
   pubDate: 2026-05-13
   tags: ["tariffs", "water-heater"]
   ---

   Your content in Markdown / MDX. You can use **emphasis**, [links](https://example.com),
   `inline code`, code blocks, lists, and even React-like components.
   ```
2. Save. `npm run dev` will hot-reload `/blog/` and `/blog/my-post/`.
3. To hide a post from the listing, set `draft: true` in the frontmatter.

## Adding a new calculator

1. Add an entry to `src/data/calculators.ts`.
2. Create `public/<slug>/index.html` (and any supporting pages like `methodology.html`).
   Copy from any existing calculator (e.g. `public/aircon/index.html`) as a starting point.
3. The sidebar picks it up automatically next build.

## Tech stack

- **Astro 5** — static-first with islands; we output pure HTML.
- **Tailwind CSS** (compiled at build, not CDN).
- **MDX** for blog posts.
- **`@astrojs/sitemap`** auto-generates `/sitemap-index.xml` for SEO.
- Vanilla JS for the calculator math — no React, no framework runtime on calculator pages.

## Data sources

- **Electricity tariffs** — [SP Group Tariff Information](https://www.spgroup.com.sg/our-services/utilities/tariff-information).
- **Town gas tariffs** — [City Energy Newsroom](https://cityenergy.com.sg/newsroom/).
- **Appliance specs** — [NEA Energy Labelling Scheme](https://www.nea.gov.sg/our-services/climate-change-energy-efficiency/energy-efficiency/household-sector/energy-labelling-scheme).
- **Cross-check** — [EMA Statistics](https://www.ema.gov.sg/resources/statistics).

Raw spreadsheets and extracted JS data files ship under each calculator's `data/` subfolder.

## Deploy

The output of `npm run build` is plain static HTML/CSS/JS in `dist/`. Deploy to any static host:

- **Cloudflare Pages** — free, fast, easy. Connect the repo, set build command to `npm run build`,
  output directory to `dist`.
- **Vercel / Netlify** — same workflow.
- **GitHub Pages** — use a workflow to push `dist/` to the `gh-pages` branch.

## Assumptions worth knowing (water-heater calculator)

- Heating energy is treated as identical for gas and electric (no efficiency derating in the calc
  itself; `learn.html` discusses this explicitly).
- Tariffs compound annually at a constant rate; real tariffs are revised quarterly.
- 30-day months. Standing charges are not modelled.
- All currency in SGD.
