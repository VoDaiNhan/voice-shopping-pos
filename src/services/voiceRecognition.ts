// Voice Recognition Service using Web Speech API
// Note: Only works in Chrome/Edge browsers

export interface VoiceRecognitionCallbacks {
  onResult: (transcript: string, isFinal: boolean) => void;
  onError: (error: string) => void;
  onStart: () => void;
  onEnd: () => void;
}

class VoiceRecognitionService {
  private recognition: SpeechRecognition | null = null;
  private isListening = false;
  private callbacks: VoiceRecognitionCallbacks | null = null;

  constructor() {
    this.initRecognition();
  }

  private initRecognition() {
    // Check browser support
    const SpeechRecognitionAPI = 
      (window as unknown as { SpeechRecognition?: typeof SpeechRecognition }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: typeof SpeechRecognition }).webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) {
      console.warn('Speech Recognition is not supported in this browser');
      return;
    }

    this.recognition = new SpeechRecognitionAPI();
    this.recognition.lang = 'vi-VN'; // Vietnamese language
    this.recognition.continuous = false;
    this.recognition.interimResults = true;
    this.recognition.maxAlternatives = 1;

    this.recognition.onstart = () => {
      this.isListening = true;
      this.callbacks?.onStart();
    };

    this.recognition.onresult = (event) => {
      const result = event.results[event.results.length - 1];
      const transcript = result[0].transcript;
      const isFinal = result.isFinal;
      
      this.callbacks?.onResult(transcript, isFinal);
    };

    this.recognition.onerror = (event) => {
      let errorMessage = 'Có lỗi xảy ra khi nhận dạng giọng nói';
      
      switch (event.error) {
        case 'no-speech':
          errorMessage = 'Không nhận được giọng nói. Hãy thử lại.';
          break;
        case 'audio-capture':
          errorMessage = 'Không tìm thấy microphone. Vui lòng kiểm tra lại.';
          break;
        case 'not-allowed':
          errorMessage = 'Quyền truy cập microphone bị từ chối.';
          break;
        case 'network':
          errorMessage = 'Lỗi mạng. Vui lòng kiểm tra kết nối internet.';
          break;
      }
      
      this.callbacks?.onError(errorMessage);
    };

    this.recognition.onend = () => {
      this.isListening = false;
      this.callbacks?.onEnd();
    };
  }

  public isSupported(): boolean {
    return this.recognition !== null;
  }

  public start(callbacks: VoiceRecognitionCallbacks): boolean {
    if (!this.recognition) {
      callbacks.onError('Trình duyệt không hỗ trợ nhận dạng giọng nói. Vui lòng sử dụng Chrome hoặc Edge.');
      return false;
    }

    if (this.isListening) {
      return false;
    }

    this.callbacks = callbacks;
    
    try {
      this.recognition.start();
      return true;
    } catch {
      callbacks.onError('Không thể bắt đầu nhận dạng giọng nói');
      return false;
    }
  }

  public stop() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
    }
  }

  public abort() {
    if (this.recognition && this.isListening) {
      this.recognition.abort();
    }
  }

  public getIsListening(): boolean {
    return this.isListening;
  }
}

// Singleton instance
export const voiceRecognitionService = new VoiceRecognitionService();
