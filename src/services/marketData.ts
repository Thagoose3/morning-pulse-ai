import { TickerItem } from '../types';

const STORAGE_KEY = 'morning_pulse_watchlist_v3';

// Clear legacy cached watchlists that might hold outdated prices
if (typeof window !== 'undefined') {
  try {
    localStorage.removeItem('morning_pulse_watchlist_v1');
    localStorage.removeItem('morning_pulse_watchlist_v2');
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
  
  // Endpoints to try: 1. Vite Proxy (Local), 2. corsproxy.io, 3. allorigins fallback
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

      // Extract closing prices from timestamps for sparkline if available
      let sparkline: number[] | undefined;
      const closes = result.indicators?.quote?.[0]?.close;
      if (Array.isArray(closes) && closes.length > 0) {
        const validCloses = closes.filter((c: any) => typeof c === 'number' && !isNaN(c));
        if (validCloses.length >= 5) {
          // Take 7 evenly spaced sample points
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
      // Try next endpoint
    }
  }

  return null;
}

/**
 * Updates all tickers with live data from Yahoo Finance
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
