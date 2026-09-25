"use client";

import { useState } from "react";

/**
 * The one required interactive/3D-inspired case-study experience.
 *
 * This deliberately does NOT touch Stage 4's Three.js/R3F architecture —
 * it's a small client component with plain SVG + React state, so hovering
 * a node highlights its connection and label. Lightweight, no extra GPU
 * canvas, works the same on mobile via tap.
 */

const NODES = [
  { id: "input", label: "Guided Input", angle: -90 },
  { id: "ai", label: "AI Interpretation", angle: -18 },
  { id: "flow", label: "Conversational Flow", angle: 54 },
  { id: "output", label: "Guided Result", angle: 126 },
  { id: "trust", label: "Trust & Clarity", angle: 198 },
];

const RADIUS = 78;

export function PortfolioOrbitShowcase() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden border border-border-gold/30 bg-[#0a0a0a]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.12),transparent_55%)]" />
      <svg
        viewBox="0 0 400 250"
        className="relative h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Interactive diagram of the Laxmi Astro AI guided consultation flow. Hover or focus a node to see its role."
      >
        <g transform="translate(200,125)">
          <circle
            r={RADIUS}
            fill="none"
            stroke="rgba(212,175,55,0.25)"
            strokeWidth="1"
            className="service-visual-spin-slow"
          />
          <circle r="14" fill="#D4AF37" opacity="0.9" />
          <text
            x="0"
            y="4"
            textAnchor="middle"
            fontSize="8"
            fill="#0a0a0a"
            fontWeight="600"
          >
            AI
          </text>

          {NODES.map((node) => {
            const rad = (node.angle * Math.PI) / 180;
            const x = RADIUS * Math.cos(rad);
            const y = RADIUS * Math.sin(rad);
            const isActive = activeId === node.id;
            return (
              <g key={node.id}>
                <line
                  x1="0"
                  y1="0"
                  x2={x}
                  y2={y}
                  stroke={isActive ? "#D4AF37" : "rgba(212,175,55,0.25)"}
                  strokeWidth={isActive ? 2 : 1}
                />
                <circle
                  cx={x}
                  cy={y}
                  r={isActive ? 9 : 6}
                  fill={isActive ? "#D4AF37" : "rgba(212,175,55,0.4)"}
                  className="cursor-pointer transition-all"
                  tabIndex={0}
                  role="button"
                  aria-label={node.label}
                  onMouseEnter={() => setActiveId(node.id)}
                  onMouseLeave={() => setActiveId(null)}
                  onFocus={() => setActiveId(node.id)}
                  onBlur={() => setActiveId(null)}
                  onClick={() =>
                    setActiveId((current) => (current === node.id ? null : node.id))
                  }
                />
              </g>
            );
          })}
        </g>
      </svg>

      <div className="absolute inset-x-0 bottom-0 flex items-center justify-center border-t border-border-gold/20 bg-[#0a0a0a]/90 px-4 py-3 text-center">
        <p className="text-xs font-medium tracking-wide text-gold sm:text-sm">
          {activeId
            ? NODES.find((n) => n.id === activeId)?.label
            : "Hover or focus a node to explore the guided AI flow"}
        </p>
      </div>
    </div>
  );
}
