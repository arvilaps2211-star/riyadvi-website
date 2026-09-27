"use client";

import dynamic from "next/dynamic";
import { EcosystemScenePlaceholder, HeroScenePlaceholder } from "./HeroScenePlaceholder";
import { useInView } from "./useSceneEnvironment";

/**
 * Hero is above the fold — load the 3D bundle immediately.
 * Do not gate on IntersectionObserver (that left users stuck on "LOADING").
 */
const HeroScene = dynamic(
  () => import("./HeroScene").then((module) => module.HeroScene),
  {
    ssr: false,
    loading: () => <HeroScenePlaceholder label="Loading" />,
  },
);

const EcosystemScene = dynamic(
  () => import("./EcosystemScene").then((module) => module.EcosystemScene),
  {
    ssr: false,
    loading: () => <EcosystemScenePlaceholder />,
  },
);

export function HeroSceneLazy() {
  return (
    <div
      aria-hidden
      className="w-full max-w-lg justify-self-center lg:max-w-none lg:justify-self-end"
    >
      <HeroScene />
    </div>
  );
}

export function EcosystemSceneLazy() {
  const { ref, inView } = useInView("220px");

  return (
    <div ref={ref} className="w-full">
      {inView ? (
        // Only the live canvas is hidden from assistive tech — not this
        // wrapper as a whole. EcosystemScenePlaceholder (rendered below,
        // before intersection) already renders its own real, visible,
        // non-hidden <ul> of technology names; hiding this whole wrapper
        // would have wrongly hidden that too.
        <div aria-hidden>
          <EcosystemScene />
        </div>
      ) : (
        <EcosystemScenePlaceholder />
      )}
    </div>
  );
}
