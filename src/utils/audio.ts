import type { AudioLanguageMode } from '../types.ts';

// In-memory audio clip cache (audio element or Object URL)
const audioClipCache = new Map<string, string>(); // text -> ObjectURL / data URI
let currentPlayingAudio: HTMLAudioElement | null = null;

// Registry for custom user recordings or uploaded audio samples
const customAudioRegistry: Record<string, string> = {};

export function setCustomAudio(key: string, dataUrl: string) {
  customAudioRegistry[key] = dataUrl;
  try {
    localStorage.setItem('be_vui_hoc_custom_audio', JSON.stringify(customAudioRegistry));
  } catch {
    // storage error ignore
  }
}

export function getCustomAudio(key: string): string | null {
  return customAudioRegistry[key] || null;
}

export function removeCustomAudio(key: string) {
  delete customAudioRegistry[key];
  try {
    localStorage.setItem('be_vui_hoc_custom_audio', JSON.stringify(customAudioRegistry));
  } catch {
    // storage error ignore
  }
}

// Load custom audio registry on startup
if (typeof window !== 'undefined') {
  try {
    const saved = localStorage.getItem('be_vui_hoc_custom_audio');
    if (saved) {
      Object.assign(customAudioRegistry, JSON.parse(saved));
    }
  } catch {
    // ignore
  }
}

// Web Audio synthesizer context for cheerful chimes and game sound effects
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export const SoundFX = {
  playPop() {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    } catch {
      // Audio fallback silent
    }
  },

  playCorrectChime() {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 (Bright cheerful C major chord)

      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.07);

        gain.gain.setValueAtTime(0, now + i * 0.07);
        gain.gain.linearRampToValueAtTime(0.35, now + i * 0.07 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.07);
        osc.stop(now + i * 0.07 + 0.36);
      });
    } catch {
      // Audio fallback silent
    }
  },

  playTryAgain() {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const notes = [392.0, 349.23]; // G4, F4 gentle bell
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.12);

        gain.gain.setValueAtTime(0, now + i * 0.12);
        gain.gain.linearRampToValueAtTime(0.2, now + i * 0.12 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 0.3);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.12);
        osc.stop(now + i * 0.12 + 0.31);
      });
    } catch {
      // Audio fallback silent
    }
  },

  playFanfare() {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const melody = [
        { f: 523.25, d: 0.12 },
        { f: 659.25, d: 0.12 },
        { f: 783.99, d: 0.12 },
        { f: 1046.5, d: 0.35 },
        { f: 880.0, d: 0.15 },
        { f: 1046.5, d: 0.5 }
      ];

      let t = now;
      melody.forEach((n) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(n.f, t);

        gain.gain.setValueAtTime(0.3, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + n.d);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + n.d);
        t += n.d + 0.03;
      });
    } catch {
      // Audio fallback silent
    }
  },

  playStarSparkle() {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      for (let i = 0; i < 5; i++) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200 + i * 280, now + i * 0.06);

        gain.gain.setValueAtTime(0.18, now + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.18);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.06);
        osc.stop(now + i * 0.06 + 0.2);
      }
    } catch {
      // Audio fallback silent
    }
  }
};

// Fallback Web Speech Synthesis with voice priority
let cachedVoices: SpeechSynthesisVoice[] = [];

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  cachedVoices = window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    cachedVoices = window.speechSynthesis.getVoices();
  };
}

function findVoice(langPrefix: string): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
  const voices = cachedVoices.length > 0 ? cachedVoices : window.speechSynthesis.getVoices();
  if (voices.length === 0) return null;

  // Prefer Google or Microsoft high-quality voices if present
  const highQuality = voices.find(
    (v) =>
      v.lang.toLowerCase().replace('_', '-').startsWith(langPrefix.toLowerCase()) &&
      (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Online'))
  );
  if (highQuality) return highQuality;

  const exact = voices.find((v) =>
    v.lang.toLowerCase().replace('_', '-').startsWith(langPrefix.toLowerCase())
  );
  if (exact) return exact;

  const generic = voices.find((v) =>
    v.lang.toLowerCase().startsWith(langPrefix.slice(0, 2).toLowerCase())
  );
  return generic || null;
}

