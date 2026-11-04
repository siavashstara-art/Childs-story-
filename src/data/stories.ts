/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Story } from '../types/story';

export const HERO_IMAGE = '/src/assets/images/hero_tavan_city_1793713800949.jpg';

export const STORIES: Story[] = [
  {
    id: 'story-1',
    number: 1,
    titleFa: 'مهمانیِ ماه و گربهی کوچولو',
    titleEn: 'The Little Cat and Autumn Leaves',
    coverImage: '/src/assets/images/story1_cat_moon_1793713801128.jpg',
    soundGuide: 'افکت زوزه ملایم باد + صدای خش‌خش برگ‌ها',
    ambientSoundType: 'wind_leaves',
    tags: ['حیوانات', 'شب', 'دوستی', 'پاییز'],
    pages: [
      {
        pageNumber: 1,
        persianText: 'شبِ قشنگی بود. ماهِ تابان در آسمان می‌درخشید. گربهی کوچولو روی دیوارِ حیاط نشسته بود و به ماه نگاه می‌کرد. او گرسنه‌تر از همیشه بود و یواشکی گفت: «آخ جون، دلم یک ماهیِ خوشمزه می‌خواد!»',
        englishText: 'It was a beautiful night. The bright moon was shining in the sky. The little cat sat on the yard wall and looked at the moon. He was hungrier than ever and whispered: "Oh boy, I want a delicious fish!"',
        fingilishText: 'Shab-e ghashangi bud. Mah-e taban dar aseman midarakhshid. Gorbeh-ye koochulu rooye divar-e hayat neshasteh bud va beh mah negah mikard. Oo gorsneh-tar az hamisheh bud va yavashaki goft: "Akh joon, delam yek mahi-ye khoshmazeh mikhad!"',
        image: '/src/assets/images/story1_cat_moon_1793713801128.jpg',
        altText: 'گربه کوچولو روی دیوار حیاط و ماه تابان در آسمان پاییزی',
        vocabulary: [
          {
            id: 's1-p1-v1',
            english: 'Night',
            phoneticFa: 'نایت',
            persian: 'شب',
            partOfSpeech: 'اسم',
            exampleEn: 'It was a peaceful night.',
            exampleFa: 'شب آرامی بود.'
          },
          {
            id: 's1-p1-v2',
            english: 'Moon',
            phoneticFa: 'مون',
            persian: 'ماه',
            partOfSpeech: 'اسم',
            exampleEn: 'The moon is glowing bright.',
            exampleFa: 'ماه درخشان می‌تابد.'
          },
          {
            id: 's1-p1-v3',
            english: 'Cat',
            phoneticFa: 'کَت',
            persian: 'گربه',
            partOfSpeech: 'اسم',
            exampleEn: 'The cute cat purrs happily.',
            exampleFa: 'گربه ناز از خوشحالی خرخر می‌کند.'
          },
          {
            id: 's1-p1-v4',
            english: 'Fish',
            phoneticFa: 'فیش',
            persian: 'ماهی',
            partOfSpeech: 'اسم',
            exampleEn: 'The fish swims in clear water.',
            exampleFa: 'ماهی در آب زلال شنا می‌کند.'
          }
        ]
      },
      {
        pageNumber: 2,
        persianText: 'گربهی کوچولو از روی دیوار پایین آمد و یواشکی واردِ کوچه شد. او دوستِ مهربانش، سگِ کوچولو را دید که داشت دُمش را تکان می‌داد. سگِ کوچولو با لبخند گفت: «سلام دوستِ من! کجا می‌ری؟»',
        englishText: 'The little cat jumped down from the wall and sneaked into the alley. He saw his kind friend, the little dog, wagging his tail. The little dog smiled and said: "Hello my friend! Where are you going?"',
        fingilishText: 'Gorbeh-ye koochulu az rooye divar payin amad va yavashaki vared-e kucheh shod. Oo doost-e mehrabanash, sag-e koochulu ra did keh dasht domash ra tekan midad. Sag-e koochulu ba labkhand goft: "Salam doost-e man! Koja miri?"',
        image: '/src/assets/images/story1_cat_dog_alley_1793713825357.jpg',
        altText: 'گربه کوچولو و دوست مهربانش سگ کوچولو در کوچه سنگ‌فرش',
        vocabulary: [
          {
            id: 's1-p2-v1',
            english: 'Alley',
            phoneticFa: 'اَلی',
            persian: 'کوچه',
            partOfSpeech: 'اسم',
            exampleEn: 'The cozy alley had warm lanterns.',
            exampleFa: 'کوچه دنج چراغ‌های گرم داشت.'
          },
          {
            id: 's1-p2-v2',
            english: 'Dog',
            phoneticFa: 'دُگ',
            persian: 'سگ',
            partOfSpeech: 'اسم',
            exampleEn: 'The playful dog wags its tail.',
            exampleFa: 'سگ بازیگوش دمش را تکان می‌دهد.'
          },
          {
            id: 's1-p2-v3',
            english: 'Friend',
            phoneticFa: 'فرند',
            persian: 'دوست',
            partOfSpeech: 'اسم',
            exampleEn: 'A good friend shares a smile.',
            exampleFa: 'یک دوست خوب لبخندش را تقسیم می‌کند.'
          },
          {
            id: 's1-p2-v4',
            english: 'Smile',
            phoneticFa: 'اسمایل',
            persian: 'لبخند',
            partOfSpeech: 'اسم / فعل',
            exampleEn: 'She gave a warm smile.',
            exampleFa: 'او لبخندی گرم زد.'
          }
        ]
      }
    ],
    leitnerEnglish: [
      { id: 'l-s1-1', english: 'Cat', phoneticFa: 'کَت', persian: 'گربه' },
      { id: 'l-s1-2', english: 'Dog', phoneticFa: 'دُگ', persian: 'سگ' },
      { id: 'l-s1-3', english: 'Friend', phoneticFa: 'فرند', persian: 'دوست' }
    ],
    leitnerPersian: [
      { wordFa: 'مهربان', fingilish: 'Mehraban', meaningEn: 'Kind' },
      { wordFa: 'دوست', fingilish: 'Dust / Doost', meaningEn: 'Friend' },
      { wordFa: 'کوچه', fingilish: 'Kucheh', meaningEn: 'Alley' }
    ],
    slangIdioms: [
      {
        id: 'slang-s1-1',
        phrase: '«آخ جون!»',
        transliteration: 'Akh joon!',
        meaning: 'Oh boy! / Hooray! / Yippee!',
        cultureNote: 'عبارتی بسیار خودمانی و شاد در بین کودکان فارسی‌زبان برای ابراز ذوق و هیجان فوق‌العاده.',
        audioText: 'آخ جون!',
        lang: 'fa'
      },
      {
        id: 'slang-s1-2',
        phrase: '"How are you doing?"',
        transliteration: 'هاو آر یو دوئینگ؟',
        meaning: 'چطوری؟ / اوضاعت چطوره؟',
        cultureNote: 'احوالپرسی صمیمی و پرکاربرد روزمره در زبان انگلیسی میان دوستان و همسالان.',
        audioText: 'How are you doing?',
        lang: 'en'
      }
    ],
    quiz: {
      id: 'quiz-s1',
      questionFa: 'گربهی کوچولو روی چه چیزی نشسته بود؟',
      questionEn: 'What was the little cat sitting on?',
      options: [
        {
          id: 'opt-s1-1',
          textFa: 'روی دیوارِ حیاط',
          textEn: 'On the yard wall',
          isCorrect: true
        },
        {
          id: 'opt-s1-2',
          textFa: 'روی شاخه‌ی درخت',
          textEn: 'On a tree branch',
          isCorrect: false
        },
        {
          id: 'opt-s1-3',
          textFa: 'داخلِ یک ماشین',
          textEn: 'Inside a car',
          isCorrect: false
        }
      ],
      explanationFa: 'آفرین! در ابتدای قصه آمده است: «گربهی کوچولو روی دیوارِ حیاط نشسته بود و به ماه نگاه می‌کرد.»',
      explanationEn: 'Well done! The story says: "The little cat sat on the yard wall and looked at the moon."'
    }
  },
  {
    id: 'story-2',
    number: 2,
    titleFa: 'روزِ اولِ مدرسه و پرندهی کوچک',
    titleEn: 'The First Day of School and the Little Bird',
    coverImage: '/src/assets/images/story2_school_day_1793713802514.jpg',
    soundGuide: 'افکت صدای زنگ مدرسه + جیک‌جیک شادِ گنجشک‌ها',
    ambientSoundType: 'school_bell_birds',
    tags: ['مدرسه', 'شادی', 'یادگیری', 'دوست‌یابی'],
    pages: [
      {
        pageNumber: 1,
        persianText: 'صبحِ زود بود. خورشیدِ خانم از پشتِ کوه بیرون آمد. علی کوچولو کیفِ رنگی‌اش را پوشید و با لبخند به مادرش گفت: «مامان جون، امروز روزِ اولِ مدرسه منه!»',
        englishText: 'It was early in the morning. Mrs. Sun came out from behind the mountain. Little Ali wore his colorful bag and smiled at his mom: "Mommy dear, today is my first day of school!"',
        fingilishText: 'Sobh-e zud bud. Khorshid-e khanoom az posht-e kooh biroon amad. Ali koochulu kif-e rangiyash ra pooshid va ba labkhand beh madarash goft: "Maman joon, emrooz rooz-e avval-e madreseh-ye mane!"',
        image: '/src/assets/images/story2_school_day_1793713802514.jpg',
        altText: 'علی کوچولو با کیف رنگی شاداب به سوی مدرسه می‌رود و خورشید خانم لبخند می‌زند',
        vocabulary: [
          {
            id: 's2-p1-v1',
            english: 'Morning',
            phoneticFa: 'مورنینگ',
            persian: 'صبح',
            partOfSpeech: 'اسم',
            exampleEn: 'Good morning sunshine!',
            exampleFa: 'صبح به خیر خورشید خانم!'
          },
          {
            id: 's2-p1-v2',
            english: 'Sun',
            phoneticFa: 'سان',
            persian: 'خورشید',
            partOfSpeech: 'اسم',
            exampleEn: 'The warm sun lights up the day.',
            exampleFa: 'خورشید گرم روز را روشن می‌کند.'
          },
          {
            id: 's2-p1-v3',
            english: 'School',
            phoneticFa: 'اسکول',
            persian: 'مدرسه',
            partOfSpeech: 'اسم',
            exampleEn: 'We learn lots of fun things at school.',
            exampleFa: 'در مدرسه کلی چیزهای جالب یاد می‌گیریم.'
          },
          {
            id: 's2-p1-v4',
            english: 'Bag',
            phoneticFa: 'بِگ',
            persian: 'کیف',
            partOfSpeech: 'اسم',
            exampleEn: 'His school bag is filled with colorful pencils.',
            exampleFa: 'کیف مدرسه‌اش پر از مدادهای رنگی است.'
          }
        ]
      },
      {
        pageNumber: 2,
        persianText: 'علی توی حیاطِ مدرسه دوستِ تازه‌ای پیدا کرد. اسمش مریم بود. آن‌ها با هم دست دادند و توی صف ایستادند و بلند گفتند: «سلام به همه‌ی دوست‌ها!»',
        englishText: 'Ali found a new friend in the school yard. Her name was Maryam. They shook hands and stood in line and said out loud: "Hello to all our friends!"',
        fingilishText: 'Ali tooye hayat-e madreseh doost-e tazeh-i peyda kard. Esmesh Maryam bud. An-ha ba ham dast dadand va tooye saf istadand va boland goftand: "Salam beh hameh-ye doost-ha!"',
        image: '/src/assets/images/story2_school_friends_1793713826942.jpg',
        altText: 'علی و دوست جدیدش مریم دست می‌دهند و در حیاط مدرسه در صف می‌ایستند',
        vocabulary: [
          {
            id: 's2-p2-v1',
            english: 'Friend',
            phoneticFa: 'فرند',
            persian: 'دوست',
            partOfSpeech: 'اسم',
            exampleEn: 'Making a new friend is wonderful.',
            exampleFa: 'پیدا کردن دوست تازه فوق‌العاده است.'
          },
          {
            id: 's2-p2-v2',
            english: 'Yard',
            phoneticFa: 'یارد',
            persian: 'حیاط',
            partOfSpeech: 'اسم',
            exampleEn: 'Children run and play in the school yard.',
            exampleFa: 'بچه‌ها در حیاط مدرسه می‌دوند و بازی می‌کنند.'
          },
          {
            id: 's2-p2-v3',
            english: 'Hand',
            phoneticFa: 'هَند',
            persian: 'دست',
            partOfSpeech: 'اسم',
            exampleEn: 'They reached out a friendly hand.',
            exampleFa: 'آن‌ها دستی دوستانه دراز کردند.'
          },
          {
            id: 's2-p2-v4',
            english: 'Line',
            phoneticFa: 'لاین',
            persian: 'صف',
            partOfSpeech: 'اسم',
            exampleEn: 'Students stand nicely in a straight line.',
            exampleFa: 'دانش‌آموزان با نظم در یک صف مستقیم می‌ایستند.'
          }
        ]
      }
    ],
    leitnerEnglish: [
      { id: 'l-s2-1', english: 'Morning', phoneticFa: 'مورنینگ', persian: 'صبح' },
      { id: 'l-s2-2', english: 'School', phoneticFa: 'اسکول', persian: 'مدرسه' },
      { id: 'l-s2-3', english: 'Bag', phoneticFa: 'بِگ', persian: 'کیف' }
    ],
    leitnerPersian: [
      { wordFa: 'مدرسه', fingilish: 'Madreseh', meaningEn: 'School' },
      { wordFa: 'دوست', fingilish: 'Dust / Doost', meaningEn: 'Friend' },
      { wordFa: 'خورشید', fingilish: 'Khorshid', meaningEn: 'Sun' }
    ],
    slangIdioms: [
      {
        id: 'slang-s2-1',
        phrase: '«مامان جون!»',
        transliteration: 'Maman joon!',
        meaning: 'Mommy dear! / Beloved Mom',
        cultureNote: 'کلمه «جون» پسوند مهرآمیز و محبت‌آمیز بسیار محبوب ایرانیان هنگام صدا زدن اعضای خانواده است.',
        audioText: 'مامان جون!',
        lang: 'fa'
      },
      {
        id: 'slang-s2-2',
        phrase: '"Let\'s go!"',
        transliteration: 'لِتس گو!',
        meaning: 'بریم! / حرکت کنیم!',
        cultureNote: 'عبارت انگیزه‌بخش و پرانرژی برای شروع یک فعالیت شاد یا حرکت به سوی مکانی جدید.',
        audioText: "Let's go!",
        lang: 'en'
      }
    ],
    quiz: {
      id: 'quiz-s2',
      questionFa: 'علی کوچولو کیفِ چه رنگی داشت؟',
      questionEn: "What color was Ali's bag?",
      options: [
        {
          id: 'opt-s2-1',
          textFa: 'کیفِ رنگی',
          textEn: 'A colorful bag',
          isCorrect: true
        },
        {
          id: 'opt-s2-2',
          textFa: 'کیفِ مشکی تیره',
          textEn: 'A dark black bag',
          isCorrect: false
        },
        {
          id: 'opt-s2-3',
          textFa: 'کیفِ خاکستری',
          textEn: 'A plain gray bag',
          isCorrect: false
        }
      ],
      explanationFa: 'عالی بود! در متن قصه آمده: «علی کوچولو کیفِ رنگی‌اش را پوشید و با لبخند به مادرش گفت...»',
      explanationEn: 'Awesome! The text reads: "Little Ali wore his colorful bag and smiled at his mom..."'
    }
  },
  {
    id: 'story-3',
    number: 3,
    titleFa: 'مهمانیِ مادربزرگ و بوی قورمه‌سبزی',
    titleEn: "Grandma's House and the Delicious Smell",
    coverImage: '/src/assets/images/story3_grandma_house_1793713802607.jpg',
    soundGuide: 'افکت جوشیدن آب و صدای قلقلِ قابلمه + صدای خندهی فامیل',
    ambientSoundType: 'bubbling_pot_laughter',
    tags: ['خانواده', 'مادربزرگ', 'غذای سنتی', 'جمعه'],
    pages: [
      {
        pageNumber: 1,
        persianText: 'روزِ جمعه بود. همه‌ی فامیل به خانهی مادربزرگ رفتند. بوی عطرِ قورمه‌سبزی توی تمامِ خانه پیچیده بود. بچه‌ها دوان‌دوان وارد حیاط شدند و بلند سلام کردند.',
        englishText: 'It was Friday. All the family went to Grandma\'s house. The delicious smell of Ghormeh Sabzi filled the whole house. The children ran happily into the yard and greeted loudly.',
        fingilishText: 'Ruz-e jomeh bud. Hameh-ye famil beh khaneh-ye madar-bozorg raftand. Booye atr-e ghormeh-sabzi tooye tamam-e khaneh pichideh bud. Bacheh-ha davan-davan vared-e hayat shodand va boland salam kardand.',
        image: '/src/assets/images/story3_grandma_house_1793713802607.jpg',
        altText: 'مادربزرگ مهربان در آستانه در به بچه‌ها خوش‌آمد می‌گوید و بوی قورمه‌سبزی در هوا پیچیده',
        vocabulary: [
          {
            id: 's3-p1-v1',
            english: 'Friday',
            phoneticFa: 'فرایدی',
            persian: 'جمعه',
            partOfSpeech: 'اسم',
            exampleEn: 'Friday is a special family holiday.',
            exampleFa: 'روز جمعه تعطیلی ویژه دورهمی خانوادگی است.'
          },
          {
            id: 's3-p1-v2',
            english: 'Family',
            phoneticFa: 'فَملی',
            persian: 'خانواده / فامیل',
            partOfSpeech: 'اسم',
            exampleEn: 'Our family gathers together with joy.',
            exampleFa: 'خانواده ما با شادی دور هم جمع می‌شوند.'
          },
          {
            id: 's3-p1-v3',
            english: 'House',
            phoneticFa: 'هاوس',
            persian: 'خانه',
            partOfSpeech: 'اسم',
            exampleEn: 'Grandma’s house feels so cozy and safe.',
            exampleFa: 'خانه مادربزرگ بسیار دنج و پر از آرامش است.'
          },
          {
            id: 's3-p1-v4',
            english: 'Smell',
            phoneticFa: 'اِسْمِل',
            persian: 'بو / عطر',
            partOfSpeech: 'اسم / فعل',
            exampleEn: 'A sweet smell of herbal stew fills the room.',
            exampleFa: 'عطر خوشبوی خورشت سبزی اتاق را پر می‌کند.'
          }
        ]
      },
      {
        pageNumber: 2,
        persianText: 'مادربزرگ با دست‌های گرم و مهربانش بچه‌ها را بغل کرد و گفت: «خوش آمدید عزیزهای من!» همه روی فرشِ قشنگِ خانهی مادربزرگ نشستند.',
        englishText: 'Grandma hugged the children with her warm and kind hands and said: "Welcome my dears!" Everyone sat on the beautiful carpet in Grandma\'s house.',
        fingilishText: 'Madar-bozorg ba dast-haye garm va mehrabanash bacheh-ha ra baghal kard va goft: "Khosh amadid aziz-haye man!" Hameh rooye farsh-e ghashang-e khaneh-ye madar-bozorg neshastand.',
        image: '/src/assets/images/story3_carpet_hug_1793713826486.jpg',
        altText: 'مادربزرگ با مهربانی نوه‌ها را در آغوش گرفته و همگی روی فرش زیبای ایرانی نشسته‌اند',
        vocabulary: [
          {
            id: 's3-p2-v1',
            english: 'Grandma',
            phoneticFa: 'گِرَندما',
            persian: 'مادربزرگ',
            partOfSpeech: 'اسم',
            exampleEn: 'Grandma tells the best bedtime stories.',
            exampleFa: 'مادربزرگ قشنگ‌ترین قصه‌ها را تعریف می‌کند.'
          },
          {
            id: 's3-p2-v2',
            english: 'Kind',
            phoneticFa: 'کایند',
            persian: 'مهربان',
            partOfSpeech: 'صفت',
            exampleEn: 'She has a very kind and loving heart.',
            exampleFa: 'او قلبی بسیار مهربان و با محبت دارد.'
          },
          {
            id: 's3-p2-v3',
            english: 'Hands',
            phoneticFa: 'هَندز',
            persian: 'دست‌ها',
            partOfSpeech: 'اسم جمع',
            exampleEn: 'Warm hands give gentle hugs.',
            exampleFa: 'دست‌های گرم آغوشی ملایم هدیه می‌دهند.'
          },
          {
            id: 's3-p2-v4',
            english: 'Carpet',
            phoneticFa: 'کارپِت',
            persian: 'فرش',
            partOfSpeech: 'اسم',
            exampleEn: 'The traditional carpet has colorful patterns.',
            exampleFa: 'فرش سنتی نقش‌ونگارهای رنگارنگ دارد.'
          }
        ]
      }
    ],
    leitnerEnglish: [
      { id: 'l-s3-1', english: 'Friday', phoneticFa: 'فرایدی', persian: 'جمعه' },
      { id: 'l-s3-2', english: 'Family', phoneticFa: 'فَملی', persian: 'خانواده' },
      { id: 'l-s3-3', english: 'Grandma', phoneticFa: 'گِرَندما', persian: 'مادربزرگ' }
    ],
    leitnerPersian: [
      { wordFa: 'مادربزرگ', fingilish: 'Madar-bozorg', meaningEn: 'Grandma' },
      { wordFa: 'مهربان', fingilish: 'Mehraban', meaningEn: 'Kind' },
      { wordFa: 'خانه', fingilish: 'Khaneh', meaningEn: 'House' }
    ],
    slangIdioms: [
      {
        id: 'slang-s3-1',
        phrase: '«دوان‌دوان»',
        transliteration: 'Davan-davan',
        meaning: 'Running fast & joyfully / In a merry gallop',
        cultureNote: 'قید تکراری زیبا در زبان فارسی که حالت دویدن کودکانه با اشتیاق و خنده را تصویر می‌کند.',
        audioText: 'دوان دوان',
        lang: 'fa'
      },
      {
        id: 'slang-s3-2',
        phrase: '"Welcome!"',
        transliteration: 'وِلکام!',
        meaning: 'خوش آمدید! / مقدمتان گرامی!',
        cultureNote: 'عبارت استقبال و خوش‌آمدگویی صمیمانه به میهمانان هنگام ورود به خانه.',
        audioText: 'Welcome!',
        lang: 'en'
      }
    ],
    quiz: {
      id: 'quiz-s3',
      questionFa: 'بچه‌ها به خانهی چه کسی رفته بودند؟',
      questionEn: 'Whose house did the children go to?',
      options: [
        {
          id: 'opt-s3-1',
          textFa: 'خانهی مادربزرگ',
          textEn: "Grandma's house",
          isCorrect: true
        },
        {
          id: 'opt-s3-2',
          textFa: 'خانهی معلم مدرسه',
          textEn: "The teacher's house",
          isCorrect: false
        },
        {
          id: 'opt-s3-3',
          textFa: 'پارک بازی شهر',
          textEn: 'The city playground',
          isCorrect: false
        }
      ],
      explanationFa: 'آفرین بر تو! در متن قصه آمده: «روز جمعه بود. همه‌ی فامیل به خانهی مادربزرگ رفتند.»',
      explanationEn: 'Bravo! The text says: "It was Friday. All the family went to Grandma\'s house."'
    }
  }
];
