import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Trophy, 
  Sparkles, 
  Flame, 
  Award, 
  Zap, 
  HelpCircle, 
  Gift, 
  CheckCircle2, 
  Clock, 
  RotateCw,
  Share2
} from 'lucide-react';
import { LEADERBOARD_DATA } from '../../data/mockData';

export const GamificationRewards = () => {
  const { userProfile, addXP, triggerConfetti, playSoundEffect } = useApp();

  // Mini-Game 1: Spin to Win state
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinReward, setSpinReward] = useState(null);
  const [hasSpun, setHasSpun] = useState(false);

  // Mini-Game 2: Food Trivia state
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [quizSelectedOption, setQuizSelectedOption] = useState(null);
  const [quizCorrect, setQuizCorrect] = useState(false);

  const spinRewardsList = [
    { label: '+50 Bonus XP', xp: 50, type: 'xp' },
    { label: 'Free Masala Chai Coupon', xp: 20, type: 'coupon' },
    { label: '₹15 Off Biryani Voucher', xp: 35, type: 'coupon' },
    { label: '+100 Mega XP Booster', xp: 100, type: 'xp' },
    { label: 'Priority Express Pass', xp: 40, type: 'pass' }
  ];

  const handleSpinWheel = () => {
    if (isSpinning || hasSpun) return;
    setIsSpinning(true);
    playSoundEffect('tap');

    setTimeout(() => {
      const selected = spinRewardsList[Math.floor(Math.random() * spinRewardsList.length)];
      setSpinReward(selected);
      setIsSpinning(false);
      setHasSpun(true);
      addXP(selected.xp, `Spin-to-Win daily reward: ${selected.label}`);
      triggerConfetti();
    }, 2000);
  };

  const handleQuizAnswer = (index) => {
    if (quizAnswered) return;
    setQuizSelectedOption(index);
    setQuizAnswered(true);
    // Correct is index 1 ("Zero queue time & guaranteed hot batch")
    if (index === 1) {
      setQuizCorrect(true);
      addXP(30, 'Correct Answer on Campus Cafeteria Trivia');
      triggerConfetti();
    } else {
      setQuizCorrect(false);
      playSoundEffect('tap');
    }
  };

  const xpPercent = Math.min(100, Math.round((userProfile.xp / userProfile.xpToNextLevel) * 100));

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span>Student Rewards & Gamification</span>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>XP Engine Active</span>
          </span>
        </h2>
        <p className="text-xs text-slate-400">
          Earn XP by pre-ordering off-peak, picking up promptly, rating meals, and saving campus food wastage.
        </p>
      </div>

      {/* Profile Tier & Stats Card */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-orange-500/10 via-amber-500/5 to-transparent rounded-full blur-2xl pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
          {/* User info & Level */}
          <div className="md:col-span-2 flex items-center gap-4">
            <div className="relative shrink-0">
              <img
                src={userProfile.avatar}
                alt={userProfile.name}
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-orange-500/60 shadow-lg"
              />
              <div className="absolute -bottom-1.5 -right-1.5 px-1.5 py-0.5 rounded-md bg-gradient-to-r from-orange-500 to-amber-500 text-white font-extrabold text-[10px] shadow">
                LVL {userProfile.level}
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">{userProfile.name}</h3>
                <span className="text-[11px] font-mono text-slate-400">({userProfile.rollNumber})</span>
              </div>
              <div className="text-xs font-semibold text-orange-400 flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5" />
                <span>{userProfile.levelTitle}</span>
              </div>
              <div className="text-[11px] text-slate-400">
                {userProfile.department}
              </div>
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="md:col-span-2 space-y-2 bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-300">Level {userProfile.level} Progress</span>
              <span className="text-amber-400 font-mono">
                {userProfile.xp} / {userProfile.xpToNextLevel} XP
              </span>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden relative">
              <div
                className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full transition-all duration-700 shadow-md"
                style={{ width: `${xpPercent}%` }}
              />
            </div>
            <div className="text-[10px] text-slate-400 flex justify-between">
              <span>{userProfile.xpToNextLevel - userProfile.xp} XP to Level {userProfile.level + 1}</span>
              <span className="text-emerald-400 font-medium">{xpPercent}% complete</span>
            </div>
          </div>
        </div>

        {/* 4 Lifetime Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800">
          <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/60 text-center">
            <div className="text-xs text-slate-400">Queue Time Saved</div>
            <div className="text-lg font-black text-white font-mono mt-0.5 flex items-center justify-center gap-1">
              <Clock className="w-4 h-4 text-orange-400" />
              <span>{userProfile.totalSavedMinutes} mins</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/60 text-center">
            <div className="text-xs text-slate-400">Meals Pre-booked</div>
            <div className="text-lg font-black text-white font-mono mt-0.5 flex items-center justify-center gap-1">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>{userProfile.mealsPrebooked}</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/60 text-center">
            <div className="text-xs text-slate-400">Punctual Streak</div>
            <div className="text-lg font-black text-white font-mono mt-0.5 flex items-center justify-center gap-1">
              <Flame className="w-4 h-4 text-rose-500" />
              <span>{userProfile.streakDays} Days</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/60 text-center">
            <div className="text-xs text-slate-400">Zero-Waste Score</div>
            <div className="text-lg font-black text-emerald-400 font-mono mt-0.5">
              {userProfile.foodWastageScore}
            </div>
          </div>
        </div>
      </div>

      {/* Mini-Games Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Game 1: Spin to Win */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-white text-base">Daily Cafeteria Spin-to-Win</h3>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 font-bold">
                1 Spin / Day
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Spin the lucky cafeteria wheel to win bonus XP, tea vouchers, or fast-track counter passes!
            </p>
          </div>

          {/* Interactive Wheel Graphic */}
          <div className="flex flex-col items-center justify-center py-4">
            <div className={`w-36 h-36 rounded-full border-4 border-orange-500/60 bg-gradient-to-tr from-amber-600 via-orange-500 to-rose-500 flex items-center justify-center shadow-xl shadow-orange-500/20 relative transition-transform duration-1000 ${
              isSpinning ? 'animate-spin' : ''
            }`}>
              <div className="w-24 h-24 rounded-full bg-slate-900 flex flex-col items-center justify-center text-center p-2">
                <span className="text-2xl">🎡</span>
                <span className="text-[10px] font-extrabold text-orange-400 mt-0.5 uppercase">
                  {isSpinning ? 'Spinning...' : 'SPEC Wheel'}
                </span>
              </div>
              {/* Pointer */}
              <div className="absolute -top-3 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-12 border-b-white" />
            </div>

            {spinReward && (
              <div className="mt-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold text-center animate-in zoom-in-95">
                🎉 Won: {spinReward.label}! (+{spinReward.xp} XP added)
              </div>
            )}
          </div>

          <button
            onClick={handleSpinWheel}
            disabled={isSpinning || hasSpun}
            className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
              hasSpun
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-md shadow-orange-500/20 active:scale-98'
            }`}
          >
            <RotateCw className={`w-4 h-4 ${isSpinning ? 'animate-spin' : ''}`} />
            <span>{hasSpun ? 'Spun for Today • Come Back Tomorrow' : 'Spin the Wheel Now'}</span>
          </button>
        </div>

        {/* Game 2: Food & Campus Trivia */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-orange-400" />
                <h3 className="font-bold text-white text-base">Daily Smart Campus Trivia</h3>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold">
                +30 XP Quiz
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Answer today's cafeteria question correctly to boost your foodie rank.
            </p>
          </div>

          {/* Question Box */}
          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-semibold text-slate-200">
              Q: What is the main benefit of pre-booking your break meal on QueueLess?
            </div>

            <div className="space-y-2">
              {[
                'You have to wait in line with cash',
                'Zero queue time & guaranteed hot batch waiting at Counter',
                'Food is only served after college closes'
              ].map((option, idx) => {
                const isSelected = quizSelectedOption === idx;
                const isThisCorrect = idx === 1;

                let btnClass = 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800';
                if (quizAnswered) {
                  if (isThisCorrect) btnClass = 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300';
                  else if (isSelected) btnClass = 'bg-rose-500/20 border-rose-500/50 text-rose-300';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleQuizAnswer(idx)}
                    disabled={quizAnswered}
                    className={`w-full text-left p-2.5 rounded-xl border text-xs font-medium transition-all ${btnClass}`}
                  >
                    <span className="font-mono text-slate-400 mr-2">{String.fromCharCode(65 + idx)}.</span>
                    {option}
                  </button>
                );
              })}
            </div>

            {quizAnswered && (
              <div className={`p-2.5 rounded-xl text-xs font-bold ${
                quizCorrect ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
              }`}>
                {quizCorrect ? '🎯 Correct! +30 XP awarded to your profile.' : '❌ Not quite! Pre-booking gives you 0 wait time at the counter.'}
              </div>
            )}
          </div>

          <div className="text-[11px] text-slate-500 text-center">
            New trivia question unlocked every weekday at 08:00 AM.
          </div>
        </div>

      </div>

      {/* Badges Showcase */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-orange-400" />
            <h3 className="font-bold text-white text-base">Your Badges & Achievements</h3>
          </div>
          <span className="text-xs text-slate-400">
            {userProfile.badges.filter(b => b.unlocked).length} of {userProfile.badges.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {userProfile.badges.map(b => (
            <div
              key={b.id}
              className={`p-3.5 rounded-xl border text-center space-y-1.5 transition-all ${
                b.unlocked
                  ? 'bg-slate-900/80 border-slate-700/80 hover:border-orange-500/50'
                  : 'bg-slate-950/40 border-slate-900 opacity-50'
              }`}
            >
              <div className="text-2xl">{b.icon}</div>
              <div className="text-xs font-bold text-slate-200 leading-tight">{b.name}</div>
              <p className="text-[10px] text-slate-400 line-clamp-2">{b.desc}</p>
              <div className="pt-1">
                {b.unlocked ? (
                  <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider">
                    Unlocked
                  </span>
                ) : (
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">
                    Locked
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Campus Leaderboard */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-white text-base">St. Peter's Campus Leaderboard</h3>
          </div>
          <span className="text-xs text-slate-400">Weekly Punctual & Zero-Waste Pickers</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3">Rank</th>
                <th className="py-2.5 px-3">Student Name</th>
                <th className="py-2.5 px-3">Dept</th>
                <th className="py-2.5 px-3">XP Points</th>
                <th className="py-2.5 px-3">Wait Saved</th>
                <th className="py-2.5 px-3">Badge Honor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {LEADERBOARD_DATA.map(user => {
                const isUser = user.name.includes('(You)');
                return (
                  <tr
                    key={user.rank}
                    className={`transition-colors ${
                      isUser ? 'bg-orange-500/10 text-orange-300 font-bold' : 'hover:bg-slate-900/50'
                    }`}
                  >
                    <td className="py-3 px-3">
                      <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full font-bold text-xs ${
                        user.rank === 1 ? 'bg-amber-500 text-slate-950 font-black' :
                        user.rank === 2 ? 'bg-slate-300 text-slate-950 font-black' :
                        user.rank === 3 ? 'bg-amber-700 text-white font-black' :
                        'bg-slate-800 text-slate-400'
                      }`}>
                        {user.rank}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-200">{user.name}</td>
                    <td className="py-3 px-3 text-slate-400">{user.dept}</td>
                    <td className="py-3 px-3 font-mono font-bold text-amber-400">{user.xp} XP</td>
                    <td className="py-3 px-3 text-emerald-400 font-mono">{user.waitSaved}</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px]">
                        {user.badge}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
