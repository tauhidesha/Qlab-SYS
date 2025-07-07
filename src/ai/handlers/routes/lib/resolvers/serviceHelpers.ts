// File: app/ai/lib/resolvers/serviceHelpers.ts

/**
 * Membuat nama layanan lebih natural untuk ditampilkan ke user.
 * Misalnya: "Repaint Cover CVT / Arm" -> "Repaint cover CVT atau arm"
 */
export function formatServiceName(serviceName: string): string {
  // Ganti tanda "/" menjadi "atau"
  const formatted = serviceName.replace(/\s*\/\s*/g, ' atau ');

  // Huruf kecil semua kecuali huruf pertama setiap kata
  return formatted
    .split(' ')
    .map((word, index) => {
      if (index === 0) return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      return word.toLowerCase();
    })
    .join(' ');
}
