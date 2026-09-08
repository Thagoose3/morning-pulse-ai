import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { TickerItem, AssetCategory } from '../types';

interface AddTickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTicker: (ticker: TickerItem) => void;
}

const PRESET_SUGGESTIONS = [
  { symbol: 'META', name: 'Meta Platforms', category: 'us-tech' as AssetCategory, price: 585.50, currency: '$', change24h: 1.85 },
  { symbol: 'GOOGL', name: 'Alphabet Inc', category: 'us-tech' as AssetCategory, price: 182.40, currency: '$', change24h: 0.95 },
  { symbol: 'AMD', name: 'Advanced Micro Devices', category: 'us-tech' as AssetCategory, price: 145.20, currency: '$', change24h: 3.40 },
  { symbol: 'BNB/USDT', name: 'BNB Chain', category: 'crypto' as AssetCategory, price: 650.00, currency: '$', change24h: 1.20 },
  { symbol: 'XRP/USDT', name: 'Ripple', category: 'crypto' as AssetCategory, price: 2.45, currency: '$', change24h: 7.80 },
  { symbol: 'SILVER', name: 'Silver Spot', category: 'commodity' as AssetCategory, price: 31.80, currency: '$', change24h: 1.15 },
  { symbol: 'ADVANC.BK', name: 'Advanced Info Service', category: 'thai' as AssetCategory, price: 285.00, currency: 'THB', change24h: 0.70 },
  { symbol: 'KBANK.BK', name: 'Kasikornbank', category: 'thai' as AssetCategory, price: 152.00, currency: 'THB', change24h: 1.33 },
];

export const AddTickerModal: React.FC<AddTickerModalProps> = ({
  isOpen,
  onClose,
  onAddTicker
}) => {
  const [symbol, setSymbol] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState<AssetCategory>('us-tech');
  const [price, setPrice] = useState('');
  const [change24h, setChange24h] = useState('');
  const [currency, setCurrency] = useState('$');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!symbol.trim() || !name.trim()) return;

    const parsedPrice = parseFloat(price) || 100.0;
    const parsedChange = parseFloat(change24h) || 0.0;
    const changeAmt = parseFloat(((parsedPrice * parsedChange) / 100).toFixed(2));

    // Generate realistic sparkline
    const sparkline = [
      parsedPrice * (1 - (parsedChange / 100) * 0.8),
      parsedPrice * (1 - (parsedChange / 100) * 0.5),
      parsedPrice * (1 - (parsedChange / 100) * 0.3),
      parsedPrice * (1 - (parsedChange / 100) * 0.1),
      parsedPrice
    ];

    const newTicker: TickerItem = {
      id: `custom-${Date.now()}-${symbol.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
      symbol: symbol.toUpperCase().trim(),
      name: name.trim(),
      category,
      price: parsedPrice,
      currency,
      change24h: parsedChange,
      changeAmount: changeAmt,
      high24h: parseFloat((parsedPrice * 1.02).toFixed(2)),
      low24h: parseFloat((parsedPrice * 0.98).toFixed(2)),
      sparkline,
      isCustom: true
    };

    onAddTicker(newTicker);
    onClose();
  };

  const handleAddPreset = (preset: typeof PRESET_SUGGESTIONS[0]) => {
    const changeAmt = parseFloat(((preset.price * preset.change24h) / 100).toFixed(2));
    const sparkline = [
      preset.price * 0.98,
      preset.price * 0.99,
      preset.price * 0.995,
      preset.price * 1.005,
      preset.price
    ];

    const newTicker: TickerItem = {
      id: `preset-${Date.now()}-${preset.symbol.toLowerCase()}`,
      symbol: preset.symbol,
      name: preset.name,
      category: preset.category,
      price: preset.price,
      currency: preset.currency,
      change24h: preset.change24h,
      changeAmount: changeAmt,
      high24h: preset.price * 1.015,
      low24h: preset.price * 0.985,
      sparkline,
      isCustom: true
    };

    onAddTicker(newTicker);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#0f1422] border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
              <Plus className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-white tracking-tight">
              เพิ่ม Ticker ลงใน Watchlist
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          
          {/* Quick Preset Badges */}
          <div>
            <label className="text-xs font-mono text-slate-400 block mb-2">
              ⚡ รายการยอดนิยม (คลิกเพื่อเพิ่มทันที):
            </label>
            <div className="flex flex-wrap gap-2">
              {PRESET_SUGGESTIONS.map((p) => (
                <button
                  key={p.symbol}
                  onClick={() => handleAddPreset(p)}
                  className="px-2.5 py-1 rounded-lg bg-[#0a0d17] border border-slate-800 hover:border-amber-500/50 hover:bg-amber-500/10 text-xs font-mono text-slate-300 hover:text-amber-300 transition-all flex items-center gap-1.5"
                >
                  <span>{p.symbol}</span>
                  <span className="text-[10px] text-emerald-400 font-bold">
                    +{p.change24h}%
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="w-full h-[1px] bg-slate-800"></div>

          {/* Custom Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Ticker Symbol *
                </label>
                <input
                  type="text"
                  required
                  placeholder="เช่น META, BNB, DELTA"
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value)}
                  className="w-full bg-[#0a0d17] border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  ชื่อเต็ม / บริษัท *
                </label>
                <input
                  type="text"
                  required
                  placeholder="เช่น Meta Platforms Inc"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#0a0d17] border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  หมวดหมู่ (Category)
                </label>
                <select
                  value={category}
                  onChange={(e) => {
                    const val = e.target.value as AssetCategory;
                    setCategory(val);
                    if (val === 'thai') setCurrency('THB');
                    else setCurrency('$');
                  }}
                  className="w-full bg-[#0a0d17] border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="us-tech">💻 US Tech / Equities</option>
                  <option value="crypto">🪙 Crypto</option>
                  <option value="commodity">🛢️ Commodities / ทองคำ</option>
                  <option value="thai">🇹🇭 Thai Stocks (SET)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  สกุลเงิน (Currency)
                </label>
                <input
                  type="text"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  placeholder="$ หรือ THB"
                  className="w-full bg-[#0a0d17] border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  ราคาปัจจุบัน
                </label>
                <input
                  type="number"
                  step="any"
                  placeholder="เช่น 150.50"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full bg-[#0a0d17] border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  การเปลี่ยนแปลง 24h (%)
                </label>
                <input
                  type="number"
                  step="any"
                  placeholder="เช่น +2.5 หรือ -1.2"
                  value={change24h}
                  onChange={(e) => setChange24h(e.target.value)}
                  className="w-full bg-[#0a0d17] border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-white transition-colors"
              >
                ยกเลิก
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors font-mono"
              >
                + บันทึก Ticker
              </button>
            </div>

          </form>

        </div>

      </div>
    </div>
  );
};
