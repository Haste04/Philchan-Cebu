# Fix Plan: Landscape Modal Layout + Navbar Spacing

> **For Hermes:** Redesign the gallery modal layout to landscape (image left, details right) on desktop, and add top spacing so the modal content never overlaps the sticky navbar.

**Goal:** 
1. Modal uses landscape (side-by-side) layout: image gallery on left, event details on right
2. Modal content box has top clearance so it never visually conflicts with the floating navbar
3. Wider max-width to accommodate the two-column layout

**Architecture:** CSS-only changes to `.gallery-modal-content` and `.gallery-modal-viewer`. The HTML structure stays the same — we reorder it visually with CSS grid.

**Current vs Target:**

```
Current (portrait):              Target (landscape):
┌────────────────────┐           ┌──────────────────────────────────┐
│      [×]           │           │  ┌──────────────┐  [×]          │
│                    │           │  │              │               │
│   ┌──────────┐     │           │  │    IMAGE     │  Title        │
│   │  IMAGE   │     │           │  │   GALLERY    │  Date · Loc   │
│   │  4:3     │     │           │  │   16:9       │               │
│   └──────────┘     │           │  │              │  Description  │
│                    │           │  │  ◀ 3/10 ▶   │               │
│  [thumbnails]     │           │  └──────────────┘  [FB Link]    │
│                    │           │  [thumbnails...]                │
│  Title             │           └──────────────────────────────────┘
│  Date · Location   │
│  Description       │
│  [FB Link]         │
└────────────────────┘
```

---

## Task 1: Enlarge modal max-width and make it landscape

**Objective:** Widen the modal to accommodate side-by-side layout and change the internal grid from vertical stack to two-column landscape.

**File:** `src/components/CommunityGallery.astro` — lines 131-142 (`.gallery-modal-content`) and lines 168-174 (`.gallery-modal-viewer`)

### Step 1a: Increase max-width (line 134)

```diff
-    max-width: 900px;
+    max-width: 1100px;
```

### Step 1b: Change internal layout to two-column grid (add to line 131-142)

```diff
 .gallery-modal-content {
   position: relative;
   width: 100%;
-  max-width: 900px;
+  max-width: 1100px;
   max-height: 90vh;
   overflow-y: auto;
   background: #FCFBF9;
   border-radius: 2rem;
   padding: 2rem;
   animation: modalSlideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
   box-shadow: 0 25px 80px rgba(0, 0, 0, 0.5);
+  display: grid;
+  grid-template-columns: 1fr 320px;
+  grid-template-rows: auto auto auto;
+  gap: 0 2rem;
+  align-items: start;
 }
```

This creates a two-column layout: left column (flexible) for the image gallery, right column (320px fixed) for event details.

### Step 1c: Assign grid areas to the child elements

Add grid placement to the main children:

```diff
 .gallery-modal-viewer {
   position: relative;
   border-radius: 1.5rem;
   overflow: hidden;
-  aspect-ratio: 4/3;
+  aspect-ratio: 16/9;
   background: #1a1a1a;
+  grid-column: 1;
+  grid-row: 1;
 }
```

```diff
 .gallery-modal-thumbnails {
   display: flex;
   gap: 0.5rem;
   padding: 1rem 0;
   overflow-x: auto;
   scrollbar-width: thin;
+  grid-column: 1;
+  grid-row: 2;
 }
```

```diff
 .gallery-modal-details {
   padding-top: 1rem;
   border-top: 1px solid rgba(0, 0, 0, 0.08);
+  grid-column: 2;
+  grid-row: 1 / 4;
+  border-top: none;
+  padding-top: 0;
+  border-left: 1px solid rgba(0, 0, 0, 0.08);
+  padding-left: 0;
 }
```

Wait — since details spans rows 1-4 on the right column, we should remove the `border-top` and use `border-left` instead for the visual separation. Also the details shouldn't have `padding-top` when in landscape mode since they sit beside the image.

### Step 1d: Wider image viewer aspect ratio (line 172)

```diff
-  aspect-ratio: 4/3;
+  aspect-ratio: 16/9;
```

### Step 1e: Keep vertical stack on mobile

The current `@media (max-width: 640px)` block — expand it to also handle tablet:

```diff
-@media (max-width: 640px) {
-  .gallery-modal-content { padding: 1.25rem; border-radius: 1.5rem; }
-  .gallery-modal-thumb { width: 56px; height: 42px; }
-  .gallery-modal-arrow { width: 36px; height: 36px; }
-}
+@media (max-width: 768px) {
+  .gallery-modal-content {
+    padding: 1.25rem;
+    border-radius: 1.5rem;
+    display: block;  /* Reset to vertical stack */
+    max-width: 900px;
+  }
+  .gallery-modal-viewer {
+    aspect-ratio: 4/3;
+  }
+  .gallery-modal-details {
+    border-left: none;
+    border-top: 1px solid rgba(0, 0, 0, 0.08);
+    padding-top: 1rem;
+    padding-left: 0;
+    margin-top: 1rem;
+  }
+  .gallery-modal-thumb { width: 56px; height: 42px; }
+  .gallery-modal-arrow { width: 36px; height: 36px; }
+}
```

