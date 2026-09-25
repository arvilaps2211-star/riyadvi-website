"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { GOLD, HERO_NODES, heroNodePosition } from "./scene-config";
import { SceneCanvas } from "./SceneCanvas";
import {
  useCompactScene,
  usePointerCursor,
  usePrefersReducedMotion,
} from "./useSceneEnvironment";
import {
  ConnectionLines,
  FloatingParticles,
  NodeLabel,
  SceneLights,
} from "./scene-primitives";
import { HeroScenePlaceholder } from "./HeroScenePlaceholder";

function TechnologyCore({ reducedMotion }: { reducedMotion: boolean }) {
  const inner = useRef<THREE.Mesh>(null);
  const shell = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (reducedMotion) return;
    const t = state.clock.elapsedTime;
    if (inner.current) {
      inner.current.rotation.y = t * 0.18;
      inner.current.rotation.x = t * 0.08;
      const pulse = 1 + Math.sin(t * 1.6) * 0.035;
      inner.current.scale.setScalar(pulse);
    }
    if (shell.current) {
      shell.current.rotation.y = -t * 0.12;
      shell.current.rotation.z = t * 0.05;
    }
  });

  return (
    <group>
      <mesh ref={inner}>
        <icosahedronGeometry args={[0.52, 1]} />
        <meshStandardMaterial
          color="#1a1508"
          emissive={GOLD}
          emissiveIntensity={1.05}
          metalness={0.72}
          roughness={0.22}
        />
      </mesh>
      <mesh ref={shell} scale={1.18}>
        <icosahedronGeometry args={[0.52, 1]} />
        <meshBasicMaterial
          color={GOLD}
          wireframe
          transparent
          opacity={0.28}
        />
      </mesh>
      <mesh scale={1.55}>
        <sphereGeometry args={[0.52, 24, 24]} />
        <meshBasicMaterial
          color={GOLD}
          transparent
          opacity={0.06}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function HeroNode({
  position,
  label,
  reducedMotion,
  compact,
}: {
  position: [number, number, number];
  label: string;
  reducedMotion: boolean;
  compact: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const baseY = position[1];
  usePointerCursor(hovered);

  useFrame((state) => {
    if (!group.current || !mesh.current) return;
    const t = state.clock.elapsedTime;
    group.current.position.y = reducedMotion
      ? baseY
      : baseY + Math.sin(t * 0.9 + position[0]) * 0.06;
    const target = hovered ? 1.22 : 1;
    if (reducedMotion) {
      mesh.current.scale.setScalar(target);
      return;
    }
    const next = THREE.MathUtils.lerp(mesh.current.scale.x, target, 0.12);
    mesh.current.scale.setScalar(next);
  });

  return (
    <group ref={group} position={[position[0], baseY, position[2]]}>
      <mesh
        ref={mesh}
        onPointerOver={(event) => {
          event.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => {
          setHovered(false);
        }}
      >
        <sphereGeometry args={[0.11, 20, 20]} />
        <meshStandardMaterial
          color={hovered ? GOLD : "#14110a"}
          emissive={GOLD}
          emissiveIntensity={hovered ? 1.35 : 0.38}
          metalness={0.55}
          roughness={0.28}
        />
      </mesh>
      <NodeLabel
        label={label}
        emphasized={hovered}
        hideUntilHover={compact}
      />
    </group>
  );
}

function HeroExperience() {
  const parallax = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);
  const compact = useCompactScene();
  const reducedMotion = usePrefersReducedMotion();
  const radius = compact ? 1.45 : 1.85;

  const nodes = useMemo(
    () =>
      HERO_NODES.map((node, index) => ({
        ...node,
        position: heroNodePosition(index, HERO_NODES.length, radius),
      })),
    [radius],
  );

  const connections = useMemo(
    () => nodes.map((node) => node.position),
    [nodes],
  );

  useFrame((state, delta) => {
    if (spin.current && !reducedMotion) {
      spin.current.rotation.y += delta * 0.12;
    }
    if (!parallax.current) return;
    const targetY = reducedMotion ? 0 : state.pointer.x * 0.28;
    const targetX = reducedMotion ? 0.08 : state.pointer.y * 0.16;
    parallax.current.rotation.y = THREE.MathUtils.lerp(
      parallax.current.rotation.y,
      targetY,
      reducedMotion ? 1 : 0.045,
    );
    parallax.current.rotation.x = THREE.MathUtils.lerp(
      parallax.current.rotation.x,
      targetX,
      reducedMotion ? 1 : 0.045,
    );
  });

  return (
    <>
      <SceneLights />
      <FloatingParticles count={compact ? 42 : 110} />
      <group ref={parallax}>
        <group ref={spin}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.35, 0]}>
          <ringGeometry args={[1.7, 1.72, 64]} />
          <meshBasicMaterial
            color={GOLD}
            transparent
            opacity={0.16}
            side={THREE.DoubleSide}
          />
        </mesh>
        <TechnologyCore reducedMotion={reducedMotion} />
        <ConnectionLines targets={connections} />
        {nodes.map((node) => (
          <HeroNode
            key={node.id}
            position={node.position}
            label={node.label}
            reducedMotion={reducedMotion}
            compact={compact}
          />
        ))}
        </group>
      </group>
    </>
  );
}

export function HeroScene() {
  return (
    <div
      className="relative z-0 aspect-square w-full overflow-hidden rounded-sm border border-border-gold/40 bg-[#050505]"
      aria-label="Interactive 3D visualization of the Riyadvi digital technology ecosystem, with a central core connected to Web, Apps, AI, Cloud, Data, Design, 3D, and Digital Growth."
    >
      <SceneCanvas
        className="absolute inset-0 h-full w-full"
        camera={{ position: [0, 0.2, 6.35], fov: 38, near: 0.1, far: 28 }}
        fallback={
          <HeroScenePlaceholder variant="embedded" label="Unavailable" />
        }
      >
        <HeroExperience />
      </SceneCanvas>
    </div>
  );
}
