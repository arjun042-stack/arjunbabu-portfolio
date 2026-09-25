export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  startDate: string;
  endDate: string;
  type: string;
  summary: string;
  highlights: string[];
}

export const experiencesData: Experience[] = [
  {
    id: "sccl-it-trainee",
    role: "Industrial Trainee – IT Department",
    company: "Singareni Collieries Company Limited (SCCL)",
    location: "Godavarikhani, Telangana",
    period: "Dec 2023 – May 2024",
    startDate: "Dec 2023",
    endDate: "May 2024",
    type: "Industrial Training",
    summary:
      "Completed 6-month industrial training in the IT department, gaining exposure to enterprise systems, networking, and SAP-based data workflows.",
    highlights: [
      "Gained hands-on operational exposure within an enterprise IT infrastructure environment.",
      "Observed and assisted with enterprise networking systems and network troubleshooting.",
      "Understood enterprise data workflows and operations centered around SAP enterprise systems."
    ]
  }
];
