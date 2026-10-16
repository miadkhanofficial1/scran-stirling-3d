import React, { useState, useEffect } from 'react';
import {
  Flame,
  Clock,
  ShoppingBag,
  HelpCircle,
  Menu as MenuIcon,
  X,
  Coffee,
} from 'lucide-react';
import { useCampusStatus } from '../../hooks/useCampusStatus';

interface NavbarProps {
  trayCount: number;
  onOpenTray: () => void;
  onOpenGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ trayCount, onOpenTray, onOpenGuide }) => {
  const status = useCampusStatus();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: '3D Showcase', href: '#showcase' },
    { label: 'Verified Menu', href: '#menu' },
    { label: 'Meal Deals', href: '#meal-deals' },
    { label: 'Live Queues', href: '#rush-hours' },
    { label: 'Campus Route', href: '#location' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-graphite/95 backdrop-blur-md border-b border-white/10 shadow-lg py-3'
          : 'bg-gradient-to-b from-graphite/90 via-graphite/60 to-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Campus Identity */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-tangerine rounded-xl"
          >
            <div className="w-10 h-10 rounded-xl bg-charcoal border border-tangerine/40 flex items-center justify-center shadow-glow-orange group-hover:border-tangerine transition-all">
              <Flame className="w-5 h-5 text-tangerine group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-black text-xl tracking-tight text-white">
                  SCRAN
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-tangerine" />
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest hidden sm:inline">
                  STIRLING
                </span>
              </div>
              <p className="text-[10px] text-gray-400 font-medium">
                Campus Central · Floor G
              </p>
            </div>
          </a>

          {/* Dynamic Campus Open/Closed Status Badge (Live UK Time) */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-charcoal/80 border border-white/10 text-xs">
            <span
              className={`w-2 h-2 rounded-full ${
                status.isOpen ? 'bg-emerald-campus animate-ping' : 'bg-red-400'
              }`}
            />
            <span className="w-2 h-2 rounded-full bg-emerald-campus -ml-4" />
            <span className="font-semibold text-white">{status.statusText}</span>
            <span className="text-gray-400">·</span>
            <span className="text-gray-300 text-[11px] flex items-center gap-1">
              <Clock className="w-3 h-3 text-tangerine" />
              {status.nextChangeText}
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 text-xs font-semibold">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors focus-visible:ring-1 focus-visible:ring-tangerine"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Buttons: Counter Guide, 20p Mug Badge & Tray */}
          <div className="flex items-center gap-2">
            {/* 20p Reusable Cup Badge */}
            <div className="hidden xl:flex items-center gap-1 text-[11px] font-medium text-emerald-300 bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-1 rounded-full">
              <Coffee className="w-3.5 h-3.5 text-emerald-400" />
              <span>Save 20p w/ own mug</span>
            </div>

            {/* Order Counter Guide Trigger */}
            <button
              onClick={onOpenGuide}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-subway hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 text-xs font-medium transition-colors"
              title="How Ordering Works at Floor G"
            >
              <HelpCircle className="w-3.5 h-3.5 text-tangerine" />
              <span>Counter Guide</span>
            </button>

            {/* Tray Cart Button */}
            <button
              onClick={onOpenTray}
              aria-label={`Open campus tray with ${trayCount} items`}
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-tangerine hover:bg-tangerine-hover text-white text-xs font-bold transition-all shadow-glow-orange group"
            >
              <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">Tray</span>
              {trayCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-white text-graphite text-[10px] font-black flex items-center justify-center">
                  {trayCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="md:hidden p-2 rounded-xl bg-subway text-gray-300 hover:text-white border border-white/10"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 rounded-2xl bg-charcoal border border-white/10 shadow-2xl space-y-3">
            {/* Live Campus Hours Mobile Banner */}
            <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-subway/80 border border-white/5">
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    status.isOpen ? 'bg-emerald-campus' : 'bg-red-400'
                  }`}
                />
                <span className="font-semibold text-white">{status.statusText}</span>
              </div>
              <span className="text-[11px] text-gray-400">{status.nextChangeText}</span>
            </div>

            <nav className="flex flex-col gap-1 text-sm font-medium">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenGuide();
                }}
                className="w-full py-2 px-3 rounded-xl bg-subway hover:bg-white/10 text-gray-200 text-xs font-semibold flex items-center justify-center gap-2 border border-white/5"
              >
                <HelpCircle className="w-4 h-4 text-tangerine" />
                <span>How Campus Ordering Works</span>
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-emerald-400 bg-emerald-950/30 py-1.5 rounded-xl border border-emerald-500/20">
                <Coffee className="w-3.5 h-3.5" />
                <span>20p discount when you bring your reusable mug!</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
