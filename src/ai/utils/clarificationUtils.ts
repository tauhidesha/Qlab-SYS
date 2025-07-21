// @file: src/ai/flows/clarificationUtils.ts

export function hasClarificationPending(inquiry: any): boolean {
  if (!inquiry || !inquiry.repaintDetails) return false;
  // Cek jika ada repaintDetails yang belum lengkap (missing color/specific_part)
  return Object.values(inquiry.repaintDetails).some((detail: any) => {
    return !detail.color || !detail.specific_part;
  });
}

export function generateClarificationPrompt(session: any): string {
  // Prompt sederhana, bisa dikembangkan sesuai kebutuhan
  return '[TUGAS ANDA]: Lanjutkan klarifikasi repaint berdasarkan data terakhir. Tanyakan info yang masih kurang (warna, bagian, dll) ke user.';
}
