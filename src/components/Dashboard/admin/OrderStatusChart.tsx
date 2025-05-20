import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { useStatusCountsQuery } from "@/redux/features/order/orderApi";

export function OrderStatusChart() {
    const { data, error, isLoading } = useStatusCountsQuery();


    // Define colors for each status
const statusColors: Record<string, string> = {
  pending: "#FF7000", // red
  paid: "#52c41a",    // green
  cancelled: "#ff4d4f", // red
  delivered: "",  
  shipped:"#00BABC"  // green
};

// Map API data to recharts format with color
const orderStatusData = Array.isArray(data)
  ? data.map((item) => ({
      name: item.status,
      value: item.count,
      color: statusColors[item.status.toLowerCase()] || "#8884d8",
    }))
  : [];



  if (isLoading) return <p>Loading chart data...</p>;
  if (error) return <p>Failed to load chart data</p>;
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Order Status Distribution</CardTitle>
        <CardDescription>Overview of all orders</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={orderStatusData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="value"
              label
            >
              {(orderStatusData ?? []).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Orders processing efficiently <TrendingUp className="h-4 w-4" />
        </div>
     
      </CardFooter>
    </Card>
  );
}