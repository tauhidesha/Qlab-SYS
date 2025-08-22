export interface SentimentResult {
  score: number; // -1.0 to 1.0 (negative to positive)
  magnitude: number; // 0.0 to infinity (intensity)
  sentiment: 'positive' | 'negative' | 'neutral';
  confidence: number; // 0.0 to 1.0
}

export interface EmotionResult {
  emotions: string[]; // ['angry', 'frustrated', 'happy', 'satisfied', etc.]
  primaryEmotion: string;
  intensity: number; // 0.0 to 1.0
}

export interface SentimentAnalysisResult {
  sentiment: SentimentResult;
  emotion?: EmotionResult;
  escalationLevel: number; // 0-3 (0=normal, 3=urgent)
  shouldEscalate: boolean;
  recommendedAction: 'normal_response' | 'apologize' | 'compensate' | 'escalate';
}

export interface SentimentHistory {
  timestamp: number;
  message: string;
  sentiment: SentimentResult;
  emotion?: EmotionResult;
  escalationLevel: number;
  actionTaken: string;
}

export interface SessionSentiment {
  currentSentiment: SentimentAnalysisResult;
  sentimentHistory: SentimentHistory[];
  totalInteractions: number;
  negativeInteractions: number;
  escalationCount: number;
  lastEscalationAt?: number;
}
