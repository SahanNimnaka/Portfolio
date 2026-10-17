import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";

const education = [
  {
    degree: "BSc (Hons) Computer Science",
    institution: "APIIT Sri Lanka / Staffordshire University",
    period: "2023 - Present",
    description:
      "Pursuing BSc (Hons) Computer Science with focus on software engineering, web development, and modern technologies.",
  },
  {
    degree: "G.C.E Advanced Level",
    institution: "Combined Mathematics Stream",
    period: "2022",
    description:
      "Completed Advanced Level studies with a strong foundation in mathematics and analytical problem solving.",
  },
];

export default function Education() {
  return (
    <Section id="education">
      <Container>
        <SectionTitle eyebrow="Education" title="Academic Background" />

        <div className="space-y-8">
          {education.map((item) => (
            <div
              key={item.degree}
              className="bg-card border border-border rounded-2xl p-8"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div>
                  <h3 className="text-2xl font-semibold mb-2 text-foreground">
                    {item.degree}
                  </h3>
                  <p className="text-primary mb-4">{item.institution}</p>
                  <p className="text-muted">{item.description}</p>
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