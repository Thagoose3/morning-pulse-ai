import { MorningBriefingData, TickerItem, SentimentType } from '../types';

export const FALLBACK_BRIEFING: MorningBriefingData = {
  generatedAt: new Date().toLocaleDateString('th-TH', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  }) + ' • 06:30 น.',
  headline: 'ตลาดเช้านี้: ฝั่งเทคโนโลยีสดใส หุ้น AI ยังหนุนตลาด | Bitcoin ยืนแถว $79,000',
  readingTimeSeconds: 45,
  sentiment: 'Bullish',
  fearGreedIndex: 68,
  marketStatusSummary: 'ภาพรวมเปิดเช้านี้บรรยากาศผ่อนคลาย หุ้นเทคโนโลยีสหรัฐฯ นำโดย NVIDIA ($229) และ Microsoft ขยับบวก ขณะที่สินทรัพย์ดิจิทัลและทองคำทรงตัวระดับสูง',
  executiveSummary: [
    'กลุ่มชิป AI สหรัฐฯ ปิดบวกต่อเนื่อง นำโดย NVDA ($229.49, +3.8%) ตอบรับดีมานด์ศูนย์ข้อมูล',
    'บิตคอยน์ (BTC) แกว่งตัวบริเวณ $79,000 - $79,800 ภาพรวมยังเป็นการสะสมกำลัง',
    'หุ้นไทย (SET) คาดแกว่งทรงตัวกรอบ 1,460 - 1,468 จุด มีแรงหนุนจาก DELTA (248 บ.) และกลุ่มค้าปลีก',
    'ทองคำ Spot Gold ทรงตัวระดับสูง $4,437/oz จากความต้องการถือสินทรัพย์ปลอดภัย'
  ],
  keyCatalysts: [
    {
      id: 'cat-1',
      title: 'ความต้องการชิป AI ทั่วโลกยังแข็งแกร่ง',
      impact: 'High',
      sentiment: 'positive',
      description: 'หุ้นกลุ่มเซมิคอนดักเตอร์และฮาร์ดแวร์ยังคงเป็นผู้นำการปรับตัวขึ้นของตลาดสหรัฐฯ',
      category: 'Tech'
    },
    {
      id: 'cat-2',
      title: 'ทองคำและสินทรัพย์ปลอดภัยทรงตัวสูง',
      impact: 'Medium',
      sentiment: 'positive',
      description: 'นักลงทุนยังคงกระจายความเสี่ยงเข้าสู่ทองคำที่ระดับ $4,437/oz',
      category: 'Gold'
    },
    {
      id: 'cat-3',
      title: 'ตลาดหุ้นไทยจับตาทิศทาง Fund Flow',
      impact: 'Medium',
      sentiment: 'neutral',
      description: 'แรงซื้อเก็งกำไรในหุ้นกลุ่มอิเล็กทรอนิกส์ยังช่วยพยุงดัชนี SET',
      category: 'Thai Market'
    }
  ],
  watchItemsToday: [
    { time: '10:00 น.', event: 'เปิดตลาดหุ้นไทย (SET / mai)', impact: 'Medium', forecast: 'แนวต้าน 1,468 จุด' },
    { time: '19:30 น.', event: 'รายงานตัวเลข Initial Jobless Claims สหรัฐฯ', impact: 'High', forecast: 'คาดตัวเลขทรงตัว' }
  ],
  topGainers: [
    { symbol: 'NVDA', change: 3.82 },
    { symbol: 'SOL', change: 2.10 },
    { symbol: 'DELTA', change: 1.64 }
  ],
  topLosers: [
    { symbol: 'TSLA', change: -1.25 },
    { symbol: 'BTC', change: -0.85 }
  ]
};

export function generateDynamicBriefing(tickers: TickerItem[]): MorningBriefingData {
  const gainers = tickers.filter(t => t.change24h > 0);
  const gainerRatio = gainers.length / Math.max(1, tickers.length);

  let sentiment: SentimentType = 'Neutral';
  let fearGreed = 50;

  if (gainerRatio >= 0.65) {
    sentiment = 'Bullish';
    fearGreed = 68;
  } else if (gainerRatio <= 0.35) {
    sentiment = 'Bearish';
    fearGreed = 38;
  } else {
    sentiment = 'Neutral';
    fearGreed = 52;
  }

  const sortedGainers = [...tickers]
    .sort((a, b) => b.change24h - a.change24h)
    .slice(0, 3)
    .map(t => ({ symbol: t.symbol, change: t.change24h }));

  const sortedLosers = [...tickers]
    .sort((a, b) => a.change24h - b.change24h)
    .slice(0, 2)
    .map(t => ({ symbol: t.symbol, change: t.change24h }));

  return {
    ...FALLBACK_BRIEFING,
    sentiment,
    fearGreedIndex: fearGreed,
    topGainers: sortedGainers,
    topLosers: sortedLosers,
    generatedAt: new Date().toLocaleDateString('th-TH', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    }) + ` • ${new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })} น.`
  };
}

export async function loadMorningBriefing(currentTickers: TickerItem[]): Promise<MorningBriefingData> {
  try {
    const res = await fetch('./data/daily_briefing.json', { cache: 'no-cache' });
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (e) {
    // fallback
  }
  return generateDynamicBriefing(currentTickers);
}
