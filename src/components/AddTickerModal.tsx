import React, { useState, useEffect, useRef } from 'react';
import { X, Plus, Search, Loader2, CheckCircle2, Sparkles } from 'lucide-react';
import { TickerItem } from '../types';
import { searchYahooTickers, createTickerFromYahoo, YahooSearchResult } from '../services/marketData';

interface AddTickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTicker: (ticker: TickerItem) => void;
}

const POPULAR_SUGGESTIONS = [
  { symbol: 'PLTR', name: 'Palantir Technologies', exchange: 'NASDAQ' },
  { symbol: 'NVDA', name: 'NVIDIA Corp', exchange: 'NASDAQ' },
  { symbol: 'TSLA', name: 'Tesla Inc', exchange: 'NASDAQ' },
  { symbol: 'AAPL', name: 'Apple Inc', exchange: 'NASDAQ' },
  { symbol: 'AMD', name: 'Advanced Micro Devices', exchange: 'NASDAQ' },
  { symbol: 'INTC', name: 'Intel Corporation', exchange: 'NASDAQ' },
  { symbol: 'DELTA.BK', name: 'Delta Electronics', exchange: 'SET' },
  { symbol: 'PTT.BK', name: 'PTT Public Co', exchange: 'SET' },
  { symbol: 'CPALL.BK', name: 'CP ALL PCL', exchange: 'SET' },
  { symbol: 'AOT.BK', name: 'Airports of Thailand', exchange: 'SET' }
];

