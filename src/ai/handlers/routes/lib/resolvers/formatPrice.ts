// File: app/ai/lib/resolvers/formatPrice.ts

/**
 * Mengubah angka menjadi format harga rupiah.
 * Bisa pakai gaya formal ("Rp250.000") atau singkat ("250rb", "1jt").
 */
export function formatPrice(
  value: number,
  options?: { style?: 'formal' | 'short' }
): string {
  const style = options?.style || 'formal';

  if (style === 'short') {
    if (value >= 1_000_000) {
      return `${Math.round(value / 1_000_000)}jt`;
    }
    if (value >= 1_000) {
      return `${Math.round(value / 1_000)}rb`;
    }
    return `${value}`;
  }

  // Format formal: "Rp250.000"
  return `Rp${value.toLocaleString('id-ID')}`;
}
