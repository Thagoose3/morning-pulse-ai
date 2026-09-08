import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Plus, Trash2, Search, Sparkles, ChevronRight } from 'lucide-react';
import { TickerItem } from '../types';
import { StockForecastModal } from './StockForecastModal';

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
  const [selectedTicker, setSelectedTicker] = useState<TickerItem | null>(null);

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

  const getForecastBadge = (dir?: 'bullish' | 'bearish' | 'neutral') => {
    switch (dir) {
      case 'bullish':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25';
      case 'bearish':
        return 'text-rose-400 bg-rose-500/10 border-rose-500/25';
      default:
        return 'text-amber-400 bg-amber-500/10 border-amber-500/25';
    }
  };

  return (
    <div className="space-y-4">
      
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-white tracking-tight">
              ราคาหุ้น & คาดการณ์แนวโน้ม (AI Forecast)
            </h3>
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Yahoo Finance API
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            คลิกที่การ์ดหุ้นเพื่อดูบทวิเคราะห์คาดการณ์ แนวรับ-แนวต้าน และอ่านข่าวฉบับเต็มบน Yahoo Finance
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
              className="bg-[#121722] border border-slate-800 rounded-full pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
            />
          </div>

          {/* Add Button */}
          <button
            onClick={onOpenAddModal}
            className="flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-medium bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>เพิ่มหุ้น</span>
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3.5 py-1 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
              activeCategory === cat.id
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-[#121722] text-slate-400 hover:text-white border border-slate-800/80'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filteredTickers.map((ticker) => {
          const isUp = ticker.change24h >= 0;
          const forecast = ticker.forecast;
          const badgeClass = getForecastBadge(forecast?.direction);

          return (
            <div
              key={ticker.id}
              onClick={() => setSelectedTicker(ticker)}
              role="button"
              className="group p-4 rounded-xl bg-[#121722] hover:bg-[#151c2a] border border-slate-800/80 hover:border-amber-500/50 transition-all cursor-pointer flex flex-col justify-between shadow-sm"
            >
              <div>
                {/* Top Row: Symbol, Name & Trash */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-base font-mono">
                        {ticker.symbol}
                      </span>
                      <span className="text-xs text-slate-400 truncate max-w-[120px]">
                        {ticker.name}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveTicker(ticker.id);
                      }}
                      title="ลบ"
                      className="opacity-0 group-hover:opacity-100 p-1 text-slate-500 hover:text-rose-400 transition-opacity"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Price & Sparkline Row */}
                <div className="flex items-center justify-between my-2">
                  <div>
                    <div className="text-xl font-extrabold text-white font-mono">
                      {ticker.currency}{ticker.price.toLocaleString(undefined, {
                        minimumFractionDigits: ticker.price < 10 ? 2 : 2,
                        maximumFractionDigits: 2
                      })}
                    </div>
                    
                    <div
                      className={`inline-flex items-center text-xs font-semibold font-mono mt-0.5 ${
                        isUp ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {isUp ? (
                        <TrendingUp className="w-3 h-3 inline mr-0.5" />
                      ) : (
                        <TrendingDown className="w-3 h-3 inline mr-0.5" />
                      )}
                      {isUp ? '+' : ''}{ticker.change24h.toFixed(2)}%
                    </div>
                  </div>

                  {/* Sparkline */}
                  <div>
                    {renderSparkline(ticker.sparkline, isUp)}
                  </div>
                </div>
              </div>

              {/* AI Forecast Banner on Card */}
              <div className="pt-2.5 mt-2 border-t border-slate-800/70">
                <div className="flex items-center justify-between gap-1.5 mb-1.5">
                  <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md border ${badgeClass}`}>
                    <Sparkles className="w-3 h-3" />
                    <span>{forecast?.signalLabel || 'คาดการณ์ตามตลาด'}</span>
                  </span>
                  
                  {forecast?.confidence && (
                    <span className="text-[11px] text-slate-400 font-mono">
                      {forecast.confidence}% แม่นยำ
                    </span>
                  )}
                </div>

                {/* Short reasoning snippet */}
                {forecast?.reasoning && (
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {forecast.reasoning}
                  </p>
                )}

                <div className="mt-2 text-[10px] text-slate-500 group-hover:text-amber-400/90 font-medium flex items-center justify-end gap-0.5 transition-colors">
                  <span>คลิกเพื่อดูแนวรับ-แนวต้าน & ข่าว</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {filteredTickers.length === 0 && (
        <div className="p-8 text-center rounded-xl bg-[#121722] border border-slate-800">
          <p className="text-xs text-slate-400">ไม่พบหุ้นที่ค้นหา</p>
        </div>
      )}

      {/* Stock Forecast & News Detail Modal */}
      <StockForecastModal
        ticker={selectedTicker}
        isOpen={selectedTicker !== null}
        onClose={() => setSelectedTicker(null)}
      />

    </div>
  );
};
