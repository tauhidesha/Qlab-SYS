// File: src/ai/handlers/routes/lib/resolvers/formatScheduleResponse.ts

import type { FindSlotResult } from '@/types/ai/tools';
import { formatDayName } from './dateHelpers'; // Asumsi helper ini ada

export function formatScheduleResponse(result: FindSlotResult): string {
  // Dengan 'result.success === false', TypeScript tahu bahwa 'result'
  // di dalam blok ini PASTI bertipe FindSlotError, yang memiliki 'reason'.
  if (result.success === false) {
    return result.reason;
  }

  // Dari sini ke bawah, TypeScript tahu 'result' PASTI bertipe FindSlotSuccess.
  const { requestedDate, availableSlots } = result;
  
  if (availableSlots.length === 0) {
      return `Maaf bro, jadwal sangat padat.`;
  }

  const firstSlot = availableSlots[0];
  
  // Kasus khusus untuk penawaran antrian repaint
  if (firstSlot.day === 'Repaint') {
      return 'Untuk layanan Repaint, slot kami saat ini tersedia bro. Karena pengerjaannya butuh beberapa hari, motor bisa langsung dibawa ke bengkel untuk masuk antrian. Mau langsung booking sekarang?';
  }

  const isDifferentDate = requestedDate && firstSlot.date !== requestedDate;

  if (isDifferentDate) {
    const offeredDate = new Date(firstSlot.date + 'T00:00:00');
    return `Maaf bro, untuk tanggal ${requestedDate} sepertinya sudah penuh. Slot kosong berikutnya ada di hari *${formatDayName(offeredDate)} jam ${firstSlot.time}*. Mau diambil?`;
  } else {
    const slotsText = availableSlots.map(slot => `*${slot.time}*`).join(', ');
    return `Siap bro, untuk tanggal *${firstSlot.date}* ada slot kosong di jam: ${slotsText}. Mau diambil jam berapa?`;
  }
}