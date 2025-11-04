'use client';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getAdviceAction } from '@/app/actions/get-advice';
import { Lightbulb, Loader2, AlertTriangle, CheckCircle, Calendar, BarChart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { SmartFarmerAdviceOutput } from '@/ai/flows/smart-farmer-advice';

export function SmartAdvice() {
  const [advice, setAdvice] = useState<SmartFarmerAdviceOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGetAdvice = async () => {
    setIsLoading(true);
    setAdvice(null);
    const result = await getAdviceAction();
    setIsLoading(false);

    if ('error' in result) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error,
      });
    } else {
      setAdvice(result);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-accent" />
          <span>Smart Farmer Advice</span>
        </CardTitle>
        <CardDescription>
          Get AI-powered recommendations for your farm.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 min-h-[10rem]">
        {isLoading && (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-2">Generating advice...</span>
          </div>
        )}
        {advice && advice.recommendations.length > 0 && (
          <div className="space-y-4">
            {advice.recommendations.map((rec, index) => (
              <div key={index} className="p-4 rounded-lg border bg-background">
                <h4 className="font-semibold flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  Plant {rec.crop}
                </h4>
                <div className="text-sm text-muted-foreground mt-2 space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <strong>Planting Time:</strong> {rec.plantingTime}
                  </div>
                  <div className="flex items-start gap-2">
                    <BarChart className="w-4 h-4 mt-1" />
                    <p><strong>Reason:</strong> {rec.reason}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {advice && advice.recommendations.length === 0 && !isLoading && (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <AlertTriangle className="w-8 h-8 text-muted-foreground mb-2" />
              <p className="text-muted-foreground">No specific advice at this time based on current conditions.</p>
            </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleGetAdvice} disabled={isLoading} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            'Get Smart Advice'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
