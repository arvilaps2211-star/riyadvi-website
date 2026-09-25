import { jobs } from "@/data/careers";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageCta } from "@/components/ui/PageCta";
import { PageHero } from "@/components/ui/PageHero";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Riyadvi Software Technologies. Explore open roles in engineering, design, and digital marketing.",
};

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build Premium Digital Work With Us"
        description="Riyadvi is looking for people who care about craft, clarity, and business outcomes — not just shipping screens."
        actions={
          <Button href="/contact" variant="outline">
            General Inquiry
          </Button>
        }
      />

      <section className="bg-background py-14 sm:py-16 lg:py-20">
        <Container>
          <ul className="grid gap-5">
            {jobs.map((job) => (
              <li key={job.slug}>
                <article className="flex flex-col gap-4 border border-border bg-surface p-6 transition-colors hover:border-border-gold sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      {job.title}
                    </h2>
                    <p className="mt-2 text-sm text-muted">
                      {job.location} · {job.employmentType} · {job.experience}
                    </p>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                      {job.description}
                    </p>
                  </div>
                  <Link
                    href={`/careers/${job.slug}`}
                    className="inline-flex shrink-0 text-sm font-semibold text-gold hover:text-[#e0bc4a] focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                  >
                    View role →
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <PageCta
        title="Don't see the right role?"
        description="Send an introduction and tell us how you'd like to contribute."
        href="/contact"
        label="Contact Riyadvi"
      />
    </>
  );
}
