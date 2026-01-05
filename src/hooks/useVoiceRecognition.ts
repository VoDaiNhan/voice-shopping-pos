import { useState, useCallback } from 'react';
import { voiceRecognitionService } from '../services/voiceRecognition';
import { parseVoiceCommand, formatCommandResult } from '../services/voiceCommandParser';
import { useCartStore } from '../stores/cartStore';
import { useProductStore } from '../stores/productStore';
import type { VoiceCommand } from '../types';

interface UseVoiceRecognitionReturn {
  isListening: boolean;
  isSupported: boolean;
  transcript: string;
  interimTranscript: string;
  lastCommand: VoiceCommand | null;
  feedback: string;
  error: string | null;
  startListening: () => void;
  stopListening: () => void;
}

export function useVoiceRecognition(): UseVoiceRecognitionReturn {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [lastCommand, setLastCommand] = useState<VoiceCommand | null>(null);
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState<string | null>(null);

  const addItem = useCartStore(state => state.addItem);
  const removeItem = useCartStore(state => state.removeItem);
  const clearCart = useCartStore(state => state.clearCart);
  const findProductByName = useProductStore(state => state.findProductByName);
  const setSearchQuery = useProductStore(state => state.setSearchQuery);

  const processCommand = useCallback((command: VoiceCommand) => {
    setLastCommand(command);
    
    switch (command.action) {
      case 'add': {
        if (!command.productName) {
          setFeedback('Vui lòng nói tên sản phẩm');
          return;
        }
        
        const product = findProductByName(command.productName);
        if (product) {
          addItem(product, command.quantity || 1);
          setFeedback(formatCommandResult(command, true, product.name));
        } else {
          setFeedback(formatCommandResult(command, false));
        }
        break;
      }
      
      case 'remove': {
        if (!command.productName) {
          setFeedback('Vui lòng nói tên sản phẩm cần xóa');
          return;
        }
        
        const product = findProductByName(command.productName);
        if (product) {
          removeItem(product.id);
          setFeedback(formatCommandResult(command, true, product.name));
        } else {
          setFeedback(formatCommandResult(command, false));
        }
        break;
      }
      
      case 'search': {
        if (command.productName) {
          setSearchQuery(command.productName);
          setFeedback(formatCommandResult(command, true));
        }
        break;
      }
      
      case 'clear': {
        clearCart();
        setFeedback(formatCommandResult(command, true));
        break;
      }
      
      case 'checkout': {
        setFeedback(formatCommandResult(command, true));
        // TODO: Navigate to checkout
        break;
      }
      
      default: {
        // Try to add as product if unknown command
        if (command.productName) {
          const product = findProductByName(command.productName);
          if (product) {
            addItem(product, 1);
            setFeedback(`Đã thêm ${product.name} vào giỏ hàng`);
          } else {
            setFeedback(`Không hiểu lệnh "${command.rawTranscript}". Thử nói "thêm [sản phẩm]" hoặc "xóa [sản phẩm]"`);
          }
        }
      }
    }
  }, [addItem, removeItem, clearCart, findProductByName, setSearchQuery]);

  const startListening = useCallback(() => {
    setError(null);
    setFeedback('');
    setInterimTranscript('');
    
    voiceRecognitionService.start({
      onStart: () => {
        setIsListening(true);
        setFeedback('Đang nghe...');
      },
      onResult: (text, isFinal) => {
        if (isFinal) {
          setTranscript(text);
          setInterimTranscript('');
          const command = parseVoiceCommand(text);
          processCommand(command);
        } else {
          setInterimTranscript(text);
        }
      },
      onError: (errorMessage) => {
        setError(errorMessage);
        setFeedback('');
      },
      onEnd: () => {
        setIsListening(false);
      },
    });
  }, [processCommand]);

  const stopListening = useCallback(() => {
    voiceRecognitionService.stop();
    setIsListening(false);
  }, []);

  return {
    isListening,
    isSupported: voiceRecognitionService.isSupported(),
    transcript,
    interimTranscript,
    lastCommand,
    feedback,
    error,
    startListening,
    stopListening,
  };
}
