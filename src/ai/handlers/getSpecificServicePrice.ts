// app/ai/handlers/priceRoute.ts (atau nama yang lo suka)
import { getSpecificServicePrice } from '@/ai/tools/getSpecificServicePriceTool';
import { z } from 'zod';

const inputSchema = z.object({
  service_name: z.string(),
  motor_query: z.string(),
  original_query: z.string().optional(),
});
type Input = z.infer<typeof inputSchema>;

export async function getSpecificServicePriceRoute(input: Input) {
  const result = await getSpecificServicePrice(input);

  if ('price' in result) {
    return {
      success: true,
      data: result,
      summary: result.note
        ? result.note
        : `Harga untuk layanan ${result.service_name} pada motor ${result.motor_model} (size ${result.motor_size}): Rp${result.price.toLocaleString('id-ID')}.`,
    };
  }

  // Tangani semua kemungkinan error
  switch (result.error) {
    case 'ambiguous_motor':
      return {
        success: false,
        error: 'ambiguous_motor',
        message: `Motor "${input.motor_query}" terlalu umum, bisa jadi: ${result.ambiguous_options.join(', ')}.`,
      };
    case 'requires_human_assistance':
      return {
        success: false,
        error: 'requires_human_assistance',
        message: result.message,
      };
    case 'price_not_available_for_size':
      return {
        success: false,
        error: 'price_not_available_for_size',
        message: `Harga untuk motor size ${result.motor_size} belum tersedia pada layanan ${result.service_name}.`,
      };
    default:
      return {
        success: false,
        error: 'generic_error',
        message: result.message || 'Gagal mendapatkan harga layanan.',
      };
  }
}
