import { analyzeSentiment } from '@/ai/tools/sentimentAnalysisTool';
import { SentimentAnalysisResult, SentimentHistory } from '@/types/ai/sentiment';
import { Session } from '@/types/ai/session';
import { updateSession } from './session';

// --- Sentiment Processing Middleware ---
export async function processSentiment(
  message: string,
  session: Session,
  senderNumber: string
): Promise<{
  sentimentResult: SentimentAnalysisResult;
  shouldEscalate: boolean;
  escalationMessage?: string;
}> {
  try {
    console.log('[SentimentProcessor] Processing sentiment for message');

    // Analyze sentiment
    const sentimentResult = await analyzeSentiment(message);

    // Create sentiment history entry (filter out undefined values for Firestore)
    const sentimentHistoryEntry: SentimentHistory = {
      timestamp: Date.now(),
      message: message.substring(0, 200), // Truncate for storage
      sentiment: sentimentResult.sentiment,
      emotion: sentimentResult.emotion || {
        emotions: [],
        primaryEmotion: 'neutral',
        intensity: 0,
      },
      escalationLevel: sentimentResult.escalationLevel,
      actionTaken: sentimentResult.recommendedAction,
    };

    // Update session with sentiment data
    const updatedSession: Session = {
      ...session,
      sentimentHistory: [...(session.sentimentHistory || []), sentimentHistoryEntry],
      currentSentiment: sentimentResult,
      totalInteractions: (session.totalInteractions || 0) + 1,
      negativeInteractions: (session.negativeInteractions || 0) + 
        (sentimentResult.sentiment.sentiment === 'negative' ? 1 : 0),
      escalationCount: (session.escalationCount || 0) + 
        (sentimentResult.shouldEscalate ? 1 : 0),
      lastEscalationAt: sentimentResult.shouldEscalate ? Date.now() : session.lastEscalationAt,
    };

    // Update session in database
    await updateSession(senderNumber, updatedSession);

    // Check if escalation is needed
    let escalationMessage: string | undefined;
    if (sentimentResult.shouldEscalate) {
      escalationMessage = generateEscalationMessage(sentimentResult, session);
    }

    return {
      sentimentResult,
      shouldEscalate: sentimentResult.shouldEscalate,
      escalationMessage,
    };

  } catch (error) {
    console.error('[SentimentProcessor] Error:', error);
    
    // Return neutral sentiment as fallback
    return {
      sentimentResult: {
        sentiment: {
          score: 0,
          magnitude: 0,
          sentiment: 'neutral',
          confidence: 0,
        },
        escalationLevel: 0,
        shouldEscalate: false,
        recommendedAction: 'normal_response',
      },
      shouldEscalate: false,
    };
  }
}

// --- Escalation Message Generator ---
function generateEscalationMessage(
  sentimentResult: SentimentAnalysisResult,
  session: Session
): string {
  const customerName = session.senderName || 'Customer';
  const emotion = sentimentResult.emotion?.primaryEmotion || 'negative';
  
  let message = `🚨 **ESCALATION ALERT** 🚨\n\n`;
  message += `Customer: ${customerName}\n`;
  message += `Phone: ${session.senderNumber}\n`;
  message += `Sentiment: ${sentimentResult.sentiment.sentiment} (${sentimentResult.sentiment.score.toFixed(2)})\n`;
  message += `Emotion: ${emotion}\n`;
  message += `Escalation Level: ${sentimentResult.escalationLevel}/3\n\n`;
  
  if (emotion === 'angry') {
    message += `⚠️ Customer terdeteksi MARAH. Mohon segera handle dengan sopan dan tawarkan solusi.`;
  } else if (emotion === 'frustrated') {
    message += `😤 Customer terdeteksi FRUSTRASI. Berikan perhatian khusus dan tawarkan bantuan.`;
  } else {
    message += `😔 Customer terdeteksi NEGATIF. Mohon handle dengan hati-hati.`;
  }
  
  message += `\n\nContext: ${session.lastAssistantMessage || 'No context'}`;
  
  return message;
}

// --- Sentiment-based Response Enhancement ---
export function enhancePromptWithSentiment(
  basePrompt: string,
  sentimentResult: SentimentAnalysisResult,
  session: Session
): string {
  let enhancedPrompt = basePrompt;

  // Add sentiment context to prompt
  enhancedPrompt += `\n\n## SENTIMENT CONTEXT:
- Customer sentiment: ${sentimentResult.sentiment.sentiment} (score: ${sentimentResult.sentiment.score.toFixed(2)})
- Primary emotion: ${sentimentResult.emotion?.primaryEmotion || 'neutral'}
- Escalation level: ${sentimentResult.escalationLevel}/3
- Recommended action: ${sentimentResult.recommendedAction}
- Total interactions: ${session.totalInteractions || 0}
- Negative interactions: ${session.negativeInteractions || 0}

## RESPONSE GUIDELINES:
`;

  // Add specific guidelines based on sentiment
  switch (sentimentResult.recommendedAction) {
    case 'apologize':
      enhancedPrompt += `- WAJIB mulai dengan permintaan maaf yang tulus
- Gunakan tone yang sangat sopan dan empatik
- Tawarkan solusi konkret untuk masalah customer
- Hindari defensive language atau excuses`;
      break;
      
    case 'compensate':
      enhancedPrompt += `- Mulai dengan permintaan maaf
- Tawarkan kompensasi atau diskon sebagai goodwill
- Berikan solusi yang melebihi ekspektasi customer
- Pastikan customer merasa dihargai`;
      break;
      
    case 'escalate':
      enhancedPrompt += `- Response singkat dan sopan
- Informasikan bahwa akan dihandle oleh tim khusus
- Berikan estimasi waktu response
- Jangan berjanji yang tidak bisa dipenuhi`;
      break;
      
    default:
      enhancedPrompt += `- Response normal sesuai SOP
- Tetap ramah dan profesional
- Fokus pada solusi dan bantuan`;
  }

  return enhancedPrompt;
}

// --- Sentiment Analytics Helper ---
export function getSentimentAnalytics(session: Session) {
  const history = session.sentimentHistory || [];
  const total = history.length;
  
  if (total === 0) {
    return {
      totalInteractions: 0,
      negativeRate: 0,
      escalationRate: 0,
      averageSentiment: 0,
      trend: 'neutral',
    };
  }

  const negativeCount = history.filter(h => h.sentiment.sentiment === 'negative').length;
  const escalationCount = history.filter(h => h.escalationLevel >= 2).length;
  const averageSentiment = history.reduce((sum, h) => sum + h.sentiment.score, 0) / total;
  
  // Calculate trend (last 5 interactions)
  const recentHistory = history.slice(-5);
  const recentAverage = recentHistory.reduce((sum, h) => sum + h.sentiment.score, 0) / recentHistory.length;
  const trend = recentAverage > averageSentiment ? 'improving' : 
                recentAverage < averageSentiment ? 'declining' : 'stable';

  return {
    totalInteractions: total,
    negativeRate: (negativeCount / total) * 100,
    escalationRate: (escalationCount / total) * 100,
    averageSentiment,
    trend,
  };
}
