export function generateToolSummary(toolName: string, toolResult: any): string {
  const result = toolResult?.result || toolResult;

  if (!result || result.error) {
    return 'Zoya belum bisa nemuin info yang kamu butuhin, bro 😅';
  }

  switch (toolName) {
    case 'getPromoBundleDetails': {
      const hemat = result.originalPrice - result.promoPrice;
      const layanan = result.includedServices?.map(s => `• ${s}`)?.join('\n') || '';

      return (
        `🔥 *PROMO ${result.motorModel?.toUpperCase() || 'MOTOR'} (size ${result.motorSize})*\n` +
        `~~Rp${format(result.originalPrice)}~~ → *Rp${format(result.promoPrice)}*\n` +
        `💰 Hemat *Rp${format(hemat)}*\n\n` +
        `Termasuk:\n${layanan}\n\n` +
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
      const price = result.price ?? result.result?.price;
      const serviceName = result.service_name ?? result.result?.service_name;

      if (!price || !serviceName) {
        return 'Maaf bro, data harga belum tersedia saat ini.';
      }

      return `Harga layanan *${serviceName}* untuk motor kamu adalah Rp${format(price)}, bro. Mau lanjut booking?`;
    }

    case 'checkBookingAvailability': {
      if (result.isAvailable) {
        return `Slot kosong *${result.date} jam ${result.time}* masih tersedia bro! Mau Zoya amankan sekalian?`;
      } else {
        return `Wah, slot *${result.date} jam ${result.time}* udah penuh bro 😢. Mau cek waktu lain?`;
      }
    }

    case 'getMotorSizeDetails': {
      return `Motor *${result.details.motor_model}* masuk kategori *${result.details.general_size}*, dan untuk kebutuhan repaint termasuk size *${result.details.repaint_size}*, bro.`;
    }

    case 'extractBookingDetails': {
      return `Zoya nangkep kamu mau booking layanan *${result.serviceName}* di tanggal *${result.bookingDate} jam ${result.bookingTime}* ya bro?`;
    }

    case 'matchServiceFromDescription': {
      return `Dari deskripsimu, Zoya rasa yang paling cocok adalah layanan *${result.matchedService}*, bro.`;
    }

    case 'listServicesByCategoryTool': {
      const layanan = result.services?.map(s => `• ${s}`)?.join('\n') || 'Belum ada layanan di kategori ini, bro.';
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

    // PATCH: Gabungan harga dasar + surcharge kalau sudah dipanggil dua-duanya
    case '__combo_price_with_surcharge': {
      const { basePrice, effect, surcharge } = result;
      const total = basePrice + surcharge;

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

function format(angka: number): string {
  return angka.toLocaleString('id-ID');
}
