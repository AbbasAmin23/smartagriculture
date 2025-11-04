'use server';

import { getSmartFarmerAdvice, type SmartFarmerAdviceInput, type SmartFarmerAdviceOutput } from '@/ai/flows/smart-farmer-advice';
import { marketPrices, weatherData } from '@/lib/mock-data';

export async function getAdviceAction(): Promise<SmartFarmerAdviceOutput | { error: string }> {
  try {
    const input: SmartFarmerAdviceInput = {
      region: weatherData.region,
      weatherData: {
        temperature: weatherData.temperature,
        humidity: weatherData.humidity,
        precipitation: weatherData.precipitation,
      },
      marketData: marketPrices.map(item => ({
        crop: item.name,
        pricePerUnit: item.price,
        demand: item.trend === 'up' ? 'high' : item.trend === 'down' ? 'low' : 'medium',
      })),
    };

    const advice = await getSmartFarmerAdvice(input);
    return advice;
  } catch (error) {
    console.error('Error getting smart advice:', error);
    return { error: 'Failed to get advice. Please try again later.' };
  }
}
