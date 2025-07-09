import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import { useState } from "react";

const Navbar = () => {
  const { cart } = useSelector((state) => state);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Common styling for NavLinks
  const linkStyle = ({ isActive }) =>
    isActive
      ? "text-green-300 font-semibold border-b-2 border-green-400 pb-1"
      : "hover:text-green-300 transition duration-200";

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#1E293B] shadow-md">
      <div className="flex justify-between items-center h-20 max-w-6xl mx-auto px-4">
        {/* Logo */}
        <NavLink to="/">
          <div className="ml-2 transition duration-300 ease-in-out hover:scale-110">
            <Logo />
          </div>
        </NavLink>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-x-6 text-white font-medium">
          <NavLink to="/" className={linkStyle}>
            Home
          </NavLink>
          <NavLink to="/menu" className={linkStyle}>
            Menu
          </NavLink>
          <NavLink to="/contact" className={linkStyle}>
            Contact Us
          </NavLink>
          <NavLink to="/cart" className={linkStyle}>
            <div className="relative">
              <FaShoppingCart className="text-2xl" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-400 rounded-full text-xs w-5 h-5 flex items-center justify-center animate-bounce text-white">
                  {cart.length}
                </span>
              )}
            </div>
          </NavLink>
        </nav>

        {/* Mobile Icon */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white text-2xl focus:outline-none"
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#1E293B] px-4 py-4 space-y-4 text-white font-medium">
          <NavLink to="/" onClick={() => setMobileMenuOpen(false)} className={linkStyle}>
            Home
          </NavLink>
          <NavLink to="/menu" onClick={() => setMobileMenuOpen(false)} className={linkStyle}>
            Menu
          </NavLink>
          <NavLink to="/contact" onClick={() => setMobileMenuOpen(false)} className={linkStyle}>
            Contact Us
          </NavLink>
          <NavLink to="/cart" onClick={() => setMobileMenuOpen(false)} className={linkStyle}>
            <div className="relative inline-block">
              <FaShoppingCart className="text-xl" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-400 rounded-full text-xs w-5 h-5 flex items-center justify-center animate-bounce text-white">
                  {cart.length}
                </span>
              )}
            </div>
          </NavLink>
        </div>
      )}
    </header>
  );
};

export default Navbar;
