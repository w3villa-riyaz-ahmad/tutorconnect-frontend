import React, { useState } from "react";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
  HiOutlineClock,
  HiOutlinePaperAirplane,
  HiOutlineCheckCircle,
} from "react-icons/hi";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import Footer from "../components/Footer";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    // Simulate form submission
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ─── Hero Banner ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 py-20">
        <div className="absolute top-10 left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-400/10 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-indigo-100 text-sm font-medium mb-6">
            Get In Touch
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            Contact{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
              Us
            </span>
          </h1>
          <p className="mt-6 text-lg text-indigo-100 max-w-2xl mx-auto">
            Have a question, feedback, or need help? We'd love to hear from you.
            Our team is here to assist you every step of the way.
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

      {/* ─── Contact Section ─── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* ─── Contact Info (Left) ─── */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
                  Let's Start a Conversation
                </h2>
                <p className="text-gray-500">
                  Fill out the form and our team will get back to you within 24
                  hours.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    icon: HiOutlineMail,
                    label: "Email Us",
                    value: "support@tutorconnect.com",
                    color: "bg-blue-50 text-blue-600",
                  },
                  {
                    icon: HiOutlinePhone,
                    label: "Call Us",
                    value: "+1 (555) 123-4567",
                    color: "bg-green-50 text-green-600",
                  },
                  {
                    icon: HiOutlineLocationMarker,
                    label: "Visit Us",
                    value: "123 Education Lane, Learning City, ED 45678",
                    color: "bg-purple-50 text-purple-600",
                  },
                  {
                    icon: HiOutlineClock,
                    label: "Working Hours",
                    value: "Mon - Fri: 9:00 AM - 6:00 PM (EST)",
                    color: "bg-orange-50 text-orange-600",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-4">
                    <div
                      className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center flex-shrink-0`}
                    >
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{item.label}</p>
                      <p className="text-sm text-gray-500">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div>
                <p className="font-semibold text-gray-900 mb-3">Follow Us</p>
                <div className="flex space-x-3">
                  {[
                    { icon: FaFacebookF, color: "hover:bg-blue-600", label: "Facebook" },
                    { icon: FaTwitter, color: "hover:bg-sky-500", label: "Twitter" },
                    { icon: FaLinkedinIn, color: "hover:bg-blue-700", label: "LinkedIn" },
                    { icon: FaInstagram, color: "hover:bg-pink-600", label: "Instagram" },
                  ].map((social, idx) => (
                    <button
                      key={idx}
                      type="button"
                      aria-label={social.label}
                      className={`w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 ${social.color} hover:text-white transition-all`}
                    >
                      <social.icon className="h-4 w-4" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ─── Contact Form (Right) ─── */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 sm:p-10">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-6">
                      <HiOutlineCheckCircle className="h-10 w-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      Message Sent!
                    </h3>
                    <p className="text-gray-500 max-w-sm mx-auto mb-8">
                      Thank you for reaching out. We'll get back to you within 24
                      hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Name */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-gray-900 placeholder-gray-400"
                        />
                      </div>
                      {/* Email */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-gray-900 placeholder-gray-400"
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Subject <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-gray-900"
                      >
                        <option value="">Select a subject...</option>
                        <option value="general">General Inquiry</option>
                        <option value="support">Technical Support</option>
                        <option value="billing">Billing Question</option>
                        <option value="tutor">Become a Tutor</option>
                        <option value="partnership">Partnership</option>
                        <option value="feedback">Feedback</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="message"
                        required
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us how we can help you..."
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-gray-900 placeholder-gray-400 resize-none"
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={sending}
                      className="w-full flex items-center justify-center space-x-2 px-8 py-4 bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-700 hover:shadow-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {sending ? (
                        <>
                          <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <HiOutlinePaperAirplane className="h-5 w-5 rotate-90" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ Section ─── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">
              FAQ
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "How do I get started with TutorConnect?",
                a: "Simply sign up for a free account, browse our tutors, and book your first session. The process takes just a few minutes!",
              },
              {
                q: "What subjects do you offer tutoring in?",
                a: "We offer tutoring in 50+ subjects including Mathematics, Science, English, Computer Science, Languages, and many more.",
              },
              {
                q: "How are tutors vetted?",
                a: "All tutors go through a rigorous verification process including credential checks, background screening, and trial sessions before being approved.",
              },
              {
                q: "Can I cancel my subscription?",
                a: "Yes! You can cancel your subscription at any time. Your access will continue until the end of your current billing period.",
              },
              {
                q: "What if I'm not satisfied with a session?",
                a: "We have a quality guarantee. If you're not satisfied with a session, contact our support team and we'll work to resolve the issue promptly.",
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {faq.q}
                </h3>
                <p className="text-gray-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
