# Update Plan: White + Reddish Dynamic Background

> **For Hermes:** Recolor the StasisBackground from green/teal/amber to a white base with reddish dynamic orbs.

**Goal:** Replace the current green-heavy animated background with a clean white foundation and reddish (coral/pink/rose) dynamic floating elements — matching the brand's health-red (#D95B5B) accent.

**Current scheme:** Deep green→cream gradient base, green blobs, amber/gold highlights, subtle red  
**Target scheme:** White/cream base, reddish/coral drifting orbs, pink accent pulses

**Architecture:** All changes confined to `src/styles/stasis-bg.css`. The component markup in `StasisBackground.astro` stays identical (4 layers: mesh, 3 blobs). Only color values change.

**Tech Stack:** CSS keyframe animations, radial gradients

---

## Color Reference (from tailwind.config)

| Token | Hex | Usage |
|---|---|---|
| `health-white` | `#FCFBF9` | Base canvas |
| `health-red` | `#D95B5B` | Primary accent — bold coral red |
| `health-red-dark` | (darker shade) | Optional deep accent |
| `health-green` | `#2C5E48` | Removed from background (kept in content only) |
| `health-green-pale` | `#E3EDE7` | Removed from background |

---

## Task 1: Recolor the gradient mesh base (`.persistent-bg-mesh`)

**Objective:** Replace the deep green→cream gradient with a clean white/cream base.

**File:** `src/styles/stasis-bg.css` — lines 20-35

### Before (green-heavy):
```css
.persistent-bg-mesh {
  position: absolute;
  inset: -5%;
  background:
    /* Deep green glow — bottom-left */
    radial-gradient(ellipse 55vw 45vh at 12% 85%, rgba(44, 94, 72, 0.38) 0%, transparent 55%),
    /* Amber warmth — top-right */
    radial-gradient(ellipse 40vw 35vh at 78% 18%, rgba(212, 168, 83, 0.20) 0%, transparent 50%),
    /* Subtle red — bottom-right */
    radial-gradient(ellipse 30vw 30vh at 88% 72%, rgba(217, 91, 91, 0.07) 0%, transparent 50%),
    /* Cream light — top-left */
    radial-gradient(ellipse 35vw 30vh at 22% 8%, rgba(252, 251, 249, 0.60) 0%, transparent 50%),
    /* Base gradient — deep green → cream */
    linear-gradient(140deg, #1a3a2c 0%, #2C5E48 30%, #3d6b55 50%, #FCFBF9 100%);
  background-size: 100% 100%;
  animation: meshBreathe 30s ease-in-out infinite;
}
```

### After (white + reddish):
```css
.persistent-bg-mesh {
  position: absolute;
  inset: -5%;
  background:
    /* Bold red glow — bottom-left */
    radial-gradient(ellipse 55vw 45vh at 12% 85%, rgba(217, 91, 91, 0.25) 0%, transparent 55%),
    /* Soft coral — top-right */
    radial-gradient(ellipse 40vw 35vh at 78% 18%, rgba(217, 91, 91, 0.15) 0%, transparent 50%),
    /* Deep rose — bottom-right */
    radial-gradient(ellipse 30vw 30vh at 88% 72%, rgba(180, 60, 60, 0.12) 0%, transparent 55%),
    /* Subtle pink — center */
    radial-gradient(ellipse 50vw 40vh at 50% 50%, rgba(217, 91, 91, 0.08) 0%, transparent 60%),
    /* White base gradient */
    linear-gradient(160deg, #FCFBF9 0%, #FFF8F6 30%, #FFF5F3 60%, #FCFBF9 100%);
  background-size: 100% 100%;
  animation: meshBreathe 30s ease-in-out infinite;
}
```

**Verification:** Build and preview — background should appear white with reddish glow zones instead of green.

---

## Task 2: Recolor drifting blob 1 (largest, top-right)

**Objective:** Change from green/gold to red/coral.

**File:** `src/styles/stasis-bg.css` — lines 52-61

### Before:
```css
.persistent-bg-blob-1 {
  top: -12%;
  right: -8%;
  width: 45vw;
  height: 45vw;
  max-width: 600px;
  max-height: 600px;
  background: radial-gradient(circle at 50% 50%, rgba(212, 168, 83, 0.18), rgba(44, 94, 72, 0.10));
  animation: blobDrift1 35s ease-in-out infinite;
}
```

### After:
```css
.persistent-bg-blob-1 {
  top: -12%;
  right: -8%;
  width: 45vw;
  height: 45vw;
  max-width: 600px;
  max-height: 600px;
  background: radial-gradient(circle at 50% 50%, rgba(217, 91, 91, 0.22), rgba(217, 91, 91, 0.06));
  animation: blobDrift1 35s ease-in-out infinite;
}
```

---

## Task 3: Recolor drifting blob 2 (medium, bottom-left)

**Objective:** Change from cream/white to soft pink/rose.

**File:** `src/styles/stasis-bg.css` — lines 63-72

### Before:
```css
.persistent-bg-blob-2 {
  bottom: -8%;
  left: -6%;
  width: 38vw;
  height: 38vw;
  max-width: 500px;
  max-height: 500px;
  background: radial-gradient(circle at 50% 50%, rgba(252, 251, 249, 0.50), rgba(227, 237, 231, 0.30));
  animation: blobDrift2 28s ease-in-out infinite;
}
```

### After:
```css
.persistent-bg-blob-2 {
  bottom: -8%;
  left: -6%;
  width: 38vw;
  height: 38vw;
  max-width: 500px;
  max-height: 500px;
  background: radial-gradient(circle at 50% 50%, rgba(217, 91, 91, 0.18), rgba(217, 91, 91, 0.04));
  animation: blobDrift2 28s ease-in-out infinite;
}
```

