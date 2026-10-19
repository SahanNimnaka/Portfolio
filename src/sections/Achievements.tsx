"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import { achievements, type Achievement } from "@/data/achievements";

const linkFocus =
  "rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

function AchievementCard({ item }: { item: Achievement }) {
  return (
    <article className="card flex h-full flex-col p-6">
      <div className="flex items-start justify-between gap-3">
        <p className="font-mono text-label uppercase text-primary">
          {item.category}
        </p>
        {item.date && (
          <span className="whitespace-nowrap font-mono text-label uppercase text-muted">
            {item.date}
          </span>
        )}
      </div>

      <h3 className="mt-3 text-h3 text-foreground">{item.title}</h3>
      {item.organization && (
        <p className="mt-1.5 text-sm font-medium text-primary">
          {item.organization}
        </p>
      )}
      {item.description && (
        <p className="mt-3 text-sm leading-relaxed text-muted">
          {item.description}
        </p>
      )}

      {item.url && (
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-primary ${linkFocus}`}
        >
          View credential
          <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
        </a>
      )}
    </article>
  );
}

function AchievementList() {
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
    <Section id="achievements" ariaLabel="Achievements">
      <Container>
        <SectionTitle
          eyebrow="Achievements"
          title="Achievements & Activities"
          description="Verified certificates, competitions, workshops, and extracurricular milestones."
        />

        <motion.ul
          variants={group}
          {...gridProps}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {achievements.map((item) => (
            <motion.li key={item.id} variants={card}>
              <AchievementCard item={item} />
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </Section>
  );
}

/** Renders nothing while the achievements list is empty — no placeholder cards. */
export default function Achievements() {
  if (achievements.length === 0) return null;
  return <AchievementList />;
}
