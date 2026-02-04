'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, Target, TrendingUp } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  type: 'savings' | 'expense';
  period: 'weekly' | 'monthly' | 'yearly';
}

interface GoalsManagerProps {
  goals: Goal[];
  onAddGoal: (name: string, targetAmount: number, type: 'savings' | 'expense', period: 'weekly' | 'monthly' | 'yearly') => void;
  onDeleteGoal: (id: string) => void;
  onUpdateAmount: (id: string, amount: number) => void;
}

export default function GoalsManager({ goals, onAddGoal, onDeleteGoal, onUpdateAmount }: GoalsManagerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [goalName, setGoalName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [goalType, setGoalType] = useState<'savings' | 'expense'>('savings');
  const [period, setPeriod] = useState<'weekly' | 'monthly' | 'yearly'>('monthly');
  const [inputAmounts, setInputAmounts] = useState<Record<string, string>>({});

  const handleAddGoal = () => {
    if (goalName && targetAmount) {
      onAddGoal(goalName, parseFloat(targetAmount), goalType, period);
      setGoalName('');
      setTargetAmount('');
      setGoalType('savings');
      setPeriod('monthly');
      setIsOpen(false);
    }
  };

  const handleUpdateAmount = (id: string) => {
    const amount = parseFloat(inputAmounts[id] || '0');
    if (!isNaN(amount)) {
      onUpdateAmount(id, amount);
      setInputAmounts((prev) => ({ ...prev, [id]: '' }));
    }
  };

  const savingsGoals = goals.filter((g) => g.type === 'savings');
  const expenseGoals = goals.filter((g) => g.type === 'expense');
  const monthlyGoals = goals.filter((g) => g.period === 'monthly');
  const weeklyGoals = goals.filter((g) => g.period === 'weekly');
  const yearlyGoals = goals.filter((g) => g.period === 'yearly');

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="border-0 shadow-lg">
        <CardHeader className="pb-3 sm:pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600"></div>
                Financial Goals
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm mt-1">Set and track your savings and expense targets</CardDescription>
            </div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button variant="navy" className="w-full sm:w-auto">
                  <Plus className="w-4 h-4 mr-2" />
                  New Goal
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Financial Goal</DialogTitle>
                  <DialogDescription>Set a goal to save money or limit expenses</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="goal-name">Goal Name</Label>
                    <Input
                      id="goal-name"
                      placeholder="e.g., Emergency Fund, Vacation, Daily Expenses"
                      value={goalName}
                      onChange={(e) => setGoalName(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="target-amount">Target Amount</Label>
                    <Input
                      id="target-amount"
                      type="number"
                      placeholder="0.00"
                      value={targetAmount}
                      onChange={(e) => setTargetAmount(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="goal-type">Goal Type</Label>
                    <Select value={goalType} onValueChange={(value) => setGoalType(value as 'savings' | 'expense')}>
                      <SelectTrigger id="goal-type" className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="savings">Savings Goal</SelectItem>
                        <SelectItem value="expense">Expense Limit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="goal-period">Period</Label>
                    <Select value={period} onValueChange={(value) => setPeriod(value as 'weekly' | 'monthly' | 'yearly')}>
                      <SelectTrigger id="goal-period" className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="yearly">Yearly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleAddGoal} variant="navy" className="w-full">
                    Create Goal
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
      </Card>

      {goals.length === 0 ? (
        <Card className="border-0 shadow-lg">
          <CardContent className="pt-6">
            <div className="text-center py-12 text-muted-foreground">
              <Target className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No goals yet. Create your first financial goal!</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Monthly Goals */}
          {monthlyGoals.length > 0 && (
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                Monthly Goals
              </h3>
              <div className="grid grid-cols-1 gap-3 sm:gap-4">
                {monthlyGoals.map((goal, index) => {
                  const progress = (goal.currentAmount / goal.targetAmount) * 100;
                  const remaining = goal.targetAmount - goal.currentAmount;
                  const isComplete = progress >= 100;

                  return (
                    <Card key={goal.id} className="border-0 shadow-lg hover:shadow-xl transition-all overflow-hidden duration-300 animate-in fade-in scale-in-95" style={{ animationDelay: `${index * 0.15}s` }}>
                      <div className={`h-1 bg-gradient-to-r ${goal.type === 'savings' ? 'from-green-500 to-emerald-500' : 'from-orange-500 to-red-500'}`}></div>
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg">{goal.name}</CardTitle>
                            <CardDescription className="mt-1 text-xs sm:text-sm">
                              {goal.type === 'savings' ? 'Save' : 'Limit'} ₦{goal.targetAmount.toLocaleString()} per month
                            </CardDescription>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-slate-100 dark:hover:bg-slate-800">
                                <span className="text-lg font-bold text-slate-600 dark:text-slate-400 leading-none">⋯</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => onDeleteGoal(goal.id)} className="text-red-600 dark:text-red-400">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Progress Bar */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Progress</span>
                            <span className="text-sm font-semibold">{Math.round(progress)}%</span>
                          </div>
                          <div className="w-full bg-border/30 rounded-full h-3 relative overflow-hidden">
                            <div
                              className={`bg-gradient-to-r ${goal.type === 'savings' ? 'from-green-500 to-emerald-500' : 'from-orange-500 to-red-500'} h-full transition-all duration-500`}
                              style={{ width: `${Math.min(progress, 100)}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Amount Cards */}
                        <div className="grid grid-cols-3 gap-2">
                          <div className="p-2 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/30">
                            <p className="text-xs text-muted-foreground">Current</p>
                            <p className="font-bold text-blue-600 dark:text-blue-400">₦{goal.currentAmount.toLocaleString()}</p>
                          </div>
                          <div className="p-2 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/30 dark:to-purple-900/30">
                            <p className="text-xs text-muted-foreground">Target</p>
                            <p className="font-bold text-purple-600 dark:text-purple-400">₦{goal.targetAmount.toLocaleString()}</p>
                          </div>
                          <div className={`p-2 rounded-lg bg-gradient-to-br ${remaining >= 0 ? 'from-green-50 to-green-100/50 dark:from-green-950/30 dark:to-green-900/30' : 'from-red-50 to-red-100/50 dark:from-red-950/30 dark:to-red-900/30'}`}>
                            <p className="text-xs text-muted-foreground">Remaining</p>
                            <p className={`font-bold ${remaining >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>₦{Math.abs(remaining).toLocaleString()}</p>
                          </div>
                        </div>

                        {/* Input Field */}
                        {!isComplete && (
                          <div className="flex gap-2 pt-2">
                            <Input
                              type="number"
                              placeholder="Add amount"
                              value={inputAmounts[goal.id] || ''}
                              onChange={(e) => setInputAmounts((prev) => ({ ...prev, [goal.id]: e.target.value }))}
                              className="flex-1"
                            />
                            <Button
                              size="sm"
                              onClick={() => handleUpdateAmount(goal.id)}
                              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
                            >
                              Add
                            </Button>
                          </div>
                        )}

                        {isComplete && <div className="text-center text-sm font-semibold text-green-600 dark:text-green-400">✓ Goal Completed!</div>}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* Weekly Goals */}
          {weeklyGoals.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-pink-600"></div>
                Weekly Goals
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {weeklyGoals.map((goal, index) => {
                  const progress = (goal.currentAmount / goal.targetAmount) * 100;
                  const remaining = goal.targetAmount - goal.currentAmount;
                  const isComplete = progress >= 100;

                  return (
                    <Card key={goal.id} className="border-0 shadow-lg hover:shadow-xl transition-all overflow-hidden duration-300 animate-in fade-in scale-in-95" style={{ animationDelay: `${index * 0.15}s` }}>
                      <div className={`h-1 bg-gradient-to-r ${goal.type === 'savings' ? 'from-green-500 to-emerald-500' : 'from-orange-500 to-red-500'}`}></div>
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg">{goal.name}</CardTitle>
                            <CardDescription className="mt-1">
                              {goal.type === 'savings' ? 'Save' : 'Limit'} ₦{goal.targetAmount.toLocaleString()} per week
                            </CardDescription>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-slate-100 dark:hover:bg-slate-800">
                                <span className="text-lg font-bold text-slate-600 dark:text-slate-400 leading-none">⋯</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => onDeleteGoal(goal.id)} className="text-red-600 dark:text-red-400">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Progress Bar */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Progress</span>
                            <span className="text-sm font-semibold">{Math.round(progress)}%</span>
                          </div>
                          <div className="w-full bg-border/30 rounded-full h-3 relative overflow-hidden">
                            <div
                              className={`bg-gradient-to-r ${goal.type === 'savings' ? 'from-green-500 to-emerald-500' : 'from-orange-500 to-red-500'} h-full transition-all duration-500`}
                              style={{ width: `${Math.min(progress, 100)}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Amount Cards */}
                        <div className="grid grid-cols-3 gap-2">
                          <div className="p-2 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/30">
                            <p className="text-xs text-muted-foreground">Current</p>
                            <p className="font-bold text-blue-600 dark:text-blue-400">₦{goal.currentAmount.toLocaleString()}</p>
                          </div>
                          <div className="p-2 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/30 dark:to-purple-900/30">
                            <p className="text-xs text-muted-foreground">Target</p>
                            <p className="font-bold text-purple-600 dark:text-purple-400">₦{goal.targetAmount.toLocaleString()}</p>
                          </div>
                          <div className={`p-2 rounded-lg bg-gradient-to-br ${remaining >= 0 ? 'from-green-50 to-green-100/50 dark:from-green-950/30 dark:to-green-900/30' : 'from-red-50 to-red-100/50 dark:from-red-950/30 dark:to-red-900/30'}`}>
                            <p className="text-xs text-muted-foreground">Remaining</p>
                            <p className={`font-bold ${remaining >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>₦{Math.abs(remaining).toLocaleString()}</p>
                          </div>
                        </div>

                        {/* Input Field */}
                        {!isComplete && (
                          <div className="flex gap-2 pt-2">
                            <Input
                              type="number"
                              placeholder="Add amount"
                              value={inputAmounts[goal.id] || ''}
                              onChange={(e) => setInputAmounts((prev) => ({ ...prev, [goal.id]: e.target.value }))}
                              className="flex-1"
                            />
                            <Button
                              size="sm"
                              onClick={() => handleUpdateAmount(goal.id)}
                              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
                            >
                              Add
                            </Button>
                          </div>
                        )}

                        {isComplete && <div className="text-center text-sm font-semibold text-green-600 dark:text-green-400">✓ Goal Completed!</div>}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* Yearly Goals */}
          {yearlyGoals.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-600"></div>
                Yearly Goals
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {yearlyGoals.map((goal, index) => {
                  const progress = (goal.currentAmount / goal.targetAmount) * 100;
                  const remaining = goal.targetAmount - goal.currentAmount;
                  const isComplete = progress >= 100;

                  return (
                    <Card key={goal.id} className="border-0 shadow-lg hover:shadow-xl transition-all overflow-hidden duration-300 animate-in fade-in scale-in-95" style={{ animationDelay: `${index * 0.15}s` }}>
                      <div className={`h-1 bg-gradient-to-r ${goal.type === 'savings' ? 'from-green-500 to-emerald-500' : 'from-orange-500 to-red-500'}`}></div>
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg">{goal.name}</CardTitle>
                            <CardDescription className="mt-1">
                              {goal.type === 'savings' ? 'Save' : 'Limit'} ₦{goal.targetAmount.toLocaleString()} per year
                            </CardDescription>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-slate-100 dark:hover:bg-slate-800">
                                <span className="text-lg font-bold text-slate-600 dark:text-slate-400 leading-none">⋯</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => onDeleteGoal(goal.id)} className="text-red-600 dark:text-red-400">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Progress Bar */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Progress</span>
                            <span className="text-sm font-semibold">{Math.round(progress)}%</span>
                          </div>
                          <div className="w-full bg-border/30 rounded-full h-3 relative overflow-hidden">
                            <div
                              className={`bg-gradient-to-r ${goal.type === 'savings' ? 'from-green-500 to-emerald-500' : 'from-orange-500 to-red-500'} h-full transition-all duration-500`}
                              style={{ width: `${Math.min(progress, 100)}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Amount Cards */}
                        <div className="grid grid-cols-3 gap-2">
                          <div className="p-2 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/30">
                            <p className="text-xs text-muted-foreground">Current</p>
                            <p className="font-bold text-blue-600 dark:text-blue-400">₦{goal.currentAmount.toLocaleString()}</p>
                          </div>
                          <div className="p-2 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/30 dark:to-purple-900/30">
                            <p className="text-xs text-muted-foreground">Target</p>
                            <p className="font-bold text-purple-600 dark:text-purple-400">₦{goal.targetAmount.toLocaleString()}</p>
                          </div>
                          <div className={`p-2 rounded-lg bg-gradient-to-br ${remaining >= 0 ? 'from-green-50 to-green-100/50 dark:from-green-950/30 dark:to-green-900/30' : 'from-red-50 to-red-100/50 dark:from-red-950/30 dark:to-red-900/30'}`}>
                            <p className="text-xs text-muted-foreground">Remaining</p>
                            <p className={`font-bold ${remaining >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>₦{Math.abs(remaining).toLocaleString()}</p>
                          </div>
                        </div>

                        {/* Input Field */}
                        {!isComplete && (
                          <div className="flex gap-2 pt-2">
                            <Input
                              type="number"
                              placeholder="Add amount"
                              value={inputAmounts[goal.id] || ''}
                              onChange={(e) => setInputAmounts((prev) => ({ ...prev, [goal.id]: e.target.value }))}
                              className="flex-1"
                            />
                            <Button
                              size="sm"
                              onClick={() => handleUpdateAmount(goal.id)}
                              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
                            >
                              Add
                            </Button>
                          </div>
                        )}

                        {isComplete && <div className="text-center text-sm font-semibold text-green-600 dark:text-green-400">✓ Goal Completed!</div>}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
