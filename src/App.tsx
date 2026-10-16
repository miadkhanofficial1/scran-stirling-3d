import React, { useState } from 'react';
import { CinematicPreloader } from './components/intro/CinematicPreloader';
import { Navbar } from './components/navigation/Navbar';
import { HeroSection } from './components/hero/HeroSection';
import { SignatureShowcase } from './components/showcase/SignatureShowcase';
import { MenuExplorer } from './components/menu/MenuExplorer';
import { CampusRushHours } from './components/insights/CampusRushHours';
import { CampusLocationGuide } from './components/location/CampusLocationGuide';
import { Footer } from './components/footer/Footer';
import { OrderCounterGuideModal } from './components/guide/OrderCounterGuideModal';
import { TrayDrawer } from './components/tray/TrayDrawer';
import type { TrayItem } from './types';

export const App: React.FC = () => {
  const [, setIsPreloaderComplete] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isTrayOpen, setIsTrayOpen] = useState(false);
  const [trayItems, setTrayItems] = useState<TrayItem[]>([]);

  // Add Item to Tray
  const handleAddToTray = (newItem: TrayItem) => {
    setTrayItems((prevItems) => {
      // Check if identical item (same menuItemId, selectedOption, and meal deal flag) exists
      const existingIndex = prevItems.findIndex(
        (i) =>
          i.menuItemId === newItem.menuItemId &&
          i.selectedOption === newItem.selectedOption &&
          Boolean(i.isMealDealAdded) === Boolean(newItem.isMealDealAdded)
      );

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += newItem.quantity;
        return updated;
      }

      return [...prevItems, newItem];
    });
  };

  // Update item quantity
  const handleUpdateQuantity = (id: string, delta: number) => {
    setTrayItems((prevItems) => {
      return prevItems
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as TrayItem[];
    });
  };

  // Remove single item
  const handleRemoveItem = (id: string) => {
    setTrayItems((prevItems) => prevItems.filter((i) => i.id !== id));
  };

  // Clear all items
  const handleClearTray = () => {
    setTrayItems([]);
  };

  const totalTrayCount = trayItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-graphite text-chalk selection:bg-tangerine selection:text-white flex flex-col font-sans">
      {/* Cinematic Entry Preloader (Runs once per session) */}
      <CinematicPreloader onComplete={() => setIsPreloaderComplete(true)} />

      {/* Main Navigation */}
      <Navbar
        trayCount={totalTrayCount}
        onOpenTray={() => setIsTrayOpen(true)}
        onOpenGuide={() => setIsGuideOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* 1. Cinematic 3D Hero Section */}
        <HeroSection />

        {/* 2. Signature 3D Dish Showcase */}
        <SignatureShowcase onAddToTray={handleAddToTray} />

        {/* 3. Interactive Menu Explorer & Meal Deal Calculator */}
        <MenuExplorer onAddToTray={handleAddToTray} />

        {/* 4. Campus Rush Hour & Seating Insights */}
        <CampusRushHours />

        {/* 5. Campus Central Location & Google Maps Navigation */}
        <CampusLocationGuide />
      </main>

      {/* 6. Responsive Modern Footer */}
      <Footer />

      {/* Order Counter Guide Dialog (Accessible Modal with Light-Dismiss) */}
      <OrderCounterGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

      {/* Slide-out Tray Drawer */}
      <TrayDrawer
        isOpen={isTrayOpen}
        onClose={() => setIsTrayOpen(false)}
        items={trayItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearTray={handleClearTray}
      />
    </div>
  );
};

export default App;
