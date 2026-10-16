import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Float } from '@react-three/drei';
import { PizzaModel } from './PizzaModel';
import { BurgerModel } from './BurgerModel';
import { BreakfastRollModel } from './BreakfastRollModel';
import { RotateCw, Pause, Play, Sparkles } from 'lucide-react';

interface Dish3DViewerProps {
  modelType: 'pizza' | 'burger' | 'roll';
  sizeOption?: '12"' | '6"' | 'double' | 'single';
}

export const Dish3DViewer: React.FC<Dish3DViewerProps> = ({ modelType, sizeOption }) => {
  const [autoRotate, setAutoRotate] = useState(true);

  // Determine model scale based on portion size if applicable
  const scale = sizeOption === '6"' ? 0.9 : modelType === 'pizza' ? 1.25 : 1.2;

  return (
    <div className="relative w-full h-72 sm:h-80 rounded-2xl overflow-hidden bg-charcoal/90 border border-white/10 group">
      {/* Background Lighting Shimmer */}
      <div className="absolute inset-0 bg-gradient-radial from-amber-500/10 via-transparent to-transparent pointer-events-none" />

      {/* Quick Controls overlay */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className="p-1.5 rounded-lg bg-subway/80 hover:bg-subway text-gray-300 hover:text-white border border-white/10 transition-colors text-xs flex items-center gap-1 shadow-md"
          title="Toggle Auto Rotation"
          aria-label="Toggle auto rotation"
        >
          {autoRotate ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-tangerine" />}
          <span className="text-[11px] pr-1">{autoRotate ? 'Pause' : 'Rotate'}</span>
        </button>
      </div>

      <div className="absolute top-3 right-3 z-10 flex items-center gap-1 text-[11px] font-mono text-gray-400 bg-subway/80 px-2 py-1 rounded-md border border-white/5 pointer-events-none">
        <RotateCw className="w-3 h-3 text-tangerine" />
        <span>360° View</span>
      </div>

      {/* 3D Canvas */}
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-tangerine animate-pulse" />
          </div>
        }
      >
        <Canvas
          shadows
          camera={{ position: [0, 1.6, 3.2], fov: 42 }}
          className="cursor-grab active:cursor-grabbing w-full h-full"
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.7} color="#FFF7ED" />
          <spotLight position={[3, 5, 2]} intensity={2.4} color="#FFA53A" angle={0.6} penumbra={0.7} castShadow />
          <spotLight position={[-3, 4, -2]} intensity={1.1} color="#93C5FD" angle={0.7} penumbra={0.8} />
          <pointLight position={[0, -1, 1]} intensity={0.6} color="#FF7700" />

          <Float speed={autoRotate ? 1.2 : 0} rotationIntensity={autoRotate ? 0.15 : 0} floatIntensity={0.25}>
            <group position={[0, -0.05, 0]}>
              {modelType === 'pizza' && <PizzaModel scale={scale} interactive={false} />}
              {modelType === 'burger' && <BurgerModel scale={scale} interactive={false} />}
              {modelType === 'roll' && <BreakfastRollModel scale={scale} interactive={false} />}
            </group>
          </Float>

          <ContactShadows
            position={[0, -1.0, 0]}
            opacity={0.6}
            scale={5}
            blur={2.4}
            far={3.5}
            color="#08090C"
          />

          <OrbitControls
            enablePan={false}
            enableZoom={false}
            autoRotate={autoRotate}
            autoRotateSpeed={2.5}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2.1}
          />
        </Canvas>
      </Suspense>
    </div>
  );
};
