// src/ai/utils/getServiceCategory.ts

export function getServiceCategory(serviceName: string): 'detailing' | 'coating' | 'repaint' | 'cuci' | 'unknown' {
  const name = serviceName.toLowerCase();

  if (name.includes('coating')) return 'coating';
  if (name.includes('detailing')) return 'detailing';
  if (name.includes('repaint') || name.includes('cat')) return 'repaint';
  if (name.includes('cuci') || name.includes('wash')) return 'cuci';

  return 'unknown';
}
