import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { authAPI } from "../api/auth";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is logged in on mount
  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const { data } = await authAPI.me();
      setUser(data.user);
    } catch (err) {
      // Token invalid or expired
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const signup = async ({ email, password, first_name, last_name, role }) => {
    setError(null);
    try {
      const { data } = await authAPI.signup({ email, password, first_name, last_name, role });
      return data;
    } catch (err) {
      const message = err.response?.data?.errors?.[0] || err.response?.data?.error || "Signup failed";
      setError(message);
      throw new Error(message);
    }
  };

  const login = async ({ email, password }) => {
    setError(null);
    try {
      const { data } = await authAPI.login({ email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("refreshToken", data.refresh_token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      return data;
    } catch (err) {
      const message = err.response?.data?.error || "Login failed";
      setError(message);
      throw new Error(message);
    }
  };

  const socialLogin = async ({ provider, access_token, role }) => {
    setError(null);
    try {
      const { data } = await authAPI.socialLogin({ provider, access_token, role });
      localStorage.setItem("token", data.token);
      localStorage.setItem("refreshToken", data.refresh_token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      return data;
    } catch (err) {
      const message = err.response?.data?.error || "Social login failed";
      setError(message);
      throw new Error(message);
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (err) {
      // Ignore logout errors
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      setUser(null);
    }
  };

  const resendVerification = async (email) => {
    try {
      const { data } = await authAPI.resendVerification(email);
      return data;
    } catch (err) {
      const message = err.response?.data?.error || "Failed to resend verification";
      throw new Error(message);
    }
  };

  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    isTeacher: user?.role === "teacher",
    isStudent: user?.role === "student",
    signup,
    login,
    socialLogin,
    logout,
    resendVerification,
    checkAuth,
    clearError: () => setError(null),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
