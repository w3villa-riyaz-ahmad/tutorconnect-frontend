import API from "./client";

// Auth API calls
export const authAPI = {
  signup: (data) => API.post("/auth/signup", data),
  login: (data) => API.post("/auth/login", data),
  socialLogin: (data) => API.post("/auth/social", data),
  resendVerification: (email) => API.post("/auth/resend_verification", { email }),
  refresh: (refreshToken) => API.post("/auth/refresh", { refresh_token: refreshToken }),
  logout: () => API.post("/auth/logout"),
  me: () => API.get("/auth/me"),
};

// Health check
export const healthAPI = {
  check: () => API.get("/health"),
};

export default API;
