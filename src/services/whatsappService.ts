// src/services/whatsappService.ts

interface SendMessageResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

export async function sendWhatsAppMessage(number: string, message: string): Promise<SendMessageResponse> {
  const whatsappServerUrl = process.env.WHATSAPP_SERVER_URL || 'http://localhost:8080/send-message';

  // 1. Hapus semua karakter non-digit
  let formattedNumber = number.replace(/\D/g, '');

  // 2. Jika nomor dimulai dengan '0', ganti dengan '62'
  if (formattedNumber.startsWith('0')) {
    formattedNumber = '62' + formattedNumber.substring(1);
  } 
  // 3. Jika nomor dimulai dengan '8' (misalnya '812...'), dan panjangnya sesuai nomor Indonesia, tambahkan '62'
  // Ini untuk kasus nomor Indonesia yang tidak diawali '0' atau '62'
  else if (
    formattedNumber.startsWith('8') &&
    formattedNumber.length >= 9 && // Panjang minimal nomor HP Indonesia tanpa kode negara dan 0 (mis. 812345678 -> 9 digit)
    formattedNumber.length <= 13   // Panjang maksimal
  ) {
    formattedNumber = '62' + formattedNumber;
  }
  // Jika nomor sudah diawali '62' atau kode negara lain, biarkan apa adanya.

  try {
    console.log(`Mengirim permintaan ke server WhatsApp lokal di ${whatsappServerUrl} untuk nomor ${formattedNumber}`);
    const response = await fetch(whatsappServerUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        number: formattedNumber, // Kirim nomor yang sudah diformat
        message: message,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text(); // Coba baca body error sebagai teks dulu
      let errorData;
      try {
        errorData = JSON.parse(errorBody); // Coba parse sebagai JSON
      } catch (e) {
        errorData = { error: errorBody }; // Jika bukan JSON, gunakan teksnya sebagai error
      }
      console.error(`Server WhatsApp lokal merespons dengan error ${response.status}:`, errorData);
      return { success: false, error: `Server WhatsApp lokal error: ${response.status} - ${errorData.error || errorData.details || response.statusText}` };
    }

    const responseData = await response.json();
    console.log(`Pesan berhasil dikirim melalui server WhatsApp lokal ke ${formattedNumber}`, responseData);
    return { success: true, messageId: responseData.messageId || 'N/A' };
  } catch (error) {
    console.error(`Gagal mengirim pesan ke ${formattedNumber} melalui server WhatsApp lokal:`, error);
    if (error instanceof Error) {
      return { success: false, error: `Error koneksi ke server WhatsApp lokal: ${error.message}` };
    }
    return { success: false, error: 'Error tidak diketahui saat menghubungi server WhatsApp lokal.' };
  }
}

// Catatan:
// File ini sekarang mengasumsikan Anda memiliki server WhatsApp terpisah (berbasis whatsapp-web.js)
// yang berjalan dan mendengarkan permintaan HTTP POST di WHATSAPP_SERVER_URL.
// Server tersebut yang akan menangani logika untuk mengirim pesan via whatsapp-web.js.
//
// Contoh implementasi server WhatsApp lokal sederhana (misalnya pakai Express.js):
//
// const express = require('express');
// const { Client, LocalAuth } = require('whatsapp-web.js'); // Di server WhatsApp lokalmu
// const app = express();
// const port = 8080; // Sesuaikan dengan WHATSAPP_SERVER_URL
//
// app.use(express.json());
//
// const client = new Client({ authStrategy: new LocalAuth({ clientId: "my-whatsapp-server" }) });
// client.on('qr', qr => { console.log('Scan QR ini:', qr); });
// client.on('ready', () => { console.log('WhatsApp Server Siap!'); });
// client.initialize();
//
// app.post('/send-message', async (req, res) => {
//   const { number, message } = req.body; // number di sini seharusnya sudah "62..."
//   if (!number || !message) {
//     return res.status(400).json({ error: 'Nomor dan pesan diperlukan.' });
//   }
//   try {
//     const chatId = `${number}@c.us`; // Langsung pakai number karena sudah diformat oleh client (Next.js)
//     const sentMessage = await client.sendMessage(chatId, message);
//     res.status(200).json({ success: true, messageId: sentMessage.id.id });
//   } catch (e) {
//     console.error("Gagal kirim pesan dari server lokal:", e);
//     res.status(500).json({ error: 'Gagal mengirim pesan WhatsApp.', details: e.message });
//   }
// });
//
// app.listen(port, () => {
//   console.log(`Server WhatsApp lokal berjalan di http://localhost:${port}`);
// });
//
// Anda perlu menjalankan script server seperti di atas di laptop Anda.
