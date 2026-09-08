import React from 'react';
import { X, ExternalLink, BookOpen, Sparkles } from 'lucide-react';
import { CatalystItem } from '../types';

interface ArticleDetailModalProps {
  article: {
    title: string;
    summary: string;
    fullText?: string;
    catalyst?: CatalystItem;
    sourceName: string;
    sourceUrl: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ArticleDetailModal: React.FC<ArticleDetailModalProps> = ({
  article,
  isOpen,
  onClose
}) => {
  if (!isOpen || !article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#ffffff] border border-[#e5dcd0] rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl text-[#3d2e24]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#ede5d8]">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#eaf4ed] text-[#226339]">
              <BookOpen className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-[#25170f] tracking-tight">
              รายละเอียดข่าว & บทวิเคราะห์ฉบับเต็ม
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#8c7764] hover:text-[#25170f] hover:bg-[#f5eee3] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-4">
          
          <h2 className="text-base md:text-lg font-bold text-[#25170f] leading-snug">
            {article.title}
          </h2>

          <div className="p-4 rounded-xl bg-[#faf7f2] border border-[#ede5d8] space-y-2.5">
            <div className="text-xs font-bold text-[#8a5d2c] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>สรุปประเด็นหลักสำหรับนักลงทุน:</span>
            </div>
            <p className="text-xs text-[#4a3729] leading-relaxed">
              {article.summary}
            </p>
          </div>

          {article.fullText && (
            <div className="space-y-2 text-xs text-[#5c4a3c] leading-relaxed font-sans">
              <p>{article.fullText}</p>
            </div>
          )}

          {article.catalyst && (
            <div className="space-y-2 pt-2">
              <div className="text-xs font-bold text-[#7d6b5c]">
                ผลกระทบต่อตลาด (Market Impact):
              </div>
              <p className="text-xs text-[#4a3729] leading-relaxed bg-[#faf7f2] p-3 rounded-xl border border-[#ede5d8]">
                {article.catalyst.description}
              </p>
            </div>
          )}

          {/* Direct Source Link Button */}
          <div className="pt-3 border-t border-[#ede5d8] flex flex-col sm:flex-row items-center gap-2.5">
            <a
              href={article.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#26693d] hover:bg-[#1e5831] text-white font-semibold text-xs transition-colors shadow-sm"
            >
              <span>อ่านข่าวต้นฉบับเต็มบน {article.sourceName}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onClose}
              className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-[#f5eee3] hover:bg-[#ede3d4] text-[#4a3729] text-xs font-medium transition-colors"
            >
              ปิดหน้าต่าง
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
