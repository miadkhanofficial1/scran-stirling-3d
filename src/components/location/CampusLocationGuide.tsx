import React from 'react';
import {
  MapPin,
  Navigation,
  Bus,
  Footprints,
  ExternalLink,
  Accessibility,
  Building,
  Compass,
} from 'lucide-react';

export const CampusLocationGuide: React.FC = () => {
  const steps = [
    {
      step: '1',
      title: 'Arrival at Stirling Campus Bus Hub',
      description:
        'Alight from the Uni Link (Unilink, 51, 52, 54) at the main campus interchange beside MacRobert Arts Centre.',
      icon: Bus,
    },
    {
      step: '2',
      title: 'Walk Across Queens Court Bridge',
      description:
        'Take the scenic paved walkway over Airthrey Loch directly toward the modern glass atrium of Campus Central.',
      icon: Footprints,
    },
    {
      step: '3',
      title: 'Enter Floor G (Ground Floor)',
      description:
        'Pass through the automatic revolving doors into the double-height atrium. Scran food court and stone ovens are immediately to your right.',
      icon: Building,
    },
  ];

  return (
    <section id="location" className="py-20 bg-charcoal/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-campus/10 border border-emerald-campus/20 text-emerald-campus text-xs font-semibold">
            <Compass className="w-3.5 h-3.5 text-emerald-400" />
            <span>Campus Navigation & Directions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-white tracking-tight">
            Find Us At Campus Central
          </h2>
          <p className="text-sm sm:text-base text-gray-300">
            Located right on Floor G of the University of Stirling Campus Central Building. Quick 2-minute walk from the main bus hub.
          </p>
        </div>

        {/* Location & Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
          {/* Left: Walking Guide & Access Cards */}
          <div className="lg:col-span-6 space-y-6">
            {/* Step-by-step route */}
            <div className="p-6 rounded-3xl bg-subway/80 border border-white/10 space-y-5">
              <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
                <Navigation className="w-5 h-5 text-tangerine" />
                Step-by-Step Walking Route
              </h3>

              <div className="space-y-4">
                {steps.map((st) => {
                  const Icon = st.icon;
                  return (
                    <div
                      key={st.step}
                      className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-charcoal border border-white/5"
                    >
                      <div className="w-8 h-8 rounded-xl bg-tangerine text-white font-bold text-xs flex items-center justify-center shrink-0">
                        {st.step}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-tangerine" />
                          <h4 className="text-sm font-semibold text-white">
                            {st.title}
                          </h4>
                        </div>
                        <p className="text-xs text-gray-300 leading-relaxed">
                          {st.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Direct Maps Trigger */}
              <div className="pt-2">
                <a
                  href="https://maps.app.goo.gl/LRpBzbU6wq44f2PY6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-5 rounded-xl bg-tangerine hover:bg-tangerine-hover text-white text-xs font-bold transition-all shadow-glow-orange flex items-center justify-center gap-2"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Open Campus Route in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>
              </div>
            </div>

            {/* Accessibility Card */}
            <div className="p-5 rounded-2xl bg-charcoal border border-white/10 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
                <Accessibility className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-white">
                  100% Step-Free & Accessible Venue
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Campus Central Floor G features zero-step level entry from the bus terminus and Queens Court bridge. Wide touchscreens, automatic doors, lowered order counters, and adjacent accessible restrooms.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Embedded Interactive Map */}
          <div className="lg:col-span-6 space-y-4">
            <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-charcoal relative h-[420px]">
              <iframe
                title="University of Stirling Campus Central Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2222.9510100778844!2d-3.9213568228514976!3d56.145719973238994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x488862cb2a061405%3A0xb3a8268daae25f0e!2sCampus%20Central%2C%20University%20of%20Stirling!5e0!3m2!1sen!2suk!4v1710000000000!5m2!1sen!2suk"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />

              {/* Floating Address Overlay */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-graphite/95 backdrop-blur-md border border-white/10 shadow-xl flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-tangerine/15 text-tangerine flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">
                      Campus Central, Floor G
                    </p>
                    <p className="text-[11px] text-gray-400">
                      Airthrey Rd, Stirling FK9 4NN, UK (Plus Code: 43WH+CW)
                    </p>
                  </div>
                </div>

                <a
                  href="https://maps.app.goo.gl/LRpBzbU6wq44f2PY6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-subway hover:bg-white/10 text-white text-[11px] font-semibold border border-white/10 transition-colors whitespace-nowrap hidden sm:flex items-center gap-1"
                >
                  <span>Navigate</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Quick Venue Specs */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-2xl bg-subway/60 border border-white/5">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">
                  Campus Building:
                </span>
                <span className="text-xs font-bold text-white">
                  Campus Central
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-subway/60 border border-white/5">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">
                  Floor Level:
                </span>
                <span className="text-xs font-bold text-tangerine">
                  Floor G (Ground)
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-subway/60 border border-white/5 col-span-2 sm:col-span-1">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">
                  Wi-Fi Access:
                </span>
                <span className="text-xs font-bold text-emerald-campus">
                  Full eduroam coverage
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
