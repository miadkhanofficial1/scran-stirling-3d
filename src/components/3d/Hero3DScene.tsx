import React, { Suspense, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';
import { PizzaModel } from './PizzaModel';
import { BurgerModel } from './BurgerModel';
import { CoffeeModel } from './CoffeeModel';
import { BreakfastRollModel } from './BreakfastRollModel';
import { Sparkles, RotateCw, ZoomIn, Eye } from 'lucide-react';

interface Hero3DSceneProps {
  selectedCategory?: 'pizza' | 'burger' | 'roll' | 'coffee' | 'showcase';
  onCategoryChange?: (category: 'pizza' | 'burger' | 'roll' | 'coffee' | 'showcase') => void;
}

// Lighting Rig mimicking Campus Central atrium brass pendant lamps & warm spotlights
const CampusCentralLighting: React.FC = () => {
  return (
    <>
      {/* Ambient Fill */}
      <ambientLight intensity={0.65} color="#F5EFE6" />

      {/* Campus Central Brass Pendant Spotlight 1 (Warm Tungsten) */}
      <spotLight
        position={[4, 7, 3]}
        angle={0.5}
        penumbra={0.7}
        intensity={2.8}
        color="#FFAE57"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Campus Central Brass Pendant Spotlight 2 (Atrium Skylight Cool Accent) */}
      <spotLight
        position={[-4, 6, -2]}
        angle={0.6}
        penumbra={0.8}
        intensity={1.2}
        color="#BBD5ED"
      />

      {/* Rim Light for Crisp Edge Definition */}
      <directionalLight position={[0, -2, -4]} intensity={0.5} color="#F26A21" />

      {/* Subtle Countertop Warm Glow */}
      <pointLight position={[0, -1, 1]} intensity={0.8} color="#FF9933" distance={5} />
    </>
  );
};

// Interactive Mouse Parallax tilt container
const SceneContent: React.FC<{
  activeDish: 'pizza' | 'burger' | 'roll' | 'coffee' | 'showcase';
}> = ({ activeDish }) => {
  const sceneGroup = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (sceneGroup.current) {
      // Parallax mouse tilt
      const targetRotY = state.pointer.x * 0.25;
      const targetRotX = -state.pointer.y * 0.15;
      sceneGroup.current.rotation.y = THREE.MathUtils.lerp(sceneGroup.current.rotation.y, targetRotY, 0.05);
      sceneGroup.current.rotation.x = THREE.MathUtils.lerp(sceneGroup.current.rotation.x, targetRotX, 0.05);
    }
  });

  return (
    <group ref={sceneGroup}>
      {activeDish === 'showcase' && (
        <>
          {/* Main Hero: Stone-Baked Pizza Centerstage */}
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
            <group position={[0, -0.1, 0]} rotation={[0.4, -0.4, 0]}>
              <PizzaModel scale={1.1} interactive={false} />
            </group>
          </Float>

          {/* Floating Burger Side Platter */}
          <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
            <group position={[-2.4, 0.6, -0.6]} rotation={[0.3, 0.6, -0.15]}>
              <BurgerModel scale={0.75} interactive={false} />
            </group>
          </Float>

          {/* Floating Coffee Tumbler with Reusable 20p Discount */}
          <Float speed={1.8} rotationIntensity={0.25} floatIntensity={0.45}>
            <group position={[2.3, 0.4, -0.5]} rotation={[0.2, -0.5, 0.1]}>
              <CoffeeModel scale={0.8} interactive={false} />
            </group>
          </Float>
        </>
      )}

      {activeDish === 'pizza' && (
        <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.3}>
          <group position={[0, -0.2, 0]} rotation={[0.45, 0, 0]}>
            <PizzaModel scale={1.35} interactive={true} />
          </group>
        </Float>
      )}

      {activeDish === 'burger' && (
        <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.35}>
          <group position={[0, 0, 0]} rotation={[0.2, 0, 0]}>
            <BurgerModel scale={1.3} interactive={true} />
          </group>
        </Float>
      )}

      {activeDish === 'roll' && (
        <Float speed={1.3} rotationIntensity={0.2} floatIntensity={0.3}>
          <group position={[0, 0, 0]} rotation={[0.3, 0, 0]}>
            <BreakfastRollModel scale={1.25} interactive={true} />
          </group>
        </Float>
      )}

      {activeDish === 'coffee' && (
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.35}>
          <group position={[0, -0.2, 0]} rotation={[0.1, 0, 0]}>
            <CoffeeModel scale={1.3} interactive={true} />
          </group>
        </Float>
      )}

      {/* Realistic Counter Floor Shadow */}
      <ContactShadows
        position={[0, -1.35, 0]}
        opacity={0.65}
        scale={10}
        blur={2}
        far={4.5}
        color="#08090C"
      />
    </group>
  );
};

