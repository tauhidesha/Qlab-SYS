

import type { SessionData } from '../../utils/session';

// Tipe yang lebih fleksibel untuk pesan chat history,
// sesuai dengan tipe data yang mungkin datang dari OpenAI.
export interface ChatHistoryMessage {
    role?: 'user' | 'assistant' | 'system' | 'tool';
    content?: string | null;
    // Kita bisa tambahkan properti lain jika dibutuhkan di masa depan
    tool_calls?: any;
    tool_call_id?: string;
}

// Ini adalah "cetak biru" untuk objek input yang diterima oleh SEMUA handler.
export interface RouteHandlerInput {
  session: SessionData | null;
  message?: string;
  chatHistory?: ChatHistoryMessage[];
  senderNumber?: string;
  senderName?: string;
}

// --- INI PERBAIKANNYA ---
// Kita buat tipe untuk objek balasan yang lebih fleksibel.
export interface ReplyShape {
    // Keduanya dibuat opsional agar bisa menerima salah satu.
    message?: string;
    suggestedReply?: string;
}

// Ini adalah "cetak biru" untuk objek yang DIKEMBALIKAN oleh SEMUA handler.
export interface RouteHandlerOutput {
  reply: ReplyShape; // <-- Menggunakan tipe baru yang lebih fleksibel
  updatedSession: Partial<SessionData> | SessionData | null;
}
// -------------------------

// Ini adalah tipe data untuk fungsi handler itu sendiri.
export type RouteHandlerFn = (
  input: RouteHandlerInput,
) => Promise<RouteHandlerOutput>;
