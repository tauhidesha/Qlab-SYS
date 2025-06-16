
// File: whatsapp-server-with-history.js (Simpan ini di laptopmu)

const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');
const bodyParser = require('body-parser');
// const fetch = require('node-fetch'); // Uncomment jika Node.js < 18 dan install node-fetch

const app = express();
const port = 8080; // Pastikan port ini cocok dengan WHATSAPP_SERVER_URL di .env Next.js kamu

// !!! PENTING: GANTI INI DENGAN URL HTTP SERVER NEXT.JS LOKALMU JIKA BERBEDA !!!
// Jika kamu menjalankan Next.js di PC lokalmu dengan `yarn dev` (yang biasanya di port 9002), gunakan http.
const NEXTJS_RECEIVE_ENDPOINT = 'http://localhost:9002/api/whatsapp/receive';
// Jika kamu ingin menargetkan Firebase Studio URL (seperti yang ada di contoh awal), gunakan URL HTTPS yang sesuai:
// const NEXTJS_RECEIVE_ENDPOINT = 'https://6000-firebase-studio-1749479571361.cluster-nzwlpk54dvagsxetkvxzbvslyi.cloudworkstations.dev/api/whatsapp/receive';


// Variabel untuk menyimpan riwayat chat (sederhana, di memori)
const chatHistories = {}; // Format: { "nomorWA": [{role: "user/model", content: "pesan"}, ...], ... }
const MAX_HISTORY_LENGTH = 10; // Jumlah maksimal pesan dalam riwayat per kontak

app.use(bodyParser.json());

const client = new Client({
    authStrategy: new LocalAuth({ clientId: "qlab-pos-whatsapp-server-v2" }), // Ubah clientId jika perlu reset sesi
    puppeteer: {
        headless: true,
        // args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
    }
});

console.log("Menginisialisasi WhatsApp client...");

client.on('qr', (qr) => {
    console.log('QR CODE DITERIMA, SILAKAN SCAN DENGAN HP ANDA!');
    qrcode.generate(qr, { small: true });
});

client.on('authenticated', () => {
    console.log('CLIENT WHATSAPP BERHASIL DIAUTENTIKASI');
});

client.on('auth_failure', msg => {
    console.error('GAGAL AUTENTIKASI WHATSAPP:', msg);
    console.log('Coba hapus folder .wwebjs_auth dan jalankan ulang skrip ini.');
});

client.on('ready', () => {
    console.log('CLIENT WHATSAPP SIAP DIGUNAKAN!');
});

client.on('disconnected', (reason) => {
    console.log('Client terputus dari WhatsApp:', reason);
});

client.on('message', async (msg) => {
    if (msg.fromMe || msg.isStatus) return;

    const contact = await msg.getContact();
    const senderName = contact.pushname || msg.from;
    const senderNumber = msg.from.replace(/@c\.us$/, '');
    const customerMessage = msg.body;

    console.log(`Pesan diterima dari: ${senderName} (${senderNumber})`);
    console.log(`Isi pesan: "${customerMessage}"`);

    if (NEXTJS_RECEIVE_ENDPOINT.includes('YOUR_FIREBASE_STUDIO_APP_URL_PLACEHOLDER')) { // Ganti placeholder ini jika perlu
        console.warn("URL Next.js endpoint belum di-setting dengan benar. Tidak bisa meneruskan pesan.");
        return;
    }

    // Ambil riwayat chat untuk pengirim ini
    let historyForThisSender = chatHistories[senderNumber] || [];

    try {
        console.log(`Meneruskan pesan ke Next.js API di: ${NEXTJS_RECEIVE_ENDPOINT} dengan ${historyForThisSender.length} pesan history.`);
        const response = await fetch(NEXTJS_RECEIVE_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                senderNumber: senderNumber,
                customerMessage: customerMessage,
                chatHistory: historyForThisSender // Kirim riwayat chat
            }),
        });

        const responseData = await response.json();

        if (response.ok && responseData.success && responseData.reply && responseData.reply.suggestedReply) {
            const aiReplyText = responseData.reply.suggestedReply;
            console.log(`Balasan AI diterima: "${aiReplyText}"`);

            // Simpan pesan pelanggan ke history
            historyForThisSender.push({ role: 'user', content: customerMessage });
            // Simpan balasan AI ke history
            historyForThisSender.push({ role: 'model', content: aiReplyText });

            // Jaga agar history tidak terlalu panjang
            if (historyForThisSender.length > MAX_HISTORY_LENGTH) {
                historyForThisSender = historyForThisSender.slice(-MAX_HISTORY_LENGTH);
            }
            chatHistories[senderNumber] = historyForThisSender;
            console.log(`History untuk ${senderNumber} diupdate, sekarang ${historyForThisSender.length} pesan.`);

            // (OPSIONAL) Kirim balasan AI langsung ke pelanggan via WhatsApp dari sini
            // Jika kamu mau agar server Next.js yang memicu pengiriman, maka bagian ini tidak perlu
            await client.sendMessage(msg.from, aiReplyText); // BARIS INI DIAKTIFKAN
            console.log(`Balasan AI dikirim ke ${senderName} via WhatsApp.`);

        } else if (response.ok && responseData.success) {
            console.log('Pesan berhasil diteruskan ke Next.js, namun AI tidak memberikan balasan (mungkin tidak perlu).');
        } else {
            console.error('Gagal meneruskan pesan ke Next.js atau Next.js gagal memproses:', responseData.error || responseData.details || response.statusText);
        }
    } catch (fetchError) {
        console.error('Error saat mengirim pesan ke Next.js API:', fetchError);
    }
});

