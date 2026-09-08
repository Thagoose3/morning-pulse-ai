/**
 * MorningPulse AI - Daily Briefing Generator Script
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
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }) + ` • ${now.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })} น.`;

  // Fetch Live BTC from Binance public API
  let btcPrice = 79250;
  let btcChange = -0.85;

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

  const briefing = {
    generatedAt: dateStr,
    headline: 'ตลาดสหรัฐฯ สดใส หุ้นชิป AI หนุนบรรยากาศ | Bitcoin ทรงตัวแถว $79k',
    readingTimeSeconds: 45,
    sentiment: 'Bullish',
    fearGreedIndex: 68,
    marketStatusSummary: 'บรรยากาศลงทุนยามเช้าอยู่ในเกณฑ์ดี หุ้นเทคโนโลยีสหรัฐฯ นำโดย NVIDIA ($229) และ MSFT ขยับบวก ขณะที่สินทรัพย์ดิจิทัลแกว่งในกรอบแคบ',
    executiveSummary: [
      'กลุ่ม AI Semiconductor สหรัฐฯ ขยับขึ้นต่อเนื่อง นำโดย NVDA ($229.49) ตอบรับดีมานด์ศูนย์ข้อมูล',
      'บิตคอยน์ (BTC) แกว่งตัวในกรอบ $79,000 - $79,800 ภาพรวมยังสะสมกำลัง',
      'ตลาดหุ้นไทย (SET) มีโอกาสเปิดทรงตัวบวกในกรอบ 1,460 - 1,468 จุด โดยมี DELTA (248 บ.) และกลุ่มค้าปลีกหนุน',
      'ราคาทองคำ Spot Gold อยู่ที่ระดับสูง $4,437/oz รับอานิสงส์ความต้องการกระจายความเสี่ยง'
    ],
    keyCatalysts: [
      {
        id: 'cat-1',
        title: 'ความต้องการชิป AI ยังแข็งแกร่ง',
        impact: 'High',
        sentiment: 'positive',
        description: 'หุ้นกลุ่มชิปเทคโนโลยีโลกยังเป็นผู้นำการเคลื่อนไหวของตลาดสหรัฐฯ',
        category: 'Tech'
      },
      {
        id: 'cat-2',
        title: 'ทองคำยืนระดับสูงเพื่อกระจายความเสี่ยง',
        impact: 'Medium',
        sentiment: 'positive',
        description: 'นักลงทุนถือทองคำและสินทรัพย์ปลอดภัยต่อเนื่อง',
        category: 'Gold'
      },
      {
        id: 'cat-3',
        title: 'ตลาดหุ้นไทยจับตาทิศทาง Fund Flow',
        impact: 'Medium',
        sentiment: 'neutral',
        description: 'เม็ดเงินสถาบันและต่างชาติยังทยอยสะสมหุ้นกลุ่มใหญ่',
        category: 'Thai'
      }
    ],
    watchItemsToday: [
      { time: '10:00 น.', event: 'เปิดตลาดหุ้นไทย (SET)', impact: 'Medium', forecast: 'แนวต้าน 1,468 จุด' },
      { time: '19:30 น.', event: 'ตัวเลขการจ้างงานสหรัฐฯ', impact: 'High', forecast: 'คาดตัวเลขทรงตัว' }
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

  const outputDir = path.resolve(__dirname, '../public/data');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, 'daily_briefing.json');
  fs.writeFileSync(outputPath, JSON.stringify(briefing, null, 2), 'utf-8');
  console.log(`✓ Daily briefing saved to: ${outputPath}`);
}

generateDailyBriefing().catch(console.error);
