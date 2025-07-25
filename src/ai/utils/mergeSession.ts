// File: src/ai/utils/mergeSession.ts
import type { Session } from '@/types/ai';

export function mergeSession(
  oldSession: Session,
  updates: Partial<Session>
): Session {
  return {
    ...oldSession,
    ...updates,
    inquiry: {
      ...(oldSession.inquiry || {}),
      ...(updates.inquiry || {}),
    },
    followUpState: updates.followUpState ?? oldSession.followUpState,
    flow: updates.flow ?? oldSession.flow ?? 'general',
    lastInteraction: updates.lastInteraction ?? oldSession.lastInteraction,
    snoozeUntil: updates.snoozeUntil ?? oldSession.snoozeUntil,
  };
}
