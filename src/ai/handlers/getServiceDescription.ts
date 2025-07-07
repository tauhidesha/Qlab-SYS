// app/ai/handlers/serviceDescriptionRoute.ts
import { getServiceDescription } from '@/ai/tools/getServiceDescriptionTool';
import { z } from 'zod';

const inputSchema = z.object({
  service_name: z.string(),
});
type Input = z.infer<typeof inputSchema>;

export async function getServiceDescriptionRoute(input: Input) {
  const result = await getServiceDescription(input);

  if (result.description) {
    return {
      success: true,
      data: result,
      summary: result.description,
    };
  }

  return {
    success: false,
    error: 'not_found',
    message: result.error || `Deskripsi layanan untuk "${input.service_name}" tidak ditemukan.`,
  };
}
