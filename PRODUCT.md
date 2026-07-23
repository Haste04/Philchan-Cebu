# PRODUCT.md

# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Local community in Cebu seeking HIV testing, health services, or counseling. Secondary users include potential partner organizations, volunteers, and donors interacting with the Philippine Catholic HIV/AIDS Network Inc.

## Product Purpose
A multi-page website for the Philippine Catholic HIV/AIDS Network Inc. (Cebu chapter) to provide information about their mission, vision, leadership, and critical HIV testing and prevention information in a faith-based, trustworthy environment.

## Positioning
A warm, modern community hospital that approaches HIV/AIDS testing and awareness with dignity, hope, and approachability.

## Operating Context
Users may be accessing the site privately seeking sensitive health information (HIV testing locations/info). The organization operates within a Catholic context, meaning it balances public health outreach with faith-based values.

## Capabilities and Constraints
The site is built with Astro and Tailwind CSS. It must be highly performant (Core Web Vitals optimized, zero-JS navigation, self-hosted fonts) and accessible.

## Brand Commitments
The brand must feel trustworthy, warm, and distinctly like a modern, reassuring medical space (not sterile).
Specific design constraints from the brief:
- **Colors:** Softened Red, Green, and White theme to denote a cozy community clinic.
  - health-green (#2C5E48) for primary brand, headings, and calming trust.
  - health-red (#D95B5B - coral/rose) for primary actions and awareness.
  - health-white (#FCFBF9 - alabaster) and health-bg (#F2F4F0) for resting sections.
  - health-text (#2D3732) for body copy.
- **Typography:** Fraunces (serif) for headings, Public Sans for body copy.
- **Imagery:** Photo-heavy layouts to feature doctors, patients, and clean, welcoming environments.
- **Avoid:** Generic "cream + terracotta", gamification, or harsh stark-white hospital aesthetics.

## Evidence on Hand
- README contains full architectural choices and Core Web Vitals checklists.
- Leadership headshots and logos (PhilCHAN, diocese/partner logos) are structured in src/assets/images.
- landingData.ts serves as the single source of truth for content.

## Product Principles
1. **Warm Community Hospital:** Use soft rounding, deep tactile shadows, and friendly colors to feel like a modern, inviting community care center.
2. **Accessible and Performant:** Information must load instantly and be readable for all users on any device.
3. **Intentional Reassurance:** Leverage large, optimistic photography to build immediate trust and lower anxiety around testing.

## Accessibility & Inclusion
Must use semantic HTML, accessible icons (Lucide), and Core Web Vitals-compliant strategies. All images must prevent layout shift (CLS).
