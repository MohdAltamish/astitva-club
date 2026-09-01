/**
 * Team data — typed JSON.
 * Per agents.md §3: content data lives in /data as typed JSON,
 * never hardcoded directly inside JSX.
 * Roster synchronized with team.md and content.md §4.
 */

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  initials: string;
  category: "Core" | "Department";
  bio?: string;
}

export const coreTeamMembers: TeamMember[] = [
  {
    id: "mohd-altamish",
    name: "Mohd Altamish",
    role: "Owner / President & Technical Head",
    initials: "MA",
    category: "Core",
  },
  {
    id: "amrit-kumar-sharma",
    name: "Amrit Kumar Sharma",
    role: "Vice President / Secretary",
    initials: "AS",
    category: "Core",
  },
  {
    id: "ashwani-mishra",
    name: "Ashwani Mishra",
    role: "PR Head",
    initials: "AM",
    category: "Core",
  },
  {
    id: "anni-rai",
    name: "Anni Rai",
    role: "Social Media Head",
    initials: "AR",
    category: "Core",
  },
  {
    id: "aman-bhati",
    name: "Aman Bhati",
    role: "Management Head",
    initials: "AB",
    category: "Core",
  },
  {
    id: "anjali-keshari",
    name: "Anjali Keshari",
    role: "Design & Media",
    initials: "AK",
    category: "Core",
  },
  {
    id: "ayush-kumar-rai",
    name: "Ayush Kumar Rai",
    role: "Dance & Music",
    initials: "AR",
    category: "Core",
  },
];
