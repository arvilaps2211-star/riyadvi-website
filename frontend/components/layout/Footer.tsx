import { Container } from "@/components/ui/Container";
import Link from "next/link";

const serviceLinks = [
  { href: "/services/web-development", label: "Web Development" },
  { href: "/services/app-development", label: "App Development" },
  { href: "/services/digital-marketing", label: "Digital Marketing" },
  { href: "/services/ar-vr", label: "AR / VR" },
  { href: "/services/3d-modeling", label: "3D Modeling" },
  { href: "/services/ui-ux-design", label: "UI/UX Design" },
] as const;

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
] as const;

const resourceLinks = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  {
    href: "/business-health-checkup",
    label: "Business Health Checkup",
  },
  {
    href: "/software-project-planning-guide",
    label: "Software Project Planning Guide",
  },
] as const;

type FooterLinkGroupProps = {
  title: string;
  links: ReadonlyArray<{ href: string; label: string }>;
};

function FooterLinkGroup({ title, links }: FooterLinkGroupProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-white">
        {title}
      </h3>
      <ul className="mt-4 space-y-3">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className="text-sm text-muted transition-colors hover:text-gold focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <Container className="py-14 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="inline-flex flex-col focus-visible:rounded-sm"
              aria-label="Riyadvi home"
            >
              <span className="text-xl font-bold tracking-[0.18em] text-white">
                RIYADVI
              </span>
              <span
                className="mt-2 h-px w-16 bg-gradient-to-r from-gold/80 to-transparent"
                aria-hidden
              />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              Technology &amp; Digital Solutions Partner
            </p>
          </div>

          <div className="grid gap-10 sm:col-span-1 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-3">
            <FooterLinkGroup title="Services" links={serviceLinks} />
            <FooterLinkGroup title="Company" links={companyLinks} />
            <FooterLinkGroup title="Resources" links={resourceLinks} />
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-white">
              Contact
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Ready to discuss your next project? Visit our contact page to
              reach the Riyadvi team.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex text-sm font-semibold text-gold transition-colors hover:text-[#e0bc4a] focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              Go to Contact
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted">
            &copy; {year} Riyadvi Software Technologies. All rights reserved.
          </p>
          <p className="text-xs text-muted">
            Premium digital solutions for modern businesses.
          </p>
        </div>
      </Container>
    </footer>
  );
}
