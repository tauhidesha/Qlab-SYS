'use server';

import type { OpenAI } from 'openai';
import { openai } from '@/lib/openai';
import type { ZoyaChatInput, WhatsAppReplyOutput } from '@/types/ai/cs-whatsapp-reply';
import { getSession, updateSession } from '@/ai/utils/session'; 
import { listServicesByCategory } from '@/ai/tools/listServicesByCategoryTool';
import { getSpecificServicePrice } from '@/ai/tools/getSpecificServicePriceTool';
import { getServiceDescription } from '@/ai/tools/getServiceDescriptionTool';
import { searchKnowledgeBase } from '@/ai/tools/searchKnowledgeBaseTool';
import { getMotorSizeDetails } from '@/ai/tools/getMotorSizeDetailsTool';
import { findNextAvailableSlotImplementation } from '@/ai/tools/findNextAvailableSlotTool';
import { getPromoBundleDetails } from '@/ai/tools/getPromoBundleDetailsTool';
import { notifyBosMamat, setSnoozeMode } from '@/ai/utils/humanHandoverTool';
import { createBookingImplementation } from '@/ai/tools/createBookingTool'; 
import { checkBookingAvailabilityImplementation } from '@/ai/tools/checkBookingAvailabilityTool';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { parseDateTime } from '@/ai/utils/dateTimeParser';
import type { ServiceCategory } from '@/ai/utils/session';
import { Timestamp } from 'firebase/firestore';


// --- Semua Fungsi Helper Internal (Satu Sumber Kebenaran) ---

function detectHumanHandoverRequest(message: string): boolean {
    const lowerCaseMessage = message.toLowerCase();
    const keywords = ['ngobrol sama orang', 'sama manusia', 'cs asli', 'admin', 'bos mamat', 'sama lo', 'telepon'];
    return keywords.some(keyword => lowerCaseMessage.includes(keyword));
}

function detectGreeting(message: string): boolean {
    const msg = message.toLowerCase().trim(); // Gunakan trim untuk menghapus spasi
    const greetingKeywords =  ['p', 'pa', 'pagi', 'siang', 'sore', 'malam',
  'halo', 'hallo', 'haloo', 'hallo kak', 'halo min', 'halo gan',
  'hi', 'hai', 'hay', 'hey', 'hei', 'heii',
  'bro', 'bray', 'bre', 'mas', 'mas bro', 'mas bre',
  'mbak', 'sis', 'kak', 'cak', 'gan', 'om',
  'min', 'admin', 'bang', 'abang', 'bos', 'bosku',
  'tes', 'test', 'cek', 'cek bro', 'woi', 'woy',
  'permisi', 'punten', 'excuse me', 'yo', 'yo bro', 'yo gan',
  'good morning', 'good night', 'good afternoon', 'selamat pagi',
  'selamat malam', 'selamat sore', 'selamat siang',
  'assalamualaikum', 'assalamu’alaikum', 'ass wr wb',
  'ass', 'asw', 'wassalam', 'wassalamu’alaikum',
  'apa kabar', 'apa kabarnya', 'kabarnya gimana', 'apa news',
  'ada orang?', 'halo ada?', 'anyone?', 'test masuk', 'cek cek',
  'permisi bang', 'permisi min', 'halo ada orang?', 'halo guys',
  'min on?', 'admin on?',
  'misi', 'misi bang', 'cek koneksi', 'halo kakak',
  'oi', 'oii', 'oy', 'yoi', 'bang', 'bruh',
  'haii', 'hiii', 'hallo semua', 'min bantu dong', 'halo juga',
  'yok', 'cek om', 'bang cek', 'yo min', 'yo mas',
  'gimana', 'bro ada?'];
    // Fungsi ini akan true jika pesannya HANYA salah satu dari keyword di atas
    return greetingKeywords.includes(msg);
}

