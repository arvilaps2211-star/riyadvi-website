import type { PortfolioVisualType } from "@/types/portfolio";

/**
 * Distinctive, lightweight visual treatment for each portfolio case study.
 *
 * Mirrors components/services/ServiceHeroVisual.tsx: plain SVG + a couple of
 * CSS-driven animations (see app/globals.css: .service-visual-* — reused
 * here rather than duplicated), keyed off `PortfolioProject.visualType`.
 * No canvas, no WebGL — Stage 4's 3D architecture stays untouched.
 */

type PortfolioVisualProps = {
  variant: PortfolioVisualType;
  className?: string;
};

export function PortfolioVisual({
  variant,
  className = "",
}: PortfolioVisualProps) {
  return (
    <div
      className={`relative aspect-[16/10] w-full overflow-hidden border border-border-gold/30 bg-[#0a0a0a] ${className}`.trim()}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.1),transparent_55%)]" />
      {renderVariant(variant)}
    </div>
  );
}

function renderVariant(variant: PortfolioVisualType) {
  switch (variant) {
    case "product":
      return <ProductVisual />;
    case "interface":
      return <InterfaceVisual />;
    case "mobile":
      return <MobileVisual />;
    case "dashboard":
      return <DashboardVisual />;
    case "healthcare":
      return <HealthcareVisual />;
    case "architecture":
      return <ArchitectureVisual />;
    case "ai-data":
      return <AiDataVisual />;
    case "3d":
      return <ThreeDVisual />;
    default:
      return null;
  }
}

const GOLD = "#D4AF37";
const GOLD_DIM = "rgba(212, 175, 55, 0.35)";
const WHITE_DIM = "rgba(255, 255, 255, 0.18)";

/** Product / brand showcase — a framed hero image plate with product chips. */
function ProductVisual() {
  return (
    <svg viewBox="0 0 400 250" className="relative h-full w-full" xmlns="http://www.w3.org/2000/svg">
      <rect x="40" y="34" width="320" height="140" rx="4" fill="none" stroke={WHITE_DIM} strokeWidth="1.5" />
      <rect x="56" y="50" width="140" height="108" rx="3" fill="rgba(212,175,55,0.08)" stroke={GOLD_DIM} strokeWidth="1.5" />
      <circle cx="126" cy="104" r="26" fill="none" stroke={GOLD} strokeWidth="1.5" className="service-visual-pulse" />
      <rect x="212" y="56" width="148" height="8" rx="2" fill={WHITE_DIM} />
      <rect x="212" y="74" width="120" height="6" rx="2" fill={WHITE_DIM} />
      <rect x="212" y="88" width="130" height="6" rx="2" fill={WHITE_DIM} />
      <rect x="212" y="112" width="70" height="22" rx="3" fill="none" stroke={GOLD} strokeWidth="1.5" />
      <line x1="40" y1="196" x2="360" y2="196" stroke={WHITE_DIM} strokeWidth="1" />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={40 + i * 46} y={208} width="34" height="10" rx="2" fill="rgba(212,175,55,0.18)" />
      ))}
    </svg>
  );
}

/** Interface / browser showcase — booking-style layout with a highlighted CTA. */
function InterfaceVisual() {
  return (
    <svg viewBox="0 0 400 250" className="relative h-full w-full" xmlns="http://www.w3.org/2000/svg">
      <rect x="40" y="30" width="320" height="190" rx="4" fill="none" stroke={WHITE_DIM} strokeWidth="1.5" />
      <rect x="40" y="30" width="320" height="24" fill="rgba(212,175,55,0.06)" stroke={WHITE_DIM} strokeWidth="1" />
      <circle cx="54" cy="42" r="3" fill={GOLD_DIM} />
      <circle cx="64" cy="42" r="3" fill={WHITE_DIM} />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={60 + i * 92} y={70} width="80" height="60" rx="3" fill="rgba(255,255,255,0.03)" stroke={WHITE_DIM} strokeWidth="1" />
      ))}
      <rect x="60" y="70" width="80" height="60" rx="3" fill="none" stroke={GOLD} strokeWidth="1.5" className="service-visual-pulse" />
      <rect x="150" y="150" width="100" height="26" rx="4" fill="none" stroke={GOLD} strokeWidth="1.5" />
      <line x1="150" y1="163" x2="230" y2="163" stroke={GOLD_DIM} strokeWidth="1" />
    </svg>
  );
}

/** Mobile app showcase — device outline with a workflow list and progress dots. */
function MobileVisual() {
  return (
    <svg viewBox="0 0 400 250" className="relative h-full w-full" xmlns="http://www.w3.org/2000/svg">
      <rect x="150" y="24" width="100" height="200" rx="14" fill="none" stroke={WHITE_DIM} strokeWidth="1.5" />
      <rect x="160" y="46" width="80" height="150" rx="2" fill="rgba(255,255,255,0.03)" stroke={WHITE_DIM} strokeWidth="1" />
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x="168"
          y={56 + i * 28}
          width="64"
          height="18"
          rx="4"
          fill={i === 0 ? "rgba(212,175,55,0.2)" : "rgba(255,255,255,0.04)"}
          stroke={i === 0 ? GOLD : WHITE_DIM}
          strokeWidth="1"
        />
      ))}
      <circle cx="200" cy="204" r="5" fill={GOLD} className="service-visual-pulse" />
    </svg>
  );
}

