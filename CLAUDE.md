# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project context

Personal portfolio for Karan Nandkar, Senior/Lead Gameplay Engineer. Target deploy: Vercel at `https://codekarangames.dev`. Stack: Next.js 15 (App Router) + TypeScript + Tailwind CSS.

## Source of truth

`_design/` is the visual and behavioral spec — a React-via-Babel-CDN prototype. Match it pixel-for-pixel in styling, animations, and interactions. The Next.js production code lives in `src/`.

## Commands

```bash
npm run dev      # Start dev server (webpack mode) at http://localhost:3000
npm run build    # Production build
npm run lint     # ESLint
```

No test suite configured.

## Architecture

Single-page site. `src/app/layout.tsx` holds Nav + global metadata. `src/app/page.tsx` composes all sections with `FadeIn` wrappers and `Divider` separators matching `_design/app.jsx`.

**Section order** (matches `_design/app.jsx`):
`Nav` (layout) → `Hero` → `Work` → `Systems` → `Experience` → `Writing` → `Contact` → `Footer` (page.tsx)

Each section needs an `id` matching its lowercase nav label (`id="work"`, `id="systems"`, etc.) for scroll-spy.

### Component map

| File | Role | Client? |
|---|---|---|
| `Nav.tsx` | Fixed header with scroll-spy + sliding underline indicator + mobile overlay | ✓ |
| `Hero.tsx` | Name/CTA + `LagCompCanvas` physics demo | ✓ |
| `Work.tsx` | PROJECTS grid with hover-state `ProjectCard` | ✓ |
| `Systems.tsx` | SYSTEMS accordion tiles with inline SVG diagrams | ✓ |
| `Experience.tsx` | ROLES timeline | server |
| `Writing.tsx` | POSTS cards with per-post hover border color | ✓ |
| `Contact.tsx` | LINKS rows + availability status block | ✓ |
| `Footer.tsx` | Simple footer links | server |
| `FadeIn.tsx` | Scroll-triggered fade-in with IntersectionObserver | ✓ |
| `Divider.tsx` | Section divider with center diamond | server |

### Data types

All data interfaces live in `src/lib/types.ts`: `Project`, `System`, `Role`, `Post`, `ContactLink`.

The `System` interface includes `Diagram: ComponentType` — the six inline SVG diagrams are defined locally in `Systems.tsx` alongside the `SYSTEMS` array.

### Things to preserve exactly

- **LagCompCanvas physics** in `Hero.tsx`: history buffer (1500 ms TTL), client lerp time constant **28 ms**, server lerp time constant **38 ms**, reconciliation gap line shown when `latencyRef.current > 15 && gap > 5`. Only the React wiring may change; these numbers must not.
- **Color tokens**: all `oklch(...)` CSS custom properties in `globals.css` `:root` — never hardcode hex/rgb equivalents.
- **Data arrays**: `PROJECTS`, `SYSTEMS`, `ROLES`, `POSTS`, `LINKS` — copy and order are frozen.
- **Scroll-spy**: Nav computes active section by comparing `window.scrollY` against each section's `offsetTop - 140`.
- **Reduced-motion**: `globals.css` has a `prefers-reduced-motion` block; `FadeIn` also checks the media query before observing.

### Styling conventions

- **Tailwind** for responsive breakpoints and utility classes (`hidden md:block`, `flex-wrap`, etc.).
- **Inline `style={{}}`** for dynamic values (computed indicator position, animation delay props, CSS-variable references that need to be dynamic).
- **CSS custom properties as values** (e.g. `color: 'var(--color-tick)'`) are fine as strings in style props — no TypeScript casting needed.
- Global utility classes defined in `globals.css`: `.hud-label`, `.project-card`, `.system-tile`.

### postcss / Tailwind

Two PostCSS configs exist (`postcss.config.js` CJS and `postcss.config.mjs` ESM). The project uses **Tailwind v3**; `postcss.config.js` has the correct `tailwindcss` + `autoprefixer` plugins. Next.js resolves `.js` first.
