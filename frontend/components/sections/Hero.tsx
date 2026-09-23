import { HeroScenePlaceholder } from "@/components/3d/HeroScenePlaceholder";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

function HeroContent() {
  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
        Riyadvi Software Technologies
      </p>
      <h1
        id="hero-heading"
        className="text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.25rem]"
      >
        Custom Software &amp; Digital Solutions to Grow Your Business
      </h1>
      <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">
        Web &amp; App Development, UI/UX Design, and Business Strategy – all
        tailored to your needs.
      </p>
    </div>
  );
}

function HeroActions() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      <Button href="/contact" variant="primary">
        Book a Free Consultation
      </Button>
      <Button href="/services" variant="outline">
        Explore Our Solutions
      </Button>
    </div>
  );
}

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden border-b border-border bg-background"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(212,175,55,0.08),transparent_55%)]"
        aria-hidden
      />
      <Container className="relative py-16 sm:py-20 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-10 xl:gap-16">
          <div className="flex min-h-[min(52vh,520px)] flex-col justify-center gap-8 lg:min-h-[calc(100vh-8rem)] lg:max-h-[820px] lg:py-6">
            <HeroContent />
            <HeroActions />
          </div>
          <HeroScenePlaceholder />
        </div>
      </Container>
    </section>
  );
}
