
import { z } from 'zod';
import type { Timestamp } from 'firebase/firestore';

// Skema Zod untuk validasi form entri knowledge base
export const KnowledgeBaseEntryFormSchema = z.object({
  topic: z.string().min(3, "Topik minimal 3 karakter.").max(150, "Topik maksimal 150 karakter."),
  content: z.string().min(10, "Konten minimal 10 karakter.").max(5000, "Konten maksimal 5000 karakter."),
  // Keywords akan diinput sebagai string dipisahkan koma, lalu diparsing jadi array
  keywordsInput: z.string().min(1, "Minimal satu kata kunci diperlukan.").max(300, "Kata kunci maksimal 300 karakter."),
  isActive: z.boolean().default(true).optional(),
});

export type KnowledgeBaseFormData = z.infer<typeof KnowledgeBaseEntryFormSchema>;

// Tipe data untuk entri knowledge base di Firestore
export interface KnowledgeBaseEntry {
  id: string; // Firestore document ID
  topic: string;
  content: string;
  keywords: string[]; // Ini akan disimpan sebagai array di Firestore
  isActive?: boolean;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
  embedding?: number[]; // Field baru untuk menyimpan vektor embedding
}
