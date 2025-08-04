// @file: src/ai/tools/vision/analyzeMotorImage.ts
import { z } from 'zod';
import { openai } from '@/lib/openai';
import { createTraceable } from '@/lib/langsmith';

const analyzeMotorImageSchema = z.object({
  imageUrl: z.string().url().describe('URL gambar motor yang akan dianalisis'),
  analysisType: z.enum(['condition', 'damage', 'color', 'license_plate', 'detailing', 'coating', 'general']).describe('Jenis analisis yang diinginkan'),
  specificRequest: z.string().optional().describe('Permintaan khusus dari customer')
});

export const analyzeMotorImageTool = {
  name: 'analyzeMotorImage',
  description: 'Analisis gambar motor menggunakan AI vision untuk berbagai keperluan Bosmat',
  schema: analyzeMotorImageSchema,
  implementation: createTraceable(async (input: z.infer<typeof analyzeMotorImageSchema>) => {
    console.log('[analyzeMotorImageTool] Starting image analysis:', input.analysisType);
    
    try {
      // Prepare analysis prompt based on type
      let analysisPrompt = '';
      
      switch (input.analysisType) {
        case 'condition':
          analysisPrompt = `
Analisis kondisi motor ini untuk layanan Bosmat. Berikan informasi:
1. **Kondisi Cat**: Tingkat oksidasi, goresan, pudar (skala 1-10)
2. **Area Bermasalah**: Bagian yang perlu dicat ulang
3. **Tingkat Kerusakan**: Ringan/Sedang/Berat
4. **Estimasi Pekerjaan**: Berapa hari pengerjaan di Bosmat
5. **Rekomendasi Service**: Paket yang cocok

Format jawaban dalam bahasa Indonesia yang ramah untuk customer WhatsApp.
          `;
          break;
          
        case 'detailing':
          analysisPrompt = `
Analisis kebutuhan detailing motor untuk layanan Bosmat:
1. **Tingkat Kotoran**: Debu, lumpur, oli, karat (skala 1-10)
2. **Area Fokus**: Mesin, bodi, velg, rantai yang perlu pembersihan
3. **Jenis Kotoran**: Berminyak, berdebu, berkarat, noda membandel
4. **Paket Detailing**: Cuci Komplit, Detailing Mesin, Full Detailing Glossy
5. **Estimasi Waktu**: Berapa lama proses detailing
6. **Tips Maintenance**: Saran perawatan setelah detailing

Berikan rekomendasi paket detailing yang sesuai kondisi motor.
          `;
          break;
          
        case 'coating':
          analysisPrompt = `
Analisis kebutuhan coating motor untuk proteksi Bosmat:
1. **Kondisi Permukaan**: Kualitas cat, goresan micro, oksidasi
2. **Tingkat Proteksi**: Seberapa butuh coating (skala 1-10)
3. **Jenis Coating**: Doff, Glossy, atau Ceramic yang cocok
4. **Persiapan**: Area yang perlu poles/detailing dulu
5. **Durabilitas**: Estimasi tahan berapa lama
6. **Manfaat**: Anti air, anti UV, anti gores ringan

Rekomendasikan: Coating Motor Doff, Glossy, atau Complete Service.
          `;
          break;
          
        case 'damage':
          analysisPrompt = `
Analisis kerusakan motor untuk estimasi biaya service Bosmat:
1. **Jenis Kerusakan**: Lecet, penyok, karat, dll
2. **Tingkat Kerusakan**: 1-5 scale
3. **Area Terdampak**: Bagian motor yang rusak  
4. **Estimasi Biaya**: Range harga berdasarkan kerusakan
5. **Waktu Pengerjaan**: Estimasi hari

Jawab dengan bahasa yang mudah dipahami customer.
          `;
          break;
          
        case 'color':
          analysisPrompt = `
Identifikasi warna motor untuk layanan cat Bosmat:
1. **Warna Utama**: Warna dominan motor
2. **Warna Detail**: Warna strip, accent, dll
3. **Kondisi Warna**: Pudar, masih bagus, perlu touch-up
4. **Rekomendasi Cat**: Warna yang tersedia di Bosmat
5. **Tingkat Kesulitan**: Cat ulang mudah/sedang/sulit

Berikan info yang membantu customer memilih paket cat.
          `;
          break;
          
        case 'license_plate':
          analysisPrompt = `
Baca plat nomor motor untuk pendaftaran service:
1. **Nomor Plat**: Baca nomor dengan teliti
2. **Area Kode**: Kode wilayah (B, D, F, dll)
3. **Kondisi Plat**: Jelas/buram/rusak
4. **Catatan**: Jika ada kesulitan membaca

Jawab dengan format: "Plat nomor: [nomor]"
          `;
          break;
          
        default:
          analysisPrompt = `
Analisis umum motor ini untuk layanan Bosmat (Detailing, Coating, Repaint):
1. **Jenis Motor**: Brand dan tipe jika bisa diidentifikasi
2. **Kondisi Umum**: Overall assessment untuk semua layanan
3. **Rekomendasi Prioritas**: 
   - Detailing: Jika kotor/berdebu
   - Coating: Jika butuh proteksi
   - Repaint: Jika cat rusak/pudar
4. **Paket Cocok**: Saran paket service yang tepat
5. **Catatan**: Hal menarik lainnya

${input.specificRequest ? `Permintaan khusus: ${input.specificRequest}` : ''}
          `;
      }
      
      // Call GPT-4.1 mini with vision
      const completion = await openai.chat.completions.create({
        model: 'gpt-4.1-mini', // Uses vision capabilities
        messages: [
          {
            role: 'system',
            content: 'Kamu adalah teknisi ahli Bosmat yang bisa analisis motor dari foto. Berikan analisis yang akurat dan helpful untuk customer.'
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: analysisPrompt
              },
              {
                type: 'image_url',
                image_url: {
                  url: input.imageUrl,
                  detail: 'high' // Use high detail for better analysis
                }
              }
            ]
          }
        ],
        temperature: 0.3, // Lower temperature for more consistent analysis
        max_tokens: 800
      });
      
      const analysis = completion.choices[0]?.message?.content || 'Maaf, tidak bisa menganalisis gambar saat ini.';
      
      // Log usage for cost monitoring
      const usage = completion.usage;
      console.log('[analyzeMotorImageTool] Token usage:', usage);
      
      // Prepare structured result
      const result = {
        success: true,
        analysisType: input.analysisType,
        analysis: analysis,
        imageUrl: input.imageUrl,
        tokenUsage: usage,
        timestamp: new Date().toISOString(),
        specificRequest: input.specificRequest
      };
      
      console.log('[analyzeMotorImageTool] Analysis completed successfully');
      
      return {
        success: true,
        message: `Analisis ${input.analysisType} berhasil dilakukan`,
        data: result,
        response: analysis // This will be sent to customer
      };
      
    } catch (error) {
      console.error('[analyzeMotorImageTool] Error:', error);
      
      return {
        success: false,
        message: 'Maaf, gagal menganalisis gambar. Coba kirim ulang foto yang lebih jelas ya mas.',
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }, 'analyzeMotorImage', ['ai-vision', 'motor-analysis'])
};

export default analyzeMotorImageTool;
