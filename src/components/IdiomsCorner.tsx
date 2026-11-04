/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Volume2, Sparkles, MessageCircle, Heart, Star, Smile } from 'lucide-react';
import { STORIES } from '../data/stories';
import { soundSynth } from '../utils/audioSynth';
import { speechReader } from '../utils/speech';

export const IdiomsCorner: React.FC = () => {
  const [playingId, setPlayingId] = useState<string | null>(null);

  const allSlang = STORIES.flatMap(s =>
    s.slangIdioms.map(sl => ({
      ...sl,
      storyNumber: s.number,
      storyTitle: s.titleFa
    }))
  );

  const handlePlayAudio = (id: string, text: string, lang: 'fa' | 'en') => {
    soundSynth.playClick();
    setPlayingId(id);
    speechReader.speak(text, {
      rate: 0.85,
      lang: lang,
      onEnd: () => setPlayingId(null)
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <span className="text-xs font-bold text-amber-700 tracking-wide uppercase">اصطلاحات و مکالمات شیرین</span>
        <h1 className="text-2xl sm:text-3xl font-black text-amber-950 font-persian mt-1">
          گوشه اصطلاحات عامیانه و روزمره توان‌سیتی
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto mt-2">
          اصطلاحات صمیمی و خودمانی فارسی و انگلیسی که کودکان در زندگی روزمره، مدرسه و جمع‌های خانوادگی استفاده می‌کنند.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allSlang.map((item) => {
          const isPlaying = playingId === item.id;
          return (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-amber-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Meta header */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full">
                    قصه {item.storyNumber}: {item.storyTitle}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {item.lang === 'fa' ? 'فارسی اصیل' : 'English Idiom'}
                  </span>
                </div>

                {/* Phrase & Audio Button */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className={`text-xl font-black ${item.lang === 'fa' ? 'font-persian text-amber-950' : 'font-latin text-indigo-950'}`} dir={item.lang === 'fa' ? 'rtl' : 'ltr'}>
                      {item.phrase}
                    </h3>
                    <p className="text-xs font-semibold text-slate-500 mt-0.5" dir="ltr">
                      تلفظ / آوا: <span className="text-amber-700 font-bold">{item.transliteration}</span>
                    </p>
                  </div>

                  <button
                    onClick={() => handlePlayAudio(item.id, item.audioText, item.lang)}
                    title="شنیدن تلفظ"
                    className={`p-3 rounded-2xl transition-all cursor-pointer ${
                      isPlaying
                        ? 'bg-amber-600 text-white scale-110 shadow-md'
                        : 'bg-amber-50 text-amber-700 hover:bg-amber-100 group-hover:scale-105'
                    }`}
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Meaning */}
                <div className="bg-amber-50/60 rounded-xl p-3 border border-amber-200/60 mb-3">
                  <span className="text-[11px] font-bold text-slate-500 block mb-0.5">معنی و معادل:</span>
                  <p className="text-sm font-bold text-slate-800 font-persian leading-snug">
                    {item.meaning}
                  </p>
                </div>

                {/* Culture note */}
                <p className="text-xs text-slate-600 leading-relaxed font-persian">
                  {item.cultureNote}
                </p>
              </div>

              {/* Bottom interactive nudge */}
              <div className="mt-4 pt-3 border-t border-amber-100 flex items-center justify-between text-xs text-amber-800 font-bold">
                <span className="flex items-center gap-1">
                  <Smile className="w-3.5 h-3.5 text-amber-500" />
                  <span>مناسب سن ۵ سال به بالا</span>
                </span>
                <button
                  onClick={() => handlePlayAudio(item.id, item.audioText, item.lang)}
                  className="hover:underline cursor-pointer"
                >
                  پخش صدا 🔊
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bilingual Family Learning Tip */}
      <div className="mt-10 bg-indigo-50 border border-indigo-200 rounded-3xl p-6 flex flex-col sm:flex-row items-center gap-4 text-xs sm:text-sm text-indigo-950 font-medium">
        <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm">
          <Heart className="w-6 h-6" />
        </div>
        <div>
          <h4 className="font-bold text-indigo-900 mb-1">توصیه به والدین و مربیان داخل و خارج از کشور:</h4>
          <p className="text-indigo-800/90 leading-relaxed">
            کودکان دوزبانه با شنیدن و تکرار اصطلاحات احساسی مانند «آخ جون!» و «مامان جون!» پیوند عاطفی عمیق‌تری با زبان مادری برقرار می‌کنند. هم‌زمان، عباراتی مانند "How are you doing?" و "Let's go!" اعتمادبه‌نفس آن‌ها را در مکالمه روان انگلیسی تقویت می‌نماید.
          </p>
        </div>
      </div>
    </div>
  );
};
