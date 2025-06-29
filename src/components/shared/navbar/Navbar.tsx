import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileX, Menu, Moon, ShoppingCart, Sun } from "lucide-react";
import { useDarkMode } from "@/hooks/useDarkMode";
import logo from "@/assets/logo.png";
import { Link, NavLink, } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";
import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import { ProfileDropdown } from "./ProfileDropdown";
import { TUser } from "@/types/types";
import DarkModeWrapper from "@/components/DarkModeWrapper";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useDarkMode();
  // const location = useLocation();
  const cartData = useAppSelector((state) => state.cart);
  const token = useAppSelector(selectCurrentToken);
  const isUser = token ? verifyToken(token) : null;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "All Products", href: "/allProducts" },
  {
  name: "Shop by Rider",
  type: "mega",
  items: [
    { name: "Men's Bikes", href: "/allProducts?riderType=Men" },
    { name: "Women's Bikes", href: "/allProducts?riderType=Women" },
    { name: "Kids' Bikes", href: "/allProducts?riderType=Kids" },
  ],
},

    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 shadow-2xl ${
        darkMode
          ? "bg-[var(--primary-darkbackground)] text-[var(--primary-foreground)]"
          : "bg-[var(--primary-foreground)] text-[var(--primary-darkbackground)]"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div>
          <img src={logo} alt="Logo" className="h-10" />
        </div>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex flex-1 justify-center space-x-2 font-medium items-center">
          {navLinks.map((link) => (
            <DarkModeWrapper
              as="li"
              key={link.name}
              darkMode={darkMode}
              className="group relative px-1 py-1 rounded-xl overflow-visible transition-all duration-300"
            >
              {link.type === "mega" ? (
                <div className="relative">
                  <button className="font-semibold cursor-pointer px-4 py-2 tracking-wide font-['Playfair_Display'] hover:text-[var(--color-secondary)]">
                    {link.name}
                  </button>
                  <div className="absolute left-0 top-full z-40 mt-2 w-56 bg-white shadow-lg rounded-md py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    {link.items.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-[var(--color-secondary)]"
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              ) : (
                <NavLink
                  to={link.href ?? "/"}
                  className={({ isActive }) => `
                    relative z-10 block px-4 py-2 font-semibold tracking-wide font-['Playfair_Display']
                    transition-all duration-300 ease-in-out transform
                    ${
                      isActive
                        ? "text-[var(--color-secondary)] scale-105 after:scale-x-100"
                        : `${
                            darkMode ? "text-gray-200" : "text-gray-700"
                          } hover:scale-105 group-hover:text-[var(--color-secondary)] after:scale-x-0`
                    }
                    after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2
                    after:bottom-0 after:h-[2px] after:w-[80%]
                    after:bg-[var(--color-secondary)] after:rounded-full after:transition-transform
                    after:duration-300 after:origin-center
                  `}
                >
                  {link.name}
                </NavLink>
              )}
            </DarkModeWrapper>
          ))}
        </ul>

        {/* Desktop Right Side */}
        <ul className="hidden md:flex space-x-4 items-center">
          <DarkModeWrapper
            as="li"
            darkMode={darkMode}
            className="relative flex items-center border px-2 py-1 border-gray-500 rounded-2xl hover:text-black transition duration-300 text-sm"
          >
            <Link to="/cart">
              <ShoppingCart
                className={`${
                  darkMode ? "text-white" : "text-black"
                } w-5 h-5`}
              />
              {isUser && cartData?.items?.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] font-bold rounded-full px-1.5 py-0.5 shadow ring-1 ring-white">
                  {cartData.items.length}
                </span>
              )}
            </Link>
          </DarkModeWrapper>

          <DarkModeWrapper as="li" darkMode={darkMode}>
            <button onClick={toggleDarkMode} className="cursor-pointer">
              {darkMode ? (
                <Sun
                  size={35}
                  className="text-black bg-gray-200 rounded-full p-2"
                />
              ) : (
                <Moon
                  size={35}
                  className="bg-gray-500 text-white rounded-full p-2"
                />
              )}
            </button>
          </DarkModeWrapper>

          <li>
            {isUser ? (
              <ProfileDropdown user={isUser as TUser} darkMode={darkMode} />
            ) : (
              <Link to="/login">
                <Button
                  variant="outline"
                  className="cursor-pointer text-[var(--primary-foreground)] bg-teal-600 font-semibold text-lg hover:shadow-md h-10"
                >
                  Log in
                </Button>
              </Link>
            )}
          </li>
        </ul>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <FileX className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul
          className={`md:hidden px-4 pb-4 pt-2 space-y-4 text-center ${
            darkMode
              ? "bg-[var(--primary-darkbackground)] text-white"
              : "bg-white text-black"
          }`}
        >
          {navLinks.map((link) =>
            link.type === "mega" ? (
              <li key={link.name}>
                <span className="block font-semibold text-lg">{link.name}</span>
                <div className="pl-4 pt-1 space-y-1">
                  {link.items.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      className="block text-sm py-1 hover:text-[var(--color-secondary)]"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              </li>
            ) : (
              <li key={link.name}>
                <NavLink
                  to={link.href ?? "/"}
                  className={({ isActive }) =>
                    `block px-4 py-2 font-semibold rounded transition-all ${
                      isActive
                        ? "text-[var(--color-secondary)] bg-gray-100 dark:bg-gray-700"
                        : "hover:text-[var(--color-secondary)]"
                    }`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                </NavLink>
              </li>
            )
          )}
          <li>
            <button onClick={toggleDarkMode} className="w-full flex justify-center">
              {darkMode ? (
                <Sun size={28} className="text-black bg-gray-200 rounded-full p-1" />
              ) : (
                <Moon size={28} className="bg-gray-500 text-white rounded-full p-1" />
              )}
            </button>
          </li>
          <li>
            {isUser ? (
              <ProfileDropdown user={isUser as TUser} darkMode={darkMode} />
            ) : (
              <Link to="/login">
                <Button
                  variant="outline"
                  className="w-full text-[var(--primary-foreground)] bg-teal-600 font-semibold text-lg hover:shadow-md"
                >
                  Log in
                </Button>
              </Link>
            )}
          </li>
        </ul>
      )}
    </header>
  );
};

export default Navbar;
