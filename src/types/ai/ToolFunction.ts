import type { ZoyaChatInput } from './cs-whatsapp-reply';

export type ToolFunctionContext = {
  senderNumber: string;
  senderName?: string;
  session?: any;
  input?: ZoyaChatInput;
};

export type ToolFunctionResult = {
  result: 'success' | 'error';
  message: string;
  data?: any;
};

export type ToolFunction = {
  name: string;
  description: string;
  parameters: {
    type: 'object';
    properties: Record<string, any>;
    required?: string[];
  };
  implementation: (
    args: Record<string, any>,
    context: ToolFunctionContext
  ) => Promise<ToolFunctionResult>;
};
