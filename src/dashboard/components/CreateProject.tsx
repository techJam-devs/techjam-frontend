/**
 * @description This creates a plus icon to create projects
 */

import { Link2, Plus, X } from "lucide-react";
import React, { useState } from "react";
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

  // Add tech
  const handleAddTech = () => {
    const value = techInput.trim();
    if (value && !projectData.techStack.includes(value)) {
      setProjectData((prev) => ({
        ...prev,
        techStack: [...prev.techStack, value],
      }));
      setTechInput("");
    }
  };

  // Remove tech
  const handleRemoveTech = (tech: string) => {
    setProjectData((prev) => ({
      ...prev,
      techStack: prev.techStack.filter((t) => t !== tech),
    }));
  };

  // Add role
  const handleAddRole = () => {
    const value = roleInput.trim();
    if (value && !projectData.requiredRoles.includes(value)) {
      setProjectData((prev) => ({
        ...prev,
        requiredRoles: [...prev.requiredRoles, value],
      }));
      setRoleInput("");
    }
  };

  // Remove role
  const handleRemoveRole = (role: string) => {
    setProjectData((prev) => ({
      ...prev,
      requiredRoles: prev.requiredRoles.filter((r) => r !== role),
    }));
  };

  // Optional: handle Enter key
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    type: "tech" | "role",
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (type === "tech") {
        handleAddTech();
      } else if (type === "role") {
        handleAddRole();
      }
    }
  };

  // Get user input +  control description input to max 100 words
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    if (name === "description") {
      const words = value.trim().split(/\s+/).filter(Boolean);

      // HARD STOP at 100 words
      if (words.length > 100) {
        return;
      }
    }

    setProjectData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle data submission
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

      {/** show create project pop up */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          {/* Modal box */}
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-lg p-6 relative mx-4 transition-all duration-500">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black transition"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-semibold mb-4">Create New Project</h2>

            {/* form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-gray-500">
              {/* project title */}
              <input
                type="text"
                name="title"
                onChange={handleInputChange}
                value={projectData.title}
                className="w-full border text-sm border-gray-300 bg-gray-50 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter project name"
              />

              {/* tech stack */}
              <div className="flex flex-wrap gap-2 mb-2">
                {projectData.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full flex items-center gap-1 text-xs"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => handleRemoveTech(tech)}
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, "tech")}
                placeholder="Tech stack"
                className="w-full border text-sm border-gray-300 bg-gray-50 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />

              {/* description */}
              <div>
                <p
                  className={`text-xs ${
                    wordsCount === 100
                      ? "text-red-500 font-medium"
                      : "text-gray-400"
                  }`}
                >
                  {wordsCount}/100
                </p>

                <textarea
                  name="description"
                  value={projectData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full border text-sm border-gray-300 bg-gray-50 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Short project description..."
                />
              </div>

              {/* Roles + Experience */}
              <div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {projectData.requiredRoles.map((role) => (
                    <span
                      key={role}
                      className="bg-green-100 text-green-800 px-2 py-1 rounded-full flex items-center gap-1 text-xs"
                    >
                      {role}
                      <button
                        type="button"
                        onClick={() => handleRemoveRole(role)}
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  value={roleInput}
                  onChange={(e) => setRoleInput(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, "role")}
                  placeholder="Required Roles (e.g. Project Manager)"
                  className="w-full border text-sm border-gray-300 bg-gray-50 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                {/* Experience */}
                <input
                  type="text"
                  name="experience"
                  onChange={handleInputChange}
                  value={projectData.experience}
                  className="w-full border text-sm mt-6 border-gray-300 bg-gray-50 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Experience (e.g. 2+ yrs)"
                />
              </div>

              {/* Start + End date */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs md:text--sm text-gray-600 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    onChange={handleInputChange}
                    value={projectData.startDate}
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
                    onChange={handleInputChange}
                    value={projectData.endDate}
                    className="w-full border text-sm border-gray-300 bg-gray-50 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* External link */}
              <div className="flex items-center border border-gray-300 bg-gray-50 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                <input
                  type="url"
                  name="link"
                  onChange={handleInputChange}
                  value={projectData.link}
                  className="w-full text-sm bg-transparent focus:outline-none"
                  placeholder="Link to collaboration tool (e.g. Trello)"
                />{" "}
                <Link2 className="w-4 h-4 text-gray-400 mr-2" />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue text-white font-medium py-2 px-8 rounded-full hover:bg-blue-700 transition disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                  {loading ? "Creating ...⌛" : "Create project"}
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
