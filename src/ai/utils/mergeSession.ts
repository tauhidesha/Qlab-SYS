// File: src/ai/utils/mergeSession.ts
import type { SessionData } from './session';

export function mergeSession(
  oldSession: SessionData,
  updates: Partial<SessionData>
): SessionData {
  return {
    ...oldSession,
    ...updates,
    inquiry: {
      ...(oldSession.inquiry || {}),
      ...(updates.inquiry || {}),
    },
    followUpState: updates.followUpState ?? oldSession.followUpState ?? null,
    senderName: updates.senderName ?? oldSession.senderName ?? 'Pelanggan WhatsApp',
    flow: updates.flow ?? oldSession.flow ?? 'general',
    lastRoute: updates.lastRoute ?? oldSession.lastRoute ?? 'init',
    lastInteraction: updates.lastInteraction ?? oldSession.lastInteraction,
    snoozeUntil: updates.snoozeUntil ?? oldSession.snoozeUntil,
  };
}
