import { useState } from 'react';
import { TrendingUp, TrendingDown, Clock, Target, BarChart3, Activity, AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const chartData = [
  { date: '2024-01', price: 8500 },
  { date: '2024-02', price: 8800 },
  { date: '2024-03', price: 9200 },
  { date: '2024-04', price: 8900 },
  { date: '2024-05', price: 9500 },
  { date: '2024-06', price: 9800 },
  { date: '2024-07', price: 10200 },
];

const chartConfig = {
  price: {
    label: "Price",
    color: "hsl(var(--primary))",
  },
};

interface MarketData {
  currentPriceRange: { min: number; max: number };
  demandScore: number;
  marketTrend: 'up' | 'down' | 'stable';
  optimalTiming: string;
  confidence: number;
  suggestedPrice: number;
  competitorCount: number;
  avgDaysToSell: number;
}

const SellerMarketDashboard = () => {
  const [autoAdjustEnabled, setAutoAdjustEnabled] = useState(false);
  const [overridePrice, setOverridePrice] = useState('');
  const [showOverride, setShowOverride] = useState(false);

  // Mock market data - in real app this would come from AI analysis
  const marketData: MarketData = {
    currentPriceRange: { min: 9200, max: 10800 },
    demandScore: 78,
    marketTrend: 'up',
    optimalTiming: 'List now - High buyer activity detected',
    confidence: 85,
    suggestedPrice: 9850,
    competitorCount: 12,
    avgDaysToSell: 18
  };

  const getDemandColor = (score: number) => {
    if (score >= 70) return 'text-green-600 dark:text-green-400';
    if (score >= 40) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-600" />;
      default: return <Activity className="w-4 h-4 text-yellow-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Market Overview Header */}
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            AI Market Intelligence
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                ${marketData.currentPriceRange.min.toLocaleString()} - ${marketData.currentPriceRange.max.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Current Range</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${getDemandColor(marketData.demandScore)}`}>
                {marketData.demandScore}%
              </div>
              <div className="text-sm text-muted-foreground">Demand Score</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-2xl font-bold">
                {getTrendIcon(marketData.marketTrend)}
                <span className="capitalize">{marketData.marketTrend}</span>
              </div>
              <div className="text-sm text-muted-foreground">Market Trend</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {marketData.avgDaysToSell}
              </div>
              <div className="text-sm text-muted-foreground">Avg Days to Sell</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Price Trends Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Historical Price Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke="var(--color-price)" 
                    strokeWidth={2}
                    dot={{ fill: "var(--color-price)" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* AI Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              AI Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            
            {/* Optimal Timing */}
            <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
              <Clock className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <div className="font-medium text-green-800 dark:text-green-200">
                  {marketData.optimalTiming}
                </div>
                <div className="text-sm text-green-600 dark:text-green-400 mt-1">
                  Confidence: {marketData.confidence}%
                </div>
              </div>
            </div>

            {/* Suggested Price */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">AI Suggested Price</Label>
              <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg border">
                <div>
                  <div className="text-lg font-bold text-primary">
                    ${marketData.suggestedPrice.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {marketData.competitorCount} similar listings
                  </div>
                </div>
                <Badge variant="secondary">Optimal</Badge>
              </div>
            </div>

            {/* Demand Indicator */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Buyer Demand</Label>
              <div className="space-y-2">
                <Progress value={marketData.demandScore} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Low</span>
                  <span className={getDemandColor(marketData.demandScore)}>
                    {marketData.demandScore}% - High Demand
                  </span>
                  <span>High</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Auto-Adjust Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Pricing Control
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          
          {/* Auto-Adjust Toggle */}
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border">
            <div className="space-y-1">
              <div className="font-medium">Auto-Adjust Pricing</div>
              <div className="text-sm text-muted-foreground">
                Let AI automatically adjust your price based on market conditions
              </div>
            </div>
            <Switch
              checked={autoAdjustEnabled}
              onCheckedChange={setAutoAdjustEnabled}
            />
          </div>

          {/* Auto-adjust status */}
          {autoAdjustEnabled && (
            <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-700 dark:text-green-300">
                Auto-adjust is active. Your price will be optimized every 6 hours.
              </span>
            </div>
          )}

          <Separator />

          {/* Manual Override */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Manual Price Override</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowOverride(!showOverride)}
              >
                {showOverride ? 'Cancel' : 'Override Price'}
              </Button>
            </div>
            
            {showOverride && (
              <div className="flex items-center gap-2 p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <AlertCircle className="w-4 h-4 text-yellow-600" />
                <div className="flex-1 space-y-2">
                  <div className="text-sm text-yellow-700 dark:text-yellow-300">
                    Override the AI suggested price (disables auto-adjust)
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Enter price"
                      value={overridePrice}
                      onChange={(e) => setOverridePrice(e.target.value)}
                      className="flex-1 px-3 py-2 text-sm border rounded-md bg-background"
                    />
                    <Button size="sm">Apply</Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SellerMarketDashboard;