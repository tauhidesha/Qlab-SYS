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