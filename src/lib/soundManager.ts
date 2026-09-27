/**
 * Cinematic Sound Manager for Portfolio Intro & Interface Experience
 * Built with Web Audio API for zero-latency, royalty-free audio synthesis
 * and optional overrides for custom audio files in /public/sounds/
 */

export const SOUND_ASSETS = {
  USE_FILES: false, // Set to true if you place custom audio in /public/sounds/
  FILES: {
    ambient: "/sounds/intro-ambient.mp3",
    quoteReveal: "/sounds/quote-reveal.mp3",
    profileReveal: "/sounds/profile-reveal.mp3",
    nameReveal: "/sounds/name-reveal.mp3",
    homeTransition: "/sounds/home-transition.mp3",
  },
};

let audioCtx: AudioContext | null = null;
let currentAmbientOscs: OscillatorNode[] = [];
let currentAmbientGain: GainNode | null = null;
let isMuted: boolean = true;

/**
 * Initializes and resumes the AudioContext on user interaction
 */
function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

/**
 * Checks local storage for sound preference
 */
export function getInitialSoundState(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const saved = localStorage.getItem("portfolio-sound-fx");
    return saved === "true";
  } catch {
    return false;
  }
}

/**
 * Updates sound preference
 */
export function setSoundState(enabled: boolean): void {
  isMuted = !enabled;
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("portfolio-sound-fx", String(enabled));
    } catch {}
  }
  if (!enabled) {
    stopIntroSounds();
  }
}

/**
 * Stop any ongoing intro ambient sounds immediately
 */
export function stopIntroSounds(): void {
  try {
    if (currentAmbientGain && audioCtx) {
      const now = audioCtx.currentTime;
      currentAmbientGain.gain.setValueAtTime(currentAmbientGain.gain.value, now);
      currentAmbientGain.gain.linearRampToValueAtTime(0.0001, now + 0.15);
      setTimeout(() => {
        currentAmbientOscs.forEach((osc) => {
          try {
            osc.stop();
            osc.disconnect();
          } catch {}
        });
        currentAmbientOscs = [];
        currentAmbientGain = null;
      }, 160);
    }
  } catch {}
}

/**
 * STAGE 1: Very low, deep ambient cinematic tone (~65Hz / 130Hz)
 */
export function playIntroAmbient(volume: number = 0.08): void {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    stopIntroSounds();

    const masterGain = ctx.createGain();
    const now = ctx.currentTime;

    masterGain.gain.setValueAtTime(0.0001, now);
    masterGain.gain.linearRampToValueAtTime(volume, now + 1.2);

    // Warm, sub-bass dual sine drone
    const freqs = [65.4, 130.8, 196.0]; // C2, C3, G3
    const oscs: OscillatorNode[] = [];

    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();

      osc.type = i === 0 ? "triangle" : "sine";
      osc.frequency.setValueAtTime(freq, now);

      oscGain.gain.setValueAtTime(0.4 / (i + 1), now);
      osc.connect(oscGain);
      oscGain.connect(masterGain);

      osc.start(now);
      oscs.push(osc);
    });

    masterGain.connect(ctx.destination);
    currentAmbientOscs = oscs;
    currentAmbientGain = masterGain;
  } catch {}
}

/**
 * STAGE 2: Soft, ethereal quote reveal shimmer
 */
export function playQuoteReveal(volume: number = 0.05): void {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(261.63, now); // C4
    osc.frequency.exponentialRampToValueAtTime(392.0, now + 0.8); // G4

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(volume, now + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 1.3);
  } catch {}
}

/**
 * STAGE 4: Soft tonal bloom when the profile photo appears
 */
export function playProfileReveal(volume: number = 0.06): void {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const freqs = [329.63, 493.88, 659.25]; // E4, B4, E5 (peaceful resonant chord)

    freqs.forEach((f, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(f, now + idx * 0.06);

      gain.gain.setValueAtTime(0.0001, now + idx * 0.06);
      gain.gain.linearRampToValueAtTime(volume * 0.5, now + idx * 0.06 + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.06);
      osc.stop(now + 1.5);
    });
  } catch {}
}

/**
 * STAGE 5: Subtle deep UI tone when name appears
 */
export function playNameReveal(volume: number = 0.07): void {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(146.83, now); // D3
    osc.frequency.exponentialRampToValueAtTime(220.0, now + 0.4); // A3

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(volume, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.9);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 1.0);
  } catch {}
}

/**
 * STAGE 6/7: Very soft transition tone when entering homepage
 */
export function playHomeTransition(volume: number = 0.05): void {
  if (isMuted) return;
  try {
    stopIntroSounds();
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(392.0, now); // G4
    osc.frequency.exponentialRampToValueAtTime(523.25, now + 0.35); // C5

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(volume, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.7);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.8);
  } catch {}
}

/**
 * Toggles sound state and provides feedback tone
 */
export function toggleSound(): boolean {
  const next = isMuted; // if currently muted, next is true (unmuted)
  setSoundState(next);
  if (next) {
    playQuoteReveal(0.04);
  }
  return next;
}
