import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  UtensilsCrossed, 
  Users, 
  ChefHat, 
  Building2, 
  QrCode, 
  ShoppingBag, 
  Bell, 
  Zap, 
  MapPin, 
  Flame, 
  ChevronDown, 
  Sparkles,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  LogOut,
  GraduationCap,
  ShieldCheck,
  Home
} from 'lucide-react';

export const Navbar = () => {
  const {
    currentUser,
    logout,
    role,
    setRole,
    campuses,
    selectedCampusId,
    setSelectedCampusId,
    cafeterias,
    selectedCafeteriaId,
    setSelectedCafeteriaId,
    selectedCafeteria,
    cart,
    setIsCartOpen,
    orders,
    setActiveTokenModalOrder,
    userProfile,
    notifications,
    dismissNotification,
    simulateRushHour,
    resetDemoData
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showCampusDropdown, setShowCampusDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  // Active uncollected tokens for student
  const activeTokens = orders.filter(
    o => o.status !== 'COLLECTED'
  );

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800 shadow-xl backdrop-blur-xl">
      {/* Top Banner: Campus & Simulation Toolbar */}
      <div className="bg-gradient-to-r from-orange-950/70 via-slate-900 to-slate-950 border-b border-orange-500/20 text-xs px-4 py-1.5 flex flex-wrap items-center justify-between gap-2 text-slate-300">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-slate-200">St. Peter's Engineering College (SPEC)</span>
          <span className="text-slate-500 hidden sm:inline">•</span>
          <span className="text-orange-400/90 font-medium hidden sm:inline">Smart Cafeteria Intelligence Platform</span>
        </div>

        {/* Demo Fast-Action Simulation Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={simulateRushHour}
            className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 border border-orange-500/30 transition-all font-medium text-[11px]"
            title="Simulate 1:00 PM Break Lunch Surge"
          >
            <Flame className="w-3 h-3 text-orange-400 animate-pulse" />
            <span>Simulate Lunch Rush</span>
          </button>

          <button
            onClick={resetDemoData}
            className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 border border-slate-700 transition-all text-[11px]"
            title="Reset mock data to pristine default"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Demo</span>
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo & Positioning */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/25 ring-1 ring-orange-400/30">
            <Zap className="w-6 h-6 text-white stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight text-white">
                Queue<span className="text-orange-500">Less</span>
              </span>
              <span className="hidden md:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-orange-500/10 text-orange-400 border border-orange-500/20 uppercase tracking-wider">
                SPEC Campus AI
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block leading-tight font-medium">
              Skip the Queue. Enjoy Your Food.
            </p>
          </div>
        </div>

        {/* Cafeteria Selector Dropdown */}
        <div className="hidden lg:flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setShowCampusDropdown(!showCampusDropdown)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 text-xs font-medium transition-all"
            >
              <MapPin className="w-3.5 h-3.5 text-orange-400" />
              <span className="truncate max-w-[170px]">{selectedCafeteria.name}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showCampusDropdown && (
              <div 
                className="absolute left-0 mt-2 w-72 glass-panel rounded-xl shadow-2xl border border-slate-700 py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                onClick={() => setShowCampusDropdown(false)}
              >
                <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                  Select Cafeteria / Kiosk
                </div>
                {cafeterias.map(caf => (
                  <button
                    key={caf.id}
                    onClick={() => setSelectedCafeteriaId(caf.id)}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-800/60 transition-colors ${
                      caf.id === selectedCafeteriaId ? 'bg-orange-500/10 text-orange-400 font-semibold' : 'text-slate-300'
                    }`}
                  >
                    <div>
                      <div className="font-medium text-slate-200">{caf.name}</div>
                      <div className="text-[10px] text-slate-400">{caf.location}</div>
                    </div>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                      caf.currentCrowdPercentage >= 75
                        ? 'bg-rose-500/20 text-rose-300'
                        : caf.currentCrowdPercentage >= 45
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'bg-emerald-500/20 text-emerald-300'
                    }`}>
                      {caf.avgWaitTimeMinutes}m wait
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Role Switcher Pills (Student / Staff / Admin) */}
        <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800 shadow-inner">
          <button
            onClick={() => setRole('student')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              role === 'student'
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Student</span>
          </button>

          <button
            onClick={() => setRole('staff')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              role === 'staff'
                ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <ChefHat className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Cafeteria</span> Staff
          </button>

          <button
            onClick={() => setRole('admin')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              role === 'admin'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">College</span> Admin
          </button>
        </div>

        {/* Right Controls: Notifications, Active Token Pass, Cart, User Profile & Logout */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Active Token Quick Pass Pill */}
          {activeTokens.length > 0 && (
            <button
              onClick={() => setActiveTokenModalOrder(activeTokens[0])}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-semibold animate-pulse-subtle transition-all"
              title="View your active digital token pass"
            >
              <QrCode className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Token:</span>
              <span className="font-mono font-bold">#{activeTokens[0].tokenId}</span>
              {activeTokens[0].status === 'READY_FOR_PICKUP' && (
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
              )}
            </button>
          )}

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 transition-all"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-orange-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 glass-panel rounded-xl shadow-2xl border border-slate-700 p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-xs font-bold text-slate-200">Campus Alerts & Updates</span>
                  <span className="text-[10px] text-slate-400">{notifications.length} new</span>
                </div>
                <div className="max-h-72 overflow-y-auto divide-y divide-slate-800/60 mt-1">
                  {notifications.length === 0 ? (
                    <div className="py-4 text-center text-xs text-slate-400">No new notifications</div>
                  ) : (
                    notifications.map(n => (
                      <div key={n.id} className="py-2.5 flex items-start justify-between gap-2">
                        <div>
                          <div className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                            {n.type === 'warning' ? (
                              <AlertTriangle className="w-3 h-3 text-amber-400 shrink-0" />
                            ) : (
                              <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                            )}
                            {n.title}
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">{n.message}</p>
                          <span className="text-[9px] text-slate-500">{n.time}</span>
                        </div>
                        <button
                          onClick={() => dismissNotification(n.id)}
                          className="text-slate-500 hover:text-slate-300 text-xs px-1"
                        >
                          ✕
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs shadow-md shadow-orange-500/20 transition-all active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Order</span>
            {cartItemCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-white text-orange-600 font-extrabold text-[10px]">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* User Profile & Sign Out Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className="flex items-center gap-2 p-1 pl-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all"
            >
              <img
                src={currentUser?.avatar || userProfile.avatar}
                alt={currentUser?.name || userProfile.name}
                className="w-7 h-7 rounded-full object-cover ring-1 ring-orange-500/50"
              />
              <div className="text-left hidden md:block pr-1">
                <div className="text-xs font-bold text-slate-200 truncate max-w-[100px]">
                  {(currentUser?.name || userProfile.name).split(' ')[0]}
                </div>
                <div className="text-[9px] text-orange-400 font-mono">
                  {currentUser?.rollNumber || userProfile.rollNumber}
                </div>
              </div>
              <ChevronDown className="w-3 h-3 text-slate-400 hidden sm:block" />
            </button>

            {showUserDropdown && (
              <div className="absolute right-0 mt-2 w-64 glass-panel rounded-2xl shadow-2xl border border-slate-700 p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="pb-2.5 border-b border-slate-800 space-y-0.5">
                  <div className="text-xs font-bold text-white">
                    {currentUser?.name || userProfile.name}
                  </div>
                  <div className="text-[10px] text-orange-400 font-mono truncate">
                    {currentUser?.email || '22spec0744@stpetershyd.com'}
                  </div>
                  <div className="text-[10px] text-slate-400 flex items-center gap-1 pt-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span>Verified SPEC ID</span>
                  </div>
                </div>

                <div className="py-2 border-b border-slate-800 text-xs text-slate-300 space-y-1 font-medium">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Department:</span>
                    <span>{currentUser?.department?.split(' ')[0] || 'CSE'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">XP Points:</span>
                    <span className="font-mono text-amber-400 font-bold">{userProfile.xp} XP</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setShowUserDropdown(false);
                      logout();
                    }}
                    className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 font-bold text-xs border border-rose-500/20 transition-all"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out to Landing Page</span>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};
