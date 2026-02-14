import React, { useState, useRef } from "react";
import toast from "react-hot-toast";
import { HiOutlineCamera, HiOutlineTrash } from "react-icons/hi";
import { profileAPI } from "../api/profile";

const ProfilePhotoUpload = ({ currentPhotoUrl, onPhotoUpdated }) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Client-side validation
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Please select a valid image (JPG, PNG, GIF, or WebP)");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be smaller than 5MB");
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target.result);
    reader.readAsDataURL(file);

    // Upload
    setUploading(true);
    try {
      const { data } = await profileAPI.updateProfileWithPhoto({ profile_pic: file });
      toast.success("Profile photo updated!");
      setPreview(null);
      onPhotoUpdated(data.profile);
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to upload photo");
      setPreview(null);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleRemovePhoto = async () => {
    if (!window.confirm("Remove your profile photo?")) return;

    try {
      const { data } = await profileAPI.removePhoto();
      toast.success("Photo removed");
      onPhotoUpdated(data.profile);
    } catch (err) {
      toast.error("Failed to remove photo");
    }
  };

  const displayUrl = preview || currentPhotoUrl;

  return (
    <div className="flex flex-col items-center space-y-3">
      {/* Avatar */}
      <div className="relative group">
        <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-200 border-4 border-white shadow-lg">
          {displayUrl ? (
            <img
              src={displayUrl}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-indigo-100 text-indigo-400">
              <HiOutlineCamera className="w-10 h-10" />
            </div>
          )}
        </div>

        {/* Upload overlay */}
        {!uploading && (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute inset-0 rounded-full bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100"
          >
            <HiOutlineCamera className="w-8 h-8 text-white" />
          </button>
        )}

        {/* Loading spinner */}
        {uploading && (
          <div className="absolute inset-0 rounded-full bg-black bg-opacity-50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="text-sm text-indigo-600 hover:text-indigo-700 font-medium disabled:opacity-50"
        >
          {currentPhotoUrl ? "Change Photo" : "Upload Photo"}
        </button>
        {currentPhotoUrl && (
          <>
            <span className="text-gray-300">|</span>
            <button
              onClick={handleRemovePhoto}
              className="text-sm text-red-500 hover:text-red-600 font-medium flex items-center space-x-1"
            >
              <HiOutlineTrash className="w-3.5 h-3.5" />
              <span>Remove</span>
            </button>
          </>
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/gif,image/webp"
        onChange={handleFileSelect}
        className="hidden"
      />

      <p className="text-xs text-gray-400">JPG, PNG, GIF or WebP. Max 5MB.</p>
    </div>
  );
};

export default ProfilePhotoUpload;
