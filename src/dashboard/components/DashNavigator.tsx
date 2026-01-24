/**
 * @description Returns the Navigation of our dashboard
 */

import { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import MenuIcon from "./MenuIcon";
import CreateProjectButton from "./CreateProject";
import {
  ChevronDown,
  Clock,
  CircleCheck,
  CircleSlash,
  PlusIcon,
} from "lucide-react";

const DashNavigator = () => {
  const navList = [
    { label: "Best Match", link: "/dashboard" },
    { label: "Joined Projects", link: "/dashboard/joined-projects" },
    { label: "Saved Projects", link: "/dashboard/saved-projects" },
    { label: "My Projects", link: "/dashboard/my-projects" },
  ];

  const location = useLocation();
  const pathname = location.pathname;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLUListElement>(null);

  // Close dropdown on route change
  useEffect(() => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  }, [location]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const projectStatuses = ["all", "in-progress", "Completed", "Cancelled"];

  const getStatusIcon = (status: string) =>
    status === "Completed"
      ? CircleCheck
      : status === "Cancelled"
        ? CircleSlash
        : status === "in-progress"
          ? Clock
          : PlusIcon;

  return (
    <nav className="flex items-center justify-between max-w-6xl mx-auto p-4 relative">
      {/* Mobile menu toggle */}
      <div className="hidden md:flex">
        <MenuIcon />
      </div>
      <button
        type="button"
        onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        aria-label="Toggle navigation menu"
        aria-expanded={isMobileMenuOpen}
        className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 md:hidden"
      >
        <MenuIcon />
      </button>

      {/* Desktop nav */}
      <ul className="hidden md:flex flex-1 justify-center gap-5 sm:gap-10 items-center text-xs sm:text-sm text-gray-600">
        {navList.map((nav) => {
          const isActive =
            nav.label === "My Projects"
              ? pathname.startsWith("/dashboard/my-projects")
              : pathname === nav.link;

          return (
            <li key={nav.link} className="relative">
              <div className="flex items-center gap-1">
                <Link
                  to={nav.link}
                  className={`cursor-pointer transition-colors duration-300 ${
                    isActive
                      ? "text-black font-medium"
                      : "text-gray-600 hover:text-black"
                  }`}
                >
                  {nav.label}
                </Link>

                {/* My Projects dropdown */}
                {nav.label === "My Projects" && isActive && (
                  <>
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="text-gray-600 hover:text-black"
                      aria-label="Toggle project status dropdown"
                      aria-expanded={isDropdownOpen}
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          isDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isDropdownOpen && (
                      <ul
                        ref={dropdownRef}
                        className="absolute top-full left-0 mt-2 w-44 rounded-lg shadow-md border border-gray-200 bg-white text-sm z-50"
                      >
                        {projectStatuses.map((status) => {
                          const StatusIcon = getStatusIcon(status);
                          const link =
                            status === "all"
                              ? "/dashboard/my-projects"
                              : `/dashboard/my-projects?status=${status
                                  .toLowerCase()
                                  .replace(" ", "-")}`;

                          return (
                            <li key={status}>
                              <Link
                                to={link}
                                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-black"
                                onClick={() => setIsDropdownOpen(false)}
                              >
                                <StatusIcon
                                  className="w-4 h-4"
                                  strokeWidth={1.5}
                                />
                                {status}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      {/* Right-side actions */}
      <div className="flex items-center gap-3 sm:gap-5">
        {/* Pending requests (only mobile hidden) */}
        <Link
          to="requests"
          title="Requests"
          className={`flex md:hidden cursor-pointer text-sm rounded-full p-1 hover:bg-gray-100 transition-colors duration-300 ${
            pathname === "/dashboard/requests"
              ? "text-black font-medium"
              : "text-gray-600 hover:text-black"
          }`}
        >
          <p>Pending Requests</p>
        </Link>

        {/* Create project button */}
        <CreateProjectButton />
      </div>

      {/* Mobile nav menu */}
      {isMobileMenuOpen && (
        <ul className="absolute top-full left-0 mt-2 w-full space-y-6 py-10 rounded-md bg-white shadow-lg z-50 md:hidden">
          {navList.map((item) => (
            <li key={item.link}>
              <Link
                to={item.link}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default DashNavigator;
