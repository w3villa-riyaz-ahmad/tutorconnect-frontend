import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { adminDashboardAPI } from "../api/admin";
import toast from "react-hot-toast";
import {
  HiOutlineUsers,
  HiOutlineAcademicCap,
  HiOutlinePhone,
  HiOutlineCurrencyDollar,
  HiOutlineShieldCheck,
  HiOutlineBan,
  HiOutlineClock,
  HiOutlineRefresh,
  HiOutlineTrendingUp,
  HiOutlineCheckCircle,
} from "react-icons/hi";

const AdminDashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [statsRes, activityRes] = await Promise.all([
        adminDashboardAPI.getStats(),
        adminDashboardAPI.getRecentActivity(),
      ]);
      setStats(statsRes.data.stats);
      setActivity(activityRes.data);
    } catch (err) {
      toast.error("Failed to load admin dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Failed to load dashboard data.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="mt-1 text-gray-600">Platform overview and management</p>
          </div>
          <button
            onClick={() => { setLoading(true); fetchData(); }}
            className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <HiOutlineRefresh className="h-5 w-5" />
            <span>Refresh</span>
          </button>
        </div>

        {/* Key Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Users"
            value={stats.users.total}
            subtitle={`+${stats.users.new_today} today`}
            icon={<HiOutlineUsers className="h-6 w-6" />}
            color="indigo"
          />
          <StatCard
            title="Active Subscriptions"
            value={stats.subscriptions.active}
            subtitle={`${stats.subscriptions.total} total`}
            icon={<HiOutlineCheckCircle className="h-6 w-6" />}
            color="green"
          />
          <StatCard
            title="Calls Today"
            value={stats.calls.today}
            subtitle={`${stats.calls.active_now} active now`}
            icon={<HiOutlinePhone className="h-6 w-6" />}
            color="purple"
          />
          <StatCard
            title="Revenue"
            value={`$${stats.revenue.total}`}
            subtitle={`$${stats.revenue.this_month} this month`}
            icon={<HiOutlineCurrencyDollar className="h-6 w-6" />}
            color="amber"
          />
        </div>

        {/* Detailed Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* User Breakdown */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">User Breakdown</h2>
              <Link
                to="/admin/users"
                className="text-sm text-indigo-600 hover:underline"
              >
                Manage Users →
              </Link>
            </div>
            <div className="space-y-3">
              <StatRow
                label="Students"
                value={stats.users.students}
                icon={<HiOutlineAcademicCap className="h-5 w-5 text-blue-500" />}
              />
              <StatRow
                label="Teachers"
                value={stats.users.teachers}
                icon={<HiOutlineUsers className="h-5 w-5 text-green-500" />}
                extra={`${stats.users.teachers_online} online, ${stats.users.teachers_busy} busy`}
              />
              <StatRow
                label="Admins"
                value={stats.users.admins}
                icon={<HiOutlineShieldCheck className="h-5 w-5 text-purple-500" />}
              />
              <StatRow
                label="Verified"
                value={stats.users.verified}
                icon={<HiOutlineCheckCircle className="h-5 w-5 text-emerald-500" />}
              />
              <StatRow
                label="Unverified"
                value={stats.users.unverified}
                icon={<HiOutlineClock className="h-5 w-5 text-yellow-500" />}
              />
              <StatRow
                label="Banned"
                value={stats.users.banned}
                icon={<HiOutlineBan className="h-5 w-5 text-red-500" />}
              />
            </div>
          </div>

          {/* Call Statistics */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Call Statistics</h2>
            <div className="space-y-3">
              <StatRow
                label="Active Now"
                value={stats.calls.active_now}
                icon={<div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />}
              />
              <StatRow label="Total Calls" value={stats.calls.total} />
              <StatRow label="Ended" value={stats.calls.ended} />
              <StatRow label="Dropped" value={stats.calls.dropped} />
              <StatRow label="This Week" value={stats.calls.this_week} />
              <StatRow label="This Month" value={stats.calls.this_month} />
              <StatRow
                label="Avg Duration"
                value={formatDuration(stats.calls.avg_duration)}
              />
            </div>
          </div>

          {/* Subscription Breakdown */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Subscription Plans</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm font-medium text-gray-500 border-b pb-2">
                <span>Plan</span>
                <div className="flex space-x-8">
                  <span>Total</span>
                  <span>Active</span>
                </div>
              </div>
              <PlanRow
                label="1 Hour — $9.99"
                total={stats.subscriptions.by_plan.one_hour}
                active={stats.subscriptions.active_by_plan.one_hour}
              />
              <PlanRow
                label="6 Hours — $39.99"
                total={stats.subscriptions.by_plan.six_hour}
                active={stats.subscriptions.active_by_plan.six_hour}
              />
              <PlanRow
                label="12 Hours — $59.99"
                total={stats.subscriptions.by_plan.twelve_hour}
                active={stats.subscriptions.active_by_plan.twelve_hour}
              />
            </div>
          </div>

          {/* Revenue Details */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue</h2>
            <div className="space-y-3">
              <StatRow
                label="Total Revenue"
                value={`$${stats.revenue.total}`}
                icon={<HiOutlineTrendingUp className="h-5 w-5 text-green-500" />}
              />
              <StatRow label="This Month" value={`$${stats.revenue.this_month}`} />
              <StatRow label="Today" value={`$${stats.revenue.today}`} />
              <StatRow label="Transactions" value={stats.revenue.total_transactions} />
            </div>
          </div>
        </div>

        {/* Growth Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl p-6 text-white">
            <p className="text-indigo-200 text-sm">New Users Today</p>
            <p className="text-3xl font-bold mt-1">{stats.users.new_today}</p>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
            <p className="text-purple-200 text-sm">New This Week</p>
            <p className="text-3xl font-bold mt-1">{stats.users.new_this_week}</p>
          </div>
          <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl p-6 text-white">
            <p className="text-pink-200 text-sm">New This Month</p>
            <p className="text-3xl font-bold mt-1">{stats.users.new_this_month}</p>
          </div>
        </div>

        {/* Recent Activity */}
        {activity && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Users */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Users</h3>
              <div className="space-y-3">
                {activity.recent_users.map((u) => (
                  <Link
                    key={u.id}
                    to={`/admin/users/${u.id}`}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">{u.name}</p>
                      <p className="text-xs text-gray-500">{u.email}</p>
                    </div>
                    <span className="px-2 py-0.5 text-xs rounded-full bg-indigo-100 text-indigo-700 capitalize">
                      {u.role}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent Calls */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Calls</h3>
              <div className="space-y-3">
                {activity.recent_calls.map((c) => (
                  <div
                    key={c.id}
                    className="p-2 rounded-lg border border-gray-100"
                  >
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-medium text-gray-900">
                        {c.student} → {c.teacher}
                      </p>
                      <span
                        className={`px-2 py-0.5 text-xs rounded-full ${
                          c.status === "active"
                            ? "bg-green-100 text-green-700"
                            : c.status === "ended"
                            ? "bg-gray-100 text-gray-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {c.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Duration: {formatDuration(c.duration)}
                    </p>
                  </div>
                ))}
                {activity.recent_calls.length === 0 && (
                  <p className="text-sm text-gray-400 text-center py-4">No calls yet</p>
                )}
              </div>
            </div>

            {/* Recent Subscriptions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Subscriptions</h3>
              <div className="space-y-3">
                {activity.recent_subscriptions.map((s) => (
                  <div
                    key={s.id}
                    className="p-2 rounded-lg border border-gray-100"
                  >
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-medium text-gray-900">{s.user}</p>
                      <span className="text-xs text-gray-500 capitalize">
                        {s.plan_type.replace("_", " ")}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {s.amount ? `$${s.amount}` : "Free"} · {s.status}
                    </p>
                  </div>
                ))}
                {activity.recent_subscriptions.length === 0 && (
                  <p className="text-sm text-gray-400 text-center py-4">No subscriptions yet</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* Helper Components */
const StatCard = ({ title, value, subtitle, icon, color }) => {
  const colors = {
    indigo: "bg-indigo-100 text-indigo-600",
    green: "bg-green-100 text-green-600",
    purple: "bg-purple-100 text-purple-600",
    amber: "bg-amber-100 text-amber-600",
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-lg ${colors[color]}`}>{icon}</div>
      </div>
    </div>
  );
};

const StatRow = ({ label, value, icon, extra }) => (
  <div className="flex items-center justify-between py-1">
    <div className="flex items-center space-x-2">
      {icon && <span>{icon}</span>}
      <span className="text-sm text-gray-600">{label}</span>
    </div>
    <div className="text-right">
      <span className="text-sm font-semibold text-gray-900">{value}</span>
      {extra && (
        <p className="text-xs text-gray-400">{extra}</p>
      )}
    </div>
  </div>
);

const PlanRow = ({ label, total, active }) => (
  <div className="flex items-center justify-between py-1">
    <span className="text-sm text-gray-600">{label}</span>
    <div className="flex space-x-8">
      <span className="text-sm font-semibold text-gray-900 w-8 text-center">{total}</span>
      <span className="text-sm font-semibold text-green-600 w-8 text-center">{active}</span>
    </div>
  </div>
);

const formatDuration = (seconds) => {
  if (!seconds || seconds === 0) return "0s";
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins > 0) return `${mins}m ${secs}s`;
  return `${secs}s`;
};

export default AdminDashboardPage;
