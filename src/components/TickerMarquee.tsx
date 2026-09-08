import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { TickerItem } from '../types';

interface TickerMarqueeProps {
  tickers: TickerItem[];
}

export const TickerMarquee: React.FC<TickerMarqueeProps> = ({ tickers }) => {
  const displayTickers = [...tickers, ...tickers];

  return (
    <div className="bg-[#f3ede3] border-b border-[#e5dcce] overflow-hidden py-1.5 select-none relative group">
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] space-x-6 items-center">
        {displayTickers.map((ticker, index) => {
          const isUp = ticker.change24h >= 0;
          return (
            <div
              key={`${ticker.id}-${index}`}
              className="flex items-center space-x-2 text-xs font-mono tracking-tight px-2"
            >
              <span className="text-[#6d5a4c] font-semibold">{ticker.symbol}</span>
              <span className="text-[#2b1f17] font-medium">
                {ticker.currency}
                {ticker.price.toLocaleString(undefined, {
                  minimumFractionDigits: ticker.price < 10 ? 2 : 2,
                  maximumFractionDigits: 2
                })}
              </span>
              <span
                className={`flex items-center text-[11px] font-bold ${
                  isUp ? 'text-[#256a3e]' : 'text-[#b33939]'
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
              <span className="text-[#d5c9b9]">|</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
