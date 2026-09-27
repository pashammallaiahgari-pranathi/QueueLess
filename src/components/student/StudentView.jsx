import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CrowdIntelligenceCard } from './CrowdIntelligenceCard';
import { MenuCatalog } from './MenuCatalog';
import { StudentTokensView } from './StudentTokensView';
import { GamificationRewards } from './GamificationRewards';
import { FeedbackModal } from './FeedbackModal';
import { 
  UtensilsCrossed, 
  QrCode, 
  Trophy, 
  TrendingUp, 
  Clock, 
  Sparkles,
  MapPin
} from 'lucide-react';

export const StudentView = () => {
  const { orders, selectedCafeteria } = useApp();
  const [activeTab, setActiveTab] = useState('menu'); // 'menu' | 'tokens' | 'rewards'
  const [feedbackOrder, setFeedbackOrder] = useState(null);

  const activeTokensCount = orders.filter(o => o.status !== 'COLLECTED').length;

  return (
    <div className="space-y-6 pb-16">
      {/* Student Sub-Navigation Tabs */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('menu')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'menu'
                ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <UtensilsCrossed className="w-4 h-4" />
            <span>Cafeteria Crowd & Smart Menu</span>
          </button>

          <button
            onClick={() => setActiveTab('tokens')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all relative ${
              activeTab === 'tokens'
                ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span>Digital Tokens</span>
            {activeTokensCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full bg-emerald-500 text-white font-mono text-[10px] font-extrabold animate-pulse">
                {activeTokensCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('rewards')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'rewards'
                ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Campus Rewards & XP</span>
          </button>
        </div>

        {/* Location pill */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800">
          <MapPin className="w-3.5 h-3.5 text-orange-400" />
          <span>Ordering for: <strong className="text-slate-200">{selectedCafeteria.name}</strong></span>
        </div>
      </div>

      {/* Tab Panels */}
      {activeTab === 'menu' && (
        <div className="space-y-8 animate-in fade-in duration-150">
          {/* Real-time Crowd & AI Demand Card */}
          <CrowdIntelligenceCard />

          {/* Smart Menu Catalog */}
          <MenuCatalog />
        </div>
      )}

      {activeTab === 'tokens' && (
        <div className="animate-in fade-in duration-150">
          <StudentTokensView onOpenFeedback={(order) => setFeedbackOrder(order)} />
        </div>
      )}

      {activeTab === 'rewards' && (
        <div className="animate-in fade-in duration-150">
          <GamificationRewards />
        </div>
      )}

      {/* Feedback Modal */}
      {feedbackOrder && (
        <FeedbackModal
          order={feedbackOrder}
          onClose={() => setFeedbackOrder(null)}
        />
      )}
    </div>
  );
};
