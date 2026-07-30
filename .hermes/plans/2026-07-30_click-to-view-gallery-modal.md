# Update Plan: Click-to-View Community Gallery with Event Detail Modal

> **For Hermes:** Replace the hover flipbook with a click-to-open modal system. Each community card clicked opens a full detail view with selectable image gallery, event info, and Facebook link.

**Goal:** Clicking a community card opens a modal overlay showing all 10 images (selectable via thumbnails), event title, date, location, description, and a link to the Facebook event post.

**Architecture:** 
- Data layer gains `title` and `fbLink` fields
- CommunityGallery.astro rewritten: remove hover cycling JS, add click handlers + inline modal HTML
- Modal built as inline DOM within the component (no separate component file)
- Body scroll locked while modal open

**Tech Stack:** Astro components, vanilla JS, CSS transitions, Tailwind CSS

---

## Current vs Target Behavior

| Aspect | Current | Target |
|---|---|---|
| Card interaction | Hover cycles 10 images | Click opens detail modal |
| Image viewing | Auto-cycle only, no control | User picks which image to view via thumbnails |
| Event info shown | Location + description + date (on card) | Title + date + location + description (in modal) |
| FB link | None | Facebook post link button |
| Photo count display | "1/10" counter on card | Thumbnail strip shows all 10 at once |

---

## Task 1: Update galleryData.ts — add title and fbLink fields

**Objective:** Add `title` (event name) and `fbLink` (Facebook post URL) to each gallery place entry.

**File:** `src/data/galleryData.ts`

### Step 1: Update the interface (lines 1-6)

```diff
 export interface GalleryPlace {
+  title: string;
   location: string;
   description: string;
   date?: string;
+  fbLink?: string;
   images: string[];
 }
```

### Step 2: Add title and fbLink to each of the 6 places

Add `title` and `fbLink` to each entry. Example for Dalaguete:

```diff
   {
+    title: "HIV Awareness & Community Health Outreach",
     location: "Dalaguete, Cebu",
     description: "Community health outreach and HIV awareness session at the barangay health center in Dalaguete.",
     date: "2025",
+    fbLink: "https://www.facebook.com/PhilCHANCebu/posts/placeholder",
     images: [...],
   },
```

Repeat for all 6 places:

| Place | Title | fbLink |
|---|---|---|
| Dalaguete | "HIV Awareness & Community Health Outreach" | placeholder |
| Cebu City | "Free HIV Testing with Cebu City Health Office" | placeholder |
| Mandaue City | "Health Education Workshop for Community Leaders" | placeholder |
| Lapu-Lapu City | "Youth Peer Education Program" | placeholder |
| Talisay City | "Pastoral Support & Counselling Session" | placeholder |
| Minglanilla | "Medical Mission & Health Screening Day" | placeholder |

**Note:** `fbLink` values are placeholders — replace with real Facebook post URLs when available. Set to `undefined` or omit for events without FB posts.

**Verification:** TypeScript compilation passes. `galleryPlaces` array has all 6 entries with new fields.

---

## Task 2: Rewrite CommunityGallery.astro — click-to-modal system

**Objective:** Replace the hover flipbook logic with a click-driven modal overlay containing an image gallery viewer and event details.

**File:** `src/components/CommunityGallery.astro`

### What stays:
- Section header ("Community Gallery", "Our Community in Action")
- 3-column grid layout
- Card appearance (image preview, location badge)
- Card hover lift effect

### What changes:
- Remove all hover cycling JavaScript
- Remove the stacked 10-image system in each card (only show first image as preview)
- Remove the "X/10" counter
- Add `data-place-index` attribute to cards
- Add click handler → opens modal
- Add modal HTML at end of component (hidden by default)
- In modal: main image view + thumbnail strip + event details

### Complete rewritten component:

