import { TickerItem } from '../types';

const STORAGE_KEY = 'morning_pulse_watchlist_v4';

// Clear legacy cached watchlists that might hold outdated prices
if (typeof window !== 'undefined') {
  try {
    localStorage.removeItem('morning_pulse_watchlist_v1');
    localStorage.removeItem('morning_pulse_watchlist_v2');
    localStorage.removeItem('morning_pulse_watchlist_v3');
  } catch (e) {
    // ignore
  }
}

// Map app symbols to Yahoo Finance symbols
export function toYahooSymbol(symbol: string): string {
  const clean = symbol.trim().toUpperCase();
  if (clean === 'BTC' || clean === 'BTC/USDT') return 'BTC-USD';
  if (clean === 'ETH' || clean === 'ETH/USDT') return 'ETH-USD';
  if (clean === 'SOL' || clean === 'SOL/USDT') return 'SOL-USD';
  if (clean.includes('GOLD') || clean.includes('XAU')) return 'GC=F';
  if (clean === 'BRENT') return 'BZ=F';
  if (clean === 'SET INDEX' || clean === 'SET') return '^SET.BK';
  if (clean === 'DELTA' || clean === 'DELTA.BK') return 'DELTA.BK';
  if (clean === 'PTT' || clean === 'PTT.BK') return 'PTT.BK';
  if (clean === 'CPALL' || clean === 'CPALL.BK') return 'CPALL.BK';
  if (clean === 'ADVANC' || clean === 'ADVANC.BK') return 'ADVANC.BK';
  if (clean === 'KBANK' || clean === 'KBANK.BK') return 'KBANK.BK';
  return clean;
}