// Active speech session tracker & timeout management
let currentSpeechSessionId = 0;
let serverTTSAvailable: boolean | null = null;
const activeSpeechTimeouts = new Set<ReturnType<typeof setTimeout>>();

function clearAllSpeechTimeouts() {
  activeSpeechTimeouts.forEach((t) => clearTimeout(t));
  activeSpeechTimeouts.clear();
}

function safeSpeechTimeout(fn: () => void, delay: number, sessionId: number): ReturnType<typeof setTimeout> {
  const timer = setTimeout(() => {
    activeSpeechTimeouts.delete(timer);
    if (sessionId === currentSpeechSessionId) {
      fn();
    }
  }, delay);
  activeSpeechTimeouts.add(timer);
  return timer;
}

export function stopSpeaking() {
  currentSpeechSessionId++;
  clearAllSpeechTimeouts();

  if (currentPlayingAudio) {
    try {
      currentPlayingAudio.onended = null;
      currentPlayingAudio.onerror = null;
      currentPlayingAudio.pause();
      currentPlayingAudio.currentTime = 0;
      currentPlayingAudio.src = '';
    } catch {
      // ignore
    }
    currentPlayingAudio = null;
  }
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
    } catch {
      // ignore
    }
  }
}

// Play audio via HTML5 Audio element with session tracking
function playAudioSource(src: string, sessionId: number, onEnd?: () => void): boolean {
  if (sessionId !== currentSpeechSessionId) return false;

  try {
    if (currentPlayingAudio) {
      currentPlayingAudio.onended = null;
      currentPlayingAudio.onerror = null;
      try {
        currentPlayingAudio.pause();
        currentPlayingAudio.src = '';
      } catch {}
      currentPlayingAudio = null;
    }

    const audio = new Audio(src);
    currentPlayingAudio = audio;

    audio.onended = () => {
      if (sessionId === currentSpeechSessionId) {
        currentPlayingAudio = null;
        onEnd?.();
      }
    };

    audio.onerror = () => {
      if (sessionId === currentSpeechSessionId) {
        currentPlayingAudio = null;
        onEnd?.();
      }
    };

    audio.play().catch(() => {
      // If aborted or interrupted because of a new session, do NOT call onEnd
      if (sessionId === currentSpeechSessionId) {
        currentPlayingAudio = null;
        onEnd?.();
      }
    });

    return true;
  } catch {
    if (sessionId === currentSpeechSessionId) {
      onEnd?.();
    }
    return false;
  }
}

