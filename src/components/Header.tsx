import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, RefreshCw, Plus } from 'lucide-react';
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
  const [currentDate, setCurrentDate] = useState<string>('');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  useEffect(() => {
    MorningSpeechService.setCallback((speaking) => {
      setIsSpeaking(speaking);
    });

    const now = new Date();
    setCurrentDate(
      now.toLocaleDateString('th-TH', {
        weekday: 'long',
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    );
  }, []);

  const handleToggleSpeech = () => {
    if (isSpeaking) {
      MorningSpeechService.stop();
    } else {
      const speechText = `สวัสดีตอนเช้าครับ สรุปภาพรวมตลาดประจำเช้าวันนี้. ${briefing.headline}. ${briefing.executiveSummary.join('. ')}. จิบกาแฟอย่างมีความสุขครับ`;
      MorningSpeechService.speak(speechText);
    }
  };

  return (
    <header className="border-b border-slate-800/60 bg-[#0c1017]/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* Clean Logo */}
          <div className="flex items-center gap-3">
            <div className="text-2xl">☕</div>
            <div>
              <h1 className="font-bold text-white text-base tracking-tight flex items-center gap-2">
                MorningPulse AI
                <span className="text-xs font-normal text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                  {currentDate}
                </span>
              </h1>
              <p className="text-xs text-slate-400">
                สรุปตลาดเช้านี้ อ่านจบใน 45 วินาที
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5">
            {/* Audio Button */}
            <button
              onClick={handleToggleSpeech}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                isSpeaking
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-md'
                  : 'bg-slate-800/90 text-slate-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              {isSpeaking ? (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span>หยุดอ่าน</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>🔊 ฟังเสียงสรุป</span>
                </>
              )}
            </button>

            {/* Add Ticker Button */}
            <button
              onClick={onOpenAddModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>เพิ่มหุ้น</span>
            </button>

            {/* Refresh */}
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              title="รีเฟรชราคาล่าสุด"
              className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-amber-400' : ''}`} />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
