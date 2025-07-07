// src/ai/schema/checkBookingAvailabilitySchema.ts
import { z } from 'zod';

export const checkBookingAvailabilitySchema = z.object({
  bookingDate: z.string(),
  bookingTime: z.string(),
  serviceName: z.string(),
  estimatedDurationMinutes: z.number()
});
