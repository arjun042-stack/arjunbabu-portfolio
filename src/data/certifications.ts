export interface Certification {
  id: string;
  organization: string;
  title: string;
  category: "Cybersecurity" | "AI" | "Simulation";
  // Configurable URL placeholder
  credentialUrl: string;
  isConfigured: boolean;
}

export const certificationsData: Certification[] = [
  {
    id: "deloitte-cyber",
    organization: "Deloitte",
    title: "Cyber Job Simulation",
    category: "Simulation",
    credentialUrl: "https://drive.google.com/file/d/1EEjsF-AavkkRoF4W8YSndS_xHF-tAgA_/view?usp=sharing",
    isConfigured: true
  },
  {
    id: "tata-cyber-analyst",
    organization: "Tata Forage",
    title: "Cybersecurity Analyst Job Simulation",
    category: "Simulation",
    credentialUrl: "https://drive.google.com/file/d/1fm5kyardCQJieAyWCi_xlr7-Q9FIV9Fy/view?usp=sharing",
    isConfigured: true
  },
  {
    id: "cisco-modern-ai",
    organization: "Cisco",
    title: "Introduction to Modern AI",
    category: "AI",
    credentialUrl: "https://drive.google.com/file/d/111DArwOCqrut9C04jMWl7TAgYWz8AOyd/view?usp=sharing",
    isConfigured: true
  },
  {
    id: "cisco-jr-analyst",
    organization: "Cisco",
    title: "Junior Cybersecurity Analyst",
    category: "Cybersecurity",
    credentialUrl: "https://drive.google.com/file/d/1JXPK257MuZV0sWlg4HXIlOR6uTqK5eVR/view?usp=sharing",
    isConfigured: true
  },
  {
    id: "cisco-ethical-hacker",
    organization: "Cisco",
    title: "Ethical Hacker",
    category: "Cybersecurity",
    credentialUrl: "https://drive.google.com/file/d/1k9_NRBK6iH2mIyVDHwN0qOEH5qodbLOj/view?usp=sharing",
    isConfigured: true
  }
];
