import API from "./client";

export const subscriptionsAPI = {
  // GET /api/subscriptions/plans — fetch available plans
  getPlans: () => API.get("/subscriptions/plans"),

  // GET /api/subscriptions/current — get active subscription
  getCurrent: () => API.get("/subscriptions/current"),

  // GET /api/subscriptions/history — get subscription history
  getHistory: (page = 1) => API.get(`/subscriptions/history?page=${page}`),

  // POST /api/subscriptions/checkout — start checkout
  checkout: (planType) => API.post("/subscriptions/checkout", { plan_type: planType }),

  // GET /api/subscriptions/success — verify payment success
  verifySuccess: (params) => {
    const query = new URLSearchParams(params).toString();
    return API.get(`/subscriptions/success?${query}`);
  },
};
