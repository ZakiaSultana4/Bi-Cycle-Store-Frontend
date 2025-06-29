import { Link, useNavigate } from "react-router-dom";
import { Badge } from "./ui/badge";
import { ShoppingCart, XCircle } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToCart, removeFromCart } from "@/redux/features/cart/cartSlice";
import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import { verifyToken } from "@/utils/verifyToken";

interface Product {
  _id: string;
  name: string;
  image: string[]; // ✅ updated to array
  model: string;
  price: number;
  inStock: boolean;
  description: string;
  category: string;
  riderType: string;
  brand: string;
  quantity: number;
}

interface ProductCardProps {
  product: Product;
  darkMode?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, darkMode = false }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cartItems = useAppSelector((state) => state.cart.items);
  const token = useAppSelector(selectCurrentToken);
  const isUser = token ? verifyToken(token) : null;
  const isInCart = cartItems.some((item) => item._id === product._id);

  const handleToggleCart = () => {
    if (!isUser) {
      navigate("/login");
      return;
    }

    if (isInCart) {
      dispatch(removeFromCart(product._id));
    } else {
      dispatch(addToCart({ ...product, image: product.image[0], selectQuantity: 1 }));
    }
  };

  return (
    <div
      key={product._id}
      className={`group relative shadow-md hover:shadow-xl rounded-xl overflow-hidden transition-all border ${
        darkMode ? "bg-gray-900 text-gray-100 border-gray-700" : "bg-white text-gray-900 border-gray-200"
      }`}
    >
      {/* Image Section */}
      <div className="relative">
        <img
          src={product.image[0]} // ✅ show first image only
          alt={product.name}
          className="w-full h-56 object-cover rounded-t-xl group-hover:opacity-75 transition-all duration-300"
        />

        {/* Stock Badge */}
        <Badge
          className={`absolute top-3 left-3 px-3 py-1 text-xs font-semibold ${
            product.inStock
              ? darkMode
                ? "bg-green-500 text-black"
                : "bg-green-600 text-white"
              : darkMode
              ? "bg-red-700 text-white"
              : "bg-red-600 text-white"
          }`}
        >
          {product.inStock ? "In Stock" : "Out of Stock"}
        </Badge>

        {/* View Details Hover Button */}
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Link to={`/details/${product._id}`}>
            <button
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${
                darkMode
                  ? "bg-teal-700 text-white hover:bg-teal-800"
                  : "bg-teal-600 text-white hover:bg-teal-700"
              }`}
            >
              View Details
            </button>
          </Link>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg font-bold line-clamp-1">{product.name}</h3>
        <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          Model: <span className="font-medium">{product.model}</span>
        </p>
        <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          Rider Type: <span className="capitalize">{product.riderType}</span>
        </p>
        <p className="text-lg font-semibold text-primary-red">
          {product.price} ৳
        </p>

        {/* Cart Button */}
        <button
          onClick={handleToggleCart}
          className={`mt-3 w-full flex justify-center items-center gap-2 py-2 rounded-md text-sm font-semibold transition-all ${
            isInCart
              ? darkMode
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-red-500 hover:bg-red-600 text-white"
              : darkMode
              ? "bg-teal-600 hover:bg-teal-700 text-white"
              : "bg-teal-500 hover:bg-teal-600 text-white"
          }`}
        >
          {isInCart ? (
            <>
              Remove from Cart <XCircle size={18} />
            </>
          ) : (
            <>
              Add to Cart <ShoppingCart size={18} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
