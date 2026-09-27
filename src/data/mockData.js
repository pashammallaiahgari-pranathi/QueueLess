// Mock Data for QueueLess - St. Peter's Engineering College

export const CAMPUSES = [
  {
    id: 'spec-main',
    name: "St. Peter's Engineering College (Main Campus)",
    shortName: 'SPEC Main',
    location: 'Opp. Forest Academy, Maisammaguda, Medchal-Malkajgiri, Hyderabad',
    studentCount: '4,500+ Students',
    status: 'Active'
  },
  {
    id: 'spec-tech',
    name: 'SPEC Innovation & R&D Campus',
    shortName: 'SPEC Tech Annex',
    location: 'Block B Innovation Park, Hyderabad',
    studentCount: '1,200+ Students',
    status: 'Upcoming Integration'
  }
];

export const CAFETERIAS = [
  {
    id: 'caf-main',
    campusId: 'spec-main',
    name: 'Central Campus Food Court',
    location: 'Block A, Ground Floor (Near Admin)',
    counters: ['Counter 1: Meals & Biryani', 'Counter 2: Chinese & Fast Food', 'Counter 3: Express Beverage'],
    capacity: 350,
    currentCrowdPercentage: 68,
    crowdLevel: 'Moderate to High',
    crowdStatusColor: 'amber', // emerald, amber, red
    avgWaitTimeMinutes: 11,
    activeQueuers: 42,
    sensorActive: true,
    operatingHours: '08:00 AM - 06:30 PM',
    rating: 4.6,
    announcement: 'Fresh batch of Dum Biryani arrives at 12:45 PM for 3rd Year break!',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'caf-south',
    campusId: 'spec-main',
    name: 'South Indian Tiffin Express',
    location: 'Block C Courtyard (Near ECE & Mech Labs)',
    counters: ['Counter 1: Dosa & Vada Live Griddle', 'Counter 2: Poori & Meals'],
    capacity: 140,
    currentCrowdPercentage: 35,
    crowdLevel: 'Optimal (Low Wait)',
    crowdStatusColor: 'emerald',
    avgWaitTimeMinutes: 4,
    activeQueuers: 12,
    sensorActive: true,
    operatingHours: '07:30 AM - 05:00 PM',
    rating: 4.8,
    announcement: 'Ghee Podi Roast Special available until 3:00 PM.',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'caf-nescafe',
    campusId: 'spec-main',
    name: 'Nescafe & Chill Kiosk',
    location: 'Open Amphitheatre Garden',
    counters: ['Kiosk Counter: Shakes, Coffee & Quick Sandwiches'],
    capacity: 65,
    currentCrowdPercentage: 25,
    crowdLevel: 'Fast Lane',
    crowdStatusColor: 'emerald',
    avgWaitTimeMinutes: 3,
    activeQueuers: 6,
    sensorActive: true,
    operatingHours: '09:00 AM - 07:00 PM',
    rating: 4.7,
    announcement: 'Student Combo: Cold Frappe + Grilled Sandwich @ ₹99!',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'caf-juice',
    campusId: 'spec-main',
    name: 'Green Oasis Juice & Health Bar',
    location: 'Sports Complex Pavillion',
    counters: ['Counter: Cold Pressed Juices & Fresh Sprouts'],
    capacity: 50,
    currentCrowdPercentage: 15,
    crowdLevel: 'No Queue',
    crowdStatusColor: 'emerald',
    avgWaitTimeMinutes: 2,
    activeQueuers: 3,
    sensorActive: true,
    operatingHours: '08:30 AM - 06:00 PM',
    rating: 4.9,
    announcement: 'Fresh Watermelon Mint hydration bowl ready!',
    image: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=800&auto=format&fit=crop&q=80'
  }
];

export const HOURLY_CROWD_FORECAST = [
  { time: '08:30 AM', crowd: 18, waitTime: 2, historical: 22, note: 'Breakfast early bird' },
  { time: '09:30 AM', crowd: 32, waitTime: 5, historical: 35, note: 'Morning tea break' },
  { time: '10:30 AM', crowd: 24, waitTime: 3, historical: 28, note: 'Lecture transition' },
  { time: '11:30 AM', crowd: 45, waitTime: 8, historical: 48, note: 'Early pre-lunch crowd' },
  { time: '12:15 PM', crowd: 68, waitTime: 12, historical: 70, note: 'Break 1 (1st & 2nd Years)' },
  { time: '01:00 PM', crowd: 92, waitTime: 22, historical: 95, note: 'Super Peak (3rd & Final Years)' },
  { time: '01:45 PM', crowd: 60, waitTime: 10, historical: 65, note: 'Rush winding down' },
  { time: '02:30 PM', crowd: 28, waitTime: 4, historical: 30, note: 'Post-lunch quiet period' },
  { time: '03:30 PM', crowd: 40, waitTime: 6, historical: 42, note: 'Snack prep starts' },
  { time: '04:15 PM', crowd: 75, waitTime: 14, historical: 78, note: 'Evening bell & tea break' },
  { time: '05:30 PM', crowd: 22, waitTime: 3, historical: 25, note: 'Hostel/Bus departure' }
];

