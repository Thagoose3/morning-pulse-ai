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
      const speechText = `สวัสดีตอนเช้าครับ สรุปภาพรวมตลาดประจำเช้าวันนี้. ${briefing.headline}. ${briefing.executiveSummary.join('. ')}. จิบชากาแฟอย่างมีความสุขครับ`;
      MorningSpeechService.speak(speechText);
    }
  };

  return (
    <header className="border-b border-[#e7ded2] bg-[#ffffff]/90 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#f4ece1] border border-[#e2d4c3] flex items-center justify-center text-xl shadow-sm">
              🍵
            </div>
            <div>
              <h1 className="font-bold text-[#35251b] text-base tracking-tight flex items-center gap-2">
                MorningPulse AI
                <span className="text-xs font-medium text-[#735e4d] bg-[#f5eee3] px-2.5 py-0.5 rounded-full border border-[#e5d9c9]">
                  {currentDate}
                </span>
              </h1>
              <p className="text-xs text-[#7d6b5c]">
                Tea Time Intelligence • สรุปตลาดเช้านี้ อ่านจบใน 45 วินาที
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
                  ? 'bg-[#2b653f] text-white font-semibold shadow-sm animate-pulse'
                  : 'bg-[#eaf4ed] text-[#23633d] hover:bg-[#dceddf] border border-[#c4ded0]'
              }`}
            >
              {isSpeaking ? (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span>หยุดอ่าน</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#2b653f]" />
                  <span>🔊 ฟังเสียงสรุป</span>
                </>
              )}
            </button>

            {/* Add Ticker Button */}
            <button
              onClick={onOpenAddModal}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#f5eee3] hover:bg-[#ede3d4] text-[#4a3729] border border-[#e2d4c3] transition-colors"
            >
              <Plus className="w-3.5 h-3.5 text-[#735e4d]" />
              <span>เพิ่มหุ้น</span>
            </button>

            {/* Refresh */}
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              title="รีเฟรชราคาล่าสุดจาก Yahoo Finance"
              className="p-2 rounded-full text-[#7d6b5c] hover:text-[#35251b] hover:bg-[#f5eee3] transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-[#2b653f]' : ''}`} />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