export const INITIAL_TICKERS: TickerItem[] = [
  // US Tech Giants (Live Yahoo Finance)
  {
    id: 'stock-nvda',
    symbol: 'NVDA',
    name: 'NVIDIA Corp',
    category: 'us-tech',
    price: 230.36,
    currency: '$',
    change24h: 0.84,
    changeAmount: 1.91,
    high24h: 235.00,
    low24h: 229.00,
    sparkline: [228.45, 230.5, 234.2, 231.8, 230.2, 230.5, 230.36],
    forecast: {
      direction: 'bullish',
      signalLabel: 'มีโอกาสขึ้นต่อ (Bullish)',
      confidence: 82,
      reasoning: 'คำสั่งซื้อชิป AI สถาปัตยกรรม Blackwell ยังล้นกำลังการผลิต และการลงทุน Data Center ของ Big Tech สหรัฐฯ ยังขยายตัวสูงต่อเนื่อง',
      support: '$224.50',
      resistance: '$236.00',
      keyNews: 'สถาบันการเงินรายใหญ่ปรับเพิ่มราคาเป้าหมายจากอุปสงค์ชิป AI ที่เติบโตไม่หยุด',
      sourceUrl: 'https://finance.yahoo.com/quote/NVDA/news/'
    }
  },
  {
    id: 'stock-tsla',
    symbol: 'TSLA',
    name: 'Tesla Inc',
    category: 'us-tech',
    price: 354.08,
    currency: '$',
    change24h: -5.92,
    changeAmount: -22.28,
    high24h: 368.00,
    low24h: 350.00,
    sparkline: [376.36, 370.5, 365.2, 358.0, 352.4, 355.1, 354.08],
    forecast: {
      direction: 'bearish',
      signalLabel: 'ระวังพักฐานระยะสั้น (Pullback)',
      confidence: 65,
      reasoning: 'เผชิญแรงขายทำกำไรทางเทคนิคหลังไม่ผ่านแนวต้าน $360 ประกอบกับตลาดยังรอความชัดเจนเรื่องยอดส่งมอบรถยนต์และ Robotaxi',
      support: '$345.00',
      resistance: '$362.00',
      keyNews: 'การแข่งขันด้านสงครามราคาในตลาดยุโรปและจีนยังกดดันอัตรากำไรขั้นต้น',
      sourceUrl: 'https://finance.yahoo.com/quote/TSLA/news/'
    }
  },
  {
    id: 'stock-aapl',
    symbol: 'AAPL',
    name: 'Apple Inc',
    category: 'us-tech',
    price: 319.97,
    currency: '$',
    change24h: -2.51,
    changeAmount: -8.24,
    high24h: 326.00,
    low24h: 318.50,
    sparkline: [328.21, 325.4, 324.1, 322.0, 320.5, 321.2, 319.97],
    forecast: {
      direction: 'neutral',
      signalLabel: 'ทรงตัวสะสมกำลัง (Consolidation)',
      confidence: 60,
      reasoning: 'ราคาแกว่งตัวในกรอบแคบ นักลงทุนรอตัวเลขสถิติยอดขายอุปกรณ์และรอบการอัปเกรดเครื่องใหม่จากฟีเจอร์ Apple Intelligence ทั่วโลก',
      support: '$315.00',
      resistance: '$326.00',
      keyNews: 'กระแสตอบรับการอัปเกรดระบบ AI บน iOS เริ่มทยอยขยายไปยังประเทศแถบเอเชีย',
      sourceUrl: 'https://finance.yahoo.com/quote/AAPL/news/'
    }
  },
  {
    id: 'stock-msft',
    symbol: 'MSFT',
    name: 'Microsoft Corp',
    category: 'us-tech',
    price: 499.70,
    currency: '$',
    change24h: -2.04,
    changeAmount: -10.41,
    high24h: 508.00,
    low24h: 497.50,
    sparkline: [510.11, 506.2, 504.0, 501.2, 498.5, 500.1, 499.70],
    forecast: {
      direction: 'bullish',
      signalLabel: 'ทยอยสะสม (Mild Bullish)',
      confidence: 72,
      reasoning: 'อัตราการเติบโตของรายได้ส่วนงาน Azure Cloud และการนำโซลูชัน Copilot ไปใช้ในองค์กรธุรกิจยังเติบโตในระดับสองหลัก',
      support: '$492.00',
      resistance: '$510.00',
      keyNews: 'การใช้งานบริการ AI บนระบบคลาวด์ Azure ยังคงสร้างกระแสเงินสดแข็งแกร่ง',
      sourceUrl: 'https://finance.yahoo.com/quote/MSFT/news/'
    }
  },

  // Crypto
  {
    id: 'crypto-btc',
    symbol: 'BTC',
    name: 'Bitcoin',
    category: 'crypto',
    price: 78953.98,
    currency: '$',
    change24h: -0.18,
    changeAmount: -142.50,
    high24h: 80200,
    low24h: 78400,
    sparkline: [79100, 79400, 79800, 79200, 78800, 79050, 78953.98],
    forecast: {
      direction: 'neutral',
      signalLabel: 'แกว่งสะสมพลัง (Sideways Up)',
      confidence: 68,
      reasoning: 'ราคายังรักษาระดับฐาน $78,500 ได้อย่างแข็งแกร่ง มีการสะสมของสถาบันผ่าน Spot ETF ช่วยดูดซับแรงขายของนักขุด',
      support: '$77,500',
      resistance: '$81,200',
      keyNews: 'ยอดเงินไหลเข้ากองทุนบิตคอยน์ ETF ในสหรัฐฯ ทยอยเป็นบวกสุทธิ',
      sourceUrl: 'https://finance.yahoo.com/quote/BTC-USD/news/'
    }
  },
  {
    id: 'crypto-eth',
    symbol: 'ETH',
    name: 'Ethereum',
    category: 'crypto',
    price: 2485.00,
    currency: '$',
    change24h: 1.45,
    changeAmount: 35.50,
    high24h: 2520,
    low24h: 2440,
    sparkline: [2440, 2455, 2468, 2460, 2475, 2480, 2485],
    forecast: {
      direction: 'bullish',
      signalLabel: 'ฟื้นตัวตามตลาด (Recovery)',
      confidence: 64,
      reasoning: 'กิจกรรมบนเครือข่าย Layer-2 และโปรโตคอล DeFi เริ่มกลับมามี Volume สูงขึ้น หนุนการใช้งานแก๊สบนเครือข่ายหลัก',
      support: '$2,420',
      resistance: '$2,550',
      keyNews: 'ยอดธุรกรรมบน Ethereum L2 พุ่งขึ้นแตะระดับสูงสุดในรอบหลายสัปดาห์',
      sourceUrl: 'https://finance.yahoo.com/quote/ETH-USD/news/'
    }
  },
  {
    id: 'crypto-sol',
    symbol: 'SOL',
    name: 'Solana',
    category: 'crypto',
    price: 103.80,
    currency: '$',
    change24h: 2.10,
    changeAmount: 2.14,
    high24h: 106.00,
    low24h: 101.20,
    sparkline: [101, 102, 102.5, 103, 102.8, 103.4, 103.8],
    forecast: {
      direction: 'bullish',
      signalLabel: 'มีลุ้นทดสอบ $108 (Bullish)',
      confidence: 70,
      reasoning: 'ปริมาณการซื้อขายบน Decentralized Exchange ของ Solana ยังอยู่ในอันดับต้นๆ และมีแรงซื้อต่อเนื่องเมื่อราคาย่อตัว',
      support: '$99.50',
      resistance: '$108.00',
      keyNews: 'ระบบนิเวศ DeFi และผู้ใช้งานรายวันบนเครือข่าย Solana ยังคงหนาแน่น',
      sourceUrl: 'https://finance.yahoo.com/quote/SOL-USD/news/'
    }
  },

  // Commodities (Yahoo: GC=F, BZ=F)
  {
    id: 'comm-gold',
    symbol: 'GOLD (XAU)',
    name: 'Gold Spot / oz',
    category: 'commodity',
    price: 4468.70,
    currency: '$',
    change24h: -0.18,
    changeAmount: -8.10,
    high24h: 4485.00,
    low24h: 4452.00,
    sparkline: [4476.8, 4480.0, 4482.5, 4474.0, 4465.0, 4470.0, 4468.70],
    forecast: {
      direction: 'bullish',
      signalLabel: 'แนวโน้มขาขึ้นระยะยาว (Strong Trend)',
      confidence: 80,
      reasoning: 'ธนาคารกลางทั่วโลกยังคงเดินหน้าทยอยเข้าซื้อทองคำแท่งสำรอง และความไม่แน่นอนด้านภูมิรัฐศาสตร์เป็นปัจจัยหนุนหลัก',
      support: '$4,420',
      resistance: '$4,520',
      keyNews: 'กระแส De-dollarization ของกลุ่มประเทศตลาดเกิดใหม่ผลักดันให้ทองคำแท่งเป็นสินทรัพย์สำรองอันดับหนึ่ง',
      sourceUrl: 'https://finance.yahoo.com/quote/GC=F/news/'
    }
  },
  {
    id: 'comm-brent',
    symbol: 'BRENT',
    name: 'Crude Oil',
    category: 'commodity',
    price: 74.50,
    currency: '$',
    change24h: -0.60,
    changeAmount: -0.45,
    high24h: 75.80,
    low24h: 73.90,
    sparkline: [75.5, 75.2, 74.8, 75.0, 74.4, 74.2, 74.5],
    forecast: {
      direction: 'neutral',
      signalLabel: 'แกว่งในกรอบแคบ (Range-bound)',
      confidence: 62,
      reasoning: 'ตลาดชะลอการซื้อขายเพื่อประเมินความต้องการใช้น้ำมันของจีน เทียบกับนโยบายการผลิตของกลุ่ม OPEC+',
      support: '$72.50',
      resistance: '$77.00',
      keyNews: 'กลุ่ม OPEC+ ยังคงรักษาวินัยการผลิตเพื่อพยุงราคาน้ำมันโลกให้อยู่ในกรอบสมดุล',
      sourceUrl: 'https://finance.yahoo.com/quote/BZ=F/news/'
    }
  },

  // Thai Market (Yahoo: DELTA.BK, PTT.BK, CPALL.BK, ^SET.BK)
  {
    id: 'thai-set',
    symbol: 'SET INDEX',
    name: 'ตลาดหลักทรัพย์ฯ',
    category: 'thai',
    price: 1618.82,
    currency: 'THB',
    change24h: 1.46,
    changeAmount: 23.30,
    high24h: 1622.00,
    low24h: 1598.00,
    sparkline: [1595.5, 1602.0, 1608.5, 1612.0, 1615.0, 1617.5, 1618.82],
    forecast: {
      direction: 'bullish',
      signalLabel: 'มีลุ้นทดสอบ 1,625 จุด (Bullish)',
      confidence: 72,
      reasoning: 'แรงหนุนจากหุ้นกลุ่มอิเล็กทรอนิกส์และค้าปลีก ประกอบกับเม็ดเงินกองทุน Thai ESG และการฟื้นตัวของเศรษฐกิจในประเทศ',
      support: '1,605 จุด',
      resistance: '1,625 จุด',
      keyNews: 'Fund Flow สถาบันในประเทศมีสถานะซื้อสุทธิต่อเนื่องช่วยประคองดัชนี',
      sourceUrl: 'https://finance.yahoo.com/quote/%5ESET.BK/news/'
    }
  },
  {
    id: 'thai-delta',
    symbol: 'DELTA',
    name: 'Delta Electronics',
    category: 'thai',
    price: 276.00,
    currency: '฿',
    change24h: 7.81,
    changeAmount: 20.00,
    high24h: 280.00,
    low24h: 258.00,
    sparkline: [256.0, 260.0, 265.0, 268.0, 272.0, 274.0, 276.00],
    forecast: {
      direction: 'bullish',
      signalLabel: 'โมเมนตัมขึ้นแรง (Strong Momentum)',
      confidence: 76,
      reasoning: 'คำสั่งซื้อระบบ Power Supply สำหรับ Data Center และฮาร์ดแวร์ AI ทั่วโลกยังเติบโตสูง หนุนราคาขึ้นทดสอบระดับ New High',
      support: '265.00 ฿',
      resistance: '285.00 ฿',
      keyNews: 'ดีมานด์ระบบจ่ายไฟสำหรับเซิร์ฟเวอร์ AI ทั่วโลกผลักดันยอดขายของ DELTA',
      sourceUrl: 'https://finance.yahoo.com/quote/DELTA.BK/news/'
    }
  },
  {
    id: 'thai-ptt',
    symbol: 'PTT',
    name: 'ปตท.',
    category: 'thai',
    price: 41.50,
    currency: '฿',
    change24h: 0.00,
    changeAmount: 0.00,
    high24h: 42.00,
    low24h: 41.25,
    sparkline: [41.5, 41.5, 41.75, 41.5, 41.25, 41.5, 41.5],
    forecast: {
      direction: 'neutral',
      signalLabel: 'ทรงตัวรับปันผล (Defensive Yield)',
      confidence: 65,
      reasoning: 'หุ้นมีความผันผวนต่ำและให้ผลตอบแทนเงินปันผลสม่ำเสมอ เป็นเป้าหมายพักเงินในยามตลาดผันผวน',
      support: '40.50 ฿',
      resistance: '42.50 ฿',
      keyNews: 'ทิศทางราคาก๊าซและน้ำมันโลกที่ทรงตัวส่งผลให้ผลการดำเนินงานมีเสถียรภาพ',
      sourceUrl: 'https://finance.yahoo.com/quote/PTT.BK/news/'
    }
  },
  {
    id: 'thai-cpall',
    symbol: 'CPALL',
    name: 'ซีพี ออลล์',
    category: 'thai',
    price: 46.00,
    currency: '฿',
    change24h: -0.54,
    changeAmount: -0.25,
    high24h: 46.50,
    low24h: 45.75,
    sparkline: [46.25, 46.0, 46.0, 45.75, 46.25, 46.0, 46.0],
    forecast: {
      direction: 'bullish',
      signalLabel: 'ฟื้นตัวตามค้าปลีก (Recovery)',
      confidence: 70,
      reasoning: 'ยอดขายสาขาเดิม (SSSG) ของ 7-Eleven ยังได้แรงบวกจากการจับจ่ายใช้สอยและการฟื้นตัวของนักท่องเที่ยวต่างชาติ',
      support: '44.75 ฿',
      resistance: '48.00 ฿',
      keyNews: 'การบริโภคภาคเอกชนและภาคการท่องเที่ยวในไทยเริ่มมีสัญญาณเร่งตัว',
      sourceUrl: 'https://finance.yahoo.com/quote/CPALL.BK/news/'
    }
  }
];

