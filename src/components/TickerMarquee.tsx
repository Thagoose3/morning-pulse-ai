import React from 'react';
import { TickerItem } from '../types';

interface TickerMarqueeProps {
  tickers: TickerItem[];
}

export const TickerMarquee: React.FC<TickerMarqueeProps> = ({ tickers }) => {
  const displayTickers = [...tickers, ...tickers];

  return (
    <div className="bg-[#2a1d14] text-[#efe5d6] overflow-hidden py-2 select-none relative group">
      <div className="marquee-mask">
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] items-center">
          {displayTickers.map((ticker, index) => {
            const isUp = ticker.change24h >= 0;
            return (
              <div
                key={`${ticker.id}-${index}`}
                className="flex items-center gap-2 text-[11px] font-mono tracking-tight px-4 border-r border-white/10"
              >
                <span className="text-[#c9b8a3] font-semibold">{ticker.symbol}</span>
                <span className="text-white font-medium">
                  {ticker.currency}
                  {ticker.price.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </span>
                <span
                  className={`font-bold ${isUp ? 'text-[#86d39c]' : 'text-[#f29a9a]'}`}
                >
                  {isUp ? '▲' : '▼'} {Math.abs(ticker.change24h).toFixed(2)}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
