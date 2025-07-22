
// run.js (Backend Only WhatsApp Bot - Refactored v3 - PATCHED DENGAN DEBOUNCING)

require('dotenv').config();
const wppconnect = require('@wppconnect-team/wppconnect');
const express = require('express');
const http = require('http');
const fetch = require('node-fetch');
const admin = require('firebase-admin');

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 4000;
app.use(express.json({ limit: '50mb' }));

// --- Utility Functions ---
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// --- Firebase Initialization ---
// ... (Bagian ini tidak berubah, biarkan seperti aslinya)
const serviceAccountBase64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;
if (serviceAccountBase64) {
    const serviceAccountJson = Buffer.from(serviceAccountBase64, 'base64').toString('utf-8');
    const serviceAccount = JSON.parse(serviceAccountJson);
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
} else {
    const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT;
    if (!serviceAccountJson) {
        throw new Error('FIREBASE_SERVICE_ACCOUNT or FIREBASE_SERVICE_ACCOUNT_BASE64 environment variable not found.');
    }
    const serviceAccount = JSON.parse(serviceAccountJson);
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}
const db = admin.firestore();


// ==================================================================
// --- PATCH: Logic Debouncing & Buffering ---
// ==================================================================
const messageBuffers = new Map();
// Durasi tunggu dalam milidetik. 15 detik sesuai permintaan.
// Catatan: 3000-5000ms (3-5 detik) biasanya sudah cukup.
const DEBOUNCE_DELAY_MS = 15000; 

async function processBufferedMessages(senderNumber, client) {
    // Ambil data dari buffer
    const bufferEntry = messageBuffers.get(senderNumber);
    if (!bufferEntry) return;

    // Hapus entry dari buffer agar tidak diproses lagi
    messageBuffers.delete(senderNumber);
    
    // Gabungkan semua pesan teks menjadi satu
    const combinedMessage = bufferEntry.messages.map(m => m.content).join('\n');
    const senderName = bufferEntry.senderName;
    
    console.log(`[DEBOUNCED] Processing buffered message for ${senderName}: "${combinedMessage}"`);
    
    try {
        const typingDelay = 500 + Math.random() * 1000;
        await delay(typingDelay);
        await client.startTyping(senderNumber);

        const docId = senderNumber.replace('@c.us', '');
        
        const apiUrl = `${process.env.NEXTJS_API_URL}/api/whatsapp/receive`;
        const apiPayload = {
            customerMessage: combinedMessage,
            senderNumber: docId,
            senderName,
        };
        
        // Ambil media terakhir jika ada
        const lastMediaMessage = bufferEntry.messages.reverse().find(m => m.isMedia);
        if (lastMediaMessage) {
            try {
                const buffer = await client.decryptFile(lastMediaMessage.originalMsg);
                apiPayload.mediaBase64 = buffer.toString('base64');
                apiPayload.mediaMimeType = lastMediaMessage.originalMsg.mimetype;
                apiPayload.mediaType = lastMediaMessage.originalMsg.type;
                console.log(`[DEBOUNCED] Last media processed as base64. Mimetype: ${lastMediaMessage.originalMsg.mimetype}`);
            } catch (uploadError) {
                console.error('[ERROR] Failed to process buffered media:', uploadError);
            }
        }

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(apiPayload)
        });

        if (!response.ok) {
            const errorBody = await response.text();
            console.error(`[ERROR] Next.js API error. Status: ${response.status}`, errorBody);
            throw new Error(`Next.js API error. Status: ${response.status}`);
        }

        const data = await response.json();
        const fullReply = data?.suggestedReply;

        if (fullReply) {
            await saveMessageToFirestore(senderNumber, fullReply, 'zoya');
            const chunks = fullReply.split('\n\n');
            for (const chunk of chunks) {
                if (chunk.trim()) {
                    await delay(1500 + Math.random() * 1000);
                    await client.sendText(senderNumber, chunk.trim());
                }
            }
        } else {
            console.log('[DEBUG] No direct reply from Zoya, likely an internal action was handled.');
        }

        await client.stopTyping(senderNumber);
    } catch (err) {
        console.error(`[ERROR] Handler error for ${senderNumber}:`, err);
        await client.stopTyping(senderNumber);
    }
}

