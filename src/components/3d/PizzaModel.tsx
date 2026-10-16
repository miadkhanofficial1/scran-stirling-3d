import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface PizzaModelProps {
  scale?: number;
  interactive?: boolean;
}

export const PizzaModel: React.FC<PizzaModelProps> = ({ scale = 1, interactive = true }) => {
  const groupRef = useRef<THREE.Group>(null);

  // Pepperoni positions distributed on pizza
  const pepperoniPositions = useMemo(() => [
    [0, 0.16, 0],
    [0.75, 0.16, 0.3],
    [-0.7, 0.16, -0.4],
    [0.3, 0.16, 0.85],
    [-0.5, 0.16, 0.65],
    [-0.8, 0.16, 0.15],
    [0.65, 0.16, -0.6],
    [-0.1, 0.16, -0.9],
    [0.9, 0.16, -0.15],
  ], []);

  // Basil leaves positions
  const basilPositions = useMemo(() => [
    { pos: [0.35, 0.17, 0.35] as [number, number, number], rot: 0.4 },
    { pos: [-0.35, 0.17, -0.2] as [number, number, number], rot: -0.7 },
    { pos: [0.1, 0.17, -0.65] as [number, number, number], rot: 1.2 },
    { pos: [-0.4, 0.17, 0.4] as [number, number, number], rot: 2.1 },
  ], []);

  // Oregano flakes
  const flakePositions = useMemo(() => {
    const list: [number, number, number][] = [];
    for (let i = 0; i < 28; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 1.1;
      list.push([Math.cos(angle) * radius, 0.165, Math.sin(angle) * radius]);
    }
    return list;
  }, []);

  useFrame((state) => {
    if (groupRef.current && interactive) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.22;
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.2) * 0.04;
    }
  });

  return (
    <group ref={groupRef} scale={[scale, scale, scale]} dispose={null}>
      {/* Wooden Birch Pizza Paddle (Campus Birch Plywood) */}
      <group position={[0, -0.12, 0]}>
        {/* Round Paddle Board */}
        <mesh receiveShadow castShadow position={[0, 0, 0]}>
          <cylinderGeometry args={[1.5, 1.5, 0.08, 48]} />
          <meshStandardMaterial
            color="#D6C1A4"
            roughness={0.65}
            metalness={0.05}
          />
        </mesh>
        {/* Paddle Handle */}
        <mesh receiveShadow castShadow position={[0, 0, 1.9]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.28, 0.07, 1.0]} />
          <meshStandardMaterial
            color="#C4AE90"
            roughness={0.65}
            metalness={0.05}
          />
        </mesh>
      </group>

      {/* Pizza Base (Stone-Oven Crust) */}
      {/* Outer Puffy Blistered Crust */}
      <mesh receiveShadow castShadow position={[0, 0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.25, 0.13, 20, 48]} />
        <meshStandardMaterial
          color="#D49A50"
          roughness={0.75}
          metalness={0.1}
        />
      </mesh>

      {/* Pizza Dough Bed */}
      <mesh receiveShadow position={[0, 0.06, 0]}>
        <cylinderGeometry args={[1.28, 1.28, 0.08, 48]} />
        <meshStandardMaterial
          color="#DCAC6C"
          roughness={0.8}
        />
      </mesh>

      {/* San Marzano Tomato Sauce Layer */}
      <mesh receiveShadow position={[0, 0.11, 0]}>
        <cylinderGeometry args={[1.18, 1.18, 0.03, 40]} />
        <meshStandardMaterial
          color="#B82E12"
          roughness={0.5}
        />
      </mesh>

      {/* Melted Fior Di Latte Mozzarella Layer */}
      <mesh receiveShadow position={[0, 0.13, 0]}>
        <cylinderGeometry args={[1.12, 1.12, 0.03, 36]} />
        <meshStandardMaterial
          color="#FFF5DF"
          roughness={0.4}
          metalness={0.05}
        />
      </mesh>

      {/* Mozzarella Island Patches */}
      {[
        [-0.45, 0.145, 0.25],
        [0.4, 0.145, -0.3],
        [0.2, 0.145, 0.5],
        [-0.3, 0.145, -0.5],
        [0, 0.145, 0],
      ].map((pos, idx) => (
        <mesh key={`mozz-${idx}`} position={pos as [number, number, number]} castShadow>
          <sphereGeometry args={[0.22, 16, 16]} />
          <meshStandardMaterial
            color="#FFFDF2"
            roughness={0.35}
          />
        </mesh>
      ))}

      {/* Spicy Pepperoni Cups */}
      {pepperoniPositions.map((pos, idx) => (
        <group key={`pep-${idx}`} position={pos as [number, number, number]}>
          <mesh castShadow receiveShadow rotation={[0, 0, 0]}>
            <cylinderGeometry args={[0.2, 0.18, 0.035, 24]} />
            <meshStandardMaterial
              color="#A3241C"
              roughness={0.4}
              metalness={0.15}
            />
          </mesh>
          {/* Raised charred lip of pepperoni */}
          <mesh position={[0, 0.018, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.19, 0.015, 8, 24]} />
            <meshStandardMaterial
              color="#68100C"
              roughness={0.5}
            />
          </mesh>
        </group>
      ))}

      {/* Fresh Basil Leaves */}
      {basilPositions.map((leaf, idx) => (
        <mesh
          key={`basil-${idx}`}
          position={leaf.pos}
          rotation={[-0.1, leaf.rot, 0.15]}
          castShadow
        >
          <boxGeometry args={[0.22, 0.015, 0.12]} />
          <meshStandardMaterial
            color="#1B7A38"
            roughness={0.3}
          />
        </mesh>
      ))}

      {/* Oregano & Pepper Flakes */}
      {flakePositions.map((pos, idx) => (
        <mesh key={`flake-${idx}`} position={pos}>
          <sphereGeometry args={[0.018, 6, 6]} />
          <meshStandardMaterial
            color={idx % 3 === 0 ? '#C4301B' : '#2D662A'}
            roughness={0.9}
          />
        </mesh>
      ))}
    </group>
  );
};
