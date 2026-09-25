import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function FinalCTA() {
  return (
    <section
      aria-labelledby="final-cta-heading"
      className="bg-background py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <div className="relative overflow-hidden border border-border bg-surface px-8 py-12 text-center sm:px-12 sm:py-14">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.1),transparent_55%)]"
            aria-hidden
          />
          <div className="relative mx-auto max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Work With Riyadvi
            </p>
            <h2
              id="final-cta-heading"
              className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl"
            >
              Let&apos;s Build What Your Business Needs Next.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              Share your goals and constraints. We&apos;ll help you explore the
              right software, design, and digital direction for your business.
            </p>
            <div className="mt-8 flex justify-center">
              <Button href="/contact" variant="primary">
                Book a Free Consultation
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