function start(client) {
    client.onMessage(async (msg) => {
        if (msg.from === 'status@broadcast' || msg.fromMe) {
            return;
        }

        const senderNumber = msg.from;
        const senderName = msg.sender.pushname || msg.notifyName || senderNumber;
        const messageContent = msg.body;
        const isMedia = msg.isMedia || msg.type === 'image' || msg.type === 'document';
        
        if (!messageContent && !isMedia) return;

        console.log(`[BUFFER] Received message from ${senderName}. Buffering...`);
        
        await saveMessageToFirestore(senderNumber, messageContent || `[Media: ${msg.type}]`, 'user');
        await saveSenderMeta(senderNumber, senderName);

        // Jika sudah ada buffer untuk user ini, reset timer
        if (messageBuffers.has(senderNumber)) {
            const existingEntry = messageBuffers.get(senderNumber);
            clearTimeout(existingEntry.timerId);
        }

        const messages = messageBuffers.get(senderNumber)?.messages || [];
        messages.push({
            content: messageContent,
            isMedia: isMedia,
            originalMsg: msg, // Simpan objek pesan asli untuk decrypt media nanti
        });

        // Set (atau reset) timer untuk memproses pesan setelah delay
        const timerId = setTimeout(() => {
            processBufferedMessages(senderNumber, client);
        }, DEBOUNCE_DELAY_MS);
        
        // Simpan/update buffer
        messageBuffers.set(senderNumber, {
            messages,
            senderName,
            timerId
        });
    });

    client.onStateChange((state) => {
        console.log('State changed: ', state);
        if ('CONFLICT'.includes(state)) client.useHere();
        if ('UNPAIRED'.includes(state)) console.log('logout');
    });
}

// ... (Sisa kode: saveMessageToFirestore, saveSenderMeta, API Endpoints, server.listen)
// TIDAK ADA PERUBAHAN DI BAWAH INI
// ...

async function saveMessageToFirestore(senderNumber, message, senderType) {
    const docId = senderNumber.replace('@c.us', '');
    const messagesRef = db.collection('directMessages').doc(docId).collection('messages');
    await messagesRef.add({
        text: message,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        sender: senderType,
    });
}

async function saveSenderMeta(senderNumber, displayName) {
    const docId = senderNumber.replace('@c.us', '');
    const metaRef = db.collection('directMessages').doc(docId);
    await metaRef.set({
        name: displayName,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    }, { merge: true });
}

app.post('/send-manual-message', async (req, res) => {
    const { number, message } = req.body;
    if (!number || !message) return res.status(400).json({ error: 'Number and message are required.' });
    try {
        if (!global.whatsappClient) throw new Error('WhatsApp client not initialized.');
        await global.whatsappClient.sendText(`${number}@c.us`, message);
        console.log(`[API /send-manual-message] Successfully sent message to ${number}`);
        res.status(200).json({ success: true });
    } catch (e) {
        console.error('[API /send-manual-message] Error:', e);
        res.status(500).json({ error: e.message });
    }
});

app.post('/send-media', async (req, res) => {
    const { number, base64, mimetype, filename, caption } = req.body;
    if (!number || !base64 || !mimetype) {
        return res.status(400).json({ error: 'Number, base64, and mimetype are required.' });
    }
    try {
        if (!global.whatsappClient) throw new Error('WhatsApp client not initialized.');
        const dataUri = `data:${mimetype};base64,${base64}`;
        await global.whatsappClient.sendFile(`${number}@c.us`, dataUri, filename || 'file', caption || '');
        console.log(`[API /send-media] Successfully sent media to ${number}`);
        res.status(200).json({ success: true });
    } catch (e) {
        console.error('[API /send-media] Error:', e);
        res.status(500).json({ error: e.message });
    }
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Backend WhatsApp listening on http://0.0.0.0:${PORT}`);
    wppconnect.create({
        session: 'zoya-bot',
        catchQR: (base64Qr, asciiQR) => { console.log(asciiQR); console.log(base64Qr); },
        statusFind: (statusSession, session) => console.log('Status:', statusSession, 'Session:', session),
        headless: true,
        logQR: true,
        autoClose: false,
        sessionDataPath: './tokens',
        puppeteerOptions: {
            timeout: 120000,
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu']
        },
    })
    .then((client) => {
        global.whatsappClient = client;
        start(client);
    })
    .catch((error) => console.log(error));
});