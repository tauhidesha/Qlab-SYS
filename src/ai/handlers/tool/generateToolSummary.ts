// File: src/ai/utils/generateToolSummary.ts

export function generateToolSummary(toolName: string, toolResult: any): string {
  const result = toolResult?.result || toolResult;

  if (!result || result.error) {
    return 'Zoya belum bisa nemuin info yang kamu butuhin, bro 😅';
  }

  switch (toolName) {
    case 'getPromoBundleDetails': {
      const hemat = result.promoDetails?.normalPrice - result.promoDetails?.promoPrice;
      const layanan = result.promoDetails?.includedServices?.map(s => `• ${s}`)?.join('\n') || '';

      return (
        `🔥 *PROMO ${result.motor_model?.toUpperCase() || 'MOTOR'} (size ${result.promoDetails?.repaintSize || 'N/A'})*\n` +
        `~~Rp${format(result.promoDetails?.normalPrice)}~~ → *Rp${format(result.promoDetails?.promoPrice)}*\n` +
        `💰 Hemat *Rp${format(hemat)}*\n\n` +
        `Termasuk:\n${layanan || 'Tidak ada layanan terdaftar'}\n\n` +
        `Gas sekarang sebelum slot promo abis, bro 💨`
      );
    }

    case 'createBooking': {
      const { customerName, serviceName, motorModel, bookingDate, bookingTime } = result;

      return `✅ Booking sukses atas nama *${customerName}*, bro!\n` +
        `Layanan: *${serviceName}*\n` +
        `Motor: *${motorModel}*\n` +
        `Tanggal: *${bookingDate} jam ${bookingTime}*\n\n` +
        `Tinggal dateng sesuai jadwal ya, jangan telat biar hasilnya maksimal 💪`;
    }

    case 'getServiceDuration': {
      return `Estimasi pengerjaannya sekitar *${result.durationMinutes} menit*, bro. Tapi tergantung kondisi motor juga ya.`;
    }

    case 'getSpecificServicePrice': {
      const price = result.price;
      const serviceName = result.service_name;

      if (!price || !serviceName) {
        return 'Maaf bro, data harga belum tersedia saat ini.';
      }

      return `Harga layanan *${serviceName}* untuk motor kamu adalah Rp${format(price)}, bro. Mau lanjut booking?`;
    }

    case 'checkBookingAvailability': {
      if (result.available || result.isAvailable) {
        return `Slot *${result.summary || 'yang kamu pilih'}* masih tersedia bro! Mau Zoya amankan sekalian?`;
      } else {
        return `Wah, ${result.summary || 'slot ini'} udah penuh bro 😢. Mau cek waktu lain?`;
      }
    }

    case 'getMotorSizeDetails': {
      if (result.success === false) {
        return result.message || 'Motor tidak ditemukan di database, bro.';
      }
      const model = result.matched_model || result.motor_query;
      const size = result.motor_size || result.general_size;
      const repaint = result.repaint_size;

      return `Motor *${model}* masuk kategori *${size}*, dan untuk kebutuhan repaint termasuk size *${repaint}*, bro.`;
    }

    case 'extractBookingDetails': {
      return `Zoya nangkep kamu mau booking layanan *${result.serviceName}* di tanggal *${result.bookingDate} jam ${result.bookingTime}* ya bro?`;
    }

    case 'matchServiceFromDescription': {
      return `Dari deskripsimu, Zoya rasa yang paling cocok adalah layanan *${result.matched_service?.name}*, bro.`;
    }

    case 'listServicesByCategory': {
      const layanan = result.services?.map(s => {
        const variants = s.variants?.join(', ') || '';
        return `• *${s.name}*${variants ? `\n   ${variants}` : ''}`;
      }).join('\n') || 'Belum ada layanan di kategori ini, bro.';

      return `Berikut daftar layanan di kategori *${result.category}*, bro:\n\n${layanan}\n\nTertarik coba yang mana?`;
    }

    case 'getRepaintSurcharge': {
      const surcharge = result.surcharge;
      const effect = result.effect || 'efek warna';

      if (!surcharge) {
        return `Belum ketemu info pasti untuk biaya tambahan ${effect}, bro.`;
      }

      return `Efek warna *${effect}* ada tambahan Rp${format(surcharge)} ya bro.`;
    }

    case '__combo_price_with_surcharge': {
      const { basePrice, effect, surcharge } = result;
      const total = (basePrice || 0) + (surcharge || 0);

      return (
        `Harga dasar repaint-nya Rp${format(basePrice)}.\n` +
        `Karena pakai efek *${effect}*, ada tambahan Rp${format(surcharge)}.\n\n` +
        `💰 Jadi totalnya *Rp${format(total)}* ya bro.`
      );
    }

    default:
      return 'Zoya udah dapet hasilnya, tapi belum bisa jelasin tool ini 😅';
  }
}

function format(angka?: number): string {
  return (angka ?? 0).toLocaleString('id-ID');
}
