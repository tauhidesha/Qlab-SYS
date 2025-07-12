// @file: src/ai/utils/getServiceCategory.ts

import allServicesData from '@/../docs/harga_layanan.json';
import levenshtein from 'js-levenshtein'; // ⬅️ pastikan package ini sudah di-install

type Category = 'coating' | 'detailing' | 'repaint' | 'cuci';
type Input = { service_name: string };
type Result = { category: Category | null };

const MAX_DISTANCE = 2;

export async function getServiceCategory({ service_name }: Input): Promise<Result> {
  const normalizedInput = service_name.toLowerCase().trim();

  // 1. Exact match
  const exactMatch = allServicesData.find(service =>
    service.name.toLowerCase().trim() === normalizedInput
  );

  if (exactMatch && isValidCategory(exactMatch.category)) {
    return { category: exactMatch.category };
  }

  // 2. Fuzzy match
  const fuzzyMatch = allServicesData
  .filter(service => isValidCategory(service.category)) // filter dulu yang valid
  .find(service => levenshtein(service.name.toLowerCase().trim(), normalizedInput) <= MAX_DISTANCE);


  if (fuzzyMatch) {
  return { category: fuzzyMatch.category as Category }; // tetap perlu cast
}



  console.warn(`[getServiceCategory] Tidak ditemukan: "${service_name}"`);
  return { category: null };
}

function isValidCategory(value: any): value is Category {
  return ['coating', 'detailing', 'repaint', 'cuci'].includes(value);
}
