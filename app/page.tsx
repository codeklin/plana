'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, TrendingUp, TrendingDown, Target, Calendar } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import DashboardOverview from '@/components/dashboard-overview';
import IncomeManager from '@/components/income-manager';
import ExpenseTracker from '@/components/expense-tracker';
import GoalsManager from '@/components/goals-manager';
import SpendingAnalysis from '@/components/spending-analysis';
import TransactionCalendar from '@/components/transaction-calendar';
import MobileNav from '@/components/mobile-nav';
import WelcomeHero from '@/components/welcome-hero';
import ATMCard from '@/components/atm-card';

interface Transaction {
  id: string;
  date: string;
  time: string;
  name: string;
  amount: number;
  category?: string;
  type: 'income' | 'expense';
}

interface FinancialData {
  incomeList: Array<{
    id: string;
    name: string;
    amount: number;
    date: string;
    time: string;
    expenses: Array<{ id: string; name: string; amount: number; date: string; time: string; category?: string }>;
    recurring?: {
      enabled: boolean;
      frequency: 'daily' | 'weekly' | 'monthly';
      endDate?: string;
    };
  }>;
  goals: Array<{
    id: string;
    name: string;
    targetAmount: number;
    currentAmount: number;
    type: 'savings' | 'expense';
    period: 'weekly' | 'monthly';
    createdDate: string;
  }>;
  transactions: Transaction[];
}