---

## Task 4: Recolor blob 3 (small accent, mid-right)

**Objective:** Keep as red but boost opacity for more "pop."

**File:** `src/styles/stasis-bg.css` — lines 74-83

### Before:
```css
.persistent-bg-blob-3 {
  top: 35%;
  right: 3%;
  width: 18vw;
  height: 18vw;
  max-width: 220px;
  max-height: 220px;
  background: radial-gradient(circle at 50% 50%, rgba(217, 91, 91, 0.10), transparent);
  animation: blobDrift3 22s ease-in-out infinite, blobPulse 8s ease-in-out infinite;
}
```

### After (boosted):
```css
.persistent-bg-blob-3 {
  top: 35%;
  right: 3%;
  width: 18vw;
  height: 18vw;
  max-width: 220px;
  max-height: 220px;
  background: radial-gradient(circle at 50% 50%, rgba(217, 91, 91, 0.30), rgba(217, 91, 91, 0.05));
  animation: blobDrift3 22s ease-in-out infinite, blobPulse 8s ease-in-out infinite;
}
```

Also update the `blobPulse` keyframe (line 103-106) for stronger pulse:

### Before:
```css
@keyframes blobPulse {
  0%, 100% { opacity: 0.4; }
  50%      { opacity: 0.85; }
}
```

### After:
```css
@keyframes blobPulse {
  0%, 100% { opacity: 0.5; }
  50%      { opacity: 1.0; }
}
```

---

## Task 5: Update reduced-motion fallback to match new colors

**Objective:** The `@media (prefers-reduced-motion: reduce)` block at lines 111-124 has old green colors — update to match.

**File:** `src/styles/stasis-bg.css` — lines 111-124

### Before:
```css
@media (prefers-reduced-motion: reduce) {
  .persistent-bg-mesh,
  .persistent-bg-blob {
    animation: none !important;
  }
  .persistent-bg-mesh {
    background:
      radial-gradient(ellipse 55vw 45vh at 12% 85%, rgba(44, 94, 72, 0.33) 0%, transparent 55%),
      radial-gradient(ellipse 40vw 35vh at 78% 18%, rgba(212, 168, 83, 0.17) 0%, transparent 50%),
      radial-gradient(ellipse 30vw 30vh at 88% 72%, rgba(217, 91, 91, 0.06) 0%, transparent 50%),
      radial-gradient(ellipse 35vw 30vh at 22% 8%, rgba(252, 251, 249, 0.55) 0%, transparent 50%),
      linear-gradient(140deg, #1a3a2c 0%, #2C5E48 30%, #3d6b55 50%, #FCFBF9 100%);
  }
}
```

### After:
```css
@media (prefers-reduced-motion: reduce) {
  .persistent-bg-mesh,
  .persistent-bg-blob {
    animation: none !important;
  }
  .persistent-bg-mesh {
    background:
      radial-gradient(ellipse 55vw 45vh at 12% 85%, rgba(217, 91, 91, 0.22) 0%, transparent 55%),
      radial-gradient(ellipse 40vw 35vh at 78% 18%, rgba(217, 91, 91, 0.13) 0%, transparent 50%),
      radial-gradient(ellipse 30vw 30vh at 88% 72%, rgba(180, 60, 60, 0.10) 0%, transparent 55%),
      radial-gradient(ellipse 50vw 40vh at 50% 50%, rgba(217, 91, 91, 0.07) 0%, transparent 60%),
      linear-gradient(160deg, #FCFBF9 0%, #FFF8F6 30%, #FFF5F3 60%, #FCFBF9 100%);
  }
}
```

---

## Task 6: Build and verify

```bash
npm run build
```

Expected: 5 pages build successfully, zero errors.

**Visual checklist:**
- [ ] Background base is white/cream (not green)
- [ ] Large reddish blob drifts in top-right area
- [ ] Medium pink blob drifts in bottom-left area
- [ ] Small red accent blob pulses mid-right
- [ ] Reddish glow zones visible at edges
- [ ] All content sections still readable over the background
- [ ] `prefers-reduced-motion` fallback uses matching colors

---

## Files Affected

| File | Changes |
|---|---|
| `src/styles/stasis-bg.css` | Lines 20-35: mesh gradient colors<br>Lines 52-61: blob 1 colors<br>Lines 63-72: blob 2 colors<br>Lines 74-83: blob 3 colors + opacity<br>Lines 103-106: blobPulse keyframe<br>Lines 111-124: reduced-motion fallback |

**Total:** 1 file, ~25 lines changed. No component or page changes needed.

---

## Color Summary: Before vs After

| Element | Before | After |
|---|---|---|
| Mesh base gradient | Deep green → cream (`#1a3a2c` → `#FCFBF9`) | White → warm white (`#FCFBF9` → `#FFF5F3`) |
| Glow zones | Green (`rgba(44,94,72,0.38)`), amber, cream | Red (`rgba(217,91,91,0.25)`), coral, rose |
| Blob 1 (large) | Green/gold | Red/coral |
| Blob 2 (medium) | Cream/white | Soft pink/rose |
| Blob 3 (small) | Red 0.10 opacity | Red 0.30 opacity (3× boost) |
| Blob pulse | 0.4 → 0.85 | 0.5 → 1.0 (stronger) |

---

## Risk

| Risk | Mitigation |
|---|---|
| Red too intense, distracts from content | All opacities are 0.04–0.30 — subtle. Adjust down if needed |
| White base makes text hard to read on glass sections | Glass sections provide `bg-health-white/10 + backdrop-blur-md` — sufficient contrast |
| `mix-blend-mode: multiply` (from dynamic-bg.css) interacts badly with red | dynamic-bg.css orbs operate on `<main>` pseudo-elements, not on StasisBackground; they're separate layers — fine |
