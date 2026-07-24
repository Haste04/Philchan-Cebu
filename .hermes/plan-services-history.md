# Plan: Add Medical History / Services History Page to PhilCHAN Cebu

## Overview

Add a **Services & History** page (`/services`) that chronicles PhilCHAN Cebu's medical and community service history — from its national founding under CBCP-ECHC in 1992, through the establishment of the Cebu chapter, to present-day mobile medical missions and outreach events. This serves as a living document of the organization's impact, with rich **animations** to make the timeline engaging.

**Key constraint: Do NOT modify existing working code.** All additions are new files. The only exception is `landingData.ts` (adding a nav item) and the `navItems` consumer (Navbar/Footer), which are trivial data additions that *enable* the new page.

---

## 1. Content to Source (Facebook & Web Research)

Based on research across Facebook, Instagram, news articles, and directories, here is the compiled history of PhilCHAN Cebu's medical services and community impact:

### Timeline Milestones

| Year | Milestone | Category | Source |
|------|-----------|----------|--------|
| 1992 | **PhilCHAN founded nationally** by CBCP-ECHC as the Philippine Catholic HIV/AIDS Network | founding | CBCP records |
| 2018 | **Cebu chapter established** under Dr. Greta Canoy (Coordinator) — counseling, support, HIV advocacy at Tigbao, Talamban | chapter | HIV-AIDS Directory 2018 |
| 2019 (Apr 27) | **Community-based HIV testing center opens** in Cebu City | chapter | Facebook |
| 2020 | **COVID-19 response** — testing and counseling continued through pandemic with expanded telehealth support | program | Facebook |
| 2020s | **Mt. Zion Center, Tigbao, Talamban** established as permanent PhilCHAN Cebu community center | chapter | Trust.ph / Facebook |
| 2023+ | **Free HIV testing** Mon-Fri 9AM-5PM + pastoral care + community education programs launched | program | Facebook |
| 2023+ | **Partnership with Cebu City Health Social Hygiene Clinic** for International AIDS Candlelight Memorial | partnership | Facebook |
| 2024 (Nov 29) | **First HIV AIDS Lay Forum** conducted at Brgy. Concepcion — community education session | outreach | Facebook |
| 2024+ | **School HIV lectures** — USC students, online Zoom HIV lecture series for wider reach | outreach | Facebook / USC.edu.ph |
| 2025 | **Mobile medical missions** — medical consultations, medicine distribution, health education, spiritual care | outreach | Instagram / WHO |
| 2025 | **Advent Recollection / World AIDS Day observance** (Dec 3, 2025) | program | Facebook |
| 2025+ | **Invited to U.S. Military HIV Research Program (MHRP) RV670 Stakeholder Meeting** | partnership | Facebook |
| 2025+ | **Cebu Caritas Inc. collaboration** — free clinic, medical missions, First Aid & CPR training, TB program, IDU Care | partnership | Archdiocese of Cebu |
| 2025+ | **ASOG Strategic Religious Engagement consultation** (Ateneo de Manila) | partnership | Ateneo.edu |
| Ongoing | **Free & confidential HIV testing** Mon-Fri 9AM-5PM at Mt. Zion Center, Talamban | program | Facebook |
| Ongoing | **Barangay-level outreach** — Brgy. Kalunasan and other communities invited for testing events | outreach | Facebook |

### Services to Feature

1. **Confidential HIV Testing** — Rapid, free, professional (since 2019)
2. **Pastoral Care & Counseling** — Faith-based emotional/spiritual support
3. **Medical Navigation** — Treatment access & care coordination
4. **Community Education & Outreach** — Barangay lay forums, school HIV lectures, workplace sessions
5. **Mobile Medical Missions** — Medical consultations, medicine distribution, health education, spiritual care (since 2025)
6. **Partnership Events** — Cebu City Health, MHRP, LoveYourself, Cebu Caritas, ASOG Ateneo

---

## 2. Animation Strategy (★ NEW — enhanced from prior plan)

### 2.1 Timeline Line Draw Animation
- **What:** The vertical center line animates drawing from top to bottom as the user scrolls
- **How:** A pseudo-element with `scaleY(0)` → `scaleY(1)` using `transform-origin: top` triggered by IntersectionObserver
- **Timing:** 1.2s ease-out cubic-bezier

### 2.2 Timeline Dot Pulse
- **What:** Each milestone dot on the center line pulses with a radiating ring on reveal
- **How:** CSS `@keyframes pulse-ring` — box-shadow expands and fades, repeated twice on entry
- **Extra:** Dots use `health-red` with a white border ring

