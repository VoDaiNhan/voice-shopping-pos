import { useMemo } from 'react';
import { useVoiceRecognition } from '../../hooks/useVoiceRecognition';


// Pre-defined waveform heights to avoid Math.random in render
const WAVEFORM_HEIGHTS = [45, 32, 58, 28, 52, 38, 62, 35, 48, 42, 55, 30];

export function VoiceModal() {
  const { 
    isListening, 
    interimTranscript, 
    transcript, 
    feedback, 
    error,
    stopListening 
  } = useVoiceRecognition();

  // Memoize waveform to avoid recalculation
  const waveformBars = useMemo(() => WAVEFORM_HEIGHTS.map((height, i) => ({
    height,
    delay: i * 0.1
  })), []);

  if (!isListening) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-emerald-500 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-10 bg-white/20 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-2xl animate-pulse">mic</span>
            </div>
            <div>
              <h3 className="text-white font-bold">Đang nghe...</h3>
              <p className="text-white/70 text-sm">Nói lệnh của bạn</p>
            </div>
          </div>
          <button 
            onClick={stopListening}
            className="text-white/70 hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6">
          {/* Waveform Animation */}
          <div className="flex items-center justify-center gap-1 h-16 mb-6">
            {waveformBars.map((bar, i) => (
              <div 
                key={i}
                className="w-1 bg-primary rounded-full animate-pulse"
                style={{
                  height: `${bar.height}px`,
                  animationDelay: `${bar.delay}s`,
                  animationDuration: '0.5s'
                }}
              />
            ))}
          </div>
          
          {/* Transcript Display */}
          <div className="min-h-[60px] bg-gray-50 rounded-xl p-4 mb-4">
            {interimTranscript ? (
              <p className="text-gray-600 italic">"{interimTranscript}"</p>
            ) : transcript ? (
              <p className="text-text-main font-medium">"{transcript}"</p>
            ) : (
              <p className="text-gray-400 text-center">Hãy nói gì đó...</p>
            )}
          </div>
          
          {/* Feedback or Error */}
          {feedback && !error && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-green-600">check_circle</span>
              <p className="text-green-700 text-sm">{feedback}</p>
            </div>
          )}
          
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-red-600">error</span>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}
          
          {/* Example Commands */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500 mb-2">Ví dụ lệnh:</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">"Thêm coca cola"</span>
              <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">"Thêm 2 sữa"</span>
              <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">"Xóa bánh mì"</span>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          <button 
            onClick={stopListening}
            className="w-full py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">stop_circle</span>
            Dừng nghe
          </button>
        </div>
      </div>
    </div>
  );
}
