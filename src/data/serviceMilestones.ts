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
  {
    year: "2018",
    title: "Cebu Chapter Established",
    description: "PhilCHAN Cebu chapter was established under Dr. Greta Canoy as Coordinator, providing counseling, support, and HIV advocacy from its base at Tigbao, Talamban, Cebu City.",
    category: "chapter",
  },
  {
    year: "2019",
    title: "Community HIV Testing Center Opens",
    description: "A community-based HIV testing center officially opened in Cebu City on April 27, offering free and confidential testing in a faith-based, compassionate environment.",
    category: "chapter",
  },
  {
    year: "2020",
    title: "COVID-19 Response & Continuity",
    description: "Despite the pandemic, PhilCHAN Cebu continued HIV testing and counseling services, expanding telehealth support to ensure uninterrupted care for the community.",
    category: "program",
  },
  {
    year: "2020",
    title: "Mt. Zion Center Established",
    description: "PhilCHAN Cebu established its permanent community center at Mt. Zion Center, Tigbao, Talamban, becoming a dedicated hub for free HIV testing and pastoral care in Central Visayas.",
    category: "chapter",
  },
  {
    year: "2023",
    title: "Free Testing & Community Education",
    description: "Regular free HIV testing services were launched every Monday to Friday, 9 AM to 5 PM, alongside community education programs to raise awareness and reduce stigma.",
    category: "program",
  },
  {
    year: "2023",
    title: "Partnership with Cebu City Health",
    description: "PhilCHAN Cebu partnered with the Cebu City Health Social Hygiene Clinic for the International AIDS Candlelight Memorial, strengthening collaboration between faith-based and government health services.",
    category: "partnership",
  },
  {
    year: "2024",
    title: "First HIV AIDS Lay Forum",
    description: "The first HIV AIDS Lay Forum was conducted at Barangay Concepcion on November 29, bringing HIV education and awareness directly to the community level.",
    category: "outreach",
  },
  {
    year: "2024",
    title: "School HIV Lecture Series",
    description: "PhilCHAN Cebu organized informative online HIV lectures targeting USC students via Zoom, and expanded school-based education programs across Cebu.",
    category: "outreach",
  },
  {
    year: "2025",
    title: "Mobile Medical Missions",
    description: "PhilCHAN Cebu launched mobile medical missions offering medical consultations, medicine distribution, health education, and spiritual care to underserved communities.",
    category: "outreach",
  },
  {
    year: "2025",
    title: "Advent Recollection & World AIDS Day",
    description: "A meaningful Advent Recollection was held on December 3 in observance of World AIDS Day, combining faith reflection with HIV awareness and community solidarity.",
    category: "program",
  },
  {
    year: "2025",
    title: "MHRP Stakeholder Invitation",
    description: "PhilCHAN Cebu was invited to the U.S. Military HIV Research Program (MHRP) RV670 Stakeholder Meeting, recognizing its role as a key community partner in HIV research and prevention.",
    category: "partnership",
  },
  {
    year: "2025",
    title: "Cebu Caritas Collaboration",
    description: "A formal collaboration with Cebu Caritas Inc. expanded services to include free clinic operations, medical missions, First Aid & CPR training, TB program, and IDU Care Drop-in Center.",
    category: "partnership",
  },
  {
    year: "2025",
    title: "ASOG Strategic Consultation",
    description: "PhilCHAN Cebu participated in the Ateneo School of Government (ASOG) Strategic Religious Engagement consultation, advancing faith-driven development in Central Visayas.",
    category: "partnership",
  },
  {
    year: "Ongoing",
    title: "Barangay Outreach Program",
    description: "Regular barangay-level outreach events bring free HIV testing and education to communities across Cebu, including events at Barangay Kalunasan and other partner barangays.",
    category: "outreach",
  },
  {
    year: "Ongoing",
    title: "Free HIV Testing Every Week",
    description: "Free and confidential HIV testing is available every Monday to Friday, 9 AM to 5 PM, at the PhilCHAN Community Center, Mt. Zion Center, Tigbao, Talamban, Cebu City.",
    category: "program",
  },
];
