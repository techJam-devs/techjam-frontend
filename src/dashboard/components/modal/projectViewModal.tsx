import { useState } from "react";
import type { Project } from "../../../types/projects.types";

const toInputDate = (value: string | Date) => {
  try {
    return new Date(value).toISOString().slice(0, 10);
  } catch {
    return "";
  }
};

interface ProjectViewModalProps {
  project: Project;
  onClose: () => void;
  onSave: (updatedProject: Project) => void;
}

const ProjectViewModal = ({
  project,
  onClose,
  onSave,
}: ProjectViewModalProps) => {
  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState<Project["status"]>(
    project.status ?? "available",
  );

  const [startDate, setStartDate] = useState(toInputDate(project.startDate));
  const [endDate, setEndDate] = useState(toInputDate(project.endDate));

  const [techStack, setTechStack] = useState(
    Array.isArray(project.techStack) ? project.techStack.join(", ") : "",
  );

  const [requiredRoles, setRequiredRoles] = useState(
    Array.isArray(project.requiredRoles)
      ? project.requiredRoles.join(", ")
      : "",
  );

  const [link, setLink] = useState(
    typeof project.link === "string" ? project.link : "",
  );

  const handleSave = () => {
    const updatedProject: Project = {
      ...project,
      title: title.trim(),
      description: description.trim(),
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      status,
      link: link.trim() || undefined,
      techStack: techStack
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      requiredRoles: requiredRoles
        .split(",")
        .map((r) => r.trim())
        .filter(Boolean),
    };

    onSave(updatedProject);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 space-y-5 shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Project Details</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-black"
            type="button"
          >
            ✕
          </button>
        </div>

        {/* Fields */}
        <div className="space-y-4">
          {/* Title */}
          <div>
            <label className="text-sm font-medium">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mt-1 p-2 bg-gray-100 rounded-md text-sm"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full mt-1 p-2 bg-gray-100 rounded-md text-sm resize-none"
            />
          </div>

          {/* Status */}
          <div>
            <label className="text-sm font-medium">Project Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as Project["status"])}
              className="w-full mt-1 p-2 bg-gray-100 rounded-md text-sm"
            >
              <option value="available">Available</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Dates */}
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="text-sm font-medium">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full mt-1 p-2 bg-gray-100 rounded-md text-sm"
              />
            </div>

            <div className="flex-1">
              <label className="text-sm font-medium">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full mt-1 p-2 bg-gray-100 rounded-md text-sm"
              />
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <label className="text-sm font-medium">Tech Stack</label>
            <input
              value={techStack}
              onChange={(e) => setTechStack(e.target.value)}
              placeholder="React, Node.js, MongoDB"
              className="w-full mt-1 p-2 bg-gray-100 rounded-md text-sm"
            />
          </div>

          {/* Required Roles */}
          <div>
            <label className="text-sm font-medium">Required Roles</label>
            <input
              value={requiredRoles}
              onChange={(e) => setRequiredRoles(e.target.value)}
              placeholder="Frontend Dev, Backend Dev"
              className="w-full mt-1 p-2 bg-gray-200 rounded-md text-sm"
            />
          </div>

          {/* Project Link */}
          <div>
            <label className="text-sm font-medium">Project Link</label>
            <input
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://github.com/..."
              className="w-full mt-1 p-2 bg-gray-100 rounded-md text-sm"
            />
          </div>

          {/* Team Members */}
          <div>
            <p className="text-sm font-medium mb-1">Team Members</p>
            <div className="grid grid-cols-2 gap-2">
              {Array.isArray(project.teamMembers) &&
                project.teamMembers.map((member, index) => {
                  if (
                    !member ||
                    !member.user ||
                    typeof member.user !== "object"
                  ) {
                    return null;
                  }

                  const userId = member.user._id;
                  const creatorId = project.creator?._id;
                  const name =
                    typeof member.user.name === "string"
                      ? member.user.name
                      : "Unknown";

                  return (
                    <div
                      key={`${userId}-${index}`}
                      className="flex items-center gap-2 bg-gray-50 p-2 rounded-md text-xs"
                    >
                      {member.user.avatar ? (
                        <img
                          src={member.user.avatar}
                          alt={name}
                          className="h-6 w-6 rounded-full object-cover"
                        />
                      ) : (
                        <div className="h-6 w-6 rounded-full bg-gray-300 flex items-center justify-center text-white">
                          {name.charAt(0)}
                        </div>
                      )}

                      <span>{name}</span>

                      {userId === creatorId && (
                        <span className="ml-auto px-1 py-0.5 bg-blue-100 text-blue-600 rounded-full text-xs">
                          Owner
                        </span>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-300">
          <button
            onClick={onClose}
            type="button"
            className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            type="button"
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectViewModal;
