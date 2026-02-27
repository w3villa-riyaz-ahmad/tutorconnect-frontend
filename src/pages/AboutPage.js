import React from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineLightBulb,
  HiOutlineHeart,
  HiOutlineGlobe,
  HiOutlineShieldCheck,
  HiOutlineUserGroup,
  HiOutlineAcademicCap,
  HiOutlineVideoCamera,
  HiOutlineBadgeCheck,
  HiArrowRight,
} from "react-icons/hi";
import Footer from "../components/Footer";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* ─── Hero Banner ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 py-20">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-indigo-100 text-sm font-medium mb-6">
            About TutorConnect
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            Empowering Education Through{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
              Technology
            </span>
          </h1>
          <p className="mt-6 text-lg text-indigo-100 max-w-2xl mx-auto">
            We believe that quality education should be accessible to everyone.
            TutorConnect bridges the gap between students and expert tutors worldwide.
          </p>
        </div>
        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 40L60 35C120 30 240 20 360 22.5C480 25 600 40 720 45C840 50 960 45 1080 37.5C1200 30 1320 20 1380 15L1440 10V80H0V40Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* ─── Our Mission ─── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left – Illustration card */}
            <div className="relative">
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-10">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { icon: HiOutlineLightBulb, label: "Innovation", color: "bg-yellow-100 text-yellow-600" },
                    { icon: HiOutlineHeart, label: "Passion", color: "bg-pink-100 text-pink-600" },
                    { icon: HiOutlineGlobe, label: "Accessibility", color: "bg-blue-100 text-blue-600" },
                    { icon: HiOutlineShieldCheck, label: "Trust", color: "bg-green-100 text-green-600" },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow text-center"
                    >
                      <div
                        className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center mx-auto mb-3`}
                      >
                        <item.icon className="h-7 w-7" />
                      </div>
                      <p className="font-semibold text-gray-900">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Floating stat */}
              <div className="absolute -bottom-6 -right-4 bg-indigo-600 text-white rounded-2xl px-6 py-4 shadow-xl">
                <p className="text-2xl font-extrabold">4.9★</p>
                <p className="text-xs text-indigo-200">Average Rating</p>
              </div>
            </div>

            {/* Right – Text */}
            <div>
              <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">
                Our Mission
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900">
                Making Quality Education{" "}
                <span className="text-indigo-600">Accessible</span> to All
              </h2>
              <p className="mt-6 text-gray-600 leading-relaxed">
                At TutorConnect, our mission is to democratize education by
                connecting students with world-class tutors regardless of
                geographical boundaries. We leverage cutting-edge video technology
                to create intimate, effective learning environments.
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Founded with the belief that every student deserves personalized
                attention, we've built a platform that makes finding the right
                tutor as easy as a few clicks. Our rigorous vetting process
                ensures only the best educators join our community.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  "Personalized learning paths for every student",
                  "Rigorous tutor verification and training",
                  "Secure, encrypted video sessions",
                  "Affordable pricing with flexible plans",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                      <HiOutlineBadgeCheck className="h-4 w-4 text-indigo-600" />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Our Story ─── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">
              Our Journey
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900">
              The Story Behind TutorConnect
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-12">
              {[
                {
                  year: "2024",
                  title: "The Idea Was Born",
                  desc: "Recognizing the gap in accessible, high-quality tutoring, our founders envisioned a platform that would connect learners with expert educators worldwide through seamless video technology.",
                },
                {
                  year: "2024",
                  title: "Platform Launch",
                  desc: "After months of development and beta testing with hundreds of students and tutors, TutorConnect officially launched with support for 50+ subjects and real-time HD video sessions.",
                },
                {
                  year: "2025",
                  title: "Growing Community",
                  desc: "Today, TutorConnect serves thousands of students globally, with a growing network of verified tutors and an expanding range of subjects and features.",
                },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-sm">
                        {item.year}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Team Values ─── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">
              Our Values
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900">
              What Drives Us Every Day
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: HiOutlineAcademicCap,
                title: "Excellence in Education",
                desc: "We are committed to providing the highest quality learning experiences. Every feature we build is designed to enhance understanding and retention.",
                color: "bg-indigo-50",
                iconColor: "text-indigo-600",
              },
              {
                icon: HiOutlineUserGroup,
                title: "Community First",
                desc: "Our vibrant community of students and tutors is at the heart of everything we do. We foster connections that go beyond just tutoring sessions.",
                color: "bg-purple-50",
                iconColor: "text-purple-600",
              },
              {
                icon: HiOutlineVideoCamera,
                title: "Technology for Good",
                desc: "We harness the power of technology to break down barriers in education. Our platform makes learning accessible, affordable, and enjoyable.",
                color: "bg-pink-50",
                iconColor: "text-pink-600",
              },
            ].map((value, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-all text-center"
              >
                <div
                  className={`w-16 h-16 rounded-2xl ${value.color} flex items-center justify-center mx-auto mb-6`}
                >
                  <value.icon className={`h-8 w-8 ${value.iconColor}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
            Join Our Growing Community
          </h2>
          <p className="text-lg text-gray-500 mb-8">
            Whether you're a student looking to learn or a tutor ready to teach,
            there's a place for you at TutorConnect.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="inline-flex items-center justify-center px-8 py-4 bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-700 transition-all"
            >
              Get Started Today
              <HiArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-indigo-300 hover:text-indigo-600 transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