/** Dashboard showcase — a workflow/status grid, suited to institutional or lab products. */
function DashboardVisual() {
  return (
    <svg viewBox="0 0 400 250" className="relative h-full w-full" xmlns="http://www.w3.org/2000/svg">
      <rect x="40" y="34" width="320" height="182" rx="4" fill="none" stroke={WHITE_DIM} strokeWidth="1.5" />
      <rect x="56" y="50" width="90" height="60" rx="3" fill="none" stroke={GOLD_DIM} strokeWidth="1.5" />
      <rect x="156" y="50" width="90" height="60" rx="3" fill="none" stroke={GOLD} strokeWidth="1.5" className="service-visual-pulse" />
      <rect x="256" y="50" width="88" height="60" rx="3" fill="none" stroke={GOLD_DIM} strokeWidth="1.5" />
      <rect x="56" y="126" width="288" height="10" rx="2" fill={WHITE_DIM} />
      <rect x="56" y="146" width="220" height="8" rx="2" fill={WHITE_DIM} />
      <rect x="56" y="164" width="260" height="8" rx="2" fill={WHITE_DIM} />
      <rect x="56" y="182" width="180" height="8" rx="2" fill={WHITE_DIM} />
    </svg>
  );
}

/** Healthcare showcase — a service card layout with a trust/appointment marker. */
function HealthcareVisual() {
  return (
    <svg viewBox="0 0 400 250" className="relative h-full w-full" xmlns="http://www.w3.org/2000/svg">
      <rect x="40" y="34" width="320" height="182" rx="4" fill="none" stroke={WHITE_DIM} strokeWidth="1.5" />
      <circle cx="120" cy="100" r="34" fill="none" stroke={GOLD} strokeWidth="1.5" className="service-visual-pulse" />
      <line x1="120" y1="86" x2="120" y2="114" stroke={GOLD} strokeWidth="3" strokeLinecap="round" />
      <line x1="106" y1="100" x2="134" y2="100" stroke={GOLD} strokeWidth="3" strokeLinecap="round" />
      <rect x="188" y="70" width="140" height="8" rx="2" fill={WHITE_DIM} />
      <rect x="188" y="88" width="110" height="8" rx="2" fill={WHITE_DIM} />
      <rect x="188" y="122" width="80" height="24" rx="4" fill="none" stroke={GOLD} strokeWidth="1.5" />
      <rect x="60" y="160" width="280" height="8" rx="2" fill={WHITE_DIM} />
      <rect x="60" y="178" width="220" height="8" rx="2" fill={WHITE_DIM} />
    </svg>
  );
}

/** Architecture / property showcase — a plot/building outline with listing chips. */
function ArchitectureVisual() {
  return (
    <svg viewBox="0 0 400 250" className="relative h-full w-full" xmlns="http://www.w3.org/2000/svg">
      <polygon
        points="200,40 320,110 320,196 80,196 80,110"
        fill="none"
        stroke={GOLD}
        strokeWidth="1.5"
      />
      <line x1="80" y1="110" x2="320" y2="110" stroke={WHITE_DIM} strokeWidth="1" />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={110 + i * 70} y={140} width="44" height="40" fill="rgba(212,175,55,0.1)" stroke={GOLD_DIM} strokeWidth="1" />
      ))}
      <rect x="182" y="152" width="20" height="28" fill="rgba(212,175,55,0.25)" className="service-visual-pulse" />
      <line x1="40" y1="210" x2="360" y2="210" stroke={WHITE_DIM} strokeWidth="1" />
      <rect x="40" y="222" width="70" height="14" rx="2" fill="rgba(212,175,55,0.16)" />
      <rect x="118" y="222" width="70" height="14" rx="2" fill="rgba(212,175,55,0.16)" />
    </svg>
  );
}

/** AI / data showcase — a small orbiting node network (static variant). */
function AiDataVisual() {
  return (
    <svg viewBox="0 0 400 250" className="relative h-full w-full" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(200,125)">
        <circle r="70" fill="none" stroke={GOLD_DIM} strokeWidth="1" className="service-visual-spin-slow" />
        <circle r="42" fill="none" stroke={WHITE_DIM} strokeWidth="1" className="service-visual-spin" />
        <circle r="10" fill={GOLD} className="service-visual-pulse" />
        {[0, 60, 120, 180, 240, 300].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          const x = 70 * Math.cos(rad);
          const y = 70 * Math.sin(rad);
          return <circle key={deg} cx={x} cy={y} r="4" fill={GOLD_DIM} />;
        })}
      </g>
    </svg>
  );
}

/** 3D-inspired showcase — an isometric wireframe object, matching the 3D-modeling service visual. */
function ThreeDVisual() {
  return (
    <svg viewBox="0 0 400 250" className="relative h-full w-full" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(200,125)">
        <ellipse cx="0" cy="0" rx="100" ry="30" fill="none" stroke={GOLD_DIM} strokeWidth="1" className="service-visual-spin-slow" />
        <g stroke={GOLD} strokeWidth="1.5" fill="none">
          <polygon points="0,-60 54,-30 54,30 0,60 -54,30 -54,-30" opacity="0.9" />
          <polygon points="0,-60 54,-30 0,0 -54,-30" fill="rgba(212,175,55,0.08)" />
          <polygon points="0,0 54,-30 54,30 0,60" fill="rgba(212,175,55,0.14)" />
        </g>
      </g>
    </svg>
  );
}
