import { useVoiceRecognition } from '../../hooks/useVoiceRecognition';

export function VoiceCommandBar() {
  const { 
    isListening, 
    isSupported, 
    interimTranscript, 
    transcript,
    feedback,
    startListening, 
    stopListening 
  } = useVoiceRecognition();

  const handleClick = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  if (!isSupported) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3">
      {/* Shortcut hint */}
      <div className="bg-gray-800 text-white text-xs font-medium px-2 py-1 rounded">
        (SPACE)
      </div>
      
      {/* Voice Button */}
      <button
        onClick={handleClick}
        className={`
          size-12 rounded-full flex items-center justify-center shadow-lg transition-all
          ${isListening 
            ? 'bg-red-500 text-white voice-active scale-110' 
            : 'bg-white text-red-500 hover:scale-105 border border-gray-200'
          }
        `}
        title={isListening ? 'Dừng nghe' : 'Bắt đầu nói (Space)'}
      >
        <span className={`material-symbols-outlined text-2xl ${isListening ? 'animate-pulse' : ''}`}>
          {isListening ? 'graphic_eq' : 'mic'}
        </span>
      </button>
      
      {/* Status / Transcript */}
      <div className={`
        bg-white rounded-full shadow-lg border border-gray-200 px-4 py-2 flex items-center gap-3
        transition-all duration-300
        ${isListening ? 'min-w-[280px]' : 'min-w-[200px]'}
      `}>
        {isListening && (
          <div className="flex items-center gap-1">
            {[...Array(3)].map((_, i) => (
              <div 
                key={i}
                className="w-1 bg-red-500 rounded-full animate-pulse"
                style={{ 
                  height: `${12 + i * 4}px`,
                  animationDelay: `${i * 0.15}s`
                }}
              />
            ))}
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          {isListening && interimTranscript ? (
            <p className="text-gray-600 text-sm italic truncate">{interimTranscript}</p>
          ) : isListening && transcript ? (
            <p className="text-gray-800 text-sm font-medium truncate">{transcript}</p>
          ) : feedback ? (
            <p className="text-green-600 text-sm font-medium truncate">{feedback}</p>
          ) : (
            <p className="text-gray-500 text-sm italic">
              {isListening ? 'Đang nghe...' : 'Ra lệnh cho em đi boss...'}
            </p>
          )}
          
          {!isListening && !feedback && (
            <p className="text-gray-400 text-xs">Số lượng + Tên hàng hóa (vd: 2 cà phê)</p>
          )}
        </div>
      </div>
    </div>
  );
}
