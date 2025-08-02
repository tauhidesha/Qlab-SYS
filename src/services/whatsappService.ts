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
  const startTime = Date.now();
  const whatsappServerUrl = process.env.WHATSAPP_SERVER_URL;

  if (!whatsappServerUrl) {
    const errorMsg = "Konfigurasi error: WHATSAPP_SERVER_URL tidak diatur di environment variables.";
    console.error(`WhatsappService: ${errorMsg}`);
    return { success: false, error: errorMsg };
  }

  console.log(`WhatsappService: [${startTime}] Menerima nomor asli: "${number}"`);
  const formattedNumber = formatPhoneNumber(number);
  console.log(`WhatsappService: Nomor setelah format: "${formattedNumber}"`);

  if (!formattedNumber || formattedNumber.length < 10) {
    const errorMsg = `Nomor setelah format tidak valid: "${formattedNumber}". Tidak bisa mengirim pesan.`;
    console.error(`WhatsappService: ${errorMsg}`);
    return { success: false, error: errorMsg };
  }

  const endpoint = `${whatsappServerUrl}/send-manual-message`;

  try {
    console.log(`WhatsappService: [${Date.now() - startTime}ms] Mengirim permintaan ke server WhatsApp di ${endpoint} untuk nomor ${formattedNumber}`);
    console.log(`WhatsappService: Payload yang akan dikirim:`, JSON.stringify({
      number: formattedNumber,
      message: message.substring(0, 100) + (message.length > 100 ? '...' : '')
    }, null, 2));

    // ✅ TIMEOUT PROTECTION untuk Vercel free plan (max 10s)
    const timeoutMs = 8000; // 8 detik buffer
    const fetchPromise = fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        number: formattedNumber,
        message: message,
      }),
    });

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout after ' + timeoutMs + 'ms')), timeoutMs)
    );

    // Race between fetch and timeout
    Promise.race([fetchPromise, timeoutPromise])
      .then(response => {
        if (response instanceof Response) {
          const elapsedTime = Date.now() - startTime;
          console.log(`WhatsappService: [${elapsedTime}ms] Response status dari server WhatsApp: ${response.status}`);
          return response.text();
        }
        throw new Error('Invalid response object');
      })
      .then(responseText => {
        const elapsedTime = Date.now() - startTime;
        console.log(`WhatsappService: [${elapsedTime}ms] Response body dari server WhatsApp: ${responseText}`);
      })
      .catch(error => {
        const elapsedTime = Date.now() - startTime;
        if (error.message.includes('timeout')) {
          console.error(`WhatsappService: [${elapsedTime}ms] ⏰ TIMEOUT - Request dibatalkan karena melebihi ${timeoutMs}ms (Vercel free plan limit protection)`);
        } else {
          console.error(`WhatsappService: [${elapsedTime}ms] ❌ Error saat fetch ke server WhatsApp:`, error);
        }
      });

    const elapsedTime = Date.now() - startTime;
    console.log(`WhatsappService: [${elapsedTime}ms] ✅ Fire-and-forget request initiated (tidak menunggu response)`);
    return { success: true }; // tidak nunggu result dari server bot
  } catch (error: any) {
    console.error(`WhatsappService: Gagal memanggil endpoint ${endpoint}.`, error);
    return {
      success: false,
      error: `Gagal memanggil server WhatsApp: ${error?.message || 'Unknown error'}`,
    };
  }
}

export async function sendWhatsAppMedia(
  to: string,
  base64: string,
  mimetype: string,
  filename: string,
  caption: string
): Promise<SendMessageResponse> {
  const whatsappServerUrl = process.env.WHATSAPP_SERVER_URL;

  if (!whatsappServerUrl) {
    const errorMsg = "Konfigurasi error: WHATSAPP_SERVER_URL tidak diatur di environment variables.";
    console.error(`WhatsappService: ${errorMsg}`);
    return { success: false, error: errorMsg };
  }

  const formattedNumber = formatPhoneNumber(to);
  if (!formattedNumber || formattedNumber.length < 10) {
    const errorMsg = `Nomor tujuan tidak valid: "${formattedNumber}". Tidak bisa mengirim media.`;
    console.error(`WhatsappService: ${errorMsg}`);
    return { success: false, error: errorMsg };
  }

  const endpoint = `${whatsappServerUrl}/send-media`;

  try {
    console.log(`WhatsappService: Mengirim media (fire-and-forget) via base64 ke ${endpoint} untuk nomor ${formattedNumber}`);
    
    // Fire-and-forget
    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        number: formattedNumber,
        base64: base64,
        mimetype: mimetype,
        filename: filename,
        caption: caption,
      }),
    });

    return { success: true };
  } catch (error: any) {
    console.error(`WhatsappService: Gagal memanggil endpoint ${endpoint}.`, error);
    return {
      success: false,
      error: `Gagal memanggil server WhatsApp: ${error?.message || 'Unknown error'}`,
    };
  }
}

// Fungsi sendWhatsAppMessageDirect dan forwardProofToBosMamat dihapus karena
// alur logika telah diubah ke base64 dan ditangani oleh tool/util yang baru.

const bosMamatNumber = process.env.BOS_MAMAT_NUMBER; // Ambil nomor bosMamat dari .env

export async function processBosMamatConfirmation(message: string, userNumber: string): Promise<SendMessageResponse> {
  const bookingIdMatch = message.match(/#confirm\s+(\S+)/);

  if (!bookingIdMatch) {
    const errorMsg = 'Format pesan konfirmasi tidak valid. Harus berupa "#confirm <bookingId>"';
    console.error(`WhatsappService: ${errorMsg}`);
    return { success: false, error: errorMsg };
  }

  const bookingId = bookingIdMatch[1];
  console.log(`WhatsappService: bosMamat mengonfirmasi booking dengan ID: ${bookingId}`);

  const whatsappServerUrl = process.env.WHATSAPP_SERVER_URL;

  if (!whatsappServerUrl) {
    const errorMsg = 'Konfigurasi error: WHATSAPP_SERVER_URL tidak diatur di environment variables.';
    console.error(`WhatsappService: ${errorMsg}`);
    return { success: false, error: errorMsg };
  }

  const endpoint = `${whatsappServerUrl}/send-manual-message`;

  try {
    console.log(`WhatsappService: Mengirim notifikasi ke pengguna (${userNumber}) bahwa booking telah dikonfirmasi.`);

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        number: userNumber,
        message: `Pembayaran Anda telah diterima. Booking dengan ID ${bookingId} telah terkonfirmasi.`,
      }),
    });

    if (!response.ok) {
      const errorMsg = `Gagal mengirim notifikasi ke pengguna: ${response.statusText}`;
      console.error(`WhatsappService: ${errorMsg}`);
      return { success: false, error: errorMsg };
    }

    console.log(`WhatsappService: Notifikasi berhasil dikirim ke pengguna (${userNumber}).`);
    return { success: true };
  } catch (error: any) {
    console.error(`WhatsappService: Gagal memanggil endpoint ${endpoint}.`, error);
    return {
      success: false,
      error: `Gagal memanggil server WhatsApp: ${error?.message || 'Unknown error'}`,
    };
  }
}

// Contoh penggunaan sendWhatsAppMessageDirect
// sendWhatsAppMessageDirect(client, '628179481010@c.us', 'Pesan test langsung dari bot.');
