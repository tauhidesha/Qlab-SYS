import { z } from 'zod';
import { db } from '../../lib/firebase-admin';
import admin from 'firebase-admin';
import { sendWhatsAppMessage } from '../../services/whatsappService';

const InputSchema = z.object({
  customerPhone: z.string().describe("Nomor HP pelanggan yang pembayarannya dikonfirmasi."),
});

export const confirmBookingPayment = {
  toolDefinition: {
    type: 'function' as const,
    function: {
      name: 'confirmBookingPayment',
      description: 'Mengonfirmasi pembayaran booking fee, mengubah status booking menjadi "Confirmed", dan mengirim notifikasi ke pelanggan.',
      parameters: {
        type: 'object',
        properties: {
          customerPhone: { type: 'string' },
        },
        required: ['customerPhone'],
      },
    },
  },
  implementation: async (input: z.infer<typeof InputSchema>) => {
    try {
      const { customerPhone } = InputSchema.parse(input);

      // Normalisasi nomor HP untuk konsistensi query
      let phoneVariations = [customerPhone];
      if (customerPhone.startsWith('62')) {
        phoneVariations.push('0' + customerPhone.substring(2));
      } else if (customerPhone.startsWith('0')) {
        phoneVariations.push('62' + customerPhone.substring(1));
      }
      // Hapus duplikat jika ada
      phoneVariations = [...new Set(phoneVariations)];

      const bookingsRef = db.collection('bookings');
      const querySnapshot = await bookingsRef
        .where('customerPhone', 'in', phoneVariations)
        .where('status', '==', 'pending')
        .orderBy('createdAt', 'desc')
        .limit(1)
        .get();

      if (querySnapshot.empty) {
        return {
          success: false,
          message: `Tidak ditemukan booking dengan status 'Pending' untuk nomor ${customerPhone}.`,
        };
      }

      const bookingDoc = querySnapshot.docs[0];
      await bookingDoc.ref.update({ status: 'Confirmed' });

      // Kirim notifikasi konfirmasi ke pelanggan
      const confirmationMessage = "Sip, booking lo udah **Confirmed**! Sampai ketemu di bengkel ya.";
      await sendWhatsAppMessage(customerPhone, confirmationMessage);

      return {
        success: true,
        message: `Booking untuk ${customerPhone} telah dikonfirmasi dan notifikasi telah dikirim.`,
        bookingId: bookingDoc.id,
      };
    } catch (error: any) {
      console.error('[confirmBookingPayment] Error:', error);
      return {
        success: false,
        message: `Gagal mengonfirmasi pembayaran: ${error.message}`,
      };
    }
  },
};
