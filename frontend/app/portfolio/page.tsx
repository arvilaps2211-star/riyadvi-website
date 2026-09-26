import { featuredPortfolioProjects, portfolioProjects } from "@/data/portfolio";
import { PortfolioVisual } from "@/components/portfolio/PortfolioVisual";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageCta } from "@/components/ui/PageCta";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Explore selected Riyadvi client work across industries including healthcare, retail, real estate, and technology.",
};

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Selected Client Work"
        description="A selection of brands and products Riyadvi has supported. Each case study highlights challenge, solution, and related capabilities."
        actions={
          <Button href="/contact" variant="primary">
            Start a Project
          </Button>
        }
      />

      {featuredPortfolioProjects.length > 0 ? (
        <section
          aria-labelledby="portfolio-featured-heading"
          className="border-b border-border bg-surface py-14 sm:py-16 lg:py-20"
        >
          <Container>
            <SectionHeading
              eyebrow="Featured Work"
              title="Selected Highlights"
              description="A closer look at a few projects that reflect the range of work below."
              alignment="center"
              className="max-w-3xl"
              titleId="portfolio-featured-heading"
            />
            <ul className="mt-10 grid gap-6 lg:grid-cols-3">
              {featuredPortfolioProjects.map((project) => (
                <li key={project.slug}>
                  <Link
                    href={`/portfolio/${project.slug}`}
                    className="group flex h-full flex-col border border-border-gold/40 bg-[#0a0a0a] p-5 transition-colors hover:border-border-gold focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                  >
                    <PortfolioVisual variant={project.visualType} />
                    <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-gold">
                      {project.industry}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-white">
                      {project.name}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                      {project.shortDescription}
                    </p>
                    <span className="mt-4 inline-flex text-sm font-semibold text-gold">
                      View Case Study →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      <section className="bg-background py-14 sm:py-16 lg:py-20">
        <Container>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {portfolioProjects.map((project) => (
              <li key={project.slug}>
                <article className="group flex h-full flex-col border border-border bg-surface p-6 transition-colors hover:border-border-gold">
                  <PortfolioVisual variant={project.visualType} />
                  <h2 className="mt-5 text-xl font-semibold text-white">
                    {project.name}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                    {project.shortDescription}
                  </p>
                  <Link
                    href={`/portfolio/${project.slug}`}
                    className="mt-6 inline-flex text-sm font-semibold text-gold transition-colors hover:text-[#e0bc4a] focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                  >
                    View Case Study →
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <PageCta
        title="Have a project in mind?"
        description="Tell us what you're building. We'll help define the right digital approach."
      />
    </>
  );
}
