/**
 *@description This builds a custom toast accepting three arguments
                - success, error, info 
 */

import React from "react";
import useToastStore from "../../store/notificationStore";
import type { ToastType } from "../../store/notificationStore";
import { X } from "lucide-react";

const typeColors: Record<ToastType, string> = {
  success: "bg-green-500",
  error: "bg-red-500",
  info: "bg-yellow-500",
};

const Toast: React.FC = () => {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed top-5 right-5 flex flex-col gap-3 z-[9999]">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center justify-between gap-4 text-white px-5 py-3 rounded-lg shadow-lg ${typeColors[toast.type]} animate-notification-fade-in`}
        >
          <span>{toast.message}</span>
          <button onClick={() => removeToast(toast.id)}>
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Toast;