const STORAGE_KEY = 'plana_financial_data';

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [data, setData] = useState<FinancialData>({
    incomeList: [],
    goals: [],
    transactions: [],
  });

  // Initialize from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch {
        console.log('[v0] Failed to parse stored data');
      }
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const totalIncome = data.incomeList.reduce((sum, income) => sum + income.amount, 0);
  const totalExpenses = data.incomeList.reduce((sum, income) => {
    return sum + income.expenses.reduce((expSum, exp) => expSum + exp.amount, 0);
  }, 0);
  const balance = totalIncome - totalExpenses;

  const addIncome = (name: string, amount: number, isRecurring: boolean = false, frequency: 'daily' | 'weekly' | 'monthly' = 'monthly') => {
    const now = new Date();
    const newIncome = {
      id: Date.now().toString(),
      name,
      amount,
      date: now.toISOString().split('T')[0],
      time: now.toTimeString().slice(0, 5),
      expenses: [] as Array<{ id: string; name: string; amount: number; date: string; time: string; category?: string }>,
      recurring: isRecurring ? { enabled: true, frequency } : undefined,
    };
    setData((prev) => ({
      ...prev,
      incomeList: [...prev.incomeList, newIncome],
      transactions: [
        ...prev.transactions,
        {
          id: newIncome.id,
          date: newIncome.date,
          time: newIncome.time,
          name,
          amount,
          type: 'income',
        },
      ],
    }));
  };

  const deleteIncome = (id: string) => {
    setData((prev) => ({
      ...prev,
      incomeList: prev.incomeList.filter((income) => income.id !== id),
      transactions: prev.transactions.filter((t) => t.id !== id),
    }));
  };

  const addExpenseToIncome = (incomeId: string, expenseName: string, expenseAmount: number, category: string = 'Other') => {
    const now = new Date();
    const expenseId = Date.now().toString();
    setData((prev) => ({
      ...prev,
      incomeList: prev.incomeList.map((income) =>
        income.id === incomeId
          ? {
              ...income,
              expenses: [
                ...income.expenses,
                {
                  id: expenseId,
                  name: expenseName,
                  amount: expenseAmount,
                  date: now.toISOString().split('T')[0],
                  time: now.toTimeString().slice(0, 5),
                  category,
                },
              ],
            }
          : income
      ),
      transactions: [
        ...prev.transactions,
        {
          id: expenseId,
          date: now.toISOString().split('T')[0],
          time: now.toTimeString().slice(0, 5),
          name: expenseName,
          amount: expenseAmount,
          category,
          type: 'expense',
        },
      ],
    }));
  };

  const deleteExpenseFromIncome = (incomeId: string, expenseId: string) => {
    setData((prev) => ({
      ...prev,
      incomeList: prev.incomeList.map((income) =>
        income.id === incomeId
          ? {
              ...income,
              expenses: income.expenses.filter((exp) => exp.id !== expenseId),
            }
          : income
      ),
      transactions: prev.transactions.filter((t) => t.id !== expenseId),
    }));
  };

  const addGoal = (name: string, targetAmount: number, type: 'savings' | 'expense', period: 'weekly' | 'monthly') => {
    const newGoal = {
      id: Date.now().toString(),
      name,
      targetAmount,
      currentAmount: 0,
      type,
      period,
      createdDate: new Date().toISOString().split('T')[0],
    };
    setData((prev) => ({
      ...prev,
      goals: [...prev.goals, newGoal],
    }));
  };

  const deleteGoal = (id: string) => {
    setData((prev) => ({
      ...prev,
      goals: prev.goals.filter((goal) => goal.id !== id),
    }));
  };

  const updateGoalAmount = (id: string, amount: number) => {
    setData((prev) => ({
      ...prev,
      goals: prev.goals.map((goal) =>
        goal.id === id ? { ...goal, currentAmount: Math.min(amount, goal.targetAmount) } : goal
      ),
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-3 sm:p-4 md:p-6 lg:p-8 pb-24 sm:pb-8">
      <div className="w-full max-w-7xl mx-auto">
        {/* Header - Modern Fintech Style */}
        <div className="mb-6 sm:mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="flex items-center justify-between bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20 dark:border-slate-700/20 shadow-sm">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold dark:text-blue-400" style={{ color: '#1c1c84' }}>
                Plana
              </h1>
            </div>

            {/* User Profile Section */}
            <div className="flex items-center gap-3">
              {/* Quick Balance (Desktop only) */}
              <div className="hidden sm:block text-right">
                <p className="text-xs text-muted-foreground">Total Balance</p>
                <p className="text-lg font-bold text-foreground">₦{balance.toLocaleString()}</p>
              </div>
              
              {/* User Avatar & Menu */}
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center shadow-lg">
                  <span className="text-white font-semibold text-sm">U</span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-foreground">User</p>
                  <p className="text-xs text-muted-foreground">Welcome back</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Welcome Section - Show on Dashboard */}
        {activeTab === 'dashboard' && (
          <>
            <WelcomeHero userName="User" totalBalance={balance} monthlyGoal={totalExpenses} />
            <ATMCard balance={balance} cardHolder="User Name" lastFourDigits="5678" />
          </>
        )}

        {/* Mobile Page Title - Only visible on mobile */}
        <div className="sm:hidden mb-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center justify-between bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-xl p-3 border border-white/20 dark:border-slate-700/20">
            <div className="flex items-center gap-3">
              <div className="text-xl">
                {activeTab === 'dashboard' ? '📊' : 
                 activeTab === 'income' ? '💰' :
                 activeTab === 'expenses' ? '💳' :
                 activeTab === 'calendar' ? '📅' :
                 activeTab === 'goals' ? '🎯' : '📈'}
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground capitalize">
                  {activeTab === 'dashboard' ? 'Overview' : 
                   activeTab === 'income' ? 'Income' :
                   activeTab === 'expenses' ? 'Expenses' :
                   activeTab === 'calendar' ? 'Calendar' :
                   activeTab === 'goals' ? 'Goals' : 'Analysis'}
                </h2>
              </div>
            </div>
            {/* Mobile Balance */}
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Balance</p>
              <p className="text-sm font-bold text-foreground">₦{(balance / 1000).toFixed(0)}K</p>
            </div>
          </div>
        </div>

        {/* Main Tabs - Hidden on mobile, visible on desktop */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6 w-full">
          <TabsList className="hidden sm:grid grid-cols-5 gap-2 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm p-1 rounded-xl border border-white/20 dark:border-slate-700/50 w-full">
            <TabsTrigger value="dashboard" className="flex items-center gap-2 text-sm px-4 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-sm">
              <TrendingUp className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="income" className="flex items-center gap-2 text-sm px-4 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-sm">
              <Plus className="w-4 h-4" />
              Income
            </TabsTrigger>
            <TabsTrigger value="expenses" className="flex items-center gap-2 text-sm px-4 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-sm">
              <TrendingDown className="w-4 h-4" />
              Expenses
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2 text-sm px-4 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-sm">
              <Calendar className="w-4 h-4" />
              Calendar
            </TabsTrigger>
            <TabsTrigger value="goals" className="flex items-center gap-2 text-sm px-4 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-sm">
              <Target className="w-4 h-4" />
              Goals
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-4 sm:space-y-6 animate-in fade-in duration-300 w-full mt-0">
            <DashboardOverview
              totalIncome={totalIncome}
              totalExpenses={totalExpenses}
              balance={balance}
              incomeCount={data.incomeList.length}
              goalCount={data.goals.length}
            />
          </TabsContent>

          {/* Income Tab */}
          <TabsContent value="income" className="space-y-4 sm:space-y-6 animate-in fade-in duration-300 w-full mt-0">
            <IncomeManager
              incomes={data.incomeList}
              onAddIncome={addIncome}
              onDeleteIncome={deleteIncome}
              onAddExpense={addExpenseToIncome}
              onDeleteExpense={deleteExpenseFromIncome}
            />
          </TabsContent>

          {/* Expenses Tab */}
          <TabsContent value="expenses" className="space-y-4 sm:space-y-6 animate-in fade-in duration-300 w-full mt-0">
            <ExpenseTracker incomes={data.incomeList} totalExpenses={totalExpenses} totalIncome={totalIncome} />
          </TabsContent>

          {/* Calendar Tab */}
          <TabsContent value="calendar" className="space-y-4 sm:space-y-6 animate-in fade-in duration-300 w-full mt-0">
            <TransactionCalendar transactions={data.transactions} />
          </TabsContent>

          {/* Goals Tab */}
          <TabsContent value="goals" className="space-y-4 sm:space-y-6 animate-in fade-in duration-300 w-full mt-0">
            <GoalsManager
              goals={data.goals}
              onAddGoal={addGoal}
              onDeleteGoal={deleteGoal}
              onUpdateAmount={updateGoalAmount}
            />
          </TabsContent>

          {/* Analysis Tab */}
          <TabsContent value="analysis" className="space-y-4 sm:space-y-6 animate-in fade-in duration-300 w-full mt-0">
            <SpendingAnalysis
              incomes={data.incomeList}
              totalIncome={totalIncome}
              totalExpenses={totalExpenses}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav activeTab={activeTab as any} onTabChange={setActiveTab} />
    </div>
  );
}
