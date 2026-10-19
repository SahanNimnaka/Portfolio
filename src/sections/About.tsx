"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";

const interests = [
  "Web Development",
  "Mobile Applications",
  "Backend Engineering",
  "AI",
  "Data Science",
];

const facts: [string, string][] = [
  ["Location", "Kandy, Sri Lanka"],
  ["University", "APIIT University"],
  ["Degree", "BSc (Hons) Computer Science"],
  ["Awarded by", "Staffordshire University"],
  ["Focus", "Aspiring Full-Stack Developer"],
  ["Currently", "Seeking a development internship"],
];

export default function About() {
  const reduce = useReducedMotion() ?? false;

  // Reduced motion: animate straight to the visible state with zero duration.
  const group: Variants = reduce
    ? { show: { transition: { staggerChildren: 0 } } }
    : {
        hidden: {},
        show: { transition: { staggerChildren: 0.12 } },
      };

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

  const revealProps = reduce
    ? ({ initial: false, animate: "show" } as const)
    : ({
        initial: "hidden",
        whileInView: "show",
        viewport: { once: true, amount: 0.15 },
      } as const);

  const factsProps = reduce
    ? ({ initial: false, animate: "show" } as const)
    : ({
        initial: "hidden",
        whileInView: "show",
        viewport: { once: true, amount: 0.2 },
      } as const);

  return (
    <Section id="about">
      <Container>
        <SectionTitle eyebrow="About Me" title="Get to know me" />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Introduction */}
          <motion.div variants={group} {...revealProps} className="lg:col-span-7">
            <motion.p variants={reveal} className="text-body-lg text-foreground">
              I&apos;m Sahan Nimnaka, a Computer Science undergraduate at APIIT
              Sri Lanka, pursuing a BSc (Hons) in Computer Science awarded by
              Staffordshire University. I&apos;m working toward a career as a
              full-stack developer.
            </motion.p>

            <motion.p variants={reveal} className="mt-6 text-body-lg text-muted">
              Most of my learning happens by building — practical web and
              mobile applications, the backend systems behind them, and the
              data-driven pieces that make software smarter. I enjoy
              understanding a product end to end, from the interface to the API
              to the database.
            </motion.p>

            <motion.p variants={reveal} className="mt-6 text-body-lg text-muted">
              I&apos;m still developing my skills through projects and
              independent study, and there&apos;s always more to learn. My
              current goal is to join a software development internship where I
              can gain practical industry experience, learn from experienced
              engineers, and contribute to meaningful software projects.
            </motion.p>

            <motion.div variants={reveal} className="mt-10">
              <h3 className="font-mono text-label uppercase text-muted">
                Interests
              </h3>
              <ul
                aria-label="Areas of interest"
                className="mt-4 flex flex-wrap gap-2.5"
              >
                {interests.map((interest) => (
                  <li
                    key={interest}
                    className="rounded-full border border-border bg-card px-3.5 py-1.5 font-mono text-label uppercase text-muted"
                  >
                    {interest}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Quick facts */}
          <motion.dl
            variants={reveal}
            {...factsProps}
            className="card divide-y divide-border self-start overflow-hidden lg:col-span-5"
          >
            {facts.map(([label, value]) => (
              <div key={label} className="px-6 py-4">
                <dt className="font-mono text-label uppercase text-muted">
                  {label}
                </dt>
                <dd className="mt-1 text-sm text-foreground">{value}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </Container>
    </Section>
  );
}
