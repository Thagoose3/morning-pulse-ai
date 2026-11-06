import React, { useMemo, useState } from 'react';
import { TrendingUp, TrendingDown, Activity, Sparkles, ArrowUpRight, Clock, Coffee } from 'lucide-react';
import { MorningBriefingData, CatalystItem } from '../types';
import { ArticleDetailModal } from './ArticleDetailModal';

interface MorningBriefingProps {
  briefing: MorningBriefingData;
  onOpenAddModal: () => void;
}

type SelectedArticle = {
  title: string;
  summary: string;
  fullText?: string;
  catalyst?: CatalystItem;
  sourceName: string;
  sourceUrl: string;
};

const getGreeting = (hour: number) => {
  if (hour < 5) return { text: 'ยังไม่เช้า แต่ตลาดโลกยังวิ่งอยู่', emoji: '🌙' };
  if (hour < 12) return { text: 'อรุณสวัสดิ์', emoji: '☀️' };
  if (hour < 17) return { text: 'สวัสดีตอนบ่าย', emoji: '🌤️' };
  return { text: 'สวัสดีตอนเย็น', emoji: '🌆' };
};

/** Pick the most relevant Yahoo Finance news page for a piece of text. */
const guessSource = (text: string): { sourceName: string; sourceUrl: string } => {
  const t = text.toLowerCase();
  if (/(nvda|nvidia|pltr|palantir|ชิป|ai|tech)/.test(t))
    return { sourceName: 'Yahoo Finance • Tech', sourceUrl: 'https://finance.yahoo.com/quote/NVDA/news/' };
  if (/(btc|bitcoin|บิตคอยน์|crypto|คริปโต)/.test(t))
    return { sourceName: 'Yahoo Finance • Crypto', sourceUrl: 'https://finance.yahoo.com/quote/BTC-USD/news/' };
  if (/(set|หุ้นไทย|delta|cpall|thai)/.test(t))
    return { sourceName: 'Yahoo Finance • SET', sourceUrl: 'https://finance.yahoo.com/quote/%5ESET.BK/news/' };
  if (/(gold|ทองคำ|ทอง)/.test(t))
    return { sourceName: 'Yahoo Finance • Gold', sourceUrl: 'https://finance.yahoo.com/quote/GC=F/news/' };
  if (/(oil|น้ำมัน)/.test(t))
    return { sourceName: 'Yahoo Finance • Oil', sourceUrl: 'https://finance.yahoo.com/quote/CL=F/news/' };
  return { sourceName: 'Yahoo Finance News', sourceUrl: 'https://finance.yahoo.com/news/' };
};

const getSentimentInfo = (sentiment: string) => {
  switch (sentiment) {
    case 'Strong Bullish':
    case 'Bullish':
      return {
        label: 'ตลาดสดใส',
        sub: 'Bullish',
        badge: 'bg-[#eaf4ed] text-[#226339] border-[#c3deca]',
        icon: <TrendingUp className="w-3.5 h-3.5" />
      };
    case 'Bearish':
    case 'Extreme Fear':
      return {
        label: 'ตลาดชะลอตัว',
        sub: 'Bearish',
        badge: 'bg-[#fbeded] text-[#b33939] border-[#f0c8c8]',
        icon: <TrendingDown className="w-3.5 h-3.5" />
      };
    default:
      return {
        label: 'ตลาดทรงตัว',
        sub: 'Neutral',
        badge: 'bg-[#fcf5ea] text-[#8f5d23] border-[#ebd9be]',
        icon: <Activity className="w-3.5 h-3.5" />
      };
  }
};

const CATALYST_STYLE = {
  positive: { bar: 'bg-[#2e6b45]', tag: 'text-[#226339] bg-[#eaf4ed]', label: 'หนุนตลาด' },
  negative: { bar: 'bg-[#b84848]', tag: 'text-[#b33939] bg-[#fbeded]', label: 'กดดันตลาด' },
  neutral: { bar: 'bg-[#c99a5b]', tag: 'text-[#8f5d23] bg-[#fcf5ea]', label: 'จับตา' }
} as const;

const IMPACT_LEVEL = { High: 3, Medium: 2, Low: 1 } as const;
const IMPACT_TH = { High: 'สูง', Medium: 'กลาง', Low: 'ต่ำ' } as const;

