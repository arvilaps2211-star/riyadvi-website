"use client";

import { useEffect, useRef, type ReactNode, type Ref } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type ScrollRevealProps = {
  children: ReactNode;
  /** Vertical offset (px) the element starts from before revealing. Default 28. */
  y?: number;
  /** Stagger (seconds) applied to direct children when `stagger` is true. */
  staggerChildren?: boolean;
  delay?: number;
  className?: string;
  /** Wrapper element — use this to preserve semantics (e.g. "ol" for a list). Defaults to "div". */
  as?: "div" | "ol" | "ul";
};

/**
 * Fades and lifts content into place as it scrolls into view. This is
 * intentionally a small, content-level reveal — it never touches the 3D
 * Hero, EcosystemScene, PortfolioOrbitShowcase, or ServiceHeroVisual;
 * those keep their own animation systems untouched.
 *
 * Respects `prefers-reduced-motion`: when set, content renders immediately
 * at full opacity with no animation and no ScrollTrigger is created at all.
 *
 * `as` lets a caller preserve semantic markup (e.g. an ordered list of
 * milestones) instead of always wrapping in a generic <div>.
 */
export function ScrollReveal({
  children,
  y = 28,
  staggerChildren = false,
  delay = 0,
  className = "",
  as = "div",
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      // No animation at all — content is already visible via the
      // no-JS-safe default styles, so there is nothing further to do.
      return;
    }

    const targets = staggerChildren ? Array.from(node.children) : node;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay,
          ease: "power2.out",
          stagger: staggerChildren ? 0.12 : 0,
          scrollTrigger: {
            trigger: node,
            start: "top 85%",
            once: true,
          },
        },
      );
    }, node);

    return () => ctx.revert();
  }, [y, staggerChildren, delay]);

  const Tag = as as "div";

  return (
    <Tag
      ref={ref as Ref<HTMLDivElement>}
      // Default state (before JS/GSAP takes over) is fully visible, so
      // content is never hidden if JS fails to load or run.
      className={className}
    >
      {children}
    </Tag>
  );
}
