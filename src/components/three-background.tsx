"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function FloatingTorus() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.08;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.06;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.3}>
      <mesh ref={meshRef}>
        <torusGeometry args={[1, 0.3, 12, 24]} />
        <MeshDistortMaterial
          color="#2ecbff"
          speed={1}
          distort={0.08}
          transparent
          opacity={0.4}
        />
      </mesh>
    </Float>
  );
}

function FloatingIcosahedron() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.05;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.04;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[2, -1, -2]}>
        <icosahedronGeometry args={[0.8, 2]} />
        <MeshDistortMaterial
          color="#4aa3ff"
          speed={1}
          distort={0.06}
          transparent
          opacity={0.3}
        />
      </mesh>
    </Float>
  );
}

function FloatingOctahedron() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.06;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.08;
    }
  });

  return (
    <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.4}>
      <mesh ref={meshRef} position={[-2.5, 1, -3]}>
        <octahedronGeometry args={[0.6, 1]} />
        <MeshDistortMaterial
          color="#90dcff"
          speed={1.2}
          distort={0.05}
          transparent
          opacity={0.25}
        />
      </mesh>
    </Float>
  );
}

function FloatingSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
      <mesh ref={meshRef} position={[1.5, 2, -4]}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <MeshDistortMaterial
          color="#2ecbff"
          speed={1}
          distort={0.05}
          transparent
          opacity={0.3}
        />
      </mesh>
    </Float>
  );
}

export function ThreeBackground() {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobileViewport = window.matchMedia("(max-width: 767px)").matches;
    const lowCores = typeof navigator.hardwareConcurrency === "number" && navigator.hardwareConcurrency <= 4;
    const lowMemory =
      "deviceMemory" in navigator &&
      typeof (navigator as Navigator & { deviceMemory?: number }).deviceMemory === "number" &&
      ((navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8) <= 4;
    const saveData =
      "connection" in navigator &&
      Boolean(
        (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData
      );

    setShouldRender(!reducedMotion && !isMobileViewport && !lowCores && !lowMemory && !saveData);
  }, []);

  if (!shouldRender) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }} dpr={[1, 1.5]} performance={{ min: 0.5 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.2} />
        <FloatingTorus />
        <FloatingIcosahedron />
        <FloatingOctahedron />
      </Canvas>
    </div>
  );
}
