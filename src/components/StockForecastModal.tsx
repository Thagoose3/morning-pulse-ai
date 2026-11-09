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
          bg: 'bg-[#eaf4ed] text-[#2e7d4f] border border-[#c3deca]',
          icon: <TrendingUp className="w-4 h-4 text-[#2e7d4f]" />,
          label: 'สัญญาณบวก (มีโอกาสปรับขึ้นต่อ)'
        };
      case 'bearish':
        return {
          bg: 'bg-[#fbeded] text-[#c2493f] border border-[#f0c8c8]',
          icon: <TrendingDown className="w-4 h-4 text-[#c2493f]" />,
          label: 'สัญญาณระมัดระวัง (อาจมีแรงขายพักฐาน)'
        };
      default:
        return {
          bg: 'bg-[#fcf4ea] text-[#b07a2a] border border-[#ebd9be]',
          icon: <Activity className="w-4 h-4 text-[#b07a2a]" />,
          label: 'สัญญาณทรงตัว (แกว่งตัวสะสมกำลัง)'
        };
    }
  };

  const badge = getDirectionBadge(forecast?.direction);

  return (
    <div onClick={onClose} role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-[#2a1d14]/35 backdrop-blur-md animate-fade-in">
      <div onClick={(e) => e.stopPropagation()} className="bg-[#ffffff] border border-[#e8dfd2] rounded-t-3xl sm:rounded-3xl w-full max-w-lg max-h-[92vh] overflow-y-auto shadow-[0_30px_80px_-20px_rgba(60,40,25,0.16),0_0_0_1px_rgba(60,40,25,0.04)] text-[#2a1d14] animate-pop-in">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e8dfd2]">
          <div className="flex items-center gap-2.5">
            <span className="font-mono font-bold text-lg text-[#2a1d14]">
              {ticker.symbol}
            </span>
            <span className="text-xs text-[#8c7764]">
              {ticker.name}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#8c7764] hover:text-[#2a1d14] hover:bg-[#f5eee3] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          
          {/* Price & Direction Section */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-[#ffffff] border border-[#e8dfd2]">
            <div>
              <div className="text-xs text-[#8c7764] mb-0.5">ราคาล่าสุด (Yahoo Finance)</div>
              <div className="text-2xl font-bold text-[#2a1d14] font-mono">
                {ticker.currency}{ticker.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
              <div className={`text-xs font-bold mt-0.5 flex items-center gap-1 ${isUp ? 'text-[#2e7d4f]' : 'text-[#c2493f]'}`}>
                {isUp ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                {isUp ? '+' : ''}{ticker.change24h.toFixed(2)}%
                <span className="text-[#8c7764] font-normal">
                  ({isUp ? '+' : ''}{ticker.currency}{Math.abs(ticker.changeAmount).toFixed(2)})
                </span>
              </div>
            </div>

            {/* AI Signal Badge */}
            <div className="text-right">
              <div className="text-[11px] text-[#8c7764] mb-1 font-medium">AI Trend Forecast</div>
              <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold ${badge.bg}`}>
                {badge.icon}
                <span>{forecast?.signalLabel || 'ประเมินตามตลาด'}</span>
              </div>
              {forecast?.confidence && (
                <div className="text-[11px] text-[#8c7764] mt-1 font-mono">
                  ความเชื่อมั่น: <span className="text-[#2e7d4f] font-bold">{forecast.confidence}%</span>
                </div>
              )}
            </div>
          </div>

          {/* Support & Resistance */}
          {forecast && (
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-[#ffffff] border border-[#e8dfd2]">
                <div className="text-[11px] text-[#8c7764] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2e7d4f]" />
                  <span>แนวรับสำคัญ (Support)</span>
                </div>
                <div className="font-mono font-bold text-base text-[#2e7d4f] mt-1">
                  {forecast.support}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#ffffff] border border-[#e8dfd2]">
                <div className="text-[11px] text-[#8c7764] flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5 text-[#c2493f]" />
                  <span>แนวต้านสำคัญ (Resistance)</span>
                </div>
                <div className="font-mono font-bold text-base text-[#c2493f] mt-1">
                  {forecast.resistance}
                </div>
              </div>
            </div>
          )}

          {/* AI Analysis & News Reasoning */}
          <div className="p-4 rounded-xl bg-[#ffffff] border border-[#e8dfd2] space-y-2">
            <div className="text-xs font-bold text-[#2a1d14] flex items-center gap-1.5">
              <Newspaper className="w-4 h-4 text-[#b07a2a]" />
              <span>บทวิเคราะห์คาดการณ์ & ข่าวตลาดที่เกี่ยวข้อง:</span>
            </div>
            <p className="text-xs text-[#5b4636] leading-relaxed font-sans">
              {forecast?.reasoning || 'ราคามีการเคลื่อนไหวตามกรอบเทคนิคและปัจจัยพื้นฐานของอุตสาหกรรมในภาพรวม'}
            </p>
            {forecast?.keyNews && (
              <div className="pt-2 mt-2 border-t border-[#e8dfd2] text-[11px] text-[#8c7764]">
                <span className="text-[#b07a2a] font-semibold">ข่าวหนุนล่าสุด:</span> {forecast.keyNews}
              </div>
            )}
          </div>

          {/* Read Full Details Source Link */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
            <a
              href={forecast?.sourceUrl || `https://finance.yahoo.com/quote/${ticker.symbol}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#2e7d4f] hover:bg-[#256a42] text-white font-semibold text-xs transition-colors shadow-sm"
            >
              <span>อ่านข่าวต้นฉบับ & ข้อมูลเต็มบน Yahoo Finance</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onClose}
              className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-[#f5eee3] hover:bg-[#f5eee3] text-[#2a1d14] text-xs font-medium transition-colors"
            >
              ปิดหน้าต่าง
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
