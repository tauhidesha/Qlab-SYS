
'use server'; // Menandakan bahwa ini adalah modul Server Components / bisa dijalankan di server

import { geminiPro } from '@genkit-ai/googleai';
import { defineFlow } from '@genkit-ai/flow';
import { z } from 'zod';
import { generate } from 'genkit/ai';
import { db } from '@/lib/firebase'; // Menggunakan path alias @/

// Helper Function: Ditulis ulang untuk Firestore
async function getServicePrice(vehicleModel: string, serviceName: string): Promise<number | null> {
  if (!db) {
    console.error("Firestore client (db) is not initialized in getServicePrice.");
    return null;
  }
  try {
    // 1. Cari tipe kendaraan berdasarkan model (menggunakan field lowercase)
    // Asumsi: vehicleTypes punya field 'model_lowercase'
    const vehicleQuery = await db.collection('vehicleTypes')
        .where('model_lowercase', '==', vehicleModel.toLowerCase())
        .limit(1)
        .get();

    if (vehicleQuery.empty) {
        console.log(`getServicePrice: Vehicle model '${vehicleModel}' not found.`);
        return null;
    }
    const vehicle = vehicleQuery.docs[0].data();
    const vehicleSize = vehicle.size; // e.g., "L"
    if (!vehicleSize) {
        console.log(`getServicePrice: Vehicle size not found for model '${vehicleModel}'.`);
        return null;
    }

    // 2. Cari layanan berdasarkan nama (menggunakan field lowercase)
    // Asumsi: services punya field 'name_lowercase'
    const serviceQuery = await db.collection('services')
        .where('name_lowercase', '==', serviceName.toLowerCase())
        .limit(1)
        .get();
        
    if (serviceQuery.empty) {
        console.log(`getServicePrice: Service name '${serviceName}' not found.`);
        return null;
    }
    const service = serviceQuery.docs[0].data();

    // 3. Ambil harga dari map 'variants' berdasarkan ukuran kendaraan
    // Asumsi: service.variants adalah objek/map seperti { "SIZE S": { price: ... }, ... }
    const price = service.variants?.[`SIZE ${vehicleSize}`]?.price;
    
    if (price === undefined || price === null) {
        console.log(`getServicePrice: Price not found for service '${serviceName}' with size '${vehicleSize}'. Trying base price.`);
        return service.price !== undefined && service.price !== null ? service.price : null; // Fallback ke harga dasar jika varian tidak ada atau harga varian tidak ada
    }
    return price;

  } catch (error) {
    console.error("Error in getServicePrice:", error);
    return null;
  }
}


