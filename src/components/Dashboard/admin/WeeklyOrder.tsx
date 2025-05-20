import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
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
import { useDailyOrderCountsQuery } from "@/redux/features/order/orderApi";

const WeeklyOrder = () => {
  // Destructure RTK query response
  const {
    data: apiData,
    isLoading,
    isError,
  } = useDailyOrderCountsQuery();

  // Fallback data
  const fallbackData = [
    { day: "Mon", orders: 0 },
    { day: "Tue", orders: 0 },
    { day: "Wed", orders: 0 },
    { day: "Thu", orders: 0 },
    { day: "Fri", orders: 0 },
    { day: "Sat", orders: 0 },
    { day: "Sun", orders: 0 },
  ];

  // Prepare chart data
  const chartData = apiData ?? fallbackData;

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Weekly Order</CardTitle>
        <CardDescription>Last 7 Days</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {isLoading ? (
          <div className="text-center py-10">Loading...</div>
        ) : isError ? (
          <div className="text-center text-red-500 py-10">Failed to load data</div>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="#ff008b" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Showing total Order for the past week <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  );
};

export default WeeklyOrder;
