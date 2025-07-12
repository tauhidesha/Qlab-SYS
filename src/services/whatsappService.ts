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

  if (cleaned.startsWith('620')) {
    cleaned = '62' + cleaned.substring(3);
  } else if (cleaned.startsWith('0')) {
    cleaned = '62' + cleaned.substring(1);
  } else if (cleaned.startsWith('8') && cleaned.length >= 9 && cleaned.length <= 13) {
    cleaned = '62' + cleaned;
  } else if (!cleaned.startsWith('62') && cleaned.length >= 9 && cleaned.length <= 13) {
    cleaned = '62' + cleaned;
  }

  return cleaned;
}

export async function sendWhatsAppMessage(number: string, message: string): Promise<SendMessageResponse> {
  const whatsappServerUrl = process.env.WHATSAPP_SERVER_URL;

  if (!whatsappServerUrl) {
    const errorMsg = "Konfigurasi error: WHATSAPP_SERVER_URL tidak diatur di environment variables.";
    console.error(`WhatsappService: ${errorMsg}`);
    return { success: false, error: errorMsg };
  }

  console.log(`WhatsappService: Menerima nomor asli: "${number}"`);
  const formattedNumber = formatPhoneNumber(number);
  console.log(`WhatsappService: Nomor setelah format: "${formattedNumber}"`);

  if (!formattedNumber || formattedNumber.length < 10) {
    const errorMsg = `Nomor setelah format tidak valid: "${formattedNumber}". Tidak bisa mengirim pesan.`;
    console.error(`WhatsappService: ${errorMsg}`);
    return { success: false, error: errorMsg };
  }

  const endpoint = `${whatsappServerUrl}/send-manual-message`;

  try {
    console.log(`WhatsappService: Mengirim permintaan (fire-and-forget) ke server WhatsApp di ${endpoint} untuk nomor ${formattedNumber}`);

    // ✅ FIRE-AND-FORGET, tidak pakai await
    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        number: formattedNumber,
        message: message,
      }),
    });

    return { success: true }; // tidak nunggu result dari server bot
  } catch (error: any) {
    console.error(`WhatsappService: Gagal memanggil endpoint ${endpoint}.`, error);
    return {
      success: false,
      error: `Gagal memanggil server WhatsApp: ${error?.message || 'Unknown error'}`,
    };
  }
}
