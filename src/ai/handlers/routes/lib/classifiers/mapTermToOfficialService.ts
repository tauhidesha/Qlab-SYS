// Load environment variables from .env for test/dev
require('dotenv').config();
// @file: src/ai/mapTermToOfficialService.ts (REFACTORED - TOKEN OPTIMIZED)

import OpenAI from 'openai';
import { wrapOpenAI } from 'langsmith/wrappers';
import { getServiceDescriptionTool } from '../../../../tools/getServiceDescriptionTool';
import type { MappedServiceResult, MappedServiceItem, Session } from '../../../../../types/ai';

const openai = wrapOpenAI(new OpenAI({ apiKey: process.env.OPENAI_API_KEY }));

/**
 * Memetakan pesan pengguna ke layanan resmi dengan optimisasi token.
 * Menggunakan tool calls untuk mengakses data layanan secara efisien.
 */
export async function mapTermToOfficialService(
  input: { message: string; session?: Session }
): Promise<MappedServiceResult> {

  // Daftar nama layanan resmi

  const fallbackResult: MappedServiceResult = {
    reasoning: 'Fallback triggered due to an internal API or parsing error.',
    requestedServices: [
      {
        serviceName: 'General Inquiry',
        status: 'non_service',
        missingInfo: [],
        notes: 'Failed to process the AI response.',
      },
    ],
  };

  // Daftar nama layanan resmi

  // PATCH: Accept session and use last conversation
  const latestMessage = input.message.trim();
  const lastAssistant = input.session?.chatHistory?.slice().reverse().find(msg => msg.role === 'assistant')?.content;
const aiMapperInput = [
  {
    role: 'system',
    content: `ANDA ADALAH AI MAPPER LAYANAN DETAILING MOTOR YANG ROBUST DAN TYPE-SAFE. 
    # PERAN DAN BATASAN ANDA (PALING PENTING!)
- Peran Anda **HANYA SEBAGAI PEMETA (MAPPER)**. Tugas Anda adalah membaca teks dari user dan mengubahnya menjadi output JSON yang valid sesuai nama layanan resmi.
- Anda **BUKAN** asisten penjawab. Anda **TIDAK BOLEH** mencoba menjawab pertanyaan user.
- Anda **TIDAK MEMILIKI AKSES ke database harga**, dan itu **TIDAK APA-APA**. Tugas menyediakan harga akan dilakukan oleh sistem lain SETELAH Anda selesai melakukan pemetaan.
- Justru karena Anda tidak tahu harga, jika user bertanya soal harga sebuah layanan, itu adalah sinyal kuat bahwa Anda harus **MEMETAKAN LAYANAN TERSEBUT**, bukan menghindarinya.
NAMA LAYANAN RESMI (serviceName): "Repaint Bodi Halus", "Repaint Bodi Kasar", "Repaint Velg", "Repaint Cover CVT / Arm", "Cuci Reguler", "Cuci Premium", "Detailing Mesin", "Cuci Komplit", "Poles Bodi Glossy", "Full Detailing Glossy", "Coating Motor Doff", "Coating Motor Glossy", "Complete Service Doff", "Complete Service Glossy"

PENTING:
- Selalu outputkan reasoning dan requestedServices (array).
- Output WAJIB valid JSON, tidak boleh ada trailing koma, tidak boleh ada field null/undefined.
- Selalu beri CONTOH OUTPUT JSON di akhir prompt.

ATURAN INTI:
- Pertanyaan mengenai harga adalah pertanyaan layanan spesifik, jangan dialihkan ke pertanyaan umum!!!!
- Repaint: Hanya tanyakan 'specific_part' & 'color' (JANGAN 'finish' atau 'risk_confirmation_doff').
- Detailing/Coating: Hanya tanyakan 'finish', 'risk_confirmation_doff', 'detailing_level' (JANGAN 'color').
- Gabung 'detailing' + 'coating' → 'Complete Service'.
- Finish 'doff' + poles → butuh 'risk_confirmation_doff'.
- Risiko ditolak → fallback: 'Full Detailing' → 'Cuci Komplit', 'Poles Bodi' → 'Detailing Mesin'.
- Pertanyaan umum → WAJIB!!! serviceName: 'General Inquiry', status: 'non_service'.

ATURAN KHUSUS:
- Jika user ingin repaint sekaligus minta detailing, default mapping otomatis tambahkan 'Full Detailing Glossy' ke requestedServices dengan status 'confirmed' untuk bagian detailing, kecuali user secara spesifik meminta alternatif. Jelaskan logika ini di reasoning.
- Status pada 'Full Detailing Glossy' harus 'confirmed' dalam kasus ini.
- Layanan repaint tetap mapping sesuai aturan inti di atas.
- Jika ada lebih dari satu layanan, semua tetap masuk ke requestedServices.
- Jika user sebut 'full detailing' = 'Full Detailing Glossy', status 'confirmed'.

KHUSUS UNTUK 'specific_part':
- Hanya tambahkan 'specific_part' ke missingInfo jika user TIDAK menyebut bagian spesifik (misal: "bodi halus", "bodi kasar", "velg", "cover cvt", "arm").
- Jika user sudah menyebut bagian, JANGAN tambahkan 'specific_part' ke missingInfo.
- Jika ada notes yang menyebut bagian spesifik, JANGAN tambahkan 'specific_part' ke missingInfo.
- UNTUK KASUS repaint (termasuk repaint + detailing), WAJIB lakukan klarifikasi 'specific_part' jika user BELUM jelas sebutkan bagian mana yang ingin di-repaint.

GUNAKAN TOOL: Panggil getServiceDescription untuk info layanan spesifik.

EDGE CASE:
- Jika user tanya umum, mapping ke 'General Inquiry' dan status 'non_service'.
- Jika ada lebih dari satu layanan, semua harus masuk ke requestedServices.
- Jika ada lebih dari satu klarifikasi, gabungkan semua ke missingInfo.

# Steps

1. Analisis intent dan permintaan user.
2. Terapkan aturan inti dan aturan khusus secara berurutan.
3. Outputkan reasoning (berisi detail langkah penalaran dan interpretasi atas kondisi user, termasuk kenapa 'Full Detailing Glossy' muncul otomatis jika repaint+detailing).
4. Outputkan requestedServices sesuai mapping.
5. Gunakan valid JSON tanpa field kosong/null, urutan field seperti contoh.
6. Jika case special (repaint + detailing), jelaskan rule di reasoning.
7. Outputkan minimal satu contoh penuh JSON untuk kasus ini.

# Output Format

Selalu outputkan dalam bentuk valid JSON, tanpa spasi/enter ekstra tak perlu, urutannya:
- reasoning (alasan utama, penjelasan detail chain of thought)
- requestedServices (array of objects dengan field wajib sesuai mapping aturan di atas)

# Examples

Contoh Output untuk kasus repaint + detailing (full default glossy detailing, status confirmed, BELUM sebut bagian mana yang ingin repaint):

{
  "reasoning": "User meminta repaint dan juga ingin detailing sekaligus. Berdasarkan aturan khusus, karena user ingin repaint sekaligus detailing, sistem menambahkan layanan 'Full Detailing Glossy' secara default dengan status 'confirmed' untuk memastikan detailing terbaik, kecuali user memilih layanan detailing lain. Untuk repaint, karena user belum menyebut bagian spesifik yang ingin direpaint, perlu klarifikasi 'specific_part', serta tetap perlu tanya warna.",
  "requestedServices": [
    {
      "serviceName": "Full Detailing Glossy",
      "status": "confirmed",
      "missingInfo": [],
      "notes": "Ditambahkan otomatis karena repaint + detailing."
    },
    {
      "serviceName": "Repaint Bodi Halus",
      "status": "clarification_needed",
      "missingInfo": ["specific_part", "color"],
      "notes": "User belum sebut bagian spesifik, perlu klarifikasi part dan warna."
    }
  ]
}

# Contoh Salah: Kesalahan Umum yang Harus Dihindari
### User Message: "full detailing xmax berapa yaa?"
### Output JSON yang SALAH: {
  "reasoning": "Ini adalah pertanyaan harga, jadi masuk ke General Inquiry.", // <-- ALASAN INI SALAH!
  "requestedServices": [ { "serviceName": "General Inquiry", "status": "non_service" } ] // <-- MAPPING INI SALAH!
 }
(Contoh lain tetap gunakan format di atas, sesuaikan sesuai scenario dan aturan.)

# Notes

- Selalu utamakan penjelasan chain of thought sebelum conclusion (field reasoning WAJIB urut paling atas, lalu requestedServices).
- Pada kasus repaint + detailing, penjelasan reasoning WAJIB eksplisit menunjukkan alasan 'Full Detailing Glossy' muncul otomatis confirmed, dan klarifikasi 'specific_part' WAJIB jika user belum sebut bagian.
- Setiap requestedServices WAJIB disertai field complete dan notes sesuai rule.
- JSON WAJIB valid, tidak ada trailing koma atau field kosong.

**Penting: Ikuti instruksi output dan mapping dengan ketat, outputkan reasoning terlebih dahulu, baru requestedServices.**`
  },
  ...(lastAssistant ? [{ role: 'assistant', content: lastAssistant }] : []),
  { role: 'user', content: latestMessage }
];



  // --- LOGIC UTAMA: panggil OpenAI, handle tool calls, robust fallback ---
  try {
    // Cek cache mapping (opsional, bisa dihapus jika tidak ingin cache)
    const cached = getCachedMapping(latestMessage);
    if (cached) return cached;

    // 1. Panggil OpenAI dengan tool call
    const completion = await openai.chat.completions.create({
      model: 'gpt-4.1-mini',
      messages: aiMapperInput as any,
      temperature: 0.3,
      tools: [getServiceDescriptionTool.toolDefinition],
      tool_choice: 'auto',
      response_format: { type: 'json_object' },
    });

    const choice = completion.choices[0];
    if (!choice?.message) {
      console.error('[AI MAPPER] Error: No message from OpenAI.');
      return fallbackResult;
    }

    // 2. Handle tool calls jika AI butuh info layanan
    if (choice.message.tool_calls && choice.message.tool_calls.length > 0) {
      const toolMessages: any[] = [
        ...aiMapperInput,
        choice.message,
      ];

      for (const toolCall of choice.message.tool_calls) {
        if (toolCall.function.name === 'getServiceDescription') {
          try {
            const args = JSON.parse(toolCall.function.arguments);
            const result = await getServiceDescriptionTool.implementation(args);
            toolMessages.push({
              role: 'tool',
              tool_call_id: toolCall.id,
              content: JSON.stringify(result),
            });
          } catch (err) {
            console.error('[AI MAPPER] Tool call error:', err);
            toolMessages.push({
              role: 'tool',
              tool_call_id: toolCall.id,
              content: JSON.stringify({ success: false, error: 'tool_error' }),
            });
          }
        }
      }

      // 3. Second API call dengan hasil tool
      const secondCompletion = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: toolMessages as any,
        temperature: 0.3,
        response_format: { type: 'json_object' },
      });

      const finalReply = secondCompletion.choices[0]?.message?.content;
      if (!finalReply) {
        console.error('[AI MAPPER] Error: No final response from OpenAI.');
        return fallbackResult;
      }

      const parsed = parseAndValidateResult(finalReply, fallbackResult);
      setCachedMapping(latestMessage, parsed);
      return parsed;
    }

    // 4. Jika tidak ada tool calls, parse langsung
    const directReply = choice.message.content;
    if (!directReply) {
      console.error('[AI MAPPER] Error: No direct response from OpenAI.');
      return fallbackResult;
    }

    const parsed = parseAndValidateResult(directReply, fallbackResult);
    setCachedMapping(latestMessage, parsed);
    console.log('[AI MAPPER][RESULT]', JSON.stringify(parsed, null, 2));
    return parsed;

  } catch (error) {
    console.error('[AI MAPPER] Error calling OpenAI:', error);
    return fallbackResult;
  }
}

