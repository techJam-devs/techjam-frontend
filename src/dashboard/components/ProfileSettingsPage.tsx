/**
 * @description This is the page where users view that profile settings and also update whatever details dey want to
 */

import { X } from "lucide-react";
import useAuthstore from "../../store/authStore";
import { getInitials } from "../../utils/getInitials";

interface ProfileSettingsModalProps {
  show: boolean;
  onClose: () => void;
}

const ProfileSettingsPage = ({ show, onClose }: ProfileSettingsModalProps) => {
  const { user } = useAuthstore();

  if (!show || !user) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-xl p-6">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Content */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-24 h-24 rounded-full border-2 border-gray-300 bg-gray-200 flex items-center justify-center text-white font-bold text-2xl">
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
          <h2 className="text-xl font-semibold">{user.name}</h2>

          {/* Here you can add more settings or info */}
          <p className="text-gray-600 text-center">
            This is your profile settings modal. Add any settings or info here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingsPage;