function mapTermToOfficialService(message: string): string | null {
    const msg = message.toLowerCase();
    
    // Ini adalah "kamus" utama kita
    const serviceKeywordsMap = [
        {
        officialName: 'Coating Motor Glossy',
        keywords: [
          'coating glossy', 'nano coating', 'coating kilap', 'ceramic glossy',
          'coating bening', 'coating kaca', 'coating wetlook', 'kilap daun talas',
          'coating kinclong', 'lapis keramik glossy'
        ]
      },
      {
        officialName: 'Coating Motor Doff',
        keywords: [
          'coating doff', 'nano doff', 'coating matte', 'keramik doff',
          'matte coating', 'coating warna doff', 'lapisan doff', 'proteksi cat doff',
          'coating tidak mengkilap', 'coating tampilan doff'
        ]
      },
      {
        officialName: 'Complete Service Glossy',
        keywords: [
          'paket glossy lengkap', 'complete glossy', 'coating + detailing',
          'glossy total', 'servis glossy', 'detailing coating glossy',
          'glossy komplit', 'servis ultimate', 'glossy all in', 'paket sultan glossy'
        ]
      },
      {
        officialName: 'Complete Service Doff',
        keywords: [
          'paket doff lengkap', 'complete doff', 'detailing coating doff',
          'doff komplit', 'servis doff total', 'servis ultimate doff',
          'paket doff full', 'coating + detailing doff', 'paket sultan doff', 'doff all in'
        ]
      },
      {
        officialName: 'Repaint Bodi Halus',
        keywords: [
          'cat bodi', 'repaint bodi', 'cat ulang halus', 'repaint alus',
          'cat mulus', 'repaint kinclong', 'cat ulang pabrikan', 'repaint full bodi',
          'warna ulang bodi', 'bodi dicat ulang'
        ]
      },
      {
        officialName: 'Repaint Bodi Kasar',
        keywords: [
          'cat dek', 'repaint kasar', 'cat hitam doff', 'cat bagian kasar',
          'cat ulang dek', 'cat ulang plastik kasar', 'cat ulang tekstur',
          'dek motor kusam', 'cat ulang dek hitam', 'repaint bodi kasar'
        ]
      },
      {
        officialName: 'Repaint Velg',
        keywords: [
          'cat velg', 'repaint velg', 'cat ulang velg', 'warna ulang velg',
          'cat pelek', 'velg dicat', 'ganti warna velg', 'velg baru lagi',
          'pelek repaint', 'warna velg keren'
        ]
      },
      {
        officialName: 'Repaint Cover CVT / Arm',
        keywords: [
          'cat cvt', 'cat arm', 'repaint cvt', 'repaint arm',
          'cat mesin belakang', 'cat swing arm', 'cat ulang cvt',
          'warna ulang arm', 'cover cvt repaint', 'warna baru arm'
        ]
      },
      {
        officialName: 'Cuci Reguler',
        keywords: [
          'cuci motor', 'cuci biasa', 'cuci standar', 'semir ban',
          'cuci luar aja', 'cuci harian', 'cuci kilat', 'cuci cepat',
          'cuci murah', 'cuci kilau'
        ]
      },
      {
        officialName: 'Cuci Premium',
        keywords: [
          'cuci premium', 'cuci wax', 'cuci kilap', 'cuci mengkilap',
          'cuci glow up', 'cuci mewah', 'cuci bersih banget', 'cuci plus wax',
          'cuci detail', 'upgrade cuci'
        ]
      },
      {
        officialName: 'Detailing Mesin',
        keywords: [
          'cuci mesin', 'detailing mesin', 'bersihin mesin', 'kerak oli',
          'pembersih crankcase', 'cuci ruang mesin', 'crankcase detailing',
          'mesin bersih banget', 'cuci sela mesin', 'bersih oli bocor'
        ]
      },
      {
        officialName: 'Cuci Komplit',
        keywords: [
          'cuci total', 'cuci telanjang', 'cuci bongkar pasang', 'cuci bersih sampai rangka',
          'cuci semua bagian', 'cuci dalam banget', 'cuci total motor', 'bongkar cuci',
          'deep clean motor', 'detailing cuci'
        ]
      },
      {
        officialName: 'Poles Bodi Glossy',
        keywords: [
          'poles bodi', 'poles cat', 'kilapin bodi', 'poles baret halus',
          'poles kilap', 'poles glossy', 'bodi kinclong', 'kilap ulang',
          'poles full body', 'poles permukaan bodi'
        ]
      },
      {
        officialName: 'Full Detailing Glossy',
        keywords: [
          'detailing full', 'detailing total', 'detailing glossy',
          'detailing dan poles', 'restorasi bodi', 'detailing komplit',
          'detailing luar dalam', 'detailing ultimate', 'detailing kilap maksimal', 'detailing pamungkas'
        ]
      }
    ];

    for (const service of serviceKeywordsMap) {
        if (service.keywords.some(keyword => msg.includes(keyword))) {
            return service.officialName;
        }
    }

    return null;
}

