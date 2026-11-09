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
    <div onClick={onClose} role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div onClick={(e) => e.stopPropagation()} className="bg-[#1b1612] border border-[#2e2620] rounded-t-3xl sm:rounded-3xl w-full max-w-lg max-h-[92vh] overflow-y-auto shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,240,220,0.04)] text-[#f3ebe0] animate-pop-in">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2e2620]">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#16251b] text-[#8fd4a0]">
              <BookOpen className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-[#f3ebe0] tracking-tight">
              รายละเอียดข่าว & บทวิเคราะห์ฉบับเต็ม
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#9a8a7c] hover:text-[#f3ebe0] hover:bg-[#231d18] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-4">
          
          <h2 className="text-base md:text-lg font-bold text-[#f3ebe0] leading-snug">
            {article.title}
          </h2>

          <div className="p-4 rounded-xl bg-[#1b1612] border border-[#2e2620] space-y-2.5">
            <div className="text-xs font-bold text-[#e6b86e] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>สรุปประเด็นหลักสำหรับนักลงทุน:</span>
            </div>
            <p className="text-xs text-[#f3ebe0] leading-relaxed">
              {article.summary}
            </p>
          </div>

          {article.fullText && (
            <div className="space-y-2 text-xs text-[#cbbdab] leading-relaxed font-sans">
              <p>{article.fullText}</p>
            </div>
          )}

          {article.catalyst && (
            <div className="space-y-2 pt-2">
              <div className="text-xs font-bold text-[#9a8a7c]">
                ผลกระทบต่อตลาด (Market Impact):
              </div>
              <p className="text-xs text-[#f3ebe0] leading-relaxed bg-[#1b1612] p-3 rounded-xl border border-[#2e2620]">
                {article.catalyst.description}
              </p>
            </div>
          )}

          {/* Direct Source Link Button */}
          <div className="pt-3 border-t border-[#2e2620] flex flex-col sm:flex-row items-center gap-2.5">
            <a
              href={article.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#3f8f5a] hover:bg-[#4fa36b] text-white font-semibold text-xs transition-colors shadow-sm"
            >
              <span>อ่านข่าวต้นฉบับเต็มบน {article.sourceName}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onClose}
              className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-[#231d18] hover:bg-[#231d18] text-[#f3ebe0] text-xs font-medium transition-colors"
            >
              ปิดหน้าต่าง
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
