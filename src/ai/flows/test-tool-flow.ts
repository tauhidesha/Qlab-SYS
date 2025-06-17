'use server';
/**
 * @fileOverview A simple test flow with a dummy tool.
 *
 * - testToolFlow - A function that invokes a prompt with a dummy tool.
 */
import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const dummyTool = ai.defineTool({
  name: 'dummyTool',
  description: 'A dummy tool that returns a string based on input.',
  inputSchema: z.object({ query: z.string().describe("The query for the dummy tool.") }),
  outputSchema: z.object({ result: z.string().describe("The result from the dummy tool.") }),
}, async ({ query }) => {
  console.log(`[dummyTool] Received query: ${query}`);
  return { result: `Dummy tool successfully processed: ${query}` };
});

const testPrompt = ai.definePrompt({
  name: 'testToolPrompt',
  tools: [dummyTool], // Making the tool available to this prompt
  input: { schema: z.object({ message: z.string().describe("The user's message.") }) },
  output: { schema: z.object({ reply: z.string().describe("The AI's reply.") }) },
  prompt: `User says: {{{message}}}. 
  If the user's message contains the word 'testtool', use the dummyTool with the user's entire message as the query. 
  Otherwise, just reply normally.`,
});

export async function testToolFlow(input: { message: string }): Promise<{ reply: string }> {
  console.log(`[testToolFlow] Received input: ${input.message}`);
  const { output } = await testPrompt(input);
  if (!output) {
    throw new Error("Failed to get output from testToolPrompt.");
  }
  console.log(`[testToolFlow] Output from prompt:`, output);
  return output;
}

const testToolGenkitFlow = ai.defineFlow(
  {
    name: 'testToolFlow', // This name will appear in Genkit Dev UI
    inputSchema: z.object({ message: z.string() }),
    outputSchema: z.object({ reply: z.string() }),
  },
  async (input) => {
    return testToolFlow(input);
  }
);
