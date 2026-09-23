"use client";

import { Canvas } from "@react-three/fiber";
import {
  Component,
  Suspense,
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type ErrorInfo,
  type ReactNode,
} from "react";
import { SCENE_BG } from "./scene-config";
import {
  useCompactScene,
  usePrefersReducedMotion,
  useWebGLSupport,
} from "./useSceneEnvironment";

type SceneCanvasProps = {
  children: ReactNode;
  camera: ComponentProps<typeof Canvas>["camera"];
  className?: string;
  fallback: ReactNode;
};

type BoundaryState = { hasError: boolean };

class SceneErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  BoundaryState
> {
  state: BoundaryState = { hasError: false };

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[SceneCanvas]", error, info.componentStack);
    // Defer fallback swap — getDerivedStateFromError would unmount the R3F
    // root during the same render that threw, causing a second crash.
    queueMicrotask(() => {
      this.setState({ hasError: true });
    });
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

export function SceneCanvas({
  children,
  camera,
  className,
  fallback,
}: SceneCanvasProps) {
  const webgl = useWebGLSupport();
  const compact = useCompactScene();
  const reducedMotion = usePrefersReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const node = wrapRef.current;
    if (!node || !webgl) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.08 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [webgl]);

  useEffect(() => {
    return () => {
      document.body.style.cursor = "";
    };
  }, []);

  // Client-only scenes: false means no WebGL — show graceful fallback.
  if (!webgl) {
    return <>{fallback}</>;
  }

  return (
    <div ref={wrapRef} className={className}>
      <SceneErrorBoundary fallback={fallback}>
        <Canvas
          camera={camera}
          dpr={compact ? 1 : [1, 1.5]}
          frameloop={reducedMotion || !visible ? "demand" : "always"}
          gl={{
            antialias: !compact,
            alpha: true,
            powerPreference: compact ? "low-power" : "high-performance",
            stencil: false,
            depth: true,
          }}
          resize={{ scroll: false }}
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            touchAction: "pan-y",
            background: SCENE_BG,
          }}
          onCreated={({ gl }) => {
            gl.domElement.style.touchAction = "pan-y";
          }}
        >
          <Suspense fallback={null}>{children}</Suspense>
        </Canvas>
      </SceneErrorBoundary>
    </div>
  );
}
