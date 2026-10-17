"use client";

import { useState } from "react";
import { Copy, Check, Mail } from "lucide-react";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "nimnakasahan6@gmail.com";

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  return (
    <Section id="contact">
      <Container>
        <SectionTitle eyebrow="Contact" title="Let's Work Together" />

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left Side */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-2 text-foreground flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Email
              </h3>
              <div className="flex items-center justify-between gap-4">
                <a
                  href={`mailto:${email}`}
                  className="text-muted hover:text-primary transition-colors break-all"
                >
                  {email}
                </a>
                <button
                  onClick={copyEmail}
                  aria-label="Copy email to clipboard"
                  className="p-2 rounded-lg bg-background border border-border hover:border-primary transition-colors shrink-0"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-2 text-foreground flex items-center gap-2">
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
                LinkedIn
              </h3>
              <a
                href="https://linkedin.com/in/sahan-pinnagaspitiya-931042325"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-primary transition-colors break-all"
              >
                linkedin.com/in/sahan-pinnagaspitiya-931042325
              </a>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-2 text-foreground flex items-center gap-2">
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
                GitHub
              </h3>
              <a
                href="https://github.com/sahan721"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-primary transition-colors break-all"
              >
                github.com/sahan721
              </a>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <form className="bg-card border border-border rounded-2xl p-8 space-y-6">
            <div>
              <label htmlFor="name" className="block mb-2 text-foreground">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Your Name"
                required
                className="w-full bg-background border border-border rounded-xl px-4 py-3 outline-none focus:border-primary text-foreground placeholder:text-muted"
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-2 text-foreground">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                required
                className="w-full bg-background border border-border rounded-xl px-4 py-3 outline-none focus:border-primary text-foreground placeholder:text-muted"
              />
            </div>

            <div>
              <label htmlFor="message" className="block mb-2 text-foreground">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder="Write your message..."
                required
                className="w-full bg-background border border-border rounded-xl px-4 py-3 outline-none focus:border-primary text-foreground placeholder:text-muted resize-none"
              />
            </div>

            <a
              href={`mailto:${email}?subject=Portfolio%20Contact&body=Hi%20Sahan%2C%0A%0A`}
              className="block w-full bg-primary hover:bg-primary/90 transition-colors py-3 rounded-xl font-medium text-white text-center"
            >
              Send Message
            </a>
          </form>
        </div>
      </Container>
    </Section>
  );
}