
// File: whatsapp-server-with-history.js (Simpan ini di laptopmu)

const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');
const bodyParser = require('body-parser');
// const fetch = require('node-fetch'); // Uncomment jika Node.js < 18 dan install node-fetch

const app = express();
const port = 8080; // Pastikan port ini cocok dengan WHATSAPP_SERVER_URL di .env Next.js kamu

// !!! PENTING: GANTI INI DENGAN URL HTTP SERVER NEXT.JS LOKALMU JIKA BERBEDA !!!
const NEXTJS_RECEIVE_ENDPOINT = 'http://localhost:9002/api/whatsapp/receive';
const NEXTJS_SET_LOCK_ENDPOINT = 'http://localhost:9002/api/whatsapp/set-intervention-lock'; // BARU: Endpoint untuk set AI lock

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

// BARU: Fungsi helper untuk memanggil set-intervention-lock
async function setAiInterventionLock(phoneNumber) {
    if (NEXTJS_SET_LOCK_ENDPOINT.includes('YOUR_FIREBASE_STUDIO_APP_URL_PLACEHOLDER')) { // Ganti placeholder jika perlu
        console.warn("URL Next.js set-lock endpoint belum di-setting dengan benar. Tidak bisa set lock.");
        return;
    }
    try {
        console.log(`Mengirim notifikasi intervensi ke ${NEXTJS_SET_LOCK_ENDPOINT} untuk nomor ${phoneNumber}`);
        const lockResponse = await fetch(NEXTJS_SET_LOCK_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ senderNumber: phoneNumber }),
        });
        if (!lockResponse.ok) {
            const errorData = await lockResponse.json();
            console.error(`Gagal set AI lock untuk ${phoneNumber} dari whatsapp-server.js. Status: ${lockResponse.status}, Error: ${errorData.error || 'Unknown error'}`);
        } else {
            console.log(`AI lock notification sent for ${phoneNumber} from whatsapp-server.js`);
        }
    } catch (lockError) {
        console.error(`Error calling set-intervention-lock API from whatsapp-server.js for ${phoneNumber}:`, lockError);
    }
}


