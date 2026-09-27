import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Lock, 
  Mail, 
  ShieldCheck, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight,
  GraduationCap,
  ChefHat,
  Building2,
  Zap
} from 'lucide-react';

export const LoginModal = () => {
  const { 
    isLoginModalOpen, 
    setIsLoginModalOpen, 
    loginWithCollegeEmail,
    demoAccounts 
  } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('••••••••');
  const [selectedRole, setSelectedRole] = useState('student');
  const [errorMessage, setErrorMessage] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  if (!isLoginModalOpen) return null;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    const res = loginWithCollegeEmail(email, password, selectedRole);
    if (!res.success) {
      setErrorMessage(res.message);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 600);
    }
  };

  const handleQuickDemoFill = (acc) => {
    setEmail(acc.email);
    setSelectedRole(acc.role);
    setErrorMessage('');
    const res = loginWithCollegeEmail(acc.email, 'password123', acc.role);
    if (!res.success) {
      setErrorMessage(res.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className={`w-full max-w-md glass-card rounded-3xl border border-slate-700/80 shadow-2xl relative overflow-hidden p-6 sm:p-7 ${
          isShaking ? 'animate-shake ring-2 ring-rose-500' : ''
        }`}
      >
        {/* Glow backdrop decoration */}
        <div className="absolute -top-20 -right-20 w-52 h-52 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-52 h-52 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => setIsLoginModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-1.5 pb-4 border-b border-slate-800">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center shadow-lg shadow-orange-500/30">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>

          <h3 className="text-xl font-extrabold text-white tracking-tight">
            SPEC Campus Authentication
          </h3>
          <p className="text-xs text-slate-400">
            Official St. Peter's Engineering College Identity Verification
          </p>

          <div className="pt-1 flex items-center justify-center gap-1.5 text-[11px] text-orange-400 font-mono font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
            <span>Requires: @stpetershyd.com or @spec.edu.in</span>
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="my-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-medium flex items-start gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span className="leading-snug">{errorMessage}</span>
          </div>
        )}

        {/* Quick Demo Credentials Bar */}
        <div className="my-4 space-y-1.5">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>⚡ 1-Click College Demo Sign-In:</span>
            <span className="text-emerald-400 font-mono text-[10px]">Instant Pass</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {demoAccounts.map(acc => (
              <button
                key={acc.role}
                type="button"
                onClick={() => handleQuickDemoFill(acc)}
                className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-orange-500/60 text-left transition-all group"
              >
                <div className="flex items-center gap-1 text-[11px] font-bold text-slate-200 group-hover:text-orange-400">
                  {acc.role === 'student' && <GraduationCap className="w-3 h-3 text-orange-400" />}
                  {acc.role === 'staff' && <ChefHat className="w-3 h-3 text-amber-400" />}
                  {acc.role === 'admin' && <Building2 className="w-3 h-3 text-blue-400" />}
                  <span className="capitalize">{acc.role}</span>
                </div>
                <div className="text-[9px] text-slate-400 truncate font-mono mt-0.5">
                  {acc.email.split('@')[0]}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Login Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
              <span>Official College Email ID:</span>
              <span className="text-[10px] text-slate-500">e.g. rollnumber@stpetershyd.com</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="22spec0744@stpetershyd.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 font-mono transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">
              Campus Portal Password:
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 font-mono transition-all"
              />
            </div>
          </div>

          {/* Role selector if using custom email */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">
              Select Operating Role:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'student', label: 'Student' },
                { id: 'staff', label: 'Cafeteria Staff' },
                { id: 'admin', label: 'Admin' }
              ].map(r => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setSelectedRole(r.id)}
                  className={`py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                    selectedRole === r.id
                      ? 'bg-orange-500/20 text-orange-300 border-orange-500/50 shadow-sm'
                      : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-sm shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 active:scale-98 transition-all"
          >
            <span>Verify & Enter QueueLess</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-[10px] text-slate-500">
            Protected by St. Peter's Engineering College Single Sign-On (SSO) Protocol
          </p>
        </div>

      </div>
    </div>
  );
};
