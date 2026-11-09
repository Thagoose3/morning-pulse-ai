import React, { useMemo, useState } from 'react';
import { TrendingUp, TrendingDown, Activity, ArrowUpRight, ArrowDown, Clock, Coffee } from 'lucide-react';
import { MorningBriefingData, CatalystItem } from '../types';
import { ArticleDetailModal } from './ArticleDetailModal';
import { Reveal, SectionHeading } from './ui';

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
        badge: 'bg-[#8fd4a0]/10 text-[#8fd4a0] border-[#8fd4a0]/25',
        dot: 'bg-[#8fd4a0]',
        icon: <TrendingUp className="w-3.5 h-3.5" />
      };
    case 'Bearish':
    case 'Extreme Fear':
      return {
        label: 'ตลาดชะลอตัว',
        sub: 'Bearish',
        badge: 'bg-[#f08a84]/10 text-[#f08a84] border-[#f08a84]/25',
        dot: 'bg-[#f08a84]',
        icon: <TrendingDown className="w-3.5 h-3.5" />
      };
    default:
      return {
        label: 'ตลาดทรงตัว',
        sub: 'Neutral',
        badge: 'bg-[#e6b86e]/10 text-[#e6b86e] border-[#e6b86e]/25',
        dot: 'bg-[#e6b86e]',
        icon: <Activity className="w-3.5 h-3.5" />
      };
  }
};

