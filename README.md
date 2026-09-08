# MorningPulse AI 🍵📈 - Tea Time Morning Intelligence & Stock Dashboard

> **Tea Time Morning Intelligence & Stock Dashboard** สรุปภาพรวมตลาดประจำวันแบบสั้นกระชับ สบายตา อ่านจบใน 45 วินาที พร้อมจิบชายามเช้า 🍵🌿

[![Live Website](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-2e6b45?style=for-the-badge&logo=github)](https://thagoose3.github.io/morning-pulse-ai/)
[![Theme](https://img.shields.io/badge/Theme-Tea%20Time%20%28Matcha%20%26%20Brown%29-4a3729?style=for-the-badge)](https://thagoose3.github.io/morning-pulse-ai/)
[![Data Source](https://img.shields.io/badge/Data-Yahoo%20Finance%20Live-8a5d2c?style=for-the-badge)](https://finance.yahoo.com/)
[![License](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)](#)

---

## 🌐 ลิงก์เข้าใช้งานจริง (Live Demo)

สามารถเปิดเข้าใช้งานระบบผ่านคอมพิวเตอร์ แท็บเล็ต หรือสมาร์ตโฟนได้ทันทีที่:  
👉 **[https://thagoose3.github.io/morning-pulse-ai/](https://thagoose3.github.io/morning-pulse-ai/)**

---

## 🌟 ฟีเจอร์หลัก (Key Features)

1. **Morning Intelligence Digest (สรุปภาพรวม 45 วินาที) 🍵**:
   - สรุปสถานการณ์ตลาดรอบเช้า กระชับ เข้าใจง่าย ไม่รกตา
   - **Market Sentiment Gauge**: สัญญาณตลาดรวม `🟢 ตลาดสดใส (Bullish)` / `🔴 ชะลอตัว (Bearish)` / `🟡 ทรงตัว (Neutral)`
   - **4 Bullet Executive Summary**: คลิกที่แต่ละข้อเพื่อเปิดหน้าต่างอ่านบทวิเคราะห์ฉบับเต็ม พร้อมปุ่มลิงก์ตรงไปยังแหล่งข่าวบน Yahoo Finance / Reuters / Bloomberg
   - **Key Catalysts**: 3 ปัจจัยหลักที่ขับเคลื่อนตลาดวันนี้ (Tech, Crypto, Gold, Thai Market)
   - **Audio Reader 🎙️**: ปุ่มฟังเสียงบรรยายสรุปข่าวเช้าอัตโนมัติด้วย Web Speech API

2. **Live Yahoo Finance Real-Time Quotes 📈**:
   - ดึงราคาตลาดโลกสดตรงจาก **Yahoo Finance API** (NVDA, TSLA, AAPL, MSFT, BTC, ETH, SOL, Gold, DELTA, PTT, CPALL, SET Index)
   - แสดงราคาล่าสุด, % การเปลี่ยนแปลง (24h Change) และกราฟเส้นโมเมนตัม (Sparklines)
   - ข้อมูลแม่นยำตรงตามตลาดหุ้นสหรัฐฯ และตลาดหลักทรัพย์แห่งประเทศไทย

3. **AI Trend Forecast & แนวรับ-แนวต้านรายตัว 🎯**:
   - ทุกการ์ดหุ้นมีระบบคาดการณ์ทิศทาง:
     - `🟢 มีโอกาสขึ้นต่อ (Bullish)`
     - `🔴 ระวังพักฐานระยะสั้น (Pullback)`
     - `🟡 ทรงตัวสะสมกำลัง (Consolidation)`
   - สรุปเหตุผลเชิงลึกจากข่าวตลาดล่าสุด พร้อมระบุระดับ **แนวรับ (Support)** และ **แนวต้าน (Resistance)**
   - คลิกการ์ดเพื่อเปิดดูบทวิเคราะห์และกดไปอ่านข่าวจริงบน Yahoo Finance ได้ทันที

4. **Smart Auto-suggest Search (ค้นหาหุ้นอัจฉริยะ) 🔍**:
   - ในหน้าต่างเพิ่มหุ้น (+ เพิ่มหุ้น) เมื่อพิมพ์ชื่อย่อ เช่น `PLTR`, `NVDA`, `DELTA` จะมี Dropdown แนะนำจากฐานข้อมูล Yahoo Finance โผล่ขึ้นมาทันที
   - คลิกเลือกเพื่อดึงราคาสดและประมวลผล AI Forecast ให้อัตโนมัติในคลิกเดียว

5. **Tea Time Aesthetic Theme 🌿**:
   - ดีไซน์สบายตาด้วยโทน **สีน้ำตาลอบอุ่น (Tea Brown)**, **สีเขียวใบชา (Matcha Green)** และ **สีขาวนวล (Porcelain Paper White)**
   - ลดแสงสะท้อนของหน้าจอ ไม่ล้าสายตา เหมาะสำหรับเปิดอ่านรับเช้าวันใหม่อย่างสดใส

6. **Automated Daily Sync & Deployment (GitHub Actions Cron) ⏰**:
   - เวิร์กโฟลว์ `.github/workflows/daily-sync.yml` ตื่นมารันอัตโนมัติทุกเช้าเวลา **06:30 น. (เวลาไทย)**
   - ดึงข้อมูลราคาและสังเคราะห์ Morning Briefing ใหม่ จากนั้น Build และ Deploy ขึ้น GitHub Pages ให้อัตโนมัติ

---

## 💻 การรันบนเครื่อง Local สำหรับนักพัฒนา

### 1. โคลนโปรเจกต์
```bash
git clone https://github.com/Thagoose3/morning-pulse-ai.git
cd morning-pulse-ai
```

### 2. ติดตั้ง Dependencies
```bash
npm install
```

### 3. รัน Development Server
```bash
npm run dev
```
เปิดเบราว์เซอร์เข้าไปที่: `http://localhost:3000`

### 4. รันสคริปต์ทดสอบการดึงข้อมูลสด
```bash
npm run generate-briefing
```

### 5. Build สำหรับ Production
```bash
npm run build
```

---

## 📦 โครงสร้างโปรเจกต์ (Project Structure)

```
morning-pulse-ai/
├── .github/
│   └── workflows/
│       └── daily-sync.yml        # GitHub Actions Cron รันทุกเช้า 06:30 น.
├── public/
│   └── data/
│       └── daily_briefing.json   # Snapshot ข้อมูลสรุปประจำวัน
├── scripts/
│   └── generate-briefing.js      # สคริปต์ดึงราคา Yahoo Finance และประมวลผลข่าว
├── src/
│   ├── components/
│   │   ├── AddTickerModal.tsx    # ป๊อปอัปเพิ่ม Ticker พร้อม Yahoo Auto-suggest
│   │   ├── ArticleDetailModal.tsx# หน้าต่างอ่านบทวิเคราะห์ข่าวฉบับเต็ม
│   │   ├── Footer.tsx            # ส่วนท้าย Terminal & Status
│   │   ├── Header.tsx            # แถบเมนูด้านบน วันที่ และปุ่มเสียง
│   │   ├── MorningBriefing.tsx   # การ์ดสรุป 45 วินาที + Catalysts
│   │   ├── StockForecastModal.tsx# หน้ารายละเอียดคาดการณ์แนวรับ-แนวต้าน
│   │   ├── TickerMarquee.tsx     # แถบวิ่งราคาหุ้นด้านบนสุด
│   │   └── WatchlistGrid.tsx     # การ์ด Watchlist + AI Forecasts
│   ├── services/
│   │   ├── aiBriefingService.ts  # วิเคราะห์ Sentiment และข้อมูลข่าว
│   │   ├── marketData.ts         # บริการดึงข้อมูล Yahoo Finance API & Search
│   │   └── speechService.ts      # ระบบเสียงบรรยาย Text-to-Speech
│   ├── types/
│   │   └── index.ts              # Data Types & Interfaces
│   ├── App.tsx                   # หน้าหลัก Dashboard
│   ├── index.css                 # สไตล์ Tea Time Theme
│   └── main.tsx                  # React Entry Point
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 📄 License
โปรเจกต์นี้เปิดให้ใช้งานและพัฒนาต่อยอดได้ตามเงื่อนไขของ [MIT License](LICENSE)
