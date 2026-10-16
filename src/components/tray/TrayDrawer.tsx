import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  Receipt,
  RotateCcw,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { TrayItem } from '../../types';

interface TrayDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: TrayItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearTray: () => void;
}

export const TrayDrawer: React.FC<TrayDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearTray,
}) => {
  const [isOrdered, setIsOrdered] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [pickupTimer, setPickupTimer] = useState(8);

  const subtotal = items.reduce((sum, item) => {
    const itemTotal = (item.price + (item.isMealDealAdded ? (item.mealDealPrice || 1.80) : 0)) * item.quantity;
    return sum + itemTotal;
  }, 0);

  const total = subtotal;

  const handleCheckoutSimulation = () => {
    // Generate authentic Stirling Campus Central receipt code
    const randomCode = `SC-${Math.floor(100 + Math.random() * 900)}`;
    setOrderNumber(randomCode);
    setIsOrdered(true);
    setPickupTimer(8);

    // Fire celebratory confetti
    try {
      confetti({
        particleCount: 65,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#F26A21', '#10B981', '#E07A28', '#FFFFFF'],
      });
    } catch {
      // safe fallback
    }
  };

  const handleReset = () => {
    setIsOrdered(false);
    onClearTray();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="absolute inset-y-0 right-0 max-w-md w-full bg-charcoal border-l border-white/10 shadow-2xl flex flex-col z-10"
          >
            {/* Header */}
            <div className="p-5 border-b border-white/10 flex items-center justify-between bg-subway/50">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-tangerine/15 text-tangerine flex items-center justify-center border border-tangerine/30">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white font-display">
                    Campus Scran Tray
                  </h2>
                  <p className="text-[11px] text-gray-400">
                    Floor G Pickup · {items.length} {items.length === 1 ? 'item' : 'items'}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="Close tray"
                className="p-2 rounded-xl bg-subway text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {isOrdered ? (
                /* Successful simulated campus pickup order */
                <div className="py-6 flex flex-col items-center text-center space-y-5">
                  <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 text-emerald-campus flex items-center justify-center border border-emerald-500/30">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div>
                    <span className="text-xs uppercase font-mono tracking-widest text-emerald-campus bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-800/40">
                      Kitchen Ticket Queued
                    </span>
                    <h3 className="text-2xl font-bold font-display text-white mt-2">
                      Order Confirmed!
                    </h3>
                    <p className="text-xs text-gray-400 mt-1 max-w-xs mx-auto">
                      Sent directly to Campus Central Floor G kitchen displays.
                    </p>
                  </div>

                  {/* Stirling Campus Central Order Slip */}
                  <div className="w-full bg-subway/90 rounded-2xl border border-white/10 p-5 space-y-3 text-left">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div className="flex items-center gap-1.5 text-xs text-gray-300">
                        <Receipt className="w-4 h-4 text-tangerine" />
                        <span>Pickup Call Number:</span>
                      </div>
                      <span className="text-xl font-mono font-bold text-tangerine tracking-wider">
                        {orderNumber}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-300">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-emerald-campus" />
                        Estimated Prep Time:
                      </span>
                      <span className="font-semibold text-white">~{pickupTimer} mins</span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-300">
                      <span>Collection Point:</span>
                      <span className="font-semibold text-white">
                        Hatch A (Pizzas) & Hatch B (Burgers)
                      </span>
                    </div>

                    <div className="pt-2 border-t border-white/5 text-[11px] text-gray-400 italic">
                      Present this call number at the Floor G collection screen when your number rings green!
                    </div>
                  </div>

                  <button
                    onClick={handleReset}
                    className="w-full py-3 rounded-xl bg-tangerine hover:bg-tangerine-hover text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-glow-orange"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Place Another Campus Order
                  </button>
                </div>
              ) : items.length === 0 ? (
                /* Empty tray state */
                <div className="py-16 flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-3xl bg-subway flex items-center justify-center text-gray-500 border border-white/5">
                    <ShoppingBag className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">Your Tray is Empty</h3>
                    <p className="text-xs text-gray-400 mt-1 max-w-xs">
                      Explore stone-baked pizzas, McGhee's morning rolls, or gourmet burgers and add them to your campus tray!
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors"
                  >
                    Browse Stirling Menu
                  </button>
                </div>
              ) : (
                /* Item list */
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-2xl bg-subway/80 border border-white/5 space-y-2.5"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <h4 className="text-sm font-semibold text-white">{item.name}</h4>
                          {item.selectedOption && (
                            <span className="inline-block text-[11px] text-tangerine font-medium">
                              {item.selectedOption}
                            </span>
                          )}
                          {item.customizations && item.customizations.length > 0 && (
                            <p className="text-[11px] text-gray-400">
                              Fillings: {item.customizations.join(', ')}
                            </p>
                          )}
                          {item.isMealDealAdded && (
                            <div className="mt-1 flex items-center gap-1 text-[11px] text-emerald-campus bg-emerald-950/30 px-2 py-0.5 rounded-md border border-emerald-800/30 w-fit">
                              <Sparkles className="w-3 h-3" />
                              <span>Meal Deal: Fries & Drink (+£{item.mealDealPrice?.toFixed(2) || '1.80'})</span>
                            </div>
                          )}
                        </div>
                        <span className="text-sm font-bold text-white font-mono">
                          £{((item.price + (item.isMealDealAdded ? (item.mealDealPrice || 1.80) : 0)) * item.quantity).toFixed(2)}
                        </span>
                      </div>

                      {/* Quantity & Delete Controls */}
                      <div className="flex items-center justify-between pt-1 border-t border-white/5">
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-gray-400 hover:text-red-400 text-xs flex items-center gap-1 transition-colors"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>

                        <div className="flex items-center gap-2 bg-charcoal px-2 py-1 rounded-xl border border-white/5">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1 rounded-lg text-gray-400 hover:text-white transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-semibold text-white w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1 rounded-lg text-gray-400 hover:text-white transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Tray Footer & Checkout */}
            {items.length > 0 && !isOrdered && (
              <div className="p-5 border-t border-white/10 bg-subway/80 space-y-3.5">
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-gray-400">
                    <span>Subtotal</span>
                    <span className="font-mono text-white">£{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-400">
                    <span>Campus Central Pickup (Floor G)</span>
                    <span className="text-emerald-campus font-medium">Free</span>
                  </div>
                  <div className="flex items-center justify-between text-base font-bold text-white pt-2 border-t border-white/10">
                    <span>Total</span>
                    <span className="font-mono text-tangerine text-lg">
                      £{total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCheckoutSimulation}
                  className="w-full py-3.5 rounded-2xl bg-tangerine hover:bg-tangerine-hover text-white font-bold text-sm shadow-glow-orange transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Confirm Campus Central Pickup</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-[10px] text-gray-400 text-center">
                  Instant pickup ticket generation. Pay via student card or contactless at Floor G till.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
