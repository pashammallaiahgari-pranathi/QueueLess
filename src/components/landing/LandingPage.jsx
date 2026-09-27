import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Zap, 
  Clock, 
  QrCode, 
  TrendingUp, 
  ShieldCheck, 
  UtensilsCrossed, 
  ChefHat, 
  Building2, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Flame, 
  Coffee, 
  Sun, 
  Sunrise, 
  Radio, 
  MapPin, 
  Star,
  Users,
  Award
} from 'lucide-react';

export const LandingPage = () => {
  const { 
    setIsLoginModalOpen, 
    foodTimings, 
    menuItems, 
    cafeterias 
  } = useApp();

  const [selectedTimingSlot, setSelectedTimingSlot] = useState('lunch'); // 'breakfast' | 'lunch' | 'snacks'

  // Filter items for the selected timing slot
  const slotItems = menuItems.filter(item => item.timeSlot === selectedTimingSlot);

  const activeSlotInfo = foodTimings.find(t => t.id === selectedTimingSlot) || foodTimings[1];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-orange-500 selection:text-white relative overflow-hidden">
      
      {/* Background Animated Glowing Orbs */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-orange-600/15 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-80 right-10 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-40 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Top Navigation */}
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4 py-3">
          
          {/* Logo & College Badge */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-600 via-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/30 ring-1 ring-orange-400/40">
              <Zap className="w-6 h-6 text-white stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-white">
                  Queue<span className="text-orange-500">Less</span>
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-orange-500/15 text-orange-400 border border-orange-500/30 uppercase tracking-wider">
                  SPEC Hyderabad
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block font-medium">
                Smart Campus Cafeteria Intelligence Platform
              </p>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-300">
            <a href="#food-timings" className="hover:text-orange-400 transition-colors flex items-center gap-1.5">
              <span>Food Timings</span>
              <span className="px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                Telugu Specials
              </span>
            </a>
            <a href="#how-it-works" className="hover:text-orange-400 transition-colors">
              How It Works
            </a>
            <a href="#crowd-radar" className="hover:text-orange-400 transition-colors">
              Live Crowd Radar
            </a>
            <a href="#testimonials" className="hover:text-orange-400 transition-colors">
              Campus Reviews
            </a>
          </div>

          {/* College Sign In CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="relative group px-4 sm:px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-xs shadow-lg shadow-orange-500/25 flex items-center gap-2 transition-all active:scale-95 glow-orange"
            >
              <ShieldCheck className="w-4 h-4 text-white" />
              <span>Sign In with College ID</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex flex-col items-center text-center">
        
        {/* Animated Campus Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-orange-500/30 shadow-inner mb-6 animate-float-horizontal">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-semibold text-slate-200">
            St. Peter's Engineering College • Maisammaguda, Hyderabad
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-xs font-mono font-bold text-orange-400">
            All 4 Campus Kiosks Connected
          </span>
        </div>

        {/* Big Punchy Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-4xl leading-[1.1]">
          Skip the Queue. <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-rose-400 bg-clip-text text-transparent animate-gradient-flow">
            Enjoy Your Food.
          </span>
        </h1>

        <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-2xl font-medium leading-relaxed">
          Know the crowd before stepping out. Pre-order authentic Telugu tiffins, steaming Hyderabadi Dum Biryani, and hot Irani chai with digital optical tokens.
        </p>

        {/* Hero Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={() => setIsLoginModalOpen(true)}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white font-black text-sm shadow-xl shadow-orange-500/30 flex items-center justify-center gap-2 transition-all active:scale-95 group glow-orange"
          >
            <span>Sign In with College Email ID</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </button>

          <a
            href="#food-timings"
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-sm flex items-center justify-center gap-2 transition-all"
          >
            <UtensilsCrossed className="w-4 h-4 text-orange-400" />
            <span>View Food Timings & Telugu Menu</span>
          </a>
        </div>

        {/* Floating Animated Cards Around Hero */}
        <div className="w-full relative mt-14 max-w-5xl">
          
          {/* Main Visual: Interactive Digital Token Hero Mockup */}
          <div className="relative glass-card rounded-3xl p-6 sm:p-8 border border-slate-700/80 shadow-2xl overflow-hidden glow-orange">
            <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-left">
              {/* Token Mock */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-orange-400 uppercase tracking-widest">
                    Digital Meal Token
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold animate-pulse">
                    READY FOR PICKUP
                  </span>
                </div>
                <div className="text-3xl font-black font-mono text-white">#SPEC-702</div>
                <div className="text-xs text-slate-300 font-medium">
                  Central Food Court • Counter 1
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  1x Hyderabadi Chicken Dum Biryani
                </div>
                <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-[10px] text-slate-400">
                  <span>Wait: 0 mins</span>
                  <span className="text-emerald-400 font-bold">Contactless Scan</span>
                </div>
              </div>

              {/* Live Crowd Meter Mock */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Live Canteen Sensor
                  </span>
                  <Radio className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-amber-400 font-mono">68%</span>
                  <span className="text-xs text-slate-400">Moderate Rush</span>
                </div>
                <p className="text-xs text-slate-300">
                  Block A Canteen queue: ~12 mins walk-in. Pre-orders bypass physical queue!
                </p>
                <div className="pt-2 border-t border-slate-800 flex items-center gap-1.5 text-[10px] text-emerald-400 font-medium">
                  <Sparkles className="w-3 h-3" />
                  <span>AI Predictive Accuracy 94.6%</span>
                </div>
              </div>

              {/* Zero Wastage Metric */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Campus Impact
                  </span>
                  <Award className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div className="text-3xl font-black text-emerald-400 font-mono">42.8 kg</div>
                <p className="text-xs text-slate-300">
                  Daily food waste prevented through advance kitchen batch forecasting.
                </p>
                <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-400">
                  St. Peter's Engineering College Green Campus Initiative
                </div>
              </div>
            </div>
          </div>

          {/* Floating Badges */}
          <div className="hidden lg:block absolute -top-6 -left-6 glass-panel px-4 py-2.5 rounded-2xl border border-orange-500/40 text-xs font-bold text-white shadow-xl animate-float-slow">
            <div className="flex items-center gap-2">
              <span className="text-lg">🍛</span>
              <div>
                <div>Hyderabadi Dum Biryani</div>
                <div className="text-[10px] text-orange-400 font-normal">Fresh batch ready at 12:45 PM</div>
              </div>
            </div>
          </div>

          <div className="hidden lg:block absolute -bottom-6 -right-6 glass-panel px-4 py-2.5 rounded-2xl border border-emerald-500/40 text-xs font-bold text-white shadow-xl animate-float-reverse">
            <div className="flex items-center gap-2">
              <span className="text-lg">☕</span>
              <div>
                <div>Irani Chai + 4 Osmania</div>
                <div className="text-[10px] text-emerald-400 font-normal">0-sec instant QR pick up @ ₹25</div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Live Campus Radar & Key Metrics Strip */}
      <section id="crowd-radar" className="border-y border-slate-800/80 bg-slate-900/50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-orange-400 font-mono">3,640+</div>
              <div className="text-xs font-semibold text-slate-300">Daily Students Served</div>
              <p className="text-[11px] text-slate-500">Across St. Peter's Engineering College</p>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono">84%</div>
              <div className="text-xs font-semibold text-slate-300">Peak Queue Wait Slashed</div>
              <p className="text-[11px] text-slate-500">From 26 mins down to 4.2 mins</p>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-amber-400 font-mono">42.8 kg</div>
              <div className="text-xs font-semibold text-slate-300">Food Waste Saved / Day</div>
              <p className="text-[11px] text-slate-500">Zero unnecessary over-preparation</p>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-blue-400 font-mono">4.9 / 5.0</div>
              <div className="text-xs font-semibold text-slate-300">Student Satisfaction</div>
              <p className="text-[11px] text-slate-500">Over 1,280 verified student reviews</p>
            </div>

          </div>
        </div>
      </section>

      {/* Food Timings & Authentic Telugu Menu Schedule */}
      <section id="food-timings" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-10">
        
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/15 text-orange-400 text-xs font-bold border border-orange-500/30">
            <UtensilsCrossed className="w-3.5 h-3.5" />
            <span>Campus Dining Schedule & Telugu Specialties</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Daily Food Timings & Authentic Telugu Flavors
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Prepared fresh by local culinary chefs. Check live availability, preparation batches, and pre-book ahead of break intervals.
          </p>
        </div>

        {/* 3 Food Timing Slots Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {foodTimings.map(slot => {
            const isSelected = selectedTimingSlot === slot.id;
            return (
              <button
                key={slot.id}
                onClick={() => setSelectedTimingSlot(slot.id)}
                className={`p-5 rounded-2xl border text-left transition-all duration-200 relative overflow-hidden group ${
                  isSelected
                    ? 'glass-card border-orange-500/60 shadow-xl shadow-orange-500/10 ring-1 ring-orange-500/40'
                    : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{slot.icon}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    slot.status === 'ACTIVE_NOW'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : slot.status === 'HIGH_DEMAND'
                      ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {slot.status === 'ACTIVE_NOW' ? '⚡ LIVE NOW' : slot.status === 'HIGH_DEMAND' ? '🔥 SUPER RUSH' : 'UPCOMING'}
                  </span>
                </div>

                <div className="mt-3">
                  <h3 className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors">
                    {slot.teluguTitle}
                  </h3>
                  <div className="text-xs font-semibold text-slate-300 mt-0.5">
                    {slot.englishTitle}
                  </div>
                  <div className="text-xs font-mono font-bold text-orange-400 mt-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{slot.timeSlot}</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                  {slot.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Selected Slot Menu Items Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <span>{activeSlotInfo.teluguTitle}</span>
                <span className="text-xs text-orange-400 font-mono font-normal">({activeSlotInfo.timeSlot})</span>
              </h3>
              <p className="text-xs text-slate-400">
                Freshly prepared across St. Peter's central food court & Block C tiffin counter.
              </p>
            </div>

            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="text-xs font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1"
            >
              <span>Sign In to Order</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {slotItems.map(item => (
              <div
                key={item.id}
                className="group glass-card rounded-2xl overflow-hidden border border-slate-800 hover:border-orange-500/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                    {/* Freshness Badge */}
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full glass-panel text-[10px] font-bold text-orange-300 border border-orange-500/30 flex items-center gap-1 shadow-md">
                      <Flame className="w-3 h-3 text-orange-400" />
                      <span>{item.freshnessBadge}</span>
                    </div>

                    <div className="absolute bottom-2.5 left-2.5 text-[10px] text-slate-300 font-semibold bg-slate-900/80 px-2 py-0.5 rounded backdrop-blur">
                      {item.counter}
                    </div>

                    <div className="absolute bottom-2.5 right-2.5 text-[10px] font-medium text-slate-300 bg-slate-900/80 px-2 py-0.5 rounded flex items-center gap-1 backdrop-blur">
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span>~{item.prepTimeMins}m</span>
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-bold text-slate-100 text-sm group-hover:text-orange-400 transition-colors">
                          {item.name}
                        </h4>
                        <div className="text-[11px] font-semibold text-orange-400/90 font-sans">
                          {item.teluguName}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-amber-400 font-bold shrink-0">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{item.rating}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {item.subtitle}
                    </p>

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

                <div className="p-4 pt-0">
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <div>
                      <div className="text-lg font-black text-white font-mono">
                        ₹{item.price}
                      </div>
                      <div className="text-[10px] text-emerald-400 font-semibold">
                        In Stock ({item.stockCount} left)
                      </div>
                    </div>

                    <button
                      onClick={() => setIsLoginModalOpen(true)}
                      className="px-3.5 py-1.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md shadow-orange-500/20 flex items-center gap-1.5 transition-all active:scale-95"
                    >
                      <span>Pre-Order</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* The Closed-Loop Workflow */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800 bg-slate-900/40">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">
              End-to-End Platform Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              The QueueLess Campus Closed Loop
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Connecting Students, Kitchen Staff, Food Kiosks, and College Leadership into one seamless technology ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-3 relative">
              <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-lg">
                1
              </div>
              <h3 className="font-bold text-white text-base">Crowd Visibility</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Check live canteen occupancy and AI forecast curves before stepping out of the lab or classroom.
              </p>
            </div>

            <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-3 relative">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-lg">
                2
              </div>
              <h3 className="font-bold text-white text-base">Pre-Booking</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Select your break slot (*12:15 PM* or *1:00 PM*) and pre-book with verified campus ID discount.
              </p>
            </div>

            <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-3 relative">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg">
                3
              </div>
              <h3 className="font-bold text-white text-base">Digital Token Pass</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Receive dynamic QR code pass with live 4-stage kitchen status: Placed ➔ Cooking ➔ Ready ➔ Collected.
              </p>
            </div>

            <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-3 relative">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-lg">
                4
              </div>
              <h3 className="font-bold text-white text-base">Faster Pickup & Feedback</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Scan token at optical reader, collect steaming hot food in seconds, rate meal, and earn XP rewards.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Student & Staff Reviews */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">
            Campus Voices
          </span>
          <h2 className="text-3xl font-black text-white">
            Loved by St. Peter's Students & Staff
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-3">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-300 italic leading-relaxed">
              "Biryani was steaming hot right at Counter 1! During 3rd year break, physical lines used to stretch out of Block A. Now with digital token #702, I picked up in under 60 seconds."
            </p>
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="font-bold text-white">Ravi Teja</span>
              <span className="text-slate-500 font-mono">21SPEC0452 • CSE</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-3">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-300 italic leading-relaxed">
              "Crispy MLA Pesarattu Upma with ginger chutney is my go-to at 9 AM. Pre-ordering from the hostel lets me grab breakfast right before digital electronics lecture."
            </p>
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="font-bold text-white">Swathi Reddy</span>
              <span className="text-slate-500 font-mono">22SPEC0811 • ECE</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-3">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-300 italic leading-relaxed">
              "As canteen staff, demand forecasting reduced our Biryani and Tiffin wastage by over 40 kgs daily! We know exactly how many plates to cook for 12:15 and 1:00 PM breaks."
            </p>
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="font-bold text-white">Ramu Anna</span>
              <span className="text-slate-500 font-mono">Food Court Supervisor</span>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-orange-500/40 text-center space-y-6 relative overflow-hidden glow-orange">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 mx-auto flex items-center justify-center shadow-lg shadow-orange-500/30">
            <Zap className="w-8 h-8 text-white stroke-[2.5]" />
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Ready to Experience QueueLess Dining?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
              Sign in with your official St. Peter's Engineering College ID and begin skipping campus queues today.
            </p>
          </div>

          <button
            onClick={() => setIsLoginModalOpen(true)}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-sm shadow-xl shadow-orange-500/30 inline-flex items-center gap-2 transition-all active:scale-95"
          >
            <ShieldCheck className="w-5 h-5 text-white" />
            <span>Sign In with College Email</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <p className="text-[10px] text-slate-500 font-mono">
            Exclusively for students, staff & administration of St. Peter's Engineering College
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950 py-8 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">QueueLess</span>
            <span>•</span>
            <span>St. Peter's Engineering College (SPEC), Maisammaguda, Hyderabad</span>
          </div>
          <div>
            Built with ❤️ for Campus Dining Excellence • Multi-Campus Architecture Ready
          </div>
        </div>
      </footer>

    </div>
  );
};
