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
