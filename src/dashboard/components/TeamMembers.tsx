/**
 * @description The component is used in Best match card i.e home of the dashboard page
 */

import React from "react";
import { getInitials } from "../../utils/getInitials";

interface TeamMember {
  id: string;
  name: string;
  username: string;
  avatar?: string; // optional
}

interface DevCountsProps {
  teamMembers?: TeamMember[];
}

const TeamMembers: React.FC<DevCountsProps> = ({ teamMembers = [] }) => {
  // Show max 4 avatars
  const visibleMembers = teamMembers.slice(0, 4);

  // Count of members not shown
  const hiddenCount = teamMembers.length - visibleMembers.length;

  return (
    <div className="flex items-center gap-2">
      {/* Avatars */}
      <div className="flex -space-x-3">
        {visibleMembers.map((member) => (
          <div
            key={member.id}
            className="w-8 h-8 border-2 border-white rounded-full flex items-center justify-center bg-gray-400 text-white text-xs font-semibold"
            title={member.name}
          >
            {member.avatar ? (
              <img
                src={member.avatar}
                alt={member.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              getInitials(member.name)
            )}
          </div>
        ))}
      </div>

      {/* Extra count for hidden members */}
      {hiddenCount > 0 && (
        <div className="w-8 h-8 flex items-center justify-center rounded-full text-xs font-medium text-[#0908C3] border-2 border-white -ml-3">
          +{hiddenCount}
        </div>
      )}
    </div>
  );
};

export default TeamMembers;
