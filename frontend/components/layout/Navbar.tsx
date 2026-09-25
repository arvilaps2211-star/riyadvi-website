"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/careers", label: "Careers" },
] as const;

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const pathname = usePathname();

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    if (menuOpen) {
      window.addEventListener("keydown", onKeyDown);
    }
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen, closeMenu]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-[#050505]/85 backdrop-blur-md supports-[backdrop-filter]:bg-[#050505]/70">
      <Container as="nav" aria-label="Main navigation">
        <div className="flex h-16 items-center justify-between gap-4 lg:h-[4.25rem]">
          <Link
            href="/"
            className="group flex shrink-0 flex-col focus-visible:rounded-sm"
            aria-label="Riyadvi home"
          >
            <span className="text-lg font-bold tracking-[0.18em] text-white transition-colors group-hover:text-gold sm:text-xl">
              RIYADVI
            </span>
            <span
              className="mt-0.5 h-px w-full max-w-[4.5rem] bg-gradient-to-r from-gold/80 to-transparent opacity-80 transition-opacity group-hover:opacity-100"
              aria-hidden
            />
          </Link>

          <ul className="hidden flex-1 items-center justify-center gap-1 md:flex lg:gap-2">
            {navLinks.map(({ href, label }) => {
              const isActive =
                href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
                      isActive
                        ? "text-gold"
                        : "text-muted hover:text-white"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden md:block">
            <Button href="/contact" variant="primary">
              Contact
            </Button>
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-white transition-colors hover:border-border-gold hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold md:hidden"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <X className="h-5 w-5" aria-hidden />
            ) : (
              <Menu className="h-5 w-5" aria-hidden />
            )}
          </button>
        </div>
      </Container>

      {menuOpen ? (
        <div
          id={menuId}
          className="border-t border-border bg-surface md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <Container className="py-4">
            <ul className="flex flex-col gap-1">
              {navLinks.map(({ href, label }) => {
                const isActive =
                  href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(href);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`block rounded-md px-3 py-3 text-base font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
                        isActive
                          ? "bg-gold/10 text-gold"
                          : "text-muted hover:bg-white/5 hover:text-white"
                      }`}
                      onClick={closeMenu}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
              <li className="pt-2">
                <Button
                  href="/contact"
                  variant="primary"
                  className="w-full"
                  onClick={closeMenu}
                >
                  Contact
                </Button>
              </li>
            </ul>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
