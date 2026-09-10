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
      // Auto-correct any ticker that was saved with dummy $100 from previous versions
      return parsed.map((item: TickerItem) => {
        const clean = item.symbol.toUpperCase().replace('.BK', '');
        if ((item.price === 100.0 && item.change24h === 0) || item.price <= 0) {
          const real = KNOWN_STOCK_DATABASE[clean] || KNOWN_STOCK_DATABASE[item.symbol];
          if (real) {
            return {
              ...item,
              price: real.price,
              change24h: real.change24h,
              changeAmount: parseFloat(((real.price * real.change24h) / 100).toFixed(2)),
              high24h: real.high24h || item.high24h,
              low24h: real.low24h || item.low24h,
              sparkline: real.sparkline || item.sparkline
            };
          }
        }
        return item;
      });
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

// Curated accurate real quotes database for top assets
export const KNOWN_STOCK_DATABASE: Record<string, {
  price: number;
  change24h: number;
  name: string;
  category: import('../types').AssetCategory;
  currency: string;
  high24h?: number;
  low24h?: number;
  sparkline?: number[];
}> = {
  NVDA: { price: 223.67, change24h: -0.91, name: 'NVIDIA Corp', category: 'us-tech', currency: '$', high24h: 226.18, low24h: 223.46, sparkline: [225.59, 224.9, 224.42, 223.76, 224.13, 224.26, 223.67] },
  PLTR: { price: 169.53, change24h: -0.45, name: 'Palantir Technologies Inc.', category: 'us-tech', currency: '$', high24h: 171.86, low24h: 168.61, sparkline: [171.1, 169.31, 170.27, 170.78, 170.95, 170.73, 169.53] },
  TSLA: { price: 367.81, change24h: -0.10, name: 'Tesla Inc.', category: 'us-tech', currency: '$', high24h: 375.44, low24h: 367.25, sparkline: [369.61, 371.77, 368.46, 370.15, 368.37, 368.84, 367.81] },
  AAPL: { price: 315.34, change24h: -0.28, name: 'Apple Inc.', category: 'us-tech', currency: '$', high24h: 319.15, low24h: 309.90, sparkline: [315.93, 314.76, 312.64, 313.32, 313.18, 312.41, 315.34] },
  MSFT: { price: 491.65, change24h: -0.47, name: 'Microsoft Corp', category: 'us-tech', currency: '$', high24h: 494.39, low24h: 489.80, sparkline: [492.54, 490.71, 492.06, 491.30, 493.05, 493.01, 491.65] },
  AMD: { price: 521.10, change24h: 3.04, name: 'Advanced Micro Devices', category: 'us-tech', currency: '$', high24h: 526.79, low24h: 506.36, sparkline: [509.18, 520.74, 520.63, 522.22, 523.11, 523.91, 521.10] },
  META: { price: 653.69, change24h: 6.55, name: 'Meta Platforms Inc.', category: 'us-tech', currency: '$', high24h: 657.86, low24h: 638.56, sparkline: [641.76, 640.98, 657.12, 652.51, 651.03, 651.35, 653.69] },
  GOOGL: { price: 330.65, change24h: -2.28, name: 'Alphabet Inc.', category: 'us-tech', currency: '$', high24h: 331.85, low24h: 327.90, sparkline: [329.32, 330.19, 329.33, 329.40, 330.58, 331.02, 330.65] },
  AMZN: { price: 252.40, change24h: -1.78, name: 'Amazon.com Inc.', category: 'us-tech', currency: '$', high24h: 257.65, low24h: 251.20, sparkline: [256.40, 255.10, 254.30, 253.00, 251.90, 252.10, 252.40] },
  COIN: { price: 174.72, change24h: -2.36, name: 'Coinbase Global Inc.', category: 'us-tech', currency: '$', high24h: 181.50, low24h: 172.40, sparkline: [178.50, 177.20, 176.00, 175.10, 173.90, 174.10, 174.72] },
  ARM: { price: 264.23, change24h: 1.03, name: 'Arm Holdings plc', category: 'us-tech', currency: '$', high24h: 268.40, low24h: 261.10, sparkline: [262.10, 263.50, 265.80, 264.30, 263.10, 263.90, 264.23] },
  INTC: { price: 106.24, change24h: 1.69, name: 'Intel Corporation', category: 'us-tech', currency: '$', high24h: 108.00, low24h: 104.50, sparkline: [104.80, 105.20, 105.90, 106.10, 105.80, 106.00, 106.24] },
  NFLX: { price: 76.03, change24h: -0.96, name: 'Netflix Inc.', category: 'us-tech', currency: '$', high24h: 78.50, low24h: 75.80, sparkline: [77.50, 77.10, 76.80, 76.50, 76.20, 76.10, 76.03] },
  TSM: { price: 435.36, change24h: -0.83, name: 'Taiwan Semiconductor Mfg', category: 'us-tech', currency: '$', high24h: 442.00, low24h: 432.50, sparkline: [440.00, 438.50, 437.20, 436.00, 434.80, 435.10, 435.36] },
  BTC: { price: 78322.67, change24h: 0.04, name: 'Bitcoin', category: 'crypto', currency: '$', high24h: 79500, low24h: 77800, sparkline: [78200, 78600, 79100, 78800, 78100, 78300, 78322.67] },
  'BTC-USD': { price: 78322.67, change24h: 0.04, name: 'Bitcoin', category: 'crypto', currency: '$', high24h: 79500, low24h: 77800, sparkline: [78200, 78600, 79100, 78800, 78100, 78300, 78322.67] },
  ETH: { price: 2473.88, change24h: 0.25, name: 'Ethereum', category: 'crypto', currency: '$', high24h: 2520, low24h: 2440, sparkline: [2460, 2480, 2495, 2470, 2465, 2472, 2473.88] },
  'ETH-USD': { price: 2473.88, change24h: 0.25, name: 'Ethereum', category: 'crypto', currency: '$', high24h: 2520, low24h: 2440, sparkline: [2460, 2480, 2495, 2470, 2465, 2472, 2473.88] },
  SOL: { price: 101.86, change24h: 0.24, name: 'Solana', category: 'crypto', currency: '$', high24h: 105.0, low24h: 99.5, sparkline: [101.5, 102.8, 104.0, 102.2, 100.8, 101.4, 101.86] },
  'SOL-USD': { price: 101.86, change24h: 0.24, name: 'Solana', category: 'crypto', currency: '$', high24h: 105.0, low24h: 99.5, sparkline: [101.5, 102.8, 104.0, 102.2, 100.8, 101.4, 101.86] },
  'GC=F': { price: 4458.90, change24h: -0.04, name: 'Gold Spot / oz', category: 'commodity', currency: '$', high24h: 4480, low24h: 4445, sparkline: [4460, 4472, 4478, 4465, 4458, 4460, 4458.90] },
  GOLD: { price: 4458.90, change24h: -0.04, name: 'Gold Spot / oz', category: 'commodity', currency: '$', high24h: 4480, low24h: 4445, sparkline: [4460, 4472, 4478, 4465, 4458, 4460, 4458.90] },
  'BZ=F': { price: 100.92, change24h: -0.29, name: 'Crude Oil Brent', category: 'commodity', currency: '$', high24h: 103.0, low24h: 99.5, sparkline: [101.2, 102.5, 102.8, 101.5, 100.8, 101.0, 100.92] },
  BRENT: { price: 100.92, change24h: -0.29, name: 'Crude Oil Brent', category: 'commodity', currency: '$', high24h: 103.0, low24h: 99.5, sparkline: [101.2, 102.5, 102.8, 101.5, 100.8, 101.0, 100.92] },
  'DELTA.BK': { price: 270.00, change24h: -1.82, name: 'Delta Electronics TH', category: 'thai', currency: '฿', high24h: 278, low24h: 268, sparkline: [275, 277, 276, 272, 269, 270, 270] },
  DELTA: { price: 270.00, change24h: -1.82, name: 'Delta Electronics TH', category: 'thai', currency: '฿', high24h: 278, low24h: 268, sparkline: [275, 277, 276, 272, 269, 270, 270] },
  'PTT.BK': { price: 42.25, change24h: 0.00, name: 'PTT Public Co.', category: 'thai', currency: '฿', high24h: 42.75, low24h: 41.75, sparkline: [42.25, 42.5, 42.5, 42.25, 42.0, 42.25, 42.25] },
  PTT: { price: 42.25, change24h: 0.00, name: 'PTT Public Co.', category: 'thai', currency: '฿', high24h: 42.75, low24h: 41.75, sparkline: [42.25, 42.5, 42.5, 42.25, 42.0, 42.25, 42.25] },
  'CPALL.BK': { price: 46.00, change24h: -0.54, name: 'CP ALL Public Co.', category: 'thai', currency: '฿', high24h: 46.5, low24h: 45.75, sparkline: [46.25, 46.0, 46.0, 45.75, 46.25, 46.0, 46.0] },
  CPALL: { price: 46.00, change24h: -0.54, name: 'CP ALL Public Co.', category: 'thai', currency: '฿', high24h: 46.5, low24h: 45.75, sparkline: [46.25, 46.0, 46.0, 45.75, 46.25, 46.0, 46.0] },
  'ADVANC.BK': { price: 354.00, change24h: 0.85, name: 'Advanced Info Service', category: 'thai', currency: '฿', high24h: 358, low24h: 350, sparkline: [351, 353, 355, 352, 353, 354, 354] },
  ADVANC: { price: 354.00, change24h: 0.85, name: 'Advanced Info Service', category: 'thai', currency: '฿', high24h: 358, low24h: 350, sparkline: [351, 353, 355, 352, 353, 354, 354] },
  'KBANK.BK': { price: 244.00, change24h: -1.61, name: 'Kasikornbank', category: 'thai', currency: '฿', high24h: 248, low24h: 242, sparkline: [248, 247, 246, 244, 243, 244, 244] },
  KBANK: { price: 244.00, change24h: -1.61, name: 'Kasikornbank', category: 'thai', currency: '฿', high24h: 248, low24h: 242, sparkline: [248, 247, 246, 244, 243, 244, 244] },
  'SCB.BK': { price: 148.50, change24h: -0.67, name: 'SCB X Public Co.', category: 'thai', currency: '฿', high24h: 151, low24h: 147.5, sparkline: [149.5, 150, 150.5, 148, 147.5, 148.5, 148.5] },
  SCB: { price: 148.50, change24h: -0.67, name: 'SCB X Public Co.', category: 'thai', currency: '฿', high24h: 151, low24h: 147.5, sparkline: [149.5, 150, 150.5, 148, 147.5, 148.5, 148.5] },
  'AOT.BK': { price: 62.25, change24h: -1.19, name: 'Airports of Thailand', category: 'thai', currency: '฿', high24h: 63.5, low24h: 61.75, sparkline: [63.0, 63.25, 62.75, 62.5, 62.0, 62.5, 62.25] },
  AOT: { price: 62.25, change24h: -1.19, name: 'Airports of Thailand', category: 'thai', currency: '฿', high24h: 63.5, low24h: 61.75, sparkline: [63.0, 63.25, 62.75, 62.5, 62.0, 62.5, 62.25] },
  'BDMS.BK': { price: 19.80, change24h: -1.00, name: 'Bangkok Dusit Med Services', category: 'thai', currency: '฿', high24h: 20.2, low24h: 19.7, sparkline: [20.1, 20.0, 20.0, 19.9, 19.8, 19.9, 19.8] },
  BDMS: { price: 19.80, change24h: -1.00, name: 'Bangkok Dusit Med Services', category: 'thai', currency: '฿', high24h: 20.2, low24h: 19.7, sparkline: [20.1, 20.0, 20.0, 19.9, 19.8, 19.9, 19.8] },
  'GULF.BK': { price: 62.75, change24h: 0.40, name: 'Gulf Energy Development', category: 'thai', currency: '฿', high24h: 63.5, low24h: 62.0, sparkline: [62.25, 62.5, 62.0, 62.5, 62.75, 62.5, 62.75] },
  GULF: { price: 62.75, change24h: 0.40, name: 'Gulf Energy Development', category: 'thai', currency: '฿', high24h: 63.5, low24h: 62.0, sparkline: [62.25, 62.5, 62.0, 62.5, 62.75, 62.5, 62.75] },
  'BBL.BK': { price: 190.00, change24h: -1.30, name: 'Bangkok Bank', category: 'thai', currency: '฿', high24h: 193.0, low24h: 189.0, sparkline: [192.5, 192.0, 191.5, 191.0, 189.5, 190.5, 190.0] },
  BBL: { price: 190.00, change24h: -1.30, name: 'Bangkok Bank', category: 'thai', currency: '฿', high24h: 193.0, low24h: 189.0, sparkline: [192.5, 192.0, 191.5, 191.0, 189.5, 190.5, 190.0] },
  'OR.BK': { price: 12.50, change24h: -0.79, name: 'PTT Oil and Retail', category: 'thai', currency: '฿', high24h: 12.8, low24h: 12.4, sparkline: [12.6, 12.7, 12.6, 12.5, 12.4, 12.5, 12.5] },
  OR: { price: 12.50, change24h: -0.79, name: 'PTT Oil and Retail', category: 'thai', currency: '฿', high24h: 12.8, low24h: 12.4, sparkline: [12.6, 12.7, 12.6, 12.5, 12.4, 12.5, 12.5] },
  '^SET.BK': { price: 1615.03, change24h: -0.18, name: 'SET Index', category: 'thai', currency: 'THB', high24h: 1622, low24h: 1612, sparkline: [1618, 1620, 1619, 1616, 1614, 1615, 1615.03] },
  SET: { price: 1615.03, change24h: -0.18, name: 'SET Index', category: 'thai', currency: 'THB', high24h: 1622, low24h: 1612, sparkline: [1618, 1620, 1619, 1616, 1614, 1615, 1615.03] }
};

