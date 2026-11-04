/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  ChevronRight,
  ChevronLeft,
  Volume2,
  Sparkles,
  BookOpen,
  VolumeX,
  Languages,
  CheckCircle2,
  ZoomIn,
  X
} from 'lucide-react';
import { Story, StoryPage } from '../types/story';
import { soundSynth } from '../utils/audioSynth';
import { speechReader } from '../utils/speech';

interface StoryReaderProps {
  story: Story;
  onBackToLibrary: () => void;
  onOpenQuiz: (storyId: string) => void;
}

export const StoryReader: React.FC<StoryReaderProps> = ({
  story,
  onBackToLibrary,
  onOpenQuiz
}) => {
  const [currentPageIdx, setCurrentPageIdx] = useState(0);
  const [readingMode, setReadingMode] = useState<'bilingual' | 'persian' | 'english'>('bilingual');
  const [showFingilish, setShowFingilish] = useState(true);
  const [isAmbientPlaying, setIsAmbientPlaying] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSpeed, setSpeechSpeed] = useState<number>(0.85);
  const [speechLang, setSpeechLang] = useState<'en' | 'fa'>('fa');
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [activeWordId, setActiveWordId] = useState<string | null>(null);

  const currentPage: StoryPage = story.pages[currentPageIdx] || story.pages[0];
  const isLastPage = currentPageIdx === story.pages.length - 1;

  // Stop ambient and speech when changing stories or unmounting
  useEffect(() => {
    return () => {
      soundSynth.stopAmbient();
      speechReader.stop();
    };
  }, [story.id]);

  const toggleAmbientSound = () => {
    soundSynth.playClick();
    if (isAmbientPlaying) {
      soundSynth.stopAmbient();
      setIsAmbientPlaying(false);
    } else {
      soundSynth.startAmbient(story.ambientSoundType);
      setIsAmbientPlaying(true);
    }
  };

  const handleReadAloud = (lang: 'fa' | 'en') => {
    soundSynth.playClick();
    if (isSpeaking && speechLang === lang) {
      speechReader.stop();
      setIsSpeaking(false);
      return;
    }

    setSpeechLang(lang);
    const textToRead = lang === 'fa' ? currentPage.persianText : currentPage.englishText;

    speechReader.speak(textToRead, {
      rate: speechSpeed,
      lang: lang,
      onStart: () => setIsSpeaking(true),
      onEnd: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false)
    });
  };

  const pronounceWord = (english: string, wordId: string) => {
    setActiveWordId(wordId);
    soundSynth.playClick();
    speechReader.speak(english, {
      rate: 0.8,
      lang: 'en',
      onEnd: () => setActiveWordId(null)
    });
  };

  const handleNextPage = () => {
    if (currentPageIdx < story.pages.length - 1) {
      soundSynth.playCardFlip();
      speechReader.stop();
      setIsSpeaking(false);
      setCurrentPageIdx(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPageIdx > 0) {
      soundSynth.playCardFlip();
      speechReader.stop();
      setIsSpeaking(false);
      setCurrentPageIdx(prev => prev - 1);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Top action row */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <button
          onClick={() => {
            soundSynth.playClick();
            onBackToLibrary();
          }}
          className="flex items-center gap-2 text-sm font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 px-4 py-2 rounded-xl transition-all cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
          <span>بازگشت به فهرست قصهها</span>
        </button>

        <div className="flex flex-wrap items-center gap-3">
          {/* Ambient Sound Guide Button */}
          <button
            onClick={toggleAmbientSound}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer ${
              isAmbientPlaying
                ? 'bg-emerald-600 text-white animate-pulse'
                : 'bg-white text-slate-700 hover:bg-amber-50 border border-amber-200'
            }`}
          >
            {isAmbientPlaying ? (
              <>
                <Volume2 className="w-4 h-4" />
                <span>پخش صدای محیط: فعال</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-slate-400" />
                <span>راهنمای صوتی زنده</span>
              </>
            )}
          </button>

          {/* Reading Mode Switcher */}
          <div className="flex items-center bg-white p-1 rounded-xl border border-amber-200 shadow-xs text-xs font-bold">
            <button
              onClick={() => {
                soundSynth.playClick();
                setReadingMode('bilingual');
              }}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                readingMode === 'bilingual' ? 'bg-amber-500 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              دوزبانه
            </button>
            <button
              onClick={() => {
                soundSynth.playClick();
                setReadingMode('persian');
              }}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                readingMode === 'persian' ? 'bg-amber-500 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              فقط فارسی
            </button>
            <button
              onClick={() => {
                soundSynth.playClick();
                setReadingMode('english');
              }}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                readingMode === 'english' ? 'bg-amber-500 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              فقط انگلیسی
            </button>
          </div>
        </div>
      </div>

      {/* Sound Guide Ambient Description Strip */}
      <div className="bg-amber-100/70 border border-amber-300/70 rounded-2xl p-3 sm:p-4 mb-6 flex items-center justify-between gap-3 text-xs sm:text-sm text-amber-950 font-medium">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-600 shrink-0" />
          <span>
            <strong>راهنمای صوتی قصه:</strong> {story.soundGuide}
          </span>
        </div>
        <button
          onClick={toggleAmbientSound}
          className="text-xs font-bold text-amber-700 underline hover:text-amber-900 shrink-0 cursor-pointer"
        >
          {isAmbientPlaying ? 'توقف افکت' : 'شنیدن افکت صوتی'}
        </button>
      </div>

      {/* Story Book Container */}
      <div className="bg-white rounded-3xl border border-amber-200 shadow-xl overflow-hidden mb-8 paper-texture">
        {/* Story Book Header */}
        <div className="border-b border-amber-200/60 px-6 py-4 flex flex-wrap items-center justify-between gap-4 bg-amber-50/50">
          <div>
            <span className="text-xs font-bold text-amber-600">قصه شماره {story.number}</span>
            <h1 className="text-xl sm:text-2xl font-black text-amber-950 font-persian">{story.titleFa}</h1>
            <p className="text-sm font-semibold text-slate-500 font-latin">{story.titleEn}</p>
          </div>

          {/* Page Indicators */}
          <div className="flex items-center gap-2">
            {story.pages.map((p, idx) => (
              <button
                key={p.pageNumber}
                onClick={() => {
                  soundSynth.playCardFlip();
                  setCurrentPageIdx(idx);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  currentPageIdx === idx
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-white border border-amber-200 text-slate-700 hover:bg-amber-50'
                }`}
              >
                صفحه {p.pageNumber}
              </button>
            ))}
          </div>
        </div>

        {/* Story Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8">
          {/* Left / Top: High-Fidelity Watercolor Illustration */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative group rounded-2xl overflow-hidden border-4 border-amber-100 shadow-md w-full aspect-4/3 bg-amber-50">
              <img
                src={currentPage.image}
                alt={currentPage.altText}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={() => setZoomedImage(currentPage.image)}
                title="مشاهده تصویر در اندازه بزرگ"
                className="absolute bottom-3 left-3 bg-white/90 hover:bg-white text-slate-800 p-2 rounded-xl shadow-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
              <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-xs text-white text-xs px-2.5 py-1 rounded-lg">
                صفحه {currentPage.pageNumber} از {story.pages.length}
              </div>
            </div>

            {/* Read aloud bar under illustration */}
            <div className="w-full mt-4 bg-amber-50/80 rounded-2xl p-3 border border-amber-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleReadAloud('fa')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-colors cursor-pointer ${
                    isSpeaking && speechLang === 'fa'
                      ? 'bg-rose-500 text-white'
                      : 'bg-amber-600 text-white hover:bg-amber-700'
                  }`}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{isSpeaking && speechLang === 'fa' ? 'توقف فارسی' : 'روایت فارسی'}</span>
                </button>

                <button
                  onClick={() => handleReadAloud('en')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-colors cursor-pointer ${
                    isSpeaking && speechLang === 'en'
                      ? 'bg-rose-500 text-white'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{isSpeaking && speechLang === 'en' ? 'Stop English' : 'روایت انگلیسی'}</span>
                </button>
              </div>

              {/* Speed toggle */}
              <div className="flex items-center gap-1 text-slate-600 font-medium">
                <span>سرعت:</span>
                <button
                  onClick={() => setSpeechSpeed(0.75)}
                  className={`px-2 py-0.5 rounded text-xs ${speechSpeed === 0.75 ? 'bg-amber-200 font-bold' : ''}`}
                >
                  آرام
                </button>
                <button
                  onClick={() => setSpeechSpeed(0.95)}
                  className={`px-2 py-0.5 rounded text-xs ${speechSpeed === 0.95 ? 'bg-amber-200 font-bold' : ''}`}
                >
                  عادی
                </button>
              </div>
            </div>
          </div>

          {/* Right: Story Text & Transliteration */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              {/* Persian Text Box */}
              {(readingMode === 'bilingual' || readingMode === 'persian') && (
                <div className="bg-amber-50/50 rounded-2xl p-5 border border-amber-200/80">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-amber-800">متن فارسی</span>
                    <button
                      onClick={() => handleReadAloud('fa')}
                      className="text-xs text-amber-700 hover:text-amber-900 flex items-center gap-1 cursor-pointer font-bold"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>شنیدن با تلفظ</span>
                    </button>
                  </div>
                  <p className="text-lg sm:text-xl md:text-2xl leading-relaxed text-slate-800 font-persian font-medium">
                    {currentPage.persianText}
                  </p>
                </div>
              )}

              {/* English Text Box */}
              {(readingMode === 'bilingual' || readingMode === 'english') && (
                <div className="bg-indigo-50/40 rounded-2xl p-5 border border-indigo-200/80" dir="ltr">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-indigo-800 font-latin">English Story Text</span>
                    <button
                      onClick={() => handleReadAloud('en')}
                      className="text-xs text-indigo-700 hover:text-indigo-900 flex items-center gap-1 cursor-pointer font-bold"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Listen in English</span>
                    </button>
                  </div>
                  <p className="text-base sm:text-lg md:text-xl leading-relaxed text-slate-800 font-latin font-medium">
                    {currentPage.englishText}
                  </p>
                </div>
              )}

              {/* Fingilish Transliteration Toggle */}
              {readingMode !== 'english' && (
                <div className="border-t border-amber-200/60 pt-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <button
                      onClick={() => setShowFingilish(!showFingilish)}
                      className="text-xs font-bold text-amber-800 flex items-center gap-1.5 hover:text-amber-950 cursor-pointer"
                    >
                      <Languages className="w-4 h-4 text-amber-600" />
                      <span>{showFingilish ? 'مخفی کردن فینگلیش' : 'نمایش متن فینگلیش (برای کودکان خارج از کشور)'}</span>
                    </button>
                  </div>
                  {showFingilish && (
                    <div className="bg-white/80 rounded-xl p-3 border border-amber-200 text-xs sm:text-sm text-slate-600 font-latin italic leading-relaxed" dir="ltr">
                      {currentPage.fingilishText}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Phonics & Vocabulary Bar for this page (تلفظ فارسی لغات انگلیسی) */}
            <div className="border-t border-amber-200 pt-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-amber-950 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>تلفظ فارسی لغات انگلیسی این صفحه:</span>
                </span>
                <span className="text-xs text-slate-500">برای شنیدن روی هر کلمه بزنید</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {currentPage.vocabulary.map((vocab) => {
                  const isActive = activeWordId === vocab.id;
                  return (
                    <button
                      key={vocab.id}
                      onClick={() => pronounceWord(vocab.english, vocab.id)}
                      className={`text-right p-2.5 rounded-xl border transition-all cursor-pointer group ${
                        isActive
                          ? 'bg-amber-500 text-white border-amber-600 shadow-md scale-102'
                          : 'bg-white hover:bg-amber-50/80 border-amber-200 text-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`font-latin font-bold text-sm ${isActive ? 'text-white' : 'text-indigo-900'}`} dir="ltr">
                          {vocab.english}
                        </span>
                        <Volume2 className={`w-3.5 h-3.5 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-amber-600'}`} />
                      </div>
                      <div className="text-xs font-persian flex items-center justify-between">
                        <span className={isActive ? 'text-amber-100' : 'text-amber-800 font-bold'}>
                          {vocab.phoneticFa}
                        </span>
                        <span className={isActive ? 'text-white' : 'text-slate-500'}>
                          ({vocab.persian})
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Page navigation footer */}
            <div className="flex items-center justify-between gap-4 pt-4 border-t border-amber-200">
              <button
                onClick={handlePrevPage}
                disabled={currentPageIdx === 0}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                  currentPageIdx === 0
                    ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400'
                    : 'bg-white border border-amber-200 hover:bg-amber-50 text-slate-700'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
                <span>صفحه قبل</span>
              </button>

              <span className="text-xs font-bold text-slate-500">
                صفحه {currentPageIdx + 1} از {story.pages.length}
              </span>

              {isLastPage ? (
                <button
                  onClick={() => {
                    soundSynth.playSuccessChime();
                    onOpenQuiz(story.id);
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>پایان قصه و آزمون ستاره</span>
                </button>
              ) : (
                <button
                  onClick={handleNextPage}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-sm font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-xs transition-all active:scale-95 cursor-pointer"
                >
                  <span>صفحه بعد</span>
                  <ChevronLeft className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Image Zoom Modal */}
      {zoomedImage && (
        <div
          onClick={() => setZoomedImage(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <img
              src={zoomedImage}
              alt="Zoomed story visual"
              className="max-h-[85vh] w-auto rounded-2xl shadow-2xl object-contain"
              referrerPolicy="no-referrer"
            />
            <button
              onClick={() => setZoomedImage(null)}
              className="absolute top-4 left-4 bg-white/90 text-slate-900 p-2 rounded-full hover:bg-white cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
