import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
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
import { useMonthlySalesQuery } from "@/redux/features/order/orderApi";
import { useState } from "react";

const MonthlySales = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const {
    data: salesData,
    isLoading,
    isError,
  } = useMonthlySalesQuery({ year: selectedYear });
console.log(salesData);

  const fallbackData = [
    { month: "Jan", sales: 0 },
    { month: "Feb", sales: 0 },
    { month: "Mar", sales: 0 },
    { month: "Apr", sales: 0 },
    { month: "May", sales: 0 },
    { month: "Jun", sales: 0 },
    { month: "Jul", sales: 0 },
    { month: "Aug", sales: 0 },
    { month: "Sep", sales: 0 },
    { month: "Oct", sales: 0 },
    { month: "Nov", sales: 0 },
    { month: "Dec", sales: 0 },
  ];

  const chartData = salesData ?? fallbackData;

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0 space-y-2">
        <CardTitle>Monthly Sales</CardTitle>
        <CardDescription>Year: {selectedYear}</CardDescription>
        <select
          className="border p-1 rounded-md"
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
        >
          {[currentYear, currentYear - 1, currentYear - 2].map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {isLoading ? (
          <div className="text-center py-10">Loading...</div>
        ) : isError ? (
          <div className="text-center text-red-500 py-10">Failed to load data</div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="sales"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorSales)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Total sales by month Only for Delivered Order Status <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  );
};

export default MonthlySales;
