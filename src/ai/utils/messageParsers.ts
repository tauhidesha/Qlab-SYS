// File: ai/utils/messageParsers.ts

export function detectHumanHandoverRequest(message: string): boolean {
    const lowerCaseMessage = message.toLowerCase();
    const keywords = ['ngobrol sama orang', 'sama manusia', 'cs asli', 'admin', 'bos mamat', 'sama lo', 'telepon'];
    return keywords.some(keyword => lowerCaseMessage.includes(keyword));
}

export function detectGreeting(message: string): boolean {
    const msg = message.toLowerCase().trim();
    const greetingKeywords =  ['p', 'pa', 'pagi', 'siang', 'sore', 'malam', 'halo', 'hallo', 'haloo', 'hallo kak', 'halo min', 'halo gan', 'hi', 'hai', 'hay', 'hey', 'hei', 'heii', 'bro', 'bray', 'bre', 'mas', 'mas bro', 'mas bre', 'mbak', 'sis', 'kak', 'cak', 'gan', 'om', 'min', 'admin', 'bang', 'abang', 'bos', 'bosku', 'tes', 'test', 'cek', 'cek bro', 'woi', 'woy', 'permisi', 'punten', 'excuse me', 'yo', 'yo bro', 'yo gan', 'good morning', 'good night', 'good afternoon', 'selamat pagi', 'selamat malam', 'selamat sore', 'selamat siang', 'assalamualaikum', 'assalamu’alaikum', 'ass wr wb', 'ass', 'asw', 'wassalam', 'wassalamu’alaikum', 'apa kabar', 'apa kabarnya', 'kabarnya gimana', 'apa news', 'ada orang?', 'halo ada?', 'anyone?', 'test masuk', 'cek cek', 'permisi bang', 'permisi min', 'halo ada orang?', 'halo guys', 'min on?', 'admin on?', 'misi', 'misi bang', 'cek koneksi', 'halo kakak', 'oi', 'oii', 'oy', 'yoi', 'bang', 'bruh', 'haii', 'hiii', 'hallo semua', 'min bantu dong', 'halo juga', 'yok', 'cek om', 'bang cek', 'yo min', 'yo mas', 'gimana', 'bro ada?'];
    return greetingKeywords.includes(msg);
}

export function mapTermToOfficialService(message: string): string | null {
    const msg = message.toLowerCase();
    const serviceKeywordsMap = [
        { officialName: 'Coating Motor Glossy', keywords: [ 'coating glossy', 'nano coating', 'coating kilap', 'ceramic glossy', 'coating bening', 'coating kaca', 'coating wetlook', 'kilap daun talas', 'coating kinclong', 'lapis keramik glossy' ] },
        { officialName: 'Coating Motor Doff', keywords: [ 'coating doff', 'nano doff', 'coating matte', 'keramik doff', 'matte coating', 'coating warna doff', 'lapisan doff', 'proteksi cat doff', 'coating tidak mengkilap', 'coating tampilan doff' ] },
        { officialName: 'Complete Service Glossy', keywords: [ 'paket glossy lengkap', 'complete glossy', 'coating + detailing', 'glossy total', 'servis glossy', 'detailing coating glossy', 'glossy komplit', 'servis ultimate', 'glossy all in', 'paket sultan glossy' ] },
        { officialName: 'Complete Service Doff', keywords: [ 'paket doff lengkap', 'complete doff', 'detailing coating doff', 'doff komplit', 'servis doff total', 'servis ultimate doff', 'paket doff full', 'coating + detailing doff', 'paket sultan doff', 'doff all in' ] },
        { officialName: 'Repaint Bodi Halus', keywords: [ 'cat bodi', 'repaint bodi', 'cat ulang halus', 'repaint alus', 'cat mulus', 'repaint kinclong', 'cat ulang pabrikan', 'repaint full bodi', 'warna ulang bodi', 'bodi dicat ulang' ] },
        { officialName: 'Repaint Bodi Kasar', keywords: [ 'cat dek', 'repaint kasar', 'cat hitam doff', 'cat bagian kasar', 'cat ulang dek', 'cat ulang plastik kasar', 'cat ulang tekstur', 'dek motor kusam', 'cat ulang dek hitam', 'repaint bodi kasar' ] },
        { officialName: 'Repaint Velg', keywords: [ 'cat velg', 'repaint velg', 'cat ulang velg', 'warna ulang velg', 'cat pelek', 'velg dicat', 'ganti warna velg', 'velg baru lagi', 'pelek repaint', 'warna velg keren' ] },
        { officialName: 'Repaint Cover CVT / Arm', keywords: [ 'cat cvt', 'cat arm', 'repaint cvt', 'repaint arm', 'cat mesin belakang', 'cat swing arm', 'cat ulang cvt', 'warna ulang arm', 'cover cvt repaint', 'warna baru arm' ] },
        { officialName: 'Cuci Reguler', keywords: [ 'cuci motor', 'cuci biasa', 'cuci standar', 'semir ban', 'cuci luar aja', 'cuci harian', 'cuci kilat', 'cuci cepat', 'cuci murah', 'cuci kilau' ] },
        { officialName: 'Cuci Premium', keywords: [ 'cuci premium', 'cuci wax', 'cuci kilap', 'cuci mengkilap', 'cuci glow up', 'cuci mewah', 'cuci bersih banget', 'cuci plus wax', 'cuci detail', 'upgrade cuci' ] },
        { officialName: 'Detailing Mesin', keywords: [ 'cuci mesin', 'detailing mesin', 'bersihin mesin', 'kerak oli', 'pembersih crankcase', 'cuci ruang mesin', 'crankcase detailing', 'mesin bersih banget', 'cuci sela mesin', 'bersih oli bocor' ] },
        { officialName: 'Cuci Komplit', keywords: [ 'cuci total', 'cuci telanjang', 'cuci bongkar pasang', 'cuci bersih sampai rangka', 'cuci semua bagian', 'cuci dalam banget', 'cuci total motor', 'bongkar cuci', 'deep clean motor', 'detailing cuci' ] },
        { officialName: 'Poles Bodi Glossy', keywords: [ 'poles bodi', 'poles cat', 'kilapin bodi', 'poles baret halus', 'poles kilap', 'poles glossy', 'bodi kinclong', 'kilap ulang', 'poles full body', 'poles permukaan bodi' ] },
        { officialName: 'Full Detailing Glossy', keywords: [ 'detailing full', 'detailing total', 'detailing glossy', 'detailing dan poles', 'restorasi bodi', 'detailing komplit', 'detailing luar dalam', 'detailing ultimate', 'detailing kilap maksimal', 'detailing pamungkas' ] }
    ];

    for (const service of serviceKeywordsMap) {
        if (service.keywords.some(keyword => msg.includes(keyword))) {
            return service.officialName;
        }
    }
    return null;
}

