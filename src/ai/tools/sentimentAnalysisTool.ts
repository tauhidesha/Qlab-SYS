import { LanguageServiceClient } from '@google-cloud/language';
import { SentimentAnalysisResult, SentimentResult, EmotionResult } from '@/types/ai/sentiment';

// Initialize Google Cloud Natural Language client (optional)
let languageClient: LanguageServiceClient | null = null;

try {
  if (process.env.GOOGLE_CLOUD_API_KEY || process.env.GOOGLE_CLOUD_KEY_FILE) {
    languageClient = new LanguageServiceClient({
      keyFilename: process.env.GOOGLE_CLOUD_KEY_FILE,
      projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
    });

    // Note: API key authentication is handled automatically by the client
    // No need to manually set authClient
  }
} catch (error) {
  console.warn('[SentimentAnalysis] Google Cloud credentials not available, using offline mode');
  languageClient = null;
}

// --- Sentiment Analysis Function ---
export async function analyzeSentiment(text: string): Promise<SentimentAnalysisResult> {
  try {
    console.log('[SentimentAnalysis] Analyzing text:', text.substring(0, 100) + '...');

    // Use Google Cloud API if available, otherwise use offline analysis
    if (languageClient) {
      try {
        // Prepare document for analysis
        const document = {
          content: text,
          type: 'PLAIN_TEXT' as const,
          language: 'id', // Indonesian
        };

        // Analyze sentiment using Google Cloud API
        const [sentimentResult] = await languageClient.analyzeSentiment({ document });
        const sentiment = sentimentResult.documentSentiment;

        if (!sentiment) {
          throw new Error('No sentiment result received');
        }

        // Process sentiment data
        const sentimentData: SentimentResult = {
          score: sentiment.score || 0,
          magnitude: sentiment.magnitude || 0,
          sentiment: getSentimentCategory(sentiment.score || 0),
          confidence: Math.abs(sentiment.score || 0), // Use absolute score as confidence
        };

        // Analyze emotions (basic implementation)
        const emotionData = analyzeEmotions(text, sentimentData);

        // Determine escalation level and action
        const escalationLevel = determineEscalationLevel(sentimentData, emotionData);
        const shouldEscalate = escalationLevel >= 3;
        const recommendedAction = determineRecommendedAction(escalationLevel);

        const result: SentimentAnalysisResult = {
          sentiment: sentimentData,
          emotion: emotionData,
          escalationLevel,
          shouldEscalate,
          recommendedAction,
        };

        console.log('[SentimentAnalysis] Google Cloud Result:', {
          score: sentimentData.score,
          sentiment: sentimentData.sentiment,
          escalationLevel,
          shouldEscalate,
          recommendedAction,
        });

        return result;

      } catch (apiError) {
        console.warn('[SentimentAnalysis] Google Cloud API failed, falling back to offline analysis:', apiError);
        // Fall through to offline analysis
      }
    }

    // Offline sentiment analysis (keyword-based)
    console.log('[SentimentAnalysis] Using offline analysis');
    return performOfflineSentimentAnalysis(text);

  } catch (error) {
    console.error('[SentimentAnalysis] Error:', error);
    
    // Return neutral sentiment as final fallback
    return {
      sentiment: {
        score: 0,
        magnitude: 0,
        sentiment: 'neutral',
        confidence: 0,
      },
      escalationLevel: 0,
      shouldEscalate: false,
      recommendedAction: 'normal_response',
    };
  }
}

// --- Helper Functions ---

function getSentimentCategory(score: number): 'positive' | 'negative' | 'neutral' {
  if (score > 0.1) return 'positive';
  if (score < -0.1) return 'negative';
  return 'neutral';
}

function analyzeEmotions(text: string, sentiment: SentimentResult): EmotionResult {
  const lowerText = text.toLowerCase();
  const emotions: string[] = [];
  let primaryEmotion = 'neutral';
  let intensity = Math.abs(sentiment.score);

  // Basic emotion detection based on keywords
  const emotionKeywords = {
    angry: ['marah', 'kesal', 'jengkel', 'sebel', 'ngamuk', 'dendam', 'benci'],
    frustrated: ['frustasi', 'capek', 'lelah', 'bosan', 'muak', 'kesal'],
    happy: ['senang', 'bahagia', 'gembira', 'puas', 'suka', 'terima kasih'],
    satisfied: ['puas', 'senang', 'bagus', 'mantap', 'oke', 'baik'],
    confused: ['bingung', 'tidak mengerti', 'apa maksudnya', 'gimana'],
    worried: ['khawatir', 'cemas', 'takut', 'was-was', 'ragu'],
    disappointed: ['kecewa', 'sedih', 'menyesal', 'sayang'],
  };

  // Check for emotion keywords
  for (const [emotion, keywords] of Object.entries(emotionKeywords)) {
    if (keywords.some(keyword => lowerText.includes(keyword))) {
      emotions.push(emotion);
      if (emotion !== 'neutral') {
        primaryEmotion = emotion;
      }
    }
  }

  // Adjust intensity based on sentiment magnitude
  intensity = Math.min(1.0, sentiment.magnitude / 10);

  return {
    emotions,
    primaryEmotion,
    intensity,
  };
}

