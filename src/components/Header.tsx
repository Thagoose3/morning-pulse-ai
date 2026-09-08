import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, RefreshCw, PlusCircle, Radio, Clock } from 'lucide-react';
import { MorningSpeechService } from '../services/speechService';
import { MorningBriefingData } from '../types';

interface HeaderProps {
  briefing: MorningBriefingData;
  onRefresh: () => void;
  onOpenAddModal: () => void;
  isRefreshing: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  briefing,
  onRefresh,
  onOpenAddModal,
  isRefreshing
}) => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  useEffect(() => {
    MorningSpeechService.setCallback((speaking) => {
      setIsSpeaking(speaking);
    });

    const updateClock = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      );
      setCurrentDate(
        now.toLocaleDateString('th-TH', {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        })
      );
    };

    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleToggleSpeech = () => {
    if (isSpeaking) {
      MorningSpeechService.stop();
    } else {
      const speechText = `สวัสดีตอนเช้าครับ นี่คือ มอร์นิ่ง พัลส์ เอไอ สรุปภาพรวมตลาดประจำเช้าวันนี้. ${briefing.headline}. อารมณ์ตลาดโดยรวมอยู่ในระดับ ${briefing.sentiment} ดัชนีความโลภและความกลัวอยู่ที่ ${briefing.fearGreedIndex} จุด. สรุปประเด็นสำคัญ: ${briefing.executiveSummary.join('. ')}. ขอให้การลงทุนเช้านี้ราบรื่น จิบกาแฟอย่างมีความสุขครับ`;
      MorningSpeechService.speak(speechText);
    }
  };

  return (
    <header className="border-b border-slate-800/80 bg-[#0b0f19]/90 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-amber-500/20 to-emerald-500/20 border border-amber-500/30 flex items-center justify-center text-xl shadow-inner">
              ☕
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold tracking-tight text-white text-lg font-mono flex items-center gap-1.5">
                  MORNING<span className="text-amber-400">PULSE</span>
                  <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] font-bold px-1.5 py-0.5 rounded tracking-widest uppercase">
                    AI v1.0
                  </span>
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                LIVE MARKET INTELLIGENCE TERMINAL
              </p>
            </div>
          </div>

          {/* Time & Session Badge */}
          <div className="hidden md:flex items-center gap-4 bg-slate-900/90 border border-slate-800 rounded-lg px-3.5 py-1.5 font-mono text-xs">
            <div className="flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{currentDate}</span>
              <span className="text-amber-400 font-semibold">{currentTime} BKK</span>
            </div>
            <div className="w-[1px] h-3.5 bg-slate-700"></div>
            <div className="flex items-center gap-1.5 text-emerald-400 text-[11px] font-medium">
              <Radio className="w-3 h-3 animate-ping" />
              <span>DATA SYNC: ACTIVE</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Audio Digest Button */}
            <button
              onClick={handleToggleSpeech}
              title="ฟังเสียงบรรยายสรุปข่าวเช้า (Web Speech API)"
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200 ${
                isSpeaking
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/60 shadow-[0_0_12px_rgba(245,158,11,0.3)] animate-pulse'
                  : 'bg-slate-900/90 text-slate-300 hover:text-white border-slate-800 hover:border-slate-700'
              }`}
            >
              {isSpeaking ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-amber-400" />
                  <span className="font-mono">กำลังบรรยาย...</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">☕ ฟังรายงานเช้า</span>
                  <span className="sm:hidden">Audio</span>
                </>
              )}
            </button>

            {/* Add Ticker Button */}
            <button
              onClick={onOpenAddModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-colors"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">เพิ่ม Ticker</span>
            </button>

            {/* Refresh Button */}
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              title="รีเฟรชข้อมูลล่าสุด"
              className="p-2 rounded-lg text-xs bg-slate-900 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-amber-400' : ''}`} />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
