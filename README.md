# ROI Tools — Singapore Home Calculators

A small static site of payback-period calculators for everyday Singapore home decisions.
Built as a single-folder website — no build step, no backend, just HTML + Tailwind (CDN) +
a touch of vanilla JS.

## Layout

A persistent left **sidebar** lists every calculator in the site. The active calculator's
own pages (calculator, methodology, FAQ, etc.) appear as **horizontal tabs** at the top of
the main area. On mobile the sidebar collapses into a hamburger drawer.

Adding a new calculator means adding one entry to `assets/nav.js` and dropping a folder
of pages — no per-page nav edits.

## Calculators

| Slug          | Status        | What it does                                                |
| ------------- | ------------- | ----------------------------------------------------------- |
| `water-heater`| Live          | Gas vs. electric water heater, with payback period.         |
| `aircon`      | Coming soon   | Replacement ROI for older aircon units (placeholder stub).  |

## Folder structure

```
.
├── index.html                   # landing page — calculator picker
├── assets/
│   └── nav.js                   # calculator registry + sidebar/sub-tab renderer
├── water-heater/
│   ├── index.html               # the calculator
│   ├── tariffs.html             # historical SP / City Energy charts
│   ├── methodology.html         # every formula and constant
│   ├── learn.html               # how each heater type works
│   ├── faq.html                 # common questions
│   └── data/
│       ├── tariffs-data.json
│       ├── Historical Electricity Tariff.xlsx
│       └── Historical-Town-Gas-Tariffs_from_2007-to-2026-June.xlsx
├── aircon/
│   └── index.html               # "coming soon" stub
└── README.md
```

## Running locally

```bash
python3 -m http.server 8000
# then visit http://localhost:8000/
```

A real HTTP server is required because pages reference `/assets/nav.js` with an
absolute path. Opening pages directly via `file://` will not load the nav.

## Adding a new calculator

1. Add an entry to the `CALCULATORS` array in `assets/nav.js`:
   ```js
   {
     slug: 'solar',
     title: 'Solar PV',
     icon: '☀',
     description: 'Rooftop payback for HDB / landed homes',
     pages: [
       { slug: '',            title: 'Calculator' },
       { slug: 'methodology', title: 'Methodology' },
       { slug: 'faq',         title: 'FAQ' }
     ]
   }
   ```
2. Create `solar/index.html`, `solar/methodology.html`, `solar/faq.html`.
3. Each page uses the standard layout shell (mobile header + sidebar + sub-tab nav + main).
   Easiest path: copy any page in `water-heater/` and replace the body content. The shell
   markup is identical across calculators; `nav.js` populates the active state automatically.

## Water Heater calculator: model summary

Inputs split across three groups:

- **Tariffs & Trends** — electricity / gas rate (before GST), annual escalation per fuel, GST %.
- **Hot Water Demand** — household size, litres per person/day, cold inlet temp, heater control type, delivery temp, tank capacities (per heater), tank setpoint.
- **Costs & Settings** — conversion cost, electric replacement cost, cashback, active months/year.

Core flow:

```
I_net          = C_conv − C_repl − C_cb
E_heat         = N × L_p × (T_del − T_cold) × c               [kWh/day]
S_elec / S_gas = V × max(0, T_eff − T_amb) × s                [kWh/day, per tank]
U_elec / U_gas = (E_heat + S) × 30                            [kWh/month]
P(N)           = P × (1 + r)^(N−1) × (1 + g)                  [year-N tariff]
A(N)           = U_elec·P_e(N)·M_a − U_gas·P_g(N)·M_a         [annual savings]
break-even     = first month where Σ active-month savings ≥ I_net
```

Constants: `c = 0.001163 kWh/(L·°C)`, `s = 0.0006 kWh/(L·°C·day)`, `T_amb = 28 °C` (SG), `D = 30 days/month`.
Full derivation in `water-heater/methodology.html`.

## Data sources

- **Electricity tariffs** — [SP Group Tariff Information](https://www.spgroup.com.sg/our-services/utilities/tariff-information). Domestic low-tension supply, 2014–present.
- **Town gas tariffs** — [City Energy Newsroom](https://cityenergy.com.sg/newsroom/). General tariff (residential), 2007–present.
- **Cross-check** — [EMA Statistics](https://www.ema.gov.sg/resources/statistics).

Raw spreadsheets ship with the repo under `water-heater/data/`. The cleaned series used
by `tariffs.html` is embedded inline in that file (also exported as `data/tariffs-data.json`).

## Tech stack

- HTML + vanilla JS, no framework, no build.
- Tailwind CSS via CDN (`cdn.tailwindcss.com`).
- Chart.js v4 + `chartjs-adapter-date-fns` via CDN, only on the tariffs page.
- Inline SVG for heater diagrams on `learn.html`.

## Assumptions worth knowing

- Heating energy is treated as identical for gas and electric (no efficiency derating in
  the calc itself; `learn.html` discusses this explicitly).
- Tariffs compound annually at a constant rate; real tariffs are revised quarterly.
- Active months are contiguous (months 1..M_a of each year contribute; off-months are zero).
- 30-day months. Standing charges are not modelled.
- All currency in SGD.
