'use server';

import { z } from 'zod';
import { promises as fs } from 'fs';
import path from 'path';
import type { GetPriceResult } from '@/types/ai/tools'; 

// --- Tipe Data & Skema Internal ---
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

const InputSchema = z.object({
  service_name: z.string(),
  motor_query: z.string(),
});
type Input = z.infer<typeof InputSchema>;

// --- Fungsi Helper (Tidak ada perubahan) ---
function formatDuration(minutesStr?: string): string | undefined {
    if (!minutesStr) return undefined;
    const totalMinutes = parseInt(minutesStr, 10);
    if (isNaN(totalMinutes)) return undefined;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    let result = '';
    if (hours > 0) result += `${hours} jam `;
    if (minutes > 0) result += `${minutes} menit`;
    return result.trim() || undefined;
}
function findBestMotorMatch(query: string, allMotors: Motor[]): Motor | null {
    const lowerCaseQuery = query.toLowerCase();
    const matches = allMotors.filter(motor => lowerCaseQuery.includes(motor.model.toLowerCase()));
    if (matches.length === 0) return null;
    if (matches.length > 1) matches.sort((a, b) => b.model.length - a.model.length);
    return matches[0];
}

// --- Fungsi Utama Tool ---
export async function getSpecificServicePrice(input: Input): Promise<GetPriceResult> {
  try {
    const { service_name, motor_query } = InputSchema.parse(input);

    const servicesJsonPath = path.join(process.cwd(), 'docs', 'harga_layanan.json');
    const motorsJsonPath = path.join(process.cwd(), 'docs', 'daftarUkuranMotor.json');
    
    const [servicesFile, motorsFile] = await Promise.all([
      fs.readFile(servicesJsonPath, 'utf-8'),
      fs.readFile(motorsJsonPath, 'utf-8')
    ]);

    const allServices: Service[] = JSON.parse(servicesFile);
    const allMotors: Motor[] = JSON.parse(motorsFile);

    const serviceInfo = allServices.find(s => s.name.toLowerCase().includes(service_name.toLowerCase()));
    if (!serviceInfo) {
      // HILIGHT: Menggunakan struktur error generik yang baru
      return { error: 'generic_error', message: `Layanan yang mirip dengan "${service_name}" tidak ditemukan.` };
    }
    
    const motor = findBestMotorMatch(motor_query, allMotors);
    if (!motor) {
      // HILIGHT: Menggunakan struktur error generik yang baru
      return { error: 'generic_error', message: `Motor dengan nama "${motor_query}" tidak ditemukan.` };
    }
    
    const motorSize = serviceInfo.category === 'repaint' ? motor.repaint_size : motor.motor_db_size;
    let price: number | undefined;

    if (serviceInfo.variants && serviceInfo.variants.length > 0) {
      const variant = serviceInfo.variants.find(v => v.name === motorSize);
      if (!variant) {
        // Ini adalah error spesifik, jadi strukturnya tidak berubah
        return { 
            error: 'price_not_available_for_size',
            service_name: serviceInfo.name,
            motor_size: motorSize,
        };
      }
      price = variant.price;
    } else {
      price = serviceInfo.price;
    }

    if (price === undefined) {
      // HILIGHT: Menggunakan struktur error generik yang baru
      return { error: 'generic_error', message: `Harga untuk layanan "${serviceInfo.name}" tidak dapat ditentukan.` };
    }

    // Return jika sukses (tidak berubah)
    return {
      motor_model: motor.model,
      motor_size: motorSize,
      service_name: serviceInfo.name,
      price: price,
      estimated_duration: formatDuration(serviceInfo.estimatedDuration)
    };

  } catch (err: any) {
    console.error('[getSpecificServicePrice Tool] Error:', err);
    // HILIGHT: Menggunakan struktur error generik yang baru
    return { error: 'generic_error', message: `Error internal di tool harga: ${err.message}` };
  }
}