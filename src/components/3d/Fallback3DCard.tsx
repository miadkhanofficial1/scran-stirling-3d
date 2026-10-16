import React, { useState, useRef } from 'react';
import { Sparkles, Utensils } from 'lucide-react';

interface Fallback3DCardProps {
  title: string;
  subtitle: string;
  badge?: string;
  type: 'pizza' | 'burger' | 'roll' | 'coffee';
}

export const Fallback3DCard: React.FC<Fallback3DCardProps> = ({
  title,
  subtitle,
  badge,
  type,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateX(((y - centerY) / centerY) * -12);
    setRotateY(((x - centerX) / centerX) * 12);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[400px] rounded-3xl glass-panel-warm p-6 overflow-hidden flex flex-col justify-between transition-transform duration-200 ease-out border border-white/10 shadow-subtle-card cursor-pointer"
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      }}
    >
      {/* Background Lighting Glow */}
      <div className="absolute inset-0 bg-gradient-radial from-tangerine/15 via-transparent to-transparent pointer-events-none" />

      {/* Header Info */}
      <div className="relative z-10 flex items-center justify-between">
        {badge && (
          <span className="bg-tangerine/20 text-tangerine border border-tangerine/30 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            {badge}
          </span>
        )}
        <span className="text-[11px] font-mono text-gray-400 bg-subway/80 px-2.5 py-1 rounded-md border border-white/5">
          CSS 3D Performance Mode
        </span>
      </div>

      {/* Stylized Illustrated Graphic Center */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto">
        <div className="w-40 h-40 rounded-full bg-gradient-to-tr from-charcoal to-subway border-2 border-tangerine/30 flex items-center justify-center shadow-glow-orange relative group-hover:scale-105 transition-transform duration-300">
          <Utensils className="w-16 h-16 text-tangerine/80" />
          <div className="absolute -bottom-2 px-3 py-1 bg-tangerine text-white text-[11px] font-bold rounded-full uppercase tracking-wider">
            {type}
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="relative z-10">
        <h3 className="text-xl font-bold font-display text-white">{title}</h3>
        <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
      </div>
    </div>
  );
};
