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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#141a24] border border-slate-700/80 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl text-slate-100">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
              <BookOpen className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white tracking-tight">
              รายละเอียดข่าว & บทวิเคราะห์ฉบับเต็ม
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-4">
          
          <h2 className="text-base md:text-lg font-bold text-white leading-snug">
            {article.title}
          </h2>

          <div className="p-4 rounded-xl bg-[#0d121b] border border-slate-800 space-y-3">
            <div className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>สรุปประเด็นหลักสำหรับนักลงทุน:</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              {article.summary}
            </p>
          </div>

          {article.fullText && (
            <div className="space-y-2 text-xs text-slate-300 leading-relaxed font-sans">
              <p>{article.fullText}</p>
            </div>
          )}

          {article.catalyst && (
            <div className="space-y-2.5 pt-2">
              <div className="text-xs font-semibold text-slate-400">
                ผลกระทบต่อตลาด (Market Impact):
              </div>
              <p className="text-xs text-slate-300 leading-relaxed bg-[#0d121b] p-3 rounded-xl border border-slate-800">
                {article.catalyst.description}
              </p>
            </div>
          )}

          {/* Direct Source Link Button */}
          <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center gap-2.5">
            <a
              href={article.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs transition-colors shadow-sm"
            >
              <span>อ่านข่าวต้นฉบับเต็มบน {article.sourceName}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onClose}
              className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium transition-colors"
            >
              ปิดหน้าต่าง
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
