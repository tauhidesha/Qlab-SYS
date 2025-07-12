// File: src/ai/tools/impl/matchServiceFromDescriptionTool.ts

import { z } from 'zod';
import deskripsiLayanan from '@/data/deskripsiLayanan';

const InputSchema = z.object({
  message: z.string().describe('Deskripsi bebas tentang layanan yang diinginkan user (misal: "coating bening", "cuci kilap", "pengen motor mengkilap lama")'),
});
export type Input = z.infer<typeof InputSchema>;

type Service = {
  name: string;
  summary: string;
  description: string;
  category: string;
  keywords?: string[];
};

type Output = {
  success: boolean;
  matched_service?: {
    name: string;
    category: string;
    summary?: string;
    description?: string;
    score: number;
  };
  candidates?: { name: string; category: string; score: number }[];
  summary?: string;
  message?: string;
};

// Helper: very basic fuzzy match using keywords
function scoreMatch(desc: string, service: Service): number {
  const descLC = desc.toLowerCase();
  let score = 0;
  if (descLC.includes(service.name.toLowerCase())) score += 6;
  if (service.keywords) {
    for (const kw of service.keywords) {
      if (descLC.includes(kw.toLowerCase())) score += 3;
    }
  }
  if (service.summary && descLC.includes(service.summary.toLowerCase())) score += 2;
  if (service.description && descLC.includes(service.description.toLowerCase())) score += 1;
  if (descLC.includes(service.category.toLowerCase())) score += 1;
  return score;
}

// --- IMPLEMENTATION ---
async function implementation(input: Input): Promise<Output> {
  try {
    const { message } = InputSchema.parse(input);

    const allServices: Service[] = deskripsiLayanan as Service[];

    const scored = allServices.map(service => ({
      ...service,
      score: scoreMatch(message, service),
    }));

    scored.sort((a, b) => b.score - a.score);
    const candidates = scored.filter(s => s.score > 0);

    if (candidates.length === 0) {
      return {
        success: false,
        message: 'Gagal menemukan layanan yang relevan dari deskripsi tersebut.',
        candidates: scored.map(s => ({ name: s.name, category: s.category, score: s.score })),
      };
    }

    const top = candidates[0];
    if (top.score >= 5) {
      return {
        success: true,
        matched_service: {
          name: top.name,
          category: top.category,
          summary: top.summary,
          description: top.description,
          score: top.score,
        },
        candidates: candidates.map(s => ({ name: s.name, category: s.category, score: s.score })),
        summary: `Layanan paling cocok untuk deskripsi user adalah *${top.name}* (kategori ${top.category}).`,
      };
    } else {
      return {
        success: false,
        message: 'Beberapa layanan mungkin cocok, mohon klarifikasi.',
        candidates: candidates.slice(0, 3).map(s => ({ name: s.name, category: s.category, score: s.score })),
      };
    }
  } catch (err: any) {
    console.error('[matchServiceFromDescriptionTool] Error:', err);
    return {
      success: false,
      message: `Error internal: ${err.message}`,
    };
  }
}

// --- EXPORT ZOYA COMPATIBLE TOOL ---
export const matchServiceFromDescriptionTool = {
  toolDefinition: {
    type: "function" as const,
    function: {
      name: "matchServiceFromDescription",
      description: "Cocokkan deskripsi bebas user ke nama layanan resmi.",
      parameters: {
        type: "object",
        properties: {
          message: { type: "string", description: "Pesan/deskripsi bebas dari user." },
        },
        required: ["message"],
      },
    },
  },
  implementation,
};
