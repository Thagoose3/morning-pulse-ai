import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, RefreshCw, Plus } from 'lucide-react';
import { MorningSpeechService } from '../services/speechService';
import { MorningBriefingData } from '../types';

interface HeaderProps {
  briefing: MorningBriefingData;
  onRefresh: () => void;
  onOpenAddModal: () => void;
  isRefreshing: boolean;
  lastUpdated?: Date | null;
}

const NAV = [
  { href: '#briefing', label: 'สรุปเช้านี้' },
  { href: '#pulse', label: 'ชีพจรตลาด' },
  { href: '#watchlist', label: 'หุ้นที่ติดตาม' }
];

export const Header: React.FC<HeaderProps> = ({
  briefing,
  onRefresh,
  onOpenAddModal,
  isRefreshing,
  lastUpdated
}) => {
  const [currentDate, setCurrentDate] = useState<string>('');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    MorningSpeechService.setCallback((speaking) => {
      setIsSpeaking(speaking);
    });

    const now = new Date();
    setCurrentDate(
      now.toLocaleDateString('th-TH', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: '2-digit'
      })
    );

    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
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
    <header
      className={`sticky top-0 z-40 border-b transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 backdrop-blur-xl border-[#e7ded2] shadow-[0_4px_20px_rgba(80,60,40,0.06)]'
          : 'bg-[#fbf9f5]/70 backdrop-blur-md border-transparent'
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-3">

          {/* Logo & Brand */}
          <a href="#" className="flex items-center gap-3 min-w-0">
            <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-[#f6ecdc] to-[#eadbc4] border border-[#e2d4c3] flex items-center justify-center text-xl shadow-sm flex-shrink-0">
              <span className="animate-steam">🍵</span>
            </div>
            <div className="min-w-0">
              <h1 className="font-bold text-[#35251b] text-[15px] tracking-tight leading-tight flex items-center gap-2">
                MorningPulse<span className="text-[#2e6b45]">AI</span>
                <span className="hidden sm:inline text-[11px] font-medium text-[#735e4d] bg-[#f5eee3] px-2 py-0.5 rounded-full border border-[#e5d9c9]">
                  {currentDate}
                </span>
              </h1>
              <p className="text-[11px] text-[#7d6b5c] truncate leading-tight mt-0.5">
                Tea Time Intelligence • อ่านจบใน {briefing.readingTimeSeconds || 45} วินาที
              </p>
            </div>
          </a>

          {/* Section nav (desktop) */}
          <nav className="hidden md:flex items-center gap-1 text-[13px]">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-3 py-1.5 rounded-full text-[#6d5a4c] hover:text-[#2d1e14] hover:bg-[#f3ece0] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            <button
              onClick={handleToggleSpeech}
              aria-label={isSpeaking ? 'หยุดอ่าน' : 'ฟังเสียงสรุป'}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                isSpeaking
                  ? 'bg-[#2b653f] text-white font-semibold shadow-sm'
                  : 'bg-[#eaf4ed] text-[#23633d] hover:bg-[#dceddf] border border-[#c4ded0]'
              }`}
            >
              {isSpeaking ? (
                <>
                  <span className="flex items-end gap-[2px] h-3.5" aria-hidden="true">
                    <span className="w-[3px] h-2 bg-white rounded-full animate-pulse" />
                    <span className="w-[3px] h-3.5 bg-white rounded-full animate-pulse [animation-delay:150ms]" />
                    <span className="w-[3px] h-2.5 bg-white rounded-full animate-pulse [animation-delay:300ms]" />
                  </span>
                  <VolumeX className="w-3.5 h-3.5 sm:hidden" />
                  <span className="hidden sm:inline">หยุดอ่าน</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#2b653f]" />
                  <span className="hidden sm:inline">ฟังสรุป</span>
                </>
              )}
            </button>

            <button
              onClick={onOpenAddModal}
              aria-label="เพิ่มหุ้น"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[#f5eee3] hover:bg-[#ede3d4] text-[#4a3729] border border-[#e2d4c3] transition-colors"
            >
              <Plus className="w-3.5 h-3.5 text-[#735e4d]" />
              <span className="hidden sm:inline">เพิ่มหุ้น</span>
            </button>

            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              aria-label="รีเฟรชราคา"
              title={
                lastUpdated
                  ? `อัปเดตล่าสุด ${lastUpdated.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })} น. • คลิกเพื่อรีเฟรช`
                  : 'รีเฟรชราคาล่าสุดจาก Yahoo Finance'
              }
              className="flex items-center gap-1.5 p-2 rounded-full text-[#7d6b5c] hover:text-[#35251b] hover:bg-[#f5eee3] transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-[#2b653f]' : ''}`} />
              {lastUpdated && (
                <span className="hidden lg:inline text-[11px] font-mono text-[#8c7764]">
                  {lastUpdated.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
