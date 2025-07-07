// scripts/test-tool.ts

import { getSpecificServicePrice } from '../src/ai/tools/getSpecificServicePriceTool';
import { getPromoBundleDetails } from '../src/ai/tools/getPromoBundleDetailsTool';
import { getMotorSizeDetails } from '../src/ai/tools/getMotorSizeDetailsTool';
import { listServicesByCategory } from '../src/ai/tools/listServicesByCategoryTool';

// Fungsi utama untuk menjalankan tes
async function main() {
  // Ambil argumen dari command line (setelah 'node' dan 'nama_skrip.ts')
  const args = process.argv.slice(2);
  const toolName = args[0];
  
  if (!toolName) {
    console.error('Error: Nama tool harus disertakan.');
    console.log('Contoh: npm run test:tool getPromoBundleDetails --motor_query="Scoopy"');
    process.exit(1); // Keluar dengan error
  }

  // --- LOGIKA PARSING ARGUMEN YANG DIPERBAIKI ---
  const toolArgs: { [key: string]: any } = {};
  const argList = args.slice(1); // Ambil semua sisa argumen

  for (const arg of argList) {
    // Cari argumen dengan format --key=value
    const match = arg.match(/^--([^=]+)=(.*)$/);
    if (match) {
        const key = match[1]; // Contoh: motor_query
        // Hilangkan tanda kutip di awal dan akhir jika ada
        const value = match[2].replace(/^"(.*)"$/, '$1'); 
        toolArgs[key] = value;
    }
  }
  // --- AKHIR PERBAIKAN ---

  console.log(`\n🧪 Menjalankan tool: ${toolName}`);
  console.log(`Dengan argumen:`, toolArgs);
  console.log('------------------------------------');

  let result;

  try {
    switch (toolName) {
      case 'getSpecificServicePrice':
        result = await getSpecificServicePrice(toolArgs);
        break;
      case 'getPromoBundleDetails':
        result = await getPromoBundleDetails(toolArgs);
        break;
      case 'getMotorSizeDetails':
        result = await getMotorSizeDetails(toolArgs);
        break;
      case 'listServicesByCategory':
        result = await listServicesByCategory(toolArgs as any);
        break;
      default:
        console.error(`Tool dengan nama "${toolName}" tidak dikenal.`);
        return;
    }

    console.log('✅ Hasil:');
    console.log(JSON.stringify(result, null, 2));

  } catch (error) {
    console.error('❌ Terjadi Error Saat Menjalankan Tool:');
    console.error(error);
  }
}

main();