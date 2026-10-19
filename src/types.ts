export type Category = 'animals' | 'fruits' | 'vehicles' | 'colors' | 'shapes';

export type AudioLanguageMode = 'bilingual' | 'vi' | 'en';

export type DifficultyLevel = 1 | 2 | 3 | 4;

export interface GameItem {
  id: string;
  category: Category;
  nameVi: string;
  nameEn: string;
  phoneticVi: string;
  phoneticEn: string;
  funFactVi: string;
  funFactEn: string;
  colorBg: string;
  colorBorder: string;
  soundType?: 'bark' | 'meow' | 'trumpet' | 'roar' | 'quack' | 'vroom' | 'bell' | 'train' | 'whoosh' | 'pop' | 'chime';
}

export interface CategoryInfo {
  id: Category;
  titleVi: string;
  titleEn: string;
  iconName: string;
  color: string;
  bgLight: string;
  descriptionVi: string;
  descriptionEn: string;
}

export interface ItemStat {
  attempts: number;
  correct: number;
  misses: number;
  lastPlayed: number;
}

export interface CategoryStat {
  attempts: number;
  correct: number;
  misses: number;
}

export interface UserProgress {
  totalStars: number;
  gamesPlayed: number;
  currentStreak: number;
  highestStreak: number;
  categoryStats: Record<Category, CategoryStat>;
  itemStats: Record<string, ItemStat>;
  unlockedStickers: string[];
}

export interface QuestionData {
  targetItem: GameItem;
  options: GameItem[];
  category: Category | 'mixed';
  level: DifficultyLevel;
}

export interface SmartRecommendation {
  hasRecommendation: boolean;
  category: Category | null;
  categoryTitleVi: string;
  categoryTitleEn: string;
  weakCount: number;
  reasonVi: string;
  reasonEn: string;
  weakItemIds: string[];
}

export interface StickerReward {
  id: string;
  titleVi: string;
  titleEn: string;
  requiredStars: number;
  itemId: string;
  badgeEmoji: string;
  quoteVi: string;
  quoteEn: string;
}
