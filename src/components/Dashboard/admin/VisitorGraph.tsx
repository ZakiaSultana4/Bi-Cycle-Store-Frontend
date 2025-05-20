import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

const weeklyOrderedData = [
  { day: "Mon", visitors: 320 },
  { day: "Tue", visitors: 450 },
  { day: "Wed", visitors: 390 },
  { day: "Thu", visitors: 520 },
  { day: "Fri", visitors: 610 },
  { day: "Sat", visitors: 700 },
  { day: "Sun", visitors: 580 },
];

export function VisitorGraph() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Weekly Visitors</CardTitle>
        <CardDescription>Last 7 Days</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={weeklyOrderedData}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="visitors" fill="hsl(var(--chart-1))" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
           Showing total Order for the past week <TrendingUp className="h-4 w-4" />
        </div>
  
      </CardFooter>
    </Card>
  );
}