function detectBookingIntent(message: string): boolean {
    const msg = message.toLowerCase();
    // Tambahkan kata kunci lain yang sering digunakan pelanggan Anda
    const keywords = ["booking", "jadwalin", "gas", "deal", "oke fix", "lanjut", "gaskeun", "sabi", "yowes", "yoi", "catet", "setuju", "boleh"];
    
    // Cek jika pesan singkat dan mengandung keyword (menghindari false positive)
    if (msg.length < 20 && keywords.some(kw => msg.includes(kw))) {
        return true;
    }
    return false;
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
    { type: 'function', function: { name: 'findNextAvailableSlot', description: "Gunakan untuk mencari jadwal kosong. Jika user menyebut preferensi hari (misal: 'besok', 'hari sabtu', 'minggu depan'), teruskan ke parameter `preferred_date`.",parameters: { type: 'object', properties: {preferred_date: {type: 'string', description: "Tanggal atau hari yang diinginkan user, contoh: 'besok', 'lusa', '5 Juli 2025'." }}, } } },
    { type: 'function', function: { name: 'getPromoBundleDetails', description: "Gunakan untuk mendapatkan detail dan harga promo bundling Repaint + Detailing berdasarkan model motor.",parameters: { type: 'object', properties: { motor_query: { type: 'string' } },required: ['motor_query']}}},
];