export const MENU_ITEMS = [
  {
    id: 'item-1',
    cafeteriaId: 'caf-main',
    name: 'Hyderabadi Chicken Dum Biryani',
    subtitle: 'SPEC Signature Recipe with Mirchi Ka Salan & Raita',
    category: 'Meals & Biryani',
    price: 130,
    calories: 580,
    prepTimeMins: 8,
    dietary: 'non-veg',
    rating: 4.9,
    reviewCount: 342,
    inStock: true,
    stockCount: 24,
    freshnessBadge: 'Fresh Dum Batch Ready',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80',
    tags: ['Best Seller', 'High Protein', 'Campus Favorite'],
    counter: 'Counter 1'
  },
  {
    id: 'item-2',
    cafeteriaId: 'caf-main',
    name: 'Paneer Butter Masala + 2 Tandoori Rotis',
    subtitle: 'Rich cashew gravy with charred whole wheat rotis',
    category: 'Meals & Biryani',
    price: 110,
    calories: 490,
    prepTimeMins: 10,
    dietary: 'veg',
    rating: 4.7,
    reviewCount: 198,
    inStock: true,
    stockCount: 18,
    freshnessBadge: 'Prepared on Order',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&auto=format&fit=crop&q=80',
    tags: ['Vegetarian', 'Comfort Meal'],
    counter: 'Counter 1'
  },
  {
    id: 'item-3',
    cafeteriaId: 'caf-south',
    name: 'Crispy Ghee Masala Dosa',
    subtitle: 'Golden roast with potato masala, coconut chutney & hot sambar',
    category: 'South Indian',
    price: 55,
    calories: 320,
    prepTimeMins: 5,
    dietary: 'veg',
    rating: 4.9,
    reviewCount: 420,
    inStock: true,
    stockCount: 45,
    freshnessBadge: 'Live Tawa Fresh',
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=800&auto=format&fit=crop&q=80',
    tags: ['Must Try', 'Live Kitchen'],
    counter: 'Counter 1'
  },
  {
    id: 'item-4',
    cafeteriaId: 'caf-south',
    name: 'Mysore Bonda Platter (4 Pcs)',
    subtitle: 'Crispy fluffy curd fritters served with spicy allam (ginger) chutney',
    category: 'South Indian',
    price: 40,
    calories: 280,
    prepTimeMins: 3,
    dietary: 'veg',
    rating: 4.8,
    reviewCount: 264,
    inStock: true,
    stockCount: 12,
    freshnessBadge: 'Piping Hot Batch',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80',
    tags: ['Student Favorite', 'Quick Bite'],
    counter: 'Counter 2'
  },
  {
    id: 'item-5',
    cafeteriaId: 'caf-main',
    name: 'Szechuan Veg Fried Rice + Manchurian',
    subtitle: 'Wok-tossed basmati with crispy vegetable manchurian balls',
    category: 'Meals & Biryani',
    price: 95,
    calories: 440,
    prepTimeMins: 7,
    dietary: 'veg',
    rating: 4.6,
    reviewCount: 156,
    inStock: true,
    stockCount: 15,
    freshnessBadge: 'Wok-Tossed 12m ago',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&auto=format&fit=crop&q=80',
    tags: ['Combo Deal', 'Spicy'],
    counter: 'Counter 2'
  },
  {
    id: 'item-6',
    cafeteriaId: 'caf-nescafe',
    name: 'Grilled Cheesy Club Sandwich',
    subtitle: 'Tri-layer whole wheat toast with melted mozzarella & fresh veggies',
    category: 'Quick Bites',
    price: 65,
    calories: 360,
    prepTimeMins: 6,
    dietary: 'veg',
    rating: 4.8,
    reviewCount: 285,
    inStock: true,
    stockCount: 30,
    freshnessBadge: 'Made Fresh to Order',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&auto=format&fit=crop&q=80',
    tags: ['Grab & Go', 'Cheesy'],
    counter: 'Counter 1'
  },
  {
    id: 'item-7',
    cafeteriaId: 'caf-nescafe',
    name: 'Signature Thick Cold Coffee + Ice Cream',
    subtitle: 'Rich Arabica blend topped with vanilla scoop & chocolate drizzle',
    category: 'Beverages',
    price: 50,
    calories: 240,
    prepTimeMins: 3,
    dietary: 'veg',
    rating: 4.9,
    reviewCount: 512,
    inStock: true,
    stockCount: 50,
    freshnessBadge: 'Chilled & Ready',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=800&auto=format&fit=crop&q=80',
    tags: ['Campus Legend', 'Chilled'],
    counter: 'Counter 1'
  },
  {
    id: 'item-8',
    cafeteriaId: 'caf-juice',
    name: 'Sprout & Boiled Chana Protein Bowl',
    subtitle: 'Steamed green gram, chickpeas, pomegranate, chaat seasoning & lemon',
    category: 'Healthy',
    price: 45,
    calories: 190,
    prepTimeMins: 2,
    dietary: 'veg',
    rating: 4.7,
    reviewCount: 88,
    inStock: true,
    stockCount: 16,
    freshnessBadge: 'Farm Fresh Batch',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80',
    tags: ['Zero Oil', 'High Protein', 'Post-Gym'],
    counter: 'Counter 1'
  },
  {
    id: 'item-9',
    cafeteriaId: 'caf-juice',
    name: 'Watermelon Mint Hydration Cooler',
    subtitle: '100% pure cold-pressed watermelon with fresh garden mint & rock salt',
    category: 'Beverages',
    price: 40,
    calories: 95,
    prepTimeMins: 2,
    dietary: 'veg',
    rating: 4.9,
    reviewCount: 142,
    inStock: true,
    stockCount: 25,
    freshnessBadge: 'Pure Cold Pressed',
    image: 'https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?w=800&auto=format&fit=crop&q=80',
    tags: ['Zero Added Sugar', 'Cooler'],
    counter: 'Counter 1'
  },
  {
    id: 'item-10',
    cafeteriaId: 'caf-main',
    name: 'Crispy Samosa Platter (2 Pcs)',
    subtitle: 'Spiced potato & green pea filling with tangy tamarind & mint chutney',
    category: 'Quick Bites',
    price: 30,
    calories: 310,
    prepTimeMins: 2,
    dietary: 'veg',
    rating: 4.5,
    reviewCount: 390,
    inStock: true,
    stockCount: 8, // Low stock demo!
    freshnessBadge: 'Hot out of Kadai (8 left)',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80',
    tags: ['Evening Rush Hit', 'Pocket Friendly'],
    counter: 'Counter 2'
  },
  {
    id: 'item-11',
    cafeteriaId: 'caf-main',
    name: 'Homestyle Rajma Masala + Jeera Rice Bowl',
    subtitle: 'Slow-cooked red kidney beans in spiced gravy with tempered rice',
    category: 'Meals & Biryani',
    price: 85,
    calories: 420,
    prepTimeMins: 5,
    dietary: 'veg',
    rating: 4.7,
    reviewCount: 177,
    inStock: true,
    stockCount: 20,
    freshnessBadge: 'Hot Stew Ready',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop&q=80',
    tags: ['Homestyle', 'Pure Ghee Rice'],
    counter: 'Counter 1'
  },
  {
    id: 'item-12',
    cafeteriaId: 'caf-south',
    name: 'Steamed Idli Platter with Sambar & Podi',
    subtitle: '3 cloud-soft rice cakes drenched in piping hot drumstick sambar',
    category: 'South Indian',
    price: 40,
    calories: 210,
    prepTimeMins: 2,
    dietary: 'veg',
    rating: 4.8,
    reviewCount: 310,
    inStock: true,
    stockCount: 35,
    freshnessBadge: 'Steamed 5m ago',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=80',
    tags: ['Light & Healthy', 'Zero Oil'],
    counter: 'Counter 1'
  }
];

