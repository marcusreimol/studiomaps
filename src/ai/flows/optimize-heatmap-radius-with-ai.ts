'use server';
/**
 * @fileOverview An AI tool that optimizes the radius of heatmap points for effective data visualization.
 *
 * - optimizeHeatmapRadius - A function that adjusts the heatmap radius.
 * - OptimizeHeatmapRadiusInput - The input type for the optimizeHeatmapRadius function.
 * - OptimizeHeatmapRadiusOutput - The return type for the optimizeHeatmapRadius function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeHeatmapRadiusInputSchema = z.object({
  zoomLevel: z
    .number()
    .describe('The current zoom level of the map. Higher values indicate closer zoom.'),
  dataPointDensity: z
    .number()
    .describe(
      'The density of data points in the current map view. Higher values indicate more clustered points.'
    ),
  currentRadius: z
    .number()
    .describe('The current radius of the heatmap points in pixels.'),
});
export type OptimizeHeatmapRadiusInput = z.infer<
  typeof OptimizeHeatmapRadiusInputSchema
>;

const OptimizeHeatmapRadiusOutputSchema = z.object({
  optimizedRadius: z
    .number()
    .describe(
      'The optimized radius of the heatmap points in pixels, adjusted for the given zoom level and data point density.'
    ),
  reasoning: z
    .string()
    .describe(
      'The AI reasoning behind the radius adjustment, explaining how it improves data visualization.'
    ),
});
export type OptimizeHeatmapRadiusOutput = z.infer<
  typeof OptimizeHeatmapRadiusOutputSchema
>;

export async function optimizeHeatmapRadius(
  input: OptimizeHeatmapRadiusInput
): Promise<OptimizeHeatmapRadiusOutput> {
  return optimizeHeatmapRadiusFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeHeatmapRadiusPrompt',
  input: {schema: OptimizeHeatmapRadiusInputSchema},
  output: {schema: OptimizeHeatmapRadiusOutputSchema},
  prompt: `You are an AI expert in data visualization, specializing in optimizing heatmap displays on interactive maps.
Given the current zoom level ({{zoomLevel}}), data point density ({{dataPointDensity}}), and current heatmap radius ({{currentRadius}}), determine the optimal radius for heatmap points to improve data visualization.

Consider the following factors:
- **Zoom Level**: Higher zoom levels require smaller radii to prevent excessive overlap.
- **Data Point Density**: Higher density requires smaller radii to distinguish individual points, while lower density may benefit from larger radii to enhance visibility.

Provide the optimized radius value and a brief explanation of your reasoning. Return the result as a JSON object.
`,
});

const optimizeHeatmapRadiusFlow = ai.defineFlow(
  {
    name: 'optimizeHeatmapRadiusFlow',
    inputSchema: OptimizeHeatmapRadiusInputSchema,
    outputSchema: OptimizeHeatmapRadiusOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
