"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import GithubMark from "@/components/ui/GithubMark";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import { experience, type ExperienceEntry } from "@/data/experience";
import { cn } from "@/lib/utils";

function ExperienceCard({ entry }: { entry: ExperienceEntry }) {
  const isTeam = entry.kind === "Team project";

  return (
    <article className="card flex h-full flex-col p-6 md:p-7">
      <span
        className={cn(
          "w-fit rounded-full border px-2.5 py-0.5 font-mono text-label uppercase",
          isTeam
            ? "border-primary/40 bg-primary-soft text-primary"
            : "border-border bg-background text-muted",
        )}
      >
        {entry.kind}
      </span>

      <h3 className="mt-4 text-h3 text-foreground">{entry.title}</h3>
      <p className="mt-1.5 text-sm font-medium text-primary">{entry.subtitle}</p>
      <p className="mt-1 text-sm text-muted">{entry.role}</p>

      <ul className="mt-5 space-y-2.5">
        {entry.highlights.map((highlight) => (
          <li key={highlight} className="flex gap-2.5 text-sm text-muted">
            <span
              aria-hidden="true"
              className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary"
            />
            <span>{highlight}</span>
          </li>
        ))}
      </ul>

      <ul
        aria-label={`${entry.title} technologies`}
        className="mt-5 flex flex-wrap gap-2"
      >
        {entry.technologies.map((tech) => (
          <li
            key={tech}
            className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted"
          >
            {tech}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap gap-3 pt-6">
        {entry.caseStudyUrl && (
          <Button
            href={entry.caseStudyUrl}
            variant="primary"
            aria-label={`Read the ${entry.title} case study`}
            className="w-full px-4 py-3 text-xs sm:w-auto"
          >
            Read Case Study
            <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
          </Button>
        )}

        {entry.repositoryUrl && (
          <Button
            href={entry.repositoryUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant={entry.caseStudyUrl ? "outline" : "primary"}
            aria-label={`View the ${entry.title} repository on GitHub (opens in a new tab)`}
            className="w-full px-4 py-3 text-xs sm:w-auto"
          >
            <GithubMark className="h-4 w-4 fill-current" />
            View Repository
          </Button>
        )}
      </div>
    </article>
  );
}

export default function Experience() {
  const reduce = useReducedMotion() ?? false;

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
    <Section id="experience" ariaLabel="Experience">
      <Container>
        <SectionTitle
          eyebrow="Experience"
          title="Projects & Technical Experience"
          description="My hands-on experience so far is project-based — built through my degree and self-directed work rather than formal employment. Every entry links to its public source code."
        />

        <motion.div
          variants={group}
          {...gridProps}
          className="grid gap-6 md:grid-cols-2"
        >
          {experience.map((entry) => (
            <motion.div key={entry.id} variants={card}>
              <ExperienceCard entry={entry} />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
