'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Home, Newspaper, CloudSun, Users, Sprout } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/dashboard', icon: Home, label: 'Dashboard' },
  { href: '/market', icon: Newspaper, label: 'Market' },
  { href: '/weather', icon: CloudSun, label: 'Weather' },
  { href: '/community', icon: Users, label: 'Community' },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="group-data-[collapsible=icon]:-mt-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary text-primary-foreground w-fit">
              <Sprout className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-semibold font-headline text-primary group-data-[collapsible=icon]:hidden">
              Kissan Sathi
            </h1>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith(item.href)}
                  tooltip={item.label}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
