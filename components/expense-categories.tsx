'use client';

export const EXPENSE_CATEGORIES = [
  { name: 'Food & Dining', icon: '🍽️', color: 'from-orange-500 to-red-500' },
  { name: 'Transport', icon: '🚗', color: 'from-blue-500 to-cyan-500' },
  { name: 'Housing/Rent', icon: '🏠', color: 'from-emerald-500 to-green-500' },
  { name: 'Utilities', icon: '💡', color: 'from-yellow-500 to-amber-500' },
  { name: 'Entertainment', icon: '🎬', color: 'from-purple-500 to-pink-500' },
  { name: 'Healthcare', icon: '⚕️', color: 'from-red-500 to-rose-500' },
  { name: 'Education', icon: '📚', color: 'from-indigo-500 to-blue-500' },
  { name: 'Shopping', icon: '🛍️', color: 'from-pink-500 to-rose-500' },
  { name: 'Subscriptions', icon: '📱', color: 'from-violet-500 to-purple-500' },
  { name: 'Savings/Investment', icon: '💰', color: 'from-green-500 to-emerald-500' },
  { name: 'Gifts & Charity', icon: '🎁', color: 'from-rose-500 to-pink-500' },
  { name: 'Other', icon: '📋', color: 'from-gray-500 to-slate-500' },
];

export function CategoryBadge({ category }: { category?: string }) {
  if (!category) return null;
  const cat = EXPENSE_CATEGORIES.find((c) => c.name === category);
  if (!cat) return null;
  
  return (
    <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-muted text-xs font-medium">
      <span>{cat.icon}</span>
      <span>{category}</span>
    </div>
  );
}

export function CategorySelector({
  value,
  onChange,
}: {
  value?: string;
  onChange: (category: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {EXPENSE_CATEGORIES.map((category) => (
        <button
          key={category.name}
          onClick={() => onChange(category.name)}
          className={`p-3 rounded-lg border-2 transition-all duration-200 text-center ${
            value === category.name
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30'
              : 'border-border/50 hover:border-border/80'
          }`}
        >
          <div className="text-xl mb-1">{category.icon}</div>
          <div className="text-xs font-medium line-clamp-2">{category.name}</div>
        </button>
      ))}
    </div>
  );
}
