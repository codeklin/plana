'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Wallet, Target } from 'lucide-react';

interface DashboardOverviewProps {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  incomeCount: number;
  goalCount: number;
}

export default function DashboardOverview({
  totalIncome,
  totalExpenses,
  balance,
  incomeCount,
  goalCount,
}: DashboardOverviewProps) {
  const savingsRate = totalIncome > 0 ? ((balance / totalIncome) * 100).toFixed(1) : 0;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 auto-rows-max">
        {/* Total Income */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500/10 to-emerald-500/10 dark:from-green-500/5 dark:to-emerald-500/5 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '0.1s' }}>
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="text-xs sm:text-sm font-medium text-green-700 dark:text-green-400 flex items-center gap-2">
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
              Total Income
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-6">
            <div className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400">₦{totalIncome.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">{incomeCount} income sources</p>
          </CardContent>
        </Card>

        {/* Total Expenses */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-red-500/10 to-orange-500/10 dark:from-red-500/5 dark:to-orange-500/5 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '0.2s' }}>

          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="text-xs sm:text-sm font-medium text-red-700 dark:text-red-400 flex items-center gap-2">
              <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4 animate-in spin-in" />
              Total Expenses
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-6">
            <div className="text-2xl sm:text-3xl font-bold text-red-600 dark:text-red-400">₦{totalExpenses.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Current spending</p>
          </CardContent>
        </Card>

        {/* Balance */}
        <Card className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-in fade-in slide-in-from-bottom-4 duration-500 ${balance >= 0 ? 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10 dark:from-blue-500/5 dark:to-cyan-500/5' : 'bg-gradient-to-br from-orange-500/10 to-red-500/10 dark:from-orange-500/5 dark:to-red-500/5'}`} style={{ animationDelay: '0.3s' }}>
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className={`text-xs sm:text-sm font-medium flex items-center gap-2 ${balance >= 0 ? 'text-blue-700 dark:text-blue-400' : 'text-orange-700 dark:text-orange-400'}`}>
              <Wallet className="w-3 h-3 sm:w-4 sm:h-4" />
              Balance
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-6">
            <div className={`text-2xl sm:text-3xl font-bold ${balance >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-orange-600 dark:text-orange-400'}`}>
              ₦{balance.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Income - Expenses</p>
          </CardContent>
        </Card>

        {/* Savings Rate */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 dark:from-purple-500/5 dark:to-pink-500/5 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '0.4s' }}>
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="text-xs sm:text-sm font-medium text-purple-700 dark:text-purple-400 flex items-center gap-2">
              <Target className="w-3 h-3 sm:w-4 sm:h-4" />
              Savings Rate
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-6">
            <div className="text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400">{savingsRate}%</div>
            <p className="text-xs text-muted-foreground mt-1">Of total income</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="border-0 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '0.5s' }}>
        <CardHeader className="pb-3 sm:pb-4">
          <CardTitle className="text-base sm:text-lg flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600"></div>
            Financial Summary
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm">Overview of your financial health</CardDescription>
        </CardHeader>
        <CardContent className="p-3 sm:p-6">
          <div className="space-y-4">
            {totalIncome === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No income sources yet. Add your first income to get started!</p>
              </div>
            ) : (
              <>
                  <div className="flex items-center justify-between pb-3 border-b border-border/50 animate-in fade-in" style={{ animationDelay: '0.6s' }}>
                    <span className="text-muted-foreground">Expense Ratio</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-border/30 rounded-full h-2 relative overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-red-500 to-orange-500 h-full transition-all duration-700 ease-out"
                          style={{ width: `${Math.min((totalExpenses / totalIncome) * 100, 100)}%` }}
                        ></div>
                      </div>
                    <span className="font-semibold text-sm min-w-12">
                      {totalIncome > 0 ? `${((totalExpenses / totalIncome) * 100).toFixed(1)}%` : '0%'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-border/50 animate-in fade-in" style={{ animationDelay: '0.7s' }}>
                  <span className="text-muted-foreground">Savings Potential</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-border/30 rounded-full h-2 relative overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-green-500 to-emerald-500 h-full transition-all duration-700 ease-out"
                        style={{ width: `${Math.min((balance / totalIncome) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <span className="font-semibold text-sm min-w-12">
                      {totalIncome > 0 ? `${((balance / totalIncome) * 100).toFixed(1)}%` : '0%'}
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
