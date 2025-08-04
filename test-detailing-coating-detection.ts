// @file: test-detailing-coating-detection.ts
import { detectAnalysisType } from './src/ai/utils/imageProcessing';

// Test cases untuk deteksi layanan Bosmat
const testCases = [
  // Detailing cases
  { message: "Motor saya kotor banget nih, butuh cuci", expected: "detailing" },
  { message: "Mesin motor berdebu, bisa detailing ga?", expected: "detailing" },
  { message: "Ada paket cuci komplit ga?", expected: "detailing" },
  { message: "Motor lumpur2 habis touring", expected: "detailing" },
  { message: "Mau poles motor yang mengkilap", expected: "detailing" },
  
  // Coating cases  
  { message: "Pengen coating motor biar anti air", expected: "coating" },
  { message: "Coating glossy sama doff beda ga?", expected: "coating" },
  { message: "Motor butuh proteksi ceramic coating", expected: "coating" },
  { message: "Biar kilap dan tahan lama pakai apa ya?", expected: "coating" },
  { message: "Coating motor doff berapa?", expected: "coating" },
  
  // Repaint cases
  { message: "Mau ganti warna motor jadi merah", expected: "color" },
  { message: "Cat ulang velg motor", expected: "color" },
  { message: "Repaint bodi motor habis lecet", expected: "color" },
  
  // Damage cases
  { message: "Motor gores parah, kira2 biaya berapa?", expected: "damage" },
  { message: "Ada lecet di tangki, bisa diperbaiki?", expected: "damage" },
  { message: "Penyok di fender belakang", expected: "damage" },
  
  // Condition cases
  { message: "Tolong cek kondisi motor saya", expected: "condition" },
  { message: "Gimana kondisi cat motor ini?", expected: "condition" },
  { message: "Motor butuh service apa ya?", expected: "condition" },
  
  // License plate
  { message: "Tolong bacain plat nomor motor", expected: "license_plate" },
  { message: "Nopol motor ga keliatan jelas", expected: "license_plate" }
];

console.log("🧪 Testing Bosmat Service Detection:\n");

testCases.forEach(({ message, expected }, index) => {
  const detected = detectAnalysisType(message);
  const status = detected === expected ? "✅" : "❌";
  
  console.log(`${index + 1}. ${status} "${message}"`);
  console.log(`   Expected: ${expected}, Got: ${detected}\n`);
});

// Summary
const passed = testCases.filter(({ message, expected }) => 
  detectAnalysisType(message) === expected
).length;

console.log(`\n📊 Results: ${passed}/${testCases.length} tests passed`);
console.log(`Success rate: ${Math.round((passed / testCases.length) * 100)}%`);

if (passed === testCases.length) {
  console.log("\n🎉 All tests passed! AI Vision ready for detailing, coating, and repaint!");
} else {
  console.log("\n⚠️ Some tests failed. Check keyword detection logic.");
}
