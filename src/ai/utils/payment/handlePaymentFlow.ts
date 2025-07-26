// @file: src/ai/utils/payment/handlePaymentFlow.ts (Dengan Pengecekan Status)

import { confirmBookingPayment } from '@/ai/tools/confirmBookingPayment';
import { forwardPaymentProofToBosMamat } from '@/ai/tools/forwardPaymentProofToBosMamat';
import { getFirebaseAdmin } from '@/lib/firebase-admin'; // Pastikan import ini ada

const BOS_MAMAT_NUMBER = process.env.BOS_MAMAT_NUMBER;

interface WebhookBody {
  customerMessage?: string;
  senderNumber: string;
  mediaBase64?: string;
  mediaMimeType?: string;
  mediaType?: string;
}

interface HandlerResult {
  status: string;
  result?: any;
  message?: string;
}

export async function handlePaymentFlow(body: WebhookBody): Promise<HandlerResult | null> {
  const { senderNumber, customerMessage, mediaBase64, mediaMimeType, mediaType } = body;

  // 1. Alur konfirmasi dari BosMat (tidak berubah)
  if (BOS_MAMAT_NUMBER && senderNumber.includes(BOS_MAMAT_NUMBER)) {
    if (customerMessage && customerMessage.trim().toLowerCase().startsWith('#confirm')) {
      const parts = customerMessage.trim().split(' ');
      if (parts.length >= 2) {
        const customerPhoneToConfirm = parts[1].replace(/\D/g, '');
        console.log(`[PaymentFlow] BosMat mengonfirmasi pembayaran untuk: ${customerPhoneToConfirm}`);
        const result = await confirmBookingPayment.implementation({ customerPhone: customerPhoneToConfirm });
        return { status: 'confirmation_processed', result };
      }
    }
    return null;
  }

  // 2. Alur jika pesan dari customer berisi media (gambar/dokumen)
  if (mediaBase64 && mediaMimeType && (mediaType === 'image' || mediaType === 'document')) {
    
    // --- PENYEMPURNAAN DIMULAI DI SINI ---
    console.log(`[PaymentFlow] Media terdeteksi dari ${senderNumber}. Memeriksa status booking...`);

    // Buat variasi nomor HP untuk query yang lebih andal
    let phoneVariations = [senderNumber];
    if (senderNumber.startsWith('62')) {
      phoneVariations.push('0' + senderNumber.substring(2));
    } else if (senderNumber.startsWith('0')) {
      phoneVariations.push('62' + senderNumber.substring(1));
    }
    phoneVariations = [...new Set(phoneVariations)];

    const db = getFirebaseAdmin().firestore();
    const bookingsRef = db.collection('bookings');
    const querySnapshot = await bookingsRef
      .where('customerPhone', 'in', phoneVariations)
      .where('status', '==', 'pending') // <-- KONDISI KRUSIAL
      .orderBy('createdAt', 'desc')
      .limit(1)
      .get();

    // HANYA teruskan jika ada booking yang menunggu pembayaran
    if (!querySnapshot.empty) {
      console.log(`[PaymentFlow] Ditemukan booking 'Pending DP' untuk ${senderNumber}. Meneruskan bukti bayar.`);
      
      await forwardPaymentProofToBosMamat.implementation({
        customerPhone: senderNumber,
        mediaBase64: mediaBase64,
        mediaMimeType: mediaMimeType,
      });

      return { 
        status: 'payment_proof_forwarded',
        message: 'Terima kasih, bukti pembayaran Anda sedang kami verifikasi. Mohon tunggu konfirmasi selanjutnya ya.' 
      };
    } else {
      console.log(`[PaymentFlow] Tidak ditemukan booking 'Pending DP' untuk ${senderNumber}. Media akan diabaikan oleh payment flow.`);
      // JIKA tidak ada booking 'Pending DP', jangan lakukan apa-apa.
      // Kembalikan null agar Zoya AI bisa menangani pesan ini (misal: "ini foto motor saya yang lecet").
      return null;
    }
    // --- AKHIR PENYEMPURNAAN ---
  }

  // Jika bukan alur pembayaran, kembalikan null agar bisa diproses oleh handler lain.
  return null;
}