import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Plus,
  Check,
  Sparkles,
  Flame,
  Coffee,
  Sandwich,
  Utensils,
  Calculator,
} from 'lucide-react';
import { MENU_ITEMS, CATEGORIES, MEAL_DEAL_COMBO_PRICE } from '../../data/menuData';
import type { MenuItem, MenuCategory, DietaryTag, TrayItem } from '../../types';

interface MenuExplorerProps {
  onAddToTray: (item: TrayItem) => void;
}

export const MenuExplorer: React.FC<MenuExplorerProps> = ({ onAddToTray }) => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('all');
  const [selectedDietary, setSelectedDietary] = useState<DietaryTag | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Meal Deal Calculator interactive states
  const [mealDealItem, setMealDealItem] = useState<MenuItem | null>(
    MENU_ITEMS.find((m) => m.id === 'scran-royal-burger') || null
  );
  const [includeFriesDrink, setIncludeFriesDrink] = useState(true);

  // Added animation tracker
  const [addedItemMap, setAddedItemMap] = useState<{ [id: string]: boolean }>({});

  const dietaryFilters: (DietaryTag | 'All')[] = [
    'All',
    'Halal',
    'Vegetarian',
    'Vegan',
    'Gluten-Free',
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category match
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;

      // Dietary filter match
      const matchesDietary =
        selectedDietary === 'All' || item.tags.includes(selectedDietary);

      // Search match
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        query === '' ||
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.ingredients.some((ing) => ing.toLowerCase().includes(query));

      return matchesCategory && matchesDietary && matchesSearch;
    });
  }, [selectedCategory, selectedDietary, searchQuery]);

  const handleAddItem = (
    item: MenuItem,
    optionLabel?: string,
    overridePrice?: number,
    withMealDeal: boolean = false
  ) => {
    const trayItem: TrayItem = {
      id: `${item.id}-${Date.now()}`,
      menuItemId: item.id,
      name: item.name,
      price: overridePrice ?? item.price,
      selectedOption: optionLabel,
      quantity: 1,
      isMealDealAdded: withMealDeal,
      mealDealPrice: withMealDeal ? MEAL_DEAL_COMBO_PRICE : undefined,
    };

    onAddToTray(trayItem);
    setAddedItemMap((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemMap((prev) => ({ ...prev, [item.id]: false }));
    }, 1600);
  };

  return (
    <section id="menu" className="py-20 relative subway-tile-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-campus/10 border border-emerald-campus/20 text-emerald-campus text-xs font-semibold">
            <Flame className="w-3.5 h-3.5 text-tangerine" />
            <span>Campus Central Food Court Menu</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-white tracking-tight">
            Explore The Full Scran Menu
          </h2>
          <p className="text-sm sm:text-base text-gray-300">
            Real prices, authentic local Scottish produce, and dietary transparency. All made fresh to order at Floor G.
          </p>
        </div>

        {/* Search & Dietary Filters Bar */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search breakfast rolls, 12' pizzas, burgers, salads..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-charcoal border border-white/10 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-tangerine focus:ring-1 focus:ring-tangerine transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Dietary Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
              <span className="text-xs text-gray-400 flex items-center gap-1 mr-1 shrink-0">
                <Filter className="w-3.5 h-3.5 text-tangerine" />
                Diet:
              </span>
              {dietaryFilters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedDietary(filter)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                    selectedDietary === filter
                      ? 'bg-emerald-campus text-white shadow-glow-emerald'
                      : 'bg-charcoal text-gray-300 hover:text-white hover:bg-subway border border-white/5'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as MenuCategory)}
                className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-2 border ${
                  selectedCategory === cat.id
                    ? 'bg-tangerine text-white border-tangerine shadow-glow-orange'
                    : 'bg-charcoal/80 text-gray-300 border-white/5 hover:bg-subway hover:text-white'
                }`}
              >
                {cat.id === 'all' && <Utensils className="w-4 h-4" />}
                {cat.id === 'am' && <Flame className="w-4 h-4" />}
                {cat.id === 'fast' && <Sparkles className="w-4 h-4" />}
                {cat.id === 'pizza' && <Utensils className="w-4 h-4" />}
                {cat.id === 'deli' && <Sandwich className="w-4 h-4" />}
                {cat.id === 'coffee' && <Coffee className="w-4 h-4" />}
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* INTERACTIVE MEAL DEAL CALCULATOR BANNER */}
        <div id="meal-deals" className="mb-12 p-6 rounded-3xl glass-panel-warm border border-tangerine/30 shadow-subtle-card relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-tangerine/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
            <div className="lg:col-span-7 space-y-2.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tangerine/20 text-tangerine text-xs font-bold border border-tangerine/30">
                <Calculator className="w-3.5 h-3.5" />
                <span>Student Saver Meal Deal Calculator</span>
              </div>
              <h3 className="text-2xl font-bold font-display text-white">
                Add Skin-On Fries & Cold Drink for just +£1.80
              </h3>
              <p className="text-xs sm:text-sm text-gray-300">
                Upgrade any Fast Scran burger or fresh artisan deli panini to a full campus meal combo. Calculate your exact total and send it straight to the kitchen.
              </p>

              {/* Selector for which meal deal item to preview */}
              <div className="pt-2 flex flex-wrap items-center gap-2">
                <span className="text-xs text-gray-400">Choose Main:</span>
                {MENU_ITEMS.filter((m) => m.mealDealEligible).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setMealDealItem(item)}
                    className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                      mealDealItem?.id === item.id
                        ? 'bg-white text-graphite font-bold shadow-md'
                        : 'bg-subway text-gray-300 hover:text-white border border-white/5'
                    }`}
                  >
                    {item.name} (£{item.price.toFixed(2)})
                  </button>
                ))}
              </div>
            </div>

            {/* Calculator Calculation Result Box */}
            <div className="lg:col-span-5 bg-subway/90 p-5 rounded-2xl border border-white/10 space-y-3">
              <div className="flex items-center justify-between text-xs text-gray-300">
                <span>Selected Main:</span>
                <span className="font-semibold text-white">
                  {mealDealItem?.name} (£{mealDealItem?.price.toFixed(2)})
                </span>
              </div>

              {/* Toggle Fries & Drink Checkbox */}
              <label className="flex items-center justify-between p-2.5 rounded-xl bg-charcoal border border-white/5 cursor-pointer hover:bg-charcoal/80 transition-colors">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={includeFriesDrink}
                    onChange={(e) => setIncludeFriesDrink(e.target.checked)}
                    className="w-4 h-4 rounded text-tangerine focus:ring-tangerine accent-tangerine cursor-pointer"
                  />
                  <span className="text-xs text-white font-medium">
                    Add Golden Fries + Cold Can/Juice
                  </span>
                </div>
                <span className="text-xs font-bold text-emerald-campus">+£1.80</span>
              </label>

              {/* Live Combo Total */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-gray-400 uppercase tracking-wider block">
                    Calculated Combo Price:
                  </span>
                  <span className="text-2xl font-mono font-black text-tangerine">
                    £{((mealDealItem?.price || 4.95) + (includeFriesDrink ? 1.80 : 0)).toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={() => {
                    if (mealDealItem) {
                      handleAddItem(
                        mealDealItem,
                        includeFriesDrink ? 'Student Combo (+ Fries & Drink)' : undefined,
                        mealDealItem.price,
                        includeFriesDrink
                      );
                    }
                  }}
                  className="px-5 py-2.5 rounded-xl bg-tangerine hover:bg-tangerine-hover text-white text-xs font-bold shadow-glow-orange transition-all flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Combo to Tray</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="py-16 text-center rounded-3xl bg-charcoal border border-white/5 space-y-3">
            <Utensils className="w-10 h-10 text-gray-500 mx-auto" />
            <h3 className="text-lg font-bold text-white">No dishes match your filter</h3>
            <p className="text-xs text-gray-400">
              Try switching dietary tags or clearing your search term.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedDietary('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-subway text-white text-xs font-medium hover:bg-white/10 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className="p-5 rounded-3xl bg-charcoal/80 border border-white/10 hover:border-tangerine/30 transition-all flex flex-col justify-between group shadow-subtle-card"
              >
                <div>
                  {/* Item Badges & Price */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {item.badge && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-tangerine bg-tangerine/10 px-2.5 py-0.5 rounded-full border border-tangerine/20">
                          {item.badge}
                        </span>
                      )}
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-medium text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-800/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <span className="text-lg font-bold font-mono text-white whitespace-nowrap">
                      £{item.price.toFixed(2)}
                      {item.options && (
                        <span className="text-[11px] text-gray-400 font-sans ml-1">
                          (from)
                        </span>
                      )}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold font-display text-white group-hover:text-tangerine transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-300 mt-1.5 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Portion Options if available */}
                  {item.options && item.options.length > 0 && (
                    <div className="mt-3.5 space-y-1.5">
                      <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block">
                        Portion / Size Options:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {item.options.map((opt) => (
                          <button
                            key={opt.label}
                            onClick={() => handleAddItem(item, opt.label, opt.price)}
                            className="px-2.5 py-1 rounded-lg bg-subway hover:bg-tangerine/20 hover:text-tangerine text-gray-300 text-[11px] font-medium border border-white/5 transition-colors flex items-center gap-1"
                          >
                            <span>{opt.label}</span>
                            <span className="font-mono font-bold text-white">
                              (£{opt.price.toFixed(2)})
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Ingredients Tags */}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {item.ingredients.slice(0, 4).map((ing, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] text-gray-400 bg-subway/60 px-2 py-0.5 rounded-md"
                      >
                        {ing}
                      </span>
                    ))}
                    {item.ingredients.length > 4 && (
                      <span className="text-[10px] text-gray-500 py-0.5">
                        +{item.ingredients.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="mt-5 pt-3.5 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-gray-400">
                    {item.nutrition.calories} kcal
                  </span>

                  <button
                    onClick={() => handleAddItem(item)}
                    className="px-3.5 py-1.5 rounded-xl bg-tangerine hover:bg-tangerine-hover text-white text-xs font-bold transition-all shadow-glow-orange flex items-center gap-1.5"
                  >
                    {addedItemMap[item.id] ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add to Tray</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
