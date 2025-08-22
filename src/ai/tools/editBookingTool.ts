import { z } from 'zod';
import { getFirebaseAdmin } from '@/lib/firebase-admin';

const InputSchema = z.object({
  bookingId: z.string().describe('ID booking yang akan diedit'),
  action: z.enum(['reschedule', 'cancel']).describe('Aksi yang akan dilakukan'),
  newDate: z.string().optional().describe('Tanggal baru untuk reschedule (format: YYYY-MM-DD)'),
  newTime: z.string().optional().describe('Jam baru untuk reschedule (format: HH:MM)'),
  reason: z.string().optional().describe('Alasan perubahan booking'),
});

export type Input = z.infer<typeof InputSchema>;

type Output = {
  success: boolean;
  message: string;
  bookingId?: string;
  oldDate?: string;
  oldTime?: string;
  newDate?: string;
  newTime?: string;
  status?: string;
  refundAmount?: number;
};

async function implementation(input: Input): Promise<Output> {
  try {
    console.log('[editBookingTool] Processing booking edit:', input);

    const adminApp = getFirebaseAdmin();
    const db = adminApp.firestore();
    
    // Get booking data
    const bookingRef = db.collection('bookings').doc(input.bookingId);
    const bookingDoc = await bookingRef.get();
    
    if (!bookingDoc.exists) {
      return {
        success: false,
        message: 'Booking tidak ditemukan',
      };
    }

    const bookingData = bookingDoc.data();
    if (!bookingData) {
      return {
        success: false,
        message: 'Data booking tidak valid',
      };
    }

    // Check if booking can be modified
    const bookingDate = new Date(bookingData.bookingDate);
    const today = new Date();
    const daysUntilBooking = Math.ceil((bookingDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (daysUntilBooking < 1) {
      return {
        success: false,
        message: 'Booking tidak bisa diubah karena kurang dari 1 hari',
      };
    }

    if (input.action === 'cancel') {
      // Cancel booking
      await bookingRef.update({
        status: 'Cancelled',
        cancelledAt: new Date(),
        cancellationReason: input.reason || 'Dibatalkan oleh customer',
      });

      // Calculate refund (DP is non-refundable, but we can offer credit)
      const refundAmount = 0; // DP tidak dikembalikan sesuai policy
      
      return {
        success: true,
        message: `Booking berhasil dibatalkan. DP tidak dikembalikan sesuai kebijakan studio.`,
        bookingId: input.bookingId,
        oldDate: bookingData.bookingDate,
        oldTime: bookingData.bookingTime,
        status: 'Cancelled',
        refundAmount,
      };

    } else if (input.action === 'reschedule') {
      // Validate new date and time
      if (!input.newDate || !input.newTime) {
        return {
          success: false,
          message: 'Tanggal dan jam baru harus diisi untuk reschedule',
        };
      }

      // Check if new date is valid (not in the past)
      const newBookingDate = new Date(input.newDate);
      if (newBookingDate < today) {
        return {
          success: false,
          message: 'Tanggal baru tidak boleh di masa lalu',
        };
      }

      // Check availability for new slot
      const newDateStr = input.newDate;
      const existingBookings = await db.collection('bookings')
        .where('bookingDate', '==', newDateStr)
        .where('bookingTime', '==', input.newTime)
        .where('status', '==', 'Confirmed')
        .get();

      if (!existingBookings.empty) {
        return {
          success: false,
          message: `Slot ${input.newDate} ${input.newTime} sudah dibooking. Silakan pilih waktu lain.`,
        };
      }

      // Update booking
      await bookingRef.update({
        bookingDate: input.newDate,
        bookingTime: input.newTime,
        rescheduledAt: new Date(),
        rescheduleReason: input.reason || 'Reschedule oleh customer',
        originalDate: bookingData.bookingDate,
        originalTime: bookingData.bookingTime,
      });

      return {
        success: true,
        message: `Booking berhasil direschedule dari ${bookingData.bookingDate} ${bookingData.bookingTime} ke ${input.newDate} ${input.newTime}`,
        bookingId: input.bookingId,
        oldDate: bookingData.bookingDate,
        oldTime: bookingData.bookingTime,
        newDate: input.newDate,
        newTime: input.newTime,
        status: 'Confirmed',
      };
    }

    return {
      success: false,
      message: 'Aksi tidak valid',
    };

  } catch (error) {
    console.error('[editBookingTool] Error:', error);
    return {
      success: false,
      message: 'Terjadi kesalahan saat mengedit booking',
    };
  }
}

export const editBookingTool = {
  toolDefinition: {
    type: 'function' as const,
    function: {
      name: 'editBooking',
      description: 'Edit booking untuk reschedule atau cancel. Untuk reschedule perlu tanggal dan jam baru. Untuk cancel tidak perlu tanggal/jam baru.',
      parameters: {
        type: 'object',
        properties: {
          bookingId: { type: 'string', description: 'ID booking yang akan diedit' },
          action: { type: 'string', enum: ['reschedule', 'cancel'], description: 'Aksi yang akan dilakukan' },
          newDate: { type: 'string', description: 'Tanggal baru untuk reschedule (format: YYYY-MM-DD)' },
          newTime: { type: 'string', description: 'Jam baru untuk reschedule (format: HH:MM)' },
          reason: { type: 'string', description: 'Alasan perubahan booking' },
        },
        required: ['bookingId', 'action'],
      },
    },
  },
  implementation,
};
