import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  AudioLanguageMode,
  Category,
  DifficultyLevel,
  GameItem,
  QuestionData
} from '../types.ts';
import { ItemIllustration } from './Illustrations.tsx';
import {
  SoundFX,
  speakFindPrompt,
  speakPraise,
  speakEncouragement,
  pronounceItem,
  stopSpeaking
} from '../utils/audio.ts';
import { Volume2, ArrowLeft, Star, Sparkles, CheckCircle2 } from 'lucide-react';

interface GameArenaProps {
  questionData: QuestionData;
  questionNumber: number;
  totalQuestionsInRound: number;
  stars: number;
  currentStreak: number;
  languageMode: AudioLanguageMode;
  onCorrectAnswer: (item: GameItem) => void;
  onWrongAnswer: (item: GameItem) => void;
  onNextQuestion: () => void;
  onExitToMenu: () => void;
  onChangeLanguageMode: (mode: AudioLanguageMode) => void;
  isWeakReviewRound?: boolean;
}

export const GameArena: React.FC<GameArenaProps> = ({
  questionData,
  questionNumber,
  totalQuestionsInRound,
  stars,
  currentStreak,
  languageMode,
  onCorrectAnswer,
  onWrongAnswer,
  onNextQuestion,
  onExitToMenu,
  onChangeLanguageMode,
  isWeakReviewRound = false
}) => {
  const { targetItem, options, level } = questionData;

  const [wrongOptionIds, setWrongOptionIds] = useState<string[]>([]);
  const [isAnsweredCorrectly, setIsAnsweredCorrectly] = useState<boolean>(false);
  const [isSpeakingPrompt, setIsSpeakingPrompt] = useState<boolean>(false);
  const [shakingOptionId, setShakingOptionId] = useState<string | null>(null);

  const autoNextTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Play audio prompt when question changes
  useEffect(() => {
    setWrongOptionIds([]);
    setIsAnsweredCorrectly(false);
    setShakingOptionId(null);

    // Give a 150ms gentle breath before speaking prompt
    const t = setTimeout(() => {
      playCurrentPrompt();
    }, 150);

    return () => {
      clearTimeout(t);
      stopSpeaking();
      if (autoNextTimerRef.current) {
        clearTimeout(autoNextTimerRef.current);
      }
    };
  }, [targetItem.id]);

  const playCurrentPrompt = () => {
    setIsSpeakingPrompt(true);
    SoundFX.playPop();
    speakFindPrompt({
      nameVi: targetItem.nameVi,
      nameEn: targetItem.nameEn,
      mode: languageMode,
      onEnd: () => setIsSpeakingPrompt(false)
    });
  };

  const handleCardClick = (item: GameItem) => {
    if (isAnsweredCorrectly) return;
    if (wrongOptionIds.includes(item.id)) {
      // Re-pronounce card clicked
      pronounceItem(item.nameVi, item.nameEn, languageMode);
      return;
    }

    if (item.id === targetItem.id) {
      // CORRECT!
      setIsAnsweredCorrectly(true);
      SoundFX.playCorrectChime();
      SoundFX.playStarSparkle();

      // Confetti burst
      try {
        confetti({
          particleCount: 45,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // silent fallback
      }

      onCorrectAnswer(item);

      let hasMovedNext = false;
      const advanceToNext = () => {
        if (hasMovedNext) return;
        hasMovedNext = true;
        if (autoNextTimerRef.current) {
          clearTimeout(autoNextTimerRef.current);
          autoNextTimerRef.current = null;
        }
        onNextQuestion();
      };

      // Set a generous safety fallback in case speech is disabled/muted by device
      autoNextTimerRef.current = setTimeout(advanceToNext, 9000);

      // ONLY advance after the full praise ("Hoan hô bé! Đúng rồi! Con Mèo - Cat") finishes speaking!
      speakPraise(targetItem.nameVi, targetItem.nameEn, languageMode, () => {
        if (autoNextTimerRef.current) {
          clearTimeout(autoNextTimerRef.current);
        }
        // Wait 800ms after speech ends so toddler can enjoy their victory
        autoNextTimerRef.current = setTimeout(advanceToNext, 800);
      });
    } else {
      // WRONG! Gentle toddler feedback: wobble card and encourage
      SoundFX.playTryAgain();
      setShakingOptionId(item.id);
      setTimeout(() => setShakingOptionId(null), 600);
      setWrongOptionIds((prev) => [...prev, item.id]);
      speakEncouragement(languageMode);
      onWrongAnswer(item);
    }
  };

  const handleManualPronounceCard = (e: React.MouseEvent, item: GameItem) => {
    e.stopPropagation();
    SoundFX.playPop();
    pronounceItem(item.nameVi, item.nameEn, languageMode);
  };

  // Determine grid columns based on option count and difficulty
  const getGridClasses = () => {
    if (options.length === 2) {
      return 'grid-cols-1 sm:grid-cols-2 max-w-2xl gap-4 sm:gap-6';
    }
    if (options.length === 3) {
      return 'grid-cols-1 sm:grid-cols-3 max-w-3xl gap-3 sm:gap-5';
    }
    if (options.length === 4) {
      return 'grid-cols-2 max-w-2xl gap-3 sm:gap-5';
    }
    // 6 items
    return 'grid-cols-2 sm:grid-cols-3 max-w-4xl gap-3 sm:gap-4';
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-sky-100 via-amber-50 to-emerald-50 flex flex-col justify-between p-3 sm:p-5 select-none">
      {/* Top Navigation HUD */}
      <header className="relative z-10 max-w-4xl w-full mx-auto flex items-center justify-between gap-2">
        {/* Back button */}
        <button
          onClick={() => {
            SoundFX.playPop();
            stopSpeaking();
            onExitToMenu();
          }}
          className="flex items-center gap-1.5 px-3 py-2 bg-white/90 hover:bg-white text-slate-700 text-xs sm:text-sm font-bold rounded-2xl shadow-sm border border-slate-200 active:scale-95 transition cursor-pointer"
          aria-label="Về trang chủ"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden xs:inline">Menu</span>
        </button>

        {/* Round Progress Indicator */}
        <div className="flex items-center gap-2">
          {isWeakReviewRound && (
            <span className="hidden sm:inline-block px-2.5 py-1 bg-rose-100 text-rose-800 text-xs font-black rounded-full border border-rose-200">
              ⚡ Ôn tập điểm yếu
            </span>
          )}

          <div className="px-3 py-1.5 bg-white/90 text-slate-800 text-xs sm:text-sm font-extrabold rounded-2xl shadow-sm border border-slate-200">
            Câu {questionNumber}/{totalQuestionsInRound}
          </div>
        </div>

        {/* Right HUD: Streak & Stars */}
        <div className="flex items-center gap-2">
          {currentStreak > 1 && (
            <div className="hidden xs:flex items-center gap-1 px-2.5 py-1.5 bg-orange-100 text-orange-800 font-black text-xs rounded-full animate-bounce-gentle">
              <span>🔥</span>
              <span>x{currentStreak}</span>
            </div>
          )}

          {/* Star counter */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-400 text-yellow-950 font-black text-xs sm:text-sm rounded-2xl shadow-sm border border-yellow-500">
            <Star className="w-4 h-4 fill-yellow-600 text-yellow-700 animate-spin" style={{ animationDuration: '6s' }} />
            <span className="tabular-nums">{stars}</span>
          </div>

          {/* Quick Language Toggle */}
          <button
            onClick={() => {
              SoundFX.playPop();
              const nextMode: AudioLanguageMode =
                languageMode === 'bilingual' ? 'vi' : languageMode === 'vi' ? 'en' : 'bilingual';
              onChangeLanguageMode(nextMode);
            }}
            className="px-2.5 py-1.5 bg-white/90 text-slate-800 text-xs font-black rounded-2xl shadow-sm border border-slate-200 cursor-pointer active:scale-95 transition"
            title="Đổi ngôn ngữ giọng đọc"
          >
            {languageMode === 'bilingual' && '🇻🇳🇬🇧'}
            {languageMode === 'vi' && '🇻🇳'}
            {languageMode === 'en' && '🇬🇧'}
          </button>
        </div>
      </header>

      {/* Center Question Prompt Box */}
      <main className="relative z-10 max-w-4xl w-full mx-auto my-auto flex flex-col items-center">
        {/* Toddler Big Friendly Question Banner */}
        <div className="w-full max-w-xl mb-4 sm:mb-6">
          <div
            onClick={playCurrentPrompt}
            className={`cursor-pointer group relative p-4 sm:p-5 rounded-3xl shadow-lg border-4 transition-all ${
              isSpeakingPrompt
                ? 'bg-amber-100 border-amber-400 scale-102 ring-4 ring-amber-200'
                : 'bg-white border-amber-300 hover:border-amber-400'
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              {/* Speaker Button */}
              <button
                type="button"
                className={`p-3 sm:p-4 rounded-2xl transition active:scale-95 ${
                  isSpeakingPrompt
                    ? 'bg-amber-500 text-white animate-bounce-gentle'
                    : 'bg-amber-400 hover:bg-amber-500 text-amber-950'
                }`}
                aria-label="Nghe lại lời nhắc"
              >
                <Volume2 className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>

              {/* Text Prompts */}
              <div className="flex-1 text-center sm:text-left">
                <span className="text-xs uppercase font-extrabold tracking-wider text-amber-800 block mb-0.5">
                  Bé hãy tìm hình:
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-amber-950 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <span>{targetItem.nameVi}</span>
                  <span className="text-lg sm:text-2xl font-bold text-sky-700">
                    &bull; {targetItem.nameEn}
                  </span>
                </h2>
              </div>

              {/* Replay Hint Icon */}
              <div className="hidden sm:flex flex-col items-center text-[10px] text-amber-700 font-extrabold opacity-75 group-hover:opacity-100">
                <Sparkles className="w-4 h-4 text-amber-500 mb-0.5" />
                <span>Chạm nghe</span>
              </div>
            </div>
          </div>
        </div>

        {/* Options Cards Grid */}
        <div className={`grid w-full mx-auto ${getGridClasses()}`}>
          {options.map((item) => {
            const isTarget = item.id === targetItem.id;
            const isWrong = wrongOptionIds.includes(item.id);
            const isShaking = shakingOptionId === item.id;
            const isCorrectSelected = isAnsweredCorrectly && isTarget;

            return (
              <div
                key={item.id}
                onClick={() => handleCardClick(item)}
                className={`group relative rounded-3xl p-4 sm:p-6 transition-all duration-200 flex flex-col items-center justify-center cursor-pointer select-none toddler-btn-shadow ${
                  isShaking ? 'animate-wiggle' : ''
                } ${
                  isCorrectSelected
                    ? 'bg-emerald-100 border-4 border-emerald-500 scale-105 shadow-2xl ring-8 ring-emerald-300/40'
                    : isWrong
                    ? 'opacity-40 grayscale-40 border-2 border-dashed border-slate-300 pointer-events-none'
                    : 'bg-white hover:bg-amber-50/80 border-4 border-slate-200 hover:border-amber-400 active:scale-95'
                }`}
                style={{
                  minHeight: options.length <= 2 ? '220px' : options.length <= 4 ? '180px' : '150px'
                }}
                data-testid={`card-${item.id}`}
                role="button"
                tabIndex={0}
                aria-label={`Chọn ${item.nameVi} - ${item.nameEn}`}
              >
                {/* Illustration with cute soft background */}
                <div
                  className="w-full flex items-center justify-center py-2 sm:py-3 rounded-2xl mb-2 sm:mb-3"
                  style={{ backgroundColor: item.colorBg }}
                >
                  <ItemIllustration
                    itemId={item.id}
                    className={
                      options.length <= 2
                        ? 'w-28 h-28 sm:w-36 sm:h-36 drop-shadow-sm'
                        : options.length <= 4
                        ? 'w-24 h-24 sm:w-28 sm:h-28 drop-shadow-sm'
                        : 'w-20 h-20 sm:w-24 sm:h-24 drop-shadow-sm'
                    }
                  />
                </div>

                {/* Bilingual Text Labels */}
                <div className="w-full text-center">
                  <div className="text-lg sm:text-xl font-black text-slate-800 group-hover:text-amber-950 leading-tight">
                    {item.nameVi}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-sky-700 leading-tight mt-0.5">
                    {item.nameEn}
                  </div>
                </div>

                {/* Speaker icon to replay word individually */}
                <button
                  type="button"
                  onClick={(e) => handleManualPronounceCard(e, item)}
                  className="absolute top-2.5 right-2.5 p-1.5 sm:p-2 bg-white/90 hover:bg-white text-slate-500 hover:text-sky-600 rounded-full shadow-xs border border-slate-200 transition cursor-pointer active:scale-90"
                  aria-label={`Nghe phát âm ${item.nameVi}`}
                  title="Nghe phát âm"
                >
                  <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>

                {/* Correct celebration checkmark overlay */}
                {isCorrectSelected && (
                  <div className="absolute inset-0 bg-emerald-500/15 rounded-3xl flex items-center justify-center pointer-events-none animate-pop">
                    <div className="p-3 bg-emerald-500 text-white rounded-full shadow-xl">
                      <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Correct Answer Fun Fact Celebration Banner */}
        {isAnsweredCorrectly && (
          <div className="w-full max-w-lg mt-4 bg-emerald-500 text-white p-3.5 sm:p-4 rounded-2xl shadow-xl flex items-center justify-between gap-3 animate-pop">
            <div className="flex items-center gap-3">
              <span className="text-3xl animate-bounce-gentle">🎉</span>
              <div>
                <p className="text-xs sm:text-sm font-black text-emerald-100 uppercase">
                  Hoan hô bé! Đúng rồi! ⭐
                </p>
                <p className="text-base sm:text-lg font-black leading-snug">
                  {targetItem.nameVi} &bull; {targetItem.nameEn}
                </p>
                <p className="text-xs text-emerald-100 font-bold mt-0.5">
                  {targetItem.funFactVi}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                if (autoNextTimerRef.current) clearTimeout(autoNextTimerRef.current);
                onNextQuestion();
              }}
              className="px-3.5 py-2 bg-white text-emerald-800 font-black text-xs sm:text-sm rounded-xl shadow-md hover:bg-emerald-50 active:scale-95 transition cursor-pointer shrink-0"
            >
              Tiếp tục ➔
            </button>
          </div>
        )}
      </main>

      {/* Arena Footer Safe Badge */}
      <footer className="relative z-10 text-center py-1 text-xs text-slate-400 font-medium">
        <span>Bé Vui Học &bull; 100% An toàn không quảng cáo</span>
      </footer>
    </div>
  );
};
