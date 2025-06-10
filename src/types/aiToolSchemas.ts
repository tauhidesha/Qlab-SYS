
import { z } from 'zod';

// Skema untuk varian produk/layanan yang akan dikembalikan oleh tool
const ProductVariantInfoSchema = z.object({
  name: z.string().describe("Nama varian."),
  price: z.number().describe("Harga varian."),
  pointsAwarded: z.number().optional().describe("Poin yang diberikan untuk varian ini."),
  estimatedDuration: z.string().optional().describe("Estimasi durasi pengerjaan varian ini (jika layanan)."),
});
export type ProductVariantInfo = z.infer<typeof ProductVariantInfoSchema>;

// Skema untuk informasi produk/layanan yang akan dikembalikan oleh tool
export const ProductServiceInfoSchema = z.object({
  id: z.string().describe("ID unik produk/layanan."),
  name: z.string().describe("Nama produk atau layanan."),
  type: z.enum(['Layanan', 'Produk']).describe("Jenis item, apakah 'Layanan' atau 'Produk'."),
  category: z.string().describe("Kategori produk/layanan."),
  price: z.number().describe("Harga dasar produk/layanan. Bisa 0 jika harga ditentukan oleh varian."),
  description: z.string().optional().describe("Deskripsi singkat produk/layanan."),
  pointsAwarded: z.number().optional().describe("Poin loyalitas yang diberikan untuk produk/layanan dasar ini."),
  estimatedDuration: z.string().optional().describe("Estimasi durasi pengerjaan (jika ini adalah layanan)."),
  variants: z.array(ProductVariantInfoSchema).optional().describe("Daftar varian yang tersedia untuk produk/layanan ini."),
});
export type ProductServiceInfo = z.infer<typeof ProductServiceInfoSchema>;

// Skema untuk informasi motor klien
const ClientMotorcycleInfoSchema = z.object({
  name: z.string().describe("Nama atau model motor."),
  licensePlate: z.string().describe("Plat nomor motor."),
});
export type ClientMotorcycleInfo = z.infer<typeof ClientMotorcycleInfoSchema>;

// Skema untuk informasi klien yang akan dikembalikan oleh tool
export const ClientInfoSchema = z.object({
  id: z.string().describe("ID unik klien."),
  name: z.string().describe("Nama lengkap klien."),
  phone: z.string().describe("Nomor telepon klien."),
  loyaltyPoints: z.number().describe("Jumlah poin loyalitas yang dimiliki klien."),
  motorcycles: z.array(ClientMotorcycleInfoSchema).optional().describe("Daftar sepeda motor yang terdaftar atas nama klien ini."),
  lastVisit: z.string().optional().describe("Tanggal kunjungan terakhir klien (format YYYY-MM-DD)."),
});
export type ClientInfo = z.infer<typeof ClientInfoSchema>;
