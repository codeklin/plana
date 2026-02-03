'use client';

import { Button } from '@/components/ui/button';

interface QuickAddProps {
  onQuickAdd: (amount: number) => void;
  title?: string;
}

export default function QuickAdd({ onQuickAdd, title = 'Quick add:' }: QuickAddProps) {
  const commonAmounts = [500, 1000, 2500, 5000, 10000, 20000];

  return (
    <div className="space-y-2">
      <p className="text-xs sm:text-sm font-medium text-muted-foreground">{title}</p>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {commonAmounts.map((amount) => (
          <Button
            key={amount}
            variant="outline"
            size="sm"
            onClick={() => onQuickAdd(amount)}
            className="text-xs sm:text-sm py-1 sm:py-2 px-2 sm:px-3 h-auto transition-all duration-200 hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:border-blue-400"
          >
            ₦{(amount / 1000).toFixed(0)}k
          </Button>
        ))}
      </div>
    </div>
  );
}
