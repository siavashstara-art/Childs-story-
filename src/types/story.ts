/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface VocabularyItem {
  id: string;
  english: string;
  phoneticFa: string; // e.g. "نایت"
  persian: string;    // e.g. "شب"
  partOfSpeech?: string;
  exampleEn?: string;
  exampleFa?: string;
}

export interface StoryPage {
  pageNumber: number;
  persianText: string;
  englishText: string;
  fingilishText: string;
  image: string;
  altText: string;
  vocabulary: VocabularyItem[];
}

export interface LeitnerCard {
  id: string;
  type: 'en-to-fa' | 'fa-to-en';
  front: string;
  back: string;
  phonetic: string;
  detail: string;
  box: number; // 1 to 5
  lastReviewed?: number;
}

export interface SlangIdiom {
  id: string;
  phrase: string;
  transliteration: string;
  meaning: string;
  cultureNote: string;
  audioText: string;
  lang: 'fa' | 'en';
}

export interface QuizQuestion {
  id: string;
  questionFa: string;
  questionEn: string;
  options: {
    id: string;
    textFa: string;
    textEn: string;
    isCorrect: boolean;
  }[];
  explanationFa: string;
  explanationEn: string;
}

export interface Story {
  id: string;
  number: number;
  titleFa: string;
  titleEn: string;
  coverImage: string;
  soundGuide: string;
  ambientSoundType: 'wind_leaves' | 'school_bell_birds' | 'bubbling_pot_laughter';
  pages: StoryPage[];
  leitnerEnglish: VocabularyItem[];
  leitnerPersian: {
    wordFa: string;
    fingilish: string;
    meaningEn: string;
  }[];
  slangIdioms: SlangIdiom[];
  quiz: QuizQuestion;
  tags: string[];
}
