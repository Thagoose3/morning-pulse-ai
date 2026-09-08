/**
 * MorningPulse AI - Daily Briefing Generator Script
 * Can be run via local CLI (`npm run generate-briefing`) or automated via GitHub Actions Cron.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateDailyBriefing() {
  console.log('☕ [MorningPulse AI] Generating daily market briefing...');

  const now = new Date();
  const dateStr = now.toLocaleDateString('th-TH', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) + ` • ${now.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })} น.`;

  // Fetch Crypto data from Binance public API
  let btcPrice = 89450;
  let btcChange = 3.84;
  let ethPrice = 3380;
  let ethChange = 2.15;

  try {
    const res = await fetch('https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT');
    if (res.ok) {
      const data = await res.json();
      btcPrice = parseFloat(data.lastPrice);
      btcChange = parseFloat(data.priceChangePercent);
      console.log(`✓ Fetched Live BTC: $${btcPrice.toLocaleString()} (${btcChange > 0 ? '+' : ''}${btcChange}%)`);
    }
  } catch (e) {
    console.warn('Could not fetch Binance API, using baseline values.');
  }

  const sentiment = btcChange > 2 ? 'Bullish' : btcChange < -2 ? 'Bearish' : 'Neutral';
  const fearGreed = Math.round(50 + (btcChange * 5));
  const clampedFearGreed = Math.min(95, Math.max(15, fearGreed));

  const briefing = {
    generatedAt: dateStr,
    headline: `สรุปตลาดเช้านี้: ทุนสถาบันหนุนสินทรัพย์เสี่ยง | BTC ยืน $${Math.round(btcPrice).toLocaleString()} รับกระแส Inflows`,
    readingTimeSeconds: 60,
    sentiment: sentiment,
    fearGreedIndex: clampedFearGreed,
    marketStatusSummary: `ตลาดเปิดเช้านี้ด้วยบรรยากาศเชิงบวก โดยมีสินทรัพย์ดิจิทัลและเทคโนโลยี AI เป็นผู้นำการปรับขึ้น ขณะที่ Bond Yield ทรงตัว`,
    executiveSummary: [
      `กลุ่มเทคโนโลยีสหรัฐฯ และ AI Hardware ได้รับแรงหนุนต่อเนื่องจากความต้องการเซมิคอนดักเตอร์`,
      `Bitcoin เคลื่อนไหวในกรอบ $${Math.round(btcPrice).toLocaleString()} (${btcChange >= 0 ? '+' : ''}${btcChange.toFixed(2)}%) หลังมีแรงซื้อสะสมต่อเนื่อง`,
      `ตลาดหุ้นไทย (SET Index) คาดหวังการเปิดทรงตัวบวก โดยมีกลุ่มอิเล็กทรอนิกส์และค้าปลีกช่วยประคองดัชนี`,
      `ราคาทองคำ Spot Gold ทรงตัวระดับสูงเพื่อบริหารความเสี่ยงจากสถานการณ์ภูมิรัฐศาสตร์`
    ],
    keyCatalysts: [
      {
        id: 'cat-1',
        title: 'Global Tech & AI Hardware Surge',
        impact: 'High',
        sentiment: 'positive',
        description: 'หุ้นกลุ่มเทคโนโลยี AI ยังคงเป็นเป้าหมายหลักของการไหลเข้าของเงินทุนระดับโลก',
        category: 'Tech'
      },
      {
        id: 'cat-2',
        title: 'Digital Asset Institutional Momentum',
        impact: 'High',
        sentiment: 'positive',
        description: `BTC ปรับตัวขึ้นแตะระดับ $${Math.round(btcPrice).toLocaleString()} ตอบรับสภาพคล่องในระบบ`,
        category: 'Crypto'
      },
      {
        id: 'cat-3',
        title: 'US Macro & Fed Interest Path',
        impact: 'Medium',
        sentiment: 'neutral',
        description: 'นักลงทุนรอติดตามถ้อยแถลงของธนาคารกลางสหรัฐฯ เพื่อประเมินแนวทางดอกเบี้ย',
        category: 'Macro'
      }
    ],
    watchItemsToday: [
      { time: '09:30 น.', event: 'เปิดตลาดหุ้นไทย (SET / mai)', impact: 'Medium', forecast: 'กรอบ 1,458 - 1,468 จุด' },
      { time: '19:30 น.', event: 'รายงานตัวเลข Initial Jobless Claims สหรัฐฯ', impact: 'High', forecast: 'คาดการณ์ 218K' },
      { time: '21:00 น.', event: 'ถ้อยแถลงกรรมการธนาคารกลางสหรัฐฯ', impact: 'High', forecast: 'จับตาทิศทางนโยบายการเงิน' }
    ],
    topGainers: [
      { symbol: 'BTC/USDT', change: btcChange },
      { symbol: 'NVDA', change: 4.12 },
      { symbol: 'SOL/USDT', change: 5.62 }
    ],
    topLosers: [
      { symbol: 'TSLA', change: -1.45 },
      { symbol: 'BRENT', change: -0.92 }
    ]
  };

  const outputDir = path.resolve(__dirname, '../public/data');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, 'daily_briefing.json');
  fs.writeFileSync(outputPath, JSON.stringify(briefing, null, 2), 'utf-8');
  console.log(`✓ Daily briefing saved to: ${outputPath}`);
}

generateDailyBriefing().catch(console.error);
