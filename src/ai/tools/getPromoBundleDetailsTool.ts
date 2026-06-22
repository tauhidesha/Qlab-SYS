import { z } from 'zod';

const InputSchema = z.object({
  motor_query: z.string().optional().describe('Model motor (misal "PCX", "Vario", dll)'),
});
export type Input = z.infer<typeof InputSchema>;

type Output = {
  isPromoAvailable: boolean;
  promoDetails?: any;
  motor_model?: string;
  note: string;
  summary?: string;
  terms?: string[];
};

async function implementation(input: Input): Promise<Output> {
  return {
    isPromoAvailable: false,
    note: "Saat ini tidak ada promo bundling yang aktif. Mohon cek harga satuan untuk masing-masing layanan.",
    summary: "Saat ini sedang tidak ada promo bundling. Tawarkan harga standar."
  };
}

export const getPromoBundleDetailsTool = {
  toolDefinition: {
    type: 'function' as const,
    function: {
      name: 'getPromoBundleDetails',
      description: 'Cek apakah ada promo bundling untuk motor tertentu.',
      parameters: {
        type: 'object',
        properties: {
          motor_query: {
            type: 'string',
            description: 'Model motor (opsional, misalnya "Nmax", "Vario", "PCX")',
          },
        },
        required: [],
      },
    },
  },
  implementation,
};
