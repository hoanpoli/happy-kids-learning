import test from 'node:test';
import assert from 'node:assert/strict';
import {
  INITIAL_PROGRESS,
  updateProgress,
  calculateWeakness,
  getOptionCountForLevel,
  generateQuestion,
  checkNewlyUnlockedStickers
} from './scoringAndStats.ts';
import { CATEGORIES, GAME_ITEMS, STICKER_REWARDS } from '../data/items.ts';

test('Initial progress has 0 stars and 0 games', () => {
  assert.equal(INITIAL_PROGRESS.totalStars, 0);
  assert.equal(INITIAL_PROGRESS.currentStreak, 0);
  assert.equal(INITIAL_PROGRESS.unlockedStickers.length, 0);
});

test('Correct answer increments stars and streak correctly', () => {
  const { updated, starsEarned } = updateProgress(INITIAL_PROGRESS, 'cat', 'animals', true);
  assert.equal(starsEarned, 1);
  assert.equal(updated.totalStars, 1);
  assert.equal(updated.currentStreak, 1);
  assert.equal(updated.categoryStats.animals.correct, 1);
  assert.equal(updated.categoryStats.animals.misses, 0);
  assert.equal(updated.itemStats.cat.correct, 1);
});

test('Incorrect answer resets streak without removing stars', () => {
  const step1 = updateProgress(INITIAL_PROGRESS, 'cat', 'animals', true);
  const step2 = updateProgress(step1.updated, 'dog', 'animals', false);

  assert.equal(step2.starsEarned, 0);
  assert.equal(step2.updated.totalStars, 1);
  assert.equal(step2.updated.currentStreak, 0);
  assert.equal(step2.updated.highestStreak, 1);
  assert.equal(step2.updated.categoryStats.animals.misses, 1);
  assert.equal(step2.updated.itemStats.dog.misses, 1);
});

test('getOptionCountForLevel scales choices correctly for toddlers', () => {
  assert.equal(getOptionCountForLevel(1), 2); // 2 choices for level 1
  assert.equal(getOptionCountForLevel(2), 3); // 3 choices for level 2
  assert.equal(getOptionCountForLevel(3), 4); // 4 choices for level 3
  assert.equal(getOptionCountForLevel(4), 6); // 6 choices for level 4
});

test('calculateWeakness detects category with high miss rate', () => {
  let progress = INITIAL_PROGRESS;
  // Answer animals correctly 3 times
  progress = updateProgress(progress, 'cat', 'animals', true).updated;
  progress = updateProgress(progress, 'dog', 'animals', true).updated;
  progress = updateProgress(progress, 'lion', 'animals', true).updated;

  // Answer vehicles with 2 misses out of 3 attempts
  progress = updateProgress(progress, 'car', 'vehicles', false).updated;
  progress = updateProgress(progress, 'bus', 'vehicles', false).updated;
  progress = updateProgress(progress, 'train', 'vehicles', true).updated;

  const rec = calculateWeakness(progress, CATEGORIES);
  assert.equal(rec.hasRecommendation, true);
  assert.equal(rec.category, 'vehicles');
  assert.equal(rec.weakCount, 2);
});

test('generateQuestion produces targetItem and correct number of options', () => {
  const q = generateQuestion({
    category: 'animals',
    level: 1,
    allItems: GAME_ITEMS,
    progress: INITIAL_PROGRESS
  });

  assert.ok(q.targetItem);
  assert.equal(q.targetItem.category, 'animals');
  assert.equal(q.options.length, 2); // Level 1 is 2 choices
  assert.ok(q.options.some((opt) => opt.id === q.targetItem.id));
});

test('checkNewlyUnlockedStickers rewards stickers at star milestones', () => {
  const newlyUnlocked = checkNewlyUnlockedStickers([], 5, STICKER_REWARDS);
  // requiredStars for first sticker (cat) is 3
  assert.ok(newlyUnlocked.length >= 1);
  assert.equal(newlyUnlocked[0].id, 'stk_cat');
});
