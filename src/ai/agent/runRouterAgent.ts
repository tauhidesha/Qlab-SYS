import OpenAI from 'openai';
import { routerAgentPrompt } from './routerAgent';

// Asumsikan Anda punya satu file client OpenAI terpusat untuk konsistensi
// Jika tidak, Anda bisa buat instance baru di sini
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || '' });

// Definisikan tipe data untuk input dan output agar kode lebih aman
interface RouterAgentInput {
  customerMessage: string;
  lastAssistantMessage?: string; // <-- Tambahkan parameter baru
}

// Gunakan tipe literal untuk membatasi nilai intent yang valid
type IntentCategory = 'booking_flow' | 'service_inquiry' | 'service_detail_inquiry' | 'general_question' | 'chitchat';

const validIntents = [
  'booking_flow',
  'service_inquiry',
  'service_detail_inquiry',
  'general_question',
  'chitchat',
] as const;

function isValidIntent(intent: string): intent is IntentCategory {
  return validIntents.includes(intent as IntentCategory);
}

interface RouterAgentResult {
  intent: IntentCategory;
}

export async function runRouterAgent({ customerMessage, lastAssistantMessage }: RouterAgentInput): Promise<RouterAgentResult> {
  console.log('[RouterAgent] Mengklasifikasikan intent pengguna...');

  // Siapkan hasil fallback jika terjadi error
  const fallbackResult: RouterAgentResult = { intent: 'general_question' };

  // Buat pesan user yang lebih kaya konteks
  const contextualUserMessage = `Pesan Terakhir Zoya: "${lastAssistantMessage || 'Tidak ada, ini pesan pertama.'}"
\n\nPesan Baru Pengguna: "${customerMessage}"`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: routerAgentPrompt },
        { role: 'user', content: contextualUserMessage }
      ],
      temperature: 0,
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
      // Validasi intent dengan helper agar lebih aman
      if (parsed.intent && typeof parsed.intent === 'string' && isValidIntent(parsed.intent)) {
        console.log(`[RouterAgent] Intent terdeteksi: ${parsed.intent}`);
        return { intent: parsed.intent };
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