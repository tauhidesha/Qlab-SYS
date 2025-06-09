// src/ai/flows/visualize-repaint.ts
'use server';
/**
 * @fileOverview Visualizes a vehicle with a new paint color using generative AI.
 *
 * - visualizeRepaint - A function that handles the vehicle repaint visualization process.
 * - VisualizeRepaintInput - The input type for the visualizeRepaint function.
 * - VisualizeRepaintOutput - The return type for the visualizeRepaint function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VisualizeRepaintInputSchema = z.object({
  vehiclePhotoDataUri: z
    .string()
    .describe(
      "A photo of the vehicle to be repainted, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  repaintColor: z.string().describe('The desired repaint color for the vehicle.'),
});
export type VisualizeRepaintInput = z.infer<typeof VisualizeRepaintInputSchema>;

const VisualizeRepaintOutputSchema = z.object({
  transformedVehiclePhotoDataUri: z
    .string()
    .describe('A photo of the vehicle with the new paint color applied, as a data URI.'),
});
export type VisualizeRepaintOutput = z.infer<typeof VisualizeRepaintOutputSchema>;

export async function visualizeRepaint(input: VisualizeRepaintInput): Promise<VisualizeRepaintOutput> {
  return visualizeRepaintFlow(input);
}

const visualizeRepaintPrompt = ai.definePrompt({
  name: 'visualizeRepaintPrompt',
  input: {schema: VisualizeRepaintInputSchema},
  output: {schema: VisualizeRepaintOutputSchema},
  prompt: [
    {media: {url: '{{{vehiclePhotoDataUri}}}'}},
    {
      text:
        'Generate an image of this vehicle repainted with the color {{{repaintColor}}}. The generated image should retain the original vehicle, simply repainted.'
    }
  ],
  config: {
    responseModalities: ['TEXT', 'IMAGE']
  }
});

const visualizeRepaintFlow = ai.defineFlow(
  {
    name: 'visualizeRepaintFlow',
    inputSchema: VisualizeRepaintInputSchema,
    outputSchema: VisualizeRepaintOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      prompt: visualizeRepaintPrompt.prompt(input),
      model: 'googleai/gemini-2.0-flash-exp',
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    return {transformedVehiclePhotoDataUri: media.url!};
  }
);