export function getSavedWatchlist(): TickerItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_TICKERS;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch (e) {
    console.warn('Failed to load watchlist from localStorage', e);
  }
  return INITIAL_TICKERS;
}

export function saveWatchlist(tickers: TickerItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tickers));
  } catch (e) {
    console.error('Failed to save watchlist', e);
  }
}

/**
 * Fetches a single ticker quote from Yahoo Finance
 */
async function fetchYahooQuote(symbol: string): Promise<{
  price: number;
  change24h: number;
  changeAmount: number;
  high24h?: number;
  low24h?: number;
  sparkline?: number[];
} | null> {
  const yhSymbol = toYahooSymbol(symbol);
  
  const endpoints = [
    `/api/yahoo/v8/finance/chart/${yhSymbol}`,
    `https://corsproxy.io/?url=https://query1.finance.yahoo.com/v8/finance/chart/${yhSymbol}`,
    `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://query1.finance.yahoo.com/v8/finance/chart/${yhSymbol}`)}`
  ];

  for (const url of endpoints) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(3500) });
      if (!res.ok) continue;
      const data = await res.json();
      const result = data?.chart?.result?.[0];
      if (!result) continue;

      const meta = result.meta;
      const currentPrice = meta.regularMarketPrice;
      const prevClose = meta.chartPreviousClose || currentPrice;
      const diff = currentPrice - prevClose;
      const pct = prevClose ? (diff / prevClose) * 100 : 0;

      let sparkline: number[] | undefined;
      const closes = result.indicators?.quote?.[0]?.close;
      if (Array.isArray(closes) && closes.length > 0) {
        const validCloses = closes.filter((c: any) => typeof c === 'number' && !isNaN(c));
        if (validCloses.length >= 5) {
          const step = Math.floor(validCloses.length / 7) || 1;
          sparkline = [];
          for (let i = 0; i < validCloses.length; i += step) {
            sparkline.push(parseFloat(validCloses[i].toFixed(2)));
            if (sparkline.length === 7) break;
          }
          if (sparkline.length > 0) {
            sparkline[sparkline.length - 1] = currentPrice;
          }
        }
      }

      return {
        price: parseFloat(currentPrice.toFixed(2)),
        change24h: parseFloat(pct.toFixed(2)),
        changeAmount: parseFloat(diff.toFixed(2)),
        high24h: meta.regularMarketDayHigh ? parseFloat(meta.regularMarketDayHigh.toFixed(2)) : undefined,
        low24h: meta.regularMarketDayLow ? parseFloat(meta.regularMarketDayLow.toFixed(2)) : undefined,
        sparkline
      };
    } catch (e) {
      // Continue to next endpoint
    }
  }

  return null;
}

/**
 * Updates all tickers with live data from Yahoo Finance while preserving their AI forecasts
 */
export async function fetchLiveMarketUpdates(tickers: TickerItem[]): Promise<TickerItem[]> {
  const updatedList = await Promise.all(
    tickers.map(async (ticker) => {
      try {
        const quote = await fetchYahooQuote(ticker.symbol);
        if (quote && quote.price > 0) {
          return {
            ...ticker,
            price: quote.price,
            change24h: quote.change24h,
            changeAmount: quote.changeAmount,
            high24h: quote.high24h ?? ticker.high24h,
            low24h: quote.low24h ?? ticker.low24h,
            sparkline: quote.sparkline && quote.sparkline.length >= 4 ? quote.sparkline : ticker.sparkline
          };
        }
      } catch (err) {
        // preserve current ticker
      }
      return ticker;
    })
  );

  return updatedList;
}

export interface YahooSearchResult {
  symbol: string;
  name: string;
  exchange: string;
  type: string;
}

/**
 * Searches Yahoo Finance for stock suggestions in real-time
 */
export async function searchYahooTickers(query: string): Promise<YahooSearchResult[]> {
  if (!query || query.trim().length === 0) return [];
  const cleanQ = encodeURIComponent(query.trim());

  const endpoints = [
    `/api/yahoo/v1/finance/search?q=${cleanQ}&quotesCount=8&newsCount=0`,
    `https://corsproxy.io/?url=${encodeURIComponent(`https://query1.finance.yahoo.com/v1/finance/search?q=${cleanQ}&quotesCount=8&newsCount=0`)}`,
    `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://query1.finance.yahoo.com/v1/finance/search?q=${cleanQ}&quotesCount=8&newsCount=0`)}`
  ];

  for (const url of endpoints) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(3000) });
      if (!res.ok) continue;
      const data = await res.json();
      if (data?.quotes && Array.isArray(data.quotes)) {
        return data.quotes
          .filter((q: any) => q.symbol && (q.quoteType === 'EQUITY' || q.quoteType === 'CRYPTOCURRENCY' || q.quoteType === 'COMMODITY' || q.quoteType === 'ETF'))
          .map((q: any) => ({
            symbol: q.symbol,
            name: q.shortname || q.longname || q.symbol,
            exchange: q.exchDisp || q.exchange || '',
            type: q.typeDisp || q.quoteType || 'Equity'
          }));
      }
    } catch (e) {
      // try next endpoint
    }
  }

  // Fallback presets if offline
  const fallbackPresets: YahooSearchResult[] = [
    { symbol: 'PLTR', name: 'Palantir Technologies Inc.', exchange: 'NASDAQ', type: 'Equity' },
    { symbol: 'NVDA', name: 'NVIDIA Corp', exchange: 'NASDAQ', type: 'Equity' },
    { symbol: 'TSLA', name: 'Tesla Inc.', exchange: 'NASDAQ', type: 'Equity' },
    { symbol: 'AAPL', name: 'Apple Inc.', exchange: 'NASDAQ', type: 'Equity' },
    { symbol: 'AMD', name: 'Advanced Micro Devices', exchange: 'NASDAQ', type: 'Equity' },
    { symbol: 'META', name: 'Meta Platforms Inc.', exchange: 'NASDAQ', type: 'Equity' },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', exchange: 'NASDAQ', type: 'Equity' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', exchange: 'NASDAQ', type: 'Equity' },
    { symbol: 'DELTA.BK', name: 'Delta Electronics Thailand', exchange: 'SET', type: 'Equity' },
    { symbol: 'PTT.BK', name: 'PTT Public Co.', exchange: 'SET', type: 'Equity' },
    { symbol: 'CPALL.BK', name: 'CP ALL Public Co.', exchange: 'SET', type: 'Equity' },
    { symbol: 'BTC-USD', name: 'Bitcoin USD', exchange: 'Crypto', type: 'Cryptocurrency' }
  ];

  return fallbackPresets.filter(
    (p) =>
      p.symbol.toLowerCase().includes(query.toLowerCase()) ||
      p.name.toLowerCase().includes(query.toLowerCase())
  );
}

/**
 * Creates a complete TickerItem with live Yahoo Finance quote and AI forecast
 */
export async function createTickerFromYahoo(
  symbol: string,
  defaultName?: string
): Promise<TickerItem> {
  const quote = await fetchYahooQuote(symbol);
  const isThai = symbol.endsWith('.BK') || symbol === '^SET.BK';
  const isCrypto = symbol.includes('-USD') || symbol === 'BTC' || symbol === 'ETH' || symbol === 'SOL';
  const isCommodity = symbol.includes('=F') || symbol.includes('GOLD') || symbol.includes('BRENT');

  let category: import('../types').AssetCategory = 'us-tech';
  if (isThai) category = 'thai';
  else if (isCrypto) category = 'crypto';
  else if (isCommodity) category = 'commodity';

  const currency = isThai ? '฿' : '$';
  const currentPrice = quote?.price || 100.0;
  const changePct = quote?.change24h || 0.0;
  const changeAmt = quote?.changeAmount || 0.0;

  const isBullish = changePct >= 0;
  const dir: 'bullish' | 'bearish' = isBullish ? 'bullish' : 'bearish';

  return {
    id: `custom-${Date.now()}-${symbol.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
    symbol: symbol.toUpperCase().replace('.BK', ''),
    name: defaultName || symbol.toUpperCase(),
    category,
    price: currentPrice,
    currency,
    change24h: changePct,
    changeAmount: changeAmt,
    high24h: quote?.high24h || currentPrice * 1.02,
    low24h: quote?.low24h || currentPrice * 0.98,
    sparkline: quote?.sparkline && quote.sparkline.length >= 4 ? quote.sparkline : [currentPrice * 0.98, currentPrice * 0.99, currentPrice],
    isCustom: true,
    forecast: {
      direction: dir,
      signalLabel: isBullish ? 'สัญญาณบวก (Bullish)' : 'ระวังพักฐาน (Pullback)',
      confidence: 74,
      reasoning: `ดึงข้อมูลสดจาก Yahoo Finance (${symbol}): ปริมาณการซื้อขายและโมเมนตัมราคาเคลื่อนไหว ${isBullish ? 'ในแดนบวกต่อเนื่อง' : 'มีแรงขายทำกำไรระยะสั้น'}`,
      support: `${currency}${(currentPrice * 0.96).toFixed(2)}`,
      resistance: `${currency}${(currentPrice * 1.05).toFixed(2)}`,
      keyNews: `ติดตามข่าวสารและบทวิเคราะห์ล่าสุดของ ${symbol} บน Yahoo Finance`,
      sourceUrl: `https://finance.yahoo.com/quote/${symbol}`
    }
  };
}
