import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import SubscriptionsPage from "./pages/SubscriptionsPage";
import SubscriptionSuccessPage from "./pages/SubscriptionSuccessPage";
import TutorsPage from "./pages/TutorsPage";
import VideoCallPage from "./pages/VideoCallPage";
import CallHistoryPage from "./pages/CallHistoryPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import UserManagementPage from "./pages/UserManagementPage";
import UserDetailPage from "./pages/UserDetailPage";
import GitHubCallbackPage from "./pages/GitHubCallbackPage";
import "./index.css";

// Redirects authenticated users to dashboard, otherwise shows landing page
const HomeRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
};

function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ""}>
    <Router>
      <AuthProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
              fontSize: "14px",
            },
          }}
        />
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            {/* Public pages – visible to all visitors */}
            <Route
              path="/"
              element={
                <HomeRoute>
                  <LandingPage />
                </HomeRoute>
              }
            />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Auth routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/auth/github/callback" element={<GitHubCallbackPage />} />

            {/* Protected routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/subscriptions"
              element={
                <ProtectedRoute>
                  <SubscriptionsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/subscriptions/success"
              element={
                <ProtectedRoute>
                  <SubscriptionSuccessPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tutors"
              element={
                <ProtectedRoute>
                  <TutorsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/call"
              element={
                <ProtectedRoute>
                  <VideoCallPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/calls"
              element={
                <ProtectedRoute>
                  <CallHistoryPage />
                </ProtectedRoute>
              }
            />

            {/* Admin routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute adminOnly>
                  <AdminDashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute adminOnly>
                  <UserManagementPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users/:id"
              element={
                <ProtectedRoute adminOnly>
                  <UserDetailPage />
                </ProtectedRoute>
              }
            />

            {/* Default redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
