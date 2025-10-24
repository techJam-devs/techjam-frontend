/**
 * @description Returns dashboard notification dropdown
 */

import { Bell, Check, XCircle } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const DashNotification = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sample notifications (replace with API later)
  const notifications = [
    {
      id: 1,
      text: "Your project 'Fintech App' was approved!",
      type: "success",
      time: "2m ago",
    },
    {
      id: 2,
      text: "New comment on 'React Dashboard UI'",
      type: "info",
      time: "10m ago",
    },
    {
      id: 3,
      text: "Task deadline missed for 'API Integration'",
      type: "error",
      time: "1h ago",
    },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Notification bell */}
      <button
        type="button"
        title="Notifications"
        onClick={() => setOpen((prev) => !prev)}
        className="relative flex cursor-pointer p-2 rounded-full hover:bg-gray-200 transition-colors duration-300"
      >
        <Bell className="w-5 h-5 text-gray-700" />
        {notifications.length > 0 && (
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-72 bg-white shadow-lg rounded-xl border border-gray-100 z-50">
          <div className="p-3 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-sm font-semibold text-gray-700">
              Notifications
            </h3>
            <button
              onClick={() => setOpen(false)}
              className="text-xs text-blue-600 hover:underline"
            >
              Close
            </button>
          </div>

          <ul className="max-h-64 overflow-y-auto divide-y divide-gray-100">
            {notifications.map((note) => (
              <li
                key={note.id}
                className="p-3 flex items-start gap-3 hover:bg-gray-50 transition"
              >
                {note.type === "success" && (
                  <Check className="w-5 h-5 text-green-500 mt-1" />
                )}
                {note.type === "info" && (
                  <Bell className="w-5 h-5 text-blue-500 mt-1" />
                )}
                {note.type === "error" && (
                  <XCircle className="w-5 h-5 text-red-500 mt-1" />
                )}
                <div>
                  <p className="text-sm text-gray-700">{note.text}</p>
                  <span className="text-xs text-gray-400">{note.time}</span>
                </div>
              </li>
            ))}
          </ul>

          {notifications.length === 0 && (
            <div className="p-4 text-center text-sm text-gray-500">
              No new notifications 🎉
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DashNotification;
