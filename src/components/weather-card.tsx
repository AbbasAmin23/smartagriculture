'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CloudSun, Droplets, Sun, Wind, CloudRain, CloudLightning } from 'lucide-react';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';

const iconMap: { [key: string]: React.ElementType } = {
  CloudSun,
  Sun,
  CloudRain,
  CloudLightning,
  Droplets,
  Wind,
};

export function WeatherCard() {
  const firestore = useFirestore();
  
  // Assuming a single, known document for weather for simplicity.
  const weatherDocRef = useMemoFirebase(() => {
    if (!firestore) return null;
    return doc(firestore, 'weatherUpdates', 'pune');
  }, [firestore]);

  const { data: weatherData, isLoading } = useDoc<any>(weatherDocRef);
  
  if (isLoading) {
    return (
       <Card className="sm:col-span-2">
         <CardHeader className="pb-2">
           <CardTitle className="text-lg">Loading Weather...</CardTitle>
         </CardHeader>
         <CardContent>
            <p>Loading...</p>
         </CardContent>
       </Card>
    )
  }

  if (!weatherData) {
    return (
       <Card className="sm:col-span-2">
         <CardHeader className="pb-2">
           <CardTitle className="text-lg">Weather Unavailable</CardTitle>
         </CardHeader>
         <CardContent>
            <p>Could not load weather data.</p>
         </CardContent>
       </Card>
    )
  }

  const forecast = [
      { day: 'Mon', temp: 29, icon: 'CloudSun' },
      { day: 'Tue', temp: 31, icon: 'Sun' },
      { day: 'Wed', temp: 27, icon: 'CloudRain' },
      { day: 'Thu', temp: 28, icon: 'CloudLightning' },
      { day: 'Fri', temp: 30, icon: 'Sun' },
    ];

  return (
    <Card className="sm:col-span-2">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex justify-between items-center">
          <span>{weatherData.region}</span>
          <CloudSun className="w-6 h-6 text-accent" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-4xl font-bold">{weatherData.temperatureCelsius}°C</div>
          <div className="text-sm text-muted-foreground">{weatherData.condition}</div>
        </div>
        <div className="flex justify-between mt-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Droplets className="w-4 h-4" />
            <span>{weatherData.humidity}%</span>
          </div>
          <div className="flex items-center gap-1">
            <Wind className="w-4 h-4" />
            <span>{weatherData.wind || 12} km/h</span>
          </div>
        </div>
        <div className="mt-6">
          <p className="text-sm font-medium mb-2">5-Day Forecast</p>
          <div className="flex justify-between text-center">
            {forecast.map((day) => {
              const Icon = iconMap[day.icon];
              return (
                <div key={day.day} className="flex flex-col items-center gap-1">
                  <span className="text-xs text-muted-foreground">{day.day}</span>
                  {Icon && <Icon className="w-5 h-5 text-muted-foreground" />}
                  <span className="text-sm font-semibold">{day.temp}°</span>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
