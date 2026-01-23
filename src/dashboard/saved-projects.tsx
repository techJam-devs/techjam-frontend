/**
 * @description displays the saved/bookmarked projects in this page.
 */

import { useRef, useEffect, useState, useCallback } from "react";
import useToastStore from "../store/notificationStore";
import { getSavedBookmarkService } from "../services/bookmarkProjectService";
import type { Project } from "../types/projects.types";
import { Bookmark } from "lucide-react";
import BestMatchCard from "./components/BestMatchCard";

const SavedProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { addToast } = useToastStore();
  const toastShownRef = useRef(false); // <-- track if toast already shown

  // Toast callback
  const showToast = useCallback(
    (msg: string, type: "success" | "error") => {
      if (!toastShownRef.current) {
        addToast({ message: msg, type });
        toastShownRef.current = true;
      }
    },
    [addToast],
  );

  const handleToggleSave = (projectId: string, isSaved: boolean) => {
    if (!isSaved) {
      setProjects((prev) => prev.filter((p) => p._id !== projectId));
    }
  };

  useEffect(() => {
    const fetchSavedProjects = async () => {
      try {
        const data = await getSavedBookmarkService();
        setProjects(data);
      } catch (err) {
        const msg =
          err instanceof Error ? err.message : "Unable to load saved projects";
        setError(msg); // <-- also store the error for inline display
        showToast(msg, "error");
      } finally {
        setLoading(false);
      }
    };

    fetchSavedProjects();
  }, [showToast]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
        <p className="text-gray-500 font-medium">Loading saved projects...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col items-center justify-center mt-20 text-center text-gray-500 space-y-4">
        <p className="text-lg font-semibold">Failed to load saved projects</p>
        <p className="text-sm text-gray-400 px-10">{error}</p>
      </div>
    );

  if (projects.length === 0)
    return (
      <div className="flex flex-col items-center justify-center mt-20 text-center text-gray-500 space-y-4">
        <Bookmark size={48} className="text-gray-300" />
        <p className="text-lg font-semibold">
          You haven't saved any projects yet.
        </p>
        <p className="text-sm text-gray-400 px-10">
          Browse projects and click the bookmark icon to save your favorites.
        </p>
      </div>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {projects.map((project) => (
        <BestMatchCard
          key={project._id}
          {...project}
          initialIsSaved
          onToggleSave={handleToggleSave}
        />
      ))}
    </div>
  );
};

export default SavedProjects;
