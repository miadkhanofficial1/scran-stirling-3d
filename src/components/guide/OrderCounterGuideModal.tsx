import React, { useEffect, useRef } from 'react';
import { X, Touchpad, Bell, UtensilsCrossed, Coffee, CheckCircle2, MapPin } from 'lucide-react';

interface OrderCounterGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrderCounterGuideModal: React.FC<OrderCounterGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  // Fallback for light-dismiss for browsers without native 'closedby' support
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleBackdropClick = (event: MouseEvent) => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      const isDialogContent =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width;

      if (!isDialogContent) {
        onClose();
      }
    };

    const handleCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };

    dialog.addEventListener('click', handleBackdropClick);
    dialog.addEventListener('cancel', handleCancel);

    return () => {
      dialog.removeEventListener('click', handleBackdropClick);
      dialog.removeEventListener('cancel', handleCancel);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      closedby="any"
      aria-labelledby="order-guide-title"
      className="m-auto rounded-3xl p-0 bg-transparent backdrop:bg-black/80 backdrop:backdrop-blur-sm max-w-xl w-[92%] text-white focus:outline-none overflow-hidden shadow-2xl"
    >
      <div className="bg-charcoal border border-white/10 rounded-3xl overflow-hidden p-6 sm:p-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Close dialog"
          className="absolute top-5 right-5 p-2 rounded-full bg-subway text-gray-400 hover:text-white hover:bg-white/10 transition-colors border border-white/5"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-tangerine/10 border border-tangerine/30 flex items-center justify-center text-tangerine">
            <Touchpad className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-tangerine bg-tangerine/10 px-2.5 py-0.5 rounded-full border border-tangerine/20">
              Campus Central · Floor G
            </span>
            <h2 id="order-guide-title" className="text-2xl font-bold font-display text-white mt-1">
              Order Counter Guide
            </h2>
          </div>
        </div>

        <p className="text-sm text-gray-300 mb-6 leading-relaxed">
          Scran is designed for high-speed campus dining between lectures. Follow these 4 easy steps to get your fresh stone-baked pizza, burger, or Scottish morning roll:
        </p>

        {/* 4 Steps */}
        <div className="space-y-4 mb-6">
          <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-subway/60 border border-white/5">
            <div className="w-8 h-8 rounded-xl bg-tangerine text-white font-bold text-sm flex items-center justify-center shrink-0">
              1
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white flex items-center gap-1.5">
                <Touchpad className="w-4 h-4 text-tangerine" />
                Touchscreen Kiosks or Till
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Order directly on the digital touchscreen kiosks in the atrium or step up to the front counter till. Cashless cards & student Stirling ID accepted.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-subway/60 border border-white/5">
            <div className="w-8 h-8 rounded-xl bg-crust text-white font-bold text-sm flex items-center justify-center shrink-0">
              2
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white flex items-center gap-1.5">
                <Bell className="w-4 h-4 text-crust" />
                Collect Buzzer / Order Ticket
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Your receipt will have your collection call number. For cooked-to-order stone-baked pizzas, pick up a vibrating digital buzzer from the kiosk tray.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-subway/60 border border-white/5">
            <div className="w-8 h-8 rounded-xl bg-emerald-campus text-white font-bold text-sm flex items-center justify-center shrink-0">
              3
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white flex items-center gap-1.5">
                <UtensilsCrossed className="w-4 h-4 text-emerald-campus" />
                Dedicated Pickup Hatches
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Watch the large digital displays above the kitchen hatches:
                <br />
                <span className="text-gray-300 font-medium">Hatch A:</span> Stone-Baked Pizzas · <span className="text-gray-300 font-medium">Hatch B:</span> Fast Scran Burgers · <span className="text-gray-300 font-medium">Hatch C:</span> Deli & Rolls
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-emerald-950/20 border border-emerald-500/20">
            <div className="w-8 h-8 rounded-xl bg-emerald-500 text-graphite font-bold text-sm flex items-center justify-center shrink-0">
              4
            </div>
            <div>
              <h3 className="text-sm font-semibold text-emerald-300 flex items-center gap-1.5">
                <Coffee className="w-4 h-4 text-emerald-400" />
                20p Reusable Cup Discount
              </h3>
              <p className="text-xs text-gray-300 mt-0.5">
                Bring any clean reusable travel tumbler to the Matthew Algie barista bar to get an instant 20p discount on every coffee, latte, or hot chocolate!
              </p>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <MapPin className="w-4 h-4 text-tangerine shrink-0" />
            <span>Floor G, Campus Central Building (next to Library entrance)</span>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-tangerine hover:bg-tangerine-hover text-white text-xs font-semibold shadow-glow-orange transition-all flex items-center justify-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4" />
            Got It, Let's Eat!
          </button>
        </div>
      </div>
    </dialog>
  );
};
