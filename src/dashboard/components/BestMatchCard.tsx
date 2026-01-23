/**
 * @description This card is for Best match Page
 * @returns A reuseable card component taking props, used in our index page or Best matches page
 */

import TeamMembers from "./TeamMembers";
import type { Project } from "../../types/projects.types";
import { joinProjectRequestService } from "../../services/projectService";
import { useState } from "react";
import useToastStore from "../../store/notificationStore";

type ProjectStatus = "available" | "pending" | "completed" | "cancelled";

// controls dynamically the color by status
const statusColors: Record<ProjectStatus, string> = {
  available: "bg-green-500",
  completed: "bg-blue-500",
  pending: "bg-orange-500",
  cancelled: "bg-red-600",
};
const statusTextColors: Record<ProjectStatus, string> = {
  available: "text-green-600",
  completed: "text-blue-600",
  pending: "text-orange-600",
  cancelled: "text-red-600",
};

const BestMatchCard: React.FC<Project> = ({
  _id,
  title,
  techStack,
  description,
  requiredRoles,
  startDate,
  endDate,
  status,
  createdAt,
  teamMembers,
}) => {
  const { addToast } = useToastStore();
  const [loading, setLoading] = useState<boolean>(false);
  const start = new Date(startDate);
  const end = new Date(endDate);
  const projectDuration = `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
  const projectCreatedDate = new Date(createdAt).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });

  // ============ send request to join =======
  const sendRequest = async () => {
    setLoading(true);
    try {
      const res = await joinProjectRequestService(_id);
      addToast({ message: res.message, type: "success" });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unexpected error occurred";

      addToast({ message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full rounded-lg border border-border-color p-5 shadow-md space-y-3">
      {/*  time and status */}
      <div className="flex items-center justify-between text-xs text-mute-gray">
        <span> {projectCreatedDate} </span>
        <span className="flex items-center gap-1 text-xs font-medium">
          <span
            className={`inline-block h-2 w-2 rounded-full ${statusColors[status]}`}
          />
          <span
            className={`first-letter:uppercase opacity-80 ${statusTextColors[status]}`}
          >
            {status}
          </span>
        </span>
      </div>

      {/* Title */}
      <p className="text-lg font-semibold mt-4 capitalize"> {title} </p>

      {/* Description */}
      <p className="text-gray-700 text-sm">{description}</p>

      {/* Duration */}
      <p className="font-semibold text-sm">
        📆 Duration:{" "}
        <span className="italic text-gray-400 text-xs">{projectDuration}</span>
      </p>

      {/** roles */}
      <p className="font-semibold text-sm">
        👥 Required Roles:
        <span className="text-xs font-medium text-gray-600">
          {requiredRoles.join(", ")}
        </span>
      </p>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-1 mb-10">
        {techStack.map((tech) => (
          <span
            key={tech}
            className="bg-blue-100 text-gray-700 px-2 py-0.5 rounded-full text-xs"
          >
            {tech}
          </span>
        ))}
      </div>

      {/** Button to join project + team members avatar display */}
      <div className="flex justify-between items-center mt-6">
        <TeamMembers
          teamMembers={teamMembers?.map((member) => ({
            id: member.user._id,
            name: member.user.name,
            username: member.user.username,
            avatar: member.user.avatar,
          }))}
        />

        <button
          type="button"
          disabled={loading}
          onClick={sendRequest}
          className="bg-blue hover:bg-blue/80 hover:shadow-2xl text-white cursor-pointer tracking-wide py-2 px-6 text-sm shadow-md rounded-full disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 disabled:animate-pulse"
        >
          {loading ? "Sending request... 🚀" : "Join Project"}
        </button>
      </div>
    </div>
  );
};

export default BestMatchCard;
