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
  { symbol: 'DELTA.BK', name: 'Delta Electronics', exchange: 'SET' },
  { symbol: 'PTT.BK', name: 'PTT Public Co', exchange: 'SET' },
  { symbol: 'CPALL.BK', name: 'CP ALL PCL', exchange: 'SET' }
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
  const searchTimeoutRef = useRef<any>(null);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSuggestions([]);
      setSelectedPreview(null);
      setIsFetchingQuote(false);
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
    }, 250);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#ffffff] border border-[#e5dcd0] rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl text-[#3d2e24]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#ede5d8]">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#eaf4ed] text-[#226339]">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#25170f] tracking-tight">
                เพิ่มหุ้น / สินทรัพย์ใหม่
              </h3>
              <p className="text-xs text-[#7d6b5c]">
                ค้นหาชื่อย่อหรือชื่อบริษัทจากฐานข้อมูล Yahoo Finance
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#8c7764] hover:text-[#25170f] hover:bg-[#f5eee3] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          
          {/* Search Box with Yahoo Finance Suggestions */}
          <div className="relative">
            <label className="text-xs font-semibold text-[#4a3729] block mb-1.5">
              พิมพ์ชื่อหุ้น (เช่น PLTR, NVDA, DELTA, BTC):
            </label>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8c7764]" />
              <input
                type="text"
                autoFocus
                placeholder="พิมพ์ เช่น PLTR หรือ Palantir..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-[#ffffff] border border-[#d8cdbf] focus:border-[#26693d] rounded-xl pl-10 pr-10 py-2.5 text-sm font-medium text-[#25170f] placeholder-[#a39283] focus:outline-none shadow-sm transition-colors"
              />
              {isSearching && (
                <Loader2 className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-[#26693d] animate-spin" />
              )}
            </div>

            {/* Suggestions Dropdown */}
            {suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-[#ffffff] border border-[#d8cdbf] rounded-xl shadow-xl overflow-hidden z-20 max-h-60 overflow-y-auto">
                <div className="px-3 py-1.5 bg-[#f5eee3] text-[11px] font-semibold text-[#6e5847] border-b border-[#e5d9c9] flex items-center justify-between">
                  <span>ผลการค้นหาจาก Yahoo Finance:</span>
                  <span className="text-[10px] text-[#226339]">คลิกเพื่อดึงราคา</span>
                </div>
                {suggestions.map((item) => (
                  <div
                    key={item.symbol}
                    onClick={() => handleSelectSuggestion(item)}
                    role="button"
                    className="px-3.5 py-2.5 hover:bg-[#eaf4ed] flex items-center justify-between cursor-pointer border-b border-[#f3ede3] last:border-0 transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#25170f] font-mono">
                          {item.symbol}
                        </span>
                        <span className="text-xs text-[#7d6b5c] truncate max-w-[220px]">
                          {item.name}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#f0e8dc] text-[#524134]">
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
              <label className="text-xs font-semibold text-[#7d6b5c] block mb-2">
                🍵 ตัวอย่างยอดนิยม (คลิกเลือกได้ทันที):
              </label>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SUGGESTIONS.map((p) => (
                  <button
                    key={p.symbol}
                    type="button"
                    onClick={() => handleSelectSuggestion({ symbol: p.symbol, name: p.name, exchange: p.exchange, type: 'Equity' })}
                    className="px-2.5 py-1 rounded-lg bg-[#faf7f2] border border-[#e5dcd0] hover:border-[#b8d6bf] hover:bg-[#eaf4ed] text-xs font-mono text-[#524134] hover:text-[#1e5831] transition-all flex items-center gap-1.5"
                  >
                    <span className="font-bold">{p.symbol}</span>
                    <span className="text-[10px] text-[#7d6b5c]">{p.exchange}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Fetching Quote Loader */}
          {isFetchingQuote && (
            <div className="p-6 text-center rounded-xl bg-[#faf7f2] border border-[#ede5d8] space-y-2">
              <Loader2 className="w-6 h-6 text-[#26693d] animate-spin mx-auto" />
              <p className="text-xs font-medium text-[#4a3729]">
                กำลังดึงราคาล่าสุดและวิเคราะห์แนวโน้มจาก Yahoo Finance...
              </p>
            </div>
          )}

          {/* Selected Stock Preview Card */}
          {selectedPreview && !isFetchingQuote && (
            <div className="p-4 rounded-xl bg-[#faf7f2] border border-[#c3deca] space-y-3 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#26693d]" />
                  <span className="text-xs font-bold text-[#26693d]">
                    พบข้อมูลสดบน Yahoo Finance
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedPreview(null)}
                  className="text-xs text-[#8c7764] hover:text-[#25170f] underline"
                >
                  เลือกตัวอื่น
                </button>
              </div>

              {/* Price Row */}
              <div className="flex items-baseline justify-between p-3 rounded-lg bg-[#ffffff] border border-[#ede5d8]">
                <div>
                  <div className="font-mono font-bold text-lg text-[#25170f]">
                    {selectedPreview.symbol}
                  </div>
                  <div className="text-xs text-[#7d6b5c] truncate max-w-[200px]">
                    {selectedPreview.name}
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-mono font-bold text-lg text-[#25170f]">
                    {selectedPreview.currency}{selectedPreview.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </div>
                  <div className={`text-xs font-bold font-mono ${selectedPreview.change24h >= 0 ? 'text-[#226339]' : 'text-[#b33939]'}`}>
                    {selectedPreview.change24h >= 0 ? '+' : ''}{selectedPreview.change24h.toFixed(2)}%
                  </div>
                </div>
              </div>

              {/* AI Forecast Summary */}
              {selectedPreview.forecast && (
                <div className="text-xs space-y-1 bg-[#ffffff] p-3 rounded-lg border border-[#ede5d8]">
                  <div className="flex items-center gap-1.5 text-[#26693d] font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI Forecast: {selectedPreview.forecast.signalLabel} ({selectedPreview.forecast.confidence}%)</span>
                  </div>
                  <p className="text-[11px] text-[#635142] leading-relaxed">
                    {selectedPreview.forecast.reasoning}
                  </p>
                </div>
              )}

              {/* Confirm Button */}
              <button
                type="button"
                onClick={handleConfirmAdd}
                className="w-full py-2.5 px-4 rounded-xl bg-[#26693d] hover:bg-[#1e5831] text-white font-bold text-xs transition-colors shadow-sm flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>เพิ่ม {selectedPreview.symbol} ลงใน Watchlist</span>
              </button>
            </div>
          )}

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#ede5d8]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-medium text-[#7d6b5c] hover:text-[#25170f] transition-colors"
            >
              ปิดหน้าต่าง
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
