
import { z } from 'zod';

// Array of categories (readonly, bukan as const literal)
export const HARM_CATEGORIES = [
  'HARM_CATEGORY_HATE_SPEECH',
  'HARM_CATEGORY_SEXUALLY_EXPLICIT',
  'HARM_CATEGORY_HARASSMENT',
  'HARM_CATEGORY_DANGEROUS_CONTENT',
  'HARM_CATEGORY_CIVIC_INTEGRITY',
] as const; // Using "as const" for stricter typing if used as enum values

// Zod enum schema
export const harmCategoryEnum = z.enum([
  'HARM_CATEGORY_HATE_SPEECH',
  'HARM_CATEGORY_SEXUALLY_EXPLICIT',
  'HARM_CATEGORY_HARASSMENT',
  'HARM_CATEGORY_DANGEROUS_CONTENT',
  'HARM_CATEGORY_CIVIC_INTEGRITY',
]);

// Type dari enum
export type HarmCategory = z.infer<typeof harmCategoryEnum>;

// Label buat UI
export const HARM_CATEGORY_LABELS: Record<HarmCategory, string> = {
  HARM_CATEGORY_HATE_SPEECH: 'Ujaran Kebencian',
  HARM_CATEGORY_SEXUALLY_EXPLICIT: 'Konten Seksual Eksplisit',
  HARM_CATEGORY_HARASSMENT: 'Pelecehan',
  HARM_CATEGORY_DANGEROUS_CONTENT: 'Konten Berbahaya',
  HARM_CATEGORY_CIVIC_INTEGRITY: 'Integritas Sipil',
};
