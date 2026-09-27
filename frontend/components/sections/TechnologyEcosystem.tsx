import { EcosystemSceneLazy } from "@/components/3d/lazy-scenes";
import { ECOSYSTEM_TECH } from "@/components/3d/scene-config";
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

        {/*
          The orbiting labels inside EcosystemScene are drawn with drei's
          WebGL <Text> (see scene-primitives.tsx for why — drei's Html
          portal crashes under React 19 Strict Mode), which means they are
          invisible to screen readers: a <canvas> exposes no text content
          of its own. This sr-only list is the accessible equivalent of
          exactly what's named on the orbiting rings, kept in sync with the
          same ECOSYSTEM_TECH data the scene itself renders from — not a
          separate, driftable copy. The canvas itself is marked
          aria-hidden since this list is now its accessible substitute.
        */}
        <ul className="sr-only">
          {ECOSYSTEM_TECH.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>

        <EcosystemSceneLazy />
      </Container>
    </section>
  );
}
