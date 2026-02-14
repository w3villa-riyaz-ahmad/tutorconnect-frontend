import React, { useState, useEffect, useCallback } from "react";
import { HiOutlineClock, HiOutlineRefresh, HiOutlineBadgeCheck } from "react-icons/hi";

const ActiveSubscription = ({ subscription, onRefresh }) => {
  const [timeLeft, setTimeLeft] = useState(subscription?.time_remaining || 0);

  // Countdown timer
  useEffect(() => {
    if (!subscription || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (onRefresh) onRefresh();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [subscription, timeLeft, onRefresh]);

  const formatTime = useCallback((seconds) => {
    if (seconds <= 0) return { hours: "00", minutes: "00", secs: "00" };
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return {
      hours: String(h).padStart(2, "0"),
      minutes: String(m).padStart(2, "0"),
      secs: String(s).padStart(2, "0"),
    };
  }, []);

  if (!subscription) return null;

  const time = formatTime(timeLeft);
  const isExpiringSoon = timeLeft > 0 && timeLeft < 600; // Less than 10 min
  const isExpired = timeLeft <= 0;

  return (
    <div
      className={`rounded-2xl p-6 border-2 ${
        isExpired
          ? "bg-red-50 border-red-200"
          : isExpiringSoon
          ? "bg-amber-50 border-amber-300"
          : "bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <HiOutlineBadgeCheck
            className={`h-6 w-6 ${isExpired ? "text-red-500" : "text-indigo-600"}`}
          />
          <h3 className="text-lg font-bold text-gray-900">
            {isExpired ? "Subscription Expired" : "Active Subscription"}
          </h3>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            isExpired
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {isExpired ? "Expired" : "Active"}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Plan Info */}
        <div className="bg-white/70 rounded-xl p-4">
          <p className="text-xs text-gray-500 mb-1">Plan</p>
          <p className="text-lg font-bold text-gray-900">{subscription.plan_name}</p>
          {subscription.amount_display && (
            <p className="text-sm text-gray-500">{subscription.amount_display}</p>
          )}
        </div>

        {/* Time Remaining */}
        <div className="bg-white/70 rounded-xl p-4">
          <p className="text-xs text-gray-500 mb-1">Time Remaining</p>
          {isExpired ? (
            <p className="text-lg font-bold text-red-600">00:00:00</p>
          ) : (
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-mono font-bold text-gray-900">{time.hours}</span>
              <span className="text-gray-400">:</span>
              <span className="text-2xl font-mono font-bold text-gray-900">{time.minutes}</span>
              <span className="text-gray-400">:</span>
              <span className="text-2xl font-mono font-bold text-gray-900">{time.secs}</span>
            </div>
          )}
        </div>

        {/* Expiry Time */}
        <div className="bg-white/70 rounded-xl p-4">
          <p className="text-xs text-gray-500 mb-1">Expires At</p>
          <p className="text-sm font-semibold text-gray-900">
            {new Date(subscription.end_time).toLocaleString("en-US", {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
            <HiOutlineClock className="h-3 w-3" />
            Started{" "}
            {new Date(subscription.start_time).toLocaleString("en-US", {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      </div>

      {isExpired && (
        <div className="flex items-center justify-center gap-2 mt-2">
          <button
            onClick={onRefresh}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
          >
            <HiOutlineRefresh className="h-4 w-4" />
            Get a new subscription
          </button>
        </div>
      )}

      {isExpiringSoon && !isExpired && (
        <p className="text-center text-amber-700 text-sm font-medium mt-2">
          ⚠️ Your subscription is expiring soon!
        </p>
      )}
    </div>
  );
};

export default ActiveSubscription;
