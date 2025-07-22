const embeddingCache = new Map<string, number[]>();


import dotenv from 'dotenv';
dotenv.config();



import OpenAI from 'openai';
const openai = new OpenAI();
import { Stemmer, Tokenizer } from 'sastrawijs';

const tokenizer = new Tokenizer();
const stemmer = new Stemmer();

/**
 * Fungsi stemming hybrid yang lebih tangguh.
 * 1. Menghapus imbuhan akhir umum (-nya, -ku, -mu, -lah, -kah) secara manual.
 * 2. Menggunakan Sastrawi untuk stemming lanjutan (imbuhan awal seperti me-, di-, dll).
 */
export function stemText(text: string): string {
  // PATCH: Normalisasi awal
  const cleanedText = text.toLowerCase().replace(/[?.,!]/g, '').trim();

  // 1. Pecah kalimat menjadi kata-kata (tokens)
  const tokens = tokenizer.tokenize(cleanedText);

  const processedTokens = tokens.map(token => {
    // 2. Hapus imbuhan akhir umum secara manual dari setiap token
    let manualStrippedToken = token.replace(/(-?(nya|lah|kah|ku|mu))$/, '');
    // 3. Lakukan stemming menggunakan Sastrawi pada token yang sudah bersih
    return stemmer.stem(manualStrippedToken);
  });

  // 4. Gabungkan kembali menjadi kalimat
  return processedTokens.join(' ');

}

export async function createEmbedding(text: string): Promise<number[]> {
  if (!text || text.trim() === '') {
    console.warn("Input text for embedding is empty. Returning empty vector.");
    return [];
  }

  const normalizedText = text.toLowerCase().replace(/[?.,!]/g, '').trim();
  const tokenCount = normalizedText.split(/\s+/).length;
  const shouldSkipStemming = tokenCount <= 3;
  const stemmedText = shouldSkipStemming ? normalizedText : stemText(normalizedText);

  // ✅ CACHE CHECK
  if (embeddingCache.has(stemmedText)) {
    console.log(`[CACHE HIT] "${stemmedText}"`);
    return embeddingCache.get(stemmedText)!;
  }

  console.log(`[createEmbedding] Normalized: "${normalizedText}", Stemmed: "${stemmedText}"`);

  if (stemmedText === '') {
    return [];
  }

  try {
    const response = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: stemmedText,
      encoding_format: 'float',
    });
    const embedding = response.data[0].embedding;
    embeddingCache.set(stemmedText, embedding); // ✅ simpan ke cache
    return embedding;
  } catch (error) {
    console.error('[OpenAI SDK] Gagal membuat embedding:', error);
    throw new Error('Gagal saat membuat text embedding dengan OpenAI SDK.');
  }
}