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
      className={`sticky top-0 z-40 border-b transition-all duration-500 ${
        scrolled
          ? 'bg-[#fbf7f0]/80 backdrop-blur-xl border-[rgba(60,40,25,0.08)] shadow-[0_10px_30px_-15px_rgba(60,40,25,0.16)]'
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">

          {/* Logo & Brand */}
          <a href="#" className="flex items-center gap-3 min-w-0">
            <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-[#ffffff] to-[#f5eee3] border border-[rgba(60,40,25,0.1)] flex items-center justify-center text-xl shadow-[0_0_24px_-6px_rgba(46,125,79,0.25)] flex-shrink-0">
              <span className="animate-steam">🍵</span>
            </div>
            <div className="min-w-0">
              <h1 className="font-semibold text-[#2a1d14] text-[15px] tracking-tight leading-tight flex items-center gap-2">
                MorningPulse<span className="text-gradient-matcha font-bold">AI</span>
                <span className="hidden sm:inline font-mono text-[10px] font-medium text-[#5b4636] bg-[#3d2e24]/[0.04] px-2 py-0.5 rounded-full border border-[#3d2e24]/10">
                  {currentDate}
                </span>
              </h1>
              <p className="text-[11px] text-[#8c7764] truncate leading-tight mt-0.5">
                Tea Time Intelligence • อ่านจบใน {briefing.readingTimeSeconds || 45} วินาที
              </p>
            </div>
          </a>

          {/* Section nav (desktop) */}
          <nav className="hidden md:flex items-center gap-1 p-1 rounded-full bg-[#3d2e24]/[0.03] border border-[#3d2e24]/[0.07] text-[13px]">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-3.5 py-1.5 rounded-full text-[#6d5a4c] hover:text-[#2a1d14] hover:bg-[#3d2e24]/[0.06] transition-colors"
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
                  ? 'bg-[#2e7d4f] text-[#fbf7f0] font-semibold shadow-[0_0_20px_-4px_rgba(46,125,79,0.39)]'
                  : 'bg-[#2e7d4f]/10 text-[#2e7d4f] hover:bg-[#2e7d4f]/20 border border-[#2e7d4f]/25'
              }`}
            >
              {isSpeaking ? (
                <>
                  <span className="flex items-end gap-[2px] h-3.5" aria-hidden="true">
                    <span className="w-[3px] h-2 bg-[#fbf7f0] rounded-full animate-pulse" />
                    <span className="w-[3px] h-3.5 bg-[#fbf7f0] rounded-full animate-pulse [animation-delay:150ms]" />
                    <span className="w-[3px] h-2.5 bg-[#fbf7f0] rounded-full animate-pulse [animation-delay:300ms]" />
                  </span>
                  <VolumeX className="w-3.5 h-3.5 sm:hidden" />
                  <span className="hidden sm:inline">หยุดอ่าน</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">ฟังสรุป</span>
                </>
              )}
            </button>

            <button
              onClick={onOpenAddModal}
              aria-label="เพิ่มหุ้น"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#2a1d14] hover:bg-[#3d2e24] text-[#fbf7f0] transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
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
              className="flex items-center gap-1.5 p-2 rounded-full text-[#8c7764] hover:text-[#2a1d14] hover:bg-[#3d2e24]/[0.06] transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-[#2e7d4f]' : ''}`} />
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
