import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Load login state from localStorage
  useEffect(() => {
    const user = localStorage.getItem("loggedUser");
    setIsLoggedIn(!!user);
  }, [location.pathname]);

  // Hide login/signup on these pages
  const hiddenAuthPages = ["/auth", "/profile"];
  const hideAuthButtons = hiddenAuthPages.includes(location.pathname);

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-10">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            JobHub
          </Link>
        </div>

        {/* Center navigation */}
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
              location.pathname === "/companies"
                ? "text-blue-600 font-medium"
                : ""
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

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <div className="relative">
              <Link
                to="/profile"
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                  U
                </div>
                <span>Profile</span>
              </Link>
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
