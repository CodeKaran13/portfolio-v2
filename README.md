# Karan Nandkar — Portfolio v2

Personal portfolio for Karan Nandkar, Senior Gameplay Engineer. Built with Next.js 15 (App Router), TypeScript, and Tailwind CSS.

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build

```bash
npm run build    # Type-checks + produces .next/ output
npm run lint     # ESLint
```

## Deploy to Vercel

**From GitHub (recommended):**
1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new), import the repo.
3. Vercel auto-detects Next.js — no build settings needed. Click Deploy.

**Via CLI:**
```bash
npm i -g vercel
vercel         # first deploy (follow prompts)
vercel --prod  # subsequent production deploys
```

## Design spec

`_design/` contains the original React-via-Babel prototype (`Portfolio.html` + `app.jsx` + `components/`). It is the visual and behavioral source of truth. Do not delete it.