### 2.3 Staggered Timeline Cards
- **What:** Left/right cards stagger in with directional slide + fade
- **How:** 
  - Left cards: `.reveal-left` with `transition-delay: calc(var(--card-index) * 120ms)`
  - Right cards: `.reveal-right` with `transition-delay: calc(var(--card-index) * 120ms)`
  - On mobile (single column): all use `.reveal` (fade up)

### 2.4 Year Badge Count-Up
- **What:** The large year number in each milestone badge animates like a counter
- **How:** CSS `@keyframes countUp` — the number scales up from 0.8 to 1 with a subtle bounce, while simultaneously fading in (opacity 0 → 1)
- **Implementation:** Use CSS animation on `.active` class, not JS counter

### 2.5 Service Card 3D Hover
- **What:** Service cards get a subtle 3D perspective tilt on hover
- **How:** CSS `transform: perspective(800px) rotateY(-3deg)` on even cards, `rotateY(3deg)` on odd cards, paired with `translateZ(20px)` on the icon
- **Why:** This is NEW animation not used anywhere else in the project

### 2.6 Gradient Progress Indicator
- **What:** As each milestone enters view, a subtle gradient bar fills horizontally across the card
- **How:** Pseudo-element with `background: linear-gradient(to right, health-red, health-green)` that animates `width: 0% → 100%` on entry (3s duration, subtle)

### 2.7 IntersectionObserver Global Script
- **What:** A single `<script>` in `services.astro` (not in Layout.astro) that handles all timeline-specific animations
- **How:** Uses the existing `.reveal`, `.reveal-left`, `.reveal-right` base classes but adds extra timeline-specific observer logic:
  - Observes `.timeline-track` for line draw
  - Observes each `.milestone-card` for staggered entry
  - Applies CSS custom properties (`--card-index`) for delay calculation
- **Keeps existing global.js code untouched**

---

## 3. Files to Create (ALL NEW — no existing code changed)

| # | File | Purpose |
|---|------|---------|
| 1 | `src/pages/services.astro` | New `/services` page route — hero banner, timeline section, services grid, CTA |
| 2 | `src/data/serviceMilestones.ts` | Milestone data array (separate from `landingData.ts` to avoid touching it) |
| 3 | `src/components/ServiceTimeline.astro` | Vertical timeline component with all animations |
| 4 | `src/components/EnhancedServicesGrid.astro` | Enhanced 6-card services grid (duplicates 4 from TestingInfo + adds 2 new) |

---

## 4. Minimum Changes to Enable Navigation (only these 2 files)

### 4.1 `src/data/landingData.ts`
**What:** Add one new NavItem to the `navItems` array
```ts
export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services & History", href: "/services" },     // ★ NEW
  { label: "Prevention & Tips", href: "/prevention" }
];
```
**Why required:** Without this, there's no way to navigate to the new page. This is a data addition, not a structural code change.

### 4.2 No changes to Navbar.astro or Footer.astro
Both already use `navItems` from `landingData.ts`, so the new link appears automatically in both.

---

## 5. Component Specifications

### 5.1 `ServiceTimeline.astro`

**Structure:**
```
<section id="medical-history">
  <div class="section-header"> ... </div>
  <div class="timeline-container">
    <div class="timeline-track"></div>          <!-- The animated center line -->
    <div class="timeline-items">
      {milestones.map((m, i) => (
        <div class="timeline-item" style="--card-index: {i}">
          <div class="timeline-card timeline-left|timeline-right">
            <div class="year-badge">{m.year}</div>
            <div class="category-icon">...</div>
            <h3>{m.title}</h3>
            <p>{m.description}</p>
          </div>
          <div class="timeline-dot"></div>      <!-- Pulsing dot on center line -->
        </div>
      ))}
    </div>
  </div>
</section>
```

**Key classes for animation:**

| Class | Animation |
|-------|-----------|
| `.timeline-track` | `scaleY(0) → scaleY(1)` line draw on scroll |
| `.timeline-dot` | Pulse-ring animation on reveal (2 cycles) |
| `.timeline-left` | `reveal-left` + gradient bar sweep |
| `.timeline-right` | `reveal-right` + gradient bar sweep |
| `.year-badge` | `scale(0.8 → 1)` count-up effect + fade |
| `.timeline-item:nth-child(odd)` | Left-aligned on desktop |
| `.timeline-item:nth-child(even)` | Right-aligned on desktop |

