/**
 * About page data — typed JSON per content.md §3.
 */

export interface CoreValue {
  name: string;
  description: string;
}

export interface AstitvaPrinciple {
  letter: string;
  word: string;
  description: string;
}

export interface JourneyStage {
  step: number;
  stage: string;
  description: string;
}

export const visionContent = {
  kicker: "VISION",
  heading: "A connected, vibrant fresher community.",
  body: "To build a space where every individual feels seen, valued, and empowered to discover their potential — where the first year becomes more than an academic transition. It becomes the foundation of friendships, experiences, confidence, and identity.",
};

export const missionContent = {
  kicker: "MISSION",
  heading: "What we're here to do.",
  items: [
    "Build meaningful connections among freshers",
    "Encourage personal growth and self-discovery",
    "Create opportunities to explore new interests",
    "Promote creativity and individuality",
    "Encourage communication and confidence",
    "Provide opportunities to participate and showcase talent",
    "Create memorable first-year experiences",
    "Build a strong and inclusive fresher network",
    "Encourage students to take initiative and lead",
  ],
};

export const coreValues: CoreValue[] = [
  {
    name: "Identity",
    description: "Everyone has something unique to bring to the community.",
  },
  {
    name: "Unity",
    description: "Different people, backgrounds, and personalities becoming one community.",
  },
  {
    name: "Growth",
    description: "College is a journey of constant learning and evolution.",
  },
  {
    name: "Inclusion",
    description: "Everyone deserves a place where they feel welcome.",
  },
  {
    name: "Creativity",
    description: "Ideas, expression, and experimentation should be encouraged.",
  },
  {
    name: "Courage",
    description: "Try something new. Fail. Learn. Try again.",
  },
  {
    name: "Brotherhood",
    description: "Relationships that go beyond the first year.",
  },
];

export const astitvaPrinciples: AstitvaPrinciple[] = [
  { letter: "A", word: "Aspire", description: "Dream beyond boundaries" },
  { letter: "S", word: "Strength", description: "Build yourself and support others" },
  { letter: "T", word: "Transform", description: "Turn experiences into growth" },
  { letter: "I", word: "Identity", description: "Discover and express who you are" },
  { letter: "T", word: "Togetherness", description: "Grow as a community" },
  { letter: "V", word: "Vision", description: "Create a meaningful future" },
  { letter: "A", word: "Achieve", description: "Turn potential into impact" },
];

export const journeyStages: JourneyStage[] = [
  {
    step: 1,
    stage: "Stranger",
    description: "Everyone starts here — new campus, unfamiliar faces, no story yet.",
  },
  {
    step: 2,
    stage: "Discover",
    description: "You find your interests, your strengths, your voice.",
  },
  {
    step: 3,
    stage: "Connect",
    description: "You meet the people who'll become your college family.",
  },
  {
    step: 4,
    stage: "Belong",
    description: "The room stops feeling unfamiliar. You're part of something now.",
  },
  {
    step: 5,
    stage: "Evolve",
    description: "You step outside your comfort zone and grow, experience by experience.",
  },
  {
    step: 6,
    stage: "Rise",
    description: "Confidence you didn't have in week one.",
  },
  {
    step: 7,
    stage: "One",
    description: "Individual identities become a shared story — Astitva.",
  },
];
