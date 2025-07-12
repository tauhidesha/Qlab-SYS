// File: test-surcharge-tool.ts
// Skrip untuk menguji getRepaintSurchargeTool secara terisolasi.

import { getRepaintSurchargeTool } from './src/ai/tools/getRepaintSurchargeTool'

async function runTests() {
  console.log('🚀 Memulai pengujian untuk getRepaintSurchargeTool...');
  console.log('----------------------------------------------------');

  // Test Case 1: Skenario utama yang gagal (Nmax Candy)
  console.log('▶️  Menjalankan Test Case 1: Ukuran M, Efek Candy...');
  try {
    const input1 = { repaint_size: 'M' as const, effect: 'candy' as const };
    const result1 = await getRepaintSurchargeTool.implementation(input1);
    console.log('✅ Hasil Test Case 1:', JSON.stringify(result1, null, 2));
  } catch (error) {
    console.error('💥 Gagal Test Case 1:', error);
  }

  console.log('----------------------------------------------------');

  // Test Case 2: Skenario valid lainnya (Bunglon Ukuran L)
  console.log('▶️  Menjalankan Test Case 2: Ukuran L, Efek Bunglon...');
  try {
    const input2 = { repaint_size: 'L' as const, effect: 'bunglon' as const };
    const result2 = await getRepaintSurchargeTool.implementation(input2);
    console.log('✅ Hasil Test Case 2:', JSON.stringify(result2, null, 2));
  } catch (error) {
    console.error('💥 Gagal Test Case 2:', error);
  }
  
  console.log('----------------------------------------------------');

  // Test Case 3: Skenario input tidak valid (untuk menguji error handling)
console.log('▶️  Menjalankan Test Case 3: Input tidak valid (Ukuran XXL)...');
try {
  const input3 = { repaint_size: 'XXL', effect: 'candy' }; 
  
  // Menambahkan 'as any' untuk bypass pengecekan tipe oleh TypeScript
  const result3 = await getRepaintSurchargeTool.implementation(input3 as any);
  
  console.log('✅ Hasil Test Case 3 (diharapkan gagal):', JSON.stringify(result3, null, 2));
} catch (error) {
  console.error('💥 Gagal Test Case 3:', error);
}
  console.log('----------------------------------------------------');
  console.log('🏁 Pengujian selesai.');
}

// Jalankan semua tes
runTests();