/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Volume2,
  RotateCw,
  Check,
  Award,
  Sparkles,
  HelpCircle,
  Filter,
  RefreshCw,
  Trophy
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { STORIES } from '../data/stories';
import { soundSynth } from '../utils/audioSynth';
import { speechReader } from '../utils/speech';

export interface LeitnerItem {
  id: string;
  storyNumber: number;
  storyTitle: string;
  type: 'en' | 'fa';
  word: string;
  phonetic: string;
  translation: string;
  example: string;
  box: number; // 1 to 5
}

export const LeitnerBoxComponent: React.FC = () => {
  const [items, setItems] = useState<LeitnerItem[]>(() => {
    const saved = localStorage.getItem('tavan_city_leitner_cards_v1');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Fallback to fresh build
      }
    }

    // Initialize all cards from the stories
    const initialCards: LeitnerItem[] = [];

    STORIES.forEach((story) => {
      // English Leitner
      story.leitnerEnglish.forEach((item) => {
        initialCards.push({
          id: `en-${item.id}`,
          storyNumber: story.number,
          storyTitle: story.titleFa,
          type: 'en',
          word: item.english,
          phonetic: item.phoneticFa,
          translation: item.persian,
          example: `Example: ${item.english}`,
          box: 1
        });
      });

      // Persian Leitner
      story.leitnerPersian.forEach((item, idx) => {
        initialCards.push({
          id: `fa-s${story.number}-${idx}`,
          storyNumber: story.number,
          storyTitle: story.titleFa,
          type: 'fa',
          word: item.wordFa,
          phonetic: item.fingilish,
          translation: item.meaningEn,
          example: `معنی به انگلیسی: ${item.meaningEn}`,
          box: 1
        });
      });
    });

    return initialCards;
  });

  const [activeTabFilter, setActiveTabFilter] = useState<'all' | 'en' | 'fa'>('all');
  const [selectedStoryFilter, setSelectedStoryFilter] = useState<number | 'all'>('all');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [activeBoxFilter, setActiveBoxFilter] = useState<number | 'all'>('all');

  useEffect(() => {
    localStorage.setItem('tavan_city_leitner_cards_v1', JSON.stringify(items));
  }, [items]);

  // Filtered card list
  const filteredCards = items.filter((card) => {
    if (activeTabFilter !== 'all' && card.type !== activeTabFilter) return false;
    if (selectedStoryFilter !== 'all' && card.storyNumber !== selectedStoryFilter) return false;
    if (activeBoxFilter !== 'all' && card.box !== activeBoxFilter) return false;
    return true;
  });

  const currentCard = filteredCards[currentCardIndex] || filteredCards[0];

  const handleFlip = () => {
    soundSynth.playCardFlip();
    setIsFlipped(!isFlipped);
  };

  const handlePronounce = (e: React.MouseEvent, word: string, type: 'en' | 'fa') => {
    e.stopPropagation();
    soundSynth.playClick();
    speechReader.speak(word, {
      rate: 0.8,
      lang: type === 'en' ? 'en' : 'fa'
    });
  };

  const handleAnswer = (remembered: boolean) => {
    if (!currentCard) return;

    if (remembered) {
      soundSynth.playSuccessChime();
      const newBox = Math.min(5, currentCard.box + 1);
      if (newBox === 5) {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 }
        });
      }

      setItems(prev =>
        prev.map(c => (c.id === currentCard.id ? { ...c, box: newBox } : c))
      );
    } else {
      soundSynth.playTryAgain();
      setItems(prev =>
        prev.map(c => (c.id === currentCard.id ? { ...c, box: 1 } : c))
      );
    }

    setIsFlipped(false);
    if (currentCardIndex >= filteredCards.length - 1) {
      setCurrentCardIndex(0);
    } else {
      setCurrentCardIndex(prev => prev + 1);
    }
  };

  const handleResetLeitner = () => {
    if (confirm('آیا می‌خواهید کارت‌های جعبه لایتنر را از اول شروع کنید؟')) {
      soundSynth.playClick();
      setItems(prev => prev.map(c => ({ ...c, box: 1 })));
      setCurrentCardIndex(0);
      setIsFlipped(false);
    }
  };

  // Box counts
  const boxCounts = [1, 2, 3, 4, 5].map(b => items.filter(c => c.box === b).length);
  const masteredCount = items.filter(c => c.box === 5).length;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Title & Concept Header */}
      <div className="text-center mb-8">
        <span className="text-xs font-bold text-amber-700 tracking-wide uppercase">سیستم یادگیری فاصله‌دار توانسیتی</span>
        <h1 className="text-2xl sm:text-3xl font-black text-amber-950 font-persian mt-1">
          جعبه لایتنر هوشمند کودکان
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto mt-2">
          لغات انگلیسی و فارسی ۳ قصه را در پنج خانه جادویی مرور کنید تا به خانه پنجم (قهرمان لایتنر) برسند!
        </p>
      </div>

      {/* 5 Leitner Boxes Visual Ladder */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
        {[
          { box: 1, title: 'خانه ۱: تازه کار', icon: '🌱', desc: 'لغات جدید' },
          { box: 2, title: 'خانه ۲: در حال تمرین', icon: '🌿', desc: 'مرور مرحله ۲' },
          { box: 3, title: 'خانه ۳: یادآوری', icon: '🌸', desc: 'مرور مرحله ۳' },
          { box: 4, title: 'خانه ۴: تسلط', icon: '⭐', desc: 'تثبیت حافظه' },
          { box: 5, title: 'خانه ۵: قهرمان', icon: '🏆', desc: 'حافظه دائم' }
        ].map((b) => {
          const count = boxCounts[b.box - 1];
          const isSelected = activeBoxFilter === b.box;
          return (
            <button
              key={b.box}
              onClick={() => {
                soundSynth.playClick();
                setActiveBoxFilter(isSelected ? 'all' : b.box);
                setCurrentCardIndex(0);
                setIsFlipped(false);
              }}
              className={`p-3 rounded-2xl border transition-all text-right cursor-pointer ${
                isSelected
                  ? 'bg-amber-500 text-white border-amber-600 shadow-md ring-2 ring-amber-300'
                  : 'bg-white hover:bg-amber-50/70 border-amber-200 text-slate-800'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xl">{b.icon}</span>
                <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full ${isSelected ? 'bg-white/30 text-white' : 'bg-amber-100 text-amber-800'}`}>
                  {count} کارت
                </span>
              </div>
              <h4 className="text-xs font-bold">{b.title}</h4>
              <p className={`text-[11px] ${isSelected ? 'text-amber-100' : 'text-slate-500'}`}>{b.desc}</p>
            </button>
          );
        })}
      </div>

      {/* Filters Deck */}
      <div className="bg-white rounded-2xl border border-amber-200 p-4 mb-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
        {/* Language Tabs */}
        <div className="flex items-center gap-1.5 bg-amber-50 p-1 rounded-xl text-xs font-bold">
          <button
            onClick={() => {
              soundSynth.playClick();
              setActiveTabFilter('all');
              setCurrentCardIndex(0);
            }}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTabFilter === 'all' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            همه لغات ({items.length})
          </button>
          <button
            onClick={() => {
              soundSynth.playClick();
              setActiveTabFilter('en');
              setCurrentCardIndex(0);
            }}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTabFilter === 'en' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            انگلیسی (Cat, Dog...)
          </button>
          <button
            onClick={() => {
              soundSynth.playClick();
              setActiveTabFilter('fa');
              setCurrentCardIndex(0);
            }}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTabFilter === 'fa' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            فارسی (مهربان، دوست...)
          </button>
        </div>

        {/* Story Selector */}
        <div className="flex items-center gap-2 text-xs font-bold">
          <span className="text-slate-500">انتخاب قصه:</span>
          <select
            value={selectedStoryFilter}
            onChange={(e) => {
              soundSynth.playClick();
              setSelectedStoryFilter(e.target.value === 'all' ? 'all' : Number(e.target.value));
              setCurrentCardIndex(0);
              setIsFlipped(false);
            }}
            className="bg-amber-50 border border-amber-200 rounded-xl px-3 py-1.5 text-slate-800 text-xs font-medium cursor-pointer"
          >
            <option value="all">تمام ۳ قصه</option>
            <option value={1}>قصه ۱: گربه و ماه</option>
            <option value={2}>قصه ۲: روز اول مدرسه</option>
            <option value={3}>قصه ۳: مهمانی مادربزرگ</option>
          </select>

          <button
            onClick={handleResetLeitner}
            title="شروع مجدد لایتنر"
            className="p-1.5 text-slate-400 hover:text-amber-700 hover:bg-amber-100 rounded-lg transition-colors cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Flashcard Interactive Area */}
      {filteredCards.length > 0 && currentCard ? (
        <div className="max-w-xl mx-auto">
          {/* Card Meta Indicator */}
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2 px-2">
            <span>
              کارت {currentCardIndex + 1} از {filteredCards.length}
            </span>
            <span className="text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
              قصه شماره {currentCard.storyNumber}: {currentCard.storyTitle}
            </span>
            <span className="font-mono text-emerald-700 font-bold">
              خانه فعلی: {currentCard.box} / 5
            </span>
          </div>

          {/* 3D Flip Card */}
          <div
            onClick={handleFlip}
            className="relative cursor-pointer select-none transition-all duration-300 transform active:scale-98"
            style={{ minHeight: '280px' }}
          >
            <div
              className={`w-full min-h-[280px] rounded-3xl p-8 flex flex-col justify-between shadow-lg border-2 transition-all duration-300 ${
                isFlipped
                  ? 'bg-amber-500 text-white border-amber-600'
                  : 'bg-white text-slate-900 border-amber-200 hover:border-amber-300'
              }`}
            >
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${isFlipped ? 'bg-amber-600/70 text-white' : 'bg-amber-100 text-amber-800'}`}>
                  {currentCard.type === 'en' ? 'لغت انگلیسی' : 'لغت فارسی'}
                </span>
                <button
                  onClick={(e) => handlePronounce(e, currentCard.word, currentCard.type)}
                  title="شنیدن تلفظ"
                  className={`p-2 rounded-full transition-transform hover:scale-110 ${
                    isFlipped ? 'bg-white/20 text-white hover:bg-white/30' : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                  }`}
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              {/* Card Center Word */}
              <div className="text-center py-6">
                {!isFlipped ? (
                  <>
                    <h2 className="text-3xl sm:text-4xl font-black mb-3 tracking-wide" dir={currentCard.type === 'en' ? 'ltr' : 'rtl'}>
                      {currentCard.word}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 flex items-center justify-center gap-1">
                      <HelpCircle className="w-4 h-4 text-amber-500" />
                      <span>برای مشاهده معنی و تلفظ فارسی، روی کارت بزنید</span>
                    </p>
                  </>
                ) : (
                  <>
                    <h2 className="text-2xl sm:text-3xl font-black mb-2 text-white">
                      {currentCard.translation}
                    </h2>
                    <div className="inline-block bg-white/20 px-4 py-1.5 rounded-xl text-base font-bold text-amber-100 mb-2">
                      تلفظ صوتی: {currentCard.phonetic}
                    </div>
                    <p className="text-xs text-amber-100/90 font-medium max-w-sm mx-auto">
                      {currentCard.example}
                    </p>
                  </>
                )}
              </div>

              {/* Card Footer Hint */}
              <div className="flex items-center justify-between text-xs opacity-75">
                <span className="flex items-center gap-1">
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>{isFlipped ? 'روی کارت بزنید تا برگردد' : 'ضربه برای چرخاندن'}</span>
                </span>
                <span>خانه لایتنر: {currentCard.box} ⭐</span>
              </div>
            </div>
          </div>

          {/* Action Buttons for Child Response */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <button
              onClick={() => handleAnswer(false)}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-bold text-sm bg-rose-100 hover:bg-rose-200 text-rose-800 transition-all border border-rose-200 shadow-xs cursor-pointer active:scale-95"
            >
              <RotateCw className="w-4 h-4" />
              <span>نیاز به تمرین (خانه ۱)</span>
            </button>

            <button
              onClick={() => handleAnswer(true)}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-md cursor-pointer active:scale-95"
            >
              <Check className="w-4 h-4" />
              <span>بلد بودم! (ارتقای خانه)</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-3xl border border-amber-200 p-8">
          <Award className="w-12 h-12 text-amber-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800">هیچ کارتی در این بخش وجود ندارد</h3>
          <p className="text-xs text-slate-500 mt-1 mb-4">فیلتر را به حالت «همه لغات» تغییر دهید تا تمام کارت‌ها نمایش داده شوند.</p>
          <button
            onClick={() => {
              setActiveBoxFilter('all');
              setActiveTabFilter('all');
              setSelectedStoryFilter('all');
            }}
            className="px-4 py-2 bg-amber-500 text-white font-bold text-xs rounded-xl cursor-pointer hover:bg-amber-600"
          >
            نمایش تمام کارت‌ها
          </button>
        </div>
      )}

      {/* Mastery Badge Strip */}
      <div className="mt-10 bg-amber-100/60 rounded-2xl p-4 border border-amber-300/60 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-amber-950">وضعیت قهرمانان لایتنر شما</h4>
            <p className="text-slate-600">{masteredCount} لغت از {items.length} لغت به خانه نهایی (تسلط کامل) رسیده‌اند.</p>
          </div>
        </div>
        <div className="w-full sm:w-48 bg-amber-200 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-amber-600 h-full rounded-full transition-all duration-500"
            style={{ width: `${(masteredCount / Math.max(1, items.length)) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};
