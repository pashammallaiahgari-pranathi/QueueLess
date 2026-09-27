import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { LandingPage } from './components/landing/LandingPage';
import { LoginModal } from './components/auth/LoginModal';
import { Navbar } from './components/common/Navbar';
import { StudentView } from './components/student/StudentView';
import { StaffView } from './components/staff/StaffView';
import { AdminAnalyticsView } from './components/admin/AdminAnalyticsView';
import { DigitalTokenModal } from './components/student/DigitalTokenModal';
import { CartDrawer } from './components/student/CartDrawer';
import { 
  Zap, 
  MapPin, 
  ShieldCheck, 
  TrendingUp, 
  Clock, 
  Heart,
  QrCode,
  Flame,
  Award
} from 'lucide-react';

const AppContent = () => {
  const { isAuthenticated, role, activeTokenModalOrder } = useApp();

  // If not logged in, render the animated Landing Page first!
  if (!isAuthenticated) {
    return (
      <>
        <LandingPage />
        <LoginModal />
      </>
    );
  }

  // Once authenticated with College Email ID, render full platform experience
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      {/* Top Authenticated Navigation */}
      <Navbar />

      {/* Main Role-Specific Workspace Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {role === 'student' && <StudentView />}
        {role === 'staff' && <StaffView />}
        {role === 'admin' && <AdminAnalyticsView />}
      </main>

      {/* Global Interactive Overlays */}
      <DigitalTokenModal />
      <CartDrawer />
      <LoginModal />

      {/* Institutional Platform Footer */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950/80 backdrop-blur text-xs text-slate-400 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="text-sm font-extrabold text-white">
                Queue<span className="text-orange-500">Less</span>
              </span>
              <span className="text-slate-600">•</span>
              <span className="font-semibold text-slate-300">St. Peter's Engineering College</span>
            </div>
            <p className="text-[11px] text-slate-500">
              Skip the Queue. Enjoy Your Food. • Smart Campus Cafeteria Intelligence Platform
            </p>
            <p className="text-[10px] text-slate-600 font-mono">
              Product Loop: Crowd Visibility → Demand Prediction → Menu Discovery → Pre-Booking → Digital Token → Faster Pickup → Feedback → Analytics
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-400 font-medium">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Multi-Campus Architecture</span>
            </span>
            <span className="flex items-center gap-1">
              <QrCode className="w-3.5 h-3.5 text-orange-400" />
              <span>Contactless Optical Tokens</span>
            </span>
            <span className="flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Zero Food Waste AI</span>
            </span>
          </div>

          <div className="text-center md:text-right text-[11px] text-slate-500">
            <div>SPEC Maisammaguda, Hyderabad</div>
            <div className="text-[10px] text-slate-600">Built for Students, Cafeteria Operators & Campus Leadership</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export const App = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
