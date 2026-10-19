import React, { useState } from 'react';
import { GAME_ITEMS } from '../data/items.ts';
import {
  setCustomAudio,
  getCustomAudio,
  removeCustomAudio,
  speakSpeech,
  SoundFX,
  stopSpeaking
} from '../utils/audio.ts';
import { Volume2, Upload, Mic, Trash2, X, Check, Music } from 'lucide-react';

interface AudioSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AudioSettingsModal: React.FC<AudioSettingsModalProps> = ({
  isOpen,
  onClose
}) => {
  const [selectedItemId, setSelectedItemId] = useState<string>(GAME_ITEMS[0].id);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>('');

  if (!isOpen) return null;

  const currentItem = GAME_ITEMS.find((i) => i.id === selectedItemId) || GAME_ITEMS[0];
  const customAudio = getCustomAudio(currentItem.nameVi.toLowerCase());

  const handleTestVi = () => {
    setIsPlaying(true);
    SoundFX.playPop();
    speakSpeech(`Bé hãy tìm: ${currentItem.nameVi}!`, 'vi', () => setIsPlaying(false));
  };

  const handleTestEnKeyword = () => {
    setIsPlaying(true);
    SoundFX.playPop();
    speakSpeech(currentItem.nameEn, 'en', () => setIsPlaying(false));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('audio/')) {
      setStatusMessage('Vui lòng chọn file âm thanh (.mp3, .wav, .m4a)');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setCustomAudio(currentItem.nameVi.toLowerCase(), base64);
      setStatusMessage(`Đã cài file âm thanh mẫu cho "${currentItem.nameVi}"!`);
      SoundFX.playCorrectChime();
      setTimeout(() => setStatusMessage(''), 3000);
    };
    reader.readAsDataURL(file);
  };

  const handleStartRecord = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = reader.result as string;
          setCustomAudio(currentItem.nameVi.toLowerCase(), base64);
          setStatusMessage(`Đã lưu giọng ghi âm cho "${currentItem.nameVi}"!`);
          SoundFX.playCorrectChime();
          setTimeout(() => setStatusMessage(''), 3000);
        };
        reader.readAsDataURL(blob);

        stream.getTracks().forEach((t) => t.stop());
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch {
      setStatusMessage('Không thể truy cập microphone. Vui lòng cho phép quyền ghi âm.');
    }
  };

  const handleStopRecord = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
      setMediaRecorder(null);
    }
  };

  const handleRemoveCustom = () => {
    removeCustomAudio(currentItem.nameVi.toLowerCase());
    setStatusMessage(`Đã đặt lại giọng chuẩn AI cho "${currentItem.nameVi}"`);
    SoundFX.playPop();
    setTimeout(() => setStatusMessage(''), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs animate-pop">
      <div className="relative w-full max-w-xl bg-white rounded-3xl p-5 sm:p-6 shadow-2xl border-4 border-sky-300 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-sky-100">
          <div className="flex items-center gap-2">
            <div className="p-2.5 bg-sky-100 text-sky-700 rounded-2xl">
              <Music className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-800">
                Chất Lượng Giọng Đọc & Tùy Chỉnh Âm Thanh
              </h2>
              <p className="text-xs text-sky-600 font-bold">
                Giọng đọc AI chuẩn tiếng Việt & hỗ trợ tải file âm thanh mẫu
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              stopSpeaking();
              onClose();
            }}
            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full cursor-pointer transition active:scale-90"
            aria-label="Đóng bảng âm thanh"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Info banner */}
        <div className="my-3 p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 leading-relaxed">
          <span className="font-black block mb-0.5">💡 Quy tắc phát âm mới:</span>
          &bull; <strong>Tiếng Việt:</strong> Phát âm tự nhiên, chuẩn dấu thanh tiếng Việt (sắc, huyền, hỏi, ngã, nặng) qua giọng đọc AI cao cấp.<br />
          &bull; <strong>Tiếng Anh:</strong> Chỉ đọc từ khóa đáp án (ví dụ: &quot;{currentItem.nameEn}&quot;), không đọc câu hỏi tiếng Anh.<br />
          &bull; <strong>File âm thanh riêng:</strong> Quý phụ huynh có thể tải file âm thanh mẫu (.mp3/.wav) hoặc ghi âm trực tiếp bên dưới.
        </div>

        {statusMessage && (
          <div className="mb-3 p-2.5 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-1.5 animate-pop">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Item selector and controls */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          <div>
            <label className="text-xs font-black text-slate-700 block mb-1">
              Chọn từ vựng để nghe thử hoặc thay đổi file âm thanh:
            </label>
            <select
              value={selectedItemId}
              onChange={(e) => setSelectedItemId(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border-2 border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:border-sky-400 focus:outline-hidden cursor-pointer"
            >
              {GAME_ITEMS.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.nameVi} ({item.nameEn}) - {item.category}
                </option>
              ))}
            </select>
          </div>

          {/* Current item status card */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-lg font-black text-slate-900">{currentItem.nameVi}</span>
                <span className="text-sm font-bold text-sky-600 ml-2">/ {currentItem.nameEn}</span>
              </div>
              {customAudio ? (
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-xs font-black rounded-full">
                  File âm thanh riêng
                </span>
              ) : (
                <span className="px-2 py-0.5 bg-sky-100 text-sky-800 text-xs font-black rounded-full">
                  Giọng AI Studio chuẩn
                </span>
              )}
            </div>

            {/* Test buttons */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              <button
                onClick={handleTestVi}
                disabled={isPlaying}
                className="flex items-center justify-center gap-1.5 p-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs rounded-xl shadow-xs cursor-pointer active:scale-95 transition disabled:opacity-50"
              >
                <Volume2 className="w-4 h-4" />
                <span>Nghe câu hỏi tiếng Việt</span>
              </button>

              <button
                onClick={handleTestEnKeyword}
                disabled={isPlaying}
                className="flex items-center justify-center gap-1.5 p-2.5 bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-xs rounded-xl shadow-xs cursor-pointer active:scale-95 transition disabled:opacity-50"
              >
                <Volume2 className="w-4 h-4" />
                <span>Nghe từ khóa tiếng Anh</span>
              </button>
            </div>

            {/* Upload or Record custom voice */}
            <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center gap-2">
              <label className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl border border-slate-300 shadow-xs cursor-pointer active:scale-95 transition">
                <Upload className="w-4 h-4 text-sky-600" />
                <span>Tải file âm thanh mẫu (.mp3/.wav)</span>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              {!isRecording ? (
                <button
                  onClick={handleStartRecord}
                  className="flex items-center gap-1.5 px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-xl border border-rose-200 shadow-xs cursor-pointer active:scale-95 transition"
                >
                  <Mic className="w-4 h-4 text-rose-600" />
                  <span>Ghi âm giọng của mẹ/ba</span>
                </button>
              ) : (
                <button
                  onClick={handleStopRecord}
                  className="flex items-center gap-1.5 px-3 py-2 bg-rose-600 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer animate-pulse"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-white" />
                  <span>Dừng & Lưu ghi âm</span>
                </button>
              )}

              {customAudio && (
                <button
                  onClick={handleRemoveCustom}
                  className="p-2 text-slate-400 hover:text-rose-600 rounded-xl cursor-pointer ml-auto"
                  title="Xóa âm thanh riêng và dùng giọng AI chuẩn"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-sky-100 flex justify-end">
          <button
            onClick={() => {
              stopSpeaking();
              onClose();
            }}
            className="px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs sm:text-sm rounded-xl cursor-pointer active:scale-95 transition"
          >
            Đã xong
          </button>
        </div>
      </div>
    </div>
  );
};
