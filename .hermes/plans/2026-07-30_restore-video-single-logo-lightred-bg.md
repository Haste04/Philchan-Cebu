# Fix Plan: Restore Featured Video, Single Logo, Light-Red Background

> **For Hermes:** Three quick fixes — restore the missing featured video section on the music page, reduce navbar logos to PhilCHAN Cebu only, and recolor the background to a light reddish tint.

**Goal:**
1. Featured video section restored on music page, tracks reduced to exactly 2
2. Navbar shows ONLY the PhilCHAN Cebu logo (remove CBCP and Catholic Bishop's logos)
3. StasisBackground base gradient changed from white to a light reddish/pink tint

**Note:** These are fixes for changes made during earlier plan implementations that removed things unintentionally. All are additive/restorative.

---

## Task 1: Restore featured video + cut tracks to 2

**Objective:** The music video section was removed. Add it back between the hero banner and the tracks. Also remove the 3rd track "Hope that Never Ends" — keep only 2 tracks.

**File:** `src/pages/music.astro`

### Step 1a: Add video section between hero and tracks

Insert after line 43 (`</div>` — end of hero banner) and before line 45 (`<section class="section-container">` — tracks section):

```html
    <!-- Featured Video Section -->
    <section class="section-container pt-12 pb-8">
      <div class="reveal mb-8 text-center">
        <div class="inline-flex items-center gap-2 mb-3 text-sm font-bold uppercase tracking-wider text-health-green">
          <Video class="h-4 w-4" />
          Featured Video
        </div>
        <h2 class="text-4xl sm:text-5xl font-display font-bold text-health-text tracking-tight">
          Hope that Never Ends
        </h2>
      </div>
      <div class="max-w-4xl mx-auto glass-card p-3 sm:p-4 rounded-3xl overflow-hidden shadow-2xl reveal">
        <div class="relative aspect-video w-full overflow-hidden rounded-2xl bg-black">
          <video
            id="mv-player"
            controls
            preload="metadata"
            class="w-full h-full object-cover"
          >
            <source src="/musics/Hope that Never Ends.mp4" type="video/mp4" />
            Your browser does not support playing HTML5 videos.
          </video>
        </div>
      </div>
    </section>
```

### Step 1b: Remove the 3rd track (lines 66-73)

```diff
-        <button data-track-index=\"2\" class=\"track-card glass-card flex items-center gap-5 p-5 text-left w-full border-l-4 border-l-transparent transition-all duration-300 hover:shadow-soft\">
-          <span class=\"flex-shrink-0 w-10 h-10 rounded-full bg-health-green-pale flex items-center justify-center text-health-green font-display font-bold text-lg\">3</span>
-          <span class=\"flex-1 font-body font-semibold text-health-text text-lg truncate\">Hope that Never Ends</span>
-          <span class=\"flex-shrink-0 text-health-green\">
-            <Play class=\"h-6 w-6 track-play-icon\" />
-            <Pause class=\"h-6 w-6 track-pause-icon hidden\" />
-          </span>
-        </button>
```

### Step 1c: Update TRACKS_RAW array in JS (line 111-115) — remove 3rd entry

```diff
     const TRACKS_RAW = [
       { name: "PhilCHAN Cebu", src: "/musics/PhilCHAN Cebu.mp3" },
       { name: "PhilCHAN Cebu version 2.0", src: "/musics/PhilCHAN Cebu version 2.0.mp3" },
-      { name: "Hope that Never Ends", src: "/musics/PhilCHAN Cebu version 2.1 - Hope that Never Ends.mp3" },
     ];
```

### Step 1d: Also update the JS for video player integration

The old original music.astro had `mvPlayer` integration in the JS. The current JS (lines 109-210) is minified and doesn't reference `mvPlayer`. Add back the video player pause-on-audio logic:

In the `init()` function, add after `const volumeEl = getEl("player-volume");`:

```js
const mvPlayer = getEl("mv-player");
```

Add the video pause handler (after `volumeEl` declaration):
```js
if (mvPlayer) {
  mvPlayer.addEventListener("play", () => {
    if (audio && !audio.paused) {
      audio.pause();
      isPlaying = false;
      updateAllUI();
    }
  });
}
```

And in `loadTrack`:
```js
if (mvPlayer && !mvPlayer.paused) { mvPlayer.pause(); }
```

And in `playPause`:
```js
if (!audio.paused && audio) {
  // ... existing
} else {
  if (mvPlayer && !mvPlayer.paused) mvPlayer.pause();
  audio.play().then(...)
}
```

---

## Task 2: Navbar — show only PhilCHAN Cebu logo

**Objective:** Remove the CBCP-ECHC and Catholic Bishop's logos from the navbar. Show only the PhilCHAN Cebu logo.

**File:** `src/components/Navbar.astro`

### Step 2a: Remove unused logo imports (lines 10-11)

```diff
 import logoImage from "../assets/images/logos/PhilChan-Cebu Logo.jpg";
-import logoImage2 from "../assets/images/logos/CBCP-ECHC Logo.png";
-import logoImage3 from "../assets/images/logos/Catholic Bishop's Logo.png";
```

### Step 2b: Remove logo 2 and 3 from the JSX template

Find the logo container div (around lines 27-51) and remove the 2nd and 3rd Image components:

```diff
       <div class="flex items-center gap-1 bg-health-white p-1 rounded-full shadow-sm border border-health-border/30">
         <Image
           src={logoImage}
           alt="PhilCHAN Cebu logo"
           width={32}
           height={32}
           class="rounded-full h-8 w-8 object-cover"
         />
-        <Image
-          src={logoImage2}
-          alt="CBCP logo"
-          width={32}
-          height={32}
-          class="rounded-full h-8 w-8 object-cover"
-        />
-        <Image
-          src={logoImage3}
-          alt="Catholic Bishop's logo"
-          width={32}
-          height={32}
-          class="rounded-full h-8 w-8 object-cover"
-        />
       </div>
```

### Step 2c: Adjust logo container padding (optional)

With only 1 logo, the `gap-1` + `p-1` might look too spacious. Adjust:

```diff
-      <div class="flex items-center gap-1 bg-health-white p-1 rounded-full shadow-sm border border-health-border/30">
+      <div class="flex items-center bg-health-white p-1 rounded-full shadow-sm border border-health-border/30">
```

---

## Task 3: Background — light reddish tint

**Objective:** Change the background base gradient from white/cream to a light reddish/pink tint so the overall feel is warmer.

**File:** `src/styles/stasis-bg.css`

### Step 3a: Change the base gradient to light red (line 33)

```diff
-    linear-gradient(160deg, #FCFBF9 0%, #FFF8F6 30%, #FFF5F3 60%, #FCFBF9 100%);
+    linear-gradient(160deg, #FFF5F3 0%, #FFEEEC 30%, #FFF0EE 60%, #FFF5F3 100%);
```

This changes the base from white (`#FCFBF9`) to a light pink/red tint (`#FFF5F3`, `#FFEEEC`, `#FFF0EE`).

### Step 3b: Boost the red glow zones for more visible color (lines 25-31)

Increase the red glow opacity slightly so the background looks more distinctly red-tinted:

```diff
-    radial-gradient(ellipse 55vw 45vh at 12% 85%, rgba(217, 91, 91, 0.25) 0%, transparent 55%),
-    radial-gradient(ellipse 40vw 35vh at 78% 18%, rgba(217, 91, 91, 0.15) 0%, transparent 50%),
-    radial-gradient(ellipse 30vw 30vh at 88% 72%, rgba(180, 60, 60, 0.12) 0%, transparent 55%),
-    radial-gradient(ellipse 50vw 40vh at 50% 50%, rgba(217, 91, 91, 0.08) 0%, transparent 60%),
+    radial-gradient(ellipse 55vw 45vh at 12% 85%, rgba(217, 91, 91, 0.30) 0%, transparent 55%),
+    radial-gradient(ellipse 40vw 35vh at 78% 18%, rgba(217, 91, 91, 0.20) 0%, transparent 50%),
+    radial-gradient(ellipse 30vw 30vh at 88% 72%, rgba(180, 60, 60, 0.15) 0%, transparent 55%),
+    radial-gradient(ellipse 50vw 40vh at 50% 50%, rgba(217, 91, 91, 0.10) 0%, transparent 60%),
```

### Step 3c: Update reduced-motion fallback (lines 117-122) to match

```diff
   .persistent-bg-mesh {
     background:
-      radial-gradient(ellipse 55vw 45vh at 12% 85%, rgba(217, 91, 91, 0.22) 0%, transparent 55%),
-      radial-gradient(ellipse 40vw 35vh at 78% 18%, rgba(217, 91, 91, 0.13) 0%, transparent 50%),
-      radial-gradient(ellipse 30vw 30vh at 88% 72%, rgba(180, 60, 60, 0.10) 0%, transparent 55%),
-      radial-gradient(ellipse 50vw 40vh at 50% 50%, rgba(217, 91, 91, 0.07) 0%, transparent 60%),
-      linear-gradient(160deg, #FCFBF9 0%, #FFF8F6 30%, #FFF5F3 60%, #FCFBF9 100%);
+      radial-gradient(ellipse 55vw 45vh at 12% 85%, rgba(217, 91, 91, 0.27) 0%, transparent 55%),
+      radial-gradient(ellipse 40vw 35vh at 78% 18%, rgba(217, 91, 91, 0.17) 0%, transparent 50%),
+      radial-gradient(ellipse 30vw 30vh at 88% 72%, rgba(180, 60, 60, 0.12) 0%, transparent 55%),
+      radial-gradient(ellipse 50vw 40vh at 50% 50%, rgba(217, 91, 91, 0.09) 0%, transparent 60%),
+      linear-gradient(160deg, #FFF5F3 0%, #FFEEEC 30%, #FFF0EE 60%, #FFF5F3 100%);
   }
```

---

## Task 4: Build and verify

```bash
npm run build
```

Expected: 5 pages build successfully, zero errors.

### Visual checklist:

**Music page:**
- [ ] Community Gallery at top (unchanged)
- [ ] "Our Music" hero banner (unchanged)
- [ ] 🆕 **Featured Video section** restored — shows "Hope that Never Ends" video player
- [ ] Audio Tracks: exactly 2 tracks ("PhilCHAN Cebu" and "PhilCHAN Cebu version 2.0")
- [ ] Playing a track pauses the video, and vice versa
- [ ] Bottom player bar works with 2 tracks (prev/next cycle)

**Navbar:**
- [ ] Only 1 logo visible: PhilCHAN Cebu (round, in the pill container)
- [ ] No CBCP or Catholic Bishop's logos
- [ ] Logo container looks balanced (not stretched with empty space)

**Background:**
- [ ] Overall background has a visible light reddish/pink tint (not pure white)
- [ ] Red blobs still drifting and pulsing
- [ ] Glass sections show the reddish background through them

---

## Files Summary

| File | Changes |
|---|---|
| `src/pages/music.astro` | Add video section HTML (~20 lines), remove 3rd track button, update JS |
| `src/components/Navbar.astro` | Remove 2 logo imports + JSX, adjust container gap |
| `src/styles/stasis-bg.css` | Base gradient white → light red, boost glow opacities, update fallback |

**Total:** 3 files, ~40 lines added, ~30 lines removed.

---

## Color Reference

| Element | Before | After |
|---|---|---|
| Base gradient | `#FCFBF9` → `#FFF8F6` → `#FFF5F3` (white/cream) | `#FFF5F3` → `#FFEEEC` → `#FFF0EE` (light pink) |
| Red glow opacity | 0.08–0.25 | 0.10–0.30 (+20%) |
| Blob opacities | 0.04–0.30 | unchanged (already red) |
