// @file: src/ai/utils/imageProcessing.ts
export interface WhatsAppImageMessage {
  type: 'image';
  image: {
    url: string;
    id: string;
    mime_type: string;
    sha256: string;
    caption?: string;
  };
  from: string;
  timestamp: string;
}

export interface ImageAnalysisRequest {
  imageUrl: string;
  analysisType: 'condition' | 'damage' | 'color' | 'license_plate' | 'detailing' | 'coating' | 'general';
  customerMessage?: string;
  senderNumber: string;
  senderName?: string;
}

export interface ImageAnalysisResult {
  success: boolean;
  analysis?: string;
  analysisType?: string;
  confidence?: number;
  error?: string;
  tokenUsage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

/**
 * Detects the type of analysis needed based on customer message or image context
 */
export function detectAnalysisType(customerMessage: string): 'condition' | 'damage' | 'color' | 'license_plate' | 'detailing' | 'coating' | 'general' {
  const message = customerMessage.toLowerCase();
  
  // Check for specific keywords
  if (message.includes('rusak') || message.includes('lecet') || message.includes('penyok') || message.includes('kerusakan')) {
    return 'damage';
  }
  
  if (message.includes('warna') || message.includes('cat') || message.includes('repaint') || message.includes('cat ulang')) {
    return 'color';
  }
  
  if (message.includes('plat') || message.includes('nomor') || message.includes('polisi')) {
    return 'license_plate';
  }
  
  if (message.includes('detailing') || message.includes('cuci') || message.includes('bersih') || message.includes('kotor')) {
    return 'detailing';
  }
  
  if (message.includes('coating') || message.includes('proteksi') || message.includes('pelindung')) {
    return 'coating';
  }
  
  if (message.includes('kondisi') || message.includes('bagaimana') || message.includes('cek')) {
    return 'condition';
  }
  
  // Default to general analysis
  return 'general';
}

/**
 * Validates WhatsApp image URL
 */
export function validateImageUrl(imageUrl: string): boolean {
  try {
    // Check if it's a data URL
    if (imageUrl.startsWith('data:image/')) {
      return true;
    }
    
    // Check if it's a valid URL
    new URL(imageUrl);
    return true;
  } catch {
    return false;
  }
}

/**
 * Formats analysis result for WhatsApp response
 */
export function formatAnalysisForWhatsApp(result: ImageAnalysisResult, analysisType: string): string {
  if (!result.success || !result.analysis) {
    return 'Maaf mas, ada kendala saat analisis foto. Bisa kirim ulang foto yang lebih jelas? 📸';
  }
  
  // Add context prefix based on analysis type
  let prefix = '';
  switch (analysisType) {
    case 'condition':
      prefix = '🔍 *Hasil Analisis Kondisi Motor:*\n\n';
      break;
    case 'damage':
      prefix = '⚠️ *Analisis Kerusakan Motor:*\n\n';
      break;
    case 'color':
      prefix = '🎨 *Identifikasi Warna Motor:*\n\n';
      break;
    case 'license_plate':
      prefix = '🏍️ *Pembacaan Plat Nomor:*\n\n';
      break;
    case 'detailing':
      prefix = '✨ *Analisis Kebutuhan Detailing:*\n\n';
      break;
    case 'coating':
      prefix = '🛡️ *Analisis Kebutuhan Coating:*\n\n';
      break;
    default:
      prefix = '📋 *Analisis Motor:*\n\n';
  }
  
  return prefix + result.analysis;
}

/**
 * Creates image context for AI agent
 */
export function createImageContext(
  analysisResult: ImageAnalysisResult, 
  analysisType: string, 
  imageUrl: string
) {
  return {
    imageUrl,
    analysisType: analysisType as 'condition' | 'damage' | 'color' | 'license_plate' | 'detailing' | 'coating',
    analysisResult: analysisResult.success ? {
      analysis: analysisResult.analysis,
      confidence: analysisResult.confidence,
      tokenUsage: analysisResult.tokenUsage
    } : null
  };
}

/**
 * Log image analysis for monitoring
 */
export function logImageAnalysis(
  senderNumber: string, 
  analysisType: string, 
  result: any, 
  imageUrl: string
) {
  console.log('[IMAGE ANALYSIS LOG]', {
    senderNumber,
    analysisType,
    success: result.success,
    timestamp: new Date().toISOString(),
    imageUrl: imageUrl.substring(0, 50) + '...', // Truncate for logging
    error: result.error || null
  });
}

export function sanitizeImageUrl(imageUrl: string): string {
  // Remove any potential malicious content
  return imageUrl.replace(/[<>]/g, '');
}
