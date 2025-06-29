import { useParams, useNavigate } from "react-router-dom";
import { BiCart } from "react-icons/bi";
import { Badge } from "@/components/ui/badge";
import { useSpecificProductsQuery, useAllProductsQuery } from "@/redux/features/products/productApi";
import { useAppDispatch } from "@/redux/hooks";
import { Button } from "@/components/ui/button";
import Loading from "@/components/Loading";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { useDarkMode } from "@/hooks/useDarkMode";
import { useEffect, useState } from "react";

const ProductsDetails = () => {
  const { darkMode } = useDarkMode();
  const { id } = useParams();
  const { data, isLoading } = useSpecificProductsQuery(id);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const product = data?.data;
  const [mainImage, setMainImage] = useState("");

  // Set default main image
  useEffect(() => {
    if (product?.image?.length) {
      setMainImage(product.image[0]);
    }
  }, [product]);

  // Fetch Suggested Products
  const {
    data: suggestedData,
    isLoading: isSuggestedLoading,
  } = useAllProductsQuery({
    // category: product?.category,
    riderType: product?.riderType,
    limit: 6,
  });

  const handleOrder = () => {
    dispatch(addToCart({ ...product, selectQuantity: 1 }));
    navigate("/cart");
  };

  if (isLoading) return <Loading />;

  if (!product) {
    return (
      <div className={`text-center text-red-600 text-xl mt-10 ${darkMode ? "dark:text-red-400" : ""}`}>
        Product not found!
      </div>
    );
  }

  return (
    <div className={`container mx-auto px-4 py-10 mt-16 ${darkMode ? "dark" : ""}`}>
      {/* Main Product Section */}
      <div className={`rounded-xl overflow-hidden shadow-sm p-8 md:p-10 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left - Image Preview */}
          <div className="flex flex-col items-center">
            <div className="relative w-full overflow-hidden rounded-lg border-2 border-gray-300 dark:border-gray-700">
              <img
                src={mainImage}
                alt={product.name}
                className="w-full h-[300px] md:h-[450px] object-cover transition-transform duration-300 hover:scale-105"
              />
              <Badge
                className={`absolute top-3 right-3 px-3 py-1 text-sm font-semibold ${
                  product.inStock ? "bg-green-600 text-white" : "bg-red-600 text-white"
                }`}
              >
                {product.inStock ? "In Stock" : "Out of Stock"}
              </Badge>
            </div>

            {/* Thumbnails */}
            <div className="flex flex-wrap justify-center gap-3 mt-4">
              {product.image.map((img: string, index: number) => (
                <img
                  key={index}
                  src={img}
                  onClick={() => setMainImage(img)}
                  className={`h-16 w-16 object-cover rounded-md cursor-pointer border-2 ${
                    mainImage === img ? "border-red-500 ring-2 ring-red-400" : "border-gray-300"
                  } transition-all duration-200`}
                  alt={`Thumbnail ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right - Product Info */}
          <div className="flex flex-col justify-center space-y-5">
            <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>
            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">
              {product.category} Bike | Model: {product.model}
            </p>

            <div className="flex items-center gap-3">
              <Button className="bg-green-500 hover:bg-green-600 cursor-default">
                Quantity: <span className="ml-2 font-semibold">{product.quantity}</span>
              </Button>
              <span className="text-gray-400 text-sm">(Available in stock)</span>
            </div>

            <p className="text-lg">
              <span className="font-semibold">Brand:</span> {product.brand}
            </p>

            <p className="text-lg">
              <span className="font-semibold">Rider Type:</span> {product.riderType}
            </p>

            <p className="text-xl font-bold text-primary-red">
              Price: <span className="ml-2">{product.price} ৳</span>
            </p>

            <p className="leading-relaxed text-gray-700 dark:text-gray-300">{product.description}</p>

            {/* Actions */}
            {product.inStock && (
              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <button
                  className="flex items-center justify-center gap-2 px-6 py-2 rounded-md text-white font-semibold bg-primary-red hover:bg-red-800 transition-all dark:bg-red-700 dark:hover:bg-red-900"
                  onClick={() => dispatch(addToCart({ ...product, selectQuantity: 1 }))}
                >
                  <BiCart className="text-xl" /> Add to Cart
                </button>

                <button
                  onClick={handleOrder}
                  className="px-6 py-2 border border-gray-700 bg-gray-900 text-white rounded-md font-semibold hover:scale-105 hover:bg-gray-800 transition-all dark:bg-gray-700 dark:hover:bg-gray-600"
                >
                  Order Now
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Suggested Products Section */}
      {isSuggestedLoading && (
        <div className="mt-10 text-center text-gray-500 dark:text-gray-400">Loading suggested products...</div>
      )}

      {suggestedData?.data && suggestedData.data.length > 1 && (
        <div className="mt-20">
          <h2 className="text-2xl font-bold mb-6">Suggested Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {suggestedData.data
              .filter((item) => item._id !== product._id)
              .map((item) => (
                <div
                  key={item._id}
                  className={`border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-200 cursor-pointer ${
                    darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
                  }`}
                  onClick={() => navigate(`/details/${item._id}`)}
                >
                  <img
                    src={item.image[0]}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {item.category} | {item.riderType}
                    </p>
                    <p className="mt-2 font-bold text-primary-red">{item.price} ৳</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsDetails;
