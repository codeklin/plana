'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Zap, Smartphone, Database } from 'lucide-react';

export function HelpGuide() {
  return (
    <div className="space-y-4">
      <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500/10 to-blue-500/5 dark:from-blue-500/5 dark:to-blue-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            Getting Started with Plana
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm">Complete guide for Nigerian finance tracking</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Quick Start */}
          <div>
            <h4 className="font-semibold text-sm mb-2">🚀 Quick Start (2 minutes)</h4>
            <ol className="text-xs sm:text-sm space-y-1 text-muted-foreground list-decimal list-inside">
              <li>Click "Income" tab and add your monthly salary</li>
              <li>Click "Expenses" tab and add what you plan to spend</li>
              <li>Go to "Dashboard" to see your balance and savings rate</li>
              <li>Visit "Calendar" to review daily transactions</li>
            </ol>
          </div>

          {/* Key Features */}
          <div className="border-t border-border/50 pt-4">
            <h4 className="font-semibold text-sm mb-2">✨ Key Features</h4>
            <div className="space-y-2 text-xs sm:text-sm text-muted-foreground">
              <p>
                <span className="font-medium">📅 Calendar View</span> - See all your transactions by date
              </p>
              <p>
                <span className="font-medium">💾 Offline Support</span> - Works without internet, auto-saves
              </p>
              <p>
                <span className="font-medium">📊 Analytics</span> - Track spending patterns and get recommendations
              </p>
              <p>
                <span className="font-medium">🎯 Goals</span> - Set weekly and monthly financial targets
              </p>
            </div>
          </div>

          {/* Tips */}
          <div className="border-t border-border/50 pt-4">
            <h4 className="font-semibold text-sm mb-2">💡 Pro Tips for Nigerian Users</h4>
            <div className="space-y-1 text-xs sm:text-sm text-muted-foreground">
              <p>✓ Track daily expenses immediately to see spending patterns</p>
              <p>✓ Use categories (coming soon) to understand where money goes</p>
              <p>✓ Set savings goals realistic to your income</p>
              <p>✓ Review spending ratio weekly - aim for &lt;60% of income</p>
              <p>✓ Check the Analysis tab for AI recommendations</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mobile Tips */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <Smartphone className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            Mobile Tips
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-xs sm:text-sm text-muted-foreground">
          <p>• Tap and hold to expand collapsed sections</p>
          <p>• Swipe left on items to delete them (on supported devices)</p>
          <p>• Use landscape mode for better calendar view</p>
          <p>• All data stays on your phone (privacy first!)</p>
        </CardContent>
      </Card>

      {/* Offline Mode */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-500/10 to-amber-500/5 dark:from-amber-500/5 dark:to-amber-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <Database className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            Offline Mode
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-xs sm:text-sm text-muted-foreground">
          <p>✓ All your data is saved locally on your phone</p>
          <p>✓ The app works perfectly without internet</p>
          <p>✓ No data limit - add as many transactions as you want</p>
          <p>✓ Your privacy is protected - data never leaves your device</p>
          <p className="font-medium text-foreground pt-2">
            Offline Status: Check the indicator at the top of the app
          </p>
        </CardContent>
      </Card>

      {/* FAQ */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">❓ FAQ</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h5 className="font-semibold text-xs sm:text-sm mb-1">Will my data be deleted?</h5>
            <p className="text-xs sm:text-sm text-muted-foreground">
              No. Data is stored locally. Only cleared if you manually clear browser cache.
            </p>
          </div>
          <div className="border-t border-border/50 pt-4">
            <h5 className="font-semibold text-xs sm:text-sm mb-1">Can I use on multiple phones?</h5>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Currently no (cloud sync coming soon). Each device has its own data.
            </p>
          </div>
          <div className="border-t border-border/50 pt-4">
            <h5 className="font-semibold text-xs sm:text-sm mb-1">Can I export my data?</h5>
            <p className="text-xs sm:text-sm text-muted-foreground">
              CSV/PDF export coming in v1.1. For now, take screenshots or note amounts manually.
            </p>
          </div>
          <div className="border-t border-border/50 pt-4">
            <h5 className="font-semibold text-xs sm:text-sm mb-1">What if I make a mistake?</h5>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Click the menu icon next to any transaction to delete it. Changes save instantly.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Support */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500/10 to-green-500/5 dark:from-green-500/5 dark:to-green-500/5">
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">🆘 Need Help?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-xs sm:text-sm text-muted-foreground">
          <p>
            <span className="font-medium text-foreground">Email Support:</span> support@plana.ng (coming soon)
          </p>
          <p>
            <span className="font-medium text-foreground">Telegram Group:</span> Join our community of Nigerian savers
          </p>
          <p>
            <span className="font-medium text-foreground">Video Tutorials:</span> Available on YouTube (coming soon)
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
