'use server';

import type { OpenAI } from 'openai';
import { openai } from '@/lib/openai';
import type { ZoyaChatInput, WhatsAppReplyOutput, ChatMessage } from '@/types/ai/cs-whatsapp-reply';
import { getSession, updateSession, type SessionData, type ServiceCategory } from '@/ai/utils/session'; 

// Import semua tools
import { listServicesByCategory } from '@/ai/tools/listServicesByCategoryTool';
import { getSpecificServicePrice } from '@/ai/tools/getSpecificServicePriceTool';
import { getServiceDescription } from '@/ai/tools/getServiceDescriptionTool';
import { searchKnowledgeBase } from '@/ai/tools/searchKnowledgeBaseTool';
import { getMotorSizeDetails } from '@/ai/tools/getMotorSizeDetailsTool';
import { notifyBosMamat, setSnoozeMode } from '@/ai/utils/humanHandoverTool';
import { createBookingImplementation } from '@/ai/tools/createBookingTool'; 
import { checkBookingAvailabilityImplementation } from '@/ai/tools/checkBookingAvailabilityTool';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';


// --- Semua Fungsi Helper Internal (Satu Sumber Kebenaran) ---

function detectHumanHandoverRequest(message: string): boolean {
    const lowerCaseMessage = message.toLowerCase();
    const keywords = ['ngobrol sama orang', 'sama manusia', 'cs asli', 'admin', 'bos mamat', 'sama lo', 'telepon'];
    return keywords.some(keyword => lowerCaseMessage.includes(keyword));
}

function extractInfoForPriceCheck(message: string): { service: string, motor: string } | null {
    const msg = message.toLowerCase();
    const priceIntent = /berapa|harga|price|biaya/i.test(msg);
    if (!priceIntent) return null;
    const serviceKeywords = [ { name: 'Repaint Bodi Halus', keywords: ['repaint bodi', 'cat bodi', 'repaint bodi alus', 'bodi halus', 'cat bodi halus'] }, { name: 'Repaint Velg', keywords: ['repaint velg', 'cat velg'] }, { name: 'Coating Motor Doff', keywords: ['coating doff', 'coating matte'] }, { name: 'Coating Motor Glossy', keywords: ['coating glossy', 'coating kilap'] }, { name: 'Full Detailing Glossy', keywords: ['full detailing'] }, { name: 'Poles Bodi Glossy', keywords: ['poles bodi', 'poles body'] }, { name: 'Cuci Premium', keywords: ['cuci premium'] }, ];
    const motorKeywords = ['pcx', 'nmax', 'vario', 'aerox', 'scoopy', 'beat', 'xmax', 'forza', 'cbr', 'vixion', 'r15', 'klx', 'ninja', 'fazzio', 'filano'];
    let foundService = null;
    for (const service of serviceKeywords) { if (service.keywords.some(keyword => msg.includes(keyword))) { foundService = service.name; break; } }
    const foundMotor = motorKeywords.find(m => msg.includes(m));
    if (foundService && foundMotor) return { service: foundService, motor: foundMotor };
    return null;
}

function extractCategoryPriceIntent(message: string): { category: ServiceCategory, motor?: string } | null {
    const msg = message.toLowerCase();
    const priceIntent = /berapa|harga|price|biaya/i.test(msg);
    if (!priceIntent) return null;
    const categoryKeywords: { name: ServiceCategory, keywords: string[] }[] = [ 
        { name: 'detailing', keywords: ['detailing', 'detail'] }, 
        { name: 'coating', keywords: ['coating', 'ceramic', 'nano'] }, 
        { name: 'repaint', keywords: ['repaint', 'cat ulang'] }, 
        { name: 'cuci', keywords: ['cuci'] }, 
    ];
    const motorKeywords = ['pcx', 'nmax', 'vario', 'aerox', 'scoopy', 'beat', 'xmax', 'forza', 'cbr', 'vixion', 'r15', 'klx', 'ninja', 'fazzio', 'filano'];
    
    let foundCategory: ServiceCategory | null = null;
    for (const cat of categoryKeywords) { 
        if (cat.keywords.some(kw => msg.includes(kw))) { 
            foundCategory = cat.name; 
            break; 
        } 
    }
    if (!foundCategory) return null;
    const foundMotor = motorKeywords.find(m => msg.includes(m));
    return { category: foundCategory, motor: foundMotor };
}

