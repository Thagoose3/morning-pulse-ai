import React from 'react';
import { TickerItem } from '../types';

interface TickerMarqueeProps {
  tickers: TickerItem[];
}

export const TickerMarquee: React.FC<TickerMarqueeProps> = ({ tickers }) => {
  const stocks = tickers.filter((t) => t.category === 'us-tech' || t.category === 'thai');
  const coins = tickers.filter((t) => t.category === 'crypto');
  const others = tickers.filter((t) => !stocks.includes(t) && !coins.includes(t));
  type Item = { kind: 'label'; text: string } | { kind: 'ticker'; ticker: TickerItem };
  const sequence: Item[] = [
    ...(stocks.length ? [{ kind: 'label', text: '📈 หุ้น' } as Item, ...stocks.map((t) => ({ kind: 'ticker', ticker: t } as Item))] : []),
    ...(coins.length ? [{ kind: 'label', text: '🪙 เหรียญ' } as Item, ...coins.map((t) => ({ kind: 'ticker', ticker: t } as Item))] : []),
    ...(others.length ? [{ kind: 'label', text: '🛢️ ทอง & น้ำมัน' } as Item, ...others.map((t) => ({ kind: 'ticker', ticker: t } as Item))] : [])
  ];
  const displayItems = [...sequence, ...sequence];

  return (
    <div className="relative z-10 bg-white/70 backdrop-blur border-b border-[#3d2e24]/[0.06] text-[#3d2e24] overflow-hidden py-2 select-none group">
      <div className="marquee-mask">
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] items-center">
          {displayItems.map((item, index) => {
            if (item.kind === 'label') {
              return (
                <span
                  key={`label-${index}`}
                  className="mx-3 px-2 py-0.5 rounded-full bg-[#b07a2a]/10 border border-[#b07a2a]/20 text-[#b07a2a] text-[10px] font-bold whitespace-nowrap"
                >
                  {item.text}
                </span>
              );
            }
            const ticker = item.ticker;
            const isUp = ticker.change24h >= 0;
            return (
              <div
                key={`${ticker.id}-${index}`}
                className="flex items-center gap-2 text-[11px] font-mono tracking-tight px-4 border-r border-[#3d2e24]/[0.06]"
              >
                <span className="text-[#8c7764] font-semibold">{ticker.symbol}</span>
                <span className="text-[#2a1d14] font-medium">
                  {ticker.currency}
                  {ticker.price.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </span>
                <span
                  className={`font-bold ${isUp ? 'text-[#2e7d4f]' : 'text-[#c2493f]'}`}
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
