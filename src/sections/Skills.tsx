import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";

const skills = {
  "Frontend Development": ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS"],
  "Backend Development": ["Laravel", "Node.js", "Express"],
  "Programming Languages": ["TypeScript", "JavaScript", "PHP", "Python", "Java"],
  "Databases & Data": ["MySQL", "SQLite", "PostgreSQL"],
  "Mobile Development": ["Flutter"],
  "AI & Machine Learning": ["Python"],
  "Cloud, Deployment & Dev Tools": ["Git", "GitHub", "Docker", "AWS", "Vercel", "Postman"],
};

export default function Skills() {
  return (
    <Section id="skills">
      <Container>
        <SectionTitle eyebrow="Skills" title="Technologies I Work With" />

        <div className="grid md:grid-cols-2 gap-8">
          {Object.entries(skills).map(([category, items]) => (
            <div
              key={category}
              className="bg-card border border-border rounded-2xl p-8"
            >
              <h3 className="text-2xl font-semibold mb-6 text-foreground">
                {category}
              </h3>

              <div className="flex flex-wrap gap-3">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 rounded-full bg-background border border-border text-muted hover:text-foreground hover:border-primary transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}