export const INITIAL_ORDERS = [
  {
    id: 'ORD-9842',
    tokenId: 'SPEC-702',
    studentName: 'Karthik Varma',
    studentRoll: '22SPEC0451',
    cafeteriaId: 'caf-main',
    cafeteriaName: 'Central Campus Food Court',
    counter: 'Counter 1',
    items: [
      { id: 'item-1', name: 'Hyderabadi Chicken Dum Biryani', quantity: 1, price: 130 },
      { id: 'item-7', name: 'Signature Thick Cold Coffee', quantity: 1, price: 50 }
    ],
    totalAmount: 180,
    pickupSlot: 'Instant (Pick up in 8m)',
    dietaryNotes: 'Extra raita please',
    orderTime: '12:35 PM',
    estimatedReadyTime: '12:43 PM',
    status: 'READY_FOR_PICKUP', // PLACED -> PREPARING -> READY_FOR_PICKUP -> COLLECTED
    tokenQrCode: 'SPEC-TOKEN-702-HASH-8910',
    isNotified: false
  },
  {
    id: 'ORD-9843',
    tokenId: 'SPEC-715',
    studentName: 'Ananya Reddy',
    studentRoll: '23SPEC0892',
    cafeteriaId: 'caf-south',
    cafeteriaName: 'South Indian Tiffin Express',
    counter: 'Counter 1',
    items: [
      { id: 'item-3', name: 'Crispy Ghee Masala Dosa', quantity: 1, price: 55 }
    ],
    totalAmount: 55,
    pickupSlot: '12:50 PM Break',
    dietaryNotes: 'Extra spicy chutney',
    orderTime: '12:38 PM',
    estimatedReadyTime: '12:48 PM',
    status: 'PREPARING',
    tokenQrCode: 'SPEC-TOKEN-715-HASH-3421',
    isNotified: false
  },
  {
    id: 'ORD-9844',
    tokenId: 'SPEC-729',
    studentName: 'Mohammed Zeeshan',
    studentRoll: '21SPEC0112',
    cafeteriaId: 'caf-main',
    cafeteriaName: 'Central Campus Food Court',
    counter: 'Counter 2',
    items: [
      { id: 'item-5', name: 'Szechuan Veg Fried Rice + Manchurian', quantity: 1, price: 95 }
    ],
    totalAmount: 95,
    pickupSlot: '01:00 PM Break',
    dietaryNotes: 'Less oil',
    orderTime: '12:42 PM',
    estimatedReadyTime: '12:55 PM',
    status: 'PLACED',
    tokenQrCode: 'SPEC-TOKEN-729-HASH-9981',
    isNotified: false
  }
];