const CATALYST_STYLE = {
  positive: { bar: 'bg-[#8fd4a0]', glow: 'shadow-[0_0_16px_rgba(143,212,160,0.6)]', tag: 'text-[#8fd4a0] bg-[#8fd4a0]/10 border-[#8fd4a0]/20', label: 'หนุนตลาด' },
  negative: { bar: 'bg-[#f08a84]', glow: 'shadow-[0_0_16px_rgba(240,138,132,0.6)]', tag: 'text-[#f08a84] bg-[#f08a84]/10 border-[#f08a84]/20', label: 'กดดันตลาด' },
  neutral: { bar: 'bg-[#e6b86e]', glow: 'shadow-[0_0_16px_rgba(230,184,110,0.6)]', tag: 'text-[#e6b86e] bg-[#e6b86e]/10 border-[#e6b86e]/20', label: 'จับตา' }
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

  // Running word index so the headline rises in word by word
  let wordIdx = 0;
  const renderWords = (text: string, className = '') =>
    text.split(' ').map((w, i) => {
      const delay = 120 + wordIdx++ * 55;
      return (
        <span key={`${w}-${i}`} className={`word-rise ${className}`} style={{ animationDelay: `${delay}ms` }}>
          {w}&nbsp;
        </span>
      );
    });

  return (
    <div className="space-y-24 sm:space-y-32">

      {/* ── Hero ── */}
      <article className="relative pt-4 sm:pt-10 min-h-[calc(78vh-8rem)] flex flex-col justify-center">
        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-2.5 mb-8 sm:mb-10 animate-fade-up">
          <span className={`inline-flex items-center gap-2 pl-2.5 pr-3 py-1 rounded-full text-[12px] font-semibold border ${sentiment.badge}`}>
            <span className="relative flex w-2 h-2">
              <span className={`absolute inset-0 rounded-full ${sentiment.dot} animate-ping opacity-60`} />
              <span className={`relative w-2 h-2 rounded-full ${sentiment.dot}`} />
            </span>
            {sentiment.label}
            <span className="opacity-60 font-normal">· {sentiment.sub}</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] text-[#b8a896] bg-white/[0.03] border border-white/[0.07]">
            <Clock className="w-3.5 h-3.5" /> {briefing.generatedAt}
          </span>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] text-[#b8a896] bg-white/[0.03] border border-white/[0.07]">
            <Coffee className="w-3.5 h-3.5" /> อ่าน {briefing.readingTimeSeconds || 45} วินาที
          </span>
        </div>

        <p className="flex items-center gap-3 text-[15px] sm:text-lg text-[#e6b86e] font-medium mb-4 animate-fade-up stagger-1">
          <span>{greeting.emoji}</span>
          {greeting.text}{kicker ? ` — ${kicker}` : ''}
        </p>

        <h2 className="font-serif font-bold text-[34px] leading-[1.25] sm:text-6xl sm:leading-[1.15] lg:text-[76px] lg:leading-[1.1] tracking-tight max-w-5xl">
          {headlineParts.length > 1
            ? headlineParts.map((part, i) => (
                <React.Fragment key={i}>
                  {i > 0 && (
                    <span className="word-rise text-[#e6b86e]/70 font-normal" style={{ animationDelay: `${120 + wordIdx++ * 55}ms` }}>
                      /&nbsp;
                    </span>
                  )}
                  {renderWords(part, i === 0 ? 'text-[#fbf3e6] [text-shadow:0_0_40px_rgba(230,184,110,0.25)]' : 'text-[#bfae9b]')}
                </React.Fragment>
              ))
            : renderWords(mainHeadline, 'text-[#fbf3e6]')}
        </h2>

        {briefing.marketStatusSummary && (
          <p className="mt-8 text-base sm:text-xl text-[#b8a896] max-w-3xl leading-relaxed animate-fade-up" style={{ animationDelay: '700ms' }}>
            {briefing.marketStatusSummary}
          </p>
        )}

        <a
          href="#must-know"
          className="group mt-12 inline-flex items-center gap-3 self-start text-[13px] text-[#9a8a7c] hover:text-[#f3ebe0] transition-colors animate-fade-up"
          style={{ animationDelay: '900ms' }}
        >
          <span className="flex items-center justify-center w-9 h-9 rounded-full border border-white/10 group-hover:border-[#8fd4a0]/40 transition-colors">
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </span>
          เลื่อนลงอ่าน 4 เรื่องสำคัญ
        </a>
      </article>

      {/* ── 4 things to know ── */}
      <section id="must-know" className="scroll-mt-24">
        <Reveal>
          <SectionHeading index="01" kicker="Must Know" title="4 เรื่องที่ต้องรู้เช้านี้" />
        </Reveal>
        <ol className="border-t border-white/[0.08]">
          {briefing.executiveSummary.map((item, idx) => (
            <Reveal as="li" key={idx} delay={idx * 90}>
              <button
                type="button"
                onClick={() => handleBulletClick(idx, item)}
                className="spotlight group relative w-full text-left grid grid-cols-[auto_1fr_auto] items-start sm:items-center gap-4 sm:gap-8 py-6 sm:py-8 px-2 sm:px-4 border-b border-white/[0.08] rounded-2xl sm:rounded-none hover:bg-white/[0.02] transition-colors"
              >
                <span className="font-mono text-sm sm:text-base text-[#e6b86e]/80 pt-1 sm:pt-0 tabular-nums">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span className="text-[16px] sm:text-xl leading-relaxed text-[#e9dfd2] group-hover:text-white transition-colors">
                  {item}
                </span>
                <span className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/10 text-[#9a8a7c] group-hover:bg-[#8fd4a0] group-hover:border-[#8fd4a0] group-hover:text-[#0e0b09] group-hover:rotate-45 transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </span>
              </button>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* ── Key catalysts ── */}
      {briefing.keyCatalysts.length > 0 && (
        <section>
          <Reveal>
            <SectionHeading index="02" kicker="Key Drivers" title="ปัจจัยขับเคลื่อนตลาดวันนี้" />
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {briefing.keyCatalysts.slice(0, 3).map((cat, i) => {
              const style = CATALYST_STYLE[cat.sentiment] ?? CATALYST_STYLE.neutral;
              const level = IMPACT_LEVEL[cat.impact] ?? 1;
              return (
                <Reveal key={cat.id} delay={i * 110}>
                  <button
                    type="button"
                    onClick={() => handleCatalystClick(cat)}
                    className="glass spotlight group w-full h-full text-left flex flex-col p-6 sm:p-7 rounded-3xl hover:-translate-y-1 transition-transform duration-300"
                  >
                    <div className="flex items-center justify-between mb-10">
                      <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#9a8a7c]">
                        {cat.category}
                      </span>
                      <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${style.tag}`}>
                        {style.label}
                      </span>
                    </div>
                    <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#f3ebe0] leading-snug mb-3">
                      {cat.title}
                    </h4>
                    <p className="text-[14px] text-[#b8a896] leading-relaxed flex-1">
                      {cat.description}
                    </p>
                    <div className="mt-8 pt-5 border-t border-white/[0.07] flex items-center justify-between">
                      <span className="flex items-center gap-3 text-[12px] text-[#9a8a7c]">
                        ผลกระทบ
                        <span className="flex gap-1" aria-label={`ผลกระทบระดับ${IMPACT_TH[cat.impact]}`}>
                          {[1, 2, 3].map((n) => (
                            <span
                              key={n}
                              className={`w-5 h-1.5 rounded-full ${n <= level ? `${style.bar} ${style.glow}` : 'bg-white/10'}`}
                            />
                          ))}
                        </span>
                        <span className="font-medium text-[#e9dfd2]">{IMPACT_TH[cat.impact]}</span>
                      </span>
                      <ArrowUpRight className="w-5 h-5 text-[#6d5f53] group-hover:text-[#8fd4a0] group-hover:rotate-45 transition-all duration-300" />
                    </div>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </section>
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
