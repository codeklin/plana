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
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-slate-950 border-t border-border/40 shadow-lg sm:hidden">
        <div className="flex justify-between items-center h-16 px-2">
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
                    className={`flex-1 flex flex-col items-center justify-center h-16 gap-1 rounded-none transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-t from-primary/10 to-transparent text-primary border-t-2 border-primary'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    <Icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'scale-110' : ''}`} />
                    <span className="text-xs font-medium">{item.label}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top" className="text-xs mb-2">
                  {item.description}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </nav>

      {/* Spacer for mobile to account for fixed nav */}
      <div className="h-16 sm:h-0" />
    </TooltipProvider>
  );
}
