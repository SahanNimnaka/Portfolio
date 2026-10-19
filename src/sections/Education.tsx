"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";

const education = [
  {
    degree: "BSc (Hons) Computer Science",
    institution: "APIIT Sri Lanka",
    awarding: "Awarded by Staffordshire University",
    period: "2023 – Present",
    description:
      "Pursuing a BSc (Hons) in Computer Science with a focus on software engineering, web development, and modern software practices — building practical projects alongside my studies.",
  },
  {
    degree: "G.C.E. Advanced Level",
    institution: "Combined Mathematics Stream",
    awarding: null,
    period: "2022",
    description:
      "Completed Advanced Level studies with a strong foundation in mathematics and analytical problem solving.",
  },
];

export default function Education() {
  const reduce = useReducedMotion() ?? false;

  // Reduced motion: animate straight to the visible state with zero duration.
  const reveal: Variants = reduce
    ? { show: { opacity: 1, y: 0, transition: { duration: 0 } } }
    : {
        hidden: { opacity: 0, y: 16 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
        },
      };

  const listProps = reduce
    ? ({ initial: false, animate: "show" } as const)
    : ({
        initial: "hidden",
        whileInView: "show",
        viewport: { once: true, amount: 0.15 },
      } as const);

  return (
    <Section id="education">
      <Container>
        <SectionTitle eyebrow="Education" title="Academic Background" />

        <motion.ol
          variants={{ show: { transition: { staggerChildren: reduce ? 0 : 0.12 } } }}
          {...listProps}
          className="relative space-y-8 sm:pl-10"
        >
          {/* Timeline rail (hidden on small screens) */}
          <span
            aria-hidden="true"
            className="absolute bottom-2 left-[7px] top-2 hidden w-px bg-border sm:block"
          />

          {education.map((item) => (
            <motion.li key={item.degree} variants={reveal} className="relative">
              {/* Timeline dot */}
              <span
                aria-hidden="true"
                className="absolute -left-[38.5px] top-8 hidden h-3 w-3 rounded-full border-2 border-background bg-primary sm:block"
              />

              <article className="card p-6 md:p-8">
                <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
                  <div>
                    <h3 className="text-h3 text-foreground">{item.degree}</h3>
                    <p className="mt-2 text-sm font-medium text-primary">
                      {item.institution}
                    </p>
                    {item.awarding && (
                      <p className="mt-0.5 text-sm text-muted">
                        {item.awarding}
                      </p>
                    )}
                  </div>
                  <time className="mt-1 whitespace-nowrap font-mono text-label uppercase text-muted">
                    {item.period}
                  </time>
                </div>

                <p className="mt-4 leading-relaxed text-muted">
                  {item.description}
                </p>
              </article>
            </motion.li>
          ))}
        </motion.ol>
      </Container>
    </Section>
  );
}
