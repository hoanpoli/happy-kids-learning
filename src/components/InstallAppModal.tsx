import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall.ts';
import { SoundFX } from '../utils/audio.ts';
import { Smartphone, Download, Check, Copy, X, ExternalLink, ShieldCheck, QrCode, Terminal } from 'lucide-react';

interface InstallAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallAppModal: React.FC<InstallAppModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [copied, setCopied] = useState(false);
  const [showCliGuide, setShowCliGuide] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(currentUrl)}`;

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
      <div className="relative w-full max-w-xl bg-white rounded-3xl p-5 sm:p-6 shadow-2xl border-4 border-emerald-300 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-2xl">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-800">
                Cài Đặt Lên Điện Thoại & Xuất File APK
              </h2>
              <p className="text-xs text-emerald-600 font-bold">
                Có biểu tượng ứng dụng riêng &bull; Mở toàn màn hình không có thanh URL
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
          <div className="p-4 bg-gradient-to-br from-emerald-50 via-teal-50 to-white rounded-2xl border-2 border-emerald-300 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="px-2.5 py-1 bg-emerald-600 text-white text-[11px] font-black rounded-lg">
                CÁCH 1: CÀI TRỰC TIẾP (KHUYÊN DÙNG - KHÔNG CẦN CÀI APK)
              </span>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed mb-3">
              Ứng dụng đã đạt chuẩn <strong>Progressive Web App (PWA)</strong>. Khi cài từ trình duyệt, điện thoại sẽ tự động thêm icon <strong>Bé Vui Học</strong> vào màn hình chính, chạy mượt mà toàn màn hình y hệt file APK mà không tốn dung lượng hay lo ngại bảo mật!
            </p>

            {isInstallable ? (
              <button
                onClick={handleTriggerInstall}
                className="w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-sm rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-95 transition cursor-pointer"
              >
                <Download className="w-5 h-5" />
                <span>BẤM VÀO ĐÂY ĐỂ CÀI ĐẶT ỨNG DỤNG NGAY</span>
              </button>
            ) : isInstalled ? (
              <div className="p-2.5 bg-emerald-100 text-emerald-800 text-xs font-extrabold rounded-xl flex items-center justify-center gap-1.5">
                <Check className="w-4 h-4" />
                <span>Ứng dụng đã được cài đặt trên thiết bị của bạn!</span>
              </div>
            ) : isIOS ? (
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 leading-relaxed">
                <span className="font-black block mb-1">📱 Dành cho iPhone / iPad (Safari):</span>
                1. Nhấn nút <strong>Chia sẻ (Share - biểu tượng ô vuông có mũi tên hướng lên)</strong>.<br />
                2. Chọn <strong>&quot;Thêm vào Màn hình chính&quot; (Add to Home Screen)</strong>.<br />
                3. Nhấn <strong>Thêm (Add)</strong> ở góc trên bên phải.
              </div>
            ) : (
              <div className="p-3 bg-white rounded-xl border border-emerald-200 text-xs text-slate-700 leading-relaxed">
                <span className="font-bold text-slate-900 block mb-1">📱 Hướng dẫn trên điện thoại Android:</span>
                1. Mở link bằng trình duyệt <strong>Google Chrome</strong> hoặc <strong>Samsung Internet</strong>.<br />
                2. Nhấn nút <strong>Menu (ba chấm ⋮)</strong> ở góc phải trên &gt; Chọn <strong>&quot;Cài đặt ứng dụng&quot;</strong> (hoặc &quot;Thêm vào màn hình chính&quot;).
              </div>
            )}
          </div>

          {/* QR Code and Quick Share */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center gap-4">
            <div className="shrink-0 flex flex-col items-center">
              <div className="p-1.5 bg-white rounded-xl border border-slate-300 shadow-xs">
                <img
                  src={qrUrl}
                  alt="QR Code để mở ứng dụng trên điện thoại"
                  className="w-28 h-28 object-contain rounded-lg"
                  loading="lazy"
                />
              </div>
              <span className="text-[10px] text-slate-500 font-bold mt-1 flex items-center gap-1">
                <QrCode className="w-3 h-3" />
                Quét mã bằng Camera
              </span>
            </div>

            <div className="flex-1 w-full space-y-2">
              <label className="text-xs font-black text-slate-800 block">
                Mở link này trên điện thoại của bạn:
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={currentUrl}
                  className="flex-1 p-2 bg-white border border-slate-300 rounded-xl text-xs font-mono text-slate-700 select-all"
                />
                <button
                  onClick={handleCopyUrl}
                  className="px-3.5 py-2 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 active:scale-95 transition cursor-pointer shrink-0"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Đã sao chép' : 'Chép link'}</span>
                </button>
              </div>
              <p className="text-[11px] text-slate-500">
                Mẹo: Quét mã QR bằng Camera điện thoại hoặc Zalo để mở ngay trong 2 giây!
              </p>
            </div>
          </div>

          {/* Option 2: Generate APK via PWABuilder (Official tool by Microsoft & Google) */}
          <div className="p-4 bg-sky-50 rounded-2xl border-2 border-sky-300">
            <div className="flex items-center justify-between mb-2">
              <span className="px-2.5 py-1 bg-sky-600 text-white text-[11px] font-black rounded-lg">
                CÁCH 2: XUẤT FILE .APK CHÍNH THỨC (CHO ANDROID / PLAY STORE)
              </span>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed mb-3">
              Vì applet là ứng dụng web, để có file <strong>.APK</strong> độc lập (để cài đặt offline hoặc xuất bản lên Google Play Store), ứng dụng đã cấu hình sẵn 100% <strong>Web App Manifest &amp; Icon Android HD</strong>. Bạn có thể xuất file APK hoàn toàn miễn phí qua <strong>PWABuilder</strong>:
            </p>

            <ol className="text-xs text-slate-700 space-y-1.5 list-decimal list-inside bg-white p-3 rounded-xl border border-sky-200 mb-3">
              <li>Mở công cụ xuất APK: <strong>PWABuilder.com</strong></li>
              <li>Dán đường dẫn web của ứng dụng vào ô kiểm tra.</li>
              <li>Bấm nút <strong>&quot;Package for Android&quot;</strong> &gt; Tải gói <strong>.APK / .AAB</strong> về máy.</li>
            </ol>

            <div className="flex flex-wrap items-center justify-between gap-2">
              <a
                href={`https://www.pwabuilder.com/?url=${encodeURIComponent(currentUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-black rounded-xl shadow-xs transition active:scale-95"
              >
                <span>Mở PWABuilder xuất file APK ngay</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => setShowCliGuide(!showCliGuide)}
                className="text-xs text-slate-600 hover:text-slate-800 font-bold flex items-center gap-1 underline cursor-pointer"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>{showCliGuide ? 'Ẩn lệnh Bubblewrap CLI' : 'Hoặc dùng Bubblewrap CLI'}</span>
              </button>
            </div>

            {showCliGuide && (
              <div className="mt-3 p-3 bg-slate-900 text-emerald-400 font-mono text-[11px] rounded-xl overflow-x-auto space-y-1">
                <div className="text-slate-400"># Tạo APK bằng công cụ Google Bubblewrap CLI:</div>
                <div>npm install -g @bubblewrap/cli</div>
                <div>bubblewrap init --manifest={currentUrl}/manifest.webmanifest</div>
                <div>bubblewrap build</div>
              </div>
            )}
          </div>

          {/* Kid-Safe Notice */}
          <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
            <p className="text-xs text-amber-900 font-medium">
              Ứng dụng 100% không quảng cáo, lưu điểm và nhãn dán an toàn trên máy bé mà không thu thập dữ liệu cá nhân.
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
