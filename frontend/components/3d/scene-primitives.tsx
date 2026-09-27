"use client";

import { Billboard, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { GOLD } from "./scene-config";
import {
  usePrefersReducedMotion,
} from "./useSceneEnvironment";

function hashed(index: number, salt: number) {
  const value = Math.sin(index * 127.1 + salt * 311.7) * 43758.5453;
  return value - Math.floor(value);
}

export function SceneLights() {
  return (
    <>
      <color attach="background" args={["#050505"]} />
      <fog attach="fog" args={["#050505", 7, 16]} />
      <ambientLight intensity={0.35} color="#f5f0e6" />
      <pointLight
        color={GOLD}
        intensity={12}
        distance={10}
        decay={2}
        position={[0, 0.1, 0]}
      />
      <directionalLight
        color="#fff6dc"
        intensity={1.4}
        position={[3.5, 5, 4]}
      />
    </>
  );
}

export function FloatingParticles({ count }: { count: number }) {
  const reducedMotion = usePrefersReducedMotion();
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const data = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const radius = 1.1 + hashed(i, 1) * 3.1;
      const theta = hashed(i, 2) * Math.PI * 2;
      const phi = Math.acos(2 * hashed(i, 3) - 1);
      data[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      data[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.55;
      data[i * 3 + 2] = radius * Math.cos(phi);
    }
    return data;
  }, [count]);

  useFrame((_, delta) => {
    if (reducedMotion || !points.current) return;
    points.current.rotation.y += delta * 0.035;
  });

  return (
    <points ref={points} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={GOLD}
        size={0.028}
        sizeAttenuation
        transparent
        opacity={0.42}
        depthWrite={false}
      />
    </points>
  );
}

export function ConnectionLines({
  targets,
}: {
  targets: ReadonlyArray<readonly [number, number, number]>;
}) {
  const geometry = useMemo(() => {
    const positions: number[] = [];
    for (const [x, y, z] of targets) {
      positions.push(0, 0, 0, x, y, z);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3),
    );
    return geo;
  }, [targets]);

  useEffect(() => {
    return () => geometry.dispose();
  }, [geometry]);

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial
        color={GOLD}
        transparent
        opacity={0.22}
        depthWrite={false}
      />
    </lineSegments>
  );
}

/**
 * In-scene labels (Billboard + Text).
 *
 * Do NOT use @react-three/drei Html here.
 * Html creates a ReactDOM.createRoot portal per label and cleans up with
 * removeChild + root.unmount(). Under React 19 Strict Mode (and hover-driven
 * remounts) that races the current render and throws:
 *   - NotFoundError: removeChild
 *   - "Attempted to synchronously unmount a root while React was already rendering"
 *
 * WebGL text stays inside the R3F tree — no DOM portal lifecycle.
 */
export function NodeLabel({
  label,
  emphasized,
  hideUntilHover = false,
}: {
  label: string;
  emphasized: boolean;
  hideUntilHover?: boolean;
}) {
  const visible = !hideUntilHover || emphasized;

  return (
    <group position={[0, 0.42, 0]} visible={visible}>
      <Billboard follow>
        <Text
          fontSize={emphasized ? 0.13 : 0.11}
          color={GOLD}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.01}
          outlineColor="#050505"
          maxWidth={1.5}
          textAlign="center"
          fillOpacity={emphasized ? 1 : 0.92}
          depthOffset={-1}
        >
          {label.toUpperCase()}
        </Text>
      </Billboard>
    </group>
  );
}
