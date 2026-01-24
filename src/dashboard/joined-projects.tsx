/**
 * @returns A component that displays projects the user is a team member of
 */

import { useEffect, useState } from "react";
import {
  getJoinedProjectsService,
  leaveProjectService,
} from "../services/projectService";
import type { Project } from "../types/projects.types";
import ProjectDetailsModal from "./components/modal/projectDetailsModal";
import useToastStore from "../store/notificationStore";
import useAuthstore from "../store/authStore";

const JoinedProjects = () => {
  const { user } = useAuthstore();
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToast } = useToastStore();

  const handleLeaveProject = async (projectId: string) => {
    try {
      await leaveProjectService(projectId);
      addToast({
        message: "You have successfully left the team.",
        type: "success",
      });
      setProjects((prev) =>
        prev.filter((project) => project._id !== projectId),
      );
      setShowModal(false);
      setSelectedProject(null);
    } catch (error) {
      addToast({
        message: "An error occurred while trying to leave the team.",
        type: "error",
      });
      console.error("Failed to leave project", error);
    }
  };

  useEffect(() => {
    const fetchJoinedProjects = async () => {
      try {
        const data = await getJoinedProjectsService();
        setProjects(data);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchJoinedProjects();
  }, []);

  if (loading)
    return (
      <section className="space-y-6 p-4">
        <h2 className="text-xl font-semibold">Joined Projects</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-44 rounded-lg bg-gray-200 animate-pulse"
            />
          ))}
        </div>
      </section>
    );

  if (error) return <p className="text-center text-red-500 mt-6">{error}</p>;
  if (!projects.length)
    return (
      <p className="text-center text-gray-500 mt-6">
        You have not joined any projects yet.
      </p>
    );

  return (
    <section className="space-y-6 p-4">
      <h2 className="text-xl font-semibold">Joined Projects</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => {
          const statusColor =
            project.status === "completed"
              ? "bg-blue-500"
              : project.status === "cancelled"
                ? "bg-red-500"
                : project.status === "in-progress"
                  ? "bg-yellow-400"
                  : "bg-green-500";

          const statusText =
            project.status === "completed"
              ? "text-blue-500"
              : project.status === "cancelled"
                ? "text-red-500"
                : project.status === "in-progress"
                  ? "text-yellow-500"
                  : "text-green-500";

          return (
            <div
              key={project._id}
              onClick={() => {
                setSelectedProject(project);
                setShowModal(true);
              }}
              className="cursor-pointer rounded-lg bg-gray-200 p-5 shadow-sm space-y-3 transition hover:shadow-lg"
            >
              <div className="flex justify-between text-xs text-gray-500">
                <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                <span
                  className={`flex items-center gap-1 capitalize ${statusText}`}
                >
                  <span className={`h-2 w-2 rounded-full ${statusColor}`} />
                  {project.status}
                </span>
              </div>
              <p className="text-sm font-semibold">🤖 {project.title}</p>
              <p className="text-xs text-gray-700 line-clamp-3">
                {project.description}
              </p>
              <p className="text-xs">
                <span className="font-semibold">🚀 Tech:</span>{" "}
                {project.techStack.join(", ")}
              </p>
            </div>
          );
        })}
      </div>

      {showModal && selectedProject && user && (
        <ProjectDetailsModal
          project={selectedProject}
          onClose={() => setShowModal(false)}
          onLeave={handleLeaveProject}
          currentUser={user}
        />
      )}
    </section>
  );
};

export default JoinedProjects;
