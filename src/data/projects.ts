export type Project = {
  id: number;
  slug: string;
  title: string;
  /** Small mono eyebrow describing the kind of project. */
  typeLabel: string;
  description: string;
  /** Evidence-based feature bullets — keep to three per project. */
  features: string[];
  technologies: string[];
  repositoryUrl: string;
  /** Only set when a working demo has been verified. */
  demoUrl?: string;
  image?: string;
  imageAlt?: string;
  featured?: boolean;
  /** True when a detailed case study page exists at /projects/[slug]. */
  caseStudy?: boolean;
};

/**
 * All repository URLs, technologies, and descriptions below were verified
 * against the live repositories' READMEs and metadata (October 2026).
 * No demo URLs are listed because none of these repositories currently
 * publishes a verified live deployment.
 */
export const projects: Project[] = [
  {
    id: 1,
    slug: "air-guard",
    title: "Air Guard",
    typeLabel: "IoT Backend",
    description:
      "An IoT backend for air-quality monitoring and prediction — syncing sensor readings from ThingSpeak into PostgreSQL, and exposing an Express API for devices, weather data, and AI-assisted predictions.",
    features: [
      "ThingSpeak sensor-data synchronisation with current and historical readings stored via Prisma",
      "REST API for devices, sensor readings, weather information, and predictions",
      "Scheduled jobs for data sync, weather updates, and a Python AI prediction component",
    ],
    technologies: ["Node.js", "Express", "TypeScript", "PostgreSQL", "Prisma", "Python"],
    repositoryUrl: "https://github.com/sahan721/air_guard",
    featured: true,
    caseStudy: true,
  },
  {
    id: 2,
    slug: "medisync",
    title: "MediSync",
    typeLabel: "Web Application",
    description:
      "A hospital staff management system built with Laravel — covering staff records, QR-code attendance, shift scheduling, leave requests, and report exports through role-specific areas for administrators, sisters, and staff.",
    features: [
      "QR-code attendance workflows alongside staff and record administration",
      "Shift scheduling with overtime handling and scheduled reminders",
      "Leave-request workflows with PDF and spreadsheet report exports",
    ],
    technologies: ["Laravel", "PHP", "Livewire", "Tailwind CSS"],
    repositoryUrl: "https://github.com/sahan721/medisync",
    caseStudy: true,
  },
  {
    id: 3,
    slug: "bubbleblizz",
    title: "BubbleBlizz",
    typeLabel: "Android Application",
    description:
      "A native Android beverage-ordering app built with Jetpack Compose — browse a drink catalogue, manage a cart and favourites, and move through a multi-step checkout flow.",
    features: [
      "Product catalogue with categories, detail screens, and in-app favourites",
      "Cart management with quantity controls and calculated totals",
      "Multi-step checkout for shipping, payment selection, and order review",
    ],
    technologies: ["Kotlin", "Jetpack Compose", "Material 3"],
    repositoryUrl: "https://github.com/sahan721/BubbleBlizz-test",
    caseStudy: true,
  },
  {
    id: 4,
    slug: "portfolio",
    title: "Personal Portfolio",
    typeLabel: "Portfolio Site",
    description:
      "My personal portfolio — a token-driven design system with dark and light themes, responsive layouts, and motion that respects reduced-motion preferences, built with Next.js and TypeScript.",
    features: [
      "Design system built on CSS custom-property tokens shared across every section",
      "Dark and light themes with a no-flash theme script",
      "Accessible, keyboard-friendly navigation with reduced-motion support",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    repositoryUrl: "https://github.com/sahan721/Portfolio",
  },
];
