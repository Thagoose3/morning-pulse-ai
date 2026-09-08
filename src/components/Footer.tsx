import React from 'react';
import { Terminal, GitBranch, Cpu } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-[#070a10] py-8 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 rounded bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-xs">
              ☕
            </div>
            <div>
              <span className="font-mono font-bold text-slate-200">MorningPulse AI</span>
              <span className="text-slate-400 ml-2">Executive Morning Intelligence & Stock Dashboard</span>
            </div>
          </div>

          <div className="flex items-center gap-6 font-mono text-[11px]">
            <div className="flex items-center gap-1.5 text-slate-400">
              <GitBranch className="w-3.5 h-3.5 text-slate-400" />
              <span>Cron Schedule: <span className="text-emerald-400">06:30 AM Daily</span></span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <Cpu className="w-3.5 h-3.5 text-amber-400" />
              <span>Engine: <span className="text-slate-200">Vite + React</span></span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <Terminal className="w-3.5 h-3.5 text-blue-400" />
              <span>Mode: <span className="text-emerald-400">Local Verified</span></span>
            </div>
          </div>

        </div>
        
        <div className="mt-6 pt-4 border-t border-slate-800/50 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400 font-mono">
          <p>© {new Date().getFullYear()} MorningPulse AI. ข้อมูลและการวิเคราะห์เพื่อการศึกษาและติดตามตลาดเท่านั้น ไม่ใช่คำแนะนำการลงทุน</p>
          <p className="text-amber-400/80 font-semibold">Morning Coffee Terminal 📈☕</p>
        </div>
      </div>
    </footer>
  );
};