function extractMotorSizeIntent(message: string): string | null {
    const msg = message.toLowerCase();
    const sizeIntent = /ukuran|size|kategori|masuk apa/i.test(msg);
    if (!sizeIntent) return null;
    const motorKeywords = ['pcx', 'nmax', 'vario', 'aerox', 'scoopy', 'beat', 'xmax', 'forza', 'cbr', 'vixion', 'r15', 'klx', 'ninja', 'fazzio', 'filano'];
    const foundMotor = motorKeywords.find(m => msg.includes(m));
    return foundMotor || null;
}

function detectBookingIntent(message: string): boolean {
    const msg = message.toLowerCase();
    const keywords = ["booking", "jadwalin", "daftar", "gas", "deal", "oke fix", "lanjut", "gaskeun", "sabi", "yowes", "yoi", "catet", "aman", "setuju"];
    return keywords.some(kw => msg.includes(kw));
}

function detectGenericPriceIntent(message: string): boolean {
    const msg = message.toLowerCase();
    const priceIntent = /harga|biaya|price|list|pricelist|listnya|pricelish/i.test(msg);
    const genericKeywords = ["masing-masing", "masing2", "harganya berapa", "semuanya berapa", "dua-duanya", "keduanya", "brp"];
    return priceIntent && (genericKeywords.some(kw => msg.includes(kw)) || msg.length < 25);
}

// GANTI fungsi parseBookingForm yang lama dengan yang ini (dari kode target)
function parseBookingForm(text: string): { [key: string]: string } | null {
    const lines = text.split('\n');
    const details: { [key: string]: string } = {};
    
    const mappings: { [key: string]: string } = {
        'nama': 'customerName',
        'no hp': 'customerPhone',
        'tanggal': 'bookingDate',
        'jam': 'bookingTime',
        'layanan': 'serviceName',
        'motor': 'vehicleInfo'
    };

    lines.forEach(line => {
        const parts = line.split(':');
        if (parts.length < 2) return;

        const key = parts[0].trim().toLowerCase();
        const value = parts.slice(1).join(':').trim();

        if (mappings[key] && value) {
            details[mappings[key]] = value;
        }
    });

    // Cek apakah data penting ada
    if (details.bookingDate && details.bookingTime && details.serviceName && details.vehicleInfo) {
        return details;
    }

    return null;
}

async function parseDateTime(text: string): Promise<{ date?: string, time?: string }> {
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: `You are a date and time parsing expert. Today is ${new Date().toISOString().split('T')[0]}. Extract the date in format YYYY-MM-DD and time in format HH:mm from the user's text. Understand relative terms like "besok", "lusa", "minggu depan", "hari rabu". If the user says "jam 2 siang", it's "14:00". If only date is found, return only date. If only time is found, return only time. If both are found, return both. If nothing is found, return an empty JSON object. Respond ONLY with a JSON object like {"date": "YYYY-MM-DD", "time": "HH:mm"}.`
                },
                {
                    role: 'user',
                    content: text
                }
            ]
        });
        const result = response.choices[0].message.content;
        if (result) {
            try {
                return JSON.parse(result);
            } catch {
                return {};
            }
        }
        return {};
    } catch (error) {
        console.error("Error parsing date/time:", error);
        return {};
    }
}

