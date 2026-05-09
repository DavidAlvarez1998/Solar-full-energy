# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server with HMR
npm run build     # TypeScript check (tsc -b) then Vite production build → /dist
npm run lint      # ESLint on all .ts/.tsx files
npm run preview   # Preview the production build locally
```

There is no test suite configured in this project.

## Architecture

Single-page application for Solar Full Energy (solar company in Pereira, Colombia) built with React 18 + TypeScript + Vite. No routing library — `App.tsx` manages an `activeSection` state string to swap between five views: Dashboard, Servicios, Instalados, Redes, Chatbot.

**Key layers:**

- `src/types/index.ts` — Central TypeScript interfaces (`SectionId`, `ChatState`, `ChatMessage`, `Lead`, `QuoteResult`). All shared types live here.
- `src/data/cities.ts` — Static data for 32 Colombian cities (energy costs, transport, lodging, food). `BASE_CITY = "Pereira"` is the company's home base; travel costs are only added for other cities.
- `src/hooks/useChatbot.ts` — State machine driving the 8-step chat flow: `welcome → email → phone → city → bill → quote → interest → restart`. Uses `useRef` for stable state across async delays and `useState` for message list re-renders.
- `src/utils/chatbot.ts` — Business logic: `calcSystem()` computes panel count + total cost + 25-year ROI from a monthly bill (COP) and city name; `findCity()` does fuzzy city matching; `saveLead()` persists to `localStorage` under key `solar_leads`; `fmtCOP()` formats Colombian peso amounts.
- `src/components/chatbot/QuoteCard.tsx` — Renders the quote result with a Chart.js line chart showing 25-year cumulative savings vs. system cost.

**Quote calculation logic (`calcSystem`):**
- Assumes 150 kWh per panel per month
- Panel count = ceil(monthly_kwh / 150), where monthly_kwh is derived from the bill amount and city's energy rate
- Total cost = (panels × panel_cost) + labor + [transport + lodging + food if city ≠ Pereira]
- Payback years and 25-year savings are computed from the monthly savings vs. system cost

## Styling Conventions

- Tailwind utility classes for layout/spacing; custom component classes defined in `index.css` (`.glass-card`, `.stat-chip`, `.nav-item`, `.badge-*`)
- Extended Tailwind theme in `tailwind.config.js`: colors (`solar-*`, `gold-*`), fonts (Inter body, Orbitron headings, Rajdhani labels), keyframe animations (aurora, shimmer, blink, float, glow)
- Dark-first color scheme: `#050810` background, `#0d121f` sidebars, `#2563eb` primary blue, `#FFD700` gold accent
- Emoji characters are used as icons throughout (⚡☀️🏗️📡🤖). SVG icons only for brand logos (WhatsApp, Instagram, Facebook) in `src/components/icons/`
- Responsive breakpoints handled with inline Tailwind + raw CSS media queries in `index.css`. Key breakpoints: 900px (chat layout), 768px (gallery/panels), 580px (sidebar collapse), 640px (tables)

## TypeScript Config

Strict mode is on (`noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`). Module resolution is `Bundler`. Keep unused variables and parameters out of the codebase — the build will fail otherwise.
