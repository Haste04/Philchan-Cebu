# Plan: Add Services History / Medical History Page to PhilCHAN Cebu

## Overview

Add a **Services & Timeline** page (`/services`) that chronicles PhilCHAN Cebu's history of service — from its national founding under CBCP-ECHC in 1992, through the establishment of the Cebu chapter, to present-day community health milestones. This gives visitors a compelling narrative arc and serves as a living document for future updates.

---

## 1. What to Add

### New page: `/services`
A full-page layout matching the existing `about.astro` / `prevention.astro` style (hero header + scroll-animated sections).

**Sections on the page:**

#### a) Hero Banner
- Title: *Our Services & History*
- Subtitle: "Faith in action — decades of compassionate care for Central Visayas."
- Consistent with existing hero pattern (`pt-40 pb-24 bg-health-bg overflow-hidden`)

#### b) Timeline — Milestones
A vertical timeline component showing key moments in PhilCHAN's journey. The timeline is the **centerpiece** of the page.

Data-driven from `landingData.ts` (new export: `serviceMilestones`). Each milestone:

```ts
interface ServiceMilestone {
  year: string;        // e.g. "1992", "2019", "2024"
  title: string;
  description: string;
  category: "founding" | "chapter" | "program" | "outreach" | "partnership";
}
```

**Suggested milestones (research-backed):**

| Year | Milestone | Category |
|------|-----------|----------|
| 1992 | PhilCHAN founded nationally by CBCP-ECHC as the Philippine Catholic HIV/AIDS Network | founding |
| 2019 | Community-based HIV testing center opens in Cebu City (April 27) | chapter |
| 2020 | Testing & outreach continued through COVID-19 pandemic; expanded counseling services | program |
| 2020s | PhilCHAN Cebu chapter established at Mt. Zion Center, Tigbao, Talamban | chapter |
| 2023+ | Free HIV testing, pastoral care, and community education programs launched | program |
| 2023+ | Partnership with Cebu City Health Social Hygiene Clinic for International AIDS Candlelight Memorial | partnership |
| 2024 | First HIV AIDS Lay Forum conducted at Brgy. Concepcion (Nov 29) | outreach |
| 2025+ | Invited to U.S. Military HIV Research Program (MHRP) RV670 Stakeholder Meeting | partnership |
| Ongoing | Free & confidential HIV testing Mon-Fri 9AM-5PM at community center | program |

> **Note:** Exact dates should be confirmed with PhilCHAN Cebu leadership. These are sourced from public Facebook posts and news articles.

#### c) Services Grid (expanded from current TestingInfo)
A refreshed "Our Services" section matching the existing 2x2 card grid style but with **expanded service descriptions**:

1. **Confidential HIV Testing** — Rapid, free testing with professional medical staff
2. **Pastoral Care & Counseling** — Faith-based emotional and spiritual support
3. **Medical Navigation** — Treatment access and care coordination 
4. **Community Education & Outreach** — Barangay-level lay forums, school talks, workplace sessions
5. **HIV/AIDS Lay Forums** — Community education sessions (e.g., Brgy. Concepcion Nov 2024)
6. **Partnership Events** — Collaborations with City Health, MHRP, LoveYourself, and other orgs

Each service card gets a "featured since" or "launched" date badge.

#### d) Call-to-Action
Same CTA pattern as the prevention page — "Need more information?" section linking to the testing center location.

---

## 2. Files to Create

| File | Purpose |
|------|---------|
| `src/pages/services.astro` | New `/services` page route |
| `src/data/serviceTimelineData.ts` | Milestone data (keep separate from `landingData.ts`) |
| `src/components/ServiceTimeline.astro` | Vertical timeline component |
| `src/components/ServicesGrid.astro` | Expanded services grid component (enhances existing TestingInfo) |

## 3. Files to Modify

| File | Change |
|------|--------|
| `src/data/landingData.ts` | Add `serviceMilestones` export array to the data file (or create separate file) |
| `src/components/Navbar.astro` | Add "Services & History" nav link between "About Us" and "Prevention & Tips" |
| `src/components/Footer.astro` | Quick Links navItems already use `navItems` array — update it |

### `landingData.ts` — navItems change:
```ts
export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services & History", href: "/services" },
  { label: "Prevention & Tips", href: "/prevention" }
];
```

---

## 4. Design Approach

### Timeline Component (`ServiceTimeline.astro`)
- **Style:** Vertical alternating timeline with a central line (like Timeline.js but hand-rolled with Tailwind)
- **Desktop:** Left/right alternating cards with year badges on the center line
- **Mobile:** Single-column layout with year badges left-aligned
- **Colors:** 
  - Line: `health-red` (the brand accent color)
  - Year badges: `health-green` background
  - Category icons: Lucide icons (`Church` for founding, `Heart` for program, `Users` for outreach, `Handshake` for partnership)
- **Animation:** Scroll-reveal using existing `.reveal-left` / `.reveal-right` classes
- **Card style:** `glass-card` (same as existing components — `bg-health-white/80 backdrop-blur-xl border border-health-white shadow-card rounded-[2.5rem]`)

### Services Grid
- Reuse the 2x2 grid pattern from `TestingInfo.astro` (`grid md:grid-cols-2 gap-6 lg:gap-8`)
- Each card: icon + title + description + optional "Since [year]" tag
- Same hover effects (`hover:-translate-y-2 hover:shadow-2xl`)

---

## 5. Implementation Steps

1. **Create** `src/data/serviceTimelineData.ts` with the milestones array
2. **Create** `src/components/ServiceTimeline.astro` — timeline rendering
3. **Create** `src/components/ServicesGrid.astro` — expanded services (6 cards)
4. **Create** `src/pages/services.astro` — full page layout importing both components
5. **Modify** `src/data/landingData.ts` — add "Services & History" to `navItems`
6. **Rebuild** / test `npm run dev` to verify

---

## 6. Future Considerations

- **CMS integration:** The data file (`serviceTimelineData.ts`) is easy to hand-edit for non-developers to add new milestones
- **Facebook integration:** Could embed a Facebook feed widget for the latest events
- **Photo gallery:** Each milestone could link to a Facebook photo album for richer storytelling
- **Partners section:** Add a dedicated partners/affiliates grid (CBCP-ECHC, City Health, LoveYourself, MHRP)

---

## 7. Facebook Content to Harvest

Since the Facebook page is behind a login wall, the following activities were identified via public posts/search snippets. These should be verified and expanded by someone with Facebook access:

- International AIDS Candlelight Memorial (with Cebu City Health Social Hygiene Clinic)
- HIV AIDS Lay Forum at Brgy. Concepcion (Nov 29, 2024)
- U.S. Military HIV Research Program (MHRP) RV670 Stakeholder Meeting invitation
- Free HIV testing events at Mt. Zion Center
- Partnership with LoveYourself for community screening events
- Ongoing education and outreach programs

**Recommended:** A volunteer or staff member should extract the full timeline from the Facebook page's posts and send it as a structured list, then we populate `serviceTimelineData.ts`.