export const MorningBriefing: React.FC<MorningBriefingProps> = ({ briefing }) => {
  const [selectedArticle, setSelectedArticle] = useState<SelectedArticle | null>(null);
  const greeting = useMemo(() => getGreeting(new Date().getHours()), []);
  const sentiment = getSentimentInfo(briefing.sentiment);

  // Split "ตลาดเช้านี้: A | B | C" headlines into a kicker + punchy main line
  const { kicker, mainHeadline, headlineParts } = useMemo(() => {
    const raw = briefing.headline || '';
    const colon = raw.indexOf(':');
    const k = colon > -1 && colon < 30 ? raw.slice(0, colon).trim() : '';
    const rest = colon > -1 && colon < 30 ? raw.slice(colon + 1).trim() : raw;
    const parts = rest.split('|').map((p) => p.trim()).filter(Boolean);
    return { kicker: k, mainHeadline: rest, headlineParts: parts };
  }, [briefing.headline]);

  const handleBulletClick = (index: number, text: string) => {
    const detailed = briefing.detailedArticles?.[index];
    if (detailed) {
      setSelectedArticle({
        title: detailed.title,
        summary: detailed.summary,
        fullText: detailed.fullText,
        sourceName: detailed.sourceName,
        sourceUrl: detailed.sourceUrl
      });
      return;
    }
    setSelectedArticle({
      title: `ประเด็นที่ ${index + 1} จากสรุปเช้านี้`,
      summary: text,
      fullText:
        'สรุปจากข้อมูลราคาและความเคลื่อนไหวล่าสุดของตลาด อ่านข่าวต้นทางฉบับเต็มได้ที่ลิงก์ด้านล่าง เพื่อดูรายละเอียดและบริบทเพิ่มเติมก่อนตัดสินใจลงทุน',
      ...guessSource(text)
    });
  };

  const handleCatalystClick = (cat: CatalystItem) => {
    const src = cat.fullDetail
      ? { sourceName: cat.fullDetail.sourceName, sourceUrl: cat.fullDetail.sourceUrl }
      : guessSource(`${cat.category} ${cat.title}`);
    setSelectedArticle({
      title: cat.title,
      summary: cat.description,
      fullText:
        cat.fullDetail?.overview ??
        `ปัจจัยในหมวด ${cat.category} มีน้ำหนักต่อตลาดระดับ${IMPACT_TH[cat.impact]} และตอนนี้${CATALYST_STYLE[cat.sentiment].label}`,
      catalyst: cat,
      ...src
    });
  };

  return (
    <div className="space-y-8">

      {/* ── Front page hero ── */}
      <article className="relative overflow-hidden rounded-3xl paper-card border border-[#e8dfd2] shadow-[0_1px_0_rgba(255,255,255,0.8)_inset,0_12px_40px_-12px_rgba(80,60,40,0.18)] animate-fade-up">
        {/* decorative glow */}
        <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#f2c98c]/25 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-28 -left-20 w-72 h-72 rounded-full bg-[#2e6b45]/10 blur-3xl" aria-hidden="true" />

        <div className="relative p-6 sm:p-10">
          {/* Masthead row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-6 border-b border-dashed border-[#e3d8c8]">
            <div className="flex items-center gap-2 text-[13px] text-[#7d6b5c]">
              <span className="text-base">{greeting.emoji}</span>
              <span className="font-semibold text-[#8a5d2c]">{greeting.text}</span>
              <span className="text-[#c7baa8]">•</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {briefing.generatedAt}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium text-[#6d5a4c] bg-[#f5eee3] border border-[#e5d9c9]">
                <Coffee className="w-3 h-3" /> {briefing.readingTimeSeconds || 45} วินาที
              </span>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold border ${sentiment.badge}`}>
                {sentiment.icon}
                {sentiment.label}
                <span className="opacity-60 font-normal">· {sentiment.sub}</span>
              </span>
            </div>
          </div>

          {/* Headline */}
          {kicker && (
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#2e6b45] mb-3">
              {kicker}
            </p>
          )}
          {headlineParts.length > 1 ? (
            <h2 className="font-serif text-[26px] sm:text-4xl font-bold text-[#24170f] leading-[1.35] sm:leading-[1.3]">
              {headlineParts.map((part, i) => (
                <span key={i}>
                  {i > 0 && <span className="text-[#d4c4ae] font-normal mx-2">/</span>}
                  <span className={i === 0 ? '' : 'text-[#5b4636]'}>{part}</span>
                </span>
              ))}
            </h2>
          ) : (
            <h2 className="font-serif text-[26px] sm:text-4xl font-bold text-[#24170f] leading-[1.35] sm:leading-[1.3]">
              {mainHeadline}
            </h2>
          )}

          {briefing.marketStatusSummary && (
            <p className="mt-4 text-[15px] sm:text-base text-[#5b4636] max-w-3xl leading-relaxed">
              {briefing.marketStatusSummary}
            </p>
          )}

          {/* Numbered key points */}
          <div className="mt-8">
            <div className="flex items-baseline justify-between mb-3">
              <h3 className="text-xs font-bold tracking-[0.15em] uppercase text-[#8a5d2c]">
                4 เรื่องที่ต้องรู้เช้านี้
              </h3>
              <span className="text-[11px] text-[#9c8979]">แตะเพื่ออ่านต่อ</span>
            </div>
            <ol className="grid sm:grid-cols-2 gap-3">
              {briefing.executiveSummary.map((item, idx) => (
                <li key={idx} className={`animate-fade-up stagger-${Math.min(idx + 1, 5)}`}>
                  <button
                    type="button"
                    onClick={() => handleBulletClick(idx, item)}
                    className="group w-full h-full text-left flex gap-4 p-4 rounded-2xl bg-[#faf7f2]/80 hover:bg-white border border-[#ede4d6] hover:border-[#b8d6bf] hover:shadow-[0_8px_24px_-10px_rgba(46,107,69,0.35)] hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <span className="font-serif text-3xl font-bold leading-none text-[#d9c6ab] group-hover:text-[#2e6b45] transition-colors tabular-nums">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-[14px] text-[#38281d] leading-relaxed">
                        {item}
                      </span>
                      <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-[#9c8979] group-hover:text-[#2e6b45] transition-colors">
                        อ่านรายละเอียด
                        <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </article>

      {/* ── Key catalysts ── */}
      {briefing.keyCatalysts.length > 0 && (
        <div>
          <div className="flex items-end justify-between mb-4">
            <div>
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#2e6b45] mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Key Drivers
              </p>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2d1e14]">
                ปัจจัยขับเคลื่อนตลาดวันนี้
              </h3>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {briefing.keyCatalysts.slice(0, 3).map((cat, i) => {
              const style = CATALYST_STYLE[cat.sentiment] ?? CATALYST_STYLE.neutral;
              const level = IMPACT_LEVEL[cat.impact] ?? 1;
              return (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => handleCatalystClick(cat)}
                  className={`group relative overflow-hidden text-left p-5 rounded-2xl bg-white border border-[#e8dfd2] hover:border-[#b8d6bf] shadow-[0_2px_10px_rgba(80,60,40,0.04)] hover:shadow-[0_14px_30px_-14px_rgba(80,60,40,0.35)] hover:-translate-y-1 transition-all duration-200 animate-fade-up stagger-${i + 2}`}
                >
                  <span className={`absolute inset-x-0 top-0 h-1 ${style.bar}`} aria-hidden="true" />
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-semibold text-[#8a5d2c] uppercase tracking-wider">
                      {cat.category}
                    </span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${style.tag}`}>
                      {style.label}
                    </span>
                  </div>
                  <h4 className="font-semibold text-[15px] text-[#2d1e14] leading-snug mb-2">
                    {cat.title}
                  </h4>
                  <p className="text-[13px] text-[#635142] leading-relaxed">
                    {cat.description}
                  </p>
                  <div className="mt-4 pt-3 border-t border-[#f0e9de] flex items-center justify-between">
                    <span className="flex items-center gap-2 text-[11px] text-[#8c7764]">
                      ผลกระทบ
                      <span className="flex gap-0.5" aria-label={`ผลกระทบระดับ${IMPACT_TH[cat.impact]}`}>
                        {[1, 2, 3].map((n) => (
                          <span
                            key={n}
                            className={`w-4 h-1.5 rounded-full ${n <= level ? style.bar : 'bg-[#ece4d8]'}`}
                          />
                        ))}
                      </span>
                      <span className="font-medium text-[#5b4636]">{IMPACT_TH[cat.impact]}</span>
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-[#b5a493] group-hover:text-[#2e6b45] transition-colors" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Deep-Dive Article Reader Modal */}
      <ArticleDetailModal
        article={selectedArticle}
        isOpen={selectedArticle !== null}
        onClose={() => setSelectedArticle(null)}
      />

    </div>
  );
};
