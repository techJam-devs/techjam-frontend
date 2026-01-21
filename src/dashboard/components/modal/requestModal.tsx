import { X } from "lucide-react";
import type { projectRequest } from "../../../types/projects.types";
import { getInitials } from "../../../utils/getInitials";

interface RequestDetailsModalProps {
  isOpen: boolean;
  project: projectRequest;
  user: projectRequest["joinRequests"][0];
  onClose: () => void;
  onAccept: () => void;
  onDecline: () => void;
}

const RequestDetailsModal = ({
  isOpen,
  project,
  user,
  onClose,
  onAccept,
  onDecline,
}: RequestDetailsModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-96 max-w-full p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-14 h-14 rounded-full object-cover"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-gray-300 flex items-center justify-center text-lg font-semibold text-gray-700">
              {getInitials(user.name)}
            </div>
          )}

          <div>
            <p className="font-semibold text-lg">{user.name}</p>
            <p className="text-sm text-gray-500">@{user.username}</p>
          </div>
        </div>

        {/* Body */}
        <div className="space-y-2 text-sm text-gray-600">
          <p>
            <span className="font-medium text-gray-800">Requested role:</span>{" "}
            {user.role ?? "N/A"}
          </p>
          <p>
            <span className="font-medium text-gray-800">Project:</span>{" "}
            {project.title}
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onDecline}
            className="px-4 py-1.5 rounded-md bg-red-100 text-red-600 hover:bg-red-500 hover:text-white transition"
          >
            Decline
          </button>
          <button
            onClick={onAccept}
            className="px-4 py-1.5 rounded-md bg-blue-100 text-blue-600 hover:bg-blue-500 hover:text-white transition"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestDetailsModal;