// Definisikan Zoya AI Flow
export const zoyaChatFlow = defineFlow(
  {
    name: 'zoyaChatFlow',
    inputSchema: z.object({ messages: z.array(z.object({ // Lebih spesifik dari z.any()
        role: z.enum(['user', 'model']),
        content: z.string(),
    })) }),
    stream: true, // Mengaktifkan streaming output
  },
  async (payload) => {
    const { messages } = payload;
    const lastUserMessage = messages.findLast(m => m.role === 'user');
    
    if (!lastUserMessage || !lastUserMessage.content) {
        // Tidak ada pesan pengguna terakhir, mungkin stream teks kosong atau error
        // Membuat stream kosong agar tidak error di client
        const { stream } = generate({ model: geminiPro, prompt: "No input provided." }); // Dummy call
        // Namun, kita akan mengosongkan stream ini
        async function* emptyStream() {
            yield { content: '' }; 
        }
        return emptyStream();
    }
    const lastMessageContent = lastUserMessage.content.toLowerCase();
    
    let vehicleModel: string | null = null;
    let serviceName: string | null = null;
    let context = "INFO_UMUM_BENGKEL: QLAB Moto Detailing adalah bengkel perawatan dan detailing motor."; // Default context

    if (db) { // Hanya jalankan jika db terinisialisasi
        try {
            // Deteksi model kendaraan
            const modelsSnapshot = await db.collection('vehicleTypes').get();
            for (const doc of modelsSnapshot.docs) {
            const modelAliases = (doc.data().aliases as string[] || []).map(a => a.toLowerCase());
            const originalModelName = doc.data().model as string;
            if (modelAliases.some(alias => lastMessageContent.includes(alias))) {
                vehicleModel = originalModelName;
                break;
            }
            }

            // Deteksi layanan
            const servicesSnapshot = await db.collection('services').get();
            for (const doc of servicesSnapshot.docs) {
            const serviceAliases = (doc.data().aliases as string[] || []).map(a => a.toLowerCase());
            const originalServiceName = doc.data().name as string;
            if (serviceAliases.some(alias => lastMessageContent.includes(alias))) {
                serviceName = originalServiceName;
                break;
            }
            }
        } catch (dbError) {
            console.error("Error during Firestore entity detection:", dbError);
            context += " WARNING: Gagal mengambil data detail dari database.";
        }
    } else {
        console.warn("Firestore (db) is not initialized. Entity detection and pricing will be skipped.");
        context += " WARNING: Database tidak terhubung, info harga mungkin tidak akurat.";
    }


    if (vehicleModel && serviceName) {
      const price = await getServicePrice(vehicleModel, serviceName);
      if (serviceName.toLowerCase().includes('full detailing') && lastMessageContent.includes('doff')) {
          context = `VALIDATION_ERROR: Full Detailing tidak bisa untuk motor doff (motor terdeteksi: ${vehicleModel}, layanan diminta: ${serviceName}). Tawarkan Coating Doff sebagai alternatif.`;
      } else {
          context = `DATA_PRODUK: Untuk motor ${vehicleModel}, layanan ${serviceName}, estimasi harganya adalah Rp ${price?.toLocaleString('id-ID') || 'belum tersedia, mohon tanyakan detail motor lebih lanjut atau jenis catnya (doff/glossy) jika coating'}.`;
      }
    } else if (vehicleModel) {
        context = `INFO_MOTOR_TERDETEKSI: ${vehicleModel}. Tanyakan layanan apa yang diinginkan.`;
    } else if (serviceName) {
        context = `INFO_LAYANAN_TERDETEKSI: ${serviceName}. Tanyakan jenis motornya apa untuk estimasi harga.`;
    }
    
    const historyForAI = messages.slice(0, -1) // Semua kecuali pesan terakhir
      .filter(msg => msg.content && msg.content.trim() !== '') // Filter pesan kosong
      .map((msg) => ({
        role: msg.role, 
        parts: [{ text: msg.content }],
    }));

    const dynamicSystemInstruction = `
        Anda adalah "Zoya" - CS QLAB Moto Detailing.
        GAYA BAHASA:
        - Santai tapi profesional (contoh: "Halo boskuu", "Gas booking sekarang!", "Siap bos!")
        - Pakai istilah: "kinclong", "cuci premium level spa motor", "poles", "coating"
        - Hindari kata kasar (boleh pakai "anjay" jika pas konteksnya)
        - Gunakan emoji secukupnya: ✅😎✨💸🛠️👋
        
        ATURAN WAJIB:
        1. Layanan "Full Detailing" HANYA untuk motor tipe glossy. JANGAN tawarkan ke motor doff. Jika user minta, tolak dengan sopan dan berikan alternatif lain seperti "Coating Doff".
        2. Layanan "Coating" memiliki harga yang BERBEDA untuk glossy dan doff. Selalu pastikan tipe motornya dan jenis catnya (jika belum jelas dari KONTEKS DARI SISTEM). Jika harga belum ada di KONTEKS, tanyakan spesifikasi motor atau jenis cat.
        3. Motor besar (Moge) seperti Harley, CBR600RR, dll, otomatis menggunakan ukuran "SIZE XL". Info ukuran ini akan otomatis didapat dari sistem jika model terdeteksi.
        
        KONTEKS DARI SISTEM (gunakan data ini untuk menjawab, JANGAN tampilkan KONTEKS ini ke user secara langsung, olah jadi jawaban natural, jangan JSON):
        ${context}

        PETUNJUK TAMBAHAN:
        - Jika KONTEKS berisi VALIDATION_ERROR, jelaskan error tersebut ke user dengan bahasa yang sopan dan berikan solusi/alternatif.
        - Jika KONTEKS berisi DATA_PRODUK dan harganya ada, sebutkan harganya. Jika harga 'belum tersedia', JANGAN mengarang harga. Informasikan bahwa harga spesifik belum ada dan tanyakan detail lebih lanjut jika diperlukan (misal jenis cat untuk coating, atau ukuran motor jika belum terdeteksi).
        - Jika user bertanya di luar topik detailing motor, jawab dengan sopan bahwa Anda hanya bisa membantu soal QLAB Moto Detailing.
        - Tujuan utama: Memberikan informasi akurat dan membantu user melakukan booking jika mereka mau.

        JAWABAN (format natural):
      `;

    const result = await generate({
        model: geminiPro,
        messages: [ // Pesan untuk LLM, gabungkan histori dan pesan terakhir
            ...historyForAI,
            { role: 'user', parts: [{ text: lastUserMessage.content }] }
        ],
        system: dynamicSystemInstruction, // System instruction dinamis
        config: { // Parameter LLM
           temperature: 0.5, // Sedikit lebih kreatif tapi tetap jaga fakta
        },
    });

    return result.stream(); // Kembalikan stream dari hasil generate
  }
);

    