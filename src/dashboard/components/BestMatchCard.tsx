/**
 * @description This card is for Best match Page
 * @returns A reuseable card component taking props, used in our index page or Best matches page
 */

import DevCounts from "./DevCounts";

type ProjectStatus = "in-progress" | "completed" | "pending";

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
  "in-progress": "bg-green-500",
  completed: "bg-red-500",
  pending: "bg-yellow-500",
};

const BestMatchCard: React.FC<ProjectCardProps> = ({
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

      {/** Button to join */}
      <div className="flex justify-between items-center mt-6">
        <DevCounts />

        <button
          type="button"
          className="bg-blue hover:bg-blue/80 hover:shadow-2xl text-white cursor-pointer py-2 px-6 text-sm shadow-md rounded-full"
        >
          Join Project
        </button>
      </div>
    </div>
  );
};

export default BestMatchCard;
