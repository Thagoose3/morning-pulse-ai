import React, { useMemo, useState } from 'react';
import { Gauge, Flame, Snowflake, CalendarClock, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { MorningBriefingData, TickerItem } from '../types';

interface MarketPulseProps {
  briefing: MorningBriefingData;
  tickers: TickerItem[];
}

const moodOf = (v: number) => {
  if (v <= 25) return { label: 'กลัวสุดขีด', en: 'Extreme Fear', color: '#b84848' };
  if (v <= 45) return { label: 'กลัว', en: 'Fear', color: '#cf7a4a' };
  if (v <= 55) return { label: 'เป็นกลาง', en: 'Neutral', color: '#c99a5b' };
  if (v <= 75) return { label: 'โลภ', en: 'Greed', color: '#5f9a6e' };
  return { label: 'โลภสุดขีด', en: 'Extreme Greed', color: '#2e6b45' };
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
    [0, 25, '#e9b8b0'],
    [25, 45, '#efcfb2'],
    [45, 55, '#efe0c4'],
    [55, 75, '#c9e2cf'],
    [75, 100, '#a7d1b2']
  ];

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 200 116" className="w-full max-w-[220px]" role="img" aria-label={`ดัชนีอารมณ์ตลาด ${v} (${mood.label})`}>
        {segments.map(([a, b, c]) => (
          <path key={a} d={arc(a + 0.8, b - 0.8)} stroke={c} strokeWidth="14" fill="none" strokeLinecap="round" />
        ))}
        <path d={arc(0.8, Math.max(1, v))} stroke={mood.color} strokeWidth="14" fill="none" strokeLinecap="round" opacity="0.9" />
        <line x1={cx} y1={cy} x2={nx} y2={ny} stroke="#2d1e14" strokeWidth="3" strokeLinecap="round" style={{ transition: 'all 0.8s cubic-bezier(0.22,1,0.36,1)' }} />
        <circle cx={cx} cy={cy} r="6" fill="#2d1e14" />
        <circle cx={cx} cy={cy} r="2.5" fill="#fbf9f5" />
      </svg>
      <div className="-mt-1 text-center">
        <div className="font-mono text-4xl font-bold tabular-nums" style={{ color: mood.color }}>{v}</div>
        <div className="text-sm font-semibold text-[#2d1e14]">{mood.label}</div>
        <div className="text-[11px] text-[#9c8979]">{mood.en}</div>
      </div>
    </div>
  );
};

const Card: React.FC<{ className?: string; children: React.ReactNode }> = ({ className = '', children }) => (
  <div className={`rounded-2xl bg-white border border-[#e8dfd2] p-5 shadow-[0_2px_10px_rgba(80,60,40,0.04)] ${className}`}>
    {children}
  </div>
);

const CardTitle: React.FC<{ icon: React.ReactNode; title: string; hint?: string }> = ({ icon, title, hint }) => (
  <div className="flex items-center justify-between mb-4">
    <h4 className="flex items-center gap-2 text-sm font-bold text-[#2d1e14]">
      <span className="p-1.5 rounded-lg bg-[#f5eee3] text-[#8a5d2c]">{icon}</span>
      {title}
    </h4>
    {hint && <span className="text-[10px] text-[#9c8979]">{hint}</span>}
  </div>
);

