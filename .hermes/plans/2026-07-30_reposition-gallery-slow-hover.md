# Fix Plan: Reposition Community Gallery + Slow Hover Animation

> **For Hermes:** Three targeted fixes — remove community section from home page, move CommunityGallery above the music hero banner, and slow the hover flipbook timing.

**Goal:** 
1. Clean up index.astro (community section now lives on music page)
2. Community gallery appears BEFORE "Our Music" hero on music page
3. Hover image cycling is slower and more elegant

**Architecture:** Pure layout reordering + timing tweaks. No new components or data changes.

---

## Task 1: Remove PhotoGallery from home page

**Objective:** The community gallery now lives on the music page — remove its import and section wrapper from `index.astro`.

**File:** `src/pages/index.astro`

### Step 1: Remove import (line 7)
```diff
 import TestingInfo from "../components/TestingInfo.astro";
 import LocationMap from "../components/LocationMap.astro";
-import PhotoGallery from "../components/PhotoGallery.astro";
 import Footer from "../components/Footer.astro";
```

### Step 2: Remove the gallery section wrapper (lines 25-56)
```diff
     <LocationMap />
-
-    <section
-      id="gallery"
-      class="relative z-10 glass-section py-24 sm:py-32 overflow-hidden"
-    >
-      <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
-        <div class="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-health-green-pale/40 blur-[100px] mix-blend-multiply opacity-50 -translate-y-1/2 translate-x-1/4"></div>
-      </div>
-      <div class="mx-auto max-w-content px-6 relative z-10">
-        <div class="text-center max-w-3xl mx-auto mb-20 reveal">
-          <div class="inline-flex items-center gap-2 rounded-full bg-health-green/10 border border-health-green/20 px-5 py-2 text-sm font-bold tracking-wide uppercase text-health-green shadow-sm mb-8">
-            Community
-          </div>
-          <h2 class="font-display text-5xl sm:text-6xl font-bold tracking-tight text-health-text">
-            Our Community in Action
-          </h2>
-          <p class="mt-8 text-xl leading-relaxed text-health-text/70 font-medium">
-            Moments from our outreach programs, health education sessions, and
-            community events across Cebu.
-          </p>
-        </div>
-        <PhotoGallery />
-      </div>
-    </section>
   </main>
```

**After — index.astro should look like:**
```astro
  <main id="main" class="relative transition-colors duration-300">
    <Hero />
    <TestingInfo />
    <LocationMap />
  </main>
```

**Verification:** Build succeeds. Home page shows Hero → TestingInfo → LocationMap → Footer only.

---

## Task 2: Move CommunityGallery above "Our Music" hero on music page

**Objective:** Reorder so CommunityGallery appears BEFORE the "Our Music" hero banner.

**File:** `src/pages/music.astro`

### Current order (lines 31-53):
```
<Our Music hero banner (glass-section div)>
<CommunityGallery />
<Music Video Section>
```

### Target order:
```
<CommunityGallery />
<Our Music hero banner (glass-section div)>
<Music Video Section>
```

### Changes:

**Step 1:** Cut lines 53 (`<CommunityGallery />`) and paste it before line 31 (`<div class="relative pt-40 pb-24 glass-section...">`)

```diff
   <main id="main" class="relative transition-colors duration-300 overflow-x-hidden pb-32">
+    <!-- Community Gallery — appears first, above the music hero -->
+    <CommunityGallery />
+
     <div class="relative pt-40 pb-24 glass-section overflow-hidden">
       ...
     </div>
-
-    <CommunityGallery />
 
     <!-- Music Video Section -->
```

**Verification:** Music page order is now: Community Gallery → "Our Music" hero → Music Video → Audio Tracks.

---

## Task 3: Slow the hover flipbook timing

**Objective:** Make the image cycling transition slower and more elegant — both the interval between frames and the crossfade duration.

**File:** `src/components/CommunityGallery.astro`

### Change A: Slow the cycling interval (line 158)

```diff
-          }, 250);
+          }, 600);
```

**250ms → 600ms** — roughly 2.4× slower. Each card takes ~6 seconds to cycle through all 10 images.

### Change B: Slow the crossfade transition (line 63)

```diff
-                    class={`gallery-card-img absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
+                    class={`gallery-card-img absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
```

**500ms → 1000ms** — smoother, more gradual fade between frames.

### Change C (optional but recommended): Add easing for smoother feel

```diff
-                    class={`gallery-card-img absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
+                    class={`gallery-card-img absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
```

Adding `ease-in-out` makes the crossfade feel more natural — starts slow, speeds up mid-fade, ends slow.

---

## Task 4: Build and verify

```bash
npm run build
```

Expected: 5 pages build successfully, zero errors.

**Visual checklist:**
- [ ] **Home page:** No community section — Hero → TestingInfo → LocationMap → Footer
- [ ] **Music page:** Community gallery is ABOVE "Our Music" hero banner
- [ ] **Hover a card:** Images cycle every 600ms (not 250ms)
- [ ] **Crossfade:** Smooth 1000ms fade between images
- [ ] **Counter:** Updates slowly (1→2→3... not racing)
- [ ] **Mouse leave:** Resets to first image cleanly

---

## Files Summary

| File | Change |
|---|---|
| `src/pages/index.astro` | Remove `PhotoGallery` import + gallery section (line 7, lines 25-56) |
| `src/pages/music.astro` | Move `<CommunityGallery />` above hero banner (line 53 → before line 31) |
| `src/components/CommunityGallery.astro` | 250ms → 600ms (line 158), 500ms → 1000ms + ease-in-out (line 63) |

**Total:** 3 files, ~35 lines removed, ~2 lines added, ~3 lines edited. All changes are additive/deletive — no logic rewrites.

---

## Timing Comparison

| Property | Before | After | Effect |
|---|---|---|---|
| Cycling interval | 250ms | 600ms | Slower, more deliberate flipbook |
| Crossfade duration | 500ms | 1000ms | Smoother fade between images |
| Crossfade easing | (default ease) | ease-in-out | More natural, less mechanical |
| Full cycle (10 images) | 2.5s | 6s | More time to appreciate each photo |
