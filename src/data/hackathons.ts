export interface Hackathon {
  id: string;
  title: string;
  organizer: string;
  year: string;
  location: string;
  summary: string;
  tags: string[];
  certificateUrl?: string;
  isConfigured?: boolean;
}

export const hackathonsData: Hackathon[] = [
  {
    id: "hackwithhyderabad-2025",
    title: "HackWithHyderabad 2025",
    organizer: "Hosted at Microsoft Office, Hyderabad",
    year: "2025",
    location: "Hyderabad, Telangana",
    summary:
      "Participated in a software innovation hackathon hosted at Microsoft Office, Hyderabad, focusing on collaborative problem-solving and application development.",
    tags: ["Software Innovation", "Application Development", "Collaboration"],
    certificateUrl: "https://drive.google.com/file/d/1pA3KPwHhMMCntHMzUnKExFPs9aYEUgBg/view?usp=sharing",
    isConfigured: false
  },
  {
    id: "agentathon-2025",
    title: "Agentathon 2025",
    organizer: "Google Developer Groups (GDG) Hyderabad",
    year: "2025",
    location: "Hyderabad, Telangana",
    summary:
      "Participated in an agentic AI hackathon, gaining hands-on experience in AI agents, teamwork and rapid prototyping.",
    tags: ["Agentic AI", "AI Agents", "Rapid Prototyping"],
    certificateUrl: "https://drive.google.com/file/d/1b7QD-_Qr5kpEupweO_yr-CLirl0TGOcw/view?usp=sharing",
    isConfigured: false
  },
  {
    id: "nextpreneur-2025",
    title: "Nextpreneur 2025",
    organizer: "Anurag University",
    year: "2025",
    location: "Hyderabad, Telangana",
    summary:
      "Represented Team Rain Shield in an entrepreneurship and innovation challenge, contributing to idea validation and solution design.",
    tags: ["Team Rain Shield", "Solution Design", "Idea Validation"],
    certificateUrl: "https://drive.google.com/file/d/1pvF8aMWKI0onPIVFMGR1ZIU26JTXBuoM/view?usp=sharing",
    isConfigured: false
  }
];

