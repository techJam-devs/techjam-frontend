/**
 * @description Returns the Navigation of our dashboard
 */

import { useState, useEffect } from "react";
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
    { label: "Most Recent", link: "/dashboard/most-recent" },
    { label: "Saved Projects", link: "/dashboard/saved-projects" },
    { label: "My Projects", link: "/dashboard/my-projects" },
  ];

  const location = useLocation();
  const pathname = location.pathname;
  const [openDropdown, setOpenDropdown] = useState(false);

  // Auto  Close dropdown whenever route changes
  useEffect(() => {
    setOpenDropdown(false);
  }, [location]);

  return (
    <nav className="flex items-center justify-between max-w-6xl mx-auto md:p-4 relative">
      {/* Menu button */}

      <MenuIcon />

      {/* Map nav links */}
      <ul className="flex flex-1 justify-center gap-5 sm:gap-10 items-center text-xs sm:text-sm text-gray-600">
        {navList.map((nav, idx) => (
          <li key={idx} className={idx >= 2 ? "hidden sm:block relative" : ""}>
            {nav.label === "My Projects" ? (
              <div className="relative flex items-center gap-1">
                {/* My Projects link */}
                <Link
                  to={nav.link}
                  className={`cursor-pointer transition-colors duration-300 ${
                    pathname.startsWith("/dashboard/my-projects")
                      ? "text-black font-medium"
                      : "text-gray-600 hover:text-black"
                  }`}
                >
                  {nav.label}
                </Link>

                {/* Show arrow ONLY if on My Projects page */}
                {pathname.startsWith("/dashboard/my-projects") && (
                  <button
                    onClick={() => setOpenDropdown(!openDropdown)}
                    className="text-gray-600 hover:text-black"
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        openDropdown ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                )}

                {/* Dropdown */}
                {openDropdown && (
                  <ul className="absolute top-full left-0 mt-2 w-40 rounded-lg shadow-md border border-border-color bg-white text-sm z-50">
                    {["all", "in-progress", "Completed", "Cancelled"].map(
                      (status) => {
                        const Icon =
                          status === "Completed"
                            ? CircleCheck
                            : status === "Cancelled"
                              ? CircleSlash
                              : status === "in-progress"
                                ? Clock
                                : PlusIcon;

                        return (
                          <li key={status}>
                            <Link
                              to={
                                status === "all"
                                  ? "/dashboard/my-projects"
                                  : `/dashboard/my-projects?status=${status.toLowerCase().replace(" ", "-")}`
                              }
                              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-black"
                              onClick={() => setOpenDropdown(false)}
                            >
                              <Icon className="w-4 h-4" strokeWidth={1.5} />{" "}
                              {status}
                            </Link>
                          </li>
                        );
                      },
                    )}
                  </ul>
                )}
              </div>
            ) : (
              <Link
                to={nav.link}
                className={`cursor-pointer transition-colors duration-300 ${
                  pathname === nav.link
                    ? "text-black font-medium"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                {nav.label}
              </Link>
            )}
          </li>
        ))}
      </ul>

      {/* Pending request */}
      <Link
        to="requests"
        title="request"
        className={`flex sm:hidden cursor-pointer text-xs sm:text-sm rounded-full p-1 hover:bg-gray-100 transition-colors duration-300 ${
          pathname === "/dashboard/requests"
            ? "text-black font-medium"
            : "text-gray-600 hover:text-black"
        } `}
      >
        <p> Pending Requests </p>
      </Link>

      {/* Plus icon to create new projects */}
      <CreateProjectButton />
    </nav>
  );
};

export default DashNavigator;
