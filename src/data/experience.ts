export type ExperienceEntry = {
  id: string;
  /** Explicitly separates project work from paid employment. */
  kind: "Personal project" | "Team project" | "Professional role";
  title: string;
  subtitle: string;
  /** Your role on the work — e.g. "Sole developer", "Main contributor". */
  role: string;
  /** Display string — only set when the dates are verified. */
  period?: string;
  highlights: string[];
  technologies: string[];
  repositoryUrl?: string;
  caseStudyUrl?: string;
};

/**
 * Every entry is project-based work backed by a public repository — there is
 * no formal employment history to list. Roles, commit counts, and highlight
 * bullets below are verified against GitHub metadata and repository READMEs
 * (October 2026). If you later add a verified professional role, use the
 * "Professional role" kind and set `period` only for confirmed dates.
 */
export const experience: ExperienceEntry[] = [
  {
    id: "medisync",
    kind: "Team project",
    title: "MediSync",
    subtitle: "Hospital staff management system",
    role: "Main contributor (16 of 17 contributions)",
    highlights: [
      "Built the core Laravel application — models, migrations, routes, and Blade/Livewire views",
      "Implemented role-specific areas on Laravel Breeze authentication, QR-code attendance, and shift and leave workflows",
      "Added Pest tests covering authentication and profile functionality",
    ],
    technologies: ["Laravel", "PHP", "Livewire", "Tailwind CSS", "Pest"],
    repositoryUrl: "https://github.com/sahan721/medisync",
    caseStudyUrl: "/projects/medisync",
  },
  {
    id: "air-guard",
    kind: "Personal project",
    title: "Air Guard",
    subtitle: "IoT air-quality monitoring backend",
    role: "Sole developer",
    highlights: [
      "Designed an Express and TypeScript API with controllers, routes, services, and validators",
      "Built a typed Prisma and PostgreSQL data layer with Node-Cron jobs for sensor sync and weather updates",
      "Integrated a Python AI component behind a dedicated backend job",
    ],
    technologies: ["Node.js", "Express", "TypeScript", "PostgreSQL", "Prisma", "Python"],
    repositoryUrl: "https://github.com/sahan721/air_guard",
    caseStudyUrl: "/projects/air-guard",
  },
  {
    id: "bubbleblizz",
    kind: "Personal project",
    title: "BubbleBlizz",
    subtitle: "Native Android beverage-ordering app",
    role: "Sole developer",
    highlights: [
      "Built the complete app in Kotlin with Jetpack Compose and Material Design 3",
      "Implemented a Navigation Compose graph covering auth, catalogue, cart, checkout, and profile",
      "Centralised state in dedicated stores for cart, favourites, checkout, and user data",
    ],
    technologies: ["Kotlin", "Jetpack Compose", "Material 3"],
    repositoryUrl: "https://github.com/sahan721/BubbleBlizz-test",
    caseStudyUrl: "/projects/bubbleblizz",
  },
  {
    id: "neptune",
    kind: "Team project",
    title: "Neptune",
    subtitle: "Full-stack collection-management dashboard",
    role: "Main frontend contributor (27 of 32 contributions)",
    highlights: [
      "Built the React and TypeScript admin dashboard in Vite with routing, an auth context, and reusable table, modal, and badge components",
      "Connected the dashboard screens to the NestJS API through a shared API client layer",
      "Contributed to the NestJS backend alongside a second contributor (13 of 66 backend contributions)",
    ],
    technologies: ["React", "TypeScript", "Vite", "NestJS", "Prisma", "PostgreSQL"],
    repositoryUrl: "https://github.com/sahan721/neptune_front_done2",
    caseStudyUrl: "/projects/neptune",
  },
];
