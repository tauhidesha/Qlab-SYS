// File: src/ai/handlers/routes/handleBookingConfirmation.ts

import type { RouteHandlerFn } from './types';
import type { SessionData } from '../../utils/session';
import { updateSession } from '../../utils/session';
// Pastikan helper ini ada dan path-nya benar
import { getClientName } from '../../utils/clientHelpers'; 

export const handleBookingConfirmation: RouteHandlerFn = async ({
  session,
  senderNumber,
}) => {
  console.log('[Handler] Konfirmasi booking terdeteksi. Menyiapkan form pre-filled...');

  // --- PERBAIKAN LOGIKA & TIPE DATA ---
  let layanan = '';
  let motor = '';
  let tanggal = '';
  let jam = '';

  const bookingState = session?.inquiry?.bookingState;
  const inquiryData = session?.inquiry;

  // Prioritaskan data dari bookingState jika ada
  if (bookingState?.serviceName && bookingState.bookingDate && bookingState.bookingTime) {
    layanan = bookingState.serviceName;
    motor = bookingState.vehicleInfo || inquiryData?.lastMentionedMotor || 'Belum disebutkan';
    tanggal = bookingState.bookingDate;
    jam = bookingState.bookingTime;
  } 
  // Jika tidak, gunakan data dari penawaran jadwal sebelumnya
  else if (inquiryData?.pendingBookingDate) {
    layanan = inquiryData.lastMentionedService || '';
    motor = inquiryData.lastMentionedMotor || 'Belum disebutkan';
    tanggal = inquiryData.pendingBookingDate;
    jam = inquiryData.pendingBookingTime || '';
  }
  // --- AKHIR PERBAIKAN ---

  // Validasi minimal: kita harus punya tanggal dan layanan
  if (!tanggal || !layanan) {
    return {
      reply: {
        message: 'Waduh, sepertinya ada data yang kurang lengkap. Coba kita ulangi dari cek jadwal ya, bro.',
      },
      updatedSession: { ...session, lastRoute: 'booking_confirmation_failed' } as SessionData,
    };
  }
  
  // Ambil nama dari koleksi lain untuk diisi ke form
  const clientName = await getClientName(senderNumber!);

  // --- BUAT TEMPLATE FORM ---
  const bookingTemplate = `Siap, gaskeun! 🔥
Biar datanya akurat, tolong cek dan lengkapi data di bawah ini ya, bro. Kalau sudah benar, tinggal kirim aja.

Nama : ${clientName || ''}
No Hp : ${senderNumber?.replace('@c.us', '') || ''}
TANGGAL : ${tanggal}
JAM : ${jam}
LAYANAN: ${layanan}
MOTOR: ${motor}
`;

  // --- UBAH FLOW SESI ---
  // Set flow agar sistem tahu kita sedang menunggu isian form
  const updatedSession = {
    ...session,
    flow: 'awaiting_booking_form',
    lastRoute: 'booking_confirmation', // Tandai bahwa kita sudah di tahap ini
  } as SessionData;
  await updateSession(senderNumber!, updatedSession);

  return {
    reply: { message: bookingTemplate },
    updatedSession: updatedSession,
  };
};