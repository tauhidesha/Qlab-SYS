// @file: src/ai/agent/cartAgent.ts (REVISI TOTAL UNTUK DETAIL PROMO)

import type { CartAgentInput, CartAgentResult } from '../../types/cart-agent';
import { resolveMotorSizes } from '../../lib/math';
import promoBundling from '../../data/promoBundling';

export async function processCart({ session }: CartAgentInput): Promise<CartAgentResult> {
  let { cartServices, inquiry } = session;
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

  const priceDetails: { name: string; price: number }[] = [];
  let promoApplied: { name: string; discount: number } | undefined;
  
  let normalRepaintPrice: number | undefined;
  let normalDetailingPrice: number | undefined;

  // --- 1. Promo Bundling ---
  const hasRepaint = cartServices.includes('Repaint Bodi Halus');
  const hasDetailing = cartServices.includes('Full Detailing Glossy');
  const promoEligible = hasRepaint && hasDetailing;

  console.log('[AgentCart][PromoBundling] hasRepaint:', hasRepaint, '| hasDetailing:', hasDetailing, '| promoEligible:', promoEligible);

  if (promoEligible) {
    const promoSelectionSize = repaint_size; 
    const selectedPromo = promoBundling.find(p => p.repaintSize === promoSelectionSize) || promoBundling.find(p => p.repaintSize === 'L');
    console.log('[AgentCart][PromoBundling] promoSelectionSize:', promoSelectionSize, '| selectedPromo:', selectedPromo);
    
    if (selectedPromo) {
      promoApplied = { name: 'Paket Promo Bundling', discount: selectedPromo.savings };
      
      if (typeof getSpecificServicePrice === 'function') {
        const repaintResult = await getSpecificServicePrice({ service_name: 'Repaint Bodi Halus', size: repaint_size });
        if (repaintResult?.success && 'price' in repaintResult) normalRepaintPrice = repaintResult.price;
        console.log(`[AgentCart][PromoBundling] Harga normal Repaint (size: ${repaint_size}):`, normalRepaintPrice);

        let detailingSize = motor_db_size;
        if (repaint_size === 'XL') detailingSize = 'L';
        else if (repaint_size === 'L') detailingSize = 'M';
        
        const detailingResult = await getSpecificServicePrice({ service_name: 'Full Detailing Glossy', size: detailingSize });
        if (detailingResult?.success && 'price' in detailingResult) normalDetailingPrice = detailingResult.price;
        console.log(`[AgentCart][PromoBundling] Harga normal Detailing (size: ${detailingSize}):`, normalDetailingPrice);
      }
    }
  }

  // --- 2. Harga Layanan Tambahan (selain yang masuk promo) ---
  for (const serviceName of cartServices) {
    const isPromoIncludedService = promoApplied && (serviceName === 'Repaint Bodi Halus' || serviceName === 'Full Detailing Glossy');
    if (isPromoIncludedService) continue;
    
    if (typeof getSpecificServicePrice === 'function') {
      const isRepaint = serviceName.toLowerCase().includes('repaint');
      const size = isRepaint ? repaint_size : motor_db_size;
      const priceResult = await getSpecificServicePrice({ service_name: serviceName, size });
      let price = (priceResult?.success && 'price' in priceResult) ? priceResult.price : 0;
      priceDetails.push({ name: serviceName, price });
    }
  }

  // --- 3. Surcharge ---
  let surchargeValue = 0;
  if (cartServices.includes('Repaint Bodi Halus') && typeof getRepaintSurcharge === 'function') {
    const colorInfo = repaintDetails['Repaint Bodi Halus']?.color ?? '';
    const serviceSize = repaint_size;
    const surchargeResult = await getRepaintSurcharge({ color: colorInfo, repaint_size: serviceSize });
    surchargeValue = surchargeResult?.surcharge ?? 0;
    console.log('[AgentCart][Surcharge] Surcharge value detected:', surchargeValue);
  }

  // ==================================================================
  // --- 4. SIAPKAN STRUKTUR HARGA FINAL & PESAN BALASAN ---
  // ==================================================================
  const finalPriceDetails: { name: string; price: number }[] = [];
  let replyMessage = `Oke om, ini rincian biayanya ya:\n\n`;
  
  if (promoApplied && normalRepaintPrice && normalDetailingPrice) {
    // --- SKENARIO DENGAN PROMO ---
    
    // 1. Kumpulkan semua komponen harga (positif dan negatif)
    finalPriceDetails.push({ name: 'Repaint Bodi Halus (Harga Normal)', price: normalRepaintPrice });
    finalPriceDetails.push({ name: 'Full Detailing Glossy (Harga Normal)', price: normalDetailingPrice });
    if (surchargeValue > 0) {
      finalPriceDetails.push({ name: 'Biaya Tambahan Warna Khusus', price: surchargeValue });
    }
    finalPriceDetails.push({ name: 'Diskon Promo Bundling', price: -promoApplied.discount });
    if (surchargeValue > 0) {
      finalPriceDetails.push({ name: 'Saving Biaya Tambahan Warna Khusus (Gratis via Promo)', price: -surchargeValue });
    }
    // Tambahkan layanan tambahan di luar promo
    finalPriceDetails.push(...priceDetails);

    // 2. Bangun pesan balasan sesuai format yang diminta
    replyMessage += `_*Rincian Harga Final:*_\n`;
    replyMessage += `- *Repaint Bodi Halus (Harga Normal):* Rp ${normalRepaintPrice.toLocaleString('id-ID')}\n`;
    replyMessage += `- *Full Detailing Glossy (Harga Normal):* Rp ${normalDetailingPrice.toLocaleString('id-ID')}\n`;
    
    let totalSebelumDiskon = normalRepaintPrice + normalDetailingPrice;

    if (surchargeValue > 0) {
      replyMessage += `- *Biaya Tambahan Warna Khusus:* Rp ${surchargeValue.toLocaleString('id-ID')}\n`;
      totalSebelumDiskon += surchargeValue;
    }
    
    replyMessage += `\n*Total Biaya:* Rp ${totalSebelumDiskon.toLocaleString('id-ID')}\n`;
    replyMessage += `\n_Promo: Anda dapat ${promoApplied.name}!_\n`;
    replyMessage += `- *Diskon Promo Bundling:* Rp -${promoApplied.discount.toLocaleString('id-ID')}\n`;
    
    if (surchargeValue > 0) {
      replyMessage += `- *Saving Biaya Tambahan Warna Khusus (Gratis via Promo):* Rp -${surchargeValue.toLocaleString('id-ID')}\n`;
    }
    
    // Tambahkan tampilan untuk layanan di luar promo jika ada
    if (priceDetails.length > 0) {
        replyMessage += `\n_Layanan Tambahan:_\n`;
        priceDetails.forEach(item => {
            replyMessage += `- *${item.name}:* Rp ${item.price.toLocaleString('id-ID')}\n`;
        });
    }

  } else {
    // --- SKENARIO TANPA PROMO ---
    if (typeof getSpecificServicePrice === 'function') {
      for (const serviceName of cartServices) {
          const isRepaint = serviceName.toLowerCase().includes('repaint');
          const size = isRepaint ? repaint_size : motor_db_size;
          const priceResult = await getSpecificServicePrice({ service_name: serviceName, size });
          let price = (priceResult?.success && 'price' in priceResult) ? priceResult.price : 0;
          finalPriceDetails.push({ name: serviceName, price });
      }
    }
    if (surchargeValue > 0) {
        finalPriceDetails.push({ name: 'Biaya Tambahan Warna Khusus', price: surchargeValue });
    }

    replyMessage += `_*Rincian Biaya Anda:*_\n`;
    finalPriceDetails.forEach(item => {
        replyMessage += `- *${item.name}:* Rp ${item.price.toLocaleString('id-ID')}\n`;
    });
  }

  // ==================================================================
  // --- 5. HITUNG TOTAL AKHIR DAN SELESAIKAN ---
  // ==================================================================
  const finalTotal = finalPriceDetails.reduce((acc, item) => acc + item.price, 0);
  
  // Tambahkan total akhir ke pesan balasan
  const totalLabel = promoApplied ? 'Total Biaya Setelah Diskon Promo' : 'Total Biaya Akhir';
  replyMessage += `\n*${totalLabel}:* Rp ${finalTotal.toLocaleString('id-ID')}`;
  
  replyMessage += `\n\nMau lanjut ke booking, atau ada yang mau diubah?`;

  console.log('--- [AgentCart DEBUG END] ---');
  console.log('Final Total:', finalTotal);
  console.log('Promo Applied:', promoApplied);
  console.log('Final Price Details for AI:', finalPriceDetails);
  console.log('-------------------------------');
  
  return {
    priceDetails: finalPriceDetails,
    promoApplied,
    surcharge: promoApplied ? 0 : surchargeValue, // Surcharge yang benar-benar ditagih
    total: finalTotal,
    replyMessage,
  };
}