```astro
---
import { galleryPlaces } from "../data/galleryData";
---

<section class="community-gallery" aria-label="Community photo gallery">
  <div class="max-w-content mx-auto px-6 py-16">
    <!-- Section Header -->
    <div class="reveal mb-12 text-center">
      <div class="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full bg-health-white shadow-sm text-sm font-bold tracking-wide uppercase text-health-green">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="inline-block">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21,15 16,10 5,21"/>
        </svg>
        Community Gallery
      </div>
      <h2 class="text-4xl sm:text-5xl font-display font-bold text-health-text tracking-tight">Our Community in Action</h2>
      <p class="mt-4 text-xl text-health-text/70 max-w-2xl mx-auto font-medium leading-relaxed">Click any card to view event photos and details.</p>
    </div>

    <!-- Cards Grid -->
    <div class="community-gallery-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {galleryPlaces.map((place, placeIndex) => (
        <div
          class="gallery-card reveal group cursor-pointer"
          style={`--n: ${placeIndex}; animation-delay: ${placeIndex * 150}ms`}
          data-place-index={placeIndex}
        >
          <div class="gallery-card-image-wrap relative overflow-hidden rounded-2xl aspect-[4/3] mb-4 bg-[#1a1a1a]">
            <img
              src={place.images[0]}
              alt={`${place.title} — ${place.location}`}
              loading="lazy"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span class="absolute top-3 left-3 px-3 py-1 rounded-full bg-health-green text-white text-xs font-bold tracking-wide shadow-md z-10">
              {place.location}
            </span>
            <!-- Click indicator -->
            <span class="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-black/50 text-white text-xs font-medium backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              View photos
            </span>
          </div>
          <h3 class="text-lg font-display font-bold text-health-text mb-1">{place.title}</h3>
          <p class="text-sm text-health-text/60 font-medium">{place.date}</p>
        </div>
      ))}
    </div>
  </div>

  <!-- Modal Overlay -->
  <div id="gallery-modal" class="gallery-modal hidden" role="dialog" aria-modal="true" aria-label="Event photo gallery">
    <!-- Backdrop -->
    <div class="gallery-modal-backdrop"></div>
    
    <!-- Modal Content -->
    <div class="gallery-modal-content">
      <!-- Close button -->
      <button id="gallery-modal-close" class="gallery-modal-close" aria-label="Close gallery">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>

      <!-- Main image viewer -->
      <div class="gallery-modal-viewer">
        <img id="gallery-modal-main-img" src="" alt="" class="gallery-modal-main-img" />
        <!-- Prev/Next arrows -->
        <button id="gallery-modal-prev" class="gallery-modal-arrow gallery-modal-arrow-left" aria-label="Previous image">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15,18 9,12 15,6"/></svg>
        </button>
        <button id="gallery-modal-next" class="gallery-modal-arrow gallery-modal-arrow-right" aria-label="Next image">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9,18 15,12 9,6"/></svg>
        </button>
        <!-- Image counter -->
        <span id="gallery-modal-counter" class="gallery-modal-counter">1 / 10</span>
      </div>

      <!-- Thumbnail strip -->
      <div id="gallery-modal-thumbnails" class="gallery-modal-thumbnails"></div>

      <!-- Event details -->
      <div class="gallery-modal-details">
        <h3 id="gallery-modal-title" class="text-2xl font-display font-bold text-health-text"></h3>
        <div class="flex flex-wrap items-center gap-3 mt-2 text-sm text-health-text/60 font-medium">
          <span id="gallery-modal-date"></span>
          <span class="text-health-border">·</span>
          <span id="gallery-modal-location"></span>
        </div>
        <p id="gallery-modal-description" class="mt-4 text-health-text/80 leading-relaxed"></p>
        <a id="gallery-modal-fb-link" href="#" target="_blank" rel="noopener noreferrer" class="gallery-modal-fb-btn hidden">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.891h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
          View on Facebook
        </a>
      </div>
    </div>
  </div>
</section>

<style>
  .gallery-card {
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s ease;
  }
  .gallery-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 48px rgba(194, 65, 65, 0.18), 0 4px 16px rgba(194, 65, 65, 0.08);
  }

  /* Modal */
  .gallery-modal {
    position: fixed;
    inset: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
  }
  .gallery-modal.hidden { display: none; }

  .gallery-modal-backdrop {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(8px);
    animation: modalFadeIn 0.3s ease;
  }
  @keyframes modalFadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .gallery-modal-content {
    position: relative;
    width: 100%;
    max-width: 900px;
    max-height: 90vh;
    overflow-y: auto;
    background: #FCFBF9;
    border-radius: 2rem;
    padding: 2rem;
    animation: modalSlideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 25px 80px rgba(0, 0, 0, 0.5);
  }
  @keyframes modalSlideUp {
    from { opacity: 0; transform: translateY(40px) scale(0.96); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  .gallery-modal-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 10;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    cursor: pointer;
    transition: background 0.2s;
  }
  .gallery-modal-close:hover { background: #D95B5B; }

  /* Main image viewer */
  .gallery-modal-viewer {
    position: relative;
    border-radius: 1.5rem;
    overflow: hidden;
    aspect-ratio: 4/3;
    background: #1a1a1a;
  }
  .gallery-modal-main-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: opacity 0.4s ease;
  }

  /* Prev/Next arrows */
  .gallery-modal-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;
    backdrop-filter: blur(4px);
  }
  .gallery-modal-arrow:hover { background: rgba(217, 91, 91, 0.8); }
  .gallery-modal-arrow-left { left: 0.75rem; }
  .gallery-modal-arrow-right { right: 0.75rem; }

  .gallery-modal-counter {
    position: absolute;
    bottom: 0.75rem;
    right: 0.75rem;
    padding: 0.25rem 0.75rem;
    border-radius: 999px;
    background: rgba(0, 0, 0, 0.6);
    color: white;
    font-size: 0.75rem;
    font-weight: 600;
    backdrop-filter: blur(4px);
  }

  /* Thumbnail strip */
  .gallery-modal-thumbnails {
    display: flex;
    gap: 0.5rem;
    padding: 1rem 0;
    overflow-x: auto;
    scrollbar-width: thin;
  }
  .gallery-modal-thumb {
    flex-shrink: 0;
    width: 72px;
    height: 54px;
    border-radius: 0.75rem;
    overflow: hidden;
    cursor: pointer;
    border: 2px solid transparent;
    transition: border-color 0.2s, opacity 0.2s;
    opacity: 0.5;
  }
  .gallery-modal-thumb:hover { opacity: 0.8; }
  .gallery-modal-thumb.active {
    border-color: #D95B5B;
    opacity: 1;
  }
  .gallery-modal-thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* Event details */
  .gallery-modal-details {
    padding-top: 1rem;
    border-top: 1px solid rgba(0, 0, 0, 0.08);
  }
  .gallery-modal-fb-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 1rem;
    padding: 0.625rem 1.25rem;
    border-radius: 999px;
    background: #1877F2;
    color: white;
    font-weight: 600;
    font-size: 0.875rem;
    text-decoration: none;
    transition: background 0.2s, transform 0.2s;
  }
  .gallery-modal-fb-btn:hover { background: #166fe5; transform: translateY(-1px); }

  /* Body scroll lock */
  body.gallery-modal-open { overflow: hidden; }

  @media (max-width: 640px) {
    .gallery-modal-content { padding: 1.25rem; border-radius: 1.5rem; }
    .gallery-modal-thumb { width: 56px; height: 42px; }
    .gallery-modal-arrow { width: 36px; height: 36px; }
  }
</style>

<script>
  (function () {
    const PLACES = /* inline JSON */;
    // Will be populated at build time — see Task 3

    let currentPlaceIdx = -1;
    let currentImgIdx = 0;

    const modal = document.getElementById('gallery-modal');
    const mainImg = document.getElementById('gallery-modal-main-img');
    const counter = document.getElementById('gallery-modal-counter');
    const thumbnails = document.getElementById('gallery-modal-thumbnails');
    const closeBtn = document.getElementById('gallery-modal-close');
    const prevBtn = document.getElementById('gallery-modal-prev');
    const nextBtn = document.getElementById('gallery-modal-next');
    const titleEl = document.getElementById('gallery-modal-title');
    const dateEl = document.getElementById('gallery-modal-date');
    const locationEl = document.getElementById('gallery-modal-location');
    const descEl = document.getElementById('gallery-modal-description');
    const fbLink = document.getElementById('gallery-modal-fb-link');

    function openModal(placeIdx) {
      currentPlaceIdx = placeIdx;
      currentImgIdx = 0;
      const place = PLACES[placeIdx];
      
      // Populate details
      titleEl.textContent = place.title;
      dateEl.textContent = place.date || '';
      locationEl.textContent = place.location;
      descEl.textContent = place.description;
      
      if (place.fbLink) {
        fbLink.href = place.fbLink;
        fbLink.classList.remove('hidden');
      } else {
        fbLink.classList.add('hidden');
      }

      // Build thumbnails
      thumbnails.innerHTML = '';
      place.images.forEach((src, i) => {
        const thumb = document.createElement('div');
        thumb.className = 'gallery-modal-thumb' + (i === 0 ? ' active' : '');
        thumb.innerHTML = `<img src="${src}" alt="Photo ${i+1}" loading="lazy" />`;
        thumb.addEventListener('click', () => showImage(i));
        thumbnails.appendChild(thumb);
      });

      showImage(0);
      modal.classList.remove('hidden');
      document.body.classList.add('gallery-modal-open');
    }

    function closeModal() {
      modal.classList.add('hidden');
      document.body.classList.remove('gallery-modal-open');
      currentPlaceIdx = -1;
    }

    function showImage(idx) {
      currentImgIdx = idx;
      const place = PLACES[currentPlaceIdx];
      mainImg.src = place.images[idx];
      counter.textContent = `${idx + 1} / ${place.images.length}`;
      
      // Update thumbnail active state
      const thumbs = thumbnails.querySelectorAll('.gallery-modal-thumb');
      thumbs.forEach((t, i) => t.classList.toggle('active', i === idx));
    }

    function prevImage() {
      const place = PLACES[currentPlaceIdx];
      showImage((currentImgIdx - 1 + place.images.length) % place.images.length);
    }

    function nextImage() {
      const place = PLACES[currentPlaceIdx];
      showImage((currentImgIdx + 1) % place.images.length);
    }

    // Card click handlers
    document.querySelectorAll('.gallery-card').forEach(card => {
      card.addEventListener('click', () => {
        const idx = parseInt(card.dataset.placeIndex);
        if (!isNaN(idx)) openModal(idx);
      });
    });

    // Modal controls
    closeBtn.addEventListener('click', closeModal);
    modal.querySelector('.gallery-modal-backdrop').addEventListener('click', closeModal);
    prevBtn.addEventListener('click', prevImage);
    nextBtn.addEventListener('click', nextImage);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (modal.classList.contains('hidden')) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    });

    // Re-init on Astro page swaps
    document.addEventListener('astro:after-swap', () => {
      document.querySelectorAll('.gallery-card').forEach(card => {
        card.addEventListener('click', () => {
          const idx = parseInt(card.dataset.placeIndex);
          if (!isNaN(idx)) openModal(idx);
        });
      });
    });
  })();
</script>
```

