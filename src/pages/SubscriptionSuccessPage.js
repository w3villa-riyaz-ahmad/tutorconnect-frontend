import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { subscriptionsAPI } from "../api/subscriptions";
import { HiOutlineCheckCircle, HiOutlineExclamationCircle } from "react-icons/hi";

const SubscriptionSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const verify = async () => {
      try {
        const params = {};
        const sessionId = searchParams.get("session_id");
        const isTest = searchParams.get("test");

        if (sessionId) params.session_id = sessionId;
        if (isTest) params.test = isTest;

        const { data } = await subscriptionsAPI.verifySuccess(params);
        setSubscription(data.subscription);
        toast.success(data.message || "Subscription activated!");
      } catch (err) {
        setError(err.response?.data?.error || "Could not verify subscription");
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <svg className="animate-spin h-10 w-10 text-indigo-600" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="text-gray-500">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center bg-white rounded-2xl shadow-sm border p-8">
          <HiOutlineExclamationCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Issue</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            to="/subscriptions"
            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition"
          >
            Back to Subscriptions
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center bg-white rounded-2xl shadow-sm border p-8">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <HiOutlineCheckCircle className="h-12 w-12 text-green-600" />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful! 🎉</h2>
        <p className="text-gray-600 mb-6">
          Your subscription has been activated. You can now connect with tutors!
        </p>

        {/* Subscription Details */}
        {subscription && (
          <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-gray-500">Plan</p>
                <p className="font-semibold text-gray-900">{subscription.plan_name}</p>
              </div>
              <div>
                <p className="text-gray-500">Amount</p>
                <p className="font-semibold text-gray-900">{subscription.amount_display}</p>
              </div>
              <div>
                <p className="text-gray-500">Time Remaining</p>
                <p className="font-semibold text-green-600">{subscription.time_remaining_display}</p>
              </div>
              <div>
                <p className="text-gray-500">Expires</p>
                <p className="font-semibold text-gray-900">
                  {new Date(subscription.end_time).toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition"
          >
            Go to Dashboard
          </Link>
          <Link
            to="/subscriptions"
            className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition"
          >
            View Subscriptions
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionSuccessPage;
