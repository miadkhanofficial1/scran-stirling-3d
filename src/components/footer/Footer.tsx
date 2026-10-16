import React from 'react';
import {
  Flame,
  Clock,
  MapPin,
  Coffee,
  ShieldCheck,
  ExternalLink,
  ChevronUp,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-graphite border-t border-white/10 text-gray-400 text-xs relative pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Campus Identity */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-charcoal border border-tangerine/40 flex items-center justify-center text-tangerine shadow-glow-orange">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <span className="font-display font-black text-xl text-white tracking-tight">
                  SCRAN
                </span>
                <p className="text-[11px] text-gray-400">
                  University of Stirling · Campus Central
                </p>
              </div>
            </div>

            <p className="text-gray-400 leading-relaxed max-w-sm">
              The flagship campus dining hub fueling Stirling students, faculty, and visitors. Hand-stretched stone-baked pizzas, 100% Scottish beef smash burgers, Glasgow bakery morning rolls, and Fairtrade Matthew Algie barista craft.
            </p>

            {/* Sustainability Badge */}
            <div className="flex items-center gap-2 p-3 rounded-2xl bg-emerald-950/30 border border-emerald-500/20 text-emerald-300">
              <Coffee className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                <strong>Bring Your Own Travel Mug:</strong> Save 20p on every hot barista beverage to cut campus disposable cups!
              </span>
            </div>
          </div>

          {/* Col 2: Opening Hours Table */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-white font-display uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-tangerine" />
              Opening Hours
            </h4>

            <div className="space-y-2 bg-charcoal/60 p-4 rounded-2xl border border-white/5">
              <div className="flex items-center justify-between py-1 border-b border-white/5">
                <span className="text-gray-300 font-medium">Monday – Friday</span>
                <span className="font-mono text-white font-bold">08:00 – 19:00</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-white/5">
                <span className="text-gray-300 font-medium">Saturday – Sunday</span>
                <span className="font-mono text-white font-bold">10:00 – 18:00</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-gray-400 text-[11px]">Breakfast (Scran AM)</span>
                <span className="font-mono text-gray-300 text-[11px]">08:00 – 11:30</span>
              </div>
            </div>

            <p className="text-[11px] text-gray-500">
              *Hours operate during Stirling academic semesters. Vacation service times may adjust.
            </p>
          </div>

          {/* Col 3: Campus Location & Navigation */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-white font-display uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-4 h-4 text-tangerine" />
              Venue Coordinates
            </h4>

            <div className="space-y-2 text-xs">
              <p className="text-white font-medium">
                Floor G, Campus Central Building
              </p>
              <p className="text-gray-400">
                University of Stirling, Airthrey Rd, Stirling FK9 4NN, Scotland, UK
              </p>
              <p className="text-tangerine font-mono text-[11px]">
                Plus Code: 43WH+CW Stirling
              </p>
            </div>

            <div className="pt-2">
              <a
                href="https://maps.app.goo.gl/LRpBzbU6wq44f2PY6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-white hover:text-tangerine transition-colors underline underline-offset-4"
              >
                <span>Google Maps Landmark</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Col 4: Quick Links & Back to Top */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold text-white font-display uppercase tracking-wider">
              Quick Nav
            </h4>

            <ul className="space-y-2 text-xs">
              <li>
                <a href="#showcase" className="hover:text-white transition-colors">
                  3D Food Platter
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-white transition-colors">
                  Verified Menu
                </a>
              </li>
              <li>
                <a href="#meal-deals" className="hover:text-white transition-colors">
                  Meal Deal Combo
                </a>
              </li>
              <li>
                <a href="#rush-hours" className="hover:text-white transition-colors">
                  Live Queues
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-white transition-colors">
                  Walking Route
                </a>
              </li>
            </ul>

            <button
              onClick={scrollToTop}
              className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-subway hover:bg-white/10 px-3 py-1.5 rounded-xl border border-white/5 transition-colors"
            >
              <ChevronUp className="w-3.5 h-3.5 text-tangerine" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500">
          <p>
            © {new Date().getFullYear()} Scran at University of Stirling · Official Campus Central Food Court.
          </p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Food Standards Scotland Certified</span>
            </span>
            <span>·</span>
            <span>Allergen Transparency Guaranteed</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
