/**
 * landingData.ts
 * Single source of truth for content that drives multiple components.
 * Keeping this separate from markup means non-developers (or a future
 * CMS integration) can update copy without touching .astro files.
 */

// ---------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------
export interface NavItem {
  label: string;
  href: string; // in-page anchor, matches section id
}

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services & History", href: "/services" },
  { label: "Prevention & Tips", href: "/prevention" }
];

// ---------------------------------------------------------------------
// Leadership profiles
// ---------------------------------------------------------------------
export interface LeaderProfile {
  id: string;
  name: string;
  title: string;
  credentials?: string[]; // e.g. ["MD", "FPOGS"]
  bio: string;
  /** Path relative to src/assets/images/profiles — resolved via astro:assets */
  imagePath?: string;
  order: number; // for org chart / listing order
}

export const leadershipProfiles: LeaderProfile[] = [
  {
    id: "fr-rodolfo",
    name: "Rev. Fr. Rodolfo V. Cancino Jr., MI",
    title: "President, PhilCHAN",
    credentials: ["MI", "Doctor of Medicine (UP)"],
    bio: "Executive Secretary, CBCP Episcopal Commission on Healthcare (CBCP-ECHC) & Vicar Provincial, Ministers of the Infirm (Camillians).",
    imagePath: "profiles/fr-rodolfo.jpg",
    order: 1,
  },
  {
    id: "dr-greta",
    name: "Greta U. Canoy, MD, FPOGS",
    title: "Community Center Head & Coordinator",
    credentials: ["MD", "FPOGS", "Fellow, Obstetrics & Gynecology"],
    bio: "Graduate of Cebu Institute of Medicine with Residency at Perpetual Succour Hospital. Leads clinical coordination and community health services for PhilCHAN Cebu.",
    imagePath: "profiles/dr-greta.jpg",
    order: 2,
  },
];

// ---------------------------------------------------------------------
// Organizational chart
// ---------------------------------------------------------------------
export interface OrgNode {
  id: string; // matches LeaderProfile.id where applicable
  label: string;
  reportsTo?: string; // id of parent node; omit for top level
}

export const orgChart: OrgNode[] = [
  {
    id: "fr-rodolfo",
    label: "Rev. Fr. Rodolfo V. Cancino Jr., MI (President)",
  },
  {
    id: "dr-greta",
    label: "Greta U. Canoy, MD, FPOGS (Coordinator / Head)",
    reportsTo: "fr-rodolfo",
  },
  {
    id: "admin-finance",
    label: "Dan Savin B. Miranda, RN, MAN, MSN (Admin & Finance Officer)",
    reportsTo: "dr-greta",
  },
  {
    id: "community-mobilizing",
    label: "Nelle B. Prado (Community Mobilizing Officer)",
    reportsTo: "admin-finance",
  },
  {
    id: "corporate-sec",
    label: "Carmela Mathieu (Corporate Secretary)",
    reportsTo: "dr-greta",
  },
];

// ---------------------------------------------------------------------
// Testing center details
// ---------------------------------------------------------------------
export interface ContactNumber {
  label: string; // e.g. "Cellphone", "Hotline"
  number: string;
  href: string; // tel: link
}

export interface TestingCenterInfo {
  name: string;
  addressLines: string[];
  hours: { day: string; time: string }[];
  contactNumbers: ContactNumber[];
  email: string;
  mapEmbedSrc: string; // Google Maps embed URL
  mapDirectionsUrl: string; // "Get Directions" link
  highlights: string[];
}

export const testingCenter: TestingCenterInfo = {
  name: "PhilCHAN Community Center",
  addressLines: ["Mt. Zion Center, Tigbao", "Talamban, Cebu City, Philippines"],
  hours: [
    { day: "Monday – Friday", time: "9:00 AM – 5:00 PM" },
    { day: "Saturday & Sunday", time: "Closed" },
  ],
  contactNumbers: [
    {
      label: "Cellphone / Hotline",
      number: "0966 910 9662",
      href: "tel:+639669109662",
    },
  ],
  email: "philchancebu@gmail.com", // Update with official email if different
  mapEmbedSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15699.28255554747!2d123.905!3d10.36!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDIxJzM2LjAiTiAxMjPCsDU0JzE4LjAiRQ!5e0!3m2!1sen!2sph!4v1700000000000",
  mapDirectionsUrl:
    "https://maps.google.com/?q=Mt.+Zion+Center+Tigbao+Talamban+Cebu+City",
  highlights: [
    "FREE & Confidential HIV Testing",
    "Faith-based, compassionate, and non-judgmental environment",
    "Professional medical & pastoral support team",
    "Convenient location at Mt. Zion Center, Talamban",
  ],
};

// ---------------------------------------------------------------------
// Prevention & Tips
// ---------------------------------------------------------------------
export interface PreventionTip {
  title: string;
  description: string;
  icon: string;
}

export const preventionTips: PreventionTip[] = [
  {
    title: "Get Tested Regularly",
    description: "Knowing your status is the most important step. If you are sexually active, routine HIV testing helps you stay healthy and protects your partners. Testing at our center is completely free and confidential.",
    icon: "Stethoscope"
  },
  {
    title: "Use Condoms Effectively",
    description: "Consistent and correct use of condoms during sex provides a highly effective barrier against HIV and other sexually transmitted infections.",
    icon: "Shield"
  },
  {
    title: "Consider PrEP",
    description: "Pre-Exposure Prophylaxis (PrEP) is a daily medicine that can significantly reduce your chance of getting HIV. Ask our counselors if PrEP is right for you.",
    icon: "Pill"
  },
  {
    title: "Limit Your Number of Sexual Partners",
    description: "Having fewer sexual partners decreases your chances of having a partner who is infected with HIV or whose HIV is not virally suppressed.",
    icon: "Users"
  },
  {
    title: "Never Share Needles",
    description: "If you inject drugs, never share your needles, syringes, or other equipment. HIV can live in a used needle up to 42 days depending on temperature and other factors.",
    icon: "Activity"
  }
];
