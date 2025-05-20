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
    image: string;
    model: string;
    price: number;
    inStock: boolean;
    description: string;
    category: string;
    brand: string;
    quantity: number; // total quantity available
}

interface ProductCardProps {
    product: Product;
    darkMode?: boolean; // new optional prop
}

const ProductCard: React.FC<ProductCardProps> = ({ product, darkMode = false }) => {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector((state) => state.cart.items);
    const navigate = useNavigate();

    const isInCart = cartItems.some((item) => item._id === product._id);
    const token = useAppSelector(selectCurrentToken);
    const isUser = token ? verifyToken(token) : null;

    const handleToggleCart = () => {
        if (!isUser) {
            navigate("/login"); // redirect to login page
            return;
        }

        if (isInCart) {
            dispatch(removeFromCart(product._id));
        } else {
            dispatch(addToCart({ ...product, selectQuantity: 1 }));
        }
    };



    return (
        <div
            key={product._id}
            className={`group relative shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-all p-4 flex flex-col justify-between
        ${darkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-900"}
      `}
        >
            {/* Image & Hover Content */}
            <div className="relative">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-56 object-cover rounded-md group-hover:opacity-70 transition-all duration-300"
                />

                {/* Stock Badge */}
                <Badge
                    className={`absolute top-2 left-2 px-3 py-1 text-xs font-semibold ${product.inStock
                            ? darkMode
                                ? "bg-teal-500 text-gray-900"
                                : "bg-teal-600 text-white"
                            : darkMode
                                ? "bg-red-700 text-gray-200"
                                : "bg-red-600 text-white"
                        }`}
                >
                    {product.inStock ? "In Stock" : "Out of Stock"}
                </Badge>

                {/* View Details Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link to={`/details/${product._id}`}>
                        <button
                            className={`py-2 px-4 rounded-md text-sm font-semibold transition-all
                ${darkMode
                                    ? "bg-teal-700 text-gray-200 hover:bg-teal-800"
                                    : "bg-teal-600 text-white hover:bg-blue-700"
                                }
              `}
                        >
                            View Details
                        </button>
                    </Link>
                </div>
            </div>

            {/* Info Section */}
            <div className="p-3 flex flex-col flex-grow">
                <h2 className="text-lg font-bold mb-1">{product.name}</h2>
                <p className={`${darkMode ? "text-gray-400" : "text-gray-600"} mb-2 text-sm`}>
                    Model: {product.model}
                </p>
                <p className={`text-lg font-medium mb-4 ${darkMode ? "text-gray-100" : "text-gray-800"
                    }`}>
                    Price:{" "}
                    <span className="font-bold text-[var(--color-secondary)]">
                        {product.price} ৳
                    </span>
                </p>

                {/* Toggle Add/Remove from Cart */}
                <button
                    onClick={handleToggleCart}
                    className={`cursor-pointer mt-auto w-full flex justify-center items-center gap-2 text-white py-2 rounded-md text-sm font-semibold transition-all ${isInCart
                            ? darkMode
                                ? "bg-red-500 hover:bg-red-800"
                                : "bg-red-400 hover:bg-red-600"
                            : darkMode
                                ? "bg-[var(--color-secondary)] hover:bg-teal-900"
                                : "bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-soft)]"
                        }`}
                >
                    {isInCart ? (
                        <>
                            <p>Remove from Cart</p> <XCircle size={20} />
                        </>
                    ) : (
                        <>
                            <p>Add to Cart</p> <ShoppingCart size={20} />
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