const IMPACT_DOT = {
  High: 'bg-[#b84848]',
  Medium: 'bg-[#c99a5b]',
  Low: 'bg-[#8fb79a]'
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
        <span className="w-16 font-mono text-[13px] font-semibold text-[#2d1e14] truncate">{t.symbol}</span>
        <span className="flex-1 h-2 rounded-full bg-[#f3ede3] overflow-hidden">
          <span
            className={`block h-full rounded-full ${up ? 'bg-[#5f9a6e]' : 'bg-[#d27a7a]'}`}
            style={{ width, transition: 'width 0.8s cubic-bezier(0.22,1,0.36,1)' }}
          />
        </span>
        <span className={`w-16 text-right font-mono text-[13px] font-bold tabular-nums ${up ? 'text-[#226339]' : 'text-[#b33939]'}`}>
          {up ? '+' : ''}{t.change24h.toFixed(2)}%
        </span>
      </li>
    );
  };

  return (
    <div>
      <div className="mb-4">
        <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#2e6b45] mb-1">Market Pulse</p>
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2d1e14]">ชีพจรตลาดตอนนี้</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Mood gauge */}
        <Card className="md:col-span-4 animate-fade-up stagger-1">
          <CardTitle icon={<Gauge className="w-3.5 h-3.5" />} title="อารมณ์ตลาด" hint="Fear & Greed" />
          <MoodGauge value={briefing.fearGreedIndex} />
          <div className="mt-5">
            <div className="flex justify-between text-[11px] text-[#7d6b5c] mb-1.5">
              <span>ขึ้น <b className="text-[#226339] font-mono">{allUp}</b></span>
              <span className="text-[#9c8979]">สัดส่วนหุ้นในลิสต์</span>
              <span>ลง <b className="text-[#b33939] font-mono">{allDown}</b></span>
            </div>
            <div className="flex h-2 rounded-full overflow-hidden bg-[#f3ede3]">
              <span className="bg-[#5f9a6e] transition-all duration-700" style={{ width: `${upPct}%` }} />
              <span className="bg-[#d27a7a] transition-all duration-700" style={{ width: `${100 - upPct}%` }} />
            </div>
          </div>
        </Card>

        {/* Movers */}
        <Card className="md:col-span-4 animate-fade-up stagger-2">
          <div className="flex items-center justify-between mb-4 gap-2">
            <h4 className="flex items-center gap-2 text-sm font-bold text-[#2d1e14]">
              <span className="p-1.5 rounded-lg bg-[#f5eee3] text-[#8a5d2c]"><Flame className="w-3.5 h-3.5" /></span>
              ตัวแรงประจำวัน
            </h4>
            <div className="flex p-0.5 rounded-full bg-[#f3ede3] border border-[#e8dfd2] text-[11px] font-semibold" role="tablist">
              {([['stocks', '📈 หุ้น'], ['crypto', '🪙 เหรียญ']] as [MoverScope, string][]).map(([id, label]) => (
                <button
                  key={id}
                  role="tab"
                  aria-selected={scope === id}
                  onClick={() => setScope(id)}
                  className={`px-2.5 py-1 rounded-full transition-colors ${scope === id ? 'bg-white text-[#2d1e14] shadow-sm' : 'text-[#8c7764] hover:text-[#2d1e14]'}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-5">
            <div>
              <p className="flex items-center gap-1 text-[11px] font-semibold text-[#226339] mb-2">
                <ArrowUpRight className="w-3.5 h-3.5" /> บวกแรงสุด
              </p>
              {gainers.length ? (
                <ul className="space-y-2.5">{gainers.map((t) => <MoverRow key={t.id} t={t} />)}</ul>
              ) : (
                <p className="text-xs text-[#9c8979]">ยังไม่มี{scope === 'crypto' ? 'เหรียญ' : 'หุ้น'}ที่ปรับขึ้น</p>
              )}
            </div>
            <div>
              <p className="flex items-center gap-1 text-[11px] font-semibold text-[#b33939] mb-2">
                <ArrowDownRight className="w-3.5 h-3.5" /> ลบแรงสุด
              </p>
              {losers.length ? (
                <ul className="space-y-2.5">{losers.map((t) => <MoverRow key={t.id} t={t} />)}</ul>
              ) : (
                <p className="text-xs text-[#9c8979] flex items-center gap-1"><Snowflake className="w-3 h-3" /> ไม่มี{scope === 'crypto' ? 'เหรียญ' : 'หุ้น'}ที่ปรับลง</p>
              )}
            </div>
          </div>
        </Card>

        {/* Today's agenda */}
        <Card className="md:col-span-4 animate-fade-up stagger-3">
          <CardTitle icon={<CalendarClock className="w-3.5 h-3.5" />} title="ตารางวันนี้" hint="เวลาไทย" />
          {briefing.watchItemsToday.length ? (
            <ol className="relative ml-1.5 border-l-2 border-dashed border-[#e8dfd2] space-y-5">
              {briefing.watchItemsToday.map((w, i) => {
                const content = (
                  <>
                    <span className={`absolute -left-[7px] top-1.5 w-3 h-3 rounded-full ring-4 ring-white ${IMPACT_DOT[w.impact] ?? IMPACT_DOT.Low}`} />
                    <div className="font-mono text-[12px] font-semibold text-[#8a5d2c]">{w.time}</div>
                    <div className="text-[14px] font-semibold text-[#2d1e14] leading-snug mt-0.5">{w.event}</div>
                    {w.forecast && <div className="text-[12px] text-[#7d6b5c] mt-0.5">{w.forecast}</div>}
                    <span className={`inline-block mt-1.5 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      w.impact === 'High' ? 'bg-[#fbeded] text-[#b33939]' : w.impact === 'Medium' ? 'bg-[#fcf5ea] text-[#8f5d23]' : 'bg-[#eaf4ed] text-[#226339]'
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
            <p className="text-xs text-[#9c8979]">วันนี้ไม่มีเหตุการณ์สำคัญที่ต้องจับตา ☕</p>
          )}
        </Card>
      </div>
    </div>
  );
};
