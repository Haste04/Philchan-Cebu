# PhilCHAN Cebu — Website Update Plan

> **For Hermes:** Use this plan as a task-by-task guide for the next phases of the PhilCHAN Cebu website revamp.

**Goal:** Modernize the PhilCHAN Cebu website with a dynamic animated background, glassmorphism sections, a photo gallery, and polished animations — without breaking existing functionality.

**Architecture:** Astro 7.1 static site + Tailwind CSS 3.4 + Lucide Icons. Persistent fixed background layer (StasisBackground) sits behind translucent glass sections. Section-level orbs and particles add dynamic depth.

**Tech Stack:** Astro 7.1, Tailwind 3.4, Sharp 0.35, plain JS (no framework)

---

## ✅ Phase 1: Glass + Dynamic Background — COMPLETE

**Status:** Done. All 17 files modified, build passes clean, 5 pages compile.

### What was done
- Added `StasisBackground` component (fixed persistent gradient mesh + drifting orbs) to `Layout.astro`
- Made body transparent so dynamic bg shows through
- Converted all section wrappers from solid white/bg to glass (`glass-section` class: `bg-health-white/60 backdrop-blur-md`)
- Created utility classes in `global.css`: `glass-section`, `glass-section-strong`, `glass-page`
- Removed conflicting body gradient from `dynamic-bg.css`
- All page `<main>` containers changed from `bg-health-white` → transparent

### Files modified (17)
```
src/layouts/Layout.astro          — import StasisBackground + 3 CSS files
src/styles/global.css             — transparent body + glass utility classes
src/styles/dynamic-bg.css         — removed body bg gradient conflict
src/pages/index.astro             — main bg → transparent
src/pages/about.astro             — main + hero banner + leadership → glass
src/pages/services.astro          — main + hero banner + CTA → glass
src/pages/prevention.astro        — main + hero banner → glass
src/pages/music.astro             — main + hero banner → glass
src/components/Hero.astro         — section wrapper → glass-section
src/components/TestingInfo.astro  — section wrapper → glass-section
src/components/LocationMap.astro  — section wrapper → glass-section
src/components/About.astro        — section wrapper → glass-section
src/components/MissionVision.astro— gradient → glass-section
src/components/EnhancedServicesGrid.astro — section → glass-section
src/components/ServiceTimeline.astro      — section → glass-section
src/components/OrgChart.astro             — section → glass-section
```

---

## 🔜 Phase 2: Photo Gallery (pending)

### 2.1: Populate gallery images
- **File:** `src/data/galleryData.ts` — add real event photos with captions, dates, locations
- **File:** `src/assets/images/gallery/` — add actual event photos
- Gallery currently shows empty state: *"Photos coming soon"*

### 2.2: Integrate PhotoGallery on homepage
- **File:** `src/pages/index.astro` — import and render `<PhotoGallery />` between `LocationMap` and `Footer`
- Component already written in `src/components/PhotoGallery.astro`
- Add section spacing and glass wrapper

### 2.3: Add gallery section header
- Add a titled section above the gallery: "Our Community in Action" with descriptive text
- Match existing section header style (badge + h2 + description)

---

## 🔜 Phase 3: Animation Polish (pending)

### 3.1: Background intensity tuning
- **File:** `src/styles/stasis-bg.css` — adjust blob opacity/sizes
- The current `persistent-bg-mesh` has a deep green→cream gradient; may need brightness toning
- Consider reducing blob blur radii for sharper "pop" per user's request

### 3.2: Section reveal staggering
- Existing `.reveal`, `.reveal-left`, `.reveal-right` classes already have transitions
- Consider adding staggered children within sections (`.delay-100` through `.delay-500` already exist)
- No code changes needed unless new stagger patterns desired

### 3.3: Hero slideshow timing
- **File:** `src/components/Hero.astro:154` — current interval: 10s
- Could reduce to 6-7s for livelier feel

### 3.4: Glass backdrop-blur performance
- `backdrop-blur-md` on all sections could cause performance issues on low-end mobile
- Consider reducing to `backdrop-blur-sm` on mobile via responsive class
- **File:** `src/styles/global.css` — add `@media (max-width: 768px)` variant for `.glass-section`

---

## 🔜 Phase 4: Content & Structure (pending)

### 4.1: Navbar active state sync with dynamic bg
- Navbar already uses `bg-health-white/95 backdrop-blur-xl` — should work well with new bg
- May want to reduce opacity on scroll for more transparency: `bg-health-white/80`

### 4.2: Footer contrast check
- Footer has `bg-health-green` (solid dark) — fine against any background
- No changes needed

### 4.3: Music page player bar
- Player bar is fixed `bg-health-green` — should work fine over glass sections
- No changes needed

---

## 🔜 Phase 5: Deployment Prep

### 5.1: Clean untracked files
```
git add src/components/DynamicBackground.astro
git add src/components/PhotoGallery.astro
git add src/components/StasisBackground.astro
git add src/data/galleryData.ts
git add src/styles/backgrounds.css
git add src/styles/dynamic-bg.css
git add src/styles/stasis-bg.css
git add src/assets/images/gallery/
```

### 5.2: Add dist/ to .gitignore
- Currently `dist/` files show as untracked — should be gitignored

### 5.3: Build verification
```bash
npm run build    # Should exit 0, produce dist/
npm run preview  # Preview the static build
```

---

## Risks & Notes

| Risk | Mitigation |
|---|---|
| `backdrop-blur` performance on mobile | Reduce to `backdrop-blur-sm` on ≤768px |
| Gallery images too large | Sharp optimizes at build; original sizes in `assets/` |
| Dynamic bg overwhelming content | `bg-health-white/60` keeps content readable; adjust opacity if needed |
| Merge conflicts (branch `Updated`) | All changes are to `main`; `Updated` branch had prior conflict — resolved |

---

## Quick Reference: Key CSS Classes

| Class | Usage |
|---|---|
| `glass-section` | Full-width section wrappers (60% white + blur) |
| `glass-section-strong` | More opaque variant (75% white + stronger blur) |
| `glass-card` | Individual card elements (80% white + heavy blur) |
| `glass-page` | <main> wrapper (30% white + mild blur) |
| `persistent-bg` | Fixed full-screen animated background (z:-1) |
| `reveal` / `reveal-left` / `reveal-right` | Scroll-triggered entrance animations |
| `delay-100` … `delay-500` | Stagger timing helpers |
