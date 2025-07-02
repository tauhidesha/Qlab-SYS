'use server';

import { z } from 'zod';
import { promises as fs } from 'fs';
import path from 'path';

// --- Tipe Data & Skema Input (Diubah Total) ---

type Service = { 
  name: string; 
  category: string; 
  price?: number; 
  estimatedDuration?: string;
  variants?: { name: string; price: number }[]; 
};

type Motor = { 
  model: string; 
  motor_db_size: 'S' | 'M' | 'L' | 'XL'; 
  repaint_size: 'S' | 'M' | 'L' | 'XL'; 
};

type PriceResult = { 
  motor_model?: string; 
  motor_size?: 'S' | 'M' | 'L' | 'XL'; 
  service_name?: string; 
  price?: number; 
  estimated_duration?: string; 
  error?: string; 
  ambiguous_options?: string[]; 
  service_name_input?: string;
  note?: string; 
};

// --- SKEMA INPUT DISIMPLIFY, HANYA PERLU PESAN ASLI ---
const InputSchema = z.object({
  service_name: z.string(),
  motor_query: z.string(),
  // DITAMBAHKAN: Parameter untuk menerima pesan asli dari user
  original_query: z.string().optional(), 
});
type Input = z.infer<typeof InputSchema>;


// --- FUNGSI HELPER (Tidak diubah) ---
function formatDuration(minutesStr?: string): string | undefined {
    // ... (kode helper ini sama seperti sebelumnya, tidak perlu diubah)
    if (!minutesStr) return undefined;
    const totalMinutes = parseInt(minutesStr, 10);
    if (isNaN(totalMinutes) || totalMinutes === 0) return undefined;
    const totalHours = totalMinutes / 60;
    const workingDayHours = 8;
    if (totalHours > 12) {
        const days = Math.ceil(totalHours / workingDayHours);
        return `sekitar ${days} hari kerja`;
    }
    const hours = Math.floor(totalHours);
    const minutes = totalMinutes % 60;
    let result = 'sekitar ';
    if (hours > 0) result += `${hours} jam `;
    if (minutes > 0) result += `${minutes} menit`;
    return result.trim();
}

function findBestMotorMatch(query: string, allMotors: Motor[]): Motor | null {
    // ... (kode helper ini sama seperti sebelumnya, tidak perlu diubah)
    const lowerCaseQuery = query.toLowerCase();
    const matches = allMotors.filter(motor => lowerCaseQuery.includes(motor.model.toLowerCase()));
    if (matches.length === 0) return null;
    if (matches.length > 1) matches.sort((a, b) => b.model.length - a.model.length);
    return matches[0];
}


// --- FUNGSI UTAMA TOOL (Logika Deteksi Dipindah ke Sini) ---
export async function getSpecificServicePrice(input: Input): Promise<PriceResult> {
  try {
    // --- 'original_query' sekarang diambil dari input ---
    const { service_name, motor_query, original_query } = InputSchema.parse(input);

    const servicesJsonPath = path.join(process.cwd(), 'docs', 'harga_layanan.json');
    const motorsJsonPath = path.join(process.cwd(), 'docs', 'daftarUkuranMotor.json');
    
    const [servicesFile, motorsFile] = await Promise.all([
      fs.readFile(servicesJsonPath, 'utf-8'),
      fs.readFile(motorsJsonPath, 'utf-8')
    ]);

    const allServices: Service[] = JSON.parse(servicesFile);
    const allMotors: Motor[] = JSON.parse(motorsFile);

    const serviceInfo = allServices.find(s => s.name.toLowerCase().includes(service_name.toLowerCase()));
    if (!serviceInfo) return { error: `Layanan "${service_name}" tidak ditemukan.` };
    
    const motor = findBestMotorMatch(motor_query, allMotors);
    if (!motor) return { error: `Motor "${motor_query}" tidak ditemukan.` };
    
    const motorSize = serviceInfo.category === 'repaint' ? motor.repaint_size : motor.motor_db_size;

    let basePrice: number | undefined;
    const variant = serviceInfo.variants?.find(v => v.name === motorSize);
    basePrice = variant ? variant.price : serviceInfo.price;

    if (basePrice === undefined) return { error: `Harga untuk layanan "${serviceInfo.name}" tidak dapat ditentukan.` };

    // --- LOGIKA DETEKSI WARNA SPESIAL SEKARANG 100% DI SINI ---
    let finalPrice = basePrice;
    let noteForResult: string | undefined = undefined;
    let isSpecialPaintRequest = false;

    if (original_query) {
        const lowerCaseQuery = original_query.toLowerCase();
        const specialPaintKeywords = ['candy', 'lembayung', 'xyralic', 'xyrallic', 'bunglon', 'hologram', 'warna efek'];
        if (specialPaintKeywords.some(keyword => lowerCaseQuery.includes(keyword))) {
            isSpecialPaintRequest = true;
        }
    }

    if (serviceInfo.name.toLowerCase().includes('repaint bodi halus') && isSpecialPaintRequest) {
        const specialPaintSurcharges = { 'S': 150000, 'M': 250000, 'L': 350000, 'XL': 400000 };
        const surcharge = specialPaintSurcharges[motorSize as keyof typeof specialPaintSurcharges];

        if (surcharge) {
            finalPrice += surcharge;
            noteForResult = `Harga dasarnya Rp${basePrice.toLocaleString('id-ID')}, tapi karena ini warna spesial, ada tambahan biaya Rp${surcharge.toLocaleString('id-ID')}.`;
        }
    }
    // --- SELESAI LOGIKA BARU ---

    return {
      motor_model: motor.model,
      motor_size: motorSize,
      service_name: serviceInfo.name,
      price: finalPrice,
      estimated_duration: formatDuration(serviceInfo.estimatedDuration),
      note: noteForResult,
    };

  } catch (err: any) {
    console.error('[getSpecificServicePrice Tool] Error:', err);
    return { error: `Error internal di tool harga: ${err.message}` };
  }
}