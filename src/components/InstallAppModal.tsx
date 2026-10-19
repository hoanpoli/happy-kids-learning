import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall.ts';
import { SoundFX } from '../utils/audio.ts';
import { Smartphone, Download, Check, Copy, X, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';

interface InstallAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallAppModal: React.FC<InstallAppModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.origin : '';

  const handleCopyUrl = () => {
    SoundFX.playPop();
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleTriggerInstall = async () => {
    SoundFX.playPop();
    const success = await install();
    if (success) {
      SoundFX.playCorrectChime();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs animate-pop">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-5 sm:p-6 shadow-2xl border-4 border-emerald-300 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-2xl">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-800">
                Cài Đặt Lên Điện Thoại & Tạo File APK
              </h2>
              <p className="text-xs text-emerald-600 font-bold">
                Mở toàn màn hình, có biểu tượng riêng như ứng dụng tải từ Play Store
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              SoundFX.playPop();
              onClose();
            }}
            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full cursor-pointer transition active:scale-90"
            aria-label="Đóng bảng hướng dẫn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="flex-1 overflow-y-auto py-3 space-y-4 pr-1">
          {/* Option 1: Direct Install on Android / Phone */}
          <div className="p-4 bg-gradient-to-br from-emerald-50 via-teal-50 to-white rounded-2xl border-2 border-emerald-200 shadow-xs">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 bg-emerald-600 text-white text-[11px] font-black rounded-md">
                CÁCH 1 (NHANH NHẤT - KHUYÊN DÙNG)
              </span>
              <span className="text-xs font-bold text-emerald-800">Cài đặt trực tiếp (PWA App)</span>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed mb-3">
              Không cần tải file APK phức tạp! Khi cài theo chuẩn PWA, ứng dụng sẽ xuất hiện trên màn hình điện thoại với <strong>biểu tượng gấu trúc riêng</strong>, khởi động <strong>toàn màn hình (không có thanh địa chỉ)</strong> và mượt mà y hệt như ứng dụng cài từ file APK.
            </p>

            {isInstallable ? (
              <button
                onClick={handleTriggerInstall}
                className="w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-sm rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-95 transition cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>BẤM ĐỂ CÀI ĐẶT ỨNG DỤNG NGAY</span>
              </button>
            ) : isInstalled ? (
              <div className="p-2.5 bg-emerald-100 text-emerald-800 text-xs font-extrabold rounded-xl flex items-center justify-center gap-1.5">
                <Check className="w-4 h-4" />
                <span>Ứng dụng đã được cài đặt trên thiết bị của bạn!</span>
              </div>
            ) : isIOS ? (
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 leading-relaxed">
                <span className="font-black block mb-1">📱 Dành cho iPhone / iPad (Safari):</span>
                1. Nhấn vào nút <strong>Chia sẻ (Share - biểu tượng hình vuông có mũi tên lên)</strong> ở thanh dưới Safari.<br />
                2. Cuộn xuống và chọn <strong>&quot;Thêm vào Màn hình chính&quot; (Add to Home Screen)</strong>.<br />
                3. Bấm <strong>Thêm (Add)</strong> ở góc trên bên phải.
              </div>
            ) : (
              <div className="p-3 bg-slate-100 rounded-xl text-xs text-slate-700 leading-relaxed">
                <span className="font-bold text-slate-900 block mb-1">📱 Cách mở trên điện thoại Android:</span>
                1. Mở trình duyệt <strong>Google Chrome</strong> hoặc <strong>Samsung Internet</strong> trên điện thoại.<br />
                2. Truy cập vào đường link bên dưới.<br />
                3. Nhấn vào <strong>nút Menu (ba chấm ⋮)</strong> ở góc trên bên phải &gt; Chọn <strong>&quot;Cài đặt ứng dụng&quot;</strong> hoặc <strong>&quot;Thêm vào màn hình chính&quot;</strong>.
              </div>
            )}
          </div>

          {/* Share/Copy URL box */}
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
            <label className="text-xs font-black text-slate-700 block mb-1.5">
              Đường link ứng dụng để mở trên điện thoại:
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={currentUrl}
                className="flex-1 p-2 bg-white border border-slate-300 rounded-xl text-xs font-mono text-slate-600 select-all"
              />
              <button
                onClick={handleCopyUrl}
                className="px-3 py-2 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 active:scale-95 transition cursor-pointer shrink-0"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Đã chép' : 'Sao chép link'}</span>
              </button>
            </div>
          </div>

          {/* Option 2: Build APK via PWABuilder / Bubblewrap */}
          <div className="p-4 bg-sky-50 rounded-2xl border-2 border-sky-200">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 bg-sky-600 text-white text-[11px] font-black rounded-md">
                CÁCH 2 (XUẤT FILE .APK)
              </span>
              <span className="text-xs font-bold text-sky-900">Đóng gói file .APK chính thức</span>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed mb-3">
              Vì môi trường AI Studio là ứng dụng Web SPA, để tạo file <code>.apk</code> cài đặt độc lập (hoặc đăng lên Google Play Store), ứng dụng đã được thiết lập đầy đủ chuẩn <strong>PWA Manifest và Icon 512x512</strong>. Bạn có thể xuất file APK trong 30 giây:
            </p>

            <ol className="text-xs text-slate-700 space-y-1.5 list-decimal list-inside bg-white p-3 rounded-xl border border-sky-100 mb-3">
              <li>Truy cập công cụ đóng gói APK chính thức: <strong>PWABuilder.com</strong></li>
              <li>Dán đường link web của game (ở ô trên) vào ô tìm kiếm.</li>
              <li>Nhấn <strong>&quot;Package for Android&quot;</strong> và tải file <strong>.apk</strong> về máy!</li>
            </ol>

            <a
              href={`https://www.pwabuilder.com/?url=${encodeURIComponent(currentUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-sky-700 hover:text-sky-900 font-extrabold underline cursor-pointer"
            >
              <span>Mở PWABuilder để tạo file APK ngay</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Safe certification notice */}
          <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
            <p className="text-xs text-amber-900 font-medium">
              Ứng dụng 100% không quảng cáo, tự động lưu tiến độ vào bộ nhớ điện thoại của bé và hoạt động an toàn tuyệt đối.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-100 flex justify-end">
          <button
            onClick={() => {
              SoundFX.playPop();
              onClose();
            }}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white font-extrabold text-xs sm:text-sm rounded-xl cursor-pointer active:scale-95 transition"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
