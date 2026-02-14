import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { adminUsersAPI } from "../api/admin";
import toast from "react-hot-toast";
import {
  HiOutlineArrowLeft,
  HiOutlineBan,
  HiOutlineCheckCircle,
  HiOutlineShieldCheck,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineClock,
  HiOutlineLocationMarker,
  HiOutlinePencil,
  HiOutlineSave,
  HiOutlineX,
} from "react-icons/hi";

const UserDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({});

  const fetchUser = async () => {
    try {
      const { data } = await adminUsersAPI.getById(id);
      setUser(data.user);
      setEditForm({
        first_name: data.user.first_name,
        last_name: data.user.last_name,
        role: data.user.role,
        verified: data.user.verified,
      });
    } catch (err) {
      toast.error("Failed to load user");
      navigate("/admin/users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSave = async () => {
    try {
      const updates = {};
      if (editForm.first_name !== user.first_name) updates.first_name = editForm.first_name;
      if (editForm.last_name !== user.last_name) updates.last_name = editForm.last_name;
      if (editForm.role !== user.role) updates.role = editForm.role;
      if (editForm.verified !== user.verified) updates.verified = editForm.verified;

      if (Object.keys(updates).length === 0) {
        setEditing(false);
        return;
      }

      const { data } = await adminUsersAPI.update(id, updates);
      setUser(data.user);
      setEditing(false);
      toast.success("User updated successfully");
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to update user");
    }
  };

  const handleBan = async () => {
    const reason = window.prompt(`Ban reason for ${user.full_name}:`);
    if (reason === null) return;
    try {
      const { data } = await adminUsersAPI.ban(id, reason || "Banned by admin");
      setUser(data.user);
      toast.success(`${user.full_name} has been banned`);
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to ban user");
    }
  };

  const handleUnban = async () => {
    if (!window.confirm(`Unban ${user.full_name}?`)) return;
    try {
      const { data } = await adminUsersAPI.unban(id);
      setUser(data.user);
      toast.success(`${user.full_name} has been unbanned`);
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to unban user");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Navigation */}
        <Link
          to="/admin/users"
          className="flex items-center text-sm text-gray-500 hover:text-indigo-600 mb-6"
        >
          <HiOutlineArrowLeft className="h-4 w-4 mr-1" />
          Back to Users
        </Link>

        {/* User Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              {user.profile_pic_url ? (
                <img
                  src={user.profile_pic_url}
                  alt=""
                  className="h-20 w-20 rounded-full object-cover ring-2 ring-gray-200"
                />
              ) : (
                <div className="h-20 w-20 rounded-full bg-indigo-100 flex items-center justify-center ring-2 ring-gray-200">
                  <span className="text-indigo-600 font-bold text-2xl">
                    {user.first_name?.[0]}{user.last_name?.[0]}
                  </span>
                </div>
              )}
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{user.full_name}</h1>
                <div className="flex items-center space-x-2 mt-1">
                  <span
                    className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                      user.role === "admin"
                        ? "bg-purple-100 text-purple-700"
                        : user.role === "teacher"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {user.role}
                  </span>
                  {user.banned ? (
                    <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-red-100 text-red-700">
                      Banned
                    </span>
                  ) : user.verified ? (
                    <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-700">
                      Active
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700">
                      Unverified
                    </span>
                  )}
                  {user.provider && (
                    <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
                      via {user.provider}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              {!editing ? (
                <button
                  onClick={() => setEditing(true)}
                  className="flex items-center space-x-1 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors text-sm"
                >
                  <HiOutlinePencil className="h-4 w-4" />
                  <span>Edit</span>
                </button>
              ) : (
                <>
                  <button
                    onClick={handleSave}
                    className="flex items-center space-x-1 px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm"
                  >
                    <HiOutlineSave className="h-4 w-4" />
                    <span>Save</span>
                  </button>
                  <button
                    onClick={() => {
                      setEditing(false);
                      setEditForm({
                        first_name: user.first_name,
                        last_name: user.last_name,
                        role: user.role,
                        verified: user.verified,
                      });
                    }}
                    className="flex items-center space-x-1 px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm"
                  >
                    <HiOutlineX className="h-4 w-4" />
                    <span>Cancel</span>
                  </button>
                </>
              )}
              {user.role !== "admin" && (
                user.banned ? (
                  <button
                    onClick={handleUnban}
                    className="flex items-center space-x-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                  >
                    <HiOutlineCheckCircle className="h-4 w-4" />
                    <span>Unban</span>
                  </button>
                ) : (
                  <button
                    onClick={handleBan}
                    className="flex items-center space-x-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                  >
                    <HiOutlineBan className="h-4 w-4" />
                    <span>Ban User</span>
                  </button>
                )
              )}
            </div>
          </div>

          {/* Ban Info */}
          {user.banned && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">
                <strong>Banned:</strong> {user.ban_reason || "No reason provided"}
              </p>
              {user.banned_at && (
                <p className="text-xs text-red-500 mt-1">
                  Banned on{" "}
                  {new Date(user.banned_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Details */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">User Details</h2>
            <div className="space-y-4">
              {editing ? (
                <>
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">First Name</label>
                    <input
                      type="text"
                      value={editForm.first_name}
                      onChange={(e) =>
                        setEditForm((prev) => ({ ...prev, first_name: e.target.value }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">Last Name</label>
                    <input
                      type="text"
                      value={editForm.last_name}
                      onChange={(e) =>
                        setEditForm((prev) => ({ ...prev, last_name: e.target.value }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">Role</label>
                    <select
                      value={editForm.role}
                      onChange={(e) =>
                        setEditForm((prev) => ({ ...prev, role: e.target.value }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="student">Student</option>
                      <option value="teacher">Teacher</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="verified"
                      checked={editForm.verified}
                      onChange={(e) =>
                        setEditForm((prev) => ({ ...prev, verified: e.target.checked }))
                      }
                      className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <label htmlFor="verified" className="text-sm text-gray-700">
                      Email Verified
                    </label>
                  </div>
                </>
              ) : (
                <>
                  <DetailRow
                    icon={<HiOutlineMail className="h-5 w-5 text-gray-400" />}
                    label="Email"
                    value={user.email}
                  />
                  <DetailRow
                    icon={<HiOutlineShieldCheck className="h-5 w-5 text-gray-400" />}
                    label="Verified"
                    value={
                      user.verified ? (
                        <span className="text-green-600">✓ Verified</span>
                      ) : (
                        <span className="text-red-600">✗ Not Verified</span>
                      )
                    }
                  />
                  {user.role === "teacher" && (
                    <DetailRow
                      icon={<HiOutlinePhone className="h-5 w-5 text-gray-400" />}
                      label="Tutor Status"
                      value={
                        <span
                          className={`capitalize ${
                            user.tutor_status === "available"
                              ? "text-green-600"
                              : user.tutor_status === "busy"
                              ? "text-red-600"
                              : "text-gray-400"
                          }`}
                        >
                          {user.tutor_status}
                        </span>
                      }
                    />
                  )}
                  {user.address && (
                    <DetailRow
                      icon={<HiOutlineLocationMarker className="h-5 w-5 text-gray-400" />}
                      label="Address"
                      value={user.address}
                    />
                  )}
                  <DetailRow
                    icon={<HiOutlineClock className="h-5 w-5 text-gray-400" />}
                    label="Joined"
                    value={new Date(user.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  />
                  <DetailRow
                    icon={<HiOutlineClock className="h-5 w-5 text-gray-400" />}
                    label="Last Updated"
                    value={new Date(user.updated_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  />
                </>
              )}
            </div>
          </div>

          {/* Activity & Subscription */}
          <div className="space-y-6">
            {/* Subscription Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Subscription</h2>
              {user.active_subscription ? (
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Plan</span>
                    <span className="text-sm font-medium text-gray-900 capitalize">
                      {user.active_subscription.plan_name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Status</span>
                    <span className="text-sm font-medium text-green-600 capitalize">
                      {user.active_subscription.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Expires</span>
                    <span className="text-sm text-gray-700">
                      {new Date(user.active_subscription.end_time).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Time Left</span>
                    <span className="text-sm font-medium text-indigo-600">
                      {formatTimeRemaining(user.active_subscription.time_remaining)}
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-400">No active subscription</p>
              )}
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Total Subscriptions</span>
                  <span className="text-sm font-medium text-gray-900">{user.total_subscriptions}</span>
                </div>
              </div>
            </div>

            {/* Call Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Call Activity</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Total Calls</span>
                  <span className="text-sm font-medium text-gray-900">{user.total_calls}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">In Active Call</span>
                  <span className={`text-sm font-medium ${user.in_active_call ? "text-green-600" : "text-gray-400"}`}>
                    {user.in_active_call ? "Yes" : "No"}
                  </span>
                </div>
              </div>
            </div>

            {/* User ID */}
            <div className="bg-gray-100 rounded-xl p-4">
              <p className="text-xs text-gray-500">User ID: {user.id}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailRow = ({ icon, label, value }) => (
  <div className="flex items-start space-x-3">
    <div className="mt-0.5">{icon}</div>
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm font-medium text-gray-900">{value}</p>
    </div>
  </div>
);

const formatTimeRemaining = (seconds) => {
  if (!seconds || seconds <= 0) return "Expired";
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  if (hours > 0) return `${hours}h ${mins}m`;
  return `${mins}m`;
};

export default UserDetailPage;
