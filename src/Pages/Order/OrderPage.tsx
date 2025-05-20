import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useAuthMeQuery,
  useUpdateProfileMutation,
} from "@/redux/features/auth/authApi";
import Loading from "@/components/Loading";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useCreateOrderMutation } from "@/redux/features/order/orderApi";
import { toast } from "sonner";
import { clearCart } from "@/redux/features/cart/cartSlice";
import { useDarkMode } from "@/hooks/useDarkMode";

const OrderPage = () => {
  const { darkMode } = useDarkMode();

  const { isLoading, data } = useAuthMeQuery(undefined);
  const [updateProfile] = useUpdateProfileMutation();
  const cartData = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const [
    createOrder,
    {
      isLoading: orderLoading,
      isSuccess,
      data: orderData,
      isError,
      error,
    },
  ] = useCreateOrderMutation();

  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [profileComplete, setProfileComplete] = useState(true);

  useEffect(() => {
    if (data?.data) {
      setUserDetails({
        name: data.data.name || "",
        email: data.data.email || "",
        phone: data.data.phone || "",
        address: data.data.address || "",
      });

      if (!data.data.name || !data.data.phone || !data.data.address) {
        setProfileComplete(false);
      } else {
        setProfileComplete(true);
      }
    }
  }, [data]);

  const toastId = "order";

  useEffect(() => {
    if (orderLoading) toast.loading("Processing ...", { id: toastId });
if (isSuccess) {
  if (orderData?.data) {
    dispatch(clearCart()); // ✅ clear cart before navigation
    window.location.href = orderData.data; // this is a payment link I assume
  }
}


    if (isError) {
      const err = error as { data?: { message?: string } };
      toast.error(err?.data?.message || "Order failed", { id: toastId });
    }
  }, [error, isError, isSuccess, orderData, orderLoading, dispatch]);

  const handleOrderCreate = async () => {
    const formattedData = {
      products: cartData?.items?.map((item) => ({
        _id: item?._id,
        quantity: item?.selectQuantity,
      })),
    };


    await createOrder(formattedData).unwrap();
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    const err = error as unknown;
    if (
      typeof err === "object" &&
      err !== null &&
      "data" in err &&
      typeof (err as { data?: { message?: string } }).data === "object"
    ) {
      toast.error(
        ((err as { data?: { message?: string } }).data as { message?: string })?.message ||
          "Something went wrong",
        { id: toastId }
      );
    } else {
      toast.error("Something went wrong", { id: toastId });
    }
  }

  const handleProfileUpdate = async () => {
    try {
      await updateProfile({
        name: userDetails.name,
        phone: userDetails.phone,
        address: userDetails.address,
      }).unwrap();
      setIsEditing(false);
      setProfileComplete(true);
    } catch (error) {
      console.error("Profile update failed", error);
    }
  };

  return (
    <div
      className={`container mx-auto p-4 lg:p-6 mt-28 ${
        darkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-900"
      }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* User Details - Left Side (8 Rows) */}
        <div className="md:col-span-2 row-span-8">
          <Card
            className={`shadow-md h-full ${
              darkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-900"
            }`}
          >
            <CardHeader>
              <CardTitle>User Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input
                  placeholder="Full Name"
                  value={userDetails.name}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, name: e.target.value })
                  }
                  className={`${
                    darkMode
                      ? "dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
                      : ""
                  }`}
                />
                <Input
                  placeholder="Email"
                  value={userDetails.email}
                  disabled
                  className={`${
                    darkMode
                      ? "dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
                      : ""
                  }`}
                />
                <Input
                  placeholder="Phone"
                  value={userDetails.phone}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, phone: e.target.value })
                  }
                  className={`${
                    darkMode
                      ? "dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
                      : ""
                  }`}
                />
                <Input
                  placeholder="Address"
                  value={userDetails.address}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, address: e.target.value })
                  }
                  className={`${
                    darkMode
                      ? "dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
                      : ""
                  }`}
                />
              </div>
              {!profileComplete && (
                <p className="text-red-500 mt-2 dark:text-red-400">
                  Please update your profile to proceed with the order.
                </p>
              )}
              {isEditing ? (
                <Button
                  className={`w-full mt-4 ${
                    darkMode ? "bg-green-600 text-white" : "bg-green-500 text-white"
                  }`}
                  onClick={handleProfileUpdate}
                >
                  Save Profile
                </Button>
              ) : (
                !profileComplete && (
                  <Button
                    className={`w-full mt-4 ${
                      darkMode ? "bg-red-600 text-white" : "bg-red-500 text-white"
                    }`}
                    onClick={() => setIsEditing(true)}
                  >
                    Update Profile
                  </Button>
                )
              )}
            </CardContent>
          </Card>
        </div>

        {/* Order Summary - Right Side (4 Rows) */}
        <div className="md:col-span-1 row-span-4">
          <div
            className={`rounded-lg shadow-md p-6 h-full ${
              darkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-900"
            }`}
          >
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2 text-lg">
              <span>Total Products:</span>
              <span className="font-semibold">{cartData?.totalQuantity}</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span>Total Price:</span>
              <span
                className={`text-2xl ${
                  darkMode ? "text-red-400" : "text-red-600"
                }`}
              >
                Tk.{cartData?.totalPrice}
              </span>
            </div>
            {profileComplete && cartData?.items.length > 0 && (
              <Button
                className={`w-full mt-4 ${
                  darkMode ? "bg-red-600 text-white" : "bg-red-500 text-white"
                }`}
                onClick={handleOrderCreate}
              >
                Order
              </Button>
            )}
          </div>
          <div className="w-full text-center mt-3">
            <h4
              className={`text-center w-full text-lg font-bold ${
                darkMode ? "text-red-400" : "text-red-800"
              }`}
            >
              !!Warning!!
            </h4>
            <p className="dark:text-gray-300">
              এডমিন order ভেরিফাই করার পর প্রডাক্ট কোয়ান্টিটি কমবে
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
