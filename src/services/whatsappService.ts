
// src/services/whatsappService.ts
import { Client, LocalAuth, type Message } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';

let clientInstance: Client | null = null;

export function getWhatsAppClient(): Client {
    if (!clientInstance) {
        console.log('Initializing new WhatsApp client instance...');
        clientInstance = new Client({
            authStrategy: new LocalAuth({ clientId: "qlab-pos-whatsapp" }),
            puppeteer: {
                headless: true,
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-dev-shm-usage',
                    '--disable-accelerated-2d-canvas',
                    '--no-first-run',
                    '--no-zygote',
                    // '--single-process', // Can cause issues on some systems
                    '--disable-gpu',
                ],
                // Jika kamu punya Chrome/Chromium terinstal global dan ingin memakainya:
                // executablePath: '/usr/bin/google-chrome-stable', 
            },
            // Untuk FFMPEG jika mengirim/menerima audio/video (tidak diperlukan untuk teks dasar)
            // ffmpegPath: '/path/to/ffmpeg', 
        });

        clientInstance.on('qr', (qr) => {
            console.log('QR Code Diterima. Scan dengan HP Anda:');
            qrcode.generate(qr, { small: true });
        });

        clientInstance.on('ready', () => {
            console.log('WhatsApp Client siap digunakan!');
        });

        clientInstance.on('authenticated', () => {
            console.log('WhatsApp Client terautentikasi!');
        });

        clientInstance.on('auth_failure', (msg) => {
            console.error('Kegagalan Otentikasi WhatsApp:', msg);
            // Pertimbangkan logika pembersihan atau coba lagi di sini
        });

        clientInstance.on('disconnected', (reason) => {
            console.log('WhatsApp Client terputus:', reason);
            clientInstance = null; // Reset instance agar bisa diinisialisasi ulang
            // Implementasikan logika koneksi ulang atau sistem peringatan di sini untuk layanan produksi
        });

        clientInstance.on('message', async (msg: Message) => {
            console.log('PESAN DITERIMA DARI:', msg.from, 'ISI:', msg.body);
            // Di sini kamu akan menangani pesan masuk, misalnya, teruskan ke flow Genkit
            // Contoh sederhana:
            // if (msg.body === '!ping') {
            //   await msg.reply('pong');
            // }
        });

    }
    return clientInstance;
}

export async function startWhatsAppService() {
    const client = getWhatsAppClient();
    // Cek apakah client perlu diinisialisasi (belum punya info atau belum ready)
    if (!client.pupPage) { // client.pupPage adalah salah satu properti yang ada setelah initialize
        try {
            console.log('Memulai inisialisasi layanan WhatsApp...');
            await client.initialize();
            console.log('Proses inisialisasi klien telah dimulai. Tunggu QR atau status ready.');
        } catch (error) {
            console.error('Gagal menginisialisasi WhatsApp client di startWhatsAppService:', error);
            // Secara opsional, lempar ulang error atau tangani sesuai kebutuhan aplikasi Anda
        }
    } else {
        console.log('WhatsApp client sudah diinisialisasi atau siap.');
    }
}

export async function sendWhatsAppMessage(number: string, message: string) {
    const client = getWhatsAppClient();
    if (!clientInstance || !clientInstance.pupPage) { 
        console.error('WhatsApp client belum siap. Tidak bisa mengirim pesan.');
        // Coba untuk memulai jika belum siap, atau beri tahu untuk memulainya.
        await startWhatsAppService(); 
        // Cek lagi setelah mencoba memulai
        if(!clientInstance || !clientInstance.pupPage) {
             throw new Error('WhatsApp client tidak bisa dimulai atau belum siap.');
        }
    }
    
    // Nomor harus dalam format: [kode_negara][nomor]@c.us (mis., 6281234567890@c.us)
    const chatId = `${number.replace(/\D/g, '')}@c.us`;
    try {
        console.log(`Mengirim pesan ke ${chatId}: ${message}`);
        const sentMessage = await client.sendMessage(chatId, message);
        console.log(`Pesan berhasil dikirim ke ${chatId}`, sentMessage.id.id);
        return { success: true, messageId: sentMessage.id.id }; // Contoh respons
    } catch (error) {
        console.error(`Gagal mengirim pesan ke ${chatId}:`, error);
        throw error; // Lempar ulang error agar pemanggil bisa menangani
    }
}


// --- CARA MENJALANKAN INI ---
// File ini menyiapkan client. Untuk menjalankannya:
// 1. Kamu butuh script Node.js terpisah yang mengimpor dan memanggil `startWhatsAppService()`.
//    Contoh `jalankan-whatsapp.js`:
//    --------------------------
//    // Jika menggunakan CommonJS (misalnya file .js biasa)
//    // const { startWhatsAppService } = require('./dist/services/whatsappService'); // Sesuaikan path setelah build jika pakai TS
//    // Jika menggunakan ES Modules (tambahkan "type": "module" di package.json atau gunakan ekstensi .mjs)
//    // import { startWhatsAppService } from './services/whatsappService.js'; // Atau path setelah build .ts ke .js
//
//    // Untuk TypeScript langsung dengan tsx (misalnya):
//    // import { startWhatsAppService } from './src/services/whatsappService';
//
//    async function main() {
//        console.log("Mencoba memulai Layanan WhatsApp...");
//        // Panggil startWhatsAppService di sini setelah mengimpornya dengan benar.
//        // Contoh jika sudah dikompilasi ke JavaScript di folder 'dist':
//        // const { startWhatsAppService } = require('./dist/services/whatsappService');
//        // await startWhatsAppService();
//        console.log("Layanan WhatsApp seharusnya berjalan. Cek konsol untuk QR code jika diperlukan.");
//        // Script ini akan terus berjalan, menjaga WhatsApp client tetap hidup.
//        // Kamu mungkin butuh PM2 atau sejenisnya untuk mengelola proses ini di produksi.
//    }
//    // main().catch(console.error); // Jalankan fungsi main
//    --------------------------
//    (Pastikan kamu meng-compile TypeScript ke JavaScript dulu jika tidak pakai `tsx` atau sejenisnya untuk menjalankan TS langsung)
//
// 2. Jalankan `node path/ke/script/jalankan-whatsapp.js`.
//
// PENTING untuk Serverless (seperti Firebase App Hosting / Next.js di Vercel):
// `whatsapp-web.js` dengan Puppeteer tidak dirancang untuk environment serverless
// karena butuh proses yang berjalan lama dan instance browser.
// Kamu biasanya menjalankan ini di server dedicated, VM, atau layanan seperti Cloud Run.
//
// Modul ini sekarang mengekspor fungsi, tapi tidak otomatis menjalankannya.
// Anda perlu membuat script eksekusi terpisah.
