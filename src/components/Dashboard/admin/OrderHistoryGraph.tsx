"use client";

import { useStatusCountsQuery } from "@/redux/features/order/orderApi";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import Loading from "@/components/Loading";

const OrderHistoryGraph = () => {
  const { data: chartData = [], isLoading } = useStatusCountsQuery();


  if (isLoading) return <Loading />;

  return (
    <div className=" rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-center">Order Status Summary</h2>
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="status" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-center text-gray-500">No order data available to display.</p>
      )}
    </div>
  );
};

export default OrderHistoryGraph;
