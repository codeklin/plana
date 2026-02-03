'use client';

import { Calendar, BarChart3, Settings, HelpCircle, LogOut } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface MoreMenuProps {
  onNavigate: (tab: 'calendar' | 'analysis') => void;
}

export default function MoreMenu({ onNavigate }: MoreMenuProps) {
  const menuItems = [
    {
      id: 'calendar',
      title: 'Transaction Calendar',
      description: 'View your transaction history',
      icon: Calendar,
      color: 'from-blue-500 to-cyan-500',
      action: () => onNavigate('calendar'),
    },
    {
      id: 'analysis',
      title: 'Spending Analysis',
      description: 'Insights and recommendations',
      icon: BarChart3,
      color: 'from-purple-500 to-pink-500',
      action: () => onNavigate('analysis'),
    },
  ];

  const settingsItems = [
    {
      id: 'settings',
      title: 'Settings',
      description: 'App preferences and data',
      icon: Settings,
      color: 'from-gray-500 to-slate-500',
      action: () => console.log('Settings coming soon'),
    },
    {
      id: 'help',
      title: 'Help & Support',
      description: 'Get help and contact support',
      icon: HelpCircle,
      color: 'from-green-500 to-emerald-500',
      action: () => console.log('Help coming soon'),
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Main Features */}
      <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg">Features</CardTitle>
          <CardDescription>Additional tools and insights</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                onClick={item.action}
                variant="ghost"
                className="w-full h-auto p-4 justify-start hover:bg-muted/50 transition-all duration-200"
              >
                <div className="flex items-center gap-4 w-full">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left flex-1">
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </Button>
            );
          })}
        </CardContent>
      </Card>

      {/* Settings & Support */}
      <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg">Settings & Support</CardTitle>
          <CardDescription>Manage your account and get help</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {settingsItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                onClick={item.action}
                variant="ghost"
                className="w-full h-auto p-4 justify-start hover:bg-muted/50 transition-all duration-200"
              >
                <div className="flex items-center gap-4 w-full">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left flex-1">
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </Button>
            );
          })}
        </CardContent>
      </Card>

      {/* User Account (Future) */}
      <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/30">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center shadow-lg">
              <span className="text-white font-semibold text-lg">U</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">User Account</h3>
              <p className="text-sm text-muted-foreground">Profile and preferences</p>
            </div>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}