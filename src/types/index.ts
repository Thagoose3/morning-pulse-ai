export type AssetCategory = 'us-tech' | 'crypto' | 'commodity' | 'thai' | 'macro';

export interface TickerItem {
  id: string;
  symbol: string;
  name: string;
  category: AssetCategory;
  price: number;
  currency: string;
  change24h: number; // in percentage, e.g. +3.42
  changeAmount: number; // in absolute currency value
  high24h?: number;
  low24h?: number;
  sparkline: number[]; // 7-10 data points for mini chart
  isCustom?: boolean;
}

export type SentimentType = 'Bullish' | 'Bearish' | 'Neutral' | 'Strong Bullish' | 'Extreme Fear';

export interface CatalystItem {
  id: string;
  title: string;
  impact: 'High' | 'Medium' | 'Low';
  sentiment: 'positive' | 'negative' | 'neutral';
  description: string;
  category: string;
}

export interface WatchItem {
  time: string;
  event: string;
  impact: 'High' | 'Medium' | 'Low';
  forecast?: string;
}

export interface MorningBriefingData {
  generatedAt: string;
  headline: string;
  readingTimeSeconds: number;
  sentiment: SentimentType;
  fearGreedIndex: number; // 0 - 100
  marketStatusSummary: string;
  executiveSummary: string[];
  keyCatalysts: CatalystItem[];
  watchItemsToday: WatchItem[];
  topGainers: { symbol: string; change: number }[];
  topLosers: { symbol: string; change: number }[];
}
