/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Award, Star, Printer, X, Sparkles, CheckCircle2 } from 'lucide-react';
import { soundSynth } from '../utils/audioSynth';

interface ChampionCertificateProps {
  onClose: () => void;
}

export const ChampionCertificate: React.FC<ChampionCertificateProps> = ({ onClose }) => {
  const [childName, setChildName] = useState('کوچولوی دانشمند');

  const handlePrint = () => {
    soundSynth.playClick();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-10 border-8 border-amber-300 shadow-2xl relative paper-texture text-center">
        {/* Close Button */}
        <button
          onClick={() => {
            soundSynth.playClick();
            onClose();
          }}
          className="absolute top-4 left-4 p-2 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100 cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Certificate Decorative Border */}
        <div className="border-2 border-dashed border-amber-400 rounded-2xl p-6 sm:p-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Star className="w-6 h-6 text-amber-500 fill-amber-400" />
            <Star className="w-8 h-8 text-amber-500 fill-amber-400" />
            <Award className="w-12 h-12 text-amber-600" />
            <Star className="w-8 h-8 text-amber-500 fill-amber-400" />
            <Star className="w-6 h-6 text-amber-500 fill-amber-400" />
          </div>

          <span className="text-xs font-bold text-amber-700 tracking-wider">
            گواهی افتخار کتاب‌خوانی و یادگیری دو زبانه
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-amber-950 font-persian mt-1 mb-2">
            قهرمان قصههای توان‌سیتی (Tavan City)
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-latin" dir="ltr">
            Certificate of Excellence in Bilingual Story Reading
          </p>

          <div className="my-6">
            <p className="text-xs text-slate-500 mb-2">این گواهی با افتخار تقدیم می‌شود به:</p>
            <input
              type="text"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              placeholder="نام کودک را وارد کنید..."
              className="text-xl sm:text-2xl font-black text-amber-900 border-b-2 border-amber-400 text-center pb-1 focus:outline-hidden focus:border-amber-600 max-w-xs mx-auto block bg-transparent"
            />
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-persian max-w-lg mx-auto">
            برای مطالعه موفقیت‌آمیز هر ۳ قصه دوزبانه (گربه و ماه، روز اول مدرسه، مهمانی مادربزرگ)، یادگیری لغات در جعبه لایتنر و پاسخ صحیح به تمامی سوالات درک مطلب.
          </p>

          <div className="grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-amber-200 text-xs">
            <div className="p-2 bg-amber-50 rounded-xl">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
              <span className="font-bold text-slate-700">۳ قصه کامل</span>
            </div>
            <div className="p-2 bg-amber-50 rounded-xl">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
              <span className="font-bold text-slate-700">۲۴ لغت و اصطلاح</span>
            </div>
            <div className="p-2 bg-amber-50 rounded-xl">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
              <span className="font-bold text-slate-700">۱۰۰٪ آزمون درک مطلب</span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer active:scale-95"
          >
            <Printer className="w-4 h-4" />
            <span>چاپ گواهی افتخار</span>
          </button>
          <button
            onClick={() => {
              soundSynth.playClick();
              onClose();
            }}
            className="px-5 py-2.5 rounded-2xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-sm cursor-pointer"
          >
            بستن
          </button>
        </div>
      </div>
    </div>
  );
};
