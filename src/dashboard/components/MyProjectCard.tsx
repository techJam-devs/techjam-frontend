/**
 * @description This is a reuseable card component for MyProject dashboard page
 */

import React from "react";

type ProjectStatus = "in-progress" | "completed" | "cancelled";

interface ProjectCardProps {
  time: string;
  status: ProjectStatus;
  title: string;
  description: string;
  duration: string;
  techStack: string[];
}

// controls dynamically the color by status
const statusColors: Record<ProjectStatus, string> = {
  "in-progress": "bg-green-300",
  completed: "bg-blue-500",
  cancelled: "bg-red-500",
};

const MyProjectCard: React.FC<ProjectCardProps> = ({
  time,
  status,
  title,
  description,
  duration,
  techStack,
}) => {
  return (
    <div className="w-full rounded-lg border border-border-color p-5 shadow-md space-y-2">
      {/*  time and status */}
      <div className="flex items-center justify-between text-xs">
        <span> {time} </span>
        <span className="flex items-center gap-1 text-gray-600">
          <span
            className={`inline-block h-2 w-2 rounded-full ${statusColors[status]}`}
          />
          {status}
        </span>
      </div>

      {/* Title */}
      <p className="text-lg font-semibold mt-4"> {title} </p>

      {/* Description */}
      <p className="text-gray-700 text-sm">{description}</p>

      {/* Duration */}
      <p className="font-semibold text-sm">
        📆 Duration:{" "}
        <span className="italic text-gray-400 text-xs">{duration}</span>
      </p>

      {/* Tech stack */}
      <p className="text-xs">
        <span className="font-semibold text-sm">Tech Stack:</span>{" "}
        {techStack.join(", ")}
      </p>
    </div>
  );
};

export default MyProjectCard;