client.on('message', async (msg) => {
    if (msg.fromMe || msg.isStatus) return;

    const contact = await msg.getContact();
    const senderName = contact.pushname || msg.from;
    const senderNumber = msg.from.replace(/@c\.us$/, ''); // Ini nomor pelanggan
    const customerMessage = msg.body;

    console.log(`Pesan diterima dari: ${senderName} (${senderNumber})`);
    console.log(`Isi pesan: "${customerMessage}"`);

    if (NEXTJS_RECEIVE_ENDPOINT.includes('YOUR_FIREBASE_STUDIO_APP_URL_PLACEHOLDER')) { 
        console.warn("URL Next.js receive endpoint belum di-setting dengan benar. Tidak bisa meneruskan pesan.");
        return;
    }

    let historyForThisSender = chatHistories[senderNumber] || [];

    try {
        console.log(`Meneruskan pesan ke Next.js API di: ${NEXTJS_RECEIVE_ENDPOINT} dengan ${historyForThisSender.length} pesan history.`);
        const response = await fetch(NEXTJS_RECEIVE_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                senderNumber: senderNumber,
                customerMessage: customerMessage,
                chatHistory: historyForThisSender 
            }),
        });

        const responseData = await response.json();

        if (response.ok && responseData.success && responseData.reply && responseData.reply.suggestedReply) {
            const aiReplyText = responseData.reply.suggestedReply;
            console.log(`Balasan AI diterima: "${aiReplyText}"`);

            historyForThisSender.push({ role: 'user', content: customerMessage });
            historyForThisSender.push({ role: 'model', content: aiReplyText });

            if (historyForThisSender.length > MAX_HISTORY_LENGTH) {
                historyForThisSender = historyForThisSender.slice(-MAX_HISTORY_LENGTH);
            }
            chatHistories[senderNumber] = historyForThisSender;
            console.log(`History untuk ${senderNumber} diupdate, sekarang ${historyForThisSender.length} pesan.`);

            const MAX_MESSAGE_LENGTH = 350; 
            const SEND_DELAY_MS = 1200; 

            if (aiReplyText.length > MAX_MESSAGE_LENGTH) {
                console.log(`Balasan AI terlalu panjang (${aiReplyText.length} karakter), akan dipecah.`);
                const messageChunks = [];
                let remainingText = aiReplyText;
                // (Logika pemecahan pesan tetap sama)
                while (remainingText.length > 0) {
                    if (remainingText.length <= MAX_MESSAGE_LENGTH) {
                        messageChunks.push(remainingText);
                        remainingText = "";
                        break;
                    }
                    let splitPoint = -1;
                    let tempChunk = remainingText.substring(0, MAX_MESSAGE_LENGTH);
                    splitPoint = tempChunk.lastIndexOf('\\n');
                    if (splitPoint !== -1 && splitPoint > MAX_MESSAGE_LENGTH * 0.6) { /* keep */ } 
                    else {
                        let lastSentenceEndPoint = -1;
                        for (let i = tempChunk.length -1; i >=0; i--) {
                            if (/[.!?]/.test(tempChunk[i]) && (i + 1 < tempChunk.length && tempChunk[i+1] === ' ')) {
                                lastSentenceEndPoint = i + 1; break;
                            }
                        }
                        if (lastSentenceEndPoint > MAX_MESSAGE_LENGTH * 0.5) { splitPoint = lastSentenceEndPoint; } 
                        else {
                            splitPoint = tempChunk.lastIndexOf(' ');
                            if (splitPoint === -1 || splitPoint < MAX_MESSAGE_LENGTH * 0.3) { splitPoint = MAX_MESSAGE_LENGTH; }
                        }
                    }
                    messageChunks.push(remainingText.substring(0, splitPoint).trim());
                    remainingText = remainingText.substring(splitPoint).trimStart();
                }

                for (let i = 0; i < messageChunks.length; i++) {
                    const chunkToSend = messageChunks[i];
                    if (chunkToSend.length > 0) {
                        await client.sendMessage(msg.from, chunkToSend); // msg.from adalah nomor pelanggan
                        console.log(`Mengirim potongan ${i + 1}/${messageChunks.length} ke ${senderName}: "${chunkToSend.substring(0,50)}..."`);
                        // BARU: Set AI lock setelah berhasil mengirim pesan
                        await setAiInterventionLock(senderNumber); 
                        if (i < messageChunks.length - 1) {
                            await new Promise(resolve => setTimeout(resolve, SEND_DELAY_MS));
                        }
                    }
                }
                console.log(`Semua potongan balasan AI dikirim ke ${senderName}.`);
            } else {
                await client.sendMessage(msg.from, aiReplyText); // msg.from adalah nomor pelanggan
                console.log(`Balasan AI (utuh) dikirim ke ${senderName} via WhatsApp.`);
                // BARU: Set AI lock setelah berhasil mengirim pesan
                await setAiInterventionLock(senderNumber);
            }

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
    const { number, message } = req.body; // 'number' di sini adalah nomor tujuan (pelanggan)
    if (!number || !message) {
        return res.status(400).json({ success: false, error: 'Nomor dan pesan diperlukan.' });
    }
    const sanitizedNumber = number.replace(/\D/g, ''); // Ini nomor pelanggan
    const chatId = `${sanitizedNumber}@c.us`;
    console.log(`Menerima permintaan kirim (via API) ke ${chatId}: "${message}"`);

    try {
        if (client.info && client.pupPage) { 
            const sentMessage = await client.sendMessage(chatId, message);
            console.log(`Pesan berhasil dikirim ke ${chatId}, ID Pesan: ${sentMessage.id.id}`);
            
            // BARU: Set AI lock setelah berhasil mengirim pesan manual dari UI
            await setAiInterventionLock(sanitizedNumber);

            let historyForRecipient = chatHistories[sanitizedNumber] || [];
            historyForRecipient.push({ role: 'user', content: message }); 
            if (historyForRecipient.length > MAX_HISTORY_LENGTH) {
                historyForRecipient = historyForRecipient.slice(-MAX_HISTORY_LENGTH);
            }
            chatHistories[sanitizedNumber] = historyForRecipient;
            console.log(`Pesan manual ke ${sanitizedNumber} disimpan ke history (local Node.js).`);

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
    console.log(`Pastikan WHATSAPP_SERVER_URL di .env aplikasi Next.js kamu atau di environment Firebase Studio adalah URL ngrok yang mengarah ke port ${port} ini.`);
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


    