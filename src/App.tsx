import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  AudioLanguageMode,
  Category,
  DifficultyLevel,
  GameItem,
  QuestionData,
  StickerReward,
  UserProgress
} from './types.ts';
import { CATEGORIES, GAME_ITEMS, STICKER_REWARDS } from './data/items.ts';
import {
  INITIAL_PROGRESS,
  calculateWeakness,
  generateQuestion,
  updateProgress,
  checkNewlyUnlockedStickers
} from './game/scoringAndStats.ts';
import { TitleScreen } from './components/TitleScreen.tsx';
import { GameArena } from './components/GameArena.tsx';
import { CelebrationModal } from './components/CelebrationModal.tsx';
import { StickerAlbumModal } from './components/StickerAlbumModal.tsx';
import { SafetyInfoModal } from './components/SafetyInfoModal.tsx';
import { AudioSettingsModal } from './components/AudioSettingsModal.tsx';
import { SoundFX } from './utils/audio.ts';

const LOCAL_STORAGE_KEY = 'be_vui_hoc_progress_v2';
const QUESTIONS_PER_ROUND = 5;

export default function App() {
  // Load saved progress from localStorage
  const [progress, setProgress] = useState<UserProgress>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          return {
            ...INITIAL_PROGRESS,
            ...parsed,
            categoryStats: {
              ...INITIAL_PROGRESS.categoryStats,
              ...(parsed.categoryStats || {})
            },
            itemStats: parsed.itemStats || {},
            unlockedStickers: parsed.unlockedStickers || []
          };
        }
      } catch {
        // Fallback to initial
      }
    }
    return INITIAL_PROGRESS;
  });

  // Save progress whenever it updates
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Storage error ignore
    }
  }, [progress]);

  // Game configuration
  const [gameState, setGameState] = useState<'title' | 'playing' | 'round_complete'>('title');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'mixed'>('mixed');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>(1);
  const [languageMode, setLanguageMode] = useState<AudioLanguageMode>('bilingual');
  const [isWeakReviewRound, setIsWeakReviewRound] = useState<boolean>(false);

  // Active round state
  const [currentQuestion, setCurrentQuestion] = useState<QuestionData | null>(null);
  const [questionIndex, setQuestionIndex] = useState<number>(1);
  const [starsInRound, setStarsInRound] = useState<number>(0);
  const [newlyUnlockedStickers, setNewlyUnlockedStickers] = useState<StickerReward[]>([]);

  // Modals state
  const [isStickerAlbumOpen, setIsStickerAlbumOpen] = useState(false);
  const [isSafetyInfoOpen, setIsSafetyInfoOpen] = useState(false);
  const [isAudioSettingsOpen, setIsAudioSettingsOpen] = useState(false);

  // Compute smart recommendation based on toddler's historical progress
  const recommendation = useMemo(() => {
    return calculateWeakness(progress, CATEGORIES);
  }, [progress]);

  // Start new round
  const startNewRound = useCallback(
    (weakReview = false, customCategory?: Category | 'mixed', customDifficulty?: DifficultyLevel) => {
      const activeCat = customCategory || selectedCategory;
      const activeDiff = customDifficulty || difficulty;
      setIsWeakReviewRound(weakReview);
      setQuestionIndex(1);
      setStarsInRound(0);
      setNewlyUnlockedStickers([]);

      const initialQ = generateQuestion({
        category: activeCat,
        level: activeDiff,
        weakOnly: weakReview,
        allItems: GAME_ITEMS,
        progress
      });

      setCurrentQuestion(initialQ);
      setGameState('playing');
    },
    [selectedCategory, difficulty, progress]
  );

  // Advance to next question in round
  const handleNextQuestion = useCallback(() => {
    if (questionIndex >= QUESTIONS_PER_ROUND) {
      // Complete round!
      setGameState('round_complete');
      return;
    }

    setQuestionIndex((prev) => prev + 1);
    const nextQ = generateQuestion({
      category: selectedCategory,
      level: difficulty,
      weakOnly: isWeakReviewRound,
      allItems: GAME_ITEMS,
      progress,
      excludeId: currentQuestion?.targetItem.id
    });
    setCurrentQuestion(nextQ);
  }, [questionIndex, selectedCategory, difficulty, isWeakReviewRound, progress, currentQuestion]);

  // Handle correct answer
  const handleCorrectAnswer = useCallback(
    (item: GameItem) => {
      const { updated, starsEarned } = updateProgress(progress, item.id, item.category, true);

      // Check if newly unlocked stickers
      const newlyEarned = checkNewlyUnlockedStickers(
        progress.unlockedStickers,
        updated.totalStars,
        STICKER_REWARDS
      );

      if (newlyEarned.length > 0) {
        updated.unlockedStickers = [
          ...updated.unlockedStickers,
          ...newlyEarned.map((s) => s.id)
        ];
        setNewlyUnlockedStickers((prev) => [...prev, ...newlyEarned]);
      }

      setStarsInRound((prev) => prev + starsEarned);
      setProgress(updated);
    },
    [progress]
  );

  // Handle incorrect answer
  const handleWrongAnswer = useCallback(
    (item: GameItem) => {
      const { updated } = updateProgress(progress, item.id, item.category, false);
      setProgress(updated);
    },
    [progress]
  );

  // Reset progress handler
  const handleResetProgress = () => {
    setProgress(INITIAL_PROGRESS);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  // Keyboard shortcut support (Space or Enter to start on Title screen, Esc to return)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState === 'title' && !isStickerAlbumOpen && !isSafetyInfoOpen && !isAudioSettingsOpen) {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          SoundFX.playPop();
          startNewRound(false);
        }
      } else if (gameState === 'playing') {
        if (e.key === 'Escape') {
          setGameState('title');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, isStickerAlbumOpen, isSafetyInfoOpen, isAudioSettingsOpen, startNewRound]);

  // Handle autostart query parameter for testability
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('autostart') === '1') {
        const catParam = params.get('category') as Category | 'mixed' | null;
        const diffParam = Number(params.get('difficulty')) as DifficultyLevel;
        startNewRound(
          false,
          catParam || 'mixed',
          diffParam >= 1 && diffParam <= 4 ? diffParam : 1
        );
      }
    }
  }, [startNewRound]);

  return (
    <div
      className="min-h-screen w-full bg-slate-900 text-slate-800"
      data-state={gameState}
      data-testid="app-root"
    >
      {gameState === 'title' && (
        <TitleScreen
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          difficulty={difficulty}
          onChangeDifficulty={setDifficulty}
          languageMode={languageMode}
          onChangeLanguageMode={setLanguageMode}
          onStartGame={(weakReview) => startNewRound(weakReview)}
          onOpenStickerAlbum={() => setIsStickerAlbumOpen(true)}
          onOpenSafetyInfo={() => setIsSafetyInfoOpen(true)}
          onOpenAudioSettings={() => setIsAudioSettingsOpen(true)}
          progress={progress}
          recommendation={recommendation}
        />
      )}

      {gameState === 'playing' && currentQuestion && (
        <GameArena
          questionData={currentQuestion}
          questionNumber={questionIndex}
          totalQuestionsInRound={QUESTIONS_PER_ROUND}
          stars={progress.totalStars}
          currentStreak={progress.currentStreak}
          languageMode={languageMode}
          onCorrectAnswer={handleCorrectAnswer}
          onWrongAnswer={handleWrongAnswer}
          onNextQuestion={handleNextQuestion}
          onExitToMenu={() => setGameState('title')}
          onChangeLanguageMode={setLanguageMode}
          isWeakReviewRound={isWeakReviewRound}
        />
      )}

      {/* Round Celebration Modal */}
      <CelebrationModal
        isOpen={gameState === 'round_complete'}
        starsEarnedInRound={starsInRound}
        totalStars={progress.totalStars}
        newStickers={newlyUnlockedStickers}
        onPlayAgain={() => startNewRound(false)}
        onGoHome={() => setGameState('title')}
      />

      {/* Sticker Album Modal */}
      <StickerAlbumModal
        isOpen={isStickerAlbumOpen}
        onClose={() => setIsStickerAlbumOpen(false)}
        allStickers={STICKER_REWARDS}
        unlockedStickerIds={progress.unlockedStickers}
        totalStars={progress.totalStars}
      />

      {/* 100% Ad-Free & Safety Info Modal */}
      <SafetyInfoModal
        isOpen={isSafetyInfoOpen}
        onClose={() => setIsSafetyInfoOpen(false)}
        onResetProgress={handleResetProgress}
      />

      {/* Audio Voice Quality & Custom Upload Modal */}
      <AudioSettingsModal
        isOpen={isAudioSettingsOpen}
        onClose={() => setIsAudioSettingsOpen(false)}
      />
    </div>
  );
}
