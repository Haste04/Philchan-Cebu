# Fix Plan: Modal Expansion, Boxed Thumbnails & Rich Details Layout

> **For Hermes:** Three targeted improvements to the community gallery modal — make it fill more of the screen, redesign thumbnails as boxed/filled strips, and enhance the details panel with better typography and decorative elements.

**Goal:** 
1. Modal fills most of the viewport (near full-screen), not a small centered box
2. Thumbnail navigation is a tight, boxed strip where each image completely fills its frame
3. Details panel has richer text layout with better hierarchy, spacing, and decorative accents

**Reference:** The user provided a screenshot showing a wide modal with square, red-bordered thumbnail boxes, a prominent details panel with clear title/date/location, and stylized decorative text.

**Architecture:** Pure CSS changes to `.gallery-modal-content`, `.gallery-modal-thumb`, and `.gallery-modal-details`. Minor markup additions for decorative text and metadata labels.

---

## Task 1: Expand modal to fill most of the screen

**Objective:** Make the modal nearly full-screen so it feels immersive, not like a small floating dialog.

**File:** `src/components/CommunityGallery.astro`

### Step 1a: Increase max-width and reduce outer padding (line 108-116)

```diff
 .gallery-modal {
   position: fixed;
   inset: 0;
   z-index: 100;
   display: flex;
   align-items: center;
   justify-content: center;
-  padding: 5rem 1rem 1rem 1rem;
+  padding: 5rem 1.5rem 1.5rem 1.5rem;
 }
```

### Step 1b: Increase content max-width (line 134)

```diff
-  max-width: 1100px;
+  max-width: 95vw;
+  max-width: min(95vw, 1400px);
```

### Step 1c: Reduce content padding for more image space (line 140)

```diff
-  padding: 2rem;
+  padding: 1.5rem;
```

### Step 1d: Adjust grid to give more space to the image column

```diff
-  grid-template-columns: 1fr 320px;
+  grid-template-columns: 1fr 340px;
```

### Step 1e: Reduce gap

```diff
-  gap: 0 2rem;
+  gap: 0 1.5rem;
```

---

## Task 2: Redesign thumbnails as boxed/filled layout

**Objective:** Thumbnails should look like a tight gallery strip — square boxes with sharp corners, red border on active selection, and images that completely fill each box. Match the reference image's aesthetic.

**File:** `src/components/CommunityGallery.astro`

### Step 2a: Replace thumbnail CSS (lines 225-245)

```diff
 .gallery-modal-thumb {
   flex-shrink: 0;
-  width: 72px;
-  height: 54px;
-  border-radius: 0.75rem;
+  width: 80px;
+  height: 80px;
+  border-radius: 4px;
   overflow: hidden;
   cursor: pointer;
-  border: 2px solid transparent;
+  border: 3px solid rgba(255, 255, 255, 0.15);
   transition: border-color 0.2s, opacity 0.2s;
-  opacity: 0.5;
+  opacity: 0.6;
+  background: #1a1a1a;
 }
-.gallery-modal-thumb:hover { opacity: 0.8; }
+.gallery-modal-thumb:hover {
+  opacity: 0.9;
+  border-color: rgba(217, 91, 91, 0.5);
+}
 .gallery-modal-thumb.active {
-  border-color: #D95B5B;
+  border-color: #D95B5B;
   opacity: 1;
+  box-shadow: 0 0 0 2px rgba(217, 91, 91, 0.3);
 }
 .gallery-modal-thumb img {
   width: 100%;
   height: 100%;
   object-fit: cover;
+  display: block;
 }
```

**Key changes:**
- Square (80×80px) instead of rectangular (72×54px)
- Sharp corners (4px radius) instead of rounded (0.75rem)
- Default border: subtle white outline instead of transparent
- Active: bold red border + red glow shadow
- Image fills completely via `object-fit: cover` + `display: block`

### Step 2b: Adjust thumbnail strip spacing

```diff
 .gallery-modal-thumbnails {
   display: flex;
-  gap: 0.5rem;
+  gap: 0.375rem;
   padding: 1rem 0;
   overflow-x: auto;
   scrollbar-width: thin;
+  grid-column: 1;
+  grid-row: 2;
+  align-items: center;
 }
```

---

## Task 3: Add metadata labels below thumbnails