**Responsive:**
- Desktop (>768px): Alternating left/right cards connected by center line
- Mobile (<768px): Single column, all left-aligned, thinner line, smaller dots

**Category icons mapping:**
- `founding` → `Church` (lucide)
- `chapter` → `MapPin` (lucide)
- `program` → `Heart` (lucide)
- `outreach` → `Users` (lucide)
- `partnership` → `Handshake` (lucide — import from `lucide-astro`)

### 5.2 `EnhancedServicesGrid.astro`

**Structure:**
```
<section id="services-grid">
  <div class="section-header"> ... </div>
  <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    {services.map((s, i) => (
      <div class="service-card-3d" style="--card-index: {i}">
        <div class="icon-container">...</div>
        <h3>{s.title}</h3>
        <span class="since-badge">Since {s.since}</span>
        <p>{s.description}</p>
      </div>
    ))}
  </div>
</section>
```

**Animation:**
- `.service-card-3d` — Staggered reveal with `reveal` + delay based on `--card-index`
- `:hover` — `transform: perspective(800px) rotateY(±3deg)` + icon lifts with `translateZ(20px)`
- Cards enter in rows (left to right per row)

### 5.3 `services.astro`

**Standard page layout (matches about.astro pattern):**
```
Layout
  Navbar
  <main>
    <!-- Hero banner (pt-40 pb-24 bg-health-bg) -->
    <!-- ServiceTimeline component -->
    <!-- EnhancedServicesGrid component -->
    <!-- CTA section (same pattern as prevention page) -->
  </main>
  Footer
```

