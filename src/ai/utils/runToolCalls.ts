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
  type ToolCallResult = { role: string; tool_call_id: string; content: string };
  const results: ToolCallResult[] = [];

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


    // PATCH: Untuk searchKnowledgeBaseTool, pastikan query selalu pertanyaan lengkap user
    if (toolName === 'searchKnowledgeBase') {

      // Cek dari input.originalQuestion, session.lastUserMessage, atau fallback ke parsedArgs.query
      const fullQuestion =
        extraContext.input?.originalQuestion ||
        extraContext.session?.lastUserMessage ||
        parsedArgs.query;
      parsedArgs.query = fullQuestion;
    }

    // PATCH: Override hanya jika field memang ada di parameter tool
    const toolDef = toolFunctionMap[toolName]?.toolDefinition?.function;
    if (toolDef && toolDef.parameters && toolDef.parameters.properties) {
      // service_name
      if ('service_name' in toolDef.parameters.properties) {
        const mappedServiceArr = extraContext.session?.inquiry?.lastMentionedService;
        const mappedService = Array.isArray(mappedServiceArr) ? mappedServiceArr[0] : undefined;
        if (mappedService) {
          parsedArgs.service_name = mappedService;
        }
      }
      // size
      if ('size' in toolDef.parameters.properties) {
        const mappedSize = extraContext.session?.inquiry?.lastMotorSize;
        if (mappedSize) {
          parsedArgs.size = mappedSize;
        }
      }
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
      // Validasi argumen wajib untuk triggerBosMatTool
      if (toolName === 'triggerBosMatTool') {
        const reason = parsedArgs?.reason || input?.reason;
        const customerQuestion = parsedArgs?.customerQuestion || input?.customerQuestion;
        if (!reason || !customerQuestion) {
          const errMsg = '[runToolCalls] triggerBosMatTool dipanggil tanpa reason atau customerQuestion.';
          console.error(errMsg);
          results.push({
            role: 'tool',
            tool_call_id: id,
            content: JSON.stringify({
              success: false,
              error: 'missing_arguments',
              message: errMsg,
            }),
          });
          return results;
        }
      }
      // PATCH: Jika tool getServiceDescriptionTool, return hasil mentah tanpa proses summary/polishing
      const toolResult = await toolObj.implementation({
        ...parsedArgs,
        toolCall: call,
        input,
        session: extraContext.session || {},
      });

    if (toolName === 'getServiceDescription') {
      // Return hasil mentah, tidak diubah
      results.push({
        role: 'tool',
        tool_call_id: id,
        content: typeof toolResult === 'string' ? toolResult : JSON.stringify(toolResult),
      });
    } else {
      results.push({
        role: 'tool',
        tool_call_id: id,
        content: JSON.stringify(toolResult),
      });
    }
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