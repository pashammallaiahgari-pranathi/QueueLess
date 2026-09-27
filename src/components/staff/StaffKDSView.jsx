import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ChefHat, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  QrCode, 
  Search, 
  Volume2, 
  Flame, 
  AlertTriangle, 
  Filter,
  Check,
  UserCheck,
  Zap
} from 'lucide-react';

export const StaffKDSView = () => {
  const { 
    orders, 
    updateOrderStatus, 
    verifyAndCollectToken, 
    selectedCafeteria, 
    playSoundEffect,
    triggerConfetti
  } = useApp();

  const [counterFilter, setCounterFilter] = useState('All');
  const [scannerInput, setScannerInput] = useState('');
  const [scanResult, setScanResult] = useState(null);

  // Filter orders by cafeteria and counter
  const cafeteriaOrders = orders.filter(
    o => o.cafeteriaId === selectedCafeteria.id
  );

  const filteredOrders = cafeteriaOrders.filter(o => {
    if (counterFilter === 'All') return true;
    return o.counter.toLowerCase().includes(counterFilter.toLowerCase());
  });

  const placedOrders = filteredOrders.filter(o => o.status === 'PLACED');
  const preparingOrders = filteredOrders.filter(o => o.status === 'PREPARING');
  const readyOrders = filteredOrders.filter(o => o.status === 'READY_FOR_PICKUP');
  const collectedOrders = filteredOrders.filter(o => o.status === 'COLLECTED');

  const handleScanSubmit = (e) => {
    e.preventDefault();
    if (!scannerInput.trim()) return;
    const result = verifyAndCollectToken(scannerInput);
    setScanResult(result);
    if (result.success) {
      playSoundEffect('ready');
      triggerConfetti();
      setScannerInput('');
    } else {
      playSoundEffect('tap');
    }

    setTimeout(() => {
      setScanResult(null);
    }, 4000);
  };

  return (
    <div className="space-y-6">
      {/* Top KDS Stats Bar & Quick Scanner */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* KDS Shift Metrics */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-4 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <ChefHat className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>Kitchen Display System (KDS)</span>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                {selectedCafeteria.name} • Active Orders & Token Fulfillment
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-center">
            <div className="px-3 py-1 bg-slate-900/60 rounded-xl border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">New</div>
              <div className="text-base font-black text-blue-400 font-mono">{placedOrders.length}</div>
            </div>
            <div className="px-3 py-1 bg-slate-900/60 rounded-xl border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">In Kitchen</div>
              <div className="text-base font-black text-amber-400 font-mono">{preparingOrders.length}</div>
            </div>
            <div className="px-3 py-1 bg-slate-900/60 rounded-xl border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">Ready at Counter</div>
              <div className="text-base font-black text-emerald-400 font-mono">{readyOrders.length}</div>
            </div>
          </div>
        </div>

        {/* Token Verification Barcode / Number Scanner */}
        <div className="glass-card rounded-2xl p-4 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <QrCode className="w-3.5 h-3.5 text-orange-400" />
              <span>Token Verification Scanner</span>
            </span>
            <span className="text-[10px] text-slate-500 font-mono">SPEC-Reader v2</span>
          </div>

          <form onSubmit={handleScanSubmit} className="flex gap-2">
            <input
              type="text"
              placeholder="Enter Token # (e.g. SPEC-702)"
              value={scannerInput}
              onChange={(e) => setScannerInput(e.target.value)}
              className="flex-1 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500 uppercase font-mono"
            />
            <button
              type="submit"
              className="px-3 py-1.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md transition-all active:scale-95 shrink-0"
            >
              Verify
            </button>
          </form>

          {scanResult && (
            <div className={`mt-2 p-2 rounded-lg text-xs font-semibold ${
              scanResult.success ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
            }`}>
              {scanResult.message}
            </div>
          )}
        </div>
      </div>

      {/* Counter Filter */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-xs font-bold text-slate-300">Station Filter:</span>
          {['All', 'Counter 1', 'Counter 2', 'Counter 3'].map(c => (
            <button
              key={c}
              onClick={() => setCounterFilter(c)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                counterFilter === c
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <button
          onClick={() => playSoundEffect('ready')}
          className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1.5"
        >
          <Volume2 className="w-3.5 h-3.5 text-orange-400" />
          <span>Test KDS Bell</span>
        </button>
      </div>

      {/* 4-Column Live Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        
        {/* Column 1: New Placed Orders */}
        <div className="glass-panel rounded-2xl p-4 border border-slate-800/80 flex flex-col h-full">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                1. Placed ({placedOrders.length})
              </h4>
            </div>
            <span className="text-[10px] text-slate-500">Incoming</span>
          </div>

          <div className="space-y-3 mt-3 flex-1 overflow-y-auto max-h-[600px]">
            {placedOrders.length === 0 ? (
              <div className="text-center py-10 text-xs text-slate-500">No new orders waiting</div>
            ) : (
              placedOrders.map(order => (
                <div
                  key={order.id}
                  className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2 hover:border-blue-500/50 transition-all shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-mono font-extrabold text-white text-base">#{order.tokenId}</span>
                      <div className="text-[11px] text-slate-400">{order.studentName} ({order.studentRoll})</div>
                      <div className="text-[10px] text-orange-400 font-semibold">{order.counter}</div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                      {order.orderTime}
                    </span>
                  </div>

                  <div className="text-xs text-slate-300 divide-y divide-slate-800/50 pt-1">
                    {order.items.map((it, i) => (
                      <div key={i} className="py-1 flex justify-between">
                        <span className="font-semibold text-white">{it.quantity}x {it.name}</span>
                      </div>
                    ))}
                  </div>

                  {order.dietaryNotes && (
                    <div className="text-[11px] p-1.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 italic">
                      Note: {order.dietaryNotes}
                    </div>
                  )}

                  <div className="pt-2 flex items-center justify-between border-t border-slate-800">
                    <span className="text-[10px] text-slate-400">Slot: {order.pickupSlot}</span>
                    <button
                      onClick={() => updateOrderStatus(order.id, 'PREPARING')}
                      className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1 shadow transition-all"
                    >
                      <span>Start Cooking</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Column 2: In Kitchen / Preparing */}
        <div className="glass-panel rounded-2xl p-4 border border-slate-800/80 flex flex-col h-full">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                2. In Kitchen ({preparingOrders.length})
              </h4>
            </div>
            <span className="text-[10px] text-slate-500">Cooking</span>
          </div>

          <div className="space-y-3 mt-3 flex-1 overflow-y-auto max-h-[600px]">
            {preparingOrders.length === 0 ? (
              <div className="text-center py-10 text-xs text-slate-500">No meals currently on tawa/wok</div>
            ) : (
              preparingOrders.map(order => (
                <div
                  key={order.id}
                  className="p-3.5 rounded-xl bg-slate-900 border border-amber-500/30 space-y-2 hover:border-amber-500 transition-all shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-mono font-extrabold text-amber-400 text-base">#{order.tokenId}</span>
                      <div className="text-[11px] text-slate-400">{order.studentName}</div>
                      <div className="text-[10px] text-orange-400 font-semibold">{order.counter}</div>
                    </div>
                    <span className="text-[10px] text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded font-mono">
                      Prep underway
                    </span>
                  </div>

                  <div className="text-xs text-slate-300 divide-y divide-slate-800/50 pt-1">
                    {order.items.map((it, i) => (
                      <div key={i} className="py-1 flex justify-between font-semibold text-white">
                        <span>{it.quantity}x {it.name}</span>
                      </div>
                    ))}
                  </div>

                  {order.dietaryNotes && (
                    <div className="text-[11px] p-1.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 italic">
                      Note: {order.dietaryNotes}
                    </div>
                  )}

                  <div className="pt-2 flex items-center justify-between border-t border-slate-800">
                    <span className="text-[10px] text-slate-400">ETA ~{order.estimatedReadyTime}</span>
                    <button
                      onClick={() => updateOrderStatus(order.id, 'READY_FOR_PICKUP')}
                      className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 shadow transition-all active:scale-95"
                    >
                      <Check className="w-3 h-3" />
                      <span>Mark Ready (Ping Student)</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Column 3: Ready at Counter */}
        <div className="glass-panel rounded-2xl p-4 border border-slate-800/80 flex flex-col h-full">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                3. Ready at Counter ({readyOrders.length})
              </h4>
            </div>
            <span className="text-[10px] text-emerald-400 font-semibold">Awaiting Pickup</span>
          </div>

          <div className="space-y-3 mt-3 flex-1 overflow-y-auto max-h-[600px]">
            {readyOrders.length === 0 ? (
              <div className="text-center py-10 text-xs text-slate-500">No ready meals waiting</div>
            ) : (
              readyOrders.map(order => (
                <div
                  key={order.id}
                  className="p-3.5 rounded-xl bg-slate-900 border border-emerald-500/50 space-y-2 hover:border-emerald-400 transition-all shadow-md shadow-emerald-500/5"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-mono font-extrabold text-emerald-400 text-lg">#{order.tokenId}</span>
                      <div className="text-xs font-semibold text-white">{order.studentName}</div>
                      <div className="text-[10px] text-slate-400">{order.studentRoll}</div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded">
                        Packed & Hot
                      </span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-300 divide-y divide-slate-800/50 pt-1">
                    {order.items.map((it, i) => (
                      <div key={i} className="py-1 flex justify-between font-semibold text-slate-100">
                        <span>{it.quantity}x {it.name}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-slate-800">
                    <span className="text-[10px] font-mono text-slate-400">Total ₹{order.totalAmount}</span>
                    <button
                      onClick={() => updateOrderStatus(order.id, 'COLLECTED')}
                      className="px-3 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center gap-1 shadow transition-all active:scale-95"
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>Hand Over</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Column 4: Completed Shift Pickups */}
        <div className="glass-panel rounded-2xl p-4 border border-slate-800/80 flex flex-col h-full opacity-85">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                4. Completed ({collectedOrders.length})
              </h4>
            </div>
            <span className="text-[10px] text-slate-500">Fulfilled</span>
          </div>

          <div className="space-y-3 mt-3 flex-1 overflow-y-auto max-h-[600px]">
            {collectedOrders.length === 0 ? (
              <div className="text-center py-10 text-xs text-slate-500">Completed pickups appear here</div>
            ) : (
              collectedOrders.map(order => (
                <div
                  key={order.id}
                  className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs space-y-1.5 text-slate-400"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-mono font-bold text-slate-300">#{order.tokenId}</span>
                    <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Collected</span>
                    </span>
                  </div>
                  <div className="text-slate-300 text-[11px] truncate">
                    {order.items.map(it => `${it.quantity}x ${it.name}`).join(', ')}
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-800/50">
                    <span>{order.studentName}</span>
                    <span className="font-mono">₹{order.totalAmount}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
