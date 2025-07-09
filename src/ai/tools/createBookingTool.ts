// File: src/ai/tools/createBookingTool.ts

import { z } from 'zod';

// File: src/ai/tools/createBookingTool.ts

export const createBookingTool = {
  toolDefinition: {
    type: 'function' as const,
    function: {
      name: 'createBooking',
      description: 'Membuat booking baru di sistem setelah ketersediaan dikonfirmasi.',
      parameters: {
        type: 'object',
        properties: {
          customerPhone: {
            type: 'string',
            description: 'Nomor telepon pelanggan',
          },
          serviceName: {
            type: 'string',
            description: 'Nama layanan yang dibooking',
          },
          bookingDate: {
            type: 'string',
            description: 'Tanggal booking, format YYYY-MM-DD',
          },
          bookingTime: {
            type: 'string',
            description: 'Jam booking, format HH:mm',
          },
          vehicleInfo: {
            type: 'string',
            description: "Informasi kendaraan, cth: 'Vario 160 Merah'",
          },
        },
        required: [
          'customerPhone',
          'serviceName',
          'bookingDate',
          'bookingTime',
          'vehicleInfo',
        ],
      },
    },
  },

  implementation: async ({
    customerPhone,
    serviceName,
    bookingDate,
    bookingTime,
    vehicleInfo,
  }: {
    customerPhone: string;
    serviceName: string;
    bookingDate: string;
    bookingTime: string;
    vehicleInfo: string;
  }) => {
    // Simulasi success
    return {
      success: true,
      message: `Booking berhasil untuk ${serviceName} pada ${bookingDate} jam ${bookingTime}`,
    };
  },
};