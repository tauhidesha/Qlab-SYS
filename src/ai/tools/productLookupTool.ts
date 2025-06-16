'use server';
/**
 * @fileOverview Genkit tool for looking up product or service details from Firestore.
 */
import {ai}from '@/ai/genkit';
import {z}from 'genkit';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { ServiceProduct, ServiceProductVariant } from '@/app/(app)/services/page';
import { ProductServiceInfoSchema, type ProductServiceInfo } from '@/types/aiToolSchemas';

const ProductLookupInputSchema = z.object({
  productName: z.string().describe("Nama produk atau layanan yang ingin dicari detailnya. Bisa umum seperti 'coating', 'paket detailing', atau spesifik seperti 'Cuci Motor Premium Vario'. Tool akan mencoba mencocokkan dengan nama item, varian, atau kategori."),
});

export const getProductServiceDetailsByNameTool = ai.defineTool(
  {
    name: 'getProductServiceDetailsByNameTool',
    description: 'Mencari dan mengembalikan detail spesifik dari sebuah produk atau layanan berdasarkan namanya. Jika nama umum, bisa mengembalikan beberapa item yang relevan atau item dasar dengan variannya. Berguna untuk menjawab pertanyaan pelanggan tentang harga, durasi, ketersediaan, atau deskripsi item tertentu.',
    inputSchema: ProductLookupInputSchema, // Menggunakan ProductLookupInputSchema yang sudah didefinisikan
    outputSchema: z.union([ProductServiceInfoSchema, z.array(ProductServiceInfoSchema), z.null()]).describe("Objek berisi detail produk/layanan, array objek jika beberapa item relevan, atau null jika tidak ditemukan."),
  },
  async (input) => {
    if (!input.productName || input.productName.trim() === '') {
      console.log("ProductLookupTool: Nama produk kosong.");
      return null;
    }
    const searchTerm = input.productName.trim().toLowerCase();
    console.log(`ProductLookupTool: Mencari produk/layanan dengan nama/keyword: "${searchTerm}"`);

    try {
      const servicesRef = collection(db, 'services');
      const q = query(servicesRef); // Ambil semua dulu, lalu filter di client-side untuk fleksibilitas
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("ProductLookupTool: Tidak ada item layanan/produk di database.");
        return null;
      }

      const allItems: ServiceProduct[] = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ServiceProduct));
      let matchedItems: ServiceProduct[] = [];

      // Fase 1: Cari kecocokan persis atau sangat dekat
      for (const item of allItems) {
        const itemNameLower = item.name.toLowerCase();
        // Cocok persis dengan nama item dasar
        if (itemNameLower === searchTerm) {
          matchedItems.push(item);
          continue; 
        }
        // Cocok persis dengan nama varian
        if (item.variants) {
          for (const variant of item.variants) {
            const fullVariantNameLower = `${item.name} - ${variant.name}`.toLowerCase();
            if (fullVariantNameLower === searchTerm) {
              // Buat "item" baru yang merepresentasikan varian ini
              const variantAsItem: ServiceProduct = {
                ...item,
                name: `${item.name} - ${variant.name}`,
                price: variant.price,
                pointsAwarded: variant.pointsAwarded ?? item.pointsAwarded,
                estimatedDuration: variant.estimatedDuration ?? item.estimatedDuration,
                variants: undefined, // Varian tidak punya sub-varian di sini
              };
              matchedItems.push(variantAsItem);
              break; 
            }
          }
        }
      }

      // Fase 2: Jika belum ada kecocokan persis, cari kecocokan parsial
      if (matchedItems.length === 0) {
        for (const item of allItems) {
          const itemNameLower = item.name.toLowerCase();
          // Query terkandung dalam nama item (mis. query "coating", item "Nano Coating")
          if (itemNameLower.includes(searchTerm)) {
            matchedItems.push(item);
            continue;
          }
          // Nama item terkandung dalam query (mis. query "harga coating xmax", item "Coating XMAX")
          if (searchTerm.includes(itemNameLower)) {
             matchedItems.push(item);
             continue;
          }
          // Query cocok dengan salah satu nama varian secara parsial
          if (item.variants) {
            for (const variant of item.variants) {
              const fullVariantNameLower = `${item.name} - ${variant.name}`.toLowerCase();
              if (fullVariantNameLower.includes(searchTerm) || searchTerm.includes(variant.name.toLowerCase())) {
                 // Jika query cocok parsial dengan varian, kembalikan item dasarnya dengan semua variannya
                 // agar AI bisa memilih atau menyajikan.
                if (!matchedItems.find(m => m.id === item.id)) { // Hindari duplikasi item dasar
                    matchedItems.push(item);
                }
                break; 
              }
            }
          }
        }
      }
      
      // Fase 3: Jika masih belum ada, coba cari berdasarkan kategori
      if (matchedItems.length === 0) {
        for (const item of allItems) {
            if (item.category.toLowerCase().includes(searchTerm)) {
                 matchedItems.push(item);
            }
        }
      }


      if (matchedItems.length === 0) {
        console.log(`ProductLookupTool: Tidak ada produk/layanan yang cocok dengan "${input.productName}".`);
        return null;
      }

      // Ubah hasil menjadi format ProductServiceInfoSchema
      const resultsForAI: ProductServiceInfo[] = matchedItems.map(item => {
        let effectiveName = item.name;
        let effectivePrice = item.price;
        let effectivePoints = item.pointsAwarded;
        let effectiveDuration = item.estimatedDuration;
        let itemIsSpecificVariantRepresentation = false;

        // Cek apakah 'item' ini adalah representasi varian yang kita buat di Fase 1
        if (item.variants === undefined && allItems.some(originalItem => originalItem.id === item.id && originalItem.name !== item.name)) {
            itemIsSpecificVariantRepresentation = true;
        }
        
        return {
          id: item.id,
          name: effectiveName,
          type: item.type,
          category: item.category,
          price: effectivePrice, // Ini akan menjadi harga varian jika item adalah representasi varian
          description: item.description || undefined,
          pointsAwarded: effectivePoints || undefined,
          estimatedDuration: effectiveDuration || undefined,
          // Jika item adalah representasi varian, kita tidak sertakan array 'variants' lagi
          // Jika item adalah item dasar dan Punya varian, sertakan
          variants: itemIsSpecificVariantRepresentation ? undefined : item.variants?.map(v => ({
            name: v.name,
            price: v.price,
            pointsAwarded: v.pointsAwarded || undefined,
            estimatedDuration: v.estimatedDuration || undefined,
          })) || undefined,
        };
      });

      // Validasi semua hasil
      try {
        resultsForAI.forEach(res => ProductServiceInfoSchema.parse(res));
      } catch (zodError: any) {
        console.error("ProductLookupTool: Zod validation error untuk salah satu item hasil:", zodError.errors);
        return null; // Atau handle error dengan cara lain, misal filter item yang tidak valid
      }

      console.log(`ProductLookupTool: Ditemukan ${resultsForAI.length} item(s) yang cocok.`);
      
      // Jika hanya 1 hasil, kembalikan sebagai objek tunggal. Jika >1, sebagai array.
      // Ini untuk membantu prompt LLM, agar tidak bingung jika inputnya berupa array tunggal.
      // Tapi, instruksi di prompt LLM harus disesuaikan agar bisa menangani output array juga.
      // Untuk sekarang, kita konsistenkan untuk mengembalikan array saja, lalu di prompt flow-nya dihandle.
      return resultsForAI; // Selalu kembalikan array

    } catch (error) {
      console.error('ProductLookupTool: Error saat mengambil data dari Firestore:', error);
      return null;
    }
  }
);