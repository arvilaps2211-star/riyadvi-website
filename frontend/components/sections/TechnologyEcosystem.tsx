import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const technologies = [
  "React",
  "Next.js",
  "Node.js",
  "JavaScript",
  "Three.js",
  "React Three Fiber",
  "MongoDB",
  "MySQL",
  "WordPress",
] as const;

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
          description="A technology stack selected for performance, maintainability, and room to grow — with an interactive 3D ecosystem view planned for the next stage."
          alignment="center"
          className="max-w-3xl"
          titleId="technology-ecosystem-heading"
        />

        <div className="mx-auto mt-14 max-w-4xl rounded-sm border border-border bg-[#080808] px-6 py-10 sm:px-8 sm:py-12">
          <div className="mx-auto max-w-xs border border-border-gold bg-[#0a0a0a] px-6 py-5 text-center">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-gold">
              Riyadvi Technology
            </p>
            <p className="mt-2 text-sm text-muted">
              CSS layout preview — interactive orbit system in Stage 4
            </p>
          </div>

          <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:hidden">
            {technologies.map((tech) => (
              <li key={tech}>
                <span className="flex h-full items-center justify-center border border-border bg-[#0d0d0d] px-3 py-3 text-center text-xs font-medium text-white">
                  {tech}
                </span>
              </li>
            ))}
          </ul>

          <div className="relative mx-auto mt-8 hidden min-h-[480px] max-w-3xl lg:block">
            <div
              className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/15"
              aria-hidden
            />
            <div
              className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5"
              aria-hidden
            />
            <ul className="absolute inset-0 m-0 list-none p-0">
              {technologies.map((tech, index) => {
                const angle =
                  (index / technologies.length) * Math.PI * 2 - Math.PI / 2;
                const radiusX = 42;
                const radiusY = 38;
                const x = 50 + Math.cos(angle) * radiusX;
                const y = 50 + Math.sin(angle) * radiusY;

                return (
                  <li
                    key={tech}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${x}%`, top: `${y}%` }}
                  >
                    <span className="inline-flex min-w-[7.5rem] items-center justify-center border border-border bg-[#0d0d0d] px-3 py-2 text-center text-sm font-medium text-white transition-colors hover:border-border-gold">
                      {tech}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
