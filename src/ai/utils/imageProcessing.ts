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
export function detectAnalysisType(customerMessage?: string): 'condition' | 'damage' | 'color' | 'license_plate' | 'detailing' | 'coating' | 'general' {
  if (!customerMessage) return 'general';
  
  const msg = customerMessage.toLowerCase();
  
  // Check for detailing keywords
  if (msg.includes('detailing') || msg.includes('cuci') || msg.includes('bersih') || 
      msg.includes('kotor') || msg.includes('debu') || msg.includes('lumpur') ||
      msg.includes('mesin kotor') || msg.includes('poles')) {
    return 'detailing';
  }
  
  // Check for coating keywords  
  if (msg.includes('coating') || msg.includes('glossy') || msg.includes('doff') ||
      msg.includes('kilap') || msg.includes('proteksi') || msg.includes('anti air') ||
      msg.includes('ceramic') || msg.includes('wax')) {
    return 'coating';
  }
  
  // Check for color/repaint keywords
  if (msg.includes('warna') || msg.includes('cat') || msg.includes('repaint') ||
      msg.includes('ganti warna') || msg.includes('cat ulang')) {
    return 'color';
  }
  
  // Check for license plate keywords
  if (msg.includes('plat') || msg.includes('nomor') || msg.includes('nopol')) {
    return 'license_plate';
  }
  
  // Check for damage keywords
  if (msg.includes('rusak') || msg.includes('lecet') || msg.includes('penyok') || 
      msg.includes('damage') || msg.includes('kerusakan') || msg.includes('biaya') ||
      msg.includes('gores') || msg.includes('baret')) {
    return 'damage';
  }
  
  // Check for general condition keywords
  if (msg.includes('kondisi') || msg.includes('cek') || msg.includes('lihat') || 
      msg.includes('gimana') || msg.includes('service apa') || msg.includes('butuh apa')) {
    return 'condition';
  }
  
  return 'general';
}

/**
 * Validates WhatsApp image URL
 */
export function validateImageUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    // WhatsApp media URLs typically start with https
    return urlObj.protocol === 'https:' && url.length > 10;
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
  result: ImageAnalysisResult,
  imageUrl: string
) {
  console.log('[ImageAnalysis]', {
    customer: senderNumber,
    type: analysisType,
    success: result.success,
    tokensUsed: result.tokenUsage?.total_tokens || 0,
    imageUrl: imageUrl.substring(0, 50) + '...',
    timestamp: new Date().toISOString()
  });
}
