// @file: src/ai/tools/getStudioInfoTool.ts
import { z } from 'zod';
import { createTraceable } from '@/lib/langsmith';

const getStudioInfoSchema = z.object({
  infoType: z.enum(['location', 'hours', 'contact', 'booking_policy', 'all']).describe('Jenis informasi yang diminta: lokasi, jam buka, kontak, kebijakan booking, atau semua'),
});

export const getStudioInfoTool = {
  name: 'getStudioInfo',
  description: 'Dapatkan informasi lengkap tentang studio Bosmat: alamat, jam buka, kontak, dan kebijakan booking',
  schema: getStudioInfoSchema,
  toolDefinition: {
    type: 'function' as const,
    function: {
      name: 'getStudioInfo',
      description: 'Dapatkan informasi lengkap tentang studio Bosmat: alamat, jam buka, kontak, dan kebijakan booking',
      parameters: {
        type: 'object',
        properties: {
          infoType: {
            type: 'string',
            enum: ['location', 'hours', 'contact', 'booking_policy', 'all'],
            description: 'Jenis informasi yang diminta: lokasi, jam buka, kontak, kebijakan booking, atau semua'
          }
        },
        required: ['infoType']
      }
    }
  },
  implementation: createTraceable(async (input: z.infer<typeof getStudioInfoSchema>) => {
    console.log('[getStudioInfo] Getting studio information:', input.infoType);
    
    const studioInfo = {
      location: {
        address: "Bukit Cengkeh 1, Jl. Medan No. B3/2, Cimanggis – Depok, Jawa Barat",
        landmark: "Dekat dari jalan raya Bogor atau tol Cijago",
        googleMaps: "https://maps.app.goo.gl/do4DBYiMntyV7oqc7",
        description: "Lokasi Bosmat – Detailing & Repainting Studio"
      },
      contact: {
        phone: "0895-4015-27556",
        whatsapp: "0895-4015-27556"
      },
      hours: {
        senin: "09.00–17.00",
        selasa: "09.00–17.00", 
        rabu: "09.00–17.00",
        kamis: "09.00–17.00",
        jumat: "Tutup",
        sabtu: "09.00–17.00",
        minggu: "09.00–17.00"
      },
      bookingPolicy: {
        walkIn: false,
        appointmentRequired: true,
        description: "Wajib janjian atau booking, no walk-in"
      }
    };
    
    let response = '';
    
    switch (input.infoType) {
      case 'location':
        response = `📍 *Lokasi Bosmat Detailing & Repainting Studio:*

${studioInfo.location.address}
${studioInfo.location.landmark}

Google Maps: ${studioInfo.location.googleMaps}

⚠️ *Penting:* ${studioInfo.bookingPolicy.description}`;
        break;
        
      case 'hours':
        response = `🕒 *Jam Operasional Bosmat Studio:*

• Senin: ${studioInfo.hours.senin}
• Selasa: ${studioInfo.hours.selasa}
• Rabu: ${studioInfo.hours.rabu}
• Kamis: ${studioInfo.hours.kamis}
• Jumat: ${studioInfo.hours.jumat}
• Sabtu: ${studioInfo.hours.sabtu}
• Minggu: ${studioInfo.hours.minggu}

⚠️ *Penting:* ${studioInfo.bookingPolicy.description}`;
        break;
        
      case 'contact':
        response = `📞 *Kontak Bosmat Studio:*

Telepon/WhatsApp: ${studioInfo.contact.phone}

📍 Alamat: ${studioInfo.location.address}

⚠️ *Penting:* ${studioInfo.bookingPolicy.description}`;
        break;
        
      case 'booking_policy':
        response = `📋 *Kebijakan Kunjungan Bosmat Studio:*

⚠️ *${studioInfo.bookingPolicy.description.toUpperCase()}*

Untuk datang ke studio, mas harus:
• Booking slot dulu via WhatsApp
• Tentukan tanggal & jam kunjungan
• Konfirmasi 1 hari sebelumnya

Kontak booking: ${studioInfo.contact.phone}`;
        break;
        
      case 'all':
      default:
        response = `🏢 *Info Lengkap Bosmat Detailing & Repainting Studio*

📍 *Alamat:*
${studioInfo.location.address}
${studioInfo.location.landmark}
Google Maps: ${studioInfo.location.googleMaps}

📞 *Kontak:*
Telepon/WhatsApp: ${studioInfo.contact.phone}

🕒 *Jam Operasional:*
• Senin-Kamis: ${studioInfo.hours.senin}
• Jumat: ${studioInfo.hours.jumat}
• Sabtu-Minggu: ${studioInfo.hours.sabtu}

⚠️ *PENTING - Kebijakan Kunjungan:*
${studioInfo.bookingPolicy.description.toUpperCase()}
Wajib booking slot dulu sebelum datang ke studio!`;
        break;
    }
    
    const result = {
      success: true,
      infoType: input.infoType,
      studioInfo,
      response,
      timestamp: new Date().toISOString()
    };
    
    console.log('[getStudioInfo] Studio info retrieved successfully');
    
    return {
      success: true,
      message: `Info studio ${input.infoType} berhasil diambil`,
      data: result,
      response
    };
    
  }, 'getStudioInfo', ['studio-info', 'location', 'contact'])
};

export default getStudioInfoTool;
