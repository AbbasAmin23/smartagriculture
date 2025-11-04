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
import { useLanguage } from '@/context/language-context';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { translations } = useLanguage();

  const navItems = [
    { href: '/dashboard', icon: Home, label: translations.dashboard.dashboard },
    { href: '/market', icon: Newspaper, label: translations.dashboard.market },
    { href: '/weather', icon: CloudSun, label: translations.dashboard.weather },
    { href: '/community', icon: Users, label: translations.dashboard.community },
  ];

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="group-data-[collapsible=icon]:-mt-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary text-primary-foreground w-fit">
              <Sprout className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-semibold font-headline text-primary group-data-[collapsible=icon]:hidden">
              Smart Agriculture Tracker
            </h1>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
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