// Speak text using High-Quality Server Gemini TTS, with Web Speech fallback
export async function speakSpeech(
  text: string,
  lang: 'vi' | 'en',
  onEnd?: () => void,
  existingSessionId?: number
): Promise<void> {
  const clean = text.trim();
  if (!clean) {
    onEnd?.();
    return;
  }

  let sessionId = existingSessionId;
  if (sessionId === undefined) {
    stopSpeaking();
    sessionId = currentSpeechSessionId;
  }

  if (sessionId !== currentSpeechSessionId) return;

  // 1. Check custom uploaded/recorded audio first
  const customSrc = getCustomAudio(clean.toLowerCase());
  if (customSrc) {
    if (sessionId !== currentSpeechSessionId) return;
    playAudioSource(customSrc, sessionId, onEnd);
    return;
  }

  // 2. Check in-memory base64 cache
  const cacheKey = `${lang}:${clean.toLowerCase()}`;
  if (audioClipCache.has(cacheKey)) {
    if (sessionId !== currentSpeechSessionId) return;
    const cachedUrl = audioClipCache.get(cacheKey)!;
    playAudioSource(cachedUrl, sessionId, onEnd);
    return;
  }

  // 3. Request high quality TTS from backend (if available)
  if (serverTTSAvailable !== false) {
    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: clean,
          lang,
          voice: lang === 'vi' ? 'Kore' : 'Puck'
        })
      });

      // Check if another speech request cancelled this in-flight request
      if (sessionId !== currentSpeechSessionId) {
        return;
      }

      if (res.ok && res.status === 200) {
        serverTTSAvailable = true;
        const data = await res.json();
        if (sessionId !== currentSpeechSessionId) return;

        if (data && data.audio) {
          const mime = data.mimeType || 'audio/mpeg';
          const audioSrc = `data:${mime};base64,${data.audio}`;
          audioClipCache.set(cacheKey, audioSrc);
          playAudioSource(audioSrc, sessionId, onEnd);
          return;
        }
      } else if (res.status === 404) {
        // Backend TTS route not deployed in this environment (e.g. static host without serverless)
        serverTTSAvailable = false;
      }
    } catch {
      // Graceful fallback to client SpeechSynthesis
      serverTTSAvailable = false;
    }
  }

  if (sessionId !== currentSpeechSessionId) return;

  // 4. Fallback to Web Speech API
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      const utterance = new SpeechSynthesisUtterance(clean);
      utterance.lang = lang === 'vi' ? 'vi-VN' : 'en-US';
      utterance.rate = 0.9;
      utterance.pitch = 1.1;

      const voice = findVoice(lang === 'vi' ? 'vi' : 'en');
      if (voice) utterance.voice = voice;

      utterance.onend = () => {
        if (sessionId === currentSpeechSessionId) {
          onEnd?.();
        }
      };

      utterance.onerror = (e) => {
        // If canceled or interrupted by next answer selection, do NOT trigger onEnd
        if (e.error === 'interrupted' || e.error === 'canceled') {
          return;
        }
        if (sessionId === currentSpeechSessionId) {
          onEnd?.();
        }
      };

      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }

      window.speechSynthesis.speak(utterance);
      return;
    } catch {
      if (sessionId === currentSpeechSessionId) {
        onEnd?.();
      }
    }
  } else {
    if (sessionId === currentSpeechSessionId) {
      onEnd?.();
    }
  }
}

export const speakText = (text: string, lang: 'vi-VN' | 'en-US' | 'vi' | 'en', onEnd?: () => void) => {
  const normalizedLang: 'vi' | 'en' = lang.toString().startsWith('vi') ? 'vi' : 'en';
  return speakSpeech(text, normalizedLang, onEnd);
};

/**
 * Question Prompt Audio:
 * Vietnamese: "Bé hãy tìm: [Con Mèo]!"
 * English: ONLY the target keyword "[Cat]!" (NO question sentence in English per user requirement!)
 */
export function speakFindPrompt(params: {
  nameVi: string;
  nameEn: string;
  mode: AudioLanguageMode;
  onEnd?: () => void;
}) {
  stopSpeaking();
  const sessionId = currentSpeechSessionId;
  const { nameVi, nameEn, mode, onEnd } = params;

  if (mode === 'vi') {
    // Chỉ đọc câu hỏi tiếng Việt
    speakSpeech(`Bé hãy tìm: ${nameVi}!`, 'vi', () => {
      if (sessionId === currentSpeechSessionId) onEnd?.();
    }, sessionId);
  } else if (mode === 'en') {
    // CHỈ phát âm từ khóa đáp án bằng tiếng Anh (không đọc câu hỏi tiếng Anh)
    speakSpeech(nameEn, 'en', () => {
      if (sessionId === currentSpeechSessionId) onEnd?.();
    }, sessionId);
  } else {
    // Chế độ Song Ngữ:
    // 1. Đọc câu hỏi tiếng Việt: "Bé hãy tìm: Con Mèo!"
    // 2. Sau đó CHỈ đọc từ khóa tiếng Anh: "Cat!" (Không đọc "Find the Cat")
    speakSpeech(`Bé hãy tìm: ${nameVi}!`, 'vi', () => {
      if (sessionId !== currentSpeechSessionId) return;
      safeSpeechTimeout(() => {
        if (sessionId !== currentSpeechSessionId) return;
        speakSpeech(nameEn, 'en', () => {
          if (sessionId === currentSpeechSessionId) onEnd?.();
        }, sessionId);
      }, 350, sessionId);
    }, sessionId);
  }
}

