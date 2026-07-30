# Update Plan: Community Gallery on Music Page with Hover Flipbook

> **For Hermes:** Add a community photo gallery to the music page with hover-based image cycling (flipbook effect). Each location card cycles through 10 images on hover.

**Goal:** Move the community section to the Music page, positioned above the music video. Each location card shows 10 images that animate/cycle on hover like a flipbook, using temp images from `C:\Users\JEHRON\Pictures\Saved Pictures`.

**Architecture:** 
- Create new `CommunityGallery.astro` component with hover-triggered JavaScript image cycling
- Update `galleryData.ts` with 6 places × 10 images each (60 total)
- Copy 60 temp images to `public/images/gallery/{place}/`
- Insert gallery into `music.astro` between hero banner and music video section

**Tech Stack:** Astro components, vanilla JS (no framework), CSS transitions

---

## Source Image Inventory

**Source:** `C:\Users\JEHRON\Pictures\Saved Pictures` — 600 images (jpg, jpeg, png)

**Target:** Organize into `public/images/gallery/` with 6 subfolders:

| Place | Subfolder | Images |
|---|---|---|
| Dalaguete, Cebu | `public/images/gallery/dalaguete/` | 10 pics |
| Cebu City | `public/images/gallery/cebu-city/` | 10 pics |
| Mandaue City | `public/images/gallery/mandaue/` | 10 pics |
| Lapu-Lapu City | `public/images/gallery/lapu-lapu/` | 10 pics |
| Talisay City | `public/images/gallery/talisay/` | 10 pics |
| Minglanilla, Cebu | `public/images/gallery/minglanilla/` | 10 pics |

**Total:** 60 images, 6 subdirectories

---

## Task 1: Copy temp images into organized folders

**Objective:** Distribute 60 images from Saved Pictures into 6 place subfolders under `public/images/gallery/`.

**Files:**
- Create: `public/images/gallery/dalaguete/` (10 files)
- Create: `public/images/gallery/cebu-city/` (10 files)
- Create: `public/images/gallery/mandaue/` (10 files)
- Create: `public/images/gallery/lapu-lapu/` (10 files)
- Create: `public/images/gallery/talisay/` (10 files)
- Create: `public/images/gallery/minglanilla/` (10 files)

**Step 1:** Copy images using a shell script:

```bash
SRC="C:/Users/JEHRON/Pictures/Saved Pictures"
DEST="public/images/gallery"

# Create subfolders
mkdir -p "$DEST"/{dalaguete,cebu-city,mandaue,lapu-lapu,talisay,minglanilla}

# Get all image files sorted
ALL_IMAGES=$(ls "$SRC" | head -60)

# Distribute: 10 per folder, round-robin
i=0
for img in $ALL_IMAGES; do
  case $(( i / 10 )) in
    0) cp "$SRC/$img" "$DEST/dalaguete/" ;;
    1) cp "$SRC/$img" "$DEST/cebu-city/" ;;
    2) cp "$SRC/$img" "$DEST/mandaue/" ;;
    3) cp "$SRC/$img" "$DEST/lapu-lapu/" ;;
    4) cp "$SRC/$img" "$DEST/talisay/" ;;
    5) cp "$SRC/$img" "$DEST/minglanilla/" ;;
  esac
  i=$((i + 1))
done
```

**Verification:**
```bash
for d in dalaguete cebu-city mandaue lapu-lapu talisay minglanilla; do
  echo "$d: $(ls public/images/gallery/$d | wc -l) images"
done
```

Expected: Each folder reports "10 images".

---

## Task 2: Update galleryData.ts with 10-image arrays per place

**Objective:** Change the data structure so each gallery item contains an array of 10 image paths (for hover cycling) instead of a single image path.

**File:** `src/data/galleryData.ts`

### Before:
```typescript
export interface GalleryImage {
  src: string;
  alt: string;
  location: string;
  description: string;
  date?: string;
}

export const galleryImages: GalleryImage[] = [
  {
    src: "/images/gallery/dalaguete-1.jpg",
    alt: "...",
    location: "Dalaguete, Cebu",
    description: "...",
    date: "2025",
  },
  // ... 5 more single-image entries
];
```

### After:
```typescript
export interface GalleryPlace {
  location: string;
  description: string;
  date?: string;
  images: string[];  // 10 image paths for hover cycling
}

export const galleryPlaces: GalleryPlace[] = [
  {
    location: "Dalaguete, Cebu",
    description: "Community health outreach and HIV awareness session at the barangay health center.",
    date: "2025",
    images: [
      "/images/gallery/dalaguete/001.jpg",
      "/images/gallery/dalaguete/002.jpg",
      "/images/gallery/dalaguete/003.jpg",
      "/images/gallery/dalaguete/004.jpg",
      "/images/gallery/dalaguete/005.jpg",
      "/images/gallery/dalaguete/006.jpg",
      "/images/gallery/dalaguete/007.jpg",
      "/images/gallery/dalaguete/008.jpg",
      "/images/gallery/dalaguete/009.jpg",
      "/images/gallery/dalaguete/010.jpg",
    ],
  },
  // ... 5 more places, each with 10 image paths
];
```

