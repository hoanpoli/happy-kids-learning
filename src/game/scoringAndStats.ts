import type {
  Category,
  CategoryInfo,
  CategoryStat,
  DifficultyLevel,
  GameItem,
  QuestionData,
  SmartRecommendation,
  StickerReward,
  UserProgress
} from '../types.ts';

export const INITIAL_PROGRESS: UserProgress = {
  totalStars: 0,
  gamesPlayed: 0,
  currentStreak: 0,
  highestStreak: 0,
  categoryStats: {
    animals: { attempts: 0, correct: 0, misses: 0 },
    fruits: { attempts: 0, correct: 0, misses: 0 },
    vehicles: { attempts: 0, correct: 0, misses: 0 },
    colors: { attempts: 0, correct: 0, misses: 0 },
    shapes: { attempts: 0, correct: 0, misses: 0 }
  },
  itemStats: {},
  unlockedStickers: []
};

export function updateProgress(
  current: UserProgress,
  itemId: string,
  category: Category,
  isCorrect: boolean
): { updated: UserProgress; starsEarned: number } {
  const starsEarned = isCorrect ? 1 : 0;
  const newTotalStars = current.totalStars + starsEarned;
  const newStreak = isCorrect ? current.currentStreak + 1 : 0;
  const newHighestStreak = Math.max(current.highestStreak, newStreak);

  const prevCatStat = current.categoryStats[category] || { attempts: 0, correct: 0, misses: 0 };
  const updatedCatStat: CategoryStat = {
    attempts: prevCatStat.attempts + 1,
    correct: prevCatStat.correct + (isCorrect ? 1 : 0),
    misses: prevCatStat.misses + (isCorrect ? 0 : 1)
  };

  const prevItemStat = current.itemStats[itemId] || { attempts: 0, correct: 0, misses: 0, lastPlayed: 0 };
  const updatedItemStat = {
    attempts: prevItemStat.attempts + 1,
    correct: prevItemStat.correct + (isCorrect ? 1 : 0),
    misses: prevItemStat.misses + (isCorrect ? 0 : 1),
    lastPlayed: Date.now()
  };

  const updated: UserProgress = {
    ...current,
    totalStars: newTotalStars,
    currentStreak: newStreak,
    highestStreak: newHighestStreak,
    categoryStats: {
      ...current.categoryStats,
      [category]: updatedCatStat
    },
    itemStats: {
      ...current.itemStats,
      [itemId]: updatedItemStat
    }
  };

  return { updated, starsEarned };
}

