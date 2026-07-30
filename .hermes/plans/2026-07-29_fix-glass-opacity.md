# Fix Plan: Make Dynamic Background Visible Through Glass Sections

> **For Hermes:** Execute task-by-task. The goal is to make the StasisBackground (fixed animated gradient mesh + drifting orbs) visible through every section, creating a true glassmorphism effect.

**Goal:** Reduce section opacity so the dynamic background is clearly visible through all page sections, while maintaining text readability.

**Root Cause:** Three layers of opacity stacking:
1. `.glass-section` uses `bg-health-white/60` — too opaque
2. Each component has inline absolute-positioned gradient blobs (e.g., `bg-health-green-pale/40 blur-[100px]`) that add MORE coverage on top
3. The `backdrop-blur-md` blurs what little shows through, making it look solid

**Fix Strategy:**
- Drop section opacity dramatically (`/60` → `/10` or `/5`)
- Remove/simplify the redundant inline gradient overlays inside each component (they were there to add color when sections were solid — now the fixed background handles that)
- Let `backdrop-blur` do the glass work instead of white opacity

---

## Task 1: Fix global glass-section class opacity

**Objective:** Make `.glass-section` translucent enough to see the background through.

**File:** `src/styles/global.css`

**Change:**
```css
/* Before — too opaque */
.glass-section {
    @apply bg-health-white/60 backdrop-blur-md border border-health-white/50 shadow-sm;
}

/* After — translucent glass */
.glass-section {
    @apply bg-health-white/10 backdrop-blur-md border border-white/20 shadow-sm;
}
```

**Verification:** Rebuild, preview homepage. Background should be visible through Hero section.

---

## Task 2: Strip redundant inline gradient overlays from section components

**Objective:** Remove the absolute-positioned gradient blobs inside each section that were adding opacity on top of the glass. The StasisBackground handles color now.

### 2.1: Hero.astro
**File:** `src/components/Hero.astro`

Remove lines 32-41 — the two absolute blobs (`bg-health-green-pale/50 blur-[100px]` and `bg-health-red/5 blur-[100px]`):
```diff
-  {/* Abstract Soft Gradient Background */}
-  <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
-    <div class="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] rounded-full bg-health-green-pale/50 blur-[100px] opacity-70 mix-blend-multiply"></div>
-    <div class="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-health-red/5 blur-[100px] opacity-70 mix-blend-multiply"></div>
-  </div>
```

### 2.2: TestingInfo.astro
**File:** `src/components/TestingInfo.astro`

Remove lines 34-37 — the two absolute blobs:
```diff
-  {/* Abstract Soft Gradient Background */}
-  <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
-    <div class="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-health-green-pale/40 blur-[100px] mix-blend-multiply opacity-50 -translate-y-1/2 translate-x-1/4"></div>
-    <div class="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-health-red/5 blur-[100px] mix-blend-multiply opacity-50 translate-y-1/4 -translate-x-1/4"></div>
-  </div>
```

### 2.3: EnhancedServicesGrid.astro
**File:** `src/components/EnhancedServicesGrid.astro`

Remove lines 75-84 — the two absolute blobs:
```diff
-  <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
-    <div class="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-health-green-pale/40 blur-[100px] mix-blend-multiply opacity-50 -translate-y-1/2 translate-x-1/4"></div>
-    <div class="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-health-red/5 blur-[100px] mix-blend-multiply opacity-50 translate-y-1/4 -translate-x-1/4"></div>
-  </div>
```

### 2.4: ServiceTimeline.astro
**File:** `src/components/ServiceTimeline.astro`

Remove lines 27-30 — the two absolute blobs:
```diff
-  <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
-    <div class="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-health-green-pale/40 blur-[100px] opacity-60"></div>
-    <div class="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] rounded-full bg-health-red/5 blur-[100px] opacity-60"></div>
-  </div>
```

### 2.5: Page-level hero banners
**Files:** `src/pages/about.astro`, `src/pages/services.astro`, `src/pages/prevention.astro`, `src/pages/music.astro`

