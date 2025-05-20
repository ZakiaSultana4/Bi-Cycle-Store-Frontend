import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

// Static sales data for the last 30 days
const monthlySalesData = Array.from({ length: 30 }, (_, i) => ({
  day: `Day ${i + 1}`,
  sales: Math.floor(Math.random() * (3000 - 1000) + 1000), // Random sales between 1000-3000
}));

export function MonthlySalesGraph() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Monthly Sales</CardTitle>
        <CardDescription>Last 30 Days</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={monthlySalesData}>
            <XAxis dataKey="day" tick={false} /> {/* Hides x-axis labels for cleaner UI */}
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="sales" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 12.5% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total sales for the last month
        </div>
      </CardFooter>
    </Card>
  );
}