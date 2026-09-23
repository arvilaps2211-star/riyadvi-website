import { getJob, jobs } from "@/data/careers";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageCta } from "@/components/ui/PageCta";
import { PageHero } from "@/components/ui/PageHero";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type CareerDetailProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return jobs.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({
  params,
}: CareerDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) return { title: "Role Not Found" };
  return {
    title: job.title,
    description: job.description,
  };
}

export default async function CareerDetailPage({ params }: CareerDetailProps) {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) notFound();

  return (
    <>
      <PageHero
        eyebrow="Careers"
        title={job.title}
        description={job.description}
        actions={
          <>
            <Button href="/contact" variant="primary">
              Apply / Inquire
            </Button>
            <Button href="/careers" variant="outline">
              All Open Roles
            </Button>
          </>
        }
      />

      <section className="border-b border-border bg-surface py-10">
        <Container>
          <dl className="grid gap-4 sm:grid-cols-3">
            {[
              { label: "Location", value: job.location },
              { label: "Employment type", value: job.employmentType },
              { label: "Experience", value: job.experience },
            ].map((item) => (
              <div key={item.label} className="border border-border bg-[#0a0a0a] p-5">
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-gold">
                  {item.label}
                </dt>
                <dd className="mt-2 text-sm text-white">{item.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="bg-background py-14 sm:py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-3">
            <div>
              <h2 className="text-xl font-semibold text-white">Responsibilities</h2>
              <ul className="mt-4 space-y-3">
                {job.responsibilities.map((item) => (
                  <li
                    key={item}
                    className="border-l border-border-gold/50 pl-4 text-sm text-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">Requirements</h2>
              <ul className="mt-4 space-y-3">
                {job.requirements.map((item) => (
                  <li
                    key={item}
                    className="border-l border-border-gold/50 pl-4 text-sm text-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">Skills</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <li
                    key={skill}
                    className="border border-border bg-surface px-3 py-1.5 text-xs text-white"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <PageCta
        title={`Interested in ${job.title}?`}
        description="Reach out via the contact page. Application forms and ATS integration will be added in a later stage."
        href="/contact"
        label="Apply / Inquire"
      />
    </>
  );
}
