// src/services/whatsappService.ts

interface SendMessageResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

// Fungsi untuk memformat nomor telepon ke format internasional (mis. 62xxxx)
function formatPhoneNumber(number: string): string {
  let cleaned = number.replace(/\D/g, ''); // Hapus semua karakter non-digit
  console.log(`WhatsappService (formatPhoneNumber): Nomor setelah dibersihkan dari non-digit: "${cleaned}" (dari input: "${number}")`);

  if (cleaned.startsWith('620')) { // Prioritas untuk format aneh "620..." -> "62..."
    cleaned = '62' + cleaned.substring(3);
  } else if (cleaned.startsWith('0')) { // Jika diawali '0', mis. "0812..." -> "62812..."
    cleaned = '62' + cleaned.substring(1);
  } else if (cleaned.startsWith('8') && cleaned.length >= 9 && cleaned.length <= 13) { // Jika diawali '8' dan panjangnya sesuai nomor HP Indo, mis. "812..." -> "62812..."
    cleaned = '62' + cleaned;
  } else if (!cleaned.startsWith('62') && cleaned.length >= 9 && cleaned.length <= 13) {
    // Jika tidak diawali "62" tapi panjangnya sesuai nomor HP Indo (mis. "1234567890" yang mungkin maksudnya "081234567890")
    // Ini adalah asumsi, umum untuk konteks lokal.
    cleaned = '62' + cleaned;
  }
  // Jika sudah '62...' atau format internasional lain yang valid, tidak diubah lagi oleh kondisi di atas.
  return cleaned;
}


export async function sendWhatsAppMessage(number: string, message: string): Promise<SendMessageResponse> {
  // Pastikan URL server bot WA lo bener, bisa juga ditaruh di .env
  const whatsappServerUrl = 'http://localhost:4000';
  
  console.log(`WhatsappService: Menerima nomor asli: "${number}"`);
  const formattedNumber = formatPhoneNumber(number);
  console.log(`WhatsappService: Nomor setelah format: "${formattedNumber}"`);

  if (!formattedNumber || formattedNumber.length < 10) { // Tambahan validasi setelah format
    const errorMsg = `Nomor setelah format tidak valid: "${formattedNumber}". Tidak bisa mengirim pesan.`;
    console.error(`WhatsappService: ${errorMsg}`);
    return { success: false, error: errorMsg };
  }

  // --- INI DIA PERBAIKANNYA ---
  // Kita tambahkan path endpoint yang benar ke URL dasar
  const endpoint = `${whatsappServerUrl}/send-manual-message`;
  // -----------------------------

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 detik timeout

  try {
    console.log(`WhatsappService: Mengirim permintaan ke server WhatsApp di ${endpoint} untuk nomor ${formattedNumber}`);
    const response = await fetch(endpoint, { // <-- Variabel endpoint dipakai di sini
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        number: formattedNumber, 
        message: message,
      }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorBody = await response.text();
      let errorData;
      try {
        errorData = JSON.parse(errorBody);
      } catch (e) {
        errorData = { error: errorBody };
      }
      console.error(`WhatsappService: Server WhatsApp merespons dengan error ${response.status} dari ${endpoint}:`, errorData);
      return { success: false, error: `Server WhatsApp error: ${response.status} - ${errorData.error || errorData.details || response.statusText}` };
    }

    const responseData = await response.json();
    console.log(`WhatsappService: Pesan berhasil dikirim via server WhatsApp ke ${formattedNumber}`, responseData);
    return { success: true, messageId: responseData.messageId || 'N/A' };
  } catch (error: any) {
    clearTimeout(timeoutId);
    console.error(`WhatsappService: Gagal mengirim pesan ke ${formattedNumber} via ${endpoint}. Error:`, error);
    let detailedErrorMessage = 'Error tidak diketahui saat menghubungi server WhatsApp lokal.';

    if (error.name === 'AbortError') {
      detailedErrorMessage = `Permintaan ke server WhatsApp (${endpoint}) timed out setelah 15 detik. Pastikan server responsif dan tidak ada error di konsol whatsapp-server.js.`;
    } else if (error instanceof TypeError && error.message.toLowerCase().includes('failed to fetch')) {
      detailedErrorMessage = `Gagal menghubungi server WhatsApp di ${endpoint}. Pastikan:
1. Server lokal (run.js) berjalan.
2. Alamat dan port sudah benar.
3. TIDAK ADA ERROR di konsol tempat run.js berjalan.
Error asli: ${error.message}`;
    } else if (error instanceof Error) {
      detailedErrorMessage = `Error koneksi ke server WhatsApp lokal: ${error.message}. Periksa konsol run.js.`;
    }
    return { success: false, error: detailedErrorMessage };
  }
}
