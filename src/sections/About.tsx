import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";

export default function About() {
  return (
    <Section id="about">
      <Container>
        <SectionTitle eyebrow="About Me" title="Get to know me" />

        <div className="grid md:grid-cols-2 gap-10">
          {/* About Card */}
          <div className="bg-card border border-border rounded-2xl p-8">
            <h3 className="text-2xl font-semibold mb-4 text-foreground">
              Professional Summary
            </h3>

            <p className="text-muted leading-relaxed">
              I am a Computer Science undergraduate at APIIT Sri Lanka (affiliated with Staffordshire University) with a strong passion for full-stack development, cloud technologies, and software engineering. I enjoy building scalable applications and solving real-world problems through technology.
            </p>
          </div>

          {/* Career Card */}
          <div className="bg-card border border-border rounded-2xl p-8">
            <h3 className="text-2xl font-semibold mb-4 text-foreground">
              Career Objective
            </h3>

            <p className="text-muted leading-relaxed">
              Seeking internship and junior software engineering opportunities to apply my technical skills, gain industry experience, and contribute to meaningful software solutions while continuously learning and growing as a developer.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}