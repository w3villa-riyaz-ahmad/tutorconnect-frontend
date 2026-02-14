import React, { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlineDownload,
  HiOutlineSave,
} from "react-icons/hi";
import { profileAPI } from "../api/profile";
import { useAuth } from "../context/AuthContext";
import ProfilePhotoUpload from "../components/ProfilePhotoUpload";
import AddressAutocomplete from "../components/AddressAutocomplete";
import MapDisplay from "../components/MapDisplay";

const ProfilePage = () => {
  // eslint-disable-next-line no-unused-vars
  const { user: authUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    address: "",
    latitude: null,
    longitude: null,
  });
  const [hasChanges, setHasChanges] = useState(false);

  const fetchProfile = useCallback(async () => {
    try {
      const { data } = await profileAPI.getProfile();
      setProfile(data.profile);
      setFormData({
        first_name: data.profile.first_name || "",
        last_name: data.profile.last_name || "",
        address: data.profile.address || "",
        latitude: data.profile.latitude,
        longitude: data.profile.longitude,
      });
    } catch (err) {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleLocationSelect = ({ address, latitude, longitude }) => {
    setFormData((prev) => ({ ...prev, address, latitude, longitude }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    if (!formData.first_name.trim() || !formData.last_name.trim()) {
      toast.error("First name and last name are required");
      return;
    }

    setSaving(true);
    try {
      const { data } = await profileAPI.updateProfile(formData);
      setProfile(data.profile);
      setHasChanges(false);
      toast.success("Profile updated!");
    } catch (err) {
      const msg =
        err.response?.data?.errors?.[0] ||
        err.response?.data?.error ||
        "Failed to update profile";
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  const handlePhotoUpdated = (updatedProfile) => {
    setProfile(updatedProfile);
  };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const response = await profileAPI.downloadProfile();
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `tutorconnect_profile_${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success("Profile data downloaded!");
    } catch (err) {
      toast.error("Failed to download profile data");
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            <p className="mt-1 text-gray-600">
              Manage your personal information and preferences
            </p>
          </div>
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            {downloading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
            ) : (
              <HiOutlineDownload className="h-4 w-4" />
            )}
            <span>Download Data</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column — Photo + Info Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <ProfilePhotoUpload
                currentPhotoUrl={profile?.profile_pic_url}
                onPhotoUpdated={handlePhotoUpdated}
              />

              {/* Quick info */}
              <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
                <div className="flex items-center space-x-2 text-sm">
                  <HiOutlineMail className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{profile?.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <span
                    className={`px-2 py-0.5 text-xs rounded-full font-medium capitalize ${
                      profile?.role === "admin"
                        ? "bg-red-100 text-red-700"
                        : profile?.role === "teacher"
                        ? "bg-green-100 text-green-700"
                        : "bg-indigo-100 text-indigo-700"
                    }`}
                  >
                    {profile?.role}
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-500 text-xs">
                    Member since{" "}
                    {profile?.created_at
                      ? new Date(profile.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column — Edit Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Personal Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* First Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <div className="relative">
                    <HiOutlineUser className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.first_name}
                      onChange={(e) => handleChange("first_name", e.target.value)}
                      className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    />
                  </div>
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <div className="relative">
                    <HiOutlineUser className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.last_name}
                      onChange={(e) => handleChange("last_name", e.target.value)}
                      className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    />
                  </div>
                </div>
              </div>

              {/* Email (read-only) */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <HiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={profile?.email || ""}
                    disabled
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-500 cursor-not-allowed"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-400">
                  Email cannot be changed
                </p>
              </div>
            </div>

            {/* Address & Map */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Location
              </h2>

              <AddressAutocomplete
                value={formData.address}
                onChange={(val) => handleChange("address", val)}
                onLocationSelect={handleLocationSelect}
              />

              {/* Map */}
              <div className="mt-4">
                <MapDisplay
                  latitude={formData.latitude}
                  longitude={formData.longitude}
                  address={formData.address}
                />
              </div>

              {formData.latitude && formData.longitude && (
                <p className="mt-2 text-xs text-gray-400">
                  Coordinates: {formData.latitude?.toFixed(5)},{" "}
                  {formData.longitude?.toFixed(5)}
                </p>
              )}
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                disabled={saving || !hasChanges}
                className="flex items-center space-x-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <HiOutlineSave className="h-4 w-4" />
                )}
                <span>{saving ? "Saving..." : "Save Changes"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
