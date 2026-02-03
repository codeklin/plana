'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, TrendingUp, TrendingDown } from 'lucide-react';

interface Transaction {
  id: string;
  date: string;
  time: string;
  name: string;
  amount: number;
  category?: string;
  type: 'income' | 'expense';
}

interface TransactionCalendarProps {
  transactions: Transaction[];
}

export default function TransactionCalendar({ transactions }: TransactionCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const getDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i);

  const getTransactionsForDate = (date: string) => {
    return transactions.filter((t) => t.date === date);
  };

  const getDateString = (day: number) => {
    return `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const formatMonth = (date: Date) => {
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const selectedTransactions = selectedDate ? getTransactionsForDate(selectedDate) : [];
  const totalIncomeSelected = selectedTransactions.filter((t) => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpenseSelected = selectedTransactions.filter((t) => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
      {/* Calendar */}
      <div className="lg:col-span-2 space-y-4 sm:space-y-6">
        <Card className="border-0 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="flex items-center justify-between">
              <span>{formatMonth(currentDate)}</span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToPreviousMonth}
                  className="h-8 w-8 p-0 bg-transparent"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToNextMonth}
                  className="h-8 w-8 p-0 bg-transparent"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-6">
            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center text-xs sm:text-sm font-semibold text-muted-foreground py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2">
              {emptyDays.map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square rounded-lg" />
              ))}

              {days.map((day) => {
                const dateString = getDateString(day);
                const dayTransactions = getTransactionsForDate(dateString);
                const income = dayTransactions.filter((t) => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
                const expense = dayTransactions.filter((t) => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
                const isSelected = selectedDate === dateString;

                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(isSelected ? null : dateString)}
                    className={`aspect-square rounded-lg p-1 sm:p-2 flex flex-col items-center justify-center transition-all duration-200 text-xs sm:text-sm cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg scale-105'
                        : dayTransactions.length > 0
                          ? 'bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/50 hover:border-blue-400 dark:hover:border-blue-600'
                          : 'hover:bg-muted/50'
                    }`}
                  >
                    <span className="font-semibold">{day}</span>
                    {dayTransactions.length > 0 && (
                      <span className={`text-xs mt-1 font-bold ${isSelected ? 'text-white' : 'text-blue-600 dark:text-blue-400'}`}>
                        {dayTransactions.length}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-6 pt-4 border-t border-border/50 flex flex-col sm:flex-row gap-4 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/50"></div>
                <span className="text-muted-foreground">Transactions recorded</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500"></div>
                <span className="text-muted-foreground">Selected date</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transaction Details */}
      <div className="space-y-4 sm:space-y-6">
        {selectedDate && (
          <>
            {/* Summary */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-500/5 dark:to-purple-500/5 animate-in fade-in scale-in-95 duration-300">
              <CardHeader className="pb-2 sm:pb-3">
                <CardTitle className="text-base sm:text-lg">{new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-500/10 dark:bg-green-500/5 rounded-lg border border-green-200 dark:border-green-800/30">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                    <span className="text-xs sm:text-sm text-muted-foreground">Income</span>
                  </div>
                  <span className="font-bold text-sm sm:text-base text-green-600 dark:text-green-400">₦{totalIncomeSelected.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-red-500/10 dark:bg-red-500/5 rounded-lg border border-red-200 dark:border-red-800/30">
                  <div className="flex items-center gap-2">
                    <TrendingDown className="w-4 h-4 text-red-600 dark:text-red-400" />
                    <span className="text-xs sm:text-sm text-muted-foreground">Expenses</span>
                  </div>
                  <span className="font-bold text-sm sm:text-base text-red-600 dark:text-red-400">₦{totalExpenseSelected.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-500/10 dark:bg-blue-500/5 rounded-lg border border-blue-200 dark:border-blue-800/30">
                  <span className="text-xs sm:text-sm text-muted-foreground">Net</span>
                  <span className={`font-bold text-sm sm:text-base ${totalIncomeSelected >= totalExpenseSelected ? 'text-blue-600 dark:text-blue-400' : 'text-orange-600 dark:text-orange-400'}`}>
                    ₦{(totalIncomeSelected - totalExpenseSelected).toLocaleString()}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Transactions List */}
            <Card className="border-0 shadow-lg animate-in fade-in slide-in-from-right-4 duration-500">
              <CardHeader className="pb-2 sm:pb-3">
                <CardTitle className="text-base sm:text-lg">Transactions</CardTitle>
                <CardDescription className="text-xs sm:text-sm">{selectedTransactions.length} transaction(s)</CardDescription>
              </CardHeader>
              <CardContent>
                {selectedTransactions.length > 0 ? (
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {selectedTransactions
                      .sort((a, b) => b.time.localeCompare(a.time))
                      .map((transaction, index) => (
                        <div
                          key={transaction.id}
                          className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:border-border/80 transition-all duration-300 animate-in fade-in slide-in-from-left-2 hover:bg-muted/50"
                          style={{ animationDelay: `${index * 0.05}s` }}
                        >
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className={`w-2 h-2 rounded-full flex-shrink-0 ${transaction.type === 'income' ? 'bg-green-500' : 'bg-red-500'}`} />
                            <div className="min-w-0">
                              <p className="font-medium text-xs sm:text-sm truncate">{transaction.name}</p>
                              <p className="text-xs text-muted-foreground">{transaction.time}</p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end flex-shrink-0 ml-2">
                            <p className={`font-bold text-xs sm:text-sm ${transaction.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                              {transaction.type === 'income' ? '+' : '-'}₦{transaction.amount.toLocaleString()}
                            </p>
                            {transaction.category && <p className="text-xs text-muted-foreground">{transaction.category}</p>}
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="text-center text-sm text-muted-foreground py-8">No transactions on this date</p>
                )}
              </CardContent>
            </Card>
          </>
        )}

        {!selectedDate && (
          <Card className="border-0 shadow-lg bg-muted/30 animate-in fade-in duration-500">
            <CardContent className="pt-6 text-center">
              <p className="text-sm text-muted-foreground mb-4">Click on a date to view transactions</p>
              <div className="text-3xl text-muted-foreground/30">📅</div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
