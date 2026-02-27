import React from "react";
import { Link } from "react-router-dom";
import {
  HiAcademicCap,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <HiAcademicCap className="h-8 w-8 text-indigo-400" />
              <span className="text-xl font-bold text-white">TutorConnect</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Connecting students with expert tutors for personalized 1-on-1
              video learning sessions. Learn anything, anytime, anywhere.
            </p>
            <div className="flex space-x-4 pt-2">
              <button
                type="button"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-indigo-600 transition-colors"
              >
                <FaFacebookF className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Twitter"
                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-indigo-600 transition-colors"
              >
                <FaTwitter className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-indigo-600 transition-colors"
              >
                <FaLinkedinIn className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-indigo-600 transition-colors"
              >
                <FaInstagram className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-sm hover:text-indigo-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-sm hover:text-indigo-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-sm hover:text-indigo-400 transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm hover:text-indigo-400 transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Services
            </h3>
            <ul className="space-y-3">
              <li>
                <span className="text-sm hover:text-indigo-400 transition-colors cursor-default">
                  1-on-1 Tutoring
                </span>
              </li>
              <li>
                <span className="text-sm hover:text-indigo-400 transition-colors cursor-default">
                  Video Sessions
                </span>
              </li>
              <li>
                <span className="text-sm hover:text-indigo-400 transition-colors cursor-default">
                  Exam Preparation
                </span>
              </li>
              <li>
                <span className="text-sm hover:text-indigo-400 transition-colors cursor-default">
                  Flexible Scheduling
                </span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <HiOutlineLocationMarker className="h-5 w-5 text-indigo-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm">
                  123 Education Lane, Learning City, ED 45678
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <HiOutlineMail className="h-5 w-5 text-indigo-400 flex-shrink-0" />
                <span className="text-sm">support@tutorconnect.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <HiOutlinePhone className="h-5 w-5 text-indigo-400 flex-shrink-0" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} TutorConnect. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <span className="text-xs text-gray-500 hover:text-gray-400 cursor-default">
              Privacy Policy
            </span>
            <span className="text-xs text-gray-500 hover:text-gray-400 cursor-default">
              Terms of Service
            </span>
            <span className="text-xs text-gray-500 hover:text-gray-400 cursor-default">
              Cookie Policy
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
