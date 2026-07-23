import { readFileSync, writeFileSync } from 'fs';

let content = readFileSync('src/data/landingData.ts', 'utf-8');
content = content.replace(
  /export const navItems: NavItem\[\] = \[.*?\];/s,
  'export const navItems: NavItem[] = [\n  { label: "Home", href: "/" },\n  { label: "About Us", href: "/about" },\n  { label: "Prevention & Tips", href: "/prevention" }\n];'
);

const preventionData = '\n// ---------------------------------------------------------------------\n// Prevention & Tips\n// ---------------------------------------------------------------------\nexport interface PreventionTip {\n  title: string;\n  description: string;\n  icon: string;\n}\n\nexport const preventionTips: PreventionTip[] = [\n  {\n    title: "Get Tested Regularly",\n    description: "Knowing your status is the most important step. If you are sexually active, routine HIV testing helps you stay healthy and protects your partners. Testing at our center is completely free and confidential.",\n    icon: "Stethoscope"\n  },\n  {\n    title: "Use Condoms Effectively",\n    description: "Consistent and correct use of condoms during sex provides a highly effective barrier against HIV and other sexually transmitted infections.",\n    icon: "Shield"\n  },\n  {\n    title: "Consider PrEP",\n    description: "Pre-Exposure Prophylaxis (PrEP) is a daily medicine that can significantly reduce your chance of getting HIV. Ask our counselors if PrEP is right for you.",\n    icon: "Pill"\n  },\n  {\n    title: "Limit Your Number of Sexual Partners",\n    description: "Having fewer sexual partners decreases your chances of having a partner who is infected with HIV or whose HIV is not virally suppressed.",\n    icon: "Users"\n  },\n  {\n    title: "Never Share Needles",\n    description: "If you inject drugs, never share your needles, syringes, or other equipment. HIV can live in a used needle up to 42 days depending on temperature and other factors.",\n    icon: "Activity"\n  }\n];\n';

content = content + preventionData;
writeFileSync('src/data/landingData.ts', content);
