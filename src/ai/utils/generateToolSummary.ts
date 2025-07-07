'use server';

import type { ZoyaChatInput } from '@/types/ai/cs-whatsapp-reply';

export async function generateToolSummary({
  input,
  toolName,
  toolOutput,
}: {
  input: ZoyaChatInput;
  toolName: string;
  toolOutput: string;
}): Promise<string | null> {
  try {
    const parsed = JSON.parse(toolOutput);

    const formatHarga = (angka: number): string => {
      if (angka >= 1_000_000) {
        return `${(angka / 1_000_000).toFixed(1).replace('.0', '')}jt`;
      } else if (angka >= 1_000) {
        return `${(angka / 1_000).toFixed(0)}rb`;
      }
      return angka.toString();
    };

    if (toolName === 'getSpecificServicePrice' && parsed.success) {
      const price = parsed.price ? formatHarga(parsed.price) : '—';
      const service = parsed.service_name || 'Layanan';
      const size = parsed.motor_size || 'motor kamu';
      const durasi = parsed.estimated_duration || '';
      const note = parsed.note || '';

      return `Oke bro, harga untuk *${service}* motor ukuran *${size}* adalah *${price}*. ${durasi ? `Estimasi pengerjaan ${durasi}.` : ''} ${note}`;
    }

    if (toolName === 'getPromoBundleDetails' && parsed.success) {
      const hemat = parsed.promo_bundle?.estimated_savings
        ? formatHarga(parsed.promo_bundle.estimated_savings)
        : null;
      const label = parsed.promo_bundle?.label || 'Promo';
      const price = parsed.promo_bundle?.price
        ? formatHarga(parsed.promo_bundle.price)
        : null;

      return `Ada promo bundling nih bro: *${label}* cuma *${price}* aja! Bisa hemat sampai *${hemat}* kalau dibanding ambil satuan. Mantap, kan?`;
    }

    if (toolName === 'getServiceDescription' && parsed.description) {
      return parsed.description;
    }

    if (toolName === 'getMotorSizeDetails' && parsed.details) {
      const { motor_model, general_size, repaint_size } = parsed.details;
      return `Motor *${motor_model}* masuk kategori ukuran: umum *${general_size}*, repaint *${repaint_size}*.`;
    }

    return null;
  } catch (err) {
    console.error('[generateToolSummary] Gagal parsing tool output:', toolOutput);
    return null;
  }
}
