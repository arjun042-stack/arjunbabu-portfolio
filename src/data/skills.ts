export interface SkillCategory {
  id: string;
  name: string;
  shortDescription: string;
  icon: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "programming",
    name: "Programming & Scripting",
    shortDescription: "Core languages for systems, scripting, and backend development",
    icon: "Code2",
    skills: ["Java", "Python", "JavaScript", "TypeScript", "SQL", "Bash"]
  },
  {
    id: "web-dev",
    name: "Web & Application Development",
    shortDescription: "Modern full-stack technologies, frameworks, and APIs",
    icon: "Layout",
    skills: [
      "React",
      "JavaScript",
      "TypeScript",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Vite",
      "Node.js",
      "Express.js",
      "Spring Boot",
      "REST APIs",
      "Firebase"
    ]
  },
  {
    id: "ai-ml",
    name: "AI & Machine Learning",
    shortDescription: "GenAI integrations, applied ML algorithms, and data modeling",
    icon: "Brain",
    skills: [
      "Generative AI",
      "Gemini API",
      "AI-Powered Application Development",
      "Machine Learning",
      "Random Forest",
      "Feature Engineering",
      "Scikit-Learn",
      "Pandas"
    ]
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity & Defense",
    shortDescription: "Security assessment, defensive operations, and threat analysis",
    icon: "Shield",
    skills: [
      "Ethical Hacking",
      "Penetration Testing",
      "Vulnerability Assessment",
      "Digital Forensics",
      "Mobile Forensics",
      "Web Application Security",
      "API Security",
      "Cyber Law",
      "Security Testing",
      "SOC Operations",
      "Incident Response"
    ]
  },
  {
    id: "security-tools",
    name: "Security Tools & SIEM",
    shortDescription: "Industry-standard diagnostic, scanning, and monitoring toolsets",
    icon: "TerminalSquare",
    skills: [
      "Burp Suite",
      "Nmap",
      "Wireshark",
      "Metasploit",
      "Nikto",
      "Nessus",
      "OpenVAS",
      "TCPDump",
      "Mimikatz",
      "Kali Linux",
      "Wazuh",
      "Elasticsearch"
    ]
  },
  {
    id: "systems-devops",
    name: "Systems, DevOps & Tools",
    shortDescription: "Operating environments, containerization, and workflows",
    icon: "Server",
    skills: [
      "Git",
      "GitHub",
      "Linux",
      "Windows",
      "Postman",
      "Docker",
      "Firebase"
    ]
  },
  {
    id: "practices",
    name: "Development Practices",
    shortDescription: "Engineering discipline, testing, and system architecture",
    icon: "Cpu",
    skills: [
      "Object-Oriented Programming",
      "Data Structures & Algorithms",
      "API Integration",
      "Debugging",
      "Testing",
      "Version Control"
    ]
  }
];
