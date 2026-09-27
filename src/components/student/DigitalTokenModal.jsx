import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  QrCode, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  Volume2, 
  Share2, 
  Download, 
  Sparkles,
  ArrowRight,
  Flame,
  ChefHat
} from 'lucide-react';

export const DigitalTokenModal = () => {
  const { 
    activeTokenModalOrder, 
    setActiveTokenModalOrder, 
    updateOrderStatus,
    playSoundEffect,
    triggerConfetti
  } = useApp();

  const [counterSeconds, setCounterSeconds] = useState(480); // 8 minutes mock countdown

  useEffect(() => {
    if (!activeTokenModalOrder) return;
    const interval = setInterval(() => {
      setCounterSeconds(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [activeTokenModalOrder]);

  if (!activeTokenModalOrder) return null;

  const order = activeTokenModalOrder;
  const isReady = order.status === 'READY_FOR_PICKUP';
  const isCollected = order.status === 'COLLECTED';
  const isPreparing = order.status === 'PREPARING';

  const formatCountdown = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const stages = [
    { key: 'PLACED', label: 'Order Received', desc: 'Queued in Kitchen' },
    { key: 'PREPARING', label: 'Cooking & Packing', desc: 'Fresh at Tawa/Grill' },
    { key: 'READY_FOR_PICKUP', label: 'Ready at Counter', desc: 'Scan & Collect' },
    { key: 'COLLECTED', label: 'Collected', desc: 'Enjoy your meal!' }
  ];

  const currentStageIndex = stages.findIndex(s => s.key === order.status);

  // Demo simulator to progress token status from inside modal
  const handleQuickAdvanceStatus = () => {
    if (order.status === 'PLACED') {
      updateOrderStatus(order.id, 'PREPARING');
      setActiveTokenModalOrder({ ...order, status: 'PREPARING' });
    } else if (order.status === 'PREPARING') {
      updateOrderStatus(order.id, 'READY_FOR_PICKUP');
      setActiveTokenModalOrder({ ...order, status: 'READY_FOR_PICKUP' });
    } else if (order.status === 'READY_FOR_PICKUP') {
      updateOrderStatus(order.id, 'COLLECTED');
      setActiveTokenModalOrder({ ...order, status: 'COLLECTED' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Pass Top Header */}
        <div className={`p-4 text-center text-white relative transition-colors ${
          isReady
            ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700'
            : isCollected
            ? 'bg-gradient-to-r from-slate-700 to-slate-800'
            : 'bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700'
        }`}>
          <button
            onClick={() => setActiveTokenModalOrder(null)}
            className="absolute top-3.5 right-3.5 p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-[10px] font-bold tracking-widest uppercase opacity-90">
            St. Peter's Engineering College • Digital Meal Pass
          </div>
          
          <div className="mt-1 flex items-center justify-center gap-2">
            <span className="text-3xl font-black font-mono tracking-tight">
              #{order.tokenId}
            </span>
          </div>

          <div className="text-xs font-medium opacity-90 mt-0.5">
            {order.cafeteriaName} • {order.counter}
          </div>
        </div>

        {/* Status Callout Banner */}
        <div className="px-6 pt-4 pb-2 text-center">
          {isReady ? (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-xs animate-bounce-soft">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>MEAL READY FOR PICKUP AT {order.counter.toUpperCase()}</span>
            </div>
          ) : isCollected ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-slate-400 font-semibold text-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Token Fulfilled & Collected</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-medium text-xs">
              <ChefHat className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>Kitchen is preparing your order • ETA ~{order.estimatedReadyTime}</span>
            </div>
          )}
        </div>

        {/* 4-Step Interactive Pipeline */}
        <div className="px-6 py-3">
          <div className="relative flex items-center justify-between">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-800 -translate-y-1/2 z-0" />
            <div 
              className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-orange-500 to-emerald-500 -translate-y-1/2 z-0 transition-all duration-500"
              style={{ width: `${(currentStageIndex / (stages.length - 1)) * 100}%` }}
            />

            {stages.map((stage, idx) => {
              const active = idx <= currentStageIndex;
              const isCurrent = idx === currentStageIndex;
              return (
                <div key={stage.key} className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                      isCurrent
                        ? 'bg-orange-500 text-white ring-4 ring-orange-500/20 scale-110'
                        : active
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    {active && !isCurrent ? '✓' : idx + 1}
                  </div>
                  <span className={`text-[10px] mt-1 font-semibold ${active ? 'text-slate-200' : 'text-slate-500'}`}>
                    {stage.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* QR Code Container */}
        <div className="px-6 py-4 flex flex-col items-center justify-center bg-slate-900/60 mx-6 rounded-2xl border border-slate-800 relative group">
          <div className="p-3 bg-white rounded-xl shadow-lg relative overflow-hidden">
            {/* SVG Interactive QR Code Mock */}
            <svg className="w-36 h-36" viewBox="0 0 100 100" fill="none">
              <rect width="100" height="100" fill="#FFFFFF"/>
              {/* Corner 1 */}
              <rect x="5" y="5" width="26" height="26" fill="#000000"/>
              <rect x="9" y="9" width="18" height="18" fill="#FFFFFF"/>
              <rect x="13" y="13" width="10" height="10" fill="#000000"/>
              {/* Corner 2 */}
              <rect x="69" y="5" width="26" height="26" fill="#000000"/>
              <rect x="73" y="9" width="18" height="18" fill="#FFFFFF"/>
              <rect x="77" y="13" width="10" height="10" fill="#000000"/>
              {/* Corner 3 */}
              <rect x="5" y="69" width="26" height="26" fill="#000000"/>
              <rect x="9" y="73" width="18" height="18" fill="#FFFFFF"/>
              <rect x="13" y="77" width="10" height="10" fill="#000000"/>
              {/* Pattern Blocks */}
              <rect x="36" y="8" width="6" height="6" fill="#f97316"/>
              <rect x="46" y="8" width="8" height="6" fill="#000000"/>
              <rect x="58" y="10" width="6" height="6" fill="#000000"/>
              <rect x="36" y="20" width="12" height="6" fill="#000000"/>
              <rect x="52" y="18" width="6" height="10" fill="#f97316"/>
              <rect x="8" y="36" width="6" height="6" fill="#000000"/>
              <rect x="18" y="40" width="10" height="6" fill="#000000"/>
              <rect x="8" y="52" width="10" height="8" fill="#000000"/>
              <rect x="36" y="36" width="28" height="28" fill="#f97316"/>
              <rect x="42" y="42" width="16" height="16" fill="#FFFFFF"/>
              <text x="50" y="53" fill="#ea580c" fontSize="9" fontWeight="900" textAnchor="middle">SPEC</text>
              <rect x="70" y="38" width="10" height="6" fill="#000000"/>
              <rect x="84" y="42" width="8" height="8" fill="#000000"/>
              <rect x="72" y="54" width="12" height="6" fill="#000000"/>
              <rect x="36" y="70" width="8" height="8" fill="#000000"/>
              <rect x="48" y="72" width="14" height="6" fill="#000000"/>
              <rect x="38" y="84" width="12" height="8" fill="#000000"/>
              <rect x="56" y="82" width="6" height="10" fill="#000000"/>
              <rect x="70" y="70" width="10" height="6" fill="#000000"/>
              <rect x="84" y="74" width="8" height="8" fill="#000000"/>
              <rect x="72" y="84" width="18" height="8" fill="#000000"/>
            </svg>

            {/* Scanning line animation */}
            <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent top-0 animate-shimmer opacity-75" />
          </div>

          <div className="mt-2 text-center">
            <span className="text-[11px] font-mono text-slate-400">
              Scan at Counter 1 Optical Reader
            </span>
            <div className="text-[10px] text-slate-500 font-mono">
              HASH: {order.tokenQrCode.slice(0, 24)}...
            </div>
          </div>
        </div>

        {/* Order Details & Summary */}
        <div className="px-6 py-3 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-300">
            <span className="text-slate-400">Student:</span>
            <span className="font-semibold text-slate-200">{order.studentName} ({order.studentRoll})</span>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-300">
            <span className="text-slate-400">Pickup Slot:</span>
            <span className="font-medium text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded">
              {order.pickupSlot}
            </span>
          </div>

          {order.dietaryNotes && (
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span className="text-slate-400">Kitchen Note:</span>
              <span className="italic text-slate-300">"{order.dietaryNotes}"</span>
            </div>
          )}

          <div className="pt-2 border-t border-slate-800">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Items Ordered:
            </div>
            <div className="space-y-1">
              {order.items.map((it, idx) => (
                <div key={idx} className="flex justify-between text-xs text-slate-300">
                  <span>{it.quantity}x {it.name}</span>
                  <span className="font-mono text-slate-200">₹{it.price * it.quantity}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center pt-2 mt-1 border-t border-slate-800/80 text-sm font-bold text-white">
              <span>Total Paid (Digital):</span>
              <span className="text-orange-400 font-mono">₹{order.totalAmount}</span>
            </div>
          </div>
        </div>

        {/* Footer Actions & Simulation Controls */}
        <div className="p-4 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between gap-2">
          {/* Demo stage advancer */}
          {!isCollected && (
            <button
              onClick={handleQuickAdvanceStatus}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
            >
              <ArrowRight className="w-3.5 h-3.5 text-orange-400" />
              <span>Simulate Next Stage ({order.status === 'PLACED' ? 'Cook' : order.status === 'PREPARING' ? 'Ready' : 'Collect'})</span>
            </button>
          )}

          <button
            onClick={() => {
              playSoundEffect('ready');
              triggerConfetti();
            }}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
            title="Test Pickup Chime"
          >
            <Volume2 className="w-4 h-4" />
          </button>

          <button
            onClick={() => setActiveTokenModalOrder(null)}
            className="py-2 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold transition-all shadow-md shadow-orange-500/20"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
