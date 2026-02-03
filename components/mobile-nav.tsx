'use client';

import { LayoutDashboard, PlusCircle, TrendingUp, Target, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface MobileNavProps {
  activeTab: 'dashboard' | 'income' | 'expenses' | 'goals' | 'calendar' | 'analysis';
  onTabChange: (tab: 'dashboard' | 'income' | 'expenses' | 'goals' | 'calendar' | 'analysis') => void;
}

export default function MobileNav({ activeTab, onTabChange }: MobileNavProps) {
  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      description: 'Overview of your finances',
      icon: LayoutDashboard,
    },
    {
      id: 'income',
      label: 'Income',
      description: 'Manage income sources',
      icon: PlusCircle,
    },
    {
      id: 'expenses',
      label: 'Expenses',
      description: 'Track your spending',
      icon: TrendingUp,
    },
    {
      id: 'goals',
      label: 'Goals',
      description: 'Set financial targets',
      icon: Target,
    },
    {
      id: 'analysis',
      label: 'Analysis',
      description: 'Spending insights & tips',
      icon: BarChart3,
    },
  ];

  return (
    <TooltipProvider>
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-950/95 backdrop-blur-lg border-t border-border/20 shadow-2xl sm:hidden rounded-4xl mb-3 mx-2">
        <div className="flex justify-between items-center h-20 px-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <Tooltip key={item.id} delayDuration={200}>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => onTabChange(item.id as any)}
                    variant="ghost"
                    size="sm"
                    className={`flex-1 flex flex-col items-center justify-center h-18 gap-1.5 rounded-2xl mx-1 transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-t from-primary/15 via-primary/10 to-primary/5 text-primary shadow-lg scale-105 border border-primary/20'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/30 hover:scale-102'
                    }`}
                  >
                    <div className={`p-2 rounded-xl transition-all duration-300 ${
                      isActive 
                        ? 'bg-primary/10 shadow-sm' 
                        : 'hover:bg-muted/50'
                    }`}>
                      <Icon className={`w-5 h-5 transition-all duration-300 ${isActive ? 'scale-110' : ''}`} />
                    </div>
                    <span className={`text-xs font-medium transition-all duration-300 ${
                      isActive ? 'font-semibold' : ''
                    }`}>
                      {item.label}
                    </span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top" className="text-xs mb-2 bg-blue-600 dark:bg-blue-700 text-white">
                  {item.description}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </nav>

      {/* Spacer for mobile to account for fixed nav */}
      <div className="h-20 sm:h-0" />
    </TooltipProvider>
  );
}
