import React, { useState } from 'react';
import { ShieldCheck, Database, Volume2, Sparkles, Trash2, X } from 'lucide-react';
import { SoundFX } from '../utils/audio.ts';

interface SafetyInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResetProgress: () => void;
}

export const SafetyInfoModal: React.FC<SafetyInfoModalProps> = ({
  isOpen,
  onClose,
  onResetProgress
}) => {
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  if (!isOpen) return null;

  const handleConfirmReset = () => {
    SoundFX.playPop();
    onResetProgress();
    setShowConfirmReset(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-pop">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-5 sm:p-6 shadow-2xl border-4 border-emerald-300">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-100 text-emerald-700 rounded-2xl">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-800">
                Cam Kết An Toàn Cho Bé
              </h2>
              <span className="text-xs text-emerald-600 font-bold">100% Dành Cho Trẻ Mầm Non</span>
            </div>
          </div>

          <button
            onClick={() => {
              SoundFX.playPop();
              setShowConfirmReset(false);
              onClose();
            }}
            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full cursor-pointer transition active:scale-90"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Feature List */}
        <div className="space-y-3 mb-5">
          <div className="flex items-start gap-3 p-3 bg-emerald-50 rounded-2xl border border-emerald-100">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-black text-emerald-950 block">Không Có Quảng Cáo</span>
              <span className="text-slate-600">
                Tuyệt đối không hiển thị banner quảng cáo, video hay liên kết ngoài ảnh hưởng đến trẻ nhỏ.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-sky-50 rounded-2xl border border-sky-100">
            <Volume2 className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-black text-sky-950 block">Song Ngữ Chuẩn (Việt - Anh)</span>
              <span className="text-slate-600">
                Giọng đọc chuẩn, phát âm to rõ ràng từng từ vựng và câu khen ngợi tạo cảm giác hào hứng cho bé.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-2xl border border-amber-100">
            <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-black text-amber-950 block">Gợi Ý Ôn Tập Thông Minh</span>
              <span className="text-slate-600">
                Hệ thống tự động ghi nhận những từ bé chọn nhầm để đề xuất ôn tập lại đúng trọng tâm.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-indigo-50 rounded-2xl border border-indigo-100">
            <Database className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-black text-indigo-950 block">Lưu Tiến Độ Trên Thiết Bị</span>
              <span className="text-slate-600">
                Toàn bộ số sao, chuỗi đúng và bộ nhãn dán được lưu trực tiếp trên bộ nhớ máy của bạn.
              </span>
            </div>
          </div>
        </div>

        {/* Reset progress area */}
        <div className="pt-3 border-t border-slate-100 text-center">
          {!showConfirmReset ? (
            <button
              onClick={() => setShowConfirmReset(true)}
              className="inline-flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-800 font-bold px-3 py-1.5 bg-rose-50 hover:bg-rose-100 rounded-xl transition cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Đặt lại tiến độ học tập của bé</span>
            </button>
          ) : (
            <div className="p-3 bg-rose-50 rounded-2xl border border-rose-200">
              <p className="text-xs text-rose-800 font-black mb-2">
                Bạn có chắc muốn xóa tất cả số sao và nhãn dán đã thu thập?
              </p>
              <div className="flex justify-center gap-2">
                <button
                  onClick={handleConfirmReset}
                  className="px-3 py-1.5 bg-rose-600 text-white font-extrabold text-xs rounded-xl shadow-xs cursor-pointer active:scale-95"
                >
                  Xóa và bắt đầu lại
                </button>
                <button
                  onClick={() => setShowConfirmReset(false)}
                  className="px-3 py-1.5 bg-white text-slate-600 font-bold text-xs rounded-xl border border-slate-200 cursor-pointer"
                >
                  Hủy
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