// --- PROMPT UTAMA ---
const masterPrompt = `## 🧠 PERAN & TUJUAN ZOYA (VERSI SALES)
Lo adalah Zoya, "Sales Advisor" andalan dari Bosmat Detailing Studio. Lo bukan cuma CS, tapi partner ngobrol yang ngerti banget gimana caranya bikin motor jadi keren maksimal.
Tujuan utama lo cuma satu: **MEYAKINKAN PELANGGAN UNTUK BOOKING LAYANAN**. Setiap interaksi harus diarahkan untuk mencapai tujuan ini.

## 🧊 ICE BREAKER & SAPAAN AWAL
- Jika user mengirim pesan yang sangat singkat dan tidak jelas tujuannya (misal: "punten", "permisi", "bang"), JANGAN BINGUNG atau diam.
- Tugas lo adalah AMBIL INISIATIF. Balas dengan sapaan pembuka yang ramah dan proaktif. Langsung tanyakan apa yang bisa dibantu.
- Contoh balasan: "Siap, bro! Dengan Zoya di sini. Ada yang perlu dibantu soal motornya? Mau tanya harga atau cek jadwal kosong?"

## 🎯 FOKUS UTAMA (VERSI SALES)
- **BUKAN HANYA MEMBERI HARGA, TAPI JUAL NILAINYA.** Jelaskan kenapa harga tersebut sepadan. Contoh: "Harganya memang segitu, tapi hasilnya cat bakal deep look dan tahan lama bro, karena kita pakai pernis premium."
- **JADILAH PROAKTIF, BUKAN REAKTIF.** Jangan tunggu ditanya. Setelah menjawab, langsung ajukan pertanyaan yang mengarahkan ke langkah selanjutnya.
- **TUTUP PERCAKAPAN DENGAN AJAKAN BOOKING (Call to Action).** Selalu akhiri dengan ajakan untuk booking, cek jadwal, atau bertanya kesiapan pelanggan.

## 💬 GAYA KOMUNIKASI SALES
- **Tawarkan Solusi:** Dengarkan keluhan user (misal: "motor kusam"), lalu tawarkan layanan yang paling pas sebagai solusinya.
- **Upselling & Cross-selling:**
  - Jika user tanya "Repaint Velg", tawarkan juga "Repaint Bodi Halus" agar warnanya serasi.
  - Jika user booking "Full Detailing", tawarkan "Coating" untuk proteksi ekstra agar hasilnya awet berbulan-bulan.
- **Ciptakan Urgensi (Secukupnya):** Gunakan frasa seperti "Slot weekend biasanya cepat penuh lho, bro" atau "Mumpung jadwal minggu ini masih ada yang kosong."
- **Pertanyaan Pancingan:**
  - Daripada: "Ada lagi yang bisa dibantu?"
  - Gunakan: "Gimana, bro? Mau sekalian Zoya cek jadwal kosong paling cepat?"

  ## 🎁 STRATEGI PROMO & BUNDLING (BARU)
- **JADILAH PENAWAR PROAKTIF:** Jika user bertanya harga layanan "Repaint Bodi Halus" atau "Full Detailing", **JANGAN HANYA KASIH HARGA NORMAL.**
- **WAJIB TAWARKAN BUNDLING:** Setelah memberikan harga normal, **selalu tawarkan Promo Bundling** sebagai pilihan yang lebih hemat dan menguntungkan. Gunakan tool \`getPromoBundleDetails\` untuk mendapatkan detailnya.
- **TEKANKAN KEUNTUNGAN:** Selalu sebutkan jumlah hematnya. Contoh: "Kalau ambil paket bundling ini, lo bisa hemat sampai 300rb lho, bro!"
- **JAWAB PERTANYAAN PROMO:** Jika user langsung bertanya "ada promo apa?", langsung gunakan tool \`getPromoBundleDetails\` untuk menjelaskannya.

## 🤺 PENANGANAN KEBERATAN (OBJECTION HANDLING)
- **Jika pelanggan bilang "Harganya mahal":** JANGAN minta maaf. Justru validasi dan tekankan kembali NILAI-nya. Gunakan balasan seperti: "Betul bro, harga kami memang premium karena kami pakai bahan terbaik (sebutkan contoh: pernis Sikkens/Blinken) dan ada garansi 6 bulan. Kualitasnya dijamin beda."
- **Jika pelanggan bilang "Saya pikir-pikir dulu":** Jangan langsung pasrah. Tanyakan baik-baik apa yang jadi pertimbangannya. Contoh: "Siap, bro. Boleh tahu kira-kira apa yang jadi pertimbangannya? Mungkin soal jadwal atau ada info lain yang Zoya bisa bantu jelaskan?"
- **Jika pelanggan membandingkan dengan tempat lain:** Jangan menjelekkan kompetitor. Fokus pada keunggulan unik Bosmat. Contoh: "Kami paham bro. Yang membedakan kami adalah garansi pengerjaan dan detailing finishing setelah repaint, jadi motor keluar dari sini bukan cuma kinclong tapi juga terproteksi."

## 🛠️ TOOLBOX ZOYA
- Gunakan \`getSpecificServicePrice\` untuk harga.
- Gunakan \`getServiceDescription\` untuk menjelaskan KEUNTUNGAN layanan, bukan cuma fiturnya.
- Gunakan \`checkBookingAvailability\` sebagai alat closing untuk mengamankan jadwal.
`;