export function calculateWeakness(
  userProgress: UserProgress,
  allCategories: CategoryInfo[]
): SmartRecommendation {
  const weakItemsByCat: Record<Category, string[]> = {
    animals: [],
    fruits: [],
    vehicles: [],
    colors: [],
    shapes: []
  };

  // Find all items where misses > 0 and accuracy < 60%
  for (const [itemId, stat] of Object.entries(userProgress.itemStats)) {
    if (stat.attempts >= 1 && stat.misses > 0) {
      const accuracy = (stat.correct / stat.attempts) * 100;
      if (accuracy < 70) {
        // Find which category this item belongs to
        for (const cat of allCategories) {
          const catStat = userProgress.categoryStats[cat.id];
          if (catStat && catStat.attempts > 0) {
            // we will group by inspecting the category stats
          }
        }
      }
    }
  }

  // Check category-level weakness:
  // A category is considered weak if:
  // 1. Attempts >= 2 and accuracy (correct / attempts) < 70%
  // 2. OR misses >= 2
  let weakestCategory: Category | null = null;
  let highestMissRate = 0;
  let weakItemIds: string[] = [];

  for (const cat of allCategories) {
    const stat = userProgress.categoryStats[cat.id];
    if (!stat || stat.attempts < 2) continue;

    const missRate = stat.misses / stat.attempts;
    if (missRate > 0.25 && missRate > highestMissRate) {
      highestMissRate = missRate;
      weakestCategory = cat.id;
    }
  }

  // If no category had attempts >= 2 with high miss rate, check if any category has any misses at all
  if (!weakestCategory) {
    for (const cat of allCategories) {
      const stat = userProgress.categoryStats[cat.id];
      if (stat && stat.misses > 0 && stat.misses / Math.max(1, stat.attempts) > highestMissRate) {
        highestMissRate = stat.misses / stat.attempts;
        weakestCategory = cat.id;
      }
    }
  }

  if (weakestCategory) {
    const catInfo = allCategories.find((c) => c.id === weakestCategory)!;
    const catStat = userProgress.categoryStats[weakestCategory];
    const accuracy = Math.round((catStat.correct / Math.max(1, catStat.attempts)) * 100);

    return {
      hasRecommendation: true,
      category: weakestCategory,
      categoryTitleVi: catInfo.titleVi,
      categoryTitleEn: catInfo.titleEn,
      weakCount: catStat.misses,
      reasonVi: `Bé đã trả lời sai ${catStat.misses} lần ở chủ đề này (${accuracy}% đúng). Cùng luyện thêm để trở thành Siêu Sao nhé!`,
      reasonEn: `Needs practice in ${catInfo.titleEn} (${accuracy}% accuracy). Let's review together!`,
      weakItemIds
    };
  }

  return {
    hasRecommendation: false,
    category: null,
    categoryTitleVi: '',
    categoryTitleEn: '',
    weakCount: 0,
    reasonVi: 'Bé đang làm rất tốt mọi chủ đề! Hãy tiếp tục phát huy nhé!',
    reasonEn: 'You are doing great across all topics!',
    weakItemIds: []
  };
}

export function getOptionCountForLevel(level: DifficultyLevel): number {
  switch (level) {
    case 1:
      return 2; // Toddler friendly 2 choices
    case 2:
      return 3; // 3 choices
    case 3:
      return 4; // 4 choices (2x2)
    case 4:
      return 6; // 6 choices (challenge)
    default:
      return 2;
  }
}

export function generateQuestion(params: {
  category: Category | 'mixed';
  level: DifficultyLevel;
  weakOnly?: boolean;
  allItems: GameItem[];
  progress: UserProgress;
  excludeId?: string;
}): QuestionData {
  const { category, level, weakOnly, allItems, progress, excludeId } = params;

  // Filter candidate pool
  let pool = category === 'mixed'
    ? [...allItems]
    : allItems.filter((item) => item.category === category);

  if (pool.length === 0) {
    pool = [...allItems];
  }

  // If weakOnly requested, prioritize items with misses
  let targetPool = [...pool];
  if (weakOnly) {
    const weakItems = pool.filter((item) => {
      const stat = progress.itemStats[item.id];
      return stat && stat.misses > 0;
    });
    if (weakItems.length > 0) {
      targetPool = weakItems;
    }
  }

  // Remove excludeId if we have more than 1 option
  if (excludeId && targetPool.length > 1) {
    targetPool = targetPool.filter((i) => i.id !== excludeId);
  }

  // Pick target item
  const targetItem = targetPool[Math.floor(Math.random() * targetPool.length)];

  // Options count
  const optionCount = Math.min(getOptionCountForLevel(level), pool.length);

  // Distractors from same category if possible, else other categories
  const otherItems = pool.filter((i) => i.id !== targetItem.id);
  const shuffledOthers = [...otherItems].sort(() => Math.random() - 0.5);

  const selectedDistractors = shuffledOthers.slice(0, optionCount - 1);

  // Combine and shuffle options
  const options = [targetItem, ...selectedDistractors].sort(() => Math.random() - 0.5);

  return {
    targetItem,
    options,
    category,
    level
  };
}

export function checkNewlyUnlockedStickers(
  prevUnlocked: string[],
  totalStars: number,
  allStickers: StickerReward[]
): StickerReward[] {
  const newlyUnlocked: StickerReward[] = [];
  for (const sticker of allStickers) {
    if (totalStars >= sticker.requiredStars && !prevUnlocked.includes(sticker.id)) {
      newlyUnlocked.push(sticker);
    }
  }
  return newlyUnlocked;
}
