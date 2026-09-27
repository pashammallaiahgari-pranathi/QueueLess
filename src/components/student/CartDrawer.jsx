import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  Clock, 
  CreditCard, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  Zap,
  Leaf
} from 'lucide-react';

export const CartDrawer = () => {
  const { 
    cart, 
    updateCartQty, 
    removeFromCart, 
    clearCart, 
    isCartOpen, 
    setIsCartOpen,
    placeOrder,
    selectedCafeteria,
    userProfile 
  } = useApp();

  const [pickupSlot, setPickupSlot] = useState('Instant (Next 8-10 mins)');
  const [dietaryNotes, setDietaryNotes] = useState('');
  const [paymentMode, setPaymentMode] = useState('SPEC Campus Smartcard');

  if (!isCartOpen) return null;

  const subtotal = cart.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0);
  const ecoDiscount = subtotal > 0 ? 5 : 0; // ₹5 discount for digital token paperless pickup
  const finalTotal = Math.max(0, subtotal - ecoDiscount);

  const pickupSlots = [
    'Instant (Next 8-10 mins)',
    '12:15 PM Break (1st & 2nd Year)',
    '01:00 PM Break (3rd & Final Year)',
    '04:15 PM Evening Break'
  ];

  const handleCheckout = (e) => {
    e.preventDefault();
    placeOrder({
      pickupSlot,
      dietaryNotes,
      paymentMode
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Your Pre-Order Cart</h3>
                <p className="text-xs text-slate-400">{selectedCafeteria.name}</p>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 rounded-full bg-slate-800/80 mx-auto flex items-center justify-center text-slate-500">
                  🍽️
                </div>
                <h4 className="text-sm font-bold text-slate-300">Your cart is empty</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Browse the smart menu, check live prep times, and pre-book to skip physical cafeteria queues.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-4 py-2 rounded-xl bg-orange-500 text-white font-semibold text-xs shadow-md shadow-orange-500/20"
                >
                  Explore Today's Menu
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {cart.map(({ item, quantity }) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between gap-3"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 rounded-lg object-cover bg-slate-800 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-slate-100 truncate">{item.name}</h4>
                        <div className="text-[11px] text-slate-400 font-mono">₹{item.price} each</div>
                        <div className="text-[10px] text-orange-400 flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3" />
                          <span>~{item.prepTimeMins}m prep</span>
                        </div>
                      </div>

                      {/* Stepper */}
                      <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-700 rounded-lg p-1">
                        <button
                          onClick={() => updateCartQty(item.id, quantity - 1)}
                          className="w-6 h-6 rounded flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-5 text-center text-xs font-mono font-bold text-white">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateCartQty(item.id, quantity + 1)}
                          className="w-6 h-6 rounded flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Pickup Slot Selection */}
                <div className="pt-2 space-y-2">
                  <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-orange-400" />
                    <span>Select Scheduled Pickup Slot:</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {pickupSlots.map(slot => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setPickupSlot(slot)}
                        className={`p-2 rounded-xl text-left text-xs font-medium border transition-all ${
                          pickupSlot === slot
                            ? 'bg-orange-500/20 text-orange-300 border-orange-500/50 shadow-sm'
                            : 'bg-slate-800/60 text-slate-400 border-slate-700/60 hover:bg-slate-800 hover:text-slate-200'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Kitchen / Dietary Instructions */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">
                    Kitchen Preparation Notes (Optional):
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Extra chutney, less spicy, separate packing..."
                    value={dietaryNotes}
                    onChange={(e) => setDietaryNotes(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-orange-500"
                  />
                </div>

                {/* Payment Simulation Mode */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-orange-400" />
                    <span>Campus Payment Method:</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {['SPEC Campus Smartcard', 'UPI / GPay / PhonePe'].map(mode => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => setPaymentMode(mode)}
                        className={`p-2 rounded-xl text-left border transition-all ${
                          paymentMode === mode
                            ? 'bg-orange-500/20 text-orange-300 border-orange-500/50'
                            : 'bg-slate-800/60 text-slate-400 border-slate-700/60'
                        }`}
                      >
                        <div className="font-semibold text-slate-200">{mode}</div>
                        <div className="text-[10px] text-slate-400">
                          {mode === 'SPEC Campus Smartcard' ? 'Balance: ₹420' : 'Instant 0-sec QR'}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Eco-Friendly Digital Pass Banner */}
                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center gap-2.5 text-xs text-emerald-300">
                  <Leaf className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <span className="font-semibold">Digital Token Applied:</span>
                    <span className="text-emerald-400"> ₹5 Paperless Saver credit + 45 XP bonus!</span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer & Checkout Button */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 space-y-3">
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span className="font-mono text-slate-200">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-emerald-400">
                  <span>Paperless Digital Pickup Credit</span>
                  <span className="font-mono">-₹{ecoDiscount}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-slate-800">
                  <span>Final Amount</span>
                  <span className="font-mono text-orange-400 text-base">₹{finalTotal}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-sm shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 active:scale-98 transition-all"
              >
                <span>Generate Digital Token Pass</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center text-[10px] text-slate-500 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Verified St. Peter's Engineering College Order Pipeline</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
