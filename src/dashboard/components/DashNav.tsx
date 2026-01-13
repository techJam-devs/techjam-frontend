/**
 * @description Nav bar of our dashboard
 */

import { useState, useRef, useEffect } from "react";
import { Menu, Search } from "lucide-react";
import ProfileSettingsDropDown from "./ProfileSettingsDropDown"; // reuseable
import StatusIcon from "./StatusIcon";
import DashNotification from "./DashNotification";
import Profile from "./Profile";
import ProfileSettingsPage from "./ProfileSettingsPage";

const DashNav = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const mobileRef = useRef<HTMLDivElement>(null);

  // Close mobile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileRef.current &&
        !mobileRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="md:shadow-sm py-3 xl:px-16">
      <nav className="flex items-center justify-center md:justify-between px-6 py-6 h-14">
        {/* Left side logo */}
        <div>
          <img src="/logo.png" alt="app logo" width={100} height={20} />
        </div>

        {/* Right side (desktop) */}
        <div className="hidden md:flex items-center gap-4">
          {/* ...existing desktop content */}
          <StatusIcon />
          <DashNotification />
          <Profile />
        </div>
      </nav>

      {/* ============ Mobile screen header =================*/}
      <div
        className="md:hidden flex justify-between gap-3 w-full px-4"
        ref={mobileRef}
      >
        {/* Search bar + menu icon*/}
        <div className="items-center w-full">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-400" />
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 w-full bg-blue-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Menu icon */}
        <div className="relative">
          <button
            type="button"
            className="cursor-pointer hover:bg-blue rounded-full p-1"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <Menu className="text-gray-600 hover:text-white" />
          </button>
        </div>

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
    </header>
  );
};

export default DashNav;
