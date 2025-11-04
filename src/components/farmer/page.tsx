'use client';

import { DashboardLayout } from '@/components/dashboard-layout';
import { Header } from '@/components/header';
import { WeatherCard } from '@/components/weather-card';
import { MarketPrices } from '@/components/market-prices';
import { SmartAdvice } from '@/components/smart-advice';
import { CommunityForum } from '@/components/community-forum';
import { useUser } from '@/firebase';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { useLanguage } from '@/context/language-context';

export default function FarmerPage() {
  const { user } = useUser();
  const { translations } = useLanguage();
  const userName = user?.displayName || user?.email?.split('@')[0] || 'Farmer';
  return (
    <DashboardLayout>
      <Header />
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <Card className="sm:col-span-2">
              <CardHeader className="pb-3">
                <CardTitle>{translations.farmerPage.welcome}, {userName}!</CardTitle>
                <CardDescription>
                  {translations.farmerPage.welcomeDescription}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{translations.farmerPage.companionText}</p>
              </CardContent>
            </Card>
            <WeatherCard />
          </div>
          <MarketPrices />
        </div>
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-1">
          <SmartAdvice />
          <CommunityForum />
        </div>
      </main>
    </DashboardLayout>
  );
}
