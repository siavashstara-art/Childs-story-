/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  BookOpen,
  Sparkles,
  Volume2,
  Award,
  Heart,
  Languages,
  CheckCircle2,
  Smile,
  Compass
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { StoryCard } from './components/StoryCard';
import { StoryReader } from './components/StoryReader';
import { LeitnerBoxComponent } from './components/LeitnerBox';
import { IdiomsCorner } from './components/IdiomsCorner';
import { QuizSection } from './components/QuizSection';
import { ParentGuide } from './components/ParentGuide';
import { ChampionCertificate } from './components/ChampionCertificate';
import { STORIES, HERO_IMAGE } from './data/stories';
import { Story } from './types/story';
import { soundSynth } from './utils/audioSynth';

export default function App() {
  const [activeTab, setActiveTab] = useState<'stories' | 'leitner' | 'idioms' | 'quiz' | 'guide'>('stories');
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [quizInitialStoryId, setQuizInitialStoryId] = useState<string | undefined>(undefined);
  const [isMuted, setIsMuted] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  const handleToggleMute = () => {
    const muted = soundSynth.toggleMute();
    setIsMuted(muted);
  };

  const handleOpenQuiz = (storyId?: string) => {
    soundSynth.playClick();
    setSelectedStory(null);
    setQuizInitialStoryId(storyId);
    setActiveTab('quiz');
  };

  const handleSelectStory = (story: Story) => {
    setSelectedStory(story);
  };

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/40 text-slate-900 font-persian selection:bg-amber-200">
      {/* Strict 3-Zone Navigation Header */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setSelectedStory(null);
          setActiveTab(tab);
        }}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />

      {/* Main Content Viewport */}
      <main className="flex-1">
        {selectedStory ? (
          <StoryReader
            story={selectedStory}
            onBackToLibrary={() => setSelectedStory(null)}
            onOpenQuiz={(sId) => handleOpenQuiz(sId)}
          />
        ) : activeTab === 'leitner' ? (
          <LeitnerBoxComponent />
        ) : activeTab === 'idioms' ? (
          <IdiomsCorner />
        ) : activeTab === 'quiz' ? (
          <QuizSection
            initialStoryId={quizInitialStoryId}
            onOpenCertificate={() => setShowCertificate(true)}
          />
        ) : activeTab === 'guide' ? (
          <ParentGuide />
        ) : (
          /* Default: Stories Library & Hero Section */
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Hero Section */}
            <div className="relative rounded-3xl overflow-hidden mb-12 shadow-xl border border-amber-200 bg-white">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                {/* Left/Main Hero Content */}
                <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-700 mb-3">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <span>قصههای دوزبانه توانسیتی (Tavan City)</span>
                      <span aria-hidden="true">·</span>
                      <span>مخصوص کودکان ۵ سال به بالا</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-amber-950 font-persian leading-tight mb-4">
                      دنیای شادِ قصههای دوزبانه فارسی و انگلیسی
                    </h1>

                    <p className="text-base sm:text-lg text-slate-600 font-persian leading-relaxed mb-6">
                      همراه با گربه کوچولو، علی در روز اول مدرسه و مهمانی خوشمزه مادربزرگ؛ با افکت‌های صوتی زنده محیطی، جعبه لایتنر هوشمند، آموزش تلفظ فارسی لغات انگلیسی و متن فینگلیش برای کودکان داخل و خارج از کشور.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => {
                        soundSynth.playCardFlip();
                        setSelectedStory(STORIES[0]);
                      }}
                      className="px-6 py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-2"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>شروع خواندن قصه اول</span>
                    </button>

                    <button
                      onClick={() => {
                        soundSynth.playClick();
                        setActiveTab('leitner');
                      }}
                      className="px-5 py-3 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold text-sm transition-all cursor-pointer"
                    >
                      تمرین در جعبه لایتنر
                    </button>
                  </div>
                </div>

                {/* Right Hero Image */}
                <div className="lg:col-span-5 relative aspect-16/9 lg:aspect-auto">
                  <img
                    src={HERO_IMAGE}
                    alt="شهر قصه های توانسیتی"
                    className="w-full h-full object-cover lg:absolute lg:inset-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:hidden" />
                </div>
              </div>
            </div>

            {/* Feature highlights bar (No pills, clean unboxed text) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              <div className="bg-white rounded-2xl p-4 border border-amber-200/80 shadow-2xs">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-2">
                  <Languages className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-amber-950">دو زبانه و فینگلیش</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">مناسب کودکان مقیم خارج و داخل ایران</p>
              </div>

              <div className="bg-white rounded-2xl p-4 border border-amber-200/80 shadow-2xs">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-2">
                  <Volume2 className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-amber-950">افکت صوتی زنده</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">زوزه باد، زنگ مدرسه و قل‌قل قابلمه</p>
              </div>

              <div className="bg-white rounded-2xl p-4 border border-amber-200/80 shadow-2xs">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-2">
                  <Award className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-amber-950">جعبه لایتنر هوشمند</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">تثبیت لغات در ۵ مرحله حافظه ماندگار</p>
              </div>

              <div className="bg-white rounded-2xl p-4 border border-amber-200/80 shadow-2xs">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-2">
                  <Smile className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-amber-950">آزمون‌های ستاره‌دار</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">تقویت درک مطلب با کارنامه افتخار</p>
              </div>
            </div>

            {/* Stories Grid Section */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-black text-amber-950 font-persian">
                    کتاب‌های قصه بخش اول
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    هر کتاب دارای متن کامل دوزبانه، راهنمای صوتی و بخش آموزشی است.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {STORIES.map((story) => (
                  <StoryCard
                    key={story.id}
                    story={story}
                    onSelectStory={handleSelectStory}
                    onOpenQuiz={(sId) => handleOpenQuiz(sId)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Champion Certificate Modal */}
      {showCertificate && (
        <ChampionCertificate onClose={() => setShowCertificate(false)} />
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-amber-200/80 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-bold text-amber-950 font-persian">
            توان‌سیتی (Tavan City) · اسکریپت‌های قصههای دوزبانه کودکان ۵ سال به بالا
          </p>
          <div className="flex items-center gap-4 text-xs font-medium">
            <button
              onClick={() => {
                soundSynth.playClick();
                setSelectedStory(null);
                setActiveTab('guide');
              }}
              className="hover:text-amber-800 cursor-pointer"
            >
              راهنمای آموزشی والدین
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => {
                soundSynth.playClick();
                setSelectedStory(null);
                setActiveTab('leitner');
              }}
              className="hover:text-amber-800 cursor-pointer"
            >
              جعبه لایتنر
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => {
                soundSynth.playClick();
                setSelectedStory(null);
                setActiveTab('idioms');
              }}
              className="hover:text-amber-800 cursor-pointer"
            >
              اصطلاحات عامیانه
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
