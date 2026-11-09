import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Plus, Trash2, Search, Sparkles, ChevronRight } from 'lucide-react';
import { TickerItem } from '../types';
import { StockForecastModal } from './StockForecastModal';
import { CountUp, Reveal, SectionHeading } from './ui';

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

  const GROUP_OF: Record<string, string> = {
    'us-tech': 'stocks',
    thai: 'stocks',
    crypto: 'crypto',
    commodity: 'commodity',
    macro: 'commodity'
  };

  const categories = [
    { id: 'all', label: 'ทั้งหมด' },
    { id: 'stocks', label: '📈 หุ้น' },
    { id: 'crypto', label: '🪙 เหรียญ' },
    { id: 'commodity', label: '🛢️ ทอง & น้ำมัน' }
  ];

  const filteredTickers = tickers.filter((item) => {
    const matchesCat = activeCategory === 'all' || GROUP_OF[item.category] === activeCategory;
    const matchesSearch = 
      item.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const renderSparkline = (points: number[], isUp: boolean, id: string) => {
    if (!points || points.length < 2) return null;
    const min = Math.min(...points);
    const max = Math.max(...points);
    const range = max - min || 1;
    const width = 96;
    const height = 36;

    const pathData = points
      .map((p, i) => {
        const x = (i / (points.length - 1)) * width;
        const y = height - ((p - min) / range) * (height - 4) - 2;
        return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(' ');

    const strokeColor = isUp ? '#8fd4a0' : '#f08a84';
    const gradId = `spark-${id.replace(/[^a-zA-Z0-9_-]/g, '')}`;
    const areaData = `${pathData} L ${width} ${height} L 0 ${height} Z`;
    const lastY = height - ((points[points.length - 1] - min) / range) * (height - 4) - 2;

    return (
      <svg className="w-24 h-9 overflow-visible" viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
        <defs>
          <linearGradient id={gradId} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={strokeColor} stopOpacity="0.3" />
            <stop offset="100%" stopColor={strokeColor} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaData} fill={`url(#${gradId})`} />
        <circle cx={width} cy={lastY} r="2.6" fill={strokeColor} />
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
        return 'text-[#8fd4a0] bg-[#8fd4a0]/10 border-[#8fd4a0]/20';
      case 'bearish':
        return 'text-[#f08a84] bg-[#f08a84]/10 border-[#f08a84]/20';
      default:
        return 'text-[#e6b86e] bg-[#e6b86e]/10 border-[#e6b86e]/20';
    }
  };

  const renderCard = (ticker: TickerItem, i: number) => {
      const isUp = ticker.change24h >= 0;
      const forecast = ticker.forecast;
      const badgeClass = getForecastBadge(forecast?.direction);

      return (
        <div
          key={ticker.id}
          onClick={() => setSelectedTicker(ticker)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedTicker(ticker); } }}
          style={{ animationDelay: `${Math.min(i, 8) * 40}ms` }}
          className="glass spotlight group p-5 sm:p-6 rounded-3xl cursor-pointer flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300 animate-fade-up"
        >
          <div>
            {/* Top Row: Symbol, Name & Trash */}
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#f3ebe0] text-base font-mono">
                    {ticker.symbol}
                  </span>
                  <span className="text-xs text-[#9a8a7c] truncate max-w-[140px]">
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
                  aria-label={`ลบ ${ticker.symbol}`}
                  className="sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 p-1 rounded-md text-[#9a8a7c] hover:text-[#f08a84] hover:bg-[#2a1615] transition-opacity"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Price & Sparkline Row */}
            <div className="flex items-center justify-between my-2">
              <div>
                <div className="text-2xl font-bold tracking-tight text-[#f3ebe0] font-mono tabular-nums">
                  <CountUp value={ticker.price} decimals={2} prefix={ticker.currency} duration={700} />
                </div>
                
                <div
                  className={`inline-flex items-center text-xs font-bold font-mono mt-1 px-2 py-0.5 rounded-md ${
                    isUp ? 'text-[#8fd4a0] bg-[#8fd4a0]/10' : 'text-[#f08a84] bg-[#f08a84]/10'
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
                {renderSparkline(ticker.sparkline, isUp, ticker.id)}
              </div>
            </div>
          </div>

          {/* AI Forecast Banner on Card */}
          <div className="pt-4 mt-4 border-t border-white/[0.07]">
            <div className="flex items-center justify-between gap-1.5 mb-1.5">
              <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md border ${badgeClass}`}>
                <Sparkles className="w-3 h-3" />
                <span>{forecast?.signalLabel || 'คาดการณ์ตามตลาด'}</span>
              </span>
              
              {forecast?.confidence && (
                <span className="text-[11px] text-[#9a8a7c] font-mono">
                  ความมั่นใจ {forecast.confidence}%
                </span>
              )}
            </div>

            {/* Short reasoning snippet */}
            {forecast?.reasoning && (
              <p className="text-[11px] text-[#cbbdab] line-clamp-2 leading-relaxed">
                {forecast.reasoning}
              </p>
            )}

            <div className="mt-2 text-[10px] text-[#9a8a7c] group-hover:text-[#8fd4a0] font-medium flex items-center justify-end gap-0.5 transition-colors">
              <span>คลิกเพื่อดูแนวรับ-แนวต้าน & ข่าว</span>
              <ChevronRight className="w-3 h-3" />
            </div>
          </div>

        </div>
      );
  };

  const groupDefs = [
    {
      id: 'stocks',
      label: 'หุ้น',
      icon: '📈',
      desc: 'หุ้นสหรัฐฯ และหุ้นไทย',
      iconClass: 'bg-[#8fd4a0]/10 border-[#8fd4a0]/20',
      subs: [
        { id: 'us-tech', label: '🇺🇸 หุ้นสหรัฐฯ' },
        { id: 'thai', label: '🇹🇭 หุ้นไทย & ดัชนี SET' }
      ]
    },
    {
      id: 'crypto',
      label: 'เหรียญคริปโต',
      icon: '🪙',
      desc: 'ซื้อขาย 24 ชม. ผันผวนสูงกว่าหุ้น',
      iconClass: 'bg-[#e6b86e]/10 border-[#e6b86e]/20',
      subs: [{ id: 'crypto', label: '🪙 คริปโต' }]
    },
    {
      id: 'commodity',
      label: 'ทองคำ น้ำมัน & อื่นๆ',
      icon: '🛢️',
      desc: 'สินค้าโภคภัณฑ์และตัวชี้วัดมหภาค',
      iconClass: 'bg-white/[0.04] border-white/10',
      subs: [
        { id: 'commodity', label: '🛢️ ทองคำ & น้ำมัน' },
        { id: 'macro', label: '🌐 มหภาค' }
      ]
    }
  ];

  const visibleGroups = groupDefs
    .filter((g) => activeCategory === 'all' || activeCategory === g.id)
    .map((g) => {
      const subgroups = g.subs
        .map((sub) => ({ ...sub, items: filteredTickers.filter((t) => t.category === sub.id) }))
        .filter((sub) => sub.items.length > 0);
      const items = subgroups.flatMap((sub) => sub.items);
      const avg = items.length ? items.reduce((sum, t) => sum + t.change24h, 0) / items.length : 0;
      return { ...g, subgroups, items, avg };
    })
    .filter((g) => g.items.length > 0);

  return (
    <div className="space-y-6">

      <Reveal>
        <SectionHeading
          index="04"
          kicker="Watchlist & AI Forecast"
          title="หุ้น & เหรียญที่คุณติดตาม"
          aside={
            <span className="inline-flex items-center gap-2 text-[12px] font-medium text-[#8fd4a0] bg-[#8fd4a0]/10 px-3 py-1 rounded-full border border-[#8fd4a0]/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8fd4a0] shadow-[0_0_8px_rgba(143,212,160,1)] animate-pulse"></span>
              Live • Yahoo Finance
            </span>
          }
        />
      </Reveal>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <p className="text-[13px] text-[#9a8a7c]">
          แตะการ์ดเพื่อดูแนวรับ-แนวต้าน มุมมอง AI และข่าวล่าสุด
        </p>

        <div className="flex items-center gap-2.5">
          {/* Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#9a8a7c]" />
            <input
              type="text"
              placeholder="ค้นหาหุ้น / เหรียญ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-40 sm:w-52 bg-white/[0.04] border border-white/10 rounded-full pl-8 pr-3 py-2 text-xs text-[#f3ebe0] placeholder-[#7d6e62] focus:outline-none focus:border-[#8fd4a0]/60 focus:bg-white/[0.06] transition-colors"
            />
          </div>

          {/* Add Button */}
          <button
            onClick={onOpenAddModal}
            className="flex items-center gap-1 px-4 py-2 rounded-full text-xs font-semibold bg-[#f3ebe0] hover:bg-white text-[#0e0b09] transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>เพิ่มหุ้น</span>
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
              activeCategory === cat.id
                ? 'bg-[#f3ebe0] text-[#0e0b09] font-semibold border border-[#f3ebe0]'
                : 'bg-white/[0.03] text-[#cbbdab] hover:text-[#f3ebe0] hover:bg-white/[0.06] border border-white/10'
            }`}
          >
            {cat.label}
            <span className={`ml-1.5 font-mono text-[10px] ${activeCategory === cat.id ? 'text-[#0e0b09]/60' : 'text-[#9a8a7c]'}`}>
              {cat.id === 'all' ? tickers.length : tickers.filter((t) => GROUP_OF[t.category] === cat.id).length}
            </span>
          </button>
        ))}
      </div>

      {/* Grouped sections: stocks vs coins vs commodities */}
      <div className="space-y-14 pt-4">
        {visibleGroups.map((group) => (
          <div key={group.id} className="animate-fade-up">
            <div className="flex items-center gap-3 mb-5">
              <span className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xl border ${group.iconClass}`}>
                {group.icon}
              </span>
              <div className="min-w-0">
                <h4 className="font-serif text-xl font-bold text-[#f3ebe0] leading-tight">
                  {group.label}
                  <span className="ml-2 font-mono text-[11px] font-medium text-[#9a8a7c]">{group.items.length}</span>
                </h4>
                <p className="text-[11px] text-[#9a8a7c] leading-tight">{group.desc}</p>
              </div>
              <span className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" aria-hidden="true" />
              <span className={`hidden sm:inline font-mono text-[12px] font-bold ${group.avg >= 0 ? 'text-[#8fd4a0]' : 'text-[#f08a84]'}`}>
                เฉลี่ย {group.avg >= 0 ? '+' : ''}{group.avg.toFixed(2)}%
              </span>
            </div>

            {group.subgroups.map((sub) => (
              <div key={sub.id} className="mb-4 last:mb-0">
                {group.subgroups.length > 1 && (
                  <p className="text-[12px] font-semibold text-[#cbbdab] mb-2 ml-1">
                    {sub.label} <span className="font-mono text-[10px] text-[#9a8a7c]">({sub.items.length})</span>
                  </p>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  {sub.items.map((t, i) => renderCard(t, i))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {filteredTickers.length === 0 && (
        <div className="glass p-10 text-center rounded-3xl">
          <p className="text-xs text-[#9a8a7c]">ไม่พบหุ้นหรือเหรียญที่ค้นหา</p>
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
