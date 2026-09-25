export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  period: string;
  status: "In Progress" | "Completed";
  description?: string;
}

export const educationData: Education[] = [
  {
    id: "btech-cmr",
    institution: "CMR College of Engineering and Technology",
    degree: "B.Tech in CSE (Cyber Security)",
    field: "Computer Science & Engineering (Cyber Security)",
    location: "Hyderabad, Telangana",
    period: "Aug 2024 – Present",
    status: "In Progress",
    description:
      "Core focus on computer systems, cybersecurity fundamentals, networks, and software engineering methodologies."
  },
  {
    id: "diploma-scpc",
    institution: "Singareni Collieries Polytechnic College",
    degree: "Diploma in Computer Science",
    field: "Computer Science and Engineering",
    location: "Mancherial, Telangana",
    period: "Sep 2021 – Jul 2024",
    status: "Completed",
    description:
      "Built rigorous foundational programming, computing logic, operating systems, and database management principles."
  }
];
