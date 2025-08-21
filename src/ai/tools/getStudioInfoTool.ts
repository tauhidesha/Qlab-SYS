// @file: src/ai/tools/getStudioInfoTool.ts

import { z } from 'zod';

// --- Input Schema ---
const InputSchema = z.object({
  infoType: z.enum(['location', 'hours', 'contact', 'booking_policy', 'all']).describe('Jenis informasi yang diminta'),
});
export type Input = z.infer<typeof InputSchema>;

// --- Output Type ---
type Output = {
  success: boolean;
  info?: {
    name: string;
    address: string;
    googleMapsUrl: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    businessHours: {
      days: string;
      hours: string;
    };
    contact: {
      phone: string;
      whatsapp: string;
    };
    bookingPolicy: {
      deposit: string;
      cancellation: string;
      walkIn: string;
    };
    directions: {
      fromTol: string;
      fromBogor: string;
      landmarks: string[];
    };
  };
  message?: string;
};

// --- Implementation ---
async function implementation(input: Input): Promise<Output> {
  console.log('[getStudioInfoTool] Requested info type:', input.infoType);

  try {
    const studioInfo = {
      name: 'Bosmat Detailing & Repainting Studio',
      address: 'Jl. Bukit Cengkeh 1 No. B3/2, Cimanggis - Depok, Jawa Barat',
      googleMapsUrl: 'https://maps.app.goo.gl/do4DBYiMntyV7oqc7',
      coordinates: {
        lat: -6.3774,
        lng: 106.8663
      },
      businessHours: {
        days: 'Senin - Sabtu',
        hours: '09:00 - 19:00 WIB'
      },
      contact: {
        phone: '0895401527556',
        whatsapp: '62895401527556'
      },
      bookingPolicy: {
        deposit: 'Rp100.000 (dipotong dari total pembayaran)',
        cancellation: 'DP hangus jika tidak konfirmasi pembatalan H-1',
        walkIn: 'Tidak menerima walk-in, wajib booking minimal H-1'
      },
      directions: {
        fromTol: 'Dari tol Cijago, keluar di pintu keluar Cimanggis, lurus ke Bukit Cengkeh 1',
        fromBogor: 'Dari jalan raya Bogor ke arah Cimanggis, Depok',
        landmarks: [
          'Dekat jalan raya Bogor',
          'Sebelah tol Cijago',
          'Area Bukit Cengkeh 1'
        ]
      }
    };

    let response: Output = {
      success: true,
      info: studioInfo
    };

    // Customize response based on infoType
    switch (input.infoType) {
      case 'location':
        response.message = `📍 **${studioInfo.name}**
${studioInfo.address}

🗺️ **Google Maps**: ${studioInfo.googleMapsUrl}

🚗 **Arah dari tol**: ${studioInfo.directions.fromTol}
🚗 **Arah dari Bogor**: ${studioInfo.directions.fromBogor}

🏢 **Landmark**: ${studioInfo.directions.landmarks.join(', ')}`;
        break;

      case 'hours':
        response.message = `🕐 **Jam Operasional**
${studioInfo.businessHours.days}: ${studioInfo.businessHours.hours}

⚠️ **Penting**: Tidak menerima walk-in, wajib booking minimal H-1`;
        break;

      case 'contact':
        response.message = `📞 **Kontak Bosmat**
📱 WhatsApp: ${studioInfo.contact.whatsapp}
📞 Telepon: ${studioInfo.contact.phone}

💬 **Booking**: Via WhatsApp dengan DP Rp100.000`;
        break;

      case 'booking_policy':
        response.message = `📋 **Kebijakan Booking**
💵 **DP**: ${studioInfo.bookingPolicy.deposit}
❌ **Pembatalan**: ${studioInfo.bookingPolicy.cancellation}
🚫 **Walk-in**: ${studioInfo.bookingPolicy.walkIn}

📅 **Booking**: Minimal H-1 untuk slot yang aman`;
        break;

      case 'all':
      default:
        response.message = `🏢 **${studioInfo.name}**

📍 **Alamat**: ${studioInfo.address}
🗺️ **Google Maps**: ${studioInfo.googleMapsUrl}

🕐 **Jam Operasional**: ${studioInfo.businessHours.days} ${studioInfo.businessHours.hours}

📞 **Kontak**: 
- WhatsApp: ${studioInfo.contact.whatsapp}
- Telepon: ${studioInfo.contact.phone}

💵 **Booking**: DP ${studioInfo.bookingPolicy.deposit}

🚗 **Arah**: ${studioInfo.directions.fromTol}`;
        break;
    }

    console.log('[getStudioInfoTool] Successfully provided studio info');
    return response;

  } catch (error) {
    console.error('[getStudioInfoTool] Error:', error);
    return {
      success: false,
      message: 'Terjadi kesalahan saat mengambil informasi studio'
    };
  }
}

// --- Export untuk AI Agent ---
export const getStudioInfoTool = {
  toolDefinition: {
    type: 'function' as const,
    function: {
      name: 'getStudioInfo',
      description: 'Dapatkan informasi lengkap tentang studio Bosmat (lokasi, jam buka, kontak, kebijakan booking)',
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
  implementation
};
