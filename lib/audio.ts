// Audio system for cyberpunk sound effects
class AudioSystem {
  private context: AudioContext | null = null;
  private masterVolume: number = 0.3;
  private enabled: boolean = true;

  constructor() {
    if (typeof window !== 'undefined') {
      this.initializeAudioContext();
    }
  }

  private initializeAudioContext() {
    try {
      this.context = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (error) {
      console.warn('Web Audio API not supported');
      this.enabled = false;
    }
  }

  private async ensureAudioContext() {
    if (!this.context || !this.enabled) return null;
    
    if (this.context.state === 'suspended') {
      await this.context.resume();
    }
    
    return this.context;
  }

  // Generate a dark cyberpunk scanning sound
  async playScanning() {
    const ctx = await this.ensureAudioContext();
    if (!ctx) return;

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    const distortion = ctx.createWaveShaper();

    // Create distortion curve for darker, grittier sound
    const samples = 44100;
    const curve = new Float32Array(samples);
    const deg = Math.PI / 180;
    for (let i = 0; i < samples; i++) {
      const x = (i * 2) / samples - 1;
      curve[i] = ((3 + 80) * x * 20 * deg) / (Math.PI + 80 * Math.abs(x));
    }
    distortion.curve = curve;
    distortion.oversample = '4x';

    // Connect nodes
    oscillator.connect(distortion);
    distortion.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Darker, more ominous scanning sweep - lower frequencies
    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(60, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(280, ctx.currentTime + 1.2);
    oscillator.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 1.8);

    // Aggressive low-pass filter
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(120, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.8);
    filter.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 1.8);
    filter.Q.value = 15;

    // Volume envelope - longer, more menacing
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(this.masterVolume * 0.5, ctx.currentTime + 0.2);
    gainNode.gain.linearRampToValueAtTime(this.masterVolume * 0.3, ctx.currentTime + 1.0);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.8);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 1.8);
  }

  // Generate a dystopian, ominous icon lock sound
  async playIconLock(pitch: number = 1) {
    const ctx = await this.ensureAudioContext();
    if (!ctx) return;

    // Create an even darker, more dystopian lock sound
    const createLayer = (freq: number, delay: number, duration: number, waveType: OscillatorType = 'square') => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      const distortion = ctx.createWaveShaper();

      // Heavy distortion for menacing tone
      const samples = 4096;
      const curve = new Float32Array(samples);
      for (let i = 0; i < samples; i++) {
        const x = (i * 2) / samples - 1;
        curve[i] = Math.sign(x) * Math.pow(Math.abs(x), 0.3) * 0.8; // More aggressive distortion
      }
      distortion.curve = curve;
      distortion.oversample = '4x';

      osc.connect(distortion);
      distortion.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.type = waveType;
      // Even lower, more menacing frequencies
      osc.frequency.setValueAtTime(freq * pitch * 0.5, ctx.currentTime + delay);
      
      filter.type = 'lowpass';
      filter.frequency.value = freq * 0.8; // Very dark filtering
      filter.Q.value = 20; // More resonant, eerie

      gain.gain.setValueAtTime(0, ctx.currentTime + delay);
      gain.gain.linearRampToValueAtTime(this.masterVolume * 0.7, ctx.currentTime + delay + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);

      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + duration);
    };

    // Dystopian multi-layer lock sound - very low frequencies
    createLayer(120, 0, 0.4, 'sawtooth');     // Deep dystopian drone
    createLayer(200, 0.1, 0.3, 'square');     // Harsh mechanical
    createLayer(80, 0.2, 0.25, 'triangle');   // Sub-bass menace
    createLayer(150, 0.05, 0.35, 'sawtooth'); // Low growl
    createLayer(100, 0.15, 0.2, 'square');    // Additional darkness
  }

  // Generate dark mechanical typewriter sounds
  async playTypewriter() {
    const ctx = await this.ensureAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.1, ctx.sampleRate);
    const noiseSource = ctx.createBufferSource();
    const noiseGain = ctx.createGain();

    // Create mechanical noise for more authentic dark typewriter
    const channelData = noiseBuffer.getChannelData(0);
    for (let i = 0; i < channelData.length; i++) {
      channelData[i] = (Math.random() * 2 - 1) * 0.3;
    }
    noiseSource.buffer = noiseBuffer;

    // Connect main oscillator
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    // Connect noise source
    noiseSource.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    // Darker typewriter key sound - lower, grittier
    osc.type = 'sawtooth';
    const baseFreq = 400 + Math.random() * 200; // Lower, darker frequencies
    osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.3, ctx.currentTime + 0.08);

    // More aggressive filtering for darker sound
    filter.type = 'bandpass';
    filter.frequency.value = 250 + Math.random() * 150;
    filter.Q.value = 8;

    // Main oscillator envelope
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(this.masterVolume * 0.3, ctx.currentTime + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    // Noise envelope for mechanical click
    noiseGain.gain.setValueAtTime(0, ctx.currentTime);
    noiseGain.gain.linearRampToValueAtTime(this.masterVolume * 0.15, ctx.currentTime + 0.005);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.08);
    noiseSource.start(ctx.currentTime);
    noiseSource.stop(ctx.currentTime + 0.03);
  }

  // Generate ominous terminal startup sound
  async playTerminalBoot() {
    const ctx = await this.ensureAudioContext();
    if (!ctx) return;

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    const distortion = ctx.createWaveShaper();

    // Add distortion for more ominous boot sound
    const samples = 2048;
    const curve = new Float32Array(samples);
    for (let i = 0; i < samples; i++) {
      const x = (i * 2) / samples - 1;
      curve[i] = Math.tanh(x * 3) * 0.8;
    }
    distortion.curve = curve;

    // Connect dual oscillators for richer, darker sound
    osc1.connect(distortion);
    osc2.connect(distortion);
    distortion.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    // Deep, ominous frequencies
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(45, ctx.currentTime);
    osc1.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.4);
    osc1.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.9);

    osc2.type = 'square';
    osc2.frequency.setValueAtTime(90, ctx.currentTime);
    osc2.frequency.exponentialRampToValueAtTime(240, ctx.currentTime + 0.4);
    osc2.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.9);

    // Dark, menacing filter sweep
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(80, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.5);
    filter.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.9);
    filter.Q.value = 8;

    // Slower, more menacing envelope
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(this.masterVolume * 0.5, ctx.currentTime + 0.15);
    gain.gain.linearRampToValueAtTime(this.masterVolume * 0.3, ctx.currentTime + 0.6);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.9);

    osc1.start(ctx.currentTime);
    osc1.stop(ctx.currentTime + 0.9);
    osc2.start(ctx.currentTime);
    osc2.stop(ctx.currentTime + 0.9);
  }

  setVolume(volume: number) {
    this.masterVolume = Math.max(0, Math.min(1, volume));
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  getEnabled() {
    return this.enabled;
  }
}

// Export singleton instance
export const audioSystem = new AudioSystem();