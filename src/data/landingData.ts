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
  { label: "Prevention & Tips", href: "/prevention" },
  { label: "Music", href: "/music" },
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
    { day: "Monday – Friday", time: "8:00 AM – 5:00 PM" },
    { day: "Saturday & Sunday", time: "Closed" },
  ],
  contactNumbers: [
    {
      label: "Cellphone / Hotline",
      number: "0966 910 9662",
      href: "tel:+639669109662",
    },
  ],
  email: "philchan2013.cebu@gmail.com", // Update with official email if different
  mapEmbedSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3925.074351234057!2d123.9174893!3d10.3730374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a9a2778bcaa3ab%3A0x47b8a41d6c4b6e4e!2sMt.%20Zion%20Maternity%20Home!5e0!3m2!1sen!2sph!4v1722010000000!5m2!1sen!2sph",
  mapDirectionsUrl:
    "https://www.google.com/maps/place/Mt.+Zion+Maternity+Home/@10.3730374,123.9174893,17z",
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
    description:
      "Knowing your status is the most important step. If you are sexually active, routine HIV testing helps you stay healthy and protects your partners. Testing at our center is completely free and confidential.",
    icon: "Stethoscope",
  },
  {
    title: "Abstinence",
    description:
      "Refraining from sexual activity is the most effective way to eliminate the risk of acquiring or transmitting HIV and other sexually transmitted infections.",
    icon: "Shield",
  },
  {
    title: "Be Faithful",
    description:
      "Maintaining a mutually faithful, long-term relationship with an uninfected partner significantly reduces your risk of exposure to HIV.",
    icon: "Heart",
  },
  {
    title: "Conscience & Correct Choice",
    description:
      "Making informed, responsible decisions based on solid values and moral awareness empowers individuals to safeguard their health and dignity.",
    icon: "Brain",
  },
  {
    title: "Don't Use Drugs",
    description:
      "Avoiding illicit substance use protects you from high-risk behaviors and eliminates the severe danger of HIV transmission through shared needles or syringes.",
    icon: "Activity",
  },
  {
    title: "Education",
    description:
      "Continuous learning and raising awareness about HIV transmission, care, and prevention dispel myths and foster supportive, compassionate communities.",
    icon: "BookOpen",
  },
];
