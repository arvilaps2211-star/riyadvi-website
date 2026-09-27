import { ECOSYSTEM_TECH } from "./scene-config";

type HeroScenePlaceholderProps = {
  variant?: "hero" | "embedded" | "ecosystem";
  /** Center label — use "Loading" while the bundle loads; "Unavailable" for WebGL fallback. */
  label?: "Loading" | "Unavailable";
};

export function HeroScenePlaceholder({
  variant = "hero",
  label = "Loading",
}: HeroScenePlaceholderProps) {
  const frameClass =
    variant === "embedded"
      ? "absolute inset-0"
      : variant === "ecosystem"
        ? "relative min-h-[340px] overflow-hidden rounded-sm border border-border bg-[#050505] sm:min-h-[420px] lg:min-h-[520px]"
        : "hero-scene-placeholder relative aspect-square w-full overflow-hidden rounded-sm";

  return (
    <div className={frameClass} aria-hidden>
      <div className="absolute inset-0 border border-border-gold/40 bg-surface/80" />
      <div className="absolute inset-[1px] bg-[#050505]" />

      <div className="absolute inset-0 grid place-items-center">
        <div className="relative h-[72%] w-[72%] max-h-[22rem] max-w-[22rem]">
          <div className="hero-scene-orbit absolute inset-0 rounded-full border border-gold/20" />
          <div className="hero-scene-orbit hero-scene-orbit--reverse absolute inset-[12%] rounded-full border border-white/10" />
          <div className="hero-scene-orbit absolute inset-[24%] rounded-full border border-gold/15" />

          <div className="absolute left-1/2 top-1/2 z-10 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-gold/50 bg-surface text-center shadow-[0_0_40px_rgba(212,175,55,0.12)]">
            <span className="text-[0.55rem] font-semibold uppercase tracking-[0.22em] text-gold">
              {label}
            </span>
            <span className="mt-1 text-[0.65rem] font-medium uppercase tracking-widest text-white">
              3D Scene
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function EcosystemScenePlaceholder() {
  return (
    <div className="mx-auto mt-14 max-w-4xl">
      <HeroScenePlaceholder variant="ecosystem" label="Loading" />
      <ul className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {ECOSYSTEM_TECH.map((tech) => (
          <li key={tech}>
            <span className="flex h-full items-center justify-center border border-border bg-[#0d0d0d] px-3 py-3 text-center text-xs font-medium text-white">
              {tech}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
