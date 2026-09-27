import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  Clock, 
  Radio, 
  AlertTriangle, 
  CheckCircle2, 
  Send, 
  Sparkles,
  Sliders,
  Flame
} from 'lucide-react';

export const CrowdControlPanel = () => {
  const { 
    selectedCafeteria, 
    updateCafeteriaCrowd, 
    addNotification, 
    triggerConfetti 
  } = useApp();

  const [crowdPct, setCrowdPct] = useState(selectedCafeteria.currentCrowdPercentage);
  const [waitMins, setWaitMins] = useState(selectedCafeteria.avgWaitTimeMinutes);
  const [announcementText, setAnnouncementText] = useState(selectedCafeteria.announcement || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleApplyCrowd = (pct, wait) => {
    setCrowdPct(pct);
    setWaitMins(wait);
    updateCafeteriaCrowd(selectedCafeteria.id, pct, wait, announcementText);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleBroadcastAnnouncement = (e) => {
    e.preventDefault();
    if (!announcementText.trim()) return;

    updateCafeteriaCrowd(selectedCafeteria.id, crowdPct, waitMins, announcementText.trim());
    addNotification(
      `📢 ${selectedCafeteria.name} Announcement`,
      announcementText.trim(),
      'warning'
    );
    triggerConfetti();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Users className="w-5 h-5 text-orange-400" />
          <span>Real-Time Crowd & Operational Control</span>
        </h3>
        <p className="text-xs text-slate-400">
          Calibrate overhead campus crowd metrics, broadcast live kitchen announcements, and manage queue throttle.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Crowd Density & Wait Override */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-5">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-orange-400" />
              <span>Current Crowd Density & Wait Estimator</span>
            </h4>
            <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
              crowdPct >= 75
                ? 'bg-rose-500/20 text-rose-300'
                : crowdPct >= 45
                ? 'bg-amber-500/20 text-amber-300'
                : 'bg-emerald-500/20 text-emerald-300'
            }`}>
              {crowdPct}% Capacity ({crowdPct >= 75 ? 'Rush' : crowdPct >= 45 ? 'Moderate' : 'Low'})
            </span>
          </div>

          {/* Preset Buttons for Quick Shift Switching */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400">Quick Shift Rush Presets:</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleApplyCrowd(25, 3)}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500 text-xs font-medium text-slate-200 transition-all text-center"
              >
                <div className="text-emerald-400 font-bold">🟢 Light Traffic</div>
                <div className="text-[10px] text-slate-500">25% • ~3m wait</div>
              </button>

              <button
                type="button"
                onClick={() => handleApplyCrowd(65, 11)}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500 text-xs font-medium text-slate-200 transition-all text-center"
              >
                <div className="text-amber-400 font-bold">🟡 Mid-Shift Break</div>
                <div className="text-[10px] text-slate-500">65% • ~11m wait</div>
              </button>

              <button
                type="button"
                onClick={() => handleApplyCrowd(95, 24)}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-rose-500 text-xs font-medium text-slate-200 transition-all text-center"
              >
                <div className="text-rose-400 font-bold">🔴 Super Lunch Rush</div>
                <div className="text-[10px] text-slate-500">95% • ~24m wait</div>
              </button>
            </div>
          </div>

          {/* Sliders for precise adjustment */}
          <div className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-medium">Occupancy Percentage:</span>
                <span className="font-mono font-bold text-orange-400">{crowdPct}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="100"
                value={crowdPct}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setCrowdPct(val);
                  updateCafeteriaCrowd(selectedCafeteria.id, val, waitMins, announcementText);
                }}
                className="w-full accent-orange-500 cursor-pointer"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-medium">Estimated Walk-in Wait Time:</span>
                <span className="font-mono font-bold text-amber-400">{waitMins} Minutes</span>
              </div>
              <input
                type="range"
                min="1"
                max="35"
                value={waitMins}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setWaitMins(val);
                  updateCafeteriaCrowd(selectedCafeteria.id, crowdPct, val, announcementText);
                }}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>
          </div>

          {savedSuccess && (
            <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-bold flex items-center gap-1.5 animate-in fade-in">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Metrics saved and reflected instantly across campus student devices!</span>
            </div>
          )}
        </div>

        {/* Live Announcement Broadcast */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4 flex flex-col justify-between">
          <form onSubmit={handleBroadcastAnnouncement} className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Radio className="w-4 h-4 text-orange-400 animate-pulse" />
                <span>Broadcast Live Cafeteria Notice</span>
              </h4>
              <span className="text-[10px] text-slate-400">Pushes to student banner</span>
            </div>

            <p className="text-xs text-slate-400">
              Inform students about freshly cooked batches, griddle readiness, or special combos for today's break.
            </p>

            <textarea
              rows={4}
              placeholder="e.g. Fresh Dum Biryani batch ready at 12:45 PM! Pre-orders skip Counter 1 line."
              value={announcementText}
              onChange={(e) => setAnnouncementText(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-orange-500"
            />

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs shadow-md shadow-orange-500/20 flex items-center justify-center gap-2 transition-all active:scale-98"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Broadcast Campus Announcement</span>
            </button>
          </form>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-[11px] text-slate-400">
            <strong>Active Notice:</strong> "{selectedCafeteria.announcement || 'None'}"
          </div>
        </div>
      </div>
    </div>
  );
};
