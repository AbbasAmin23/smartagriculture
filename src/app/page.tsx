import { DashboardLayout } from '@/components/dashboard-layout';
import { Header } from '@/components/header';
import { WeatherCard } from '@/components/weather-card';
import { MarketPrices } from '@/components/market-prices';
import { SmartAdvice } from '@/components/smart-advice';
import { CommunityForum } from '@/components/community-forum';
import { user } from '@/lib/mock-data';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';

export default function Home() {
  return (
    <DashboardLayout>
      <Header />
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <Card className="sm:col-span-2">
              <CardHeader className="pb-3">
                <CardTitle>Welcome back, {user.name.split(' ')[0]}!</CardTitle>
                <CardDescription>
                  Here's your farm's overview for today. Get smart advice to optimize your yield.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Your smart farming companion.</p>
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
