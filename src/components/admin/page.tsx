'use client';

import { DashboardLayout } from '@/components/dashboard-layout';
import { Header } from '@/components/header';
import { WeatherCard } from '@/components/weather-card';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { useUser } from '@/firebase';
import { useLanguage } from '@/context/language-context';
import { AdminMarketManagement } from './market-management';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query } from 'firebase/firestore';

export default function AdminPage() {
  const { user } = useUser();
  const firestore = useFirestore();
  const { translations } = useLanguage();
  const userName = user?.displayName || user?.email?.split('@')[0] || 'Admin';

  const marketDataQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'marketData'));
  }, [firestore]);

  const { data: marketPrices } = useCollection<any>(marketDataQuery);

  const totalEntries = marketPrices?.length || 0;
  const averagePrice = totalEntries > 0 
    ? (marketPrices!.reduce((acc, item) => acc + item.pricePerKg, 0) / totalEntries).toFixed(2)
    : '0.00';

  return (
    <DashboardLayout>
      <Header />
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-3">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4">
            <Card className="sm:col-span-2">
              <CardHeader className="pb-3">
                <CardTitle>{translations.adminPage.welcome}, {userName}!</CardTitle>
                <CardDescription>
                  {translations.adminPage.welcomeDescription}
                </CardDescription>
              </Header>
              <CardContent>
                <p className="text-sm text-muted-foreground">{translations.adminPage.adminDashboard}</p>
              </CardContent>
            </Card>
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Total Entries</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold">{totalEntries}</p>
                    <p className="text-xs text-muted-foreground">produce items in the market</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Average Price</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold">₹{averagePrice}</p>
                    <p className="text-xs text-muted-foreground">average price per kg</p>
                </CardContent>
            </Card>
          </div>
          <AdminMarketManagement />
        </div>
      </main>
    </DashboardLayout>
  );
}