Each has inline absolute blur backgrounds inside the hero banner divs. Remove them:
- `about.astro` line 24: `<div class="absolute -top-1/2 left-1/4 w-[800px]..."></div>`
- `services.astro` lines 27-28: two blobs
- `prevention.astro` lines 37-41: one blob
- `music.astro` lines 33-38: two blobs

---

## Task 3: Reduce Navbar opacity for better blending

**Objective:** Make the sticky navbar slightly more transparent so the background shows through.

**File:** `src/components/Navbar.astro`

**Change line 19:**
```diff
-  class="mx-auto flex max-w-content items-center justify-between px-3 py-2 sm:px-4 rounded-full bg-health-white/95 backdrop-blur-xl border border-health-border/40 shadow-card"
+  class="mx-auto flex max-w-content items-center justify-between px-3 py-2 sm:px-4 rounded-full bg-health-white/70 backdrop-blur-xl border border-white/30 shadow-card"
```

---

## Task 4: Build and verify

```bash
npm run build
```

Expected: 5 pages build successfully, zero errors.

Then start dev server and visually check:
- [ ] Hero section: background visible through
- [ ] TestingInfo cards: background visible through
- [ ] LocationMap: background visible through
- [ ] About/MissionVision/OrgChart/Services/Prevention/Music: background visible through all
- [ ] Navbar: subtle transparency, still readable
- [ ] Footer: solid dark green (unchanged, always opaque)

---

## Task 5: Optional — StasisBackground intensity boost

If the background still feels too subtle after Task 1-3, boost the StasisBackground colors.

**File:** `src/styles/stasis-bg.css`

Increase opacity values in `.persistent-bg-mesh`:
```css
/* Current (subtle) */
radial-gradient(ellipse 55vw 45vh at 12% 85%, rgba(44, 94, 72, 0.38) 0%, transparent 55%)

/* Boosted (more visible) */
radial-gradient(ellipse 55vw 45vh at 12% 85%, rgba(44, 94, 72, 0.55) 0%, transparent 50%)
```

Similarly increase blob opacities in `.persistent-bg-blob-1`, `.persistent-bg-blob-2`, `.persistent-bg-blob-3`.

---

## Files affected (fix phase)

| File | Change |
|---|---|
| `src/styles/global.css` | `.glass-section` opacity: 60% → 10% |
| `src/components/Hero.astro` | Remove internal gradient blobs |
| `src/components/TestingInfo.astro` | Remove internal gradient blobs |
| `src/components/EnhancedServicesGrid.astro` | Remove internal gradient blobs |
| `src/components/ServiceTimeline.astro` | Remove internal gradient blobs |
| `src/pages/about.astro` | Remove hero banner blob |
| `src/pages/services.astro` | Remove hero banner blobs |
| `src/pages/prevention.astro` | Remove hero banner blob |
| `src/pages/music.astro` | Remove hero banner blobs |
| `src/components/Navbar.astro` | Reduce opacity: 95% → 70% |
| `src/styles/stasis-bg.css` | (Optional) Boost bg intensity |

---

## Quick Reference: Opacity Tiers

| Class | Before | After | Effect |
|---|---|---|---|
| `.glass-section` | `bg-health-white/60` | `bg-health-white/10` | Sections → translucent |
| `.glass-card` | `bg-health-white/80` | `bg-health-white/40` | Cards → semi-transparent |
| Navbar | `bg-health-white/95` | `bg-health-white/70` | Nav → breathable |
| `glass-section-strong` | `bg-health-white/75` | `bg-health-white/20` | Strong variant → lighter |

---

## Risk: Text readability

If `bg-health-white/10` makes text hard to read:
- Add `text-shadow: 0 1px 3px rgba(255,255,255,0.6)` to `.glass-section` children
- Or bump opacity slightly to `/15` or `/20`
- The `backdrop-blur-md` itself creates a frosted surface even at low opacity — text should remain readable
