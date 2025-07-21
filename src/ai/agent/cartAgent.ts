// @file: src/ai/agent/cartAgent.ts (REVISI UNTUK DETAIL PROMO)


import type { CartAgentInput, CartAgentResult } from '../../types/cart-agent';
import { resolveMotorSizes } from '../../lib/math';
import promoBundling from '../../data/promoBundling';

export async function processCart({ session }: CartAgentInput): Promise<CartAgentResult> {
  let { cartServices, inquiry } = session;
  // PATCH: Auto-add mapped service if cartServices is empty but inquiry.requestedServices exists
  if (Array.isArray(inquiry?.requestedServices) && inquiry.requestedServices.length > 0 && (!cartServices || cartServices.length === 0)) {
    cartServices = inquiry.requestedServices.map((s: any) => s.serviceName);
    console.log('[AgentCart][PATCH] cartServices auto-filled from requestedServices:', cartServices);
  }
  const motor = inquiry?.lastMentionedMotor || '';
  const repaintDetails = inquiry?.repaintDetails || {};
  console.log('[AgentCart][INPUT] cartServices:', cartServices);
  console.log('[AgentCart][INPUT] inquiry:', inquiry);

  console.log('--- [AgentCart DEBUG START] ---');
  console.log('Motor yang terdeteksi di sesi:', motor);
  const { motor_db_size, repaint_size } = resolveMotorSizes(motor);
  console.log('[AgentCart][RESOLVE SIZE] motor:', motor, '| motor_db_size:', motor_db_size, '| repaint_size:', repaint_size);
  console.log('---------------------------------');

  const { toolFunctionMap } = await import('../config/aiConfig');
  const getRepaintSurcharge = toolFunctionMap['getRepaintSurcharge']?.implementation;
  const getSpecificServicePrice = toolFunctionMap['getSpecificServicePrice']?.implementation;

  let totalPrice = 0;
  const priceDetails: { name: string; price: number }[] = [];
  let promoApplied: { name: string; discount: number } | undefined;
  
  // Variabel untuk menyimpan detail harga normal promo
  let normalRepaintPrice: number | undefined;
  let normalDetailingPrice: number | undefined;
// --- 1. Promo Bundling ---
  const hasRepaint = cartServices.includes('Repaint Bodi Halus');
  const hasDetailing = cartServices.includes('Full Detailing Glossy');
  const promoEligible = hasRepaint && hasDetailing;

  console.log('[AgentCart][PromoBundling] cartServices:', cartServices);
  console.log('[AgentCart][PromoBundling] hasRepaint:', hasRepaint, '| hasDetailing:', hasDetailing, '| promoEligible:', promoEligible);

  if (promoEligible) {
    // DIPERBAIKI: Promo dipilih berdasarkan repaint_size, tapi harga komponen dihitung terpisah
    const promoSelectionSize = repaint_size; 
    const selectedPromo = promoBundling.find(p => p.repaintSize === promoSelectionSize) || promoBundling.find(p => p.repaintSize === 'L');
    console.log('[AgentCart][PromoBundling] promoSelectionSize:', promoSelectionSize, '| selectedPromo:', selectedPromo);
    
    if (selectedPromo) {
      promoApplied = { name: 'Paket Promo Bundling', discount: selectedPromo.savings };
      
      // Ambil harga normal untuk ditampilkan di rincian
      if (typeof getSpecificServicePrice === 'function') {
        // Repaint Bodi Halus selalu menggunakan repaint_size
        const repaintResult = await getSpecificServicePrice({ service_name: 'Repaint Bodi Halus', size: repaint_size });
        if (repaintResult?.success && 'price' in repaintResult) normalRepaintPrice = repaintResult.price;
        console.log(`[AgentCart][PromoBundling] Harga normal Repaint (size: ${repaint_size}):`, normalRepaintPrice);

        // TENTUKAN UKURAN DETAILING BERDASARKAN ATURAN BARU
        let detailingSize = motor_db_size; // Default
        if (repaint_size === 'XL') {
            detailingSize = 'L';
        } else if (repaint_size === 'L') {
            detailingSize = 'M';
        }
        // Full Detailing Glossy menggunakan ukuran yang sudah disesuaikan
        const detailingResult = await getSpecificServicePrice({ service_name: 'Full Detailing Glossy', size: detailingSize });
        if (detailingResult?.success && 'price' in detailingResult) normalDetailingPrice = detailingResult.price;
        console.log(`[AgentCart][PromoBundling] Harga normal Detailing (size: ${detailingSize}):`, normalDetailingPrice);
      }

      // Harga total akan kita hitung ulang di bagian akhir untuk memastikan konsistensi
      // Untuk sementara, kita hanya tandai bahwa promo ini aktif
      priceDetails.push({ name: 'Paket Promo Bundling', price: selectedPromo.promoPrice });
      // totalPrice += selectedPromo.promoPrice; // Hapus ini agar dihitung ulang di bawah
      console.log('[AgentCart][PromoBundling] ✅ Promo applied! Base Promo Price:', selectedPromo.promoPrice);
    }
  }

  // --- 2. Harga Layanan Tambahan ---
  for (const serviceName of cartServices) {
    const isPromoIncludedService = promoApplied && (serviceName === 'Repaint Bodi Halus' || serviceName === 'Full Detailing Glossy');
    if (isPromoIncludedService) {
      console.log(`[AgentCart] Skipping ${serviceName} due to promo bundling`);
      continue;
    }
    
    if (typeof getSpecificServicePrice === 'function') {
      const isRepaint = serviceName.toLowerCase().includes('repaint');
      const size = isRepaint ? repaint_size : motor_db_size;
      console.log(`[AgentCart][Service] Getting price for: "${serviceName}" | size: "${size}"`);
      const priceResult = await getSpecificServicePrice({ service_name: serviceName, size });
      let price = (priceResult?.success && 'price' in priceResult) ? priceResult.price : 0;
      priceDetails.push({ name: serviceName, price });
      totalPrice += price;
      console.log(`[AgentCart][Service] ✅ Price for ${serviceName}: Rp ${price.toLocaleString('id-ID')}`);
    }
  }

  // --- 3. Surcharge ---
  let surcharge = 0;
  let promoSurchargeSaving = 0;
  if (cartServices.includes('Repaint Bodi Halus') && typeof getRepaintSurcharge === 'function') {
    const colorInfo = repaintDetails['Repaint Bodi Halus']?.color ?? '';
    const serviceSize = repaint_size;
    console.log(`[AgentCart][Surcharge] Checking surcharge for Repaint Bodi Halus: color="${colorInfo}", size="${serviceSize}"`);
    const surchargeResult = await getRepaintSurcharge({ color: colorInfo, repaint_size: serviceSize });
    const surchargeValue = surchargeResult?.surcharge ?? 0;
    console.log('[AgentCart][Surcharge] surchargeResult:', surchargeResult);
    if (surchargeValue > 0) {
      if (promoApplied) {
        promoSurchargeSaving = surchargeValue;
        console.log(`[AgentCart][Surcharge] Surcharge Rp ${surchargeValue} waived due to promo.`);
      } else {
        surcharge = surchargeValue;
        priceDetails.push({ name: `Biaya Tambahan Warna Khusus`, price: surchargeValue });
        totalPrice += surchargeValue;
        console.log(`[AgentCart][Surcharge] ✅ Surcharge applied: ${surchargeValue}`);
      }
    }
  }

  // ==================================================================
  // --- 4. Siapkan Pesan Balasan (DIROMBAK TOTAL) ---
  // ==================================================================
  const finalPriceDetails: { name: string; price: number }[] = [];
  let replyMessage = `Oke om, ini rincian biayanya ya:\n`;
  const detailItems: string[] = [];

  if (promoApplied && normalRepaintPrice && normalDetailingPrice) {
    // --- Rincian Promo ---
    detailItems.push(`\n--- Rincian Promo Bundling ---`);
    detailItems.push(`- Repaint Bodi Halus (Harga Normal): Rp ${normalRepaintPrice.toLocaleString('id-ID')}`);
    finalPriceDetails.push({ name: 'Repaint Bodi Halus (Harga Normal)', price: normalRepaintPrice });
    
    detailItems.push(`- Full Detailing Glossy (Harga Normal): Rp ${normalDetailingPrice.toLocaleString('id-ID')}`);
    finalPriceDetails.push({ name: 'Full Detailing Glossy (Harga Normal)', price: normalDetailingPrice });

    detailItems.push(`- Hemat dengan Promo Bundling: -Rp ${promoApplied.discount.toLocaleString('id-ID')}`);
    finalPriceDetails.push({ name: 'Diskon Promo Bundling', price: -promoApplied.discount });

    const promoPrice = normalRepaintPrice + normalDetailingPrice - promoApplied.discount;
    detailItems.push(`- **Harga Paket Promo: Rp ${promoPrice.toLocaleString('id-ID')}**`);
    detailItems.push(`---------------------------------`);

  } else {
    // Jika tidak ada promo, tambahkan item yang seharusnya ada di promo
     const repaintItem = priceDetails.find(p => p.name === 'Repaint Bodi Halus');
     if (repaintItem) detailItems.push(`- Repaint Bodi Halus: Rp ${repaintItem.price.toLocaleString('id-ID')}`);

     const detailingItem = priceDetails.find(p => p.name === 'Full Detailing Glossy');
     if (detailingItem) detailItems.push(`- Full Detailing Glossy: Rp ${detailingItem.price.toLocaleString('id-ID')}`);
  }

  // --- Layanan Tambahan ---
  priceDetails.forEach(item => {
    if (item.name !== 'Paket Promo Bundling' && !item.name.includes('Biaya Tambahan')) {
        detailItems.push(`- ${item.name}: Rp ${item.price.toLocaleString('id-ID')}`);
        finalPriceDetails.push({ name: item.name, price: item.price });
    }
  });

  // --- Surcharge (jika ada dan tidak digratiskan) ---
  if (surcharge > 0) {
    const surchargeItem = priceDetails.find(p => p.name.includes('Biaya Tambahan'));
    if (surchargeItem) {
        detailItems.push(`- ${surchargeItem.name}: Rp ${surchargeItem.price.toLocaleString('id-ID')}`);
        finalPriceDetails.push(surchargeItem);
    }
  }

  console.log('[AgentCart][DETAIL ITEMS]', detailItems);
  replyMessage += detailItems.join('\n');
  
  // --- Catatan Kaki Promo ---
  if (promoApplied) {
    console.log('[AgentCart][PROMO FOOTER]', promoApplied);
    replyMessage += `\n\n✨ Anda dapat **${promoApplied.name}** hemat Rp ${promoApplied.discount.toLocaleString('id-ID')}!`;
  }
  if (promoSurchargeSaving > 0) {
    console.log('[AgentCart][PROMO SURCHARGE SAVING]', promoSurchargeSaving);
    replyMessage += `\n🎁 Plus, biaya tambahan warna khusus (Rp ${promoSurchargeSaving.toLocaleString('id-ID')}) jadi **GRATIS** karena masuk dalam paket promo!`;
    finalPriceDetails.push({ name: 'Saving Biaya Tambahan Warna Khusus (Gratis via Promo)', price: -promoSurchargeSaving });
  }
  
  // --- Total Biaya ---
  replyMessage += `\n\n*Total Biaya Akhir: Rp ${totalPrice.toLocaleString('id-ID')}*`;
  replyMessage += `\n\nMau lanjut ke booking, atau ada yang mau diubah?`;

  console.log('--- [AgentCart DEBUG END] ---');
  console.log('Final Total:', totalPrice);
  console.log('Promo Applied:', promoApplied);
  console.log('Final Price Details for AI:', finalPriceDetails);
  console.log('-------------------------------');
  
  return {
    priceDetails: finalPriceDetails, // Mengirim rincian yang lebih detail
    promoApplied,
    surcharge,
    total: totalPrice,
    replyMessage, // Mengirim pesan yang sudah jadi dan detail
  };
}