import type { CartAgentInput, CartAgentResult } from '../../types/cart-agent';
import { resolveMotorSizes } from '../../lib/math';

export async function processCart({ session }: CartAgentInput): Promise<CartAgentResult> {
  let { cartServices, inquiry } = session;
  if (Array.isArray(inquiry?.requestedServices) && inquiry.requestedServices.length > 0 && (!cartServices || cartServices.length === 0)) {
    cartServices = inquiry.requestedServices.map((s: any) => s.serviceName);
  }
  const motor = inquiry?.lastMentionedMotor || '';
  const repaintDetails = inquiry?.repaintDetails || {};

  const { motor_db_size, repaint_size } = await resolveMotorSizes(motor);

  const { toolFunctionMap } = await import('../config/aiConfig');
  const getRepaintSurcharge = toolFunctionMap['getRepaintSurcharge']?.implementation;
  const getSpecificServicePrice = toolFunctionMap['getSpecificServicePrice']?.implementation;

  const finalPriceDetails: { name: string; price: number }[] = [];
  
  if (typeof getSpecificServicePrice === 'function') {
    for (const serviceName of cartServices) {
      const isRepaint = serviceName.toLowerCase().includes('repaint');
      const size = isRepaint ? repaint_size : motor_db_size;
      const priceResult = await getSpecificServicePrice({ service_name: serviceName, size, session });
      let price = (priceResult?.success && 'price' in priceResult) ? priceResult.price : 0;
      finalPriceDetails.push({ name: serviceName, price });
    }
  }

  let surchargeValue = 0;
  if (cartServices.includes('Repaint Bodi Halus') && typeof getRepaintSurcharge === 'function') {
    const colorInfo = repaintDetails['Repaint Bodi Halus']?.color ?? '';
    const surchargeResult = await getRepaintSurcharge({ color: colorInfo, repaint_size });
    surchargeValue = surchargeResult?.surcharge ?? 0;
    
    if (surchargeValue > 0) {
      finalPriceDetails.push({ name: 'Biaya Tambahan Warna Khusus', price: surchargeValue });
    }
  }

  let replyMessage = `Oke om, ini rincian biayanya ya:\n\n_*Rincian Biaya Anda:*_\n`;
  finalPriceDetails.forEach(item => {
      replyMessage += `- *${item.name}:* Rp ${item.price.toLocaleString('id-ID')}\n`;
  });

  const finalTotal = finalPriceDetails.reduce((acc, item) => acc + item.price, 0);
  
  const totalLabel = 'Total Biaya Akhir';
  replyMessage += `\n*${totalLabel}:* Rp ${finalTotal.toLocaleString('id-ID')}`;
  replyMessage += `\n\nMau lanjut ke booking, atau ada yang mau diubah?`;

  return {
    priceDetails: finalPriceDetails,
    surcharge: surchargeValue,
    total: finalTotal,
    replyMessage,
  };
}