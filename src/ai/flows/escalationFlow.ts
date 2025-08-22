import { sendWhatsAppMessage } from '@/services/whatsappService';
import { SentimentAnalysisResult } from '@/types/ai/sentiment';
import { Session } from '@/types/ai/session';

// --- Escalation Configuration ---
const ESCALATION_CONFIG = {
  bosMamatPhone: '628179481010', // Bos Mamat's WhatsApp
  escalationThreshold: 3, // Level 3 triggers escalation
  autoEscalationEnabled: true,
  escalationDelay: 5000, // 5 seconds delay before escalation
};

// --- Escalation Flow ---
export async function handleEscalation(
  sentimentResult: SentimentAnalysisResult,
  session: Session,
  customerMessage: string
): Promise<{
  escalated: boolean;
  escalationMessage?: string;
  customerResponse?: string;
}> {
  try {
    console.log('[EscalationFlow] Checking escalation for customer:', session.senderNumber);

    // Check if escalation is needed
    if (!ESCALATION_CONFIG.autoEscalationEnabled || sentimentResult.escalationLevel < ESCALATION_CONFIG.escalationThreshold) {
      return { escalated: false };
    }

    // Generate escalation message for customer
    const customerResponse = generateCustomerEscalationMessage(sentimentResult, session);
    
    // Generate escalation alert for Bos Mamat
    const escalationMessage = generateBosMamatAlert(sentimentResult, session, customerMessage);

    // Send escalation alert to Bos Mamat
    if (ESCALATION_CONFIG.bosMamatPhone) {
      await sendWhatsAppMessage(ESCALATION_CONFIG.bosMamatPhone, escalationMessage);
      console.log('[EscalationFlow] Escalation alert sent to Bos Mamat');
    }

    // Add delay before sending customer message
    await new Promise(resolve => setTimeout(resolve, ESCALATION_CONFIG.escalationDelay));

    return {
      escalated: true,
      escalationMessage,
      customerResponse,
    };

  } catch (error) {
    console.error('[EscalationFlow] Error:', error);
    return { escalated: false };
  }
}

// --- Customer Escalation Message ---
function generateCustomerEscalationMessage(
  sentimentResult: SentimentAnalysisResult,
  session: Session
): string {
  const customerName = session.senderName || 'mas';
  const emotion = sentimentResult.emotion?.primaryEmotion || 'negative';

  let message = `Halo ${customerName}, maaf atas ketidaknyamanannya. 🙏\n\n`;

  if (emotion === 'angry') {
    message += `Saya mengerti ${customerName} sedang kesal. Untuk memberikan pelayanan terbaik, saya akan menghubungkan ${customerName} dengan tim khusus kami yang akan segera menghubungi dalam beberapa menit.\n\n`;
  } else if (emotion === 'frustrated') {
    message += `Saya paham ${customerName} sedang frustrasi. Tim kami akan segera menghubungi untuk memberikan solusi terbaik.\n\n`;
  } else {
    message += `Untuk memberikan pelayanan yang lebih baik, tim kami akan segera menghubungi ${customerName}.\n\n`;
  }

  message += `Mohon tunggu sebentar ya. Terima kasih atas kesabarannya. 🙏`;

  return message;
}

// --- Bos Mamat Alert Message ---
function generateBosMamatAlert(
  sentimentResult: SentimentAnalysisResult,
  session: Session,
  customerMessage: string
): string {
  const customerName = session.senderName || 'Customer';
  const emotion = sentimentResult.emotion?.primaryEmotion || 'negative';
  const escalationLevel = sentimentResult.escalationLevel;

  let message = `🚨 **ESCALATION ALERT** 🚨\n\n`;
  message += `📱 **Customer**: ${customerName}\n`;
  message += `📞 **Phone**: ${session.senderNumber}\n`;
  message += `😤 **Emotion**: ${emotion}\n`;
  message += `⚠️ **Level**: ${escalationLevel}/3\n`;
  message += `📊 **Sentiment**: ${sentimentResult.sentiment.sentiment} (${sentimentResult.sentiment.score.toFixed(2)})\n\n`;

  message += `💬 **Pesan Customer**:\n"${customerMessage}"\n\n`;

  // Add specific instructions based on emotion
  if (emotion === 'angry') {
    message += `🔥 **URGENT**: Customer MARAH!\n`;
    message += `- Segera hubungi customer\n`;
    message += `- Tawarkan solusi konkret\n`;
    message += `- Berikan kompensasi jika perlu\n`;
  } else if (emotion === 'frustrated') {
    message += `😤 **HIGH PRIORITY**: Customer FRUSTRASI\n`;
    message += `- Hubungi dalam 30 menit\n`;
    message += `- Dengarkan keluhan dengan sabar\n`;
    message += `- Tawarkan bantuan maksimal\n`;
  } else {
    message += `😔 **MEDIUM PRIORITY**: Customer NEGATIF\n`;
    message += `- Hubungi dalam 1 jam\n`;
    message += `- Berikan perhatian khusus\n`;
  }

  message += `\n📈 **History**: ${session.totalInteractions || 0} interactions, ${session.negativeInteractions || 0} negative`;

  return message;
}

// --- Manual Escalation Trigger ---
export async function triggerManualEscalation(
  session: Session,
  reason: string
): Promise<boolean> {
  try {
    console.log('[EscalationFlow] Manual escalation triggered for:', session.senderNumber);

    let escalationMessage = `🚨 **MANUAL ESCALATION** 🚨\n\n`;
    escalationMessage += `📱 **Customer**: ${session.senderName || 'Customer'}\n`;
    escalationMessage += `📞 **Phone**: ${session.senderNumber}\n`;
    escalationMessage += `📝 **Reason**: ${reason}\n\n`;
    escalationMessage += `⚠️ **Action Required**: Manual escalation requested`;

    if (ESCALATION_CONFIG.bosMamatPhone) {
      await sendWhatsAppMessage(ESCALATION_CONFIG.bosMamatPhone, escalationMessage);
      console.log('[EscalationFlow] Manual escalation alert sent');
      return true;
    }

    return false;
  } catch (error) {
    console.error('[EscalationFlow] Manual escalation error:', error);
    return false;
  }
}

// --- Escalation Status Check ---
export function shouldEscalate(session: Session): boolean {
  const currentSentiment = session.currentSentiment;
  
  if (!currentSentiment) return false;

  // Check escalation level
  if (currentSentiment.escalationLevel >= ESCALATION_CONFIG.escalationThreshold) {
    return true;
  }

  // Check escalation count (if too many escalations, escalate)
  if (session.escalationCount && session.escalationCount >= 3) {
    return true;
  }

  // Check negative interaction rate
  if (session.totalInteractions && session.negativeInteractions) {
    const negativeRate = (session.negativeInteractions / session.totalInteractions) * 100;
    if (negativeRate > 70) { // More than 70% negative interactions
      return true;
    }
  }

  return false;
}

// --- Escalation Analytics ---
export function getEscalationAnalytics(session: Session) {
  return {
    totalInteractions: session.totalInteractions || 0,
    negativeInteractions: session.negativeInteractions || 0,
    escalationCount: session.escalationCount || 0,
    negativeRate: session.totalInteractions ? 
      ((session.negativeInteractions || 0) / session.totalInteractions) * 100 : 0,
    escalationRate: session.totalInteractions ? 
      ((session.escalationCount || 0) / session.totalInteractions) * 100 : 0,
    lastEscalation: session.lastEscalationAt ? 
      new Date(session.lastEscalationAt).toLocaleString('id-ID') : 'Never',
  };
}
