'use client';

import { DashboardLayout } from '@/components/dashboard-layout';
import { Header } from '@/components/header';
import { MarketPrices } from '@/components/market-prices';

export default function MarketPage() {
  return (
    <DashboardLayout>
      <Header />
      <main className="flex-1 p-4 sm:px-6 sm:py-0 md:gap-8">
        <MarketPrices />
      </main>
    </DashboardLayout>
  );
}
