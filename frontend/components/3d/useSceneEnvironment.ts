"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type RefObject } from "react";

function useMediaQuery(query: string, serverValue = false) {
  return useSyncExternalStore(
    (onStoreChange) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", onStoreChange);
      return () => media.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}

export function usePrefersReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

export function useCompactScene() {
  return useMediaQuery("(max-width: 767px)");
}

function subscribeNoop() {
  return () => {};
}

function getWebGLSupport() {
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ??
      canvas.getContext("webgl") ??
      canvas.getContext("experimental-webgl");
    return Boolean(gl);
  } catch {
    return false;
  }
}

/**
 * Client WebGL probe via useSyncExternalStore.
 * SceneCanvas is only mounted from dynamic(..., { ssr: false }) scenes,
 * so the server snapshot is never shown as a permanent "LOADING" state.
 */
export function useWebGLSupport() {
  return useSyncExternalStore(subscribeNoop, getWebGLSupport, () => false);
}

export function usePointerCursor(active: boolean) {
  useEffect(() => {
    document.body.style.cursor = active ? "pointer" : "";
    return () => {
      document.body.style.cursor = "";
    };
  }, [active]);
}

export function useInView(rootMargin = "180px"): {
  ref: RefObject<HTMLDivElement | null>;
  inView: boolean;
} {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Immediate check — Observer callbacks can be delayed one frame.
    const rect = node.getBoundingClientRect();
    const viewportH = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < viewportH + 220 && rect.bottom > -220) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { root: null, rootMargin, threshold: 0 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, inView };
}
