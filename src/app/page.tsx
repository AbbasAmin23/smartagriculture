'use client';

import { useUser } from '@/firebase';
import FarmerPage from './farmer/page';
import AdminPage from './admin/page';
import { useRouter }from 'next/navigation';

export default function Home() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  if (isUserLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    router.push('/login');
    return null;
  }
  
  // This is a simplified way to check for roles. In a real app, you'd use custom claims.
  if (user.email?.includes('admin')) {
    return <AdminPage />;
  } else {
    return <FarmerPage />;
  }
}
