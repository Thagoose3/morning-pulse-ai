import React from 'react';
import { Globe, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface MacroIndex {
  name: string;
  value: string;
  change: number;
  changeStr: string;
  category: string;
}

export const MacroOverviewCard: React.FC = () => {
  const indices: MacroIndex[] = [
    { name: 'S&P 500', value: '5,864.20', change: 0.74, changeStr: '+0.74%', category: 'US Index' },
    { name: 'NASDAQ 100', value: '20,410.80', change: 1.12, changeStr: '+1.12%', category: 'US Tech' },
    { name: 'Dow Jones', value: '43,275.90', change: 0.32, changeStr: '+0.32%', category: 'US Index' },
    { name: 'Nikkei 225', value: '38,920.00', change: 0.85, changeStr: '+0.85%', category: 'Asia' },
    { name: 'SET Index', value: '1,462.40', change: 0.52, changeStr: '+0.52%', category: 'Thailand' },
    { name: 'US 10Y Yield', value: '4.18%', change: -0.42, changeStr: '-1.8 bps', category: 'Rates' },
    { name: 'Dollar Index (DXY)', value: '103.45', change: -0.15, changeStr: '-0.15%', category: 'Currencies' },
    { name: 'VIX Volatility', value: '14.85', change: -3.80, changeStr: '-3.80%', category: 'Volatility' }
  ];

  return (
    <div className="rounded-2xl bg-[#0f1422] border border-slate-800/80 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-amber-400" />
          <h3 className="font-bold text-white text-base tracking-tight">
            Global Macro & Index Overview
          </h3>
        </div>
        <span className="text-[11px] font-mono text-slate-400">
          GLOBAL CLOSE / LIVE
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {indices.map((idx) => {
          const isUp = idx.change >= 0;
          return (
            <div
              key={idx.name}
              className="p-3 rounded-xl bg-[#0a0d17] border border-slate-800/70 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mb-1">
                <span>{idx.category}</span>
                <span className={isUp ? 'text-emerald-400' : 'text-rose-400'}>
                  {isUp ? '▲' : '▼'}
                </span>
              </div>
              <div className="font-semibold text-xs text-slate-200 truncate">
                {idx.name}
              </div>
              <div className="font-mono font-bold text-sm text-white mt-1">
                {idx.value}
              </div>
              <div
                className={`flex items-center text-[11px] font-mono font-semibold mt-0.5 ${
                  isUp ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {isUp ? (
                  <ArrowUpRight className="w-3 h-3 inline mr-0.5" />
                ) : (
                  <ArrowDownRight className="w-3 h-3 inline mr-0.5" />
                )}
                {idx.changeStr}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
