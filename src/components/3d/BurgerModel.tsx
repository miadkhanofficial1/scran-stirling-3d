import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface BurgerModelProps {
  scale?: number;
  interactive?: boolean;
}

export const BurgerModel: React.FC<BurgerModelProps> = ({ scale = 1, interactive = true }) => {
  const groupRef = useRef<THREE.Group>(null);

  // Random sesame seed positions across the curved top bun
  const sesameSeeds = useMemo(() => {
    const list: { pos: [number, number, number]; rot: [number, number, number] }[] = [];
    for (let i = 0; i < 42; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      if (phi < Math.PI / 2.3) {
        const r = 0.98;
        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = 0.55 + r * Math.cos(phi) * 0.45;
        const z = r * Math.sin(phi) * Math.sin(theta);
        list.push({
          pos: [x, y, z],
          rot: [phi, theta, 0],
        });
      }
    }
    return list;
  }, []);

  useFrame((state) => {
    if (groupRef.current && interactive) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.28;
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.4) * 0.05;
    }
  });

  return (
    <group ref={groupRef} scale={[scale, scale, scale]} dispose={null}>
      {/* Bottom Brioche Bun */}
      <mesh castShadow receiveShadow position={[0, -0.4, 0]}>
        <cylinderGeometry args={[0.92, 0.85, 0.26, 36]} />
        <meshStandardMaterial
          color="#D4934B"
          roughness={0.65}
          metalness={0.05}
        />
      </mesh>

      {/* Scran House Relish / Sauce Layer */}
      <mesh position={[0, -0.25, 0]}>
        <cylinderGeometry args={[0.88, 0.88, 0.04, 32]} />
        <meshStandardMaterial
          color="#C2410C"
          roughness={0.3}
        />
      </mesh>

      {/* Lower Scottish Beef Patty */}
      <mesh castShadow receiveShadow position={[0, -0.15, 0]}>
        <cylinderGeometry args={[0.96, 0.96, 0.16, 32]} />
        <meshStandardMaterial
          color="#422216"
          roughness={0.85}
          metalness={0.1}
        />
      </mesh>

      {/* Melted Cheese (Monterey Jack / Scottish Cheddar) */}
      <mesh position={[0, -0.05, 0]} rotation={[0, 0.4, 0]} castShadow>
        <boxGeometry args={[1.35, 0.04, 1.35]} />
        <meshStandardMaterial
          color="#F59E0B"
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>

      {/* Upper Scottish Beef Patty */}
      <mesh castShadow receiveShadow position={[0, 0.07, 0]}>
        <cylinderGeometry args={[0.96, 0.96, 0.16, 32]} />
        <meshStandardMaterial
          color="#3B1E14"
          roughness={0.85}
          metalness={0.1}
        />
      </mesh>

      {/* Crispy Smoked Bacon Strips */}
      <group position={[0, 0.17, 0]}>
        <mesh castShadow rotation={[0.05, 0.6, 0]}>
          <boxGeometry args={[1.35, 0.03, 0.32]} />
          <meshStandardMaterial
            color="#7F1D1D"
            roughness={0.5}
          />
        </mesh>
        <mesh castShadow rotation={[-0.05, -0.7, 0]}>
          <boxGeometry args={[1.35, 0.03, 0.32]} />
          <meshStandardMaterial
            color="#881337"
            roughness={0.5}
          />
        </mesh>
      </group>

      {/* Crisp Rippled Green Lettuce */}
      <mesh position={[0, 0.23, 0]} rotation={[0, 0.2, 0]} castShadow>
        <cylinderGeometry args={[1.05, 1.05, 0.05, 16]} />
        <meshStandardMaterial
          color="#22C55E"
          roughness={0.45}
        />
      </mesh>

      {/* Fresh Tomato Slices */}
      <group position={[0, 0.28, 0]}>
        <mesh position={[-0.3, 0, 0.1]} castShadow>
          <cylinderGeometry args={[0.42, 0.42, 0.05, 24]} />
          <meshStandardMaterial color="#DC2626" roughness={0.3} />
        </mesh>
        <mesh position={[0.3, 0, -0.1]} castShadow>
          <cylinderGeometry args={[0.42, 0.42, 0.05, 24]} />
          <meshStandardMaterial color="#DC2626" roughness={0.3} />
        </mesh>
      </group>

      {/* Golden Glazed Brioche Top Bun */}
      <group position={[0, 0.38, 0]}>
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[0.98, 36, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial
            color="#C67D34"
            roughness={0.4}
            metalness={0.1}
          />
        </mesh>
        {/* Bun lower rim */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.98, 0.98, 0.08, 36]} />
          <meshStandardMaterial
            color="#BE742B"
            roughness={0.45}
          />
        </mesh>

        {/* Scattered White Sesame Seeds */}
        {sesameSeeds.map((seed, idx) => (
          <mesh
            key={`sesame-${idx}`}
            position={seed.pos}
            rotation={seed.rot}
            castShadow
          >
            <sphereGeometry args={[0.022, 6, 6]} />
            <meshStandardMaterial color="#FDFBF7" roughness={0.6} />
          </mesh>
        ))}
      </group>
    </group>
  );
};
