'use client';

import { useState } from 'react';
import { useAuth, useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { initiateEmailSignIn, initiateEmailSignUp, initiateAnonymousSignIn } from '@/firebase';
import { Sprout } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/language-context';

export default function LoginPage() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const { translations } = useLanguage();


  if (isUserLoading) {
    return <div>{translations.loginPage.loading}</div>;
  }

  if (user) {
    router.push('/dashboard');
    return null;
  }

  const handleSignUp = () => {
    initiateEmailSignUp(auth, email, password);
  };

  const handleLogin = () => {
    initiateEmailSignIn(auth, email, password);
  };
  
  const handleAnonymousLogin = () => {
    initiateAnonymousSignIn(auth);
  };

  const handleAdminLogin = () => {
    initiateEmailSignIn(auth, adminEmail, adminPassword);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="flex flex-col items-center gap-4 mb-8">
            <Link href="/" className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-primary text-primary-foreground w-fit">
                  <Sprout className="w-8 h-8" />
                </div>
                <h1 className="text-4xl font-semibold font-headline text-primary">
                  Smart Agriculture Tracker
                </h1>
            </Link>

      <Tabs defaultValue="farmer" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="farmer">{translations.loginPage.farmer}</TabsTrigger>
          <TabsTrigger value="admin">{translations.loginPage.admin}</TabsTrigger>
        </TabsList>
        <TabsContent value="farmer">
            <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">{translations.loginPage.login}</TabsTrigger>
                    <TabsTrigger value="signup">{translations.loginPage.signUp}</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                  <Card>
                    <CardHeader>
                      <CardTitle>{translations.loginPage.farmerLoginTitle}</CardTitle>
                      <CardDescription>
                        {translations.loginPage.farmerLoginDescription}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="space-y-1">
                        <Label htmlFor="email-login">{translations.loginPage.emailLabel}</Label>
                        <Input id="email-login" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="password-login">{translations.loginPage.passwordLabel}</Label>
                        <Input id="password-login" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                      <Button onClick={handleLogin} className="w-full">{translations.loginPage.login}</Button>
                      <Button onClick={handleAnonymousLogin} className="w-full" variant="secondary">{translations.loginPage.anonymousLogin}</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                <TabsContent value="signup">
                  <Card>
                    <CardHeader>
                      <CardTitle>{translations.loginPage.farmerSignUpTitle}</CardTitle>
                      <CardDescription>
                        {translations.loginPage.farmerSignUpDescription}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="space-y-1">
                        <Label htmlFor="email-signup">{translations.loginPage.emailLabel}</Label>
                        <Input id="email-signup" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="password-signup">{translations.loginPage.passwordLabel}</Label>
                        <Input id="password-signup" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button onClick={handleSignUp} className="w-full">{translations.loginPage.signUp}</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
            </Tabs>
        </TabsContent>
        <TabsContent value="admin">
          <Card>
            <CardHeader>
              <CardTitle>{translations.loginPage.adminLoginTitle}</CardTitle>
              <CardDescription>
                {translations.loginPage.adminLoginDescription}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="admin-email-login">{translations.loginPage.adminEmailLabel}</Label>
                <Input id="admin-email-login" placeholder="admin@example.com" type="email" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="admin-password-login">{translations.loginPage.adminPasswordLabel}</Label>
                <Input id="admin-password-login" type="password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button onClick={handleAdminLogin} className="w-full">{translations.loginPage.loginAsAdmin}</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      </div>
    </div>
  );
}
