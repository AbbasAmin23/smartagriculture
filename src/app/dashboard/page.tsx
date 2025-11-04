'use client';

import { useUser } from '@/firebase';
import FarmerPage from '../farmer/page';
import AdminPage from '../admin/page';
import { useRouter }from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }
  
  // This is a simplified way to check for roles. In a real app, you'd use custom claims.
  if (user.email?.includes('admin')) {
    return <AdminPage />;
  } else {
    return <FarmerPage />;
  }
}
