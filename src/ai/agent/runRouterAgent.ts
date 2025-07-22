import OpenAI from 'openai';
import { routerAgentPrompt } from './routerAgent';

// Asumsikan Anda punya satu file client OpenAI terpusat untuk konsistensi
// Jika tidak, Anda bisa buat instance baru di sini
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Definisikan tipe data untuk input dan output agar kode lebih aman
interface RouterAgentInput {
  customerMessage: string;
}

// Gunakan tipe literal untuk membatasi nilai intent yang valid
type IntentCategory = 'booking_flow' | 'service_inquiry' | 'general_question' | 'chitchat';

interface RouterAgentResult {
  intent: IntentCategory;
}

export async function runRouterAgent({ customerMessage }: RouterAgentInput): Promise<RouterAgentResult> {
  console.log('[RouterAgent] Mengklasifikasikan intent pengguna...');
  
  // Siapkan hasil fallback jika terjadi error
  const fallbackResult: RouterAgentResult = { intent: 'general_question' };

  try {
    const response = await openai.chat.completions.create({
      // Model: Gunakan model yang cepat dan murah untuk tugas klasifikasi ini.
      // gpt-4o-mini atau gpt-3.5-turbo adalah pilihan yang sangat baik.
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: routerAgentPrompt },
        { role: 'user', content: customerMessage }
      ],
      // Temperature 0 untuk hasil yang paling konsisten dan tidak kreatif
      temperature: 0,
      // Ini adalah kunci utama: paksa LLM untuk selalu output JSON
      response_format: { type: 'json_object' }, 
    });

    const replyContent = response.choices[0].message.content;

    if (!replyContent) {
      console.error('[RouterAgent] Error: Respons dari OpenAI kosong.');
      return fallbackResult;
    }
    
    // Parsing JSON yang aman dengan error handling
    try {
      const parsed = JSON.parse(replyContent);
      // Validasi sederhana untuk memastikan output sesuai format
      if (parsed.intent && typeof parsed.intent === 'string') {
        console.log(`[RouterAgent] Intent terdeteksi: ${parsed.intent}`);
        return { intent: parsed.intent as IntentCategory };
      }
    } catch (parseError) {
      console.error('[RouterAgent] Error: Gagal mem-parsing JSON dari OpenAI.', parseError);
      return fallbackResult;
    }

  } catch (error) {
    console.error('[RouterAgent] Error saat memanggil OpenAI:', error);
    return fallbackResult;
  }
  
  // Jika semua pengecekan gagal, kembalikan fallback
  return fallbackResult;
}