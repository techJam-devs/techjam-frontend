/**
 * @description Profile settings page / modal UI
 */

import { useState, useRef, useEffect } from "react";
import { X, Camera, BadgeCheck, MapPin } from "lucide-react";
import useAuthstore from "../../store/authStore";
import { getInitials } from "../../utils/getInitials";
import profileBanner from "../../assets/profileBanner.webp";
import useToastStore from "../../store/notificationStore";
import {
  avatarUploadService,
  updateProfileService,
} from "../../services/userProfileServices";

interface ProfileSettingsModalProps {
  show: boolean;
  onClose: () => void;
}

const ProfileSettingsPage = ({ show, onClose }: ProfileSettingsModalProps) => {
  const { user, setUser } = useAuthstore();
  const { addToast } = useToastStore();

  const [username, setUsername] = useState(user?.username || "");
  const [location, setLocation] = useState(user?.location || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [role, setRole] = useState(user?.role || "");
  const [loading, setLoading] = useState(false);

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Capture initial value to detect changes
  const initialProfile = {
    username: user?.username || "",
    location: user?.location || "",
    bio: user?.bio || "",
    role: user?.role || "",
  };

  // verify if changes has occur
  const hasChanges =
    username !== initialProfile.username ||
    location !== initialProfile.location ||
    bio !== initialProfile.bio ||
    role !== initialProfile.role;

  // Clean up prevent memory leaks
  useEffect(() => {
    return () => {
      if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    };
  }, [avatarPreview]);
  if (!show || !user) return null;

  // Upload user avatar
  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const imgFile = e.target.files?.[0];
    if (!imgFile) return;

    // Validated its an image file
    if (!imgFile.type.startsWith("image/")) {
      addToast({ message: "Please select a valid image type", type: "info" });
      return;
    }

    // Validate image size is not greater than 2mb
    if (imgFile.size > 2 * 1024 * 1024) {
      addToast({ message: "Image must be less than 2MB", type: "info" });
      return;
    }

    const previewUrl = URL.createObjectURL(imgFile);
    setAvatarPreview(previewUrl);
    setIsUploadingAvatar(true);

    try {
      const res = await avatarUploadService(imgFile);
      setUser(res.user);
      addToast({
        message: res.message ?? "Profile picture uploaded.",
        type: "success",
      });
    } catch (error) {
      if (error)
        addToast({ message: "Profile picture upload failed!", type: "error" });
      console.error("Avatar upload failed", error);
      setAvatarPreview(null);
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  // Submit user profile update
  const handleSave = async () => {
    if (!hasChanges) return;
    setLoading(true);
    try {
      const response = await updateProfileService({
        username,
        location,
        bio,
        role,
      });
      setUser(response.user);
      addToast({ message: "Profile update successful.", type: "success" });
    } catch (error) {
      addToast({ message: "Update failed. Please try again.", type: "error" });
      console.error("Profile update failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center md:p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-xl max-h-[100vh] overflow-y-auto">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 text-white hover:text-gray-200"
        >
          <X className="w-6 h-6 text-orange-200" />
        </button>

        {/* Banner */}
        <div
          className="h-40 w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${profileBanner})` }}
        />

        <div className="relative px-6 pb-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end gap-6 -mt-10 py-3">
            {/* Avatar */}
            <div className="relative w-32 h-32 rounded-full border-4 border-white bg-gray-200 overflow-hidden">
              {avatarPreview || user.avatar ? (
                <img
                  src={avatarPreview || user.avatar}
                  alt="avatar"
                  className={`w-full h-full object-cover ${
                    isUploadingAvatar ? "opacity-70" : ""
                  }`}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-gray-700">
                  {getInitials(user.name)}
                </div>
              )}

              {isUploadingAvatar && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-xs font-medium">
                  Uploading...
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handleAvatarChange}
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-2 right-2 bg-black/70 p-2 rounded-full text-white hover:bg-black"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>

            {/* Name & Email + location */}
            <div className="pb-2 space-y-1">
              <h2 className="text-2xl font-semibold">{user.name}</h2>
              <p className="text-sm font-medium text-gray-600">
                {user.role || "No Role set"}
              </p>

              <div className="flex items-center gap-1 text-sm text-gray-500">
                <MapPin className="w-4 h-4" />
                <span>{user.location || "N/A"}</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full name
              </label>
              <input
                type="text"
                value={user.name}
                readOnly
                className="w-full text-sm p-2 rounded-lg text-gray-400 border-gray-300 bg-gray-50 cursor-not-allowed"
              />
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="your_username"
                className="w-full p-2 rounded-lg text-sm border-gray-300 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Professional Role
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Software Engineer"
                className="w-full p-2 rounded-lg text-sm border-gray-300 focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  value={user.email}
                  readOnly
                  className="w-full p-2 text-sm rounded-lg text-gray-400 border-gray-300 bg-gray-50 cursor-not-allowed"
                />
                {user.isEmailVerified && (
                  <span className="flex items-center gap-1 text-xs text-green-700 bg-green-100 md:px-3 py-1 rounded-full font-medium">
                    <BadgeCheck className="w-4 h-4" />
                    Verified
                  </span>
                )}
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City, Country"
                className="w-full text-sm p-2 rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Bio */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bio (max 160 characters)
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              maxLength={160}
              rows={5}
              className="w-full text-sm rounded-lg bg-gray-100 p-2 border-gray-300 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Actions */}
          <div className="mt-8 flex justify-end gap-3">
            {!loading && (
              <button
                onClick={onClose}
                className={`px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100`}
              >
                Cancel
              </button>
            )}
            <button
              onClick={handleSave}
              disabled={loading || !hasChanges}
              className={`px-5 py-2 rounded-lg ${loading || !hasChanges ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-blue text-white hover:bg-indigo-700"}`}
            >
              {loading ? "Updating profile..." : "Save changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingsPage;
