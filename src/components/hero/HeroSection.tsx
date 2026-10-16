import React from 'react';
import { motion } from 'framer-motion';
import {
  Flame,
  ArrowRight,
  MapPin,
  Clock,
  ShieldCheck,
  Coffee,
} from 'lucide-react';
import { Hero3DScene } from '../3d/Hero3DScene';
import { Fallback3DCard } from '../3d/Fallback3DCard';
import { useWebGLSupport } from '../../hooks/useWebGLSupport';
import { useCampusStatus } from '../../hooks/useCampusStatus';

export const HeroSection: React.FC = () => {
  const { isSupported, isLowSpec } = useWebGLSupport();
  const campusStatus = useCampusStatus();

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden subway-tile-bg">
      {/* Ambient Lighting Spots */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-tangerine/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 -left-32 w-96 h-96 bg-emerald-campus/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Bold Typography & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:col-span-6 space-y-6 text-center lg:text-left"
          >
            {/* Campus Location Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-charcoal border border-white/10 text-xs shadow-lg">
              <span className="w-2 h-2 rounded-full bg-tangerine animate-pulse" />
              <span className="font-semibold text-white tracking-wide uppercase text-[11px]">
                University of Stirling · Campus Central Floor G
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black font-display tracking-tight text-white leading-[1.08]">
              Real Campus Scran.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-tangerine via-crust to-amber-400">
                Fast, Fresh & Stone-Baked.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-gray-300 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Fueling students, staff, and campus visitors right at the heart of Stirling. Hand-stretched pizzas baked at 400°C, authentic McGhee’s morning rolls, Scottish smash burgers, and artisan barista coffee.
            </p>

            {/* Quick Live Status Alert */}
            <div className="inline-flex items-center gap-3 p-3 rounded-2xl bg-charcoal/90 border border-white/10 text-xs text-left max-w-md">
              <div className="w-9 h-9 rounded-xl bg-subway flex items-center justify-center shrink-0 border border-white/5">
                <Clock className="w-4 h-4 text-tangerine" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">{campusStatus.statusText}</span>
                  <span className="text-gray-400">·</span>
                  <span className="text-gray-300">{campusStatus.currentUKTime}</span>
                </div>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  {campusStatus.rushDescription}
                </p>
              </div>
            </div>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <a
                href="#menu"
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-tangerine hover:bg-tangerine-hover text-white text-sm font-bold shadow-glow-orange transition-all flex items-center justify-center gap-2 group"
              >
                <span>Explore Verified Menu</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#location"
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-subway hover:bg-white/10 text-white text-sm font-semibold border border-white/10 transition-colors flex items-center justify-center gap-2"
              >
                <MapPin className="w-4 h-4 text-tangerine" />
                <span>Campus Walking Route</span>
              </a>
            </div>

            {/* Quick Campus Value Pillars */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-white/10 text-left">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-campus shrink-0" />
                <span className="text-xs text-gray-300 font-medium">100% Scottish Beef</span>
              </div>
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-tangerine shrink-0" />
                <span className="text-xs text-gray-300 font-medium">Stone Oven Pizzas</span>
              </div>
              <div className="flex items-center gap-2">
                <Coffee className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-xs text-gray-300 font-medium">20p Reusable Cup Off</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive 3D Canvas Stage */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="lg:col-span-6 relative"
          >
            {isSupported && !isLowSpec ? (
              <Hero3DScene selectedCategory="showcase" />
            ) : (
              <Fallback3DCard
                title="Stone-Baked 12' Pepperoni"
                subtitle="Slow-fermented dough with Scottish fior di latte and spicy pepperoni"
                badge="Campus Favorite"
                type="pizza"
              />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
