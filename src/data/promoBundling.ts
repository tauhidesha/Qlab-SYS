// File: src/data/promoBundling.ts
// Data ini sudah disinkronkan dengan aturan bisnis baru per 21 Juli 2025.
// Aturan: Promo L -> Detailing M, Promo XL -> Detailing L

const promoBundling = [
  {
    "repaintSize": "S",
    "normalPrice": 1450000,
    "promoPrice": 1200000,
    "savings": 250000,
    "description": "Paket Repaint Bodi Halus (S) + Full Detailing (S)."
  },
  {
    "repaintSize": "M",
    "normalPrice": 1800000,
    "promoPrice": 1499000,
    "savings": 301000,
    "description": "Paket Repaint Bodi Halus (M) + Full Detailing (M)."
  },
  {
    "repaintSize": "L",
    "normalPrice": 1950000, // DIUBAH SESUAI ATURAN BARU (1.4jt + 550rb)
    "promoPrice": 1650000,
    "savings": 300000,     // DIUBAH SESUAI ATURAN BARU
    "description": "Paket Repaint Bodi Halus (L) + Full Detailing (M)."
  },
  {
    "repaintSize": "XL",
    "normalPrice": 2550000, // DIUBAH SESUAI ATURAN BARU (1.9jt + 650rb)
    "promoPrice": 2200000,
    "savings": 350000,     // DIUBAH SESUAI ATURAN BARU
    "description": "Paket Repaint Bodi Halus (XL) + Full Detailing (L)."
  }
];
export default promoBundling;

// Syarat dan Ketentuan Promo Bundling
export const promoTerms = [
  "Garansi hasil pengerjaan selama 1 bulan — kalau ada masalah, bisa klaim tanpa ribet.",
  "Bebas pilih warna — termasuk warna custom seperti candy, bunglon, atau moonlight (bunglon ada tambahan biaya).",
  "Harga promo sudah termasuk: pengerokan, dempul, pengecatan bodi halus, dan full detailing (sesuai ukuran).",
  "Full detailing mencakup: bodi, mesin, kaki-kaki, hingga rangka (tidak include coating).",
  "Cicilan bisa lewat Tokopedia — tinggal checkout dan pilih metode cicilan.",
  "Slot terbatas setiap minggunya — siapa cepat, dia dapat.",
  "Berlaku hanya untuk motor non-vespa dan non-moge.",
  "Booking cukup bayar DP Rp 100.000 untuk kunci slotnya.",
];

