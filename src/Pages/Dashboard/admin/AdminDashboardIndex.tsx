import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllOrdersQuery, useRevenueQuery } from "@/redux/features/order/orderApi";
import { useAllProductsQuery } from "@/redux/features/products/productApi";
import { FaBox, FaUsers, FaShoppingCart, FaDollarSign } from "react-icons/fa";
import { useAllUserQuery } from "@/redux/features/auth/authApi";
import { OrderStatusChart } from "@/components/Dashboard/admin/OrderStatusChart";
import StatsCard from "@/components/Dashboard/admin/StatsCard";
import { WeeklySalesGraph } from "@/components/Dashboard/admin/WeeklySalesGraph";
import WeeklyOrder from "@/components/Dashboard/admin/WeeklyOrder";
import MonthlySales from "@/components/Dashboard/admin/MonthlySales";
import OrderHistoryGraph from "@/components/Dashboard/admin/OrderHistoryGraph";
import AdminRevenueLineChart from "@/components/Dashboard/admin/AdminRevenueLineChart";


const AdminDashboardIndex = () => {

  const { isLoading: productLoading, data: productData } = useAllProductsQuery(undefined);
  const { isLoading: userLoading, data: userData } = useAllUserQuery(undefined);
  const { isLoading: orderLoading, data: orderData } = useGetAllOrdersQuery(undefined);
  const { isLoading: revenueLoading, data: revenueData } = useRevenueQuery(undefined);

  return (
    <div >

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-2.5">
        {productLoading || orderLoading || revenueLoading || userLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-32 w-full rounded-lg" />
          ))
        ) : (
          <>
            <StatsCard
              icon={<FaBox />}
              title="Total Products"
              value={productData?.meta?.total || 0}
              bgColor="bg-gradient-to-r from-purple-500 to-indigo-500"
            />
            <StatsCard
              icon={<FaUsers />}
              title="Total Users"
              value={userData?.meta?.total || 0}
              bgColor="bg-gradient-to-r from-pink-500 to-rose-500"
            />
            <StatsCard
              icon={<FaShoppingCart />}
              title="Total Orders"
              value={orderData?.meta?.total || 0}
              bgColor="bg-gradient-to-r from-teal-500 to-cyan-500"
            />
            <StatsCard
              icon={<FaDollarSign />}
              title="Total Revenue"
              value={`${revenueData?.data?.totalRevenue || 0}`}
              bgColor="bg-gradient-to-r from-yellow-500 to-orange-500"
            />
          </>
        )}
      </div>

      <h2 className="text-5xl text-center font-semibold mt-5">Chart</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-10">
        <MonthlySales />
        <OrderStatusChart />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-10">
        <WeeklySalesGraph />
        <WeeklyOrder />
      </div>
      <div className="my-10">
        <AdminRevenueLineChart />
      </div>
      <OrderHistoryGraph />
    </div>
  );
};

export default AdminDashboardIndex;
