export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  summary: string;
  detailedDescription?: string;
  technologies: string[];
  keyFeatures: string[];
  githubUrl: string;
  demoUrl?: string;
  isFeatured?: boolean;
  highlightType?: "siem" | "doc-ai" | "phishing-trap";
}

export const projectsData: Project[] = [
  {
    id: "cybershield-siem",
    number: "01",
    title: "CyberShield SIEM AI Assistant",
    category: "AI | Cybersecurity | Full Stack | SIEM",
    summary:
      "An AI-powered SIEM platform integrating Wazuh, Elasticsearch and Gemini AI for threat hunting, incident investigation, incident response and SOC automation.",
    detailedDescription:
      "Developed a web-based security platform to analyze security events and streamline security operations through an AI-assisted interface. Connects raw telemetry from Wazuh agents and Elasticsearch logs with Gemini AI reasoning to empower SOC teams with automated alert triage and contextual remediation guidance.",
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "Wazuh",
      "Elasticsearch",
      "Gemini AI"
    ],
    keyFeatures: [
      "AI-assisted security investigation",
      "SIEM integration (Wazuh & Elasticsearch)",
      "Threat hunting & IOC correlation",
      "Incident investigation & triage",
      "Automated incident response playbooks",
      "SOC operations automation",
      "Real-time security event analysis"
    ],
    // Placeholders - replace with your repository and demo links
    githubUrl: "https://github.com/arjunbabu-saila/cybershield-siem-ai",
    demoUrl: "https://cybershield-demo.vercel.app",
    isFeatured: true,
    highlightType: "siem"
  },
  {
    id: "ai-docs-platform",
    number: "02",
    title: "AI Documentation Automation Platform",
    category: "AI | Full Stack | Developer Tools",
    summary:
      "An AI-powered web application that automates technical documentation generation from project and code inputs.",
    detailedDescription:
      "Built using React, TypeScript, Node.js, Express and Gemini API to automate documentation workflows. Parses repository architecture, code files, and schema declarations to produce structured, production-ready developer manuals and API specifications.",
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "Gemini API"
    ],
    keyFeatures: [
      "AI-powered documentation engine",
      "Project & code input processing",
      "Automated documentation generation",
      "Clean web-based interface",
      "Gemini API integration & prompt pipelines"
    ],
    // Placeholders - replace with your repository and demo links
    githubUrl: "https://github.com/arjunbabu-saila/ai-doc-automation",
    demoUrl: "https://ai-docs-demo.vercel.app",
    isFeatured: true,
    highlightType: "doc-ai"
  },
  {
    id: "hybrid-phishing-trap",
    number: "03",
    title: "Hybrid Phishing URL-Trap",
    category: "Cybersecurity | Machine Learning | Honeypots",
    summary:
      "A machine-learning-based phishing detection system using Random Forest and honeypots for real-time threat detection and attacker behavior analysis.",
    detailedDescription:
      "Engineered an automated phishing defense system combining ML lexical feature extraction with deceptive honeypot traps. Analyzes incoming URL structures with Random Forest classification while gathering forensic telemetry on threat actors in isolated honeypot environments.",
    technologies: [
      "Python",
      "Machine Learning",
      "Random Forest",
      "Honeypots"
    ],
    keyFeatures: [
      "Phishing URL detection",
      "Machine learning classification",
      "Random Forest model architecture",
      "Honeypot trap integration",
      "Real-time threat detection",
      "Attacker behavior analysis & logging"
    ],
    // Placeholders - replace with your repository and demo links
    githubUrl: "https://github.com/arjunbabu-saila/hybrid-phishing-trap",
    demoUrl: "https://phishing-trap-demo.vercel.app",
    isFeatured: true,
    highlightType: "phishing-trap"
  }
];
