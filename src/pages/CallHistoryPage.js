import React, { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { callsAPI } from "../api/calls";
import {
  HiOutlinePhone,
  HiOutlineClock,
  HiOutlineExclamationCircle,
} from "react-icons/hi";

const CallHistoryPage = () => {
  const { user } = useAuth();
  const [calls, setCalls] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchHistory = useCallback(async (page = 1) => {
    try {
      setLoading(true);
      const { data } = await callsAPI.getHistory(page);
      setCalls(data.calls);
      setMeta(data.meta);
    } catch (err) {
      toast.error("Failed to load call history");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const formatDuration = (secs) => {
    if (!secs || secs <= 0) return "0s";
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    const parts = [];
    if (h > 0) parts.push(`${h}h`);
    if (m > 0) parts.push(`${m}m`);
    if (s > 0 || parts.length === 0) parts.push(`${s}s`);
    return parts.join(" ");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Call History</h1>
          <p className="mt-1 text-gray-600">Your past tutoring sessions</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <svg className="animate-spin h-8 w-8 text-indigo-600" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        ) : calls.length === 0 ? (
          <div className="text-center py-16">
            <HiOutlinePhone className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No calls yet</h3>
            <p className="text-gray-500 mt-1">Your call history will appear here</p>
          </div>
        ) : (
          <>
            <div className="space-y-3">
              {calls.map((call) => (
                <div
                  key={call.id}
                  className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-sm transition"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-indigo-600">
                          {user?.role === "teacher"
                            ? call.student.name?.split(" ").map((n) => n[0]).join("").slice(0, 2)
                            : call.teacher.name?.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </span>
                      </div>

                      <div>
                        <p className="font-semibold text-gray-900">
                          {user?.role === "teacher" ? call.student.name : call.teacher.name}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
                          <span>
                            {new Date(call.started_at).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                          <span className="flex items-center gap-1">
                            <HiOutlineClock className="h-3 w-3" />
                            {formatDuration(call.duration)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          call.status === "ended"
                            ? "bg-green-100 text-green-700"
                            : call.status === "dropped"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {call.status === "dropped" && <HiOutlineExclamationCircle className="h-3 w-3" />}
                        {call.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {meta && meta.total_pages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: meta.total_pages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => fetchHistory(page)}
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

export default CallHistoryPage;