export const AddTickerModal: React.FC<AddTickerModalProps> = ({
  isOpen,
  onClose,
  onAddTicker
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<YahooSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isFetchingQuote, setIsFetchingQuote] = useState(false);
  const [selectedPreview, setSelectedPreview] = useState<TickerItem | null>(null);
  const [isEditingPrice, setIsEditingPrice] = useState(false);
  const searchTimeoutRef = useRef<any>(null);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSuggestions([]);
      setSelectedPreview(null);
      setIsFetchingQuote(false);
      setIsEditingPrice(false);
    }
  }, [isOpen]);

  // Handle typing with debounced Yahoo Finance search
  useEffect(() => {
    if (!query.trim() || query.trim().length < 2) {
      setSuggestions([]);
      setIsSearching(false);
      return;
    }

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    setIsSearching(true);
    searchTimeoutRef.current = setTimeout(async () => {
      try {
        const results = await searchYahooTickers(query);
        setSuggestions(results);
      } catch (err) {
        console.error('Yahoo search error', err);
      } finally {
        setIsSearching(false);
      }
    }, 200);

    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    };
  }, [query]);

  if (!isOpen) return null;

  const handleSelectSuggestion = async (item: YahooSearchResult) => {
    setIsFetchingQuote(true);
    try {
      const ticker = await createTickerFromYahoo(item.symbol, item.name);
      setSelectedPreview(ticker);
      setSuggestions([]);
      setIsEditingPrice(false);
    } catch (e) {
      console.error('Failed to fetch quote', e);
    } finally {
      setIsFetchingQuote(false);
    }
  };

  const handleConfirmAdd = () => {
    if (selectedPreview) {
      onAddTicker(selectedPreview);
      onClose();
    }
  };

  return (
    <div onClick={onClose} role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div onClick={(e) => e.stopPropagation()} className="bg-[#1b1612] border border-[#2e2620] rounded-t-3xl sm:rounded-3xl w-full max-w-lg max-h-[92vh] overflow-y-auto shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,240,220,0.04)] text-[#f3ebe0] animate-pop-in">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2e2620]">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#16251b] text-[#8fd4a0]">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#f3ebe0] tracking-tight">
                เพิ่มหุ้น / สินทรัพย์ใหม่
              </h3>
              <p className="text-xs text-[#9a8a7c]">
                ค้นหาชื่อย่อหรือชื่อบริษัทจากฐานข้อมูล Yahoo Finance
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#9a8a7c] hover:text-[#f3ebe0] hover:bg-[#231d18] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          
          {/* Search Box with Yahoo Finance Suggestions */}
          <div className="relative">
            <label className="text-xs font-semibold text-[#f3ebe0] block mb-1.5">
              พิมพ์ชื่อหุ้น (เช่น PLTR, NVDA, DELTA, BTC):
            </label>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9a8a7c]" />
              <input
                type="text"
                autoFocus
                placeholder="พิมพ์ เช่น PLTR หรือ Palantir แล้วกด Enter..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={async (e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (suggestions.length > 0) {
                      handleSelectSuggestion(suggestions[0]);
                    } else if (query.trim()) {
                      handleSelectSuggestion({
                        symbol: query.trim().toUpperCase(),
                        name: query.trim().toUpperCase(),
                        exchange: 'Yahoo Finance',
                        type: 'Equity'
                      });
                    }
                  }
                }}
                className="w-full bg-[#1b1612] border border-[#2e2620] focus:border-[#8fd4a0] rounded-xl pl-10 pr-10 py-2.5 text-sm font-medium text-[#f3ebe0] placeholder-[#9a8a7c] focus:outline-none shadow-sm transition-colors"
              />
              {isSearching && (
                <Loader2 className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8fd4a0] animate-spin" />
              )}
            </div>

            {/* Suggestions Dropdown */}
            {suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-[#1b1612] border border-[#2e2620] rounded-xl shadow-xl overflow-hidden z-20 max-h-60 overflow-y-auto">
                <div className="px-3 py-1.5 bg-[#231d18] text-[11px] font-semibold text-[#cbbdab] border-b border-[#2e2620] flex items-center justify-between">
                  <span>ผลการค้นหาจาก Yahoo Finance:</span>
                  <span className="text-[10px] text-[#8fd4a0]">คลิกเพื่อดึงราคา</span>
                </div>
                {suggestions.map((item) => (
                  <div
                    key={item.symbol}
                    onClick={() => handleSelectSuggestion(item)}
                    role="button"
                    className="px-3.5 py-2.5 hover:bg-[#16251b] flex items-center justify-between cursor-pointer border-b border-[#231d18] last:border-0 transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#f3ebe0] font-mono">
                          {item.symbol}
                        </span>
                        <span className="text-xs text-[#9a8a7c] truncate max-w-[220px]">
                          {item.name}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#231d18] text-[#cbbdab]">
                        {item.exchange}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Popular Chips */}
          {!selectedPreview && (
            <div>
              <label className="text-xs font-semibold text-[#9a8a7c] block mb-2">
                🍵 ตัวอย่างยอดนิยม (คลิกเลือกได้ทันที):
              </label>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SUGGESTIONS.map((p) => (
                  <button
                    key={p.symbol}
                    type="button"
                    onClick={() => handleSelectSuggestion({ symbol: p.symbol, name: p.name, exchange: p.exchange, type: 'Equity' })}
                    className="px-2.5 py-1 rounded-lg bg-[#1b1612] border border-[#2e2620] hover:border-[#2f5a3c] hover:bg-[#16251b] text-xs font-mono text-[#cbbdab] hover:text-[#a6e0b4] transition-all flex items-center gap-1.5"
                  >
                    <span className="font-bold">{p.symbol}</span>
                    <span className="text-[10px] text-[#9a8a7c]">{p.exchange}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Fetching Quote Loader */}
          {isFetchingQuote && (
            <div className="p-6 text-center rounded-xl bg-[#1b1612] border border-[#2e2620] space-y-2">
              <Loader2 className="w-6 h-6 text-[#8fd4a0] animate-spin mx-auto" />
              <p className="text-xs font-medium text-[#f3ebe0]">
                กำลังดึงราคาล่าสุดและวิเคราะห์แนวโน้มจาก Yahoo Finance...
              </p>
            </div>
          )}

          {/* Selected Stock Preview Card */}
          {selectedPreview && !isFetchingQuote && (
            <div className="p-4 rounded-xl bg-[#1b1612] border border-[#2f5a3c] space-y-3 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#8fd4a0]" />
                  <span className="text-xs font-bold text-[#8fd4a0]">
                    พบราคาตลาดจริงจาก Yahoo Finance
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedPreview(null)}
                  className="text-xs text-[#9a8a7c] hover:text-[#f3ebe0] underline"
                >
                  เลือกตัวอื่น
                </button>
              </div>

              {/* Price Row */}
              <div className="p-3.5 rounded-xl bg-[#1b1612] border border-[#2e2620] space-y-2.5">
                <div className="flex items-baseline justify-between">
                  <div>
                    <div className="font-mono font-bold text-lg text-[#f3ebe0]">
                      {selectedPreview.symbol}
                    </div>
                    <div className="text-xs text-[#9a8a7c] truncate max-w-[200px]">
                      {selectedPreview.name}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-mono font-bold text-xl text-[#f3ebe0]">
                      {selectedPreview.currency}{selectedPreview.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <div className={`text-xs font-bold font-mono ${selectedPreview.change24h >= 0 ? 'text-[#8fd4a0]' : 'text-[#f08a84]'}`}>
                      {selectedPreview.change24h >= 0 ? '+' : ''}{selectedPreview.change24h.toFixed(2)}%
                    </div>
                  </div>
                </div>

                {/* Edit Toggle */}
                <div className="pt-2 border-t border-[#231d18] flex items-center justify-between text-[11px] text-[#9a8a7c]">
                  <span className="text-[10px] text-[#8fd4a0] font-medium">
                    ✓ ดึงข้อมูลสำเร็จ
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsEditingPrice(!isEditingPrice)}
                    className="text-[#cbbdab] hover:text-[#f3ebe0] font-medium underline"
                  >
                    {isEditingPrice ? 'ซ่อนการแก้ไข' : '✏️ แก้ไขราคาเอง'}
                  </button>
                </div>

                {/* Optional Manual Price Edit */}
                {isEditingPrice && (
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#231d18] animate-in fade-in">
                    <div>
                      <label className="text-[10px] text-[#9a8a7c] block mb-1">ราคา ({selectedPreview.currency}):</label>
                      <input
                        type="number"
                        step="any"
                        value={selectedPreview.price}
                        onChange={(e) => {
                          const val = parseFloat(e.target.value) || 0;
                          setSelectedPreview({
                            ...selectedPreview,
                            price: val,
                            high24h: Math.max(val * 1.02, selectedPreview.high24h || 0),
                            low24h: Math.min(val * 0.98, selectedPreview.low24h || val),
                            forecast: selectedPreview.forecast ? {
                              ...selectedPreview.forecast,
                              support: `${selectedPreview.currency}${(val * 0.96).toFixed(2)}`,
                              resistance: `${selectedPreview.currency}${(val * 1.04).toFixed(2)}`
                            } : undefined
                          });
                        }}
                        className="w-full px-2.5 py-1.5 text-xs font-mono border border-[#2e2620] rounded-lg bg-[#1b1612] text-[#f3ebe0]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-[#9a8a7c] block mb-1">เปลี่ยนแปลง (%):</label>
                      <input
                        type="number"
                        step="any"
                        value={selectedPreview.change24h}
                        onChange={(e) => {
                          const val = parseFloat(e.target.value) || 0;
                          setSelectedPreview({
                            ...selectedPreview,
                            change24h: val,
                            changeAmount: parseFloat(((selectedPreview.price * val) / 100).toFixed(2))
                          });
                        }}
                        className="w-full px-2.5 py-1.5 text-xs font-mono border border-[#2e2620] rounded-lg bg-[#1b1612] text-[#f3ebe0]"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* AI Forecast Summary */}
              {selectedPreview.forecast && (
                <div className="text-xs space-y-1 bg-[#1b1612] p-3 rounded-lg border border-[#2e2620]">
                  <div className="flex items-center gap-1.5 text-[#8fd4a0] font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI Forecast: {selectedPreview.forecast.signalLabel} ({selectedPreview.forecast.confidence}%)</span>
                  </div>
                  <p className="text-[11px] text-[#cbbdab] leading-relaxed">
                    {selectedPreview.forecast.reasoning}
                  </p>
                </div>
              )}

              {/* Confirm Button */}
              <button
                type="button"
                onClick={handleConfirmAdd}
                className="w-full py-2.5 px-4 rounded-xl bg-[#3f8f5a] hover:bg-[#4fa36b] text-white font-bold text-xs transition-colors shadow-sm flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>เพิ่ม {selectedPreview.symbol} ลงใน Watchlist</span>
              </button>
            </div>
          )}

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#2e2620]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-medium text-[#9a8a7c] hover:text-[#f3ebe0] transition-colors"
            >
              ปิดหน้าต่าง
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
