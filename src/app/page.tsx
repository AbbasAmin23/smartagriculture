import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Leaf, Tractor, Wheat } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function LandingPage() {
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
          <span className="ml-2 text-xl font-semibold text-primary">Kissan Sathi</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            href="/login"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Login
          </Link>
          <Button asChild>
            <Link href="/dashboard">Go to Dashboard</Link>
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
                Empowering Farmers with Technology
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl mt-4">
                Your smart farming companion for market prices, weather forecasts, and community support.
                </p>
                <div className="mt-6">
                <Button asChild size="lg">
                    <Link href="/dashboard">Get Started</Link>
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
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Everything a Modern Farmer Needs
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  From real-time data to a supportive community, we provide the tools to help you thrive.
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
                  <CardTitle className="flex items-center gap-2"><Wheat className="text-primary"/>Market Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Get up-to-date market prices for your produce to make informed selling decisions.</p>
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
                  <CardTitle className="flex items-center gap-2"><Leaf className="text-primary"/>AI-Powered Advice</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Receive smart recommendations based on weather patterns and market trends to optimize your yield.</p>
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
                  <CardTitle className="flex items-center gap-2"><Tractor className="text-primary"/>Community Forum</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Connect with other farmers, share knowledge, and ask questions in our community forum.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          © Kissan Sathi. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