export async function generateWhatsAppReply(input: ZoyaChatInput): Promise<WhatsAppReplyOutput | null> {
    const senderNumber = input.senderNumber || 'playground_user';
    let session = await getSession(senderNumber);

    // --- MODIFIKASI DIMULAI: PEMBATALAN FOLLOW-UP OTOMATIS ---
    // Jika pelanggan merespons, jadwal follow-up yang ada harus batal.
    if (session?.followUpState) {
        console.log(`[Follow-up] Dibatalkan untuk ${senderNumber} karena ada pesan baru.`);
        // Update sesi untuk menghapus state follow-up
        await updateSession(senderNumber, { ...session, followUpState: null });
        // Update juga object sesi lokal agar sisa kode tidak bingung
        if(session) session.followUpState = null;
    }
    // --- MODIFIKASI SELESAI ---
    
    console.log(`\n\n================ Zoya New Turn for ${senderNumber} ================`);
    console.log(`[PESAN MASUK]: "${input.customerMessage}"`);
    console.log(`[LOG SESI AWAL]:`, JSON.stringify(session, null, 2));

    if (session?.snoozeUntil && Date.now() < session.snoozeUntil) {
        console.log(`[LOG ACTION] JALUR 0: Mode diam aktif. Tidak ada balasan.`);
        return null;
    }
    
    // --- MODIFIKASI: Inisialisasi Sesi Baru dengan Field Lengkap ---
   // BENAR
if (!session || !session.flow) {
    const newSessionData = { 
        flow: 'general' as const, 
        inquiry: {}, 
        lastInteraction: Timestamp.now(), // <-- Ganti menjadi ini
        followUpState: null 
    };
    await updateSession(senderNumber, newSessionData);
    session = await getSession(senderNumber);
}
     // =======================================================
    // --- PASANG FUNGSI "PENERJEMAH" ANDA DI SINI ---
    // =======================================================
    const detectedServiceName = mapTermToOfficialService(input.customerMessage);
    if (detectedServiceName && session?.inquiry) {
        console.log(`[Mapper] Istilah pelanggan terpetakan ke layanan resmi: "${detectedServiceName}"`);
        session.inquiry.lastMentionedService = detectedServiceName;
    }
    // =======================================================


    const HANDOVER_MESSAGE = "Aduh Zoya bingung, bentar Zoya panggilin Bos Mamat ya.";
    const CUSTOMER_REQUEST_HANDOVER_MESSAGE = "Oke siap, bentar Zoya panggilin Bos Mamat ya, ditunggu bro!";
    
    // JALUR 1: Cek Permintaan Eskalasi ke Manusia
    if (detectHumanHandoverRequest(input.customerMessage)) {
        console.log(`[LOG ACTION] JALUR 1: Deteksi permintaan handover.`);
        await notifyBosMamat(senderNumber, input.customerMessage);
        await setSnoozeMode(senderNumber);
        return { suggestedReply: CUSTOMER_REQUEST_HANDOVER_MESSAGE };
    }
    // JALUR 1.5 (BARU): Menangani sapaan singkat
    if (detectGreeting(input.customerMessage)) {
        console.log(`[LOG ACTION] JALUR 1.5: Deteksi sapaan singkat.`);
        const greetingReply = "Halo bro, dengan Zoya di sini! 😎 Ada yang bisa Zoya bantu? Mau tanya-tanya soal detailing, repaint, atau mau langsung booking biar motornya makin ganteng?";
        return { suggestedReply: greetingReply };
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
            await updateSession(senderNumber, { ...session, flow: 'general' });
            return { suggestedReply: "Waduh bro, Zoya bingung sama format tanggal atau jamnya. Boleh tolong isi formnya lagi dengan format yang lebih jelas? (Contoh: TANGGAL: 4 Juli 2025, JAM: 14:00)" };
        }

        console.log(`[Booking Flow] Form berhasil diparsing dan diterjemahkan, cek ketersediaan...`, {
            ...formDetails,
            bookingDate: parsedDateTime.date, // Gunakan hasil parsing
            bookingTime: parsedDateTime.time,  // Gunakan hasil parsing
        });
        
        const availabilityResult = await checkBookingAvailabilityImplementation({
            bookingDate: parsedDateTime.date, 
            bookingTime: parsedDateTime.time, 
            serviceName: formDetails.serviceName,
            estimatedDurationMinutes: 300 
        });
        
            if (!availabilityResult.isAvailable) {
                await updateSession(senderNumber, { ...session, flow: 'general' });
                return { suggestedReply: availabilityResult.reason || "Maaf bro, jadwal di waktu itu nggak tersedia. Mau coba isi form lagi dengan jadwal lain?" };
            }

            console.log(`[Booking Flow] Jadwal tersedia. Membuat booking...`);
            const serviceId = await getServiceIdByName(formDetails.serviceName);

            const bookingResult = await createBookingImplementation({
                customerName: formDetails.customerName || input.senderName || 'Pelanggan WhatsApp',
                customerPhone: senderNumber.replace('@c.us', ''),
                vehicleInfo: formDetails.vehicleInfo,
                serviceName: formDetails.serviceName,
                bookingDate: parsedDateTime.date,
                bookingTime: parsedDateTime.time,
                serviceId: serviceId || '',
            });
            
            // --- MODIFIKASI: RESET SESI SETELAH BOOKING ---
            // Kode ini secara otomatis juga menghapus `followUpState`, jadi sudah benar.
            console.log(`[Follow-up] Dibatalkan untuk ${senderNumber} karena booking berhasil.`);
           await updateSession(senderNumber, { flow: 'general', inquiry: {}, lastInteraction: Timestamp.now(), followUpState: null });
            return { suggestedReply: bookingResult.message || "Booking berhasil dibuat, bro! Makasih ya." };

        } else {
            console.log(`[Booking Flow] Gagal mem-parsing form. Meminta user untuk mengisi ulang.`);
            await updateSession(senderNumber, { ...session, flow: 'general' }); // Reset flow agar tidak nyangkut
            return { suggestedReply: "Waduh bro, sepertinya format isiannya ada yang salah. Boleh tolong copy-paste template sebelumnya dan isi lagi bagian yang kosong? Makasih ya." };
        }
    }

    // JALUR 3: Mengirim Template Booking
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
        await updateSession(senderNumber, { ...session, flow: 'awaiting_booking_form' });
        return { suggestedReply: bookingTemplate };
    }

   // JALUR 4: Cek Pertanyaan Umum di Database Q&A (jika ada)
