import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

type PageCtaProps = {
  title: string;
  description: string;
  href?: string;
  label?: string;
};

export function PageCta({
  title,
  description,
  href = "/contact",
  label = "Book a Free Consultation",
}: PageCtaProps) {
  return (
    <section className="border-t border-border bg-surface py-14 sm:py-16">
      <Container>
        <div className="flex flex-col gap-6 border border-border-gold/30 bg-[#0a0a0a] p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
              {description}
            </p>
          </div>
          <Button href={href} variant="primary" className="shrink-0">
            {label}
          </Button>
        </div>
      </Container>
    </section>
  );
}
