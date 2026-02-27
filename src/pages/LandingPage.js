import React from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineVideoCamera,
  HiOutlineUserGroup,
  HiOutlineClock,
  HiOutlineShieldCheck,
  HiOutlineStar,
  HiOutlineGlobe,
  HiArrowRight,
  HiOutlineCheckCircle,
  HiAcademicCap,
  HiOutlineLightningBolt,
  HiOutlineChat,
} from "react-icons/hi";
import Footer from "../components/Footer";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* ─── Hero Section ─── */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800" />
        {/* Decorative circles */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-400/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left – Copy */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-indigo-100 text-sm font-medium mb-6">
                <HiOutlineLightningBolt className="h-4 w-4 mr-2" />
                #1 Online Tutoring Platform
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                Learn from the{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                  Best Tutors
                </span>{" "}
                Worldwide
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-indigo-100 max-w-xl mx-auto lg:mx-0">
                Connect with expert tutors for personalized 1-on-1 video sessions.
                Master any subject at your own pace with real-time guidance.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-indigo-700 font-bold rounded-xl shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all text-base"
                >
                  Get Started Free
                  <HiArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all text-base"
                >
                  Learn More
                </Link>
              </div>
              {/* Trust badges */}
              <div className="mt-12 flex items-center justify-center lg:justify-start space-x-8 text-indigo-200 text-sm">
                <div className="flex items-center space-x-2">
                  <HiOutlineCheckCircle className="h-5 w-5 text-green-300" />
                  <span>Free to Join</span>
                </div>
                <div className="flex items-center space-x-2">
                  <HiOutlineCheckCircle className="h-5 w-5 text-green-300" />
                  <span>Verified Tutors</span>
                </div>
                <div className="flex items-center space-x-2">
                  <HiOutlineCheckCircle className="h-5 w-5 text-green-300" />
                  <span>HD Video Calls</span>
                </div>
              </div>
            </div>

            {/* Right – Illustrative Card */}
            <div className="hidden lg:flex justify-center">
              <div className="relative">
                {/* Main card */}
                <div className="w-96 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8 shadow-2xl">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center">
                      <HiAcademicCap className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg">Live Session</h3>
                      <p className="text-indigo-200 text-sm">Mathematics • 1-on-1</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 text-indigo-100">
                      <div className="w-10 h-10 rounded-full bg-indigo-500/30 flex items-center justify-center">
                        <HiOutlineVideoCamera className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">HD Video Call</p>
                        <p className="text-xs text-indigo-300">Crystal clear quality</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 text-indigo-100">
                      <div className="w-10 h-10 rounded-full bg-purple-500/30 flex items-center justify-center">
                        <HiOutlineChat className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">Real-time Chat</p>
                        <p className="text-xs text-indigo-300">Instant messaging</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 text-indigo-100">
                      <div className="w-10 h-10 rounded-full bg-pink-500/30 flex items-center justify-center">
                        <HiOutlineStar className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">Expert Tutors</p>
                        <p className="text-xs text-indigo-300">Verified & rated</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {["bg-blue-400", "bg-green-400", "bg-yellow-400", "bg-pink-400"].map((color, i) => (
                          <div
                            key={i}
                            className={`w-8 h-8 rounded-full ${color} border-2 border-white/20 flex items-center justify-center text-white text-xs font-bold`}
                          >
                            {String.fromCharCode(65 + i)}
                          </div>
                        ))}
                      </div>
                      <span className="text-indigo-200 text-sm">2,500+ students</span>
                    </div>
                  </div>
                </div>
                {/* Floating badge */}
                <div className="absolute -top-4 -right-4 bg-green-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg animate-bounce">
                  ✦ Live Now
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 50L48 45.7C96 41.3 192 32.7 288 30.2C384 27.7 480 31.3 576 38.5C672 45.7 768 56.3 864 58.8C960 61.3 1056 55.7 1152 48.5C1248 41.3 1344 32.7 1392 28.3L1440 24V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0V50Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* ─── Features Section ─── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">
              Why Choose Us
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900">
              Everything You Need to{" "}
              <span className="text-indigo-600">Succeed</span>
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              Our platform provides all the tools and features you need for an
              exceptional learning experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: HiOutlineVideoCamera,
                title: "HD Video Sessions",
                desc: "Crystal-clear video calls powered by enterprise-grade infrastructure for seamless learning.",
                color: "from-blue-500 to-indigo-600",
                bg: "bg-blue-50",
              },
              {
                icon: HiOutlineUserGroup,
                title: "Expert Tutors",
                desc: "Connect with verified, experienced tutors across 50+ subjects. Every tutor is carefully vetted.",
                color: "from-purple-500 to-pink-600",
                bg: "bg-purple-50",
              },
              {
                icon: HiOutlineClock,
                title: "Flexible Scheduling",
                desc: "Book sessions that fit your schedule. Learn at your own pace, morning or midnight.",
                color: "from-orange-500 to-red-500",
                bg: "bg-orange-50",
              },
              {
                icon: HiOutlineShieldCheck,
                title: "Secure Platform",
                desc: "Your data is encrypted and protected. Safe payment processing with Stripe integration.",
                color: "from-green-500 to-emerald-600",
                bg: "bg-green-50",
              },
              {
                icon: HiOutlineStar,
                title: "Rated & Reviewed",
                desc: "Choose tutors based on ratings and reviews from thousands of satisfied students.",
                color: "from-yellow-500 to-amber-500",
                bg: "bg-yellow-50",
              },
              {
                icon: HiOutlineGlobe,
                title: "Learn Anywhere",
                desc: "Access from any device — desktop, tablet, or mobile. No downloads required.",
                color: "from-teal-500 to-cyan-600",
                bg: "bg-teal-50",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="group relative p-8 rounded-2xl border border-gray-100 hover:border-indigo-100 hover:shadow-xl transition-all duration-300 bg-white"
              >
                <div
                  className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="h-7 w-7 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How It Works Section ─── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">
              Simple Process
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              Getting started with TutorConnect is easy. Follow these simple
              steps to begin your learning journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Create Your Account",
                desc: "Sign up for free in seconds. Set up your profile with your learning goals and preferences.",
                gradient: "from-blue-500 to-indigo-600",
              },
              {
                step: "02",
                title: "Choose a Tutor",
                desc: "Browse our verified tutors, check reviews, and pick the perfect match for your subject.",
                gradient: "from-indigo-500 to-purple-600",
              },
              {
                step: "03",
                title: "Start Learning",
                desc: "Join a live video session and get personalized guidance. Track your progress over time.",
                gradient: "from-purple-500 to-pink-600",
              },
            ].map((item, idx) => (
              <div key={idx} className="relative text-center">
                <div
                  className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-6 shadow-lg`}
                >
                  <span className="text-2xl font-extrabold text-white">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-500 max-w-xs mx-auto">{item.desc}</p>
                {idx < 2 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[80%] border-t-2 border-dashed border-indigo-200" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Stats Section ─── */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "2,500+", label: "Active Students" },
              { number: "150+", label: "Expert Tutors" },
              { number: "10,000+", label: "Sessions Completed" },
              { number: "4.9/5", label: "Average Rating" },
            ].map((stat, idx) => (
              <div key={idx}>
                <div className="text-3xl sm:text-4xl font-extrabold text-white">
                  {stat.number}
                </div>
                <div className="mt-2 text-indigo-200 text-sm font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonials Section ─── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">
              Testimonials
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900">
              What Our Students Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Computer Science Student",
                text: "TutorConnect helped me ace my algorithms course. My tutor was incredibly patient and explained complex concepts in simple terms. Highly recommend!",
                initials: "SJ",
                color: "bg-blue-500",
              },
              {
                name: "Michael Chen",
                role: "High School Student",
                text: "The video quality is amazing and scheduling is so flexible. I've improved my math grades from C to A+ in just 2 months!",
                initials: "MC",
                color: "bg-purple-500",
              },
              {
                name: "Emily Rodriguez",
                role: "Graduate Student",
                text: "As a working professional going back to school, the flexible scheduling is a lifesaver. My tutor adapts perfectly to my learning style.",
                initials: "ER",
                color: "bg-pink-500",
              },
            ].map((testimonial, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow bg-white"
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <HiOutlineStar
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed mb-6 italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-11 h-11 rounded-full ${testimonial.color} flex items-center justify-center text-white font-bold text-sm`}
                  >
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 rounded-3xl p-12 sm:p-16 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                Ready to Start Learning?
              </h2>
              <p className="text-lg text-indigo-100 mb-8 max-w-xl mx-auto">
                Join thousands of students already achieving their academic goals
                with TutorConnect. Your first step starts here.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-indigo-700 font-bold rounded-xl shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all"
                >
                  Sign Up for Free
                  <HiArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
