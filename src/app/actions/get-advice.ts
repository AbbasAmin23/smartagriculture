'use server';

import { getSmartFarmerAdvice, type SmartFarmerAdviceInput, type SmartFarmerAdviceOutput } from '@/ai/flows/smart-farmer-advice';
import { getFirestore, doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';

export async function getAdviceAction(): Promise<SmartFarmerAdviceOutput | { error: string }> {
  try {
    const { firestore } = initializeFirebase();
    
    // Fetch weather data
    const weatherDocRef = doc(firestore, 'weatherUpdates', 'pune');
    const weatherSnap = await getDoc(weatherDocRef);
    if (!weatherSnap.exists()) {
      return { error: 'Weather data not found.' };
    }
    const weatherData = weatherSnap.data();

    // Fetch market data
    const marketCollectionRef = collection(firestore, 'marketData');
    const marketSnaps = await getDocs(marketCollectionRef);
    const marketPrices = marketSnaps.docs.map(doc => doc.data());

    const input: SmartFarmerAdviceInput = {
      region: weatherData.region,
      weatherData: {
        temperature: weatherData.temperatureCelsius,
        humidity: weatherData.humidity,
        precipitation: weatherData.condition,
      },
      marketData: marketPrices.map(item => ({
        crop: item.vegetableName,
        pricePerUnit: item.pricePerKg,
        // Trend is mocked for now as it's not in the schema
        demand: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)],
      })),
    };

    const advice = await getSmartFarmerAdvice(input);
    return advice;
  } catch (error) {
    console.error('Error getting smart advice:', error);
    if (error instanceof Error) {
        return { error: `Failed to get advice: ${error.message}` };
    }
    return { error: 'Failed to get advice. Please try again later.' };
  }
}
