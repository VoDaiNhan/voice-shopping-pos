import type { VoiceCommand } from '../types';

// Voice Command Parser
// Parses Vietnamese voice commands to actionable commands

export function parseVoiceCommand(transcript: string): VoiceCommand {
  const text = transcript.toLowerCase().trim();
  
  // Add commands: "thêm [số lượng] [sản phẩm]"
  const addPatterns = [
    /^thêm\s+(\d+)\s+(.+)$/,           // "thêm 3 coca cola"
    /^thêm\s+(.+)\s+(\d+)$/,           // "thêm coca cola 3"  
    /^thêm\s+(.+)$/,                   // "thêm coca cola"
    /^cho\s+(\d+)\s+(.+)\s+vào\s+giỏ$/, // "cho 2 bánh mì vào giỏ"
    /^cho\s+(.+)\s+vào\s+giỏ$/,        // "cho bánh mì vào giỏ"
    /^mua\s+(\d+)\s+(.+)$/,            // "mua 2 sữa"
    /^mua\s+(.+)$/,                    // "mua sữa"
  ];
  
  for (const pattern of addPatterns) {
    const match = text.match(pattern);
    if (match) {
      let quantity = 1;
      let productName = '';
      
      if (match.length === 3) {
        // Pattern with quantity
        if (!isNaN(parseInt(match[1]))) {
          quantity = parseInt(match[1]);
          productName = match[2];
        } else {
          productName = match[1];
          quantity = parseInt(match[2]);
        }
      } else if (match.length === 2) {
        // Pattern without quantity
        productName = match[1];
      }
      
      return {
        action: 'add',
        productName: productName.trim(),
        quantity,
        rawTranscript: transcript,
      };
    }
  }
  
  // Remove commands: "xóa [sản phẩm]", "bỏ [sản phẩm]"
  const removePatterns = [
    /^xóa\s+(.+)$/,                    // "xóa coca cola"
    /^bỏ\s+(.+)$/,                     // "bỏ bánh mì"
    /^xóa\s+(.+)\s+khỏi\s+giỏ$/,       // "xóa bánh mì khỏi giỏ"
    /^bỏ\s+(.+)\s+ra$/,                // "bỏ sữa ra"
  ];
  
  for (const pattern of removePatterns) {
    const match = text.match(pattern);
    if (match) {
      return {
        action: 'remove',
        productName: match[1].trim(),
        rawTranscript: transcript,
      };
    }
  }
  
  // Search commands: "tìm [sản phẩm]"
  const searchPatterns = [
    /^tìm\s+(.+)$/,                    // "tìm coca"
    /^tìm kiếm\s+(.+)$/,               // "tìm kiếm sữa"
    /^kiếm\s+(.+)$/,                   // "kiếm bánh"
  ];
  
  for (const pattern of searchPatterns) {
    const match = text.match(pattern);
    if (match) {
      return {
        action: 'search',
        productName: match[1].trim(),
        rawTranscript: transcript,
      };
    }
  }
  
  // Checkout command
  if (
    text.includes('thanh toán') || 
    text.includes('tính tiền') ||
    text.includes('checkout')
  ) {
    return {
      action: 'checkout',
      rawTranscript: transcript,
    };
  }
  
  // Clear cart command
  if (
    text.includes('xóa giỏ hàng') ||
    text.includes('xóa hết') ||
    text.includes('làm trống giỏ')
  ) {
    return {
      action: 'clear',
      rawTranscript: transcript,
    };
  }
  
  // Unknown command - try to extract product name
  return {
    action: 'unknown',
    productName: text,
    rawTranscript: transcript,
  };
}

// Helper to format the command result for display
export function formatCommandResult(command: VoiceCommand, success: boolean, productName?: string): string {
  if (!success) {
    switch (command.action) {
      case 'add':
        return `Không tìm thấy sản phẩm "${command.productName}"`;
      case 'remove':
        return `Không thể xóa "${command.productName}" khỏi giỏ hàng`;
      default:
        return 'Không thể thực hiện lệnh';
    }
  }
  
  switch (command.action) {
    case 'add':
      return `Đã thêm ${command.quantity || 1} ${productName || command.productName} vào giỏ hàng`;
    case 'remove':
      return `Đã xóa ${productName || command.productName} khỏi giỏ hàng`;
    case 'search':
      return `Đang tìm kiếm "${command.productName}"`;
    case 'checkout':
      return 'Đang chuyển đến thanh toán...';
    case 'clear':
      return 'Đã xóa toàn bộ giỏ hàng';
    default:
      return 'Đã xử lý lệnh';
  }
}
