// File: app/ai/lib/resolvers/isSpecialPaint.ts

const specialKeywords = [
  'candy',
  'bunglon',
  'hologram',
  'xyrallic',
  'xyralic',
  'lembayung',
  'warna efek',
];

export function isSpecialPaint(input: string): boolean {
  const msg = input.toLowerCase();
  return specialKeywords.some((keyword) => msg.includes(keyword));
}
