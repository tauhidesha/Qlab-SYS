// app/ai/handlers/types.ts
import type { SessionData } from '@/ai/utils/session';
import type { WhatsAppReplyOutput } from '@/types/ai/cs-whatsapp-reply';

export type RouteHandlerFn = (params: {
  message: string;
  session: SessionData;
  phone: string;
}) => Promise<{
  reply: WhatsAppReplyOutput;
  updatedSession: SessionData;
}>;
