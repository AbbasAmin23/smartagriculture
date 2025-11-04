'use client';
import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ArrowUp, ArrowDown, Minus, Search, Leaf } from 'lucide-react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from '@/components/ui/chart';
import { Area, AreaChart } from 'recharts';
import { Input } from './ui/input';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, where, limit, orderBy, Timestamp } from 'firebase/firestore';
import { useLanguage } from '@/context/language-context';

const trendIcons = {
  up: <ArrowUp className="w-4 h-4 text-green-500" />,
  down: <ArrowDown className="w-4 h-4 text-red-500" />,
  stable: <Minus className="w-4 h-4 text-gray-500" />,
};

const chartConfig = {
  price: {
    label: "Price",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

type PriceHistory = {
  pricePerKg: number;
  date: Timestamp;
}

function PriceTrendChart({ vegetableName }: { vegetableName: string }) {
  const firestore = useFirestore();
  const [priceHistory, setPriceHistory] = useState<{ day: string, price: number }[]>([]);

  const priceHistoryQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return query(
      collection(firestore, 'priceHistory'),
      where('vegetableName', '==', vegetableName),
      where('date', '>=', sevenDaysAgo),
      orderBy('date', 'asc'),
      limit(7)
    );
  }, [firestore, vegetableName]);

  const { data: historyData } = useCollection<PriceHistory>(priceHistoryQuery);

  useEffect(() => {
    if (historyData) {
      const formattedData = historyData.map(item => ({
        day: item.date.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        price: item.pricePerKg,
      }));
      setPriceHistory(formattedData);
    }
  }, [historyData]);
  
  if (priceHistory.length === 0) {
    return <div className="h-10 w-full flex items-center justify-center text-xs text-muted-foreground">No recent data</div>;
  }

  return (
    <ChartContainer config={chartConfig} className="h-10 w-full">
      <AreaChart
        accessibilityLayer
        data={priceHistory}
        margin={{
          left: 0,
          right: 0,
          top: 2,
          bottom: 2,
        }}
      >
        <defs>
          <linearGradient id={`fill-${vegetableName.replace(/\s/g, '')}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-price)" stopOpacity={0.8} />
            <stop offset="95%" stopColor="var(--color-price)" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <Area
          dataKey="price"
          type="natural"
          fill={`url(#fill-${vegetableName.replace(/\s/g, '')})`}
          stroke="var(--color-price)"
          stackId="a"
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel indicator="line" />}
        />
      </AreaChart>
    </ChartContainer>
  );
}


export function MarketPrices() {
  const [search, setSearch] = useState('');
  const firestore = useFirestore();
  const { translations } = useLanguage();

  const marketDataQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'marketData'));
  }, [firestore]);

  const { data: marketPrices, isLoading } = useCollection<any>(marketDataQuery);
  
  const filteredPrices = marketPrices?.filter(item => item.vegetableName.toLowerCase().includes(search.toLowerCase())) || [];


  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle>{translations.marketPrices.title}</CardTitle>
            <CardDescription>
              {translations.marketPrices.description}
            </CardDescription>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder={translations.marketPrices.searchPlaceholder}
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{translations.marketPrices.produce}</TableHead>
              <TableHead className="text-right">{translations.marketPrices.price}</TableHead>
              <TableHead className="text-right">{translations.marketPrices.trend}</TableHead>
              <TableHead className="text-right w-[150px]">{translations.marketPrices.sevenDayTrend}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && <TableRow><TableCell colSpan={4}>{translations.marketPrices.loading}</TableCell></TableRow>}
            {filteredPrices.map((item) => {
              // Mocking trend for now, as it requires comparing with previous day's data
              const trend = ['up', 'down', 'stable'][Math.floor(Math.random() * 3)]; 

              return (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Leaf className="w-6 h-6 text-primary" />
                    <span className="font-medium">{item.vegetableName}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right font-medium">₹{item.pricePerKg.toFixed(2)}</TableCell>
                <TableCell className="text-right">
                  <Badge variant={trend === 'up' ? 'default' : trend === 'down' ? 'destructive' : 'secondary'} className="flex items-center gap-1 w-fit ml-auto">
                    {trendIcons[trend as keyof typeof trendIcons]}
                    {translations.marketPrices.trends[trend as keyof typeof translations.marketPrices.trends]}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <PriceTrendChart vegetableName={item.vegetableName} />
                </TableCell>
              </TableRow>
            )})}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
