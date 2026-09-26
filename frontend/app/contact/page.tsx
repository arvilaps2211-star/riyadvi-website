import { ContactForm } from "@/components/forms/ContactForm";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a free consultation with Riyadvi Software Technologies. Tell us about your project goals and constraints.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Book a Free Consultation"
        description="Tell us what you're building. We'll help you explore the right software, design, and digital direction for your business."
      />

      <section className="bg-background py-14 sm:py-16 lg:py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <ContactForm />

            <div className="border border-border-gold/30 bg-[#0a0a0a] p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-white">
                Useful next steps
              </h2>
              <ul className="mt-6 space-y-4">
                {[
                  { href: "/business-health-checkup", label: "Business Health Checkup" },
                  { href: "/software-project-planning-guide", label: "Project Planning Guide" },
                  { href: "/services", label: "Explore services" },
                  { href: "/portfolio", label: "Browse portfolio" },
                  { href: "/careers", label: "View careers" },
                  { href: "/about", label: "About Riyadvi" },
                ].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm font-semibold text-gold hover:text-[#e0bc4a] focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                    >
                      {item.label} →
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-xs leading-relaxed text-muted">
                Phone, email, and office details will be published when
                confirmed. We do not invent contact details for this stage.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
