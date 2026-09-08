import { TickerItem } from '../types';

const STORAGE_KEY = 'morning_pulse_watchlist_v1';

export const INITIAL_TICKERS: TickerItem[] = [
  // Crypto
  {
    id: 'crypto-btc',
    symbol: 'BTC/USDT',
    name: 'Bitcoin',
    category: 'crypto',
    price: 89450.00,
    currency: '$',
    change24h: 3.84,
    changeAmount: 3307.00,
    high24h: 90200,
    low24h: 86100,
    sparkline: [86100, 86800, 87400, 86900, 88200, 89100, 89450],
  },
  {
    id: 'crypto-eth',
    symbol: 'ETH/USDT',
    name: 'Ethereum',
    category: 'crypto',
    price: 3380.50,
    currency: '$',
    change24h: 2.15,
    changeAmount: 71.15,
    high24h: 3420,
    low24h: 3300,
    sparkline: [3300, 3320, 3360, 3340, 3350, 3375, 3380],
  },
  {
    id: 'crypto-sol',
    symbol: 'SOL/USDT',
    name: 'Solana',
    category: 'crypto',
    price: 198.40,
    currency: '$',
    change24h: 5.62,
    changeAmount: 10.55,
    high24h: 202,
    low24h: 187,
    sparkline: [187, 189, 192, 190, 194, 197, 198.4],
  },

  // US Tech Giants
  {
    id: 'stock-nvda',
    symbol: 'NVDA',
    name: 'NVIDIA Corp',
    category: 'us-tech',
    price: 138.25,
    currency: '$',
    change24h: 4.12,
    changeAmount: 5.47,
    high24h: 139.80,
    low24h: 133.50,
    sparkline: [133.5, 134.8, 136.2, 135.9, 137.4, 138.0, 138.25],
  },
  {
    id: 'stock-tsla',
    symbol: 'TSLA',
    name: 'Tesla Inc',
    category: 'us-tech',
    price: 248.60,
    currency: '$',
    change24h: -1.45,
    changeAmount: -3.66,
    high24h: 254.00,
    low24h: 246.20,
    sparkline: [253.5, 252.0, 250.8, 251.2, 249.5, 247.8, 248.6],
  },
  {
    id: 'stock-aapl',
    symbol: 'AAPL',
    name: 'Apple Inc',
    category: 'us-tech',
    price: 232.10,
    currency: '$',
    change24h: 0.88,
    changeAmount: 2.03,
    high24h: 233.50,
    low24h: 230.10,
    sparkline: [230.1, 230.8, 231.5, 231.2, 231.9, 232.0, 232.1],
  },
  {
    id: 'stock-msft',
    symbol: 'MSFT',
    name: 'Microsoft',
    category: 'us-tech',
    price: 442.80,
    currency: '$',
    change24h: 1.25,
    changeAmount: 5.46,
    high24h: 445.00,
    low24h: 438.00,
    sparkline: [438, 439.5, 441, 440.2, 441.8, 442.5, 442.8],
  },

  // Commodities & Macro
  {
    id: 'comm-gold',
    symbol: 'XAU/USD',
    name: 'Gold Spot',
    category: 'commodity',
    price: 2742.80,
    currency: '$',
    change24h: 0.65,
    changeAmount: 17.70,
    high24h: 2750.00,
    low24h: 2728.00,
    sparkline: [2728, 2732, 2735, 2738, 2736, 2740, 2742.8],
  },
  {
    id: 'comm-brent',
    symbol: 'BRENT',
    name: 'Crude Oil',
    category: 'commodity',
    price: 74.35,
    currency: '$',
    change24h: -0.92,
    changeAmount: -0.69,
    high24h: 75.80,
    low24h: 73.90,
    sparkline: [75.8, 75.2, 74.9, 75.1, 74.6, 74.1, 74.35],
  },

  // Thai Market
  {
    id: 'thai-set',
    symbol: 'SET INDEX',
    name: 'Stock Exch. Thailand',
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
    symbol: 'DELTA.BK',
    name: 'Delta Electronics TH',
    category: 'thai',
    price: 154.50,
    currency: 'THB',
    change24h: 2.32,
    changeAmount: 3.50,
    high24h: 156.00,
    low24h: 151.00,
    sparkline: [151, 152, 153.5, 152.5, 154, 153.8, 154.5],
  },
  {
    id: 'thai-ptt',
    symbol: 'PTT.BK',
    name: 'PTT Public Co',
    category: 'thai',
    price: 32.25,
    currency: 'THB',
    change24h: -0.77,
    changeAmount: -0.25,
    high24h: 32.75,
    low24h: 32.00,
    sparkline: [32.75, 32.5, 32.5, 32.25, 32.0, 32.25, 32.25],
  },
  {
    id: 'thai-cpall',
    symbol: 'CPALL.BK',
    name: 'CP All PCL',
    category: 'thai',
    price: 64.00,
    currency: 'THB',
    change24h: 1.19,
    changeAmount: 0.75,
    high24h: 64.50,
    low24h: 63.25,
    sparkline: [63.25, 63.5, 63.75, 63.5, 64.0, 63.75, 64.0],
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
      signal: AbortSignal.timeout(4000)
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
      if (t.symbol === 'BTC/USDT' || t.symbol === 'BTC') binancePair = 'BTCUSDT';
      else if (t.symbol === 'ETH/USDT' || t.symbol === 'ETH') binancePair = 'ETHUSDT';
      else if (t.symbol === 'SOL/USDT' || t.symbol === 'SOL') binancePair = 'SOLUSDT';

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
    // If offline or blocked by CORS, gracefully keep current tickers
    return tickers;
  }
}
