"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Download } from "lucide-react";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-card to-background" />

      {/* Blur Effects */}
      <div className="absolute top-40 left-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl -z-10" />
      <div className="absolute bottom-20 right-20 h-72 w-72 rounded-full bg-secondary/10 blur-3xl -z-10" />

      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <p className="text-primary text-lg font-medium mb-4">Hi, I&apos;m</p>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 text-foreground">
              Sahan Nimnaka
            </h1>

            <h2 className="text-2xl md:text-4xl text-muted mb-8">
              Software Engineer & Full Stack Developer
            </h2>

            <p className="max-w-2xl text-muted text-lg leading-relaxed mb-6">
              Passionate Computer Science undergraduate focused on building
              scalable applications and solving real-world problems through
              technology.
            </p>

            <div className="flex items-center gap-3 mb-10">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-muted text-sm">
                Open to internship opportunities
              </span>
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              <a href="#projects">
                <Button>View Projects</Button>
              </a>
              <a href="#contact">
                <Button variant="outline">Contact Me</Button>
              </a>
              <a href="/resume.pdf" download aria-label="Download CV">
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download CV
                </Button>
              </a>
              <div className="flex gap-2">
                <a
                  href="https://github.com/sahan721"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="p-2 rounded-lg bg-card border border-border hover:border-primary transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </a>
                <a
                  href="https://linkedin.com/in/sahan-pinnagaspitiya-931042325"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="p-2 rounded-lg bg-card border border-border hover:border-primary transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute -inset-8 bg-primary/30 rounded-full blur-[80px]" />

              <Image
                src="/images/profile.png"
                alt="Portrait of Sahan Nimnaka, Software Engineer"
                width={400}
                height={400}
                priority
                className="relative rounded-full object-cover border border-border shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}