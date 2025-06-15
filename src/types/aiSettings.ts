
import { z } from 'zod';

export const HARM_CATEGORIES = [
  'HARM_CATEGORY_HATE_SPEECH',
  'HARM_CATEGORY_SEXUALLY_EXPLICIT',
  'HARM_CATEGORY_HARASSMENT',
  'HARM_CATEGORY_DANGEROUS_CONTENT',
  'HARM_CATEGORY_CIVIC_INTEGRITY' // Trailing comma removed here
] as const;
export type HarmCategory = typeof HARM_CATEGORIES[number];

export const HARM_CATEGORY_LABELS: Record<HarmCategory, string> = {
  'HARM_CATEGORY_HATE_SPEECH': 'Ujaran Kebencian',
  'HARM_CATEGORY_SEXUALLY_EXPLICIT': 'Konten Seksual Eksplisit',
  'HARM_CATEGORY_HARASSMENT': 'Pelecehan',
  'HARM_CATEGORY_DANGEROUS_CONTENT': 'Konten Berbahaya',
  'HARM_CATEGORY_CIVIC_INTEGRITY': 'Integritas Sipil',
};

export const BLOCK_THRESHOLDS = [
  'BLOCK_LOW_AND_ABOVE',
  'BLOCK_MEDIUM_AND_ABOVE',
  'BLOCK_ONLY_HIGH',
  'BLOCK_NONE',
] as const;
export type BlockThreshold = typeof BLOCK_THRESHOLDS[number];

export const BLOCK_THRESHOLD_LABELS: Record<BlockThreshold, string> = {
  'BLOCK_LOW_AND_ABOVE': 'Blokir Rendah ke Atas',
  'BLOCK_MEDIUM_AND_ABOVE': 'Blokir Sedang ke Atas',
  'BLOCK_ONLY_HIGH': 'Blokir Hanya Tinggi',
  'BLOCK_NONE': 'Jangan Blokir Apapun',
};

export const SafetySettingSchema = z.object({
  category: z.enum(HARM_CATEGORIES),
  threshold: z.enum(BLOCK_THRESHOLDS),
});
export type SafetySetting = z.infer<typeof SafetySettingSchema>;

export const DEFAULT_SAFETY_SETTINGS: SafetySetting[] = [
  { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
  { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
  { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
  { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
  { category: 'HARM_CATEGORY_CIVIC_INTEGRITY', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
];

export const AiConfigurationSchema = z.object({
  globalSafetySettings: z.array(SafetySettingSchema).default(DEFAULT_SAFETY_SETTINGS),
  csAssistantCustomInstruction: z.string().max(1000, "Instruksi kustom maksimal 1000 karakter.").optional().default(''),
  profitLossCustomInstruction: z.string().max(1000, "Instruksi kustom maksimal 1000 karakter.").optional().default(''),
  updatedAt: z.any().optional(), // Untuk serverTimestamp
});
export type AiConfiguration = z.infer<typeof AiConfigurationSchema>;

// Using AiConfigurationSchema directly for form values as they are identical for now
export const AiSettingsFormSchema = AiConfigurationSchema;
export type AiSettingsFormValues = z.infer<typeof AiSettingsFormSchema>;