export const Hero3DScene: React.FC<Hero3DSceneProps> = ({
  selectedCategory = 'showcase',
  onCategoryChange,
}) => {
  const [activeDish, setActiveDish] = useState<'pizza' | 'burger' | 'roll' | 'coffee' | 'showcase'>(
    selectedCategory
  );

  const handleSelect = (dish: 'pizza' | 'burger' | 'roll' | 'coffee' | 'showcase') => {
    setActiveDish(dish);
    if (onCategoryChange) {
      onCategoryChange(dish);
    }
  };

  return (
    <div className="relative w-full h-[460px] sm:h-[540px] lg:h-[600px] rounded-3xl overflow-hidden glass-panel-warm border border-white/10 shadow-subtle-card group">
      {/* Subtle Background Radial Gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-charcoal/70 via-graphite/90 to-graphite pointer-events-none" />

      {/* Campus Central Atrium Brass Pendant Light Mockup Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent blur-[2px]" />
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-16 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Top Floating Badge */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-charcoal/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-xs font-medium text-white shadow-lg pointer-events-none">
        <Sparkles className="w-3.5 h-3.5 text-tangerine animate-pulse" />
        <span>Interactive 3D Stage · 360° Counter View</span>
      </div>

      {/* Hint Badge for User Interaction */}
      <div className="absolute top-4 right-4 z-20 hidden sm:flex items-center gap-1.5 bg-subway/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-[11px] text-gray-400 pointer-events-none">
        <RotateCw className="w-3 h-3 text-gray-400" />
        <span>Drag to Rotate · Mouse Tilt</span>
      </div>

      {/* Dish Quick Selector Tabs */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 p-1.5 bg-subway/90 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl max-w-[94%] overflow-x-auto">
        <button
          onClick={() => handleSelect('showcase')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeDish === 'showcase'
              ? 'bg-tangerine text-white shadow-glow-orange'
              : 'text-gray-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Full Platter</span>
        </button>

        <button
          onClick={() => handleSelect('pizza')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            activeDish === 'pizza'
              ? 'bg-tangerine text-white shadow-glow-orange'
              : 'text-gray-300 hover:text-white hover:bg-white/5'
          }`}
        >
          Stone-Baked Pizza
        </button>

        <button
          onClick={() => handleSelect('burger')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            activeDish === 'burger'
              ? 'bg-tangerine text-white shadow-glow-orange'
              : 'text-gray-300 hover:text-white hover:bg-white/5'
          }`}
        >
          Royal Burger
        </button>

        <button
          onClick={() => handleSelect('roll')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            activeDish === 'roll'
              ? 'bg-tangerine text-white shadow-glow-orange'
              : 'text-gray-300 hover:text-white hover:bg-white/5'
          }`}
        >
          Morning Roll
        </button>

        <button
          onClick={() => handleSelect('coffee')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            activeDish === 'coffee'
              ? 'bg-tangerine text-white shadow-glow-orange'
              : 'text-gray-300 hover:text-white hover:bg-white/5'
          }`}
        >
          Barista Tumbler
        </button>
      </div>

      {/* WebGL Canvas */}
      <Suspense
        fallback={
          <div className="w-full h-full flex flex-col items-center justify-center gap-3">
            <div className="w-10 h-10 border-2 border-tangerine border-t-transparent rounded-full animate-spin" />
            <p className="text-xs text-gray-400 font-mono tracking-wider">
              Rendering 3D Counter Scene...
            </p>
          </div>
        }
      >
        <Canvas
          shadows
          camera={{ position: [0, 1.8, 4.2], fov: 45 }}
          className="cursor-grab active:cursor-grabbing w-full h-full"
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          <CampusCentralLighting />
          <SceneContent activeDish={activeDish} />
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={2.5}
            maxDistance={6.5}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2.1}
            dampingFactor={0.05}
          />
        </Canvas>
      </Suspense>

      {/* Floating Macro Zoom Hint */}
      <div className="absolute bottom-4 right-4 z-20 hidden md:flex items-center gap-1 text-[10px] text-gray-400 bg-black/40 px-2 py-1 rounded-md pointer-events-none">
        <ZoomIn className="w-3 h-3" />
        <span>Scroll to Zoom</span>
      </div>
    </div>
  );
};
