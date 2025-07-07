// File: app/ai/lib/resolvers/formatMotorModel.ts

/**
 * Fungsi ini akan memformat model motor menjadi bentuk yang lebih enak dibaca.
 * Contoh: "vario160" ➜ "Vario 160"
 */
export function formatMotorModel(model: string): string {
  // Pisahkan angka dan huruf (misalnya "vario160" ➜ ["vario", "160"])
  const match = model.match(/^([a-zA-Z\s\-]+)(\d+)?$/);

  if (!match) return capitalizeWords(model); // fallback

  const [, prefix, number] = match;
  const formatted = number ? `${prefix} ${number}` : prefix;

  return capitalizeWords(formatted.trim());
}

function capitalizeWords(str: string): string {
  return str
    .toLowerCase()
    .split(/\s+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
