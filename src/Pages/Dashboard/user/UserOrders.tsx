import { useState } from "react";
import Loading from "@/components/Loading";
import { OrderProductDetails } from "../OrderProductDetails";
import { useGetAllOrdersQuery } from "@/redux/features/order/orderApi";
import { IOrderResponse } from "@/types/types";

type Order = IOrderResponse;

const UserOrders = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 7;

  const { data, isLoading } = useGetAllOrdersQuery({ page, limit });

  const filteredData = data?.data?.filter((item: Order) =>
    item._id.toLowerCase().includes(search.toLowerCase())
  );

  const totalPage = data?.meta?.totalPage || 1;

  if (isLoading) return <Loading />;

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
      {/* Search Box */}
      <div className="flex justify-between items-center mb-3">
        <input
          className="p-2 border border-gray-300 text-black rounded-md"
          type="text"
          placeholder="Search by ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Orders Table */}
    <div className="min-h-[300px]">
  <table className="w-full text-sm text-left text-gray-500">
  <thead className="text-xs text-white uppercase bg-slate-700">
  <tr>
    <th className="px-6 py-3">Id</th>
    <th className="px-6 py-3">User Email</th>
    <th className="px-6 py-3">Transaction Id</th>
    <th className="px-6 py-3">Price</th>
    <th className="px-6 py-3">Date</th> {/* ➕ Added Date header */}
    <th className="px-6 py-3">Status</th>
    <th className="px-6 py-3">Details</th>
  </tr>
</thead>
<tbody>
  {filteredData?.length > 0 ? (
    filteredData.map((item: Order) => (
      <tr
        key={item._id}
        className="odd:bg-white even:bg-gray-50 border-b border-gray-200"
      >
        <td className="px-6 py-4">{item._id}</td>
        <td className="px-6 py-4">{item.user?.email}</td>
        <td className="px-6 py-4">{item.transaction?.id}</td>
        <td className="px-6 py-4">{item.totalPrice}</td>
        <td className="px-6 py-4">
          {new Date(item.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </td> {/* ➕ Added formatted date */}
        <td className="px-6 py-4">
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold 
              ${
                item.status === "Pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : item.status === "Shipped"
                  ? "bg-blue-100 text-blue-800"
                  : item.status === "Delivered"
                  ? "bg-green-100 text-green-800"
                  : item.status === "Cancelled"
                  ? "bg-red-100 text-red-800"
                  : "bg-gray-100 text-gray-800"
              }`}
          >
            {item.status}
          </span>
        </td>
        <td className="px-6 py-4">
          <OrderProductDetails orderItems={item} />
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={7} className="text-center py-6">
        No matching orders found.
      </td>
    </tr>
  )}
</tbody>

  </table>
</div>

{/* Pagination Controls */}
<div className="flex justify-center items-center mt-6 space-x-4">
  <button
    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
    disabled={page === 1}
    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
  >
    Prev
  </button>
  <span className="text-gray-700">
    Page {page} of {totalPage}
  </span>
  <button
    onClick={() => setPage((prev) => Math.min(prev + 1, totalPage))}
    disabled={page === totalPage}
    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
  >
    Next
  </button>
</div>

    </div>
  );
};

export default UserOrders;
