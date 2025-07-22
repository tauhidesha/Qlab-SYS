// src/ai/tools/impl/triggerBosMamatTool.ts

import type { ToolFunction } from '@/types/ai/ToolFunction';
import { notifyBosMat, setSnoozeMode } from '@/ai/utils/humanHandoverTool';
import type { OpenAI } from 'openai';
import { z } from 'zod';

// Definisikan skema dengan Zod untuk validasi internal
const inputSchema = z.object({
  reason: z.string().describe('Alasan Zoya perlu tanya ke BosMat (misalnya: warna efek custom, motor langka, dsb)'),
  customerQuestion: z.string().describe('Pertanyaan asli dari customer yang perlu ditanyain ke BosMat'),
});

// DIPERBAIKI: Definisikan JSON Schema untuk OpenAI secara manual sebagai konstanta
const jsonSchemaParameters = {
  type: 'object' as const,
  properties: {
    reason: {
      type: 'string' as const,
    description: 'Alasan Zoya perlu tanya ke BosMat (misalnya: warna efek custom, motor langka, dsb)',
    },
    customerQuestion: {
      type: 'string' as const,
    description: 'Pertanyaan asli dari customer yang perlu ditanyain ke BosMat',
    },
  },
  required: ['reason', 'customerQuestion'],
};


export const triggerBosMatTool: ToolFunction & {
  toolDefinition: OpenAI.Chat.Completions.ChatCompletionTool;
} = {
  name: 'triggerBosMatTool',
  description: 'Digunakan saat Zoya butuh bantuan BosMat karena tidak yakin jawabannya atau pertanyaannya terlalu spesifik.',
  
  // Gunakan konstanta JSON Schema yang sudah kita definisikan
  parameters: jsonSchemaParameters,

  implementation: async ({ arguments: args, toolCall, input }) => {
    // ... (implementasi Anda dari sebelumnya sudah bagus, tidak perlu diubah) ...
    let parsedArgs: z.infer<typeof inputSchema>;
    try {
      let rawArgs = args || toolCall?.arguments;

      if (typeof rawArgs === 'string') {
        try {
          rawArgs = JSON.parse(rawArgs);
        } catch (e) {
          throw new Error('Argumen tool adalah string JSON yang tidak valid.');
        }
      }
      
      parsedArgs = inputSchema.parse(rawArgs);

    } catch (error) {
      console.error('[triggerBosMamatTool] Gagal mem-validasi argumen:', error);
      throw new Error(`[triggerBosMamatTool] Argumen tidak lengkap atau tidak valid. Error: ${error}`);
    }
    
    const { reason, customerQuestion } = parsedArgs;

    const senderNumber = input?.senderNumber;
    if (!senderNumber) {
        throw new Error('[triggerBosMamatTool] senderNumber tidak ditemukan di dalam input. Handover dibatalkan.');
    }

    console.log('[triggerBosMatTool] Kirim ke BosMat:', {
      senderNumber,
      reason,
      customerQuestion,
    });

    await setSnoozeMode(senderNumber);
    await notifyBosMat(senderNumber, customerQuestion, reason);

    return {
      result: 'success',
      message: `Notifikasi untuk menanyakan "${customerQuestion}" telah berhasil dikirim ke BosMat.`,
    };
  },

  toolDefinition: {
    type: 'function',
    function: {
      name: 'triggerBosMatTool',
      description: 'Digunakan saat Zoya butuh bantuan BosMat karena tidak yakin jawabannya atau pertanyaannya terlalu spesifik.',
      // Gunakan konstanta JSON Schema yang sama di sini
      parameters: jsonSchemaParameters,
    },
  },
};