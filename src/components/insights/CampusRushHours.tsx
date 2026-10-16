import React from 'react';
import {
  Clock,
  Users,
  TrendingUp,
  Armchair,
  Sun,
} from 'lucide-react';
import { useCampusStatus } from '../../hooks/useCampusStatus';

interface TimeBlock {
  period: string;
  timeRange: string;
  intensity: 'Low' | 'Moderate' | 'Peak';
  estWait: string;
  note: string;
  percent: number;
}

export const CampusRushHours: React.FC = () => {
  const status = useCampusStatus();

  const schedule: TimeBlock[] = [
    {
      period: 'Early Bird Breakfast',
      timeRange: '08:00 - 09:15',
      intensity: 'Moderate',
      estWait: '3 - 5 mins',
      note: "McGhee's hot rolls and Matthew Algie morning coffee rush before 9 AM lectures.",
      percent: 55,
    },
    {
      period: 'Morning Grab-and-Go Sweet Spot',
      timeRange: '09:30 - 11:45',
      intensity: 'Low',
      estWait: '1 - 2 mins',
      note: 'Ideal time for fresh traybakes, quiet atrium study, and zero queue ordering.',
      percent: 25,
    },
    {
      period: 'Main Campus Lunch Peak',
      timeRange: '12:00 - 13:45',
      intensity: 'Peak',
      estWait: '8 - 12 mins',
      note: 'Highest atrium footfall as classes release. Stone-oven pizzas running full capacity.',
      percent: 95,
    },
    {
      period: 'Afternoon Study & Refuel',
      timeRange: '14:00 - 16:30',
      intensity: 'Low',
      estWait: '2 - 3 mins',
      note: 'Perfect sweet spot. Plenty of open booths, loch-side sunlight, and fast hot food.',
      percent: 30,
    },
    {
      period: 'Evening Campus Scran',
      timeRange: '16:45 - 19:00',
      intensity: 'Moderate',
      estWait: '4 - 6 mins',
      note: 'Dinner orders, loaded dirty fries, and society study groups before evening library sessions.',
      percent: 60,
    },
  ];

  const seatingZones = [
    {
      title: 'Queens Court Loch-Side View',
      description: 'Panoramic glass atrium views facing Airthrey Loch and Dumyat Hill. Natural daylight and power sockets.',
      seats: '120+ seats',
      vibe: 'Scenic & Relaxing',
      icon: Sun,
    },
    {
      title: 'Central Atrium High-Tops',
      description: 'Right beside Hatch A & B for rapid dining and quick catchups between 50-minute lectures.',
      seats: '85 seats',
      vibe: 'High Energy & Quick Turnaround',
      icon: Users,
    },
    {
      title: 'Library Link Study Booths',
      description: 'Quiet acoustic cushioned booths with high-speed eduroam Wi-Fi, perfect for solo laptop working with a latte.',
      seats: '40 booths',
      vibe: 'Focus & Study',
      icon: Armchair,
    },
  ];

  return (
    <section id="rush-hours" className="py-20 bg-charcoal/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-tangerine/10 border border-tangerine/20 text-tangerine text-xs font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Campus Crowd & Queue Insights</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-white tracking-tight">
            Beat The Campus Rush
          </h2>
          <p className="text-sm sm:text-base text-gray-300">
            Real-time insights and average queue times at Floor G to help you plan your breakfast rolls and stone-baked pizzas around your lecture schedule.
          </p>
        </div>

        {/* Live Queue Gauge Card */}
        <div className="p-6 sm:p-8 rounded-3xl glass-panel-warm border border-white/10 mb-12 shadow-subtle-card">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Live Indicator */}
            <div className="md:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left space-y-3">
              <span className="text-[11px] font-mono uppercase tracking-widest text-tangerine bg-tangerine/10 px-3 py-1 rounded-full border border-tangerine/20 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-tangerine animate-ping" />
                Live Floor G Status ({status.currentUKTime})
              </span>
              <h3 className="text-3xl font-black font-display text-white">
                {status.rushLevel === 'Closed' ? 'Kitchen Closed' : `${status.rushLevel} Activity`}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed max-w-xs">
                {status.rushDescription}
              </p>
            </div>

            {/* Estimated Prep / Wait Time Dial */}
            <div className="md:col-span-8 flex flex-col sm:flex-row items-center justify-around gap-6 p-4 rounded-2xl bg-subway/80 border border-white/5">
              <div className="text-center sm:text-left">
                <span className="text-xs text-gray-400 block">Current Wait Estimate:</span>
                <span className="text-3xl sm:text-4xl font-mono font-black text-white">
                  ~{status.estWaitMins} <span className="text-sm font-sans font-normal text-gray-400">mins</span>
                </span>
                <p className="text-[11px] text-emerald-campus mt-0.5">
                  {status.isOpen ? 'Direct kitchen dispatch' : 'Reopens next shift'}
                </p>
              </div>

              <div className="h-10 w-px bg-white/10 hidden sm:block" />

              <div className="text-center sm:text-left">
                <span className="text-xs text-gray-400 block">Today's Schedule:</span>
                <span className="text-lg font-bold text-white">
                  {status.dayName}: {status.openHourStr} - {status.closeHourStr}
                </span>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  {status.nextChangeText}
                </p>
              </div>

              <div className="h-10 w-px bg-white/10 hidden sm:block" />

              <div className="text-center sm:text-left">
                <span className="text-xs text-gray-400 block">Best Sweet Spot:</span>
                <span className="text-base font-bold text-emerald-300">
                  14:15 - 16:30
                </span>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  Quickest order turn-around
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Schedule Timeline Bars */}
        <div className="space-y-4 mb-16">
          <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-tangerine" />
            Typical Daily Timeline at Campus Central
          </h3>

          <div className="grid grid-cols-1 gap-3">
            {schedule.map((block, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-2xl bg-charcoal border border-white/5 hover:border-white/15 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-tangerine bg-tangerine/10 px-2.5 py-1 rounded-lg border border-tangerine/20">
                      {block.timeRange}
                    </span>
                    <h4 className="text-sm font-bold text-white">{block.period}</h4>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                        block.intensity === 'Peak'
                          ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                          : block.intensity === 'Moderate'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      }`}
                    >
                      {block.intensity} ({block.estWait})
                    </span>
                  </div>
                </div>

                {/* Progress bar representing crowd density */}
                <div className="w-full h-2 bg-subway rounded-full overflow-hidden p-0.5 border border-white/5 mb-2">
                  <div
                    className={`h-full rounded-full ${
                      block.intensity === 'Peak'
                        ? 'bg-gradient-to-r from-amber-500 to-red-500'
                        : block.intensity === 'Moderate'
                        ? 'bg-gradient-to-r from-emerald-500 to-amber-500'
                        : 'bg-emerald-500'
                    }`}
                    style={{ width: `${block.percent}%` }}
                  />
                </div>

                <p className="text-xs text-gray-400">{block.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Seating Zones Guide */}
        <div>
          <div className="mb-6 space-y-1">
            <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
              <Armchair className="w-5 h-5 text-emerald-campus" />
              Campus Central Seating & Work Zones
            </h3>
            <p className="text-xs text-gray-400">
              Pick the right spot to enjoy your Scran meal while studying or catching up with friends.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {seatingZones.map((zone, idx) => {
              const Icon = zone.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-3xl bg-charcoal border border-white/5 hover:border-emerald-500/30 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-2xl bg-subway border border-white/10 flex items-center justify-center text-emerald-campus">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white font-display">
                        {zone.title}
                      </h4>
                      <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                        {zone.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-gray-400">
                    <span className="font-semibold text-white">{zone.seats}</span>
                    <span className="text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-800/30 text-[11px]">
                      {zone.vibe}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
