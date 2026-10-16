import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CoffeeModelProps {
  scale?: number;
  interactive?: boolean;
}

export const CoffeeModel: React.FC<CoffeeModelProps> = ({ scale = 1, interactive = true }) => {
  const groupRef = useRef<THREE.Group>(null);
  const steamRef = useRef<THREE.Group>(null);

  // Steam particle setup
  const steamParticles = useMemo(() => {
    return Array.from({ length: 12 }, () => ({
      x: (Math.random() - 0.5) * 0.25,
      y: 0.8 + Math.random() * 0.6,
      z: (Math.random() - 0.5) * 0.25,
      speed: 0.008 + Math.random() * 0.012,
      scale: 0.04 + Math.random() * 0.04,
      initialY: 0.8 + Math.random() * 0.6,
    }));
  }, []);

  useFrame((state) => {
    if (groupRef.current && interactive) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.35;
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.5) * 0.04;
    }

    // Animate steam particles rising
    if (steamRef.current) {
      steamRef.current.children.forEach((child, i) => {
        child.position.y += steamParticles[i].speed;
        child.position.x += Math.sin(state.clock.getElapsedTime() * 2 + i) * 0.002;
        if (child.position.y > 1.6) {
          child.position.y = 0.85;
        }
      });
    }
  });

  return (
    <group ref={groupRef} scale={[scale, scale, scale]} dispose={null}>
      {/* Matte Black Subway Charcoal Tumbler Body */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[0.55, 0.42, 1.35, 36]} />
        <meshStandardMaterial
          color="#1E2228"
          roughness={0.4}
          metalness={0.2}
        />
      </mesh>

      {/* Tangerine Grip Silicone Sleeve (Campus Accent) */}
      <mesh castShadow receiveShadow position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.558, 0.485, 0.65, 36]} />
        <meshStandardMaterial
          color="#F26A21"
          roughness={0.6}
          metalness={0.05}
        />
      </mesh>

      {/* Embossed University / Scran Crest Badge on Sleeve */}
      <mesh position={[0, 0.08, 0.53]} castShadow>
        <boxGeometry args={[0.26, 0.16, 0.03]} />
        <meshStandardMaterial
          color="#FFFFFF"
          roughness={0.3}
        />
      </mesh>

      {/* Tumbler Top Lid */}
      <group position={[0, 0.7, 0]}>
        {/* Main lid disc */}
        <mesh castShadow position={[0, 0, 0]}>
          <cylinderGeometry args={[0.58, 0.58, 0.08, 36]} />
          <meshStandardMaterial color="#2B303A" roughness={0.5} />
        </mesh>
        {/* Raised Drinking Spout Rim */}
        <mesh castShadow position={[0, 0.05, 0]}>
          <cylinderGeometry args={[0.54, 0.54, 0.04, 36]} />
          <meshStandardMaterial color="#1E2228" roughness={0.4} />
        </mesh>
        {/* Sipping Hole Orifice */}
        <mesh position={[0, 0.075, 0.38]}>
          <boxGeometry args={[0.12, 0.02, 0.06]} />
          <meshStandardMaterial color="#0A0B0D" roughness={0.9} />
        </mesh>
      </group>

      {/* Rising Hot Steam Particles */}
      <group ref={steamRef}>
        {steamParticles.map((p, idx) => (
          <mesh key={`steam-${idx}`} position={[p.x, p.y, p.z]}>
            <sphereGeometry args={[p.scale, 8, 8]} />
            <meshStandardMaterial
              color="#F3ECE3"
              transparent
              opacity={0.35}
              roughness={1}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
};
