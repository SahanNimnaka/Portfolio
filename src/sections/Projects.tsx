"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import Image from "next/image";
import {
  ArrowRight,
  Braces,
  Check,
  CupSoda,
  ExternalLink,
  Stethoscope,
  Waves,
  Wind,
  type LucideIcon,
} from "lucide-react";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import GithubMark from "@/components/ui/GithubMark";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import { projects, type Project } from "@/data/projects";

const previewIcons: Record<string, LucideIcon> = {
  "air-guard": Wind,
  medisync: Stethoscope,
  bubbleblizz: CupSoda,
  neptune: Waves,
};

/**
 * Media half of a project card. Uses a real screenshot when one exists;
 * otherwise renders a clearly typographic preview (never a fake UI).
 * Every card renders the same 16:9 frame, so all projects read equally.
 */
function ProjectMedia({ project }: { project: Project }) {
  const Icon = previewIcons[project.slug] ?? Braces;

  return (
    <div className="relative flex aspect-[16/9] items-center justify-center overflow-hidden border-b border-border bg-background">
      {project.image ? (
        <Image
          src={project.image}
          alt={project.imageAlt ?? `${project.title} project screenshot`}
          fill
          loading="lazy"
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-base group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
        />
      ) : (
        <div
          aria-hidden="true"
          className="flex h-full w-full flex-col items-center justify-center gap-3 px-6 text-center"
        >
          <div className="absolute inset-0 hero-grid opacity-60" />
          <span className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-card text-primary transition-colors duration-fast group-hover:border-primary">
            <Icon className="h-6 w-6" />
          </span>
          <p className="relative text-xl font-bold text-foreground">
            {project.title}
          </p>
          <p className="relative font-mono text-label uppercase text-muted">
            {project.technologies.slice(0, 3).join(" · ")}
          </p>
        </div>
      )}
    </div>
  );
}

function ProjectContent({ project }: { project: Project }) {
  return (
    <div className="flex flex-1 flex-col p-6 md:p-7">
      <p className="font-mono text-label uppercase text-primary">
        {project.typeLabel}
      </p>
      <h3 className="mt-2 text-h3 text-foreground">{project.title}</h3>
      <p className="mt-3 leading-relaxed text-muted">{project.description}</p>

      <ul className="mt-5 space-y-2.5">
        {project.features.map((feature) => (
          <li key={feature} className="flex gap-2.5 text-sm text-muted">
            <Check
              aria-hidden="true"
              className="mt-0.5 h-4 w-4 shrink-0 text-primary"
            />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <ul
        aria-label={`${project.title} technologies`}
        className="mt-5 flex flex-wrap gap-2"
      >
        {project.technologies.map((tech) => (
          <li
            key={tech}
            className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted"
          >
            {tech}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap gap-3 pt-6">
        {project.caseStudy && (
          <Button
            href={`/projects/${project.slug}`}
            variant="primary"
            aria-label={`Read the ${project.title} case study`}
            className="w-full px-4 py-3 text-xs sm:w-auto"
          >
            Read Case Study
            <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
          </Button>
        )}

        <Button
          href={project.repositoryUrl}
          target="_blank"
          rel="noopener noreferrer"
          variant="outline"
          aria-label={`View the ${project.title} repository on GitHub (opens in a new tab)`}
          className="w-full px-4 py-3 text-xs sm:w-auto"
        >
          <GithubMark className="h-4 w-4 fill-current" />
          View Repository
        </Button>

        {project.demoUrl && (
          <Button
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost"
            aria-label={`Open the ${project.title} live demo (opens in a new tab)`}
            className="w-full px-4 py-3 text-xs sm:w-auto"
          >
            <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
            Live Demo
          </Button>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
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
        viewport: { once: true, amount: 0.1 },
      } as const);

  return (
    <Section id="projects" ariaLabel="Featured projects">
      <Container>
        <SectionTitle
          eyebrow="Projects"
          title="Featured Projects"
          description="A selection of my practical work — backend systems, web applications, and mobile development, each linked to its source repository."
        />

        <motion.div
          variants={group}
          {...gridProps}
          className="grid gap-6 md:grid-cols-2"
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={card}>
              <article className="card group flex h-full flex-col overflow-hidden transition-[transform,border-color] duration-fast ease-smooth hover:-translate-y-1 hover:border-primary focus-within:-translate-y-1 focus-within:border-primary motion-reduce:hover:translate-y-0 motion-reduce:focus-within:translate-y-0">
                <ProjectMedia project={project} />
                <ProjectContent project={project} />
              </article>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
