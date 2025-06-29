import Loading from "@/components/Loading";
import { useAllProductsQuery } from "@/redux/features/products/productApi";
import { useState } from "react";
import AddProduct from "./AddProduct";
import EditProductDetails from "./EditProductDetails";
import { FaTimes, FaCheck } from "react-icons/fa";
import Pagination from "@/components/Pagination";
import { useDarkMode } from "@/hooks/useDarkMode";

export function ProductTable() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
   const { darkMode} = useDarkMode();
  const limit = 10;

  // Fetching paginated data
  const { isLoading, data } = useAllProductsQuery({ page: currentPage, limit });

  const filteredData = data?.data?.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );
  const dataLength = filteredData?.length ?? 0;
  const totalPages = data?.meta?.totalPage ?? 1;
  if (isLoading) return <Loading />;
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div
      className={`relative overflow-x-auto shadow-md sm:rounded-lg p-4 ${
        darkMode
          ? 'bg-[var(--primary-darkbackground)] text-[var(--primary-foreground)]'
          : 'bg-[var(--primary-foreground)] text-[var(--primary-darkbackground)]'
      }`}
    >
      {/* Toggle dark mode button for demo */}

      <div className="flex justify-between items-center pr-1">
        <input
          className={`p-2 my-3 border-2 rounded-md ${
            darkMode
              ? 'border-[var(--primary-foreground)] bg-[var(--primary-darkbackground)] text-[var(--primary-foreground)]'
              : 'border-black bg-white text-black'
          }`}
          type="text"
          placeholder="Search name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <AddProduct darkMode={darkMode}/>
      </div>

      <table
        className={`w-full text-sm text-left rtl:text-right ${
          darkMode ? 'text-[var(--primary-foreground)]' : 'text-gray-500'
        }`}
      >
        <thead
          className={`text-xs uppercase ${
            darkMode
              ? 'bg-slate-600 text-amber-50'
              : 'bg-slate-700 text-gray-50'
          }`}
        >
          <tr>
            <th scope="col" className="px-6 py-3">Image</th>
            <th scope="col" className="px-6 py-3">Name</th>
            <th scope="col" className="px-6 py-3">Brand</th>
            <th scope="col" className="px-6 py-3">Category</th>
            <th scope="col" className="px-6 py-3">Price</th>
            <th scope="col" className="px-6 py-3">Quantity</th>
            <th scope="col" className="px-6 py-3">Rider Type</th>
            <th scope="col" className="px-6 py-3">In Stock</th>
            <th scope="col" className="px-6 py-3">Action</th>
          </tr>
        </thead>

        {dataLength > 0 && (
          <tbody>
            {filteredData?.map((item, index) => (
              <tr
                key={index}
                className={`border-b ${
                  darkMode
                    ? index % 2 === 0
                      ? 'bg-[var(--primary-darkbackground)]'
                      : 'bg-[var(--primary-darkbackground)]/80'
                    : index % 2 === 0
                    ? 'bg-white'
                    : 'bg-gray-50'
                } border-gray-200`}
              >
                <th
                  scope="row"
                  className={`px-6 py-4 font-medium whitespace-nowrap ${
                    darkMode ? 'text-[var(--primary-foreground)]' : 'text-gray-900'
                  }`}
                >
                  <img
                    src={item.image}
                    className="w-8 h-8 rounded-full"
                    alt="product"
                  />
                </th>
                <td className="px-6 py-4">{item?.name}</td>
                <td className="px-6 py-4">{item?.brand}</td>
                <td className="px-6 py-4">{item?.category}</td>
                <td className="px-6 py-4">{item?.price}</td>
                <td className="px-6 py-4">{item?.quantity}</td>
                <td className="px-6 py-4">{item?.riderType}</td>
                <td className="px-6 py-4">
                  {item?.quantity === 0 ? (
                    <FaTimes className="w-4 text-red-500" />
                  ) : (
                    <FaCheck className="w-4 text-green-500" />
                  )}
                </td>
                <td className="px-6 py-4">
                  <EditProductDetails product={item} />
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>

      {dataLength === 0 && (
        <div className="w-full h-[150px] grid place-items-center text-2xl">
          <p>No Product Found</p>
        </div>
      )}

      {/* Pagination controls */}
      {data?.meta && (
            <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        maxPageButtons={7}
        darkMode={darkMode}
      />
      )}
    </div>
  );
}
