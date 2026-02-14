import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { HiOutlineLogout, HiOutlineUser, HiOutlineUserCircle, HiAcademicCap, HiOutlineCreditCard, HiOutlinePhone, HiOutlineClock, HiOutlineCog } from "react-icons/hi";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <HiAcademicCap className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">TutorConnect</span>
          </Link>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <HiOutlineUser className="h-5 w-5" />
                  <span>{user?.first_name} {user?.last_name}</span>
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
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-sm font-medium px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
