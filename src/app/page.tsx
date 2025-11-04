'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Leaf, Tractor, Wheat, Languages } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/language-context';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function LandingPage() {
  const { language, setLanguage, translations } = useLanguage();
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero');
  const feature1Image = PlaceHolderImages.find((img) => img.id === 'feature1');
  const feature2Image = PlaceHolderImages.find((img) => img.id === 'feature2');
  const feature3Image = PlaceHolderImages.find((img) => img.id === 'feature3');

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <Link href="/" className="flex items-center justify-center">
          <div className="p-2 rounded-lg bg-primary text-primary-foreground w-fit">
            <Leaf className="h-6 w-6" />
          </div>
          <span className="ml-2 text-xl font-semibold text-primary">Smart Agriculture Tracker</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <div className="w-[120px]">
            <Select value={language} onValueChange={(value) => setLanguage(value as 'en' | 'ur')}>
              <SelectTrigger aria-label="Select language" className="h-9">
                <Languages className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="ur">Urdu</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Link
            href="/login"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            {translations.landingPage.login}
          </Link>
          <Button asChild>
            <Link href="/dashboard">{translations.landingPage.goToDashboard}</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48">
          {heroImage && 
            <Image
                src={heroImage.imageUrl}
                alt="Hero background"
                fill
                className="object-cover object-center -z-10"
                data-ai-hint={heroImage.imageHint}
            />
          }
          <div className="container px-4 md:px-6 text-center text-white relative">
            <div className="bg-black/50 p-8 rounded-lg inline-block">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
                  {translations.landingPage.heroTitle}
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl mt-4">
                  {translations.landingPage.heroSubtitle}
                </p>
                <div className="mt-6">
                <Button asChild size="lg">
                    <Link href="/dashboard">{translations.landingPage.getStarted}</Link>
                </Button>
                </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-card">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  {translations.landingPage.keyFeatures}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  {translations.landingPage.featuresTitle}
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {translations.landingPage.featuresSubtitle}
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <Card>
                {feature1Image && 
                    <Image
                        src={feature1Image.imageUrl}
                        alt="Market Prices"
                        width={550}
                        height={310}
                        className="rounded-t-lg object-cover aspect-video"
                        data-ai-hint={feature1Image.imageHint}
                    />
                }
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Wheat className="text-primary"/>{translations.landingPage.marketInsightsTitle}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{translations.landingPage.marketInsightsDescription}</p>
                </CardContent>
              </Card>
              <Card>
                {feature2Image &&
                    <Image
                        src={feature2Image.imageUrl}
                        alt="Weather Forecasts"
                        width={550}
                        height={310}
                        className="rounded-t-lg object-cover aspect-video"
                        data-ai-hint={feature2Image.imageHint}
                    />
                }
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Leaf className="text-primary"/>{translations.landingPage.aiAdviceTitle}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{translations.landingPage.aiAdviceDescription}</p>
                </CardContent>
              </Card>
               <Card>
                {feature3Image &&
                    <Image
                        src={feature3Image.imageUrl}
                        alt="Community Forum"
                        width={550}
                        height={310}
                        className="rounded-t-lg object-cover aspect-video"
                        data-ai-hint={feature3Image.imageHint}
                    />
                }
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Tractor className="text-primary"/>{translations.landingPage.communityForumTitle}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{translations.landingPage.communityForumDescription}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          {translations.landingPage.footerRights}
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            {translations.landingPage.termsOfService}
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            {translations.landingPage.privacy}
          </Link>
        </nav>
      </footer>
    </div>
  );
}
