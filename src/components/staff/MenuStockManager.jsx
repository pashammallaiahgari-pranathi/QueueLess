import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Package, 
  Plus, 
  Minus, 
  Flame, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Sparkles,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

export const MenuStockManager = () => {
  const { menuItems, updateItemStock, selectedCafeteria } = useApp();

  const cafeteriaItems = menuItems.filter(
    item => item.cafeteriaId === selectedCafeteria.id
  );

  const [editingItemId, setEditingItemId] = useState(null);
  const [freshnessInput, setFreshnessInput] = useState('');

  const handleToggleStock = (item) => {
    const nextInStock = !item.inStock;
    const nextCount = nextInStock ? (item.stockCount > 0 ? item.stockCount : 15) : 0;
    updateItemStock(item.id, nextCount, nextInStock);
  };

  const handleAdjustCount = (item, delta) => {
    const nextCount = Math.max(0, item.stockCount + delta);
    updateItemStock(item.id, nextCount, nextCount > 0);
  };

  const handleSaveFreshness = (item) => {
    if (freshnessInput.trim()) {
      updateItemStock(item.id, item.stockCount, item.inStock, freshnessInput.trim());
      setEditingItemId(null);
      setFreshnessInput('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Package className="w-5 h-5 text-orange-400" />
            <span>Live Inventory & Kitchen Freshness Status</span>
          </h3>
          <p className="text-xs text-slate-400">
            {selectedCafeteria.name} • 1-click 86/Sold-Out controls prevent student disappointment & over-preparation.
          </p>
        </div>

        <div className="text-xs text-slate-400 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Syncs live with Student Menu</span>
        </div>
      </div>

      {/* Grid of Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cafeteriaItems.map(item => {
          const isSoldOut = !item.inStock || item.stockCount === 0;
          const isLow = item.inStock && item.stockCount <= 10;
          const isEditingThis = editingItemId === item.id;

          return (
            <div
              key={item.id}
              className={`glass-card rounded-2xl p-4 border transition-all space-y-3 ${
                isSoldOut
                  ? 'border-rose-900/60 bg-slate-950/60 opacity-80'
                  : 'border-slate-800 hover:border-orange-500/40'
              }`}
            >
              {/* Item Top Info */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-xl object-cover bg-slate-800 shrink-0"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-100">{item.name}</h4>
                    <div className="text-[11px] font-mono text-slate-400">
                      ₹{item.price} • {item.counter}
                    </div>
                  </div>
                </div>

                {/* In-Stock Toggle Button */}
                <button
                  onClick={() => handleToggleStock(item)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                    item.inStock
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  }`}
                >
                  {item.inStock ? 'IN STOCK' : 'SOLD OUT'}
                </button>
              </div>

              {/* Quantity Adjuster */}
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
                <span className="text-slate-400 font-medium">Batch Stock:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAdjustCount(item, -1)}
                    disabled={item.stockCount <= 0}
                    className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center font-bold disabled:opacity-40"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-8 text-center font-mono font-bold text-white text-sm">
                    {item.stockCount}
                  </span>
                  <button
                    onClick={() => handleAdjustCount(item, 5)}
                    className="w-7 h-7 rounded-lg bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center font-bold"
                    title="Add +5 to stock"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Freshness Badge / Custom Notice */}
              <div className="pt-1">
                {isEditingThis ? (
                  <div className="flex gap-1.5">
                    <input
                      type="text"
                      placeholder="e.g. Fresh batch ready in 6m"
                      value={freshnessInput}
                      onChange={(e) => setFreshnessInput(e.target.value)}
                      className="flex-1 px-2.5 py-1 rounded-lg bg-slate-900 border border-orange-500 text-xs text-slate-200 placeholder-slate-500 focus:outline-none"
                    />
                    <button
                      onClick={() => handleSaveFreshness(item)}
                      className="px-2.5 py-1 rounded-lg bg-orange-500 text-white text-xs font-bold"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingItemId(null)}
                      className="px-2 py-1 rounded-lg bg-slate-800 text-slate-400 text-xs"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Flame className="w-3 h-3 text-orange-400" />
                      <span className="truncate max-w-[170px] text-slate-300">
                        {item.freshnessBadge || 'No freshness tag'}
                      </span>
                    </span>
                    <button
                      onClick={() => {
                        setEditingItemId(item.id);
                        setFreshnessInput(item.freshnessBadge || '');
                      }}
                      className="text-orange-400 hover:text-orange-300 font-semibold"
                    >
                      Edit Tag
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
