
import { z } from 'zod';
import type { Timestamp } from 'firebase/firestore';

// Skema Zod untuk validasi form entri knowledge base yang disederhanakan
export const KnowledgeBaseEntryFormSchema = z.object({
  question: z.string().min(5, "Pertanyaan minimal 5 karakter.").max(250, "Pertanyaan maksimal 250 karakter."),
  answer: z.string().min(10, "Jawaban minimal 10 karakter.").max(5000, "Jawaban maksimal 5000 karakter."),
  isActive: z.boolean().default(true).optional(),
});

export type KnowledgeBaseFormData = z.infer<typeof KnowledgeBaseEntryFormSchema>;

// Tipe data untuk entri knowledge base di Firestore
export interface KnowledgeBaseEntry {
  id: string; // Firestore document ID
  question: string;
  answer: string;
  isActive?: boolean;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
  embedding?: number[];
}
