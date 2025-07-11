// src/ai/utils/runToolCalls.ts
import { toolFunctionMap } from '../config/aiConfig';

export async function runToolCalls(toolCalls: {
  toolName: string;
  arguments: any;
  id: string;
}[], extraContext: { input?: any; session?: any } = {}) {
  const results = [];

  for (const call of toolCalls) {
    const { toolName, arguments: args, id } = call;

    const toolObj = toolFunctionMap[toolName];
    if (!toolObj || typeof toolObj.implementation !== 'function') {
      console.warn(`[runToolCalls] Tool '${toolName}' not found or invalid.`);
      continue;
    }

    try {
      const toolResult = await toolObj.implementation({
        arguments: args,
        toolCall: call,
        input: extraContext.input || {},
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
