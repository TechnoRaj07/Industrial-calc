'use client';

import { ReactNode } from 'react';
import { X } from 'lucide-react';

interface GlassModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export default function GlassModal({ isOpen, onClose, title, children }: GlassModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-panel rounded-3xl p-6 sm:p-8 border border-white/20 dark:border-[#00FF99]/30 shadow-2xl">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200/40 dark:border-emerald-900/40">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-2 h-6 bg-[#00FF99] rounded-full inline-block" />
            {title}
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-200/50 dark:hover:bg-emerald-900/50 text-slate-500 dark:text-emerald-400 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
