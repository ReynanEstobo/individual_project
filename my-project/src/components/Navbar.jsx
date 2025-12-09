import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getLoggedInUser, removeLoggedInUser } from "../utils/LocalStorage.jsx";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [loggedUser, setLoggedUser] = useState(getLoggedInUser());
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Watch localStorage changes (cross-tab)
  useEffect(() => {
    const handleStorage = () => {
      setLoggedUser(getLoggedInUser());
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    removeLoggedInUser(); // Remove logged user
    setLoggedUser(null);
    setDropdownOpen(false);
    navigate("/"); // Redirect to home
  };

  const hideAuthButtons = location.pathname === "/auth";
  const isLoggedIn = !!loggedUser;

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          JobHub
        </Link>

        <div className="hidden md:flex space-x-6">
          <Link
            to="/"
            className={`text-gray-700 hover:text-blue-600 transition ${
              location.pathname === "/" ? "text-blue-600 font-medium" : ""
            }`}
          >
            Home
          </Link>
          <Link
            to="/jobs"
            className={`text-gray-700 hover:text-blue-600 transition ${
              location.pathname === "/jobs" ? "text-blue-600 font-medium" : ""
            }`}
          >
            Browse Jobs
          </Link>
          <Link
            to="/companies"
            className={`text-gray-700 hover:text-blue-600 transition ${
              location.pathname === "/companies" ? "text-blue-600 font-medium" : ""
            }`}
          >
            Companies
          </Link>
          <Link
            to="/about"
            className={`text-gray-700 hover:text-blue-600 transition ${
              location.pathname === "/about" ? "text-blue-600 font-medium" : ""
            }`}
          >
            About
          </Link>
        </div>

        <div className="flex items-center space-x-4 relative">
          {isLoggedIn ? (
            <div ref={dropdownRef} className="relative">
              {/* Avatar button */}
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold focus:outline-none"
              >
                {loggedUser.name.charAt(0).toUpperCase()}
              </button>

              {/* Dropdown menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white border rounded-lg shadow-lg z-50">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-red-100 hover:text-red-600 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            !hideAuthButtons && (
              <>
                <Link
                  to="/auth"
                  className="text-gray-700 hover:text-blue-600 transition"
                >
                  Login
                </Link>
                <Link
                  to="/auth"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Sign Up
                </Link>
              </>
            )
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
