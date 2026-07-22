# PhilCHAN Cebu — Landing Page

Astro + Tailwind CSS landing page for the Philippine Catholic HIV/AIDS Network Inc. (Cebu chapter).

## Design direction (baked into `tailwind.config.mjs`)

A faith-based health organization needs to feel **trustworthy, dignified, and hopeful** — not clinical, not somber. The token system below avoids the generic "cream + terracotta" or "dark mode + neon" AI defaults:

| Token | Hex | Use |
|---|---|---|
| `deep-teal` | `#0F4C5C` | Primary brand color — stability, care, calm (also nods to the health/testing context without being clinical white) |
| `sanctuary-gold` | `#C9A227` | Faith accent — used sparingly for dividers, icons, small highlights (candle/halo association) |
| `ribbon` | `#A13D3D` | Muted red-ribbon accent, reserved *only* for HIV-awareness moments (testing CTA, ribbon icon) — never used decoratively |
| `linen` | `#F7F5F0` | Background — warm off-white, not stark clinical white |
| `charcoal` | `#262625` | Body text |
| `mist` | `#E4E7E6` | Section dividers / card borders |

**Typography:** `Fraunces` (serif, display) for headings — warm and humanist, avoids the cold/corporate feel of a grotesk-only system — paired with `Public Sans` for body copy and UI (excellent readability, free, variable weight).

**Signature element:** a thin ribbon-motif divider (`<RibbonDivider />` pattern baked into `global.css` as a `.divider-ribbon` utility) used once per section transition — not repeated as decoration everywhere.

## 1. Directory tree

```
philchan-cebu/
├── astro.config.mjs
├── tailwind.config.mjs
├── package.json
├── src/
│   ├── assets/
│   │   └── images/
│   │       ├── logos/          # PhilCHAN logo, favicon source, diocese/partner logos
│   │       ├── profiles/       # Leadership headshots (optimized, square crop)
│   │       └── partners/       # Partner org logos for Hero strip
│   ├── components/
│   │   ├── Navbar.astro
│   │   ├── Hero.astro
│   │   ├── About.astro
│   │   ├── MissionVision.astro
│   │   ├── LeadershipCard.astro
│   │   ├── OrgChart.astro
│   │   ├── TestingInfo.astro
│   │   ├── LocationMap.astro
│   │   └── Footer.astro
│   ├── data/
│   │   └── landingData.ts      # single source of truth: nav, leadership, testing info
│   ├── layouts/
│   │   └── Layout.astro        # <head>, SEO/OG tags, smooth scroll, skip-link
│   ├── pages/
│   │   └── index.astro         # composes all sections
│   └── styles/
│       └── global.css          # Tailwind layers + font faces + .divider-ribbon
└── public/
    └── favicon.svg
```

**Where assets go:** anything imported and processed by Astro's image pipeline (logo used in the Navbar, leadership headshots, partner logos) belongs in `src/assets/images/...` so Astro can optimize it via `astro:assets`. Only truly static, unprocessed files (favicon, `robots.txt`, `og-default.jpg` used only as a raw meta tag URL) go in `public/`.

## 2. Terminal commands

```bash
# 1. Scaffold a new Astro project (choose "Empty" template, TypeScript: Strict)
npm create astro@latest philchan-cebu

cd philchan-cebu

# 2. Add the official Tailwind integration (Astro 4/5 way — no manual postcss config needed)
npx astro add tailwind

# 3. Install the accessible icon set used in the stubs below
npm install lucide-astro

# 4. (Optional but recommended) sharp is used by Astro's image pipeline for local dev
npm install sharp

# 5. Start the dev server
npm run dev

# 6. Production build + preview
npm run build
npm run preview
```

> If you're copying the files from this scaffold directly, just run `npm install` once you've dropped `package.json`'s dependencies in, instead of `npm create astro@latest`.

## 3. Performance / Core Web Vitals checklist baked into the stubs

- All images go through `astro:assets` `<Image />` (automatic `width`/`height` → no CLS, automatic modern formats).
- Google Maps is lazy-loaded via `loading="lazy"` on the iframe and only requested on scroll-into-view interaction (see `LocationMap.astro` notes) to avoid blocking LCP.
- Fonts are self-hosted with `font-display: swap` and preloaded in `Layout.astro`.
- Navbar is a static `.astro` component (zero JS) using a `<details>`/`<summary>` pattern for the mobile menu — no hydrated framework component needed for a simple disclosure.
- Tailwind is purged automatically by content globs in `tailwind.config.mjs`.
