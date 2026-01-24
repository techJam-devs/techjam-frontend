import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Cloud } from "lucide-react";

import type { Project } from "../types/projects.types";
import useToastStore from "../store/notificationStore";
import {
  deleteProjectService,
  getCreatedProjectsService,
  updateProjectService,
} from "../services/creatorProjectService";
import ConfirmActionModal from "./components/modal/confirmModal";
import ProjectViewModal from "./components/modal/projectViewModal";

const MyProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [viewProject, setViewProject] = useState<Project | null>(null);
  const [deleting, setDeleting] = useState(false);

  const [searchParams] = useSearchParams();
  const statusParam = searchParams.get("status");

  const { addToast } = useToastStore();

  // ===== Fetch projects =====
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getCreatedProjectsService();
        setProjects(data);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // ===== Filter projects =====
  const filteredProjects = useMemo(() => {
    if (!statusParam) return projects;
    return projects.filter((p) => p.status === statusParam);
  }, [projects, statusParam]);

  // ===== Delete project =====
  const handleDeleteConfirm = async () => {
    if (!projectToDelete) return;

    try {
      setDeleting(true);
      await deleteProjectService(projectToDelete._id);

      setProjects((prev) => prev.filter((p) => p._id !== projectToDelete._id));

      addToast({ message: "Project deleted successfully", type: "success" });
    } catch {
      addToast({ message: "Failed to delete project", type: "error" });
    } finally {
      setDeleting(false);
      setProjectToDelete(null);
    }
  };

  // ===== Update project (from modal) =====
  const handleUpdateProject = async (updatedProject: Project) => {
    try {
      const updated = await updateProjectService(
        updatedProject._id,
        updatedProject,
      );
      setProjects((prev) =>
        prev.map((p) => (p._id === updated._id ? updated : p)),
      );
      addToast({ message: "Project updated successfully", type: "success" });
      setViewProject(null);
    } catch {
      addToast({ message: "Failed to update project", type: "error" });
    }
  };

  // ===== Loader =====
  if (loading) {
    return (
      <div className="p-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-40 rounded-lg bg-gray-200 animate-pulse" />
        ))}
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  if (filteredProjects.length === 0) {
    return (
      <div className="flex flex-col items-center pt-16 gap-3">
        <div className="w-20 h-20 flex items-center justify-center rounded-lg border-2 border-dashed">
          <Cloud className="w-8 h-8 text-gray-400" />
        </div>
        <p className="text-sm text-gray-500">No projects found</p>
      </div>
    );
  }

  return (
    <section className="p-6 space-y-6">
      <h2 className="text-lg font-semibold">My Projects</h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => {
          const statusColor =
            project.status === "completed"
              ? "bg-blue-100 text-blue-600"
              : project.status === "cancelled"
                ? "bg-red-100 text-red-600"
                : project.status === "in-progress"
                  ? "bg-yellow-100 text-yellow-500"
                  : "bg-green-100 text-green-600";

          return (
            <div
              key={project._id}
              className="relative rounded-lg border border-gray-200 hover:shadow-xl p-4 bg-white shadow-sm transition"
            >
              {/* Status */}
              <span
                className={`absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs capitalize ${statusColor}`}
              >
                {project.status}
              </span>

              <h3 className="font-semibold text-sm">{project.title}</h3>

              <p className="text-xs text-gray-500 mt-2 line-clamp-3">
                {project.description}
              </p>

              <p className="text-xs text-gray-600 mt-3">
                {new Date(project.startDate).toLocaleDateString()} –{" "}
                {new Date(project.endDate).toLocaleDateString()}
              </p>

              {/* Actions */}
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => setViewProject(project)}
                  className="text-xs text-blue-500 hover:underline"
                >
                  View
                </button>

                <button
                  onClick={() => setProjectToDelete(project)}
                  className="text-xs text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Confirm delete modal */}
      {projectToDelete && (
        <ConfirmActionModal
          title="Delete project?"
          description="This action will permanently delete this project and remove all members."
          confirmText="Delete project"
          loading={deleting}
          onCancel={() => setProjectToDelete(null)}
          onConfirm={handleDeleteConfirm}
        />
      )}

      {/* Project view/edit modal */}
      {viewProject && (
        <ProjectViewModal
          project={viewProject}
          onClose={() => setViewProject(null)}
          onSave={handleUpdateProject}
        />
      )}
    </section>
  );
};

export default MyProjects;
