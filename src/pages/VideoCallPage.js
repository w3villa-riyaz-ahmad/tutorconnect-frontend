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
} from "react-icons/hi";

/* ── Load Jitsi Meet External API from CDN (once) ── */
const JITSI_DOMAIN = "meet.ffmuc.net"; // Free community server, no login required

const loadJitsiScript = (domain = JITSI_DOMAIN) =>
  new Promise((resolve, reject) => {
    if (window.JitsiMeetExternalAPI) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = `https://${domain}/external_api.js`;
    script.async = true;
    script.onload = resolve;
    script.onerror = () => reject(new Error("Failed to load Jitsi Meet API"));
    document.head.appendChild(script);
  });

const VideoCallPage = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const teacherId = searchParams.get("teacher_id");
  const teacherName = searchParams.get("teacher_name") || "Tutor";
  const isTeacher = user?.role === "teacher";

  // Start in "loading" — we check for active call before showing UI
  const [callState, setCallState] = useState("loading"); // loading | idle | connecting | active | ended
  const [call, setCall] = useState(null);
  const [duration, setDuration] = useState(0);
  const [subTimeLeft, setSubTimeLeft] = useState(null);
  const [error, setError] = useState(null);
  const [jitsiLoaded, setJitsiLoaded] = useState(false);

  const jitsiContainerRef = useRef(null);
  const jitsiApiRef = useRef(null);
  const heartbeatRef = useRef(null);
  const durationRef = useRef(null);
  const mountedRef = useRef(true);
  const endingCallRef = useRef(false);

  // ── End call via API (shared by Jitsi hangup + our button) ──

  const endCallAPI = useCallback(async () => {
    if (endingCallRef.current) return;
    endingCallRef.current = true;

    // Dispose Jitsi iframe
    if (jitsiApiRef.current) {
      try {
        jitsiApiRef.current.dispose();
      } catch (e) {
        /* ignore */
      }
      jitsiApiRef.current = null;
    }

    try {
      const { data } = await callsAPI.endCall();
      if (mountedRef.current) {
        setCall(data.call);
        setCallState("ended");
        setDuration(data.duration || 0);
        toast.success("Call ended");
      }
    } catch (err) {
      if (mountedRef.current) {
        setCallState("ended");
        toast.error(err.response?.data?.error || "Error ending call");
      }
    }

    if (heartbeatRef.current) clearInterval(heartbeatRef.current);
    if (durationRef.current) clearInterval(durationRef.current);
  }, []);

  // Keep latest in a ref for stable access from Jitsi event handlers
  const endCallAPIRef = useRef(endCallAPI);
  useEffect(() => {
    endCallAPIRef.current = endCallAPI;
  }, [endCallAPI]);

  // ── Start Jitsi Meeting in the container ──

  const startJitsiMeeting = useCallback((roomName, userName, domain = JITSI_DOMAIN) => {
    if (jitsiApiRef.current) return; // already running

    loadJitsiScript(domain)
      .then(() => {
        if (!mountedRef.current) return;

        // Retry until the container div is in the DOM
        const tryStart = () => {
          if (!jitsiContainerRef.current) {
            setTimeout(tryStart, 100);
            return;
          }

          console.log("[Jitsi] Starting meeting on", domain, ":", roomName, "as", userName);

          const api = new window.JitsiMeetExternalAPI(domain, {
            roomName: roomName,
            parentNode: jitsiContainerRef.current,
            userInfo: { displayName: userName },
            width: "100%",
            height: "100%",
            configOverwrite: {
              startWithAudioMuted: false,
              startWithVideoMuted: false,
              prejoinPageEnabled: false,
              disableDeepLinking: true,
              enableWelcomePage: false,
              enableClosePage: false,
              hideConferenceSubject: true,
              hideConferenceTimer: false,
            },
            interfaceConfigOverwrite: {
              SHOW_JITSI_WATERMARK: false,
              SHOW_WATERMARK_FOR_GUESTS: false,
              SHOW_BRAND_WATERMARK: false,
              DEFAULT_BACKGROUND: "#1f2937",
              DISABLE_JOIN_LEAVE_NOTIFICATIONS: false,
              FILM_STRIP_MAX_HEIGHT: 120,
              TOOLBAR_BUTTONS: [
                "microphone",
                "camera",
                "desktop",
                "chat",
                "fullscreen",
                "raisehand",
                "tileview",
                "hangup",
              ],
            },
          });

          jitsiApiRef.current = api;
          setJitsiLoaded(true);

          // When user hangs up inside Jitsi
          api.addEventListener("videoConferenceLeft", () => {
            console.log("[Jitsi] Left conference");
            endCallAPIRef.current();
          });

          api.addEventListener("readyToClose", () => {
            console.log("[Jitsi] Ready to close");
            endCallAPIRef.current();
          });

          api.addEventListener("participantJoined", (p) => {
            toast.success(
              `${p.displayName || "Someone"} joined the call`
            );
          });

          api.addEventListener("participantLeft", () => {
            toast("The other participant left", { icon: "👋" });
          });

          api.addEventListener("videoConferenceJoined", () => {
            console.log("[Jitsi] ✅ Successfully joined the meeting");
          });
        };

        tryStart();
      })
      .catch((err) => {
        console.error("[Jitsi] Failed to load:", err);
        if (mountedRef.current) {
          toast.error(
            "Failed to load video. Please check your internet connection."
          );
        }
      });
  }, []);

  // Keep latest in a ref
  const startJitsiMeetingRef = useRef(startJitsiMeeting);
  useEffect(() => {
    startJitsiMeetingRef.current = startJitsiMeeting;
  }, [startJitsiMeeting]);

  // ── Start Call (student clicks button) ──

  const startCall = useCallback(async () => {
    if (!teacherId) {
      setError("No teacher selected");
      return;
    }

    setCallState("connecting");
    setError(null);
    endingCallRef.current = false;

    try {
      const { data } = await callsAPI.start(teacherId);
      console.log("[Call] Start response:", data);

      setCall(data.call);
      setCallState("active");
      setDuration(0);
      toast.success("Call connected!");

      // Start Jitsi after React renders the container
      const roomName = data.call.room_id;
      const userName = user
        ? `${user.first_name} ${user.last_name}`
        : "Student";
      const domain = data.video?.domain || JITSI_DOMAIN;
      setTimeout(
        () => startJitsiMeetingRef.current(roomName, userName, domain),
        200
      );
    } catch (err) {
      const msg = err.response?.data?.error || "Failed to start call";
      setError(msg);
      setCallState("idle");
      toast.error(msg);
    }
  }, [teacherId, user]);

  // ── Heartbeat every 15s while active ──

  useEffect(() => {
    if (callState !== "active") return;

    const sendHeartbeat = async () => {
      try {
        const { data } = await callsAPI.heartbeat();
        if (
          data.subscription_time_remaining !== null &&
          data.subscription_time_remaining !== undefined
        ) {
          setSubTimeLeft(data.subscription_time_remaining);
        }
      } catch (err) {
        const msg = err.response?.data?.error || "";
        if (msg.includes("expired") || msg.includes("No active call")) {
          toast.error(msg || "Call ended");
          endCallAPIRef.current();
        }
      }
    };

    sendHeartbeat();
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

  // ── On mount: check if user already has an active call ──

  useEffect(() => {
    const checkActive = async () => {
      try {
        const { data } = await callsAPI.getActive();
        if (!mountedRef.current) return;

        if (data.has_active_call) {
          console.log("[Call] Found active call:", data.call?.room_id);

          setCall(data.call);
          setCallState("active");
          setDuration(data.call.duration || 0);
          endingCallRef.current = false;

          // Start Jitsi for this active call
          const roomName = data.video?.room_name || data.call.room_id;
          const userName =
            data.video?.user_name ||
            (user ? `${user.first_name} ${user.last_name}` : "User");
          const domain = data.video?.domain || JITSI_DOMAIN;
          setTimeout(
            () => startJitsiMeetingRef.current(roomName, userName, domain),
            300
          );
        } else {
          console.log("[Call] No active call found");
          setCallState("idle");
        }
      } catch (err) {
        console.error("[Call] Error checking active call:", err);
        if (mountedRef.current) {
          setCallState("idle");
        }
      }
    };

    checkActive();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // ── Cleanup on unmount ──

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
      if (heartbeatRef.current) clearInterval(heartbeatRef.current);
      if (durationRef.current) clearInterval(durationRef.current);

      if (jitsiApiRef.current) {
        try {
          jitsiApiRef.current.dispose();
        } catch (e) {
          /* ignore */
        }
        jitsiApiRef.current = null;
      }
    };
  }, []);

  // ── Helpers ──

  const formatTime = (secs) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    if (h > 0)
      return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  // ── RENDER ──

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl mx-auto">
        <div className="bg-gray-800 rounded-3xl overflow-hidden shadow-2xl">
          {/* ═══ Video / Jitsi Area ═══ */}
          <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center"
               style={{ minHeight: "480px" }}>

            {/* Jitsi iframe container — only rendered when active */}
            {callState === "active" && (
              <div
                ref={jitsiContainerRef}
                className="absolute inset-0 w-full h-full z-10"
                style={{ minHeight: "480px" }}
              />
            )}

            {/* Placeholder while Jitsi loads */}
            {callState === "active" && !jitsiLoaded && (
              <div className="absolute inset-0 flex items-center justify-center z-20 bg-gray-900/80">
                <div className="text-center">
                  <div className="h-16 w-16 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin mx-auto mb-4" />
                  <p className="text-white text-lg font-semibold">
                    Loading video...
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    Setting up Jitsi Meet
                  </p>
                </div>
              </div>
            )}

            {/* Loading state — checking for active call */}
            {callState === "loading" && (
              <div className="text-center z-10 py-20">
                <div className="h-28 w-28 rounded-full bg-gray-700 flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <HiOutlineVideoCamera className="h-12 w-12 text-gray-400" />
                </div>
                <p className="text-white text-xl font-semibold">Loading...</p>
                <p className="text-gray-400 text-sm mt-1">
                  Checking for active call
                </p>
              </div>
            )}

            {/* Connecting state */}
            {callState === "connecting" && (
              <div className="text-center z-10 py-20">
                <div className="h-28 w-28 rounded-full bg-gray-700 flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <HiOutlineVideoCamera className="h-12 w-12 text-gray-400" />
                </div>
                <p className="text-white text-xl font-semibold">
                  Connecting...
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  Setting up video call with {teacherName}
                </p>
              </div>
            )}

            {/* Ended state */}
            {callState === "ended" && (
              <div className="text-center z-10 py-20">
                <div className="h-28 w-28 rounded-full bg-gray-700 flex items-center justify-center mx-auto mb-4">
                  <HiOutlinePhoneMissedCall className="h-12 w-12 text-red-400" />
                </div>
                <p className="text-white text-xl font-semibold">Call Ended</p>
                <p className="text-gray-400 text-sm mt-1">
                  Duration: {formatTime(duration)}
                </p>
              </div>
            )}

            {/* Idle state */}
            {callState === "idle" && (
              <div className="text-center z-10 py-20">
                <div className="h-28 w-28 rounded-full bg-gray-700 flex items-center justify-center mx-auto mb-4">
                  <HiOutlineVideoCamera className="h-12 w-12 text-gray-400" />
                </div>
                <p className="text-white text-xl font-semibold">
                  {isTeacher ? "No Active Call" : "Ready to Call"}
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  {isTeacher
                    ? "Waiting for a student to call you"
                    : teacherName}
                </p>
              </div>
            )}
          </div>

          {/* ═══ Controls / Info Bar ═══ */}
          <div className="bg-gray-900 px-6 py-4">
            {error && (
              <div className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded-xl text-center">
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            {/* Active call info bar */}
            {callState === "active" && (
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-white text-sm font-mono">
                    {formatTime(duration)}
                  </span>
                </div>

                {subTimeLeft !== null && user?.role === "student" && (
                  <div className="flex items-center gap-2">
                    <HiOutlineClock className="h-4 w-4 text-amber-400" />
                    <span
                      className={`text-sm font-mono ${
                        subTimeLeft < 300 ? "text-red-400" : "text-amber-300"
                      }`}
                    >
                      Sub: {formatTime(subTimeLeft)}
                    </span>
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center justify-center gap-4">
              {/* LOADING */}
              {callState === "loading" && (
                <button
                  disabled
                  className="flex items-center gap-2 px-8 py-3 bg-gray-700 text-gray-400 rounded-full font-semibold cursor-not-allowed"
                >
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Loading...
                </button>
              )}

              {/* IDLE — Student: Start Call / Teacher: Back */}
              {callState === "idle" && !isTeacher && (
                <button
                  onClick={startCall}
                  className="flex items-center gap-2 px-8 py-3 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition text-lg shadow-lg shadow-green-600/30"
                >
                  <HiOutlinePhone className="h-6 w-6" />
                  Start Call
                </button>
              )}
              {callState === "idle" && isTeacher && (
                <button
                  onClick={() => navigate("/dashboard")}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-700 text-white rounded-full font-semibold hover:bg-gray-600 transition"
                >
                  Back to Dashboard
                </button>
              )}

              {/* CONNECTING */}
              {callState === "connecting" && (
                <button
                  disabled
                  className="flex items-center gap-2 px-8 py-3 bg-gray-700 text-gray-400 rounded-full font-semibold cursor-not-allowed"
                >
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Connecting...
                </button>
              )}

              {/* ACTIVE — End Call button (Jitsi also has its own hangup) */}
              {callState === "active" && (
                <button
                  onClick={() => endCallAPIRef.current()}
                  className="flex items-center gap-2 px-8 py-3 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 transition shadow-lg shadow-red-600/30"
                >
                  <HiOutlinePhoneMissedCall className="h-5 w-5" />
                  End Call
                </button>
              )}

              {/* ENDED — Navigation */}
              {callState === "ended" && (
                <div className="flex gap-3">
                  {!isTeacher && (
                    <button
                      onClick={() => navigate("/tutors")}
                      className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition"
                    >
                      Find Another Tutor
                    </button>
                  )}
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

        {/* Call Info Footer */}
        {call && (
          <div className="mt-4 bg-gray-800/50 rounded-xl p-4 text-center">
            <p className="text-gray-400 text-xs font-mono">
              Room: {call.room_id}
            </p>
            <p className="text-green-400 text-xs mt-1">
              ✅ Live video powered by Jitsi Meet
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoCallPage;

