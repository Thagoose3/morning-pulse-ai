import React from 'react';
import { TrendingUp, TrendingDown, Activity, Sparkles, CheckCircle2 } from 'lucide-react';
import { MorningBriefingData } from '../types';

interface MorningBriefingProps {
  briefing: MorningBriefingData;
  onOpenAddModal: () => void;
}

export const MorningBriefing: React.FC<MorningBriefingProps> = ({ briefing }) => {
  const getSentimentInfo = (sentiment: string) => {
    switch (sentiment) {
      case 'Strong Bullish':
      case 'Bullish':
        return {
          label: 'ตลาดสดใส (Bullish)',
          badge: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
          icon: <TrendingUp className="w-4 h-4 text-emerald-400" />
        };
      case 'Bearish':
      case 'Extreme Fear':
        return {
          label: 'ตลาดชะลอตัว (Bearish)',
          badge: 'bg-rose-500/15 text-rose-400 border border-rose-500/30',
          icon: <TrendingDown className="w-4 h-4 text-rose-400" />
        };
      default:
        return {
          label: 'ตลาดทรงตัว (Neutral)',
          badge: 'bg-amber-500/15 text-amber-400 border border-amber-500/30',
          icon: <Activity className="w-4 h-4 text-amber-400" />
        };
    }
  };

  const sentiment = getSentimentInfo(briefing.sentiment);

  return (
    <div className="space-y-6">
      
      {/* Main Coffee Briefing Card */}
      <div className="rounded-2xl bg-[#10141e] border border-slate-800/80 p-6 md:p-8 shadow-sm">
        
        {/* Top Tag & Sentiment */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-amber-400 flex items-center gap-1.5">
              <span>☕ สรุปเช้านี้</span>
            </span>
            <span className="text-slate-500 text-xs">•</span>
            <span className="text-xs text-slate-400">
              {briefing.generatedAt}
            </span>
          </div>

          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${sentiment.badge}`}>
            {sentiment.icon}
            <span>{sentiment.label}</span>
          </div>
        </div>

        {/* Big Clean Headline */}
        <h2 className="text-lg md:text-2xl font-bold text-white leading-snug mb-5">
          {briefing.headline}
        </h2>

        {/* 4 Clean Bullet Points */}
        <div className="space-y-3 mb-6">
          {briefing.executiveSummary.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-slate-300 leading-relaxed">
                {item}
              </p>
            </div>
          ))}
        </div>

        {/* Simple 3 Catalysts Row */}
        <div className="pt-5 border-t border-slate-800/70">
          <p className="text-xs font-medium text-slate-400 mb-3 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            3 ปัจจัยสำคัญที่ขับเคลื่อนตลาดวันนี้:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {briefing.keyCatalysts.slice(0, 3).map((cat) => (
              <div
                key={cat.id}
                className="p-3 rounded-xl bg-[#0a0d14] border border-slate-800/60"
              >
                <div className="text-xs font-semibold text-slate-200 mb-1">
                  {cat.title}
                </div>
                <p className="text-xs text-slate-400 leading-normal">
                  {cat.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
