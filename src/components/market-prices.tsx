'use client';
import { useState } from 'react';
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
import { collection, query } from 'firebase/firestore';

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

const generateRandomPrices = () => Array.from({ length: 7 }, () => Math.floor(Math.random() * 50) + 20);

export function MarketPrices() {
  const [search, setSearch] = useState('');
  const firestore = useFirestore();

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
            <CardTitle>Market Prices</CardTitle>
            <CardDescription>
              Real-time vegetable and fruit prices.
            </CardDescription>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search produce..."
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
              <TableHead>Produce</TableHead>
              <TableHead className="text-right">Price (per kg)</TableHead>
              <TableHead className="text-right">Trend</TableHead>
              <TableHead className="text-right w-[150px]">7-Day Trend</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && <TableRow><TableCell colSpan={4}>Loading...</TableCell></TableRow>}
            {filteredPrices.map((item) => {
              // Mocking trend and 7-day prices for now
              const trend = ['up', 'down', 'stable'][Math.floor(Math.random() * 3)]; 
              const prices = generateRandomPrices();

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
                    {trend}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <ChartContainer config={chartConfig} className="h-10 w-full">
                    <AreaChart
                      accessibilityLayer
                      data={prices.map((price, index) => ({ day: index, price }))}
                      margin={{
                        left: 0,
                        right: 0,
                        top: 2,
                        bottom: 2,
                      }}
                    >
                      <defs>
                        <linearGradient id={`fill-${item.id}`} x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="var(--color-price)" stopOpacity={0.8} />
                           <stop offset="95%" stopColor="var(--color-price)" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                      <Area
                        dataKey="price"
                        type="natural"
                        fill={`url(#fill-${item.id})`}
                        stroke="var(--color-price)"
                        stackId="a"
                      />
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel indicator="line" />}
                      />
                    </AreaChart>
                  </ChartContainer>
                </TableCell>
              </TableRow>
            )})}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
