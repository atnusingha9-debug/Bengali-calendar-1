# Project — Bengali Calendar (SEO-optimized clone of bengalicalendar.com)

## Goal
SEO-optimized React+Vite alternative to bengalicalendar.com. Same content
(NOT the same design). Must be crawlable by Google — full HTML rendered at
build time, not empty SPA divs.

## Artifacts
- `artifacts/bengali-calendar` — the public site (React + Vite, port 22877, base path `/`)
- `artifacts/api-server` — unused for this project (template scaffold)
- `artifacts/mockup-sandbox` — unused for this project (template scaffold)

## Tech & architecture
- React 19 + Vite 7
- `react-router-dom` v7 for routing (BrowserRouter on client, StaticRouter for SSR)
- `react-helmet-async` for per-page metadata
- TailwindCSS for styling — palette: cream `#fffaf2`, deep maroon `#7a1f12`, amber accents
- Static Site Generation: `pnpm run build` runs three steps:
  1. `vite build --config vite.config.ts` — client bundle into `dist/public/`
  2. `vite build --config vite.ssr.config.ts` — SSR bundle into `dist/ssr/entry-server.mjs`
  3. `node prerender.mjs` — renders every route to `dist/public/<path>/index.html`,
     hoists React 19 metadata tags into `<head>`, writes `robots.txt` and `sitemap.xml`
- All 85 routes (home, year overviews 1430–1435, every month for each year, festivals,
  date converter, durga puja, poyla boishakh, download, about) are prerendered as
  fully-formed HTML with semantic markup, meta description, canonical, OpenGraph,
  Twitter cards, breadcrumbs and Schema.org JSON-LD (WebSite, BreadcrumbList, Event).

## Bengali calendar logic
- `src/lib/bengali-calendar.ts` — BS↔AD conversion based on West-Bengal Hindu solar
  panjika approximation (1 Boishakh ≈ Apr 14/15, 365–366 day variant). Includes
  hardcoded `FESTIVALS` data for 1432 and 1433 BS, `monthLengths()` helper,
  `bsToGregorian` / `gregorianToBs` / `getYearInfo` / `buildMonthGrid` /
  `festivalsForYear` / `festivalsForMonth` / `todayBs` / `bengaliNumeral`.
- Current Bengali year hardcoded as `CURRENT_BS_YEAR = 1433`. Update yearly.

## Pages
| Route | Component | Purpose |
|---|---|---|
| `/` | `Home` | Today's BS date, hero, current month grid, list of all months |
| `/year/:y` | `Year` | Year overview, table of months, mini-grids |
| `/year/:y/:slug` | `Month` | Full month grid with festival list and SEO copy |
| `/date-converter` | `DateConverter` | Interactive AD↔BS converter |
| `/festivals` | `Festivals` | Full festival/holiday tables for upcoming years |
| `/poyla-boishakh` | `PoylaBoishakh` | Bengali New Year landing page |
| `/durga-puja` | `DurgaPuja` | Durga Puja landing page |
| `/download` | `Download` | Print-friendly download index |
| `/about` | `About` | About the Bengali calendar |
| `*` | `NotFound` | 404 |

## Notable conventions
- The `vite.config.ts` falls back to BASE_PATH=`/` and PORT=`5173` when running
  `vite build` (no env vars needed in CI/build), but still requires PORT in dev mode.
- Helmet markup is moved from `<body>` into `<head>` by `prerender.mjs` because
  React 19 emits `<title>`/`<meta>`/`<link>` tags inline.
- The site is intentionally English-first with Bengali (বাংলা) supplementary
  text via `lang="bn"` spans, matching the original site's audience.

## Commands
- `pnpm --filter @workspace/bengali-calendar run dev` — dev server
- `pnpm --filter @workspace/bengali-calendar run build` — full prerendered build
- `pnpm --filter @workspace/bengali-calendar run typecheck` — type-check only
