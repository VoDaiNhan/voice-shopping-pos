import { useVoiceRecognition } from '../../hooks/useVoiceRecognition';


interface VoiceButtonProps {
  size?: 'sm' | 'md' | 'lg';
}

export function VoiceButton({ size = 'md' }: VoiceButtonProps) {
  const { isListening, isSupported, startListening, stopListening } = useVoiceRecognition();

  const sizeClasses = {
    sm: 'h-10 w-10',
    md: 'h-12 w-12',
    lg: 'h-14 w-14',
  };

  const iconSizes = {
    sm: 'text-[20px]',
    md: 'text-[24px]',
    lg: 'text-[28px]',
  };

  const handleClick = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  if (!isSupported) {
    return (
      <button 
        className={`${sizeClasses[size]} flex items-center justify-center rounded-xl bg-gray-200 text-gray-400 cursor-not-allowed`}
        title="Trình duyệt không hỗ trợ nhận dạng giọng nói"
        disabled
      >
        <span className={`material-symbols-outlined ${iconSizes[size]}`}>mic_off</span>
      </button>
    );
  }

  return (
    <button 
      onClick={handleClick}
      className={`
        ${sizeClasses[size]} flex items-center justify-center rounded-xl 
        ${isListening 
          ? 'bg-red-500 text-white voice-active' 
          : 'bg-white border border-border-light text-primary hover:bg-green-50'
        }
        shadow-sm transition-all relative group
      `}
      title={isListening ? 'Dừng nghe' : 'Bắt đầu nói'}
    >
      <span className={`material-symbols-outlined ${iconSizes[size]} ${isListening ? 'animate-pulse' : 'group-hover:scale-110'} transition-transform`}>
        {isListening ? 'mic' : 'mic'}
      </span>
    </button>
  );
}
