import React from 'react';
import { StickerReward } from '../types.ts';
import { SoundFX, speakText } from '../utils/audio.ts';
import { Award, Star, X, Lock, Sparkles } from 'lucide-react';

interface StickerAlbumModalProps {
  isOpen: boolean;
  onClose: () => void;
  allStickers: StickerReward[];
  unlockedStickerIds: string[];
  totalStars: number;
}

export const StickerAlbumModal: React.FC<StickerAlbumModalProps> = ({
  isOpen,
  onClose,
  allStickers,
  unlockedStickerIds,
  totalStars
}) => {
  if (!isOpen) return null;

  const handleTapSticker = (sticker: StickerReward, isUnlocked: boolean) => {
    if (isUnlocked) {
      SoundFX.playStarSparkle();
      speakText(`${sticker.titleVi}!`, 'vi-VN', () => {
        speakText(sticker.titleEn, 'en-US');
      });
    } else {
      SoundFX.playTryAgain();
      speakText(`Bé cần ${sticker.requiredStars} ngôi sao để mở khóa nhé!`, 'vi-VN');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-pop">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-amber-100 via-white to-amber-50 rounded-3xl p-5 sm:p-6 shadow-2xl border-4 border-amber-300 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-amber-200">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-400 text-amber-950 rounded-2xl shadow-xs">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-amber-950">
                Bộ Sưu Tập Nhãn Dán
              </h2>
              <p className="text-xs text-slate-500 font-bold">
                Đã mở: {unlockedStickerIds.length}/{allStickers.length} nhãn dán
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 px-2.5 py-1 bg-yellow-400 text-yellow-950 font-black text-xs rounded-full shadow-xs">
              <Star className="w-3.5 h-3.5 fill-yellow-600 text-yellow-700" />
              <span>{totalStars}</span>
            </div>

            <button
              onClick={() => {
                SoundFX.playPop();
                onClose();
              }}
              className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full cursor-pointer active:scale-90 transition"
              aria-label="Đóng bộ sưu tập"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sticker Cards Grid */}
        <div className="flex-1 overflow-y-auto py-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {allStickers.map((sticker) => {
            const isUnlocked = unlockedStickerIds.includes(sticker.id);

            return (
              <div
                key={sticker.id}
                onClick={() => handleTapSticker(sticker, isUnlocked)}
                className={`relative p-3.5 rounded-2xl flex flex-col items-center text-center cursor-pointer select-none transition-all ${
                  isUnlocked
                    ? 'bg-gradient-to-b from-amber-50 to-white border-2 border-amber-300 shadow-sm hover:scale-103 active:scale-95'
                    : 'bg-slate-100/80 border-2 border-dashed border-slate-300 opacity-60'
                }`}
              >
                {/* Badge Emoji */}
                <div className="text-4xl sm:text-5xl my-1 relative">
                  {isUnlocked ? (
                    sticker.badgeEmoji
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center">
                      <Lock className="w-5 h-5 text-slate-400" />
                    </div>
                  )}
                  {isUnlocked && (
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 absolute -top-1 -right-1 animate-spin" style={{ animationDuration: '5s' }} />
                  )}
                </div>

                {/* Sticker Title */}
                <div className="text-xs sm:text-sm font-black text-slate-800 leading-tight">
                  {sticker.titleVi}
                </div>
                <div className="text-[10px] text-sky-700 font-bold leading-tight">
                  {sticker.titleEn}
                </div>

                {/* Unlock status */}
                <div className="mt-2 w-full">
                  {isUnlocked ? (
                    <span className="inline-block px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-black rounded-full">
                      ✓ Đã nhận
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-0.5 px-2 py-0.5 bg-amber-200 text-amber-900 text-[10px] font-extrabold rounded-full">
                      <Star className="w-2.5 h-2.5 fill-amber-600 text-amber-700" />
                      Cần {sticker.requiredStars} sao
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer encouragement */}
        <div className="pt-2 border-t border-amber-200 text-center">
          <p className="text-xs text-amber-900 font-bold">
            Chơi thêm nhiều trò để thu thập đủ trọn bộ nhãn dán xinh xắn nhé! ✨
          </p>
        </div>
      </div>
    </div>
  );
};