async function getServiceIdByName(serviceName: string): Promise<string | null> {
    try {
        const servicesRef = collection(db, 'services');
        const q = query(servicesRef, where("name", "==", serviceName), limit(1));
        const serviceSnapshot = await getDocs(q);
        if (serviceSnapshot.empty) return null;
        return serviceSnapshot.docs[0].id;
    } catch (error) {
        console.error("Error getting service ID by name:", error);
        return null;
    }
}

// --- Konfigurasi AI & Tools ---
const zoyaTools: OpenAI.Chat.Completions.ChatCompletionTool[] = [
    { type: 'function', function: { name: 'listServicesByCategory', description: "Gunakan saat pelanggan bertanya layanan secara umum berdasarkan kategori (coating, detailing, dll).", parameters: { type: 'object', properties: { category: { type: 'string', enum: ['coating', 'detailing', 'cuci', 'repaint'] } }, required: ['category'] } } },
    { type: 'function', function: { name: 'getSpecificServicePrice', description: "Gunakan untuk mendapatkan harga final jika layanan spesifik DAN motor sudah diketahui. Jika user menyebut nama warna yang mengandung kata spesial seperti 'candy', 'bunglon', 'lembayung', 'hologram', atau 'xyrallic', set 'is_special_paint' ke true. Contoh: 'red candy', 'lembayung biru', 'black xyralic'.",  parameters: { type: 'object', properties: { service_name: { type: 'string' }, motor_query: { type: 'string' } }, required: ['service_name', 'motor_query'] } } },
    { type: 'function', function: { name: 'getServiceDescription', description: "Gunakan saat pelanggan bertanya detail tentang satu layanan spesifik.", parameters: { type: 'object', properties: { service_name: { type: 'string' } }, required: ['service_name'] } } },
    { type: 'function', function: { name: 'getMotorSizeDetails', description: "Gunakan saat pelanggan bertanya ukuran atau kategori ukuran motornya (misal: 'vario 160 masuk size apa?').", parameters: { type: 'object', properties: { motor_query: { type: 'string' } }, required: ['motor_query'] } } },
    
];

// --- PROMPT UTAMA ---
const masterPrompt = `## 🧠 PERAN & TUJUAN ZOYA
Lo adalah Zoya, customer service gokil dari Bosmat Detailing Studio. Kerjaan lo adalah bantuin pelanggan lewat WhatsApp dengan gaya santai tapi tetap niat. Kayak temen bengkel yang paham motor tapi gak ribet ngajarin.
## 🎯 FOKUS UTAMA
- Kasih jawaban yang akurat, jelas, dan gak muter-muter.
- Bantu pelanggan sampe tuntas: mau tanya-tanya, nentuin layanan, sampe booking.
## 🚫 PANTANGAN
- Jangan pernah ngarang. Data dan jawaban lo wajib dari tool atau catatan sesi. Kalau gak yakin, bilang terus terang dan tawarkan buat tanya ke tim.
## 🛠️ TOOLBOX ZOYA
Lo punya 6 senjata: listServicesByCategory, getSpecificServicePrice, getServiceDescription, getMotorSizeDetails, checkBookingAvailability, createBookingTool.
## 📚 CARA MENGGUNAKAN TOOLNYA
- User nanya detail layanan ("dapet apa aja?") ➜ getServiceDescription.
- User nanya harga ➜ getSpecificServicePrice.
  - Kalau tool error 'price_not_available_for_size' ➜ jangan tanya ulang, tawarin bantuan kirim ke tim.
  - Kalau tool error 'ambiguous_motor' ➜ tanya balik motor yang dimaksud.
- User nanya motornya masuk kategori apa ➜ getMotorSizeDetails.
- User nanya jenis layanan di kategori ➜ listServicesByCategory.
## 💬 NGOBROL, BUKAN INTERROGASI
- Lo ngomong kayak ngobrol di bengkel.
- Panggil user: “bro”, “bang”, “kak” — fleksibel.
- Boleh pakai emoji tapi secukupnya (🛠️✨😎). Jangan spam.
## 💰 ATURAN HARGA & PENJELASAN
- Saat memberikan harga, selalu cek apakah ada 'note' dari hasil tool.
- Jika ada 'note', gunakan itu untuk menjelaskan rincian harga. Contoh: "Totalnya jadi Rp500.000 ya bro. Harga dasarnya 250rb, tapi karena warnanya candy, ada tambahan biaya 250rb."
- Jika tidak ada 'note', langsung sebutkan harga finalnya.
## ⚡ TANGGAPAN CEPAT & SAMBUNG OBROLAN
- Kalau user nulis “2” atau “pilih nomor”, cocokkan dengan 'lastOfferedServices' dari sesi.
- Selalu gunakan ingatan sesi ('lastMentionedMotor', 'lastMentionedService') untuk menyambung obrolan.
## 🧯KALO ZOYA BINGUNG...
- Kalau lo bener-bener stuck dan gak yakin ➜ bilang:
> “Aduh Zoya bingung, bentar Zoya panggilin Bos Mamat ya.”
`;

