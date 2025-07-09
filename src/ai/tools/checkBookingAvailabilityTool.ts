// File: src/ai/tools/checkBookingAvailabilityTool.ts

import { z } from 'zod';
import { checkBookingAvailabilityImplementation } from './impl/checkBookingAvailabilityImplementation';

// --- Input Schema (untuk validasi backend + prompt AI) ---
const InputSchema = z.object({
  bookingDate: z.string().describe('Tanggal booking, format YYYY-MM-DD'),
  bookingTime: z.string().describe('Jam booking, format HH:mm'),
  serviceName: z.string().describe('Nama layanan yang ingin dibooking'),
  estimatedDurationMinutes: z.number().describe('Estimasi durasi layanan dalam menit'),
});
export type Input = z.infer<typeof InputSchema>;

// --- Output Type (hasil dikembalikan ke AI) ---
type Output = {
  available: boolean;
  conflictReason?: string;
  summary?: string;
};

// --- Tool Definition untuk digunakan oleh AI Agent ---
export const checkBookingAvailabilityTool = {
  toolDefinition: {
    type: "function" as const,
    function: {
      name: "checkBookingAvailability",
      description: "Cek ketersediaan slot untuk booking layanan.",
      parameters: {
        type: "object",
        properties: {
          bookingDate: { type: "string", description: "Tanggal booking (YYYY-MM-DD)." },
          bookingTime: { type: "string", description: "Jam booking (HH:mm)." },
          serviceName: { type: "string", description: "Nama layanan." },
          estimatedDurationMinutes: { type: "number", description: "Estimasi durasi booking (menit)." },
        },
        required: ["bookingDate", "bookingTime", "serviceName", "estimatedDurationMinutes"],
      },
    },
  },

  // --- Implementation (panggil logika sebenarnya di folder impl) ---
  implementation: async (input: Input): Promise<Output> => {
    const result = await checkBookingAvailabilityImplementation(input);

    return {
      available: result.isAvailable,
      conflictReason: result.reason,
      summary: result.reason || result.overnightWarning || `Slot tersedia untuk booking layanan ${input.serviceName} pada ${input.bookingDate} jam ${input.bookingTime}`,
    };
  },
};
