/**
 * @description Nav bar of our dashboard
 */

import { ChevronDown, Menu, Search } from "lucide-react";
import StatusIcon from "./StatusIcon";
import DashNotification from "./DashNotification";
import Profile from "./Profile";

const DashNav = () => {
  return (
    <header className="md:shadow-sm py-3 xl:px-16">
      <nav className="flex items-center justify-center md:justify-between px-6 py-6 h-14">
        {/* Left side logo */}
        <div>
          <img src="/logo.png" alt="app logo" width={100} height={20} />
        </div>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-4">
          {/**Explore */}
          <button
            type="button"
            className="flex gap-1 items-center cursor-pointer text-gray-600 text-sm"
          >
            Explore{" "}
            <span>
              {" "}
              <ChevronDown className="size-4" />{" "}
            </span>
          </button>
          {/* Search Bar */}
          <div className="flex items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-400" />
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 w-full lg:w-80 bg-blue-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Status icon */}
          <StatusIcon />

          {/** Notification  */}
          <DashNotification />

          {/* Avatar */}
          <Profile />
        </div>
      </nav>
      {/** ============ Mobile screen header =================*/}
      <div className="md:hidden flex justify-between gap-3 w-full px-4">
        {/** search bar */}
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
        {/** Menu icon */}
        <button type="button" className="cursor-pointer">
          <Menu className="text-gray-600" />
        </button>
      </div>
    </header>
  );
};

export default DashNav;
