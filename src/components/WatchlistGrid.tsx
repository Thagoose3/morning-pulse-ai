import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Plus, Trash2, Search } from 'lucide-react';
import { TickerItem } from '../types';

interface WatchlistGridProps {
  tickers: TickerItem[];
  onRemoveTicker: (id: string) => void;
  onOpenAddModal: () => void;
}

export const WatchlistGrid: React.FC<WatchlistGridProps> = ({
  tickers,
  onRemoveTicker,
  onOpenAddModal
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'ทั้งหมด' },
    { id: 'us-tech', label: '🇺🇸 หุ้นสหรัฐฯ' },
    { id: 'crypto', label: '🪙 คริปโต' },
    { id: 'commodity', label: '🟡 ทองคำ & น้ำมัน' },
    { id: 'thai', label: '🇹🇭 หุ้นไทย' }
  ];

  const filteredTickers = tickers.filter((item) => {
    const matchesCat = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = 
      item.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const renderSparkline = (points: number[], isUp: boolean) => {
    if (!points || points.length < 2) return null;
    const min = Math.min(...points);
    const max = Math.max(...points);
    const range = max - min || 1;
    const width = 80;
    const height = 28;

    const pathData = points
      .map((p, i) => {
        const x = (i / (points.length - 1)) * width;
        const y = height - ((p - min) / range) * (height - 4) - 2;
        return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(' ');

    const strokeColor = isUp ? '#10b981' : '#f43f5e';

    return (
      <svg className="w-20 h-7 overflow-visible" viewBox={`0 0 ${width} ${height}`}>
        <path
          d={pathData}
          fill="none"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  return (
    <div className="space-y-4">
      
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-white tracking-tight">
              ราคาหุ้น & สินทรัพย์น่าจับตา
            </h3>
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Yahoo Finance API
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            ราคาตรงตามตลาดโลก ปิด/เปิดล่าสุดจาก Yahoo Finance
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="ค้นหา..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#10141e] border border-slate-800 rounded-full pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
            />
          </div>

          {/* Add Button */}
          <button
            onClick={onOpenAddModal}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>เพิ่ม</span>
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
              activeCategory === cat.id
                ? 'bg-slate-200 text-slate-900 font-semibold'
                : 'bg-[#10141e] text-slate-400 hover:text-white border border-slate-800/80'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredTickers.map((ticker) => {
          const isUp = ticker.change24h >= 0;
          return (
            <div
              key={ticker.id}
              className="group p-4 rounded-xl bg-[#10141e] border border-slate-800/80 hover:border-slate-700 transition-all flex items-center justify-between"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">
                    {ticker.symbol}
                  </span>
                  <span className="text-xs text-slate-400">
                    {ticker.name}
                  </span>
                </div>
                
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-lg font-bold text-white">
                    {ticker.currency}{ticker.price.toLocaleString(undefined, {
                      minimumFractionDigits: ticker.price < 10 ? 2 : 2,
                      maximumFractionDigits: 2
                    })}
                  </span>
                  
                  <span
                    className={`inline-flex items-center text-xs font-semibold ${
                      isUp ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {isUp ? (
                      <TrendingUp className="w-3 h-3 inline mr-0.5" />
                    ) : (
                      <TrendingDown className="w-3 h-3 inline mr-0.5" />
                    )}
                    {isUp ? '+' : ''}{ticker.change24h.toFixed(2)}%
                  </span>
                </div>
              </div>

              {/* Sparkline & Delete */}
              <div className="flex items-center gap-3">
                {renderSparkline(ticker.sparkline, isUp)}
                
                <button
                  onClick={() => onRemoveTicker(ticker.id)}
                  title="ลบ"
                  className="opacity-0 group-hover:opacity-100 p-1 text-slate-500 hover:text-rose-400 transition-opacity"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredTickers.length === 0 && (
        <div className="p-8 text-center rounded-xl bg-[#10141e] border border-slate-800">
          <p className="text-xs text-slate-400">ไม่พบหุ้นที่ค้นหา</p>
        </div>
      )}

    </div>
  );
};
