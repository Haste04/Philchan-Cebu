# Fix Plan: Tight Thumbnail Boxes + Remove Details Separators

> **For Hermes:** Two quick CSS fixes — make thumbnails into tight image-filled boxes with the border on the active thumbnail only, and remove all separator lines from the details panel.

**Goal:**
1. Thumbnails are small image-filled boxes — the image fills the entire box with no visible white frame/border. Only the active thumbnail gets a red highlight border.
2. Remove all separator lines (red accent bar, border separators) from the right-side details panel for a cleaner look.

**Architecture:** Pure CSS changes, 1 file. No HTML or JS changes.

---

## Task 1: Redesign thumbnails as tight image-filled boxes

**Objective:** Each thumbnail should be a small box where the image completely fills the container, with NO visible border frame. Only the active/selected thumbnail shows a red outline.

**File:** `src/components/CommunityGallery.astro` — lines 254-280

### Current problem:
```css
.gallery-modal-thumb {
  border: 3px solid rgba(255, 255, 255, 0.15);  /* ← white frame around every thumb */
  ...
}
```

### Fix:

```diff
 .gallery-modal-thumb {
   flex-shrink: 0;
   width: 80px;
   height: 80px;
-  border-radius: 4px;
+  border-radius: 6px;
   overflow: hidden;
   cursor: pointer;
-  border: 3px solid rgba(255, 255, 255, 0.15);
+  border: none;
+  outline: none;
   transition: border-color 0.2s, opacity 0.2s, box-shadow 0.2s;
-  opacity: 0.6;
+  opacity: 0.55;
   background: #1a1a1a;
 }
 .gallery-modal-thumb:hover {
-  opacity: 0.9;
-  border-color: rgba(217, 91, 91, 0.5);
+  opacity: 0.85;
+  box-shadow: inset 0 0 0 2px rgba(217, 91, 91, 0.35);
 }
 .gallery-modal-thumb.active {
-  border-color: #D95B5B;
   opacity: 1;
-  box-shadow: 0 0 0 2px rgba(217, 91, 91, 0.3);
+  box-shadow: inset 0 0 0 3px #D95B5B, 0 0 0 3px rgba(217, 91, 91, 0.2);
 }
 .gallery-modal-thumb img {
   width: 100%;
   height: 100%;
   object-fit: cover;
   display: block;
+  border-radius: 6px;
 }
```

**Key changes:**
- Remove the white/gray border from all thumbnails (`border: none`)
- Use `inset box-shadow` for the active/hover highlight — this draws the red border INSIDE the box so it doesn't create a gap
- `border-radius: 6px` on both the container and the img for consistent corners
- Active state: red inner ring (`inset 0 0 0 3px #D95B5B`) + subtle red outer glow
- Hover state: subtle red inner ring preview

### Also update mobile size:
```diff
 @media (max-width: 768px) {
-  .gallery-modal-thumb { width: 60px; height: 60px; }
+  .gallery-modal-thumb { width: 56px; height: 56px; }
   ...
 }
```

---

## Task 2: Remove all separator lines from the details panel

**Objective:** The details panel currently has several horizontal and vertical separator lines. Remove them for a cleaner look.

**File:** `src/components/CommunityGallery.astro`

### Lines to remove/modify:

### 2a: Remove left border on details panel (line 288)

```diff
 .gallery-modal-details {
   grid-column: 2;
   grid-row: 1 / 5;
   border-top: none;
   padding-top: 0;
-  border-left: 1px solid rgba(0, 0, 0, 0.08);
   padding-left: 0;
   ...
 }
```

### 2b: Remove the red accent bar and its border (lines 344-351 in the accent section, plus the SVG in HTML)

First, remove the CSS for the accent section:

```diff
-  .gallery-modal-accent {
-    margin-top: 1.5rem;
-    padding-top: 1.25rem;
-    border-top: 1px solid rgba(0, 0, 0, 0.06);
-  }
-  .gallery-modal-accent-line {
-    margin-bottom: 0.75rem;
-    display: block;
-  }
```

Then update `.gallery-modal-accent-text` to not need the accent wrapper:

```diff
 .gallery-modal-accent-text {
   font-family: 'Fraunces', serif;
   font-style: italic;
   font-size: 1.125rem;
   color: #D95B5B;
   line-height: 1.5;
   font-weight: 500;
+  margin-top: 1.25rem;
+  display: block;
 }
```

### 2c: Remove the accent wrapper HTML (the SVG + wrapper div)

In the HTML template, find the accent block and simplify it. Currently around lines 88-93 in the template, find:

```html
<div class="gallery-modal-accent">
  <svg class="gallery-modal-accent-line" ...>
    <rect .../>
  </svg>
  <p id="gallery-modal-accent-text" class="gallery-modal-accent-text"></p>
</div>
```

Replace with just the text element:

```html
<p id="gallery-modal-accent-text" class="gallery-modal-accent-text"></p>
```

### 2d: Remove border-top from metadata bar (line 303)

```diff
 .gallery-modal-meta {
   display: flex;
   gap: 2rem;
   padding: 0.5rem 0;
   grid-column: 1;
   grid-row: 3;
-  border-top: 1px solid rgba(0, 0, 0, 0.06);
 }
```

### 2e: Update mobile to match (remove the border-top on details in media query, line 395)

```diff
   .gallery-modal-details {
     border-left: none;
-    border-top: 1px solid rgba(0, 0, 0, 0.08);
     padding-top: 1rem;
     ...
   }
```

---

## Task 3: Build and verify

```bash
npm run build
```

Expected: 5 pages build successfully, zero errors.

### Visual checklist:

**Thumbnails:**
- [ ] No white/gray frame around thumbnails — images fill the box completely
- [ ] Only active thumbnail has visible highlight (red inner ring + subtle outer glow)
- [ ] Hovering a thumbnail shows subtle red ring preview
- [ ] Thumbnails are tight 80×80px boxes with 6px radius
- [ ] Mobile: 56×56px

**Details panel:**
- [ ] No vertical separator line between gallery and details
- [ ] No red accent bar
- [ ] Stylized italic text still visible (just no line above it)
- [ ] No border above metadata bar (SESSION/DAY)
- [ ] Clean, open layout without visual dividers

---

## Files Summary

| File | Changes |
|---|---|
| `src/components/CommunityGallery.astro` | Lines 254-280: thumbnail border → inset shadow<br>Line 288: remove details border-left<br>Lines 344-351: remove accent bar CSS<br>HTML: remove accent wrapper div<br>Line 303: remove meta border-top<br>Line 395: remove mobile details border-top |

**Total:** 1 file, ~15 lines changed/deleted. All CSS.
