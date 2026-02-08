/**
 * @description A reuseable drop down component for the dashboard nav for both large and mobile screens
 *              - displays 3 items, user pic + name, profile settings page and logout functionality
 *              - imports the profile settings page component when clicked
 */

import { User, LogOut } from "lucide-react";
import useAuthstore from "../../store/authStore";
import { getInitials } from "../../utils/getInitials";
import useToastStore from "../../store/notificationStore";

interface ProfileSettingsDropDownProps {
  show: boolean;
  onClose: () => void;
  onOpenProfile: () => void; // <-- new prop
}

const ProfileSettingsDropDown = ({
  show,
  onClose,
  onOpenProfile,
}: ProfileSettingsDropDownProps) => {
  const { user, logout } = useAuthstore();
  const { addToast } = useToastStore();

  if (!user || !show) return null;

  const handleLogout = async () => {
    try {
      const res = await logout();
      addToast({
        message: res.message || "Logout successful",
        type: "success",
      });
      onClose();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Logout failed.";
      addToast({ message, type: "error" });
    }
  };

  return (
    <div className="absolute right-2 mt-2 w-45 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
      <div className="h-16 bg-gray-800 flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-2 border-white bg-gray-300 flex items-center justify-center text-white font-bold text-lg">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt="avatar"
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            getInitials(user.name)
          )}
        </div>
      </div>

      <div className="px-4 py-2 border-b border-gray-200 text-center">
        <p className="font-semibold text-gray-800 text-sm">{user.name}</p>
      </div>

      <ul>
        <li>
          <button
            onClick={onOpenProfile} // <-- trigger modal directly
            className="w-full flex items-center text-sm gap-2 text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
          >
            <User size={14} /> Profile
          </button>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="w-full flex items-center text-sm gap-2 text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
          >
            <LogOut size={14} /> Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ProfileSettingsDropDown;
