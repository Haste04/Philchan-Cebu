# Fix Plan: Video Source + Footer Dark Red

> **For Hermes:** Two tiny fixes — point the featured video to the correct file, and change the footer from green to dark red.

**Goal:**
1. Featured video uses `PhilCHANVID.mp4` instead of `Hope that Never Ends.mp4`
2. Footer background color changed from `health-green` to `health-red-dark` (#B53B3B)

**Architecture:** 2 files, ~4 lines changed. No new logic.

---

## Task 1: Update video source to PhilCHANVID.mp4

**Objective:** The video file `public/musics/PhilCHANVID.mp4` exists (16MB). Point the featured video to it.

**File:** `src/pages/music.astro`

### Step 1: Change the `<source>` tag in the video section

```diff
-            <source src="/musics/Hope that Never Ends.mp4" type="video/mp4" />
+            <source src="/musics/PhilCHANVID.mp4" type="video/mp4" />
```

### Step 2 (optional): Update the video section heading

The heading currently says "Hope that Never Ends" — this may no longer match the video. Update to something generic or "Featured Video":

```diff
-          Hope that Never Ends
+          PhilCHAN Cebu
```

---

## Task 2: Change footer from green to dark red

**Objective:** Replace `bg-health-green` with `bg-health-red-dark` (#B53B3B) throughout the footer.

**File:** `src/components/Footer.astro`

### Current state:
The footer uses `bg-health-green` as its main background and various `bg-health-green-light`, `bg-health-green`, `text-health-green` for internal accent elements.

### Changes:

### Step 2a: Main footer background (line 14)

```diff
-  class="relative border-t border-health-border/30 bg-health-green overflow-hidden text-health-white transition-colors duration-300 mt-12"
+  class="relative border-t border-health-border/30 bg-health-red-dark overflow-hidden text-health-white transition-colors duration-300 mt-12"
```

### Step 2b: Internal blur backgrounds (lines 18-24)

```diff
-      class="absolute -top-1/2 left-1/4 w-96 h-96 rounded-full bg-health-green-light/20 blur-[80px] opacity-70"
+      class="absolute -top-1/2 left-1/4 w-96 h-96 rounded-full bg-health-red/20 blur-[80px] opacity-70"

-      class="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-health-red/10 blur-[80px] opacity-50"
+      class="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-health-red/10 blur-[80px] opacity-50"
```

The second one is already `health-red/10` — that's fine, keep it.

### Step 2c: Footer branding icon background (line 33)

```diff
-        <div class="bg-health-white/10 p-2 rounded-2xl backdrop-blur-sm">
+        <div class="bg-health-white/10 p-2 rounded-2xl backdrop-blur-sm">
```

This is already `bg-health-white/10` — fine, keep.

### Step 2d: Copyright bar background (line 144)

```diff
-    class="relative z-10 border-t border-health-white/10 bg-black/10 py-8 text-center text-sm font-medium text-health-white/50 reveal delay-200"
+    class="relative z-10 border-t border-health-white/10 bg-black/20 py-8 text-center text-sm font-medium text-health-white/50 reveal delay-200"
```

Slightly increase opacity (`bg-black/10` → `bg-black/20`) so the bottom bar looks more distinct against the dark red.

---

## Task 3: Build and verify

```bash
npm run build
```

Expected: 5 pages build successfully, zero errors.

### Visual checklist:
- [ ] Music page: featured video plays `PhilCHANVID.mp4`
- [ ] Footer: dark red background (#B53B3B) instead of dark green
- [ ] Footer text remains white, readable on red
- [ ] Footer heart icon, links, contact info all visible
- [ ] Copyright bar slightly darker than footer body
- [ ] All other pages: footer changed consistently

---

## Files Summary

| File | Change |
|---|---|
| `src/pages/music.astro` | `src="/musics/PhilCHANVID.mp4"` + optional heading text |
| `src/components/Footer.astro` | `bg-health-green` → `bg-health-red-dark`, blur bg tweak, copyright bar tweak |

**Total:** 2 files, ~5 lines changed.

---

## Color Reference

| Element | Before | After |
|---|---|---|
| Footer bg | `#2C5E48` (health-green) | `#B53B3B` (health-red-dark) |
| Footer blur accent | `health-green-light/20` | `health-red/20` |
| Copyright bar | `bg-black/10` | `bg-black/20` |
