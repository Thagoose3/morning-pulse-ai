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
    <div onClick={onClose} role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-[#2a1d14]/35 backdrop-blur-md animate-fade-in">
      <div onClick={(e) => e.stopPropagation()} className="bg-[#ffffff] border border-[#e8dfd2] rounded-t-3xl sm:rounded-3xl w-full max-w-lg max-h-[92vh] overflow-y-auto shadow-[0_30px_80px_-20px_rgba(60,40,25,0.16),0_0_0_1px_rgba(60,40,25,0.04)] text-[#2a1d14] animate-pop-in">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e8dfd2]">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#eaf4ed] text-[#2e7d4f]">
              <BookOpen className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-[#2a1d14] tracking-tight">
              รายละเอียดข่าว & บทวิเคราะห์ฉบับเต็ม
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#8c7764] hover:text-[#2a1d14] hover:bg-[#f5eee3] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-4">
          
          <h2 className="text-base md:text-lg font-bold text-[#2a1d14] leading-snug">
            {article.title}
          </h2>

          <div className="p-4 rounded-xl bg-[#ffffff] border border-[#e8dfd2] space-y-2.5">
            <div className="text-xs font-bold text-[#b07a2a] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>สรุปประเด็นหลักสำหรับนักลงทุน:</span>
            </div>
            <p className="text-xs text-[#2a1d14] leading-relaxed">
              {article.summary}
            </p>
          </div>

          {article.fullText && (
            <div className="space-y-2 text-xs text-[#5b4636] leading-relaxed font-sans">
              <p>{article.fullText}</p>
            </div>
          )}

          {article.catalyst && (
            <div className="space-y-2 pt-2">
              <div className="text-xs font-bold text-[#8c7764]">
                ผลกระทบต่อตลาด (Market Impact):
              </div>
              <p className="text-xs text-[#2a1d14] leading-relaxed bg-[#ffffff] p-3 rounded-xl border border-[#e8dfd2]">
                {article.catalyst.description}
              </p>
            </div>
          )}

          {/* Direct Source Link Button */}
          <div className="pt-3 border-t border-[#e8dfd2] flex flex-col sm:flex-row items-center gap-2.5">
            <a
              href={article.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#2e7d4f] hover:bg-[#256a42] text-white font-semibold text-xs transition-colors shadow-sm"
            >
              <span>อ่านข่าวต้นฉบับเต็มบน {article.sourceName}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onClose}
              className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-[#f5eee3] hover:bg-[#f5eee3] text-[#2a1d14] text-xs font-medium transition-colors"
            >
              ปิดหน้าต่าง
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
