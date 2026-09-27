"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Smooth scrolling for the public marketing site only.
 *
 * Mounted from SiteChrome's public branch — never rendered on /admin
 * routes, so admin table scrolling, sticky headers, and keyboard
 * navigation are completely unaffected.
 *
 * Skips entirely under `prefers-reduced-motion: reduce`: native scrolling
 * is left alone rather than forcing smooth scrolling on users who asked
 * not to have it. Anchor links (`<a href="#section">`) and normal browser
 * navigation continue to work either way, since Lenis intercepts wheel/
 * touch input, not link clicks.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    // Single driver: gsap.ticker (already running for ScrollTrigger),
    // converted from seconds to milliseconds for Lenis. Do not also run a
    // separate requestAnimationFrame loop — that would double-drive Lenis.
    const tickerFn = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerFn);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
