import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import TeacherStatus from "../components/TeacherStatus";
import { HiOutlineAcademicCap, HiOutlineClock, HiOutlinePhone } from "react-icons/hi";

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome, {user?.first_name}! 👋
          </h1>
          <p className="mt-1 text-gray-600">
            {user?.role === "student" && "Find a tutor and start learning."}
            {user?.role === "teacher" && "Manage your availability and connect with students."}
            {user?.role === "admin" && "Manage the platform and its users."}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-indigo-100 rounded-lg">
                <HiOutlineAcademicCap className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Account Type</p>
                <p className="text-lg font-semibold text-gray-900 capitalize">{user?.role}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <HiOutlineClock className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Subscription</p>
                <p className="text-lg font-semibold text-gray-900">
                  {user?.has_active_subscription ? (
                    <Link to="/subscriptions" className="text-green-600 hover:underline">
                      Active — {user?.active_subscription?.plan_name}
                    </Link>
                  ) : (
                    <Link to="/subscriptions" className="text-indigo-600 hover:underline">
                      Get a Plan →
                    </Link>
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <HiOutlinePhone className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">
                  {user?.role === "teacher" ? "Status" : "Calls Made"}
                </p>
                <p className="text-lg font-semibold text-gray-900 capitalize">
                  {user?.role === "teacher" ? (
                    <span className={
                      user.tutor_status === "available" ? "text-green-600" :
                      user.tutor_status === "busy" ? "text-red-600" : "text-gray-400"
                    }>
                      {user.tutor_status}
                    </span>
                  ) : (
                    <Link to="/calls" className="text-indigo-600 hover:underline">
                      {user?.total_calls || 0} calls
                    </Link>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* User Info Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Profile</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-500">Full Name</label>
              <p className="font-medium text-gray-900">{user?.first_name} {user?.last_name}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Email</label>
              <p className="font-medium text-gray-900">{user?.email}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Email Verified</label>
              <p className="font-medium">
                {user?.verified ? (
                  <span className="text-green-600">✓ Verified</span>
                ) : (
                  <span className="text-red-600">✗ Not Verified</span>
                )}
              </p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Member Since</label>
              <p className="font-medium text-gray-900">
                {user?.created_at ? new Date(user.created_at).toLocaleDateString("en-US", {
                  year: "numeric", month: "long", day: "numeric"
                }) : "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* Teacher Status Toggle */}
        {user?.role === "teacher" && (
          <div className="mt-6">
            <TeacherStatus />
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {!user?.has_active_subscription && user?.role === "student" && (
            <Link
              to="/subscriptions"
              className="p-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl text-white text-center hover:shadow-lg transition-shadow"
            >
              <p className="text-lg font-bold">🚀 Get Started</p>
              <p className="text-sm text-indigo-100 mt-1">
                Subscribe to start learning with a tutor
              </p>
            </Link>
          )}
          {user?.has_active_subscription && user?.role === "student" && (
            <Link
              to="/tutors"
              className="p-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-white text-center hover:shadow-lg transition-shadow"
            >
              <p className="text-lg font-bold">📞 Find a Tutor</p>
              <p className="text-sm text-green-100 mt-1">
                Browse available tutors and start a call
              </p>
            </Link>
          )}
          {user?.role === "admin" && (
            <Link
              to="/admin"
              className="p-6 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl text-white text-center hover:shadow-lg transition-shadow"
            >
              <p className="text-lg font-bold">⚙️ Admin Panel</p>
              <p className="text-sm text-amber-100 mt-1">
                Manage users, view platform stats, and more
              </p>
            </Link>
          )}
          {user?.role !== "admin" && (
            <div className="p-6 bg-indigo-50 rounded-xl border border-indigo-100 text-center">
              <p className="text-indigo-700 font-medium">
                📚 Keep learning and growing with TutorConnect!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
