// Isi file baru Anda

export interface ServiceProductVariant {
  id: string;
  name: string;
  price: number;
  estimatedDuration?: string;
  pointsAwarded?: number;
  stockQuantity?: number;
  costPrice?: number;
}

export interface ServiceProduct {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  estimatedDuration?: string;
  type: 'Layanan' | 'Produk';
  variants?: ServiceProductVariant[];
  pointsAwarded?: number;
  stockQuantity?: number;
  costPrice?: number;
  embedding?: number[]; // Tambahkan ini jika Anda menggunakan embedding AI
}