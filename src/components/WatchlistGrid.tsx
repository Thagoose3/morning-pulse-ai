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
    { id: 'commodity', label: '🍵 ทองคำ & น้ำมัน' },
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

    const strokeColor = isUp ? '#26693d' : '#b84444';

    return (
      <svg className="w-20 h-7 overflow-visible" viewBox={`0 0 ${width} ${height}`}>
        <path
          d={pathData}
          fill="none"
          stroke={strokeColor}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  const getForecastBadge = (dir?: 'bullish' | 'bearish' | 'neutral') => {
    switch (dir) {
      case 'bullish':
        return 'text-[#1e5e34] bg-[#eaf4ed] border-[#c0dec7]';
      case 'bearish':
        return 'text-[#a83b3b] bg-[#faeded] border-[#f0c8c8]';
      default:
        return 'text-[#855018] bg-[#fcf5ea] border-[#edd9bf]';
    }
  };

  return (
    <div className="space-y-4">
      
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-[#2d1e14] tracking-tight">
              ราคาหุ้น & คาดการณ์แนวโน้ม (AI Forecast)
            </h3>
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#226339] bg-[#eaf4ed] px-2.5 py-0.5 rounded-full border border-[#c3deca]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#226339] animate-pulse"></span>
              Live Yahoo Finance API
            </span>
          </div>
          <p className="text-xs text-[#7d6b5c] mt-0.5">
            คลิกที่การ์ดหุ้นเพื่อดูบทวิเคราะห์คาดการณ์ แนวรับ-แนวต้าน และอ่านข่าวฉบับเต็มบน Yahoo Finance
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8c7764]" />
            <input
              type="text"
              placeholder="ค้นหาหุ้น..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#ffffff] border border-[#e2d8c9] rounded-full pl-8 pr-3 py-1.5 text-xs text-[#38281d] placeholder-[#9c8979] focus:outline-none focus:border-[#26693d] shadow-sm"
            />
          </div>

          {/* Add Button */}
          <button
            onClick={onOpenAddModal}
            className="flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#26693d] hover:bg-[#1e5831] text-white transition-colors shadow-sm"
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
                ? 'bg-[#4a3729] text-white font-semibold shadow-sm'
                : 'bg-[#ffffff] text-[#6d5a4c] hover:text-[#2d1e14] border border-[#e4d9cb]'
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
              className="group p-4 rounded-xl bg-[#ffffff] hover:bg-[#faf7f2] border border-[#e8dfd2] hover:border-[#b8d6bf] transition-all cursor-pointer flex flex-col justify-between shadow-[0_2px_8px_rgba(80,60,40,0.03)]"
            >
              <div>
                {/* Top Row: Symbol, Name & Trash */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#2d1e14] text-base font-mono">
                        {ticker.symbol}
                      </span>
                      <span className="text-xs text-[#7d6b5c] truncate max-w-[120px]">
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
                      className="opacity-0 group-hover:opacity-100 p-1 text-[#a39081] hover:text-[#b84444] transition-opacity"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Price & Sparkline Row */}
                <div className="flex items-center justify-between my-2">
                  <div>
                    <div className="text-xl font-extrabold text-[#24170f] font-mono">
                      {ticker.currency}{ticker.price.toLocaleString(undefined, {
                        minimumFractionDigits: ticker.price < 10 ? 2 : 2,
                        maximumFractionDigits: 2
                      })}
                    </div>
                    
                    <div
                      className={`inline-flex items-center text-xs font-bold font-mono mt-0.5 ${
                        isUp ? 'text-[#226339]' : 'text-[#b33939]'
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
              <div className="pt-2.5 mt-2 border-t border-[#ede5d8]">
                <div className="flex items-center justify-between gap-1.5 mb-1.5">
                  <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md border ${badgeClass}`}>
                    <Sparkles className="w-3 h-3" />
                    <span>{forecast?.signalLabel || 'คาดการณ์ตามตลาด'}</span>
                  </span>
                  
                  {forecast?.confidence && (
                    <span className="text-[11px] text-[#8c7764] font-mono">
                      {forecast.confidence}% แม่นยำ
                    </span>
                  )}
                </div>

                {/* Short reasoning snippet */}
                {forecast?.reasoning && (
                  <p className="text-[11px] text-[#635142] line-clamp-2 leading-relaxed">
                    {forecast.reasoning}
                  </p>
                )}

                <div className="mt-2 text-[10px] text-[#8c7764] group-hover:text-[#26693d] font-medium flex items-center justify-end gap-0.5 transition-colors">
                  <span>คลิกเพื่อดูแนวรับ-แนวต้าน & ข่าว</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {filteredTickers.length === 0 && (
        <div className="p-8 text-center rounded-xl bg-[#ffffff] border border-[#e8dfd2]">
          <p className="text-xs text-[#7d6b5c]">ไม่พบหุ้นที่ค้นหา</p>
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