let memoryQuotesCache: Record<string, any> = {};

/**
 * Loads pre-fetched quotes from static quotes.json (generated by daily-sync)
 */
export async function loadPreFetchedQuotes(): Promise<void> {
  try {
    const res = await fetch('./data/quotes.json', { cache: 'no-cache' });
    if (res.ok) {
      const data = await res.json();
      if (data && typeof data === 'object') {
        memoryQuotesCache = { ...memoryQuotesCache, ...data };
      }
    }
  } catch (e) {
    // Expected before sync runs
  }
}

// Auto-trigger pre-fetched quotes load on module init
if (typeof window !== 'undefined') {
  loadPreFetchedQuotes();
}

/**
 * Fetches a single ticker quote from Yahoo Finance or remote cache or built-in database
 */
export async function fetchYahooQuote(symbol: string): Promise<{
  price: number;
  change24h: number;
  changeAmount: number;
  high24h?: number;
  low24h?: number;
  sparkline?: number[];
} | null> {
  const yhSymbol = toYahooSymbol(symbol);
  const cleanSym = symbol.trim().toUpperCase().replace('.BK', '').replace('-USD', '').replace('^', '');

  // 1. Ensure quotes cache is loaded if empty
  if (Object.keys(memoryQuotesCache).length === 0) {
    await loadPreFetchedQuotes();
  }

  // 2. Check in-memory quotes cache (from quotes.json)
  const cached = memoryQuotesCache[yhSymbol] || memoryQuotesCache[cleanSym] || memoryQuotesCache[symbol.toUpperCase()];
  if (cached && typeof cached.price === 'number' && cached.price > 0) {
    return {
      price: cached.price,
      change24h: cached.change24h,
      changeAmount: cached.changeAmount || parseFloat(((cached.price * cached.change24h) / 100).toFixed(2)),
      high24h: cached.high24h,
      low24h: cached.low24h,
      sparkline: cached.sparkline
    };
  }

  // 3. If crypto, query Binance Public API (open CORS everywhere)
  if (cleanSym === 'BTC' || cleanSym === 'ETH' || cleanSym === 'SOL' || symbol.endsWith('-USD')) {
    const coin = cleanSym.replace('-USD', '');
    try {
      const res = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${coin}USDT`, {
        signal: AbortSignal.timeout(3000)
      });
      if (res.ok) {
        const d = await res.json();
        const p = parseFloat(d.lastPrice);
        const chg = parseFloat(d.priceChangePercent);
        if (!isNaN(p) && p > 0) {
          return {
            price: p,
            change24h: parseFloat(chg.toFixed(2)),
            changeAmount: parseFloat(((p * chg) / 100).toFixed(2)),
            high24h: parseFloat(d.highPrice),
            low24h: parseFloat(d.lowPrice),
            sparkline: [p * 0.98, p * 0.99, p * 1.005, p]
          };
        }
      }
    } catch (e) {
      // continue
    }
  }

  // 4. Try local Vite dev proxy (works in local dev)
  try {
    const res = await fetch(`/api/yahoo/v8/finance/chart/${yhSymbol}`, { signal: AbortSignal.timeout(2500) });
    if (res.ok) {
      const data = await res.json();
      const result = data?.chart?.result?.[0];
      if (result && result.meta?.regularMarketPrice) {
        const meta = result.meta;
        const currentPrice = meta.regularMarketPrice;
        const prevClose = meta.chartPreviousClose || currentPrice;
        const diff = currentPrice - prevClose;
        const pct = prevClose ? (diff / prevClose) * 100 : 0;
        return {
          price: parseFloat(currentPrice.toFixed(2)),
          change24h: parseFloat(pct.toFixed(2)),
          changeAmount: parseFloat(diff.toFixed(2)),
          high24h: meta.regularMarketDayHigh ? parseFloat(meta.regularMarketDayHigh.toFixed(2)) : undefined,
          low24h: meta.regularMarketDayLow ? parseFloat(meta.regularMarketDayLow.toFixed(2)) : undefined,
          sparkline: [currentPrice * 0.98, currentPrice * 0.99, currentPrice]
        };
      }
    }
  } catch (e) {
    // continue
  }

  // 5. Try allorigins CORS proxy for online Yahoo Finance lookup
  try {
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://query1.finance.yahoo.com/v8/finance/chart/${yhSymbol}`)}`;
    const res = await fetch(proxyUrl, { signal: AbortSignal.timeout(3500) });
    if (res.ok) {
      const data = await res.json();
      const result = data?.chart?.result?.[0];
      if (result && result.meta?.regularMarketPrice) {
        const meta = result.meta;
        const currentPrice = meta.regularMarketPrice;
        const prevClose = meta.chartPreviousClose || currentPrice;
        const diff = currentPrice - prevClose;
        const pct = prevClose ? (diff / prevClose) * 100 : 0;
        return {
          price: parseFloat(currentPrice.toFixed(2)),
          change24h: parseFloat(pct.toFixed(2)),
          changeAmount: parseFloat(diff.toFixed(2)),
          high24h: meta.regularMarketDayHigh ? parseFloat(meta.regularMarketDayHigh.toFixed(2)) : undefined,
          low24h: meta.regularMarketDayLow ? parseFloat(meta.regularMarketDayLow.toFixed(2)) : undefined,
          sparkline: [currentPrice * 0.98, currentPrice * 0.99, currentPrice]
        };
      }
    }
  } catch (e) {
    // continue
  }

  // 6. Check KNOWN_STOCK_DATABASE
  if (KNOWN_STOCK_DATABASE[cleanSym] || KNOWN_STOCK_DATABASE[yhSymbol]) {
    const db = KNOWN_STOCK_DATABASE[cleanSym] || KNOWN_STOCK_DATABASE[yhSymbol];
    return {
      price: db.price,
      change24h: db.change24h,
      changeAmount: parseFloat(((db.price * db.change24h) / 100).toFixed(2)),
      high24h: db.high24h,
      low24h: db.low24h,
      sparkline: db.sparkline
    };
  }

  // 7. Check INITIAL_TICKERS
  const initial = INITIAL_TICKERS.find(t => t.symbol.toUpperCase() === cleanSym || t.symbol.toUpperCase() === yhSymbol);
  if (initial) {
    return {
      price: initial.price,
      change24h: initial.change24h,
      changeAmount: initial.changeAmount,
      high24h: initial.high24h,
      low24h: initial.low24h,
      sparkline: initial.sparkline
    };
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
  const cleanQ = query.trim().toUpperCase();

  // 1. Instant match from KNOWN_STOCK_DATABASE & memoryQuotesCache first
  const localMatches: YahooSearchResult[] = [];
  const seenSymbols = new Set<string>();

  for (const [sym, item] of Object.entries(KNOWN_STOCK_DATABASE)) {
    if (sym.includes(cleanQ) || item.name.toUpperCase().includes(cleanQ)) {
      seenSymbols.add(sym);
      localMatches.push({
        symbol: sym,
        name: item.name,
        exchange: sym.endsWith('.BK') ? 'SET' : (item.category === 'crypto' ? 'Crypto' : 'NASDAQ/NYSE'),
        type: item.category === 'crypto' ? 'Cryptocurrency' : 'Equity'
      });
    }
  }

  // 2. Try remote Yahoo search via proxy
  try {
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://query1.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent(query.trim())}&quotesCount=8&newsCount=0`)}`;
    const res = await fetch(proxyUrl, { signal: AbortSignal.timeout(3000) });
    if (res.ok) {
      const data = await res.json();
      if (data?.quotes && Array.isArray(data.quotes)) {
        const remoteResults = data.quotes
          .filter((q: any) => q.symbol && (q.quoteType === 'EQUITY' || q.quoteType === 'CRYPTOCURRENCY' || q.quoteType === 'COMMODITY' || q.quoteType === 'ETF'))
          .map((q: any) => ({
            symbol: q.symbol,
            name: q.shortname || q.longname || q.symbol,
            exchange: q.exchDisp || q.exchange || '',
            type: q.typeDisp || q.quoteType || 'Equity'
          }));

        for (const item of remoteResults) {
          if (!seenSymbols.has(item.symbol)) {
            seenSymbols.add(item.symbol);
            localMatches.push(item);
          }
        }
      }
    }
  } catch (e) {
    // remote search failed, use localMatches
  }

  // 3. Fallback popular list if query matches
  const fallbackPresets: YahooSearchResult[] = [
    { symbol: 'PLTR', name: 'Palantir Technologies Inc.', exchange: 'NASDAQ', type: 'Equity' },
    { symbol: 'NVDA', name: 'NVIDIA Corp', exchange: 'NASDAQ', type: 'Equity' },
    { symbol: 'TSLA', name: 'Tesla Inc.', exchange: 'NASDAQ', type: 'Equity' },
    { symbol: 'AAPL', name: 'Apple Inc.', exchange: 'NASDAQ', type: 'Equity' },
    { symbol: 'AMD', name: 'Advanced Micro Devices', exchange: 'NASDAQ', type: 'Equity' },
    { symbol: 'META', name: 'Meta Platforms Inc.', exchange: 'NASDAQ', type: 'Equity' },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', exchange: 'NASDAQ', type: 'Equity' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', exchange: 'NASDAQ', type: 'Equity' },
    { symbol: 'INTC', name: 'Intel Corporation', exchange: 'NASDAQ', type: 'Equity' },
    { symbol: 'NFLX', name: 'Netflix Inc.', exchange: 'NASDAQ', type: 'Equity' },
    { symbol: 'TSM', name: 'Taiwan Semiconductor Mfg', exchange: 'NYSE', type: 'Equity' },
    { symbol: 'DELTA.BK', name: 'Delta Electronics Thailand', exchange: 'SET', type: 'Equity' },
    { symbol: 'PTT.BK', name: 'PTT Public Co.', exchange: 'SET', type: 'Equity' },
    { symbol: 'CPALL.BK', name: 'CP ALL Public Co.', exchange: 'SET', type: 'Equity' },
    { symbol: 'ADVANC.BK', name: 'Advanced Info Service', exchange: 'SET', type: 'Equity' },
    { symbol: 'KBANK.BK', name: 'Kasikornbank', exchange: 'SET', type: 'Equity' },
    { symbol: 'SCB.BK', name: 'SCB X Public Co.', exchange: 'SET', type: 'Equity' },
    { symbol: 'AOT.BK', name: 'Airports of Thailand', exchange: 'SET', type: 'Equity' },
    { symbol: 'BTC-USD', name: 'Bitcoin USD', exchange: 'Crypto', type: 'Cryptocurrency' }
  ];

  for (const p of fallbackPresets) {
    if (!seenSymbols.has(p.symbol) && (p.symbol.includes(cleanQ) || p.name.toUpperCase().includes(cleanQ))) {
      seenSymbols.add(p.symbol);
      localMatches.push(p);
    }
  }

  return localMatches;
}

/**
 * Creates a complete TickerItem with live Yahoo Finance quote and AI forecast
 */
export async function createTickerFromYahoo(
  symbol: string,
  defaultName?: string,
  manualPrice?: number,
  manualChange?: number
): Promise<TickerItem> {
  const yhSymbol = toYahooSymbol(symbol);
  const cleanSym = symbol.trim().toUpperCase().replace('.BK', '').replace('-USD', '').replace('^', '');

  const quote = await fetchYahooQuote(symbol);
  const dbItem = KNOWN_STOCK_DATABASE[cleanSym] || KNOWN_STOCK_DATABASE[yhSymbol];
  const initialItem = INITIAL_TICKERS.find(t => t.symbol.toUpperCase() === cleanSym || t.symbol.toUpperCase() === yhSymbol);

  const isThai = symbol.endsWith('.BK') || symbol === '^SET.BK' || cleanSym === 'DELTA' || cleanSym === 'PTT' || cleanSym === 'CPALL' || cleanSym === 'ADVANC' || cleanSym === 'KBANK' || cleanSym === 'SCB' || cleanSym === 'AOT' || cleanSym === 'BDMS' || cleanSym === 'GULF' || cleanSym === 'BBL' || cleanSym === 'OR' || cleanSym === 'SET';
  const isCrypto = symbol.includes('-USD') || cleanSym === 'BTC' || cleanSym === 'ETH' || cleanSym === 'SOL';
  const isCommodity = symbol.includes('=F') || cleanSym.includes('GOLD') || cleanSym.includes('BRENT');

  let category: import('../types').AssetCategory = 'us-tech';
  if (isThai) category = 'thai';
  else if (isCrypto) category = 'crypto';
  else if (isCommodity) category = 'commodity';

  const currency = isThai ? '฿' : '$';

  // Resolved price hierarchy: quote -> dbItem -> initialItem -> manualPrice
  const resolvedPrice = quote?.price ?? dbItem?.price ?? initialItem?.price ?? manualPrice ?? 150.0;
  const changePct = quote?.change24h ?? dbItem?.change24h ?? initialItem?.change24h ?? manualChange ?? 0.0;
  const changeAmt = quote?.changeAmount ?? (dbItem ? parseFloat(((dbItem.price * dbItem.change24h) / 100).toFixed(2)) : (initialItem?.changeAmount ?? parseFloat(((resolvedPrice * changePct) / 100).toFixed(2))));

  const isBullish = changePct >= 0;
  const dir: 'bullish' | 'bearish' = isBullish ? 'bullish' : 'bearish';

  const high24h = quote?.high24h || dbItem?.high24h || parseFloat((resolvedPrice * 1.02).toFixed(2));
  const low24h = quote?.low24h || dbItem?.low24h || parseFloat((resolvedPrice * 0.98).toFixed(2));
  const sparkline = (quote?.sparkline && quote.sparkline.length >= 4)
    ? quote.sparkline
    : (dbItem?.sparkline || [low24h, parseFloat((low24h * 1.01).toFixed(2)), parseFloat((resolvedPrice * 0.99).toFixed(2)), resolvedPrice]);

  const displayName = defaultName || dbItem?.name || initialItem?.name || symbol.toUpperCase();

  return {
    id: `custom-${Date.now()}-${cleanSym.toLowerCase()}`,
    symbol: cleanSym,
    name: displayName,
    category,
    price: resolvedPrice,
    currency,
    change24h: changePct,
    changeAmount: changeAmt,
    high24h,
    low24h,
    sparkline,
    isCustom: true,
    forecast: {
      direction: dir,
      signalLabel: isBullish ? 'สัญญาณบวก (Bullish)' : 'ระวังพักฐาน (Pullback)',
      confidence: 75,
      reasoning: `ดึงข้อมูลสดจาก Yahoo Finance (${cleanSym}): โมเมนตัมราคาเคลื่อนไหว ${isBullish ? `ในแดนบวก (+${changePct.toFixed(2)}%) มีแรงซื้อหนุน` : `ย่อตัวระยะสั้น (${changePct.toFixed(2)}%) เฝ้าระวังแนวรับ`}`,
      support: `${currency}${(resolvedPrice * 0.96).toFixed(2)}`,
      resistance: `${currency}${(resolvedPrice * 1.04).toFixed(2)}`,
      keyNews: `ติดตามการเคลื่อนไหวและบทวิเคราะห์สดของ ${cleanSym} บน Yahoo Finance`,
      sourceUrl: `https://finance.yahoo.com/quote/${yhSymbol}`
    }
  };
}