**Objective:** Add small "Session" and "Day" labels below the thumbnail strip to match the reference design. These show structured event metadata.

**File:** `src/components/CommunityGallery.astro`

### Step 3a: Add metadata bar HTML after the thumbnail strip (after line 78)

```html
<!-- Metadata bar -->
<div class="gallery-modal-meta">
  <span class="gallery-modal-meta-item">
    <span class="gallery-modal-meta-label">Session</span>
    <span id="gallery-modal-session" class="gallery-modal-meta-value"></span>
  </span>
  <span class="gallery-modal-meta-item">
    <span class="gallery-modal-meta-label">Day</span>
    <span id="gallery-modal-day" class="gallery-modal-meta-value"></span>
  </span>
</div>
```

### Step 3b: Add CSS for metadata bar

```css
.gallery-modal-meta {
  display: flex;
  gap: 2rem;
  padding: 0.5rem 0;
  grid-column: 1;
  grid-row: 3;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}
.gallery-modal-meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
}
.gallery-modal-meta-label {
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #999;
}
.gallery-modal-meta-value {
  font-weight: 600;
  color: #D95B5B;
}
```

### Step 3c: Update grid — details now spans row 1/5 (not 1/4)

```diff
 .gallery-modal-details {
   ...
   grid-column: 2;
-  grid-row: 1 / 4;
+  grid-row: 1 / 5;
   ...
 }
```

### Step 3d: Populate metadata in JS (in openModal function)

```diff
+    const sessionEl = document.getElementById('gallery-modal-session');
+    const dayEl = document.getElementById('gallery-modal-day');
```

In `openModal`:
```js
+    sessionEl.textContent = place.date || '—';
+    dayEl.textContent = place.date || '—';
```

---

## Task 4: Enhance details panel text layout

**Objective:** The right-side details panel currently feels sparse. Improve typography hierarchy, spacing, and add a decorative handwritten-style accent element.

**File:** `src/components/CommunityGallery.astro`

### Step 4a: Improve details CSS (lines 248-265)

```diff
 .gallery-modal-details {
+  display: flex;
+  flex-direction: column;
   padding-top: 1rem;
   border-top: 1px solid rgba(0, 0, 0, 0.08);
   grid-column: 2;
   grid-row: 1 / 5;
   border-top: none;
+  border-left: 1px solid rgba(0, 0, 0, 0.08);
   padding-top: 0;
-  border-left: 1px solid rgba(0, 0, 0, 0.08);
   padding-left: 0;
   max-height: calc(90vh - 4rem);
   overflow-y: auto;
   padding-right: 0.5rem;
+  gap: 0;
 }
```

### Step 4b: Add stylized decorative text element in HTML

After the description paragraph, before the FB link (around line 88-89):

```html
<!-- Decorative stylized text -->
<div class="gallery-modal-accent">
  <svg class="gallery-modal-accent-line" width="40" height="3" viewBox="0 0 40 3" aria-hidden="true">
    <rect width="40" height="3" rx="1.5" fill="#D95B5B"/>
  </svg>
  <p id="gallery-modal-accent-text" class="gallery-modal-accent-text"></p>
</div>
```

### Step 4c: CSS for decorative accent

```css
.gallery-modal-accent {
  margin-top: 1.5rem;
  padding-top: 1.25rem;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}
.gallery-modal-accent-line {
  margin-bottom: 0.75rem;
  display: block;
}
.gallery-modal-accent-text {
  font-family: 'Fraunces', serif;
  font-style: italic;
  font-size: 1.125rem;
  color: #D95B5B;
  line-height: 1.5;
  font-weight: 500;
}
```

### Step 4d: Improve title and metadata typography

```diff
 /* Ensure title stands out more */
+#gallery-modal-title {
+  font-size: 1.5rem;
+  line-height: 1.3;
+  margin-bottom: 0.5rem;
+}
+
+/* Metadata row */
+#gallery-modal-date,
+#gallery-modal-location {
+  font-size: 0.875rem;
+}
+
+/* Description */
+#gallery-modal-description {
+  font-size: 0.9375rem;
+  line-height: 1.65;
+  margin-top: 1rem;
+}
```

### Step 4e: Populate accent text in JS

In `openModal`:
```js
+    const accentEl = document.getElementById('gallery-modal-accent-text');
+    accentEl.textContent = 'Faith in action — serving communities across Cebu with compassion and dignity.';
```