/**
 * Helper function untuk parsing dan validasi hasil AI
 */
function parseAndValidateResult(
  aiReply: string, 
  fallbackResult: MappedServiceResult
): MappedServiceResult {
  try {
    // Only parse if reply is valid JSON
    const parsed = JSON.parse(aiReply);
    // Backend filter: hapus 'specific_part' dari missingInfo jika bagian sudah jelas di notes
    if (Array.isArray(parsed?.requestedServices)) {
      parsed.requestedServices = parsed.requestedServices.map((item: any) => {
        if (
          item.missingInfo &&
          Array.isArray(item.missingInfo) &&
          item.notes &&
          typeof item.notes === 'string' &&
          item.missingInfo.includes('specific_part')
        ) {
          // Jika notes sudah sebut bagian spesifik, hapus 'specific_part'
          const lowerNotes = item.notes.toLowerCase();
          const parts = ['bodi halus', 'bodi kasar', 'velg', 'cover cvt', 'arm'];
          if (parts.some((p) => lowerNotes.includes(p))) {
            item.missingInfo = item.missingInfo.filter((x: string) => x !== 'specific_part');
          }
        }
        return item;
      });
    }
    return parsed;
  } catch (err) {
    console.error('[AI MAPPER] JSON parse error:', err);
    return fallbackResult;
  }
}

/**
 * Optional: Helper function untuk cache hasil mapping
 * Gunakan jika ingin menghindari API calls yang sama
 */
const mappingCache = new Map<string, MappedServiceResult>();

export function getCachedMapping(message: string): MappedServiceResult | null {
  const cacheKey = message.toLowerCase().trim();
  return mappingCache.get(cacheKey) || null;
}

export function setCachedMapping(message: string, result: MappedServiceResult): void {
  const cacheKey = message.toLowerCase().trim();
  mappingCache.set(cacheKey, result);
  
  // Simple cache cleanup - keep only last 100 entries
  if (mappingCache.size > 100) {
    const firstKey = mappingCache.keys().next().value;
    mappingCache.delete(firstKey);
  }
}