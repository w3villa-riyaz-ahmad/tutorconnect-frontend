import API from "./client";

export const tutorsAPI = {
  // GET /api/tutors — list available tutors
  getAll: (params = {}) => API.get("/tutors", { params }),

  // GET /api/tutors/:id — single tutor details
  getById: (id) => API.get(`/tutors/${id}`),

  // PATCH /api/tutors/toggle_status — toggle availability (teacher only)
  toggleStatus: () => API.patch("/tutors/toggle_status"),
};

export const callsAPI = {
  // POST /api/calls/start — start a call with a teacher
  start: (teacherId) => API.post("/calls/start", { teacher_id: teacherId }),

  // POST /api/calls/end_call — end the active call
  endCall: () => API.post("/calls/end_call"),

  // POST /api/calls/heartbeat — keep call alive
  heartbeat: () => API.post("/calls/heartbeat"),

  // GET /api/calls/active — get current active call
  getActive: () => API.get("/calls/active"),

  // GET /api/calls/history — past calls
  getHistory: (page = 1) => API.get(`/calls/history?page=${page}`),
};
