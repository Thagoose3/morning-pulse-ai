import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { TickerItem } from '../types';

interface TickerMarqueeProps {
  tickers: TickerItem[];
}

export const TickerMarquee: React.FC<TickerMarqueeProps> = ({ tickers }) => {
  // Duplicate tickers to ensure smooth infinite loop
  const displayTickers = [...tickers, ...tickers];

  return (
    <div className="bg-[#05070a] border-b border-slate-800/60 overflow-hidden py-1.5 select-none relative group">
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] space-x-6 items-center">
        {displayTickers.map((ticker, index) => {
          const isUp = ticker.change24h >= 0;
          return (
            <div
              key={`${ticker.id}-${index}`}
              className="flex items-center space-x-2 text-xs font-mono tracking-tight px-2"
            >
              <span className="text-slate-400 font-semibold">{ticker.symbol}</span>
              <span className="text-slate-200">
                {ticker.currency}
                {ticker.price.toLocaleString(undefined, {
                  minimumFractionDigits: ticker.price < 10 ? 2 : 2,
                  maximumFractionDigits: 2
                })}
              </span>
              <span
                className={`flex items-center text-[11px] font-bold ${
                  isUp ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {isUp ? (
                  <TrendingUp className="w-3 h-3 inline mr-0.5" />
                ) : (
                  <TrendingDown className="w-3 h-3 inline mr-0.5" />
                )}
                {isUp ? '+' : ''}
                {ticker.change24h.toFixed(2)}%
              </span>
              <span className="text-slate-700">|</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
