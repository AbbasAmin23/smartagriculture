'use client';

import { DashboardLayout } from '@/components/dashboard-layout';
import { Header } from '@/components/header';
import { CommunityForum } from '@/components/community-forum';

export default function CommunityPage() {
  return (
    <DashboardLayout>
      <Header />
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
         <div className="max-w-3xl mx-auto w-full">
            <CommunityForum />
        </div>
      </main>
    </DashboardLayout>
  );
}
