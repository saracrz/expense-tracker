# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Communication

Use caveman mode (full) in every response unless the user turns it off ("stop caveman" / "normal mode"). Agents whose own definition says otherwise follow their definition.

## Commands

Requires Node 24 (`.nvmrc`; run `nvm use`). Tailwind 4.2+ native binding needs Node >= 20.

- `npm run dev` — Vite dev server on http://localhost:5173
- `npm run build` — type-check (`tsc`) then `vite build`
- `npm run lint` — ESLint with `--max-warnings 0` (any warning fails)

After changing dependencies, restart the dev server; if the browser gets `504 (Outdated Optimize Dep)` or missing `node_modules/.vite/deps/*` files, stop it, `rm -rf node_modules/.vite`, and run `npm run dev -- --force`.

No test suite currently.

## Environment

Firebase config comes from `.env` via `import.meta.env` (see `src/firebase.ts`): `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_STORAGE_BUCKET`, `VITE_FIREBASE_MESSAGING_SENDER_ID`, `VITE_FIREBASE_APP_ID`.

## Architecture

React 19 + TypeScript + Vite SPA backed by Firebase Firestore. No router and no login: `App.tsx` renders `MonthlyExpenseSection` directly. Firebase is slated for removal; until then expenses won't load or save without Firestore access.

Feature-based ("DDD") layout under `src/`:
- `features/<domain>/` — each domain owns its components, service (`xService.ts`, Firebase calls), and `types.ts`. Domains: `expenses` (`useExpenses.ts` is currently empty; state lives in `MonthlyExpenseSection`).
- `components/ui/` — shared presentational components, re-exported from `components/ui/index.ts`; import from `components/ui`, not individual files.
- `firebase.ts` — single Firebase init; exports `app`, `db`.
- `lib/utils.ts` — `cn()` (clsx + tailwind-merge).
- `helpers/` — misc utilities.

Data: expenses stored in a single top-level Firestore `expenses` collection (`{ name, amount }`), not scoped per user.

## Styling

Tailwind CSS v4 via `@tailwindcss/vite` plugin, CSS-first config: no `tailwind.config.*`; `src/index.css` starts with `@import "tailwindcss"` and holds theme tokens (`@theme inline`, CSS variables, `.dark` variant). Don't use v3 `@tailwind` directives. shadcn/ui is configured (`components.json`: new-york style, neutral base, lucide icons) — `Button.tsx` is shadcn-generated using `cva` variants. Path alias `@/*` → `src/*` (set in both `vite.config.ts` and `tsconfig.json`). Soft neobrutalist look designed in Penpot first: tokens in `src/index.css` mirror the Penpot "base" token set (cream background, ink `--foreground` borders, `shadow-hard`, `rounded-card`/`rounded-control`/`rounded-sheet`, `bg-category-*` colors); spacing, font sizes and weights use Tailwind defaults on purpose — don't add arbitrary values. Each month has a pastel accent (4 rotating via month index % 4, black text on top) and a month-name header with a scalloped total stamp (`MonthHero`): `getMonthTheme()` (`src/lib/month.ts`) sets `--primary` inline on the root div in `App.tsx`, so `bg-primary` and `Button` follow the current month; focus rings stay ink. `Input` error styling keys off `aria-invalid`. Archivo (both `font-sans` and `font-display`) loads from Google Fonts in `index.html`.
