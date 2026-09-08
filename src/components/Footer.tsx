import React from 'react';
import { GitBranch, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#e8dfd2] bg-[#ffffff] py-8 text-[#7d6b5c] text-xs">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="h-7 w-7 rounded-full bg-[#f4ece1] border border-[#e2d4c3] flex items-center justify-center text-xs">
              🍵
            </div>
            <div>
              <span className="font-bold text-[#35251b]">MorningPulse AI</span>
              <span className="text-[#8c7764] ml-2">Tea Time Morning Intelligence & Stock Dashboard</span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-[11px]">
            <div className="flex items-center gap-1.5 text-[#7d6b5c]">
              <GitBranch className="w-3.5 h-3.5 text-[#8a5d2c]" />
              <span>Cron Sync: <span className="text-[#26693d] font-semibold">06:30 น. ทุกเช้า</span></span>
            </div>
            <div className="flex items-center gap-1.5 text-[#7d6b5c]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#26693d]" />
              <span>Data Source: <span className="text-[#35251b] font-medium">Yahoo Finance Live</span></span>
            </div>
          </div>

        </div>
        
        <div className="mt-6 pt-4 border-t border-[#ede5d8] flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#8c7764]">
          <p>© {new Date().getFullYear()} MorningPulse AI. ข้อมูลและการวิเคราะห์เพื่อการศึกษาและติดตามตลาดเท่านั้น ไม่ใช่คำแนะนำการลงทุน</p>
          <p className="text-[#8a5d2c] font-semibold">Tea Time Edition 🍵🌿</p>
        </div>
      </div>
    </footer>
  );
};
