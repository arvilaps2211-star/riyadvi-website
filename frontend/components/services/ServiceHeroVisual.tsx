import type { ServiceIconId } from "@/types/service";

/**
 * Distinctive, lightweight visual treatment for each service hero.
 *
 * This intentionally reuses `ServiceIconId` as the variant key instead of
 * introducing a separate `visualId` field on the Service data model, so the
 * icon used across cards/badges and the hero visual stay in sync from a
 * single source of truth.
 *
 * Each variant is plain SVG with a couple of CSS-driven animations (see
 * app/globals.css: .service-visual-*). No canvas, no WebGL, no per-service
 * component files — this keeps Stage 4's 3D architecture untouched and
 * avoids paying for six extra GPU contexts.
 */

type ServiceHeroVisualProps = {
  variant: ServiceIconId;
  className?: string;
};

export function ServiceHeroVisual({
  variant,
  className = "",
}: ServiceHeroVisualProps) {
  return (
    <div
      className={`relative aspect-[4/3] w-full overflow-hidden border border-border-gold/30 bg-[#0a0a0a] ${className}`.trim()}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.1),transparent_55%)]" />
      {renderVariant(variant)}
    </div>
  );
}

function renderVariant(variant: ServiceIconId) {
  switch (variant) {
    case "globe":
      return <WebDevelopmentVisual />;
    case "smartphone":
      return <AppDevelopmentVisual />;
    case "megaphone":
      return <DigitalMarketingVisual />;
    case "view":
      return <ArVrVisual />;
    case "box":
      return <ThreeDModelingVisual />;
    case "palette":
      return <UiUxVisual />;
    default:
      return null;
  }
}

const GOLD = "#D4AF37";
const GOLD_DIM = "rgba(212, 175, 55, 0.35)";
const WHITE_DIM = "rgba(255, 255, 255, 0.18)";

/** Web Development — a browser chrome with a connected UI / code layout. */
function WebDevelopmentVisual() {
  return (
    <svg
      viewBox="0 0 320 240"
      className="relative h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="30" y="30" width="260" height="180" rx="4" fill="none" stroke={WHITE_DIM} strokeWidth="1.5" />
      <rect x="30" y="30" width="260" height="26" rx="4" fill="rgba(212,175,55,0.06)" stroke={WHITE_DIM} strokeWidth="1.5" />
      <circle cx="44" cy="43" r="3" fill={GOLD_DIM} />
      <circle cx="56" cy="43" r="3" fill={WHITE_DIM} />
      <circle cx="68" cy="43" r="3" fill={WHITE_DIM} />
      <rect x="60" y="72" width="80" height="8" rx="2" fill={GOLD} className="service-visual-pulse" />
      <rect x="60" y="90" width="140" height="6" rx="2" fill={WHITE_DIM} />
      <rect x="60" y="104" width="120" height="6" rx="2" fill={WHITE_DIM} />
      <rect x="60" y="118" width="150" height="6" rx="2" fill={WHITE_DIM} />
      <rect x="60" y="140" width="64" height="22" rx="3" fill="none" stroke={GOLD} strokeWidth="1.5" />
      <line x1="200" y1="72" x2="270" y2="72" stroke={GOLD_DIM} strokeWidth="1.5" />
      <line x1="200" y1="72" x2="200" y2="150" stroke={GOLD_DIM} strokeWidth="1.5" />
      <line x1="200" y1="150" x2="270" y2="150" stroke={GOLD_DIM} strokeWidth="1.5" />
      <circle cx="270" cy="72" r="4" fill={GOLD} className="service-visual-pulse" />
      <circle cx="270" cy="150" r="4" fill={GOLD} style={{ animationDelay: "1.1s" }} className="service-visual-pulse" />
    </svg>
  );
}

/** App Development — a device outline with an app grid and a live notification. */
function AppDevelopmentVisual() {
  return (
    <svg
      viewBox="0 0 320 240"
      className="relative h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="120" y="24" width="80" height="192" rx="12" fill="none" stroke={WHITE_DIM} strokeWidth="1.5" />
      <rect x="128" y="42" width="64" height="140" rx="2" fill="rgba(255,255,255,0.03)" stroke={WHITE_DIM} strokeWidth="1" />
      <rect x="152" y="190" width="16" height="3" rx="1.5" fill={WHITE_DIM} />
      {[0, 1, 2, 3].map((row) =>
        [0, 1].map((col) => (
          <rect
            key={`${row}-${col}`}
            x={136 + col * 28}
            y={50 + row * 32}
            width="22"
            height="22"
            rx="5"
            fill={row === 0 && col === 0 ? GOLD : "rgba(212,175,55,0.15)"}
            stroke={GOLD_DIM}
            strokeWidth="1"
          />
        )),
      )}
      <circle cx="192" cy="46" r="6" fill={GOLD} className="service-visual-pulse" />
      <circle cx="192" cy="46" r="2.2" fill="#000" />
    </svg>
  );
}

