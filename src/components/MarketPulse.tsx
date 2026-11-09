import React, { useMemo, useState } from 'react';
import { Gauge, Flame, Snowflake, CalendarClock, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { MorningBriefingData, TickerItem } from '../types';
import { CountUp, Reveal, SectionHeading } from './ui';

interface MarketPulseProps {
  briefing: MorningBriefingData;
  tickers: TickerItem[];
}

const moodOf = (v: number) => {
  if (v <= 25) return { label: 'กลัวสุดขีด', en: 'Extreme Fear', color: '#f08a84' };
  if (v <= 45) return { label: 'กลัว', en: 'Fear', color: '#f0a67a' };
  if (v <= 55) return { label: 'เป็นกลาง', en: 'Neutral', color: '#e6b86e' };
  if (v <= 75) return { label: 'โลภ', en: 'Greed', color: '#b5dc9a' };
  return { label: 'โลภสุดขีด', en: 'Extreme Greed', color: '#8fd4a0' };
};

/** Semi-circular fear & greed dial */
const MoodGauge: React.FC<{ value: number }> = ({ value }) => {
  const v = Math.max(0, Math.min(100, value));
  const mood = moodOf(v);
  const angle = Math.PI * (1 - v / 100); // 180° → 0°
  const cx = 100, cy = 100, r = 80;
  const nx = cx + (r - 14) * Math.cos(angle);
  const ny = cy - (r - 14) * Math.sin(angle);
  const arc = (from: number, to: number) => {
    const a1 = Math.PI * (1 - from / 100);
    const a2 = Math.PI * (1 - to / 100);
    return `M ${cx + r * Math.cos(a1)} ${cy - r * Math.sin(a1)} A ${r} ${r} 0 0 1 ${cx + r * Math.cos(a2)} ${cy - r * Math.sin(a2)}`;
  };
  const segments: [number, number, string][] = [
    [0, 25, 'rgba(240,138,132,0.16)'],
    [25, 45, 'rgba(240,166,122,0.16)'],
    [45, 55, 'rgba(230,184,110,0.16)'],
    [55, 75, 'rgba(181,220,154,0.16)'],
    [75, 100, 'rgba(143,212,160,0.16)']
  ];

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 200 116" className="w-full max-w-[220px]" role="img" aria-label={`ดัชนีอารมณ์ตลาด ${v} (${mood.label})`}>
        {segments.map(([a, b, c]) => (
          <path key={a} d={arc(a + 0.8, b - 0.8)} stroke={c} strokeWidth="14" fill="none" strokeLinecap="round" />
        ))}
        <defs>
          <filter id="gaugeGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <path d={arc(0.8, Math.max(1, v))} stroke={mood.color} strokeWidth="14" fill="none" strokeLinecap="round" filter="url(#gaugeGlow)" />
        <line x1={cx} y1={cy} x2={nx} y2={ny} stroke="#f3ebe0" strokeWidth="3" strokeLinecap="round" style={{ transition: 'all 0.8s cubic-bezier(0.22,1,0.36,1)' }} />
        <circle cx={cx} cy={cy} r="6" fill="#f3ebe0" />
        <circle cx={cx} cy={cy} r="2.5" fill="#0e0b09" />
      </svg>
      <div className="-mt-1 text-center">
        <div className="font-mono text-5xl font-bold tabular-nums" style={{ color: mood.color, textShadow: `0 0 30px ${mood.color}55` }}><CountUp value={v} /></div>
        <div className="text-sm font-semibold text-[#f3ebe0]">{mood.label}</div>
        <div className="text-[11px] text-[#9a8a7c]">{mood.en}</div>
      </div>
    </div>
  );
};

const Card: React.FC<{ className?: string; children: React.ReactNode }> = ({ className = '', children }) => (
  <div className={`glass spotlight rounded-3xl p-6 h-full ${className}`}>
    {children}
  </div>
);

const CardTitle: React.FC<{ icon: React.ReactNode; title: string; hint?: string }> = ({ icon, title, hint }) => (
  <div className="flex items-center justify-between mb-4">
    <h4 className="flex items-center gap-2 text-sm font-bold text-[#f3ebe0]">
      <span className="p-1.5 rounded-lg bg-[#e6b86e]/10 text-[#e6b86e]">{icon}</span>
      {title}
    </h4>
    {hint && <span className="text-[10px] text-[#9a8a7c]">{hint}</span>}
  </div>
);

const IMPACT_DOT = {
  High: 'bg-[#f08a84] shadow-[0_0_12px_rgba(240,138,132,0.8)]',
  Medium: 'bg-[#e6b86e] shadow-[0_0_12px_rgba(230,184,110,0.8)]',
  Low: 'bg-[#8fd4a0] shadow-[0_0_12px_rgba(143,212,160,0.8)]'
} as const;

type MoverScope = 'stocks' | 'crypto';
const isStock = (t: TickerItem) => t.category === 'us-tech' || t.category === 'thai';

export const MarketPulse: React.FC<MarketPulseProps> = ({ briefing, tickers }) => {
  const [scope, setScope] = useState<MoverScope>('stocks');
  const { gainers, losers } = useMemo(() => {
    const pool = tickers.filter((t) => (scope === 'crypto' ? t.category === 'crypto' : isStock(t)));
    const sorted = [...pool].sort((a, b) => b.change24h - a.change24h);
    return {
      gainers: sorted.filter((t) => t.change24h > 0).slice(0, 3),
      losers: sorted.filter((t) => t.change24h < 0).reverse().slice(0, 3),
    };
  }, [tickers, scope]);

  const allUp = tickers.filter((t) => t.change24h > 0).length;
  const allDown = tickers.filter((t) => t.change24h < 0).length;
  const total = Math.max(1, allUp + allDown);
  const upPct = Math.round((allUp / total) * 100);
  const maxAbs = Math.max(1, ...[...gainers, ...losers].map((t) => Math.abs(t.change24h)));

  const MoverRow: React.FC<{ t: TickerItem }> = ({ t }) => {
    const up = t.change24h >= 0;
    const width = `${Math.max(8, (Math.abs(t.change24h) / maxAbs) * 100)}%`;
    return (
      <li className="flex items-center gap-3">
        <span className="w-16 font-mono text-[13px] font-semibold text-[#f3ebe0] truncate">{t.symbol}</span>
        <span className="flex-1 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
          <span
            className={`block h-full rounded-full ${up ? 'bg-[#8fd4a0] shadow-[0_0_10px_rgba(143,212,160,0.7)]' : 'bg-[#f08a84] shadow-[0_0_10px_rgba(240,138,132,0.7)]'}`}
            style={{ width, transition: 'width 0.8s cubic-bezier(0.22,1,0.36,1)' }}
          />
        </span>
        <span className={`w-16 text-right font-mono text-[13px] font-bold tabular-nums ${up ? 'text-[#8fd4a0]' : 'text-[#f08a84]'}`}>
          {up ? '+' : ''}{t.change24h.toFixed(2)}%
        </span>
      </li>
    );
  };

  return (
    <div>
      <Reveal>
        <SectionHeading index="03" kicker="Market Pulse" title="ชีพจรตลาดตอนนี้" />
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5">
        {/* Mood gauge */}
        <Reveal className="md:col-span-4" delay={0}>
        <Card>
          <CardTitle icon={<Gauge className="w-3.5 h-3.5" />} title="อารมณ์ตลาด" hint="Fear & Greed" />
          <MoodGauge value={briefing.fearGreedIndex} />
          <div className="mt-5">
            <div className="flex justify-between text-[11px] text-[#9a8a7c] mb-1.5">
              <span>ขึ้น <b className="text-[#8fd4a0] font-mono">{allUp}</b></span>
              <span className="text-[#9a8a7c]">สัดส่วนหุ้นในลิสต์</span>
              <span>ลง <b className="text-[#f08a84] font-mono">{allDown}</b></span>
            </div>
            <div className="flex h-1.5 gap-1 rounded-full overflow-hidden">
              <span className="rounded-full bg-[#8fd4a0] transition-all duration-700" style={{ width: `${upPct}%` }} />
              <span className="rounded-full bg-[#f08a84] transition-all duration-700" style={{ width: `${100 - upPct}%` }} />
            </div>
          </div>
        </Card>
        </Reveal>

        {/* Movers */}
        <Reveal className="md:col-span-4" delay={110}>
        <Card>
          <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
            <h4 className="flex items-center gap-2 text-sm font-bold text-[#f3ebe0] whitespace-nowrap">
              <span className="p-1.5 rounded-lg bg-[#e6b86e]/10 text-[#e6b86e]"><Flame className="w-3.5 h-3.5" /></span>
              ตัวแรงประจำวัน
            </h4>
            <div className="flex p-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-semibold" role="tablist">
              {([['stocks', '📈 หุ้น'], ['crypto', '🪙 เหรียญ']] as [MoverScope, string][]).map(([id, label]) => (
                <button
                  key={id}
                  role="tab"
                  aria-selected={scope === id}
                  onClick={() => setScope(id)}
                  className={`px-2.5 py-1 rounded-full transition-colors ${scope === id ? 'bg-[#f3ebe0] text-[#0e0b09] shadow-sm' : 'text-[#9a8a7c] hover:text-[#f3ebe0]'}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-5">
            <div>
              <p className="flex items-center gap-1 text-[11px] font-semibold text-[#8fd4a0] mb-2">
                <ArrowUpRight className="w-3.5 h-3.5" /> บวกแรงสุด
              </p>
              {gainers.length ? (
                <ul className="space-y-2.5">{gainers.map((t) => <MoverRow key={t.id} t={t} />)}</ul>
              ) : (
                <p className="text-xs text-[#9a8a7c]">ยังไม่มี{scope === 'crypto' ? 'เหรียญ' : 'หุ้น'}ที่ปรับขึ้น</p>
              )}
            </div>
            <div>
              <p className="flex items-center gap-1 text-[11px] font-semibold text-[#f08a84] mb-2">
                <ArrowDownRight className="w-3.5 h-3.5" /> ลบแรงสุด
              </p>
              {losers.length ? (
                <ul className="space-y-2.5">{losers.map((t) => <MoverRow key={t.id} t={t} />)}</ul>
              ) : (
                <p className="text-xs text-[#9a8a7c] flex items-center gap-1"><Snowflake className="w-3 h-3" /> ไม่มี{scope === 'crypto' ? 'เหรียญ' : 'หุ้น'}ที่ปรับลง</p>
              )}
            </div>
          </div>
        </Card>
        </Reveal>

        {/* Today's agenda */}
        <Reveal className="md:col-span-4" delay={220}>
        <Card>
          <CardTitle icon={<CalendarClock className="w-3.5 h-3.5" />} title="ตารางวันนี้" hint="เวลาไทย" />
          {briefing.watchItemsToday.length ? (
            <ol className="relative ml-1.5 border-l border-white/10 space-y-6">
              {briefing.watchItemsToday.map((w, i) => {
                const content = (
                  <>
                    <span className={`absolute -left-[7px] top-1.5 w-3 h-3 rounded-full ring-4 ring-[#1b1612] ${IMPACT_DOT[w.impact] ?? IMPACT_DOT.Low}`} />
                    <div className="font-mono text-[12px] font-semibold text-[#e6b86e]">{w.time}</div>
                    <div className="text-[14px] font-semibold text-[#f3ebe0] leading-snug mt-0.5">{w.event}</div>
                    {w.forecast && <div className="text-[12px] text-[#9a8a7c] mt-0.5">{w.forecast}</div>}
                    <span className={`inline-block mt-1.5 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      w.impact === 'High' ? 'bg-[#f08a84]/10 text-[#f08a84]' : w.impact === 'Medium' ? 'bg-[#e6b86e]/10 text-[#e6b86e]' : 'bg-[#8fd4a0]/10 text-[#8fd4a0]'
                    }`}>
                      ผลกระทบ{w.impact === 'High' ? 'สูง' : w.impact === 'Medium' ? 'กลาง' : 'ต่ำ'}
                    </span>
                  </>
                );
                return (
                  <li key={i} className="relative pl-5">
                    {w.sourceUrl ? (
                      <a href={w.sourceUrl} target="_blank" rel="noopener noreferrer" className="block hover:opacity-80">{content}</a>
                    ) : content}
                  </li>
                );
              })}
            </ol>
          ) : (
            <p className="text-xs text-[#9a8a7c]">วันนี้ไม่มีเหตุการณ์สำคัญที่ต้องจับตา ☕</p>
          )}
        </Card>
        </Reveal>
      </div>
    </div>
  );
};
