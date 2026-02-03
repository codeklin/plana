'use client';

import { Wallet, TrendingUp, Target } from 'lucide-react';

interface WelcomeHeroProps {
  userName?: string;
  totalBalance: number;
  monthlyGoal: number;
}

export default function WelcomeHero({ userName = 'User', totalBalance, monthlyGoal }: WelcomeHeroProps) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="space-y-4 sm:space-y-6 mb-6 animate-in fade-in slide-in-from-top-4 duration-500">
      {/* Welcome Message */}
      <div className="bg-gradient-to-l from-purple-500 via-purple-600 to-violet-700 dark:from-purple-600 dark:via-purple-700 dark:to-violet-800 rounded-2xl p-4 sm:p-6 text-white shadow-lg">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">
              {greeting}, {userName}!
            </h2>
            <p className="text-white/90 mt-1 text-sm sm:text-base">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div className="text-4xl">👋</div>
        </div>
        <p className="text-white/95 mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed">
          Track your finances, achieve your goals, and build a stronger financial future with Plana.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-border/20 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 dark:bg-purple-900/30 p-2.5 rounded-lg">
              <Wallet className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Balance</p>
              <p className="text-lg font-bold text-foreground">₦{totalBalance.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-border/20 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 dark:bg-purple-900/30 p-2.5 rounded-lg">
              <Target className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Monthly Goal</p>
              <p className="text-lg font-bold text-foreground">₦{monthlyGoal.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
