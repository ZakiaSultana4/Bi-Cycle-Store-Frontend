import { useParams, useNavigate } from "react-router-dom";
import { BiCart } from "react-icons/bi";
import { Badge } from "@/components/ui/badge";
import { useSpecificProductsQuery } from "@/redux/features/products/productApi";

import { useAppDispatch } from "@/redux/hooks";
import { Button } from "@/components/ui/button";
import Loading from "@/components/Loading";
import { addToCart } from "@/redux/features/cart/cartSlice";

import { useDarkMode } from "@/hooks/useDarkMode";  // <-- import hook

const ProductsDetails = () => {
  const { darkMode } = useDarkMode(); // <-- use darkMode
  const { id } = useParams();
  const { data, isLoading } = useSpecificProductsQuery(id);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const product = data?.data;

  const handleOrder = () => {
    dispatch(addToCart({ ...product, selectQuantity: 1 }));
    navigate("/cart");
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!product) {
    return (
      <div
        className={`text-center text-red-600 text-xl mt-10 ${
          darkMode ? "dark:text-red-400" : ""
        }`}
      >
        Product not found!
      </div>
    );
  }

  return (
    <div className={`container mx-auto px-4 py-8 mt-16 ${darkMode ? "dark" : ""}`}>
      <div
        className={`shadow-lg rounded-lg overflow-hidden ${
          darkMode ? "bg-gray-900" : "bg-white"
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Side - Image */}
          <div className="relative shadow-lg">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[300px] md:h-[450px] object-cover"
            />
            <Badge
              className={`absolute top-3 right-3 px-3 py-1 text-sm font-semibold ${
                product?.inStock
                  ? "bg-green-600 text-white"
                  : "bg-red-600 text-white"
              }`}
            >
              {product?.inStock ? "In Stock" : "Out of Stock"}
            </Badge>
          </div>

          {/* Right Side - Details */}
          <div
            className={`p-6 flex flex-col justify-center text-gray-800 ${
              darkMode ? "dark:text-gray-200" : ""
            }`}
          >
            <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
            <p
              className={`py-2 text-sm md:text-base mb-2 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {product.category} Bike | Model: {product.model}
            </p>
            <Button className="flex w-[120px] text-xl bg-green-500 hover:bg-green-600 cursor-default">
              Quantity: <span className="text-xl">{product?.quantity}</span>{" "}
            </Button>
            <p className="text-lg font-medium mt-4">
              <span className="font-semibold">Brand:</span> {product?.brand}
            </p>
            <p className="text-lg font-medium">
              <span className="font-semibold">Price:</span>{" "}
              <span className="text-primary-red font-bold text-xl">
                {product.price} tk
              </span>
            </p>

            <p className={`mt-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              {product.description}
            </p>

            {/* Buttons */}
            {product?.inStock && (
              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                {/* Add to Cart Button */}
                <button
                  className="flex items-center gap-2 px-4 py-2 rounded-md text-white font-semibold bg-primary-red hover:bg-red-800 transition-all dark:bg-red-700 dark:hover:bg-red-900"
                  onClick={() => dispatch(addToCart({ ...product, selectQuantity: 1 }))}
                >
                  <BiCart className="text-xl hover:scale-[1.05]" /> Add to Cart
                </button>

                {/* Go Back Button */}
                <button
                  onClick={handleOrder}
                  className="px-4 py-2 border bg-gray-900 text-white rounded-md font-semibold hover:scale-[1.05] hover:text-white duration-300 transition dark:bg-gray-700 dark:hover:bg-gray-600"
                >
                  Order
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsDetails;
