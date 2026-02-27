import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  HiOutlineLogout,
  HiOutlineUser,
  HiOutlineUserCircle,
  HiAcademicCap,
  HiOutlineCreditCard,
  HiOutlinePhone,
  HiOutlineClock,
  HiOutlineCog,
  HiOutlineMenu,
  HiOutlineX,
} from "react-icons/hi";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // Determine if we're on a public page (for transparent navbar style)
  const publicPaths = ["/", "/about", "/services", "/contact"];
  const isPublicPage = publicPaths.includes(location.pathname);

  // Public nav links
  const publicLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/services", label: "Services" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={`${
        isPublicPage && !isAuthenticated
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-white shadow-sm border-b border-gray-200"
      } sticky top-0 z-50`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link
            to={isAuthenticated ? "/dashboard" : "/"}
            className="flex items-center space-x-2"
          >
            <HiAcademicCap className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">TutorConnect</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <HiOutlineUser className="h-5 w-5" />
                  <span>
                    {user?.first_name} {user?.last_name}
                  </span>
                  <span className="px-2 py-0.5 text-xs rounded-full bg-indigo-100 text-indigo-700 font-medium capitalize">
                    {user?.role}
                  </span>
                </div>
                <Link
                  to="/profile"
                  className="flex items-center space-x-1 text-sm text-gray-500 hover:text-indigo-600 transition-colors"
                >
                  <HiOutlineUserCircle className="h-5 w-5" />
                  <span>Profile</span>
                </Link>
                <Link
                  to="/subscriptions"
                  className="flex items-center space-x-1 text-sm text-gray-500 hover:text-indigo-600 transition-colors"
                >
                  <HiOutlineCreditCard className="h-5 w-5" />
                  <span>Plans</span>
                </Link>
                <Link
                  to="/tutors"
                  className="flex items-center space-x-1 text-sm text-gray-500 hover:text-indigo-600 transition-colors"
                >
                  <HiOutlinePhone className="h-5 w-5" />
                  <span>Tutors</span>
                </Link>
                <Link
                  to="/calls"
                  className="flex items-center space-x-1 text-sm text-gray-500 hover:text-indigo-600 transition-colors"
                >
                  <HiOutlineClock className="h-5 w-5" />
                  <span>History</span>
                </Link>
                {user?.role === "admin" && (
                  <Link
                    to="/admin"
                    className="flex items-center space-x-1 text-sm text-amber-600 hover:text-amber-700 transition-colors font-medium"
                  >
                    <HiOutlineCog className="h-5 w-5" />
                    <span>Admin</span>
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-sm text-gray-500 hover:text-red-600 transition-colors"
                >
                  <HiOutlineLogout className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                {/* Public page links */}
                <div className="flex items-center space-x-1">
                  {publicLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        location.pathname === link.to
                          ? "text-indigo-600 bg-indigo-50"
                          : "text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
                <div className="w-px h-6 bg-gray-200 mx-2" />
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors px-3 py-2"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-sm font-medium px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <HiOutlineX className="h-6 w-6" />
            ) : (
              <HiOutlineMenu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-100 py-4 space-y-2">
            {isAuthenticated ? (
              <>
                <div className="px-3 py-2 text-sm text-gray-600 font-medium">
                  {user?.first_name} {user?.last_name}{" "}
                  <span className="px-2 py-0.5 text-xs rounded-full bg-indigo-100 text-indigo-700 font-medium capitalize">
                    {user?.role}
                  </span>
                </div>
                {[
                  { to: "/dashboard", label: "Dashboard" },
                  { to: "/profile", label: "Profile" },
                  { to: "/subscriptions", label: "Plans" },
                  { to: "/tutors", label: "Tutors" },
                  { to: "/calls", label: "History" },
                ].map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="block px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                {user?.role === "admin" && (
                  <Link
                    to="/admin"
                    className="block px-3 py-2 rounded-lg text-sm text-amber-600 font-medium hover:bg-amber-50 transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    handleLogout();
                  }}
                  className="block w-full text-left px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {publicLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      location.pathname === link.to
                        ? "text-indigo-600 bg-indigo-50"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="border-t border-gray-100 pt-3 mt-3 space-y-2">
                  <Link
                    to="/login"
                    className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="block mx-3 text-center py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
