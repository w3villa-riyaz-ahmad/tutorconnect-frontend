import React from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineVideoCamera,
  HiOutlineUserGroup,
  HiOutlineClock,
  HiOutlineAcademicCap,
  HiOutlineChatAlt2,
  HiOutlineChartBar,
  HiOutlineShieldCheck,
  HiOutlineDesktopComputer,
  HiOutlineCreditCard,
  HiOutlineCheckCircle,
  HiArrowRight,
  HiOutlineStar,
} from "react-icons/hi";
import Footer from "../components/Footer";

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* ─── Hero Banner ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 py-20">
        <div className="absolute top-10 right-20 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-indigo-100 text-sm font-medium mb-6">
            Our Services
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            Premium Tutoring{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
              Services
            </span>
          </h1>
          <p className="mt-6 text-lg text-indigo-100 max-w-2xl mx-auto">
            Discover our comprehensive range of tutoring services designed to
            help you achieve your academic goals with personalized attention.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 40L60 35C120 30 240 20 360 22.5C480 25 600 40 720 45C840 50 960 45 1080 37.5C1200 30 1320 20 1380 15L1440 10V80H0V40Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* ─── Core Services ─── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">
              What We Offer
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900">
              Our Core Services
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              From live video sessions to progress tracking, we provide
              everything you need for a complete learning experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: HiOutlineVideoCamera,
                title: "1-on-1 Video Tutoring",
                desc: "Connect face-to-face with expert tutors through high-definition video calls. Get real-time explanations, work through problems together, and receive instant feedback.",
                features: [
                  "HD video & audio quality",
                  "Screen sharing capability",
                  "Real-time interaction",
                ],
                gradient: "from-blue-500 to-indigo-600",
                bg: "bg-blue-50",
              },
              {
                icon: HiOutlineUserGroup,
                title: "Expert Tutor Matching",
                desc: "Our smart matching system pairs you with the perfect tutor based on your subject, learning style, and schedule preferences.",
                features: [
                  "50+ subjects available",
                  "Verified credentials",
                  "Rating-based selection",
                ],
                gradient: "from-purple-500 to-pink-600",
                bg: "bg-purple-50",
              },
              {
                icon: HiOutlineClock,
                title: "Flexible Scheduling",
                desc: "Book sessions at times that work for you. Whether it's early morning or late night, our tutors are available across all time zones.",
                features: [
                  "24/7 availability",
                  "Easy rescheduling",
                  "Timezone-friendly",
                ],
                gradient: "from-orange-500 to-red-500",
                bg: "bg-orange-50",
              },
              {
                icon: HiOutlineAcademicCap,
                title: "Exam Preparation",
                desc: "Targeted exam prep sessions to help you ace your tests. From SATs to university finals, our tutors know what it takes to succeed.",
                features: [
                  "Practice tests & drills",
                  "Study strategy coaching",
                  "Subject-specific prep",
                ],
                gradient: "from-green-500 to-emerald-600",
                bg: "bg-green-50",
              },
              {
                icon: HiOutlineChatAlt2,
                title: "Interactive Learning",
                desc: "Engage with interactive tools during sessions including real-time chat, file sharing, and collaborative problem-solving.",
                features: [
                  "In-session messaging",
                  "File & resource sharing",
                  "Collaborative workspace",
                ],
                gradient: "from-teal-500 to-cyan-600",
                bg: "bg-teal-50",
              },
              {
                icon: HiOutlineChartBar,
                title: "Progress Tracking",
                desc: "Monitor your learning journey with detailed session history, progress reports, and personalized improvement recommendations.",
                features: [
                  "Session history & logs",
                  "Performance analytics",
                  "Goal tracking",
                ],
                gradient: "from-amber-500 to-yellow-500",
                bg: "bg-amber-50",
              },
            ].map((service, idx) => (
              <div
                key={idx}
                className="group p-8 rounded-2xl border border-gray-100 hover:border-indigo-100 hover:shadow-xl transition-all duration-300 bg-white"
              >
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <service.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-500 leading-relaxed mb-5">
                  {service.desc}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feat, i) => (
                    <li key={i} className="flex items-center space-x-2 text-sm text-gray-600">
                      <HiOutlineCheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Subjects We Cover ─── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">
              Subjects
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900">
              Subjects We Cover
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              Our tutors specialize in a wide range of subjects to support
              learners at every level.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: "Mathematics", emoji: "📐" },
              { name: "Physics", emoji: "⚛️" },
              { name: "Chemistry", emoji: "🧪" },
              { name: "Biology", emoji: "🧬" },
              { name: "English", emoji: "📖" },
              { name: "History", emoji: "🏛️" },
              { name: "Computer Sci", emoji: "💻" },
              { name: "Economics", emoji: "📈" },
              { name: "Psychology", emoji: "🧠" },
              { name: "Languages", emoji: "🌍" },
              { name: "Music", emoji: "🎵" },
              { name: "Art & Design", emoji: "🎨" },
            ].map((subject, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-4 text-center border border-gray-100 hover:border-indigo-200 hover:shadow-md transition-all cursor-default"
              >
                <div className="text-3xl mb-2">{subject.emoji}</div>
                <p className="text-sm font-medium text-gray-700">
                  {subject.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Platform Features ─── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">
              Platform Features
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900">
              Built for the Best Experience
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: HiOutlineShieldCheck,
                title: "Secure & Encrypted",
                desc: "All sessions are encrypted end-to-end. Your data and conversations remain completely private and secure.",
              },
              {
                icon: HiOutlineDesktopComputer,
                title: "Works on Any Device",
                desc: "Access TutorConnect from your laptop, tablet, or smartphone. No downloads or installations required.",
              },
              {
                icon: HiOutlineCreditCard,
                title: "Simple Billing",
                desc: "Subscribe to a plan that works for you. Secure payments through Stripe with transparent pricing.",
              },
              {
                icon: HiOutlineStar,
                title: "Quality Guaranteed",
                desc: "Every tutor is verified and reviewed. If you're not satisfied with a session, we'll make it right.",
              },
            ].map((feat, idx) => (
              <div
                key={idx}
                className="flex items-start space-x-5 p-6 rounded-2xl hover:bg-gray-50 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center flex-shrink-0">
                  <feat.icon className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Pricing Preview ─── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">
              Pricing
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900">
              Simple, Transparent Pricing
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              Choose the plan that fits your learning needs. All plans include
              access to our full tutor network.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Basic",
                price: "$9.99",
                period: "/month",
                desc: "Perfect for casual learners",
                features: [
                  "5 sessions per month",
                  "HD video calls",
                  "Session history",
                  "Email support",
                ],
                popular: false,
              },
              {
                name: "Pro",
                price: "$19.99",
                period: "/month",
                desc: "Most popular for students",
                features: [
                  "15 sessions per month",
                  "HD video calls",
                  "Priority tutor matching",
                  "Progress tracking",
                  "Priority support",
                ],
                popular: true,
              },
              {
                name: "Premium",
                price: "$39.99",
                period: "/month",
                desc: "For serious learners",
                features: [
                  "Unlimited sessions",
                  "HD video calls",
                  "Premium tutor access",
                  "Advanced analytics",
                  "24/7 priority support",
                  "Custom study plans",
                ],
                popular: false,
              },
            ].map((plan, idx) => (
              <div
                key={idx}
                className={`relative rounded-2xl p-8 ${
                  plan.popular
                    ? "bg-gradient-to-br from-indigo-600 to-purple-700 text-white shadow-2xl scale-105"
                    : "bg-white border border-gray-200 text-gray-900"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                    Most Popular
                  </div>
                )}
                <h3
                  className={`text-lg font-bold ${
                    plan.popular ? "text-white" : "text-gray-900"
                  }`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`text-sm mt-1 ${
                    plan.popular ? "text-indigo-200" : "text-gray-500"
                  }`}
                >
                  {plan.desc}
                </p>
                <div className="mt-6 mb-8">
                  <span className="text-4xl font-extrabold">{plan.price}</span>
                  <span
                    className={`text-sm ${
                      plan.popular ? "text-indigo-200" : "text-gray-500"
                    }`}
                  >
                    {plan.period}
                  </span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-center space-x-3">
                      <HiOutlineCheckCircle
                        className={`h-5 w-5 flex-shrink-0 ${
                          plan.popular ? "text-green-300" : "text-green-500"
                        }`}
                      />
                      <span
                        className={`text-sm ${
                          plan.popular ? "text-indigo-100" : "text-gray-600"
                        }`}
                      >
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/signup"
                  className={`block w-full text-center py-3 rounded-xl font-semibold transition-all ${
                    plan.popular
                      ? "bg-white text-indigo-700 hover:bg-gray-100 shadow-lg"
                      : "bg-indigo-600 text-white hover:bg-indigo-700"
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-lg text-gray-500 mb-8">
            Join thousands of students already learning smarter with TutorConnect.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center justify-center px-8 py-4 bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-700 transition-all"
          >
            Start Learning Today
            <HiArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicesPage;
