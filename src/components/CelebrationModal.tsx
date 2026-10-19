import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { StickerReward } from '../types.ts';
import { SoundFX, speakText } from '../utils/audio.ts';
import { Star, Award, RotateCcw, Home } from 'lucide-react';

interface CelebrationModalProps {
  isOpen: boolean;
  starsEarnedInRound: number;
  totalStars: number;
  newStickers: StickerReward[];
  onPlayAgain: () => void;
  onGoHome: () => void;
}

export const CelebrationModal: React.FC<CelebrationModalProps> = ({
  isOpen,
  starsEarnedInRound,
  totalStars,
  newStickers,
  onPlayAgain,
  onGoHome
}) => {
  useEffect(() => {
    if (!isOpen) return;

    SoundFX.playFanfare();
    speakText('Hoan hô bé! Bé đã hoàn thành xuất sắc!', 'vi-VN', () => {
      speakText('Hooray! Fantastic job!', 'en-US');
    });

    // Multiple festive confetti cannons
    try {
      const count = 200;
      const defaults = { origin: { y: 0.7 } };

      function fire(particleRatio: number, opts: confetti.Options) {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio)
        });
      }

      fire(0.25, { spread: 26, startVelocity: 55 });
      fire(0.2, { spread: 60 });
      fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
      fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
      fire(0.1, { spread: 120, startVelocity: 45 });
    } catch {
      // silent
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-pop">
      <div className="relative w-full max-w-md bg-gradient-to-b from-amber-300 via-yellow-100 to-amber-50 rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-amber-400 text-center flex flex-col items-center">
        {/* Celebration Trophy & Star */}
        <div className="relative mb-3">
          <div className="w-24 h-24 bg-gradient-to-tr from-amber-400 to-yellow-200 rounded-full flex items-center justify-center shadow-lg border-4 border-white animate-bounce-gentle">
            <span className="text-5xl" role="img" aria-label="cúp vàng">
              🏆
            </span>
          </div>
          <div className="absolute -top-1 -right-1 p-2 bg-yellow-400 rounded-full border-2 border-white shadow-md animate-spin" style={{ animationDuration: '4s' }}>
            <Star className="w-5 h-5 text-yellow-900 fill-yellow-500" />
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-amber-950 mb-1">
          Hoan Hô Bé Yêu!
        </h2>
        <p className="text-sm sm:text-base font-bold text-sky-800 mb-4">
          Bé đã trả lời rất giỏi và thông minh!
        </p>

        {/* Stars Earned Callout */}
        <div className="w-full bg-white/90 rounded-2xl p-4 shadow-sm border border-amber-200 mb-4 flex items-center justify-around">
          <div>
            <span className="text-xs text-slate-500 font-extrabold block">Điểm vòng này</span>
            <span className="text-2xl font-black text-amber-600 flex items-center justify-center gap-1">
              +{starsEarnedInRound} ⭐
            </span>
          </div>
          <div className="h-8 w-[1px] bg-slate-200" />
          <div>
            <span className="text-xs text-slate-500 font-extrabold block">Tổng ngôi sao</span>
            <span className="text-2xl font-black text-emerald-600 flex items-center justify-center gap-1">
              {totalStars} 🌟
            </span>
          </div>
        </div>

        {/* Newly Unlocked Sticker Reward Alert */}
        {newStickers.length > 0 && (
          <div className="w-full bg-gradient-to-r from-rose-100 via-pink-100 to-purple-100 rounded-2xl p-3.5 border-2 border-rose-300 mb-4 animate-pop">
            <div className="flex items-center gap-2 justify-center mb-1 text-rose-800 font-black text-xs uppercase">
              <Award className="w-4 h-4 text-rose-600" />
              <span>Mở khóa nhãn dán mới!</span>
            </div>
            <div className="text-3xl my-1">{newStickers[0].badgeEmoji}</div>
            <div className="font-black text-slate-900 text-sm">{newStickers[0].titleVi}</div>
            <div className="text-xs text-slate-600 font-bold">{newStickers[0].quoteVi}</div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="w-full flex flex-col sm:flex-row gap-2.5">
          <button
            onClick={() => {
              SoundFX.playPop();
              onPlayAgain();
            }}
            className="flex-1 py-3 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-base sm:text-lg rounded-2xl toddler-btn-shadow border-2 border-white flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Chơi Tiếp</span>
          </button>

          <button
            onClick={() => {
              SoundFX.playPop();
              onGoHome();
            }}
            className="py-3 px-4 bg-white hover:bg-slate-100 text-slate-700 font-black text-base rounded-2xl border-2 border-slate-200 flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition"
          >
            <Home className="w-5 h-5 text-slate-500" />
            <span>Về Menu</span>
          </button>
        </div>
      </div>
    </div>
  );
};
