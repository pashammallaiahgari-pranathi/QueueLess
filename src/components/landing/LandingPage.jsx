import React, { useState, useEffect } from 'react';
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
  Award,
  Milk,
  Apple,
  Calculator,
  Volume2,
  ChevronRight,
  Eye,
  Check,
  Percent,
  Play
} from 'lucide-react';

export const LandingPage = () => {
  const { 
    setIsLoginModalOpen, 
    foodTimings, 
    menuItems, 
    cafeterias, 
    playSoundEffect,
    triggerConfetti 
  } = useApp();

  const [selectedTimingSlot, setSelectedTimingSlot] = useState('lunch');
  const [calculatorDays, setCalculatorDays] = useState(5);
  const [simulatedTokenStage, setSimulatedTokenStage] = useState(2); // 0: placed, 1: preparing, 2: ready, 3: collected

  // Live time tracker
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  // Filter items for the selected timing slot
  const slotItems = menuItems.filter(item => item.timeSlot === selectedTimingSlot);
  const activeSlotInfo = foodTimings.find(t => t.id === selectedTimingSlot) || foodTimings[1];

  // Calculator results
  const hoursSavedPerSemester = (calculatorDays * 22 * 16 / 60).toFixed(1); // 22 mins saved per day * 16 weeks / 60
  const xpPotential = calculatorDays * 45 * 16;
  const foodSavedKg = (calculatorDays * 0.25 * 16).toFixed(1);

  const stages = [
    { label: 'Order Placed', time: '11:15 AM' },
    { label: 'In Kitchen Cooking', time: '11:20 AM' },
    { label: 'Ready at Counter 1', time: '11:26 AM' },
    { label: 'Picked Up', time: '11:27 AM' }
  ];

  const handleNextDemoStage = () => {
    playSoundEffect('ready');
    setSimulatedTokenStage(prev => (prev + 1) % 4);
    if (simulatedTokenStage === 1) {
      triggerConfetti();
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-orange-500 selection:text-white relative overflow-x-hidden">
      
      {/* Dynamic Animated Glowing Backdrops */}
      <div className="absolute top-10 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-orange-600/20 to-amber-600/10 rounded-full blur-[150px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-[450px] right-10 w-[600px] h-[600px] bg-gradient-to-bl from-amber-500/15 via-orange-500/10 to-transparent rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-60 left-10 w-[550px] h-[550px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none animate-pulse-glow-purple" />

      {/* Top Live Canteen Timings Ticker Marquee */}
      <div className="bg-gradient-to-r from-orange-950 via-slate-950 to-amber-950 border-b border-orange-500/20 py-2.5 overflow-hidden text-[11px] font-semibold text-slate-300">
        <div className="animate-marquee flex items-center gap-12 whitespace-nowrap">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <strong className="text-orange-400 font-bold uppercase tracking-wider">Canteen Timings:</strong> 
            <span className="text-white">🌅 Morning Tiffins: 7:00 AM – 8:50 AM</span>
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-white">☀️ Afternoon Lunch & Biryani: 11:00 AM – 2:00 PM</span>
          <span className="text-slate-600">•</span>
          <span className="text-white">☕ Evening Canteen & Irani Chai: 3:30 PM – 6:00 PM</span>
          <span className="text-slate-600">•</span>
          <span className="text-purple-300 font-bold">🧃 Juice Point, Shakes & Fruit Bowls: Open All Day (7 AM – 6 PM)</span>
          <span className="text-slate-600">•</span>
          <span className="text-emerald-400 font-bold">⚡ St. Peter's Engineering College • Skip the queue with Digital Token</span>

          {/* Repeat */}
          <span className="flex items-center gap-2 ml-12">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <strong className="text-orange-400 font-bold uppercase tracking-wider">Canteen Timings:</strong> 
            <span className="text-white">🌅 Morning Tiffins: 7:00 AM – 8:50 AM</span>
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-white">☀️ Afternoon Lunch & Biryani: 11:00 AM – 2:00 PM</span>
          <span className="text-slate-600">•</span>
          <span className="text-white">☕ Evening Canteen & Irani Chai: 3:30 PM – 6:00 PM</span>
          <span className="text-slate-600">•</span>
          <span className="text-purple-300 font-bold">🧃 Juice Point, Shakes & Fruit Bowls: Open All Day (7 AM – 6 PM)</span>
        </div>
      </div>

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4 py-3">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-600 via-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/30 ring-2 ring-orange-400/40">
              <Zap className="w-7 h-7 text-white stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black tracking-tight text-white">
                  Queue<span className="text-orange-500">Less</span>
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-orange-500/20 text-orange-400 border border-orange-500/40 uppercase tracking-wider">
                  SPEC Hyderabad
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block font-medium">
                Smart Campus Cafeteria Intelligence Platform
              </p>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-300">
            <a href="#canteen-timings" className="hover:text-orange-400 transition-colors flex items-center gap-1.5">
              <span>Canteen Timings</span>
              <span className="px-1.5 py-0.2 rounded-full bg-orange-500/20 text-orange-400 text-[10px] font-bold">
                Telugu Menu
              </span>
            </a>
            <a href="#juice-point" className="hover:text-purple-400 transition-colors flex items-center gap-1.5">
              <span>Juice Point</span>
              <span className="px-1.5 py-0.2 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-bold">
                Fruits & Shakes
              </span>
            </a>
            <a href="#token-simulator" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
              <span>Live Token Pass</span>
              <span className="px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                Interactive
              </span>
            </a>
            <a href="#savings-calculator" className="hover:text-amber-400 transition-colors">
              Savings Calculator
            </a>
          </div>

          {/* College Sign In CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="relative group px-5 sm:px-6 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white font-black text-xs shadow-lg shadow-orange-500/30 flex items-center gap-2 transition-all active:scale-95 glow-orange"
            >
              <ShieldCheck className="w-4 h-4 text-white" />
              <span>College ID Login</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-10 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex flex-col items-center text-center">
        
        {/* Animated Campus Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 border border-orange-500/40 shadow-inner mb-6 animate-float-horizontal">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-semibold text-slate-200">
            St. Peter's Engineering College • Maisammaguda, Hyderabad
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-xs font-mono font-bold text-orange-400">
            Live Shift: {activeSlotInfo.englishTitle}
          </span>
        </div>

        {/* Big Punchy Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-4xl leading-[1.08]">
          Skip the Queue. <br />
          <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-rose-400 bg-clip-text text-transparent animate-gradient-flow">
            Enjoy Your Food.
          </span>
        </h1>

        <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl font-medium leading-relaxed">
          Know the crowd before stepping out. Pre-order authentic Telugu tiffins, steaming Hyderabadi Dum Biryani, and fresh cold-pressed juices with contactless digital tokens.
        </p>

        {/* Secondary Tagline Callout */}
        <div className="mt-3 px-4 py-1 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-300 text-xs font-semibold inline-flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-orange-400" />
          <span>Know the crowd • Predict demand • Book your meal • Pick it up faster</span>
        </div>

        {/* Hero Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={() => setIsLoginModalOpen(true)}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white font-black text-sm shadow-xl shadow-orange-500/30 flex items-center justify-center gap-2 transition-all active:scale-95 group glow-orange"
          >
            <span>Sign In with College Email ID</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </button>

          <a
            href="#canteen-timings"
            className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-sm flex items-center justify-center gap-2 transition-all"
          >
            <UtensilsCrossed className="w-4 h-4 text-orange-400" />
            <span>Explore Canteen Timings & Telugu Menu</span>
          </a>
        </div>

        {/* 4 Interactive Time Window Floating Badges */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-10 w-full max-w-5xl">
          
          <button
            onClick={() => {
              setSelectedTimingSlot('breakfast');
              document.getElementById('canteen-timings')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`p-3.5 rounded-2xl text-left border transition-all glass-card-hover ${
              selectedTimingSlot === 'breakfast'
                ? 'bg-slate-900 border-emerald-500/60 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500/40'
                : 'glass-panel border-emerald-500/20 hover:border-emerald-500/50'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-bold text-emerald-400">
              <span className="flex items-center gap-1.5">
                <Sunrise className="w-4 h-4" />
                <span>Morning Tiffins</span>
              </span>
              <span className="text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded-full font-mono">7:00-8:50 AM</span>
            </div>
            <div className="text-sm font-bold text-white mt-1">ఉదయం టిఫిన్లు</div>
            <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">Idli, Upma, Karam Dosa, Vada, Tea, Coffee, Boost</p>
          </button>

          <button
            onClick={() => {
              setSelectedTimingSlot('lunch');
              document.getElementById('canteen-timings')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`p-3.5 rounded-2xl text-left border transition-all glass-card-hover ${
              selectedTimingSlot === 'lunch'
                ? 'bg-slate-900 border-orange-500/60 shadow-lg shadow-orange-500/10 ring-1 ring-orange-500/40'
                : 'glass-panel border-orange-500/20 hover:border-orange-500/50'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-bold text-orange-400">
              <span className="flex items-center gap-1.5">
                <Sun className="w-4 h-4" />
                <span>Afternoon Lunch</span>
              </span>
              <span className="text-[10px] bg-orange-500/20 px-2 py-0.5 rounded-full font-mono">11 AM-2 PM</span>
            </div>
            <div className="text-sm font-bold text-white mt-1">మధ్యాహ్నం భోజనం</div>
            <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">SPEC Chicken Dum Biryani, Kodi Pulao, Andhra Meals</p>
          </button>

          <button
            onClick={() => {
              setSelectedTimingSlot('snacks');
              document.getElementById('canteen-timings')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`p-3.5 rounded-2xl text-left border transition-all glass-card-hover ${
              selectedTimingSlot === 'snacks'
                ? 'bg-slate-900 border-amber-500/60 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/40'
                : 'glass-panel border-amber-500/20 hover:border-amber-500/50'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-bold text-amber-400">
              <span className="flex items-center gap-1.5">
                <Coffee className="w-4 h-4" />
                <span>Evening Canteen</span>
              </span>
              <span className="text-[10px] bg-amber-500/20 px-2 py-0.5 rounded-full font-mono">3:30-6:00 PM</span>
            </div>
            <div className="text-sm font-bold text-white mt-1">సాయంత్రం స్నాక్స్</div>
            <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">Irani Chai + 4 Osmania @ ₹25, Cut Mirchi, Pakodi</p>
          </button>

          <button
            onClick={() => {
              setSelectedTimingSlot('juice_point');
              document.getElementById('canteen-timings')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`p-3.5 rounded-2xl text-left border transition-all glass-card-hover ${
              selectedTimingSlot === 'juice_point'
                ? 'bg-slate-900 border-purple-500/60 shadow-lg shadow-purple-500/10 ring-1 ring-purple-500/40'
                : 'glass-panel border-purple-500/20 hover:border-purple-500/50'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-bold text-purple-400">
              <span className="flex items-center gap-1.5">
                <Milk className="w-4 h-4" />
                <span>Juice Point</span>
              </span>
              <span className="text-[10px] bg-purple-500/20 px-2 py-0.5 rounded-full font-mono">All Day</span>
            </div>
            <div className="text-sm font-bold text-white mt-1">జ్యూస్ పాయింట్</div>
            <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">Belgian Chocolate Shake, Sugarcane & Fruit Salads</p>
          </button>

        </div>

        {/* Visual Hero Mockup */}
        <div className="w-full relative mt-12 max-w-5xl">
          
          <div className="relative glass-card rounded-3xl p-6 sm:p-8 border border-slate-700/80 shadow-2xl overflow-hidden glow-orange">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-left">
              
              {/* Digital Pass Card */}
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
                  1x SPEC Hyderabadi Dum Biryani
                </div>
                <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-[10px] text-slate-400">
                  <span>Physical Wait: 0 mins</span>
                  <span className="text-emerald-400 font-bold">Contactless Scan</span>
                </div>
              </div>

              {/* Live Crowd Sensor */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Live Campus Sensor
                  </span>
                  <Radio className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-amber-400 font-mono">68%</span>
                  <span className="text-xs text-slate-400">Moderate Break Traffic</span>
                </div>
                <p className="text-xs text-slate-300">
                  Block A Canteen queue: ~12m walk-in. QueueLess token saves ~22 mins!
                </p>
                <div className="pt-2 border-t border-slate-800 flex items-center gap-1.5 text-[10px] text-emerald-400 font-medium">
                  <Sparkles className="w-3 h-3" />
                  <span>AI Predictive Accuracy 94.6%</span>
                </div>
              </div>

              {/* Zero Food Waste Saved */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Zero Food Wastage
                  </span>
                  <Award className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div className="text-3xl font-black text-emerald-400 font-mono">42.8 kg / day</div>
                <p className="text-xs text-slate-300">
                  Food saved from wastage by advance kitchen pre-booking demand visibility.
                </p>
                <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-400">
                  St. Peter's Green Campus Initiative
                </div>
              </div>

            </div>
          </div>

          {/* Floating Badges */}
          <div className="hidden lg:block absolute -top-6 -left-6 glass-panel px-4 py-2.5 rounded-2xl border border-orange-500/40 text-xs font-bold text-white shadow-xl animate-float-slow">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🍛</span>
              <div>
                <div>SPEC Chicken Dum Biryani</div>
                <div className="text-[10px] text-orange-400 font-normal">Mirchi Ka Salan & Dahi Raita</div>
              </div>
            </div>
          </div>

          <div className="hidden lg:block absolute -bottom-6 -right-6 glass-panel px-4 py-2.5 rounded-2xl border border-purple-500/40 text-xs font-bold text-white shadow-xl animate-float-reverse">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🧃</span>
              <div>
                <div>Belgian Chocolate & Honey Fruits</div>
                <div className="text-[10px] text-purple-400 font-normal">Juice Point Open All Day</div>
              </div>
            </div>
          </div>

        </div>

      </section>

      {/* Live Campus Radar Strip */}
      <section className="border-y border-slate-800/80 bg-slate-900/50 py-12 px-4 sm:px-6 lg:px-8">
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
              <div className="text-3xl sm:text-4xl font-black text-purple-400 font-mono">4.9 / 5.0</div>
              <div className="text-xs font-semibold text-slate-300">Student Satisfaction</div>
              <p className="text-[11px] text-slate-500">Over 1,280 verified student reviews</p>
            </div>

          </div>
        </div>
      </section>

      {/* Canteen Timings & Telugu Menu Showcase */}
      <section id="canteen-timings" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-10">
        
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/15 text-orange-400 text-xs font-bold border border-orange-500/30">
            <UtensilsCrossed className="w-3.5 h-3.5" />
            <span>Campus Dining Schedule & Telugu Specialties</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Official Canteen Timings & Food Menu
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Select a meal time slot below to explore the freshly prepared items with authentic Telugu recipes.
          </p>
        </div>

        {/* 4 Interactive Time Slot Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {foodTimings.map(slot => {
            const isSelected = selectedTimingSlot === slot.id;
            return (
              <button
                key={slot.id}
                onClick={() => {
                  playSoundEffect('tap');
                  setSelectedTimingSlot(slot.id);
                }}
                className={`p-5 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden glass-card-hover ${
                  isSelected
                    ? slot.id === 'juice_point'
                      ? 'glass-card border-purple-500/70 shadow-xl shadow-purple-500/20 ring-2 ring-purple-500/50'
                      : 'glass-card border-orange-500/70 shadow-xl shadow-orange-500/20 ring-2 ring-orange-500/50'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{slot.icon}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    slot.id === 'juice_point'
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                      : slot.id === 'breakfast'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : slot.id === 'lunch'
                      ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  }`}>
                    {slot.timeSlot}
                  </span>
                </div>

                <div className="mt-3">
                  <h3 className="text-sm font-bold text-white">
                    {slot.teluguTitle}
                  </h3>
                  <div className="text-xs font-semibold text-slate-300 mt-0.5">
                    {slot.englishTitle}
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                  {slot.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Selected Slot Items Grid */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <span>{activeSlotInfo.teluguTitle}</span>
                <span className="text-xs text-orange-400 font-mono font-normal">({activeSlotInfo.timeSlot})</span>
              </h3>
              <p className="text-xs text-slate-400">
                Freshly cooked on order across St. Peter's Engineering College canteens.
              </p>
            </div>

            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="text-xs font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1"
            >
              <span>Sign In with College Email to Pre-Order</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {slotItems.map(item => (
              <div
                key={item.id}
                className="group glass-card rounded-2xl overflow-hidden border border-slate-800 hover:border-orange-500/40 transition-all duration-300 flex flex-col justify-between glass-card-hover"
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden bg-slate-900">
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
                      {item.timingBadge || item.counter}
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
                        {item.teluguName && (
                          <div className="text-[11px] font-semibold text-orange-400/90 font-sans mt-0.5">
                            {item.teluguName}
                          </div>
                        )}
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

      {/* Interactive Live Digital Token Pass Simulator */}
      <section id="token-simulator" className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-emerald-500/40 relative overflow-hidden glow-emerald">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold mb-2">
                <QrCode className="w-3.5 h-3.5" />
                <span>Interactive Feature Demo: Digital Token Pass</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                How Your Food Pickup Pass Works
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Tap the simulate button to test how student tokens advance in real-time from Kitchen to Counter Ready!
              </p>
            </div>

            <button
              onClick={handleNextDemoStage}
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs shadow-lg shadow-emerald-500/30 flex items-center gap-2 transition-all active:scale-95 shrink-0"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Simulate Next Kitchen Stage</span>
            </button>
          </div>

          {/* Interactive Token Live Card */}
          <div className="mt-8 max-w-lg mx-auto bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-bold text-orange-400 uppercase tracking-widest">
                  St. Peter's Digital Meal Pass
                </span>
                <div className="text-2xl font-black font-mono text-white">#SPEC-702</div>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-slate-200">Central Food Court</span>
                <div className="text-[10px] text-orange-400">Counter 1 (Biryani Hub)</div>
              </div>
            </div>

            {/* Stage Stepper */}
            <div className="my-5">
              <div className="flex justify-between relative">
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-800 -translate-y-1/2 z-0" />
                <div 
                  className="absolute top-1/2 left-0 h-1 bg-emerald-500 -translate-y-1/2 z-0 transition-all duration-500" 
                  style={{ width: `${(simulatedTokenStage / (stages.length - 1)) * 100}%` }}
                />

                {stages.map((st, i) => (
                  <div key={i} className="relative z-10 flex flex-col items-center">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                      i === simulatedTokenStage
                        ? 'bg-emerald-500 text-white ring-4 ring-emerald-500/20 scale-110'
                        : i < simulatedTokenStage
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-800 text-slate-500'
                    }`}>
                      {i < simulatedTokenStage ? '✓' : i + 1}
                    </div>
                    <span className={`text-[9px] mt-1 text-center font-semibold max-w-[65px] ${
                      i === simulatedTokenStage ? 'text-emerald-400' : 'text-slate-400'
                    }`}>
                      {st.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Dynamic Status Callout */}
            <div className={`p-3 rounded-2xl text-center text-xs font-bold transition-all ${
              simulatedTokenStage === 2
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 animate-pulse'
                : simulatedTokenStage === 1
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : simulatedTokenStage === 3
                ? 'bg-slate-800 text-slate-300'
                : 'bg-blue-500/20 text-blue-300'
            }`}>
              {simulatedTokenStage === 0 && '📥 Order Received in Kitchen Queue'}
              {simulatedTokenStage === 1 && '🍳 Chef is Cooking Your Dum Biryani on Live Tawa'}
              {simulatedTokenStage === 2 && '🔔 READY AT COUNTER 1! Scan QR Code to Collect'}
              {simulatedTokenStage === 3 && '✅ Meal Handed Over & Enjoyed! +45 XP Earned'}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400">
              <span>Item: <strong>1x Chicken Dum Biryani</strong></span>
              <span className="font-mono text-emerald-400 font-bold">Total: ₹130</span>
            </div>
          </div>
        </div>
      </section>

      {/* Break Savings Calculator */}
      <section id="savings-calculator" className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-amber-500/30 relative overflow-hidden">
          <div className="max-w-2xl mx-auto text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold">
              <Calculator className="w-3.5 h-3.5" />
              <span>Campus Time & Productivity Calculator</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              How Much Break Time Will You Save at St. Peter's?
            </h3>
            <p className="text-xs text-slate-400">
              Adjust the slider to see how pre-booking with QueueLess reclaims your college semester.
            </p>

            <div className="pt-6 space-y-4">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-300">Days per week eating at campus canteen:</span>
                <span className="text-amber-400 font-mono text-base">{calculatorDays} Days / Week</span>
              </div>
              <input
                type="range"
                min="1"
                max="6"
                value={calculatorDays}
                onChange={(e) => setCalculatorDays(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center">
                <div className="text-xs text-slate-400 font-medium">Queue Time Saved</div>
                <div className="text-2xl font-black text-orange-400 font-mono mt-1">
                  {hoursSavedPerSemester} Hours
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">Per 16-Week Semester</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center">
                <div className="text-xs text-slate-400 font-medium">Gamification Points</div>
                <div className="text-2xl font-black text-amber-400 font-mono mt-1">
                  +{xpPotential} XP
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">Level Up to Queue Master</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center">
                <div className="text-xs text-slate-400 font-medium">Food Wastage Prevented</div>
                <div className="text-2xl font-black text-emerald-400 font-mono mt-1">
                  {foodSavedKg} kg
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">By Demand Visibility</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* The Closed-Loop Workflow */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-800 bg-slate-900/40">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">
              End-to-End Technology Pipeline
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              The QueueLess Campus Closed Loop
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Connecting Students, Kitchen Staff, Food Kiosks, and College Leadership into one seamless technology ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-3 relative glass-card-hover">
              <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-lg">
                1
              </div>
              <h3 className="font-bold text-white text-base">Crowd Visibility</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Check live canteen occupancy and AI forecast curves before stepping out of the lab or classroom.
              </p>
            </div>

            <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-3 relative glass-card-hover">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-lg">
                2
              </div>
              <h3 className="font-bold text-white text-base">Pre-Booking</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Select your break slot (*Morning 7:00-8:50 AM*, *Lunch 11 AM-2 PM*, *Evening 3:30-6 PM*) and pre-book.
              </p>
            </div>

            <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-3 relative glass-card-hover">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg">
                3
              </div>
              <h3 className="font-bold text-white text-base">Digital Token Pass</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Receive dynamic QR code pass with live 4-stage kitchen status: Placed ➔ Cooking ➔ Ready ➔ Collected.
              </p>
            </div>

            <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-3 relative glass-card-hover">
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-10">
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
              "During 12:30 PM lunch break, physical lines used to stretch out of Block A. Now with digital token #702, I picked up my Chicken Dum Biryani in under 60 seconds!"
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
              "Morning 7:45 AM Rayalaseema Karam Dosa + Filter Coffee combo is pure fire. I pre-order from the college bus and collect right when I enter campus."
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
              "Demand forecasting helped our kitchen cut food wastage by 42 kgs daily. We know exactly how many Dum Biryanis and Dosa batches are needed for each shift."
            </p>
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="font-bold text-white">Ramu Anna</span>
              <span className="text-slate-500 font-mono">Canteen Supervisor</span>
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
              Sign in with your official St. Peter's Engineering College ID and skip physical cafeteria queues today.
            </p>
          </div>

          <button
            onClick={() => setIsLoginModalOpen(true)}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-sm shadow-xl shadow-orange-500/30 inline-flex items-center gap-2 transition-all active:scale-95"
          >
            <ShieldCheck className="w-5 h-5 text-white" />
            <span>Sign In with College Email</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <p className="text-[10px] text-slate-500 font-mono">
            Exclusively for students, staff & administration of St. Peter's Engineering College (@stpetershyd.com or @spec.edu.in)
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
