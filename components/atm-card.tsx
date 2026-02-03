'use client';

import { Ship as Chip, Copy, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface ATMCardProps {
  balance: number;
  cardHolder?: string;
  lastFourDigits?: string;
}

export default function ATMCard({ balance, cardHolder = 'User Name', lastFourDigits = '1234' }: ATMCardProps) {
  const [showBalance, setShowBalance] = useState(true);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(balance.toString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative mb-6 sm:mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="relative h-56 sm:h-64 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 overflow-hidden group cursor-pointer transform transition-transform hover:scale-105 duration-300" style={{ background: 'linear-gradient(135deg, #1e293b 0%, #1e3a8a 50%, #0f172a 100%)' }}>
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-blue-400/20 rounded-full -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-slate-300/15 rounded-full -ml-16 -mb-16" />
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-blue-300/10 rounded-full -ml-12 -mt-12 animate-pulse" />

        {/* Card Content */}
        <div className="relative z-10 h-full flex flex-col justify-between text-white">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Chip className="w-8 h-8 sm:w-10 sm:h-10" />
              <span className="text-xs sm:text-sm font-semibold opacity-80">PLANA CARD</span>
            </div>
            <div className="text-right">
              <p className="text-xs opacity-70">CARD BALANCE</p>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-auto p-1 text-white hover:bg-blue-400/20 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowBalance(!showBalance);
                  }}
                >
                  {showBalance ? (
                    <Eye className="w-4 h-4" />
                  ) : (
                    <EyeOff className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Balance Display */}
          <div className="space-y-2">
            {showBalance ? (
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-5xl font-bold">₦{(balance / 1000000).toFixed(1)}M</span>
                <span className="text-sm opacity-80">
                  {balance > 1000000 ? 'Million' : 'Naira'}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className="w-24 h-8 bg-slate-400/30 rounded-lg backdrop-blur-sm" />
                <span className="text-xs opacity-80">Hidden</span>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs opacity-70 mb-1">CARD HOLDER</p>
              <p className="text-sm sm:text-base font-semibold">{cardHolder}</p>
            </div>
            <div className="text-right">
              <p className="text-xs opacity-70 mb-1">CARD NUMBER</p>
              <div className="flex items-center gap-2">
                <p className="text-sm sm:text-base font-mono">•••• {lastFourDigits}</p>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-auto p-1 text-white hover:bg-blue-400/20 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    copyToClipboard();
                  }}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              {copied && <p className="text-xs mt-1 opacity-90">Copied!</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Shadow Effect */}
      <div className="absolute -bottom-2 left-4 right-4 h-4 bg-blue-900/20 rounded-full blur-lg" />
    </div>
  );
}
