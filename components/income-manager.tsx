'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface Income {
  id: string;
  name: string;
  amount: number;
  expenses: Array<{ id: string; name: string; amount: number }>;
}

interface IncomeManagerProps {
  incomes: Income[];
  onAddIncome: (name: string, amount: number) => void;
  onDeleteIncome: (id: string) => void;
  onAddExpense: (incomeId: string, name: string, amount: number) => void;
  onDeleteExpense: (incomeId: string, expenseId: string) => void;
}

export default function IncomeManager({
  incomes,
  onAddIncome,
  onDeleteIncome,
  onAddExpense,
  onDeleteExpense,
}: IncomeManagerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [incomeName, setIncomeName] = useState('');
  const [incomeAmount, setIncomeAmount] = useState('');
  const [expandedIncome, setExpandedIncome] = useState<string | null>(null);
  const [addExpenseDialogs, setAddExpenseDialogs] = useState<Record<string, boolean>>({});
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');

  const handleAddIncome = () => {
    if (incomeName && incomeAmount) {
      onAddIncome(incomeName, parseFloat(incomeAmount));
      setIncomeName('');
      setIncomeAmount('');
      setIsOpen(false);
    }
  };

  const handleAddExpense = (incomeId: string) => {
    if (expenseName && expenseAmount) {
      onAddExpense(incomeId, expenseName, parseFloat(expenseAmount));
      setExpenseName('');
      setExpenseAmount('');
      setAddExpenseDialogs((prev) => ({ ...prev, [incomeId]: false }));
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600"></div>
                Income Sources
              </CardTitle>
              <CardDescription>Add and manage your income streams</CardDescription>
            </div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Income
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Income Source</DialogTitle>
                  <DialogDescription>Create a new income stream and add planned expenses</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="income-name">Income Source Name</Label>
                    <Input
                      id="income-name"
                      placeholder="e.g., Salary, Freelance, Investment"
                      value={incomeName}
                      onChange={(e) => setIncomeName(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="income-amount">Amount</Label>
                    <Input
                      id="income-amount"
                      type="number"
                      placeholder="0.00"
                      value={incomeAmount}
                      onChange={(e) => setIncomeAmount(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <Button onClick={handleAddIncome} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0">
                    Create Income
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {incomes.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p className="mb-4">No income sources yet. Start by adding your first income!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {incomes.map((income, index) => {
                const expenseTotal = income.expenses.reduce((sum, exp) => sum + exp.amount, 0);
                const remaining = income.amount - expenseTotal;
                const isExpanded = expandedIncome === income.id;

                return (
                  <div key={income.id} className="border border-border/50 rounded-lg overflow-hidden hover:border-border/80 transition-all duration-300 animate-in fade-in slide-in-from-left-4" style={{ animationDelay: `${index * 0.1}s` }}>
                    {/* Income Header */}
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 flex items-center justify-between cursor-pointer hover:bg-opacity-80 transition-all" onClick={() => setExpandedIncome(isExpanded ? null : income.id)}>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{income.name}</h3>
                        <p className="text-sm text-muted-foreground">Income: ₦{income.amount.toLocaleString()}</p>
                      </div>
                      <div className="flex items-center gap-4 mr-4">
                        <div className="text-right">
                          <p className={`text-2xl font-bold ${remaining >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>₦{remaining.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">Remaining</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" size="sm">
                              ⋮
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => onDeleteIncome(income.id)} className="text-red-600 dark:text-red-400">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    {/* Expanded Content */}
                    {isExpanded && (
                      <div className="p-4 border-t border-border/50 bg-card/50">
                        <div className="space-y-3">
                          {/* Expenses List */}
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-semibold text-sm">Planned Expenses</h4>
                              <Dialog open={addExpenseDialogs[income.id]} onOpenChange={(open) => setAddExpenseDialogs((prev) => ({ ...prev, [income.id]: open }))}>
                                <DialogTrigger asChild>
                                  <Button size="sm" variant="outline" className="text-xs bg-transparent">
                                    <Plus className="w-3 h-3 mr-1" />
                                    Add Expense
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Add Expense to {income.name}</DialogTitle>
                                    <DialogDescription>Add items you plan to buy from this income</DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4 mt-4">
                                    <div>
                                      <Label htmlFor="exp-name">Item Name</Label>
                                      <Input
                                        id="exp-name"
                                        placeholder="e.g., Groceries, Rent, Gas"
                                        value={expenseName}
                                        onChange={(e) => setExpenseName(e.target.value)}
                                        className="mt-1"
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor="exp-amount">Amount</Label>
                                      <Input
                                        id="exp-amount"
                                        type="number"
                                        placeholder="0.00"
                                        value={expenseAmount}
                                        onChange={(e) => setExpenseAmount(e.target.value)}
                                        className="mt-1"
                                      />
                                    </div>
                                    <Button onClick={() => handleAddExpense(income.id)} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0">
                                      Add Expense
                                    </Button>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </div>

                            {income.expenses.length === 0 ? (
                              <p className="text-xs text-muted-foreground italic">No expenses added yet</p>
                            ) : (
                              <div className="space-y-2 max-h-60 overflow-y-auto">
                                {income.expenses.map((expense, expIndex) => (
                                  <div key={expense.id} className="flex items-center justify-between p-2 bg-background/50 rounded border border-border/30 hover:border-border/60 transition-all duration-300 animate-in fade-in slide-in-from-left-2" style={{ animationDelay: `${expIndex * 0.05}s` }}>
                                    <div className="flex-1">
                                      <p className="text-sm font-medium">{expense.name}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                      <span className="font-semibold text-sm text-blue-600 dark:text-blue-400">₦{expense.amount.toLocaleString()}</span>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        className="text-red-600 hover:text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 h-8 w-8 p-0"
                                        onClick={() => onDeleteExpense(income.id, expense.id)}
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </Button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Summary */}
                          <div className="pt-3 border-t border-border/50 space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Total Expenses:</span>
                              <span className="font-semibold text-red-600 dark:text-red-400">₦{expenseTotal.toLocaleString()}</span>
                            </div>
                            <div className="w-full bg-border/30 rounded-full h-2 relative overflow-hidden">
                              <div
                                className="bg-gradient-to-r from-red-500 to-orange-500 h-full transition-all duration-500"
                                style={{ width: `${Math.min((expenseTotal / income.amount) * 100, 100)}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
