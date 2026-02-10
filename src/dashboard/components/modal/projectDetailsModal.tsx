/**
 * @description Modal pop-up that displays project details, team members, and allows leaving project
 */

import { useState } from "react";
import { Crown } from "lucide-react";
import type { Project } from "../../../types/projects.types";
import type { AuthUser } from "../../../types/auth.types";

interface ProjectDetailsModalProps {
  project: Project;
  onClose: () => void;
  onLeave: (projectId: string) => void;
  currentUser: AuthUser | null;
}

const ProjectDetailsModal = ({
  project,
  onClose,
  onLeave,
  currentUser,
}: ProjectDetailsModalProps) => {
  const [confirmLeave, setConfirmLeave] = useState(false);
  const isCreator = currentUser?.id === project.creator._id;

  const handleConfirmLeave = () => onLeave(project._id);

  const start = new Date(project.startDate).toLocaleDateString();
  const end = new Date(project.endDate).toLocaleDateString();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 space-y-3 shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">{project.title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-black transition"
          >
            ✕
          </button>
        </div>

        {/* Description & Duration */}
        <p className="text-sm text-gray-600">{project.description}</p>
        <p className="text-sm text-gray-800 font-bold">
          📆 Duration:{" "}
          <span className="font-medium text-gray-500">
            {start} – {end}
          </span>
        </p>
        <p className="text-sm text-gray-800 font-bold">
          🚀 Tech Stack:{" "}
          <span className="font-medium text-gray-500">
            {project.techStack.join(", ")}
          </span>
        </p>

        {/* Team Members */}
        <div className="space-y-2">
          <p className="text-sm font-semibold">Team Members</p>
          <div className="gap-3">
            {project.teamMembers.map((member) => (
              <div
                key={member.user._id}
                className="flex items-center gap-3 mb-3 bg-blue/80 p-2 rounded-lg shadow-sm"
              >
                {/* Avatar */}
                {member.user.avatar ? (
                  <img
                    src={member.user.avatar}
                    alt={member.user.name}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-semibold text-white">
                    {member.user.name[0]}
                  </div>
                )}

                {/* Name + Role */}
                <div className="flex flex-col">
                  <span className="text-sm text-white font-medium">
                    {member.user.name}
                  </span>
                  <span className="text-xs text-gray-400">
                    {member.user.role ?? "Member"}
                  </span>
                  <span className="text-xs text-gray-400">
                    {member.user.email}
                  </span>
                </div>

                {/* Owner Badge */}
                {member.user._id === project.creator._id && (
                  <span className="ml-auto flex gap-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-600 rounded-full font-medium">
                    <span>
                      <Crown size={12} />
                    </span>{" "}
                    Owner
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded border hover:bg-gray-100 transition-all cursor-pointer"
          >
            Close
          </button>

          <button
            disabled={isCreator}
            onClick={() => setConfirmLeave(true)}
            className={`px-4 py-2 text-sm rounded text-white transition ${isCreator ? "bg-gray-300 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"}`}
          >
            Leave Project
          </button>
        </div>

        {/* Confirmation */}
        {confirmLeave && !isCreator && (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 space-y-3">
            <p className="text-sm text-red-700">
              Are you sure you want to leave this project? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setConfirmLeave(false)}
                className="px-3 py-1 text-sm rounded border hover:bg-gray-100 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmLeave}
                className="px-3 py-1 text-sm rounded bg-red-600 text-white hover:bg-red-700 transitio cursor-pointern"
              >
                Yes, Leave
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetailsModal;
