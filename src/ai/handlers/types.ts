// @file: src/ai/handlers/types.ts

import type { Session } from '@/types/ai';
import type { ZoyaChatInput } from '@/types/ai/cs-whatsapp-reply';

/**
 * Mendefinisikan struktur output yang HARUS dikembalikan oleh setiap fungsi handler.
 */
export interface RouteHandlerOutput {
  reply: {
    message: string;
  };
  updatedSession: Partial<Session>;
  // ✅ INI BAGIAN KUNCI: Pastikan baris ini ada dan tidak ada typo.
  // Properti opsional untuk tool calls.
  toolCalls?: {
    toolName: string;
    arguments: any;
  }[];
}

/**
 * Mendefinisikan struktur parameter yang diterima oleh setiap fungsi handler.
 */
export interface RouteHandlerParams {
  message: string;
  session: Session;
  senderNumber: string;
  senderName?: string;
  chatHistory?: ZoyaChatInput['chatHistory'];
}

/**
 * Mendefinisikan "kontrak" atau tipe untuk semua fungsi handler rute.
 */
export type RouteHandlerFn = (
  params: RouteHandlerParams
) => Promise<RouteHandlerOutput>;
