/**
 * Team data — typed JSON.
 * Synchronized with team.md and content.md §4.
 */

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  initials: string;
  category: "Core" | "Department";
  department?: "Leadership" | "Technology" | "Creative" | "Management" | "Cultural";
  bio?: string;
  photoUrl?: string;
}

export interface DepartmentInfo {
  id: string;
  code: string;
  tag: string;
  name: string;
  accentColor: string;
  glowColor: string;
  borderColor: string;
  description: string;
  iconType: "compass" | "terminal" | "camera" | "network" | "music";
}

export const departments: DepartmentInfo[] = [
  {
    id: "all",
    code: "TEAM 01",
    tag: "LEADERSHIP",
    name: "Core Leadership",
    accentColor: "from-amber-500/20 via-gold-mid/10 to-transparent",
    glowColor: "rgba(212,175,55,0.25)",
    borderColor: "border-gold-mid/40 hover:border-gold-mid",
    description: "Guiding the vision and steering the ASTITVA community.",
    iconType: "compass",
  },
  {
    id: "tech",
    code: "TEAM 02",
    tag: "TECHNOLOGY",
    name: "Tech & Systems",
    accentColor: "from-cyan-500/20 via-blue-500/10 to-transparent",
    glowColor: "rgba(6,182,212,0.25)",
    borderColor: "border-cyan-500/40 hover:border-cyan-400",
    description: "Building the web platform, digital tools, and technical infrastructure.",
    iconType: "terminal",
  },
  {
    id: "creative",
    code: "TEAM 03",
    tag: "CREATIVE",
    name: "Design & Media",
    accentColor: "from-purple-500/20 via-pink-500/10 to-transparent",
    glowColor: "rgba(168,85,247,0.25)",
    borderColor: "border-purple-500/40 hover:border-purple-400",
    description: "Brand identity, creative direction, visuals, and digital stories.",
    iconType: "camera",
  },
  {
    id: "management",
    code: "TEAM 04",
    tag: "OPERATIONS",
    name: "PR & Management",
    accentColor: "from-amber-600/20 via-orange-500/10 to-transparent",
    glowColor: "rgba(245,158,11,0.25)",
    borderColor: "border-amber-500/40 hover:border-amber-400",
    description: "Campus outreach, public relations, and event logistics.",
    iconType: "network",
  },
  {
    id: "cultural",
    code: "TEAM 05",
    tag: "EXPRESSION",
    name: "Cultural & Arts",
    accentColor: "from-rose-500/20 via-red-500/10 to-transparent",
    glowColor: "rgba(244,63,94,0.25)",
    borderColor: "border-rose-500/40 hover:border-rose-400",
    description: "Dance, music, jam sessions, and performing arts showcases.",
    iconType: "music",
  },
];

export const coreTeamMembers: TeamMember[] = [
  {
    id: "mohd-altamish",
    name: "Mohd Altamish",
    role: "Owner / President & Technical Head",
    initials: "MA",
    category: "Core",
    department: "Leadership",
    bio: "Leading technological vision and building the ASTITVA ecosystem.",
  },
  {
    id: "amrit-kumar-sharma",
    name: "Amrit Kumar Sharma",
    role: "Vice President / Secretary",
    initials: "AS",
    category: "Core",
    department: "Leadership",
    bio: "Orchestrating community initiatives and institutional growth.",
  },
  {
    id: "ashwani-mishra",
    name: "Ashwani Mishra",
    role: "PR Head",
    initials: "AM",
    category: "Core",
    department: "Management",
    bio: "Connecting freshers across campus and leading public relations.",
  },
  {
    id: "anni-rai",
    name: "Anni Rai",
    role: "Social Media Head",
    initials: "AR",
    category: "Core",
    department: "Creative",
    bio: "Crafting digital presence, engagement, and social media campaigns.",
  },
  {
    id: "aman-bhati",
    name: "Aman Bhati",
    role: "Management Head",
    initials: "AB",
    category: "Core",
    department: "Management",
    bio: "Managing on-ground operations, event flow, and team logistics.",
  },
  {
    id: "anjali-keshari",
    name: "Anjali Keshari",
    role: "Design & Media",
    initials: "AK",
    category: "Core",
    department: "Creative",
    bio: "Visual design, event posters, and aesthetic curation.",
  },
  {
    id: "ayush-kumar-rai",
    name: "Ayush Kumar Rai",
    role: "Dance & Music",
    initials: "AR",
    category: "Core",
    department: "Cultural",
    bio: "Directing musical sessions, dance performances, and cultural mixers.",
  },
];