function determineEscalationLevel(sentiment: SentimentResult, emotion: EmotionResult): number {
  let level = 0;

  // Base level from sentiment score
  if (sentiment.score < -0.5) level += 2;
  else if (sentiment.score < -0.2) level += 1;

  // Adjust based on emotion
  if (emotion.primaryEmotion === 'angry') level += 2;
  else if (emotion.primaryEmotion === 'frustrated') level += 1;
  else if (emotion.primaryEmotion === 'worried') level += 1;

  // Adjust based on magnitude (intensity)
  if (sentiment.magnitude > 5) level += 1;

  return Math.min(3, level);
}

function determineRecommendedAction(escalationLevel: number): 'normal_response' | 'apologize' | 'compensate' | 'escalate' {
  switch (escalationLevel) {
    case 0:
    case 1:
      return 'normal_response';
    case 2:
      return 'apologize';
    case 3:
      return 'escalate';
    default:
      return 'normal_response';
  }
}

// --- Offline Sentiment Analysis ---
function performOfflineSentimentAnalysis(text: string): SentimentAnalysisResult {
  const lowerText = text.toLowerCase();
  
  // Positive keywords
  const positiveKeywords = [
    'terima kasih', 'bagus', 'puas', 'senang', 'bahagia', 'gembira', 'suka', 
    'mantap', 'oke', 'baik', 'sempurna', 'luar biasa', 'keren', 'wow',
    'recommend', 'recommended', 'satisfied', 'happy', 'great', 'excellent'
  ];
  
  // Negative keywords
  const negativeKeywords = [
    'marah', 'kesal', 'jengkel', 'sebel', 'ngamuk', 'dendam', 'benci',
    'frustasi', 'frustrated', 'capek', 'lelah', 'bosan', 'muak', 'kecewa', 'sedih',
    'menyesal', 'sayang', 'mahal', 'tidak worth', 'rusak', 'ribet',
    'buruk', 'jelek', 'sial', 'celaka', 'sialan', 'bodoh', 'goblok'
  ];
  
  // Count positive and negative keywords
  let positiveCount = 0;
  let negativeCount = 0;
  
  positiveKeywords.forEach(keyword => {
    if (lowerText.includes(keyword)) positiveCount++;
  });
  
  negativeKeywords.forEach(keyword => {
    if (lowerText.includes(keyword)) negativeCount++;
  });
  
  // Calculate sentiment score
  let score = 0;
  let sentiment: 'positive' | 'negative' | 'neutral' = 'neutral';
  
  if (positiveCount > negativeCount) {
    score = Math.min(1.0, (positiveCount - negativeCount) * 0.3);
    sentiment = 'positive';
  } else if (negativeCount > positiveCount) {
    score = Math.max(-1.0, (negativeCount - positiveCount) * -0.3);
    sentiment = 'negative';
  }
  
  // Calculate magnitude (intensity)
  const magnitude = Math.max(positiveCount, negativeCount) * 0.5;
  
  // Analyze emotions
  const emotionData = analyzeEmotions(text, {
    score,
    magnitude,
    sentiment,
    confidence: Math.abs(score),
  });
  
  // Determine escalation level
  const escalationLevel = determineEscalationLevel(
    { score, magnitude, sentiment, confidence: Math.abs(score) },
    emotionData
  );
  
  const result: SentimentAnalysisResult = {
    sentiment: {
      score,
      magnitude,
      sentiment,
      confidence: Math.abs(score),
    },
    emotion: emotionData,
    escalationLevel,
    shouldEscalate: escalationLevel >= 3,
    recommendedAction: determineRecommendedAction(escalationLevel),
  };
  
  console.log('[SentimentAnalysis] Offline Result:', {
    score: result.sentiment.score.toFixed(3),
    sentiment: result.sentiment.sentiment,
    escalationLevel: result.escalationLevel,
    shouldEscalate: result.shouldEscalate,
    recommendedAction: result.recommendedAction,
  });
  
  return result;
}

// --- Tool Definition for AI Integration ---
export const sentimentAnalysisTool = {
  toolDefinition: {
    type: 'function' as const,
    function: {
      name: 'analyzeSentiment',
      description: 'Analyze sentiment and emotions in customer message to determine appropriate response strategy',
      parameters: {
        type: 'object',
        properties: {
          text: {
            type: 'string',
            description: 'Customer message text to analyze',
          },
        },
        required: ['text'],
      },
    },
  },
  implementation: analyzeSentiment,
};
