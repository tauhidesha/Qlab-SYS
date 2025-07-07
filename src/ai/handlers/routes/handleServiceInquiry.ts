import type { RouteHandlerFn } from './types';
import type { SessionData } from '../../utils/session';
import { mapTermToOfficialService } from '../../utils/messageParsers';
import { getServiceDescription } from '../../tools/getServiceDescriptionTool'; // Pastikan path ini benar

export const handleServiceInquiry: RouteHandlerFn = async ({ session, message }) => {
  // 1. Cari tahu layanan apa yang dimaksud dari pesan pelanggan
  const serviceName = mapTermToOfficialService(message!);

  if (!serviceName) {
    // Seharusnya tidak pernah terjadi karena router sudah mengecek, tapi ini untuk pengaman
    return {
      reply: { message: 'Waduh, Zoya bingung. Kamu nanya soal layanan apa ya?' },
      updatedSession: { ...session, lastRoute: 'service_inquiry_failed' } as SessionData,
    };
  }

  // 2. Panggil tool untuk mendapatkan deskripsi layanan tersebut
  console.log(`[Handler] Mencari deskripsi untuk layanan: "${serviceName}"`);
  const serviceInfo = await getServiceDescription({ service_name: serviceName });

  // 3. Siapkan balasan
  let replyMessage = serviceInfo.description;

  // 4. Beri Call-to-Action / Pertanyaan Lanjutan yang Cerdas
  // Ini penting agar percakapan tidak berhenti setelah memberi penjelasan.
  replyMessage += `\n\nGimana bro, tertarik sama layanan *${serviceName}*? Mau sekalian Zoya cekin harganya untuk motor apa?`;

  return {
    reply: { message: replyMessage },
    updatedSession: {
      ...session,
      lastRoute: 'service_specific',
      inquiry: {
        ...session?.inquiry,
        lastMentionedService: serviceName, // Simpan layanan yang dibicarakan di sesi
      },
    } as SessionData,
  };
};