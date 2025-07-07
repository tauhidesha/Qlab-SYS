// File: src/ai/tools/checkBookingAvailabilityTool.ts
// File ini HANYA berisi definisi tool untuk AI.
'use server';

// Definisi tool untuk diberikan ke OpenAI atau AI lainnya
export const checkBookingAvailabilityToolDefinition = {
  type: 'function',
  function: {
    name: 'checkBookingAvailability',
    description: 'Cek apakah slot jadwal tersedia untuk tanggal, waktu, dan layanan tertentu.',
    parameters: {
      type: 'object',
      properties: {
        bookingDate: { type: 'string', description: 'Tanggal booking, format YYYY-MM-DD' },
        bookingTime: { type: 'string', description: 'Jam booking, format HH:MM' },
        serviceName: { type: 'string', description: 'Nama layanan yang dibooking' },
        estimatedDurationMinutes: { type: 'number', description: 'Estimasi durasi layanan dalam menit' },
      },
      required: ['bookingDate', 'bookingTime', 'serviceName', 'estimatedDurationMinutes'],
    },
  },
};