**Includes its own animation script** (does NOT touch Layout.astro's existing script):
```html
<script>
  // Timeline-specific IntersectionObserver:
  // 1. Observes .timeline-track → adds .active → triggers scaleY(1)
  // 2. Observes each .timeline-item → adds .active → triggers card + dot + badge animations
  // 3. Observes service cards for staggered grid entry
  // 4. Respects prefers-reduced-motion
</script>
```

---

## 6. Complete Animation Implementation Details

### 6.1 CSS to add (inline `<style>` in each component — NOT in global.css)

**Timeline line draw:**
```css
.timeline-track {
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.timeline-track.active {
  transform: scaleY(1);
}
```

**Dot pulse:**
```css
@keyframes pulse-ring {
  0% { box-shadow: 0 0 0 0 rgba(217, 91, 91, 0.5); }
  50% { box-shadow: 0 0 0 12px rgba(217, 91, 91, 0); }
  100% { box-shadow: 0 0 0 0 rgba(217, 91, 91, 0); }
}
.timeline-dot.active {
  animation: pulse-ring 0.8s ease-out 2;
}
```

**Year badge count-up:**
```css
.year-badge {
  transform: scale(0.8);
  opacity: 0;
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.year-badge.active {
  transform: scale(1);
  opacity: 1;
}
```

**Gradient bar sweep:**
```css
.milestone-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 4px;
  width: 0%;
  background: linear-gradient(to right, #D95B5B, #2C5E48);
  border-radius: 4px 4px 0 0;
  transition: width 1.5s ease-out 0.3s;
}
.milestone-card.active::before {
  width: 100%;
}
```

**3D service card hover:**
```css
.service-card-3d {
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease;
}
.service-card-3d:nth-child(odd):hover {
  transform: perspective(800px) rotateY(-3deg) translateY(-4px);
}
.service-card-3d:nth-child(even):hover {
  transform: perspective(800px) rotateY(3deg) translateY(-4px);
}
.service-card-3d .icon-container {
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.service-card-3d:hover .icon-container {
  transform: translateZ(20px) scale(1.1);
}
```

### 6.2 JavaScript (inline `<script>` in services.astro only)

```js
function initTimelineAnimations() {
  const track = document.querySelector('.timeline-track');
  const items = document.querySelectorAll('.timeline-item');
  const dots = document.querySelectorAll('.timeline-dot');
  const badges = document.querySelectorAll('.year-badge');
  const cards = document.querySelectorAll('.milestone-card');
  const services = document.querySelectorAll('.service-card-3d');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        
        // Timeline track draws once
        if (el.classList.contains('timeline-track')) {
          el.classList.add('active');
          return;
        }

        // Staggered card entry
        const index = parseInt(el.style.getPropertyValue('--card-index') || '0');
        setTimeout(() => {
          el.classList.add('active');
          const dot = el.querySelector('.timeline-dot');
          const badge = el.querySelector('.year-badge');
          const card = el.querySelector('.milestone-card');
          if (dot) dot.classList.add('active');
          if (badge) badge.classList.add('active');
          if (card) card.classList.add('active');
        }, index * 120); // 120ms stagger
      }
    });
  }, { root: null, rootMargin: '0px 0px -50px 0px', threshold: 0.15 });

  if (track) observer.observe(track);
  items.forEach(item => observer.observe(item));
  services.forEach(card => observer.observe(card));
}

// Respect reduced motion
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.addEventListener('DOMContentLoaded', initTimelineAnimations);
  document.addEventListener('astro:after-swap', initTimelineAnimations);
}
```

---

## 7. Implementation Steps (order-optimized)

| Step | Action | Details |
|------|--------|---------|
| 1 | **Create** `src/data/serviceMilestones.ts` | Export `ServiceMilestone[]` with all milestones from Section 1 |
| 2 | **Create** `src/components/ServiceTimeline.astro` | Timeline component with inline styles + HTML structure per Section 5.1 |
| 3 | **Create** `src/components/EnhancedServicesGrid.astro` | Services grid with 6 cards + 3D hover animation |
| 4 | **Create** `src/pages/services.astro` | Full page importing both components, hero banner, CTA, and animation script |
| 5 | **Modify** `src/data/landingData.ts` | Add `{ label: "Services & History", href: "/services" }` to `navItems` |
| 6 | **Verify** | `npm run dev` — test page renders, animations fire, nav link works on desktop + mobile |

---

## 8. Files NOT to Touch (preserve existing behavior)

| File | Reason |
|------|--------|
| `src/layouts/Layout.astro` | Global scroll animation script stays unchanged |
| `src/styles/global.css` | All timeline-specific CSS goes in component `<style>` tags |
| `src/components/TestingInfo.astro` | Existing services section on home page stays as-is |
| `src/components/Hero.astro` | Home page hero untouched |
| `src/components/Navbar.astro` | Automatically picks up new navItems |
| `src/components/Footer.astro` | Automatically picks up new navItems |
| `src/pages/index.astro` | Home page layout untouched |
| `src/pages/about.astro` | About page untouched |
| `src/pages/prevention.astro` | Prevention page untouched |
| `tailwind.config.mjs` | No new theme tokens needed |

---

## 9. Animation Summary (all animations in one table)

| Animation Element | Trigger | Duration | Target |
|------------------|---------|----------|--------|
| Timeline line draw | Scroll into view | 1.2s | `.timeline-track` |
| Dot pulse ring | Card becomes active | 0.8s × 2 | `.timeline-dot.active` |
| Year badge count-up | Card becomes active | 0.6s | `.year-badge.active` |
| Card slide + fade | Scroll into view (staggered 120ms) | 0.8s | `.milestone-card.reveal-left/right` |
| Gradient bar sweep | Card becomes active | 1.5s | `.milestone-card::before` |
| Service card 3D tilt | Hover | 0.5s | `.service-card-3d:hover` |
| Icon lift on hover | Hover | 0.5s | `.service-card-3d:hover .icon-container` |
| Staggered grid entry | Scroll into view | 0.8s | `.service-card-3d` (delays by index) |
| respects `prefers-reduced-motion` | N/A | N/A | All animations disabled when set |

---

## 10. Data-Driven Architecture

```ts
// src/data/serviceMilestones.ts

export interface ServiceMilestone {
  year: string;
  title: string;
  description: string;
  category: "founding" | "chapter" | "program" | "outreach" | "partnership";
}

export const serviceMilestones: ServiceMilestone[] = [
  {
    year: "1992",
    title: "PhilCHAN Founded Nationally",
    description: "The Philippine Catholic HIV/AIDS Network (PhilCHAN) was established by the Catholic Bishops' Conference of the Philippines — Episcopal Commission on Healthcare (CBCP-ECHC) as a Church-based response to the growing HIV/AIDS epidemic.",
    category: "founding",
  },
  // ... (one entry per milestone from Section 1 table, ordered chronologically)
];
```

---

## 11. Design References

- **Color palette:** Uses existing `health-red`, `health-green`, `health-white`, `health-bg` — no new colors
- **Card style:** `glass-card` pattern from existing code (`bg-health-white/80 backdrop-blur-xl border border-health-white shadow-card rounded-[2.5rem]`)
- **Typography:** `font-display` (Fraunces) for headings, `font-body` (Public Sans) for body
- **Spacing:** Matches existing section patterns (`section-container`, `max-w-content`, `py-24`)
- **Hover effects:** Extended from existing `hover:-translate-y-2 hover:shadow-2xl` pattern with NEW 3D perspective twists
