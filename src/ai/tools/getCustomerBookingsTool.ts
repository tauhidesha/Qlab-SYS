import { z } from 'zod';
import { getFirebaseAdmin } from '@/lib/firebase-admin';

const InputSchema = z.object({
  customerPhone: z.string().describe('Nomor telepon customer'),
  status: z.enum(['all', 'confirmed', 'completed', 'cancelled']).optional().describe('Filter status booking'),
  limit: z.number().optional().describe('Jumlah booking yang ditampilkan (default: 5)'),
});

export type Input = z.infer<typeof InputSchema>;

type Booking = {
  id: string;
  customerName: string;
  customerPhone: string;
  serviceName: string;
  bookingDate: string;
  bookingTime: string;
  status: string;
  totalPrice: number;
  depositPaid: number;
  createdAt: string;
  canEdit: boolean;
  daysUntilBooking: number;
};

type Output = {
  success: boolean;
  message: string;
  bookings?: Booking[];
  totalBookings?: number;
  activeBookings?: number;
};

async function implementation(input: Input): Promise<Output> {
  try {
    console.log('[getCustomerBookingsTool] Getting bookings for:', input.customerPhone);

    const adminApp = getFirebaseAdmin();
    const db = adminApp.firestore();
    
    // Build query - simplified to avoid index issues
    let query = db.collection('bookings').where('customerPhone', '==', input.customerPhone);
    
    // Add limit first
    const limit = input.limit || 5;
    query = query.limit(limit);
    
    const snapshot = await query.get();
    
    if (snapshot.empty) {
      return {
        success: true,
        message: 'Tidak ada booking ditemukan untuk customer ini',
        bookings: [],
        totalBookings: 0,
        activeBookings: 0,
      };
    }

    const today = new Date();
    let bookings: Booking[] = [];

    // Filter and sort in memory to avoid complex queries
    const allBookings = snapshot.docs.map(doc => {
      const data = doc.data();
      const bookingDate = new Date(data.bookingDate);
      const daysUntilBooking = Math.ceil((bookingDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      
      return {
        id: doc.id,
        customerName: data.customerName || 'Unknown',
        customerPhone: data.customerPhone,
        serviceName: data.serviceName || 'Unknown Service',
        bookingDate: data.bookingDate,
        bookingTime: data.bookingTime,
        status: data.status,
        totalPrice: data.totalPrice || 0,
        depositPaid: data.depositPaid || 0,
        createdAt: data.createdAt?.toDate?.()?.toLocaleDateString('id-ID') || 'Unknown',
        canEdit: daysUntilBooking > 1 && data.status === 'Confirmed',
        daysUntilBooking,
        timestamp: bookingDate.getTime(),
      };
    });

    // Apply status filter if specified
    let filteredBookings = allBookings;
    if (input.status && input.status !== 'all') {
      filteredBookings = allBookings.filter(booking => booking.status === input.status);
    }

    // Sort by booking date (newest first) and apply limit
    filteredBookings.sort((a, b) => b.timestamp - a.timestamp);
    const limitedBookings = filteredBookings.slice(0, limit);

    // Count active bookings
    const activeBookings = allBookings.filter(booking => booking.status === 'Confirmed').length;

    // Remove timestamp from final result
    bookings = limitedBookings.map(({ timestamp, ...booking }) => booking);

    // Get total count for this customer
    const totalSnapshot = await db.collection('bookings')
      .where('customerPhone', '==', input.customerPhone)
      .get();

    return {
      success: true,
      message: `Ditemukan ${bookings.length} booking untuk customer ini`,
      bookings,
      totalBookings: totalSnapshot.size,
      activeBookings,
    };

  } catch (error) {
    console.error('[getCustomerBookingsTool] Error:', error);
    return {
      success: false,
      message: 'Terjadi kesalahan saat mengambil data booking',
    };
  }
}

export const getCustomerBookingsTool = {
  toolDefinition: {
    type: 'function' as const,
    function: {
      name: 'getCustomerBookings',
      description: 'Ambil data booking customer berdasarkan nomor telepon. Bisa filter berdasarkan status dan limit jumlah booking.',
      parameters: {
        type: 'object',
        properties: {
          customerPhone: { type: 'string', description: 'Nomor telepon customer' },
          status: { type: 'string', enum: ['all', 'confirmed', 'completed', 'cancelled'], description: 'Filter status booking' },
          limit: { type: 'number', description: 'Jumlah booking yang ditampilkan (default: 5)' },
        },
        required: ['customerPhone'],
      },
    },
  },
  implementation,
};
