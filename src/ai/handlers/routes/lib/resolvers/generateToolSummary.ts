// app/ai/lib/resolvers/generateToolSummary.ts
import { formatPrice } from './formatPrice';
import { formatEstimatedDuration } from './formatEstimatedDuration';

export function generateToolSummary(result: any): string | null {
  if (!result || typeof result !== 'object') return null;

  if ('service_name' in result && 'price' in result) {
    const price = formatPrice(result.price);
    const durasi = result.estimated_duration ? `Durasi pengerjaan ${formatEstimatedDuration(result.estimated_duration)}.` : '';
    return `Harga untuk *${result.service_name}* adalah ${price}. ${durasi}`;
  }

  if ('promoDetails' in result) {
    const { promoPrice, savings, description } = result.promoDetails;
    return `Ada promo nih! ${description} Cuma ${formatPrice(promoPrice)} (hemat Rp${savings.toLocaleString('id-ID')}).`;
  }

  if ('availableSlots' in result && Array.isArray(result.availableSlots)) {
    const slot = result.availableSlots[0];
    return `Jadwal terdekat: ${slot.day}, ${slot.date} jam ${slot.time}. Mau booking?`;
  }

  if ('details' in result && result.details.motor_model) {
    return `Motor *${result.details.motor_model}* termasuk size ${result.details.general_size}, repaint-nya size ${result.details.repaint_size}.`;
  }

  if ('services' in result && Array.isArray(result.services)) {
    const lines = result.services.map((s: any) => `• *${s.name}*: ${s.summary}`);
    return `Berikut layanan dalam kategori ini:\n\n${lines.join('\n')}`;
  }

  return null; // fallback
}
