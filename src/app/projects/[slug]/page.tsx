import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import GithubMark from "@/components/ui/GithubMark";
import {
  adjacentCaseStudy,
  caseStudies,
  caseStudyBySlug,
  caseStudySections,
} from "@/data/caseStudies";
import { openGraphImage, twitterImage } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudyBySlug.get(slug);
  if (!study) return {};

  const title = `${study.title} — Case Study`;

  return {
    title,
    description: study.tagline,
    alternates: { canonical: `/projects/${study.slug}` },
    openGraph: {
      type: "article",
      title: `${title} | Sahan Nimnaka`,
      description: study.tagline,
      url: `/projects/${study.slug}`,
      images: [openGraphImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Sahan Nimnaka`,
      description: study.tagline,
      images: [twitterImage],
    },
  };
}

const linkFocus =
  "rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = caseStudyBySlug.get(slug);
  if (!study) notFound();

  const { prev, next } = adjacentCaseStudy(study.slug);

  return (
    <main id="main" className="pt-20">
      <section className="section border-b border-border">
        <Container>
          <Link
            href="/#projects"
                    className={`inline-flex items-center gap-2 py-1 text-sm font-medium text-muted transition-colors hover:text-primary ${linkFocus}`}
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            Back to featured projects
          </Link>

          <p className="mt-10 font-mono text-label uppercase text-primary">
            {study.typeLabel}
          </p>
          <h1 className="mt-3 text-h2 font-bold text-foreground">
            {study.title}
          </h1>
          <p className="mt-5 max-w-2xl text-body-lg text-muted">
            {study.tagline}
          </p>
          <p className="mt-6 font-mono text-label uppercase text-muted">
            Role —{" "}
            <span className="text-foreground">{study.roleLabel}</span>
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              href={study.repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              aria-label={`View the ${study.title} repository on GitHub (opens in a new tab)`}
              className="px-5 py-3 text-xs"
            >
              <GithubMark className="h-4 w-4 fill-current" />
              View Repository
            </Button>

            {study.demoUrl && (
              <Button
                href={study.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="ghost"
                aria-label={`Open the ${study.title} live demo (opens in a new tab)`}
                className="px-5 py-3 text-xs"
              >
                Live Demo
              </Button>
            )}
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="min-w-0 space-y-16 lg:col-span-8 lg:space-y-20">
              <section id="overview" aria-labelledby="overview-heading">
                <h2
                  id="overview-heading"
                  className="text-h3 font-semibold text-foreground"
                >
                  Overview
                </h2>
                <div
                  aria-hidden="true"
                  className="mt-4 h-px w-12 bg-primary"
                />
                <p className="mt-6 text-body-lg font-medium text-foreground">
                  {study.problem}
                </p>
                <div className="mt-5 space-y-4 leading-relaxed text-muted">
                  {study.overview.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>

              <section id="goals" aria-labelledby="goals-heading">
                <h2
                  id="goals-heading"
                  className="text-h3 font-semibold text-foreground"
                >
                  Goals &amp; users
                </h2>
                <div
                  aria-hidden="true"
                  className="mt-4 h-px w-12 bg-primary"
                />
                <ul className="mt-6 space-y-3">
                  {study.goals.map((goal) => (
                    <li
                      key={goal}
                      className="flex gap-2.5 leading-relaxed text-muted"
                    >
                      <Check
                        aria-hidden="true"
                        className="mt-1 h-4 w-4 shrink-0 text-primary"
                      />
                      <span>{goal}</span>
                    </li>
                  ))}
                </ul>
                <h3 className="mt-8 text-sm font-semibold text-foreground">
                  Intended users
                </h3>
                <p className="mt-2 leading-relaxed text-muted">
                  {study.users}
                </p>
              </section>

              <section id="role" aria-labelledby="role-heading">
                <h2
                  id="role-heading"
                  className="text-h3 font-semibold text-foreground"
                >
                  Role &amp; contributions
                </h2>
                <div
                  aria-hidden="true"
                  className="mt-4 h-px w-12 bg-primary"
                />
                <p className="mt-6 text-body-lg font-medium text-foreground">
                  {study.role.summary}
                </p>
                <h3 className="mt-8 text-sm font-semibold text-foreground">
                  Core contributions
                </h3>
                <ul className="mt-3 space-y-3">
                  {study.role.contributions.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2.5 leading-relaxed text-muted"
                    >
                      <Check
                        aria-hidden="true"
                        className="mt-1 h-4 w-4 shrink-0 text-primary"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section id="stack" aria-labelledby="stack-heading">
                <h2
                  id="stack-heading"
                  className="text-h3 font-semibold text-foreground"
                >
                  Technology stack
                </h2>
                <div
                  aria-hidden="true"
                  className="mt-4 h-px w-12 bg-primary"
                />
                <dl className="mt-6 space-y-4">
                  {study.stack.map((group) => (
                    <div
                      key={group.area}
                      className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-6"
                    >
                      <dt className="w-36 shrink-0 font-mono text-label uppercase text-muted">
                        {group.area}
                      </dt>
                      <dd className="flex flex-wrap gap-2">
                        {group.items.map((item) => (
                          <span
                            key={item}
                            className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted"
                          >
                            {item}
                          </span>
                        ))}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>

              <section id="features" aria-labelledby="features-heading">
                <h2
                  id="features-heading"
                  className="text-h3 font-semibold text-foreground"
                >
                  Key features
                </h2>
                <div
                  aria-hidden="true"
                  className="mt-4 h-px w-12 bg-primary"
                />
                <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                  {study.features.map((feature) => (
                    <li key={feature.title} className="card p-5">
                      <h3 className="text-sm font-semibold text-foreground">
                        {feature.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {feature.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>

              <section
                id="architecture"
                aria-labelledby="architecture-heading"
              >
                <h2
                  id="architecture-heading"
                  className="text-h3 font-semibold text-foreground"
                >
                  Architecture &amp; decisions
                </h2>
                <div
                  aria-hidden="true"
                  className="mt-4 h-px w-12 bg-primary"
                />
                <p className="mt-6 leading-relaxed text-muted">
                  {study.architecture.overview}
                </p>
                <figure className="mt-6">
                  <div className="overflow-x-auto rounded-xl border border-border bg-background p-5">
                    <pre
                      aria-hidden="true"
                      className="font-mono text-xs leading-relaxed whitespace-pre text-muted"
                    >
                      {study.architecture.diagram}
                    </pre>
                  </div>
                  <figcaption className="sr-only">
                    Component flow of the {study.title} system, described in
                    the overview above.
                  </figcaption>
                </figure>
                <h3 className="mt-8 text-sm font-semibold text-foreground">
                  Key technical decisions
                </h3>
                <ul className="mt-3 space-y-3">
                  {study.architecture.decisions.map((decision) => (
                    <li
                      key={decision}
                      className="flex gap-2.5 leading-relaxed text-muted"
                    >
                      <Check
                        aria-hidden="true"
                        className="mt-1 h-4 w-4 shrink-0 text-primary"
                      />
                      <span>{decision}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section id="limitations" aria-labelledby="limitations-heading">
                <h2
                  id="limitations-heading"
                  className="text-h3 font-semibold text-foreground"
                >
                  Limitations &amp; future work
                </h2>
                <div
                  aria-hidden="true"
                  className="mt-4 h-px w-12 bg-primary"
                />
                <h3 className="mt-6 text-sm font-semibold text-foreground">
                  Current limitations
                </h3>
                <ul className="mt-3 space-y-3">
                  {study.limitations.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2.5 leading-relaxed text-muted"
                    >
                      <Check
                        aria-hidden="true"
                        className="mt-1 h-4 w-4 shrink-0 text-primary"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <h3 className="mt-8 text-sm font-semibold text-foreground">
                  Potential future improvements
                </h3>
                <ul className="mt-3 space-y-3">
                  {study.futureWork.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2.5 leading-relaxed text-muted"
                    >
                      <Check
                        aria-hidden="true"
                        className="mt-1 h-4 w-4 shrink-0 text-primary"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <nav
                aria-label="Case study navigation"
                className="grid gap-4 border-t border-border pt-8 sm:grid-cols-2"
              >
                <Link
                  href={`/projects/${prev.slug}`}
                  className={`group rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary ${linkFocus}`}
                >
                  <span className="flex items-center gap-1.5 font-mono text-label uppercase text-muted">
                    <ArrowLeft
                      aria-hidden="true"
                      className="h-3.5 w-3.5 transition-transform duration-fast group-hover:-translate-x-0.5 motion-reduce:group-hover:translate-x-0"
                    />
                    Previous
                  </span>
                  <span className="mt-2 block text-base font-semibold text-foreground transition-colors group-hover:text-primary">
                    {prev.title}
                  </span>
                </Link>
                <Link
                  href={`/projects/${next.slug}`}
                  className={`group rounded-xl border border-border bg-card p-5 text-right transition-colors hover:border-primary sm:text-right ${linkFocus}`}
                >
                  <span className="flex items-center justify-end gap-1.5 font-mono text-label uppercase text-muted">
                    Next
                    <ArrowRight
                      aria-hidden="true"
                      className="h-3.5 w-3.5 transition-transform duration-fast group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0"
                    />
                  </span>
                  <span className="mt-2 block text-base font-semibold text-foreground transition-colors group-hover:text-primary">
                    {next.title}
                  </span>
                </Link>
              </nav>
            </div>

            <aside
              aria-label="Case study contents"
              className="hidden min-w-0 lg:col-span-4 lg:block"
            >
              <nav className="sticky top-28 rounded-xl border border-border bg-card p-6">
                <p className="font-mono text-label uppercase text-muted">
                  On this page
                </p>
                <ul className="mt-4 space-y-1">
                  {caseStudySections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className={`block rounded-md px-3 py-2 text-sm text-muted transition-colors hover:bg-background hover:text-foreground ${linkFocus}`}
                      >
                        {section.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 border-t border-border pt-4">
                  <a
                    href={study.repositoryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View the ${study.title} repository on GitHub (opens in a new tab)`}
            className={`inline-flex items-center gap-2 py-1 text-sm font-medium text-muted transition-colors hover:text-primary ${linkFocus}`}
                  >
                    <GithubMark className="h-4 w-4 fill-current" />
                    Source repository
                  </a>
                </div>
              </nav>
            </aside>
          </div>
        </Container>
      </section>
    </main>
  );
}