### Step 4f: Improve FB button style

```diff
 .gallery-modal-fb-btn {
   display: inline-flex;
   align-items: center;
   gap: 0.5rem;
-  margin-top: 1rem;
+  margin-top: auto;
+  margin-top: 1.5rem;
   padding: 0.625rem 1.25rem;
   border-radius: 999px;
   background: #1877F2;
   color: white;
   font-weight: 600;
   font-size: 0.875rem;
   text-decoration: none;
-  transition: background 0.2s, transform 0.2s;
+  transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
+  box-shadow: 0 2px 8px rgba(24, 119, 242, 0.3);
+  align-self: flex-start;
 }
-.gallery-modal-fb-btn:hover { background: #166fe5; transform: translateY(-1px); }
+.gallery-modal-fb-btn:hover {
+  background: #166fe5;
+  transform: translateY(-1px);
+  box-shadow: 0 4px 14px rgba(24, 119, 242, 0.4);
+}
```

---

## Task 5: Update mobile layout

**File:** `src/components/CommunityGallery.astro` — media query block

```diff
 @media (max-width: 768px) {
   .gallery-modal {
     padding: 5rem 0.75rem 0.75rem 0.75rem;
   }
   .gallery-modal-content {
     padding: 1rem;
     border-radius: 1.25rem;
     display: block;
   }
   .gallery-modal-viewer {
     aspect-ratio: 4/3;
   }
   .gallery-modal-details {
     border-left: none;
     border-top: 1px solid rgba(0, 0, 0, 0.08);
     padding-top: 1rem;
     margin-top: 0.5rem;
   }
-  .gallery-modal-thumb { width: 56px; height: 42px; }
+  .gallery-modal-thumb { width: 60px; height: 60px; }
   .gallery-modal-arrow { width: 36px; height: 36px; }
+  .gallery-modal-meta { gap: 1rem; }
 }
```

---

## Task 6: Build and verify

```bash
npm run build
```

Expected: 5 pages build successfully, zero errors.

### Visual checklist:

**Modal size:**
- [ ] Modal fills ~95% of viewport width (not a small 900px box)
- [ ] Minimal gaps at edges (1.5rem padding)
- [ ] Navbar clearance maintained (5rem top padding)

**Thumbnails:**
- [ ] Square boxes (80×80px), images fill completely (no letterboxing)
- [ ] Subtle white/gray border on all thumbnails
- [ ] Active thumbnail has bold RED border + glow shadow
- [ ] Hover thumbnail border turns reddish
- [ ] Tight 6px gap between thumbnails
- [ ] Sharp 4px corner radius (not round pills)

**Details panel:**
- [ ] Title is prominent (1.5rem Fraunces bold)
- [ ] Date and location well-spaced with dot separator
- [ ] Description text comfortable line-height (1.65)
- [ ] Decorative red accent bar + italic stylized text
- [ ] FB button has blue glow shadow, pushes to bottom of panel
- [ ] Panel scrolls independently if content overflows

**Metadata bar:**
- [ ] "Session" and "Day" labels visible below thumbnails
- [ ] Small uppercase gray labels + red values
- [ ] Thin top border separator

**Mobile:**
- [ ] Stacks vertically, thumbnails are 60×60px boxes
- [ ] Details panel below image with border-top separator

---

## Files Summary

| File | Changes |
|---|---|
| `src/components/CommunityGallery.astro` | Modal sizing (lines 108-142), thumbnail redesign (lines 225-245), new metadata bar HTML+CSS, details panel typography + accent element, JS data binding |

**Total:** 1 file, ~60 lines changed/added. ~15 new HTML lines (metadata bar + accent), ~45 CSS lines.

---

## Thumbnail Visual Reference

```
Before (current):                After (boxed):
┌────┐ ┌────┐ ┌────┐            ┌──────┐┌──────┐┌══════┐
│    │ │    │ │    │            │      ││      │║██████║ ← active: red border
│    │ │    │ │    │  72×54     │ FULL ││ FULL │║FULL  ║    + glow shadow
└────┘ └────┘ └────┘  rounded   │ IMG  ││ IMG  │║IMG   ║   80×80px
  gap: 8px          corners     └──────┘└──────┘└══════┘   sharp corners
                                  gap: 6px          border: 3px
```
