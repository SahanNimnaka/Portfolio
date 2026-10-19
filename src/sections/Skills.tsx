"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  Braces,
  Brain,
  ChartLine,
  Cloud,
  Code,
  Database,
  Server,
  Smartphone,
  Telescope,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import {
  siCss,
  siDart,
  siExpress,
  siFlutter,
  siGit,
  siGithub,
  siHtml5,
  siJavascript,
  siKotlin,
  siLaravel,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siPhp,
  siPostgresql,
  siPostman,
  siReact,
  siSqlite,
  siTailwindcss,
  siTypescript,
  type SimpleIcon,
} from "simple-icons";

import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";

type Tech = {
  name: string;
  /** Brand glyph from simple-icons (preferred — official logo path). */
  brand?: SimpleIcon;
  /** lucide fallback glyph when no accurate brand icon is available. */
  fallback?: LucideIcon;
};

type Category = {
  title: string;
  icon: LucideIcon;
  items: Tech[];
};

const categories: Category[] = [
  {
    title: "Frontend Development",
    icon: Braces,
    items: [
      { name: "HTML", brand: siHtml5 },
      { name: "CSS", brand: siCss },
      { name: "JavaScript", brand: siJavascript },
      { name: "TypeScript", brand: siTypescript },
      { name: "React", brand: siReact },
      { name: "Next.js", brand: siNextdotjs },
      { name: "Tailwind CSS", brand: siTailwindcss },
    ],
  },
  {
    title: "Backend Development",
    icon: Server,
    items: [
      { name: "Node.js", brand: siNodedotjs },
      { name: "Express.js", brand: siExpress },
      { name: "PHP", brand: siPhp },
      { name: "Laravel", brand: siLaravel },
    ],
  },
  {
    title: "Mobile Development",
    icon: Smartphone,
    items: [
      { name: "Flutter", brand: siFlutter },
      { name: "Dart", brand: siDart },
      { name: "Kotlin", brand: siKotlin },
    ],
  },
  {
    title: "Databases",
    icon: Database,
    items: [
      { name: "PostgreSQL", brand: siPostgresql },
      { name: "MySQL", brand: siMysql },
      { name: "SQLite", brand: siSqlite },
    ],
  },
  {
    title: "Development Tools",
    icon: Wrench,
    items: [
      { name: "Git", brand: siGit },
      { name: "GitHub", brand: siGithub },
      // simple-icons no longer ships a VS Code mark — accurate lucide fallback.
      { name: "Visual Studio Code", fallback: Code },
      { name: "Postman", brand: siPostman },
    ],
  },
  {
    title: "Areas I Am Exploring",
    icon: Telescope,
    items: [
      { name: "Artificial Intelligence", fallback: Brain },
      { name: "Data Science", fallback: ChartLine },
      { name: "Cloud Computing", fallback: Cloud },
    ],
  },
];

function TechGlyph({ tech }: { tech: Tech }) {
  if (tech.brand) {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
        className="h-4 w-4 shrink-0 fill-current text-muted transition-colors duration-fast group-hover:text-primary"
      >
        <path d={tech.brand.path} />
      </svg>
    );
  }
  if (tech.fallback) {
    const Glyph = tech.fallback;
    return (
      <Glyph
        aria-hidden="true"
        focusable="false"
        className="h-4 w-4 shrink-0 text-muted transition-colors duration-fast group-hover:text-primary"
      />
    );
  }
  return null;
}

export default function Skills() {
  const reduce = useReducedMotion() ?? false;

  // Reduced motion: animate straight to the visible state with zero duration.
  const group: Variants = reduce
    ? { show: { transition: { staggerChildren: 0 } } }
    : {
        hidden: {},
        show: { transition: { staggerChildren: 0.08 } },
      };

  const card: Variants = reduce
    ? { show: { opacity: 1, y: 0, transition: { duration: 0 } } }
    : {
        hidden: { opacity: 0, y: 16 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
        },
      };

  const gridProps = reduce
    ? ({ initial: false, animate: "show" } as const)
    : ({
        initial: "hidden",
        whileInView: "show",
        viewport: { once: true, amount: 0.15 },
      } as const);

  return (
    <Section id="skills" ariaLabel="Skills">
      <Container>
        <SectionTitle
          eyebrow="Skills"
          title="Technologies I Work With"
          description="Tools I've worked with across my projects, coursework, and self-directed learning — plus the areas I'm exploring next."
        />

        <motion.div
          variants={group}
          {...gridProps}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {categories.map(({ title, icon: CategoryIcon, items }) => (
            <motion.article
              key={title}
              variants={card}
              className="card p-6 md:p-7"
            >
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary-soft text-primary"
                >
                  <CategoryIcon className="h-5 w-5" />
                </span>
                <h3 className="min-w-0 text-h3 text-foreground">{title}</h3>
              </div>

              <ul className="mt-5 flex flex-wrap gap-2.5">
                {items.map((tech) => (
                  <li
                    key={tech.name}
                    className="group inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-sm text-muted transition duration-fast hover:-translate-y-0.5 hover:border-primary hover:text-foreground motion-reduce:hover:translate-y-0"
                  >
                    <TechGlyph tech={tech} />
                    <span>{tech.name}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
