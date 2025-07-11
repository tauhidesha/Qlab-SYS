// src/ai/tools/impl/triggerBosMamatTool.ts

import type { ToolFunction } from '@/types/ai/ToolFunction';
import { notifyBosMamat, setSnoozeMode } from '@/ai/utils/humanHandoverTool';
import type { OpenAI } from 'openai';

export const triggerBosMamatTool: ToolFunction & {
  toolDefinition: OpenAI.Chat.Completions.ChatCompletionTool;
} = {
  name: 'triggerBosMamatTool',
  description:
    'Digunakan saat Zoya butuh bantuan Bos Mamat karena tidak yakin jawabannya atau pertanyaannya terlalu spesifik.',
  parameters: {
    type: 'object',
    properties: {
      reason: {
        type: 'string',
        description:
          'Alasan Zoya perlu tanya ke Bos Mamat (misalnya: warna efek custom, motor langka, dsb)',
      },
      customerQuestion: {
        type: 'string',
        description: 'Pertanyaan asli dari customer yang perlu ditanyain ke Bos Mamat',
      },
    },
    required: ['reason', 'customerQuestion'],
  },

  // ✅ Implementasi tool yang aman dan robust
  implementation: async ({ arguments: args = {}, session, input }) => {
    const { reason, customerQuestion } = args;

    if (!reason || !customerQuestion) {
      throw new Error(
        '[triggerBosMamatTool] Tool dipanggil tanpa reason atau customerQuestion.'
      );
    }

    const senderNumber = input?.senderNumber || 'unknown';

    console.log('[triggerBosMamatTool] Mengirim ke Bos Mamat:', {
      senderNumber,
      reason,
      customerQuestion,
    });

    await setSnoozeMode(senderNumber);
    await notifyBosMamat(senderNumber, customerQuestion, reason);

    return {
      result: 'success',
      message: 'Zoya sudah hubungi Bos Mamat, tinggal tunggu jawabannya.',
    };
  },

  // ✅ Definisi tool untuk OpenAI agar bisa dipanggil via GPT
  toolDefinition: {
    type: 'function',
    function: {
      name: 'triggerBosMamatTool',
      description:
        'Digunakan saat Zoya butuh bantuan Bos Mamat karena tidak yakin jawabannya atau pertanyaannya terlalu spesifik.',
      parameters: {
        type: 'object',
        properties: {
          reason: {
            type: 'string',
            description:
              'Alasan Zoya perlu tanya ke Bos Mamat (misalnya: warna efek custom, motor langka, dsb)',
          },
          customerQuestion: {
            type: 'string',
            description: 'Pertanyaan asli dari customer yang perlu ditanyain ke Bos Mamat',
          },
        },
        required: ['reason', 'customerQuestion'],
      },
    },
  },
};
