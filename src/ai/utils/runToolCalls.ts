// @file: src/ai/utils/runToolCalls.ts

import { toolFunctionMap } from '../config/aiConfig';

export async function runToolCalls(
  toolCalls: {
    toolName: string;
    arguments: any;
    id: string;
  }[],
  extraContext: { input?: any; session?: any } = {}
) {
  const results = [];

  for (const call of toolCalls) {
    const { toolName, id } = call;

    let parsedArgs: any;
    try {
      parsedArgs = typeof call.arguments === 'string'
        ? JSON.parse(call.arguments)
        : call.arguments;
    } catch (err) {
      console.warn(`[runToolCalls] Gagal parse arguments untuk tool '${toolName}':`, err);
      parsedArgs = {};
    }

    const toolObj = toolFunctionMap[toolName];
    if (!toolObj || typeof toolObj.implementation !== 'function') {
      console.warn(`[runToolCalls] Tool '${toolName}' not found or invalid.`);
      continue;
    }

    const senderNumber =
      extraContext.input?.senderNumber || extraContext.session?.senderNumber || null;
    const senderName =
      extraContext.input?.senderName || extraContext.session?.senderName || null;

    const input = {
      ...(extraContext.input || {}),
      senderNumber,
      senderName,
    };

    console.log(`[runToolCalls] Menjalankan tool '${toolName}' untuk`, senderNumber);

    try {
      // --- PATCH FINAL & BERSIH ---
      // Karena semua tool menggunakan normalizeInput, kita hanya perlu
      // menyebarkan argumen ke level atas.
      const toolResult = await toolObj.implementation({
        ...parsedArgs,
        toolCall: call,
        input,
        session: extraContext.session || {},
      });

      results.push({
        role: 'tool',
        tool_call_id: id,
        content: JSON.stringify(toolResult),
      });
    } catch (err) {
      console.error(`[runToolCalls] Error executing tool '${toolName}':`, err);
      results.push({
        role: 'tool',
        tool_call_id: id,
        content: JSON.stringify({
          success: false,
          error: 'tool_execution_failed',
          message: err?.message || 'Unknown error',
        }),
      });
    }
  }

  return results;
}

export function createToolCallMessage(toolCalls: {
  toolName: string;
  arguments: any;
  id: string;
}[]) {
  return {
    role: 'assistant' as const,
    content: null,
    tool_calls: toolCalls.map((tool) => ({
      id: tool.id,
      type: 'function',
      function: {
        name: tool.toolName,
        arguments: JSON.stringify(tool.arguments),
      },
    })),
  };
}