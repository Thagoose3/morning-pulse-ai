import { MorningBriefingData, TickerItem, SentimentType } from '../types';

export const FALLBACK_BRIEFING: MorningBriefingData = {
  generatedAt: new Date().toLocaleDateString('th-TH', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }) + ' • 06:30 น.',
  headline: 'ตลาดเอเชียเปิดบวกรับแรงส่ง Tech Rally สหรัฐฯ | Bitcoin ยืนเหนือ $89,000 รับกระแส Institutional Flow',
  readingTimeSeconds: 60,
  sentiment: 'Bullish',
  fearGreedIndex: 72, // Greed
  marketStatusSummary: 'สินทรัพย์เสี่ยงส่งสัญญาณฟื้นตัวแข็งแกร่ง นำโดยกลุ่ม AI Semiconductor และ Crypto ขณะที่ Bond Yields สหรัฐฯ ทรงตัว',
  executiveSummary: [
    'กลุ่มเทคโนโลยีสหรัฐฯ ปิดพุ่งนำโดย NVIDIA และ Big Tech หลังตลาดซึมซับมุมมองดอกเบี้ยของ Fed',
    'บิตคอยน์ (BTC) ดีดตัวแตะกรอบ $89,000 - $90,000 สะท้อนแรงซื้อต่อเนื่องของ Spot ETF',
    'ตลาดหุ้นไทย (SET Index) มีแนวโน้มเปิดทดสอบแนวต้าน 1,465 - 1,470 จุด โดยมี DELTA และกลุ่มค้าปลีกหนุน',
    'ราคาทองคำ Spot Gold ปรับตัวยืนเหนือ $2,740 ต่อออนซ์ ท่ามกลางความไม่แน่นอนด้านภูมิรัฐศาสตร์โลก'
  ],
  keyCatalysts: [
    {
      id: 'cat-1',
      title: 'AI Capex Supercycle & Semiconductor Demand',
      impact: 'High',
      sentiment: 'positive',
      description: 'ยอดสั่งซื้อชิป AI รุ่นล่าสุด Blackwell ยังคงเต็มกำลังการผลิต หนุน Sentiment หุ้นกลุ่มฮาร์ดแวร์ทั่วโลก',
      category: 'Tech'
    },
    {
      id: 'cat-2',
      title: 'Institutional Crypto Accumulation',
      impact: 'High',
      sentiment: 'positive',
      description: 'กองทุน ETF สหรัฐฯ มี Net Inflows ติดต่อกันเป็นวันที่ 5 สะท้อนความเชื่อมั่นของนักลงทุนสถาบัน',
      category: 'Crypto'
    },
    {
      id: 'cat-3',
      title: 'US Bond Yields Consolidation (10Y @ 4.18%)',
      impact: 'Medium',
      sentiment: 'neutral',
      description: 'อัตราผลตอบแทนพันธบัตรรัฐบาลสหรัฐฯ ชะลอการปรับขึ้น ช่วยคลายแรงกดดันต่อ Valuation หุ้น Growth',
      category: 'Macro'
    },
    {
      id: 'cat-4',
      title: 'Dollar Index & Geopolitical Hedging',
      impact: 'Medium',
      sentiment: 'neutral',
      description: 'เงินดอลลาร์ทรงตัวในกรอบแคบ ส่งผลให้นักลงทุนกระจายความเสี่ยงเข้าสู่ทองคำแท่งและสินทรัพย์ทางเลือก',
      category: 'Commodities'
    }
  ],
  watchItemsToday: [
    { time: '09:30 น.', event: 'เปิดตลาดหุ้นไทย (SET / mai)', impact: 'Medium', forecast: 'แกว่งตัวในกรอบ 1,458 - 1,468 จุด' },
    { time: '13:00 น.', event: 'ตัวเลขส่งออก-นำเข้าจีนประจำงวด', impact: 'High', forecast: 'คาดเติบโต +4.5% YoY' },
    { time: '19:30 น.', event: 'รายงานตัวเลข Initial Jobless Claims สหรัฐฯ', impact: 'High', forecast: 'คาดการณ์ 218K' },
    { time: '21:00 น.', event: 'ถ้อยแถลงกรรมการธนาคารกลางสหรัฐฯ (Fed Governors)', impact: 'High', forecast: 'จับตาส่งสัญญาณอัตราดอกเบี้ย' }
  ],
  topGainers: [
    { symbol: 'SOL/USDT', change: 5.62 },
    { symbol: 'NVDA', change: 4.12 },
    { symbol: 'BTC/USDT', change: 3.84 },
    { symbol: 'DELTA.BK', change: 2.32 }
  ],
  topLosers: [
    { symbol: 'TSLA', change: -1.45 },
    { symbol: 'BRENT', change: -0.92 },
    { symbol: 'PTT.BK', change: -0.77 }
  ]
};

/**
 * Calculates dynamic sentiment and briefing adjustments based on live tickers
 */
export function generateDynamicBriefing(tickers: TickerItem[]): MorningBriefingData {
  const gainers = tickers.filter(t => t.change24h > 0);
  const gainerRatio = gainers.length / Math.max(1, tickers.length);

  let sentiment: SentimentType = 'Neutral';
  let fearGreed = 50;

  if (gainerRatio >= 0.75) {
    sentiment = 'Strong Bullish';
    fearGreed = 78;
  } else if (gainerRatio >= 0.55) {
    sentiment = 'Bullish';
    fearGreed = 66;
  } else if (gainerRatio <= 0.3) {
    sentiment = 'Bearish';
    fearGreed = 34;
  } else {
    sentiment = 'Neutral';
    fearGreed = 52;
  }

  const sortedGainers = [...tickers]
    .sort((a, b) => b.change24h - a.change24h)
    .slice(0, 4)
    .map(t => ({ symbol: t.symbol, change: t.change24h }));

  const sortedLosers = [...tickers]
    .sort((a, b) => a.change24h - b.change24h)
    .slice(0, 3)
    .map(t => ({ symbol: t.symbol, change: t.change24h }));

  return {
    ...FALLBACK_BRIEFING,
    sentiment,
    fearGreedIndex: fearGreed,
    topGainers: sortedGainers,
    topLosers: sortedLosers,
    generatedAt: new Date().toLocaleDateString('th-TH', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }) + ` • ${new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })} น.`
  };
}

/**
 * Loads daily briefing from static JSON (if updated by GitHub Actions) or returns dynamically generated
 */
export async function loadMorningBriefing(currentTickers: TickerItem[]): Promise<MorningBriefingData> {
  try {
    const res = await fetch('./data/daily_briefing.json', { cache: 'no-cache' });
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (e) {
    // Expected on local dev before daily sync runs
  }
  return generateDynamicBriefing(currentTickers);
}
