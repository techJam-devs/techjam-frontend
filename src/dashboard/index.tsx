/*
 * @description This is the home page of our dashboard(Best Match) * Displays all projects with pagination to prevent UI overload
 */

import { useEffect, useState } from "react";
import type { Project } from "../types/projects.types.ts";
import BestMatchCard from "./components/BestMatchCard";
import { Cloud } from "lucide-react";
import { getAllProjectsService } from "../services/projectService.ts";
import axios from "axios";

const Index = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Pagination state
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProjects = async (pageNumber: number = 1) => {
    setLoading(true);
    setError(null);

    try {
      // Backend uses default pagination, but it will return current page info
      const res = await getAllProjectsService();
      setProjects(res.projects);
      setTotalPages(res.pagination.pages);
      setPage(res.pagination.page || pageNumber);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.message ?? "Error fetching projects.");
      } else {
        setError("Unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects(page);
  }, [page]);

  // Pagination handlers
  const handlePrevPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  return (
    <div className="p-6 overflow-y-auto">
      {loading ? (
        <div className="p-6 grid md:grid-cols-2 gap-4">
          {[...Array(10)].map((_, idx) => (
            <div
              key={idx}
              className="rounded-lg border border-gray-300 p-5 shadow-md animate-pulse"
            >
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-4" />
              <div className="h-3 bg-gray-300 rounded w-full mb-2" />
              <div className="h-3 bg-gray-300 rounded w-5/6 mb-2" />
              <div className="h-3 bg-gray-300 rounded w-2/3" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="p-6 text-red-500 w-full flex flex-1 items-center justify-center">
          {error}
        </div>
      ) : projects.length > 0 ? (
        <>
          {/* Top page indicator */}
          <div className="flex justify-end mb-4 text-sm text-gray-500">
            Page {page} of {totalPages}
          </div>

          {/* Projects grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {projects.map((project) => (
              <BestMatchCard
                key={project._id}
                {...project}
                initialIsSaved={project.isBookmarked}
              />
            ))}
          </div>

          {/* Bottom pagination controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-6">
              <button
                onClick={handlePrevPage}
                disabled={page === 1}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300"
              >
                Prev
              </button>
              <span>
                Page {page} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={page === totalPages}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300"
              >
                Next
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-3 pt-10">
          <div className="w-20 h-20 flex items-center justify-center rounded-lg border-2 border-dashed border-border-color">
            <Cloud className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-sm font-medium text-gray-500">
            There are no available projects to join
          </p>
        </div>
      )}
    </div>
  );
};

export default Index;
