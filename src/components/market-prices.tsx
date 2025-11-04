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
import { marketPrices as allMarketPrices } from '@/lib/mock-data';
import { ArrowUp, ArrowDown, Minus, Search } from 'lucide-react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from '@/components/ui/chart';
import { Area, AreaChart } from 'recharts';
import { Input } from './ui/input';

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

export function MarketPrices() {
  const [search, setSearch] = useState('');
  const marketPrices = allMarketPrices.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));

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
            {marketPrices.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <item.icon className="w-6 h-6 text-primary" />
                    <span className="font-medium">{item.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right font-medium">₹{item.price.toFixed(2)}</TableCell>
                <TableCell className="text-right">
                  <Badge variant={item.trend === 'up' ? 'default' : item.trend === 'down' ? 'destructive' : 'secondary'} className="flex items-center gap-1 w-fit ml-auto">
                    {trendIcons[item.trend as keyof typeof trendIcons]}
                    {item.trend}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <ChartContainer config={chartConfig} className="h-10 w-full">
                    <AreaChart
                      accessibilityLayer
                      data={item.prices.map((price, index) => ({ day: index, price }))}
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
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
