import type { Metadata } from "next";

import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Skills from "@/sections/Skills";
import Projects from "@/sections/Projects";
import Experience from "@/sections/Experience";
import Education from "@/sections/Education";
import Achievements from "@/sections/Achievements";
import Contact from "@/sections/Contact";
import { contact } from "@/data/contact";
import { absoluteUrl, siteName, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const description =
  "Portfolio of Sahan Nimnaka Pinnagaspitiya, a Computer Science undergraduate at APIIT building web, mobile, and backend projects.";

const knowsAbout = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Tailwind CSS",
  "Node.js",
  "Express.js",
  "PHP",
  "Laravel",
  "Flutter",
  "Dart",
  "Kotlin",
  "PostgreSQL",
  "MySQL",
  "SQLite",
  "Git",
  "GitHub",
  "Postman",
  "Artificial Intelligence",
  "Data Science",
  "Cloud Computing",
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": absoluteUrl("/#person"),
      name: "Sahan Nimnaka Pinnagaspitiya",
      alternateName: siteName,
      url: siteUrl,
      jobTitle: "Computer Science Undergraduate",
      description:
        "Computer Science undergraduate at APIIT building practical web, mobile, and backend applications.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kandy",
        addressCountry: "LK",
      },
      sameAs: [contact.github, contact.linkedin],
      knowsAbout,
    },
    {
      "@type": "WebSite",
      "@id": absoluteUrl("/#website"),
      url: siteUrl,
      name: `${siteName} — Portfolio`,
      description,
      inLanguage: "en",
      publisher: { "@id": absoluteUrl("/#person") },
    },
  ],
};

export default function Home() {
  return (
    <main id="main" className="pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Achievements />
      <Contact />
    </main>
  );
}
