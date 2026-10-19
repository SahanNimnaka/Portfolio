"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import { education } from "@/data/education";

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
    <Section id="education" ariaLabel="Education">
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
            <motion.li key={item.id} variants={reveal} className="relative">
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

                  <div className="flex flex-col items-start gap-2 sm:items-end">
                    {item.period && (
                      <span className="mt-1 whitespace-nowrap font-mono text-label uppercase text-muted">
                        {item.period}
                      </span>
                    )}
                    {item.status && (
                      <span className="rounded-full border border-primary/40 bg-primary-soft px-2.5 py-0.5 text-xs font-medium text-primary">
                        {item.status}
                      </span>
                    )}
                  </div>
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
