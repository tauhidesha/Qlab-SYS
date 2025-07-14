// File: test-slot-tool.ts
import 'dotenv/config';

import { findNextAvailableSlotTool } from './src/ai/tools/findNextAvailableSlotTool';

async function runTest() {
  console.log('============================================');
  console.log('🚀 Memulai tes untuk findNextAvailableSlotTool...');
  console.log('============================================\n');

  // Skenario 1: Mencari slot untuk layanan "repaint"
  console.log('--- Skenario 1: Mencari slot untuk "repaint" ---');
  try {
    const repaintResult = await findNextAvailableSlotTool.implementation({
      service_name: 'repaint',
    });
    console.log('Hasil (Repaint):', JSON.stringify(repaintResult, null, 2));
    if (repaintResult.reason) {
      console.log('✅ [Repaint] Reason ditemukan:', repaintResult.reason);
    } else {
      console.log('⚠️ [Repaint] Reason TIDAK ditemukan.');
    }
  } catch (error) {
    console.error('❌ [Repaint] Terjadi error:', error);
  }

  console.log('\n' + '-'.repeat(50) + '\n');

  // Skenario 2: Mencari slot untuk layanan umum (tanpa spesifikasi)
  console.log('--- Skenario 2: Mencari slot umum (tanpa service_name) ---');
  try {
    const generalResult = await findNextAvailableSlotTool.implementation({});
    console.log('Hasil (Umum):', JSON.stringify(generalResult, null, 2));
    if (generalResult.reason) {
      console.log('✅ [Umum] Reason ditemukan:', generalResult.reason);
    } else {
      console.log('⚠️ [Umum] Reason TIDAK ditemukan.');
    }
  } catch (error) {
    console.error('❌ [Umum] Terjadi error:', error);
  }
  
  console.log('\n============================================');
  console.log('🏁 Tes selesai.');
  console.log('============================================');
  // Keluar secara manual agar proses tidak menggantung
  process.exit(0);
}

runTest();
