// File: src/ai/lib/resolvers/formatAvailableSlotsSummary.ts

interface SlotResult {
  success: boolean;
  date?: string;
  availableSlots?: string[];
  reason?: string;
}

export function formatAvailableSlotsSummary(result: SlotResult): string {
  if (!result.success) {
    return result.reason || 'Wah, sepertinya ada sedikit kendala teknis untuk cek jadwal secara otomatis, bro.';
  }

  // --- PERUBAHAN: Tangani respons khusus untuk repaint ---
  if (result.availableSlots && result.availableSlots[0] === 'tersedia') {
    return 'Untuk layanan Repaint, slot kami saat ini tersedia bro. Karena pengerjaannya butuh beberapa hari, bisa langsung dibawa aja motornya ke bengkel untuk masuk antrian. Mau langsung booking sekarang?';
  }
  // --- AKHIR PERUBAHAN ---

  if (result.availableSlots && result.availableSlots.length > 0) {
    const slotsText = result.availableSlots.join(' dan ');
    return `Untuk tanggal *${result.date}*, slot kami tersedia di waktu berikut: *${slotsText}*. Mau dibooking di jam yang mana, bro?`;
  }

  return result.reason || `Untuk tanggal *${result.date}* sepertinya jadwal kami sudah penuh. Mungkin mau coba cek hari lain?`;
}
