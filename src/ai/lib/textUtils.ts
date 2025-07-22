// @file: src/ai/lib/textUtils.ts
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
