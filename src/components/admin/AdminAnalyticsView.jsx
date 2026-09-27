import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  TrendingUp, 
  Clock, 
  Trash2, 
  Smile, 
  Store, 
  Download, 
  Filter, 
  ArrowUpRight, 
  ArrowDownRight, 
  CheckCircle2, 
  Sparkles,
  PieChart as PieIcon,
  BarChart3,
  Calendar,
  Layers,
  ShieldCheck,
  Star
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  PieChart, 
  Pie, 
  Cell, 
  AreaChart, 
  Area 
} from 'recharts';
import { INSTITUTIONAL_ANALYTICS, RECENT_FEEDBACK } from '../../data/mockData';

export const AdminAnalyticsView = () => {
  const { feedbacks, campuses, selectedCampusId, setSelectedCampusId } = useApp();
  const [dateRange, setDateRange] = useState('Today');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const kpis = INSTITUTIONAL_ANALYTICS.kpis;
  const hourlyData = INSTITUTIONAL_ANALYTICS.hourlyComparison;
  const wastageData = INSTITUTIONAL_ANALYTICS.foodWastageWeekly;
  const vendorData = INSTITUTIONAL_ANALYTICS.vendorPerformance;
  const categoryData = INSTITUTIONAL_ANALYTICS.categoryShare;

  const handleExportReport = () => {
    setDownloadSuccess(true);
    // Simulate generation of campus report CSV
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Hour,Traditional_Wait_Mins,QueueLess_Wait_Mins,Footfall\n" +
      hourlyData.map(h => `${h.time},${h.traditionalWait},${h.queueLessWait},${h.studentCount}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `SPEC_Cafeteria_Analytics_Report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header and Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-400" />
              <span>Campus Cafeteria Intelligence Dashboard</span>
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40 font-bold">
              SPEC Administration
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time analytics on footfall, wait time reduction, vendor SLAs, and food wastage prevention for St. Peter's Engineering College.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Campus Selector for Future Expansion */}
          <select
            value={selectedCampusId}
            onChange={(e) => setSelectedCampusId(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500"
          >
            {campuses.map(c => (
              <option key={c.id} value={c.id}>
                {c.shortName}
              </option>
            ))}
          </select>

          {/* Export Report Button */}
          <button
            onClick={handleExportReport}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-600/20 transition-all active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Export Analytics (CSV)</span>
          </button>
        </div>
      </div>

      {downloadSuccess && (
        <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4" />
          <span>SPEC Institutional Cafeteria Report exported successfully!</span>
        </div>
      )}

      {/* 4 Executive KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Wait Time Reduction */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold uppercase tracking-wider">Avg Peak Wait Time</span>
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-white font-mono">{kpis.avgWaitTimeNow}</span>
            <span className="text-xs text-slate-500 line-through">was {kpis.avgWaitTimeBefore}</span>
          </div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-semibold">
            <ArrowDownRight className="w-3.5 h-3.5" />
            <span>-84% reduction during lunch breaks</span>
          </div>
        </div>

        {/* KPI 2: Food Wastage Saved */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold uppercase tracking-wider">Food Wastage Prevented</span>
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Trash2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-400 font-mono">
            {kpis.foodWastageReductionKg}
          </div>
          <div className="text-[11px] text-slate-400 font-medium">
            Saved by pre-order demand forecasting
          </div>
        </div>

        {/* KPI 3: Daily Campus Footfall */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold uppercase tracking-wider">Daily Student Footfall</span>
            <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white font-mono">
            {kpis.dailyFootfall.toLocaleString()}
          </div>
          <div className="text-[11px] text-blue-400 font-semibold flex items-center gap-1">
            <span>Across 4 campus outlets</span>
          </div>
        </div>

        {/* KPI 4: Student Satisfaction */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold uppercase tracking-wider">Student Satisfaction</span>
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
              <Smile className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-amber-400 font-mono">{kpis.studentSatisfactionIndex}</span>
            <span className="text-xs text-slate-500 font-mono">/ 5.0</span>
          </div>
          <div className="text-[11px] text-slate-400 flex items-center gap-1">
            <span>SLA Compliance: </span>
            <strong className="text-emerald-400">{kpis.orderFulfillmentSLA}</strong>
          </div>
        </div>
      </div>

      {/* Main Charts Row 1: Wait Time Hourly Curve + Weekly Wastage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Wait Time Comparison Across Break Hours */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-400" />
                <span>Peak-Hour Wait Time Impact (Minutes)</span>
              </h3>
              <p className="text-xs text-slate-400">
                Traditional Walk-in Queue vs QueueLess Digital Token Pickup
              </p>
            </div>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="time" stroke="#64748b" tick={{ fontSize: 10 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="traditionalWait" name="Traditional Queue Wait (mins)" fill="#ef4444" radius={[4, 4, 0, 0]} />
                <Bar dataKey="queueLessWait" name="QueueLess Token Wait (mins)" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Food Wastage Prevented Per Day */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Trash2 className="w-4 h-4 text-emerald-400" />
                <span>Campus Food Waste Reduction (Kg / Day)</span>
              </h3>
              <p className="text-xs text-slate-400">
                Over-preparation reduction achieved via advance pre-booking demand visibility.
              </p>
            </div>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={wastageData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="savedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#64748b" tick={{ fontSize: 10 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Area type="monotone" dataKey="savedKg" name="Food Saved (Kg)" stroke="#10b981" strokeWidth={2.5} fill="url(#savedGradient)" />
                <Line type="monotone" dataKey="wasteWithQueueLessKg" name="Actual Residual Waste (Kg)" stroke="#f59e0b" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Row 2: Vendor Performance Matrix + Category Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Vendor & Outlets Performance Table */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Store className="w-4 h-4 text-blue-400" />
              <span>Campus Vendor / Counter Operations SLA</span>
            </h3>
            <span className="text-xs text-slate-400">All 4 SPEC Food Kiosks</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/80 text-[10px] uppercase tracking-wider text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="py-2.5 px-3">Cafeteria / Outlet</th>
                  <th className="py-2.5 px-3">Shift Orders</th>
                  <th className="py-2.5 px-3">Revenue (₹)</th>
                  <th className="py-2.5 px-3">On-Time SLA</th>
                  <th className="py-2.5 px-3">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {vendorData.map((v, i) => (
                  <tr key={i} className="hover:bg-slate-900/50 transition-colors">
                    <td className="py-3 px-3 text-slate-200 font-semibold">{v.vendor}</td>
                    <td className="py-3 px-3 font-mono">{v.orders}</td>
                    <td className="py-3 px-3 font-mono font-bold text-orange-400">₹{v.revenue.toLocaleString()}</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                        {v.onTimeRate}
                      </span>
                    </td>
                    <td className="py-3 px-3 flex items-center gap-1 text-amber-400 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{v.avgRating}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Category Share Donut */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <PieIcon className="w-4 h-4 text-orange-400" />
              <span>Menu Category Share</span>
            </h3>
            <span className="text-[10px] text-slate-400">By Orders</span>
          </div>

          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1 text-xs">
            {categoryData.map((cat, i) => (
              <div key={i} className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.fill }} />
                  <span className="text-slate-300">{cat.name}</span>
                </div>
                <span className="font-mono font-semibold text-slate-200">{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Row 3: Live Student Feedback & Sentiment Analysis Stream */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>Real-Time Student Dining Feedback & Sentiment Stream</span>
            </h3>
            <p className="text-xs text-slate-400">
              Direct student ratings and token pickup reviews across St. Peter's Engineering College.
            </p>
          </div>
          <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
            96% Positive Sentiment
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {feedbacks.slice(0, 3).map(fb => (
            <div
              key={fb.id}
              className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-200">{fb.studentName} ({fb.dept})</span>
                  <div className="flex items-center text-amber-400 font-bold text-xs">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span className="ml-1">{fb.rating}.0</span>
                  </div>
                </div>
                <div className="text-[10px] text-orange-400 font-medium mt-0.5">
                  {fb.cafeteria} • {fb.item}
                </div>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed italic">
                  "{fb.comment}"
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-slate-800/80 text-[10px]">
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                  {fb.tag}
                </span>
                <span className="text-slate-500">{fb.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
