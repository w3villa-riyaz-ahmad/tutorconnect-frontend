import API from "./client";

export const profileAPI = {
  // GET /api/profile
  getProfile: () => API.get("/profile"),

  // PUT /api/profile (JSON fields only, no file)
  updateProfile: (data) => API.put("/profile", data),

  // PUT /api/profile (with file upload — uses FormData)
  updateProfileWithPhoto: (data) => {
    const formData = new FormData();

    if (data.profile_pic) {
      formData.append("profile_pic", data.profile_pic);
    }
    if (data.first_name) formData.append("first_name", data.first_name);
    if (data.last_name) formData.append("last_name", data.last_name);
    if (data.address !== undefined) formData.append("address", data.address);
    if (data.latitude !== undefined) formData.append("latitude", data.latitude);
    if (data.longitude !== undefined) formData.append("longitude", data.longitude);

    return API.put("/profile", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  // DELETE /api/profile/remove_photo
  removePhoto: () => API.delete("/profile/remove_photo"),

  // GET /api/profile/download (returns CSV blob)
  downloadProfile: () =>
    API.get("/profile/download", { responseType: "blob" }),
};

export default profileAPI;
