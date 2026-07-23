const { readFileSync, writeFileSync } = require('fs');

let content = readFileSync('src/data/landingData.ts', 'utf-8');
content = content.replace(
  /export const navItems: NavItem\[\] = \[.*?\];/s,
  export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Prevention & Tips", href: "/prevention" },
];
);

// We also need prevention data
const preventionData = 
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
;

content = content + preventionData;
writeFileSync('src/data/landingData.ts', content);
