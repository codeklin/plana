'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';

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

interface ExpenseTrackerProps {
  incomes: Income[];
  totalExpenses: number;
  totalIncome: number;
}

export default function ExpenseTracker({ incomes, totalExpenses, totalIncome }: ExpenseTrackerProps) {
  // Prepare data for charts
  const categoryData = incomes.map((income) => ({
    name: income.name,
    value: income.expenses.reduce((sum, exp) => sum + exp.amount, 0),
    income: income.amount,
  }));

  const allExpenses = incomes.flatMap((income) =>
    income.expenses.map((exp) => ({
      ...exp,
      incomeSource: income.name,
    }))
  );

  const expensesByCategory: Record<string, number> = {};
  allExpenses.forEach((exp) => {
    expensesByCategory[exp.name] = (expensesByCategory[exp.name] || 0) + exp.amount;
  });

  const chartData = Object.entries(expensesByCategory).map(([name, value]) => ({
    name,
    value: parseFloat(value.toFixed(2)),
  }));

  const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4', '#6366f1', '#14b8a6'];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-3 sm:gap-4">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 dark:from-blue-500/5 dark:to-cyan-500/5">
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="text-xs sm:text-sm text-blue-700 dark:text-blue-400">Total Expenses</CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-6">
            <div className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">₦{totalExpenses.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">All income sources combined</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500/10 to-red-500/10 dark:from-orange-500/5 dark:to-red-500/5">
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="text-xs sm:text-sm text-orange-700 dark:text-orange-400">Expense Ratio</CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-6">
            <div className="text-2xl sm:text-3xl font-bold text-orange-600 dark:text-orange-400">
              {totalIncome > 0 ? `${((totalExpenses / totalIncome) * 100).toFixed(1)}%` : '0%'}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Of total income</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500/10 to-emerald-500/10 dark:from-green-500/5 dark:to-emerald-500/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-green-700 dark:text-green-400">Savings Potential</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">${(totalIncome - totalExpenses).toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">Available for savings</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      {incomes.length === 0 ? (
        <Card className="border-0 shadow-lg">
          <CardContent className="pt-6">
            <div className="text-center py-12 text-muted-foreground">
              <p>Add income sources to see expense breakdowns</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Expense Distribution */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600"></div>
                Expense Distribution
              </CardTitle>
              <CardDescription>Breakdown of all expenses by category</CardDescription>
            </CardHeader>
            <CardContent>
              {chartData.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No expenses recorded yet</p>
                </div>
              ) : (
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `₦${value.toLocaleString()}`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>

          {/* By Income Source */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600"></div>
                Expenses by Income Source
              </CardTitle>
              <CardDescription>Track spending against each income stream</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryData}>
                    <XAxis dataKey="name" stroke="currentColor" className="text-muted-foreground" />
                    <YAxis stroke="currentColor" className="text-muted-foreground" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--background)',
                        border: `1px solid var(--border)`,
                        borderRadius: '8px',
                      }}
                      formatter={(value) => `₦${value.toLocaleString()}`}
                    />
                    <Bar dataKey="income" fill="#10b981" name="Income" />
                    <Bar dataKey="value" fill="#ef4444" name="Expenses" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Detailed List */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600"></div>
                All Expenses
              </CardTitle>
              <CardDescription>Complete list of all planned expenses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {allExpenses.length === 0 ? (
                  <p className="text-sm text-muted-foreground italic">No expenses recorded</p>
                ) : (
                  allExpenses.map((expense) => (
                    <div key={expense.id} className="flex items-center justify-between p-3 rounded-lg border border-border/30 hover:border-border/60 bg-background/50 transition-colors">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{expense.name}</p>
                        <p className="text-xs text-muted-foreground">{expense.incomeSource}</p>
                      </div>
                      <span className="font-semibold text-red-600 dark:text-red-400">₦{expense.amount.toLocaleString()}</span>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
