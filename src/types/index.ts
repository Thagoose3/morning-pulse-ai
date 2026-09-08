export type AssetCategory = 'us-tech' | 'crypto' | 'commodity' | 'thai' | 'macro';

export interface StockForecast {
  direction: 'bullish' | 'bearish' | 'neutral';
  signalLabel: string; // e.g. 'มีโอกาสขึ้นต่อ' | 'ระวังพักฐาน' | 'ทรงตัวสะสมกำลัง'
  confidence: number; // e.g. 78%
  reasoning: string; // e.g. 'ได้แรงหนุนจากดีมานด์ชิป AI Blackwell ทะลุเป้า'
  support: string; // แนวรับ
  resistance: string; // แนวต้าน
  keyNews: string;
  sourceUrl: string; // Link to Yahoo Finance
}

export interface TickerItem {
  id: string;
  symbol: string;
  name: string;
  category: AssetCategory;
  price: number;
  currency: string;
  change24h: number;
  changeAmount: number;
  high24h?: number;
  low24h?: number;
  sparkline: number[];
  isCustom?: boolean;
  forecast?: StockForecast;
}

export type SentimentType = 'Bullish' | 'Bearish' | 'Neutral' | 'Strong Bullish' | 'Extreme Fear';

export interface CatalystItem {
  id: string;
  title: string;
  impact: 'High' | 'Medium' | 'Low';
  sentiment: 'positive' | 'negative' | 'neutral';
  description: string;
  category: string;
  fullDetail?: {
    overview: string;
    marketImpact: string;
    outlook: string;
    sourceName: string;
    sourceUrl: string;
  };
}

export interface WatchItem {
  time: string;
  event: string;
  impact: 'High' | 'Medium' | 'Low';
  forecast?: string;
  sourceUrl?: string;
}

export interface ExecutiveSummaryItem {
  id: string;
  title: string;
  summary: string;
  fullText: string;
  sourceName: string;
  sourceUrl: string;
}

export interface MorningBriefingData {
  generatedAt: string;
  headline: string;
  readingTimeSeconds: number;
  sentiment: SentimentType;
  fearGreedIndex: number;
  marketStatusSummary: string;
  executiveSummary: string[];
  detailedArticles?: ExecutiveSummaryItem[];
  keyCatalysts: CatalystItem[];
  watchItemsToday: WatchItem[];
  topGainers: { symbol: string; change: number }[];
  topLosers: { symbol: string; change: number }[];
}
