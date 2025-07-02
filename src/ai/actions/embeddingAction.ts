'use server';

import OpenAI from 'openai';

// SDK akan otomatis membaca OPENAI_API_KEY dari process.env Anda.
const openai = new OpenAI();

/**
 * Fungsi ini langsung memanggil OpenAI API untuk membuat text embedding.
 * @param text Teks yang akan di-embed.
 * @returns Promise yang berisi embedding vector (array angka).
 */
export async function createEmbedding(text: string): Promise<number[]> {
  if (!text || text.trim() === '') {
    console.warn("Input text for embedding is empty. Returning empty vector.");
    return [];
  }

  try {
    const response = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: text.trim(),
      encoding_format: 'float',
    });
    return response.data[0].embedding;
  } catch (error) {
    console.error('[OpenAI SDK] Gagal membuat embedding:', error);
    throw new Error('Gagal saat membuat text embedding dengan OpenAI SDK.');
  }
}
