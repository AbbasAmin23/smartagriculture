'use server';

/**
 * @fileOverview An AI agent that provides smart advice to farmers based on weather and market trends.
 *
 * - getSmartFarmerAdvice - A function that returns AI-driven recommendations for farmers.
 * - SmartFarmerAdviceInput - The input type for the getSmartFarmerAdvice function.
 * - SmartFarmerAdviceOutput - The return type for the getSmartFarmerAdvice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const WeatherDataSchema = z.object({
  temperature: z.number().describe('The current temperature in Celsius.'),
  humidity: z.number().describe('The current humidity percentage.'),
  precipitation: z.string().describe('The amount of precipitation expected (e.g., rain, snow).'),
});

const MarketDataSchema = z.object({
  crop: z.string().describe('The name of the crop.'),
  pricePerUnit: z.number().describe('The current market price per unit (e.g., kg).'),
  demand: z.string().describe('Current demand for the crop (high, medium, low).'),
});

const SmartFarmerAdviceInputSchema = z.object({
  region: z.string().describe('The region or location of the farm.'),
  weatherData: WeatherDataSchema.describe('The current weather data for the region.'),
  marketData: z.array(MarketDataSchema).describe('The current market data for various crops.'),
});
export type SmartFarmerAdviceInput = z.infer<typeof SmartFarmerAdviceInputSchema>;

const RecommendationSchema = z.object({
  crop: z.string().describe('The recommended crop to plant.'),
  plantingTime: z.string().describe('The recommended time to plant the crop (e.g., season or month).'),
  reason: z.string().describe('The reasoning behind the recommendation.'),
});

const SmartFarmerAdviceOutputSchema = z.object({
  recommendations: z.array(RecommendationSchema).describe('AI-driven recommendations for the farmer.'),
});
export type SmartFarmerAdviceOutput = z.infer<typeof SmartFarmerAdviceOutputSchema>;

const shouldOutputAdviceTool = ai.defineTool({
  name: 'shouldOutputAdvice',
  description: 'Determines whether the current weather and market conditions warrant providing planting advice to the farmer.',
  inputSchema: z.object({
    weatherSummary: z.string().describe('A brief summary of the current weather conditions.'),
    marketSummary: z.string().describe('A brief summary of the current market conditions for relevant crops.'),
  }),
  outputSchema: z.boolean().describe('True if advice should be given, false otherwise.'),
}, async (input) => {
  // In a real application, this would contain more sophisticated logic.
  // For this example, we'll just return true if the weather is favorable and demand is high.
  return true;
});

export async function getSmartFarmerAdvice(input: SmartFarmerAdviceInput): Promise<SmartFarmerAdviceOutput> {
  return smartFarmerAdviceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'smartFarmerAdvicePrompt',
  tools: [shouldOutputAdviceTool],
  input: {schema: SmartFarmerAdviceInputSchema},
  output: {schema: SmartFarmerAdviceOutputSchema},
  prompt: `You are an AI assistant providing advice to farmers.

  The farmer is located in the region: {{{region}}}.

  The current weather conditions are:
  Temperature: {{{weatherData.temperature}}}°C
  Humidity: {{{weatherData.humidity}}}%
  Precipitation: {{{weatherData.precipitation}}}

  The current market data is:
  {{#each marketData}}
  Crop: {{{crop}}}, Price: {{{pricePerUnit}}}, Demand: {{{demand}}}
  {{/each}}

  {{#if (shouldOutputAdviceTool (json (concat "{\"weatherSummary\": \"" weatherData.precipitation "\", \"marketSummary\": \"" (json marketData) "\"}")))}}
  Based on this information, provide recommendations on which crops to plant and when, tailored to the region's weather conditions and current market prices. Provide the reasoning behind your recommendation.
  {{else}}
  The current weather and market conditions do not warrant providing planting advice at this time.
  {{/if}}
  `,
});

const smartFarmerAdviceFlow = ai.defineFlow(
  {
    name: 'smartFarmerAdviceFlow',
    inputSchema: SmartFarmerAdviceInputSchema,
    outputSchema: SmartFarmerAdviceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
