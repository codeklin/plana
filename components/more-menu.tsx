'use client';

import { Calendar, BarChart3, Settings } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface MoreMenuProps {
  onNavigate: (tab: 'calendar' | 'analysis' | 'settings') => void;
}

export default function MoreMenu({ onNavigate }: MoreMenuProps) {
  const menuItems = [
    {
      id: 'analysis',
      title: 'Analysis',
      description: 'Spending insights and recommendations',
      icon: BarChart3,
      color: 'from-purple-500 to-violet-600',
      action: () => onNavigate('analysis'),
    },
    {
      id: 'calendar',
      title: 'Calendar',
      description: 'View transaction history by date',
      icon: Calendar,
      color: 'from-blue-500 to-cyan-500',
      action: () => onNavigate('calendar'),
    },
    {
      id: 'settings',
      title: 'Settings',
      description: 'App preferences and account settings',
      icon: Settings,
      color: 'from-slate-500 to-gray-600',
      action: () => onNavigate('settings'),
    },
  ];

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      {/* Main Menu Items */}
      <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl">More Options</CardTitle>
          <CardDescription>Additional features and settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                onClick={item.action}
                variant="ghost"
                className="w-full h-auto p-4 justify-start hover:bg-muted/50 transition-all duration-200 rounded-xl min-w-0"
              >
                <div className="flex items-center gap-4 w-full min-w-0">
                  <div className={`w-14 h-14 min-w-[3.5rem] min-h-[3.5rem] rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                    <Icon className="w-7 h-7 min-w-[1.75rem] min-h-[1.75rem] text-white flex-shrink-0" />
                  </div>
                  <div className="text-left flex-1 min-w-0">
                    <h3 className="font-bold text-lg text-foreground truncate">{item.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                  </div>
                  <div className="text-muted-foreground flex-shrink-0">
                    <svg className="w-5 h-5 min-w-[1.25rem] min-h-[1.25rem]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Button>
            );
          })}
        </CardContent>
      </Card>

      {/* User Info Card */}
      <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/30">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center shadow-lg">
              <span className="text-white font-semibold text-lg">U</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">User Account</h3>
              <p className="text-sm text-muted-foreground">Manage your profile</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}