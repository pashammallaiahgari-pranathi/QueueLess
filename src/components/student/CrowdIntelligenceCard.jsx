import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  Clock, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles, 
  Radio, 
  ChevronRight,
  Info,
  Calendar,
  Flame,
  ArrowRight
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ReferenceLine 
} from 'recharts';
import { HOURLY_CROWD_FORECAST } from '../../data/mockData';

export const CrowdIntelligenceCard = () => {
  const { selectedCafeteria, cafeterias, setSelectedCafeteriaId } = useApp();
  const [activeTab, setActiveTab] = useState('forecast'); // 'forecast' | 'alternatives'

  const currentPct = selectedCafeteria.currentCrowdPercentage;
  const isHigh = currentPct >= 75;
  const isModerate = currentPct >= 45 && currentPct < 75;

  // Custom Recharts Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="glass-panel p-2.5 rounded-lg border border-slate-700 shadow-xl text-xs">
          <div className="font-bold text-slate-200">{label}</div>
          <div className="text-orange-400 font-semibold mt-1">
            Crowd Density: {data.crowd}%
          </div>
          <div className="text-slate-300">
            Est. Walk-in Wait: {data.waitTime} mins
          </div>
          <div className="text-[10px] text-slate-400 mt-1 italic">
            {data.note}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full glass-card rounded-2xl p-5 border border-slate-800 shadow-xl">
      {/* Top Banner / Announcement */}
      {selectedCafeteria.announcement && (
        <div className="mb-4 px-3 py-2 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-300 text-xs flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-orange-400 animate-pulse shrink-0" />
            <span className="font-medium">{selectedCafeteria.announcement}</span>
          </div>
          <span className="text-[10px] bg-orange-500/20 text-orange-300 px-2 py-0.5 rounded-full font-bold uppercase shrink-0">
            Live Staff Notice
          </span>
        </div>
      )}

      {/* Main Grid: Live Gauge + Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-center">
        {/* Live Crowd Meter */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-center gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
          <div className="relative flex items-center justify-center">
            {/* Circular Gauge Graphic */}
            <svg className="w-32 h-32 transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="52"
                stroke="currentColor"
                strokeWidth="10"
                fill="transparent"
                className="text-slate-800"
              />
              <circle
                cx="64"
                cy="64"
                r="52"
                stroke="currentColor"
                strokeWidth="10"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 52}
                strokeDashoffset={2 * Math.PI * 52 * (1 - currentPct / 100)}
                strokeLinecap="round"
                className={`transition-all duration-1000 ${
                  isHigh ? 'text-rose-500' : isModerate ? 'text-amber-500' : 'text-emerald-500'
                }`}
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-black text-white">{currentPct}%</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Capacity
              </span>
            </div>
          </div>

          <div className="text-center sm:text-left lg:text-center">
            <div className="flex items-center justify-center sm:justify-start lg:justify-center gap-1.5">
              <span className={`w-2.5 h-2.5 rounded-full ${
                isHigh ? 'bg-rose-500 animate-ping' : isModerate ? 'bg-amber-500' : 'bg-emerald-500'
              }`} />
              <span className="text-sm font-bold text-white">{selectedCafeteria.crowdLevel}</span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Approx. <span className="font-semibold text-slate-200">{selectedCafeteria.activeQueuers} students</span> currently queued
            </p>
            <div className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs font-mono font-medium">
              <Clock className="w-3.5 h-3.5 text-orange-400" />
              <span>Walk-in Wait: ~{selectedCafeteria.avgWaitTimeMinutes} mins</span>
            </div>
          </div>
        </div>

        {/* Predictive AI Demand & Hourly Forecast Chart */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-orange-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                AI Crowd Forecast • SPEC Campus Schedule
              </span>
            </div>
            <div className="text-[11px] text-emerald-400 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Predictive accuracy 94.6%</span>
            </div>
          </div>

          {/* Area Chart */}
          <div className="h-36 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={HOURLY_CROWD_FORECAST} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="crowdGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="time" 
                  tick={{ fill: '#94a3b8', fontSize: 10 }}
                  stroke="#334155"
                />
                <YAxis 
                  tick={{ fill: '#94a3b8', fontSize: 10 }}
                  stroke="#334155"
                  domain={[0, 100]}
                />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine y={75} stroke="#ef4444" strokeDasharray="3 3" label={{ value: 'Peak', fill: '#ef4444', fontSize: 9 }} />
                <Area 
                  type="monotone" 
                  dataKey="crowd" 
                  stroke="#f97316" 
                  strokeWidth={2.5}
                  fillOpacity={1} 
                  fill="url(#crowdGradient)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Smart Campus Recommendation Box */}
          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold">
                💡
              </div>
              <div>
                <span className="font-semibold text-slate-200">
                  {isHigh
                    ? "Heavy peak break detected! Pre-booking saves you ~20 minutes."
                    : "Optimal order window! Meals take < 6 minutes to prepare."}
                </span>
                <p className="text-[11px] text-slate-400">
                  Recommended pickup slot: <span className="text-orange-400 font-medium">12:35 PM - 12:45 PM</span> before 3rd Year final bell.
                </p>
              </div>
            </div>

            {/* Quick Link to Less Crowded Cafeteria */}
            {isHigh && (
              <button
                onClick={() => setSelectedCafeteriaId('caf-south')}
                className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-semibold flex items-center gap-1 transition-all"
              >
                <span>Switch to South Tiffin (4m wait)</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
