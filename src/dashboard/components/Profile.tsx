/**
 * @description Navbar profile component
 * - Displays user avatar or initials
 * - On click, shows the reusable ProfileSettingsDropDown
 */

import { useState, useRef, useEffect } from "react";
import { getInitials } from "../../utils/getInitials";
import useAuthstore from "../../store/authStore";
import ProfileSettingsDropDown from "./ProfileSettingsDropDown";
import ProfileSettingsPage from "../components/ProfileSettingsPage";

const Profile = () => {
  const { user } = useAuthstore();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar Button */}
      <button
        type="button"
        onClick={() => setShowDropdown((prev) => !prev)}
        className="cursor-pointer flex items-center justify-center w-10 h-10 rounded-full bg-gray-300 text-white text-sm font-bold"
        title="Profile"
      >
        {user.avatar ? (
          <img
            src={user.avatar}
            alt="profile"
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          getInitials(user.name)
        )}
      </button>

      {/* Dropdown */}
      <ProfileSettingsDropDown
        show={showDropdown}
        onClose={() => setShowDropdown(false)}
        onOpenProfile={() => {
          setShowDropdown(false); // close dropdown
          setShowModal(true); // open modal
        }}
      />

      {/* Profile Modal */}
      <ProfileSettingsPage
        show={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default Profile;
