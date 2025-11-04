'use client';

import { DashboardLayout } from '@/components/dashboard-layout';
import { Header } from '@/components/header';
import { WeatherCard } from '@/components/weather-card';

export default function WeatherPage() {
  return (
    <DashboardLayout>
      <Header />
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="max-w-lg mx-auto w-full">
            <WeatherCard />
        </div>
      </main>
    </DashboardLayout>
  );
}
