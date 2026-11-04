/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { soundSynth } from '../utils/audioSynth';

interface NavbarProps {
  activeTab: 'stories' | 'leitner' | 'idioms' | 'quiz' | 'guide';
  onSelectTab: (tab: 'stories' | 'leitner' | 'idioms' | 'quiz' | 'guide') => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  isMuted,
  onToggleMute
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200/60 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <button
          onClick={() => {
            soundSynth.playClick();
            onSelectTab('stories');
          }}
          className="text-xl sm:text-2xl font-black text-amber-950 font-persian whitespace-nowrap shrink-0 hover:text-amber-700 transition-colors cursor-pointer"
        >
          توان‌سیتی <span className="text-amber-600 font-latin font-bold text-lg">Tavan City</span>
        </button>

        {/* Zone 2: 4-5 Concise Single-Line Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600 font-persian">
          <button
            onClick={() => {
              soundSynth.playClick();
              onSelectTab('stories');
            }}
            className={`whitespace-nowrap shrink-0 hover:text-amber-800 transition-colors py-1 cursor-pointer ${
              activeTab === 'stories' ? 'text-amber-900 border-b-2 border-amber-600 font-bold' : ''
            }`}
          >
            کتاب‌های قصه
          </button>
          <button
            onClick={() => {
              soundSynth.playClick();
              onSelectTab('leitner');
            }}
            className={`whitespace-nowrap shrink-0 hover:text-amber-800 transition-colors py-1 cursor-pointer ${
              activeTab === 'leitner' ? 'text-amber-900 border-b-2 border-amber-600 font-bold' : ''
            }`}
          >
            جعبه لایتنر
          </button>
          <button
            onClick={() => {
              soundSynth.playClick();
              onSelectTab('idioms');
            }}
            className={`whitespace-nowrap shrink-0 hover:text-amber-800 transition-colors py-1 cursor-pointer ${
              activeTab === 'idioms' ? 'text-amber-900 border-b-2 border-amber-600 font-bold' : ''
            }`}
          >
            اصطلاحات عامیانه
          </button>
          <button
            onClick={() => {
              soundSynth.playClick();
              onSelectTab('quiz');
            }}
            className={`whitespace-nowrap shrink-0 hover:text-amber-800 transition-colors py-1 cursor-pointer ${
              activeTab === 'quiz' ? 'text-amber-900 border-b-2 border-amber-600 font-bold' : ''
            }`}
          >
            آزمون و ستاره‌ها
          </button>
          <button
            onClick={() => {
              soundSynth.playClick();
              onSelectTab('guide');
            }}
            className={`whitespace-nowrap shrink-0 hover:text-amber-800 transition-colors py-1 cursor-pointer ${
              activeTab === 'guide' ? 'text-amber-900 border-b-2 border-amber-600 font-bold' : ''
            }`}
          >
            راهنمای آموزشی
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleMute}
            title={isMuted ? 'روشن کردن صدا' : 'بی‌صدا کردن'}
            aria-label={isMuted ? 'روشن کردن صدا' : 'بی‌صدا کردن'}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-amber-950 bg-amber-100 hover:bg-amber-200 rounded-xl transition-all shadow-xs cursor-pointer active:scale-95"
          >
            {isMuted ? (
              <>
                <VolumeX className="w-4 h-4 text-rose-600" />
                <span className="hidden sm:inline">صدا قطع</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-emerald-700 animate-pulse" />
                <span className="hidden sm:inline">صدای زنده فعال</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav row */}
      <div className="md:hidden flex items-center justify-around border-t border-amber-200/50 bg-amber-50/90 px-2 py-2 overflow-x-auto text-xs font-medium text-slate-700">
        <button
          onClick={() => onSelectTab('stories')}
          className={`px-2.5 py-1 rounded-lg ${activeTab === 'stories' ? 'bg-amber-200 text-amber-900 font-bold' : ''}`}
        >
          قصه‌ها
        </button>
        <button
          onClick={() => onSelectTab('leitner')}
          className={`px-2.5 py-1 rounded-lg ${activeTab === 'leitner' ? 'bg-amber-200 text-amber-900 font-bold' : ''}`}
        >
          لایتنر
        </button>
        <button
          onClick={() => onSelectTab('idioms')}
          className={`px-2.5 py-1 rounded-lg ${activeTab === 'idioms' ? 'bg-amber-200 text-amber-900 font-bold' : ''}`}
        >
          اصطلاحات
        </button>
        <button
          onClick={() => onSelectTab('quiz')}
          className={`px-2.5 py-1 rounded-lg ${activeTab === 'quiz' ? 'bg-amber-200 text-amber-900 font-bold' : ''}`}
        >
          آزمون
        </button>
        <button
          onClick={() => onSelectTab('guide')}
          className={`px-2.5 py-1 rounded-lg ${activeTab === 'guide' ? 'bg-amber-200 text-amber-900 font-bold' : ''}`}
        >
          راهنما
        </button>
      </div>
    </header>
  );
};