export function detectBookingIntent(message: string): boolean {
    const msg = message.toLowerCase();
    // --- INI PERBAIKANNYA: Kamus kata kunci diperluas ---
    const keywords = [
        "booking", "jadwalin", "gas", "deal", "oke fix", "lanjut", 
        "gaskeun", "sabi", "yowes", "yoi", "catet", "setuju", "boleh",
        "mau", "iya", "ok", "oke", "sip", "ya" // <-- Tambahan kata kunci penting
    ];
    // ----------------------------------------------------

    // Kita buat logikanya lebih sederhana: jika ada salah satu kata kunci, anggap itu niat booking.
    // Pengecekan panjang pesan bisa dihilangkan agar lebih fleksibel.
    return keywords.some(kw => {
        // Cek sebagai kata yang berdiri sendiri untuk menghindari false positive
        // Contoh: "mau" akan cocok, tapi "kemauan" tidak.
        const regex = new RegExp(`\\b${kw}\\b`);
        return regex.test(msg);
    });
}

export function detectGenericPriceIntent(message: string): boolean {
    const msg = message.toLowerCase();
    const priceIntent = /harga|biaya|price|list|pricelist|listnya|pricelish/i.test(msg);
    const genericKeywords = ["masing-masing", "masing2", "harganya berapa", "semuanya berapa", "dua-duanya", "keduanya", "brp"];
    return priceIntent && (genericKeywords.some(kw => msg.includes(kw)) || msg.length < 25);
}

export function parseBookingForm(text: string): { [key: string]: string } | null {
    const lines = text.split('\n');
    const details: { [key: string]: string } = {};
    // --- PERBAIKAN DI SINI ---
    // Tambahkan 'plat nomor' ke dalam pemetaan
    const mappings: { [key: string]: string } = {
        'nama': 'customerName',
        'no hp': 'customerPhone',
        'tanggal': 'bookingDate',
        'jam': 'bookingTime',
        'layanan': 'serviceName',
        'motor': 'vehicleInfo',
        'plat nomor': 'licensePlate', // <-- TAMBAHAN
    };
    // --- AKHIR PERBAIKAN ---

    lines.forEach(line => {
        const parts = line.split(':');
        if (parts.length < 2) return;
        const key = parts[0].trim().toLowerCase();
        const value = parts.slice(1).join(':').trim();
        if (mappings[key] && value) {
            details[mappings[key]] = value;
        }
    });

    if (details.bookingDate && details.bookingTime && details.serviceName && details.vehicleInfo) {
        return details;
    }
    return null;
}

// --- Keyword Heuristics Tambahan ---

const promoKeywords = ['promo', 'bundling', 'paket hemat', 'diskon'];
const scheduleKeywords = ['jadwal', 'booking hari', 'jam kosong', 'hari apa', 'bisa kapan',
    'kapan bisa', 'ada slot', 'kosong ga', 'besok bisa', 'bisa ga',
    'tersedia kapan', 'cek jadwal', 'slot kosong'];
const objectionKeywords = ['mahal', 'pikir-pikir', 'nanti dulu', 'liat-liat dulu', 'cari yang lain'];

export function detectPromoIntent(message: string): boolean {
  return promoKeywords.some(k => message.toLowerCase().includes(k));
}

export function detectScheduleIntent(message: string): boolean {
  return scheduleKeywords.some(k => message.toLowerCase().includes(k));
}

export function detectObjection(message: string): boolean {
  return objectionKeywords.some(k => message.toLowerCase().includes(k));
}