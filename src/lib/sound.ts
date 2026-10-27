/**
 * Web Audio Ambient Soundscape Generator
 * Produces an ultra-warm, low-frequency cinematic drone chord
 * simulating a bespoke luxury film score atmosphere.
 */

class AmbientSoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private isPlaying: boolean = false;

  private init() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    this.ctx = new AudioCtx();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);

    // Warm Low Pass Filter to remove harsh frequencies and create a velvety texture
    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(420, this.ctx.currentTime);
    filter.Q.setValueAtTime(1.2, this.ctx.currentTime);

    // Subtle stereo panner or stereo spatialization
    this.masterGain.connect(filter);
    filter.connect(this.ctx.destination);

    // Cinematic chord frequencies: Root D2 (73.42Hz), Fifth A2 (110.00Hz), D3 (146.83Hz), F#3 (185.00Hz), A3 (220Hz)
    const freqs = [73.42, 110.0, 146.83, 185.0, 220.0];

    freqs.forEach((freq, index) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();

      osc.type = index % 2 === 0 ? "sine" : "triangle";
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Micro detune for rich celestial chorus effect
      const detune = (index - 2) * 3.5;
      osc.detune.setValueAtTime(detune, this.ctx.currentTime);

      // Balanced relative gain
      const gainVal = index === 0 ? 0.35 : 0.15;
      oscGain.gain.setValueAtTime(gainVal, this.ctx.currentTime);

      osc.connect(oscGain);
      oscGain.connect(this.masterGain);
      osc.start();
      this.oscillators.push(osc);
    });
  }

  public play() {
    try {
      this.init();
      if (!this.ctx || !this.masterGain) return;

      if (this.ctx.state === "suspended") {
        this.ctx.resume();
      }

      // Smooth luxury fade-in over 2.2 seconds
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.linearRampToValueAtTime(0.28, now + 2.2);
      this.isPlaying = true;
    } catch {
      // Audio autoplay policy handled gracefully
    }
  }

  public pause() {
    if (!this.ctx || !this.masterGain) return;
    try {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.linearRampToValueAtTime(0, now + 1.2);
      this.isPlaying = false;
    } catch {
      // Error handling
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }
}

export const ambientSound = typeof window !== "undefined" ? new AmbientSoundEngine() : null;
