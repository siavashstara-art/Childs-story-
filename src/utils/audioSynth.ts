/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Web Audio API Sound Synthesizer for Children's Story Ambient Effects and UI Feedback

class SoundSynth {
  private ctx: AudioContext | null = null;
  private ambientGain: GainNode | null = null;
  private ambientInterval: number | null = null;
  private activeAmbientType: string | null = null;
  private isMuted: boolean = false;
  private volume: number = 0.5;

  private initCtx(): AudioContext {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtxClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // --- Interaction UI Sounds ---

  public playClick() {
    if (this.isMuted) return;
    try {
      const ctx = this.initCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.15 * this.volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch {
      // Audio context might fail before user gesture
    }
  }

  public playCardFlip() {
    if (this.isMuted) return;
    try {
      const ctx = this.initCtx();
      // Filtered noise for paper rustle
      const bufferSize = ctx.sampleRate * 0.08;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1800, ctx.currentTime);
      filter.Q.setValueAtTime(2, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.2 * this.volume, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.08);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
    } catch {
      // Ignored
    }
  }

  public playSuccessChime() {
    if (this.isMuted) return;
    try {
      const ctx = this.initCtx();
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.09);

        const startTime = ctx.currentTime + idx * 0.09;
        gain.gain.setValueAtTime(0.2 * this.volume, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.45);
      });
    } catch {
      // Ignored
    }
  }

  public playCelebrationFanfare() {
    if (this.isMuted) return;
    try {
      const ctx = this.initCtx();
      const fanfare = [
        { freq: 523.25, time: 0.0, dur: 0.12 },
        { freq: 659.25, time: 0.12, dur: 0.12 },
        { freq: 783.99, time: 0.24, dur: 0.15 },
        { freq: 1046.5, time: 0.40, dur: 0.5 }
      ];
      fanfare.forEach(({ freq, time, dur }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + time);
        const startTime = ctx.currentTime + time;
        gain.gain.setValueAtTime(0.25 * this.volume, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + dur);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + dur);
      });
    } catch {
      // Ignored
    }
  }

  public playTryAgain() {
    if (this.isMuted) return;
    try {
      const ctx = this.initCtx();
      const notes = [392.0, 349.23]; // G4, F4
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.14);

        const startTime = ctx.currentTime + idx * 0.14;
        gain.gain.setValueAtTime(0.18 * this.volume, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.28);
      });
    } catch {
      // Ignored
    }
  }

  // --- Story Ambient Synthesizers ---

  public startAmbient(type: 'wind_leaves' | 'school_bell_birds' | 'bubbling_pot_laughter') {
    this.stopAmbient();
    const ctx = this.initCtx();
    this.activeAmbientType = type;

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.35 * this.volume, ctx.currentTime);
    masterGain.connect(ctx.destination);
    this.ambientGain = masterGain;

    if (type === 'wind_leaves') {
      this.playWindRustleLoop(ctx, masterGain);
    } else if (type === 'school_bell_birds') {
      this.playSchoolChimesLoop(ctx, masterGain);
    } else if (type === 'bubbling_pot_laughter') {
      this.playBubblingPotLoop(ctx, masterGain);
    }
  }

  private playWindRustleLoop(ctx: AudioContext, destination: GainNode) {
    const playWindGust = () => {
      if (this.activeAmbientType !== 'wind_leaves') return;
      const bufferSize = ctx.sampleRate * 2.5;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, ctx.currentTime);
      filter.frequency.linearRampToValueAtTime(750, ctx.currentTime + 1.2);
      filter.frequency.linearRampToValueAtTime(260, ctx.currentTime + 2.5);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 1.0);
      gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 2.5);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(destination);

      noise.start();

      // Occasional leaf rustles
      if (Math.random() > 0.4) {
        setTimeout(() => this.playLeafRustle(ctx, destination), 600);
      }
    };

    playWindGust();
    this.ambientInterval = window.setInterval(playWindGust, 3200);
  }

  private playLeafRustle(ctx: AudioContext, destination: GainNode) {
    if (this.activeAmbientType !== 'wind_leaves') return;
    const dur = 0.4;
    const bufferSize = Math.floor(ctx.sampleRate * dur);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.sin((i / bufferSize) * Math.PI);
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(2400, ctx.currentTime);
    filter.Q.setValueAtTime(3.5, ctx.currentTime);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(destination);
    noise.start();
  }

  private playSchoolChimesLoop(ctx: AudioContext, destination: GainNode) {
    const playBell = () => {
      if (this.activeAmbientType !== 'school_bell_birds') return;
      // School bell strike
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const bellGain = ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'triangle';
      osc1.frequency.setValueAtTime(880, ctx.currentTime); // A5
      osc2.frequency.setValueAtTime(1320, ctx.currentTime); // E6

      bellGain.gain.setValueAtTime(0.18, ctx.currentTime);
      bellGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

      osc1.connect(bellGain);
      osc2.connect(bellGain);
      bellGain.connect(destination);

      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 1.2);
      osc2.stop(ctx.currentTime + 1.2);

      // Bird chirps shortly after
      setTimeout(() => this.playBirdChirp(ctx, destination), 500);
      setTimeout(() => this.playBirdChirp(ctx, destination), 900);
    };

    playBell();
    this.ambientInterval = window.setInterval(playBell, 4000);
  }

  private playBirdChirp(ctx: AudioContext, destination: GainNode) {
    if (this.activeAmbientType !== 'school_bell_birds') return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    const startFreq = 2200 + Math.random() * 400;
    osc.frequency.setValueAtTime(startFreq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(startFreq + 700, ctx.currentTime + 0.08);
    osc.frequency.exponentialRampToValueAtTime(startFreq + 200, ctx.currentTime + 0.16);

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.16);

    osc.connect(gain);
    gain.connect(destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.18);
  }

  private playBubblingPotLoop(ctx: AudioContext, destination: GainNode) {
    const playBubble = () => {
      if (this.activeAmbientType !== 'bubbling_pot_laughter') return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      const baseFreq = 200 + Math.random() * 250;
      osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 2.1, ctx.currentTime + 0.09);

      gain.gain.setValueAtTime(0.14, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

      osc.connect(gain);
      gain.connect(destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.11);
    };

    const scheduleBubbles = () => {
      if (this.activeAmbientType !== 'bubbling_pot_laughter') return;
      playBubble();
      setTimeout(playBubble, 120 + Math.random() * 150);
      setTimeout(playBubble, 300 + Math.random() * 150);
    };

    scheduleBubbles();
    this.ambientInterval = window.setInterval(scheduleBubbles, 900);
  }

  public stopAmbient() {
    if (this.ambientInterval) {
      clearInterval(this.ambientInterval);
      this.ambientInterval = null;
    }
    if (this.ambientGain && this.ctx) {
      try {
        this.ambientGain.gain.setValueAtTime(this.ambientGain.gain.value, this.ctx.currentTime);
        this.ambientGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);
        setTimeout(() => {
          this.ambientGain?.disconnect();
          this.ambientGain = null;
        }, 250);
      } catch {
        this.ambientGain = null;
      }
    }
    this.activeAmbientType = null;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.ambientGain && this.ctx) {
      this.ambientGain.gain.setValueAtTime(0.35 * this.volume, this.ctx.currentTime);
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopAmbient();
    }
    return this.isMuted;
  }

  public isMutedState(): boolean {
    return this.isMuted;
  }

  public getActiveAmbient(): string | null {
    return this.activeAmbientType;
  }
}

export const soundSynth = new SoundSynth();
