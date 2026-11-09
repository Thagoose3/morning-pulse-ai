import React from 'react';
import { X, TrendingUp, TrendingDown, Activity, ExternalLink, ShieldCheck, Newspaper, Compass } from 'lucide-react';
import { TickerItem } from '../types';

interface StockForecastModalProps {
  ticker: TickerItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const StockForecastModal: React.FC<StockForecastModalProps> = ({
  ticker,
  isOpen,
  onClose
}) => {
  if (!isOpen || !ticker) return null;

  const isUp = ticker.change24h >= 0;
  const forecast = ticker.forecast;

  const getDirectionBadge = (dir?: 'bullish' | 'bearish' | 'neutral') => {
    switch (dir) {
      case 'bullish':
        return {
          bg: 'bg-[#16251b] text-[#8fd4a0] border border-[#2f5a3c]',
          icon: <TrendingUp className="w-4 h-4 text-[#8fd4a0]" />,
          label: 'สัญญาณบวก (มีโอกาสปรับขึ้นต่อ)'
        };
      case 'bearish':
        return {
          bg: 'bg-[#2a1615] text-[#f08a84] border border-[#4a2622]',
          icon: <TrendingDown className="w-4 h-4 text-[#f08a84]" />,
          label: 'สัญญาณระมัดระวัง (อาจมีแรงขายพักฐาน)'
        };
      default:
        return {
          bg: 'bg-[#2a2014] text-[#e6b86e] border border-[#4a3920]',
          icon: <Activity className="w-4 h-4 text-[#e6b86e]" />,
          label: 'สัญญาณทรงตัว (แกว่งตัวสะสมกำลัง)'
        };
    }
  };

  const badge = getDirectionBadge(forecast?.direction);

  return (
    <div onClick={onClose} role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div onClick={(e) => e.stopPropagation()} className="bg-[#1b1612] border border-[#2e2620] rounded-t-3xl sm:rounded-3xl w-full max-w-lg max-h-[92vh] overflow-y-auto shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,240,220,0.04)] text-[#f3ebe0] animate-pop-in">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2e2620]">
          <div className="flex items-center gap-2.5">
            <span className="font-mono font-bold text-lg text-[#f3ebe0]">
              {ticker.symbol}
            </span>
            <span className="text-xs text-[#9a8a7c]">
              {ticker.name}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#9a8a7c] hover:text-[#f3ebe0] hover:bg-[#231d18] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          
          {/* Price & Direction Section */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-[#1b1612] border border-[#2e2620]">
            <div>
              <div className="text-xs text-[#9a8a7c] mb-0.5">ราคาล่าสุด (Yahoo Finance)</div>
              <div className="text-2xl font-bold text-[#f3ebe0] font-mono">
                {ticker.currency}{ticker.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
              <div className={`text-xs font-bold mt-0.5 flex items-center gap-1 ${isUp ? 'text-[#8fd4a0]' : 'text-[#f08a84]'}`}>
                {isUp ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                {isUp ? '+' : ''}{ticker.change24h.toFixed(2)}%
                <span className="text-[#9a8a7c] font-normal">
                  ({isUp ? '+' : ''}{ticker.currency}{Math.abs(ticker.changeAmount).toFixed(2)})
                </span>
              </div>
            </div>

            {/* AI Signal Badge */}
            <div className="text-right">
              <div className="text-[11px] text-[#9a8a7c] mb-1 font-medium">AI Trend Forecast</div>
              <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold ${badge.bg}`}>
                {badge.icon}
                <span>{forecast?.signalLabel || 'ประเมินตามตลาด'}</span>
              </div>
              {forecast?.confidence && (
                <div className="text-[11px] text-[#9a8a7c] mt-1 font-mono">
                  ความเชื่อมั่น: <span className="text-[#8fd4a0] font-bold">{forecast.confidence}%</span>
                </div>
              )}
            </div>
          </div>

          {/* Support & Resistance */}
          {forecast && (
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-[#1b1612] border border-[#2e2620]">
                <div className="text-[11px] text-[#9a8a7c] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#8fd4a0]" />
                  <span>แนวรับสำคัญ (Support)</span>
                </div>
                <div className="font-mono font-bold text-base text-[#8fd4a0] mt-1">
                  {forecast.support}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#1b1612] border border-[#2e2620]">
                <div className="text-[11px] text-[#9a8a7c] flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5 text-[#f08a84]" />
                  <span>แนวต้านสำคัญ (Resistance)</span>
                </div>
                <div className="font-mono font-bold text-base text-[#f08a84] mt-1">
                  {forecast.resistance}
                </div>
              </div>
            </div>
          )}

          {/* AI Analysis & News Reasoning */}
          <div className="p-4 rounded-xl bg-[#1b1612] border border-[#2e2620] space-y-2">
            <div className="text-xs font-bold text-[#f3ebe0] flex items-center gap-1.5">
              <Newspaper className="w-4 h-4 text-[#e6b86e]" />
              <span>บทวิเคราะห์คาดการณ์ & ข่าวตลาดที่เกี่ยวข้อง:</span>
            </div>
            <p className="text-xs text-[#cbbdab] leading-relaxed font-sans">
              {forecast?.reasoning || 'ราคามีการเคลื่อนไหวตามกรอบเทคนิคและปัจจัยพื้นฐานของอุตสาหกรรมในภาพรวม'}
            </p>
            {forecast?.keyNews && (
              <div className="pt-2 mt-2 border-t border-[#2e2620] text-[11px] text-[#9a8a7c]">
                <span className="text-[#e6b86e] font-semibold">ข่าวหนุนล่าสุด:</span> {forecast.keyNews}
              </div>
            )}
          </div>

          {/* Read Full Details Source Link */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
            <a
              href={forecast?.sourceUrl || `https://finance.yahoo.com/quote/${ticker.symbol}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#3f8f5a] hover:bg-[#4fa36b] text-white font-semibold text-xs transition-colors shadow-sm"
            >
              <span>อ่านข่าวต้นฉบับ & ข้อมูลเต็มบน Yahoo Finance</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onClose}
              className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-[#231d18] hover:bg-[#231d18] text-[#f3ebe0] text-xs font-medium transition-colors"
            >
              ปิดหน้าต่าง
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
