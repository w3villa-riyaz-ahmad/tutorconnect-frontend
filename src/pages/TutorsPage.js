import React, { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { tutorsAPI } from "../api/calls";
import { Link } from "react-router-dom";
import {
  HiOutlineSearch,
  HiOutlinePhone,
  HiOutlineStatusOnline,
  HiOutlineStatusOffline,
  HiOutlineUserCircle,
  HiOutlineRefresh,
} from "react-icons/hi";

const TutorsPage = () => {
  const { user } = useAuth();
  const [tutors, setTutors] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("available");

  const fetchTutors = useCallback(async (page = 1) => {
    try {
      setLoading(true);
      const params = { page, status: statusFilter };
      if (search.trim()) params.search = search.trim();

      const { data } = await tutorsAPI.getAll(params);
      setTutors(data.tutors);
      setMeta(data.meta);
    } catch (err) {
      toast.error("Failed to load tutors");
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter]);

  useEffect(() => {
    fetchTutors();
  }, [fetchTutors]);

  // Auto-refresh every 10s
  useEffect(() => {
    const interval = setInterval(() => fetchTutors(), 10000);
    return () => clearInterval(interval);
  }, [fetchTutors]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchTutors();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Available Tutors</h1>
            <p className="mt-1 text-gray-600">
              Find a tutor and start a video call
            </p>
          </div>
          <button
            onClick={() => fetchTutors()}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition"
          >
            <HiOutlineRefresh className="h-4 w-4" />
            Refresh
          </button>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative">
              <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tutors by name..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
              />
            </div>
          </form>
          <div className="flex gap-2">
            {["available", "all"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                  statusFilter === status
                    ? "bg-indigo-600 text-white"
                    : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {status === "available" ? "Available" : "All Tutors"}
              </button>
            ))}
          </div>
        </div>

        {/* Subscription Warning */}
        {user?.role === "student" && !user?.has_active_subscription && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-3">
            <span className="text-amber-600 text-lg">⚠️</span>
            <div>
              <p className="text-sm font-medium text-amber-800">
                You need an active subscription to make calls.
              </p>
              <Link to="/subscriptions" className="text-sm text-indigo-600 hover:underline font-medium">
                Get a plan →
              </Link>
            </div>
          </div>
        )}

        {/* Tutors Grid */}
        {loading ? (
          <div className="flex justify-center py-16">
            <svg className="animate-spin h-8 w-8 text-indigo-600" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        ) : tutors.length === 0 ? (
          <div className="text-center py-16">
            <HiOutlineUserCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No tutors found</h3>
            <p className="text-gray-500 mt-1">
              {statusFilter === "available"
                ? "No tutors are available right now. Try checking back later."
                : "No tutors match your search."}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tutors.map((tutor) => (
                <TutorCard
                  key={tutor.id}
                  tutor={tutor}
                  canCall={user?.role === "student" && user?.has_active_subscription}
                />
              ))}
            </div>

            {/* Pagination */}
            {meta && meta.total_pages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: meta.total_pages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => fetchTutors(page)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                      page === meta.current_page
                        ? "bg-indigo-600 text-white"
                        : "bg-white border text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

// ── Tutor Card Component ──

const TutorCard = ({ tutor, canCall }) => {
  const isAvailable = tutor.tutor_status === "available";

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      {/* Avatar + Name */}
      <div className="flex items-center gap-4 mb-4">
        <div className="relative">
          {tutor.profile_pic_url ? (
            <img
              src={tutor.profile_pic_url}
              alt={tutor.full_name}
              className="h-14 w-14 rounded-full object-cover"
            />
          ) : (
            <div className="h-14 w-14 rounded-full bg-indigo-100 flex items-center justify-center">
              <span className="text-xl font-bold text-indigo-600">
                {tutor.first_name?.[0]}{tutor.last_name?.[0]}
              </span>
            </div>
          )}
          {/* Status dot */}
          <span
            className={`absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white ${
              isAvailable ? "bg-green-500" : tutor.tutor_status === "busy" ? "bg-red-500" : "bg-gray-400"
            }`}
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{tutor.full_name}</h3>
          <div className="flex items-center gap-1.5 text-sm">
            {isAvailable ? (
              <>
                <HiOutlineStatusOnline className="h-4 w-4 text-green-500" />
                <span className="text-green-600 font-medium">Available</span>
              </>
            ) : tutor.tutor_status === "busy" ? (
              <>
                <HiOutlinePhone className="h-4 w-4 text-red-500" />
                <span className="text-red-500 font-medium">In a call</span>
              </>
            ) : (
              <>
                <HiOutlineStatusOffline className="h-4 w-4 text-gray-400" />
                <span className="text-gray-500">Offline</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Info */}
      {tutor.address && (
        <p className="text-xs text-gray-500 mb-4 truncate">📍 {tutor.address}</p>
      )}

      {/* Call Button */}
      {canCall && isAvailable ? (
        <Link
          to={`/call?teacher_id=${tutor.id}&teacher_name=${encodeURIComponent(tutor.full_name)}`}
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition text-sm"
        >
          <HiOutlinePhone className="h-4 w-4" />
          Start Call
        </Link>
      ) : canCall && !isAvailable ? (
        <button
          disabled
          className="w-full py-2.5 bg-gray-100 text-gray-400 rounded-xl font-medium text-sm cursor-not-allowed"
        >
          Not Available
        </button>
      ) : (
        <Link
          to="/subscriptions"
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-indigo-100 text-indigo-600 rounded-xl font-medium hover:bg-indigo-200 transition text-sm"
        >
          Subscribe to Call
        </Link>
      )}
    </div>
  );
};

export default TutorsPage;
