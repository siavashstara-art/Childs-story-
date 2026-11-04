/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BookOpen, Sparkles, Volume2, ArrowLeft } from 'lucide-react';
import { Story } from '../types/story';
import { soundSynth } from '../utils/audioSynth';

interface StoryCardProps {
  story: Story;
  onSelectStory: (story: Story) => void;
  onOpenQuiz: (storyId: string) => void;
}

export const StoryCard: React.FC<StoryCardProps> = ({
  story,
  onSelectStory,
  onOpenQuiz
}) => {
  return (
    <div className="bg-white rounded-3xl border border-amber-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group">
      <div>
        {/* Story Illustration Cover */}
        <div className="relative aspect-4/3 overflow-hidden bg-amber-50">
          <img
            src={story.coverImage}
            alt={story.titleFa}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-3 right-3 bg-amber-950/80 backdrop-blur-xs text-white text-xs font-bold px-3 py-1 rounded-xl">
            قصه شماره {story.number}
          </div>
          <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs text-slate-800 text-[11px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-xs">
            <Volume2 className="w-3.5 h-3.5 text-amber-600" />
            <span>دارای افکت صوتی زنده</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Metadata: Clean unboxed text with typographic separators */}
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2 font-medium">
            <span>{story.pages.length} صفحه مصور</span>
            <span aria-hidden="true">·</span>
            <span>۸ واژه کلیدی</span>
            <span aria-hidden="true">·</span>
            <span>کودکان +۵ سال</span>
          </div>

          {/* Titles */}
          <h3 className="text-xl font-black text-amber-950 font-persian mb-1 group-hover:text-amber-700 transition-colors">
            {story.titleFa}
          </h3>
          <p className="text-xs font-semibold text-slate-500 font-latin mb-4" dir="ltr">
            {story.titleEn}
          </p>

          {/* Ambient Sound Guide Note */}
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3 text-xs text-amber-900 font-medium flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              <strong>راهنمای صوتی:</strong> {story.soundGuide}
            </span>
          </div>
        </div>
      </div>

      {/* Card Actions */}
      <div className="p-6 pt-0 border-t border-amber-100 flex items-center justify-between gap-3 mt-4">
        <button
          onClick={() => {
            soundSynth.playClick();
            onOpenQuiz(story.id);
          }}
          className="text-xs font-bold text-amber-800 hover:text-amber-950 hover:underline py-2 cursor-pointer"
        >
          آزمون درک مطلب ⭐
        </button>

        <button
          onClick={() => {
            soundSynth.playCardFlip();
            onSelectStory(story);
          }}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer"
        >
          <span>خواندن قصه</span>
          <ArrowLeft className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
