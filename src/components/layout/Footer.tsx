import Container from "@/components/ui/Container";
import GithubMark from "@/components/ui/GithubMark";
import { Mail } from "lucide-react";

import { achievements } from "@/data/achievements";
import { contact } from "@/data/contact";

const footerNav = [
  "About",
  "Skills",
  "Projects",
  "Experience",
  "Education",
  ...(achievements.length > 0 ? ["Achievements"] : []),
  "Contact",
];

function LinkedInMark({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface py-10">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row">
          <div>
            <p className="text-lg font-bold text-foreground">
              Sahan
              <span aria-hidden="true" className="text-primary">
                .
              </span>
            </p>

            <p className="mt-1 text-sm text-muted">
              Building modern digital experiences.
            </p>
          </div>

          <nav
            aria-label="Social links"
            className="flex flex-wrap items-center gap-x-5 gap-y-3"
          >
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex items-center gap-2 py-1 text-sm text-muted transition-colors hover:text-primary"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              Email
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 py-1 text-sm text-muted transition-colors hover:text-primary"
            >
              <LinkedInMark className="h-4 w-4" />
              LinkedIn
              <span className="sr-only"> (opens in new tab)</span>
            </a>
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 py-1 text-sm text-muted transition-colors hover:text-primary"
            >
              <GithubMark className="h-4 w-4 fill-current" />
              GitHub
              <span className="sr-only"> (opens in new tab)</span>
            </a>
          </nav>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 md:flex-row md:items-center">
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap gap-x-5 gap-y-2"
          >
            {footerNav.map((item) => (
              <a
                key={item}
                href={`/#${item.toLowerCase()}`}
                className="inline-block py-1 text-sm text-muted transition-colors hover:text-primary"
              >
                {item}
              </a>
            ))}
          </nav>

          <p className="text-sm text-muted">
            © {year} Sahan Nimnaka Pinnagaspitiya. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
