// File: src/ai/handlers/routes/handleScheduleInquiry.ts

import type { RouteHandlerFn } from './types';
import type { SessionData, ServiceInquiry } from '../../utils/session';
import { findNextAvailableSlotTool } from '../../tools/findNextAvailableSlotTool';
import { updateSession } from '../../utils/session';
import { mapTermToOfficialService } from '../../utils/messageParsers';
// Pastikan path ke formatter baru ini benar
import { formatScheduleResponse } from './lib/resolvers/formatScheduleResponse';

export const handleScheduleInquiry: RouteHandlerFn = async ({
  session,
  message,
  senderNumber,
}) => {
  console.log(`[handleScheduleInquiry] Menjalankan untuk pesan: "${message}"`);

  // 1. Dapatkan konteks layanan dari pesan atau sesi
  const serviceName =
    mapTermToOfficialService(message!) || session?.inquiry?.lastMentionedService;
  console.log(
    `[handleScheduleInquiry] Konteks layanan terdeteksi: "${serviceName}"`,
  );

  // 2. Panggil tool untuk mencari jadwal
   const result = await findNextAvailableSlotTool({
    preferred_date: message,
    service_name: serviceName,
  });
  
 

  // 3. Gunakan formatter cerdas untuk membuat kalimat balasan
  const replyMessage = formatScheduleResponse(result);

  // 4. Siapkan sesi yang akan di-update
  let updatedSession = { ...session, lastRoute: 'schedule' } as SessionData;
  if (result.success && result.availableSlots.length > 0) {
    const firstSlot = result.availableSlots[0];

    const newInquiry: ServiceInquiry = {
      ...session?.inquiry,
      pendingBookingDate: firstSlot.date,
    };

    // Hanya simpan waktu jika hanya ada SATU slot yang ditawarkan
    if (result.availableSlots.length === 1 && firstSlot.time) {
      newInquiry.pendingBookingTime = firstSlot.time;
    } else {
      // Hapus pending time jika ada beberapa opsi, untuk menghindari konfirmasi yang salah
      delete newInquiry.pendingBookingTime;
    }

    updatedSession = {
      ...updatedSession,
      inquiry: newInquiry,
    };
  }

  // 5. Simpan sesi yang sudah diperbarui ke database
  if (senderNumber) {
    await updateSession(senderNumber, updatedSession);
  }

  // 6. Kembalikan hasil
  return {
    reply: { message: replyMessage },
    updatedSession: updatedSession,
  };
};