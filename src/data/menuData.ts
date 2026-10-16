import type { MenuItem } from '../types';

export const MENU_ITEMS: MenuItem[] = [
  // --- SCRAN AM (BREAKFAST) ---
  {
    id: 'scran-5-item-breakfast',
    name: '5-Item Scottish Breakfast',
    category: 'am',
    description: 'Hearty traditional Scottish morning plate. Includes Scottish sausage, crispy back bacon, fried free-range egg, golden tattie scone, baked beans, and buttered toast.',
    price: 5.55,
    tags: [],
    badge: 'Campus Classic',
    popular: true,
    is3dAvailable: true,
    modelType: 'roll',
    mealDealEligible: false,
    nutrition: {
      calories: 685,
      protein: '36g',
      carbs: '54g',
      fat: '37g',
      allergens: ['Gluten (Wheat)', 'Eggs', 'Milk', 'Sulphites']
    },
    ingredients: ['Scottish pork sausage', 'Back bacon', 'Free-range egg', 'Scottish potato scone', 'Heinz baked beans', 'Thick cut bloomer']
  },
  {
    id: 'scran-veggie-breakfast',
    name: 'Veggie Breakfast',
    category: 'am',
    description: 'Full plant-forward breakfast plate featuring vegan Cumberland sausage, roasted herb plum tomato, golden hash brown, fried free-range egg, baked beans, and bloomer toast.',
    price: 5.50,
    tags: ['Vegetarian'],
    badge: 'Vegetarian',
    popular: false,
    is3dAvailable: false,
    mealDealEligible: false,
    nutrition: {
      calories: 540,
      protein: '24g',
      carbs: '62g',
      fat: '22g',
      allergens: ['Gluten (Wheat)', 'Eggs', 'Soya']
    },
    ingredients: ['Plant-based Cumberland sausage', 'Fried free-range egg', 'Golden hash brown', 'Grilled plum tomato', 'Heinz baked beans', 'Bloomer toast']
  },
  {
    id: 'scran-morning-roll',
    name: "McGhee's Morning Roll",
    category: 'am',
    description: "Glasgow's famous McGhee's crispy morning roll, packed warm. Choose your favorite Scottish filling: authentic square Lorne sausage, black pudding, crispy bacon, fried egg, hash brown, or tattie scone.",
    price: 2.50,
    options: [
      { label: 'Single Filling', price: 2.50, calories: 340 },
      { label: 'Double Filling', price: 2.80, calories: 490 }
    ],
    tags: [],
    badge: 'Best Seller',
    popular: true,
    is3dAvailable: true,
    modelType: 'roll',
    mealDealEligible: false,
    nutrition: {
      calories: 395,
      protein: '18g',
      carbs: '38g',
      fat: '19g',
      allergens: ['Gluten (Wheat)', 'Sulphites', 'Eggs (if selected)']
    },
    ingredients: ["McGhee's bakery fresh roll", 'Scottish Lorne square sausage', 'Stornoway style black pudding', 'Smoked back bacon', 'Fried egg', 'Tattie scone', 'Crispy hash brown']
  },

  // --- FAST SCRAN (BURGERS & LOADED) ---
  {
    id: 'scran-royal-burger',
    name: 'The Scran Royal Burger',
    category: 'fast',
    description: 'Double grilled 100% Scottish beef smash patties, melted Monterey Jack cheese, crispy maple-smoked bacon, house burger glaze, and shredded crisp iceberg in a toasted brioche bun.',
    price: 4.95,
    tags: ['Halal'],
    badge: 'Signature',
    popular: true,
    is3dAvailable: true,
    modelType: 'burger',
    mealDealEligible: true,
    nutrition: {
      calories: 780,
      protein: '44g',
      carbs: '48g',
      fat: '46g',
      allergens: ['Gluten (Wheat)', 'Milk', 'Mustard', 'Sesame', 'Eggs']
    },
    ingredients: ['100% Scottish minced beef', 'Monterey Jack cheese', 'Smoked streaky bacon', 'House secret burger glaze', 'Iceberg lettuce', 'Toasted brioche bun']
  },
  {
    id: 'scran-quarter-pounder',
    name: 'Quarter Pounder',
    category: 'fast',
    description: 'Prime Scottish beef patty grilled to juicy perfection, topped with crisp shredded lettuce, sliced pickles, and Scran signature burger relish on a toasted sesame seed bun.',
    price: 4.40,
    options: [
      { label: 'Original', price: 4.40, calories: 540 },
      { label: 'With Melted Cheddar', price: 4.60, calories: 630 }
    ],
    tags: ['Halal'],
    popular: false,
    is3dAvailable: false,
    modelType: 'burger',
    mealDealEligible: true,
    nutrition: {
      calories: 590,
      protein: '32g',
      carbs: '45g',
      fat: '31g',
      allergens: ['Gluten (Wheat)', 'Mustard', 'Sesame', 'Milk (w/ cheese)']
    },
    ingredients: ['Scottish beef patty', 'Dill pickles', 'Shredded lettuce', 'Scran tomato burger relish', 'Toasted sesame bun']
  },
  {
    id: 'scran-buttermilk-chicken-burger',
    name: 'Buttermilk Chicken Burger',
    category: 'fast',
    description: 'Tender chicken breast steeped in Scottish buttermilk and fried in a secret herb crumb. Layered with roast garlic mayo, crunchy pickled slaw, and fresh lettuce in a soft brioche.',
    price: 4.95,
    tags: ['Halal'],
    badge: 'Top Pick',
    popular: true,
    is3dAvailable: false,
    modelType: 'burger',
    mealDealEligible: true,
    nutrition: {
      calories: 690,
      protein: '38g',
      carbs: '55g',
      fat: '35g',
      allergens: ['Gluten (Wheat)', 'Milk', 'Eggs', 'Mustard', 'Celery']
    },
    ingredients: ['Buttermilk-marinated chicken breast', 'Crispy herb seasoning', 'Roast garlic aioli', 'Pickled slaw', 'Toasted brioche bun']
  },
  {
    id: 'scran-beetroot-vegan-burger',
    name: 'Beetroot Vegan Burger',
    category: 'fast',
    description: 'Nutritious handcrafted spiced beetroot, black bean & quinoa patty topped with vegan garlic aioli, peppery baby spinach, and sliced beefsteak tomato on a vegan seeded bun.',
    price: 4.40,
    tags: ['Vegan', 'Vegetarian', 'Dairy-Free'],
    badge: 'Plant-Based',
    popular: false,
    is3dAvailable: false,
    mealDealEligible: true,
    nutrition: {
      calories: 475,
      protein: '19g',
      carbs: '64g',
      fat: '16g',
      allergens: ['Gluten (Wheat)', 'Sesame', 'Mustard']
    },
    ingredients: ['Spiced beetroot & quinoa patty', 'Vegan garlic aioli', 'Baby spinach leaves', 'Sliced plum tomato', 'Seeded vegan bun']
  },
  {
    id: 'scran-gyro-hero',
    name: 'Gyro Hero',
    category: 'fast',
    description: 'Warm fluffy Greek pitta pocket stuffed with seasoned grilled chicken or grilled Cypriot halloumi, fresh cooling tzatziki, diced plum tomato, red onion, and hot skin-on chips rolled inside.',
    price: 5.15,
    tags: ['Halal', 'Vegetarian'],
    badge: 'Student Fave',
    popular: true,
    is3dAvailable: false,
    mealDealEligible: true,
    nutrition: {
      calories: 630,
      protein: '34g',
      carbs: '66g',
      fat: '26g',
      allergens: ['Gluten (Wheat)', 'Milk', 'Mustard', 'Garlic']
    },
    ingredients: ['Fluffy Greek pita', 'Seasoned marinated chicken / halloumi', 'Authentic garlic tzatziki', 'Skin-on chips', 'Red onion & tomatoes']
  },
  {
    id: 'scran-dirty-fries',
    name: 'Dirty Fries / Nachos',
    category: 'fast',
    description: 'Golden seasoned skin-on fries or crunchy salted tortilla chips drenched in warm Monterey Jack cheese sauce, sliced pickled jalapeños, crispy smoked bacon crunch, and Scran smoky BBQ drizzle.',
    price: 4.95,
    tags: ['Vegetarian'],
    badge: 'Loaded',
    popular: true,
    is3dAvailable: false,
    mealDealEligible: false,
    nutrition: {
      calories: 680,
      protein: '14g',
      carbs: '74g',
      fat: '36g',
      allergens: ['Milk', 'Soya', 'Mustard']
    },
    ingredients: ['Skin-on potato fries / tortilla chips', 'Warm cheese sauce', 'Pickled jalapeños', 'Crisp bacon bits (or veggie bacon)', 'Smoky BBQ reduction']
  },
  {
    id: 'scran-chips-cheese',
    name: 'Chips & Cheese',
    category: 'fast',
    description: 'The definitive Scottish university campus comfort food: piping hot golden skin-on fries generously layered with mature Scottish cheddar that melts into pure comfort.',
    price: 3.20,
    tags: ['Vegetarian', 'Gluten-Free'],
    badge: 'Stirling Staple',
    popular: true,
    is3dAvailable: false,
    mealDealEligible: false,
    nutrition: {
      calories: 520,
      protein: '16g',
      carbs: '60g',
      fat: '24g',
      allergens: ['Milk']
    },
    ingredients: ['British Maris Piper skin-on fries', 'Melted mature Scottish cheddar cheese', 'Sea salt seasoning']
  },

  // --- SCRAN PIZZA (STONE-BAKED) ---
  {
    id: 'scran-pizza-margherita',
    name: 'Classic Margherita Pizza',
    category: 'pizza',
    description: 'Hand-stretched 24-hour slow fermented dough baked at 400°C on stone. San Marzano tomato sauce, 100% fior di latte mozzarella, fragrant fresh basil leaves, and extra virgin olive oil.',
    price: 6.75,
    options: [
      { label: '12" Full Stone-Baked', price: 6.75, calories: 840 },
      { label: '6" Personal Lunch Pizzetta', price: 4.00, calories: 430 }
    ],
    tags: ['Vegetarian', 'Halal'],
    badge: 'Hand-Stretched',
    popular: true,
    is3dAvailable: true,
    modelType: 'pizza',
    mealDealEligible: false,
    nutrition: {
      calories: 840,
      protein: '36g',
      carbs: '104g',
      fat: '30g',
      allergens: ['Gluten (Wheat)', 'Milk']
    },
    ingredients: ['Caputo 00 fermented dough', 'San Marzano DOP tomato sauce', 'Fior di latte mozzarella', 'Fresh basil', 'Cold-pressed extra virgin olive oil']
  },
  {
    id: 'scran-pizza-pepperoni',
    name: 'Stone-Baked Pepperoni Pizza',
    category: 'pizza',
    description: 'Hand-stretched pizza topped with rich tomato sauce, creamy fior di latte mozzarella, and generously covered in spicy Italian pepperoni cups that crisp and blister in the stone oven.',
    price: 7.25,
    options: [
      { label: '12" Full Stone-Baked', price: 7.25, calories: 990 },
      { label: '6" Personal Lunch Pizzetta', price: 4.20, calories: 510 }
    ],
    tags: [],
    badge: '#1 Campus Pizza',
    popular: true,
    is3dAvailable: true,
    modelType: 'pizza',
    mealDealEligible: false,
    nutrition: {
      calories: 990,
      protein: '44g',
      carbs: '106g',
      fat: '42g',
      allergens: ['Gluten (Wheat)', 'Milk', 'Sulphites']
    },
    ingredients: ['Hand-stretched artisan dough', 'Crushed plum tomato sauce', 'Mozzarella', 'Spicy pepperoni cups', 'Wild oregano']
  },
  {
    id: 'scran-pizza-plant-power',
    name: 'Plant Power Vegan Pizza',
    category: 'pizza',
    description: 'Stone-baked pizza topped with San Marzano sauce, creamy vegan mozzarella, fire-roasted sweet peppers, marinated artichoke hearts, red onion, and fresh wild rocket.',
    price: 7.25,
    options: [
      { label: '12" Full Stone-Baked', price: 7.25, calories: 720 },
      { label: '6" Personal Lunch Pizzetta', price: 4.20, calories: 370 }
    ],
    tags: ['Vegan', 'Vegetarian', 'Dairy-Free'],
    badge: 'Plant-Based',
    popular: false,
    is3dAvailable: false,
    modelType: 'pizza',
    mealDealEligible: false,
    nutrition: {
      calories: 720,
      protein: '18g',
      carbs: '108g',
      fat: '22g',
      allergens: ['Gluten (Wheat)']
    },
    ingredients: ['24-hour fermented dough', 'San Marzano sauce', 'Melty plant mozzarella', 'Charred bell peppers', 'Artichoke hearts', 'Wild rocket']
  },
  {
    id: 'scran-pizza-bbq-chicken',
    name: 'Boston BBQ Chicken Pizza',
    category: 'pizza',
    description: 'Deep, smoky barbecue base topped with slow-pulled roast chicken, sweet sliced red onions, melted mozzarella, and finished with fresh coriander and extra BBQ swirl.',
    price: 7.25,
    options: [
      { label: '12" Full Stone-Baked', price: 7.25, calories: 950 },
      { label: '6" Personal Lunch Pizzetta', price: 4.20, calories: 490 }
    ],
    tags: ['Halal'],
    popular: true,
    is3dAvailable: false,
    modelType: 'pizza',
    mealDealEligible: false,
    nutrition: {
      calories: 950,
      protein: '52g',
      carbs: '112g',
      fat: '32g',
      allergens: ['Gluten (Wheat)', 'Milk', 'Soya', 'Mustard']
    },
    ingredients: ['Stone-baked pizza dough', 'Sweet hickory BBQ sauce', 'Pulled roast chicken breast', 'Red onion slivers', 'Mozzarella', 'Fresh herbs']
  },
  {
    id: 'scran-pizza-meat-feast',
    name: 'Meat Feast Pizza',
    category: 'pizza',
    description: 'The heavyweight stone-oven special: spiced pepperoni slices, seasoned ground Scottish beef, Lorne sausage crumble, and crispy smoked bacon over herb tomato sauce and mozzarella.',
    price: 7.65,
    options: [
      { label: '12" Full Stone-Baked', price: 7.65, calories: 1080 },
      { label: '6" Personal Lunch Pizzetta', price: 4.75, calories: 560 }
    ],
    tags: [],
    badge: 'Ultimate',
    popular: true,
    is3dAvailable: false,
    modelType: 'pizza',
    mealDealEligible: false,
    nutrition: {
      calories: 1080,
      protein: '58g',
      carbs: '105g',
      fat: '48g',
      allergens: ['Gluten (Wheat)', 'Milk', 'Sulphites']
    },
    ingredients: ['Stone-baked crust', 'San Marzano sauce', 'Mozzarella', 'Pepperoni cups', 'Scottish minced beef', 'Lorne crumble', 'Smoked bacon']
  },

  // --- SCRAN DELI & GRAB ---
  {
    id: 'scran-jacket-potato',
    name: 'Baked Jacket Potato',
    category: 'deli',
    description: 'Crispy skin, piping hot fluffy oven-baked British jacket potato with creamy Scottish butter. Choose your favorite topping: Heinz baked beans, mature cheddar, or tuna sweetcorn mayo.',
    price: 3.85,
    tags: ['Vegetarian', 'Gluten-Free'],
    badge: 'Healthy & Warm',
    popular: false,
    is3dAvailable: false,
    mealDealEligible: false,
    nutrition: {
      calories: 420,
      protein: '16g',
      carbs: '68g',
      fat: '11g',
      allergens: ['Milk (with butter/cheese)', 'Fish (with tuna mayo)', 'Eggs (with tuna mayo)']
    },
    ingredients: ['Oven baked jacket potato', 'Scottish salted butter', 'Choice of baked beans, mature cheddar, or creamy tuna mayo']
  },
  {
    id: 'scran-salad-boxes',
    name: 'Campus Central Salad Box',
    category: 'deli',
    description: 'Fresh daily salad bar box made right in Floor G. Base of mixed crisp leaves, quinoa grain, cucumber, cherry tomatoes, and sweet pickled slaw, finished with choice of protein dressing.',
    price: 4.75,
    options: [
      { label: 'Regular Salad Box', price: 4.75, calories: 340 },
      { label: 'Large Salad Box (w/ Double Protein)', price: 5.40, calories: 520 }
    ],
    tags: ['Vegetarian', 'Vegan', 'Gluten-Free', 'Halal'],
    badge: 'Fresh Daily',
    popular: true,
    is3dAvailable: false,
    mealDealEligible: true,
    nutrition: {
      calories: 340,
      protein: '22g',
      carbs: '32g',
      fat: '12g',
      allergens: ['Mustard', 'Sesame']
    },
    ingredients: ['Mixed baby leaves', 'Cucumber & cherry tomatoes', 'Herb quinoa & couscous', 'House lemon tahini or balsamic dressing', 'Falafel or grilled chicken breast']
  },
  {
    id: 'scran-panini-sandwich',
    name: 'Fresh Sandwiches & Paninis',
    category: 'deli',
    description: 'Handcrafted daily on artisan sourdough and ciabatta breads. Choices include Chicken Pesto Mozzarella panini, Scottish Mature Cheddar & Honey Roast Ham toastie, or Falafel Hummus wrap.',
    price: 2.40,
    options: [
      { label: 'Chilled Artisan Sandwich', price: 2.40, calories: 360 },
      { label: 'Hot Pressed Panini / Toastie', price: 3.80, calories: 490 }
    ],
    tags: ['Halal', 'Vegetarian'],
    badge: 'Grab & Go',
    popular: true,
    is3dAvailable: false,
    mealDealEligible: true,
    nutrition: {
      calories: 440,
      protein: '26g',
      carbs: '48g',
      fat: '15g',
      allergens: ['Gluten (Wheat)', 'Milk', 'Mustard']
    },
    ingredients: ['Artisan ciabatta or seeded bloomer', 'Grilled pesto chicken / Scottish mature cheddar & ham', 'Sliced mozzarella', 'Fresh spinach']
  },

  // --- COFFEE & BAKES ---
  {
    id: 'scran-coffee-espresso',
    name: 'Espresso / Americano',
    category: 'coffee',
    description: 'Freshly ground Fairtrade Matthew Algie coffee beans roasted right here in Scotland. Double shot extraction with rich crema and dark cocoa notes. Bring your own cup to save 20p!',
    price: 2.40,
    tags: ['Vegan', 'Gluten-Free', 'Dairy-Free'],
    badge: '20p Mug Discount',
    popular: true,
    is3dAvailable: true,
    modelType: 'coffee',
    mealDealEligible: false,
    nutrition: {
      calories: 10,
      protein: '0.8g',
      carbs: '1.2g',
      fat: '0.1g',
      allergens: []
    },
    ingredients: ['Scottish roasted Fairtrade Matthew Algie Arabica & Robusta coffee beans', 'Filtered Scottish highland water']
  },
  {
    id: 'scran-coffee-latte',
    name: 'Latte / Cappuccino',
    category: 'coffee',
    description: 'Double espresso shots poured over velvety textured Scottish dairy milk or barista oat/soy milk, dusted with Dutch cocoa powder on cappuccino. Bring reusable cup for 20p off!',
    price: 2.75,
    tags: ['Vegetarian', 'Gluten-Free'],
    badge: 'Barista Craft',
    popular: true,
    is3dAvailable: true,
    modelType: 'coffee',
    mealDealEligible: false,
    nutrition: {
      calories: 145,
      protein: '8.5g',
      carbs: '12g',
      fat: '6g',
      allergens: ['Milk (or Oat/Soy if alternative selected)']
    },
    ingredients: ['Double espresso', 'Steamed whole Scottish dairy milk or Oatly barista milk', 'Belgian cocoa dusting']
  },
  {
    id: 'scran-hot-chocolate',
    name: 'Luxury Hot Chocolate',
    category: 'coffee',
    description: 'Decadent Dutch cocoa blend steamed with fresh Scottish milk until thick and velvety. Optional fluffy dairy whipped cream and mini marshmallows topping.',
    price: 2.75,
    tags: ['Vegetarian', 'Gluten-Free'],
    popular: false,
    is3dAvailable: false,
    mealDealEligible: false,
    nutrition: {
      calories: 230,
      protein: '9g',
      carbs: '28g',
      fat: '8.5g',
      allergens: ['Milk']
    },
    ingredients: ['Premium cocoa powder', 'Steamed whole milk', 'Vanilla essence', 'Mini marshmallows (optional)']
  },
  {
    id: 'scran-traybakes',
    name: 'Artisan Campus Traybakes',
    category: 'coffee',
    description: 'Baked fresh daily by local Scottish bakeries. Choose from Millionaire’s Shortbread with thick caramel, Raspberry Oat Flapjack, Belgian Chocolate Fudge Brownie, or Traditional Scottish Tablet.',
    price: 2.15,
    tags: ['Vegetarian'],
    badge: 'Sweet Treat',
    popular: true,
    is3dAvailable: false,
    mealDealEligible: false,
    nutrition: {
      calories: 360,
      protein: '4.5g',
      carbs: '44g',
      fat: '18g',
      allergens: ['Gluten (Wheat)', 'Milk', 'Eggs', 'Soya', 'May contain nuts']
    },
    ingredients: ['Scottish butter', 'Golden syrup', 'Rolled oats', 'Belgian dark chocolate', 'Condensed milk', 'Brown sugar']
  }
];

export const CATEGORIES = [
  { id: 'all', label: 'Full Menu', icon: 'Utensils' },
  { id: 'am', label: 'Scran AM', icon: 'Sunrise', subtitle: '08:00 - 11:30' },
  { id: 'fast', label: 'Fast Scran', icon: 'Flame', subtitle: 'Burgers & Loaded Fries' },
  { id: 'pizza', label: 'Stone-Baked Pizza', icon: 'Disc', subtitle: 'Hand-stretched 24h dough' },
  { id: 'deli', label: 'Scran Deli & Grab', icon: 'Sandwich', subtitle: 'Fresh salads & paninis' },
  { id: 'coffee', label: 'Coffee & Bakes', icon: 'Coffee', subtitle: 'Fairtrade Scottish roast' },
] as const;

export const MEAL_DEAL_COMBO_PRICE = 1.80; // Adding chips and drink to burger/deli
