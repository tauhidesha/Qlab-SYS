// File: src/ai/tools/getRepaintSurchargeTool.ts
import { z } from 'zod';

const InputSchema = z.object({
  repaint_size: z.enum(['S', 'M', 'L', 'XL']).describe('Ukuran bodi untuk kebutuhan repaint (lihat field repaint_size di database motor)'),
  effect: z.enum(['candy', 'bunglon', 'moonlight', 'xyrallic', 'lembayung']).describe('Jenis efek warna spesial yang dipilih (candy, bunglon, moonlight)'),
});

type Input = z.infer<typeof InputSchema>;

type Result = {
  success: boolean;
  surcharge?: number; // Dalam ribuan, misal 150 untuk 150rb
  summary?: string;
  detail?: string;
  error?: string;
};

const surchargeTable: Record<Input['effect'], Record<Input['repaint_size'], number>> = {
  candy:    { S: 150_000, M: 250_000, L: 300_000, XL: 400_000 },
  bunglon:  { S: 200_000, M: 300_000, L: 350_000, XL: 450_000 },
  moonlight:{ S: 200_000, M: 300_000, L: 350_000, XL: 450_000 },
  xyrallic: { S: 200_000, M: 300_000, L: 350_000, XL: 450_000 },
  lembayung: { S: 200_000, M: 300_000, L: 350_000, XL: 450_000 },
};

async function implementation(input: Input): Promise<Result> {
  try {
    const { repaint_size, effect } = InputSchema.parse(input);

    const fullSurchargeValue = surchargeTable[effect][repaint_size];
    const surchargeForSystem = fullSurchargeValue / 1000; // PATCH: Konversi ke format ribuan sesuai kontrak

    // ===> [DEBUG] TAMBAHKAN BARIS INI UNTUK MELIHAT OUTPUT DI LOG SERVER <===
    console.log(`[TOOL DEBUG] getRepaintSurcharge is returning:`, { success: true, surcharge: surchargeForSystem });

    return {
      success: true,
      surcharge: surchargeForSystem, // PATCH: Mengirim nilai yang sudah dikonversi
      summary: `Tambahan biaya untuk warna ${effect} pada motor repaint_size ${repaint_size}: Rp${fullSurchargeValue.toLocaleString('id-ID')}`,
      detail: `Surcharge berlaku khusus untuk efek warna ${effect} karena proses, material & pigmen cat lebih mahal dari warna solid/metalik biasa.`,
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
      description: "Hitung biaya tambahan untuk repaint motor dengan efek warna candy, bunglon, atau moonlight berdasarkan repaint_size.",
      parameters: {
        type: "object",
        properties: {
          repaint_size: {
            type: "string",
            enum: ["S", "M", "L", "XL"],
            description: "Ukuran bodi repaint motor (repaint_size)."
          },
          effect: {
            type: "string",
            enum: ["candy", "bunglon", "moonlight"],
            description: "Jenis efek warna spesial repaint."
          },
        },
        required: ["repaint_size", "effect"],
      },
    },
  },
  implementation,
};