# Fix Plan: Music Tracks — Files + JS Bug

> **For Hermes:** Two root causes why tracks won't play — missing MP3 files in public/ and a duplicate `const mvPlayer` declaration that breaks the entire script.

**Goal:** Tracks play when clicked. Both audio files are accessible and the player JavaScript runs without errors.

**Root Causes Found:**
1. MP3s live in `src/music/` but `TRACKS_RAW` references `/musics/...` — files aren't in `public/musics/`
2. `const mvPlayer` declared twice (line 209 AND line 224) — JS syntax error, entire script dies silently

---

## Task 1: Copy MP3s from src/music/ to public/musics/

**Objective:** The audio player references paths under `/musics/` which maps to `public/musics/`. The MP3 files need to be there.

**Step 1:** Copy the two MP3 files:

```bash
cp "src/music/PhilCHAN Cebu.mp3" "public/musics/"
cp "src/music/PhilCHAN Cebu version 2.0.mp3" "public/musics/"
```

**Verification:**
```bash
ls -la public/musics/*.mp3
```

Expected: 3 MP3 files listed (the two above + `Hope that Never Ends.mp3`).

---

## Task 2: Fix duplicate `const mvPlayer` declaration in JS

**Objective:** The script declares `mvPlayer` twice (lines 209 and 224) which causes a `SyntaxError: Identifier 'mvPlayer' has already been declared`. Remove the duplicate.

**File:** `src/pages/music.astro`

### Remove lines 224-235 (the duplicate block):

```diff
       const playIcon = getEl("player-play-icon");
       const pauseIcon = getEl("player-pause-icon");
-      const mvPlayer = getEl("mv-player");
-
-      // Pause audio player if user plays the video
-      if (mvPlayer) {
-        mvPlayer.addEventListener("play", () => {
-          if (audio && !audio.paused) {
-            audio.pause();
-            isPlaying = false;
-            updateAllUI();
-          }
-        });
-      }
```

Lines 209-218 already handle this correctly. The duplicate is the bug.

---

## Task 3: Restore missing second track button

**Objective:** The HTML only has 1 track button (`data-track-index="0"`) but `TRACKS_RAW` has 2 entries. Add the second track button.

**File:** `src/pages/music.astro`

### After line 106 (`</button>`), add the second track button:

```html
        <button
          data-track-index="1"
          class="track-card glass-card flex items-center gap-5 p-5 text-left w-full border-l-4 border-l-transparent transition-all duration-300 hover:shadow-soft"
        >
          <span
            class="flex-shrink-0 w-10 h-10 rounded-full bg-health-green-pale flex items-center justify-center text-health-green font-display font-bold text-lg"
            >2</span
          >
          <span
            class="flex-1 font-body font-semibold text-health-text text-lg truncate"
            >PhilCHAN Cebu version 2.0</span
          >
          <span class="flex-shrink-0 text-health-green">
            <Play class="h-6 w-6 track-play-icon" />
            <Pause class="h-6 w-6 track-pause-icon hidden" />
          </span>
        </button>
```

---

## Task 4: Build and verify

```bash
npm run build
```

Expected: 5 pages build successfully, zero errors.

### Test:
1. Open music page
2. Click track 1 ("PhilCHAN Cebu") → should play audio, bottom bar appears
3. Click track 2 ("PhilCHAN Cebu version 2.0") → switches, plays
4. Click the same track again → pauses
5. Featured video plays without conflicts

### Browser console check:
- [ ] No `SyntaxError` about duplicate `mvPlayer` declaration
- [ ] No 404 errors for MP3 files

---

## Files Summary

| File | Change |
|---|---|
| `public/musics/` | Copy 2 MP3 files from `src/music/` |
| `src/pages/music.astro` | Remove duplicate `mvPlayer` block (lines 224-235), add 2nd track button HTML |

**Total:** 2 files + 2 file copies. ~15 lines removed (duplicate), ~20 lines added (2nd track button).

---

## Root Cause Diagram

```
User clicks track → loadTrack(0) called
  → audio.src = TRACKS_RAW[0].src    (= "/musics/PhilCHAN Cebu.mp3")
  → file NOT FOUND at public/musics/  ← Bug #1: MP3 not in public/
  → audio.play() fails silently

OR

Script never runs at all
  → const mvPlayer = ... (line 209)
  → const mvPlayer = ... (line 224)   ← Bug #2: duplicate declaration
  → SyntaxError, entire <script> dies
  → No click handlers attached
```