/** Digital Marketing — ascending bars with an upward trend line. */
function DigitalMarketingVisual() {
  const bars = [46, 70, 58, 92, 120];
  return (
    <svg
      viewBox="0 0 320 240"
      className="relative h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="50" y1="190" x2="270" y2="190" stroke={WHITE_DIM} strokeWidth="1.5" />
      {bars.map((h, i) => (
        <rect
          key={i}
          x={64 + i * 40}
          y={190 - h}
          width="24"
          height={h}
          fill={i === bars.length - 1 ? GOLD : "rgba(212,175,55,0.22)"}
          className="service-visual-rise"
          style={{ animationDelay: `${i * 0.18}s` }}
        />
      ))}
      <polyline
        points="64,150 104,130 144,142 184,96 224,70 264,58"
        fill="none"
        stroke={GOLD}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="264" cy="58" r="4.5" fill={GOLD} className="service-visual-pulse" />
    </svg>
  );
}

/** AR / VR — layered depth frames suggesting a spatial / immersive environment. */
function ArVrVisual() {
  return (
    <svg
      viewBox="0 0 320 240"
      className="relative h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="60" y="70" width="140" height="100" rx="4" fill="none" stroke={WHITE_DIM} strokeWidth="1.5" />
      <rect x="90" y="50" width="140" height="100" rx="4" fill="none" stroke={GOLD_DIM} strokeWidth="1.5" />
      <rect x="120" y="30" width="140" height="100" rx="4" fill="none" stroke={GOLD} strokeWidth="1.5" />
      <circle cx="190" cy="80" r="3" fill={GOLD} className="service-visual-pulse" />
      <line x1="120" y1="30" x2="60" y2="70" stroke={WHITE_DIM} strokeWidth="1" />
      <line x1="260" y1="30" x2="200" y2="70" stroke={WHITE_DIM} strokeWidth="1" />
      <line x1="120" y1="130" x2="60" y2="170" stroke={WHITE_DIM} strokeWidth="1" />
      <line x1="260" y1="130" x2="200" y2="170" stroke={WHITE_DIM} strokeWidth="1" />
      <rect x="120" y="30" width="140" height="2" fill={GOLD} opacity="0.7" className="service-visual-sweep" />
    </svg>
  );
}

/** 3D Modeling — an isometric wireframe object with an orbiting ring. */
function ThreeDModelingVisual() {
  return (
    <svg
      viewBox="0 0 320 240"
      className="relative h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(160,120)">
        <ellipse
          cx="0"
          cy="0"
          rx="92"
          ry="30"
          fill="none"
          stroke={GOLD_DIM}
          strokeWidth="1"
          className="service-visual-spin-slow"
        />
        <g stroke={GOLD} strokeWidth="1.5" fill="none">
          <polygon points="0,-58 50,-28 50,32 0,62 -50,32 -50,-28" opacity="0.9" />
          <polygon points="0,-58 50,-28 0,2 -50,-28" fill="rgba(212,175,55,0.08)" />
          <polygon points="0,2 50,-28 50,32 0,62" fill="rgba(212,175,55,0.14)" />
          <line x1="0" y1="-58" x2="0" y2="2" opacity="0.5" />
          <line x1="-50" y1="-28" x2="0" y2="2" opacity="0.5" />
          <line x1="50" y1="-28" x2="0" y2="2" opacity="0.5" />
        </g>
      </g>
    </svg>
  );
}

/** UI/UX Design — a wireframe layout grid with a selected component and swatches. */
function UiUxVisual() {
  return (
    <svg
      viewBox="0 0 320 240"
      className="relative h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="40" y="34" width="240" height="172" rx="4" fill="none" stroke={WHITE_DIM} strokeWidth="1.5" />
      <rect x="40" y="34" width="70" height="172" fill="rgba(255,255,255,0.03)" stroke={WHITE_DIM} strokeWidth="1" />
      <rect x="54" y="50" width="42" height="6" rx="2" fill={WHITE_DIM} />
      <rect x="54" y="66" width="42" height="6" rx="2" fill={WHITE_DIM} />
      <rect x="54" y="82" width="42" height="6" rx="2" fill={GOLD_DIM} />
      <rect
        x="126"
        y="52"
        width="80"
        height="52"
        rx="3"
        fill="none"
        stroke={GOLD}
        strokeWidth="1.5"
        strokeDasharray="4 3"
        className="service-visual-pulse"
      />
      <rect x="126" y="116" width="140" height="8" rx="2" fill={WHITE_DIM} />
      <rect x="126" y="132" width="100" height="8" rx="2" fill={WHITE_DIM} />
      {[GOLD, "rgba(212,175,55,0.5)", "rgba(255,255,255,0.25)"].map((c, i) => (
        <circle key={i} cx={132 + i * 20} cy={168} r="8" fill={c} />
      ))}
    </svg>
  );
}
