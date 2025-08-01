export interface Session {
  senderNumber: string;
  senderName?: string;
  lastInteraction: {
    type: string;
    at: number;
  };
  cartServices: any[];
  history: any[];
  lastAssistantMessage?: string;
  followUpState?: {
    level: number;
    flaggedAt: number;
    context: string;
  };
}
