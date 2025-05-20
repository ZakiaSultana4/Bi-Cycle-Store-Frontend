import { Button } from "@/components/ui/button";
import { Link, useSearchParams } from "react-router-dom";
import { useDarkMode } from "@/hooks/useDarkMode"; // adjust import path if needed

const OrderResponse = () => {
  const [searchParams] = useSearchParams();
  const invoice = searchParams.get("order_id");
console.log(invoice);

  const { darkMode } = useDarkMode();

  return (
    <div
      className={`flex items-center justify-center min-h-[75vh] p-6 ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div
        className={`rounded-xl p-6 md:p-10 text-center max-w-md w-full shadow-lg ${
          darkMode
            ? "bg-gray-800 text-gray-100 shadow-gray-700"
            : "bg-white text-gray-800 shadow-gray-300"
        }`}
      >
        <h1 className="text-2xl md:text-3xl font-extrabold mb-4">
          Order Created!
        </h1>
        <p className="mb-6 text-gray-400">{/* lighter text in dark mode */}
          Your transaction ID is:
        </p>
        <div
          className={`py-3 px-6 rounded-lg font-mono text-lg shadow-inner mb-6 ${
            darkMode ? "bg-gray-700 text-gray-200" : "bg-gray-100 text-black"
          }`}
        >
          {invoice || "N/A"}
        </div>

        <Link to="/user/dashboard/viewOrders">
          <Button className="w-full text-white bg-teal-500 font-semibold py-3 rounded-lg transition duration-300">
            View My Orders
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default OrderResponse;