**Note:** The actual filenames in each subfolder will be the original filenames from Saved Pictures. Update the `images` arrays to match the real filenames after copying. Use a shell command to generate:

```bash
for d in dalaguete cebu-city mandaue lapu-lapu talisay minglanilla; do
  echo "// $d"
  ls "public/images/gallery/$d" | sed 's/.*/    "\/images\/gallery\/'$d'\/&",/'
  echo ""
done
```

---

## Task 3: Create CommunityGallery.astro component

**Objective:** Build a new component that renders place cards with hover-triggered image cycling.

**File:** `src/components/CommunityGallery.astro` (new file)

**Key features:**
- Each card shows one image at a time
- On `mouseenter`: cycles through all 10 images at 250ms intervals
- On `mouseleave`: resets to image[0] and stops cycling
- Smooth crossfade transition between images
- Location badge overlay on each card
- Description and date below

### Component code:

```astro
---
import { galleryPlaces } from "../data/galleryData";
---

<section id="community-gallery" class="glass-section py-24 sm:py-32 overflow-hidden" aria-label="Community photo gallery">
  <div class="mx-auto max-w-content px-6 relative z-10">
    <!-- Section Header -->
    <div class="text-center max-w-3xl mx-auto mb-20 reveal">
      <div class="inline-flex items-center gap-2 rounded-full bg-health-red/10 border border-health-red/20 px-5 py-2 text-sm font-bold tracking-wide uppercase text-health-red shadow-sm mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
        Our Community in Action
      </div>
      <h2 class="font-display text-5xl sm:text-6xl font-bold tracking-tight text-health-text">
        Reaching Every Community
      </h2>
      <p class="mt-8 text-xl leading-relaxed text-health-text/70 font-medium max-w-2xl mx-auto">
        See our outreach programs across Cebu — bringing free testing, education, and pastoral care to every corner of the province.
      </p>
    </div>

    <!-- Gallery Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {galleryPlaces.map((place, index) => (
        <div class="gallery-card reveal group" style={`animation-delay: ${index * 120}ms`}>
          <!-- Image container with hover flipbook -->
          <div 
            class="gallery-img-wrap relative overflow-hidden rounded-2xl aspect-[4/3] mb-4 cursor-pointer"
            data-place-index={index}
          >
            <!-- All 10 images stacked, only active one visible -->
            {place.images.map((src, imgIdx) => (
              <img
                src={src}
                alt={`${place.location} photo ${imgIdx + 1}`}
                loading={imgIdx === 0 ? "eager" : "lazy"}
                class={`gallery-img absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
                  imgIdx === 0 ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
                data-img-idx={imgIdx}
              />
            ))}
            <!-- Location badge -->
            <span class="absolute top-3 left-3 z-20 px-3 py-1 rounded-full bg-health-red text-white text-xs font-bold tracking-wide shadow-md">
              {place.location}
            </span>
            <!-- Image counter -->
            <span class="gallery-counter absolute bottom-3 right-3 z-20 px-2 py-1 rounded-full bg-black/50 text-white text-xs font-medium backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              1 / 10
            </span>
          </div>
          <!-- Card info -->
          <p class="text-health-text font-medium leading-relaxed">{place.description}</p>
          {place.date && (
            <p class="text-sm text-health-text/50 mt-1">{place.date}</p>
          )}
        </div>
      ))}
    </div>
  </div>
</section>

<style>
  .gallery-card {
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s ease;
  }
  .gallery-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 60px rgba(217, 91, 91, 0.12), 0 8px 20px rgba(217, 91, 91, 0.06);
  }
</style>

<script>
  function initGallery() {
    const cards = document.querySelectorAll('.gallery-img-wrap');
    
    cards.forEach((wrap) => {
      const imgs = wrap.querySelectorAll('.gallery-img');
      const counter = wrap.querySelector('.gallery-counter');
      if (imgs.length < 2) return;
      
      let interval: ReturnType<typeof setInterval> | null = null;
      let currentIdx = 0;
      
      function showImage(idx: number) {
        // Fade out current
        imgs[currentIdx].classList.remove('opacity-100', 'z-10');
        imgs[currentIdx].classList.add('opacity-0', 'z-0');
        
        // Fade in next
        currentIdx = idx;
        imgs[currentIdx].classList.remove('opacity-0', 'z-0');
        imgs[currentIdx].classList.add('opacity-100', 'z-10');
        
        // Update counter
        if (counter) counter.textContent = `${currentIdx + 1} / ${imgs.length}`;
      }
      
      wrap.addEventListener('mouseenter', () => {
        interval = setInterval(() => {
          const next = (currentIdx + 1) % imgs.length;
          showImage(next);
        }, 250); // 250ms per frame = smooth flipbook
      });
      
      wrap.addEventListener('mouseleave', () => {
        if (interval) clearInterval(interval);
        interval = null;
        if (currentIdx !== 0) showImage(0);
      });
    });
  }
  
  document.addEventListener('DOMContentLoaded', initGallery);
  document.addEventListener('astro:after-swap', initGallery);
