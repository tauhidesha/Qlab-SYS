// src/services/whatsappService.ts

interface SendMessageResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

export async function sendWhatsAppMessage(number: string, message: string): Promise<SendMessageResponse> {
  const whatsappServerUrl = process.env.WHATSAPP_SERVER_URL || 'http://localhost:8080/send-message'; // Default jika tidak ada di .env

  // Nomor harus dalam format: [kode_negara][nomor] (mis., 6281234567890)
  // Server WhatsApp lokal Anda yang akan menangani penambahan @c.us jika perlu.
  const cleanedNumber = number.replace(/\D/g, '');

  try {
    console.log(`Mengirim permintaan ke server WhatsApp lokal di ${whatsappServerUrl} untuk nomor ${cleanedNumber}`);
    const response = await fetch(whatsappServerUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        number: cleanedNumber,
        message: message,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error(`Server WhatsApp lokal merespons dengan error ${response.status}: ${errorData}`);
      return { success: false, error: `Server WhatsApp lokal error: ${response.status} - ${errorData || response.statusText}` };
    }

    const responseData = await response.json();
    console.log(`Pesan berhasil dikirim melalui server WhatsApp lokal ke ${cleanedNumber}`, responseData);
    return { success: true, messageId: responseData.messageId || 'N/A' };
  } catch (error) {
    console.error(`Gagal mengirim pesan ke ${cleanedNumber} melalui server WhatsApp lokal:`, error);
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
//   const { number, message } = req.body;
//   if (!number || !message) {
//     return res.status(400).json({ error: 'Nomor dan pesan diperlukan.' });
//   }
//   try {
//     const chatId = `${number}@c.us`;
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
