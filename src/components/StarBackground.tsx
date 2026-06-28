"use client";

import { Points, PointMaterial } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { inSphere } from "maath/random";
import { useState, useRef, Suspense } from "react";
import type { Points as PointsType } from "three";

const StarField = (props: Record<string, unknown>) => {
  const ref = useRef<PointsType | null>(null);
  const [sphere] = useState(() =>
    inSphere(new Float32Array(1800), { radius: 1.2 })
  );

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={sphere as Float32Array}
        stride={3}
        frustumCulled
        {...props}
      >
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarFieldOuter = (props: Record<string, unknown>) => {
  const ref = useRef<PointsType | null>(null);
  const [sphere] = useState(() =>
    inSphere(new Float32Array(900), { radius: 1.5 })
  );

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta / 18;
      ref.current.rotation.y += delta / 25;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 6]}>
      <Points
        ref={ref}
        positions={sphere as Float32Array}
        stride={3}
        frustumCulled
        {...props}
      >
        <PointMaterial
          transparent
          color="#b49eff"
          size={0.0015}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

export const StarsCanvas = () => (
  <div
    className="w-full h-auto fixed inset-0 z-[20] pointer-events-none"
    aria-hidden="true"
  >
    <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 1.5]} gl={{ antialias: false }}>
      <Suspense fallback={null}>
        <StarField />
        <StarFieldOuter />
      </Suspense>
    </Canvas>
  </div>
);
