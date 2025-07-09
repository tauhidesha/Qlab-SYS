// Kamu bisa taruh file ini di /ai/utils/
export function detectCategoryIntent(message: string): string | null {
  const lower = message.toLowerCase();
  if (['repaint', 'cat ulang', 'warna'].some(k => lower.includes(k))) return 'repaint';
  if (['coating', 'keramik', 'nano'].some(k => lower.includes(k))) return 'coating';
  if (['detailing', 'detail'].some(k => lower.includes(k))) return 'detailing';
  if (['cuci', 'wash', 'clean', 'bersih'].some(k => lower.includes(k))) return 'cuci';
  return null;
}
