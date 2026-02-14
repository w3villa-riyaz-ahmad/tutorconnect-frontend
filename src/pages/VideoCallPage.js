import React, { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { callsAPI } from "../api/calls";
import {
  HiOutlinePhone,
  HiOutlinePhoneMissedCall,
  HiOutlineClock,
  HiOutlineVideoCamera,
  HiOutlineMicrophone,
  HiOutlineVolumeUp,
} from "react-icons/hi";

const VideoCallPage = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const teacherId = searchParams.get("teacher_id");
  const teacherName = searchParams.get("teacher_name") || "Tutor";

  const [callState, setCallState] = useState("idle"); // idle | connecting | active | ended
  const [call, setCall] = useState(null);
  const [duration, setDuration] = useState(0);
  const [subTimeLeft, setSubTimeLeft] = useState(null);
  const [error, setError] = useState(null);

  const heartbeatRef = useRef(null);
  const durationRef = useRef(null);
  const callRef = useRef(null);

  // Keep callRef in sync
  useEffect(() => {
    callRef.current = call;
  }, [call]);

  // ── Start Call ──
  const startCall = useCallback(async () => {
    if (!teacherId) {
      setError("No teacher selected");
      return;
    }

    setCallState("connecting");
    setError(null);

    try {
      const { data } = await callsAPI.start(teacherId);
      setCall(data.call);
      setCallState("active");
      setDuration(0);
      toast.success("Call connected!");
    } catch (err) {
      const msg = err.response?.data?.error || "Failed to start call";
      setError(msg);
      setCallState("idle");
      toast.error(msg);
    }
  }, [teacherId]);

  // ── End Call ──
  const endCall = useCallback(async () => {
    try {
      const { data } = await callsAPI.endCall();
      setCall(data.call);
      setCallState("ended");
      setDuration(data.duration || 0);
      toast.success("Call ended");
    } catch (err) {
      // Even if API fails, mark local state as ended
      setCallState("ended");
      toast.error(err.response?.data?.error || "Error ending call");
    }

    // Cleanup timers
    if (heartbeatRef.current) clearInterval(heartbeatRef.current);
    if (durationRef.current) clearInterval(durationRef.current);
  }, []);

  // ── Heartbeat (every 15s while active) ──
  useEffect(() => {
    if (callState !== "active") return;

    const sendHeartbeat = async () => {
      try {
        const { data } = await callsAPI.heartbeat();
        if (data.subscription_time_remaining !== null && data.subscription_time_remaining !== undefined) {
          setSubTimeLeft(data.subscription_time_remaining);
        }
      } catch (err) {
        const msg = err.response?.data?.error || "";
        if (msg.includes("expired") || msg.includes("No active call")) {
          setCallState("ended");
          toast.error(msg || "Call ended");
        }
      }
    };

    sendHeartbeat(); // immediate
    heartbeatRef.current = setInterval(sendHeartbeat, 15000);

    return () => {
      if (heartbeatRef.current) clearInterval(heartbeatRef.current);
    };
  }, [callState]);

  // ── Duration Counter ──
  useEffect(() => {
    if (callState !== "active") return;

    durationRef.current = setInterval(() => {
      setDuration((prev) => prev + 1);
    }, 1000);

    return () => {
      if (durationRef.current) clearInterval(durationRef.current);
    };
  }, [callState]);

  // ── Check for existing active call on mount ──
  useEffect(() => {
    const checkActive = async () => {
      try {
        const { data } = await callsAPI.getActive();
        if (data.has_active_call) {
          setCall(data.call);
          setCallState("active");
          setDuration(data.call.duration || 0);
        }
      } catch {
        // ignore
      }
    };
    checkActive();
  }, []);

  // ── Cleanup on unmount ──
  useEffect(() => {
    return () => {
      if (heartbeatRef.current) clearInterval(heartbeatRef.current);
      if (durationRef.current) clearInterval(durationRef.current);
    };
  }, []);

  const formatTime = (secs) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    if (h > 0) return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const otherParty = user?.role === "teacher" ? call?.student : call?.teacher;
  const displayName = otherParty?.name || teacherName;

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="w-full max-w-2xl mx-auto px-4">
        {/* Video Call Interface */}
        <div className="bg-gray-800 rounded-3xl overflow-hidden shadow-2xl">
          {/* Video Area */}
          <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            {/* Remote Video Placeholder */}
            {callState === "active" ? (
              <div className="text-center">
                {/* Avatar */}
                <div className="h-28 w-28 rounded-full bg-indigo-600 flex items-center justify-center mx-auto mb-4 ring-4 ring-indigo-400/30 animate-pulse">
                  <span className="text-4xl font-bold text-white">
                    {displayName?.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </span>
                </div>
                <p className="text-white text-xl font-semibold">{displayName}</p>
                <p className="text-indigo-300 text-sm mt-1">Connected</p>
              </div>
            ) : callState === "connecting" ? (
              <div className="text-center">
                <div className="h-28 w-28 rounded-full bg-gray-700 flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <HiOutlineVideoCamera className="h-12 w-12 text-gray-400" />
                </div>
                <p className="text-white text-xl font-semibold">Connecting...</p>
                <p className="text-gray-400 text-sm mt-1">Setting up your call with {teacherName}</p>
              </div>
            ) : callState === "ended" ? (
              <div className="text-center">
                <div className="h-28 w-28 rounded-full bg-gray-700 flex items-center justify-center mx-auto mb-4">
                  <HiOutlinePhoneMissedCall className="h-12 w-12 text-red-400" />
                </div>
                <p className="text-white text-xl font-semibold">Call Ended</p>
                <p className="text-gray-400 text-sm mt-1">
                  Duration: {formatTime(duration)}
                </p>
              </div>
            ) : (
              <div className="text-center">
                <div className="h-28 w-28 rounded-full bg-gray-700 flex items-center justify-center mx-auto mb-4">
                  <HiOutlineVideoCamera className="h-12 w-12 text-gray-400" />
                </div>
                <p className="text-white text-xl font-semibold">Ready to Call</p>
                <p className="text-gray-400 text-sm mt-1">{teacherName}</p>
              </div>
            )}

            {/* Timer Overlay */}
            {callState === "active" && (
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/50 px-3 py-1.5 rounded-full">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-white text-sm font-mono">{formatTime(duration)}</span>
              </div>
            )}

            {/* Subscription Timer */}
            {callState === "active" && subTimeLeft !== null && user?.role === "student" && (
              <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/50 px-3 py-1.5 rounded-full">
                <HiOutlineClock className="h-4 w-4 text-amber-400" />
                <span className={`text-sm font-mono ${subTimeLeft < 300 ? "text-red-400" : "text-amber-300"}`}>
                  Sub: {formatTime(subTimeLeft)}
                </span>
              </div>
            )}

            {/* Self view (placeholder) */}
            {callState === "active" && (
              <div className="absolute bottom-4 right-4 w-32 h-24 bg-gray-700 rounded-xl border-2 border-gray-600 flex items-center justify-center">
                <span className="text-gray-400 text-xs">You</span>
              </div>
            )}
          </div>

          {/* Controls Bar */}
          <div className="bg-gray-900 px-6 py-5">
            {error && (
              <div className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded-xl text-center">
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            <div className="flex items-center justify-center gap-4">
              {callState === "idle" && (
                <button
                  onClick={startCall}
                  className="flex items-center gap-2 px-8 py-3 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition text-lg shadow-lg shadow-green-600/30"
                >
                  <HiOutlinePhone className="h-6 w-6" />
                  Start Call
                </button>
              )}

              {callState === "connecting" && (
                <button
                  disabled
                  className="flex items-center gap-2 px-8 py-3 bg-gray-700 text-gray-400 rounded-full font-semibold cursor-not-allowed"
                >
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Connecting...
                </button>
              )}

              {callState === "active" && (
                <>
                  {/* Mute (placeholder) */}
                  <button className="p-4 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition" title="Mute (coming soon)">
                    <HiOutlineMicrophone className="h-5 w-5" />
                  </button>

                  {/* Speaker (placeholder) */}
                  <button className="p-4 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition" title="Speaker (coming soon)">
                    <HiOutlineVolumeUp className="h-5 w-5" />
                  </button>

                  {/* End Call */}
                  <button
                    onClick={endCall}
                    className="flex items-center gap-2 px-8 py-3 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 transition shadow-lg shadow-red-600/30"
                  >
                    <HiOutlinePhoneMissedCall className="h-5 w-5" />
                    End Call
                  </button>

                  {/* Video (placeholder) */}
                  <button className="p-4 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition" title="Video (coming soon)">
                    <HiOutlineVideoCamera className="h-5 w-5" />
                  </button>
                </>
              )}

              {callState === "ended" && (
                <div className="flex gap-3">
                  <button
                    onClick={() => navigate("/tutors")}
                    className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition"
                  >
                    Find Another Tutor
                  </button>
                  <button
                    onClick={() => navigate("/dashboard")}
                    className="flex items-center gap-2 px-6 py-3 bg-gray-700 text-white rounded-full font-semibold hover:bg-gray-600 transition"
                  >
                    Dashboard
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Call Info */}
        {call && (
          <div className="mt-4 bg-gray-800/50 rounded-xl p-4 text-center">
            <p className="text-gray-400 text-xs font-mono">Room: {call.room_id}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoCallPage;
