"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientInfoSchema = exports.ProductServiceInfoSchema = void 0;
const zod_1 = require("zod");
// Skema untuk varian produk/layanan yang akan dikembalikan oleh tool
const ProductVariantInfoSchema = zod_1.z.object({
    name: zod_1.z.string().describe("Nama varian."),
    price: zod_1.z.number().describe("Harga varian."),
    pointsAwarded: zod_1.z.number().optional().describe("Poin yang diberikan untuk varian ini."),
    estimatedDuration: zod_1.z.string().optional().describe("Estimasi durasi pengerjaan varian ini (jika layanan)."),
});
// Skema untuk informasi produk/layanan yang akan dikembalikan oleh tool
exports.ProductServiceInfoSchema = zod_1.z.object({
    id: zod_1.z.string().describe("ID unik produk/layanan."),
    name: zod_1.z.string().describe("Nama produk atau layanan."),
    type: zod_1.z.enum(['Layanan', 'Produk']).describe("Jenis item, apakah 'Layanan' atau 'Produk'."),
    category: zod_1.z.string().describe("Kategori produk/layanan."),
    price: zod_1.z.number().describe("Harga dasar produk/layanan. Bisa 0 jika harga ditentukan oleh varian."),
    description: zod_1.z.string().optional().describe("Deskripsi singkat produk/layanan."),
    pointsAwarded: zod_1.z.number().optional().describe("Poin loyalitas yang diberikan untuk produk/layanan dasar ini."),
    estimatedDuration: zod_1.z.string().optional().describe("Estimasi durasi pengerjaan (jika ini adalah layanan)."),
    variants: zod_1.z.array(ProductVariantInfoSchema).optional().describe("Daftar varian yang tersedia untuk produk/layanan ini."),
});
// Skema untuk informasi motor klien
const ClientMotorcycleInfoSchema = zod_1.z.object({
    name: zod_1.z.string().describe("Nama atau model motor."),
    licensePlate: zod_1.z.string().describe("Plat nomor motor."),
});
// Skema untuk informasi klien yang akan dikembalikan oleh tool
exports.ClientInfoSchema = zod_1.z.object({
    id: zod_1.z.string().describe("ID unik klien."),
    name: zod_1.z.string().describe("Nama lengkap klien."),
    phone: zod_1.z.string().describe("Nomor telepon klien."),
    loyaltyPoints: zod_1.z.number().describe("Jumlah poin loyalitas yang dimiliki klien."),
    motorcycles: zod_1.z.array(ClientMotorcycleInfoSchema).optional().describe("Daftar sepeda motor yang terdaftar atas nama klien ini."),
    lastVisit: zod_1.z.string().optional().describe("Tanggal kunjungan terakhir klien (format YYYY-MM-DD)."),
});
//# sourceMappingURL=aiToolSchemas.js.map