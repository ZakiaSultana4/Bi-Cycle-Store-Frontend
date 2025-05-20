import UserBookingLineChart from "@/components/Dashboard/user/UserBookingLineChart";
import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { TUser } from "@/types/types";
import { verifyToken } from "@/utils/verifyToken";

const UserDashboardIndex = () => {
  const token = useAppSelector(selectCurrentToken);
  const isUser = token ? verifyToken(token) : null;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Welcome Card */}
        <div className="bg-white p-8 shadow-md rounded-xl text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800">Welcome To Your Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Manage your account, view your bookings, and update your profile easily.
          </p>
        </div>

        {/* Booking Chart */}
        <div className="bg-white p-6 shadow-md rounded-xl pb-12">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Your Booking Overview</h2>
          <UserBookingLineChart user={isUser as TUser} />
        </div>
      </div>
    </div>
  );
};

export default UserDashboardIndex;
