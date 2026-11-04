/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  Trophy,
  Sparkles,
  RotateCcw,
  Star,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { STORIES } from '../data/stories';
import { soundSynth } from '../utils/audioSynth';

interface QuizSectionProps {
  initialStoryId?: string;
  onOpenCertificate: () => void;
}

export const QuizSection: React.FC<QuizSectionProps> = ({
  initialStoryId,
  onOpenCertificate
}) => {
  const [selectedStoryIndex, setSelectedStoryIndex] = useState<number>(() => {
    if (initialStoryId) {
      const idx = STORIES.findIndex(s => s.id === initialStoryId);
      return idx >= 0 ? idx : 0;
    }
    return 0;
  });

  // Track answers for all stories
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showExplanation, setShowExplanation] = useState<Record<string, boolean>>({});

  const currentStory = STORIES[selectedStoryIndex] || STORIES[0];
  const quiz = currentStory.quiz;

  const currentAnswer = answers[quiz.id];
  const isAnswered = Boolean(currentAnswer);
  const selectedOption = quiz.options.find(o => o.id === currentAnswer);
  const isCorrect = selectedOption?.isCorrect ?? false;

  const handleSelectOption = (optionId: string, isOptCorrect: boolean) => {
    if (answers[quiz.id]) return; // Already answered

    setAnswers(prev => ({ ...prev, [quiz.id]: optionId }));
    setShowExplanation(prev => ({ ...prev, [quiz.id]: true }));

    if (isOptCorrect) {
      soundSynth.playSuccessChime();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    } else {
      soundSynth.playTryAgain();
    }
  };

  const handleRetryCurrent = () => {
    soundSynth.playClick();
    setAnswers(prev => {
      const copy = { ...prev };
      delete copy[quiz.id];
      return copy;
    });
    setShowExplanation(prev => {
      const copy = { ...prev };
      delete copy[quiz.id];
      return copy;
    });
  };

  // Count total stars earned
  const totalCorrect = STORIES.filter(s => {
    const ansId = answers[s.quiz.id];
    const opt = s.quiz.options.find(o => o.id === ansId);
    return opt?.isCorrect;
  }).length;

  const allCompleted = totalCorrect === STORIES.length;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <span className="text-xs font-bold text-amber-700 tracking-wide uppercase">آزمون‌های درک مطلب هوشمند</span>
        <h1 className="text-2xl sm:text-3xl font-black text-amber-950 font-persian mt-1">
          مسابقه درک مطلب و جام ستاره‌های توان‌سیتی
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto mt-2">
          به سوالات درک مطلب هر قصه پاسخ دهید و ستاره‌های طلایی را جمع‌آوری کنید!
        </p>

        {/* Star Counter */}
        <div className="inline-flex items-center gap-2 bg-amber-100/80 px-4 py-2 rounded-2xl border border-amber-300 mt-4 shadow-xs">
          <Star className="w-5 h-5 text-amber-500 fill-amber-400" />
          <span className="text-sm font-bold text-amber-900">
            امتیاز شما: {totalCorrect} ستاره طلایی از {STORIES.length}
          </span>
        </div>
      </div>

      {/* Story Quiz Tabs */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 mb-8 overflow-x-auto pb-2">
        {STORIES.map((s, idx) => {
          const isSelected = selectedStoryIndex === idx;
          const sAns = answers[s.quiz.id];
          const sOpt = s.quiz.options.find(o => o.id === sAns);
          const sCorrect = sOpt?.isCorrect;

          return (
            <button
              key={s.id}
              onClick={() => {
                soundSynth.playClick();
                setSelectedStoryIndex(idx);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 border ${
                isSelected
                  ? 'bg-amber-600 text-white border-amber-700 shadow-md ring-2 ring-amber-300'
                  : 'bg-white text-slate-700 hover:bg-amber-50 border-amber-200'
              }`}
            >
              <span>قصه {s.number}: {s.titleFa}</span>
              {sCorrect && <Star className="w-4 h-4 text-amber-300 fill-amber-300" />}
            </button>
          );
        })}
      </div>

      {/* Active Quiz Card */}
      <div className="bg-white rounded-3xl border border-amber-200 p-6 sm:p-8 shadow-lg mb-8 paper-texture">
        {/* Question Header */}
        <div className="border-b border-amber-100 pb-5 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
              سوال درک مطلب قصه شماره {currentStory.number}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Comprehension Check
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-amber-950 font-persian mb-2">
            {quiz.questionFa}
          </h3>
          <p className="text-sm sm:text-base font-semibold text-slate-500 font-latin" dir="ltr">
            {quiz.questionEn}
          </p>
        </div>

        {/* Options */}
        <div className="space-y-3.5 mb-6">
          {quiz.options.map((opt, i) => {
            const isThisSelected = currentAnswer === opt.id;
            let btnStyle = 'bg-white hover:bg-amber-50/70 border-amber-200 text-slate-800';

            if (isAnswered) {
              if (opt.isCorrect) {
                btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-200';
              } else if (isThisSelected && !opt.isCorrect) {
                btnStyle = 'bg-rose-50 border-rose-400 text-rose-950 ring-2 ring-rose-200';
              } else {
                btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
              }
            }

            return (
              <button
                key={opt.id}
                onClick={() => handleSelectOption(opt.id, opt.isCorrect)}
                disabled={isAnswered}
                className={`w-full text-right p-4 rounded-2xl border-2 transition-all flex items-center justify-between gap-4 cursor-pointer active:scale-99 ${btnStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center text-xs font-bold shrink-0">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-base font-bold font-persian">{opt.textFa}</p>
                    <p className="text-xs font-medium text-slate-500 font-latin" dir="ltr">
                      {opt.textEn}
                    </p>
                  </div>
                </div>

                {isAnswered && (
                  <div>
                    {opt.isCorrect ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                    ) : isThisSelected ? (
                      <XCircle className="w-6 h-6 text-rose-500 shrink-0" />
                    ) : null}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation & Result Feedback */}
        {isAnswered && (
          <div
            className={`p-5 rounded-2xl border transition-all ${
              isCorrect
                ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                : 'bg-rose-50/80 border-rose-300 text-rose-950'
            }`}
          >
            <div className="flex items-start gap-3">
              {isCorrect ? (
                <Sparkles className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <HelpCircle className="w-6 h-6 text-rose-500 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1.5 flex-1">
                <h4 className="font-bold text-base font-persian">
                  {isCorrect ? 'آفرین! پاسخ شما کاملاً درست است 🌟' : 'دوباره به متن قصه فکر کن!'}
                </h4>
                <p className="text-xs sm:text-sm font-persian leading-relaxed">
                  {quiz.explanationFa}
                </p>
                <p className="text-xs font-latin text-slate-600 pt-1" dir="ltr">
                  {quiz.explanationEn}
                </p>
              </div>

              {!isCorrect && (
                <button
                  onClick={handleRetryCurrent}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shrink-0 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>تلاش دوباره</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Completion Banner & Certificate Launch */}
      {allCompleted && (
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl text-center space-y-3">
          <Trophy className="w-14 h-14 text-amber-200 mx-auto animate-bounce" />
          <h2 className="text-2xl font-black font-persian">
            تبریک! شما قهرمان کتاب‌خوانی توان‌سیتی شدید!
          </h2>
          <p className="text-sm max-w-lg mx-auto text-amber-100">
            شما به تمام سوالات درک مطلب پاسخ صحیح دادید. هم‌اکنون می‌توانید کارنامه و گواهی افتخار توان‌سیتی را دریافت کنید.
          </p>
          <div className="pt-2">
            <button
              onClick={() => {
                soundSynth.playCelebrationFanfare();
                onOpenCertificate();
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-amber-900 font-black text-sm hover:bg-amber-50 shadow-md cursor-pointer active:scale-95 transition-all"
            >
              <Award className="w-5 h-5 text-amber-600" />
              <span>مشاهده و چاپ کارنامه طلایی توان‌سیتی</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
