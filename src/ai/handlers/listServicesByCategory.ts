import { listServicesByCategory } from '@/ai/tools/listServicesByCategoryTool';
import { z } from 'zod';

const inputSchema = z.object({
  category: z.enum(['coating', 'detailing', 'cuci', 'repaint']),
});

type Input = z.infer<typeof inputSchema>;

export async function listServicesRoute(input: Input) {
  const result = await listServicesByCategory(input);

  if (result.error) {
    return {
      success: false,
      error: 'category_not_found',
      message: result.error,
    };
  }

  return {
    success: true,
    services: result.services,
  };
}
