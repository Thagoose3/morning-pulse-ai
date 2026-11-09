import React from 'react';
import { GitBranch, CheckCircle2, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 mt-8 border-t border-white/[0.07] bg-black/30 backdrop-blur-sm text-[#9a8a7c] text-xs overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-[#e6b86e] mb-3">Tea Time Edition 🍵</p>
            <p className="font-serif text-2xl sm:text-3xl font-bold text-[#f3ebe0] leading-snug max-w-md">
              จิบชาให้อร่อย แล้วเจอกันพรุ่งนี้เช้า
            </p>
          </div>

          <div className="flex flex-col gap-2.5 text-[12px]">
            <div className="flex items-center gap-2">
              <GitBranch className="w-3.5 h-3.5 text-[#e6b86e]" />
              <span>Cron Sync: <span className="text-[#8fd4a0] font-semibold">06:30 น. ทุกเช้า</span></span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#8fd4a0]" />
              <span>Data Source: <span className="text-[#f3ebe0] font-medium">Yahoo Finance Live</span></span>
            </div>
          </div>
        </div>

        {/* Oversized wordmark */}
        <div
          className="mt-14 select-none font-bold tracking-tighter leading-none text-[16vw] lg:text-[184px] text-transparent bg-clip-text bg-gradient-to-b from-white/[0.10] to-white/[0.01]"
          aria-hidden="true"
        >
          MorningPulse
        </div>

        <div className="mt-6 pt-6 border-t border-white/[0.07] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
          <p>© {new Date().getFullYear()} MorningPulse AI · ข้อมูลและการวิเคราะห์เพื่อการศึกษาและติดตามตลาดเท่านั้น ไม่ใช่คำแนะนำการลงทุน</p>
          <a href="#" className="group inline-flex items-center gap-2 text-[#cbbdab] hover:text-[#f3ebe0] transition-colors">
            กลับขึ้นด้านบน
            <span className="flex items-center justify-center w-7 h-7 rounded-full border border-white/10 group-hover:border-[#8fd4a0]/50 transition-colors">
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
};
