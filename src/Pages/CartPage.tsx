import { Button } from "@/components/ui/button";
import { RiDeleteBin2Fill } from "react-icons/ri";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  removeFromCart,
  updateQuantity,
} from "@/redux/features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "@/hooks/useDarkMode"; // Assuming your custom hook

const CartPage = () => {
  const cartData = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();

  return (
    <section
      className={`container mx-auto min-h-[70vh] mt-16 py-6 px-4 md:px-5 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
      } flex flex-col lg:flex-row lg:items-stretch gap-8`}
    >
      {/* Left Side: Product List */}
      <div
        className={`lg:flex-1 rounded-lg shadow-md p-6 ${
          darkMode ? "bg-gray-800 shadow-gray-700" : "bg-white shadow-gray-300"
        }`}
      >
        <h2 className="text-xl font-bold mb-4">
          MY CART
        </h2>
        {cartData?.items.length > 0 ? (
          cartData?.items?.map((item) => (
            <div
              key={item?._id}
              className="flex md:flex-row flex-col items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-700 py-4"
            >
              <img
                src={item.image}
                alt="Product"
                className="w-32 object-cover border rounded border-gray-300 dark:border-gray-600"
              />
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Model: {item?.model}</p>
              </div>
              <div className="flex items-center border rounded-md border-gray-300 dark:border-gray-600">
                <button
                  className="px-3 py-1 border-r text-gray-600 dark:text-gray-300 dark:border-gray-600"
                  onClick={() =>
                    dispatch(
                      updateQuantity({
                        id: item._id,
                        selectQuantity: Math.max(item.selectQuantity - 1, 1),
                      })
                    )
                  }
                >
                  -
                </button>
                <span className="px-4">{item?.selectQuantity}</span>
                <button
                  className="px-3 py-1 border-l text-gray-600 dark:text-gray-300 dark:border-gray-600"
                  onClick={() =>
                    dispatch(
                      updateQuantity({
                        id: item._id,
                        selectQuantity: Math.min(
                          item?.selectQuantity + 1,
                          item.quantity
                        ),
                      })
                    )
                  }
                >
                  +
                </button>
              </div>
              <div>
                <span className="font-semibold text-lg">
                  $ {item.price.toFixed(2)}
                </span>
              </div>
              <div>
                <Button
                  onClick={() => dispatch(removeFromCart(item?._id))}
                  variant="link"
                  className="text-primary-red flex items-center gap-2"
                >
                  <RiDeleteBin2Fill className="w-5 h-5 mr-1" /> Remove
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full h-full grid place-items-center text-semibold text-center text-xl text-gray-500 dark:text-gray-400">
            <p>Your cart is empty.</p>
          </div>
        )}
      </div>

      {/* Right Side: Price Summary (Fixed Sidebar) */}
  <div className="lg:w-1/3">
  <div
    className={`rounded-lg shadow-md p-6 sticky top-32 flex flex-col justify-center ${
      darkMode ? "bg-gray-800 shadow-gray-700" : "bg-white shadow-gray-300"
    }`}
  >
    <h2 className="text-xl font-bold mb-4">Summary</h2>
    <div className="flex justify-between mb-2">
      <span className="text-xl">Total Product:</span>
      <span className="text-2xl">{cartData?.totalQuantity}</span>
    </div>
    <div className="flex justify-between font-bold text-lg mb-4">
      <span className="text-xl">Total Price:</span>
      <span className="text-2xl">Tk.{cartData?.totalPrice}</span>
    </div>
    {cartData?.items.length > 0 && (
      <Button
        className="w-full text-white bg-red-500"
        onClick={() => navigate("/order")}
      >
        Checkout
      </Button>
    )}
  </div>
</div>

    </section>
  );
};

export default CartPage;
