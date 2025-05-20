import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import {
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
  useVerifyOrderMutation,
} from "@/redux/features/order/orderApi";
import { useState } from "react";
import { toast } from "sonner";
import { OrderProductDetails } from "../OrderProductDetails";
import type { IOrderResponse } from "@/types/types";
import { useDarkMode } from "@/hooks/useDarkMode";
import Pagination from "@/components/Pagination";


const OrderAdmin = () => {
  const { darkMode } = useDarkMode();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, refetch } = useGetAllOrdersQuery({ page: currentPage });

  const [verifyOrder] = useVerifyOrderMutation();
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const allOrders: IOrderResponse[] = data?.data || [];
  const filteredData = search
    ? allOrders.filter((item: IOrderResponse) =>
      item._id.toLowerCase().includes(search.toLowerCase())
    )
    : allOrders;

  const totalPages =
    data &&
      typeof data.meta === "object" &&
      data.meta !== null &&
      "totalPage" in data.meta
      ? (data.meta as { totalPage?: number }).totalPage || 1
      : 1;

  const handleVerify = async (orderId: string) => {
    const toastId = toast.loading("Verifying...");
    const res = await verifyOrder({ _id: orderId });
    if (res?.data) {
      toast.success("Order verified successfully.", { id: toastId });
      refetch();
    } else {
      toast.error("Failed to verify order.", { id: toastId });
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    const toastId = toast.loading("Updating status...");
    const res = await updateOrderStatus({ orderId, status: newStatus });
    if ("data" in res) {
      toast.success("Order status updated", { id: toastId });
      refetch();
    } else {
      toast.error("Failed to update order status", { id: toastId });
    }
  };

  if (isLoading) return <Loading />;

  const dataLength = filteredData.length;
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  return (
    <div
      className={`relative overflow-x-auto shadow-md sm:rounded-lg ${darkMode
          ? "bg-[var(--primary-darkbackground)] text-[var(--primary-foreground)]"
          : "bg-[var(--primary-foreground)] text-[var(--primary-darkbackground)]"
        }`}
    >
      <div className="flex justify-between items-center pl-4">
        <input
          className={`p-2 my-3 border-2 rounded-md w-full max-w-sm ${darkMode
              ? "border-gray-600 bg-[var(--primary-darkbackground)] text-[var(--primary-foreground)] placeholder:text-gray-400"
              : "border-black bg-[var(--primary-foreground)] text-[var(--primary-darkbackground)] placeholder:text-gray-600"
            }`}
          type="text"
          placeholder="Search by order ID..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <table
        className={`w-full text-sm text-left rtl:text-right  ${darkMode ? "text-gray-300" : "text-gray-500"
          }`}
      >
        <thead
          className={`text-xs uppercase ${darkMode
              ? "bg-[var(--primary-darkbackground)] text-[var(--primary-foreground)] border-b border-gray-700"
              : "bg-slate-700 text-gray-50"
            }`}
        >
          <tr>
            <th className=" py-3 pl-4">ID</th>
            <th className=" py-3">User Email</th>
            <th className=" py-3">Total Price</th>
            <th className=" py-3">Transaction ID</th>
            <th className=" py-3">Order Date</th> {/* NEW COLUMN */}
            <th className=" py-3">Status</th>
            <th className=" py-3">Action</th>
            <th className=" py-3">Details</th>
          </tr>
        </thead>


        {dataLength > 0 && (
          <tbody>
            {filteredData.map((item) => (
              <tr
                key={item._id}
                className={`border-b ${darkMode
                    ? "odd:bg-[var(--primary-darkbackground)] even:bg-[var(--primary-darkbackground-alt)] border-gray-700"
                    : "odd:bg-white even:bg-gray-50 border-gray-200"
                  }`}
              >
                <td className=" py-3 pl-4">{item._id}</td>
                <td className=" py-3">{item.user?.email}</td>
                <td className=" py-3">${item.totalPrice.toFixed(2)}</td>
                <td className=" py-3">{item.transaction?.id}</td>
                <td className=" py-3">
                  {item.createdAt
                    ? new Date(item.createdAt).toLocaleDateString()
                    : "N/A"}
                </td> {/* NEW DATE COLUMN */}
                <td className=" py-3">
                  {/* status cell content unchanged */}
                  {item.status.toLowerCase() === "pending" ? (
                    <span className="text-yellow-600 font-medium capitalize">
                      {item.status}
                    </span>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <span
                        className={`font-medium capitalize px-2 py-1 rounded w-fit ${item.status === "Shipped"
                            ? "bg-blue-100 text-blue-800"
                            : item.status === "Delivered"
                              ? "bg-green-100 text-green-800"
                              : item.status === "Cancelled"
                                ? "bg-red-100 text-red-800"
                                : ""
                          }`}
                      >
                        {item.status}
                      </span>

                      <select
                        className={`border rounded px-2 py-1 text-sm ${darkMode
                            ? "border-gray-600 bg-[var(--primary-darkbackground)] text-[var(--primary-foreground)]"
                            : "border-gray-300 bg-white text-black"
                          }`}
                        value={item.status}
                        onChange={(e) =>
                          handleStatusChange(item._id, e.target.value)
                        }
                      >
                        <option disabled>Update Status</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  )}
                </td>

                <td className="px-6 py-4">
                  {item.status.toLowerCase() === "pending" ? (
                    <Button
                      variant="outline"
                      className={`w-[120px] ${darkMode
                          ? "border-gray-500 text-[var(--primary-foreground)]"
                          : ""
                        }`}
                      onClick={() => {
                        if (item.transaction?.id) {
                          handleVerify(item.transaction.id);
                        } else {
                          toast.error("Transaction ID is missing.");
                        }
                      }}
                    >
                      Verify Order
                    </Button>
                  ) : (
                    <Button
                      className="bg-green-700 hover:bg-green-700 cursor-default w-[120px] text-white"
                      disabled
                    >
                      Verified
                    </Button>
                  )}
                </td>

                <td className="px-6 py-4">
                  <OrderProductDetails orderItems={item} />
                </td>
              </tr>
            ))}
          </tbody>

        )}
      </table>

      {dataLength === 0 && (
        <div className="w-full h-[150px] grid place-items-center text-2xl">
          <p>No order found</p>
        </div>
      )}

      {/* Pagination */}
      {!search && totalPages > 1 && 
            <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        maxPageButtons={7}
        darkMode={darkMode}
      />
      }
    </div>
  );
};

export default OrderAdmin;
