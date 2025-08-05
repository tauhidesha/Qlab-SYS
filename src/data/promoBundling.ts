// File: src/data/promoBundling.ts
// Data ini sudah disinkronkan dengan aturan per 21 Juli 2025.
// Aturan: Promo L -> Detailing M, Promo XL -> Detailing L

// Data tambahan biaya cat spesial berdasarkan ukuran motor
// Hanya cat bunglon yang kena surcharge
const specialColorSurcharge = {
  "S": {
    "bunglon": 200000,
    "moonlight": 200000,
    "xyrallic": 200000,
    "lembayung": 200000,
    "candy": 150000
  },
  "M": {
    "bunglon": 300000,
    "moonlight": 300000,
    "xyrallic": 300000,
    "lembayung": 300000,
    "candy": 200000
  },
  "L": {
    "bunglon": 350000,
    "moonlight": 350000,
    "xyrallic": 350000,
    "lembayung": 350000,
    "candy": 250000
  },
  "XL": {
    "bunglon": 450000,
    "moonlight": 450000,
    "xyrallic": 450000,
    "lembayung": 450000,
    "candy": 300000
  }
};

const promoBundling = [
  {
    "repaintSize": "S",
    "normalPrice": 1450000,
    "normalPriceWithMaxSurcharge": 1450000 + 200000, // +200k untuk cat moonlight/xyrallic/lembayung/bunglon
    "promoPrice": 1200000,
    "savings": 250000,
    "savingsWithMaxSurcharge": 250000 + 200000, // Total savings jika pakai cat selain bunglon (yang jadi gratis)
    "description": "Paket Repaint Bodi Halus (S) + Full Detailing (S). BONUS: Cat spesial (kecuali bunglon) GRATIS!"
  },
  {
    "repaintSize": "M",
    "normalPrice": 1800000,
    "normalPriceWithMaxSurcharge": 1800000 + 300000, // +300k untuk cat moonlight/xyrallic/lembayung/bunglon
    "promoPrice": 1499000,
    "savings": 301000,
    "savingsWithMaxSurcharge": 301000 + 300000, // Total savings jika pakai cat selain bunglon (yang jadi gratis)
    "description": "Paket Repaint Bodi Halus (M) + Full Detailing (M). BONUS: Cat spesial (kecuali bunglon) GRATIS!"
  },
  {
    "repaintSize": "L",
    "normalPrice": 1950000, // DIUBAH SESUAI ATURAN BARU (1.4jt + 550rb)
    "normalPriceWithMaxSurcharge": 1950000 + 350000, // +350k untuk cat moonlight/xyrallic/lembayung/bunglon
    "promoPrice": 1650000,
    "savings": 300000,     // DIUBAH SESUAI ATURAN BARU
    "savingsWithMaxSurcharge": 300000 + 350000, // Total savings jika pakai cat selain bunglon (yang jadi gratis)
    "description": "Paket Repaint Bodi Halus (L) + Full Detailing (M). BONUS: Cat spesial (kecuali bunglon) GRATIS!"
  },
  {
    "repaintSize": "XL",
    "normalPrice": 2550000, // DIUBAH SESUAI ATURAN BARU (1.9jt + 650rb)
    "normalPriceWithMaxSurcharge": 2550000 + 450000, // +450k untuk cat moonlight/xyrallic/lembayung/bunglon
    "promoPrice": 2200000,
    "savings": 350000,     // DIUBAH SESUAI ATURAN BARU
    "savingsWithMaxSurcharge": 350000 + 450000, // Total savings jika pakai cat selain bunglon (yang jadi gratis)
    "description": "Paket Repaint Bodi Halus (XL) + Full Detailing (L). BONUS: Cat spesial (kecuali bunglon) GRATIS!"
  }
];
export default promoBundling;

// Syarat dan Ketentuan Promo Bundling
export const promoTerms = [
  "📋 **Syarat & Ketentuan Promo Bundling:**",
  "",
  "🎯 **Yang Termasuk:**",
  "• Repaint bodi halus sesuai ukuran motor",
  "• Full detailing premium (cuci, poles, wax)",
  "• Cat spesial (candy, moonlight, xyrallic, lembayung) GRATIS - biasanya kena tambahan biaya 150k-450k",
  "• Garansi hasil kerja 3 bulan",
  "",
  "⚠️ **Catatan Penting:**",
  "• Cat bunglon masih kena tambahan biaya (200k-450k sesuai ukuran)",
  "• Harga sudah termasuk semua bahan dan tenaga kerja",
  "• Waktu pengerjaan 2-3 hari kerja",  
  "• Booking minimal H-1, pembayaran bisa cash/transfer/Tokopedia/Shopee untuk cicilan",
  "• Commitment fee Rp100.000 untuk kunci slot (dipotong dari total pembayaran)",
  "",
  "💰 **Hemat hingga 450k** dengan cat spesial gratis (kecuali bunglon)!"
];

// Helper function untuk mendapatkan biaya tambahan cat spesial
export const getSpecialColorSurcharge = (colorType: string, size: "S" | "M" | "L" | "XL"): number => {
  const normalizedColor = colorType.toLowerCase();
  
  // Map warna ke kategori biaya
  if (normalizedColor.includes('candy')) {
    return specialColorSurcharge[size].candy;
  } else if (normalizedColor.includes('bunglon') || 
             normalizedColor.includes('moonlight') || 
             normalizedColor.includes('xyrallic') || 
             normalizedColor.includes('lembayung')) {
    return specialColorSurcharge[size].bunglon; // Semua harga sama
  }
  
  return 0; // Warna biasa tidak ada tambahan
};

// Helper function untuk mendapatkan biaya tambahan cat spesial di promo
// Di promo: hanya bunglon yang kena surcharge, cat lain gratis
export const getPromoSpecialColorSurcharge = (colorType: string, size: "S" | "M" | "L" | "XL"): number => {
  const normalizedColor = colorType.toLowerCase();
  
  // Di promo bundling, hanya cat bunglon yang masih kena surcharge
  if (normalizedColor.includes('bunglon')) {
    return specialColorSurcharge[size].bunglon;
  }
  
  // Cat lain (candy, moonlight, xyrallic, lembayung) GRATIS di promo
  return 0;
};

// Helper function untuk mendapatkan total savings termasuk cat spesial
export const getTotalSavingsWithColor = (repaintSize: "S" | "M" | "L" | "XL", colorType?: string): number => {
  const bundleData = promoBundling.find(p => p.repaintSize === repaintSize);
  if (!bundleData) return 0;
  
  const baseSavings = bundleData.savings;
  const colorSurcharge = colorType ? getSpecialColorSurcharge(colorType, repaintSize) : 0;
  
  return baseSavings + colorSurcharge;
};

