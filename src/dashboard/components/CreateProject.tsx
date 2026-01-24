/**
 * @description This creates a plus icon to create projects
 */

import { Plus, X } from "lucide-react";
import React, { useState, useRef } from "react";
import useToastStore from "../../store/notificationStore";
import { createProjectService } from "../../services/projectService";

const CreateProjectButton = () => {
  const { addToast } = useToastStore();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [techInput, setTechInput] = useState("");
  const [roleInput, setRoleInput] = useState("");
  const [projectData, setProjectData] = useState({
    title: "",
    techStack: [] as string[],
    description: "",
    experience: "",
    requiredRoles: [] as string[],
    startDate: "",
    endDate: "",
    link: "",
  });

  const wordsCount =
    projectData.description.trim() === ""
      ? 0
      : projectData.description.trim().split(/\s+/).filter(Boolean).length;

  const techInputRef = useRef<HTMLInputElement>(null);
  const roleInputRef = useRef<HTMLInputElement>(null);

  // Get user input + control description input to max 100 words
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    if (name === "description") {
      const words = value.trim().split(/\s+/).filter(Boolean);
      if (words.length > 100) return; // HARD STOP at 100 words
    }

    setProjectData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createProjectService(projectData);
      addToast({ message: "Project created successfully", type: "success" });
      setProjectData({
        title: "",
        techStack: [] as string[],
        description: "",
        experience: "",
        requiredRoles: [] as string[],
        startDate: "",
        endDate: "",
        link: "",
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      addToast({ message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        title="Create new project"
        className="flex cursor-pointer rounded-full p-1 hover:bg-gray-100 transition-colors duration-300"
      >
        <Plus className="size-6 p-1 bg-blue-200 text-blue hover:bg-gray-300 rounded-full cursor-pointer" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-lg p-6 relative mx-4 transition-all duration-500">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black transition"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-semibold mb-4">Create New Project</h2>

            <form onSubmit={handleSubmit} className="space-y-4 text-gray-700">
              {/* Project Title */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Project Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={projectData.title}
                  onChange={handleInputChange}
                  placeholder="Enter project name"
                  className="w-full border text-sm border-gray-300 bg-gray-50 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              {/* Tech Stack */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Tech Stack
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {projectData.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full flex items-center gap-1 text-xs"
                    >
                      {tech}
                      <button
                        type="button"
                        onClick={() =>
                          setProjectData((prev) => ({
                            ...prev,
                            techStack: prev.techStack.filter((t) => t !== tech),
                          }))
                        }
                        className="text-blue-600 hover:text-blue-900 font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    ref={techInputRef}
                    type="text"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    placeholder="Add a tech (e.g. React)"
                    className="flex-1 border text-sm border-gray-300 bg-gray-50 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const value = techInput.trim();
                      if (!value || projectData.techStack.includes(value))
                        return;
                      setProjectData((prev) => ({
                        ...prev,
                        techStack: [...prev.techStack, value],
                      }));
                      setTechInput("");
                      techInputRef.current?.focus(); // Auto-focus for mobile/desktop
                    }}
                    className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Roles */}
              <div>
                <label className="block text-sm font-medium mb-1">Roles</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {projectData.requiredRoles.map((role) => (
                    <span
                      key={role}
                      className="bg-green-100 text-green-800 px-2 py-1 rounded-full flex items-center gap-1 text-xs"
                    >
                      {role}
                      <button
                        type="button"
                        onClick={() =>
                          setProjectData((prev) => ({
                            ...prev,
                            requiredRoles: prev.requiredRoles.filter(
                              (r) => r !== role,
                            ),
                          }))
                        }
                        className="text-green-600 hover:text-green-900 font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    ref={roleInputRef}
                    type="text"
                    value={roleInput}
                    onChange={(e) => setRoleInput(e.target.value)}
                    placeholder="Add a role (e.g. Project Manager)"
                    className="flex-1 border text-sm border-gray-300 bg-gray-50 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const value = roleInput.trim();
                      if (!value || projectData.requiredRoles.includes(value))
                        return;
                      setProjectData((prev) => ({
                        ...prev,
                        requiredRoles: [...prev.requiredRoles, value],
                      }));
                      setRoleInput("");
                      roleInputRef.current?.focus(); // Auto-focus for mobile/desktop
                    }}
                    className="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 transition"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <p
                  className={`text-xs ${wordsCount === 100 ? "text-red-500 font-medium" : "text-gray-400"}`}
                >
                  {wordsCount}/100 words
                </p>
                <textarea
                  name="description"
                  value={projectData.description}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Short project description..."
                  className="w-full border text-sm border-gray-300 bg-gray-50 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Experience */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Experience
                </label>
                <input
                  type="text"
                  name="experience"
                  value={projectData.experience}
                  onChange={handleInputChange}
                  placeholder="Experience (e.g. 2+ yrs)"
                  className="w-full border text-sm border-gray-300 bg-gray-50 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Start & End Dates */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs md:text-sm text-gray-600 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={projectData.startDate}
                    onChange={handleInputChange}
                    className="w-full border text-sm border-gray-300 bg-gray-50 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs md:text-sm text-gray-600 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={projectData.endDate}
                    onChange={handleInputChange}
                    className="w-full border text-sm border-gray-300 bg-gray-50 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* External Link */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Collaboration Link
                </label>
                <div className="flex items-center border border-gray-300 bg-gray-50 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                  <input
                    type="url"
                    name="link"
                    value={projectData.link}
                    onChange={handleInputChange}
                    placeholder="Link to Trello, Notion, etc."
                    className="flex-1 text-sm bg-transparent focus:outline-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-500 text-white font-medium py-2 px-8 rounded-full hover:bg-blue-600 transition disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                  {loading ? "Creating ...⌛" : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateProjectButton;
