import React from 'react';
import { 
  Coffee, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Zap, 
  Calendar, 
  Activity, 
  ArrowUpRight,
  ArrowDownRight,
  Gauge
} from 'lucide-react';
import { MorningBriefingData } from '../types';

interface MorningBriefingProps {
  briefing: MorningBriefingData;
  onOpenAddModal: () => void;
}

export const MorningBriefing: React.FC<MorningBriefingProps> = ({ briefing }) => {
  const getSentimentBadge = (sentiment: string) => {
    switch (sentiment) {
      case 'Strong Bullish':
      case 'Bullish':
        return {
          bg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
          icon: <TrendingUp className="w-4 h-4 text-emerald-400" />
        };
      case 'Bearish':
      case 'Extreme Fear':
        return {
          bg: 'bg-rose-500/10 border-rose-500/30 text-rose-400',
          icon: <TrendingDown className="w-4 h-4 text-rose-400" />
        };
      default:
        return {
          bg: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
          icon: <Activity className="w-4 h-4 text-amber-400" />
        };
    }
  };

  const sentimentBadge = getSentimentBadge(briefing.sentiment);

  return (
    <div className="space-y-6">
      
      {/* 60-Second Digest Hero Card */}
      <div className="relative rounded-2xl bg-gradient-to-b from-[#121929] to-[#0c101b] border border-slate-800/90 p-6 md:p-8 shadow-xl overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-32 bg-amber-500/5 blur-3xl pointer-events-none rounded-full"></div>
        <div className="absolute top-0 left-10 w-80 h-32 bg-emerald-500/5 blur-3xl pointer-events-none rounded-full"></div>

        {/* Card Header Tag */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
              <Coffee className="w-3.5 h-3.5" />
              60-Second Morning Coffee Brief
            </span>
            <span className="text-slate-400 text-xs font-mono">
              {briefing.generatedAt}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              อ่านจบใน {briefing.readingTimeSeconds} วินาที
            </span>
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold font-mono ${sentimentBadge.bg}`}>
              {sentimentBadge.icon}
              {briefing.sentiment}
            </div>
          </div>
        </div>

        {/* Main Headline */}
        <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-snug mb-4">
          {briefing.headline}
        </h2>

        {/* Sub-status summary */}
        <p className="text-sm md:text-base text-slate-300 mb-6 leading-relaxed font-sans bg-slate-900/60 border border-slate-800/80 rounded-xl p-3.5">
          <span className="text-amber-400 font-semibold mr-1.5">⚡ Market Pulse:</span>
          {briefing.marketStatusSummary}
        </p>

        {/* 4 Bullet Executive Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          {briefing.executiveSummary.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3.5 rounded-xl bg-[#090d16]/80 border border-slate-800/70 hover:border-slate-700 transition-colors"
            >
              <span className="flex-shrink-0 w-6 h-6 rounded-md bg-slate-800 text-amber-400 font-mono text-xs font-bold flex items-center justify-center border border-slate-700">
                0{index + 1}
              </span>
              <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
                {item}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Quick Metrics Bar */}
        <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs">
          
          {/* Fear & Greed Index */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-slate-400">
              <Gauge className="w-4 h-4 text-amber-400" />
              <span>Fear & Greed:</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-extrabold text-white text-sm">
                {briefing.fearGreedIndex}
              </span>
              <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden flex">
                <div 
                  className={`h-full ${
                    briefing.fearGreedIndex > 60 
                      ? 'bg-emerald-400' 
                      : briefing.fearGreedIndex < 40 
                      ? 'bg-rose-400' 
                      : 'bg-amber-400'
                  }`}
                  style={{ width: `${briefing.fearGreedIndex}%` }}
                ></div>
              </div>
              <span className="text-[11px] font-bold text-slate-400">
                {briefing.fearGreedIndex >= 75 ? 'Extreme Greed' : briefing.fearGreedIndex >= 55 ? 'Greed' : briefing.fearGreedIndex <= 25 ? 'Extreme Fear' : 'Neutral'}
              </span>
            </div>
          </div>

          {/* Top Movers Today */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-slate-400 font-mono">TOP MOVERS:</span>
            {briefing.topGainers.slice(0, 2).map((g) => (
              <span key={g.symbol} className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono font-semibold text-[11px]">
                <ArrowUpRight className="w-3 h-3" />
                {g.symbol} +{g.change.toFixed(2)}%
              </span>
            ))}
            {briefing.topLosers.slice(0, 1).map((l) => (
              <span key={l.symbol} className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 font-mono font-semibold text-[11px]">
                <ArrowDownRight className="w-3 h-3" />
                {l.symbol} {l.change.toFixed(2)}%
              </span>
            ))}
          </div>

        </div>

      </div>

      {/* Grid: Key Catalysts (วิเคราะห์สาเหตุ) + Today's Watch Items (สิ่งที่ต้องจับตาวันนี้) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Key Catalysts (2 Cols) */}
        <div className="lg:col-span-2 rounded-2xl bg-[#0f1422] border border-slate-800/80 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <h3 className="font-bold text-white text-base tracking-tight">
                Key Catalysts & Drivers (ปัจจัยขับเคลื่อนตลาด)
              </h3>
            </div>
            <span className="text-[11px] font-mono text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded">
              AI ANALYZED
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {briefing.keyCatalysts.map((catalyst) => {
              const isPos = catalyst.sentiment === 'positive';
              const isNeg = catalyst.sentiment === 'negative';
              return (
                <div
                  key={catalyst.id}
                  className="p-4 rounded-xl bg-[#0a0d17] border border-slate-800/80 hover:border-slate-700/80 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-semibold">
                        {catalyst.category}
                      </span>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          isPos
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : isNeg
                            ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}
                      >
                        {catalyst.impact} Impact
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-100 mb-1.5 leading-snug">
                      {catalyst.title}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {catalyst.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* What to Watch Today (1 Col) */}
        <div className="rounded-2xl bg-[#0f1422] border border-slate-800/80 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-400" />
                <h3 className="font-bold text-white text-base tracking-tight">
                  What to Watch Today
                </h3>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 font-semibold">
                TIMELINE
              </span>
            </div>

            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              ตารางเวลาและอีเวนต์เศรษฐกิจสำคัญที่ต้องจับตาระหว่างวัน
            </p>

            <div className="space-y-3">
              {briefing.watchItemsToday.map((event, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-xl bg-[#0a0d17] border border-slate-800/80"
                >
                  <div className="flex-shrink-0 font-mono text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-1 rounded">
                    {event.time}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-slate-200">
                      {event.event}
                    </p>
                    {event.forecast && (
                      <p className="text-[11px] text-slate-400 mt-0.5 font-mono">
                        🎯 {event.forecast}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 text-center font-mono">
            UPDATED AT 06:30 AM BKK TIME
          </div>
        </div>

      </div>

    </div>
  );
};
