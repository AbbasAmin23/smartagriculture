import { Apple, Carrot, Leaf } from 'lucide-react';

export const user = {
  name: 'Ramesh Kumar',
  email: 'ramesh.kumar@example.com',
  avatarId: '1',
};

export const weatherData = {
  region: 'Pune, Maharashtra',
  temperature: 28,
  humidity: 75,
  precipitation: 'Light showers',
  wind: 12,
  forecast: [
    { day: 'Mon', temp: 29, icon: 'CloudSun' },
    { day: 'Tue', temp: 31, icon: 'Sun' },
    { day: 'Wed', temp: 27, icon: 'CloudRain' },
    { day: 'Thu', temp: 28, icon: 'CloudLightning' },
    { day: 'Fri', temp: 30, icon: 'Sun' },
  ],
};

const generateRandomPrices = () => Array.from({ length: 7 }, () => Math.floor(Math.random() * 50) + 20);

export const marketPrices = [
  { id: '1', name: 'Tomato', icon: Leaf, price: 45, unit: 'kg', trend: 'up', prices: generateRandomPrices() },
  { id: '2', name: 'Onion', icon: Leaf, price: 30, unit: 'kg', trend: 'down', prices: generateRandomPrices() },
  { id: '3', name: 'Potato', icon: Leaf, price: 25, unit: 'kg', trend: 'stable', prices: generateRandomPrices() },
  { id: '4', name: 'Carrot', icon: Carrot, price: 50, unit: 'kg', trend: 'up', prices: generateRandomPrices() },
  { id: '5', name: 'Cabbage', icon: Leaf, price: 20, unit: 'kg', trend: 'down', prices: generateRandomPrices() },
  { id: '6', name: 'Apple', icon: Apple, price: 120, unit: 'kg', trend: 'up', prices: generateRandomPrices() },
  { id: '7', name: 'Mango', icon: Leaf, price: 80, unit: 'kg', trend: 'stable', prices: generateRandomPrices() },
];

export const communityPosts = [
  {
    id: '1',
    author: { name: 'Suresh Patel', avatarId: '2' },
    content: 'Has anyone tried the new organic fertilizer? Seeing great results with my tomato crop!',
    timestamp: '2 hours ago',
    comments: [
      { id: 'c1', author: { name: 'Vikram Singh', avatarId: '3' }, content: 'Yes, I am using it too. The yield has definitely increased.' },
    ],
  },
  {
    id: '2',
    author: { name: 'Anita Desai', avatarId: '4' },
    content: 'Warning: Pest attack reported in the northern fields. Please take necessary precautions.',
    timestamp: '1 day ago',
    comments: [],
  },
];
