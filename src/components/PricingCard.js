import React from "react";
import { HiOutlineClock, HiOutlineCheck, HiOutlineStar } from "react-icons/hi";

const PLAN_FEATURES = {
  one_hour: ["1 Hour of tutoring", "1-on-1 video call", "Any available tutor"],
  six_hour: ["6 Hours of tutoring", "1-on-1 video call", "Any available tutor", "Priority matching"],
  twelve_hour: [
    "12 Hours of tutoring",
    "1-on-1 video call",
    "Any available tutor",
    "Priority matching",
    "Best value",
  ],
};

const PLAN_COLORS = {
  one_hour: {
    ring: "ring-gray-200",
    badge: "bg-gray-100 text-gray-800",
    button: "bg-indigo-600 hover:bg-indigo-700 text-white",
    icon: "text-indigo-500",
  },
  six_hour: {
    ring: "ring-indigo-500 ring-2",
    badge: "bg-indigo-100 text-indigo-800",
    button: "bg-indigo-600 hover:bg-indigo-700 text-white",
    icon: "text-indigo-500",
  },
  twelve_hour: {
    ring: "ring-purple-500 ring-2",
    badge: "bg-purple-100 text-purple-800",
    button: "bg-purple-600 hover:bg-purple-700 text-white",
    icon: "text-purple-500",
  },
};

const PricingCard = ({ plan, onSubscribe, loading, popular }) => {
  const colors = PLAN_COLORS[plan.plan_type] || PLAN_COLORS.one_hour;
  const features = PLAN_FEATURES[plan.plan_type] || [];

  return (
    <div
      className={`relative bg-white rounded-2xl shadow-sm border p-8 flex flex-col ${colors.ring} ${
        popular ? "scale-105 shadow-lg" : ""
      }`}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-600 text-white shadow">
            <HiOutlineStar className="h-3.5 w-3.5" />
            Most Popular
          </span>
        </div>
      )}

      {/* Plan Header */}
      <div className="text-center mb-6">
        <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${colors.badge} mb-3`}>
          <HiOutlineClock className="h-3.5 w-3.5" />
          {plan.duration_display}
        </div>
        <h3 className="text-xl font-bold text-gray-900">{plan.name} Plan</h3>
        <div className="mt-3">
          <span className="text-4xl font-extrabold text-gray-900">{plan.price_display}</span>
          <span className="text-sm text-gray-500 ml-1">one-time</span>
        </div>
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-8 flex-grow">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
            <HiOutlineCheck className={`h-5 w-5 flex-shrink-0 ${colors.icon}`} />
            {feature}
          </li>
        ))}
      </ul>

      {/* Subscribe Button */}
      <button
        onClick={() => onSubscribe(plan.plan_type)}
        disabled={loading}
        className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${colors.button} disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Processing...
          </span>
        ) : (
          "Subscribe Now"
        )}
      </button>
    </div>
  );
};

export default PricingCard;
