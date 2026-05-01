# Gas / Electric Water Heater ROI Calculator

A Singapore-focused tool for estimating the payback period of switching between
gas and electric water heaters. Built as a static, single-folder website — no
build step, no backend, no dependencies beyond CDN-loaded Tailwind CSS and
Chart.js.

## Pages

| File              | Purpose                                                                                  |
| ----------------- | ---------------------------------------------------------------------------------------- |
| `index.html`      | The ROI calculator — live inputs, results card, 10-year projection table.                |
| `tariffs.html`    | Historical tariff charts (SP Group electricity, City Energy town gas) with key stats.    |
| `methodology.html`| Every formula and constant the calculator uses, plus a worked example.                   |
| `learn.html`      | How instant electric, electric storage tank, and gas heaters work — diagrams + comparison. |
| `faq.html`        | Practical questions about hot-water usage, heater types, and the calculator's framing.   |

All pages share a top nav: **Calculator · Tariffs · Methodology · How Heaters Work · FAQ**.

## Running locally

The pages are pure static HTML — open `index.html` directly in a browser, or serve the directory:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000/
```

A real HTTP server is recommended for the tariff charts (Chart.js loads cleaner over `http://`).

## Calculation model (summary)

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

Constants: `c = 0.001163 kWh/(L·°C)`, `s = 0.0006 kWh/(L·°C·day)`, `T_amb = 28 °C` (SG), `D = 30 days/month`. Full derivation in `methodology.html`.

## Data sources

- **Electricity tariffs** — [SP Group Tariff Information](https://www.spgroup.com.sg/our-services/utilities/tariff-information). Domestic low-tension supply, 2014–present.
- **Town gas tariffs** — [City Energy Newsroom](https://cityenergy.com.sg/newsroom/). General tariff (residential), 2007–present.
- **Cross-check** — [EMA Statistics](https://www.ema.gov.sg/resources/statistics).

Raw spreadsheets are in the repo root:

- `Historical Electricity Tariff.xlsx`
- `Historical-Town-Gas-Tariffs_from_2007-to-2026-June.xlsx`

The cleaned series used by `tariffs.html` is embedded inline in that file (also exported as `tariffs-data.json`).

## Tech stack

- HTML + vanilla JS, no framework, no build.
- Tailwind CSS via CDN (`cdn.tailwindcss.com`).
- Chart.js v4 + `chartjs-adapter-date-fns` via CDN, only on `tariffs.html`.
- Inline SVG for heater diagrams on `learn.html`.

## Assumptions worth knowing

- Heating energy is treated as identical for gas and electric (no efficiency derating in the calc itself; `learn.html` discusses this).
- Tariffs compound annually at a constant rate; real tariffs are revised quarterly.
- Active months are contiguous (months 1..M_a of each year contribute; off-months are zero).
- 30-day months. Standing charges are not modelled.
- All currency in SGD.