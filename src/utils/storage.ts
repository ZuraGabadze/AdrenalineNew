import { SITE_CONFIG } from '../config/site';

const memoryFallback = new Map<string, string>();

export function safeGetStorage(key: string, defaultValue = ''): string {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const val = window.localStorage.getItem(key);
      if (val !== null) return val;
    }
  } catch {
    // Fallback to in-memory map if localStorage is blocked
  }
  return memoryFallback.get(key) ?? defaultValue;
}

export function safeSetStorage(key: string, value: string): void {
  memoryFallback.set(key, value);
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(key, value);
    }
  } catch {
    // Ignore storage write errors in restricted iframes
  }
}

let audioCtx: AudioContext | null = null;

export function playUiClickSound(enabled: boolean): void {
  if (!enabled || typeof window === 'undefined') return;

  try {
    const audio = new Audio(SITE_CONFIG.assets.clickSound);
    audio.volume = 0.25;
    const playPromise = audio.play();
    if (playPromise) {
      playPromise.catch(() => {
        playSynthVoxelClick();
      });
    }
  } catch {
    playSynthVoxelClick();
  }
}

function playSynthVoxelClick(): void {
  try {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;
    if (!audioCtx) {
      audioCtx = new Ctx();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(520, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(180, audioCtx.currentTime + 0.035);

    gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.038);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.04);
  } catch {
    // Ignore audio context errors
  }
}
