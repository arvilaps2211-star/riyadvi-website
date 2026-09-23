import { EcosystemSceneLazy } from "@/components/3d/lazy-scenes";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function TechnologyEcosystem() {
  return (
    <section
      aria-labelledby="technology-ecosystem-heading"
      className="border-b border-border bg-surface py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <SectionHeading
          eyebrow="Technology Ecosystem"
          title="Built With Modern, Proven Tools"
          description="A technology stack selected for performance, maintainability, and room to grow — explored here as an interactive ecosystem around a central Technology core."
          alignment="center"
          className="max-w-3xl"
          titleId="technology-ecosystem-heading"
        />

        <EcosystemSceneLazy />
      </Container>
    </section>
  );
}