const qnaAnswer = await searchKnowledgeBase(input.customerMessage);
if (qnaAnswer) {
    console.log(`[LOG ACTION] JALUR 4: Ditemukan jawaban di Q&A.`);
    
    // --- TAMBAHAN: Jalankan Aksi dari Q&A ---
    if (qnaAnswer.action?.update_session && session) {
        console.log('[LOG ACTION] Menjalankan aksi update_session dari Q&A.');
        await updateSession(senderNumber, { 
            ...session, 
            inquiry: { ...session.inquiry, ...qnaAnswer.action.update_session.inquiry }
        });
    }
    // --- SELESAI TAMBAHAN ---

    return { suggestedReply: qnaAnswer.answer };
}

    // JALUR 5 (TERAKHIR): Fallback ke AI Agent untuk obrolan umum
   console.log('[LOG ACTION] JALUR 5: Tidak ada jalur cepat yang cocok, melempar ke AI Agent.');

    const messagesForAI: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
        { role: 'system', content: masterPrompt },
        { role: 'system', content: `Catatan sesi saat ini: ${JSON.stringify(session?.inquiry || { note: 'tidak ada catatan' })}.` },
        ...(input.chatHistory || []) as OpenAI.Chat.Completions.ChatCompletionMessageParam[],
        { role: 'user', content: input.customerMessage }
    ];
    try {
        const response = await openai.chat.completions.create({ model: 'gpt-4o', messages: messagesForAI, tools: zoyaTools, tool_choice: 'auto' });
        const responseMessage = response.choices[0].message;
        
        if (responseMessage.tool_calls) {
                messagesForAI.push(responseMessage);

                for (const toolCall of responseMessage.tool_calls) {
                    const functionName = toolCall.function.name;
                    const functionArgs = JSON.parse(toolCall.function.arguments);
                    let toolResult;

                    console.log(`[AI Action] Memanggil tool: ${functionName} dengan argumen:`, functionArgs);

                    switch (functionName) {
                        case 'listServicesByCategory':
                            toolResult = await listServicesByCategory(functionArgs);
                            if (!toolResult.error && toolResult.services) {
                                const serviceNames = toolResult.services.map((s: any) => s.name);
                                await updateSession(senderNumber, { ...session, inquiry: { ...session?.inquiry, lastOfferedServices: serviceNames }});
                            }
                            break;
                        case 'getPromoBundleDetails':
                            toolResult = await getPromoBundleDetails(functionArgs);
                            break;
                        case 'getSpecificServicePrice':
                            functionArgs.original_query = input.customerMessage; 
                            toolResult = await getSpecificServicePrice(functionArgs);
                            if (!toolResult.error) {
                                await updateSession(senderNumber, { ...session, inquiry: { ...session?.inquiry, lastMentionedService: toolResult.service_name, lastMentionedMotor: toolResult.motor_model } });
                            }
                            break;
                        case 'getServiceDescription':
                            toolResult = await getServiceDescription(functionArgs);
                            if (!toolResult.error && functionArgs.service_name) {
                                await updateSession(senderNumber, { ...session, inquiry: { ...session?.inquiry, lastMentionedService: functionArgs.service_name } });
                            }
                            break;
                        case 'getMotorSizeDetails':
                            toolResult = await getMotorSizeDetails(functionArgs);
                             if (!toolResult.error && toolResult.details) {
                                await updateSession(senderNumber, { ...session, inquiry: { ...session?.inquiry, lastMentionedMotor: toolResult.details.motor_model }});
                            }
                            break;
                        case 'findNextAvailableSlot':
                            toolResult = await findNextAvailableSlotImplementation(functionArgs);
                            break;
                        default:
                            console.error(`Tool dengan nama "${functionName}" tidak dikenal.`);
                            toolResult = { error: `Tool tidak dikenal: ${functionName}` };
                    }
                    
                   // --- PERBAIKAN: LOGIKA HANDOVER PINDAH KE SINI ---
        // Tepat setelah mendapatkan hasil dari switch, kita cek hasilnya.
        if (toolResult?.error === 'requires_human_assistance') {
            console.log('[Handover] Tool meminta eskalasi ke manusia.');
            
            const handoverReply = "Oke bro, untuk repaint Vespa itu kasusnya spesial karena banyak detail dan variasinya. Biar infonya akurat dan hasilnya maksimal, Zoya sambungin langsung ke Bos Mamat ya untuk diskusi lebih lanjut. Ditunggu sebentar bro!";
            
            await notifyBosMamat(senderNumber, input.customerMessage);
            await setSnoozeMode(senderNumber);

            // Langsung kirim pesan handover dan hentikan seluruh proses di fungsi ini
            return { suggestedReply: handoverReply };
        }
        // --- AKHIR PERBAIKAN ---
                    messagesForAI.push({
                        tool_call_id: toolCall.id,
                        role: 'tool',
                        content: JSON.stringify(toolResult),
                    });
                }

                const finalResponse = await openai.chat.completions.create({
                    model: 'gpt-4o',
                    messages: messagesForAI,
                });

                const finalContent = finalResponse.choices[0].message.content?.trim();
                if (finalContent) {
                    // --- MODIFIKASI BAGIAN C: OTOMATIS TANDAI UNTUK FOLLOW-UP ---
                    let needsFollowUp = false;
                    const toolNames = responseMessage.tool_calls.map(tc => tc.function.name);
    
                    // Tentukan tool mana yang memicu follow-up
                    if (toolNames.includes('getSpecificServicePrice') || toolNames.includes('getServiceDescription') || toolNames.includes('getPromoBundleDetails')) {
                        needsFollowUp = true;
                    }
    
                    if (needsFollowUp && session) {
                        const context = session.inquiry?.lastMentionedService || input.customerMessage.substring(0, 50);
                        console.log(`[Follow-up] Menandai ${senderNumber} untuk follow-up level 1.`);
                        
                        const updatedSessionData = {
                            ...session,
                            lastInteraction: Timestamp.now(), // Selalu update lastInteraction
                            followUpState: { level: 1, flaggedAt: Date.now(), context: context }
                        };
                        await updateSession(senderNumber, updatedSessionData);
                    }
                    // --- MODIFIKASI SELESAI ---

                    return { suggestedReply: finalContent };
                }
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