---

## Task 2: Add navbar clearance — prevent modal from overlapping the sticky nav

**Objective:** The floating navbar (`sticky top-4 z-50`) should not be visually covered by the modal content box. Add top spacing.

**Problem:** The modal is `position: fixed; inset: 0; z-index: 100` with `align-items: center`. When centered, the modal content box can overlap the navbar area at the top of the screen.

**Solution:** Add `padding-top` to the modal container to push content below the navbar zone.

**File:** `src/components/CommunityGallery.astro` — lines 108-116 (`.gallery-modal`)

### Step 2a: Add padding-top to account for navbar

The navbar is `sticky top-4` (~16px from top) and has content height of approximately 56-64px. Total clearance needed: ~80px (5rem).

```diff
 .gallery-modal {
   position: fixed;
   inset: 0;
   z-index: 100;
   display: flex;
   align-items: center;
   justify-content: center;
-  padding: 1rem;
+  padding: 5rem 1rem 1rem 1rem;
 }
```

### Step 2b: Adjust mobile padding

```diff
 @media (max-width: 768px) {
+  .gallery-modal {
+    padding: 5rem 0.75rem 1rem 0.75rem;
+  }
   .gallery-modal-content {
     ...
```

### Step 2c: Scrollable details column

Since the details column is now constrained to 320px width with potentially long descriptions, add overflow handling:

```diff
 .gallery-modal-details {
   ...
   grid-column: 2;
   grid-row: 1 / 4;
   border-top: none;
   padding-top: 0;
   border-left: 1px solid rgba(0, 0, 0, 0.08);
   padding-left: 0;
+  max-height: calc(90vh - 4rem);
+  overflow-y: auto;
+  padding-right: 0.5rem;
 }
```

---

## Task 3: Build and verify

```bash
npm run build
```

Expected: 5 pages build successfully, zero errors.

### Visual checklist:

**Desktop (≥769px):**
- [ ] Modal opens in landscape — image gallery on left, event details on right
- [ ] Image viewer is 16:9 aspect ratio (wider)
- [ ] Thumbnail strip sits below the image, within left column
- [ ] Event details visible on right: title, date, location, description, FB link
- [ ] Details column separated from gallery by a subtle left border
- [ ] Details column scrolls independently if content is long
- [ ] Modal top edge has clearance from navbar (~80px gap)
- [ ] Navbar remains visible and clickable above modal backdrop

**Mobile (≤768px):**
- [ ] Modal falls back to vertical stack (image → thumbnails → details)
- [ ] Image viewer returns to 4:3 aspect ratio
- [ ] Navbar clearance still maintained

**Interaction:**
- [ ] Click card → modal opens without overlapping navbar
- [ ] Prev/Next arrows work within image gallery
- [ ] Thumbnail clicks switch main image
- [ ] Keyboard nav (Arrow keys, Escape) works
- [ ] Close button, backdrop click, Escape all close modal

---

## Files Summary

| File | Changes |
|---|---|
| `src/components/CommunityGallery.astro` | Lines 108-116: modal padding for navbar<br>Lines 131-142: grid layout on content<br>Lines 168-174: 16:9 ratio + grid placement<br>Lines 218-224: thumbnail grid placement<br>Lines 248-251: details grid placement + scroll<br>Lines 271-275: mobile media query expanded |

**Total:** 1 file, ~30 lines changed. No HTML changes — pure CSS layout rework.

---

## Grid Layout Reference

```
Desktop grid (grid-template-columns: 1fr 320px):
┌──────────────────────┬──────────┐
│  Viewer (16:9)       │ Details  │  ← row 1
│  grid-col:1, row:1   │ col:2    │
│                      │ row:1/4  │
├──────────────────────┤          │
│  Thumbnail strip     │  Title   │  ← row 2
│  grid-col:1, row:2   │  Date    │
│                      │  Loc     │
│                      │  Desc    │
│                      │  FB Link │
└──────────────────────┴──────────┘
```

Mobile (display: block):
```
┌────────────────────┐
│  Viewer (4:3)      │
├────────────────────┤
│  Thumbnail strip   │
├────────────────────┤
│  Title / Date      │
│  Description       │
│  FB Link           │
└────────────────────┘
```
