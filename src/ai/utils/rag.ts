
/**
 * MENGUBAH PESAN USER MENJADI PERTANYAAN/QUERY YANG JELAS
 */
export async function transformQuery(userMessage: string, chatHistory: any[]): Promise<string> {
  console.log(`[RAG] Mentransformasi pesan user: "${userMessage}"`);

  // Jika pesan user sudah cukup panjang & jelas, kita bisa lewati transformasi
  if (userMessage.split(' ').length > 5) {
    return userMessage;
  }

  const historyString = chatHistory.map(m => `${m.role}: ${m.content}`).join('\n');

  const queryGenPrompt = `
Berdasarkan riwayat percakapan dan pesan terakhir user, ubah pesan terakhir user menjadi sebuah PERTANYAAN yang lengkap dan spesifik untuk mencari informasi di database.

CONTOH 1:
History:
assistant: "Untuk repaintnya, mau yang glossy atau doff?"
user: "doff aja"
PERTANYAAN YANG DIHASILKAN: "Harga repaint untuk cat doff"

CONTOH 2:
History: (kosong)
user: "tertarik promo kak, motor saya xmax"
PERTANYAAN YANG DIHASILKAN: "Info promo bundling untuk motor Yamaha Xmax"

---
RIWAYAT PERCAKAPAN:
${historyString}

PESAN TERAKHIR USER: "${userMessage}"
PERTANYAAN YANG DIHASILKAN:`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4.1-mini',
      messages: [{ role: 'user', content: queryGenPrompt }],
      temperature: 0,
    });
    const transformedQuery = response.choices[0].message.content || userMessage;
    console.log(`[RAG] Query setelah transformasi: "${transformedQuery}"`);
    return transformedQuery.trim();
  } catch (error) {
    console.error('[RAG] Gagal mentransformasi query:', error);
    return userMessage; // Fallback ke pesan asli jika gagal
  }
}
// @file: src/ai/utils/rag.ts


import { createClient } from '@supabase/supabase-js';
import { OpenAI } from 'openai';
import * as dotenv from 'dotenv';

dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY!;
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function createEmbedding(text: string) {
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text.replace(/\n/g, ' '),
  });
  return response.data[0].embedding;
}

/**
 * Mencari konteks yang relevan dari pgvector berdasarkan pertanyaan user.
 */
export async function searchKnowledgeBase(userQuery: string): Promise<string> {
  console.log(`[RAG] Mencari di pgvector untuk query: "${userQuery}"`);

  // 1. Buat embedding dari pertanyaan user
  const queryEmbedding = await createEmbedding(userQuery);

  // 2. Panggil fungsi SQL 'match_documents' yang sudah kita buat
  const { data: documents, error } = await supabase.rpc('match_documents', {
    query_embedding: queryEmbedding,
    match_threshold: 0.4, // Tingkat kemiripan minimum (0.0 - 1.0)
    match_count: 5,       // Jumlah hasil teratas yang diambil
  });

  if (error) {
    console.error('[RAG] Error saat mencari di Supabase:', error);
    return "Maaf, terjadi error saat Zoya mencoba mengingat informasi.";
  }

  if (!documents || documents.length === 0) {
    return "Zoya tidak menemukan informasi yang relevan.";
  }

  // 3. Format hasilnya menjadi satu blok teks konteks
  const retrievedContext = documents
    .map(doc => doc.content)
    .join('\n---\n');

  console.log('[RAG] Konteks yang ditemukan:', retrievedContext);
  return retrievedContext;
}
