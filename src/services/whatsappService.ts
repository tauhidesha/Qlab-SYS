
// src/services/whatsappService.ts

interface SendMessageResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

// Fungsi untuk memformat nomor telepon ke format internasional (mis. 62xxxx)
function formatPhoneNumber(number: string): string {
  let cleaned = number.replace(/\D/g, ''); // Hapus semua karakter non-digit

  if (cleaned.startsWith('0')) {
    // Ganti '0' di awal dengan '62'
    cleaned = '62' + cleaned.substring(1);
  } else if (cleaned.startsWith('8') && cleaned.length >= 9 && cleaned.length <= 13) {
    // Untuk nomor Indonesia yang langsung dimulai dengan '8' (mis. 8123456789)
    // dan memiliki panjang yang wajar untuk nomor HP Indonesia.
    cleaned = '62' + cleaned;
  }
  // Jika sudah diawali '62' atau kode negara lain, biarkan.
  // Jika format lain, mungkin perlu penyesuaian lebih lanjut atau validasi lebih ketat.
  return cleaned;
}


export async function sendWhatsAppMessage(number: string, message: string): Promise<SendMessageResponse> {
  const whatsappServerUrl = process.env.WHATSAPP_SERVER_URL;

  if (!whatsappServerUrl) {
    const errorMsg = "WHATSAPP_SERVER_URL tidak di-set di environment variables.";
    console.error(`WhatsappService: ${errorMsg}`);
    return { success: false, error: errorMsg };
  }
  
  console.log(`WhatsappService: WHATSAPP_SERVER_URL yang digunakan: ${whatsappServerUrl}`); // Log URL yang akan di-fetch

  const formattedNumber = formatPhoneNumber(number);

  try {
    console.log(`WhatsappService: Mengirim permintaan ke server WhatsApp di ${whatsappServerUrl} untuk nomor ${formattedNumber}`);
    const response = await fetch(whatsappServerUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        number: formattedNumber, 
        message: message,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text(); 
      let errorData;
      try {
        errorData = JSON.parse(errorBody); 
      } catch (e) {
        errorData = { error: errorBody }; 
      }
      console.error(`WhatsappService: Server WhatsApp merespons dengan error ${response.status} saat mencoba ${whatsappServerUrl}:`, errorData);
      return { success: false, error: `Server WhatsApp error: ${response.status} - ${errorData.error || errorData.details || response.statusText}` };
    }

    const responseData = await response.json();
    console.log(`WhatsappService: Pesan berhasil dikirim via server WhatsApp ke ${formattedNumber}`, responseData);
    return { success: true, messageId: responseData.messageId || 'N/A' };
  } catch (error) {
    console.error(`WhatsappService: Gagal mengirim pesan ke ${formattedNumber} via ${whatsappServerUrl}. Error:`, error);
    if (error instanceof Error) {
      // Pesan error 'fetch failed' biasanya dari sini.
      return { success: false, error: `Error koneksi ke server WhatsApp lokal: ${error.message}` };
    }
    return { success: false, error: 'Error tidak diketahui saat menghubungi server WhatsApp lokal.' };
  }
}

// Catatan untuk server WhatsApp lokal (whatsapp-server.js di laptopmu):
// - Pastikan endpoint /send-message menerima JSON: { number: "62xxxx", message: "pesan" }
// - Server lokalmu yang akan menambahkan "@c.us" ke nomor sebelum dikirim via whatsapp-web.js
// - Server lokalmu juga perlu di-update untuk:
//   1. Mendengarkan event pesan masuk (`client.on('message', async (msg) => { ... })`).
//   2. Dari pesan masuk, dapatkan:
//      - Nomor pengirim: `msg.from` (perlu dibersihkan dari "@c.us", misal jadi "62xxxx").
//      - Isi pesan: `msg.body`.
//   3. Kirim data ini (nomor pengirim & isi pesan) via HTTP POST ke endpoint baru di Next.js:
//      `https://<URL-PUBLIK-NEXTJS-APP-KAMU>/api/whatsapp/receive`.
//      URL publik Next.js app bisa dari URL Firebase Studio atau ngrok jika Next.js juga di-tunnel.
//
// Contoh modifikasi di whatsapp-server.js (bagian terima pesan):
//
// client.on('message', async (msg) => {
//   if (msg.fromMe) return; // Abaikan pesan dari diri sendiri
//
//   const contact = await msg.getContact();
//   console.log(`Pesan diterima dari: ${contact.pushname || msg.from} (${msg.from})`);
//   console.log(`Isi pesan: ${msg.body}`);
//
//   const senderNumber = msg.from.replace('@c.us', ''); // Bersihkan nomor
//   const customerMessage = msg.body;
//
//   // GANTI INI dengan URL publik Next.js app kamu (mis. dari Firebase Studio atau ngrok untuk Next.js)
//   const nextjsReceiveEndpoint = 'https://<URL-PUBLIK-NEXTJS-APP-KAMU>/api/whatsapp/receive';
//
//   try {
//     const response = await fetch(nextjsReceiveEndpoint, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ senderNumber, customerMessage }), // Kirim senderNumber juga
//     });
//     const responseData = await response.json();
//     if (response.ok && responseData.success) {
//       console.log('Pesan berhasil diteruskan ke Next.js dan balasan AI (jika ada) sudah diproses untuk dikirim.');
//       // Jika API Next.js membalas dengan AI reply, dan kamu mau kirim balik via whatsapp.js
//       // if (responseData.reply && responseData.reply.suggestedReply) {
//       //   await client.sendMessage(msg.from, responseData.reply.suggestedReply);
//       //   console.log('Balasan AI dikirim ke pelanggan.');
//       // }
//     } else {
//       console.error('Gagal meneruskan pesan ke Next.js atau Next.js gagal memproses:', responseData.error || response.statusText);
//     }
//   } catch (fetchError) {
//     console.error('Error saat mengirim pesan ke Next.js API:', fetchError);
//   }
// });

