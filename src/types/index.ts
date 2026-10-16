export type DietaryTag = 'Halal' | 'Vegan' | 'Vegetarian' | 'Gluten-Free' | 'Dairy-Free';

export type MenuCategory = 'all' | 'am' | 'fast' | 'pizza' | 'deli' | 'coffee';

export interface NutritionInfo {
  calories: number;
  protein: string;
  carbs: string;
  fat: string;
  allergens: string[];
}

export interface MenuItemOption {
  label: string;
  price: number;
  calories?: number;
}

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  description: string;
  price: number;
  options?: MenuItemOption[];
  tags: DietaryTag[];
  badge?: string;
  popular?: boolean;
  is3dAvailable?: boolean;
  modelType?: 'pizza' | 'burger' | 'roll' | 'coffee';
  mealDealEligible?: boolean;
  nutrition: NutritionInfo;
  ingredients: string[];
}

export interface TrayItem {
  id: string;
  menuItemId: string;
  name: string;
  price: number;
  selectedOption?: string;
  customizations?: string[];
  quantity: number;
  isMealDealAdded?: boolean;
  mealDealPrice?: number;
}

export interface RushHourData {
  timeSlot: string;
  crowdLevel: 'Low' | 'Moderate' | 'Peak';
  estWaitMinutes: string;
  description: string;
  isCurrent?: boolean;
}
