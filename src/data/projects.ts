export type Project = {
  id: number;
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  images?: string[];
  technologies: string[];
  category: "Web" | "Mobile" | "AI/ML" | "IoT" | "Desktop";
  github: string;
  demo?: string;
  problem?: string;
  contribution?: string;
  challenges?: string;
  status?: "Completed" | "In Progress" | "Archived";
  role?: string;
};

export const projects: Project[] = [
  {
    id: 1,
    slug: "medisync",
    title: "MediSync",
    description:
      "Hospital staff attendance management system with QR attendance and role-based access control.",
    longDescription:
      "A web-based hospital staff attendance management system built to streamline attendance tracking using QR code scanning with role-based access control for administrators and staff.",
    image: "/images/medisync.png",
    technologies: ["Laravel", "MySQL", "Tailwind CSS", "Livewire"],
    category: "Web",
    github: "https://github.com/sahan721/medisync",
    demo: "",
    role: "Full Stack Developer",
    status: "Completed",
    problem: "Manual attendance tracking in healthcare settings is inefficient and error-prone.",
    contribution: "Designed and implemented QR-based attendance tracking with role-based permissions.",
  },
  {
    id: 2,
    slug: "bubbleblizz",
    title: "BubbleBlizz",
    description:
      "Mobile beverage ordering application with online ordering and user authentication.",
    longDescription:
      "A cross-platform mobile application for beverage ordering with user authentication and online ordering functionality.",
    image: "/images/bubbleblizz1.png",
    technologies: ["Flutter", "Laravel API", "MySQL"],
    category: "Mobile",
    github: "https://github.com/sahan721/BubbleBlizzApp-flutter-",
    demo: "",
    role: "Mobile Developer",
    status: "Completed",
    problem: "Need for streamlined mobile beverage ordering experience.",
    contribution: "Developed Flutter mobile app integrating with Laravel API backend.",
  },
  {
    id: 3,
    slug: "fixit",
    title: "Fixit",
    description:
      "Digital platform connecting skilled workers with customers across Sri Lanka.",
    longDescription:
      "A digital marketplace platform connecting skilled service providers with customers across Sri Lanka, facilitating service discovery and booking.",
    image: "/images/fixit.png",
    technologies: ["React", "Laravel", "MySQL"],
    category: "Web",
    github: "https://github.com/sahan721/fixit",
    demo: "",
    role: "Full Stack Developer",
    status: "Completed",
    problem: "Difficulty connecting customers with verified skilled workers in Sri Lanka.",
    contribution: "Built web platform for service provider discovery and customer requests.",
  },
];