export const INITIAL_USER_PROFILE = {
  name: 'Sneha Patel',
  rollNumber: '22SPEC0744',
  department: 'Computer Science & Engineering (AI & ML)',
  year: '3rd Year - B.Tech',
  campus: "St. Peter's Engineering College (Main Campus)",
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  xp: 520,
  xpToNextLevel: 750,
  level: 4,
  levelTitle: 'Queue Buster Elite',
  streakDays: 6,
  totalSavedMinutes: 142,
  mealsPrebooked: 18,
  foodWastageScore: '98% Finished Clean',
  badges: [
    { id: 'b1', name: 'Punctual Picker', desc: 'Picked up 10 orders within 2 mins of Ready ping', icon: '⚡', unlocked: true },
    { id: 'b2', name: 'Off-Peak Champion', desc: 'Pre-ordered 5 times during low congestion hours', icon: '🕒', unlocked: true },
    { id: 'b3', name: 'Zero-Waste Hero', desc: 'Completed meal rating confirmation 10 times', icon: '🌱', unlocked: true },
    { id: 'b4', name: 'Campus Connoisseur', desc: 'Ordered from all 4 SPEC food counters', icon: '👑', unlocked: true },
    { id: 'b5', name: 'Queue Master L5', desc: 'Reach 750 XP to unlock VIP priority counter pass', icon: '🚀', unlocked: false }
  ]
};

export const LEADERBOARD_DATA = [
  { rank: 1, name: 'Vikram Sai', roll: '21SPEC0231', dept: 'ECE', xp: 980, waitSaved: '210 mins', badge: 'Campus Legend' },
  { rank: 2, name: 'Sneha Patel (You)', roll: '22SPEC0744', dept: 'CSE-AIML', xp: 520, waitSaved: '142 mins', badge: 'Queue Buster Elite' },
  { rank: 3, name: 'Rohit Kulkarni', roll: '22SPEC1102', dept: 'Mech', xp: 490, waitSaved: '128 mins', badge: 'Eco Foodie' },
  { rank: 4, name: 'Divya Sree', roll: '23SPEC0405', dept: 'IT', xp: 460, waitSaved: '115 mins', badge: 'Speedy Picker' },
  { rank: 5, name: 'Harsha Vardhan', roll: '21SPEC0988', dept: 'Civil', xp: 410, waitSaved: '96 mins', badge: 'Smart Snacker' }
];