/**
 * Pronounce Card (when toddler taps speaker on card):
 * Vietnamese: [nameVi]
 * English: ONLY the target keyword [nameEn]
 */
export function pronounceItem(
  nameVi: string,
  nameEn: string,
  mode: AudioLanguageMode,
  onEnd?: () => void
) {
  stopSpeaking();
  const sessionId = currentSpeechSessionId;

  if (mode === 'vi') {
    speakSpeech(nameVi, 'vi', () => {
      if (sessionId === currentSpeechSessionId) onEnd?.();
    }, sessionId);
  } else if (mode === 'en') {
    speakSpeech(nameEn, 'en', () => {
      if (sessionId === currentSpeechSessionId) onEnd?.();
    }, sessionId);
  } else {
    // Both: Vietnamese name, then English keyword
    speakSpeech(nameVi, 'vi', () => {
      if (sessionId !== currentSpeechSessionId) return;
      safeSpeechTimeout(() => {
        if (sessionId !== currentSpeechSessionId) return;
        speakSpeech(nameEn, 'en', () => {
          if (sessionId === currentSpeechSessionId) onEnd?.();
        }, sessionId);
      }, 300, sessionId);
    }, sessionId);
  }
}

const PRAISE_PHRASES_VI = [
  'Hoan hô bé! Đúng rồi!',
  'Chính xác rồi! Bé thông minh!',
  'Hoan hô bé! Bé giỏi quá!',
  'Đúng rồi! Bé xuất sắc quá!'
];

/**
 * Praise on Correct Answer:
 * Vietnamese praise sentence + nameVi
 * Then English keyword nameEn
 * Example: "Hoan hô bé! Đúng rồi! Con Mèo - Cat"
 */
export function speakPraise(
  nameVi: string,
  nameEn: string,
  mode: AudioLanguageMode,
  onEnd?: () => void
) {
  stopSpeaking();
  const sessionId = currentSpeechSessionId;
  const randomVi = PRAISE_PHRASES_VI[Math.floor(Math.random() * PRAISE_PHRASES_VI.length)];

  if (mode === 'vi') {
    speakSpeech(`${randomVi} ${nameVi}!`, 'vi', () => {
      if (sessionId === currentSpeechSessionId) onEnd?.();
    }, sessionId);
  } else if (mode === 'en') {
    speakSpeech(`Good job! ${nameEn}!`, 'en', () => {
      if (sessionId === currentSpeechSessionId) onEnd?.();
    }, sessionId);
  } else {
    // Song ngữ: Đọc tiếng Việt đầy đủ lời khen + tên tiếng Việt, rồi phát âm từ khóa tiếng Anh
    // Ví dụ: "Hoan hô bé! Đúng rồi! Con Mèo!" ... "Cat!"
    speakSpeech(`${randomVi} ${nameVi}!`, 'vi', () => {
      if (sessionId !== currentSpeechSessionId) return;
      safeSpeechTimeout(() => {
        if (sessionId !== currentSpeechSessionId) return;
        speakSpeech(nameEn, 'en', () => {
          if (sessionId === currentSpeechSessionId) onEnd?.();
        }, sessionId);
      }, 300, sessionId);
    }, sessionId);
  }
}

const TRY_AGAIN_PHRASES_VI = [
  'Bé thử lại nào, sắp đúng rồi!',
  'Không sao đâu, bé chọn lại nhé!',
  'Cố lên nào bé ơi!'
];

export function speakEncouragement(mode: AudioLanguageMode, onEnd?: () => void) {
  stopSpeaking();
  const sessionId = currentSpeechSessionId;
  const randomVi = TRY_AGAIN_PHRASES_VI[Math.floor(Math.random() * TRY_AGAIN_PHRASES_VI.length)];

  if (mode === 'en') {
    speakSpeech('Try again!', 'en', () => {
      if (sessionId === currentSpeechSessionId) onEnd?.();
    }, sessionId);
  } else {
    speakSpeech(randomVi, 'vi', () => {
      if (sessionId === currentSpeechSessionId) onEnd?.();
    }, sessionId);
  }
}
