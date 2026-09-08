# MorningPulse AI 📈☕ - AI Morning Intelligence & Stock Dashboard

> **Executive Morning Intelligence & Stock Dashboard** สรุปภาพรวมตลาดประจำวันแบบสั้นกระชับ อ่านจบใน 60 วินาที พร้อมจิบกาแฟตอนเช้า ☕

![Theme](https://img.shields.io/badge/Theme-Bloomberg%20Terminal%20Fintech-0a0d14?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Stack-React%20%7C%20Vite%20%7C%20TailwindCSS-blue?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)

---

## 🌟 ฟีเจอร์หลัก (Key Features)

1. **Morning AI Briefing Digest ☕**:
   - สรุปภาพรวมตลาดประจำวันแบบสั้นกระชับ อ่านจบใน 60 วินาที
   - วิเคราะห์สาเหตุการขึ้น/ลง (**Key Catalysts**) แยกตามหมวดหมู่ (Tech, Crypto, Macro, Commodities)
   - **Market Sentiment Gauge**: Bullish / Bearish / Neutral พร้อมดัชนี Fear & Greed Index
   - **What to Watch Today**: ไทม์ไลน์และอีเวนต์เศรษฐกิจสำคัญประจำวัน (เช่น ตลาดเปิด, ประกาศตัวเลขเงินเฟ้อ/ดอกเบี้ย)
   - **Coffee Audio Reader 🎙️**: ปุ่มกดฟังเสียงบรรยายสรุปข่าวเช้าอัตโนมัติด้วย Web Speech API

2. **Real-Time Watchlist Tracker 📈**:
   - การ์ดแสดงผลราคาและ % การเคลื่อนไหวของสินทรัพย์หลัก (NVDA, TSLA, AAPL, BTC, ETH, SOL, Gold, SET Index, DELTA, PTT, CPALL)
   - **Interactive SVG Sparkline**: กราฟแท่งมินิแสดงโมเมนตัมราคาย้อนหลัง
   - **Interactive Add/Remove**: สามารถกดปุ่ม `+ Add Ticker` เพื่อเพิ่มหุ้น/คริปโตที่ต้องการ หรือกดลบได้เอง ข้อมูลจะถูกเซฟลงใน LocalStorage
   - ตัวกรองแยกหมวดหมู่ (All, US Tech, Crypto, Commodities, Thai Stocks) พร้อมช่องค้นหาแบบเรียลไทม์

3. **Global Macro Benchmark Grid 🌐**:
   - แผงมอนิเตอร์ดัชนีหลักรอบโลก: S&P 500, NASDAQ 100, Dow Jones, Nikkei 225, SET, US 10Y Yield, Dollar Index (DXY), VIX

4. **Bloomberg Terminal & Modern Dark Fintech UI 💻**:
   - ธีม Deep Onyx และ Slate พร้อมไฟสถานะ Neon Emerald / Rose
   - แถบวิ่ง Ticker Marquee Bar ด้านบนสุดแบบไม่มีสะดุด
   - รองรับการใช้งานเต็มรูปแบบทั้งบนคอมพิวเตอร์และโทรศัพท์มือถือ

5. **Automated Daily Sync & GitHub Actions ⏰**:
   - สคริปต์ `scripts/generate-briefing.js` สำหรับดึงราคาล่าสุดและคำนวณสรุปประจำวัน
   - เวิร์กโฟลว์ GitHub Actions (`.github/workflows/daily-sync.yml`) ตั้งเวลารันอัตโนมัติทุกเช้า 06:30 น. (23:30 UTC) พร้อม Deploy ขึ้น GitHub Pages

---

## 🚀 การติดตั้งและรันบนเครื่อง Local

### ข้อกำหนดเบื้องต้น
- Node.js (v18 ขึ้นไป)
- npm หรือ pnpm

### คำสั่งรัน
```bash
# 1. ติดตั้ง Dependencies
npm install

# 2. รัน Local Development Server
npm run dev

# 3. รันสคริปต์สร้าง Daily Briefing
npm run generate-briefing

# 4. Build สำหรับ Production
npm run build
```

เมื่อรัน `npm run dev` แล้ว สามารถเปิดเว็บเบราว์เซอร์เข้าไปที่:
👉 **`http://localhost:3000`**

---

## 📦 โครงสร้างโปรเจกต์ (Project Structure)

```
morning-pulse-ai/
├── .github/
│   └── workflows/
│       └── daily-sync.yml        # GitHub Actions Cron รันทุกเช้า 06:30 น.
├── public/
│   └── data/
│       └── daily_briefing.json   # ข้อมูลสรุปประจำวันที่สร้างโดยระบบ
├── scripts/
│   └── generate-briefing.js      # สคริปต์ประมวลผลข่าวเช้าและดึงราคา
├── src/
│   ├── components/
│   │   ├── AddTickerModal.tsx    # ป๊อปอัปเพิ่ม Ticker ใหม่
│   │   ├── Footer.tsx            # ส่วนท้าย Terminal
│   │   ├── Header.tsx            # แถบเมนูด้านบน นาฬิกา และปุ่มเสียง
│   │   ├── MacroOverviewCard.tsx # ดัชนี Macro รอบโลก
│   │   ├── MorningBriefing.tsx   # การ์ดสรุป 60 วินาที + Catalysts
│   │   ├── TickerMarquee.tsx     # แถบราคาหุ้นวิ่งแบบ Terminal
│   │   └── WatchlistGrid.tsx     # ตารางการ์ด Watchlist + Sparklines
│   ├── services/
│   │   ├── aiBriefingService.ts  # วิเคราะห์ Sentiment และข้อมูลข่าว
│   │   ├── marketData.ts         # จัดการ Watchlist และดึง API
│   │   └── speechService.ts      # ระบบเสียงบรรยาย Text-to-Speech
│   ├── types/
│   │   └── index.ts              # Data Types & Interfaces
│   ├── App.tsx                   # หน้าหลัก Dashboard
│   ├── index.css                 # สไตล์ Tailwind & Fintech Theme
│   └── main.tsx                  # React Entry Point
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 🚢 การนำขึ้น GitHub & GitHub Pages (เมื่อพร้อม Deploy)

```bash
git init
git add .
git commit -m "feat: initial MorningPulse AI dashboard"
git remote add origin https://github.com/Thagoose3/morning-pulse-ai.git
git branch -M main
git push -u origin main
```
จากนั้นในหน้า Settings ของ GitHub Repository -> **Pages** เลือก Build and deployment เป็น **GitHub Actions** เพื่อให้ระบบอัปเดตและ Deploy อัตโนมัติทุกเช้า!
