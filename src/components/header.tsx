'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Search,
  Settings,
  LogOut,
  User as UserIcon,
  Languages,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { SidebarTrigger } from './ui/sidebar';
import { useAuth, useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLanguage } from '@/context/language-context';

export function Header() {
  const { user } = useUser();
  const auth = useAuth();
  const router = useRouter();
  const { language, setLanguage, translations } = useLanguage();
  
  const userAvatar = PlaceHolderImages.find((img) => img.id === '1'); 
  const userName = user?.displayName || user?.email || 'Anonymous';
  const userInitial = userName.charAt(0).toUpperCase();

  const handleLogout = () => {
    if (auth) {
      auth.signOut();
    }
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 mb-4">
       <SidebarTrigger className="md:hidden" />
      <div className="relative flex-1 ml-auto md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder={translations.header.searchPlaceholder}
          className="w-full rounded-lg bg-card pl-8 md:w-[200px] lg:w-[320px]"
        />
      </div>
      <div className="w-[120px]">
        <Select value={language} onValueChange={(value) => setLanguage(value as 'en' | 'ur' | 'pa')}>
          <SelectTrigger aria-label="Select language">
            <Languages className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="ur">Urdu</SelectItem>
            <SelectItem value="pa">Punjabi</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            <Avatar className="h-8 w-8">
              {userAvatar && user?.photoURL ? <AvatarImage src={user.photoURL} alt={userName} /> : userAvatar ? <AvatarImage src={userAvatar.imageUrl} alt={userName} data-ai-hint={userAvatar.imageHint}/> : null}
              <AvatarFallback>{userInitial}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{userName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem><UserIcon className="mr-2 h-4 w-4" />{translations.header.profile}</DropdownMenuItem>
          <DropdownMenuItem><Settings className="mr-2 h-4 w-4" />{translations.header.settings}</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}><LogOut className="mr-2 h-4 w-4" />{translations.header.logout}</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
