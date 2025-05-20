import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { useLogOutMutation } from "@/redux/features/auth/authApi";
import { logout } from "@/redux/features/auth/authSlice";
import { toast } from "sonner";
import { CiHome } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import DashboardSidebar from "@/components/Dashboard/DashboardSidebar";

import logo from '@/assets/logo.png'
import DarkModeWrapper from "@/components/DarkModeWrapper";
import { useDarkMode } from "@/hooks/useDarkMode";
import { Moon, Sun } from "lucide-react";

export default function DashboardLayout() {
  // const { darkMode } = useDarkMode();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useAppDispatch();
  const [logOut] = useLogOutMutation();

  const handleLogOut = async () => {
    dispatch(logout());
    toast.success("Logged out!");
    await logOut({});
  };

  const { darkMode, toggleDarkMode } = useDarkMode();
  return (
    <div
      className={`md:flex h-screen w-full overflow-auto
        ${darkMode
          ? '  bg-gray-900 text-white'
          : 'bg-gray-100 text-black'
        }`}
    >
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transition-all duration-300 overflow-y-auto ${isSidebarOpen ? 'w-64' : 'w-0'
          } md:w-64 md:relative
            ${darkMode
            ? '  bg-gray-900 text-white'
            : 'bg-gray-100 text-black'
          }`}
      >
        <div className=" my-2 border-b border-gray-700 flex justify-center items-center">
          <Link to="/" className="flex justify-center items-center gap-1">
            <img src={logo} alt="" />
            <CiHome className="text-teal-500" />
          </Link>
          {/* Dark Mode Toggle */}
          <div className="flex justify-end mb-2">
            <DarkModeWrapper
              as="li"
              darkMode={darkMode}
              className="flex items-center px-2 py-1.5 rounded-2xl transition duration-300 text-sm"
            >
              <button onClick={toggleDarkMode} className="cursor-pointer">
                {darkMode ? (
                  <Sun size={35} className="text-black bg-gray-200 rounded-full p-2" />
                ) : (
                  <Moon size={35} className="bg-gray-500 text-white rounded-full p-2" />
                )}
              </button>
            </DarkModeWrapper>
          </div>
        </div>
        <DashboardSidebar />
      </div>

      {/* Sidebar overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0  bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col border-b">

        {/* Navbar */}
        <div
          className={`h-16 border-b border-gray-700 px-4 flex items-center justify-between shadow-md fixed top-0 left-0 right-0 z-30 md:relative ${darkMode
            ? ''
            : 'bg-gray-100 text-black'
            }`}
        >
          {/* Sidebar toggle button */}
          <button
            className="text-gray-700 p-2 focus:outline-none md:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 5.25h16.5m-16.5 6h16.5m-16.5 6h16.5"
              />
            </svg>
          </button>

          {/* Centered Title */}
          <div className="absolute left-1/2 transform -translate-x-1/2 pointer-events-none">
            <h1 className="text-xl font-semibold text-center mt-2">Welcome To Your Dashboard</h1>
         
          </div>
          <hr className="mt-1 border-t border-gray-400 dark:border-gray-600" />
          {/* Logout Button */}
          <div className="hidden md:block flex-shrink-0 bg-red-500 rounded-md ">
            <Button onClick={handleLogOut} className="font-medium cursor-pointer text-white">
              Logout
            </Button>
          </div>
        </div>

        {/* Optional: show logout button below on small screens */}
        <div className="block md:hidden p-4">
          <Button onClick={handleLogOut} className="w-full font-medium">
            Logout
          </Button>
        </div>



        {/* Main Outlet for Desktop */}
        <div
          className={`flex-1 hidden md:block h-full w-full overflow-auto px-4
             ${darkMode
              ? '  bg-gray-900 text-white'
              : 'bg-gray-100 text-black'
            }`}
        >
          <Outlet />
        </div>
      </div>

      {/* Main Outlet for Mobile */}
      <div
        className={`flex-1 block mt-20 md:hidden h-full w-full overflow-auto p-4 ${darkMode
          ? 'bg-[var(--primary-darkbackground)] text-[var(--primary-foreground)]'
          : 'bg-gray-100 text-black'
          }`}
      >
        <Outlet />
      </div>
    </div>
  );
}
