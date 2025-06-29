import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Container from "@/components/Container";
import SectionTitle from "@/components/SectionTitle";
import Products from "@/components/Products";
import { useDarkMode } from "@/hooks/useDarkMode";
import Pagination from "@/components/Pagination";
import { useAllProductsQuery } from "@/redux/features/products/productApi";





export default function AllProducts() {
  const { darkMode } = useDarkMode();

  const [filters, setFilters] = useState({
    searchTerm: "",
    category: "",
    inStock: "",
    minPrice: "",
    maxPrice: "",
    riderType: "", // Rider Type filter
  });

  const [currentPage, setCurrentPage] = useState(1);
  const limit = 9;

  // ✅ Fixed handler type
  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    console.log("Changed:", name, value); // Debug log
    setFilters((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  const query = useMemo(() => {
    const params: Record<string, string> = {
      page: currentPage.toString(),
      limit: limit.toString(),
    };
    if (filters.searchTerm) params.searchTerm = filters.searchTerm;
    if (filters.category) params.category = filters.category;
    if (filters.inStock)
      params.inStock = filters.inStock === "In Stock" ? "true" : "false";
    if (filters.minPrice) params.minPrice = filters.minPrice;
    if (filters.maxPrice) params.maxPrice = filters.maxPrice;
    if (filters.riderType) params.riderType = filters.riderType;
    return params;
  }, [filters, currentPage]);

  const { data, isLoading } = useAllProductsQuery(query);
  const totalPages = data?.meta?.totalPage || 1;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleResetFilters = () => {
    setFilters({
      searchTerm: "",
      category: "",
      inStock: "",
      minPrice: "",
      maxPrice: "",
      riderType: "",
    });
    setCurrentPage(1);
  };
const [searchParams] = useSearchParams();

useEffect(() => {
  const riderTypeParam = searchParams.get("riderType");
  if (riderTypeParam) {
    setFilters((prev) => ({ ...prev, riderType: riderTypeParam }));
    setCurrentPage(1);
  }
}, [searchParams]);

  const inputClasses = `p-3 border rounded-md flex-1 transition-colors duration-300 placeholder:text-sm placeholder:font-light ${
    darkMode
      ? "bg-gray-800 text-white border-gray-600 placeholder-gray-400 focus:border-teal-400"
      : "bg-white text-gray-900 border-gray-300 placeholder-gray-500 focus:border-teal-600"
  }`;

  const selectClasses = `p-3 border rounded-md transition-colors duration-300 ${
    darkMode
      ? "bg-gray-800 text-white border-gray-600 focus:border-teal-400"
      : "bg-white text-gray-900 border-gray-300 focus:border-teal-600"
  }`;

  const priceInputClasses = `p-3 border rounded-md w-28 transition-colors duration-300 placeholder:text-sm placeholder:font-light ${
    darkMode
      ? "bg-gray-800 text-white border-gray-600 placeholder-gray-400 focus:border-teal-400"
      : "bg-white text-gray-900 border-gray-300 placeholder-gray-500 focus:border-teal-600"
  }`;

  const resetButtonClasses = `px-5 py-2 rounded-md font-medium transition-colors duration-300 ${
    darkMode
      ? "bg-gray-700 hover:bg-gray-600 text-white shadow-md"
      : "bg-gray-200 hover:bg-gray-300 text-gray-900 shadow-sm"
  }`;

  return (
    <Container
      className={`pt-28 min-h-screen ${
        darkMode
          ? "bg-[var(--primary-darkbackground)] text-white"
          : "bg-[var(--primary-foreground)] text-gray-900"
      }`}
    >
      <SectionTitle titleheading="All Products" />

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 items-center">
        <input
          type="text"
          name="searchTerm"
          placeholder="Search by brand, name, or category"
          className={inputClasses}
          value={filters.searchTerm}
          onChange={handleFilterChange}
        />

        <select
          name="category"
          className={selectClasses}
          value={filters.category}
          onChange={handleFilterChange}
        >
          <option value="">All Categories</option>
          <option value="Mountain">Mountain</option>
          <option value="Road">Road</option>
          <option value="Hybrid">Hybrid</option>
          <option value="Electric">Electric</option>
        </select>

        <select
          name="inStock"
          className={selectClasses}
          value={filters.inStock}
          onChange={handleFilterChange}
        >
          <option value="">All Availability</option>
          <option value="In Stock">In Stock</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>

        <select
          name="riderType"
          className={selectClasses}
          value={filters.riderType}
          onChange={handleFilterChange}
        >
          <option value="">All Rider Types</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
        </select>

        <div className="flex gap-2 items-center">
          <input
            type="number"
            name="minPrice"
            placeholder="Min Price"
            className={priceInputClasses}
            value={filters.minPrice}
            onChange={handleFilterChange}
            min={0}
          />
          <span className={darkMode ? "text-white" : "text-gray-900"}>-</span>
          <input
            type="number"
            name="maxPrice"
            placeholder="Max Price"
            className={priceInputClasses}
            value={filters.maxPrice}
            onChange={handleFilterChange}
            min={0}
          />
          <button
            type="button"
            className={resetButtonClasses}
            onClick={handleResetFilters}
            aria-label="Reset filters"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Products List */}
  <Products
  data={{
    data: (data?.data ?? []).map((item) => ({
      ...item,
      image: Array.isArray(item.image) ? item.image : [item.image],
      inStock: item.inStock, // ✅ Ensure `inStock` is included
    })),
  }}
  loading={isLoading}
  limit={limit}
/>


      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        maxPageButtons={7}
        darkMode={darkMode}
      />
    </Container>
  );
}
