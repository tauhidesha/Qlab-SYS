
// src/services/whatsappService.ts

interface SendMessageResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

// Fungsi untuk memformat nomor telepon ke format internasional (mis. 62xxxx)
function formatPhoneNumber(number: string): string {
  let cleaned = number.replace(/\D/g, ''); // Hapus semua karakter non-digit

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
  const whatsappServerUrl = 'https://c2b4-103-3-220-151.ngrok-free.app/send-message';
  
  console.log(`WhatsappService: Menerima nomor asli: "${number}"`);
  const formattedNumber = formatPhoneNumber(number);
  console.log(`WhatsappService: Nomor setelah format: "${formattedNumber}"`);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  try {
    console.log(`WhatsappService: Mengirim permintaan ke server WhatsApp di ${whatsappServerUrl} untuk nomor ${formattedNumber}`);
    const response = await fetch(whatsappServerUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        number: formattedNumber, // Kirim nomor yang sudah diformat
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
      console.error(`WhatsappService: Server WhatsApp merespons dengan error ${response.status} dari ${whatsappServerUrl}:`, errorData);
      return { success: false, error: `Server WhatsApp error: ${response.status} - ${errorData.error || errorData.details || response.statusText}` };
    }

    const responseData = await response.json();
    console.log(`WhatsappService: Pesan berhasil dikirim via server WhatsApp ke ${formattedNumber}`, responseData);
    return { success: true, messageId: responseData.messageId || 'N/A' };
  } catch (error: any) {
    clearTimeout(timeoutId);
    console.error(`WhatsappService: Gagal mengirim pesan ke ${formattedNumber} via ${whatsappServerUrl}. Error:`, error);
    let detailedErrorMessage = 'Error tidak diketahui saat menghubungi server WhatsApp lokal.';

    if (error.name === 'AbortError') {
      detailedErrorMessage = `Permintaan ke server WhatsApp (${whatsappServerUrl}) timed out setelah 15 detik. Pastikan server responsif dan tidak ada error di konsol whatsapp-server.js.`;
    } else if (error instanceof TypeError && error.message.toLowerCase().includes('failed to fetch')) {
      detailedErrorMessage = `Gagal menghubungi server WhatsApp di ${whatsappServerUrl}. Pastikan:
1. Server lokal (whatsapp-server.js) berjalan.
2. Ngrok tunnel (${whatsappServerUrl}) aktif dengan URL yang benar dan dapat diakses.
3. TIDAK ADA ERROR di konsol tempat whatsapp-server.js berjalan, terutama saat menangani POST request.
Error asli: ${error.message}`;
    } else if (error instanceof Error) {
      detailedErrorMessage = `Error koneksi ke server WhatsApp lokal: ${error.message}. Periksa konsol whatsapp-server.js.`;
    }
    return { success: false, error: detailedErrorMessage };
  }
}

// (Sisa catatan dari file asli bisa tetap di sini jika diperlukan)
