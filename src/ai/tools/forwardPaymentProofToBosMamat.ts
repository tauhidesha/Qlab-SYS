import { z } from 'zod';
import { sendWhatsAppMedia } from '../../services/whatsappService';

const InputSchema = z.object({
  customerPhone: z.string().describe('Nomor HP pelanggan yang mengirim bukti bayar.'),
  mediaBase64: z.string().describe('Data base64 dari media/gambar bukti transfer.'),
  mediaMimeType: z.string().describe('Tipe MIME dari media, contoh: image/jpeg.'),
});

// Nomor HP Bos Mamat (Anda) untuk notifikasi
const BOS_MAMAT_NUMBER = process.env.BOS_MAMAT_NUMBER;

export const forwardPaymentProofToBosMamat = {
  toolDefinition: {
    type: 'function' as const,
    function: {
      name: 'forwardPaymentProofToBosMamat',
      description: 'Meneruskan bukti pembayaran (sebagai base64) dari pelanggan ke Bos Mamat untuk verifikasi.',
      parameters: {
        type: 'object',
        properties: {
          customerPhone: { type: 'string' },
          mediaBase64: { type: 'string' },
          mediaMimeType: { type: 'string' },
        },
        required: ['customerPhone', 'mediaBase64', 'mediaMimeType'],
      },
    },
  },
  implementation: async (input: z.infer<typeof InputSchema>) => {
    try {
      const { customerPhone, mediaBase64, mediaMimeType } = InputSchema.parse(input);
      
      if (!BOS_MAMAT_NUMBER) {
        throw new Error('BOS_MAMAT_NUMBER tidak diatur di environment variables.');
      }

      const caption = `Ada bukti transfer baru dari pelanggan ${customerPhone}.\n\nUntuk konfirmasi, balas dengan format:\n#confirm ${customerPhone}`;
      const filename = `bukti-transfer-${customerPhone}.${mediaMimeType.split('/')[1] || 'png'}`;

      // Menggunakan service WhatsApp untuk mengirim media via base64
      await sendWhatsAppMedia(BOS_MAMAT_NUMBER, mediaBase64, mediaMimeType, filename, caption);

      return {
        success: true,
        message: 'Bukti transfer berhasil diteruskan ke Bos Mamat.',
      };
    } catch (error: any) {
      console.error('[forwardPaymentProofToBosMamat] Error:', error);
      return {
        success: false,
        message: `Gagal meneruskan bukti transfer: ${error.message}`,
      };
    }
  },
};
