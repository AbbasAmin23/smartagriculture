import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { weatherData } from '@/lib/mock-data';
import { CloudSun, Droplets, Sun, Wind, CloudRain, CloudLightning } from 'lucide-react';

const iconMap: { [key: string]: React.ElementType } = {
  CloudSun,
  Sun,
  CloudRain,
  CloudLightning,
  Droplets,
  Wind,
};

export function WeatherCard() {
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
          <div className="text-4xl font-bold">{weatherData.temperature}°C</div>
          <div className="text-sm text-muted-foreground">{weatherData.precipitation}</div>
        </div>
        <div className="flex justify-between mt-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Droplets className="w-4 h-4" />
            <span>{weatherData.humidity}%</span>
          </div>
          <div className="flex items-center gap-1">
            <Wind className="w-4 h-4" />
            <span>{weatherData.wind} km/h</span>
          </div>
        </div>
        <div className="mt-6">
          <p className="text-sm font-medium mb-2">5-Day Forecast</p>
          <div className="flex justify-between text-center">
            {weatherData.forecast.map((day) => {
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
