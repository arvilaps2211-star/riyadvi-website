import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function BusinessHealthCheckupCTA() {
  return (
    <section
      aria-labelledby="business-health-heading"
      className="border-b border-border bg-background py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <div className="grid gap-8 border border-border-gold/30 bg-surface p-8 sm:p-10 lg:grid-cols-[minmax(0,1.4fr)_auto] lg:items-center lg:gap-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Business Health Checkup
            </p>
            <h2
              id="business-health-heading"
              className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl"
            >
              Is Your Business Ready for Its Next Digital Growth Stage?
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              Riyadvi helps businesses evaluate digital presence, technology
              readiness, and growth opportunities — so you can prioritize the
              next steps with clarity.
            </p>
          </div>
          <Button
            href="/business-health-checkup"
            variant="primary"
            className="w-full sm:w-auto lg:justify-self-end"
          >
            Start Business Health Checkup
          </Button>
        </div>
      </Container>
    </section>
  );
}
