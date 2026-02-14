import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { adminUsersAPI } from "../api/admin";
import toast from "react-hot-toast";
import {
  HiOutlineSearch,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineBan,
  HiOutlineCheckCircle,
  HiOutlineShieldCheck,
  HiOutlineEye,
} from "react-icons/hi";

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    role: "",
    status: "",
    sort_by: "created_at",
    sort_dir: "desc",
    page: 1,
  });

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.search) params.search = filters.search;
      if (filters.role) params.role = filters.role;
      if (filters.status) params.status = filters.status;
      params.sort_by = filters.sort_by;
      params.sort_dir = filters.sort_dir;
      params.page = filters.page;

      const { data } = await adminUsersAPI.getAll(params);
      setUsers(data.users);
      setPagination(data.pagination);
    } catch (err) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Debounced search
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters((prev) => ({ ...prev, search: searchInput, page: 1 }));
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const handleBan = async (userId, userName) => {
    const reason = window.prompt(`Ban reason for ${userName}:`);
    if (reason === null) return; // cancelled
    try {
      await adminUsersAPI.ban(userId, reason || "Banned by admin");
      toast.success(`${userName} has been banned`);
      fetchUsers();
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to ban user");
    }
  };

  const handleUnban = async (userId, userName) => {
    if (!window.confirm(`Unban ${userName}?`)) return;
    try {
      await adminUsersAPI.unban(userId);
      toast.success(`${userName} has been unbanned`);
      fetchUsers();
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to unban user");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
            <p className="mt-1 text-gray-600">
              {pagination ? `${pagination.total_count} users total` : "Loading..."}
            </p>
          </div>
          <Link
            to="/admin"
            className="text-sm text-indigo-600 hover:underline"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2 relative">
              <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Role Filter */}
            <select
              value={filters.role}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, role: e.target.value, page: 1 }))
              }
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">All Roles</option>
              <option value="student">Students</option>
              <option value="teacher">Teachers</option>
              <option value="admin">Admins</option>
            </select>

            {/* Status Filter */}
            <select
              value={filters.status}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, status: e.target.value, page: 1 }))
              }
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="banned">Banned</option>
              <option value="unverified">Unverified</option>
            </select>

            {/* Sort */}
            <select
              value={`${filters.sort_by}:${filters.sort_dir}`}
              onChange={(e) => {
                const [sort_by, sort_dir] = e.target.value.split(":");
                setFilters((prev) => ({ ...prev, sort_by, sort_dir, page: 1 }));
              }}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
            >
              <option value="created_at:desc">Newest First</option>
              <option value="created_at:asc">Oldest First</option>
              <option value="email:asc">Email A–Z</option>
              <option value="email:desc">Email Z–A</option>
              <option value="first_name:asc">Name A–Z</option>
              <option value="first_name:desc">Name Z–A</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-400">No users found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tutor Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Joined
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id} className={`hover:bg-gray-50 ${user.banned ? "bg-red-50" : ""}`}>
                      {/* User Info */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {user.profile_pic_url ? (
                            <img
                              src={user.profile_pic_url}
                              alt=""
                              className="h-10 w-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                              <span className="text-indigo-600 font-medium text-sm">
                                {user.first_name?.[0]}{user.last_name?.[0]}
                              </span>
                            </div>
                          )}
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">{user.full_name}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                          </div>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            user.role === "admin"
                              ? "bg-purple-100 text-purple-700"
                              : user.role === "teacher"
                              ? "bg-green-100 text-green-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.banned ? (
                          <span className="flex items-center text-xs text-red-600">
                            <HiOutlineBan className="h-4 w-4 mr-1" />
                            Banned
                          </span>
                        ) : user.verified ? (
                          <span className="flex items-center text-xs text-green-600">
                            <HiOutlineCheckCircle className="h-4 w-4 mr-1" />
                            Active
                          </span>
                        ) : (
                          <span className="flex items-center text-xs text-yellow-600">
                            <HiOutlineShieldCheck className="h-4 w-4 mr-1" />
                            Unverified
                          </span>
                        )}
                      </td>

                      {/* Tutor Status */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.role === "teacher" ? (
                          <span
                            className={`text-xs capitalize ${
                              user.tutor_status === "available"
                                ? "text-green-600"
                                : user.tutor_status === "busy"
                                ? "text-red-600"
                                : "text-gray-400"
                            }`}
                          >
                            {user.tutor_status}
                          </span>
                        ) : (
                          <span className="text-xs text-gray-300">—</span>
                        )}
                      </td>

                      {/* Joined */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(user.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Link
                            to={`/admin/users/${user.id}`}
                            className="p-1.5 text-gray-400 hover:text-indigo-600 transition-colors"
                            title="View Details"
                          >
                            <HiOutlineEye className="h-5 w-5" />
                          </Link>
                          {user.role !== "admin" && (
                            <>
                              {user.banned ? (
                                <button
                                  onClick={() => handleUnban(user.id, user.full_name)}
                                  className="px-3 py-1 text-xs font-medium text-green-700 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                                >
                                  Unban
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleBan(user.id, user.full_name)}
                                  className="px-3 py-1 text-xs font-medium text-red-700 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                                >
                                  Ban
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {pagination && pagination.total_pages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Page {pagination.current_page} of {pagination.total_pages} · {pagination.total_count} users
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={() =>
                    setFilters((prev) => ({ ...prev, page: prev.page - 1 }))
                  }
                  disabled={pagination.current_page <= 1}
                  className="p-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <HiOutlineChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() =>
                    setFilters((prev) => ({ ...prev, page: prev.page + 1 }))
                  }
                  disabled={pagination.current_page >= pagination.total_pages}
                  className="p-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <HiOutlineChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagementPage;
