import { useUserMonthlyBookingsQuery } from "@/redux/features/order/orderApi";
import { TUser } from "@/types/types";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";


const monthMap = [
  "", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const UserBookingLineChart = ({ user }: { user: TUser }) => {
      const userId = user?.userId

      console.log(userId);
    
      
  const { data, isLoading, error } = useUserMonthlyBookingsQuery({ userId });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading chart</p>;
  console.log(error);
  const chartData = data?.map((item) => ({
    month: monthMap[item.month],
    count: item.count,
  }));

  return (
    <div className="w-full h-96">
      <h2 className="text-xl font-semibold mb-4">Monthly Bookings</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};


export default UserBookingLineChart;
