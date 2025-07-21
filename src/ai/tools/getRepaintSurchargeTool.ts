// File: src/ai/tools/getRepaintSurchargeTool.ts
import { z } from 'zod';


const InputSchema = z.object({
  repaint_size: z.enum(['S', 'M', 'L', 'XL']).describe('Ukuran bodi untuk kebutuhan repaint (lihat field repaint_size di database motor)'),
  color: z.string().describe('Warna/efek yang diinput user (bebas, akan dicocokkan fuzzy di tool)'),
});


type Input = z.infer<typeof InputSchema>;

type Result = {
  success: boolean;
  surcharge?: number; // Dalam ribuan, misal 150 untuk 150rb
  summary?: string;
  detail?: string;
  error?: string;
};


const surchargeTable: Record<string, Record<Input['repaint_size'], number>> = {
  candy:    { S: 150_000, M: 250_000, L: 300_000, XL: 400_000 },
  bunglon:  { S: 200_000, M: 300_000, L: 350_000, XL: 450_000 },
  moonlight:{ S: 200_000, M: 300_000, L: 350_000, XL: 450_000 },
  xyrallic: { S: 200_000, M: 300_000, L: 350_000, XL: 450_000 },
  lembayung: { S: 200_000, M: 300_000, L: 350_000, XL: 450_000 },
};


// Simple fuzzy match: check if any allowed keyword is a substring (case-insensitive, ignore minor typos)
function fuzzyMatchColor(color: string, keywords: string[]): string | null {
  const colorNorm = color.toLowerCase().replace(/[^a-z0-9]/g, '');
  for (const kw of keywords) {
    const kwNorm = kw.toLowerCase().replace(/[^a-z0-9]/g, '');
    // Allow 1 typo (Levenshtein distance <= 1) or substring match
    if (colorNorm.includes(kwNorm) || levenshtein(colorNorm, kwNorm) <= 1) {
      return kw;
    }
  }
  return null;
}

// Levenshtein distance for typo tolerance
function levenshtein(a: string, b: string): number {
  const matrix = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + 1
        );
      }
    }
  }
  return matrix[a.length][b.length];
}

async function implementation(input: Input): Promise<Result> {
  try {
    const { repaint_size, color } = InputSchema.parse(input);
    const allowedKeywords = ['candy', 'bunglon', 'moonlight', 'xyrallic', 'lembayung'];
    const matched = fuzzyMatchColor(color, allowedKeywords);
    if (!matched) {
      return { success: true, surcharge: 0, summary: 'Tidak ada surcharge', detail: 'Warna tidak termasuk kategori surcharge.' };
    }
    const fullSurchargeValue = surchargeTable[matched][repaint_size];
    console.log(`[TOOL DEBUG] getRepaintSurcharge is returning:`, { success: true, surcharge: fullSurchargeValue });
    return {
      success: true,
      surcharge: fullSurchargeValue,
      summary: `Tambahan biaya untuk warna ${matched} pada motor repaint_size ${repaint_size}: Rp${fullSurchargeValue.toLocaleString('id-ID')}`,
      detail: `Surcharge berlaku khusus untuk efek warna ${matched} karena proses, material & pigmen cat lebih mahal dari warna solid/metalik biasa.`,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || 'Input tidak valid atau internal error.',
    };
  }
}


export const getRepaintSurchargeTool = {
  toolDefinition: {
    type: 'function' as const,
    function: {
      name: "getRepaintSurcharge",
      description: "Hitung biaya tambahan untuk repaint motor dengan warna/efek candy, bunglon, moonlight, xyrallic, atau lembayung berdasarkan repaint_size. Input warna bebas, tool akan fuzzy match.",
      parameters: {
        type: "object",
        properties: {
          repaint_size: {
            type: "string",
            enum: ["S", "M", "L", "XL"],
            description: "Ukuran bodi repaint motor (repaint_size)."
          },
          color: {
            type: "string",
            description: "Warna/efek repaint (bebas, akan dicocokkan fuzzy di tool)."
          },
        },
        required: ["repaint_size", "color"],
      },
    },
  },
  implementation,
};