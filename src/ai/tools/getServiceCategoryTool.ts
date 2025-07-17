// @file: src/ai/utils/getServiceCategory.ts

import hargaLayanan from '@/data/hargaLayanan';
import levenshtein from 'js-levenshtein'; // ⬅️ pastikan package ini sudah di-install

type Category = 'coating' | 'detailing' | 'repaint' | 'cuci';
type Input = { service_name: string };
type Result = { category: Category | null };

const MAX_DISTANCE = 2;

export async function getServiceCategory({ service_name }: Input): Promise<Result> {
  const normalizedInput = service_name.toLowerCase().trim();
  console.log(`[getServiceCategory] Input:`, service_name, '| Normalized:', normalizedInput);

  // 1. Exact match
  const exactMatch = hargaLayanan.find(service =>
    service.name.toLowerCase().trim() === normalizedInput
  );

  if (exactMatch && isValidCategory(exactMatch.category)) {
    console.log(`[getServiceCategory] Exact match:`, exactMatch.name, '| Category:', exactMatch.category);
    return { category: exactMatch.category };
  }

  // 2. Fuzzy match
  const fuzzyMatch = hargaLayanan
    .filter(service => isValidCategory(service.category)) // filter dulu yang valid
    .find(service => levenshtein(service.name.toLowerCase().trim(), normalizedInput) <= MAX_DISTANCE);

  if (fuzzyMatch) {
    console.log(`[getServiceCategory] Fuzzy match:`, fuzzyMatch.name, '| Category:', fuzzyMatch.category);
    return { category: fuzzyMatch.category as Category }; // tetap perlu cast
  }

  console.warn(`[getServiceCategory] Tidak ditemukan: "${service_name}"`);
  return { category: null };
}

function isValidCategory(value: any): value is Category {
  return ['coating', 'detailing', 'repaint', 'cuci'].includes(value);
}
