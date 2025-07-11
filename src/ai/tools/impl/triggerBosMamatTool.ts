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

  // ✅ implementasi tool
  implementation: async ({ reason, customerQuestion }, context) => {
    await setSnoozeMode(context.senderNumber);
    await notifyBosMamat(context.senderNumber, customerQuestion, reason); // ✅ 3 argumen sesuai definisi terbaru

    return {
      result: 'success',
      message: 'Zoya sudah hubungi Bos Mamat, tinggal tunggu jawabannya.',
    };
  },

  // ✅ definisi tool untuk OpenAI
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
