"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import Image from "next/image";
import { Download } from "lucide-react";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

const roles = [
  "Aspiring Full-Stack Developer",
  "Web Application Developer",
  "Mobile App Development Enthusiast",
  "Exploring AI & Data Science",
];

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

function RoleCycle({ reduce }: { reduce: boolean }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (reduce) return;

    let swapTimer: number | undefined;
    const cycleTimer = window.setInterval(() => {
      setVisible(false);
      swapTimer = window.setTimeout(() => {
        setIndex((i) => (i + 1) % roles.length);
        setVisible(true);
      }, 280);
    }, 3500);

    return () => {
      window.clearInterval(cycleTimer);
      if (swapTimer) window.clearTimeout(swapTimer);
    };
  }, [reduce]);

  return (
    <div className="mt-5">
      <span className="sr-only">
        Roles: Aspiring Full-Stack Developer; Web Application Developer; Mobile
        App Development Enthusiast; Exploring AI and Data Science.
      </span>

      {/* Visual role line — decorative for assistive tech, always reserves the
          height of the tallest role so the layout never shifts. */}
      <div
        aria-hidden="true"
        className="grid text-left text-xl font-semibold leading-[1.4] text-primary sm:text-2xl"
      >
        {roles.map((role, i) => (
          <span
            key={role}
            style={{ gridArea: "1 / 1" }}
            className={`transition-opacity duration-300 ease-out ${
              i === index && visible ? "opacity-100" : "opacity-0"
            }`}
          >
            {role}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  const reduce = useReducedMotion() ?? false;

  return (
    <motion.section
      id="hero"
      variants={container}
      initial={reduce ? false : "hidden"}
      animate="show"
      className="relative isolate overflow-hidden border-b border-border"
    >
      {/* Static background: grid texture + restrained cyan wash */}
      <div className="hero-grid absolute inset-0 -z-10" aria-hidden="true" />

      <Container>
        <div className="grid items-center gap-12 py-16 md:py-24 lg:grid-cols-12 lg:gap-14">
          {/* Intro column */}
          <div className="lg:col-span-7">
            <motion.div variants={item} className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 bg-primary" />
              <span className="font-mono text-label uppercase text-primary">
                Computer Science Undergraduate
              </span>
            </motion.div>

            <motion.h1
              variants={item}
              className="mt-6 text-[clamp(1.875rem,7vw,4.5rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-foreground text-balance break-words"
            >
              <span className="font-medium text-muted">I&apos;m </span>
              Sahan Nimnaka Pinnagaspitiya.
            </motion.h1>

            <motion.div variants={item}>
              <RoleCycle reduce={reduce} />
            </motion.div>

            <motion.p
              variants={item}
              className="mt-4 max-w-2xl text-body-lg text-muted"
            >
              I&apos;m a Computer Science undergraduate who enjoys building
              practical web and mobile applications, developing backend
              systems, and exploring AI and Data Science. I&apos;m continuously
              learning and looking for opportunities to contribute to meaningful
              software projects.
            </motion.p>

            <motion.div variants={item} className="mt-7">
              <span className="inline-flex items-center gap-2.5 rounded-full border border-border bg-card px-3.5 py-1.5 text-sm text-muted">
                <span
                  aria-hidden="true"
                  className="h-2 w-2 rounded-full bg-success animate-pulse"
                />
                Open to internship opportunities
              </span>
            </motion.div>

            <motion.div
              variants={item}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <Button href="#projects">Explore My Projects</Button>
              <Button
                href="/resume.pdf"
                variant="outline"
                download
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Download Résumé
                <span className="sr-only"> (PDF)</span>
              </Button>
            </motion.div>

            <motion.nav
              variants={item}
              aria-label="Social links"
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3"
            >
              <a
                href="https://github.com/sahan721"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-primary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
                GitHub
                <span className="sr-only"> (opens in new tab)</span>
              </a>

              <a
                href="https://www.linkedin.com/in/sahan-pinnagaspitiya-931042325"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-primary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                LinkedIn
                <span className="sr-only"> (opens in new tab)</span>
              </a>
            </motion.nav>
          </div>

          {/* Visual column */}
          <motion.figure
            variants={item}
            className="mx-auto w-full max-w-64 sm:max-w-80 lg:col-span-5 lg:max-w-none lg:pl-8"
          >
            <div className="overflow-hidden rounded-xl border border-border bg-card shadow-card">
              <Image
                src="/images/profile.png"
                alt="Portrait of Sahan Nimnaka Pinnagaspitiya"
                width={480}
                height={600}
                priority
                sizes="(max-width: 640px) 256px, (max-width: 1024px) 320px, 440px"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 font-mono text-label uppercase text-muted">
              <span>Kandy, Sri Lanka</span>
              <span className="text-primary">APIIT · Staffordshire</span>
            </figcaption>
          </motion.figure>
        </div>
      </Container>
    </motion.section>
  );
}
