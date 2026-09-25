"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import {
  ECOSYSTEM_RINGS,
  ECOSYSTEM_TECH,
  GOLD,
  type EcosystemTech,
} from "./scene-config";
import { SceneCanvas } from "./SceneCanvas";
import {
  useCompactScene,
  usePointerCursor,
  usePrefersReducedMotion,
} from "./useSceneEnvironment";
import {
  FloatingParticles,
  NodeLabel,
  SceneLights,
} from "./scene-primitives";
import { HeroScenePlaceholder } from "./HeroScenePlaceholder";

function EcosystemCore({ reducedMotion }: { reducedMotion: boolean }) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (reducedMotion || !mesh.current) return;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.15;
    mesh.current.rotation.x = state.clock.elapsedTime * 0.06;
  });

  return (
    <group>
      <mesh ref={mesh}>
        <octahedronGeometry args={[0.48, 0]} />
        <meshStandardMaterial
          color="#120f08"
          emissive={GOLD}
          emissiveIntensity={1.1}
          metalness={0.8}
          roughness={0.18}
        />
      </mesh>
      <mesh>
        <octahedronGeometry args={[0.62, 0]} />
        <meshBasicMaterial
          color={GOLD}
          wireframe
          transparent
          opacity={0.45}
        />
      </mesh>
      <NodeLabel label="Technology" emphasized />
    </group>
  );
}

function TechNode({
  item,
  active,
  onActiveChange,
  reducedMotion,
  offset,
}: {
  item: EcosystemTech;
  active: boolean;
  onActiveChange: (value: EcosystemTech | null) => void;
  reducedMotion: boolean;
  offset: number;
}) {
  const group = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  usePointerCursor(hovered);

  useFrame((state) => {
    if (!group.current) return;
    if (reducedMotion) {
      group.current.position.y = 0;
      return;
    }
    group.current.position.y =
      Math.sin(state.clock.elapsedTime * 1.1 + offset) * 0.05;
  });

  return (
    <group ref={group}>
      <mesh
        onPointerOver={(event) => {
          event.stopPropagation();
          setHovered(true);
          onActiveChange(item);
        }}
        onPointerOut={() => {
          setHovered(false);
          onActiveChange(null);
        }}
      >
        <octahedronGeometry args={[0.12, 0]} />
        <meshStandardMaterial
          color={active ? GOLD : "#16120a"}
          emissive={GOLD}
          emissiveIntensity={active ? 1.7 : 0.4}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
      <NodeLabel label={item} emphasized={active} hideUntilHover />
    </group>
  );
}

function OrbitRing({
  radius,
  speed,
  y,
  items,
  active,
  onActiveChange,
  reducedMotion,
}: {
  radius: number;
  speed: number;
  y: number;
  items: readonly EcosystemTech[];
  active: EcosystemTech | null;
  onActiveChange: (value: EcosystemTech | null) => void;
  reducedMotion: boolean;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current || reducedMotion) return;
    group.current.rotation.y = state.clock.elapsedTime * speed;
  });

  return (
    <group position={[0, y, 0]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.007, 8, compactSegments(radius)]} />
        <meshBasicMaterial color={GOLD} transparent opacity={0.32} />
      </mesh>
      <group ref={group}>
        {items.map((item, index) => {
          const angle = (index / items.length) * Math.PI * 2;
          return (
            <group
              key={item}
              position={[
                Math.cos(angle) * radius,
                0,
                Math.sin(angle) * radius,
              ]}
            >
              <TechNode
                item={item}
                active={active === item}
                onActiveChange={onActiveChange}
                reducedMotion={reducedMotion}
                offset={index}
              />
            </group>
          );
        })}
      </group>
    </group>
  );
}

function compactSegments(radius: number) {
  return radius > 2.4 ? 72 : 56;
}

function InvalidateOnChange({ value }: { value: string | null }) {
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    invalidate();
  }, [value, invalidate]);

  return null;
}

function EcosystemExperience({
  active,
  onActiveChange,
}: {
  active: EcosystemTech | null;
  onActiveChange: (value: EcosystemTech | null) => void;
}) {
  const root = useRef<THREE.Group>(null);
  const compact = useCompactScene();
  const reducedMotion = usePrefersReducedMotion();

  const rings = useMemo(() => {
    if (!compact) return ECOSYSTEM_RINGS;
    return [
      {
        radius: 1.85,
        speed: 0.08,
        y: 0,
        items: ECOSYSTEM_TECH,
      },
    ];
  }, [compact]);

  useFrame((state) => {
    if (!root.current) return;
    const targetY = reducedMotion ? 0.35 : 0.35 + state.pointer.x * 0.22;
    const targetX = reducedMotion ? 0.42 : 0.42 - state.pointer.y * 0.12;
    root.current.rotation.y = THREE.MathUtils.lerp(
      root.current.rotation.y,
      targetY,
      0.05,
    );
    root.current.rotation.x = THREE.MathUtils.lerp(
      root.current.rotation.x,
      targetX,
      0.05,
    );
  });

  return (
    <>
      <InvalidateOnChange value={active} />
      <SceneLights />
      <hemisphereLight args={["#fff4d6", "#0a0a0a", 0.35]} />
      <FloatingParticles count={compact ? 28 : 80} />
      <group ref={root}>
        <EcosystemCore reducedMotion={reducedMotion} />
        {rings.map((ring) => (
          <OrbitRing
            key={ring.radius}
            radius={ring.radius}
            speed={ring.speed}
            y={ring.y}
            items={ring.items}
            active={active}
            onActiveChange={onActiveChange}
            reducedMotion={reducedMotion}
          />
        ))}
      </group>
    </>
  );
}

export function EcosystemScene() {
  const [active, setActive] = useState<EcosystemTech | null>(null);

  return (
    <div className="mx-auto mt-14 max-w-4xl">
      <div
        className="relative z-0 min-h-[340px] overflow-hidden rounded-sm border border-border bg-[#050505] sm:min-h-[420px] lg:min-h-[520px]"
        aria-label="Interactive 3D view of Riyadvi's technology ecosystem, with a Technology core surrounded by React, Next.js, Node.js, MongoDB, MySQL, JavaScript, Three.js, React Three Fiber, and WordPress."
      >
        <SceneCanvas
          className="absolute inset-0 h-full w-full"
          camera={{
            position: [4.4, 3.1, 4.6],
            fov: 38,
            near: 0.1,
            far: 30,
          }}
          fallback={
            <HeroScenePlaceholder variant="embedded" label="Unavailable" />
          }
        >
          <EcosystemExperience active={active} onActiveChange={setActive} />
        </SceneCanvas>
      </div>

      <ul className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {ECOSYSTEM_TECH.map((tech) => {
          const isActive = active === tech;
          return (
            <li key={tech}>
              <button
                type="button"
                aria-pressed={isActive}
                className={`flex h-full w-full items-center justify-center border px-3 py-3 text-center text-xs font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
                  isActive
                    ? "border-border-gold bg-gold/10 text-gold"
                    : "border-border bg-[#0d0d0d] text-white hover:border-border-gold"
                }`}
                onMouseEnter={() => setActive(tech)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(tech)}
                onBlur={() => setActive(null)}
              >
                {tech}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
