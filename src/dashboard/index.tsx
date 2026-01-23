/**
 * @description This is the home page of our dashboard and this serve as the page for our Best Match page
 *              Displays all projects available
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

  // Fetch all projects
  useEffect(() => {
    setLoading(true);
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const res = await getAllProjectsService();
        setProjects(res.projects);
      } catch (error) {
        console.error(error);
        if (axios.isAxiosError(error)) {
          setError(error.message ?? "Error fetching projects.");
        }
        setError("unknown error.");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // display loading animation while fetching projects
  if (loading) {
    return (
      <div className="p-6 grid md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((_, idx) => (
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
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-500 w-full flex flex-1 item-center justify-center">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6 overflow-y-auto">
      {projects.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-4">
          {projects.map((project) => (
            <BestMatchCard key={project._id} {...project} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-3 pt-10">
          <div className="w-20 h-20 flex items-center justify-center rounded-lg border-2 border-dashed border-border-color">
            <Cloud className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-sm font-medium text-gray-500">
            {" "}
            There is no available projects to join
          </p>
        </div>
      )}
    </div>
  );
};

export default Index;