// GANTI SELURUH FUNGSI generateWhatsAppReply yang lama dengan yang ini.
export async function generateWhatsAppReply(input: ZoyaChatInput): Promise<WhatsAppReplyOutput | null> {
    const senderNumber = input.senderNumber || 'playground_user';
    let session = await getSession(senderNumber);
    
    console.log(`\n\n================ Zoya New Turn for ${senderNumber} ================`);
    console.log(`[PESAN MASUK]: "${input.customerMessage}"`);
    console.log(`[LOG SESI AWAL]:`, JSON.stringify(session, null, 2));

    if (session?.snoozeUntil && Date.now() < session.snoozeUntil) {
        console.log(`[LOG ACTION] JALUR 0: Mode diam aktif. Tidak ada balasan.`);
        return null;
    }
    
    if (!session || !session.flow) {
        const newInquiry = { flow: 'general' as const, inquiry: {} };
        await updateSession(senderNumber, newInquiry);
        session = await getSession(senderNumber);
    }

    const HANDOVER_MESSAGE = "Aduh Zoya bingung, bentar Zoya panggilin Bos Mamat ya.";
    const CUSTOMER_REQUEST_HANDOVER_MESSAGE = "Oke siap, bentar Zoya panggilin Bos Mamat ya, ditunggu bro!";
    
    // JALUR 1: Cek Permintaan Eskalasi ke Manusia
    if (detectHumanHandoverRequest(input.customerMessage)) {
        console.log(`[LOG ACTION] JALUR 1: Deteksi permintaan handover.`);
        await notifyBosMamat(senderNumber, input.customerMessage);
        await setSnoozeMode(senderNumber);
        return { suggestedReply: CUSTOMER_REQUEST_HANDOVER_MESSAGE };
    }

    // JALUR 2: Memproses Form Booking yang Diisi User
    if (session?.flow === 'awaiting_booking_form') {
        console.log(`[LOG ACTION] JALUR 2: Mencoba mem-parsing form booking dari user.`);
        const formDetails = parseBookingForm(input.customerMessage);

        if (formDetails) {
            
        console.log(`[DateTime Parser] Menerjemahkan: "${formDetails.bookingDate}" dan "${formDetails.bookingTime}"`);
        // Gabungkan tanggal dan jam untuk di-parse bersamaan agar lebih akurat
        const combinedDateTime = `${formDetails.bookingDate} ${formDetails.bookingTime}`;
        const parsedDateTime = await parseDateTime(combinedDateTime);

        // Validasi hasil parsing
        if (!parsedDateTime.date || !parsedDateTime.time) {
            console.error("[DateTime Parser] Gagal mem-parsing tanggal atau waktu.", parsedDateTime);
            await updateSession(senderNumber, { flow: 'general' });
            return { suggestedReply: "Waduh bro, Zoya bingung sama format tanggal atau jamnya. Boleh tolong isi formnya lagi dengan format yang lebih jelas? (Contoh: TANGGAL: 4 Juli 2025, JAM: 14:00)" };
        }

        console.log(`[Booking Flow] Form berhasil diparsing dan diterjemahkan, cek ketersediaan...`, {
            ...formDetails,
            bookingDate: parsedDateTime.date, // Gunakan hasil parsing
            bookingTime: parsedDateTime.time,  // Gunakan hasil parsing
        });
        
        const availabilityResult = await checkBookingAvailabilityImplementation({
            bookingDate: parsedDateTime.date, // UBAH: Kirim tanggal standar
            bookingTime: parsedDateTime.time, // UBAH: Kirim waktu standar
            serviceName: formDetails.serviceName,
            estimatedDurationMinutes: 300 
        });
        
            if (!availabilityResult.isAvailable) {
                await updateSession(senderNumber, { flow: 'general', inquiry: { ...session.inquiry } });
                return { suggestedReply: availabilityResult.reason || "Maaf bro, jadwal di waktu itu nggak tersedia. Mau coba isi form lagi dengan jadwal lain?" };
            }

            console.log(`[Booking Flow] Jadwal tersedia. Membuat booking...`);
            const serviceId = await getServiceIdByName(formDetails.serviceName);

            const bookingResult = await createBookingImplementation({
    customerName: formDetails.customerName || input.senderName || 'Pelanggan WhatsApp',
    customerPhone: senderNumber.replace('@c.us', ''),
    vehicleInfo: formDetails.vehicleInfo,
    serviceName: formDetails.serviceName,
    bookingDate: parsedDateTime.date, // UBAH MENJADI INI
    bookingTime: parsedDateTime.time, // UBAH MENJADI INI
    serviceId: serviceId || '',
});
            await updateSession(senderNumber, { flow: 'general', inquiry: {} }); // Reset sesi setelah booking berhasil
            return { suggestedReply: bookingResult.message || "Booking berhasil dibuat, bro! Makasih ya." };

        } else {
            console.log(`[Booking Flow] Gagal mem-parsing form. Meminta user untuk mengisi ulang.`);
            await updateSession(senderNumber, { flow: 'general' }); // Reset flow agar tidak nyangkut
            return { suggestedReply: "Waduh bro, sepertinya format isiannya ada yang salah. Boleh tolong copy-paste template sebelumnya dan isi lagi bagian yang kosong? Makasih ya." };
        }
    }

    // JALUR 3: Mengirim Template Booking
    // Pastikan fungsi detectBookingIntent dari kode target juga kamu pakai
    if (detectBookingIntent(input.customerMessage)) {
        console.log(`[LOG ACTION] JALUR 3: Niat booking terdeteksi. Mengirim template.`);
        
        const nama = input.senderName || '';
        const noHp = senderNumber.replace('@c.us', '');
        const layanan = session?.inquiry?.lastMentionedService || '';
        const motor = session?.inquiry?.lastMentionedMotor || '';

        const bookingTemplate = `Siap, gaskeun! 🔥
Biar cepet, tolong isi data di bawah ini ya bro, tinggal copy-paste aja.

Nama : ${nama}
No Hp : ${noHp}
TANGGAL : (Contoh: besok, 5 Juli, atau 05-07-2025)
JAM : (Contoh: 2 siang atau 14:00)
LAYANAN: ${layanan}
MOTOR: ${motor}
`;
        await updateSession(senderNumber, { flow: 'awaiting_booking_form', inquiry: { ...session?.inquiry } });
        return { suggestedReply: bookingTemplate };
    }

    // JALUR 4: Cek Pertanyaan Umum di Database Q&A (jika ada)
    const qnaAnswer = await searchKnowledgeBase(input.customerMessage);
    if (qnaAnswer) {
        console.log(`[LOG ACTION] JALUR 4: Pertanyaan umum dijawab dari Knowledge Base.`);
        return { suggestedReply: qnaAnswer.answer };
    }

    // JALUR 5 (TERAKHIR): Fallback ke AI Agent untuk obrolan umum
    console.log('[LOG ACTION] JALUR 5: Tidak ada jalur cepat yang cocok, melempar ke AI Agent.');
    const messagesForAI: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
    { role: 'system', content: masterPrompt },
    { role: 'system', content: `Catatan sesi saat ini: ${JSON.stringify(session?.inquiry || { note: 'tidak ada catatan' })}.` },
    ...(input.chatHistory || []) as OpenAI.Chat.Completions.ChatCompletionMessageParam[], // <-- TAMBAHKAN INI
    { role: 'user', content: input.customerMessage }
];
    
    try {
        const response = await openai.chat.completions.create({ model: 'gpt-4o', messages: messagesForAI, tools: zoyaTools, tool_choice: 'auto' });
        const responseMessage = response.choices[0].message;
        
        if (responseMessage.tool_calls) {
            messagesForAI.push(responseMessage);
            for (const toolCall of responseMessage.tool_calls) {
                const functionName = toolCall.function.name as 'listServicesByCategory' | 'getSpecificServicePrice' | 'getServiceDescription' | 'getMotorSizeDetails';
                const functionArgs = JSON.parse(toolCall.function.arguments);
                 // ==========================================================
              // ===== SISIPKAN 2 BARIS INI (WAJIB) =====
              // "Membekali" argumen dengan pesan asli dari user
              functionArgs.original_query = input.customerMessage;
              // ==========================================================
                let toolResult;
                // ... (Switch case untuk tool calls tetap sama seperti kode target)
                switch (functionName) {
                    case 'listServicesByCategory':
                        toolResult = await listServicesByCategory(functionArgs);
                        if (!toolResult.error && toolResult.services) {
                            const serviceNames = toolResult.services.map(s => s.name);
                            await updateSession(senderNumber, { inquiry: { ...session?.inquiry, lastOfferedServices: serviceNames }});
                        }
                        break;
                    case 'getMotorSizeDetails':
                        toolResult = await getMotorSizeDetails(functionArgs);
                        if (!toolResult.error && toolResult.details) {
                            await updateSession(senderNumber, { inquiry: { ...session?.inquiry, lastMentionedMotor: toolResult.details.motor_model }});
                        }
                        break;
                    case 'getSpecificServicePrice':
                        toolResult = await getSpecificServicePrice(functionArgs);
                        if (!toolResult.error) {
                             await updateSession(senderNumber, { inquiry: { ...session?.inquiry, lastMentionedService: toolResult.service_name, lastMentionedMotor: toolResult.motor_model } });
                        }
                        break;
                    case 'getServiceDescription':
                        toolResult = await getServiceDescription(functionArgs);
                        if (!toolResult.error && functionArgs.service_name) {
                            await updateSession(senderNumber, { inquiry: { ...session?.inquiry, lastMentionedService: functionArgs.service_name } });
                        }
                        break;
                }
                messagesForAI.push({ tool_call_id: toolCall.id, role: 'tool', content: JSON.stringify(toolResult) });
            }
            const finalResponse = await openai.chat.completions.create({ model: 'gpt-4o', messages: messagesForAI });
            const finalContent = finalResponse.choices[0].message.content?.trim();
            if (finalContent) return { suggestedReply: finalContent };
        } else {
            const finalContent = responseMessage.content?.trim();
            if (finalContent) return { suggestedReply: finalContent };
        }
        
        await notifyBosMamat(senderNumber, input.customerMessage);
        await setSnoozeMode(senderNumber);
        return { suggestedReply: HANDOVER_MESSAGE };

    } catch (error) {
        console.error("Error saat menjalankan AI Agent:", error);
        await notifyBosMamat(senderNumber, input.customerMessage);
        await setSnoozeMode(senderNumber);
        return { suggestedReply: HANDOVER_MESSAGE };
    }
}