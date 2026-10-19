import React from 'react';
import {
  AudioLanguageMode,
  Category,
  CategoryInfo,
  DifficultyLevel,
  SmartRecommendation,
  UserProgress
} from '../types.ts';
import { SoundFX, speakFindPrompt } from '../utils/audio.ts';
import { Volume2, Star, Sparkles, Award, ShieldCheck, Heart, RefreshCw, Smartphone } from 'lucide-react';

interface TitleScreenProps {
  categories: CategoryInfo[];
  selectedCategory: Category | 'mixed';
  onSelectCategory: (cat: Category | 'mixed') => void;
  difficulty: DifficultyLevel;
  onChangeDifficulty: (lvl: DifficultyLevel) => void;
  languageMode: AudioLanguageMode;
  onChangeLanguageMode: (mode: AudioLanguageMode) => void;
  onStartGame: (weakReview?: boolean) => void;
  onOpenStickerAlbum: () => void;
  onOpenSafetyInfo: () => void;
  onOpenAudioSettings: () => void;
  onOpenInstallApp?: () => void;
  progress: UserProgress;
  recommendation: SmartRecommendation;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  difficulty,
  onChangeDifficulty,
  languageMode,
  onChangeLanguageMode,
  onStartGame,
  onOpenStickerAlbum,
  onOpenSafetyInfo,
  onOpenAudioSettings,
  onOpenInstallApp,
  progress,
  recommendation
}) => {
  const handleTestAudio = () => {
    SoundFX.playCorrectChime();
    speakFindPrompt({
      nameVi: 'Con Mèo',
      nameEn: 'Cat',
      mode: languageMode
    });
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-sky-200 via-amber-50 to-emerald-100 flex flex-col justify-between p-3 sm:p-6 overflow-hidden">
      {/* Decorative Cloud & Nature Backdrops */}
      <div className="absolute top-4 left-6 w-24 h-12 bg-white/70 rounded-full blur-[1px] pointer-events-none animate-float opacity-80" />
      <div className="absolute top-16 right-8 w-32 h-14 bg-white/70 rounded-full blur-[1px] pointer-events-none animate-float opacity-80" style={{ animationDelay: '1.5s' }} />
      <div className="absolute bottom-6 left-12 w-28 h-12 bg-emerald-200/50 rounded-full blur-xl pointer-events-none" />

      {/* Top Header Bar */}
      <header className="relative z-10 max-w-4xl w-full mx-auto flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {/* Safe for Kids Badge */}
          <button
            onClick={onOpenSafetyInfo}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 hover:bg-white text-emerald-700 text-xs sm:text-sm font-bold rounded-full shadow-sm border border-emerald-200 transition active:scale-95 cursor-pointer"
            aria-label="Thông tin an toàn cho bé"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="hidden sm:inline">100% Không quảng cáo</span>
            <span className="sm:hidden">An toàn</span>
          </button>

          {/* Install to Phone / APK button */}
          {onOpenInstallApp && (
            <button
              onClick={() => {
                SoundFX.playPop();
                onOpenInstallApp();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-extrabold rounded-full shadow-sm border border-emerald-700 transition active:scale-95 cursor-pointer"
              aria-label="Cài đặt lên điện thoại hoặc tạo file APK"
            >
              <Smartphone className="w-4 h-4" />
              <span>Cài ĐT / Tải APK</span>
            </button>
          )}
        </div>

        {/* User Progress Badges */}
        <div className="flex items-center gap-2">
          {/* Sticker Album CTA */}
          <button
            onClick={() => {
              SoundFX.playPop();
              onOpenStickerAlbum();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-amber-950 text-xs sm:text-sm font-extrabold rounded-full shadow-md border-2 border-amber-500 active:scale-95 transition cursor-pointer"
            aria-label="Mở bộ sưu tập nhãn dán"
          >
            <Award className="w-4 h-4 text-amber-900" />
            <span className="hidden xs:inline">Nhãn Dán</span>
            <span className="bg-white/80 px-1.5 py-0.5 rounded-full text-xs">
              {progress.unlockedStickers.length}
            </span>
          </button>

          {/* Star Counter */}
          <div className="flex items-center gap-1 px-3 py-1.5 bg-yellow-400/90 text-yellow-950 font-extrabold text-xs sm:text-sm rounded-full shadow-sm border border-yellow-500">
            <Star className="w-4 h-4 fill-yellow-600 text-yellow-700 animate-spin" style={{ animationDuration: '8s' }} />
            <span className="tabular-nums">{progress.totalStars}</span>
          </div>
        </div>
      </header>

      {/* Main Title Hero Section */}
      <main className="relative z-10 max-w-3xl w-full mx-auto my-auto text-center py-4 flex flex-col items-center">
        {/* Animated Mascot & Title Lockup */}
        <div className="relative mb-2">
          <div className="inline-flex items-center justify-center p-3 sm:p-4 bg-white/85 rounded-3xl shadow-xl border-4 border-amber-300">
            <span className="text-4xl sm:text-6xl animate-bounce-gentle inline-block" role="img" aria-label="gấu trúc">
              🐼
            </span>
            <span className="text-3xl sm:text-5xl animate-bounce-gentle inline-block mx-1" style={{ animationDelay: '0.2s' }} role="img" aria-label="cún con">
              🐶
            </span>
            <span className="text-4xl sm:text-6xl animate-bounce-gentle inline-block" style={{ animationDelay: '0.4s' }} role="img" aria-label="mèo con">
              🐱
            </span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-amber-950 drop-shadow-sm tracking-tight mb-1">
          Bé Vui Học
        </h1>
        <p className="text-base sm:text-xl font-bold text-sky-800 mb-4">
          Đoán Hình Song Ngữ Cho Trẻ Nhỏ
        </p>

        {/* Smart Weakness Review Card (If child struggled on a topic) */}
        {recommendation.hasRecommendation && (
          <div className="w-full max-w-lg mb-4 bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 p-1 rounded-2xl shadow-lg animate-pop">
            <div className="bg-white/95 rounded-xl p-3.5 sm:p-4 text-left flex items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-amber-100 rounded-xl text-amber-700">
                  <Sparkles className="w-6 h-6 animate-spin" style={{ animationDuration: '4s' }} />
                </div>
                <div>
                  <div className="inline-block px-2 py-0.5 bg-amber-100 text-amber-900 text-xs font-black rounded-md mb-1">
                    GỢI Ý ÔN TẬP THÔNG MINH ⭐
                  </div>
                  <h2 className="text-sm sm:text-base font-extrabold text-gray-900 leading-snug">
                    Bé luyện thêm: {recommendation.categoryTitleVi} ({recommendation.categoryTitleEn})
                  </h2>
                  <p className="text-xs text-gray-600 mt-0.5">
                    {recommendation.reasonVi}
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  SoundFX.playPop();
                  onSelectCategory(recommendation.category!);
                  onStartGame(true);
                }}
                className="shrink-0 px-3.5 py-2 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md border-b-4 border-rose-700 active:translate-y-1 active:border-b-0 transition cursor-pointer"
              >
                Ôn ngay!
              </button>
            </div>
          </div>
        )}

        {/* Big Start Button */}
        <button
          onClick={() => {
            SoundFX.playPop();
            onStartGame(false);
          }}
          className="group relative px-10 sm:px-14 py-4 sm:py-5 bg-gradient-to-b from-emerald-400 to-emerald-600 hover:from-emerald-300 hover:to-emerald-500 text-white font-black text-2xl sm:text-3xl rounded-full toddler-btn-shadow border-4 border-white cursor-pointer active:scale-95 transition-all mb-5 flex items-center gap-3"
          aria-label="Bắt đầu chơi ngay"
        >
          <span className="text-3xl sm:text-4xl">🎮</span>
          <span>BẮT ĐẦU CHƠI</span>
          <span className="text-3xl sm:text-4xl">✨</span>
        </button>

        {/* Quick Flat Control Hint */}
        <p className="text-xs text-slate-500 mb-4 font-semibold">
          Phím tắt: Nhấn <kbd className="bg-white/80 px-1.5 py-0.5 rounded border border-slate-300 text-slate-700">Phím Cách</kbd> hoặc <kbd className="bg-white/80 px-1.5 py-0.5 rounded border border-slate-300 text-slate-700">Enter</kbd> để bắt đầu
        </p>

        {/* Settings Container: Category, Difficulty, Language */}
        <div className="w-full max-w-xl bg-white/90 backdrop-blur-xs p-4 sm:p-5 rounded-3xl shadow-md border-2 border-sky-100 flex flex-col gap-4">
          {/* Category Selector */}
          <div>
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-xs sm:text-sm font-extrabold text-slate-700 flex items-center gap-1.5">
                <span>📚</span> Chọn chủ đề cho bé:
              </span>
              <button
                onClick={() => {
                  SoundFX.playPop();
                  onSelectCategory('mixed');
                }}
                className={`text-xs font-bold px-2.5 py-1 rounded-full cursor-pointer transition ${
                  selectedCategory === 'mixed'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                }`}
              >
                🎲 Trộn tất cả
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      SoundFX.playPop();
                      onSelectCategory(cat.id);
                    }}
                    className={`p-2.5 rounded-2xl flex flex-col items-center gap-1 text-center transition cursor-pointer border-2 ${
                      isSelected
                        ? 'bg-amber-100 border-amber-500 shadow-sm scale-102 font-black text-amber-950'
                        : 'bg-white border-slate-200 hover:border-amber-300 text-slate-700'
                    }`}
                  >
                    <span className="text-xl">
                      {cat.id === 'animals' && '🐾'}
                      {cat.id === 'fruits' && '🍎'}
                      {cat.id === 'vehicles' && '🚗'}
                      {cat.id === 'colors' && '🎨'}
                      {cat.id === 'shapes' && '⭐'}
                    </span>
                    <span className="text-xs sm:text-sm font-bold leading-tight">
                      {cat.titleVi}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {cat.titleEn}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
            {/* Language Mode Selector */}
            <div>
              <label className="text-xs font-extrabold text-slate-700 block mb-1.5 text-left px-1">
                🗣️ Giọng nói song ngữ:
              </label>
              <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => {
                    SoundFX.playPop();
                    onChangeLanguageMode('bilingual');
                  }}
                  className={`py-1.5 px-1 rounded-lg text-xs font-extrabold transition cursor-pointer ${
                    languageMode === 'bilingual'
                      ? 'bg-white text-indigo-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Phát âm cả tiếng Việt và tiếng Anh"
                >
                  🇻🇳 🇬🇧 Cả hai
                </button>
                <button
                  onClick={() => {
                    SoundFX.playPop();
                    onChangeLanguageMode('vi');
                  }}
                  className={`py-1.5 px-1 rounded-lg text-xs font-extrabold transition cursor-pointer ${
                    languageMode === 'vi'
                      ? 'bg-white text-rose-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Chỉ tiếng Việt"
                >
                  🇻🇳 Tiếng Việt
                </button>
                <button
                  onClick={() => {
                    SoundFX.playPop();
                    onChangeLanguageMode('en');
                  }}
                  className={`py-1.5 px-1 rounded-lg text-xs font-extrabold transition cursor-pointer ${
                    languageMode === 'en'
                      ? 'bg-white text-sky-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Chỉ tiếng Anh"
                >
                  🇬🇧 English
                </button>
              </div>
            </div>

            {/* Difficulty Selector */}
            <div>
              <label className="text-xs font-extrabold text-slate-700 block mb-1.5 text-left px-1">
                🎯 Cấp độ khó:
              </label>
              <div className="grid grid-cols-4 gap-1 bg-slate-100 p-1 rounded-xl">
                {[
                  { lvl: 1, label: '2 ô', desc: 'Dễ' },
                  { lvl: 2, label: '3 ô', desc: 'Vừa' },
                  { lvl: 3, label: '4 ô', desc: 'Khá' },
                  { lvl: 4, label: '6 ô', desc: 'Siêu' }
                ].map(({ lvl, label, desc }) => (
                  <button
                    key={lvl}
                    onClick={() => {
                      SoundFX.playPop();
                      onChangeDifficulty(lvl as DifficultyLevel);
                    }}
                    className={`py-1 px-0.5 rounded-lg text-center cursor-pointer transition ${
                      difficulty === lvl
                        ? 'bg-white text-emerald-700 shadow-xs font-black'
                        : 'text-slate-600 hover:text-slate-900 font-bold'
                    }`}
                  >
                    <div className="text-xs">{label}</div>
                    <div className="text-[9px] text-slate-400">{desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Audio voice test and custom audio button */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <div className="flex items-center gap-2">
              <button
                onClick={handleTestAudio}
                className="inline-flex items-center gap-1.5 text-xs text-sky-700 hover:text-sky-900 font-bold px-2.5 py-1.5 bg-sky-50 hover:bg-sky-100 rounded-xl transition cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5 text-sky-600" />
                <span>Nghe thử phát âm</span>
              </button>

              <button
                onClick={() => {
                  SoundFX.playPop();
                  onOpenAudioSettings();
                }}
                className="inline-flex items-center gap-1.5 text-xs text-amber-800 hover:text-amber-950 font-bold px-2.5 py-1.5 bg-amber-100 hover:bg-amber-200 rounded-xl transition cursor-pointer"
              >
                <span>🎙️</span>
                <span>Tùy chỉnh & Tải file âm thanh</span>
              </button>
            </div>

            <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
              <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
              Dành riêng cho bé 3 tuổi
            </span>
          </div>
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="relative z-10 text-center py-2 text-xs text-slate-500 font-medium">
        <span>Bé Vui Học &bull; Trò chơi giáo dục mầm non an toàn</span>
      </footer>
    </div>
  );
};
