'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { AlertCircle, TrendingDown, TrendingUp, Zap } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Expense {
  id: string;
  name: string;
  amount: number;
}

interface Income {
  id: string;
  name: string;
  amount: number;
  expenses: Expense[];
}

interface SpendingAnalysisProps {
  totalIncome: number;
  totalExpenses: number;
  incomes: Income[];
}

export default function SpendingAnalysis({ totalIncome, totalExpenses, incomes }: SpendingAnalysisProps) {
  // Calculate metrics
  const balance = totalIncome - totalExpenses;
  const expenseRatio = totalIncome > 0 ? (totalExpenses / totalIncome) * 100 : 0;
  const savingsRate = totalIncome > 0 ? ((balance / totalIncome) * 100).toFixed(1) : '0';

  // Get spending patterns
  const expensesBySource = incomes.map((income) => ({
    name: income.name,
    expenses: income.expenses.reduce((sum, exp) => sum + exp.amount, 0),
    income: income.amount,
  }));

  // Calculate recommendations
  const generateRecommendations = () => {
    const recommendations: Array<{ type: 'good' | 'warning' | 'critical'; message: string }> = [];

    if (parseFloat(savingsRate) >= 20) {
      recommendations.push({
        type: 'good',
        message: 'Excellent savings rate! You are saving more than 20% of your income.',
      });
    } else if (parseFloat(savingsRate) >= 10) {
      recommendations.push({
        type: 'good',
        message: 'Good savings rate. You are saving 10-20% of your income.',
      });
    } else if (parseFloat(savingsRate) > 0) {
      recommendations.push({
        type: 'warning',
        message: 'Consider increasing your savings rate. Aim for at least 10-20% of your income.',
      });
    } else if (balance < 0) {
      recommendations.push({
        type: 'critical',
        message: 'Your expenses exceed your income! Review and reduce your spending.',
      });
    }

    if (expenseRatio > 80) {
      recommendations.push({
        type: 'critical',
        message: 'Your spending is very high (80%+ of income). Consider creating a stricter budget.',
      });
    } else if (expenseRatio > 60) {
      recommendations.push({
        type: 'warning',
        message: 'Your spending is moderate (60-80% of income). Look for areas to optimize.',
      });
    } else {
      recommendations.push({
        type: 'good',
        message: 'Your expense ratio is healthy (under 60% of income).',
      });
    }

    // Analyze highest expenses
    const allExpenses = incomes.flatMap((income) =>
      income.expenses.map((exp) => ({ ...exp, source: income.name }))
    );

    if (allExpenses.length > 0) {
      allExpenses.sort((a, b) => b.amount - a.amount);
      const topExpense = allExpenses[0];

      if (topExpense.amount > totalIncome * 0.2) {
        recommendations.push({
          type: 'warning',
          message: `Your largest expense (${topExpense.name}: ₦${topExpense.amount.toLocaleString()}) is more than 20% of income. Consider if this is necessary.`,
        });
      }
    }

    // Check income diversity
    const incomeSourceCount = incomes.length;
    if (incomeSourceCount === 0) {
      recommendations.push({
        type: 'warning',
        message: 'You have no income sources recorded. Add your income streams to track your finances.',
      });
    } else if (incomeSourceCount === 1) {
      recommendations.push({
        type: 'warning',
        message: 'You rely on a single income source. Consider diversifying for financial stability.',
      });
    } else {
      recommendations.push({
        type: 'good',
        message: `Good! You have ${incomeSourceCount} income sources providing financial diversity.`,
      });
    }

    return recommendations;
  };

  const recommendations = generateRecommendations();

  // Spending trend data (mock data based on current state)
  const trendData = [
    { week: 'Week 1', expenses: totalExpenses * 0.2, income: totalIncome * 0.25 },
    { week: 'Week 2', expenses: totalExpenses * 0.25, income: totalIncome * 0.25 },
    { week: 'Week 3', expenses: totalExpenses * 0.3, income: totalIncome * 0.25 },
    { week: 'Week 4', expenses: totalExpenses * 0.25, income: totalIncome * 0.25 },
  ];

  const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4'];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Key Insights */}
      <div className="grid grid-cols-1 gap-3 sm:gap-4">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 dark:from-blue-500/5 dark:to-cyan-500/5 animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '0.1s' }}>
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="text-xs sm:text-sm text-blue-700 dark:text-blue-400">Expense Ratio</CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-6">
            <div className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">{expenseRatio.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground mt-1">Of your total income</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500/10 to-emerald-500/10 dark:from-green-500/5 dark:to-emerald-500/5 animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '0.2s' }}>
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="text-xs sm:text-sm text-green-700 dark:text-green-400">Savings Rate</CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-6">
            <div className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400">{savingsRate}%</div>
            <p className="text-xs text-muted-foreground mt-1">Monthly savings potential</p>
          </CardContent>
        </Card>

        <Card className={`border-0 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500 ${balance >= 0 ? 'bg-gradient-to-br from-purple-500/10 to-pink-500/10 dark:from-purple-500/5 dark:to-pink-500/5' : 'bg-gradient-to-br from-red-500/10 to-orange-500/10 dark:from-red-500/5 dark:to-orange-500/5'}`} style={{ animationDelay: '0.3s' }}>
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className={`text-xs sm:text-sm ${balance >= 0 ? 'text-purple-700 dark:text-purple-400' : 'text-red-700 dark:text-red-400'}`}>Net Balance</CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-6">
            <div className={`text-2xl sm:text-3xl font-bold ${balance >= 0 ? 'text-purple-600 dark:text-purple-400' : 'text-red-600 dark:text-red-400'}`}>
              ₦{balance.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Income minus expenses</p>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <Card className="border-0 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '0.4s' }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Smart Recommendations
          </CardTitle>
          <CardDescription>Personalized insights based on your spending patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recommendations.map((rec, idx) => (
              <Alert
                key={idx}
                className={`border-0 animate-in fade-in slide-in-from-left-4 duration-500 ${
                  rec.type === 'good'
                    ? 'bg-green-50 dark:bg-green-950/30 border-l-4 border-green-500'
                    : rec.type === 'warning'
                      ? 'bg-orange-50 dark:bg-orange-950/30 border-l-4 border-orange-500'
                      : 'bg-red-50 dark:bg-red-950/30 border-l-4 border-red-500'
                }`}
                style={{ animationDelay: `${0.1 + idx * 0.1}s` }}
              >
                <AlertCircle
                  className={`h-4 w-4 ${
                    rec.type === 'good' ? 'text-green-600 dark:text-green-400' : rec.type === 'warning' ? 'text-orange-600 dark:text-orange-400' : 'text-red-600 dark:text-red-400'
                  }`}
                />
                <AlertDescription
                  className={
                    rec.type === 'good' ? 'text-green-800 dark:text-green-200' : rec.type === 'warning' ? 'text-orange-800 dark:text-orange-200' : 'text-red-800 dark:text-red-200'
                  }
                >
                  {rec.message}
                </AlertDescription>
              </Alert>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      {totalIncome > 0 && incomes.length > 0 ? (
        <>
          {/* Spending Trend */}
          <Card className="border-0 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '0.5s' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600"></div>
                Spending Trend
              </CardTitle>
              <CardDescription>Estimated weekly spending pattern</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendData}>
                    <defs>
                      <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="week" stroke="currentColor" className="text-muted-foreground" />
                    <YAxis stroke="currentColor" className="text-muted-foreground" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--background)',
                        border: `1px solid var(--border)`,
                        borderRadius: '8px',
                      }}
                      formatter={(value) => `₦${Number(value).toLocaleString()}`}
                    />
                    <Area type="monotone" dataKey="income" stroke="#10b981" fillOpacity={1} fill="url(#colorIncome)" name="Income" />
                    <Area type="monotone" dataKey="expenses" stroke="#ef4444" fillOpacity={1} fill="url(#colorExpense)" name="Expenses" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Expense Distribution by Source */}
          <Card className="border-0 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '0.6s' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600"></div>
                Expense Distribution by Income Source
              </CardTitle>
              <CardDescription>See where your income is being spent</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={expensesBySource.filter((item) => item.expenses > 0)}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, expenses }) => `${name}: ₦${expenses.toLocaleString()}`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="expenses"
                    >
                      {expensesBySource.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `₦${Number(value).toLocaleString()}`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Spending Summary */}
          <Card className="border-0 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '0.7s' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600"></div>
                Detailed Analysis
              </CardTitle>
              <CardDescription>Breakdown of your income and spending</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {incomes.map((income, index) => {
                  const spent = income.expenses.reduce((sum, exp) => sum + exp.amount, 0);
                  const ratio = (spent / income.amount) * 100;
                  const remaining = income.amount - spent;

                  return (
                    <div key={income.id} className="p-4 rounded-lg border border-border/50 hover:border-border/80 transition-all duration-300 animate-in fade-in slide-in-from-left-2" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold">{income.name}</h4>
                          <p className="text-xs sm:text-sm text-muted-foreground">Income: ₦{income.amount.toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                          <p className={`text-base sm:text-lg font-bold ${remaining >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>₦{remaining.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">Remaining</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Spent</span>
                          <span className="font-semibold">{ratio.toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-border/30 rounded-full h-2 relative overflow-hidden">
                          <div
                            className={`bg-gradient-to-r ${ratio > 80 ? 'from-red-500 to-orange-500' : ratio > 60 ? 'from-orange-500 to-yellow-500' : 'from-green-500 to-emerald-500'} h-full transition-all duration-500`}
                            style={{ width: `${Math.min(ratio, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <Card className="border-0 shadow-lg">
          <CardContent className="pt-6">
            <div className="text-center py-12 text-muted-foreground">
              <Zap className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Add income sources and expenses to see detailed spending analysis</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
