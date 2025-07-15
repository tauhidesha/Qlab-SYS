// Test cases untuk logika harga display
const testItems = [
  {
    id: '1',
    name: 'Service dengan harga dasar',
    type: 'Layanan',
    category: 'Perawatan',
    price: 50000,
    variants: []
  },
  {
    id: '2', 
    name: 'Service tanpa harga dasar tapi ada varian',
    type: 'Layanan',
    category: 'Perawatan',
    price: 0,
    variants: [
      { id: 'v1', name: 'Basic', price: 25000 },
      { id: 'v2', name: 'Premium', price: 75000 },
      { id: 'v3', name: 'Deluxe', price: 45000 }
    ]
  },
  {
    id: '3',
    name: 'Produk tanpa harga dan varian',
    type: 'Produk', 
    category: 'Spare Part',
    price: 0,
    variants: []
  }
];

// Expected results:
// Item 1: Harga Dasar: Rp 50.000
// Item 2: Mulai dari: Rp 25.000 (minimum dari varian)
// Item 3: Harga Dasar: Rp 0
