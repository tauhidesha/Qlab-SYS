
import allServicesData from '@/../docs/harga_layanan.json';
import levenshtein from 'js-levenshtein'; // ⬅️ pastikan package ini sudah di-install

type Input = {
  service_name: string;
};

type Result = {
  category: 'coating' | 'detailing' | 'repaint' | 'cuci' | null;
};

// Ambang batas typo maksimum (semakin besar, semakin longgar)
const MAX_DISTANCE = 2;

export async function getServiceCategory({ service_name }: Input): Promise<Result> {
  const normalizedInput = service_name.toLowerCase().trim();

  // Langkah 1: Cari exact match dulu
  const exactMatch = allServicesData.find(service =>
    service.name.toLowerCase().trim() === normalizedInput
  );

  if (exactMatch) {
    return {
      category: exactMatch.category as Result['category']
    };
  }

  // Langkah 2: Fuzzy matching kalau exact tidak ketemu
  const fuzzyMatch = allServicesData.find(service => {
    const a = service.name.toLowerCase().trim();
    const b = normalizedInput;
    return levenshtein(a, b) <= MAX_DISTANCE;
  });

  if (fuzzyMatch) {
    console.warn(`[getServiceCategory] Fuzzy match: "${service_name}" ≈ "${fuzzyMatch.name}"`);
    return {
      category: fuzzyMatch.category as Result['category']
    };
  }

  console.warn(`[getServiceCategory] Tidak ditemukan: "${service_name}"`);
  return { category: null };
}

