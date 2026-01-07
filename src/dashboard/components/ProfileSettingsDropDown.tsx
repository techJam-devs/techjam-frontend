/**
 * @description A reuseable drop down component for the dashboard nav for both large and mobile screens
 *              - displays 3 items, user pic + name, profile settings page and logout functionality
 *              - imports the profile settings page component when clicked
 */

import { useState } from "react";
import { User, LogOut } from "lucide-react";
import useAuthstore from "../../store/authStore";
import { getInitials } from "../../utils/getInitials";
import useToastStore from "../../store/notificationStore";
import ProfileSettingsPage from "../components/ProfileSettingsPage";

const ProfileSettingsDropDown = ({
  show,
  onClose,
}: {
  show: boolean;
  onClose: () => void;
}) => {
  const { user, logout } = useAuthstore();
  const { addToast } = useToastStore();
  const [showModal, setShowModal] = useState(false); // controls modal visibility

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
    <>
      {/* Dropdown */}
      <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
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
          <p className="font-semibold text-gray-800">{user.name}</p>
        </div>

        <ul>
          <li>
            <button
              onClick={() => {
                setShowModal(true); // open modal
                onClose(); // close the dropdown
              }}
              className="w-full flex items-center gap-2 text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
            >
              <User size={18} /> Profile
            </button>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
            >
              <LogOut size={18} /> Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Reuse the modal component */}
      <ProfileSettingsPage
        show={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
};

export default ProfileSettingsDropDown;
