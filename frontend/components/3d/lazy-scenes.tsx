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
    <div className="w-full max-w-lg justify-self-center lg:max-w-none lg:justify-self-end">
      <HeroScene />
    </div>
  );
}

export function EcosystemSceneLazy() {
  const { ref, inView } = useInView("220px");

  return (
    <div ref={ref} className="w-full">
      {inView ? <EcosystemScene /> : <EcosystemScenePlaceholder />}
    </div>
  );
}
