/**
 * TODO:
 * Replace with the real React Three Fiber interactive technology ecosystem in Stage 4.
 */
export function HeroScenePlaceholder() {
  return (
    <div
      className="hero-scene-placeholder relative aspect-square w-full max-w-lg justify-self-center lg:max-w-none lg:justify-self-end"
      aria-hidden
    >
      <div className="absolute inset-0 rounded-sm border border-border-gold/40 bg-surface/80" />
      <div className="absolute inset-[1px] rounded-sm bg-[#050505]" />

      <div className="absolute inset-0 grid place-items-center">
        <div className="relative h-[72%] w-[72%]">
          <div className="hero-scene-orbit absolute inset-0 rounded-full border border-gold/20" />
          <div className="hero-scene-orbit hero-scene-orbit--reverse absolute inset-[12%] rounded-full border border-white/10" />
          <div className="hero-scene-orbit absolute inset-[24%] rounded-full border border-gold/15" />

          <div className="absolute left-1/2 top-1/2 z-10 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-gold/50 bg-surface text-center shadow-[0_0_40px_rgba(212,175,55,0.12)]">
            <span className="text-[0.55rem] font-semibold uppercase tracking-[0.22em] text-gold">
              Stage 4
            </span>
            <span className="mt-1 text-[0.65rem] font-medium uppercase tracking-widest text-white">
              3D Scene
            </span>
          </div>

          {[
            { label: "Web", style: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" },
            { label: "App", style: "right-0 top-1/2 translate-x-1/2 -translate-y-1/2" },
            { label: "3D", style: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2" },
            { label: "UX", style: "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2" },
          ].map((node) => (
            <div
              key={node.label}
              className={`absolute ${node.style} flex h-10 w-10 items-center justify-center rounded-full border border-border bg-[#0a0a0a] text-[0.65rem] font-semibold uppercase tracking-wider text-muted`}
            >
              {node.label}
            </div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(5,5,5,0.9),transparent_35%,transparent_65%,rgba(5,5,5,0.4))]" />
      <p className="absolute bottom-4 left-4 right-4 text-center text-[0.65rem] uppercase tracking-[0.16em] text-muted">
        Interactive technology visual — coming in Stage 4
      </p>
    </div>
  );
}
