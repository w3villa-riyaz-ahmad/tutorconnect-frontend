import React, { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { tutorsAPI, callsAPI } from "../api/calls";
import {
  HiOutlineStatusOnline,
  HiOutlineStatusOffline,
  HiOutlinePhone,
  HiOutlinePhoneMissedCall,
} from "react-icons/hi";

const TeacherStatus = () => {
  const { user, checkAuth } = useAuth();
  const navigate = useNavigate();
  const [toggling, setToggling] = useState(false);
  const [activeCall, setActiveCall] = useState(null);
  const [checkingCall, setCheckingCall] = useState(true);

  const isAvailable = user?.tutor_status === "available";
  const isBusy = user?.tutor_status === "busy";

  // Poll for incoming calls
  const checkActiveCall = useCallback(async () => {
    try {
      const { data } = await callsAPI.getActive();
      setActiveCall(data.has_active_call ? data.call : null);
    } catch {
      // ignore
    } finally {
      setCheckingCall(false);
    }
  }, []);

  useEffect(() => {
    checkActiveCall();
    const interval = setInterval(checkActiveCall, 5000);
    return () => clearInterval(interval);
  }, [checkActiveCall]);

  const handleToggle = async () => {
    setToggling(true);
    try {
      const { data } = await tutorsAPI.toggleStatus();
      toast.success(data.message);
      await checkAuth(); // refresh user state
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to toggle status");
    } finally {
      setToggling(false);
    }
  };

  // If there's an active call, redirect to call page
  if (activeCall) {
    return (
      <div className="bg-green-50 border-2 border-green-300 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-xl animate-pulse">
              <HiOutlinePhone className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Active Call</h3>
              <p className="text-sm text-gray-600">
                In call with {activeCall.student?.name}
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate(`/call?teacher_id=${user?.id}&teacher_name=${encodeURIComponent(user?.first_name + " " + user?.last_name)}`)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition"
          >
            <HiOutlinePhone className="h-4 w-4" />
            Join Call
          </button>
        </div>
      </div>
    );
  }

  if (checkingCall) return null;

  return (
    <div
      className={`rounded-2xl p-6 border-2 transition-all ${
        isAvailable
          ? "bg-green-50 border-green-200"
          : isBusy
          ? "bg-red-50 border-red-200"
          : "bg-gray-50 border-gray-200"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`p-3 rounded-xl ${
              isAvailable ? "bg-green-100" : isBusy ? "bg-red-100" : "bg-gray-100"
            }`}
          >
            {isAvailable ? (
              <HiOutlineStatusOnline className="h-6 w-6 text-green-600" />
            ) : isBusy ? (
              <HiOutlinePhoneMissedCall className="h-6 w-6 text-red-600" />
            ) : (
              <HiOutlineStatusOffline className="h-6 w-6 text-gray-500" />
            )}
          </div>
          <div>
            <h3 className="font-bold text-gray-900">
              {isAvailable ? "You're Available" : isBusy ? "In a Call" : "You're Offline"}
            </h3>
            <p className="text-sm text-gray-600">
              {isAvailable
                ? "Students can find and call you"
                : isBusy
                ? "You'll be available again after the call ends"
                : "Toggle to start receiving calls"}
            </p>
          </div>
        </div>

        {!isBusy && (
          <button
            onClick={handleToggle}
            disabled={toggling}
            className={`relative flex items-center w-16 h-8 rounded-full transition-colors duration-300 focus:outline-none ${
              isAvailable ? "bg-green-500" : "bg-gray-300"
            } ${toggling ? "opacity-50" : ""}`}
          >
            <span
              className={`inline-block w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
                isAvailable ? "translate-x-9" : "translate-x-1"
              }`}
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default TeacherStatus;
