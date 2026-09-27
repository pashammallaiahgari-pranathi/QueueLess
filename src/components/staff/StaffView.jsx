import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StaffKDSView } from './StaffKDSView';
import { MenuStockManager } from './MenuStockManager';
import { CrowdControlPanel } from './CrowdControlPanel';
import { 
  ChefHat, 
  Package, 
  Radio, 
  MapPin, 
  Flame, 
  Users 
} from 'lucide-react';

export const StaffView = () => {
  const { selectedCafeteria, cafeterias, setSelectedCafeteriaId } = useApp();
  const [activeTab, setActiveTab] = useState('kds'); // 'kds' | 'stock' | 'crowd'

  return (
    <div className="space-y-6 pb-16">
      {/* Staff Bar & Cafeteria Selection */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3 gap-3">
        {/* Sub Tabs */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('kds')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'kds'
                ? 'bg-amber-500 text-slate-950 font-extrabold shadow-lg shadow-amber-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <ChefHat className="w-4 h-4" />
            <span>Kitchen Display (KDS)</span>
          </button>

          <button
            onClick={() => setActiveTab('stock')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'stock'
                ? 'bg-amber-500 text-slate-950 font-extrabold shadow-lg shadow-amber-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Inventory & Stock (86'd)</span>
          </button>

          <button
            onClick={() => setActiveTab('crowd')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'crowd'
                ? 'bg-amber-500 text-slate-950 font-extrabold shadow-lg shadow-amber-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Radio className="w-4 h-4" />
            <span>Crowd & Notice Broadcast</span>
          </button>
        </div>

        {/* Cafeteria Switcher Pill */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Managing:</span>
          <select
            value={selectedCafeteria.id}
            onChange={(e) => setSelectedCafeteriaId(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-xs font-semibold text-amber-400 rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-amber-500"
          >
            {cafeterias.map(c => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tab Panels */}
      {activeTab === 'kds' && (
        <div className="animate-in fade-in duration-150">
          <StaffKDSView />
        </div>
      )}

      {activeTab === 'stock' && (
        <div className="animate-in fade-in duration-150">
          <MenuStockManager />
        </div>
      )}

      {activeTab === 'crowd' && (
        <div className="animate-in fade-in duration-150">
          <CrowdControlPanel />
        </div>
      )}
    </div>
  );
};
