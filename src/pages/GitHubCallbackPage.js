import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { authAPI } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const GitHubCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { checkAuth } = useAuth();
  const [error, setError] = useState(null);
  const processed = useRef(false);

  useEffect(() => {
    const code = searchParams.get("code");
    const errorParam = searchParams.get("error");

    if (errorParam) {
      setError("GitHub authorization was denied");
      toast.error("GitHub login cancelled");
      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    if (!code) {
      setError("No authorization code received");
      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    // Prevent double-processing in React StrictMode
    if (processed.current) return;
    processed.current = true;

    const exchangeCode = async () => {
      try {
        const { data } = await authAPI.githubCallback(code);

        // Store tokens
        localStorage.setItem("token", data.token);
        localStorage.setItem("refreshToken", data.refresh_token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // Refresh auth context
        await checkAuth();

        toast.success("Welcome! Signed in with GitHub");
        navigate("/dashboard", { replace: true });
      } catch (err) {
        const message = err.response?.data?.error || "GitHub login failed";
        setError(message);
        toast.error(message);
        setTimeout(() => navigate("/login"), 3000);
      }
    };

    exchangeCode();
  }, [searchParams, navigate, checkAuth]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="text-center">
        {error ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md">
            <div className="text-red-500 text-5xl mb-4">✕</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Login Failed</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <p className="text-sm text-gray-400">Redirecting to login...</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Signing in with GitHub</h2>
            <p className="text-gray-600">Please wait while we complete your login...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GitHubCallbackPage;
