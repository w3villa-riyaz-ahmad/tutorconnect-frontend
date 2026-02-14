import API from "./client";

// Admin Dashboard API
export const adminDashboardAPI = {
  getStats: () => API.get("/admin/stats"),
  getRecentActivity: () => API.get("/admin/recent_activity"),
};

// Admin Users API
export const adminUsersAPI = {
  getAll: (params = {}) => API.get("/admin/users", { params }),
  getById: (id) => API.get(`/admin/users/${id}`),
  update: (id, data) => API.patch(`/admin/users/${id}`, data),
  ban: (id, reason) => API.post(`/admin/users/${id}/ban`, { reason }),
  unban: (id) => API.post(`/admin/users/${id}/unban`),
};
