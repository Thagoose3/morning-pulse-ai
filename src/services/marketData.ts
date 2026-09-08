import { TickerItem } from '../types';

const STORAGE_KEY = 'morning_pulse_watchlist_v2';

export const INITIAL_TICKERS: TickerItem[] = [
  // US Tech Giants (Updated to actual current market prices)
  {
    id: 'stock-nvda',
    symbol: 'NVDA',
    name: 'NVIDIA Corp',
    category: 'us-tech',
    price: 229.49,
    currency: '$',
    change24h: 3.82,
    changeAmount: 8.44,
    high24h: 232.00,
    low24h: 224.50,
    sparkline: [222, 224, 225.5, 226, 227.8, 228.9, 229.49],
  },
  {
    id: 'stock-tsla',
    symbol: 'TSLA',
    name: 'Tesla Inc',
    category: 'us-tech',
    price: 352.89,
    currency: '$',
    change24h: -1.25,
    changeAmount: -4.46,
    high24h: 359.00,
    low24h: 348.50,
    sparkline: [360, 358, 356, 354, 351, 353, 352.89],
  },
  {
    id: 'stock-aapl',
    symbol: 'AAPL',
    name: 'Apple Inc',
    category: 'us-tech',
    price: 320.01,
    currency: '$',
    change24h: 0.94,
    changeAmount: 2.98,
    high24h: 322.50,
    low24h: 317.80,
    sparkline: [317, 318, 319, 318.5, 319.2, 319.8, 320.01],
  },
  {
    id: 'stock-msft',
    symbol: 'MSFT',
    name: 'Microsoft',
    category: 'us-tech',
    price: 499.41,
    currency: '$',
    change24h: 1.15,
    changeAmount: 5.68,
    high24h: 502.00,
    low24h: 494.50,
    sparkline: [494, 495.5, 497, 496.5, 498.2, 499.0, 499.41],
  },

  // Crypto (Live Binance Public API integration)
  {
    id: 'crypto-btc',
    symbol: 'BTC',
    name: 'Bitcoin',
    category: 'crypto',
    price: 79250.00,
    currency: '$',
    change24h: -0.85,
    changeAmount: -679.00,
    high24h: 80400,
    low24h: 78500,
    sparkline: [80400, 80100, 79800, 79100, 78800, 79100, 79250],
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

  // Commodities
  {
    id: 'comm-gold',
    symbol: 'GOLD (XAU)',
    name: 'Gold Spot / oz',
    category: 'commodity',
    price: 4437.00,
    currency: '$',
    change24h: 0.45,
    changeAmount: 19.90,
    high24h: 4450.00,
    low24h: 4415.00,
    sparkline: [4415, 4422, 4428, 4425, 4432, 4435, 4437],
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

  // Thai Market (Current actual prices)
  {
    id: 'thai-set',
    symbol: 'SET INDEX',
    name: 'ตลาดหลักทรัพย์ฯ',
    category: 'thai',
    price: 1462.40,
    currency: 'THB',
    change24h: 0.52,
    changeAmount: 7.55,
    high24h: 1468.00,
    low24h: 1456.00,
    sparkline: [1456, 1459, 1461, 1460, 1463, 1461, 1462.4],
  },
  {
    id: 'thai-delta',
    symbol: 'DELTA',
    name: 'Delta Electronics',
    category: 'thai',
    price: 248.00,
    currency: '฿',
    change24h: 1.64,
    changeAmount: 4.00,
    high24h: 252.00,
    low24h: 244.00,
    sparkline: [244, 245, 246, 245.5, 247, 247.5, 248],
  },
  {
    id: 'thai-ptt',
    symbol: 'PTT',
    name: 'ปตท.',
    category: 'thai',
    price: 41.50,
    currency: '฿',
    change24h: -0.60,
    changeAmount: -0.25,
    high24h: 42.00,
    low24h: 41.25,
    sparkline: [42.0, 41.75, 41.5, 41.5, 41.25, 41.5, 41.5],
  },
  {
    id: 'thai-cpall',
    symbol: 'CPALL',
    name: 'ซีพี ออลล์',
    category: 'thai',
    price: 46.00,
    currency: '฿',
    change24h: 0.55,
    changeAmount: 0.25,
    high24h: 46.50,
    low24h: 45.75,
    sparkline: [45.75, 45.75, 46.0, 45.8, 46.25, 46.0, 46.0],
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
 * Attempts to fetch live prices for crypto from Binance Public API
 */
export async function fetchLiveCryptoUpdates(tickers: TickerItem[]): Promise<TickerItem[]> {
  try {
    const res = await fetch('https://api.binance.com/api/v3/ticker/24hr', {
      signal: AbortSignal.timeout(3500)
    });
    if (!res.ok) return tickers;
    const data = await res.json();
    const map = new Map<string, { price: number; change: number; high: number; low: number }>();
    
    for (const item of data) {
      map.set(item.symbol, {
        price: parseFloat(item.lastPrice),
        change: parseFloat(item.priceChangePercent),
        high: parseFloat(item.highPrice),
        low: parseFloat(item.lowPrice),
      });
    }

    return tickers.map((t) => {
      let binancePair = '';
      if (t.symbol === 'BTC' || t.symbol === 'BTC/USDT') binancePair = 'BTCUSDT';
      else if (t.symbol === 'ETH' || t.symbol === 'ETH/USDT') binancePair = 'ETHUSDT';
      else if (t.symbol === 'SOL' || t.symbol === 'SOL/USDT') binancePair = 'SOLUSDT';

      if (binancePair && map.has(binancePair)) {
        const live = map.get(binancePair)!;
        const oldLast = t.sparkline[t.sparkline.length - 1];
        const newSparkline = [...t.sparkline.slice(1), live.price];
        return {
          ...t,
          price: live.price,
          change24h: live.change,
          changeAmount: parseFloat(((live.price * live.change) / 100).toFixed(2)),
          high24h: live.high,
          low24h: live.low,
          sparkline: oldLast !== live.price ? newSparkline : t.sparkline
        };
      }
      return t;
    });
  } catch (err) {
    return tickers;
  }
}