client.initialize().catch(err => {
    console.error("Error saat inisialisasi WhatsApp client:", err);
    if (err.message && err.message.includes('Could not find Chrome')) {
        console.error("Pastikan Google Chrome atau Chromium sudah terinstall di laptopmu.");
    }
});

app.post('/send-message', async (req, res) => {
    const { number, message } = req.body;
    if (!number || !message) {
        return res.status(400).json({ success: false, error: 'Nomor dan pesan diperlukan.' });
    }
    const sanitizedNumber = number.replace(/\D/g, '');
    const chatId = `${sanitizedNumber}@c.us`;
    console.log(`Menerima permintaan kirim (via API) ke ${chatId}: "${message}"`);

    try {
        if (client.info && client.pupPage) { // Pastikan client dan halaman puppeteer siap
            const sentMessage = await client.sendMessage(chatId, message);
            console.log(`Pesan berhasil dikirim ke ${chatId}, ID Pesan: ${sentMessage.id.id}`);

            // Simpan pesan yang dikirim staf CS (user) ke history
            // Ini penting jika pengiriman pesan manual dari Asisten CS AI juga ingin terekam di history
            let historyForRecipient = chatHistories[sanitizedNumber] || [];
            historyForRecipient.push({ role: 'user', content: message }); // 'user' karena dikirim oleh staf CS
            if (historyForRecipient.length > MAX_HISTORY_LENGTH) {
                historyForRecipient = historyForRecipient.slice(-MAX_HISTORY_LENGTH);
            }
            chatHistories[sanitizedNumber] = historyForRecipient;
            console.log(`Pesan manual ke ${sanitizedNumber} disimpan ke history.`);

            return res.status(200).json({ success: true, messageId: sentMessage.id.id });
        } else {
            console.warn("Client WhatsApp belum siap atau halaman puppeteer tidak ada. Tidak bisa mengirim pesan.");
            return res.status(503).json({ success: false, error: 'Client WhatsApp belum siap.' });
        }
    } catch (e) {
        console.error(`Gagal mengirim pesan ke ${chatId}:`, e);
        const errorMessage = e instanceof Error ? e.message : 'Error tidak diketahui saat mengirim.';
        if (errorMessage.includes("is not a valid user") || errorMessage.includes("Unable to send message to non-contact")) {
             return res.status(400).json({ success: false, error: `Nomor ${number} sepertinya tidak valid, tidak terdaftar di WhatsApp, atau bukan kontak.`, details: errorMessage });
        }
        return res.status(500).json({ success: false, error: 'Gagal mengirim pesan WhatsApp.', details: errorMessage });
    }
});

app.listen(port, () => {
    console.log(`Server WhatsApp lokal (Node.js) berjalan di http://localhost:${port}`);
    console.log(`Pastikan WHATSAPP_SERVER_URL di .env aplikasi Next.js kamu (jika develop lokal) atau di environment Firebase Studio adalah URL ngrok yang mengarah ke port ${port} ini.`);
    console.log('Jika QR code tidak muncul, tunggu beberapa saat atau restart skrip.');
});

process.on('SIGINT', async () => {
    console.log("\nMenutup WhatsApp client...");
    if (client) {
        await client.destroy().catch(err => console.error("Error saat destroy client:", err));
    }
    console.log("Client berhasil ditutup. Keluar dari skrip.");
    process.exit(0);
});
