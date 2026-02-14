import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { subscriptionsAPI } from "../api/subscriptions";
import PricingCard from "../components/PricingCard";
import ActiveSubscription from "../components/ActiveSubscription";
import { HiOutlineClock, HiOutlineCreditCard, HiOutlineExclamationCircle } from "react-icons/hi";

const SubscriptionsPage = () => {
  const [searchParams] = useSearchParams();
  const [plans, setPlans] = useState([]);
  const [currentSub, setCurrentSub] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyMeta, setHistoryMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(null); // plan_type being checked out
  const [testMode, setTestMode] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const [plansRes, currentRes, historyRes] = await Promise.all([
        subscriptionsAPI.getPlans(),
        subscriptionsAPI.getCurrent(),
        subscriptionsAPI.getHistory(),
      ]);

      setPlans(plansRes.data.plans);
      setTestMode(plansRes.data.test_mode);
      setCurrentSub(currentRes.data.has_active ? currentRes.data.subscription : null);
      setHistory(historyRes.data.subscriptions);
      setHistoryMeta(historyRes.data.meta);
    } catch (err) {
      toast.error("Failed to load subscription data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Show canceled toast from Stripe redirect
  useEffect(() => {
    if (searchParams.get("canceled") === "true") {
      toast.error("Payment was canceled");
    }
  }, [searchParams]);

  const handleSubscribe = async (planType) => {
    setCheckoutLoading(planType);

    try {
      const { data } = await subscriptionsAPI.checkout(planType);

      if (data.test_mode) {
        // Test mode — redirect directly to success page
        toast.success("Test subscription created!");
        window.location.href = data.url;
      } else {
        // Real Stripe — redirect to Stripe Checkout
        window.location.href = data.url;
      }
    } catch (err) {
      const message = err.response?.data?.error || "Failed to start checkout";
      toast.error(message);
    } finally {
      setCheckoutLoading(null);
    }
  };

  const loadMoreHistory = async (page) => {
    try {
      const { data } = await subscriptionsAPI.getHistory(page);
      setHistory(data.subscriptions);
      setHistoryMeta(data.meta);
    } catch (err) {
      toast.error("Failed to load history");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <svg className="animate-spin h-8 w-8 text-indigo-600" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="text-gray-500">Loading subscriptions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Subscription Plans</h1>
          <p className="mt-2 text-gray-600">
            Choose a plan to start connecting with tutors instantly
          </p>
          {testMode && (
            <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-lg">
              <HiOutlineExclamationCircle className="h-5 w-5 text-amber-500" />
              <span className="text-sm text-amber-700 font-medium">
                Test Mode — No real charges. Subscriptions activate instantly.
              </span>
            </div>
          )}
        </div>

        {/* Active Subscription */}
        {currentSub && (
          <div className="mb-10">
            <ActiveSubscription
              subscription={currentSub}
              onRefresh={fetchData}
            />
          </div>
        )}

        {/* Pricing Cards */}
        {!currentSub && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {plans.map((plan) => (
              <PricingCard
                key={plan.plan_type}
                plan={plan}
                onSubscribe={handleSubscribe}
                loading={checkoutLoading === plan.plan_type}
                popular={plan.plan_type === "six_hour"}
              />
            ))}
          </div>
        )}

        {/* If user has active subscription, show plans grayed out below */}
        {currentSub && plans.length > 0 && (
          <div className="mb-12">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">
              Available Plans (purchase after current plan expires)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-60 pointer-events-none">
              {plans.map((plan) => (
                <PricingCard
                  key={plan.plan_type}
                  plan={plan}
                  onSubscribe={() => {}}
                  loading={false}
                  popular={plan.plan_type === "six_hour"}
                />
              ))}
            </div>
          </div>
        )}

        {/* Subscription History */}
        {history.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <HiOutlineClock className="h-5 w-5 text-gray-400" />
              <h2 className="text-lg font-semibold text-gray-900">Subscription History</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Plan</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Amount</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Started</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Ended</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Payment ID</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((sub) => (
                    <tr key={sub.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-900">
                        <div className="flex items-center gap-2">
                          <HiOutlineCreditCard className="h-4 w-4 text-gray-400" />
                          {sub.plan_name}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            sub.status === "active"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {sub.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{sub.amount_display || "—"}</td>
                      <td className="py-3 px-4 text-gray-600">
                        {new Date(sub.start_time).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {new Date(sub.end_time).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="py-3 px-4 text-gray-400 text-xs font-mono truncate max-w-[150px]">
                        {sub.payment_id || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {historyMeta && historyMeta.total_pages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-gray-100">
                {Array.from({ length: historyMeta.total_pages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => loadMoreHistory(page)}
                    className={`px-3 py-1 rounded text-sm font-medium transition ${
                      page === historyMeta.current_page
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Empty History */}
        {history.length === 0 && !currentSub && (
          <div className="text-center py-8 text-gray-400">
            <HiOutlineCreditCard className="h-12 w-12 mx-auto mb-3 opacity-40" />
            <p>No subscription history yet. Choose a plan above to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionsPage;
