// @file: src/ai/tools/vision/analyzeMotorImageGemini.ts

import { analyzeImage } from '@/lib/gemini';

export interface MotorImageAnalysisResult {
  condition: string;
  recommendations: string[];
  estimatedServices: string[];
  confidence: number;
  details: {
    damage?: string[];
    color?: string;
    cleanliness?: string;
    maintenance?: string[];
  };
}

export async function analyzeMotorImageGemini(
  imageUrl: string,
  analysisType: 'condition' | 'damage' | 'color' | 'license_plate' | 'detailing' | 'coating' | 'general',
  specificRequest?: string
): Promise<MotorImageAnalysisResult> {
  
  console.log(`[analyzeMotorImageGemini] Analyzing image for type: ${analysisType}`);
  
  try {
    // Create specific prompts based on analysis type
    const prompts = {
      condition: `
        Analisis kondisi motor dari foto ini. Fokus pada:
        1. Kondisi umum motor (baik/sedang/rusak)
        2. Tingkat kebersihan
        3. Kerusakan yang terlihat
        4. Rekomendasi layanan yang dibutuhkan
        
        Berikan hasil dalam format JSON:
        {
          "condition": "baik/sedang/rusak",
          "recommendations": ["list rekomendasi"],
          "estimatedServices": ["layanan yang dibutuhkan"],
          "confidence": 0.85,
          "details": {
            "damage": ["kerusakan yang terlihat"],
            "cleanliness": "tingkat kebersihan",
            "maintenance": ["perawatan yang dibutuhkan"]
          }
        }
      `,
      
      damage: `
        Analisis kerusakan motor dari foto ini. Fokus pada:
        1. Jenis kerusakan yang terlihat
        2. Lokasi kerusakan
        3. Tingkat keparahan
        4. Estimasi biaya perbaikan
        
        Berikan hasil dalam format JSON:
        {
          "condition": "rusak",
          "recommendations": ["rekomendasi perbaikan"],
          "estimatedServices": ["layanan perbaikan"],
          "confidence": 0.85,
          "details": {
            "damage": ["detail kerusakan"],
            "maintenance": ["perbaikan yang dibutuhkan"]
          }
        }
      `,
      
      color: `
        Analisis warna motor dari foto ini. Fokus pada:
        1. Warna dominan motor
        2. Kondisi cat (mengkilap/kusam/terkelupas)
        3. Rekomendasi untuk repaint
        4. Warna yang cocok untuk motor ini
        
        Berikan hasil dalam format JSON:
        {
          "condition": "baik/sedang/rusak",
          "recommendations": ["rekomendasi warna"],
          "estimatedServices": ["layanan repaint"],
          "confidence": 0.85,
          "details": {
            "color": "warna dominan",
            "maintenance": ["perawatan cat"]
          }
        }
      `,
      
      license_plate: `
        Baca dan analisis plat nomor motor dari foto ini. Fokus pada:
        1. Nomor plat yang terlihat
        2. Kondisi plat (baik/rusak/kotor)
        3. Rekomendasi perawatan plat
        
        Berikan hasil dalam format JSON:
        {
          "condition": "baik/sedang/rusak",
          "recommendations": ["rekomendasi perawatan plat"],
          "estimatedServices": ["layanan perawatan"],
          "confidence": 0.85,
          "details": {
            "license_plate": "nomor plat",
            "maintenance": ["perawatan plat"]
          }
        }
      `,
      
      detailing: `
        Analisis kebutuhan detailing motor dari foto ini. Fokus pada:
        1. Tingkat kotoran motor
        2. Bagian yang perlu dibersihkan
        3. Jenis detailing yang dibutuhkan
        4. Estimasi waktu pengerjaan
        
        Berikan hasil dalam format JSON:
        {
          "condition": "baik/sedang/rusak",
          "recommendations": ["rekomendasi detailing"],
          "estimatedServices": ["layanan detailing"],
          "confidence": 0.85,
          "details": {
            "cleanliness": "tingkat kebersihan",
            "maintenance": ["jenis detailing"]
          }
        }
      `,
      
      coating: `
        Analisis kebutuhan coating motor dari foto ini. Fokus pada:
        1. Kondisi cat saat ini
        2. Jenis coating yang cocok (doff/glossy)
        3. Bagian yang perlu di-coating
        4. Estimasi biaya coating
        
        Berikan hasil dalam format JSON:
        {
          "condition": "baik/sedang/rusak",
          "recommendations": ["rekomendasi coating"],
          "estimatedServices": ["layanan coating"],
          "confidence": 0.85,
          "details": {
            "color": "warna motor",
            "maintenance": ["jenis coating"]
          }
        }
      `,
      
      general: `
        Analisis umum motor dari foto ini. Fokus pada:
        1. Kondisi keseluruhan motor
        2. Jenis motor (matic/sport/classic)
        3. Rekomendasi layanan yang dibutuhkan
        4. Estimasi biaya perawatan
        
        Berikan hasil dalam format JSON:
        {
          "condition": "baik/sedang/rusak",
          "recommendations": ["rekomendasi umum"],
          "estimatedServices": ["layanan yang dibutuhkan"],
          "confidence": 0.85,
          "details": {
            "damage": ["kerusakan yang terlihat"],
            "color": "warna motor",
            "cleanliness": "tingkat kebersihan",
            "maintenance": ["perawatan yang dibutuhkan"]
          }
        }
      `
    };

    const prompt = prompts[analysisType];
    const fullPrompt = specificRequest 
      ? `${prompt}\n\nPermintaan khusus: ${specificRequest}`
      : prompt;

    // Analyze image using Gemini
    const analysisText = await analyzeImage(imageUrl, fullPrompt, {
      temperature: 0.3,
      maxOutputTokens: 1024,
    });

    // Parse JSON response
    let result: MotorImageAnalysisResult;
    try {
      // Extract JSON from response
      const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        result = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      console.error('[analyzeMotorImageGemini] Failed to parse JSON response:', parseError);
      
      // Fallback result
      result = {
        condition: 'sedang',
        recommendations: ['Perlu analisis lebih detail'],
        estimatedServices: ['Detailing', 'Coating'],
        confidence: 0.5,
        details: {
          maintenance: ['Perawatan umum'],
        },
      };
    }

    console.log(`[analyzeMotorImageGemini] Analysis completed for ${analysisType}`);
    return result;

  } catch (error) {
    console.error('[analyzeMotorImageGemini] Error:', error);
    
    // Return fallback result
    return {
      condition: 'sedang',
      recommendations: ['Maaf, ada gangguan teknis. Silakan kirim foto ulang atau hubungi kami langsung.'],
      estimatedServices: ['Detailing', 'Coating'],
      confidence: 0.3,
      details: {
        maintenance: ['Perawatan umum'],
      },
    };
  }
}

// Export for tool configuration
export const analyzeMotorImageGeminiTool = {
  name: 'analyzeMotorImageGemini',
  description: 'Analisis foto motor menggunakan AI vision untuk menentukan kondisi, kerusakan, warna, atau kebutuhan layanan',
  parameters: {
    type: 'object',
    properties: {
      imageUrl: {
        type: 'string',
        format: 'uri',
        description: 'URL gambar motor yang akan dianalisis'
      },
      analysisType: {
        type: 'string',
        enum: ['condition', 'damage', 'color', 'license_plate', 'detailing', 'coating', 'general'],
        description: 'Jenis analisis yang diinginkan'
      },
      specificRequest: {
        type: 'string',
        description: 'Permintaan khusus dari customer'
      }
    },
    required: ['imageUrl', 'analysisType']
  },
  execute: analyzeMotorImageGemini
};