</script>
```

---

## Task 4: Update music.astro — insert CommunityGallery above music section

**Objective:** Import and render `CommunityGallery` on the music page, between the hero banner and the video section.

**File:** `src/pages/music.astro`

### Changes:

**Step 1:** Add import (after existing imports, around line 17):
```diff
+import CommunityGallery from "../components/CommunityGallery.astro";
```

**Step 2:** Insert the gallery section between the hero banner (line 50 `</div>`) and the video section (line 53 `<!-- Music Video Section -->`):
```diff
     </div>
 
+    <!-- Community Gallery — hover to see photos from each location -->
+    <CommunityGallery />
+
     <!-- Music Video Section -->
     <section class="section-container pt-12 pb-8">
```

**Verification:** After building, the music page should show:
1. Hero banner ("Our Music")
2. **Community Gallery (NEW)** — 6 place cards with hover flipbook
3. Music video section  
4. Audio tracks section

---

## Task 5: Update page title/description for music page

**Objective:** Update the music page meta to reflect the new community gallery content.

**File:** `src/pages/music.astro` — line 21-22

### Before:
```astro
<Layout
  title="Our Music | PhilCHAN Cebu"
  description="Listen to original PhilCHAN Cebu music and watch our official music video."
>
```

### After:
```astro
<Layout
  title="Our Music & Community | PhilCHAN Cebu"
  description="Listen to original PhilCHAN Cebu music, watch our official music video, and explore photos from our community outreach across Cebu."
>
```

---

## Task 6: Build and verify

```bash
npm run build
```

Expected: 5 pages build successfully, zero errors.

**Visual checklist:**
- [ ] Music page loads with hero banner
- [ ] Community gallery appears below hero, above video section
- [ ] 6 place cards visible (2 columns on tablet, 3 on desktop)
- [ ] Hovering a card cycles through 10 images at 250ms per frame
- [ ] Card shows "1/10" counter while hovering
- [ ] Mouse leave resets to first image and stops cycling
- [ ] Card lifts up with shadow on hover
- [ ] Crossfade transition between images is smooth (500ms)
- [ ] Music video and audio tracks remain functional below

---

## Files Summary

| File | Change |
|---|---|
| `public/images/gallery/{6 subfolders}/` | NEW — 60 temp images |
| `src/data/galleryData.ts` | Rewrite — 6 places × 10 image paths each |
| `src/components/CommunityGallery.astro` | NEW — hover flipbook component |
| `src/pages/music.astro` | Add import + render CommunityGallery above video |

**Total:** 1 new file, 2 modified, 1 data rewritten, 60 image files copied

---

## How the Hover Flipbook Works

```
┌─────────────────────────────────┐
│  ┌───────────────────────────┐  │
│  │     img[0] (visible)      │  │  mouseenter: start cycling
│  │  img[1] (hidden, opacity0)│  │  every 250ms: fade current→hidden
│  │  img[2] (hidden)          │  │              fade next→visible
│  │  ...                      │  │              update counter
│  │  img[9] (hidden)          │  │
│  │  [Dalaguete, Cebu]  1/10  │  │  mouseleave: stop, reset to img[0]
│  └───────────────────────────┘  │
│  Description text               │
└─────────────────────────────────┘
```

- All 10 images are preloaded in DOM (stacked with `absolute inset-0`)
- Only one visible at a time via `opacity-100/opacity-0` + `z-10/z-0`
- `setInterval(250ms)` drives the cycling — creates smooth flipbook feel
- CSS `transition: opacity 500ms ease-in-out` for smooth crossfade
- Counter shows current frame (e.g., "3/10")

---

## Risk

| Risk | Mitigation |
|---|---|
| 60 images load on page — slow | Use `loading="lazy"` on all except img[0] of each card |
| 250ms cycling feels too fast/slow | Adjustable — change the `250` value in `setInterval` |
| Images need alt text | Each card uses `{place.location} photo {n}` as alt |
| Saved Pictures filenames have special chars | Astro/Vite handles URL encoding; `encodeURI` if needed |
