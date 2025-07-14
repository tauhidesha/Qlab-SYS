// test-confirm-payment.ts
import 'dotenv/config';
import { confirmBookingPayment } from './src/ai/tools/confirmBookingPayment';

// Nomor telepon yang akan diuji
const TEST_PHONE_NUMBER = '082110093554';

async function runTest() {
  console.log(`[TEST] Mencoba mengonfirmasi pembayaran untuk nomor: ${TEST_PHONE_NUMBER}`);
  
  try {
    const result = await confirmBookingPayment.implementation({
      customerPhone: TEST_PHONE_NUMBER,
    });

    console.log('\n--- HASIL TEST ---');
    if (result.success) {
      console.log('✅ SUKSES!');
      console.log('Pesan:', result.message);
      console.log('Booking ID yang dikonfirmasi:', result.bookingId);
    } else {
      console.error('❌ GAGAL!');
      console.error('Pesan:', result.message);
    }
    console.log('------------------\n');

  } catch (error) {
    console.error('Terjadi error saat menjalankan test:', error);
  }
}

runTest();
