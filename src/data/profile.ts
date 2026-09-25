export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  isPlaceholder?: boolean;
}

export interface ProfileData {
  name: string;
  firstName: string;
  lastName: string;
  initials: string;
  role: string;
  secondaryRole: string;
  tagline: string;
  heroDescription: string;
  location: string;
  email: string;
  phone: string;
  phoneDisplay: string;
  avatarUrl: string;
  // Configurable URLs - Set your real links here
  linkedInUrl: string;
  githubUrl: string;
  resumeUrl: string;
  isLinkedInConfigured: boolean;
  isGitHubConfigured: boolean;
  terminalDetails: {
    whoami: string;
    focus: string[];
    currentWork: string;
    stack: string[];
  };
}

export const profileData: ProfileData = {
  name: "Arjunbabu Saila",
  firstName: "Arjunbabu",
  lastName: "Saila",
  initials: "AS",
  avatarUrl: "/profile.jpg",
  role: "Software Engineer | AI Engineering",
  secondaryRole: "Cybersecurity Professional | Developer",
  tagline: "I build practical, secure and AI-powered software systems.",
  heroDescription:
    "Building AI-powered applications, full-stack systems, and security-focused solutions with a focus on practical, scalable and user-centric software.",
  location: "Hyderabad, Telangana, India",
  email: "sailaarjunbabu@gmail.com",
  phone: "7416844792",
  phoneDisplay: "+91 7416844792",

  // NOTE FOR USER: Update these placeholders with your actual profile links.
  linkedInUrl: "https://www.linkedin.com/in/arjunbabu-saila-84a895379",
  githubUrl: "https://github.com/arjun042-stack",
  resumeUrl: "/Arjunbabu_Saila_Resume.pdf",

  // Set to true once you have updated the URLs above
  isLinkedInConfigured: true,
  isGitHubConfigured: true,

  terminalDetails: {
    whoami: "Arjunbabu Saila",
    focus: [
      "Software Engineering",
      "AI Engineering",
      "Cybersecurity"
    ],
    currentWork: "Building practical software.",
    stack: [
      "React",
      "TypeScript",
      "Node.js",
      "Python",
      "Gemini AI",
      "SIEM / Wazuh"
    ]
  }
};
