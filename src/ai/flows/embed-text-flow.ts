// File: src/ai/flows/embed-text-flow.ts (Versi Baru dengan OpenAI)

'use server';

// Impor fungsi createEmbedding yang sudah kita buat sebelumnya
import { createEmbedding } from '../actions/embeddingAction';

/**
 * Fungsi ini sekarang hanya menjadi 'wrapper' atau pemanggil
 * untuk fungsi createEmbedding yang menggunakan OpenAI SDK.
 * * Semua referensi ke Genkit dan `ai.embed` telah dihapus dari file ini.
 * * @param text Teks yang akan di-embed.
 * @returns Promise yang berisi embedding vector (array angka).
 */
export async function embedText(text: string): Promise<number[]> {
  // Langsung panggil dan kembalikan hasil dari fungsi embedding OpenAI kita.
  return await createEmbedding(text);
}


// Catatan: Bagian `embedTextFlow` yang lama telah dihapus karena
// fungsi ini tidak lagi dijalankan sebagai Genkit flow, melainkan
// sebagai Server Action biasa yang memanggil OpenAI SDK. Ini lebih
// sesuai dengan arsitektur yang kita tuju.