---

## Task 3: Inject gallery data as inline JSON in the component

**Objective:** The modal JavaScript needs access to `galleryPlaces` data. Serialize it as inline JSON in the script.

**File:** `src/components/CommunityGallery.astro` — in the `<script>` block

Replace the placeholder:
```js
const PLACES = /* inline JSON */;
```

With Astro's JSON serialization:
```js
const PLACES = ${JSON.stringify(galleryPlaces)};
```

This makes all 6 places' data (title, location, date, description, fbLink, images[]) available to the modal JS at runtime.

---

## Task 4: Build and verify

```bash
npm run build
```

Expected: 5 pages build successfully, zero errors.

### Visual checklist:
- [ ] **Music page:** Community gallery at top, cards show first image preview + title + date
- [ ] **Click a card:** Modal slides up with smooth animation
- [ ] **Modal content:** Main image visible, thumbnail strip below, event details (title, date, location, desc)
- [ ] **Click a thumbnail:** Main image switches, active thumbnail highlighted with red border
- [ ] **Prev/Next arrows:** Cycle through images, counter updates
- [ ] **Keyboard:** Arrow keys navigate, Escape closes modal
- [ ] **FB link:** Button visible (blue, with icon), opens in new tab
- [ ] **Close modal:** Click X, click backdrop, or press Escape
- [ ] **Body scroll locked:** Can't scroll page while modal open
- [ ] **Responsive:** Works on mobile (smaller padding, thumbnails)
- [ ] **Home page:** No community section (already removed)

---

## Files Summary

| File | Change |
|---|---|
| `src/data/galleryData.ts` | Add `title` + `fbLink` to interface and all 6 entries |
| `src/components/CommunityGallery.astro` | Full rewrite: no more hover cycling, add modal system |

**Total:** 2 files modified. ~150 lines removed (old hover logic), ~200 lines added (modal system).

---

## Modal Anatomy

```
┌──────────────────────────────────────────┐
│  [×]                                     │ ← close button
│                                          │
│  ┌────────────────────────────────────┐  │
│  │         MAIN IMAGE                 │  │ ← selectable via thumbnails
│  │    [◀]                    [▶]      │  │ ← prev/next arrows
│  │                         3 / 10     │  │ ← counter
│  └────────────────────────────────────┘  │
│                                          │
│  [■][■][■][■][■][■][■][■][■][■]       │ ← thumbnail strip (scrollable)
│                                          │
│  Event Title                             │
│  2025 · Dalaguete, Cebu                  │
│  Description text about the event...     │
│  [📘 View on Facebook]                   │ ← blue FB button
└──────────────────────────────────────────┘
```
