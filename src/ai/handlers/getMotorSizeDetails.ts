// app/ai/handlers/getMotorSizeRoute.ts
import { getMotorSizeDetails } from "../tools/getMotorSizeDetailsTool";
import { z } from 'zod';

const inputSchema = z.object({
  motor_query: z.string(),
});
type Input = z.infer<typeof inputSchema>;

export async function getMotorSizeRoute(input: Input) {
  const result = await getMotorSizeDetails(input);

  if ('details' in result) {
    return {
      success: true,
      data: result,
      summary: `Motor ${result.details.motor_model} masuk kategori ${result.details.general_size}, untuk repaint masuk size ${result.details.repaint_size}.`,
    };
  }

  if (result.error === 'ambiguous_motor') {
    return {
      success: false,
      error: 'ambiguous_motor',
      message: `Nama motor terlalu umum, bisa jadi: ${result.ambiguous_options?.join(', ')}`,
    };
  }

  return {
    success: false,
    error: result.error || 'generic_error',
    message: result.message || 'Gagal menentukan ukuran motor.',
  };
}
