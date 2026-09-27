import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  Flame, 
  Clock, 
  Sparkles, 
  Plus, 
  Minus, 
  Star, 
  AlertCircle, 
  Check, 
  Leaf, 
  Drumstick,
  ShoppingBag,
  SlidersHorizontal,
  Sun,
  Sunrise,
  Coffee,
  Utensils
} from 'lucide-react';

export const MenuCatalog = () => {
  const { 
    menuItems, 
    selectedCafeteriaId, 
    cart, 
    addToCart, 
    updateCartQty,
    setIsCartOpen,
    activeFoodTiming,
    setActiveFoodTiming,
    foodTimings
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [dietaryFilter, setDietaryFilter] = useState('all'); // 'all' | 'veg' | 'non-veg'
  const [sortBy, setSortBy] = useState('popular'); // 'popular' | 'fast' | 'price'

  // Categories list
  const categories = ['All', 'Meals & Biryani', 'South Indian', 'Quick Bites', 'Beverages'];

  // Filter items
  const filteredItems = menuItems.filter(item => {
    // Cafeteria match
    const matchCafeteria = item.cafeteriaId === selectedCafeteriaId;
    if (!matchCafeteria) return false;

    // Food timing filter
    if (activeFoodTiming !== 'all' && item.timeSlot !== activeFoodTiming) {
      return false;
    }

    // Search query (English or Telugu)
    const matchQuery = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.teluguName && item.teluguName.includes(searchQuery)) ||
      item.subtitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchQuery) return false;

    // Category filter
    if (selectedCategory !== 'All' && item.category !== selectedCategory) {
      return false;
    }

    // Dietary filter
    if (dietaryFilter === 'veg' && item.dietary !== 'veg') return false;
    if (dietaryFilter === 'non-veg' && item.dietary !== 'non-veg') return false;

    return true;
  }).sort((a, b) => {
    if (sortBy === 'fast') return a.prepTimeMins - b.prepTimeMins;
    if (sortBy === 'price') return a.price - b.price;
    return b.rating - a.rating;
  });

  return (
    <div className="w-full space-y-6">
      {/* Food Timings Filter Bar */}
      <div className="p-3 sm:p-4 rounded-2xl glass-card border border-orange-500/20 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-black text-white flex items-center gap-1.5">
              <span>Campus Food Timings & Service Slots</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            </span>
          </div>
          <span className="text-[11px] text-slate-400">
            Select a meal period to see currently prepared Telugu specials
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button
            type="button"
            onClick={() => setActiveFoodTiming('all')}
            className={`p-2.5 rounded-xl text-left border transition-all ${
              activeFoodTiming === 'all'
                ? 'bg-orange-500 text-white font-bold border-orange-400 shadow-md shadow-orange-500/20'
                : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-1.5 text-xs font-bold">
              <span>🍽️ All-Day Menu</span>
            </div>
            <div className={`text-[10px] mt-0.5 ${activeFoodTiming === 'all' ? 'text-white/80' : 'text-slate-500'}`}>
              Full cafeteria catalog
            </div>
          </button>

          <button
            type="button"
            onClick={() => setActiveFoodTiming('breakfast')}
            className={`p-2.5 rounded-xl text-left border transition-all ${
              activeFoodTiming === 'breakfast'
                ? 'bg-orange-500 text-white font-bold border-orange-400 shadow-md shadow-orange-500/20'
                : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-1.5 text-xs font-bold">
              <Sunrise className="w-3.5 h-3.5 text-amber-300" />
              <span>Udhayam Tiffins</span>
            </div>
            <div className={`text-[10px] mt-0.5 ${activeFoodTiming === 'breakfast' ? 'text-white/80' : 'text-slate-500'}`}>
              07:30 AM - 11:30 AM
            </div>
          </button>

          <button
            type="button"
            onClick={() => setActiveFoodTiming('lunch')}
            className={`p-2.5 rounded-xl text-left border transition-all ${
              activeFoodTiming === 'lunch'
                ? 'bg-orange-500 text-white font-bold border-orange-400 shadow-md shadow-orange-500/20'
                : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-1.5 text-xs font-bold">
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>Madhyahnam Biryani</span>
            </div>
            <div className={`text-[10px] mt-0.5 ${activeFoodTiming === 'lunch' ? 'text-white/80' : 'text-slate-500'}`}>
              12:00 PM - 03:00 PM
            </div>
          </button>

          <button
            type="button"
            onClick={() => setActiveFoodTiming('snacks')}
            className={`p-2.5 rounded-xl text-left border transition-all ${
              activeFoodTiming === 'snacks'
                ? 'bg-orange-500 text-white font-bold border-orange-400 shadow-md shadow-orange-500/20'
                : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-1.5 text-xs font-bold">
              <Coffee className="w-3.5 h-3.5 text-orange-300" />
              <span>Sayantram Snacks</span>
            </div>
            <div className={`text-[10px] mt-0.5 ${activeFoodTiming === 'snacks' ? 'text-white/80' : 'text-slate-500'}`}>
              03:30 PM - 06:30 PM
            </div>
          </button>
        </div>
      </div>

      {/* Header and Controls */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
              <span>Authentic Telugu & Hyderabadi Menu</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 font-medium">
                Live Kitchen Sync
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Live batch freshness indicators, prep time estimation, and direct digital token pickup.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search biryani, idli, chai, dosa..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
            />
          </div>
        </div>

        {/* Filter Pills: Category, Dietary, and Sort */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          {/* Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Dietary & Sorting Controls */}
          <div className="flex items-center gap-2">
            {/* Dietary */}
            <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setDietaryFilter('all')}
                className={`px-2 py-1 rounded-lg transition-all ${
                  dietaryFilter === 'all' ? 'bg-slate-800 text-white' : 'text-slate-400'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setDietaryFilter('veg')}
                className={`px-2 py-1 rounded-lg flex items-center gap-1 transition-all ${
                  dietaryFilter === 'veg' ? 'bg-emerald-600/30 text-emerald-300' : 'text-slate-400'
                }`}
              >
                <Leaf className="w-3 h-3 text-emerald-400" />
                <span>Veg</span>
              </button>
              <button
                onClick={() => setDietaryFilter('non-veg')}
                className={`px-2 py-1 rounded-lg flex items-center gap-1 transition-all ${
                  dietaryFilter === 'non-veg' ? 'bg-rose-600/30 text-rose-300' : 'text-slate-400'
                }`}
              >
                <Drumstick className="w-3 h-3 text-rose-400" />
                <span>Non-Veg</span>
              </button>
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-900 border border-slate-800 text-slate-300 text-xs rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-orange-500"
            >
              <option value="popular">⭐ Most Popular</option>
              <option value="fast">⚡ Quickest Prep</option>
              <option value="price">💰 Lowest Price</option>
            </select>
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800">
          <p className="text-slate-400 text-sm">No items found matching your filters in this cafeteria.</p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setDietaryFilter('all'); setActiveFoodTiming('all'); }}
            className="mt-3 px-4 py-1.5 rounded-lg bg-slate-800 text-xs text-orange-400 font-semibold hover:bg-slate-700"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map(item => {
            const cartItem = cart.find(c => c.item.id === item.id);
            const quantity = cartItem ? cartItem.quantity : 0;
            const isLowStock = item.inStock && item.stockCount <= 10;
            const isSoldOut = !item.inStock || item.stockCount === 0;

            return (
              <div
                key={item.id}
                className="group glass-card rounded-2xl overflow-hidden border border-slate-800/80 hover:border-orange-500/40 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-orange-500/5"
              >
                <div>
                  {/* Image & Overlay Badges */}
                  <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                    {/* Freshness Badge */}
                    {item.freshnessBadge && (
                      <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full glass-panel text-[10px] font-bold text-orange-300 border border-orange-500/30 flex items-center gap-1 shadow-md">
                        <Flame className="w-3 h-3 text-orange-400" />
                        <span>{item.freshnessBadge}</span>
                      </div>
                    )}

                    {/* Dietary Icon */}
                    <div className="absolute top-2.5 right-2.5 p-1 rounded-md glass-panel">
                      {item.dietary === 'veg' ? (
                        <div className="w-4 h-4 border border-emerald-500 flex items-center justify-center rounded-sm bg-emerald-950/60">
                          <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        </div>
                      ) : (
                        <div className="w-4 h-4 border border-rose-500 flex items-center justify-center rounded-sm bg-rose-950/60">
                          <div className="w-2 h-2 rounded-full bg-rose-500" />
                        </div>
                      )}
                    </div>

                    {/* Counter location */}
                    <div className="absolute bottom-2.5 left-2.5 text-[10px] text-slate-300 font-semibold bg-slate-900/80 px-2 py-0.5 rounded backdrop-blur">
                      {item.counter}
                    </div>

                    {/* Prep time & Calories */}
                    <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 text-[10px] font-medium text-slate-300">
                      <span className="bg-slate-900/80 px-1.5 py-0.5 rounded flex items-center gap-1 backdrop-blur">
                        <Clock className="w-3 h-3 text-amber-400" />
                        {item.prepTimeMins}m
                      </span>
                      <span className="bg-slate-900/80 px-1.5 py-0.5 rounded backdrop-blur">
                        {item.calories} kcal
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-slate-100 text-sm leading-snug group-hover:text-orange-400 transition-colors">
                          {item.name}
                        </h3>
                        {item.teluguName && (
                          <div className="text-[11px] font-semibold text-orange-400/90 font-sans mt-0.5">
                            {item.teluguName}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-amber-400 font-bold shrink-0">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{item.rating}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {item.subtitle}
                    </p>

                    {/* Tags */}
                    {item.tags && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {item.tags.map((tag, i) => (
                          <span key={i} className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer: Price & Add / Stepper */}
                <div className="p-4 pt-0">
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <div>
                      <div className="text-lg font-black text-white font-mono">
                        ₹{item.price}
                      </div>
                      <div className="text-[10px]">
                        {isSoldOut ? (
                          <span className="text-rose-400 font-semibold">Sold Out</span>
                        ) : isLowStock ? (
                          <span className="text-amber-400 font-semibold animate-pulse">
                            Only {item.stockCount} left!
                          </span>
                        ) : (
                          <span className="text-emerald-400 font-medium">
                            In Stock ({item.stockCount})
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    {isSoldOut ? (
                      <button
                        disabled
                        className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-500 text-xs font-semibold cursor-not-allowed"
                      >
                        Unavailable
                      </button>
                    ) : quantity > 0 ? (
                      <div className="flex items-center gap-2 bg-orange-500/20 border border-orange-500/40 rounded-xl p-1">
                        <button
                          onClick={() => updateCartQty(item.id, quantity - 1)}
                          className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center font-bold text-sm transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono font-bold text-orange-400 text-sm px-1">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateCartQty(item.id, quantity + 1)}
                          className="w-7 h-7 rounded-lg bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center font-bold text-sm transition-colors shadow-sm"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(item)}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-orange-500 hover:bg-orange-600 active:scale-95 text-white text-xs font-bold shadow-md shadow-orange-500/20 transition-all"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Pre-book</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
