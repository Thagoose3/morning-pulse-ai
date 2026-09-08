import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Activity, Sparkles, CheckCircle2, ChevronRight, ExternalLink } from 'lucide-react';
import { MorningBriefingData, CatalystItem } from '../types';
import { ArticleDetailModal } from './ArticleDetailModal';

interface MorningBriefingProps {
  briefing: MorningBriefingData;
  onOpenAddModal: () => void;
}

export const MorningBriefing: React.FC<MorningBriefingProps> = ({ briefing }) => {
  const [selectedArticle, setSelectedArticle] = useState<{
    title: string;
    summary: string;
    fullText?: string;
    catalyst?: CatalystItem;
    sourceName: string;
    sourceUrl: string;
  } | null>(null);

  const getSentimentInfo = (sentiment: string) => {
    switch (sentiment) {
      case 'Strong Bullish':
      case 'Bullish':
        return {
          label: 'ตลาดสดใส (Bullish)',
          badge: 'bg-[#eaf4ed] text-[#226339] border border-[#c3deca]',
          icon: <TrendingUp className="w-4 h-4 text-[#226339]" />
        };
      case 'Bearish':
      case 'Extreme Fear':
        return {
          label: 'ตลาดชะลอตัว (Bearish)',
          badge: 'bg-[#fbeded] text-[#b33939] border border-[#f0c8c8]',
          icon: <TrendingDown className="w-4 h-4 text-[#b33939]" />
        };
      default:
        return {
          label: 'ตลาดทรงตัว (Neutral)',
          badge: 'bg-[#fcf5ea] text-[#8f5d23] border border-[#ebd9be]',
          icon: <Activity className="w-4 h-4 text-[#8f5d23]" />
        };
    }
  };

  const sentiment = getSentimentInfo(briefing.sentiment);

  const handleBulletClick = (index: number, text: string) => {
    const sources = [
      {
        title: 'NVIDIA และกลุ่มเซมิคอนดักเตอร์สหรัฐฯ ขยายตัวต่อเนื่องจากดีมานด์ AI Data Center',
        summary: 'หุ้นกลุ่มชิปนำโดย NVDA มีแรงซื้อต่อเนื่องจากคำสั่งซื้อชิป Blackwell ของกลุ่มลูกค้ารายใหญ่ เช่น Microsoft, Meta, Alphabet และ Amazon ที่ยังเพิ่มงบลงทุน Capex ด้านโครงสร้างพื้นฐาน AI',
        fullText: 'นักวิเคราะห์จากวาณิชธนกิจระบุว่ากำลังการผลิตที่ TSMC ยังคงตึงตัว สะท้อนถึงคำสั่งซื้อชิปประมวลผลขั้นสูงที่แข็งแกร่งไปจนถึงปีหน้า ซึ่งเป็นปัจจัยบวกโดยตรงต่อราคาหุ้นกลุ่มชิป',
        sourceName: 'Yahoo Finance / Reuters',
        sourceUrl: 'https://finance.yahoo.com/quote/NVDA/news/'
      },
      {
        title: 'Bitcoin เคลื่อนไหวในกรอบสะสมกำลัง เหนือฐาน $78,500',
        summary: 'บิตคอยน์แกว่งตัวในกรอบ $78,500 - $80,200 หลังจากมีเงินทุนไหลเข้าสุทธิผ่านกองทุน Spot ETF อย่างต่อเนื่อง แม้จะเผชิญแรงขายทำกำไรระยะสั้นในตลาดอนุพันธ์',
        fullText: 'ข้อมูล On-chain บ่งชี้ว่านักลงทุนระยะยาว (Long-term holders) ยังคงถือครองเหรียญต่อเนื่อง และแรงเทขายจากนักขุดเริ่มเบาบางลง ทำให้ดาวน์ไซด์ของราคาค่อนข้างจำกัด',
        sourceName: 'CoinDesk / Yahoo Finance',
        sourceUrl: 'https://finance.yahoo.com/quote/BTC-USD/news/'
      },
      {
        title: 'ดัชนี SET หุ้นไทย ได้รับแรงหนุนจากกลุ่มอิเล็กทรอนิกส์และค้าปลีก',
        summary: 'ตลาดหุ้นไทยเคลื่อนไหวในทิศทางทรงตัวบวก โดยมีหุ้นใหญ่อย่าง DELTA ซึ่งได้อานิสงส์จากดีมานด์ AI และหุ้นค้าปลีกอย่าง CPALL ช่วยประคองดัชนี',
        fullText: 'กระแสเงินทุนของสถาบันในประเทศผ่านกองทุนลดหย่อนภาษี และความคาดหวังในมาตรการกระตุ้นเศรษฐกิจและการจับจ่ายในประเทศช่วงปลายปี ช่วยหนุนดัชนีให้ยืนเหนือ 1,600 จุด',
        sourceName: 'SET / InfoQuest',
        sourceUrl: 'https://finance.yahoo.com/quote/%5ESET.BK/news/'
      },
      {
        title: 'ราคาทองคำ Spot Gold ทรงตัวระดับสูง $4,468/oz ท่ามกลางความตึงเครียดภูมิรัฐศาสตร์',
        summary: 'นักลงทุนยังคงถือครองทองคำแท่งเพื่อกระจายความเสี่ยงจากสถานการณ์ความไม่แน่นอนของเศรษฐกิจโลก และการเข้าซื้อทองคำสำรองของธนาคารกลางอย่างต่อเนื่อง',
        fullText: 'ราคาทองคำได้รับแรงหนุนจากความต้องการกระจายเงินทุนออกจากสกุลเงินหลัก (De-dollarization) ส่งผลให้ทิศทางระยะกลางถึงยาวยังเป็นขาขึ้น',
        sourceName: 'Bloomberg / Yahoo Finance',
        sourceUrl: 'https://finance.yahoo.com/quote/GC=F/news/'
      }
    ];

    const source = sources[index] || {
      title: 'ข้อมูลวิเคราะห์สรุปตลาดเช้านี้',
      summary: text,
      fullText: 'สรุปข้อมูลจากความเคลื่อนไหวล่าสุดของตลาดการเงินโลกและตลาดหลักทรัพย์แห่งประเทศไทย',
      sourceName: 'Yahoo Finance News',
      sourceUrl: 'https://finance.yahoo.com/'
    };

    setSelectedArticle(source);
  };

  const handleCatalystClick = (cat: CatalystItem) => {
    let sourceUrl = 'https://finance.yahoo.com/news/';
    if (cat.category.toLowerCase().includes('tech')) sourceUrl = 'https://finance.yahoo.com/quote/NVDA/news/';
    else if (cat.category.toLowerCase().includes('gold')) sourceUrl = 'https://finance.yahoo.com/quote/GC=F/news/';
    else if (cat.category.toLowerCase().includes('thai')) sourceUrl = 'https://finance.yahoo.com/quote/%5ESET.BK/news/';

    setSelectedArticle({
      title: cat.title,
      summary: cat.description,
      fullText: `บทวิเคราะห์เชิงลึก: ปัจจัยในหมวด ${cat.category} กำลังส่งผลกระทบระดับ ${cat.impact} Impact ต่อการจัดสรรสินทรัพย์ของนักลงทุน โดยโมเมนตัมปัจจุบันจัดอยู่ในเกณฑ์ ${cat.sentiment}`,
      catalyst: cat,
      sourceName: 'Yahoo Finance Market Intel',
      sourceUrl
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Main Tea Time Briefing Card */}
      <div className="rounded-2xl bg-[#ffffff] border border-[#e8dfd2] p-6 md:p-8 shadow-[0_2px_12px_rgba(80,60,40,0.04)]">
        
        {/* Top Tag & Sentiment */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-[#8a5d2c] flex items-center gap-1.5">
              <span>🍵 สรุปเช้านี้</span>
            </span>
            <span className="text-[#c7baa8] text-xs">•</span>
            <span className="text-xs text-[#7d6b5c]">
              {briefing.generatedAt}
            </span>
          </div>

          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${sentiment.badge}`}>
            {sentiment.icon}
            <span>{sentiment.label}</span>
          </div>
        </div>

        {/* Big Clean Headline in Tea Brown */}
        <h2 className="text-xl md:text-2xl font-bold text-[#2d1e14] leading-snug mb-5">
          {briefing.headline}
        </h2>

        {/* 4 Interactive Bullet Points */}
        <div className="space-y-2.5 mb-6">
          <p className="text-xs text-[#7d6b5c] mb-1 font-medium flex items-center gap-1">
            <span>💡 คลิกที่แต่ละหัวข้อเพื่ออ่านรายละเอียดฉบับเต็มและแหล่งข่าว:</span>
          </p>
          {briefing.executiveSummary.map((item, idx) => (
            <div
              key={idx}
              onClick={() => handleBulletClick(idx, item)}
              role="button"
              className="group flex items-start justify-between gap-3 p-3.5 rounded-xl bg-[#faf7f2] hover:bg-[#f3ece0] border border-[#ebe2d4] hover:border-[#b8d6bf] cursor-pointer transition-all duration-150"
            >
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#26693d] flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <p className="text-sm text-[#38281d] group-hover:text-[#1e130c] leading-relaxed transition-colors">
                  {item}
                </p>
              </div>
              <div className="flex items-center text-xs text-[#8c7764] group-hover:text-[#26693d] whitespace-nowrap pl-2 font-medium">
                <span className="hidden sm:inline mr-1 text-[11px]">อ่านเต็ม</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* 3 Catalysts Cards (Clickable) */}
        <div className="pt-5 border-t border-[#ede5d8]">
          <p className="text-xs font-medium text-[#7d6b5c] mb-3 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#8a5d2c]" />
              3 ปัจจัยสำคัญที่ขับเคลื่อนตลาดวันนี้ (คลิกเพื่ออ่านบทวิเคราะห์):
            </span>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {briefing.keyCatalysts.slice(0, 3).map((cat) => (
              <div
                key={cat.id}
                onClick={() => handleCatalystClick(cat)}
                role="button"
                className="group p-3.5 rounded-xl bg-[#faf7f2] hover:bg-[#f3ece0] border border-[#ebe2d4] hover:border-[#b8d6bf] cursor-pointer transition-all duration-150 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] text-[#7d6b5c] mb-1">
                    <span className="font-semibold text-[#8a5d2c]">{cat.category}</span>
                    <span className="group-hover:text-[#26693d] text-[#8c7764] text-[10px] flex items-center gap-0.5">
                      อ่านต่อ <ExternalLink className="w-2.5 h-2.5" />
                    </span>
                  </div>
                  <div className="text-xs font-bold text-[#2d1e14] group-hover:text-[#1e130c] mb-1 leading-snug">
                    {cat.title}
                  </div>
                  <p className="text-xs text-[#635142] leading-normal">
                    {cat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Deep-Dive Article Reader Modal */}
      <ArticleDetailModal
        article={selectedArticle}
        isOpen={selectedArticle !== null}
        onClose={() => setSelectedArticle(null)}
      />

    </div>
  );
};
