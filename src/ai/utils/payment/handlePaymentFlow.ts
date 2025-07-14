// src/ai/utils/payment/handlePaymentFlow.ts
import { confirmBookingPayment } from '@/ai/tools/confirmBookingPayment';
import { forwardPaymentProofToBosMamat } from '@/ai/tools/forwardPaymentProofToBosMamat';

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

/**
 * Menangani alur logika yang berkaitan dengan pembayaran dan konfirmasi.
 * @param body - Body dari webhook WhatsApp.
 * @returns {Promise<HandlerResult | null>} - Hasil proses atau null jika tidak ada alur yang cocok.
 */
export async function handlePaymentFlow(body: WebhookBody): Promise<HandlerResult | null> {
  const { senderNumber, customerMessage, mediaBase64, mediaMimeType, mediaType } = body;

  // 1. Jika pesan dari Bos Mamat
  if (BOS_MAMAT_NUMBER && senderNumber.includes(BOS_MAMAT_NUMBER)) {
    if (customerMessage && customerMessage.trim().toLowerCase().startsWith('#confirm')) {
      const parts = customerMessage.trim().split(' ');
      if (parts.length >= 2) {
        const customerPhoneToConfirm = parts[1].replace(/\D/g, ''); // Bersihkan nomor telepon
        console.log(`[PaymentFlow] Bos Mamat mengonfirmasi pembayaran untuk: ${customerPhoneToConfirm}`);
        const result = await confirmBookingPayment.implementation({ customerPhone: customerPhoneToConfirm });
        return { status: 'confirmation_processed', result };
      }
    }
    // Jika pesan dari Bos Mamat tapi bukan #confirm, kita anggap akan di-handle oleh
    // handleHumanReplyForwarding, jadi kita return null di sini.
    return null;
  }

  // 2. Jika pesan dari customer berisi bukti bayar (gambar/dokumen)
  if (mediaBase64 && mediaMimeType && (mediaType === 'image' || mediaType === 'document')) {
    // Untuk sekarang, kita asumsikan setiap gambar yang masuk adalah bukti bayar
    // untuk menyederhanakan testing. Logika `isAwaitingProof` bisa ditambahkan kembali nanti.
    console.log(`[PaymentFlow] Menerima media dari ${senderNumber}, diasumsikan sebagai bukti bayar. Meneruskan ke Bos Mamat.`);
    
    await forwardPaymentProofToBosMamat.implementation({
      customerPhone: senderNumber,
      mediaBase64: mediaBase64,
      mediaMimeType: mediaMimeType,
    });

    return { 
      status: 'payment_proof_forwarded',
      message: 'Terima kasih, bukti pembayaran Anda sedang kami verifikasi. Mohon tunggu konfirmasi selanjutnya.' 
    };
  }

  // Jika bukan alur pembayaran, kembalikan null agar bisa diproses oleh handler lain.
  return null;
}
