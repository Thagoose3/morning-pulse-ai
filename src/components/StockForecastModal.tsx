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
          bg: 'bg-[#eaf4ed] text-[#226339] border border-[#c3deca]',
          icon: <TrendingUp className="w-4 h-4 text-[#226339]" />,
          label: 'สัญญาณบวก (มีโอกาสปรับขึ้นต่อ)'
        };
      case 'bearish':
        return {
          bg: 'bg-[#faeded] text-[#b33939] border border-[#f0c8c8]',
          icon: <TrendingDown className="w-4 h-4 text-[#b33939]" />,
          label: 'สัญญาณระมัดระวัง (อาจมีแรงขายพักฐาน)'
        };
      default:
        return {
          bg: 'bg-[#fcf5ea] text-[#8f5d23] border border-[#ebd9be]',
          icon: <Activity className="w-4 h-4 text-[#8f5d23]" />,
          label: 'สัญญาณทรงตัว (แกว่งตัวสะสมกำลัง)'
        };
    }
  };

  const badge = getDirectionBadge(forecast?.direction);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#ffffff] border border-[#e5dcd0] rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl text-[#3d2e24]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#ede5d8]">
          <div className="flex items-center gap-2.5">
            <span className="font-mono font-bold text-lg text-[#25170f]">
              {ticker.symbol}
            </span>
            <span className="text-xs text-[#7d6b5c]">
              {ticker.name}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#8c7764] hover:text-[#25170f] hover:bg-[#f5eee3] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          
          {/* Price & Direction Section */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-[#faf7f2] border border-[#ede5d8]">
            <div>
              <div className="text-xs text-[#7d6b5c] mb-0.5">ราคาล่าสุด (Yahoo Finance)</div>
              <div className="text-2xl font-bold text-[#25170f] font-mono">
                {ticker.currency}{ticker.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
              <div className={`text-xs font-bold mt-0.5 flex items-center gap-1 ${isUp ? 'text-[#226339]' : 'text-[#b33939]'}`}>
                {isUp ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                {isUp ? '+' : ''}{ticker.change24h.toFixed(2)}%
                <span className="text-[#8c7764] font-normal">
                  ({isUp ? '+' : ''}{ticker.currency}{Math.abs(ticker.changeAmount).toFixed(2)})
                </span>
              </div>
            </div>

            {/* AI Signal Badge */}
            <div className="text-right">
              <div className="text-[11px] text-[#7d6b5c] mb-1 font-medium">AI Trend Forecast</div>
              <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold ${badge.bg}`}>
                {badge.icon}
                <span>{forecast?.signalLabel || 'ประเมินตามตลาด'}</span>
              </div>
              {forecast?.confidence && (
                <div className="text-[11px] text-[#7d6b5c] mt-1 font-mono">
                  ความเชื่อมั่น: <span className="text-[#26693d] font-bold">{forecast.confidence}%</span>
                </div>
              )}
            </div>
          </div>

          {/* Support & Resistance */}
          {forecast && (
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-[#faf7f2] border border-[#ede5d8]">
                <div className="text-[11px] text-[#7d6b5c] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#26693d]" />
                  <span>แนวรับสำคัญ (Support)</span>
                </div>
                <div className="font-mono font-bold text-base text-[#26693d] mt-1">
                  {forecast.support}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#faf7f2] border border-[#ede5d8]">
                <div className="text-[11px] text-[#7d6b5c] flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5 text-[#b33939]" />
                  <span>แนวต้านสำคัญ (Resistance)</span>
                </div>
                <div className="font-mono font-bold text-base text-[#b33939] mt-1">
                  {forecast.resistance}
                </div>
              </div>
            </div>
          )}

          {/* AI Analysis & News Reasoning */}
          <div className="p-4 rounded-xl bg-[#faf7f2] border border-[#ede5d8] space-y-2">
            <div className="text-xs font-bold text-[#35251b] flex items-center gap-1.5">
              <Newspaper className="w-4 h-4 text-[#8a5d2c]" />
              <span>บทวิเคราะห์คาดการณ์ & ข่าวตลาดที่เกี่ยวข้อง:</span>
            </div>
            <p className="text-xs text-[#524134] leading-relaxed font-sans">
              {forecast?.reasoning || 'ราคามีการเคลื่อนไหวตามกรอบเทคนิคและปัจจัยพื้นฐานของอุตสาหกรรมในภาพรวม'}
            </p>
            {forecast?.keyNews && (
              <div className="pt-2 mt-2 border-t border-[#ede5d8] text-[11px] text-[#7d6b5c]">
                <span className="text-[#8a5d2c] font-semibold">ข่าวหนุนล่าสุด:</span> {forecast.keyNews}
              </div>
            )}
          </div>

          {/* Read Full Details Source Link */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
            <a
              href={forecast?.sourceUrl || `https://finance.yahoo.com/quote/${ticker.symbol}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#26693d] hover:bg-[#1e5831] text-white font-semibold text-xs transition-colors shadow-sm"
            >
              <span>อ่านข่าวต้นฉบับ & ข้อมูลเต็มบน Yahoo Finance</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onClose}
              className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-[#f5eee3] hover:bg-[#ede3d4] text-[#4a3729] text-xs font-medium transition-colors"
            >
              ปิดหน้าต่าง
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
