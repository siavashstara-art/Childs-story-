/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Web Speech API text-to-speech reader for bilingual children's stories

export interface SpeechOptions {
  rate?: number;
  pitch?: number;
  lang?: 'en' | 'fa';
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err: unknown) => void;
}

class SpeechReader {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isSpeakingState: boolean = false;
  private voices: SpeechSynthesisVoice[] = [];

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  private loadVoices() {
    if (this.synth) {
      this.voices = this.synth.getVoices();
    }
  }

  public getVoices(): SpeechSynthesisVoice[] {
    if (this.voices.length === 0 && this.synth) {
      this.loadVoices();
    }
    return this.voices;
  }

  public speak(text: string, options: SpeechOptions = {}) {
    if (!this.synth) return;

    this.stop();

    const utterance = new SpeechSynthesisUtterance(text);
    const lang = options.lang || (this.detectPersian(text) ? 'fa' : 'en');

    utterance.rate = options.rate ?? 0.85; // Kid friendly pacing
    utterance.pitch = options.pitch ?? 1.05; // Slightly cheerful pitch

    if (lang === 'fa') {
      utterance.lang = 'fa-IR';
      // Find fa voice if available
      const faVoice = this.voices.find(v => v.lang.startsWith('fa') || v.lang.includes('IR'));
      if (faVoice) {
        utterance.voice = faVoice;
      }
    } else {
      utterance.lang = 'en-US';
      const enVoice = this.voices.find(v => (v.lang === 'en-US' || v.lang === 'en-GB') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Kid')));
      if (enVoice) {
        utterance.voice = enVoice;
      }
    }

    utterance.onstart = () => {
      this.isSpeakingState = true;
      options.onStart?.();
    };

    utterance.onend = () => {
      this.isSpeakingState = false;
      this.currentUtterance = null;
      options.onEnd?.();
    };

    utterance.onerror = (e) => {
      this.isSpeakingState = false;
      this.currentUtterance = null;
      options.onError?.(e);
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
      this.isSpeakingState = false;
      this.currentUtterance = null;
    }
  }

  public isSpeaking(): boolean {
    return this.isSpeakingState && (this.synth?.speaking ?? false);
  }

  private detectPersian(text: string): boolean {
    return /[\u0600-\u06FF]/.test(text);
  }
}

export const speechReader = new SpeechReader();
