/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BookOpen, Sparkles, Heart, Globe2, Brain, Volume2 } from 'lucide-react';

export const ParentGuide: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <span className="text-xs font-bold text-amber-700 tracking-wide uppercase">متدولوژی آموزش زبان کودک</span>
        <h1 className="text-2xl sm:text-3xl font-black text-amber-950 font-persian mt-1">
          راهنمای والدین و مربیان توان‌سیتی
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto mt-2">
          ویژه آموزش دوزبانه کودکان ۵ سال به بالا (مناسب داخل و خارج از کشور)
        </p>
      </div>

      <div className="space-y-6">
        {/* Method 1: Diaspora Kids & Fingilish */}
        <div className="bg-white rounded-3xl border border-amber-200 p-6 sm:p-8 shadow-sm flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0">
            <Globe2 className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-black text-amber-950 font-persian">
              ۱. پشتیبانی از کودکان خارج از کشور با فونتیک فینگلیش
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-persian">
              بسیاری از کودکان ایرانی مقیم خارج از کشور گفتار فارسی را می‌شنوند اما خواندن خط فارسی برایشان در ابتدا دشوار است. در توان‌سیتی، خط فینگلیش استاندارد در کنار متن فارسی قرار گرفته تا کودک بتواند هم‌زمان با گوش دادن به قصه، تلفظ دقیق کلمات را بخواند.
            </p>
          </div>
        </div>

        {/* Method 2: Phonetic Bridge for English Words */}
        <div className="bg-white rounded-3xl border border-amber-200 p-6 sm:p-8 shadow-sm flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
            <Volume2 className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-black text-amber-950 font-persian">
              ۲. پل آوایی فارسی برای لغات انگلیسی (Night = نایت)
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-persian">
              برای کودکان داخل کشور که در حال یادگیری الفبای انگلیسی هستند، نوشتن تلفظ آوایی به خط فارسی ترس از تلفظ اشتباه را از بین می‌برد و با زدن دکمه بلندگو تلفظ واقعی نیتیو را بلافاصله می‌شنوند.
            </p>
          </div>
        </div>

        {/* Method 3: 5-Stage Leitner Box Spaced Repetition */}
        <div className="bg-white rounded-3xl border border-amber-200 p-6 sm:p-8 shadow-sm flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
            <Brain className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-black text-amber-950 font-persian">
              ۳. تثبیت واژگان در حافظه بلندمدت با جعبه لایتنر
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-persian">
              کلمات قصه بر پایه سیستم ۵ خانه‌ای لایتنر طبقه‌بندی شده‌اند. اگر کودک کلمه‌ای را فراموش کند به خانه اول بازمی‌گردد و با یادآوری موفق به خانه‌های بالاتر صعود می‌کند تا به حافظه ماندگار سپرده شود.
            </p>
          </div>
        </div>

        {/* Method 4: Cultural Connection */}
        <div className="bg-white rounded-3xl border border-amber-200 p-6 sm:p-8 shadow-sm flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-500 text-white flex items-center justify-center shrink-0">
            <Heart className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-black text-amber-950 font-persian">
              ۴. انتقال هویت و مهر فرهنگی (مهمانی مادربزرگ و بوی قورمه‌سبزی)
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-persian">
              قصه سوم با محوریت خانواده، احترام به بزرگ‌ترها، خانه گرم مادربزرگ، قورمه‌سبزی و فرش سنتی طراحی شده است تا هویت و گرمای فرهنگ اصیل ایرانی در خاطر کودکان ماندگار شود.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
