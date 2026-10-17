import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";

const experience = [
  {
    title: "Software Developer (Projects)",
    company: "Personal Projects",
    period: "2023 - Present",
    description:
      "Developed full-stack web and mobile applications including MediSync, BubbleBlizz, and Fixit, focusing on scalable architecture and user experience.",
    technologies: ["Laravel", "React", "Next.js", "Flutter", "MySQL"],
  },
];

export default function Experience() {
  return (
    <Section id="experience">
      <Container>
        <SectionTitle eyebrow="Experience" title="Professional Experience" />
        <div className="space-y-8">
          {experience.map((item) => (
            <div
              key={item.title}
              className="bg-card border border-border rounded-2xl p-8"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div>
                  <h3 className="text-2xl font-semibold mb-2 text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-primary mb-4">{item.company}</p>
                  <p className="text-muted mb-4">{item.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full bg-background border border-border text-sm text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="text-muted whitespace-nowrap">{item.period}</span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
