import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  QrCode, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  ChevronRight, 
  RotateCcw, 
  Star, 
  AlertCircle,
  ChefHat,
  Volume2,
  Sparkles
} from 'lucide-react';

export const StudentTokensView = ({ onOpenFeedback }) => {
  const { 
    orders, 
    setActiveTokenModalOrder, 
    addToCart, 
    menuItems, 
    setIsCartOpen,
    playSoundEffect 
  } = useApp();

  const activeOrders = orders.filter(o => o.status !== 'COLLECTED');
  const pastOrders = orders.filter(o => o.status === 'COLLECTED');

  const handleReorder = (order) => {
    order.items.forEach(it => {
      const originalItem = menuItems.find(m => m.id === it.id);
      if (originalItem) {
        addToCart(originalItem, it.quantity);
      }
    });
    setIsCartOpen(true);
  };

  return (
    <div className="w-full space-y-8">
      {/* Active Digital Tokens */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
              <span>Active Digital Tokens</span>
              {activeOrders.length > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold font-mono">
                  {activeOrders.length} LIVE
                </span>
              )}
            </h2>
            <p className="text-xs text-slate-400">
              Present your live token QR code or token ID at the specified counter when ready.
            </p>
          </div>
        </div>

        {activeOrders.length === 0 ? (
          <div className="p-8 text-center glass-panel rounded-2xl border border-slate-800 space-y-2">
            <div className="w-12 h-12 rounded-full bg-slate-800 text-slate-500 flex items-center justify-center mx-auto text-xl">
              🎟️
            </div>
            <p className="text-sm font-semibold text-slate-300">No active pickup tokens right now</p>
            <p className="text-xs text-slate-500">
              When you pre-book meals, your digital pass with live preparation status will appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeOrders.map(order => {
              const isReady = order.status === 'READY_FOR_PICKUP';
              const isPreparing = order.status === 'PREPARING';

              return (
                <div
                  key={order.id}
                  className={`glass-card rounded-2xl p-5 border transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                    isReady
                      ? 'border-emerald-500/60 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500/30'
                      : 'border-slate-800 hover:border-orange-500/40'
                  }`}
                >
                  {/* Ready alert ribbon */}
                  {isReady && (
                    <div className="absolute top-0 right-0 bg-emerald-500 text-white font-bold text-[10px] px-3 py-1 rounded-bl-xl uppercase tracking-wider flex items-center gap-1 shadow-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                      <span>Ready for Pickup</span>
                    </div>
                  )}

                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-black font-mono text-white tracking-tight">
                            #{order.tokenId}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                            isReady
                              ? 'bg-emerald-500/20 text-emerald-300'
                              : isPreparing
                              ? 'bg-amber-500/20 text-amber-300'
                              : 'bg-blue-500/20 text-blue-300'
                          }`}>
                            {order.status === 'READY_FOR_PICKUP' ? 'READY' : order.status}
                          </span>
                        </div>
                        <div className="text-xs font-semibold text-orange-400 mt-1">
                          {order.cafeteriaName}
                        </div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span>{order.counter}</span>
                        </div>
                      </div>

                      {/* Small QR thumbnail */}
                      <button
                        onClick={() => setActiveTokenModalOrder(order)}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                        title="Expand Full Digital Pass"
                      >
                        <QrCode className="w-6 h-6 text-orange-400" />
                      </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="my-4 space-y-1.5">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-400">Order Progress</span>
                        <span className={`font-semibold ${isReady ? 'text-emerald-400' : 'text-orange-400'}`}>
                          {isReady ? 'Ready for Handover' : isPreparing ? 'Kitchen is Cooking' : 'Order Queued'}
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 ${
                            isReady
                              ? 'w-full bg-emerald-500'
                              : isPreparing
                              ? 'w-2/3 bg-amber-500'
                              : 'w-1/3 bg-blue-500'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Item list preview */}
                    <div className="space-y-1 text-xs text-slate-300 pb-3 border-b border-slate-800/80">
                      {order.items.map((it, i) => (
                        <div key={i} className="flex justify-between">
                          <span>{it.quantity}x {it.name}</span>
                          <span className="font-mono text-slate-400">₹{it.price * it.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 flex items-center justify-between gap-2">
                    <div className="text-[11px] text-slate-400">
                      ETA: <span className="font-semibold text-slate-200">{order.estimatedReadyTime}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {isReady && (
                        <button
                          onClick={() => playSoundEffect('ready')}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-400 transition-colors"
                          title="Play arrival chime"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => setActiveTokenModalOrder(order)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${
                          isReady
                            ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-500/20'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                        }`}
                      >
                        <span>View Digital Pass</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Past Order History & Feedback Loop */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span>Past Meals & Pickup History</span>
            <span className="text-xs text-slate-400 font-normal">
              (Leave review to earn +25 XP)
            </span>
          </h3>
          <p className="text-xs text-slate-400">
            Reorder your favorites in 1 click or rate food freshness to improve campus forecasting.
          </p>
        </div>

        {pastOrders.length === 0 ? (
          <div className="p-6 text-center text-xs text-slate-500 glass-panel rounded-xl border border-slate-800">
            No completed orders yet. Once your token is fulfilled by staff, it will appear here.
          </div>
        ) : (
          <div className="space-y-3">
            {pastOrders.map(order => (
              <div
                key={order.id}
                className="glass-panel p-4 rounded-xl border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-200 text-sm">#{order.tokenId}</span>
                    <span className="text-xs font-semibold text-orange-400">{order.cafeteriaName}</span>
                    <span className="text-[10px] text-slate-500 font-mono">• {order.orderTime}</span>
                  </div>

                  <div className="text-xs text-slate-300 mt-1">
                    {order.items.map(it => `${it.quantity}x ${it.name}`).join(', ')}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Total: <span className="font-mono font-bold text-slate-200">₹{order.totalAmount}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => onOpenFeedback && onOpenFeedback(order)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold transition-all"
                  >
                    <Star className="w-3.5 h-3.5 text-amber-400" />
                    <span>Rate Experience (+25 XP)</span>
                  </button>

                  <button
                    onClick={() => handleReorder(order)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold transition-all"
                  >
                    <RotateCcw className="w-3 h-3 text-orange-400" />
                    <span>Reorder</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
