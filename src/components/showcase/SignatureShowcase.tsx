import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Info,
  Plus,
  Check,
  ShieldAlert,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Dish3DViewer } from '../3d/Dish3DViewer';
import { MENU_ITEMS } from '../../data/menuData';
import type { MenuItem, TrayItem } from '../../types';

interface SignatureShowcaseProps {
  onAddToTray: (item: TrayItem) => void;
}

export const SignatureShowcase: React.FC<SignatureShowcaseProps> = ({ onAddToTray }) => {
  // Grab the 3 signature dishes
  const pizzaItem = MENU_ITEMS.find((m) => m.id === 'scran-pizza-pepperoni')!;
  const burgerItem = MENU_ITEMS.find((m) => m.id === 'scran-royal-burger')!;
  const rollItem = MENU_ITEMS.find((m) => m.id === 'scran-morning-roll')!;

  // Selected portion states
  const [pizzaSize, setPizzaSize] = useState<'12"' | '6"'>('12"');
  const [rollOption, setRollOption] = useState<'single' | 'double'>('single');

  // Expanded nutrition info toggles
  const [expandedNutrition, setExpandedNutrition] = useState<{ [key: string]: boolean }>({});

  const toggleNutrition = (id: string) => {
    setExpandedNutrition((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const [addedItem, setAddedItem] = useState<string | null>(null);

  const handleAdd = (item: MenuItem, optionLabel?: string, overridePrice?: number) => {
    const trayItem: TrayItem = {
      id: `${item.id}-${Date.now()}`,
      menuItemId: item.id,
      name: item.name,
      price: overridePrice ?? item.price,
      selectedOption: optionLabel,
      quantity: 1,
    };
    onAddToTray(trayItem);
    setAddedItem(item.id);
    setTimeout(() => setAddedItem(null), 1800);
  };

  return (
    <section id="showcase" className="py-20 bg-charcoal/60 relative">
      {/* Decorative Line Accent */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-tangerine/10 border border-tangerine/20 text-tangerine text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive 360° Counter Platter</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-white tracking-tight">
            Signature Campus Dishes
          </h2>
          <p className="text-sm sm:text-base text-gray-300">
            Rotate, inspect fresh ingredients, and customize sizes before ordering directly to the Campus Central kitchen.
          </p>
        </div>

        {/* 3 Interactive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* CARD 1: 12" Stone-Baked Pepperoni Pizza */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl glass-panel-warm border border-white/10 p-6 flex flex-col justify-between hover:border-tangerine/40 transition-all shadow-subtle-card group"
          >
            <div>
              {/* Header Badge & Price */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-tangerine bg-tangerine/10 px-3 py-1 rounded-full border border-tangerine/20">
                  {pizzaItem.badge}
                </span>
                <span className="text-xl font-bold font-mono text-white">
                  £{pizzaSize === '12"' ? '7.25' : '4.20'}
                </span>
              </div>

              {/* 360 3D Viewer */}
              <div className="mb-4">
                <Dish3DViewer modelType="pizza" sizeOption={pizzaSize} />
              </div>

              {/* Size Selector (12" vs 6") */}
              <div className="flex items-center gap-2 mb-4 p-1.5 bg-subway/80 rounded-xl border border-white/5">
                <button
                  onClick={() => setPizzaSize('12"')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    pizzaSize === '12"'
                      ? 'bg-tangerine text-white shadow-sm'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  12" Stone-Baked (£7.25)
                </button>
                <button
                  onClick={() => setPizzaSize('6"')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    pizzaSize === '6"'
                      ? 'bg-tangerine text-white shadow-sm'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  6" Pizzetta (£4.20)
                </button>
              </div>

              {/* Dish Info */}
              <h3 className="text-xl font-bold text-white font-display">
                {pizzaItem.name}
              </h3>
              <p className="text-xs text-gray-300 mt-1.5 leading-relaxed">
                {pizzaItem.description}
              </p>

              {/* Key Ingredients */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {pizzaItem.ingredients.map((ing, i) => (
                  <span
                    key={i}
                    className="text-[11px] text-gray-400 bg-subway px-2 py-0.5 rounded-md border border-white/5"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions & Nutrition Expansion */}
            <div className="mt-6 pt-4 border-t border-white/10 space-y-3">
              <button
                onClick={() => toggleNutrition(pizzaItem.id)}
                className="w-full flex items-center justify-between text-xs text-gray-400 hover:text-white transition-colors"
              >
                <span className="flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-tangerine" />
                  Nutrition & Allergen Info
                </span>
                {expandedNutrition[pizzaItem.id] ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>

              {expandedNutrition[pizzaItem.id] && (
                <div className="p-3 bg-subway/70 rounded-xl text-xs space-y-2 border border-white/5">
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div>
                      <p className="text-gray-400 text-[10px]">Calories</p>
                      <p className="font-bold text-white">{pizzaSize === '12"' ? '990' : '510'} kcal</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-[10px]">Protein</p>
                      <p className="font-bold text-white">44g</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-[10px]">Carbs</p>
                      <p className="font-bold text-white">106g</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-[10px]">Fat</p>
                      <p className="font-bold text-white">42g</p>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-white/10 flex items-start gap-1 text-[11px] text-amber-300">
                    <ShieldAlert className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span>Allergens: {pizzaItem.nutrition.allergens.join(', ')}</span>
                  </div>
                </div>
              )}

              <button
                onClick={() =>
                  handleAdd(
                    pizzaItem,
                    pizzaSize === '12"' ? '12" Full Stone-Baked' : '6" Personal Lunch Pizzetta',
                    pizzaSize === '12"' ? 7.25 : 4.20
                  )
                }
                className="w-full py-2.5 rounded-xl bg-tangerine hover:bg-tangerine-hover text-white text-xs font-bold transition-all shadow-glow-orange flex items-center justify-center gap-2"
              >
                {addedItem === pizzaItem.id ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Tray</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Add {pizzaSize} Pizza to Tray</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>

          {/* CARD 2: The Scran Royal Burger */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-3xl glass-panel-warm border border-white/10 p-6 flex flex-col justify-between hover:border-tangerine/40 transition-all shadow-subtle-card group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                  {burgerItem.badge}
                </span>
                <span className="text-xl font-bold font-mono text-white">
                  £{burgerItem.price.toFixed(2)}
                </span>
              </div>

              <div className="mb-4">
                <Dish3DViewer modelType="burger" />
              </div>

              {/* Halal Badge Pill */}
              <div className="flex items-center gap-2 mb-4 p-2 bg-emerald-950/30 rounded-xl border border-emerald-500/20 text-xs text-emerald-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>100% Scottish Prime Beef · Halal Certified</span>
              </div>

              <h3 className="text-xl font-bold text-white font-display">
                {burgerItem.name}
              </h3>
              <p className="text-xs text-gray-300 mt-1.5 leading-relaxed">
                {burgerItem.description}
              </p>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {burgerItem.ingredients.map((ing, i) => (
                  <span
                    key={i}
                    className="text-[11px] text-gray-400 bg-subway px-2 py-0.5 rounded-md border border-white/5"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 space-y-3">
              <button
                onClick={() => toggleNutrition(burgerItem.id)}
                className="w-full flex items-center justify-between text-xs text-gray-400 hover:text-white transition-colors"
              >
                <span className="flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-tangerine" />
                  Nutrition & Allergen Info
                </span>
                {expandedNutrition[burgerItem.id] ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>

              {expandedNutrition[burgerItem.id] && (
                <div className="p-3 bg-subway/70 rounded-xl text-xs space-y-2 border border-white/5">
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div>
                      <p className="text-gray-400 text-[10px]">Calories</p>
                      <p className="font-bold text-white">{burgerItem.nutrition.calories} kcal</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-[10px]">Protein</p>
                      <p className="font-bold text-white">{burgerItem.nutrition.protein}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-[10px]">Carbs</p>
                      <p className="font-bold text-white">{burgerItem.nutrition.carbs}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-[10px]">Fat</p>
                      <p className="font-bold text-white">{burgerItem.nutrition.fat}</p>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-white/10 flex items-start gap-1 text-[11px] text-amber-300">
                    <ShieldAlert className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span>Allergens: {burgerItem.nutrition.allergens.join(', ')}</span>
                  </div>
                </div>
              )}

              <button
                onClick={() => handleAdd(burgerItem)}
                className="w-full py-2.5 rounded-xl bg-tangerine hover:bg-tangerine-hover text-white text-xs font-bold transition-all shadow-glow-orange flex items-center justify-center gap-2"
              >
                {addedItem === burgerItem.id ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Tray</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Add Royal Burger to Tray</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>

          {/* CARD 3: Morning McGhee's Roll */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-3xl glass-panel-warm border border-white/10 p-6 flex flex-col justify-between hover:border-tangerine/40 transition-all shadow-subtle-card group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  {rollItem.badge}
                </span>
                <span className="text-xl font-bold font-mono text-white">
                  £{rollOption === 'single' ? '2.50' : '2.80'}
                </span>
              </div>

              <div className="mb-4">
                <Dish3DViewer modelType="roll" />
              </div>

              {/* Single vs Double Filling selector */}
              <div className="flex items-center gap-2 mb-4 p-1.5 bg-subway/80 rounded-xl border border-white/5">
                <button
                  onClick={() => setRollOption('single')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    rollOption === 'single'
                      ? 'bg-tangerine text-white shadow-sm'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Single Filling (£2.50)
                </button>
                <button
                  onClick={() => setRollOption('double')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    rollOption === 'double'
                      ? 'bg-tangerine text-white shadow-sm'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Double Filling (£2.80)
                </button>
              </div>

              <h3 className="text-xl font-bold text-white font-display">
                {rollItem.name}
              </h3>
              <p className="text-xs text-gray-300 mt-1.5 leading-relaxed">
                {rollItem.description}
              </p>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {rollItem.ingredients.map((ing, i) => (
                  <span
                    key={i}
                    className="text-[11px] text-gray-400 bg-subway px-2 py-0.5 rounded-md border border-white/5"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 space-y-3">
              <button
                onClick={() => toggleNutrition(rollItem.id)}
                className="w-full flex items-center justify-between text-xs text-gray-400 hover:text-white transition-colors"
              >
                <span className="flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-tangerine" />
                  Nutrition & Allergen Info
                </span>
                {expandedNutrition[rollItem.id] ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>

              {expandedNutrition[rollItem.id] && (
                <div className="p-3 bg-subway/70 rounded-xl text-xs space-y-2 border border-white/5">
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div>
                      <p className="text-gray-400 text-[10px]">Calories</p>
                      <p className="font-bold text-white">{rollOption === 'single' ? '340' : '490'} kcal</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-[10px]">Protein</p>
                      <p className="font-bold text-white">18g</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-[10px]">Carbs</p>
                      <p className="font-bold text-white">38g</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-[10px]">Fat</p>
                      <p className="font-bold text-white">19g</p>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-white/10 flex items-start gap-1 text-[11px] text-amber-300">
                    <ShieldAlert className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span>Allergens: {rollItem.nutrition.allergens.join(', ')}</span>
                  </div>
                </div>
              )}

              <button
                onClick={() =>
                  handleAdd(
                    rollItem,
                    rollOption === 'single' ? 'Single: Lorne Sausage' : 'Double: Lorne + Tattie Scone',
                    rollOption === 'single' ? 2.50 : 2.80
                  )
                }
                className="w-full py-2.5 rounded-xl bg-tangerine hover:bg-tangerine-hover text-white text-xs font-bold transition-all shadow-glow-orange flex items-center justify-center gap-2"
              >
                {addedItem === rollItem.id ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Tray</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Add {rollOption === 'single' ? 'Single' : 'Double'} Roll to Tray</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
