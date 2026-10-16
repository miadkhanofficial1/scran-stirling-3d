import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface BreakfastRollModelProps {
  scale?: number;
  interactive?: boolean;
}

export const BreakfastRollModel: React.FC<BreakfastRollModelProps> = ({ scale = 1, interactive = true }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current && interactive) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.25;
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.3) * 0.04;
    }
  });

  return (
    <group ref={groupRef} scale={[scale, scale, scale]} dispose={null}>
      {/* Wooden serving board */}
      <mesh receiveShadow position={[0, -0.38, 0]}>
        <cylinderGeometry args={[1.3, 1.3, 0.06, 36]} />
        <meshStandardMaterial color="#CBB394" roughness={0.7} />
      </mesh>

      {/* McGhee's Bottom Roll Half */}
      <mesh castShadow receiveShadow position={[0, -0.22, 0]}>
        <cylinderGeometry args={[0.9, 0.85, 0.22, 32]} />
        <meshStandardMaterial color="#E8D2AC" roughness={0.75} />
      </mesh>

      {/* Scottish Butter Sheen */}
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.82, 0.82, 0.02, 24]} />
        <meshStandardMaterial color="#FDE047" roughness={0.2} metalness={0.1} />
      </mesh>

      {/* Authentic Square Scottish Lorne Sausage */}
      <mesh castShadow receiveShadow position={[0, 0.02, 0]}>
        <boxGeometry args={[1.25, 0.18, 1.25]} />
        <meshStandardMaterial
          color="#5C2D1F"
          roughness={0.8}
          metalness={0.05}
        />
      </mesh>

      {/* Golden Scottish Tattie Scone (Triangular Farle) */}
      <mesh castShadow receiveShadow position={[0, 0.14, 0]} rotation={[0, 0.45, 0]}>
        <boxGeometry args={[1.15, 0.06, 1.15]} />
        <meshStandardMaterial
          color="#D49B45"
          roughness={0.85}
        />
      </mesh>

      {/* Crispy Smoked Back Bacon Strip */}
      <mesh castShadow position={[0, 0.2, 0]} rotation={[0, -0.5, 0]}>
        <boxGeometry args={[1.3, 0.04, 0.4]} />
        <meshStandardMaterial color="#7F1D1D" roughness={0.6} />
      </mesh>

      {/* Floury McGhee's Top Roll with Crusty Browed Top */}
      <group position={[0, 0.32, 0]}>
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[0.95, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial
            color="#D8AF6B"
            roughness={0.65}
          />
        </mesh>
        {/* Flour Dusting on Top of Roll */}
        <mesh position={[0, 0.42, 0]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.65, 0.7, 0.02, 24]} />
          <meshStandardMaterial
            color="#FDF8F0"
            roughness={0.95}
          />
        </mesh>
      </group>
    </group>
  );
};
