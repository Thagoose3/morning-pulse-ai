import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Plus, 
  Trash2, 
  Search, 
  Layers
} from 'lucide-react';
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
    { id: 'all', label: 'ทั้งหมด (All)' },
    { id: 'us-tech', label: '💻 US Tech' },
    { id: 'crypto', label: '🪙 Crypto' },
    { id: 'commodity', label: '🛢️ Commodities / ทองคำ' },
    { id: 'thai', label: '🇹🇭 Thai Stocks' }
  ];

  const filteredTickers = tickers.filter((item) => {
    const matchesCat = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = 
      item.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Render SVG Sparkline
  const renderSparkline = (points: number[], isUp: boolean) => {
    if (!points || points.length < 2) return null;
    const min = Math.min(...points);
    const max = Math.max(...points);
    const range = max - min || 1;
    const width = 100;
    const height = 32;

    const pathData = points
      .map((p, i) => {
        const x = (i / (points.length - 1)) * width;
        const y = height - ((p - min) / range) * (height - 4) - 2;
        return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(' ');

    const strokeColor = isUp ? '#10b981' : '#f43f5e';
    const fillColor = isUp ? 'rgba(16, 185, 129, 0.12)' : 'rgba(244, 63, 94, 0.12)';

    return (
      <svg className="w-24 h-8 overflow-visible" viewBox={`0 0 ${width} ${height}`}>
        <path
          d={`${pathData} L ${width} ${height} L 0 ${height} Z`}
          fill={fillColor}
        />
        <path
          d={pathData}
          fill="none"
          stroke={strokeColor}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  return (
    <div className="space-y-5">
      
      {/* Watchlist Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-400" />
            <h3 className="text-xl font-bold text-white tracking-tight">
              Real-Time Watchlist Tracker
            </h3>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            ราคาอัปเดตอัตโนมัติ • รองรับ US Tech, Crypto, ทองคำ, และหุ้นไทย
          </p>
        </div>

        {/* Action Controls: Search & Add */}
        <div className="flex items-center gap-3">
          {/* Search Box */}
          <div className="relative flex-1 md:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="ค้นหา Symbol หรือชื่อ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0d121e] border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 transition-colors font-mono"
            />
          </div>

          {/* Add Ticker Button */}
          <button
            onClick={onOpenAddModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all font-mono shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Add Ticker</span>
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 ${
              activeCategory === cat.id
                ? 'bg-amber-500 text-slate-950 shadow-sm font-bold'
                : 'bg-slate-900/90 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Ticker Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredTickers.map((ticker) => {
          const isUp = ticker.change24h >= 0;
          return (
            <div
              key={ticker.id}
              className="relative group p-4 rounded-xl bg-[#0e1320] border border-slate-800/80 hover:border-slate-700 transition-all duration-200 hover:shadow-lg flex flex-col justify-between"
            >
              {/* Card Top: Symbol & Delete if custom */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono font-bold text-white text-base tracking-tight">
                      {ticker.symbol}
                    </span>
                    {ticker.isCustom && (
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-semibold">
                        Custom
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 truncate max-w-[150px]">
                    {ticker.name}
                  </p>
                </div>

                <div className="flex items-center gap-1">
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-800/80 text-slate-400">
                    {ticker.category}
                  </span>

                  {/* Delete button (available for any ticker or custom) */}
                  <button
                    onClick={() => onRemoveTicker(ticker.id)}
                    title="ลบออกจาก Watchlist"
                    className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-rose-500/10 text-slate-500 hover:text-rose-400 transition-all ml-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Price & Sparkline Row */}
              <div className="flex items-end justify-between gap-2 my-2">
                <div>
                  <div className="font-mono text-xl font-extrabold text-white tracking-tight">
                    <span className="text-slate-400 text-sm mr-0.5 font-normal">
                      {ticker.currency}
                    </span>
                    {ticker.price.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </div>
                  <div
                    className={`flex items-center gap-1 text-xs font-bold font-mono mt-0.5 ${
                      isUp ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {isUp ? (
                      <TrendingUp className="w-3.5 h-3.5" />
                    ) : (
                      <TrendingDown className="w-3.5 h-3.5" />
                    )}
                    <span>
                      {isUp ? '+' : ''}
                      {ticker.change24h.toFixed(2)}%
                    </span>
                    <span className="text-[11px] font-normal text-slate-500">
                      ({isUp ? '+' : ''}
                      {ticker.currency}
                      {Math.abs(ticker.changeAmount).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })})
                    </span>
                  </div>
                </div>

                {/* Sparkline Graphic */}
                <div className="pb-1">
                  {renderSparkline(ticker.sparkline, isUp)}
                </div>
              </div>

              {/* Card Footer: 24h High/Low */}
              {ticker.high24h !== undefined && ticker.low24h !== undefined && (
                <div className="pt-2.5 mt-1 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span>24h L: {ticker.currency}{ticker.low24h.toLocaleString()}</span>
                  <span>24h H: {ticker.currency}{ticker.high24h.toLocaleString()}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredTickers.length === 0 && (
        <div className="p-12 text-center rounded-2xl bg-[#0e1320] border border-slate-800/80">
          <p className="text-sm text-slate-400 mb-3">ไม่พบรายการ Ticker ที่ค้นหา</p>
          <button
            onClick={onOpenAddModal}
            className="px-4 py-2 rounded-lg text-xs font-semibold bg-amber-500 text-slate-950"
          >
            + เพิ่ม Ticker ที่ต้องการ
          </button>
        </div>
      )}

    </div>
  );
};
