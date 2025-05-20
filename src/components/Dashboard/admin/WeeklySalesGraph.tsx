import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { useWeeklySalesQuery } from "@/redux/features/order/orderApi";


export function WeeklySalesGraph() {
  const { data: weeklySales = [], isLoading, isError } = useWeeklySalesQuery();


  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Weekly Sales</CardTitle>
        <CardDescription>Last 6 Weeks</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        {isLoading ? (
          <div className="text-center text-muted-foreground">Loading chart...</div>
        ) : isError ? (
          <div className="text-center text-red-500">Failed to load chart data</div>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={weeklySales}>
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="totalSales"
                stroke="#ff008b"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>

      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Weekly sales trend <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Sales stats over the past weeks
        </div>
      </CardFooter>
    </Card>
  );
}