export const INSTITUTIONAL_ANALYTICS = {
  kpis: {
    dailyFootfall: 3640,
    peakQueueReduction: '84%',
    avgWaitTimeBefore: '26 mins',
    avgWaitTimeNow: '4.2 mins',
    foodWastageReductionKg: '42.8 kg / day',
    studentSatisfactionIndex: 4.8,
    activeVendors: 4,
    orderFulfillmentSLA: '98.2%'
  },
  hourlyComparison: [
    { time: '08:00 AM', traditionalWait: 14, queueLessWait: 3, studentCount: 210 },
    { time: '09:30 AM', traditionalWait: 18, queueLessWait: 4, studentCount: 430 },
    { time: '11:00 AM', traditionalWait: 15, queueLessWait: 3, studentCount: 310 },
    { time: '12:15 PM', traditionalWait: 29, queueLessWait: 5, studentCount: 780 },
    { time: '01:00 PM', traditionalWait: 34, queueLessWait: 6, studentCount: 920 },
    { time: '01:45 PM', traditionalWait: 22, queueLessWait: 4, studentCount: 540 },
    { time: '03:30 PM', traditionalWait: 16, queueLessWait: 3, studentCount: 340 },
    { time: '04:15 PM', traditionalWait: 24, queueLessWait: 5, studentCount: 610 }
  ],
  foodWastageWeekly: [
    { day: 'Mon', wasteBeforeKg: 62, wasteWithQueueLessKg: 18, savedKg: 44 },
    { day: 'Tue', wasteBeforeKg: 58, wasteWithQueueLessKg: 15, savedKg: 43 },
    { day: 'Wed', wasteBeforeKg: 65, wasteWithQueueLessKg: 17, savedKg: 48 },
    { day: 'Thu', wasteBeforeKg: 60, wasteWithQueueLessKg: 14, savedKg: 46 },
    { day: 'Fri', wasteBeforeKg: 70, wasteWithQueueLessKg: 19, savedKg: 51 },
    { day: 'Sat', wasteBeforeKg: 45, wasteWithQueueLessKg: 12, savedKg: 33 }
  ],
  vendorPerformance: [
    { vendor: 'Central Food Court', orders: 1280, revenue: 98400, onTimeRate: '97.5%', avgRating: 4.6 },
    { vendor: 'South Indian Tiffin', orders: 840, revenue: 42000, onTimeRate: '98.8%', avgRating: 4.8 },
    { vendor: 'Nescafe & Chill', orders: 690, revenue: 38200, onTimeRate: '99.1%', avgRating: 4.7 },
    { vendor: 'Green Oasis Juice', orders: 380, revenue: 16400, onTimeRate: '99.4%', avgRating: 4.9 }
  ],
  categoryShare: [
    { name: 'Biryani & Combos', value: 38, fill: '#f97316' },
    { name: 'South Tiffin', value: 26, fill: '#10b981' },
    { name: 'Cold Shakes & Coffee', value: 18, fill: '#3b82f6' },
    { name: 'Healthy & Fruit Bowls', value: 10, fill: '#8b5cf6' },
    { name: 'Evening Snacks', value: 8, fill: '#f59e0b' }
  ]
};

export const RECENT_FEEDBACK = [
  {
    id: 'fb-1',
    studentName: 'Ravi Teja',
    dept: 'CSE',
    cafeteria: 'Central Food Court',
    item: 'Chicken Dum Biryani',
    rating: 5,
    tag: '⚡ 2-min pickup',
    comment: 'The digital token alert buzzed right as I entered Block A! Collected without standing in the hot queue.',
    time: '25m ago'
  },
  {
    id: 'fb-2',
    studentName: 'Pooja Reddy',
    dept: 'ECE',
    cafeteria: 'South Indian Tiffin',
    item: 'Crispy Ghee Masala Dosa',
    rating: 5,
    tag: '🔥 Fresh & Crispy',
    comment: 'Dosa was prepared right on the tawa when my token reached "Preparing". So hot and tasty.',
    time: '45m ago'
  },
  {
    id: 'fb-3',
    studentName: 'Sanjay Kumar',
    dept: 'IT',
    cafeteria: 'Nescafe Kiosk',
    item: 'Cold Coffee + Sandwich',
    rating: 4,
    tag: '🕒 Saved break time',
    comment: 'Booked from 3rd floor lab during project review. Picked up in between classes with zero hassle.',
    time: '1h ago'
  }
];
