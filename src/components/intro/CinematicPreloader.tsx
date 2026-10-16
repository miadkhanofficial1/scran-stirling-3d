import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Sparkles, ArrowRight } from 'lucide-react';

interface PreloaderProps {
  onComplete: () => void;
}

export const CinematicPreloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasSeenIntro = sessionStorage.getItem('scran_intro_seen');

    if (prefersReducedMotion || hasSeenIntro === 'true') {
      setIsVisible(false);
      onComplete();
      return;
    }

    // Fast, smooth counter animation
    const duration = 2200; // ms
    const stepTime = 25; // ms
    const totalSteps = duration / stepTime;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const currentPercent = Math.min(Math.round((step / totalSteps) * 100), 100);
      setProgress(currentPercent);

      if (step >= totalSteps) {
        clearInterval(timer);
        setTimeout(() => {
          handleDismiss();
        }, 350);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  const handleDismiss = () => {
    sessionStorage.setItem('scran_intro_seen', 'true');
    setIsVisible(false);
    setTimeout(() => {
      onComplete();
    }, 600);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="cinematic-overlay"
        initial={{ opacity: 1 }}
        exit={{
          opacity: 0,
          scale: 1.04,
          filter: 'blur(8px)',
          transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] }
        }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-graphite overflow-hidden select-none"
      >
        {/* Subtle Ambient Radial Lighting */}
        <div className="absolute w-[600px] h-[600px] rounded-full bg-tangerine/15 blur-[140px] pointer-events-none -top-20 -right-20 animate-pulse-subtle" />
        <div className="absolute w-[500px] h-[500px] rounded-full bg-emerald-campus/10 blur-[130px] pointer-events-none -bottom-20 -left-20" />

        {/* Floating Steam/Shimmer Particle Accents */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute left-1/4 top-1/3 w-32 h-32 rounded-full bg-amber-500/10 blur-2xl animate-steam" />
          <div className="absolute right-1/4 top-1/2 w-40 h-40 rounded-full bg-tangerine/10 blur-3xl animate-steam" style={{ animationDelay: '1.2s' }} />
        </div>

        {/* Central Brand Emblem */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-md w-full">
          {/* Stone-Oven Animated Flame Badge */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative mb-6"
          >
            <div className="w-20 h-20 rounded-2xl bg-charcoal border border-white/10 flex items-center justify-center shadow-glow-orange relative group">
              <motion.div
                animate={{
                  scale: [1, 1.12, 1],
                  rotate: [-3, 3, -3]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Flame className="w-10 h-10 text-tangerine fill-tangerine" />
              </motion.div>
              {/* Secondary Ember Sparkle */}
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4], y: [-2, -6, -2] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute -top-1.5 -right-1.5"
              >
                <Sparkles className="w-5 h-5 text-amber-400" />
              </motion.div>
            </div>
          </motion.div>

          {/* Staggered Typography */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="space-y-2 mb-8"
          >
            <span className="inline-block text-xs uppercase tracking-[0.28em] font-semibold text-tangerine bg-tangerine/10 px-3 py-1 rounded-full border border-tangerine/20">
              Campus Central · Floor G
            </span>
            <h1 className="text-4xl sm:text-5xl font-black font-display tracking-tight text-white flex items-center justify-center gap-2">
              SCRAN
              <span className="text-tangerine text-3xl sm:text-4xl">.</span>
            </h1>
            <p className="text-xs sm:text-sm font-medium text-gray-400 tracking-wider uppercase">
              University of Stirling
            </p>
          </motion.div>

          {/* Smooth Numeric Progress & Stone Oven Hearth Line */}
          <div className="w-full max-w-xs space-y-2.5">
            <div className="flex items-center justify-between text-xs font-mono text-gray-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-tangerine animate-ping" />
                Heating Stone Oven 400°C
              </span>
              <span className="text-white font-semibold">{progress}%</span>
            </div>

            {/* Glowing Progress Track */}
            <div className="w-full h-1.5 bg-subway rounded-full overflow-hidden p-0.5 border border-white/5">
              <motion.div
                className="h-full bg-gradient-to-r from-crust via-tangerine to-amber-400 rounded-full shadow-[0_0_12px_rgba(242,106,33,0.8)]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>
          </div>

          {/* Direct Skip Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={handleDismiss}
            className="mt-8 inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors duration-200 border border-white/10 hover:border-white/25 rounded-full px-4 py-1.5 bg-charcoal/60 backdrop-blur-sm group"
          >
            <span>Skip To Dining</span>
            <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
